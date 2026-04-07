import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => (
  <div className="pt-40 pb-24 px-6 max-w-3xl mx-auto text-center">
    <h1 className="text-8xl font-black text-france-blue glow-text mb-4">404</h1>
    <p className="text-2xl font-bold mb-2">Page introuvable</p>
    <p className="text-white/50 mb-12">La page que vous cherchez n'existe pas ou a été déplacée.</p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 bg-france-blue text-white font-black px-10 py-4 rounded-full uppercase tracking-widest hover:bg-blue-700 transition-all"
    >
      <ArrowLeft className="w-5 h-5" />
      Retour à l'accueil
    </Link>
  </div>
);
