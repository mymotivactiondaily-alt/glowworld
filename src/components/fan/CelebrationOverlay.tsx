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
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Shake la page
    setShaking(true);
    setTimeout(() => setShaking(false), 800);

    // Génère 60 particules
    const emojis = ['⚽', '🎉', '⭐', '🏆', '✨', '🌟', '🎊', '💫'];
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,          // position % largeur écran
      rotate: (Math.random() - 0.5) * 720,
      scale: 0.6 + Math.random() * 1.2,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      duration: 2.5 + Math.random() * 2,
      delay: Math.random() * 1.5,
    }));
    setParticles(newParticles);

    // Nettoie après 5 secondes
    const t = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <>
      {/* Shake overlay — applique la vibration à tout le viewport */}
      <style>{`
        @keyframes celebShake {
          0%   { transform: translate(0, 0) rotate(0deg); }
          15%  { transform: translate(-4px, 2px) rotate(-0.5deg); }
          30%  { transform: translate(4px, -2px) rotate(0.5deg); }
          45%  { transform: translate(-3px, 3px) rotate(-0.3deg); }
          60%  { transform: translate(3px, -1px) rotate(0.3deg); }
          75%  { transform: translate(-2px, 2px) rotate(-0.2deg); }
          90%  { transform: translate(2px, -1px) rotate(0.1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .celeb-shake {
          animation: celebShake 0.8s ease-out;
        }
      `}</style>

      {/* Particules plein écran */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 9999 }}
      >
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: `${p.x}vw`,
                y: -80,
                rotate: 0,
                scale: p.scale,
                opacity: 1,
              }}
              animate={{
                y: '110vh',
                rotate: p.rotate,
                opacity: [1, 1, 1, 0.8, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeIn',
              }}
              style={{
                position: 'absolute',
                fontSize: `${1 + p.scale}rem`,
                userSelect: 'none',
              }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
