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
