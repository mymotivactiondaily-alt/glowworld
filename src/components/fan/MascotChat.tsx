import React, { useState, useEffect, useRef } from 'react';
import { MASCOTS, CountryCode } from '../../config/mascotConfig';
import { Send, X, Trash2, Loader2, MessageCircle } from 'lucide-react';

interface MascotChatProps {
  countryCode: string;
  email: string;
  fanToken: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const MascotChat: React.FC<MascotChatProps> = ({ countryCode, email, fanToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showPhrase, setShowPhrase] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mascot = MASCOTS[countryCode as CountryCode];

  // Rotate catchphrases
  useEffect(() => {
    if (!mascot || isOpen) return;
    const interval = setInterval(() => {
      setShowPhrase(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % mascot.catchphrases.length);
        setShowPhrase(true);
      }, 500);
    }, 15000);
    return () => clearInterval(interval);
  }, [mascot, isOpen]);

  // Load history on open
  useEffect(() => {
    if (isOpen && messages.length === 0 && email && fanToken) {
      loadHistory();
    }
  }, [isOpen, email, fanToken]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/fan-chat/history?email=${encodeURIComponent(email)}&countryCode=${countryCode}&fanToken=${encodeURIComponent(fanToken)}`);
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
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer l'historique ?")) return;
    try {
      const res = await fetch('/api/fan-chat/history', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, countryCode, fanToken })
      });
      if (res.ok) {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to clear history", error);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const asstMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: asstMsgId, role: 'assistant', content: '', timestamp: Date.now() }]);

    try {
      const apiUrl = import.meta.env.VITE_FAN_CHAT_API_URL || '/api/fan-chat';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          countryCode,
          fanToken,
          message: userMsg.content
        })
      });

      if (res.status === 429) {
        const data = await res.json();
        setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: data.error } : m));
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: "Désolé, j'ai eu un problème technique." } : m));
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const textChunk = decoder.decode(value, { stream: true });
        const lines = textChunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.type === 'chunk') {
                setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: m.content + data.content } : m));
              } else if (data.type === 'error') {
                 setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: data.message } : m));
              } else if (data.type === 'done') {
                // Done stream
              }
            } catch (e) {
               // parse error on chunk boundary, handle gracefully if needed
            }
          }
        }
      }
    } catch (error) {
      console.error("Stream error", error);
      setMessages(prev => prev.map(m => m.id === asstMsgId ? { ...m, content: "La connexion a été perdue." } : m));
    } finally {
      setIsLoading(false);
    }
  };

  if (!mascot || !email || !fanToken) return null;

  return (
    <>
      <style>
        {`
          @keyframes breathe {
            0% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-4px) scale(1.02); }
            100% { transform: translateY(0px) scale(1); }
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .mascot-btn {
            animation: breathe 3.5s ease-in-out infinite;
          }
          .mascot-phrase {
            transition: opacity 0.5s ease;
          }
        `}
      </style>

      {/* Popup Chat */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '360px',
          height: '540px',
          backgroundColor: '#0a0f1e',
          borderRadius: '20px',
          border: `2px solid ${mascot.themeColor}`,
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: mascot.themeColor,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fff',
            fontWeight: 'bold',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={mascot.imagePath} alt={mascot.name} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white' }} />
              <span style={{ fontSize: '18px', letterSpacing: '1px' }}>{mascot.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
               <button onClick={clearHistory} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }} title="Effacer l'historique">
                 <Trash2 size={18} />
               </button>
               <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                 <X size={24} />
               </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#05080f'
          }}>
            {messages.length === 0 && !isLoading && (
              <div style={{ textAlign: 'center', color: '#6B7DB3', marginTop: 'auto', marginBottom: 'auto' }}>
                Dites bonjour à {mascot.name} !
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                backgroundColor: m.role === 'user' ? mascot.themeColor : '#1a2040',
                color: '#fff',
                padding: '10px 14px',
                borderRadius: '16px',
                borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '16px',
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                {m.content}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div style={{ alignSelf: 'flex-start', color: mascot.themeColor }}>
                <Loader2 size={20} className="animate-spin" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px',
            backgroundColor: '#0a0f1e',
            borderTop: `1px solid ${mascot.themeColor}40`,
            display: 'flex',
            gap: '8px'
          }}>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Écris un message..."
              style={{
                flex: 1,
                backgroundColor: '#1a2040',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 16px',
                color: '#fff',
                outline: 'none'
              }}
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              style={{
                backgroundColor: mascot.themeColor,
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: (isLoading || !inputValue.trim()) ? 'not-allowed' : 'pointer',
                opacity: (isLoading || !inputValue.trim()) ? 0.6 : 1
              }}
            >
              <Send size={18} style={{ marginLeft: '2px' }} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Mascot Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
        {!isOpen && (
          <div className="mascot-phrase" style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '8px 14px',
            borderRadius: '16px',
            borderBottomRightRadius: '4px',
            fontWeight: 'bold',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            opacity: showPhrase ? 1 : 0,
            pointerEvents: 'none'
          }}>
            {mascot.catchphrases[phraseIndex]}
          </div>
        )}
        <div 
          className="mascot-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: mascot.themeColor,
            cursor: 'pointer',
            boxShadow: `0 0 20px ${mascot.themeColor}80`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '3px solid #fff'
          }}
        >
          <img src={mascot.imagePath} alt={mascot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </>
  );
};
