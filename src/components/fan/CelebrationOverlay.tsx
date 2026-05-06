import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  rotate: number;
  scale: number;
  emoji: string;
  duration: number;
  delay: number;
}

interface CelebrationOverlayProps {
  active: boolean;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ active }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    // SHAKE — directement sur le body
    document.body.animate([
      { transform: 'translate(0px, 0px)' },
      { transform: 'translate(-6px, 4px)' },
      { transform: 'translate(6px, -4px)' },
      { transform: 'translate(-5px, 5px)' },
      { transform: 'translate(5px, -3px)' },
      { transform: 'translate(-4px, 3px)' },
      { transform: 'translate(4px, -2px)' },
      { transform: 'translate(-2px, 1px)' },
      { transform: 'translate(0px, 0px)' },
    ], {
      duration: 800,
      easing: 'ease-out',
      fill: 'forwards',
    });

    setTimeout(() => {
      document.body.style.transform = '';
    }, 850);

    const emojis = ['⚽', '🎉', '⭐', '🏆', '✨', '🌟', '🎊', '💫'];
    const newParticles: Particle[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      rotate: (Math.random() - 0.5) * 720,
      scale: 0.7 + Math.random() * 1.2,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    const t = setTimeout(() => setParticles([]), 6000);
    return () => clearTimeout(t);
  }, [active]);

  // PORTAL → injecte directement dans document.body, hors de toute hiérarchie
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 999999,
      }}
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -80, rotate: 0, opacity: 1 }}
            animate={{
              y: '120vh',
              rotate: p.rotate,
              opacity: [1, 1, 1, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeIn',
            }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: 0,
              fontSize: `${1.2 + p.scale}rem`,
              userSelect: 'none',
              transform: `scale(${p.scale})`,
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};
