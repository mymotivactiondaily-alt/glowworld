import { useState, useEffect, useRef, useCallback } from 'react';
import { MASCOT_CONFIG, CountryKey, COUNTRY_TO_BACKEND_CODE } from '../config/mascotConfig';

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

  // Load history on first open
  const historyLoaded = useRef(false);
  useEffect(() => {
    if (isOpen && !historyLoaded.current && email && fanToken) {
      loadHistory();
      historyLoaded.current = true;
    }
  }, [isOpen, email, fanToken]);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/fan-chat/history?email=${encodeURIComponent(email)}&countryCode=${backendCode}&fanToken=${encodeURIComponent(fanToken)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.history && Array.isArray(data.history)) {
          setMessages(data.history.map((m: any, i: number) => ({
            id: `hist-${i}`,
            role: m.role,
            content: m.content,
            timestamp: m.timestamp || Date.now()
          })));
        }
      }
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setIsLoading(false);
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
    if (!content.trim() || isLoading) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setMascotState('speaking');

    const asstMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: asstMsgId, role: 'assistant', content: '', timestamp: Date.now() }]);

    try {
      const res = await fetch(`${API_BASE_URL}/api/fan-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          countryCode: backendCode,
          fanToken,
          message: userMsg.content
        })
      });

      if (res.status === 429) {
        const data = await res.json();
        setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: data.error } : m));
        setIsLoading(false);
        setMascotState('idle');
        return;
      }

      if (!res.ok) {
        setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: "Désolé, j'ai eu un problème technique." } : m));
        setIsLoading(false);
        setMascotState('idle');
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      let fullContent = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE standard: events are separated by double newline
        const parts = buffer.split('\n\n');
        
        // The last part might be incomplete, keep it in the buffer
        buffer = parts.pop() || "";

        for (const part of parts) {
          const lines = part.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.substring(6).trim();
              if (!jsonStr) continue;
              
              try {
                const data = JSON.parse(jsonStr);
                if (data.type === 'chunk') {
                  fullContent += data.content;
                  setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: fullContent } : m));
                } else if (data.type === 'error') {
                  setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: data.message } : m));
                } else if (data.type === 'done') {
                  // Finalizing if needed
                }
              } catch (e) {
                console.warn("SSE JSON Parse error (fragmented?):", e, jsonStr);
              }
            }
          }
        }
      }

      // Check for celebration keywords in the response
      const keywords = mascot?.celebrationKeywords || [];
      const hasCelebration = keywords.some(k => 
        new RegExp(`\\b${k}\\b`, 'i').test(fullContent)
      );

      if (hasCelebration) {
        setMascotState('celebrating');
        setTimeout(() => setMascotState('idle'), 3000);
      } else {
        setMascotState('idle');
      }

    } catch (error) {
      console.error("Stream error", error);
      setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: "La connexion a été perdue." } : m));
      setMascotState('idle');
    } finally {
      setIsLoading(false);
    }
  }, [email, backendCode, fanToken, isLoading]);

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
