import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Zap } from 'lucide-react';

const NAMES = ['Thomas', 'Sophie', 'Jean', 'Marco', 'Elena', 'Lucas', 'Mateo', 'Hans', 'Yuki', 'Diego', 'Chloe', 'Liam'];
const LOCATIONS = [
  { city: 'Paris', team: 'France', code: 'fr' },
  { city: 'Bruxelles', team: 'Pack Hôte', code: 'be' },
  { city: 'Genève', team: 'France', code: 'ch' },
  { city: 'Montréal', team: 'Canada', code: 'ca' },
  { city: 'Madrid', team: 'Espagne', code: 'es' },
  { city: 'New York', team: 'USA', code: 'us' },
  { city: 'Londres', team: 'Pack Famille', code: 'gb' },
  { city: 'Berlin', team: 'Allemagne', code: 'de' },
  { city: 'Rome', team: 'Pack Duo', code: 'it' },
  { city: 'Amsterdam', team: 'Pays-Bas', code: 'nl' },
  { city: 'Lyon', team: 'Argentine', code: 'fr' },
  { city: 'Toronto', team: 'Canada', code: 'ca' },
  { city: 'Miami', team: 'Mexique', code: 'us' },
];

export const SocialProof = () => {
  const [visible, setVisible] = useState(false);
  const [purchase, setPurchase] = useState({ name: 'Thomas', city: 'Paris', team: 'France', code: 'fr' });

  useEffect(() => {
    const interval = setInterval(() => {
      const loc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      setPurchase({
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        city: loc.city,
        team: loc.team,
        code: loc.code,
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed bottom-6 left-6 z-[100] bg-slate-900 border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[280px] max-w-sm"
        >
          <div className="w-12 h-12 bg-france-blue rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold">
              {purchase.name} de {purchase.city}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[10px] text-white/50">Vient de commander l'édition {purchase.team}</p>
              <img
                src={`https://flagcdn.com/w20/${purchase.code}.png`}
                alt={purchase.team}
                className="w-4 h-auto rounded-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] text-france-blue font-bold mt-1">Il y a quelques instants</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
