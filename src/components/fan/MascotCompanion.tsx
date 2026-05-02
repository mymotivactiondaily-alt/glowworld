import React, { useState, useEffect } from 'react';
import { MascotConfig, CountryKey } from '../../config/mascotConfig';
import { MascotState } from '../../hooks/useMascotChat';
import './MascotAnimations.css';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface MascotCompanionProps {
  mascot: MascotConfig;
  state: MascotState;
  onClick: () => void;
  onQuickReply: (text: string) => void;
  isVisible: boolean;
}

export const MascotCompanion: React.FC<MascotCompanionProps> = ({ 
  mascot, 
  state, 
  onClick, 
  onQuickReply,
  isVisible 
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200); // Blink duration
      const nextInterval = Math.random() * (8000 - 4000) + 4000;
      blinkTimer = setTimeout(triggerBlink, nextInterval);
    };
    blinkTimer = setTimeout(triggerBlink, 5000);
    return () => clearTimeout(blinkTimer);
  }, []);

  useEffect(() => {
    if (!isVisible || state !== 'idle') {
      setShowBubble(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isVisible, state]);

  if (!isVisible && state === 'idle') return null;

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 35, 149';
  };

  const primaryRgb = hexToRgb(mascot.primaryColor);

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"
      style={{ '--mascot-primary-rgb': primaryRgb } as React.CSSProperties}
    >
      {/* Interaction Bubble */}
      {showBubble && state === 'idle' && (
        <div className="mb-4 flex flex-col items-end animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-auto">
           <div 
             className="glass-panel p-5 rounded-[2rem] rounded-br-none border-l-4 shadow-2xl max-w-[280px] relative"
             style={{ borderLeftColor: mascot.primaryColor }}
           >
              <p className="text-white text-sm font-bold leading-relaxed mb-4">
                {mascot.welcomeMessage}
              </p>
              
              <div className="flex flex-col gap-2 mb-5">
                {mascot.quickReplies.map((reply, i) => (
                  <button 
                    key={i}
                    onClick={() => onQuickReply(reply)}
                    className="group flex items-center justify-between text-left px-4 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs text-white/90 transition-all hover:translate-x-1"
                  >
                    <span>{reply}</span>
                    <MessageSquare size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              <button 
                onClick={onClick}
                className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(var(--mascot-primary-rgb),0.3)] active:scale-95 shadow-lg"
                style={{ backgroundColor: mascot.primaryColor, color: '#fff' }}
              >
                {mascot.ctaOpenChat}
                <ArrowRight size={14} />
              </button>

              {/* Tail */}
              <div 
                className="absolute -bottom-2 right-0 w-6 h-6 glass-panel border-b-2 border-r-2 transform rotate-45 z-[-1]"
                style={{ borderColor: 'transparent', borderRightColor: 'rgba(255,255,255,0.1)', borderBottomColor: 'rgba(255,255,255,0.1)' }}
              />
           </div>
        </div>
      )}

      {/* Mascot Container */}
      <div 
        className={`mascot-companion-container relative w-28 h-28 md:w-36 md:h-36 pointer-events-auto cursor-pointer
          ${state === 'idle' ? 'mascot-state-idle' : ''}
          ${state === 'speaking' ? 'mascot-state-speaking' : ''}
          ${state === 'celebrating' ? 'mascot-state-celebrating' : ''}
        `}
        onClick={onClick}
      >
        <div className="mascot-halo" />
        
        {/* Blinking eyes simulation layer (Correction 2) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
           <div 
             className={`absolute left-[22%] right-[22%] rounded-md transition-opacity duration-150 ${isBlinking ? 'opacity-95' : 'opacity-0'}`} 
             style={{ 
               top: '32%', 
               height: '14%', 
               backgroundColor: 'rgba(15, 23, 42, 0.85)' 
             }} 
           />
        </div>

        <img 
          src={mascot.image} 
          alt={mascot.name}
          className="w-full h-full object-contain drop-shadow-2xl"
          draggable={false}
        />

        {state === 'speaking' && (
          <div className="absolute -top-2 -right-2 flex space-x-1.5 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
            <div className="ai-loader-dot" />
            <div className="ai-loader-dot" />
            <div className="ai-loader-dot" />
          </div>
        )}
      </div>
    </div>
  );
};
