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
        <div className="mb-8 p-5 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-red-950/40 backdrop-blur-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✦</span>
              <span className="text-xs font-black uppercase tracking-widest text-white/80">
                Bonus inclus
              </span>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-base font-bold text-white">
                Accès exclusif à la Fan Zone IA
              </div>
              <div className="text-sm text-white/60 mt-1">
                Chaque bracelet débloque une mascotte conversationnelle 
                dédiée à ton équipe — propulsée par Claude Haiku 4.5.
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
              Powered by Claude · Anthropic
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
