'use client';

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getSlugFolder } from '../lib/product-images';

interface ProductDetailsProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const DETAIL_LABELS: Record<string, { es: string[]; en: string[] }> = {
  halo: {
    es: ['Silicona de grado médico', 'Diseño de doble capa', 'Micro-ajustes de 10mm', 'Acabado mate suave', 'Bordes redondeados', 'Textura antideslizante', 'Flexibilidad extrema', 'Hipoalergénico'],
    en: ['Medical-grade silicone', 'Dual-layer design', '10mm micro-adjustments', 'Smooth matte finish', 'Rounded edges', 'Anti-slip texture', 'Extreme flexibility', 'Hypoallergenic'],
  },
  rest: {
    es: ['Tela transpirable', 'Altavoces ultrafinos', 'Costuras reforzadas', 'Elasticidad premium', 'Acabado suave al tacto', 'Tejido lavable', 'Peso ultraligero', 'Diseño ergonómico'],
    en: ['Breathable fabric', 'Ultra-thin speakers', 'Reinforced stitching', 'Premium elasticity', 'Soft-touch finish', 'Machine washable', 'Ultra-lightweight', 'Ergonomic design'],
  },
  cervical: {
    es: ['Electrodos curvos', 'Acabado mate', 'Botones de control', 'Superficie de contacto', 'Carcasa ABS', 'Acabados premium', 'Textura de agarre', 'Impermeable'],
    en: ['Curved electrodes', 'Matte spray finish', 'Control buttons', 'Contact surface', 'ABS housing', 'Premium finishes', 'Grip texture', 'Water-resistant'],
  },
  back: {
    es: ['Malla transpirable', 'Correas reforzadas', 'Velcro de alta adherencia', 'Costuras triples', 'Bordes cosidos', 'Textura de sujeción', 'Peso ultraligero', 'Acabados premium'],
    en: ['Breathable mesh', 'Reinforced straps', 'High-grip velcro', 'Triple stitching', 'Hemmed edges', 'Grip texture', 'Ultra-lightweight', 'Premium finishes'],
  },
  wave: {
    es: ['Malla transpirable', 'Correas reforzadas', 'Velcro de alta adherencia', 'Costuras triples', 'Bordes cosidos', 'Textura de sujeción', 'Peso ultraligero', 'Acabados premium'],
    en: ['Breathable mesh', 'Reinforced straps', 'High-grip velcro', 'Triple stitching', 'Hemmed edges', 'Grip texture', 'Ultra-lightweight', 'Premium finishes'],
  },
};

export default function ProductDetails({ slug }: ProductDetailsProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const folder = getSlugFolder(slug);
  const labels = DETAIL_LABELS[slug]?.[isEs ? 'es' : 'en'] ?? DETAIL_LABELS.halo[isEs ? 'es' : 'en'];

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
            <Eye size={18} className="text-[#10BFD8]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? 'Detalles premium' : 'Premium details'}
            </h2>
            <p className="text-[13px] text-[#6b7785]">
              {isEs ? 'Calidad que se nota al tacto.' : 'Quality you can feel.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {labels.map((label, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.5, ease: EASE_OUT }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.06] bg-[#0d1219] transition-all duration-300 hover:border-[rgba(16,191,216,0.15)]"
            >
              <div className="aspect-square flex items-center justify-center bg-[#080c12]">
                <img
                  src={`/images/${folder}/details/${idx + 1}.jpg`}
                  alt={label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.detail-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'detail-placeholder flex flex-col items-center justify-center gap-2 text-[#2a3448] w-full h-full absolute inset-0';
                      placeholder.innerHTML = `
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                          <circle cx="12" cy="12" r="3"/>
                          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                        <span class="text-[10px] font-medium uppercase tracking-wider text-center px-2">${label}</span>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
              <div className="p-3">
                <span className="text-[12px] sm:text-[13px] font-medium text-[#c8d0da]">{label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
