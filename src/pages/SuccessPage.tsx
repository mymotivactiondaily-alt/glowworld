import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import type { Translation } from '../types';

interface SuccessPageProps {
  t: Translation;
}

export const SuccessPage = ({ t }: SuccessPageProps) => {
  useEffect(() => {
    trackEvent('purchase', {
      currency: 'EUR',
      transaction_id: 'T_' + Math.random().toString(36).substr(2, 9),
    });
  }, []);

  return (
    <div className="pt-40 pb-24 px-6 max-w-3xl mx-auto text-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">
        {t._lang === 'fr' ? 'Merci pour votre commande !' : t._lang === 'en' ? 'Thank you for your order!' : '¡Gracias por tu pedido!'}
      </h1>
      <p className="text-xl text-white/70 mb-12">
        {t._lang === 'fr'
          ? 'Un email de confirmation vient de vous être envoyé. Votre bracelet LED sera expédié sous 24h.'
          : t._lang === 'en'
            ? 'A confirmation email has been sent to you. Your LED wristband will be shipped within 24h.'
            : 'Se ha enviado un correo de confirmación. Tu pulsera LED será enviada en 24h.'}
      </p>
      <Link
        to="/"
        className="inline-block bg-france-blue text-white font-black px-10 py-4 rounded-full uppercase tracking-widest hover:bg-blue-700 transition-all"
      >
        {t._lang === 'fr' ? "Retour à l'accueil" : t._lang === 'en' ? 'Back to home' : 'Volver al inicio'}
      </Link>
    </div>
  );
};
