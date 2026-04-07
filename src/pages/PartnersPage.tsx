import { Globe } from 'lucide-react';
import type { Translation } from '../types';

interface PartnersPageProps {
  t: Translation;
}

export const PartnersPage = ({ t }: PartnersPageProps) => (
  <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto prose prose-invert">
    <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">{t.partners}</h1>
    <p className="text-white/70 text-lg mb-12">
      {t._lang === 'fr'
        ? "GlowWorld collabore avec un réseau mondial de leaders technologiques et de spécialistes de l'événementiel pour garantir une expérience immersive sans précédent lors de la Coupe du Monde 2026."
        : t._lang === 'en'
          ? 'GlowWorld collaborates with a global network of technology leaders and event specialists to ensure an unprecedented immersive experience during the 2026 World Cup.'
          : 'GlowWorld colabora con una red global de líderes tecnológicos y especialistas en eventos para garantizar una experiencia inmersiva sin precedentes durante el Mundial 2026.'}
    </p>

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{t.logistics_title}</h2>
      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-white/70 leading-relaxed">{t.logistics_desc}</p>
        </div>
        <div className="w-full md:w-48 aspect-square bg-france-blue/20 rounded-2xl flex items-center justify-center border border-france-blue/30">
          <Globe className="w-20 h-20 text-france-blue animate-pulse" />
        </div>
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        {t._lang === 'fr' ? 'Nos Standards de Qualité' : t._lang === 'en' ? 'Our Quality Standards' : 'Nuestros Estándares de Calidad'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
        {[
          {
            t: t._lang === 'fr' ? 'Innovation LED' : 'LED Innovation',
            d: t._lang === 'fr' ? 'Composants de pointe pour une luminosité et une réactivité maximales.' : 'Cutting-edge components for maximum brightness and responsiveness.',
          },
          {
            t: t._lang === 'fr' ? 'Logistique Mondiale' : 'Global Logistics',
            d: t._lang === 'fr' ? 'Réseau de distribution optimisé pour une livraison fiable sur tous les continents.' : 'Optimized distribution network for reliable delivery across all continents.',
          },
          {
            t: t._lang === 'fr' ? 'Éco-Conception' : 'Eco-Design',
            d: t._lang === 'fr' ? 'Engagement vers des matériaux durables et des processus de fabrication responsables.' : 'Commitment to sustainable materials and responsible manufacturing processes.',
          },
          {
            t: t._lang === 'fr' ? 'Sécurité Bluetooth' : 'Bluetooth Security',
            d: t._lang === 'fr' ? 'Protocoles de connexion sécurisés et cryptés pour une synchronisation sans faille.' : 'Secure and encrypted connection protocols for seamless synchronization.',
          },
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="font-bold text-france-blue mb-2">{item.t}</h3>
            <p className="text-sm text-white/60">{item.d}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{t.production_title}</h2>
      <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/10">
        <p className="text-white/70 leading-relaxed italic">"{t.production_desc}"</p>
      </div>
    </section>

    <section className="p-8 bg-france-blue/10 rounded-3xl border border-france-blue/20 text-center">
      <h2 className="text-xl font-bold mb-4">
        {t._lang === 'fr' ? 'Devenir Partenaire ?' : t._lang === 'en' ? 'Become a Partner?' : '¿Convertirse en Socio?'}
      </h2>
      <p className="text-sm text-white/60 mb-6">
        {t._lang === 'fr'
          ? "Vous êtes un fabricant, un distributeur ou un organisateur d'événements ? Rejoignez l'aventure GlowWorld."
          : t._lang === 'en'
            ? 'Are you a manufacturer, distributor, or event organizer? Join the GlowWorld adventure.'
            : '¿Eres fabricante, distribuidor o organizador de eventos? Únete a la aventura GlowWorld.'}
      </p>
      <p className="text-xs font-bold text-france-blue uppercase tracking-widest">contact@glowworld2026.com</p>
    </section>
  </div>
);
