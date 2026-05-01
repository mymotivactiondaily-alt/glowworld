import { Express, Request, Response } from 'express';
import admin from 'firebase-admin';
import { PERSONAS } from '../ai/personas.js';
import { DEGRADED_RESPONSES } from '../ai/degradedResponses.js';
import { streamMascotResponse, estimateCostEUR } from '../ai/claudeClient.js';
import { getTeamContext } from '../football/footballDataClient.js';
import { 
  checkUserDailyLimit, 
  incrementUserDailyCount, 
  getMonthlySpendStatus, 
  recordUsage 
} from '../chat/rateLimiter.js';
import { 
  getOrCreateConversation, 
  getRecentHistory, 
  appendMessage,
  deleteAllMessages
} from '../chat/conversationStore.js';
import { CountryCode } from '../types/chat.types.js';

export function registerFanChatRoute(app: Express) {
  app.post('/api/fan-chat', async (req: Request, res: Response) => {
    try {
      const { email, countryCode, message, fanToken } = req.body;

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide" });
      }
      
      const normalizedEmail = email.toLowerCase().trim(); // Standardisation critique

      if (!countryCode || !Object.keys(PERSONAS).includes(countryCode)) {
        return res.status(400).json({ error: "Code pays invalide" });
      }
      if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 500) {
        return res.status(400).json({ error: "Message invalide ou trop long (max 500 chars)" });
      }

      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mymotivactiondaily@gmail.com';
      const cCode = countryCode as CountryCode;

      if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
        if (!fanToken) {
          return res.status(403).json({ error: "Token Fan Zone manquant" });
        }
        
        const db = admin.firestore();
        const tokenDoc = await db.collection('fan_tokens').doc(fanToken).get();
        if (!tokenDoc.exists) {
          return res.status(403).json({ error: "Token Fan Zone invalide" });
        }
        const tokenData = tokenDoc.data()!;
        if (tokenData.email !== normalizedEmail) {
          return res.status(403).json({ error: "Token non associé à cet email" });
        }
        if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
          return res.status(403).json({ error: "Token expiré" });
        }
        if (tokenData.country && tokenData.country.toLowerCase() !== cCode.toLowerCase()) {
           return res.status(403).json({ error: "Accès non autorisé pour ce pays" });
        }
      }

      const rateLimitInfo = await checkUserDailyLimit(normalizedEmail);
      if (!rateLimitInfo.allowed) {
        return res.status(429).json({ 
          error: `Tu as atteint la limite de ${rateLimitInfo.limit} messages aujourd'hui. Reviens demain !`,
          remaining: 0 
        });
      }

      const spendStatus = await getMonthlySpendStatus();
      if (spendStatus.isDegraded) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const chunkObj = { type: 'chunk', content: DEGRADED_RESPONSES[cCode] };
        res.write(`data: ${JSON.stringify(chunkObj)}\n\n`);
        res.write(`data: ${JSON.stringify({ type: 'done', costEUR: 0, remaining: rateLimitInfo.remaining })}\n\n`);
        return res.end();
      }

      const conversationId = await getOrCreateConversation(normalizedEmail, cCode);
      const history = await getRecentHistory(conversationId, 8);
      const footballContext = await getTeamContext(cCode);

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();

      await appendMessage(conversationId, 'user', message);

      const systemPrompt = PERSONAS[cCode].systemPrompt;
      const generator = streamMascotResponse({ systemPrompt, history, userMessage: message, footballContext });

      let fullText = '';
      let usage: any = null;

      for await (const chunk of generator) {
        // Prévention Cost/Memory Leak en cas de coupure réseau côté client mobile
        if (req.destroyed) break;

        if (chunk.startsWith('{"__usage"')) {
          usage = JSON.parse(chunk).__usage;
        } else {
          fullText += chunk;
          res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`);
        }
      }

      if (usage && !req.destroyed) {
        const costEUR = estimateCostEUR(usage);
        await appendMessage(conversationId, 'assistant', fullText, costEUR);
        await incrementUserDailyCount(normalizedEmail);
        await recordUsage(normalizedEmail, costEUR);
        
        res.write(`data: ${JSON.stringify({ type: 'done', costEUR, remaining: rateLimitInfo.remaining - 1 })}\n\n`);
      } else if (!req.destroyed) {
        res.write(`data: ${JSON.stringify({ type: 'done', costEUR: 0, remaining: rateLimitInfo.remaining - 1 })}\n\n`);
      }
      res.end();

    } catch (err: any) {
      console.error("❌ Fan Chat Error:", err);
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
      }
      if (!req.destroyed) {
        res.write(`data: ${JSON.stringify({ type: 'error', message: "La mascotte a un problème technique, réessaie dans un instant." })}\n\n`);
        res.end();
      }
    }
  });

  // GET History Endpoint
  app.get('/api/fan-chat/history', async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string;
      const countryCode = req.query.countryCode as string;
      const fanToken = req.query.fanToken as string;

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide" });
      }
      
      const normalizedEmail = email.toLowerCase().trim();

      if (!countryCode || !Object.keys(PERSONAS).includes(countryCode)) {
        return res.status(400).json({ error: "Code pays invalide" });
      }

      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mymotivactiondaily@gmail.com';
      const cCode = countryCode as CountryCode;

      if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
        if (!fanToken) {
          return res.status(403).json({ error: "Token Fan Zone manquant" });
        }
        
        const db = admin.firestore();
        const tokenDoc = await db.collection('fan_tokens').doc(fanToken).get();
        if (!tokenDoc.exists) {
          return res.status(403).json({ error: "Token Fan Zone invalide" });
        }
        const tokenData = tokenDoc.data()!;
        if (tokenData.email !== normalizedEmail) {
          return res.status(403).json({ error: "Token non associé à cet email" });
        }
        if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
          return res.status(403).json({ error: "Token expiré" });
        }
        if (tokenData.country && tokenData.country.toLowerCase() !== cCode.toLowerCase()) {
           return res.status(403).json({ error: "Accès non autorisé pour ce pays" });
        }
      }

      const conversationId = await getOrCreateConversation(normalizedEmail, cCode);
      const history = await getRecentHistory(conversationId, 20); // Retrieve up to 20 messages for history
      
      return res.status(200).json({ history });
    } catch (err: any) {
      console.error("❌ GET History Error:", err);
      return res.status(500).json({ error: "Erreur serveur lors de la récupération de l'historique" });
    }
  });

  // DELETE History Endpoint
  app.delete('/api/fan-chat/history', async (req: Request, res: Response) => {
    try {
      const { email, countryCode, fanToken } = req.body;

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide" });
      }
      
      const normalizedEmail = email.toLowerCase().trim();

      if (!countryCode || !Object.keys(PERSONAS).includes(countryCode)) {
        return res.status(400).json({ error: "Code pays invalide" });
      }

      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mymotivactiondaily@gmail.com';
      const cCode = countryCode as CountryCode;

      if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
        if (!fanToken) {
          return res.status(403).json({ error: "Token Fan Zone manquant" });
        }
        
        const db = admin.firestore();
        const tokenDoc = await db.collection('fan_tokens').doc(fanToken).get();
        if (!tokenDoc.exists) {
          return res.status(403).json({ error: "Token Fan Zone invalide" });
        }
        const tokenData = tokenDoc.data()!;
        if (tokenData.email !== normalizedEmail) {
          return res.status(403).json({ error: "Token non associé à cet email" });
        }
        if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
          return res.status(403).json({ error: "Token expiré" });
        }
        if (tokenData.country && tokenData.country.toLowerCase() !== cCode.toLowerCase()) {
           return res.status(403).json({ error: "Accès non autorisé pour ce pays" });
        }
      }

      const conversationId = await getOrCreateConversation(normalizedEmail, cCode);
      await deleteAllMessages(conversationId);
      
      return res.status(200).json({ success: true, message: "Historique supprimé avec succès" });
    } catch (err: any) {
      console.error("❌ DELETE History Error:", err);
      return res.status(500).json({ error: "Erreur serveur lors de la suppression de l'historique" });
    }
  });
}
