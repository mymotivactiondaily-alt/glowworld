import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import type { Translation } from '../types';

interface BlogPostPageProps {
  t: Translation;
}

export const BlogPostPage = ({ t }: BlogPostPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <h1 className="text-4xl font-black mb-8">
          {t._lang === 'fr' ? 'Article non trouvé' : t._lang === 'en' ? 'Article not found' : 'Artículo no encontrado'}
        </h1>
        <Link to="/blog" className="inline-flex items-center gap-2 text-france-blue font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t._lang === 'fr' ? 'Retour au blog' : t._lang === 'en' ? 'Back to blog' : 'Volver al blog'}
        </Link>
      </div>
    );
  }

  const canonicalUrl = window.location.origin + `/blog/${post.slug}`;
  const similarPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'GlowWorld' },
    publisher: { '@type': 'Organization', name: 'GlowWorld' },
    description: post.excerpt,
  };

  return (
    <div className="pt-20 pb-24">
      <Helmet>
        <title>{post.title} | Blog GlowWorld</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 z-20 flex items-end pb-12 px-6">
          <div className="max-w-4xl mx-auto w-full">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t.blog}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-france-blue rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
              <span className="text-white/60 text-xs font-bold">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-france-blue flex items-center justify-center font-bold text-xl">G</div>
          <div>
            <div className="font-bold">{post.author}</div>
            <div className="text-xs text-white/40">
              {post.readTime} {t._lang === 'fr' ? 'de lecture' : t._lang === 'en' ? 'read' : 'de lectura'}
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-white/70 leading-relaxed mb-6">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* Similar Posts */}
        <div className="mt-24 pt-24 border-t border-white/10">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">
            {t._lang === 'fr' ? 'Articles similaires' : t._lang === 'en' ? 'Similar articles' : 'Artículos similares'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {similarPosts.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-bold group-hover:text-france-blue transition-colors">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
