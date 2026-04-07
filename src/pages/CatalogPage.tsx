import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import type { Product, Translation } from '../types';

const TEAMS = ['Tous', 'France', 'Brésil', 'Argentine', 'Portugal', 'USA', 'Mexique', 'Canada', 'Pack'] as const;

interface CatalogPageProps {
  onAddToCart: (p: Product) => void;
  t: Translation;
}

export const CatalogPage = ({ onAddToCart, t }: CatalogPageProps) => {
  const [filter, setFilter] = useState('Tous');
  const filtered = filter === 'Tous' ? PRODUCTS : PRODUCTS.filter((p) => p.team === filter);
  const canonicalUrl = window.location.origin + '/catalog';

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Catalogue | GlowWorld 2026</title>
        <meta name="description" content="Découvrez notre collection de bracelets LED pour toutes les nations de la Coupe du Monde 2026. France, Brésil, Argentine et plus !" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Catalogue | GlowWorld 2026" />
        <meta property="og:description" content="Découvrez notre collection de bracelets LED pour toutes les nations de la Coupe du Monde 2026." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">{t.shop}</h1>
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
