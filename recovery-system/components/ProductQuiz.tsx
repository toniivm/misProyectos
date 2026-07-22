'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Sparkles, ChevronRight, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface Question {
  id: string
  text: string
  textEn: string
  options: {
    id: string
    label: string
    labelEn: string
    icon: string
  }[]
}

interface Recommendation {
  product: string
  slug: string
  title: string
  description: string
  icon: string
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: '¿Cuál es tu principal problema de sueño?',
    textEn: 'What\'s your main sleep problem?',
    options: [
      { id: 'snoring', label: 'Ronco por la noche', labelEn: 'I snore at night', icon: '😴' },
      { id: 'backpain', label: 'Dolor de espalda', labelEn: 'Back pain', icon: '💆' },
      { id: 'insomnia', label: 'No puedo dormirme', labelEn: 'Can\'t fall asleep', icon: '🌙' },
      { id: 'tension', label: 'Tensión en el cuello', labelEn: 'Neck tension', icon: '🧊' },
    ],
  },
  {
    id: 'q2',
    text: '¿Qué prefieres?',
    textEn: 'What do you prefer?',
    options: [
      { id: 'simple', label: 'Algo simple y rápido', labelEn: 'Something simple and quick', icon: '⚡' },
      { id: 'tech', label: 'Algo con tecnología', labelEn: 'Something with technology', icon: '🔧' },
      { id: 'comfort', label: 'Algo cómodo', labelEn: 'Something comfortable', icon: '☁️' },
      { id: 'pro', label: 'Algo profesional', labelEn: 'Something professional', icon: '🏥' },
    ],
  },
]

const RECOMMENDATIONS: Record<string, Recommendation> = {
  'snoring-simple': {
    product: 'Noctip Halo',
    slug: 'halo',
    title: 'Noctip Halo',
    description: 'Elimina los ronquidos desde la primera noche. Férula de silicona médica que avanza suavemente la mandíbula.',
    icon: '😴',
  },
  'snoring-tech': {
    product: 'Noctip Halo',
    slug: 'halo',
    title: 'Noctip Halo',
    description: 'Tecnología de avanzamiento mandibular con ajuste de 10mm para un ajuste personalizado.',
    icon: '😴',
  },
  'snoring-comfort': {
    product: 'Noctip Halo',
    slug: 'halo',
    title: 'Noctip Halo',
    description: 'Silicona hipoalergénica y suave que se adapta perfectamente a tu boca. Incluye estuche de viaje.',
    icon: '😴',
  },
  'snoring-pro': {
    product: 'Noctip Halo',
    slug: 'halo',
    title: 'Noctip Halo',
    description: 'Diseño de doble capa con 10mm de micro-ajustes. Grado médico, hipoalergénica.',
    icon: '😴',
  },
  'backpain-simple': {
    product: 'Noctip Back',
    slug: 'wave',
    title: 'Noctip Back',
    description: 'Corrige tu postura en 2 semanas. Soporte en forma de Y que jala tus hombros hacia atrás.',
    icon: '💆',
  },
  'backpain-tech': {
    product: 'Noctip Back',
    slug: 'wave',
    title: 'Noctip Back',
    description: 'Correas ajustables de XS a XL con tecnología de soporte ergonómico.',
    icon: '💆',
  },
  'backpain-comfort': {
    product: 'Noctip Back',
    slug: 'wave',
    title: 'Noctip Back',
    description: 'Malla transpirable que puedes usar debajo de la ropa. Nadie lo notará.',
    icon: '💆',
  },
  'backpain-pro': {
    product: 'Noctip Back',
    slug: 'wave',
    title: 'Noctip Back',
    description: 'Soporte profesional en forma de Y con correas de velcro para ajuste ilimitado.',
    icon: '💆',
  },
  'insomnia-simple': {
    product: 'Noctip Rest',
    slug: 'sleep-headband',
    title: 'Noctip Rest',
    description: 'Banda de audio para dormir. 45 gramos que desaparecen al ponértelos.',
    icon: '🌙',
  },
  'insomnia-tech': {
    product: 'Noctip Rest',
    slug: 'sleep-headband',
    title: 'Noctip Rest',
    description: 'Bluetooth 5.0 con altavoces ultrafinos. Conecta a tu móvil y duerme con tu podcast favorito.',
    icon: '🌙',
  },
  'insomnia-comfort': {
    product: 'Noctip Rest',
    slug: 'sleep-headband',
    title: 'Noctip Rest',
    description: 'Tela transpirable suave que no presiona tus orejas. Lavable a máquina.',
    icon: '🌙',
  },
  'insomnia-pro': {
    product: 'Noctip Rest',
    slug: 'sleep-headband',
    title: 'Noctip Rest',
    description: '10+ horas de batería. Rango de frecuencia 20-20000 Hz para sonido claro.',
    icon: '🌙',
  },
  'tension-simple': {
    product: 'Noctip Cervical',
    slug: 'neck-massager',
    title: 'Noctip Cervical',
    description: 'Masajeador cervical profesional en 15 minutos. Tres capas de relajación.',
    icon: '🧊',
  },
  'tension-tech': {
    product: 'Noctip Cervical',
    slug: 'neck-massager',
    title: 'Noctip Cervical',
    description: 'Electrodos curvos con acabado mate que se adaptan a cualquier tipo de cuello.',
    icon: '🧊',
  },
  'tension-comfort': {
    product: 'Noctip Cervical',
    slug: 'neck-massager',
    title: 'Noctip Cervical',
    description: 'Compacto y portátil. Úsalo en casa, oficina o viaje.',
    icon: '🧊',
  },
  'tension-pro': {
    product: 'Noctip Cervical',
    slug: 'neck-massager',
    title: 'Noctip Cervical',
    description: 'Tres capas de relajación — nervios, vasos sanguíneos y músculos.',
    icon: '🧊',
  },
}

