import { Translation } from '../types';
import { Truck, Info, Calendar, MapPin, Mail, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../config/siteConfig';

interface ShippingPageProps {
  t: Translation;
}

export const ShippingPage = ({ t }: ShippingPageProps) => {
  const shippingData = [
    { country: '🇫🇷 France', standard: '6-9 jours', express: '3-5 jours' },
    { country: '🇧🇪 Belgique', standard: '7-10 jours', express: '4-6 jours' },
    { country: '🇨🇭 Suisse', standard: '7-10 jours', express: '4-6 jours' },
    { country: '🇬🇧 Royaume-Uni', standard: '7-9 jours', express: '3-5 jours' },
    { country: '🇩🇪 Allemagne', standard: '8-10 jours', express: '5-8 jours' },
    { country: '🇮🇹 Italie', standard: '7-10 jours', express: '5-8 jours' },
    { country: '🇺🇸 USA', standard: '7-10 jours', express: '5-8 jours' },
    { country: '🇨🇦 Canada', standard: '7-9 jours', express: '5-7 jours' },
    { country: '🇪🇸 Espagne', standard: '7-10 jours', express: '5-8 jours' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24 px-6">
      <Helmet>
        <title>Livraison & Expédition | GlowWorld 2026</title>
        <meta name="description" content="Informations sur les délais de livraison et l'expédition de vos bracelets LED GlowWorld 2026." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            Livraison & <span className="text-[#002395]">Expédition</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Tous nos bracelets sont expédiés directement depuis notre entrepôt partenaire à <span className="text-white font-bold">Hong Kong</span> via <span className="text-[#002395] font-bold">Shipbear</span>, l'un des leaders mondiaux du dropshipping express.
          </p>
        </header>

        {/* Shipping Table */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="w-8 h-8 text-[#002395]" />
            <h2 className="text-3xl font-black uppercase tracking-tight italic" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              Délais de livraison par pays
            </h2>
          </div>
          
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-sm">Pays</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-sm">Livraison Standard</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-sm text-[#002395]">Livraison Express</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {shippingData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{row.country}</td>
                      <td className="px-6 py-4 text-white/60">{row.standard}</td>
                      <td className="px-6 py-4 font-bold text-[#002395] flex items-center gap-2">
                        <Zap className="w-3 h-3 fill-current" />
                        {row.express}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Important Info */}
          <section className="bg-slate-900 p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-[#002395]" />
              <h2 className="text-2xl font-black uppercase italic" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Informations importantes
              </h2>
            </div>
            <ul className="space-y-4 text-white/70">
              <li className="flex gap-3">
                <span className="text-[#002395] font-bold">•</span>
                Les commandes sont traitées sous 24-48h ouvrées
              </li>
              <li className="flex gap-3">
                <span className="text-[#002395] font-bold">•</span>
                Un numéro de suivi est envoyé par email dès l'expédition
              </li>
              <li className="flex gap-3">
                <span className="text-[#002395] font-bold">•</span>
                Les délais sont comptés en jours ouvrés à partir de l'expédition
              </li>
              <li className="flex gap-3">
                <span className="text-[#002395] font-bold">•</span>
                Les délais peuvent varier selon la période (forte demande pendant la Coupe du Monde)
              </li>
            </ul>
          </section>

          {/* World Cup Guarantee */}
          <section className="bg-[#ED2939]/10 p-8 rounded-3xl border border-[#ED2939]/30 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Calendar className="w-32 h-32 text-[#ED2939]" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#ED2939]" />
              <h2 className="text-2xl font-black uppercase italic text-[#ED2939]" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Coupe du Monde 2026 ⚽
              </h2>
            </div>
            <p className="text-lg font-bold leading-tight">
              {t._lang === 'fr' ? (
                <>
                  Toutes les commandes passées avant le <span className="text-[#ED2939]">{SITE_CONFIG.deliveryGuaranteeDate.fr}</span> sont garanties livrées avant le coup d'envoi du <span className="text-[#ED2939]">{SITE_CONFIG.launchDateDisplay.fr}</span>.
                </>
              ) : t._lang === 'en' ? (
                <>
                  All orders placed before <span className="text-[#ED2939]">{SITE_CONFIG.deliveryGuaranteeDate.en}</span> are guaranteed to be delivered before the kickoff on <span className="text-[#ED2939]">{SITE_CONFIG.launchDateDisplay.en}</span>.
                </>
              ) : (
                <>
                  Todos los pedidos realizados antes del <span className="text-[#ED2939]">{SITE_CONFIG.deliveryGuaranteeDate.es}</span> están garantizados para ser entregados antes del inicio del <span className="text-[#ED2939]">{SITE_CONFIG.launchDateDisplay.es}</span>.
                </>
              )}
            </p>
          </section>
        </div>

        {/* Tracking & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[#002395]" />
              <h3 className="text-xl font-black uppercase italic" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Suivi de commande
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Vous recevrez un email de confirmation avec votre numéro de suivi dès l'expédition de votre commande. Vous pourrez suivre votre colis en temps réel sur le site du transporteur.
            </p>
          </section>

          <section className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-[#002395]" />
              <h3 className="text-xl font-black uppercase italic" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Contact
              </h3>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Pour toute question concernant votre livraison :
            </p>
            <a href="mailto:contact@glowworld2026.com" className="text-lg font-bold hover:text-[#002395] transition-colors">
              contact@glowworld2026.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};
