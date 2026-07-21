'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bed, Sofa, Plane, Building2, Briefcase, Luggage, MapPin, Home } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getSlugFolder, getLifestyleContexts } from '../lib/product-images';

interface ProductLifestyleProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const CONTEXTS = [
  { key: 'bed', icon: Bed, es: 'Dormitorio', en: 'Bedroom' },
  { key: 'sofa', icon: Sofa, es: 'Sofá', en: 'Couch' },
  { key: 'travel', icon: Plane, es: 'Viaje', en: 'Travel' },
  { key: 'hotel', icon: Building2, es: 'Hotel', en: 'Hotel' },
  { key: 'office', icon: Briefcase, es: 'Oficina', en: 'Office' },
  { key: 'desk', icon: Home, es: 'Escritorio', en: 'Desk' },
  { key: 'bag', icon: Luggage, es: 'Maleta', en: 'Luggage' },
];

export default function ProductLifestyle({ slug }: ProductLifestyleProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const folder = getSlugFolder(slug);
  const [activeCtx, setActiveCtx] = useState('bed');

  return (
    <section className="mt-12 sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10">
            <MapPin size={18} className="text-[#10BFD8]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? 'Producto en uso' : 'Product in use'}
            </h2>
            <p className="text-[13px] text-[#6b7785]">
              {isEs ? 'Así se ve en tu día a día.' : 'This is how it fits into your daily life.'}
            </p>
          </div>
        </div>

        {/* Context tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-4 sm:mb-6">
          {CONTEXTS.map((ctx) => {
            const Icon = ctx.icon;
            return (
              <button
                key={ctx.key}
                onClick={() => setActiveCtx(ctx.key)}
                className={`flex items-center gap-2 shrink-0 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all min-h-[44px] ${
                  activeCtx === ctx.key
                    ? 'bg-[#10BFD8]/15 text-[#10BFD8] border border-[#10BFD8]/30'
                    : 'bg-white/[0.04] text-[#6b7785] border border-white/[0.06] hover:text-[#c8d0da] hover:border-white/[0.12]'
                }`}
              >
                <Icon size={14} />
                <span>{isEs ? ctx.es : ctx.en}</span>
              </button>
            );
          })}
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <motion.div
              key={`${activeCtx}-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.4, ease: EASE_OUT }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.06] bg-[#0d1219] ${
                idx === 1 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <div className={`${idx === 1 ? 'aspect-[4/3]' : 'aspect-square'} flex items-center justify-center`}>
                <img
                  src={`/images/${folder}/lifestyle/${idx}.png`}
                  alt={`${isEs ? 'Producto en' : 'Product in'} ${activeCtx}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.lifestyle-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'lifestyle-placeholder flex flex-col items-center justify-center gap-3 text-[#2a3448] w-full h-full absolute inset-0';
                      placeholder.innerHTML = `
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="m21 15-5-5L5 21"/>
                        </svg>
                        <span class="text-[11px] font-medium uppercase tracking-wider">${isEs ? 'Foto en' : 'Photo in'} ${activeCtx}</span>
                        <span class="text-[10px] text-[#1f2937]">${idx}</span>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
