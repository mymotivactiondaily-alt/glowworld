import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingCart, Menu, X, Zap, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Lang, Translation } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
}

export const Navbar = ({ cartCount, onOpenCart, lang, setLang, t }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-france-blue rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter glow-text">
            GLOWWORLD<span className="text-france-red">2026</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold uppercase text-sm tracking-widest">
          <Link to="/" className="hover:text-france-blue transition-colors">{t.home}</Link>
          <Link to="/catalog" className="hover:text-france-blue transition-colors">{t.shop}</Link>
          <Link to="/app" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
            <Smartphone className="w-4 h-4" /> {t.download_app}
          </Link>
          <Link to="/blog" className="hover:text-france-blue transition-colors">{t.blog}</Link>
          <Link to="/about" className="hover:text-france-blue transition-colors">{t.about}</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {(['fr', 'en', 'es'] as Lang[]).map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && <span className="text-white/20 text-[10px]">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-3 py-1 text-[10px] font-bold transition-all uppercase',
                    lang === l ? 'bg-france-blue text-white rounded-full' : 'text-white/40 hover:text-white/80',
                  )}
                >
                  {l}
                </button>
              </React.Fragment>
            ))}
          </div>
          <button onClick={onOpenCart} className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-france-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">{t.home}</Link>
            <Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">{t.shop}</Link>
            <Link to="/app" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-amber-400">{t.download_app}</Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">{t.blog}</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">{t.about}</Link>
            <div className="flex gap-3 pt-4 border-t border-white/10">
              {(['fr', 'en', 'es'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setIsMobileMenuOpen(false); }}
                  className={cn(
                    'px-4 py-2 rounded-full border text-xs font-bold uppercase transition-all',
                    lang === l ? 'bg-france-blue border-france-blue text-white' : 'border-white/20 text-white/50',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
