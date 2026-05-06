import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, Globe, Trophy, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Countdown } from '../components/Countdown';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import type { Product, Translation } from '../types';

interface HomePageProps {
  onAddToCart: (p: Product) => void;
  t: Translation;
}

export const HomePage = ({ onAddToCart, t }: HomePageProps) => {
  const canonicalUrl = window.location.origin + '/';

  return (
    <div className="pt-20">
      <Helmet>
        <title>{t.seo_home_title}</title>
        <meta name="description" content={t.seo_home_desc} />
        <meta name="keywords" content="bracelet led, coupe du monde 2026, world cup 2026, smart wristband, sound reactive" />
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
            alt="Stade de football rempli de supporters lors de la Coupe du Monde 2026"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1 bg-france-red rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
              {t._lang === 'fr' ? 'Coupe du Monde 2026' : t._lang === 'en' ? 'World Cup 2026' : 'Copa del Mundo 2026'}
            </span>

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
                {t.hero_desc_prefix}
                <span className="text-[#002395] glow-text drop-shadow-[0_0_10px_rgba(0,35,149,0.8)]">
                  {t.hero_desc_highlight}
                </span>
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

      {/* Mascot AI Section */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, rgba(0,35,149,0.15) 0%, rgba(237,41,57,0.08) 100%)', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '999px', marginBottom: '20px' }}>
            <span style={{ color: '#FFD700', fontSize: '14px' }}>✦</span>
            {t._lang === 'fr' ? 'Exclusif · 1 IA par pays' : t._lang === 'en' ? 'Exclusive · 1 AI per country' : 'Exclusivo · 1 IA por país'}
          </div>

          <h2 style={{ fontSize: '42px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', lineHeight: 1.1 }}>
            {t._lang === 'fr' ? (
              <>Découvre <span style={{ color: '#002395' }}>ta mascotte IA</span><br/>développée pour ton pays</>
            ) : t._lang === 'en' ? (
              <>Meet <span style={{ color: '#002395' }}>your AI mascot</span><br/>built for your nation</>
            ) : (
              <>Conoce <span style={{ color: '#002395' }}>tu mascota IA</span><br/>creada para tu país</>
            )}
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0 auto 40px', fontSize: '16px', lineHeight: 1.6 }}>
            {t._lang === 'fr' ? "Chaque pays a sa propre mascotte IA — entraînée sur sa culture football, ses joueurs, son histoire. GAUL'O parle des Bleus, ZICO connaît la Seleção, DIEGO incarne l'âme argentine. Aucune n'est interchangeable." : t._lang === 'en' ? "Each country has its own AI mascot — trained on its football culture, players, history. GAUL'O speaks for Les Bleus, ZICO knows the Seleção, DIEGO embodies the Argentine spirit. None are interchangeable." : "Cada país tiene su propia mascota IA — entrenada en su cultura futbolística, jugadores, historia. GAUL'O habla por Les Bleus, ZICO conoce a la Seleção, DIEGO encarna el alma argentina. Ninguna es intercambiable."}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', maxWidth: '900px', margin: '0 auto 40px' }}>
            {[
              { country: 'france', flag: '🇫🇷', name: 'GAUL\'O', role: 'Le coq tricolore', color: '#002395' },
              { country: 'brazil', flag: '🇧🇷', name: 'ZICO', role: 'O tucano', color: '#009C3B' },
              { country: 'usa', flag: '🇺🇸', name: 'STARZ', role: 'The eagle', color: '#B22234' },
              { country: 'argentina', flag: '🇦🇷', name: 'DIEGO', role: 'El gaucho', color: '#74ACDF' },
              { country: 'mexico', flag: '🇲🇽', name: 'TRI', role: 'El águila', color: '#006847' },
              { country: 'canada', flag: '🇨🇦', name: 'HOCK', role: 'The beaver', color: '#FF0000' },
              { country: 'portugal', flag: '🇵🇹', name: 'FADO', role: 'O galo', color: '#006600' },
              { country: 'spain', flag: '🇪🇸', name: 'TIKI', role: 'El toro', color: '#AA151B' },
            ].map(({ country, flag, name, role, color }) => (
              <Link key={country} to={`/fan/${country}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}40`, borderRadius: '14px', padding: '20px 8px', textDecoration: 'none', color: '#fff', transition: 'all 0.25s', position: 'relative' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${color}40`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${color}40`;
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}>
                <span style={{ fontSize: '36px', marginBottom: '4px' }}>{flag}</span>
                <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>{name}</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{role}</span>
              </Link>
            ))}
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
            <span style={{ color: '#FFD700' }}>✦</span>
            {t._lang === 'fr' ? 'Propulsé par' : t._lang === 'en' ? 'Powered by' : 'Impulsado por'}
            <span style={{ color: '#fff' }}>Claude Haiku 4.5 · Anthropic</span>
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
