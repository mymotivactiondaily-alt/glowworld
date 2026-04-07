import { Zap, Globe, Trophy } from 'lucide-react';
import type { Translation } from '../types';

interface HowItWorksProps {
  t: Translation;
}

export const HowItWorks = ({ t }: HowItWorksProps) => {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">{t.how_title}</h2>
          <p className="text-white/50">
            {t._lang === 'fr'
              ? 'Trois étapes pour transformer votre salon en stade.'
              : t._lang === 'en'
                ? 'Three steps to turn your living room into a stadium.'
                : 'Tres pasos para convertir tu sala en un estadio.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: '01', title: t.how_step1_t, desc: t.how_step1_d, icon: Zap },
            { step: '02', title: t.how_step2_t, desc: t.how_step2_d, icon: Globe },
            { step: '03', title: t.how_step3_t, desc: t.how_step3_d, icon: Trophy },
          ].map((item, i) => (
            <div
              key={i}
              className="relative p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-france-blue transition-colors group"
            >
              <div className="text-6xl font-black text-white/5 absolute -top-6 -left-2 group-hover:text-france-blue/10 transition-colors">
                {item.step}
              </div>
              <item.icon className="w-10 h-10 text-france-blue mb-6" />
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
