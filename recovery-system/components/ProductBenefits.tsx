'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Moon, Zap, Heart, Shield, Clock, Headphones } from 'lucide-react'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface ProductBenefitsProps {
  slug: string
}

interface Benefit {
  icon: any
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  percentage?: number
}

const BENEFITS: Record<string, Benefit[]> = {
  'sleep-headband': [
    { icon: Moon, title: 'Mejora tu sueño', titleEn: 'Improves your sleep', description: 'El 95% de nuestros usuarios reportan dormir mejor desde la primera semana.', descriptionEn: '95% of our users report sleeping better from the first week.', percentage: 95 },
    { icon: Zap, title: 'Sin cables ni apps', titleEn: 'No cables or apps', description: 'Te la pones y funciona. Así de simple. Sin configuraciones complejas.', descriptionEn: 'You put it on and it works. That simple. No complex setups.', percentage: 100 },
    { icon: Heart, title: 'Cómoda como una nube', titleEn: 'Comfortable as a cloud', description: '45 gramos que no sientes. Tela suave que desaparece al ponértela.', descriptionEn: '45 grams you won\'t feel. Soft fabric that disappears when you wear it.', percentage: 100 },
    { icon: Clock, title: 'Toda la noche', titleEn: 'All night long', description: '10+ horas de batería cubren toda la noche sin necesidad de cargar.', descriptionEn: '10+ hours of battery cover the whole night without needing to charge.', percentage: 10 },
    { icon: Shield, title: 'Lavable a máquina', titleEn: 'Machine washable', description: 'Retira los altavoces en segundos y lava la banda en la lavadora.', descriptionEn: 'Remove the speakers in seconds and wash the band in the washing machine.', percentage: 100 },
    { icon: Headphones, title: 'Bluetooth 5.0', titleEn: 'Bluetooth 5.0', description: 'Conexión estable y rápida a tu móvil. Sin cables, sin complicaciones.', descriptionEn: 'Stable and fast connection to your phone. No cables, no complications.', percentage: 100 },
  ],
  halo: [
    { icon: Moon, title: 'Elimina ronquidos', titleEn: 'Stops snoring', description: 'El 97% de usuarios reportan reducción de ronquidos desde la primera noche.', descriptionEn: '97% of users report snoring reduction from the first night.', percentage: 97 },
    { icon: Zap, title: 'Ajuste personalizado', titleEn: 'Custom fit', description: '10mm de micro-ajustes para adaptarse perfectamente a tu boca.', descriptionEn: '10mm of micro-adjustments to fit your mouth perfectly.', percentage: 100 },
    { icon: Heart, title: 'Silicona médica', titleEn: 'Medical grade silicone', description: 'Hipoalergénica, suave y segura para uso nocturno.', descriptionEn: 'Hypoallergenic, soft and safe for nightly use.', percentage: 100 },
    { icon: Clock, title: 'Resultado inmediato', titleEn: 'Immediate results', description: 'Desde la primera noche notarás la diferencia.', descriptionEn: 'From the first night you\'ll feel the difference.', percentage: 1 },
    { icon: Shield, title: 'Reutilizable', titleEn: 'Reusable', description: 'Lavable y duradera. Meses de uso sin problemas.', descriptionEn: 'Washable and durable. Months of trouble-free use.', percentage: 100 },
    { icon: Headphones, title: 'Estuche incluido', titleEn: 'Case included', description: 'Estuche de viaje compacto para llevarla a cualquier parte.', descriptionEn: 'Compact travel case to take it anywhere.', percentage: 100 },
  ],
  wave: [
    { icon: Moon, title: 'Corrige postura', titleEn: 'Corrects posture', description: 'El 93% de usuarios mejoran su postura en 2 semanas.', descriptionEn: '93% of users improve their posture in 2 weeks.', percentage: 93 },
    { icon: Zap, title: 'Invisible', titleEn: 'Invisible', description: 'Úsalo debajo de la ropa. Nadie lo notará.', descriptionEn: 'Wear it under your clothes. Nobody will notice.', percentage: 100 },
    { icon: Heart, title: 'Sin dolor', titleEn: 'Pain free', description: 'Soporte ergonómico que alivia el dolor sin cirugías.', descriptionEn: 'Ergonomic support that relieves pain without surgery.', percentage: 100 },
    { icon: Clock, title: 'Solo 15 min/día', titleEn: 'Just 15 min/day', description: '15 minutos al día son suficientes para reconstruir el hábito.', descriptionEn: '15 minutes a day is enough to rebuild the habit.', percentage: 15 },
    { icon: Shield, title: 'Ajustable', titleEn: 'Adjustable', description: 'Correas de XS a XL. Se adapta a cualquier cuerpo.', descriptionEn: 'Straps from XS to XL. Fits any body.', percentage: 100 },
    { icon: Headphones, title: 'Transpirable', titleEn: 'Breathable', description: 'Malla transpirable para comodidad todo el día.', descriptionEn: 'Breathable mesh for all-day comfort.', percentage: 100 },
  ],
  'neck-massager': [
    { icon: Moon, title: 'Alivio profesional', titleEn: 'Professional relief', description: 'El 96% de usuarios reportan alivio desde la primera sesión.', descriptionEn: '96% of users report relief from the first session.', percentage: 96 },
    { icon: Zap, title: '3 capas de relajación', titleEn: '3 layers of relaxation', description: 'Nervios, vasos sanguíneos y músculos. Masaje profundo.', descriptionEn: 'Nerves, blood vessels and muscles. Deep massage.', percentage: 3 },
    { icon: Heart, title: '15 minutos', titleEn: '15 minutes', description: 'Cada sesión dura 15 minutos con temporización automática.', descriptionEn: 'Each session lasts 15 minutes with automatic timer.', percentage: 15 },
    { icon: Clock, title: 'Portátil', titleEn: 'Portable', description: 'Compacto y ligero. Úsalo en casa, oficina o viaje.', descriptionEn: 'Compact and lightweight. Use at home, office or travel.', percentage: 100 },
    { icon: Shield, title: 'No alergénico', titleEn: 'Non-allergenic', description: 'Material de alta calidad, seguro para piel sensible.', descriptionEn: 'High-quality material, safe for sensitive skin.', percentage: 100 },
    { icon: Headphones, title: 'Fácil de usar', titleEn: 'Easy to use', description: 'Un solo botón. Sin configuraciones complejas.', descriptionEn: 'One button. No complex setups.', percentage: 100 },
  ],
}

function StatBar({ percentage, label }: { percentage: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-[#10BFD8]"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT }}
        />
      </div>
      <span className="text-[13px] font-bold text-[#10BFD8]">{percentage}%</span>
    </div>
  )
}

export default function ProductBenefits({ slug }: ProductBenefitsProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const benefits = BENEFITS[slug]

  if (!benefits) return null

  return (
    <section className="py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-3">
            {isEs ? 'Beneficios' : 'Benefits'}
          </span>
          <h2 className="font-heading text-[22px] sm:text-[28px] font-bold text-[#f2eee7]">
            {isEs ? 'Por qué te va a encantar' : 'Why you\'ll love it'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
              className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/10">
                  <benefit.icon size={18} className="text-[#10BFD8]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#f2eee7]">
                    {isEs ? benefit.title : benefit.titleEn}
                  </h3>
                  <p className="text-[12px] leading-[1.5] text-[#8791a1] mt-1">
                    {isEs ? benefit.description : benefit.descriptionEn}
                  </p>
                </div>
              </div>
              {benefit.percentage !== undefined && (
                <StatBar percentage={benefit.percentage} label={isEs ? benefit.title : benefit.titleEn} />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
