'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Minus } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getSlugFolder } from '../lib/product-images';

interface ProductBeforeAfterProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const COMPARISONS: Record<string, { es: { before: string[]; after: string[] }; en: { before: string[]; after: string[] } }> = {
  halo: {
    es: { before: ['Cuesta dormir', 'Ronquidos constantes', 'Fatiga al despertar', 'Pareja despierta'], after: ['Sueño profundo', 'Silencio total', 'Energía real', 'Pareja descansa'] },
    en: { before: ['Hard to fall asleep', 'Constant snoring', 'Morning fatigue', 'Partner awake'], after: ['Deep sleep', 'Total silence', 'Real energy', 'Partner rests'] },
  },
  rest: {
    es: { before: ['Mente inquieta', 'No puedes desconectar', 'Silencio incómodo', 'Distracciones'], after: ['Relajación profunda', 'Te duermes en minutos', 'Audió envolvente', 'Descanso real'] },
    en: { before: ['Restless mind', 'Can\'t disconnect', 'Uncomfortable silence', 'Distractions'], after: ['Deep relaxation', 'Fall asleep in minutes', 'Immersive audio', 'Real rest'] },
  },
  cervical: {
    es: { before: ['Dolor cervical', 'Tensión acumulada', 'Rigidez', 'Malestar constante'], after: ['Alivio profundo', 'Relajación muscular', 'Movilidad mejorada', 'Comodidad'] },
    en: { before: ['Neck pain', 'Accumulated tension', 'Stiffness', 'Constant discomfort'], after: ['Deep relief', 'Muscle relaxation', 'Improved mobility', 'Comfort'] },
  },
  back: {
    es: { before: ['Postura encorvada', 'Dolor de espalda', 'Hombros caídos', 'Fatiga postural'], after: ['Postura recta', 'Sin dolor', 'Hombros alineados', 'Energía'] },
    en: { before: ['Hunched posture', 'Back pain', 'Drooping shoulders', 'Postural fatigue'], after: ['Straight posture', 'No pain', 'Aligned shoulders', 'Energy'] },
  },
};

export default function ProductBeforeAfter({ slug }: ProductBeforeAfterProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const folder = getSlugFolder(slug);
  const comparison = COMPARISONS[slug] ?? COMPARISONS.halo;

  return (
    <section className="mt-12 sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
            {isEs ? 'Antes / Después de Noctip' : 'Before / After Noctip'}
          </h2>
          <p className="mt-2 text-[13px] text-[#6b7785]">
            {isEs ? 'La diferencia que notarás.' : 'The difference you\'ll feel.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden"
          >
            <div className="p-4 sm:p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10">
                  <Minus size={14} className="text-red-400" />
                </div>
                <span className="text-[14px] font-bold text-red-400">
                  {isEs ? 'Antes de Noctip' : 'Before Noctip'}
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#080c12] mb-4">
                <img
                  src={`/images/${folder}/lifestyle/before.jpg`}
                  alt={isEs ? 'Antes de Noctip' : 'Before Noctip'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.ba-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'ba-placeholder flex items-center justify-center w-full h-full text-[#2a3448]';
                      placeholder.innerHTML = `
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="m21 15-5-5L5 21"/>
                        </svg>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
              <ul className="space-y-2">
                {comparison.es.before.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[13px] text-[#8791a1]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
            className="rounded-2xl border border-[rgba(16,191,216,0.12)] bg-[#0d1219] overflow-hidden"
          >
            <div className="p-4 sm:p-5 border-b border-[rgba(16,191,216,0.12)]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#10BFD8]/10">
                  <span className="text-[12px] text-[#10BFD8]">✓</span>
                </div>
                <span className="text-[14px] font-bold text-[#10BFD8]">
                  {isEs ? 'Después de Noctip' : 'After Noctip'}
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#080c12] mb-4">
                <img
                  src={`/images/${folder}/lifestyle/after.jpg`}
                  alt={isEs ? 'Después de Noctip' : 'After Noctip'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.ba-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'ba-placeholder flex items-center justify-center w-full h-full text-[#1a3040]';
                      placeholder.innerHTML = `
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="m21 15-5-5L5 21"/>
                        </svg>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
              <ul className="space-y-2">
                {comparison.en.after.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[13px] text-[#c8d0da]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10BFD8]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Arrow divider (mobile) */}
        <div className="flex sm:hidden items-center justify-center -mt-2 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10BFD8]/10 border border-[#10BFD8]/20">
            <ArrowRight size={16} className="text-[#10BFD8] rotate-90" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
