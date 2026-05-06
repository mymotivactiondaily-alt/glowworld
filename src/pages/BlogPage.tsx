import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';
import type { Translation } from '../types';

interface BlogPageProps {
  t: Translation;
}

export const BlogPage = ({ t }: BlogPageProps) => {
  const canonicalUrl = window.location.origin + '/blog';
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <Helmet>
        <title>{t.seo_blog_title}</title>
        <meta name="description" content={t.seo_blog_desc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t.seo_blog_title} />
        <meta property="og:description" content={t.seo_blog_desc} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">
        {t._lang === 'fr' ? 'Le Blog GlowWorld' : t._lang === 'en' ? 'GlowWorld Blog' : 'Blog GlowWorld'}
      </h1>

      {/* Pinned IA article */}
      <div className="mb-12 p-6 md:p-8 rounded-2xl border-2 border-amber-400/30 bg-gradient-to-br from-blue-950/40 via-slate-900/40 to-red-950/40 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
          ✦ {t._lang === 'fr' ? 'Épinglé' : t._lang === 'en' ? 'Pinned' : 'Fijado'}
        </div>
        <div className="text-amber-400 text-3xl mb-3">✦</div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
          Innovation · GlowWorld 2026
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
          {t._lang === 'fr' ? "8 mascottes IA, 8 cultures, 1 passion" : t._lang === 'en' ? "8 AI mascots, 8 cultures, 1 passion" : "8 mascotas IA, 8 culturas, 1 pasión"}
        </h2>
        <p className="text-white/60 mb-4 leading-relaxed">
          {t._lang === 'fr' ? "Découvre comment GlowWorld a développé une IA unique pour chaque nation — GAUL'O pour la France, ZICO pour le Brésil, DIEGO pour l'Argentine... Chaque mascotte connaît son équipe, son histoire, son folklore." : t._lang === 'en' ? "Discover how GlowWorld built a unique AI for each nation — GAUL'O for France, ZICO for Brazil, DIEGO for Argentina... Each mascot knows its team, its history, its folklore." : "Descubre cómo GlowWorld desarrolló una IA única para cada nación — GAUL'O para Francia, ZICO para Brasil, DIEGO para Argentina... Cada mascota conoce su equipo, su historia, su folclore."}
        </p>
        <div className="text-[10px] uppercase tracking-widest text-amber-400/80 font-bold">
          ✦ Powered by Claude Haiku 4.5 — Anthropic
        </div>
      </div>

      <div className="space-y-12">
        {BLOG_POSTS.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <motion.article whileHover={{ x: 10 }} className="flex flex-col md:flex-row gap-8 items-center group cursor-pointer mb-12">
              <div className="w-full md:w-1/3 aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={post.image}
                  alt={`${post.title} - Actualité GlowWorld 2026`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-france-red font-bold text-xs uppercase tracking-widest">{post.date}</span>
                  {post.category && <span className="text-white/30 text-[10px] uppercase tracking-widest">• {post.category}</span>}
                  {post.readTime && <span className="text-white/30 text-[10px] uppercase tracking-widest">• {post.readTime}</span>}
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-france-blue transition-colors">{post.title}</h2>
                <p className="text-white/60 mb-6">{post.excerpt}</p>
                <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                  {t._lang === 'fr' ? "Lire l'article" : t._lang === 'en' ? 'Read article' : 'Leer artículo'}{' '}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </div>
  );
};
