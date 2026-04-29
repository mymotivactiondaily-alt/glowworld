import admin from 'firebase-admin';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

export async function checkUserDailyLimit(email: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
}> {
  const db = admin.firestore();
  const dateStr = new Date().toISOString().split('T')[0];
  const limit = Number(process.env.FAN_CHAT_DAILY_LIMIT_PER_USER) || 30;
  
  const docRef = db.collection('usage_daily').doc(`${email}_${dateStr}`);
  const doc = await docRef.get();
  
  let count = 0;
  if (doc.exists) {
    count = doc.data()?.count || 0;
  }
  
  const allowed = count < limit;
  return {
    allowed,
    remaining: Math.max(0, limit - count),
    limit
  };
}

export async function incrementUserDailyCount(email: string): Promise<void> {
  const db = admin.firestore();
  const dateStr = new Date().toISOString().split('T')[0];
  const docRef = db.collection('usage_daily').doc(`${email}_${dateStr}`);
  
  await docRef.set({
    count: admin.firestore.FieldValue.increment(1),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

export async function getMonthlySpendStatus(): Promise<{
  spentEUR: number;
  budgetEUR: number;
  ratio: number;
  isDegraded: boolean;
  alertNotSentYet: boolean;
}> {
  const db = admin.firestore();
  const yyyyMM = new Date().toISOString().substring(0, 7);
  const budgetEUR = Number(process.env.ANTHROPIC_MONTHLY_BUDGET_EUR) || 40;
  const degradedThreshold = Number(process.env.ANTHROPIC_DEGRADED_MODE_THRESHOLD) || 0.9;
  const alertThreshold = Number(process.env.ANTHROPIC_ALERT_THRESHOLD) || 0.5;

  const docRef = db.collection('usage_monthly').doc(yyyyMM);
  const doc = await docRef.get();
  
  let spentEUR = 0;
  let alertSentAt = null;
  if (doc.exists) {
    const data = doc.data()!;
    spentEUR = data.spentEUR || 0;
    alertSentAt = data.alertSentAt || null;
  }
  
  const ratio = budgetEUR > 0 ? spentEUR / budgetEUR : 0;
  
  return {
    spentEUR,
    budgetEUR,
    ratio,
    isDegraded: ratio >= degradedThreshold,
    alertNotSentYet: ratio >= alertThreshold && !alertSentAt
  };
}

export async function recordUsage(email: string, costEUR: number): Promise<void> {
  if (costEUR <= 0) return;

  const db = admin.firestore();
  const dateStr = new Date().toISOString().split('T')[0];
  const yyyyMM = dateStr.substring(0, 7);

  const monthlyRef = db.collection('usage_monthly').doc(yyyyMM);
  const globalDailyRef = db.collection('usage_global').doc(dateStr);

  const budgetEUR = Number(process.env.ANTHROPIC_MONTHLY_BUDGET_EUR) || 40;
  const alertThreshold = Number(process.env.ANTHROPIC_ALERT_THRESHOLD) || 0.5;

  // Transaction atomique : lit + écrit + flag alertSentAt en une seule opération
  const shouldSendAlert = await db.runTransaction(async (tx) => {
    const monthlyDoc = await tx.get(monthlyRef);
    const previousSpent = monthlyDoc.exists ? (monthlyDoc.data()?.spentEUR || 0) : 0;
    const previousAlertSentAt = monthlyDoc.exists ? (monthlyDoc.data()?.alertSentAt || null) : null;
    const newSpent = previousSpent + costEUR;
    const newRatio = budgetEUR > 0 ? newSpent / budgetEUR : 0;

    const crossesThreshold = newRatio >= alertThreshold && !previousAlertSentAt;

    tx.set(monthlyRef, {
      spentEUR: admin.firestore.FieldValue.increment(costEUR),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      ...(crossesThreshold ? { alertSentAt: admin.firestore.FieldValue.serverTimestamp() } : {})
    }, { merge: true });

    return crossesThreshold ? { newSpent, budgetEUR } : null;
  });

  // Mise à jour compteur global (peut rester hors transaction, pas critique)
  await globalDailyRef.set({
    totalMessages: admin.firestore.FieldValue.increment(1),
    spentEUR: admin.firestore.FieldValue.increment(costEUR)
  }, { merge: true });

  // Envoi de l'alerte SI ET SEULEMENT SI la transaction a flagué qu'il fallait
  if (shouldSendAlert) {
    const adminEmail = process.env.ADMIN_EMAIL || 'mymotivactiondaily@gmail.com';
    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
    if (resend) {
      try {
        await resend.emails.send({
          from: 'GlowWorld AI <contact@glowworld2026.com>',
          to: adminEmail,
          subject: '⚠️ GlowWorld Alert : 50% du budget API mensuel atteint',
          html: `<p>GlowWorld Alert : 50% du budget API mensuel atteint (${shouldSendAlert.newSpent.toFixed(2)}€ / ${shouldSendAlert.budgetEUR}€). Tendance à surveiller.</p>`
        });
      } catch (err) {
        console.error("Failed to send usage alert email", err);
      }
    }
  }
}
