'use client';

import { motion } from 'framer-motion';
import { Package, Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getPackageItems, getSlugFolder } from '../lib/product-images';

interface ProductWhatYouGetProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

export default function ProductWhatYouGet({ slug }: ProductWhatYouGetProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const folder = getSlugFolder(slug);
  const items = getPackageItems(slug);

  const labels: Record<string, Record<string, Record<string, string>>> = {
    halo: {
      es: { 'Producto': 'Noctip Halo — férula anti-ronquidos', 'Estuche de viaje': 'Estuche compacto y discreto', 'Manual de instrucciones': 'Guía rápida de uso y cuidado' },
      en: { 'Producto': 'Noctip Halo — anti-snoring mouthpiece', 'Estuche de viaje': 'Compact and discreet travel case', 'Manual de instrucciones': 'Quick start and care guide' },
    },
    rest: {
      es: { 'Banda de sueño': 'Noctip Rest — banda con altavoces', 'Cable de carga': 'Cable Micro-USB incluido', 'Manual de instrucciones': 'Guía de conexión y uso', 'Bolsa de almacenaje': 'Bolsa de tela para guardar' },
      en: { 'Banda de sueño': 'Noctip Rest — sleep headband with speakers', 'Cable de carga': 'Micro-USB charging cable included', 'Manual de instrucciones': 'Connection and usage guide', 'Bolsa de almacenaje': 'Fabric storage pouch' },
    },
    cervical: {
      es: { 'Masajeador cervical': 'Noctip Cervical — masajeador con electrodos', 'Cable USB': 'Cable de carga USB incluido', 'Manual de usuario': 'Guía de uso y programas' },
      en: { 'Masajeador cervical': 'Noctip Cervical — electrode massager', 'Cable USB': 'USB charging cable included', 'Manual de usuario': 'Usage and program guide' },
    },
    back: {
      es: { 'Corrector postural': 'Noctip Back — soporte en forma de Y', 'Manual de instrucciones': 'Guía de ajuste y uso', 'Guía de tallas': 'Tabla de medidas detallada' },
      en: { 'Corrector postural': 'Noctip Back — Y-shaped posture support', 'Manual de instrucciones': 'Adjustment and usage guide', 'Guía de tallas': 'Detailed size chart' },
    },
    wave: {
      es: { 'Corrector postural': 'Noctip Back — soporte en forma de Y', 'Manual de instrucciones': 'Guía de ajuste y uso', 'Guía de tallas': 'Tabla de medidas detallada' },
      en: { 'Corrector postural': 'Noctip Back — Y-shaped posture support', 'Manual de instrucciones': 'Adjustment and usage guide', 'Guía de tallas': 'Detailed size chart' },
    },
  };

  const lang = isEs ? 'es' : 'en';
  const itemLabels = labels[slug]?.[lang] ?? labels.halo[lang];

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
            <Package size={18} className="text-[#10BFD8]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? '¿Qué recibirás en casa?' : 'What will you receive?'}
            </h2>
            <p className="text-[13px] text-[#6b7785]">
              {isEs ? 'Todo lo que necesitas, incluido.' : 'Everything you need, included.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
              className="group relative rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden transition-all duration-300 hover:border-[rgba(16,191,216,0.15)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Image area */}
              <div className="aspect-square flex items-center justify-center bg-[#080c12] p-4">
                <img
                  src={`/images/${folder}/package/${idx + 1}.jpg`}
                  alt={item}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.placeholder-icon')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'placeholder-icon flex flex-col items-center justify-center gap-2 text-[#3a4458]';
                      placeholder.innerHTML = `
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                          <path d="m3.3 7 8.7 5 8.7-5"/>
                          <path d="M12 22V12"/>
                        </svg>
                        <span class="text-[10px] font-medium uppercase tracking-wider">${item}</span>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>

              {/* Label */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10BFD8]/10">
                    <Check size={10} className="text-[#10BFD8]" />
                  </div>
                  <span className="text-[13px] sm:text-[14px] font-semibold text-[#f2eee7]">
                    {item}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] sm:text-[12px] leading-[1.5] text-[#6b7785]">
                  {itemLabels[item] ?? item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
