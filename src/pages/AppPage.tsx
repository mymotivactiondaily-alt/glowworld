import { Smartphone, Zap } from 'lucide-react';
import type { Translation } from '../types';

interface AppPageProps {
  t: Translation;
}

export const AppPage = ({ t }: AppPageProps) => {
  return (
    <div className="pt-40 pb-24 px-6 max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">
        {t._lang === 'fr' ? "Télécharger l'App GlowWorld" : t._lang === 'en' ? 'Download GlowWorld App' : 'Descargar App GlowWorld'}
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button className="w-full md:w-64 bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Available on</p>
            <p className="text-xl font-bold">App Store</p>
          </div>
        </button>
        <button className="w-full md:w-64 bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Get it on</p>
            <p className="text-xl font-bold">Google Play</p>
          </div>
        </button>
      </div>
    </div>
  );
};