export default function ProductQuiz() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId }
    setAnswers(newAnswers)

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 300)
    }
  }

  const getRecommendation = (): Recommendation | null => {
    const key = `${answers.q1}-${answers.q2}`
    return RECOMMENDATIONS[key] || null
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const recommendation = getRecommendation()

  return (
    <section className="py-16 sm:py-24 bg-[#080c12]">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-3">
              <Sparkles size={12} />
              {isEs ? 'Quiz' : 'Quiz'}
            </span>
            <h2 className="font-heading text-[24px] sm:text-[32px] font-bold text-[#f2eee7]">
              {isEs ? '¿Cuál es tu producto ideal?' : 'What\'s your ideal product?'}
            </h2>
            <p className="mt-3 text-[14px] text-[#8791a1]">
              {isEs ? 'Responde 2 preguntas y te recomendamos el producto perfecto.' : 'Answer 2 questions and we\'ll recommend the perfect product.'}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#8791a1]">
                {isEs ? `Pregunta ${currentStep + 1} de ${QUESTIONS.length}` : `Question ${currentStep + 1} of ${QUESTIONS.length}`}
              </span>
              <span className="text-[11px] font-bold text-[#10BFD8]">
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#10BFD8]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <h3 className="font-heading text-[20px] sm:text-[24px] font-bold text-[#f2eee7] mb-6 text-center">
                  {isEs ? QUESTIONS[currentStep].text : QUESTIONS[currentStep].textEn}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUESTIONS[currentStep].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(QUESTIONS[currentStep].id, option.id)}
                      className={`flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5 text-left transition-all duration-300 hover:border-[#10BFD8]/30 hover:bg-[#111720] min-h-[72px] ${
                        answers[QUESTIONS[currentStep].id] === option.id
                          ? 'border-[#10BFD8] bg-[#10BFD8]/5'
                          : ''
                      }`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-[14px] font-semibold text-[#f2eee7]">
                        {isEs ? option.label : option.labelEn}
                      </span>
                      {answers[QUESTIONS[currentStep].id] === option.id && (
                        <Check size={18} className="ml-auto text-[#10BFD8]" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="text-center"
              >
                {recommendation && (
                  <>
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#10BFD8]/10 text-4xl mb-6">
                      {recommendation.icon}
                    </div>
                    <h3 className="font-heading text-[24px] sm:text-[28px] font-bold text-[#f2eee7] mb-3">
                      {isEs ? 'Tu producto ideal es:' : 'Your ideal product is:'}
                    </h3>
                    <h4 className="font-heading text-[20px] sm:text-[24px] font-bold text-[#10BFD8] mb-4">
                      {recommendation.title}
                    </h4>
                    <p className="text-[14px] sm:text-[16px] text-[#8791a1] mb-8 max-w-[400px] mx-auto">
                      {recommendation.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link
                        href={`/${locale}/products/${recommendation.slug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10BFD8] px-8 py-4 text-[15px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(16,191,216,0.35)] min-h-[52px]"
                      >
                        {isEs ? 'Ver producto' : 'View product'}
                        <ArrowRight size={16} />
                      </Link>
                      <button
                        onClick={restart}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-4 text-[14px] font-medium text-[#8791a1] transition-all duration-300 hover:border-white/25 hover:text-white min-h-[52px]"
                      >
                        {isEs ? 'Hacer quiz de nuevo' : 'Retake quiz'}
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
