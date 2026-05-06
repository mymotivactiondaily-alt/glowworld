import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'motion/react';
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
  isMinimized?: boolean;
}

export const MascotCompanion: React.FC<MascotCompanionProps> = ({ 
  mascot, 
  state, 
  onClick, 
  onQuickReply,
  isVisible,
  isMinimized 
}) => {
  const [showBubble, setShowBubble] = useState(false);
  const [celebEmojis, setCelebEmojis] = useState<{id: number, emoji: string, x: number}[]>([]);

  // Flip Y
  const flipY = useMotionValue(0);

  // Eye tracking
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const smoothEyeX = useSpring(eyeX, { stiffness: 80, damping: 20 });
  const smoothEyeY = useSpring(eyeY, { stiffness: 80, damping: 20 });

  // Scroll tilt
  const tilt = useMotionValue(0);
  const smoothTilt = useSpring(tilt, { stiffness: 60, damping: 18 });

  // Idle bob (y position)
  const bobY = useMotionValue(0);

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

  // 3a. Eye tracking — suit la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = document.querySelector('.mascot-companion-container');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      eyeX.set(dx * 15);
      eyeY.set(dy * 15);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeX, eyeY]);

  // 3b. Scroll tilt
  useEffect(() => {
    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      tilt.set((ratio - 0.5) * 16); // ±8°
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tilt]);

  // 3c. Idle bob — animation infinie 5 keyframes
  useEffect(() => {
    if (state !== 'idle') return;
    const controls = animate(bobY, [0, -6, 0, -4, 0], {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return () => controls.stop();
  }, [state, bobY]);

  // Célébration (flip Y + emojis)
  useEffect(() => {
    if (state !== 'celebrating') return;
    
    // Flip Y aléatoire gauche-droite
    animate(flipY, [0, 180, 0], {
      duration: 0.5,
      repeat: 5,
      ease: 'easeInOut',
    });

    // Pop d'emojis
    const emojis = ['⚽', '🎉', '🔥', '🏆', '⭐'];
    const particles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: (Math.random() - 0.5) * 80,
    }));
    setCelebEmojis(particles);
    const t = setTimeout(() => setCelebEmojis([]), 2000);
    return () => clearTimeout(t);
  }, [state, flipY]);

  // Inclinaison en écoute
  useEffect(() => {
    if (state === 'listening') {
      animate(tilt, 8, { 
        type: 'spring', 
        stiffness: 120, 
        damping: 10 
      });
    } else if (state === 'idle') {
      animate(tilt, 0, { 
        type: 'spring', 
        stiffness: 80, 
        damping: 15 
      });
    }
  }, [state, tilt]);

  if (!isVisible) return null;

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
      {showBubble && state === 'idle' && !isMinimized && (
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
        className={`mascot-companion-container relative pointer-events-auto cursor-pointer transition-all duration-300
          ${isMinimized ? 'w-14 h-14 opacity-85' : 'w-28 h-28 md:w-36 md:h-36'}
          ${!isMinimized && state === 'idle' ? 'mascot-state-idle' : ''}
          ${!isMinimized && state === 'speaking' ? 'mascot-state-speaking' : ''}
          ${!isMinimized && state === 'celebrating' ? 'mascot-state-celebrating' : ''}
        `}
        onClick={onClick}
      >
        <div className="mascot-halo" />

        <motion.div
          style={{
            x: smoothEyeX,
            y: bobY,          // idle bob
            rotate: smoothTilt,
            rotateY: flipY,
            width: '100%',
            height: '100%',
          }}
          whileTap={{ scale: 0.85, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
        >
          <img
            src={mascot.image}
            alt={mascot.name}
            className="w-full h-full object-contain drop-shadow-2xl"
            draggable={false}
          />
        </motion.div>

        {state === 'speaking' && (
          <div className="absolute -top-2 -right-2 flex space-x-1.5 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
            <div className="ai-loader-dot" />
            <div className="ai-loader-dot" />
            <div className="ai-loader-dot" />
          </div>
        )}

        {celebEmojis.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: 0, x: p.x }}
            animate={{ opacity: 0, y: -60 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute top-0 left-1/2 text-2xl pointer-events-none z-30"
            style={{ marginLeft: p.x }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
