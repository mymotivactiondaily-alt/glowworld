import React, { useRef, useEffect, useState } from 'react';
import { MascotConfig } from '../../config/mascotConfig';
import { Message } from '../../hooks/useMascotChat';
import { Send, X, Trash2 } from 'lucide-react';


const ConfettiBurst = () => {
  const [particles, setParticles] = useState<{ id: number, x: string, y: string, color: string }[]>([]);
  
  useEffect(() => {
    const colors = ['#FFD700', '#FF4500', '#00BFFF', '#32CD32', '#FF69B4'];
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: `${(Math.random() - 0.5) * 400}px`,
      y: `${-Math.random() * 300}px`,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[70]">
      {particles.map(p => (
        <div 
          key={p.id}
          className="confetti-particle"
          style={{ 
            '--tw-translate-x': p.x, 
            '--tw-translate-y': p.y,
            backgroundColor: p.color,
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            transform: `rotate(${Math.random() * 360}deg)`
          } as any}
        />
      ))}
    </div>
  );
};

interface MascotChatPanelProps {
  mascot: MascotConfig;
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
  onClearHistory: () => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  mascotState: string;
}

export const MascotChatPanel: React.FC<MascotChatPanelProps> = ({
  mascot,
  messages,
  isLoading,
  onClose,
  onSendMessage,
  onClearHistory,
  inputValue,
  setInputValue,
  mascotState
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (mascot.inputSuggestions?.length) {
      const random = mascot.inputSuggestions[Math.floor(Math.random() * mascot.inputSuggestions.length)];
      setPlaceholder(random);
    }
  }, [mascot.inputSuggestions, messages.length]);

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-[420px] md:h-[650px] z-[60] flex flex-col glass-panel md:rounded-[3rem] overflow-hidden animate-panel-slide-up shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
      {/* Celebration Overlay */}
      {mascotState === 'celebrating' && <ConfettiBurst />}

      {/* Header: Dark Glass Style (Correction 7) */}
      <div 
        className="relative flex items-center justify-between px-6 py-5 z-20 bg-[#0F172A]/80 backdrop-blur-[20px] border-b border-white/5"
        style={{ borderBottomColor: `${mascot.primaryColor}33` }}
      >
        <div className="flex flex-col">
          <h3 className="font-black text-xl leading-tight tracking-tight text-white">{mascot.name}</h3>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
             <p className="text-[10px] font-bold opacity-50 text-white uppercase tracking-widest">{mascot.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={onClearHistory}
            className="p-2 hover:bg-white/10 rounded-xl transition-all opacity-40 hover:opacity-100 hover:scale-105 active:scale-95"
            title={mascot.deleteButtonText}
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all hover:scale-105 active:scale-95 text-white/80 hover:text-white"
            aria-label={mascot.closeButtonAriaLabel}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-900/60 to-slate-950/90 custom-scrollbar">
        {/* Bottom Left Mascot Watermark (Correction 9) */}
        <div className="absolute bottom-8 left-6 w-48 h-48 pointer-events-none opacity-[0.03] grayscale dark:invert select-none z-0">
          <img src={mascot.image} alt="" className="w-full h-full object-contain" />
        </div>

        {/* Sticker Mascot (Correction 5) */}
        <div className={`absolute bottom-20 left-4 w-20 h-20 pointer-events-none z-10 transition-all duration-500 ${mascotState !== 'idle' ? 'scale-110' : 'scale-100'}`}>
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-20"
            style={{ backgroundColor: mascot.primaryColor }}
          />
          <img 
            src={mascot.image} 
            alt="" 
            className={`w-full h-full object-contain drop-shadow-xl ${mascotState === 'speaking' ? 'animate-pulse' : ''}`} 
          />
        </div>

        {messages.length === 0 && !isLoading && (
          <div className="relative flex flex-col items-center justify-center min-h-full text-center px-4 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 mb-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform">
               <img src={mascot.image} alt="welcome" className="w-16 h-16 drop-shadow-2xl" />
            </div>
            <h4 className="text-white font-bold mb-2">Bienvenue !</h4>
            <p className="text-sm text-white/50 italic leading-relaxed max-w-[240px]">
              {mascot.welcomeMessage}
            </p>
            
            <div className="w-full max-w-[320px] opacity-0 h-0 pointer-events-none">
              {/* Spacer/Marker for removal of conditional card */}
            </div>
          </div>
        )}
        
        {messages.map((m, idx) => (
          <React.Fragment key={m.id}>
            <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
              <div 
                className={`relative max-w-[85%] px-5 py-4 rounded-3xl shadow-xl border ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none border-white/10' 
                    : 'bg-white/10 backdrop-blur-md text-white rounded-tl-none border-white/5'
                }`}
                style={m.role === 'user' ? { backgroundColor: mascot.primaryColor } : {}}
              >
                <p className="text-[13px] leading-relaxed whitespace-pre-wrap font-medium">{m.content}</p>
                <span className="text-[9px] opacity-40 mt-2 block text-right font-bold tracking-tighter">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            
            {/* Removed conditional assistant card instance */}
          </React.Fragment>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl rounded-tl-none border border-white/10 shadow-lg">
              <div className="flex gap-1.5 py-1">
                <div className="ai-loader-dot" />
                <div className="ai-loader-dot" />
                <div className="ai-loader-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Persistent Bracelet Card (Fix 2) */}
      <div className="mx-6 mb-3 p-3 rounded-xl border flex items-center gap-4 transition-all hover:bg-white/5 relative z-10"
           style={{ 
             backgroundColor: `${mascot.primaryColor}1a`,
             borderColor: `${mascot.primaryColor}40`,
             backgroundImage: `linear-gradient(to right, ${mascot.primaryColor}0d, transparent)`
           }}>
        <div className="relative w-12 h-12 flex-shrink-0">
          <div 
            className="absolute inset-0 rounded-full blur-md opacity-30"
            style={{ backgroundColor: mascot.primaryColor }}
          />
          <img src={mascot.braceletCard.image} alt="" className="relative w-full h-full object-contain drop-shadow-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-[11px] leading-tight truncate">{mascot.braceletCard.title}</h4>
          <p className="text-white/50 text-[10px] leading-tight mb-1 truncate">{mascot.braceletCard.description}</p>
          <button className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors cursor-pointer">
            {mascot.braceletCard.cta} <span className="text-[12px]">→</span>
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-black/20 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-white/30 focus-within:bg-white/10 transition-all shadow-inner">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendMessage(inputValue)}
            placeholder={placeholder || mascot.inputPlaceholder}
            className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-white placeholder:text-white/30"
            disabled={isLoading}
          />
          <button 
            onClick={() => onSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-white transition-all hover:scale-105 active:scale-90 disabled:opacity-30 disabled:grayscale shadow-lg cursor-pointer"
            style={{ backgroundColor: mascot.primaryColor }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
