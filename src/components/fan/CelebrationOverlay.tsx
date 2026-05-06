import React, { useEffect, useState } from 'react';
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

    // SHAKE — Web Animations API directement sur le body
    document.body.animate([
      { transform: 'translate(0px, 0px)' },
      { transform: 'translate(-5px, 3px)' },
      { transform: 'translate(5px, -3px)' },
      { transform: 'translate(-4px, 4px)' },
      { transform: 'translate(4px, -2px)' },
      { transform: 'translate(-3px, 3px)' },
      { transform: 'translate(3px, -2px)' },
      { transform: 'translate(-2px, 1px)' },
      { transform: 'translate(0px, 0px)' },
    ], {
      duration: 700,
      easing: 'ease-out',
      fill: 'forwards',
    });

    setTimeout(() => {
      document.body.style.transform = '';
    }, 750);

    const emojis = ['⚽', '🎉', '⭐', '🏆', '✨', '🌟', '🎊', '💫'];
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 95,
      rotate: (Math.random() - 0.5) * 720,
      scale: 0.7 + Math.random() * 1.1,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      duration: 2.5 + Math.random() * 2,
      delay: Math.random() * 1.8,
    }));
    setParticles(newParticles);

    const t = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -60, rotate: 0, opacity: 1 }}
            animate={{
              y: '115vh',
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
    </div>
  );
};
