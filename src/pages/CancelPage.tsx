import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import type { Translation } from '../types';

interface CancelPageProps {
  t: Translation;
}

export const CancelPage = ({ t }: CancelPageProps) => (
  <div className="pt-40 pb-24 px-6 max-w-3xl mx-auto text-center">
    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
      <X className="w-10 h-10 text-white" />
    </div>
    <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">
      {t._lang === 'fr' ? 'Paiement annulé' : t._lang === 'en' ? 'Payment canceled' : 'Pago cancelado'}
    </h1>
    <p className="text-xl text-white/70 mb-12">
      {t._lang === 'fr'
        ? "Votre commande n'a pas été finalisée. Votre panier est toujours conservé."
        : t._lang === 'en'
          ? 'Your order was not finalized. Your cart is still saved.'
          : 'Tu pedido no fue finalizado. Tu carrito sigue guardado.'}
    </p>
    <Link
      to="/catalog"
      className="inline-block border border-white/20 text-white font-black px-10 py-4 rounded-full uppercase tracking-widest hover:bg-white/10 transition-all"
    >
      {t._lang === 'fr' ? 'Réessayer' : t._lang === 'en' ? 'Try again' : 'Reintentar'}
    </Link>
  </div>
);
