import React, { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';

interface UrgencyConfig {
  flag: string;
  region: string;
  deadline: string;
  deadlineLabel: string;
}

const URGENCY_DATA: Record<string, UrgencyConfig> = {
  FR: { flag: '🇫🇷', region: 'France', deadline: '2026-06-01', deadlineLabel: '1er juin' },
  EU: { flag: '🇪🇺', region: 'Europe', deadline: '2026-05-31', deadlineLabel: '31 mai' },
  US: { flag: '🇺🇸', region: 'USA', deadline: '2026-05-28', deadlineLabel: '28 mai' },
  CA: { flag: '🇨🇦', region: 'Canada', deadline: '2026-05-28', deadlineLabel: '28 mai' },
  MX: { flag: '🇲🇽', region: 'Mexique', deadline: '2026-05-28', deadlineLabel: '28 mai' },
  BR: { flag: '🇧🇷', region: 'Brésil', deadline: '2026-05-24', deadlineLabel: '24 mai' },
  AR: { flag: '🇦🇷', region: 'Argentine', deadline: '2026-05-24', deadlineLabel: '24 mai' },
  PT: { flag: '🇵🇹', region: 'Portugal', deadline: '2026-05-31', deadlineLabel: '31 mai' },
};

const detectRegion = (): UrgencyConfig => {
  const lang = navigator.language.toUpperCase();
  if (lang.includes('FR')) return URGENCY_DATA.FR;
  if (lang.includes('PT-BR')) return URGENCY_DATA.BR;
  if (lang.includes('PT')) return URGENCY_DATA.PT;
  if (lang.includes('ES-AR')) return URGENCY_DATA.AR;
  if (lang.includes('ES-MX')) return URGENCY_DATA.MX;
  if (lang.includes('EN-CA')) return URGENCY_DATA.CA;
  if (lang.includes('EN-US') || lang.includes('EN')) return URGENCY_DATA.US;
  if (lang.includes('ES') || lang.includes('IT') || lang.includes('DE') || lang.includes('NL')) {
    return URGENCY_DATA.EU;
  }
  return URGENCY_DATA.FR;
};

export const UrgencyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [config] = useState<UrgencyConfig>(detectRegion());

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const deadline = new Date(config.deadline);
      const diff = deadline.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };
    calculate();
    const interval = setInterval(calculate, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [config]);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('urgency_banner_dismissed');
    if (wasDismissed === 'true') setDismissed(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('urgency_banner_dismissed', 'true');
  };

  if (dismissed || daysLeft <= 0) return null;

  const isCritical = daysLeft <= 3;

  return (
    <div
      className={`sticky top-0 z-[60] w-full transition-all ${
        isCritical
          ? 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse'
          : 'bg-gradient-to-r from-[#002395] via-[#ED2939] to-[#002395]'
      }`}
      role="alert"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-white text-sm md:text-base font-bold">
        <Clock size={16} className="animate-spin-slow shrink-0" />
        <span className="text-xl shrink-0">{config.flag}</span>
        <p className="text-center leading-tight">
          <span className="hidden md:inline">{config.region} — </span>
          <span>Commandez avant le </span>
          <span className="font-black underline decoration-yellow-300 decoration-2 underline-offset-2">
            {config.deadlineLabel}
          </span>
          <span> pour recevoir avant le </span>
          <span className="font-black text-yellow-300">11 juin</span>
          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
            J-{daysLeft}
          </span>
        </p>
        <button
          onClick={handleDismiss}
          className="ml-auto shrink-0 w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-all"
          aria-label="Fermer"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
