import { Helmet } from 'react-helmet-async';
import { Zap, Smartphone } from 'lucide-react';
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
          ? "GlowWorld est né d'une idée simple : rendre l'expérience de la Coupe du Monde encore plus immersive. Nous croyons que le sport est plus qu'un jeu, c'est une émotion partagée. Nos bracelets intelligents utilisent la technologie Bluetooth pour connecter les supporters du monde entier."
          : t._lang === 'en'
            ? "GlowWorld was born from a simple idea: make the World Cup experience even more immersive. We believe sport is more than a game, it's a shared emotion. Our smart wristbands use Bluetooth technology to connect fans worldwide."
            : 'GlowWorld nació de una idea simple: hacer que la experiencia de la Copa del Mundo sea aún más inmersiva. Creemos que el deporte es más que un juego, es una emoción compartida. Nuestras pulseras inteligentes utilizan tecnología Bluetooth para conectar a los aficionados de todo el mundo.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
        <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
          <Zap className="w-10 h-10 text-france-blue mb-4" />
          <h3 className="text-xl font-bold mb-2">{t.tech_title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{t.tech_desc}</p>
        </div>
        <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
          <Smartphone className="w-10 h-10 text-france-blue mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {t._lang === 'fr' ? 'Application Intuitive' : t._lang === 'en' ? 'Intuitive App' : 'Aplicación Intuitiva'}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            {t._lang === 'fr'
              ? "Une interface simple pour gérer vos bracelets, choisir votre équipe et recevoir des notifications de buts en temps réel."
              : t._lang === 'en'
                ? 'A simple interface to manage your wristbands, choose your team, and receive real-time goal notifications.'
                : 'Una interfaz sencilla para gestionar tus pulseras, elegir tu equipo y recibir notificaciones de goles en tiempo real.'}
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
