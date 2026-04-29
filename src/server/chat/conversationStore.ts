import admin from 'firebase-admin';
import { ChatMessage, CountryCode } from '../types/chat.types.js';

export async function getOrCreateConversation(email: string, countryCode: CountryCode): Promise<string> {
  const db = admin.firestore();
  const slugEmail = email.replace(/[@.]/g, '_');
  const conversationId = `conversation_${slugEmail}_${countryCode}`;
  
  const docRef = db.collection('conversations').doc(conversationId);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    await docRef.set({
      email,
      countryCode,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
      messageCount: 0
    });
  }
  
  return conversationId;
}

export async function getRecentHistory(conversationId: string, limit: number = 8): Promise<ChatMessage[]> {
  const db = admin.firestore();
  const messagesRef = db.collection('conversations').doc(conversationId).collection('messages');
  
  const snapshot = await messagesRef.orderBy('createdAt', 'desc').limit(limit).get();
  
  const messages: ChatMessage[] = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    messages.push({
      role: data.role as 'user' | 'assistant',
      content: data.content
    });
  });
  
  return messages.reverse();
}

export async function appendMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  costEUR?: number
): Promise<void> {
  const db = admin.firestore();
  const docRef = db.collection('conversations').doc(conversationId);
  const messagesRef = docRef.collection('messages');
  
  const messageData: any = {
    role,
    content,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  
  if (costEUR !== undefined) {
    messageData.costEUR = costEUR;
  }
  
  const batch = db.batch();
  batch.set(messagesRef.doc(), messageData);
  batch.update(docRef, {
    lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
    messageCount: admin.firestore.FieldValue.increment(1)
  });
  
  await batch.commit();
}
