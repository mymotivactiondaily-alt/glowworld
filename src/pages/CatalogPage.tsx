import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import type { Product, Translation } from '../types';

const TEAMS = ['Tous', 'France', 'Brésil', 'Argentine', 'Portugal', 'USA', 'Mexique', 'Canada', 'Espagne'] as const;

interface CatalogPageProps {
  onAddToCart: (p: Product) => void;
  t: Translation;
}

export const CatalogPage = ({ onAddToCart, t }: CatalogPageProps) => {
  const [filter, setFilter] = useState('Tous');
  const baseProducts = PRODUCTS.filter(p => p.id !== 'supporter-pack');
  const filtered = filter === 'Tous' ? baseProducts : baseProducts.filter((p) => p.team === filter);
  const canonicalUrl = window.location.origin + '/catalog';

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Helmet>
        <title>{t.seo_catalog_title}</title>
        <meta name="description" content={t.seo_catalog_desc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t.seo_catalog_title} />
        <meta property="og:description" content={t.seo_catalog_desc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">{t.shop}</h1>

        {/* Bonus Fan AI Companion */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-amber-400/30 bg-gradient-to-r from-blue-950/60 via-slate-900/60 to-red-950/60 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
            Inclus · {filtered.length > 0 ? filtered[0].team : ''}
          </div>
          <div className="flex items-start gap-5 flex-wrap mt-2">
            <div className="text-4xl">✦</div>
            <div className="flex-1 min-w-[260px]">
              <div className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                {t._lang === 'fr' ? 'Une IA dédiée à ton équipe' : t._lang === 'en' ? 'An AI dedicated to your team' : 'Una IA dedicada a tu equipo'}
              </div>
              <div className="text-sm text-white/70 leading-relaxed mb-3">
                {t._lang === 'fr' ? "Chaque bracelet débloque une mascotte IA exclusive, entraînée spécifiquement sur la culture football de ton pays. Pas une IA générique — une IA qui parle ta passion." : t._lang === 'en' ? "Each wristband unlocks an exclusive AI mascot, trained specifically on your country's football culture. Not a generic AI — one that speaks your passion." : "Cada pulsera desbloquea una mascota IA exclusiva, entrenada específicamente en la cultura futbolística de tu país. No una IA genérica — una que habla tu pasión."}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-amber-400/80 font-bold">
                ✦ Powered by Claude Haiku 4.5 — Anthropic
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {TEAMS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-6 py-2 rounded-full font-bold text-sm transition-all border',
                filter === f ? 'bg-white text-slate-950 border-white' : 'border-white/20 hover:border-white/50',
              )}
            >
              {f === 'Tous' ? (t._lang === 'fr' ? 'Tous' : t._lang === 'en' ? 'All' : 'Todos') : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} t={t} />
        ))}
      </div>
    </div>
  );
};
