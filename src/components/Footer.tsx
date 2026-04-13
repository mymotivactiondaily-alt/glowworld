import { Link } from 'react-router-dom';
import { Zap, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import type { Translation } from '../types';

interface FooterProps {
  t: Translation;
}

export const Footer = ({ t }: FooterProps) => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="inline-block mb-6">
            <img 
              src="/images/logo_final.png" 
              alt="GlowWorld" 
              className="h-8 w-auto hover:opacity-80 transition-opacity" 
            />
          </Link>
          <p className="text-white/50 text-sm mb-6">
            {t._lang === 'fr'
              ? 'Vivez la Coupe du Monde 2026 comme jamais auparavant. La technologie au service de la passion.'
              : t._lang === 'en'
                ? 'Experience the 2026 World Cup like never before. Technology in the service of passion.'
                : 'Vive la Copa del Mundo 2026 como nunca antes. La tecnología al servicio de la pasión.'}
          </p>
          <div className="flex gap-4">
            <Instagram className="w-5 h-5 hover:text-france-blue cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-france-blue cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-france-blue cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Navigation</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/" className="hover:text-white">{t.home}</Link></li>
            <li><Link to="/catalog" className="hover:text-white">{t.shop}</Link></li>
            <li><Link to="/blog" className="hover:text-white">{t.blog}</Link></li>
            <li><Link to="/about" className="hover:text-white">{t.about}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/shipping" className="hover:text-white">
              {t._lang === 'fr' ? 'Livraison & Retours' : t._lang === 'en' ? 'Shipping & Returns' : 'Envío y Devoluciones'}
            </Link></li>
            <li><Link to="/partners" className="hover:text-white">{t.partners}</Link></li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
          <p className="text-sm text-white/50 mb-4">
            {t._lang === 'fr'
              ? 'Recevez les offres exclusives et les alertes matchs.'
              : t._lang === 'en'
                ? 'Get exclusive offers and match alerts.'
                : 'Recibe ofertas exclusivas y alertas de partidos.'}
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="votre@email.com"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-france-blue"
            />
            <button className="bg-france-blue p-2 rounded-lg hover:bg-blue-700 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-white/30">
        <div>© 2026 GLOWWORLD. {t._lang === 'fr' ? 'TOUS DROITS RÉSERVÉS.' : 'ALL RIGHTS RESERVED.'}</div>
        <div className="flex gap-8">
          <Link to="/legal" className="hover:text-white">
            {t._lang === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
          </Link>
          <Link to="/privacy" className="hover:text-white">
            {t._lang === 'fr' ? 'Confidentialité' : 'Privacy'}
          </Link>
          <Link to="/terms" className="hover:text-white">
            {t._lang === 'fr' ? 'CGV' : 'Terms'}
          </Link>
        </div>
      </div>
    </footer>
  );
};
