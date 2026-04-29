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
  appendMessage 
} from '../chat/conversationStore.js';
import { CountryCode } from '../types/chat.types.js';

export function registerFanChatRoute(app: Express) {
  app.post('/api/fan-chat', async (req: Request, res: Response) => {
    try {
      const { email, countryCode, message, fanToken } = req.body;

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide" });
      }
      if (!countryCode || !Object.keys(PERSONAS).includes(countryCode)) {
        return res.status(400).json({ error: "Code pays invalide" });
      }
      if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 500) {
        return res.status(400).json({ error: "Message invalide ou trop long (max 500 chars)" });
      }

      const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mymotivactiondaily@gmail.com';
      const cCode = countryCode as CountryCode;

      if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        if (!fanToken) {
          return res.status(403).json({ error: "Token Fan Zone manquant" });
        }
        
        const db = admin.firestore();
        const tokenDoc = await db.collection('fan_tokens').doc(fanToken).get();
        if (!tokenDoc.exists) {
          return res.status(403).json({ error: "Token Fan Zone invalide" });
        }
        const tokenData = tokenDoc.data()!;
        if (tokenData.email !== email.toLowerCase().trim()) {
          return res.status(403).json({ error: "Token non associé à cet email" });
        }
        if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
          return res.status(403).json({ error: "Token expiré" });
        }
        if (tokenData.country && tokenData.country.toLowerCase() !== cCode.toLowerCase()) {
           return res.status(403).json({ error: "Accès non autorisé pour ce pays" });
        }
      }

      const rateLimitInfo = await checkUserDailyLimit(email);
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

      const conversationId = await getOrCreateConversation(email, cCode);
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
        if (chunk.startsWith('{"__usage"')) {
          usage = JSON.parse(chunk).__usage;
        } else {
          fullText += chunk;
          res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`);
        }
      }

      if (usage) {
        const costEUR = estimateCostEUR(usage);
        await appendMessage(conversationId, 'assistant', fullText, costEUR);
        await incrementUserDailyCount(email);
        await recordUsage(email, costEUR);
        
        res.write(`data: ${JSON.stringify({ type: 'done', costEUR, remaining: rateLimitInfo.remaining - 1 })}\n\n`);
      } else {
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
      res.write(`data: ${JSON.stringify({ type: 'error', message: "La mascotte a un problème technique, réessaie dans un instant." })}\n\n`);
      res.end();
    }
  });
}
