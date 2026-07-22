'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Package, Check } from 'lucide-react'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface WhatIsIncludedProps {
  slug: string
}

interface IncludedItem {
  name: string
  nameEn: string
}

const INCLUDED: Record<string, IncludedItem[]> = {
  'sleep-headband': [
    { name: 'Banda de sueño Noctip Rest', nameEn: 'Noctip Rest sleep headband' },
    { name: 'Cable de carga Micro-USB', nameEn: 'Micro-USB charging cable' },
    { name: 'Manual de usuario', nameEn: 'User manual' },
    { name: 'Guía de inicio rápido', nameEn: 'Quick start guide' },
  ],
  halo: [
    { name: 'Férula anti-ronquidos Noctip Halo', nameEn: 'Noctip Halo anti-snoring mouthpiece' },
    { name: 'Estuche de viaje compacto', nameEn: 'Compact travel case' },
    { name: 'Manual de usuario', nameEn: 'User manual' },
    { name: 'Guía de ajuste personalizado', nameEn: 'Custom fit guide' },
  ],
  wave: [
    { name: 'Corrector postural Noctip Back', nameEn: 'Noctip Back posture corrector' },
    { name: 'Guía de tallas', nameEn: 'Size guide' },
    { name: 'Manual de usuario', nameEn: 'User manual' },
    { name: 'Bolsa de transporte', nameEn: 'Carrying pouch' },
  ],
  'neck-massager': [
    { name: 'Masajeador cervical Noctip Cervical', nameEn: 'Noctip Cervical neck massager' },
    { name: 'Cable USB de carga', nameEn: 'USB charging cable' },
    { name: 'Manual de usuario', nameEn: 'User manual' },
    { name: 'Bolsa de transporte', nameEn: 'Carrying pouch' },
  ],
}

const SPECS: Record<string, { label: string; labelEn: string; value: string }[]> = {
  'sleep-headband': [
    { label: 'Peso', labelEn: 'Weight', value: '≈45g' },
    { label: 'Batería', labelEn: 'Battery', value: '10+ horas' },
    { label: 'Conectividad', labelEn: 'Connectivity', value: 'Bluetooth 5.0' },
    { label: 'Material', labelEn: 'Material', value: 'PVC transpirable' },
    { label: 'Talla', labelEn: 'Size', value: 'Única — elástica' },
  ],
  halo: [
    { label: 'Ajuste', labelEn: 'Fit', value: '10mm micro-ajustes' },
    { label: 'Material', labelEn: 'Material', value: 'Silicona médica' },
    { label: 'Diseño', labelEn: 'Design', value: 'Doble capa' },
    { label: 'Moldeado', labelEn: 'Molding', value: 'Hervir y morder' },
  ],
  wave: [
    { label: 'Tallas', labelEn: 'Sizes', value: 'XS / S / M / L / XL' },
    { label: 'Material', labelEn: 'Material', value: 'Malla transpirable' },
    { label: 'Peso', labelEn: 'Weight', value: '≈120g' },
    { label: 'Ajuste', labelEn: 'Fit', value: 'Correas de velcro' },
  ],
  'neck-massager': [
    { label: 'Peso', labelEn: 'Weight', value: '200g' },
    { label: 'Dimensiones', labelEn: 'Dimensions', value: '17 × 5 × 17 cm' },
    { label: 'Tiempo', labelEn: 'Time', value: '15 min (auto)' },
    { label: 'Material', labelEn: 'Material', value: 'ABS y TPR' },
  ],
}

export default function WhatIsIncluded({ slug }: WhatIsIncludedProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const items = INCLUDED[slug]
  const specs = SPECS[slug]

  if (!items) return null

  return (
    <section className="py-12 sm:py-16 border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10">
            <Package size={18} className="text-[#10BFD8]" />
          </div>
          <h2 className="font-heading text-[20px] sm:text-[24px] font-bold text-[#f2eee7]">
            {isEs ? 'Qué incluye' : 'What\'s included'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Items */}
          <div className="space-y-3">
            {items.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4, ease: EASE_OUT }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0d1219] p-4"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10BFD8]/10">
                  <Check size={12} className="text-[#10BFD8]" />
                </div>
                <span className="text-[13px] font-medium text-[#f2eee7]">
                  {isEs ? item.name : item.nameEn}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Specs */}
          {specs && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5">
              <h3 className="text-[14px] font-bold text-[#f2eee7] mb-4">
                {isEs ? 'Especificaciones' : 'Specifications'}
              </h3>
              <div className="space-y-3">
                {specs.map((spec, idx) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4, ease: EASE_OUT }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[12px] text-[#8791a1]">
                      {isEs ? spec.label : spec.labelEn}
                    </span>
                    <span className="text-[12px] font-semibold text-[#f2eee7]">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
