import { useState, useEffect, useRef, useCallback } from 'react';
import { MASCOT_CONFIG, CountryKey, COUNTRY_TO_BACKEND_CODE } from '../config/mascotConfig';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type MascotState = 'idle' | 'speaking' | 'celebrating' | 'listening';

const API_BASE_URL = import.meta.env.VITE_FAN_CHAT_API_URL || '';

export const useMascotChat = (countryCode: string, email: string, fanToken: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  
  const mascot = MASCOT_CONFIG[countryCode as CountryKey];
  const backendCode = COUNTRY_TO_BACKEND_CODE[countryCode as CountryKey];

  // AbortController to cancel in-flight fetch on unmount
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Stable ref for isLoading to avoid stale closures in useCallback
  const isLoadingRef = useRef(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Load history on first open and listen for updates
  const historyLoaded = useRef(false);
  useEffect(() => {
    if (isOpen && !historyLoaded.current && email && fanToken && backendCode) {
      loadHistory();
      historyLoaded.current = true;
    }
    
    return () => {
      if (unsubscribeRef.current) {
        console.log('🔵 [FAN-CHAT] Unsubscribing from history listener');
        unsubscribeRef.current();
        unsubscribeRef.current = null;
        historyLoaded.current = false;
      }
    };
  }, [isOpen, email, fanToken, backendCode]);

  // Cleanup: abort any in-flight fetch on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  const loadHistory = () => {
    if (!email || !backendCode || !fanToken) return;

    try {
      setIsLoading(true);
      const conversationId = `conversation_${email.replace(/[@.]/g, '_')}_${backendCode}`;
      const messagesRef = collection(db, 'conversations', conversationId, 'messages');
      const q = query(messagesRef, orderBy('createdAt', 'asc'));

      console.log('🔵 [FAN-CHAT] Starting real-time history listener');
      unsubscribeRef.current = onSnapshot(q, (snapshot) => {
        const history: Message[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            role: data.role as 'user' | 'assistant',
            content: data.content,
            timestamp: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now()
          };
        });
        setMessages(history);
        // Only clear initial loading. Subsequent loading (during sendMessage) 
        // is managed by the sendMessage finally block.
        if (historyLoaded.current && !isLoadingRef.current) {
          setIsLoading(false);
        }
      }, (error) => {
        console.error("🔴 [FAN-CHAT] History listener error:", error);
        setIsLoading(false);
        isLoadingRef.current = false;
      });
    } catch (error) {
      console.error("🔴 [FAN-CHAT] Failed to initialize history listener:", error);
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  const clearHistory = async () => {
    if (!window.confirm(mascot?.deleteConfirmText || "Delete history?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/fan-chat/history`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, countryCode: backendCode, fanToken })
      });
      if (res.ok) {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to clear history", error);
    }
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoadingRef.current) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    isLoadingRef.current = true;
    setMascotState('listening');

    try {
      // Abort any previous in-flight request before starting a new one
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const res = await fetch(`${API_BASE_URL}/api/fan-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          countryCode: backendCode,
          fanToken,
          message: userMsg.content
        }),
        signal: controller.signal
      });

      if (res.status === 429) {
        const data = await res.json();
        // If rate limited, we can't rely on Firestore as the message wasn't created
        setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: data.error, timestamp: Date.now() }]);
        setIsLoading(false);
        isLoadingRef.current = false;
        setMascotState('idle');
        return;
      }

      if (!res.ok) {
        setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: "Désolé, j'ai eu un problème technique.", timestamp: Date.now() }]);
        setIsLoading(false);
        isLoadingRef.current = false;
        setMascotState('idle');
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) return;

      // We still consume the stream to know when it's done and trigger mascot states,
      // but the UI is updated via the Firestore onSnapshot listener.
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // We look for 'type: done' or content to update mascot state
        if (chunk.includes('"type":"chunk"')) {
           setMascotState('speaking');
        }
        
        // Accumulate to check for keywords at the end
        fullContent += chunk;
      }

      // Check for celebration keywords in the response
      const currentMascot = MASCOT_CONFIG[countryCode as CountryKey];
      const keywords = currentMascot?.celebrationKeywords || [];
      const hasCelebration = keywords.some(k => 
        new RegExp(`\\b${k}\\b`, 'i').test(fullContent)
      );

      if (hasCelebration) {
        setMascotState('celebrating');
        setTimeout(() => setMascotState('idle'), 3000);
      } else {
        setMascotState('idle');
      }

    } catch (error: any) {
      // Don't show error if the fetch was intentionally aborted (unmount/remount)
      if (error?.name === 'AbortError') {
        console.log('[useMascotChat] Fetch aborted (component unmounted)');
        return;
      }
      console.error("Stream error", error);
      // We don't manually append an error here because onSnapshot would likely show whatever was partially saved
      setMascotState('idle');
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [email, backendCode, fanToken, countryCode]);

  return {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    mascotState,
    setMascotState,
    sendMessage,
    clearHistory,
    mascot
  };
};

