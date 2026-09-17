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
    description: 'El audio suave antes de dormir ayuda a muchas personas a desconectar. No sustituye tratamiento médico, pero facilita una rutina relajante sin pastillas ni pantallas.',
    descriptionEn: 'Soft audio before sleep helps many people unwind. Not a medical treatment, but a simple relaxing routine without pills or screens.',
    facts: [
      { icon: Brain, title: 'Rutina relajante', titleEn: 'Relaxing routine', text: 'Ponte tu podcast o ruido blanco y desconecta sin mirar el móvil.', textEn: 'Put on your podcast or white noise and unwind without your phone.' },
      { icon: Zap, title: 'Sin presión', titleEn: 'No pressure', text: 'Altavoces ultrafinos que no molestan si duermes de lado.', textEn: 'Ultra-thin speakers that stay comfortable for side sleepers.' },
      { icon: Shield, title: 'Sin efectos secundarios', titleEn: 'No side effects', text: 'A diferencia de los medicamentos, el audio no crea dependencia.', textEn: 'Unlike medications, audio doesn\'t create dependency.' },
      { icon: Clock, title: 'Úsalo cada noche', titleEn: 'Use nightly', text: 'Inclúyelo en tu higiene de sueño: luz tenue, banda puesta, a dormir.', textEn: 'Make it part of your sleep hygiene: dim lights, band on, sleep.' },
    ],
  },
  halo: {
    title: 'La ciencia detrás del Noctip Halo',
    titleEn: 'The science behind Noctip Halo',
    subtitle: 'Cómo funciona',
    subtitleEn: 'How it works',
    description: 'Los ronquidos ocurren cuando la vía aérea se estrecha durante el sueño. El Noctip Halo ayuda a mantenerla abierta avanzando suavemente la mandíbula. Si sospechas apnea, consulta a tu médico.',
    descriptionEn: 'Snoring occurs when the airway narrows during sleep. Noctip Halo helps keep it open by gently advancing the jaw. Suspected apnea? See your doctor.',
    facts: [
      { icon: Brain, title: 'Avance mandibular', titleEn: 'Jaw advancement', text: 'Avance de 10mm con micro-ajustes para encontrar tu punto cómodo.', textEn: '10mm advancement with micro-adjustments to find your sweet spot.' },
      { icon: Zap, title: 'Primeras noches', titleEn: 'First nights', text: 'Muchos usuarios notan noches más silenciosas desde el inicio. Pruébalo 30 noches.', textEn: 'Many users notice quieter nights early on. Try 30 nights risk-free.' },
      { icon: Shield, title: 'Grado médico', titleEn: 'Medical grade', text: 'Silicona hipoalergénica, segura para uso nocturno.', textEn: 'Hypoallergenic silicone, safe for nightly use.' },
      { icon: Clock, title: 'Uso continuado', titleEn: 'Continuous use', text: 'La constancia ayuda a consolidar el descanso. Limpieza diaria recomendada.', textEn: 'Consistency helps. Daily cleaning recommended.' },
    ],
  },
  wave: {
    title: 'La ciencia detrás del Noctip Back',
    titleEn: 'The science behind Noctip Back',
    subtitle: 'Corrección postural',
    subtitleEn: 'Posture correction',
    description: 'La mala postura se corrige con constancia. El Noctip Back te recuerda mantener la espalda recta mientras reentrenas el hábito.',
    descriptionEn: 'Poor posture improves with consistency. Noctip Back reminds you to keep your back straight while you retrain the habit.',
    facts: [
      { icon: Brain, title: 'Reentrenamiento muscular', titleEn: 'Muscle retraining', text: 'El soporte constante crea nuevos patrones de movimiento.', textEn: 'Constant support creates new movement patterns.' },
      { icon: Zap, title: 'Constancia 14 días', titleEn: '14-day habit', text: '15 min/día ayuda a consolidar postura. Combínalo con pausas activas.', textEn: '15 min/day helps lock in posture. Add stretch breaks.' },
      { icon: Shield, title: 'No invasivo', titleEn: 'Non-invasive', text: 'Sin cirugías ni medicamentos. Soporte externo seguro.', textEn: 'No surgery or medications. Safe external support.' },
      { icon: Clock, title: '15 minutos al día', titleEn: '15 minutes a day', text: 'Solo necesitas 15 minutos diarios para reconstruir el hábito.', textEn: 'You only need 15 minutes daily to rebuild the habit.' },
    ],
  },
  'neck-massager': {
    title: 'La ciencia detrás del Noctip Cervical',
    titleEn: 'The science behind Noctip Cervical',
    subtitle: 'Masaje terapéutico',
    subtitleEn: 'Therapeutic massage',
    description: 'Un masaje cervical de 15 min ayuda a liberar tensión y mejorar la sensación de descanso. No sustituye consejo médico.',
    descriptionEn: 'A 15-min cervical massage helps release tension. Not a medical device — seek advice for persistent pain.',
    facts: [
      { icon: Brain, title: 'Tres capas de relajación', titleEn: 'Three layers of relaxation', text: 'Nervios, vasos sanguíneos y músculos. Masaje envolvente.', textEn: 'Nerves, blood vessels and muscles. Wraparound massage.' },
      { icon: Zap, title: 'Sesión guiada', titleEn: 'Guided session', text: '15 min con auto-apagado. Rutina diaria sencilla.', textEn: '15 min with auto-off. Simple daily routine.' },
      { icon: Shield, title: 'Electrodos curvos', titleEn: 'Curved electrodes', text: 'Se adaptan a varios tipos de cuello para un masaje uniforme.', textEn: 'Adapt to different neck shapes for even massage.' },
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
