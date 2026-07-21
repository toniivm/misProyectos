'use client';

import { motion } from 'framer-motion';
import { Package, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ProductWhatYouGetProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const PRODUCT_RECEIVE: Record<string, { title: string; title_en: string; items: string[]; items_en: string[] }> = {
  'sleep-headband': {
    title: 'Así llega tu Noctip Rest a casa',
    title_en: 'This is how your Noctip Rest arrives',
    items: [
      'Banda de sueño con altavoces integrados',
      'Cable de carga Micro-USB',
      'Instrucciones rápidas de uso',
      'Empaquetado discreto y seguro',
    ],
    items_en: [
      'Sleep headband with built-in speakers',
      'Micro-USB charging cable',
      'Quick start instructions',
      'Discreet and secure packaging',
    ],
  },
  halo: {
    title: 'Así llega tu Noctip Halo a casa',
    title_en: 'This is how your Noctip Halo arrives',
    items: [
      'Férula anti-ronquidos de silicona médica',
      'Estuche de viaje compacto',
      'Guía de ajuste y uso',
      'Empaquetado discreto y seguro',
    ],
    items_en: [
      'Medical-grade silicone anti-snoring mouthpiece',
      'Compact travel case',
      'Adjustment and usage guide',
      'Discreet and secure packaging',
    ],
  },
  wave: {
    title: 'Así llega tu Noctip Back a casa',
    title_en: 'This is how your Noctip Back arrives',
    items: [
      'Corrector postural en forma de Y',
      'Correas ajustables de XS a XL',
      'Guía de tallas y uso',
      'Empaquetado discreto y seguro',
    ],
    items_en: [
      'Y-shaped posture corrector',
      'Adjustable straps from XS to XL',
      'Size and usage guide',
      'Discreet and secure packaging',
    ],
  },
  'neck-massager': {
    title: 'Así llega tu Noctip Cervical a casa',
    title_en: 'This is how your Noctip Cervical arrives',
    items: [
      'Masajeador cervical con electrodos',
      'Cable de carga USB',
      'Manual de uso y programas',
      'Empaquetado discreto y seguro',
    ],
    items_en: [
      'Cervical massager with electrodes',
      'USB charging cable',
      'Usage and program manual',
      'Discreet and secure packaging',
    ],
  },
};

export default function ProductWhatYouGet({ slug }: ProductWhatYouGetProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const data = PRODUCT_RECEIVE[slug];

  if (!data) return null;

  const title = isEs ? data.title : data.title_en;
  const items = isEs ? data.items : data.items_en;

  const trustItems = [
    { icon: Truck, label: isEs ? 'Envío en 24h' : 'Ships in 24h', sub: isEs ? 'Procesamos tu pedido al instante' : 'We process your order instantly' },
    { icon: RotateCcw, label: isEs ? '30 días de prueba' : '30-day trial', sub: isEs ? 'Si no te gusta, te devolvemos todo' : 'If you don\'t like it, full refund' },
    { icon: ShieldCheck, label: isEs ? 'Pago 100% seguro' : '100% secure payment', sub: 'Stripe + SSL 256 bits' },
  ];

  return (
    <section className="mt-10 sm:mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10">
            <Package size={16} className="text-[#10BFD8] sm:w-[18px] sm:h-[18px]" />
          </div>
          <div>
            <h2 className="text-[17px] sm:text-[22px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {title}
            </h2>
          </div>
        </div>

        {/* Items que recibes */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-4 sm:p-6 mb-4">
          <ul className="space-y-3">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10BFD8]/10">
                  <span className="text-[11px] font-bold text-[#10BFD8]">{idx + 1}</span>
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#c8d0da]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2">
          {trustItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10BFD8]/10">
                <item.icon size={14} className="text-[#10BFD8]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#f2eee7] leading-tight">{item.label}</span>
              <span className="hidden sm:block text-[9px] text-[#5a6678]">{item.sub}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
