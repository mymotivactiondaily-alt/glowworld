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
    console.log('🔵 [FAN-CHAT] Request received');
    let keepAliveInterval: ReturnType<typeof setInterval> | null = null;
    try {
      const { email, countryCode, message, fanToken } = req.body;
      console.log('🔵 [FAN-CHAT] Body parsed:', { email, countryCode, hasMessage: !!message, hasToken: !!fanToken });

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide" });
      }
      
      const normalizedEmail = email.toLowerCase().trim();

      if (!countryCode || !Object.keys(PERSONAS).includes(countryCode)) {
        return res.status(400).json({ error: "Code pays invalide" });
      }
      if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 500) {
        return res.status(400).json({ error: "Message invalide ou trop long (max 500 chars)" });
      }

      console.log('🔵 [FAN-CHAT] Validation passed');

      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mymotivactiondaily@gmail.com';
      const cCode = countryCode as CountryCode;

      if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
        console.log('🔵 [FAN-CHAT] Non-admin user, checking token');
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
        console.log('🔵 [FAN-CHAT] Token validated');
      } else {
        console.log('🔵 [FAN-CHAT] Admin user detected');
      }

      console.log('🔵 [FAN-CHAT] Checking rate limit');
      const rateLimitInfo = await checkUserDailyLimit(normalizedEmail);
      console.log('🔵 [FAN-CHAT] Rate limit:', rateLimitInfo);
      
      if (!rateLimitInfo.allowed) {
        return res.status(429).json({ 
          error: `Tu as atteint la limite de ${rateLimitInfo.limit} messages aujourd'hui. Reviens demain !`,
          remaining: 0 
        });
      }

      console.log('🔵 [FAN-CHAT] Checking spend status');
      const spendStatus = await getMonthlySpendStatus();
      console.log('🔵 [FAN-CHAT] Spend status:', spendStatus);
      
      if (spendStatus.isDegraded) {
        console.log('🟡 [FAN-CHAT] DEGRADED MODE');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();
        const chunkObj = { type: 'chunk', content: DEGRADED_RESPONSES[cCode] };
        res.write(`data: ${JSON.stringify(chunkObj)}\n\n`);
        res.write(`data: ${JSON.stringify({ type: 'done', costEUR: 0, remaining: rateLimitInfo.remaining })}\n\n`);
        return res.end();
      }

      console.log('🔵 [FAN-CHAT] Getting conversation');
      const conversationId = await getOrCreateConversation(normalizedEmail, cCode);
      console.log('🔵 [FAN-CHAT] Conversation ID:', conversationId);
      
      console.log('🔵 [FAN-CHAT] Getting recent history');
      const history = await getRecentHistory(conversationId, 8);
      console.log('🔵 [FAN-CHAT] History length:', history.length);
      
      console.log('🔵 [FAN-CHAT] Getting football context');
      const footballContext = await getTeamContext(cCode);
      console.log('🔵 [FAN-CHAT] Football context obtained');

      console.log('🔵 [FAN-CHAT] Setting SSE headers');
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.flushHeaders();
      console.log('🔵 [FAN-CHAT] Headers flushed');

      // Heartbeat immédiat pour garder la connexion vivante pendant les ops Firestore/Anthropic
      res.write(': heartbeat\n\n');

      // Keep-alive périodique toutes les 5s jusqu'au début du streaming
      keepAliveInterval = setInterval(() => {
        if (!req.destroyed) {
          res.write(': keepalive\n\n');
        }
      }, 5000);

      await appendMessage(conversationId, 'user', message);
      console.log('🔵 [FAN-CHAT] User message appended');

      const systemPrompt = PERSONAS[cCode].systemPrompt;
      console.log('🔵 [FAN-CHAT] Calling streamMascotResponse');
      const generator = streamMascotResponse({ systemPrompt, history, userMessage: message, footballContext });
      console.log('🔵 [FAN-CHAT] Generator created, starting iteration');

      let fullText = '';
      let usage: any = null;
      let chunkCount = 0;

      let clientDisconnected = false;
      
      for await (const chunk of generator) {
        // Stop keepalive dès qu'on a du vrai contenu
        if (chunkCount === 0) {
          clearInterval(keepAliveInterval);
        }
        chunkCount++;
        
        if (req.destroyed && !clientDisconnected) {
          clientDisconnected = true;
          console.log(`🟡 [FAN-CHAT] Client disconnected at chunk ${chunkCount} - continuing stream silently`);
        }

        if (chunk.startsWith('{"__usage"')) {
          usage = JSON.parse(chunk).__usage;
          console.log('🔵 [FAN-CHAT] Usage chunk received:', usage);
        } else {
          fullText += chunk;
          
          // Si client toujours connecté, on écrit. Sinon on continue à accumuler 
          // dans fullText pour au moins sauvegarder en DB et logger
          if (!clientDisconnected) {
            try {
              res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`);
            } catch (writeError) {
              clientDisconnected = true;
              console.log('🟡 [FAN-CHAT] Write failed, client truly disconnected');
            }
          }
        }
      }

      console.log(`🔵 [FAN-CHAT] Stream complete. Total chunks: ${chunkCount}, fullText length: ${fullText.length}, clientDisconnected: ${clientDisconnected}`);

      if (usage) {
        const costEUR = estimateCostEUR(usage);
        await appendMessage(conversationId, 'assistant', fullText, costEUR);
        await incrementUserDailyCount(normalizedEmail);
        await recordUsage(normalizedEmail, costEUR);
        
        if (!clientDisconnected) {
          res.write(`data: ${JSON.stringify({ type: 'done', costEUR, remaining: rateLimitInfo.remaining - 1 })}\n\n`);
        }
      } else if (!clientDisconnected) {
        res.write(`data: ${JSON.stringify({ type: 'done', costEUR: 0, remaining: rateLimitInfo.remaining - 1 })}\n\n`);
      }
      res.end();
      console.log('✅ [FAN-CHAT] Response ended successfully');

    } catch (err: any) {
      clearInterval(keepAliveInterval);
      console.error("🔴 [FAN-CHAT] CRITICAL ERROR:", err);
      console.error("🔴 [FAN-CHAT] Error stack:", err.stack);
      console.error("🔴 [FAN-CHAT] Error message:", err.message);
      
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
