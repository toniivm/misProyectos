'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Brain, Zap, Shield, Clock } from 'lucide-react'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface ScienceBehindItProps {
  slug: string
}

interface ScienceContent {
  title: string
  titleEn: string
  subtitle: string
  subtitleEn: string
  description: string
  descriptionEn: string
  facts: {
    icon: any
    title: string
    titleEn: string
    text: string
    textEn: string
  }[]
}

const SCIENCE: Record<string, ScienceContent> = {
  'sleep-headband': {
    title: 'La ciencia detrás del Noctip Rest',
    titleEn: 'The science behind Noctip Rest',
    subtitle: 'Por qué funciona',
    subtitleEn: 'Why it works',
    description: 'El audio durante el sueño ayuda a tu cerebro a relajarse y reducir la ansiedad. Estudios demuestran que escuchar música suave o ruido blanco antes de dormir puede mejorar la calidad del sueño hasta en un 40%.',
    descriptionEn: 'Sleep audio helps your brain relax and reduce anxiety. Studies show that listening to soft music or white noise before bed can improve sleep quality by up to 40%.',
    facts: [
      { icon: Brain, title: 'Reduce la ansiedad', titleEn: 'Reduces anxiety', text: 'El audio relajante activa el sistema nervioso parasimpático, ayudándote a relajarte.', textEn: 'Relaxing audio activates the parasympathetic nervous system, helping you relax.' },
      { icon: Zap, title: 'Mejora el sueño profundo', titleEn: 'Improves deep sleep', text: 'El ruido blanco puede aumentar el sueño profundo hasta en un 30%.', textEn: 'White noise can increase deep sleep by up to 30%.' },
      { icon: Shield, title: 'Sin efectos secundarios', titleEn: 'No side effects', text: 'A diferencia de los medicamentos, el audio no crea dependencia.', textEn: 'Unlike medications, audio doesn\'t create dependency.' },
      { icon: Clock, title: 'Resultados desde la primera noche', titleEn: 'Results from the first night', text: 'La mayoría de usuarios reportan mejora desde la primera noche de uso.', textEn: 'Most users report improvement from the first night of use.' },
    ],
  },
  halo: {
    title: 'La ciencia detrás del Noctip Halo',
    titleEn: 'The science behind Noctip Halo',
    subtitle: 'Cómo funciona',
    subtitleEn: 'How it works',
    description: 'Los ronquidos ocurren cuando la vía aérea se estreca durante el sueño. El Noctip Halo avanza suavemente la mandíbula para mantener la vía aérea abierta, eliminando los ronquidos en su origen.',
    descriptionEn: 'Snoring occurs when the airway narrows during sleep. The Noctip Halo gently advances the jaw to keep the airway open, eliminating snoring at its source.',
    facts: [
      { icon: Brain, title: 'Avance mandibular', titleEn: 'Jaw advancement', text: 'El avance de 10mm abre la vía aérea sin causar molestias.', textEn: 'The 10mm advancement opens the airway without causing discomfort.' },
      { icon: Zap, title: 'Resultado inmediato', titleEn: 'Immediate result', text: 'El 97% de usuarios reportan eliminación de ronquidos desde la primera noche.', textEn: '97% of users report snoring elimination from the first night.' },
      { icon: Shield, title: 'Grado médico', titleEn: 'Medical grade', text: 'Silicona hipoalergénica, segura para uso nocturno.', textEn: 'Hypoallergenic silicone, safe for nightly use.' },
      { icon: Clock, title: 'Largo plazo', titleEn: 'Long term', text: 'Uso continuado mejora la calidad del sueño y reduce la fatiga diurna.', textEn: 'Continuous use improves sleep quality and reduces daytime fatigue.' },
    ],
  },
  wave: {
    title: 'La ciencia detrás del Noctip Back',
    titleEn: 'The science behind Noctip Back',
    subtitle: 'Corrección postural',
    subtitleEn: 'Posture correction',
    description: 'La mala postura se corrige reentrenando los músculos para mantener la posición correcta. El Noctip Back proporciona soporte constante que recuerda a tu cuerpo la posición ideal.',
    descriptionEn: 'Poor posture is corrected by retraining muscles to maintain the correct position. The Noctip Back provides constant support that reminds your body of the ideal position.',
    facts: [
      { icon: Brain, title: 'Reentrenamiento muscular', titleEn: 'Muscle retraining', text: 'El soporte constante crea nuevos patrones de movimiento.', textEn: 'Constant support creates new movement patterns.' },
      { icon: Zap, title: 'Resultados en 2 semanas', titleEn: 'Results in 2 weeks', text: 'El 93% de usuarios reportan mejora visible en 14 días.', textEn: '93% of users report visible improvement in 14 days.' },
      { icon: Shield, title: 'No invasivo', titleEn: 'Non-invasive', text: 'Sin cirugías ni medicamentos. Soporte externo seguro.', textEn: 'No surgery or medications. Safe external support.' },
      { icon: Clock, title: '15 minutos al día', titleEn: '15 minutes a day', text: 'Solo necesitas 15 minutos diarios para reconstruir el hábito.', textEn: 'You only need 15 minutes daily to rebuild the habit.' },
    ],
  },
  'neck-massager': {
    title: 'La ciencia detrás del Noctip Cervical',
    titleEn: 'The science behind Noctip Cervical',
    subtitle: 'Masaje terapéutico',
    subtitleEn: 'Therapeutic massage',
    description: 'El masaje cervical libera la tensión acumulada en los músculos del cuello, mejorando la circulación sanguínea y reduciendo el dolor. Tres capas de relajación trabajan juntas para un alivio real.',
    descriptionEn: 'Cervical massage releases accumulated tension in neck muscles, improving blood circulation and reducing pain. Three layers of relaxation work together for real relief.',
    facts: [
      { icon: Brain, title: 'Tres capas de relajación', titleEn: 'Three layers of relaxation', text: 'Nervios, vasos sanguíneos y músculos. Masaje profundo y completo.', textEn: 'Nerves, blood vessels and muscles. Deep and complete massage.' },
      { icon: Zap, title: 'Alivio inmediato', titleEn: 'Immediate relief', text: 'El 96% de usuarios reportan alivio desde la primera sesión.', textEn: '96% of users report relief from the first session.' },
      { icon: Shield, title: 'Electrodos curvos', titleEn: 'Curved electrodes', text: 'Se adaptan a cualquier tipo de cuello para un masaje personalizado.', textEn: 'Adapt to any neck type for a personalized massage.' },
      { icon: Clock, title: '15 minutos', titleEn: '15 minutes', text: 'Temporización automática. Tan cómodo como un masajista profesional.', textEn: 'Automatic timer. As comfortable as a professional masseuse.' },
    ],
  },
}

export default function ScienceBehindIt({ slug }: ScienceBehindItProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const content = SCIENCE[slug]

  if (!content) return null

  return (
    <section className="py-12 sm:py-16 bg-[#0d1219] rounded-2xl border border-white/[0.06]">
      <div className="px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-3">
              {isEs ? 'Ciencia' : 'Science'}
            </span>
            <h2 className="font-heading text-[22px] sm:text-[28px] font-bold text-[#f2eee7] mb-3">
              {isEs ? content.title : content.titleEn}
            </h2>
            <p className="text-[14px] leading-[1.7] text-[#8791a1] max-w-[600px]">
              {isEs ? content.description : content.descriptionEn}
            </p>
          </div>

          {/* Facts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.facts.map((fact, idx) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: EASE_OUT }}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#111720] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/10">
                  <fact.icon size={18} className="text-[#10BFD8]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-[#f2eee7] mb-1">
                    {isEs ? fact.title : fact.titleEn}
                  </h3>
                  <p className="text-[12px] leading-[1.5] text-[#8791a1]">
                    {isEs ? fact.text : fact.textEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
