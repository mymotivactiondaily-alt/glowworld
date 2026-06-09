import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState as useStateMascot, useEffect as useEffectMascot } from 'react';
import { Zap, Globe, Trophy, CheckCircle, ArrowRight, Star, Sparkles, Brain, MessageSquare, BarChart3 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Countdown } from '../components/Countdown';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import type { Product, Translation } from '../types';

interface HomePageProps {
  onAddToCart: (p: Product) => void;
  t: Translation;
}

const MASCOT_DEMOS = [
  { country: 'france', flag: '🇫🇷', name: "GAUL'O", role: 'Le coq tricolore', message: "Cocorico camarade ! Mbappé est en feu depuis 3 matchs. On joue le Brésil demain — tu sais qu'on les a battus 1-0 en 2006 ? Allez les Bleus !", color: '#002395', image: '/images/mascots/gaulo.png' },
  { country: 'brazil', flag: '🇧🇷', name: 'ZICO', role: 'O tucano', message: "Ôi meu amigo! A Seleção tá afiada. Vinicius e Rodrygo prontos pra brilhar. Hexa tá chegando, vamos juntos!", color: '#009C3B', image: '/images/mascots/zico.png' },
  { country: 'argentina', flag: '🇦🇷', name: 'DIEGO', role: 'El gaucho', message: "¡Che amigo! La Albiceleste viene con todo. Messi nos guía como siempre. ¡Vamos por la gloria, hermano!", color: '#74ACDF', image: '/images/mascots/diego.png' },
  { country: 'usa', flag: '🇺🇸', name: 'STARZ', role: 'The eagle', message: "Hey buddy! USMNT is rolling — Pulisic is on fire and we're playing at home. This is OUR Football Summer. Let's go USA!", color: '#B22234', image: '/images/mascots/starz.png' },
  { country: 'mexico', flag: '🇲🇽', name: 'TRI', role: 'El águila', message: "¡Órale compadre! El Tri viene afilado. Lozano y Jiménez listos pa' la batalla. ¡Arriba México, vamos por todo!", color: '#006847', image: '/images/mascots/tri.png' },
  { country: 'canada', flag: '🇨🇦', name: 'HOCK', role: 'The beaver', message: "Hey buddy, eh! Canada Soccer is ready. Davies and Jonathan David lighting it up. We're hosting — let's make history!", color: '#FF0000', image: '/images/mascots/hock.png' },
  { country: 'portugal', flag: '🇵🇹', name: 'FADO', role: 'O galo', message: "Olá companheiro! A Selecção está pronta. Cristiano sempre afiado, Bernardo Silva mágico. Força Portugal, vamos juntos!", color: '#006600', image: '/images/mascots/fado.png' },
  { country: 'spain', flag: '🇪🇸', name: 'TIKI', role: 'El toro', message: "¡Hola amigo! La Roja viene con tiki-taka puro. Pedri, Rodri, Morata — el equipo está listo. ¡Vamos España, a por todo!", color: '#AA151B', image: '/images/mascots/tiki.png' },
];

