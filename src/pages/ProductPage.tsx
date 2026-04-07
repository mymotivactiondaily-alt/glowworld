import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Star, Globe, Zap, CheckCircle, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import type { Product, Translation } from '../types';

interface ProductPageProps {
  onAddToCart: (p: Product) => void;
  t: Translation;
}

export const ProductPage = ({ onAddToCart, t }: ProductPageProps) => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== id).slice(0, 3);
  const canonicalUrl = window.location.origin + `/product/${id}`;

  const [viewers, setViewers] = useState(Math.floor(Math.random() * 8) + 3);
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => Math.max(2, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl font-black mb-8">
          {t._lang === 'fr' ? 'Produit non trouvé' : t._lang === 'en' ? 'Product not found' : 'Producto no encontrado'}
        </h1>
        <Link to="/catalog" className="text-france-blue font-bold flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t._lang === 'fr' ? 'Retour au catalogue' : t._lang === 'en' ? 'Back to catalog' : 'Volver al catálogo'}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Helmet>
        <title>{product.name} | GlowWorld 2026</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image: [product.image],
            description: product.description,
            sku: product.id,
            brand: { '@type': 'Brand', name: 'GlowWorld' },
            offers: {
              '@type': 'Offer',
              url: canonicalUrl,
              priceCurrency: 'EUR',
              price: product.price,
              availability: 'https://schema.org/InStock',
            },
          })}
        </script>
      </Helmet>

      <Link
        to="/catalog"
        className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 font-bold uppercase text-xs tracking-widest transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t._lang === 'fr' ? 'Retour au catalogue' : t._lang === 'en' ? 'Back to catalog' : 'Volver al catálogo'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl sticky top-32"
        >
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className={cn(
                'px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest',
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
            <div className="flex items-center gap-2 bg-france-red/10 border border-france-red/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-france-red rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-france-red uppercase tracking-wider">
                {viewers} {t._lang === 'fr' ? 'personnes consultent ce produit' : t._lang === 'en' ? 'people are viewing this' : 'personas están viendo esto'}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">{product.name}</h1>

          <div className="flex items-center gap-4 mb-8">
            <p className="text-4xl font-black text-france-red">{product.price}€</p>
            <div className="flex flex-col">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                128 {t._lang === 'fr' ? 'avis vérifiés' : 'verified reviews'}
              </span>
            </div>
          </div>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">{product.longDescription || product.description}</p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">
                {t._lang === 'fr' ? 'Disponibilité' : 'Availability'}
              </span>
              <span className="text-xs font-bold text-france-red animate-pulse">
                {t._lang === 'fr' ? 'Plus que 12 exemplaires !' : 'Only 12 left in stock!'}
              </span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="h-full bg-france-red" />
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h3 className="font-black uppercase tracking-widest text-xs text-white/50">
              {t._lang === 'fr' ? 'Caractéristiques' : t._lang === 'en' ? 'Features' : 'Características'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <CheckCircle className="w-5 h-5 text-france-blue" />
                  <span className="text-sm font-bold">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-white text-slate-950 font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-france-blue hover:text-white transition-all neon-button flex items-center justify-center gap-3 shadow-2xl mb-8"
          >
            <ShoppingCart className="w-6 h-6" />
            {t._lang === 'fr' ? 'Ajouter au panier' : t._lang === 'en' ? 'Add to cart' : 'Añadir al carrito'}
          </button>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <Globe className="w-5 h-5 text-france-blue mx-auto mb-2" />
              <p className="text-[8px] font-black uppercase tracking-widest leading-tight">{t.shipping_info}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <Zap className="w-5 h-5 text-france-blue mx-auto mb-2" />
              <p className="text-[8px] font-black uppercase tracking-widest leading-tight">
                {t._lang === 'fr' ? 'Sync Bluetooth' : 'Bluetooth Sync'}
              </p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <CheckCircle className="w-5 h-5 text-france-blue mx-auto mb-2" />
              <p className="text-[8px] font-black uppercase tracking-widest leading-tight">{t.trust_badge}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center">
          {t._lang === 'fr' ? 'Questions Fréquentes' : t._lang === 'en' ? 'FAQ' : 'Preguntas Frecuentes'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              q: { fr: 'Est-ce que le bracelet est étanche ?', en: 'Is the wristband waterproof?', es: '¿Es la pulsera resistente al agua?' },
              a: { fr: "Oui, il est certifié IP67. Vous pouvez célébrer sous la pluie ou renverser votre boisson sans crainte.", en: 'Yes, it is IP67 certified. You can celebrate in the rain or spill your drink without worry.', es: 'Sí, cuenta con certificación IP67. Puedes celebrar bajo la lluvia o derramar tu bebida sin miedo.' },
            },
            {
              q: { fr: 'Quels sont les délais de livraison ?', en: 'What are the delivery times?', es: '¿Cuáles son los plazos de entrega?' },
              a: { fr: 'En raison de la forte demande pour la Coupe du Monde 2026, comptez 10 à 15 jours ouvrés pour recevoir votre commande. La livraison est entièrement gratuite et suivie.', en: 'Due to high demand for the 2026 World Cup, allow 10 to 15 business days to receive your order. Shipping is completely free and tracked.', es: 'Debido a la alta demanda para el Mundial 2026, cuenta con 10 a 15 días hábiles para recibir tu pedido. El envío es totalmente gratuito y seguido.' },
            },
            {
              q: { fr: "Quelle est l'autonomie de la batterie ?", en: 'What is the battery life?', es: '¿Cuál es la autonomía de la batería?' },
              a: { fr: 'La batterie dure environ 12 heures en utilisation continue (soit 4 à 5 matchs complets).', en: 'The battery lasts about 12 hours in continuous use (about 4 to 5 full matches).', es: 'La batería dura aproximadamente 12 horas en uso continuo (es decir, de 4 a 5 partidos completos).' },
            },
            {
              q: { fr: 'Comment se synchronise-t-il ?', en: 'How does it synchronize?', es: '¿Cómo se sincroniza?' },
              a: { fr: 'Via Bluetooth 5.3 avec notre application GlowWorld. La latence est inférieure à 0.1 seconde.', en: 'Via Bluetooth 5.3 with our GlowWorld app. Latency is less than 0.1 seconds.', es: 'A través de Bluetooth 5.3 con nuestra aplicación GlowWorld. La latencia es inferior a 0,1 segundos.' },
            },
            {
              q: { fr: 'Fonctionne-t-il pour tous les matchs ?', en: 'Does it work for all matches?', es: '¿Funciona para todos los partidos?' },
              a: { fr: 'Oui, tous les matchs de la Coupe du Monde 2026 sont supportés en temps réel.', en: 'Yes, all 2026 World Cup matches are supported in real-time.', es: 'Sí, todos los partidos de la Copa del Mundo 2026 son compatibles en tiempo real.' },
            },
          ].map((faq, i) => (
            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="font-bold mb-2 text-france-blue">? {faq.q[t._lang as keyof typeof faq.q]}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{faq.a[t._lang as keyof typeof faq.a]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <section>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">
          {t._lang === 'fr' ? 'Vous aimerez aussi' : t._lang === 'en' ? 'You might also like' : 'También te gustará'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} t={t} />
          ))}
        </div>
      </section>
    </div>
  );
};
