import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie, Shield } from 'lucide-react';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gw-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gw-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('gw-cookie-consent', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-in slide-in-from-bottom">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600/20 p-3 rounded-xl shrink-0">
            <Cookie className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              Votre vie privée compte
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser les publicités.
              En cliquant « Tout accepter », vous consentez à leur utilisation.{' '}
              <Link to="/privacy" className="text-blue-400 underline hover:text-blue-300">
                Politique de confidentialité
              </Link>
            </p>

            {showDetails && (
              <div className="mt-4 bg-slate-800/50 rounded-xl p-4 text-sm text-white/50 space-y-2">
                <p><strong className="text-white/80">Essentiels :</strong> Navigation, panier, sécurité — toujours actifs.</p>
                <p><strong className="text-white/80">Analytics :</strong> Google Analytics (GA4) — mesure de l'audience anonymisée.</p>
                <p><strong className="text-white/80">Marketing :</strong> TikTok Pixel, Meta Pixel — publicités personnalisées.</p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm cursor-pointer"
              >
                Tout accepter
              </button>
              <button
                onClick={handleRefuse}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm cursor-pointer"
              >
                Refuser
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-white/40 hover:text-white/70 text-sm underline transition-colors cursor-pointer"
              >
                {showDetails ? 'Masquer les détails' : 'Personnaliser'}
              </button>
            </div>
          </div>
          <button
            onClick={handleRefuse}
            className="text-white/30 hover:text-white/60 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
