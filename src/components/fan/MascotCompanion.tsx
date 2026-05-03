import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll, useReducedMotion } from 'motion/react';
import { MascotConfig } from '../../config/mascotConfig';
import { MascotState } from '../../hooks/useMascotChat';
import './MascotAnimations.css';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface MascotCompanionProps {
  mascot: MascotConfig;
  state: MascotState;
  onClick: () => void;
  onQuickReply: (text: string) => void;
  isVisible: boolean;
  isChatOpen?: boolean;
}

const springConfig = { type: 'spring', stiffness: 300, damping: 20 };

export const MascotCompanion: React.FC<MascotCompanionProps> = ({ 
  mascot, 
  state, 
  onClick, 
  onQuickReply,
  isVisible,
  isChatOpen = false
}) => {
  const [showBubble, setShowBubble] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Eye tracking values
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  const lookX = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-8, 8]), { stiffness: 50, damping: 10 });
  const lookY = useSpring(useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-8, 8]), { stiffness: 50, damping: 10 });

  // Scroll Tilt
  const { scrollYProgress } = useScroll();
  const scrollTilt = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const tilt = useSpring(scrollTilt, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isVisible || state !== 'idle' || isChatOpen) {
      setShowBubble(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isVisible, state, isChatOpen]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 35, 149';
  };

  const primaryRgb = hexToRgb(mascot.primaryColor);

  const variants = {
    idle: {
      y: [0, -10, 0],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    speaking: {
      scale: [1, 1.05, 1],
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "linear"
      }
    },
    celebrating: {
      y: [0, -40, 0],
      scale: [1, 1.2, 1],
      rotate: [0, -15, 15, 0],
      transition: {
        duration: 0.6,
        repeat: 5,
        type: "spring",
        stiffness: 400
      }
    },
    listening: {
      scale: 1.1,
      y: -5,
      transition: springConfig
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"
      style={{ '--mascot-primary-rgb': primaryRgb } as React.CSSProperties}
    >
      <AnimatePresence>
        {showBubble && !isChatOpen && state === 'idle' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            whileHover={{ x: -10, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
            transition={springConfig}
            className="mb-4 flex flex-col items-end pointer-events-auto"
          >
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

                <div 
                  className="absolute -bottom-2 right-0 w-6 h-6 glass-panel border-b-2 border-r-2 transform rotate-45 z-[-1]"
                  style={{ borderColor: 'transparent', borderRightColor: 'rgba(255,255,255,0.1)', borderBottomColor: 'rgba(255,255,255,0.1)' }}
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        layout
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }}
        className="relative pointer-events-auto cursor-pointer will-change-transform"
        onClick={onClick}
      >
        <AnimatePresence>
          {state === 'celebrating' && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1.5, y: -60 }}
              exit={{ opacity: 0, scale: 0, y: -100 }}
              className="absolute left-1/2 -translate-x-1/2 text-4xl z-30"
            >
              {['🎉', '⚽', '🏆', '🔥'][Math.floor(Math.random() * 4)]}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={state}
          variants={variants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springConfig}
          style={{ rotate: shouldReduceMotion ? 0 : tilt }}
          className={isChatOpen ? 'w-16 h-16 md:w-20 md:h-20' : 'w-28 h-28 md:w-36 md:h-36'}
        >
          <div className="mascot-halo" />
          
          <motion.img 
            src={mascot.image} 
            alt={mascot.name}
            className="w-full h-full object-contain drop-shadow-2xl"
            draggable={false}
            layoutId="mascot-img"
            style={{ x: lookX, y: lookY }}
          />

          {state === 'speaking' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-2 flex space-x-1.5 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl"
            >
              <div className="ai-loader-dot" />
              <div className="ai-loader-dot" />
              <div className="ai-loader-dot" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
