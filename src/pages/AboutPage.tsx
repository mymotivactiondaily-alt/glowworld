import { Helmet } from 'react-helmet-async';
import { Zap, Mic2 } from 'lucide-react';
import type { Translation } from '../types';

interface AboutPageProps {
  t: Translation;
}

export const AboutPage = ({ t }: AboutPageProps) => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center">
      <Helmet>
        <title>{t.seo_about_title}</title>
        <meta name="description" content={t.seo_about_desc} />
        <link rel="canonical" href={window.location.origin + '/about'} />
        <meta property="og:title" content={t.seo_about_title} />
        <meta property="og:description" content={t.seo_about_desc} />
        <meta property="og:url" content={window.location.origin + '/about'} />
      </Helmet>
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">
        {t._lang === 'fr' ? 'Notre Mission' : t._lang === 'en' ? 'Our Mission' : 'Nuestra Misión'}
      </h1>
      <p className="text-xl text-white/70 leading-relaxed mb-12">
        {t._lang === 'fr'
          ? "GlowWorld est né d'une idée simple : rendre l'expérience de la Coupe du Monde encore plus immersive. Nos bracelets LED Sound Reactive détectent automatiquement l'ambiance autour de toi et s'illuminent à chaque cri, chaque but, chaque hymne. Pas d'app, pas de configuration — juste la magie de la lumière au service de ta passion."
          : t._lang === 'en'
            ? "GlowWorld was born from a simple idea: make the World Cup experience even more immersive. Our Sound Reactive LED wristbands automatically detect the atmosphere around you and light up with every cheer, every goal, every anthem. No app, no setup — just the magic of light serving your passion."
            : 'GlowWorld nació de una idea simple: hacer la experiencia del Mundial aún más inmersiva. Nuestras pulseras LED Sound Reactive detectan automáticamente el ambiente a tu alrededor y se iluminan con cada grito, cada gol, cada himno. Sin app, sin configuración — solo la magia de la luz al servicio de tu pasión.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
        <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
          <Zap className="w-10 h-10 text-france-blue mb-4" />
          <h3 className="text-xl font-bold mb-2">{t.tech_title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{t.tech_desc}</p>
        </div>
        <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
          <Mic2 className="w-10 h-10 text-france-blue mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {t._lang === 'fr' ? 'Capteurs Intelligents' : t._lang === 'en' ? 'Smart Sensors' : 'Sensores Inteligentes'}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            {t._lang === 'fr'
              ? "Une technologie de détection sonore et de mouvement ultra-précise qui réagit instantanément à l'ambiance du match sans aucune configuration complexe."
              : t._lang === 'en'
                ? 'Ultra-precise sound and motion detection technology that reacts instantly to the match atmosphere without any complex configuration.'
                : 'Tecnología de detección de sonido y movimiento ultra precisa que reacciona instantáneamente al ambiente del partido sin ninguna configuración compleja.'}
          </p>
        </div>
      </div>

      <img
        src="/images/led-wristbands-product.png"
        className="w-full rounded-3xl mb-12"
        alt="L'équipe GlowWorld préparant les bracelets LED pour la Coupe du Monde 2026"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