const ChatBubbleDemo = ({ t }: { t: any }) => {
  const [idx, setIdx] = useStateMascot(0);

  useEffectMascot(() => {
    const interval = setInterval(() => {
      setIdx(prev => (prev + 1) % MASCOT_DEMOS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const m = MASCOT_DEMOS[idx];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t._lang === 'fr' ? 'Aperçu en direct' : t._lang === 'en' ? 'Live preview' : 'Vista previa en vivo'}
        </div>
      </div>
      <motion.div
        key={m.country}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative p-6 rounded-3xl backdrop-blur-md border-2 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${m.color}20 0%, rgba(15,23,42,0.8) 100%)`,
          borderColor: `${m.color}60`,
          boxShadow: `0 20px 50px ${m.color}30`,
        }}
      >
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
          <div className="text-3xl">{m.flag}</div>
          <div className="flex-1">
            <div className="font-black text-white text-lg leading-tight">{m.name}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{m.role}</span>
            </div>
          </div>
          <div className="px-2 py-1 bg-amber-400/10 border border-amber-400/30 rounded text-[9px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI
          </div>
        </div>
        <p className="text-white/90 text-base leading-relaxed font-medium italic">
          "{m.message}"
        </p>
      </motion.div>
      <div className="flex justify-center gap-1.5 mt-4">
        {MASCOT_DEMOS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${i === idx ? 'w-6 bg-amber-400' : 'w-1 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const KillerIASection = ({ t }: { t: any }) => (
  <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y border-amber-400/20">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,211,77,0.08)_0%,transparent_70%)]" />
    <div className="relative max-w-5xl mx-auto">

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-amber-300 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          {t._lang === 'fr' ? 'Une première mondiale' : t._lang === 'en' ? 'A world first' : 'Una primicia mundial'}
        </div>

        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.05] mb-6">
          {t._lang === 'fr' ? (
            <>Avant, pendant, après —<br/><span className="text-amber-300 glow-text">ta mascotte IA est là.</span></>
          ) : t._lang === 'en' ? (
            <>Before, during, after —<br/><span className="text-amber-300 glow-text">your AI mascot is there.</span></>
          ) : (
            <>Antes, durante, después —<br/><span className="text-amber-300 glow-text">tu mascota IA está ahí.</span></>
          )}
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          {t._lang === 'fr' ? (
            <>Pronostics avant le coup d'envoi, célébrations en direct, débrief après le coup de sifflet final. Une mascotte IA <strong className="text-white">développée pour ton pays</strong>, qui vibre avec toi tout le tournoi.</>
          ) : t._lang === 'en' ? (
            <>Predictions before kickoff, live celebrations, debrief after the final whistle. An AI mascot <strong className="text-white">built for your country</strong>, vibing with you all tournament long.</>
          ) : (
            <>Pronósticos antes del pitazo inicial, celebraciones en vivo, análisis tras el silbato final. Una mascota IA <strong className="text-white">creada para tu país</strong>, vibrando contigo todo el torneo.</>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-amber-300" />
          </div>
          <div className="text-sm font-black uppercase tracking-widest text-amber-300 mb-2">
            {t._lang === 'fr' ? 'Avant le match' : t._lang === 'en' ? 'Before the match' : 'Antes del partido'}
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            {t._lang === 'fr' ? "Compositions probables, pronostics, anecdotes joueurs, historique des confrontations. Ta mascotte chauffe l'ambiance comme un vrai pote." : t._lang === 'en' ? "Probable lineups, predictions, player stories, head-to-head history. Your mascot warms up the vibe like a real mate." : "Alineaciones probables, pronósticos, anécdotas de jugadores, historial de enfrentamientos. Tu mascota calienta el ambiente como un amigo."}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-amber-400/30 shadow-[0_0_30px_rgba(252,211,77,0.1)]">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-amber-300" />
          </div>
          <div className="text-sm font-black uppercase tracking-widest text-amber-300 mb-2">
            {t._lang === 'fr' ? 'Pendant le match' : t._lang === 'en' ? 'During the match' : 'Durante el partido'}
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            {t._lang === 'fr' ? "Ton bracelet réagit aux cris du salon. Les célébrations s'enchaînent en lumière, ta Fan Zone vibre avec toi." : t._lang === 'en' ? "Your wristband reacts to the room's shouts. Celebrations cascade in light, your Fan Zone vibes with you." : "Tu pulsera reacciona a los gritos del salón. Las celebraciones encadenan luces, tu Fan Zone vibra contigo."}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-amber-300" />
          </div>
          <div className="text-sm font-black uppercase tracking-widest text-amber-300 mb-2">
            {t._lang === 'fr' ? 'Après le match' : t._lang === 'en' ? 'After the match' : 'Después del partido'}
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            {t._lang === 'fr' ? "Débrief tactique, stats clés, moments forts, blagues sur l'arbitre. Le match continue dans le chat avec ta mascotte." : t._lang === 'en' ? "Tactical debrief, key stats, highlights, ref jokes. The match keeps going in the chat with your mascot." : "Análisis táctico, estadísticas clave, mejores momentos, bromas sobre el árbitro. El partido sigue en el chat con tu mascota."}
          </p>
        </div>
      </div>

      <ChatBubbleDemo t={t} />

      <div className="text-center mt-12">
        <Link to="/catalog" className="inline-flex items-center gap-3 px-8 py-4 bg-amber-400 text-slate-950 font-black uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all hover:scale-105 shadow-[0_0_30px_rgba(252,211,77,0.4)]">
          <Sparkles className="w-5 h-5" />
          {t._lang === 'fr' ? 'Découvre ton compagnon IA' : t._lang === 'en' ? 'Discover your AI companion' : 'Descubre tu compañero IA'}
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
          {t._lang === 'fr' ? '8 mascottes · 8 cultures · 0 IA générique' : t._lang === 'en' ? '8 mascots · 8 cultures · 0 generic AI' : '8 mascotas · 8 culturas · 0 IA genérica'}
        </div>
      </div>
    </div>
  </section>
);

export const HomePage = ({ onAddToCart, t }: HomePageProps) => {
  const canonicalUrl = window.location.origin + '/';
  const navigate = useNavigate();
  const [openMascot, setOpenMascot] = useStateMascot<string | null>(null);

  return (
    <div className="pt-20">
      <Helmet>
        <title>{t.seo_home_title}</title>
        <meta name="description" content={t.seo_home_desc} />
        <meta name="keywords" content="bracelet led, été du foot 2026, football summer 2026, smart wristband, sound reactive" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t.seo_home_title} />
        <meta property="og:description" content={t.seo_home_desc} />
        <meta property="og:image" content="/images/logo_final.png" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: 'GlowWorld',
            description: t.seo_home_desc,
            url: window.location.origin,
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/60 z-10" />
          <img
            src="/images/stadium-hero.png"
            className="w-full h-full object-cover scale-105"
            alt="Stade de football rempli de supporters lors de la l'Été du Foot 2026"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="inline-block px-4 py-1 bg-france-red rounded-full text-xs font-black uppercase tracking-[0.3em]">
                {t._lang === 'fr' ? 'l'Été du Foot 2026' : t._lang === 'en' ? 'the 2026 Football Summer' : 'el Verano del Fútbol 2026'}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1 bg-black/60 backdrop-blur-md border border-amber-400/40 rounded-full text-xs font-black uppercase tracking-[0.3em] text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded text-[9px] tracking-normal">AI</span>
                {t._lang === 'fr' ? 'Companion · 1 par pays' : t._lang === 'en' ? 'Companion · 1 per country' : 'Companion · 1 por país'}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-4 text-[#002395] uppercase tracking-widest">{t.h1_seo}</h1>

            <p className="text-white text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
              {t.hero_title} <br />
              <span className="text-[#002395] glow-text">{t.hero_subtitle}</span>
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-3xl mb-12 max-w-3xl mx-auto shadow-2xl"
            >
              <p className="text-xl md:text-2xl text-white font-bold leading-tight">
                {t._lang === 'fr' ? (
                  <>Le seul bracelet sound-reactive avec <span className="text-amber-300 glow-text drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]">une IA dédiée à TON équipe</span>. Avant, pendant, après le match — ta mascotte est là.</>
                ) : t._lang === 'en' ? (
                  <>The only sound-reactive wristband with <span className="text-amber-300 glow-text drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]">an AI dedicated to YOUR team</span>. Before, during, after the match — your mascot is there.</>
                ) : (
                  <>La única pulsera sound-reactive con <span className="text-amber-300 glow-text drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]">una IA dedicada a TU equipo</span>. Antes, durante, después del partido — tu mascota está ahí.</>
                )}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-france-red font-black uppercase tracking-widest text-[10px]">
                <Zap className="w-4 h-4 fill-current" />
                {t._lang === 'fr' ? 'Sound-Sync Technology — Réactif en 0.1 sec' : t._lang === 'en' ? 'Sound-Sync Technology — Reactive in 0.1 sec' : 'Sound-Sync Technology — Reactiva en 0.1 seg'}
              </div>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/catalog"
                className="w-full md:w-auto bg-white text-slate-950 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#002395] hover:text-white transition-all neon-button"
              >
                {t.hero_cta}
              </Link>
              <button className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all">
                <Globe className="w-5 h-5" />
                {t.hero_demo}
              </button>
            </div>

            <Countdown t={t} />
          </motion.div>
        </div>
      </section>

      {/* Killer IA Section */}
      <KillerIASection t={t} />

      {/* Trust Badges */}
      <section className="py-12 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Zap, text: t._lang === 'fr' ? 'Réactif au son en 0.1 sec' : t._lang === 'en' ? 'Sound reactive in 0.1 sec' : 'Reactiva al sonido en 0.1 seg' },
            { icon: Globe, text: t._lang === 'fr' ? 'Livraison Internationale Offerte' : t._lang === 'en' ? 'Free International Shipping' : 'Envío Internacional Gratis' },
            { icon: Trophy, text: t._lang === 'fr' ? '8 Éditions Nationales' : t._lang === 'en' ? '8 National Editions' : '8 Ediciones Nacionales' },
            { icon: CheckCircle, text: t._lang === 'fr' ? 'Garantie 2 ans' : t._lang === 'en' ? '2-Year Warranty' : 'Garantía 2 años' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
              <item.icon className="w-5 h-5 text-[#002395]" />
              <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mascots Catalog Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-950/20 via-slate-950 to-red-950/20 border-y border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/40 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {t._lang === 'fr' ? 'Choisis ton camp' : t._lang === 'en' ? 'Pick your side' : 'Elige tu bando'}
          </div>

          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
            {t._lang === 'fr' ? (
              <>8 mascottes IA, <span className="text-amber-300 glow-text">une seule passion</span></>
            ) : t._lang === 'en' ? (
              <>8 AI mascots, <span className="text-amber-300 glow-text">one passion</span></>
            ) : (
              <>8 mascotas IA, <span className="text-amber-300 glow-text">una pasión</span></>
            )}
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto mb-12 text-base md:text-lg">
            {t._lang === 'fr' ? "Chaque mascotte parle ta langue, connaît tes joueurs, vibre avec ta culture. Aucune n'est interchangeable." : t._lang === 'en' ? "Each mascot speaks your language, knows your players, vibes with your culture. None is interchangeable." : "Cada mascota habla tu idioma, conoce a tus jugadores, vibra con tu cultura. Ninguna es intercambiable."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {MASCOT_DEMOS.map((m) => (
              <div
                key={m.country}
                onClick={() => {
                  if (openMascot === m.country) {
                    navigate(`/fan/${m.country}`);
                  } else {
                    setOpenMascot(m.country);
                  }
                }}
                className="group relative flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 border-2 transition-all hover:scale-105 hover:bg-white/10 cursor-pointer"
                style={{ borderColor: `${m.color}40` }}
              >
                <div 
                  className={`absolute bottom-[calc(100%+15px)] left-1/2 -translate-x-1/2 w-[260px] max-w-[80vw] sm:w-[280px] sm:max-w-[90vw] bg-white text-slate-900 p-4 rounded-2xl shadow-2xl z-50 transition-opacity duration-300 ${openMascot === m.country ? 'opacity-100 pointer-events-auto' : 'opacity-0 md:group-hover:opacity-100 pointer-events-none md:group-hover:pointer-events-auto'}`}
                  style={{ border: `2px solid ${m.color}` }}
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" style={{ borderBottom: `2px solid ${m.color}`, borderRight: `2px solid ${m.color}` }}></div>
                  <p className="text-sm font-medium italic mb-3">"{m.message}"</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/fan/${m.country}`); }}
                    className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                  >
                    {t._lang === 'fr' ? 'Découvrir →' : t._lang === 'en' ? 'Discover →' : 'Descubrir →'}
                  </button>
                </div>

                <div className="relative mb-1">
                  <img src={m.image} alt={m.name} className="w-20 h-20 object-cover rounded-full" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: m.color }} />
                  <div className="absolute bottom-0 right-0 bg-white/80 rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-sm">{m.flag}</div>
                </div>
                <div className="font-black text-white text-base tracking-wide">{m.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{m.role}</div>
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-400/20 border border-amber-400/40 rounded text-[8px] font-black text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </div>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {t._lang === 'fr' ? 'Propulsé par' : t._lang === 'en' ? 'Powered by' : 'Impulsado por'}
            <span className="text-white">Claude Haiku 4.5 · Anthropic</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              {t._lang === 'fr' ? (
                <>Éditions <span className="text-[#ED2939]">Limitées</span></>
              ) : t._lang === 'en' ? (
                <>Limited <span className="text-[#ED2939]">Editions</span></>
              ) : (
                <>Ediciones <span className="text-[#ED2939]">Limitadas</span></>
              )}
            </h2>
            <p className="text-white/50 max-w-md">
              {t._lang === 'fr'
                ? 'Choisissez votre équipe et préparez-vous pour le plus grand spectacle de la planète.'
                : t._lang === 'en'
                  ? "Choose your team and get ready for the world's biggest show."
                  : 'Elige tu equipo y prepárate para el espectáculo más grande del planeta.'}
            </p>
          </div>
          <Link to="/catalog" className="group flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:text-[#002395]">
            {t._lang === 'fr' ? 'Voir tout le catalogue' : t._lang === 'en' ? 'View full catalog' : 'Ver todo el catálogo'}{' '}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} t={t} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-france-blue/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">
            {t._lang === 'fr' ? (
              <>Le <span className="text-[#002395]">stade</span> s'invite chez vous</>
            ) : t._lang === 'en' ? (
              <>The <span className="text-[#002395]">stadium</span> comes to you</>
            ) : (
              <>El <span className="text-[#002395]">estadio</span> llega a tu casa</>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Lucas M.',
                text:
                  t._lang === 'fr'
                    ? "Mon bracelet s'est illuminé au moment du but de Mbappé — il réagit automatiquement au son, c'est bluffant ! Une immersion totale."
                    : t._lang === 'en'
                      ? "My wristband lit up the moment Mbappé scored — it reacts automatically to sound, absolutely stunning! Total immersion."
                      : '¡Mi pulsera se iluminó en el momento en que Mbappé marcó — reacciona automáticamente al sonido, es increíble! Inmersión total.',
                team: 'France',
              },
              {
                name: 'Sofia R.',
                text:
                  t._lang === 'fr'
                    ? "J'ai commandé le Pack Duo pour mon fils et moi, on adore voir les bracelets s'illuminer ensemble lors des buts !"
                    : t._lang === 'en'
                      ? "Ordered the Duo Pack for my son and me, we love seeing the wristbands light up together during goals!"
                      : 'Pedí el Pack Dúo para mi hijo y yo, ¡nos encanta ver las pulseras iluminarse juntas con los goles!',
                team: 'Brésil',
              },
              {
                name: 'Marc D.',
                text:
                  t._lang === 'fr'
                    ? 'Qualité top, livraison ultra rapide. Prêt pour la CM2026 !'
                    : t._lang === 'en'
                      ? 'Top quality, ultra-fast delivery. Ready for WC2026!'
                      : 'Calidad superior, entrega ultrarrápida. ¡Listo para el Mundial 2026!',
                team: 'France',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-white/10 text-left relative">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-france-red text-france-red" />
                  ))}
                </div>
                <p className="text-lg italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">{testimonial.name[0]}</div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-xs text-white/40">
                      {t._lang === 'fr' ? 'Supporter' : t._lang === 'en' ? 'Fan' : 'Aficionado'} {testimonial.team}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
