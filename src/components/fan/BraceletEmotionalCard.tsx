import React from 'react';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface BraceletEmotionalCardProps {
  title: string;
  description: string;
  cta: string;
  image: string;
  primaryColor: string;
}

export const BraceletEmotionalCard: React.FC<BraceletEmotionalCardProps> = ({
  title,
  description,
  cta,
  image,
  primaryColor,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 my-4 overflow-hidden group transition-all hover:bg-white/15">
      <div className="flex gap-4 items-center">
        <div className="relative w-20 h-20 flex-shrink-0">
          <div 
            className="absolute inset-0 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          />
          <img 
            src={image} 
            alt={title} 
            className="relative w-full h-full object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
          <p className="text-white/60 text-xs mb-3 leading-relaxed">
            {description}
          </p>
          <button 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{ backgroundColor: primaryColor, color: '#fff' }}
          >
            <ShoppingCart size={12} />
            {cta}
            <ExternalLink size={10} className="ml-0.5 opacity-60" />
          </button>
        </div>
      </div>
    </div>
  );
};
