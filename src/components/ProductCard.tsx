import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Trophy, CheckCircle, Flame, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Product, Translation } from '../types';
import { LAUNCH_OFFER_ACTIVE, REGULAR_PRICE, REGULAR_PACK_PRICE } from '../constants';
import { MASCOT_CONFIG, CountryKey } from '../config/mascotConfig';

const TEAM_TO_MASCOT_KEY: Record<string, CountryKey> = {
  'France': 'france',
  'Brésil': 'brazil',
  'Argentine': 'argentina',
  'Portugal': 'portugal',
  'Espagne': 'spain',
  'USA': 'usa',
  'Mexique': 'mexico',
  'Canada': 'canada'
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  t: Translation;
  key?: string | number;
}

export const ProductCard = ({ product, onAddToCart, t }: ProductCardProps) => {
  const currentLang = (t._lang as 'fr' | 'en' | 'es') || 'fr';
  const localizedName = product.name[currentLang] || product.name.fr;
  const localizedDesc = product.description[currentLang] || product.description.fr;
  
  const isPack = product.team === 'Pack' || product.id.startsWith('pack-');
  const regularPrice = isPack ? REGULAR_PACK_PRICE : REGULAR_PRICE;

  const mascotKey = product.team !== 'Pack' ? TEAM_TO_MASCOT_KEY[product.team] : null;
  const mascot = mascotKey ? MASCOT_CONFIG[mascotKey] : null;

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: localizedName,
    image: product.image,
    description: localizedDesc,
    brand: { '@type': 'Brand', name: 'GlowWorld' },
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: 'EUR',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '128',
    },
  };

  return (
    <motion.div whileHover={{ y: -10 }} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 group">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div className="relative aspect-square overflow-hidden">
        {mascot && (
          <div className="absolute top-4 right-4 z-20">
            <div className="relative">
              <img 
                src={mascot.image} 
                alt={mascot.name} 
                className="w-12 h-12 object-cover rounded-full border-2 shadow-lg bg-slate-900" 
                style={{ borderColor: mascot.primaryColor }} 
              />
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-amber-400 border border-amber-500 rounded text-[7px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-0.5 shadow-md">
                <Sparkles className="w-2 h-2" /> IA
              </div>
            </div>
          </div>
        )}
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={`${localizedName} - Bracelet LED GlowWorld2026`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {LAUNCH_OFFER_ACTIVE && (
            <span className="bg-france-red text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20 animate-pulse">
              <Flame className="w-3 h-3 text-yellow-300" />
              {t.launch_offer_badge}
            </span>
          )}
          <span
            className={cn(
              'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit',
              product.team === 'France'
                ? 'bg-france-blue'
                : product.team === 'Brésil'
                  ? 'bg-yellow-500 text-black'
                  : product.team === 'Argentine'
                    ? 'bg-sky-400 text-black'
                    : 'bg-white/20',
            )}
          >
            {product.team}
          </span>
          {product.team === 'France' && (
            <span className="bg-france-red text-white text-[8px] font-black px-2 py-1 rounded-full w-fit">
              {t.stock_limited} (-15)
            </span>
          )}
          {product.isPremium && (
            <span className="bg-amber-500 text-slate-900 text-[8px] font-black px-2 py-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] flex items-center gap-1 w-fit">
              <Trophy className="w-2.5 h-2.5" /> {t.premium_edition}
            </span>
          )}
          <span className="bg-black/80 backdrop-blur-sm text-white text-[8px] font-black px-2 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow-lg w-fit">
            <span className="text-amber-400">✦</span>
            IA {product.team} incluse
          </span>
        </div>
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent transition-opacity",
          product.isAvailable ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}>
          <button
            onClick={() => product.isAvailable && onAddToCart(product)}
            disabled={!product.isAvailable}
            className={cn(
              "w-full font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors",
              product.isAvailable 
                ? "bg-white text-slate-950 hover:bg-france-blue hover:text-white" 
                : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.isAvailable 
              ? (t._lang === 'fr' ? 'Ajouter au panier' : t._lang === 'en' ? 'Add to cart' : 'Añadir al carrito')
              : (t._lang === 'fr' ? 'Bientôt disponible' : t._lang === 'en' ? 'Coming Soon' : 'Próximamente')
            }
          </button>
        </div>
      </div>
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold mb-1 hover:text-france-blue transition-colors">{localizedName}</h3>
        </Link>
        {mascot && (
          <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {t.mascot_included}
          </div>
        )}
        <p className="text-white/60 text-sm mb-4 line-clamp-2">{localizedDesc}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {LAUNCH_OFFER_ACTIVE && (
              <span className="text-xs text-white/40 line-through font-bold">{regularPrice}€</span>
            )}
            <span className="text-2xl font-black text-france-red">{product.price}€</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
