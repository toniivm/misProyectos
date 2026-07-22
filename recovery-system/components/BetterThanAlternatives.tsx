'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Check, X } from 'lucide-react'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface BetterThanAlternativesProps {
  slug: string
}

interface Comparison {
  feature: string
  featureEn: string
  noctip: boolean
  alternatives: boolean
}

const COMPARISONS: Record<string, Comparison[]> = {
  'sleep-headband': [
    { feature: 'Sin cables', featureEn: 'No cables', noctip: true, alternatives: false },
    { feature: 'Lavable a máquina', featureEn: 'Machine washable', noctip: true, alternatives: false },
    { feature: '45 gramos', featureEn: '45 grams', noctip: true, alternatives: false },
    { feature: '10+ horas de batería', featureEn: '10+ hours battery', noctip: true, alternatives: true },
    { feature: 'Bluetooth 5.0', featureEn: 'Bluetooth 5.0', noctip: true, alternatives: true },
    { feature: 'Sin apps requeridas', featureEn: 'No apps required', noctip: true, alternatives: false },
    { feature: 'Talla única elástica', featureEn: 'One size fits all', noctip: true, alternatives: false },
    { feature: 'Envío gratis', featureEn: 'Free shipping', noctip: true, alternatives: false },
  ],
  halo: [
    { feature: 'Silicona de grado médico', featureEn: 'Medical grade silicone', noctip: true, alternatives: false },
    { feature: 'Ajuste de 10mm', featureEn: '10mm adjustment', noctip: true, alternatives: false },
    { feature: 'Diseño de doble capa', featureEn: 'Dual layer design', noctip: true, alternatives: false },
    { feature: 'Estuche incluido', featureEn: 'Case included', noctip: true, alternatives: false },
    { feature: 'Moldeado personalizado', featureEn: 'Custom molding', noctip: true, alternatives: true },
    { feature: 'Hipoalergénica', featureEn: 'Hypoallergenic', noctip: true, alternatives: false },
    { feature: 'Reutilizable', featureEn: 'Reusable', noctip: true, alternatives: true },
    { feature: 'Garantía 30 noches', featureEn: '30-night guarantee', noctip: true, alternatives: false },
  ],
  wave: [
    { feature: 'Soporte en forma de Y', featureEn: 'Y-shaped support', noctip: true, alternatives: false },
    { feature: 'Tallas XS a XL', featureEn: 'Sizes XS to XL', noctip: true, alternatives: false },
    { feature: 'Invisible bajo la ropa', featureEn: 'Invisible under clothes', noctip: true, alternatives: false },
    { feature: 'Malla transpirable', featureEn: 'Breathable mesh', noctip: true, alternatives: false },
    { feature: 'Ajuste con velcro', featureEn: 'Velcro adjustment', noctip: true, alternatives: true },
    { feature: 'Solo 15 min/día', featureEn: 'Just 15 min/day', noctip: true, alternatives: false },
    { feature: 'Resultados en 2 semanas', featureEn: 'Results in 2 weeks', noctip: true, alternatives: false },
    { feature: 'Garantía 30 noches', featureEn: '30-night guarantee', noctip: true, alternatives: false },
  ],
  'neck-massager': [
    { feature: 'Electrodos curvos', featureEn: 'Curved electrodes', noctip: true, alternatives: false },
    { feature: '3 capas de relajación', featureEn: '3 layers of relaxation', noctip: true, alternatives: false },
    { feature: 'Temporización automática', featureEn: 'Auto timer', noctip: true, alternatives: true },
    { feature: 'Compacto y portátil', featureEn: 'Compact & portable', noctip: true, alternatives: true },
    { feature: 'No alergénico', featureEn: 'Non-allergenic', noctip: true, alternatives: false },
    { feature: '15 minutos por sesión', featureEn: '15 minutes per session', noctip: true, alternatives: false },
    { feature: 'USB recargable', featureEn: 'USB rechargeable', noctip: true, alternatives: true },
    { feature: 'Garantía 30 noches', featureEn: '30-night guarantee', noctip: true, alternatives: false },
  ],
}

export default function BetterThanAlternatives({ slug }: BetterThanAlternativesProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const comparisons = COMPARISONS[slug]

  if (!comparisons) return null

  return (
    <section className="py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-3">
            {isEs ? 'Comparación' : 'Comparison'}
          </span>
          <h2 className="font-heading text-[22px] sm:text-[28px] font-bold text-[#f2eee7]">
            {isEs ? '¿Por qué Noctip?' : 'Why Noctip?'}
          </h2>
        </div>

        <div className="max-w-[500px] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 mb-4 px-4">
            <div className="text-[11px] font-bold text-[#8791a1] uppercase tracking-wide">
              {isEs ? 'Característica' : 'Feature'}
            </div>
            <div className="text-center text-[11px] font-bold text-[#10BFD8] uppercase tracking-wide">
              Noctip
            </div>
            <div className="text-center text-[11px] font-bold text-[#6b7785] uppercase tracking-wide">
              {isEs ? 'Otros' : 'Others'}
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {comparisons.map((item, idx) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4, ease: EASE_OUT }}
                className="grid grid-cols-3 gap-4 items-center rounded-xl border border-white/[0.06] bg-[#0d1219] px-4 py-3"
              >
                <span className="text-[12px] sm:text-[13px] text-[#c8d0da]">
                  {isEs ? item.feature : item.featureEn}
                </span>
                <div className="flex justify-center">
                  {item.noctip ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10BFD8]/10">
                      <Check size={12} className="text-[#10BFD8]" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04]">
                      <X size={12} className="text-[#4a5568]" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {item.alternatives ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04]">
                      <Check size={12} className="text-[#4a5568]" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04]">
                      <X size={12} className="text-[#4a5568]" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
