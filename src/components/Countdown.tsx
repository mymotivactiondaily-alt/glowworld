import { useState, useEffect } from 'react';
import type { Translation } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

interface CountdownProps {
  t: Translation;
}

export const Countdown = ({ t }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(SITE_CONFIG.launchDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {[
        { label: t._lang === 'fr' ? 'Jours' : t._lang === 'en' ? 'Days' : 'Días', value: timeLeft.days },
        { label: t._lang === 'fr' ? 'Heures' : t._lang === 'en' ? 'Hours' : 'Horas', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Sec', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-3xl md:text-5xl font-black text-france-blue glow-text">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/50">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
