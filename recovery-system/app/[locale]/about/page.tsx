'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Shield, Truck, RotateCcw, Heart, Target, Zap } from 'lucide-react'
import Header from '../../../components/Header'

export default function AboutPage() {
  const locale = useLocale()
  const isEs = locale === 'es'

  const values = [
    {
      icon: Target,
      title: isEs ? 'Productos que funcionan' : 'Products that work',
      text: isEs
        ? 'No vendemos humo. Cada producto está probado por nosotros antes de ponerlo a la venta. Si no nos convence, no lo vendemos.'
        : 'We don\'t sell hype. Every product is tested by us before we sell it. If it doesn\'t convince us, we don\'t sell it.',
    },
    {
      icon: Shield,
      title: isEs ? 'Sin letra pequeña' : 'No fine print',
      text: isEs
        ? '30 días de prueba. Si no te gusta, lo recogemos y te devolvemos el dinero. Sin preguntas, sin formularios interminables.'
        : '30-day trial. If you don\'t like it, we pick it up and refund you. No questions, no endless forms.',
    },
    {
      icon: Heart,
      title: isEs ? 'Atención real' : 'Real support',
      text: isEs
        ? 'Cuando escribes a soporte, te contesta una persona, no un bot. Respuesta en menos de 24 horas. Siempre.'
        : 'When you write to support, a real person answers, not a bot. Response within 24 hours. Always.',
    },
    {
      icon: Zap,
      title: isEs ? 'Precios justos' : 'Fair prices',
      text: isEs
        ? 'Sin intermediarios. Traemos los productos directamente y aplicamos el margen mínimo. Pagas el producto, no la marca.'
        : 'No middlemen. We source products directly and apply minimal margins. You pay for the product, not the brand.',
    },
  ]

  const stats = [
    { value: '1', label: isEs ? 'Producto, bien elegido' : 'One product, chosen well' },
    { value: '12', label: isEs ? 'Accesorios incluidos' : 'Accessories included' },
    { value: '30', label: isEs ? 'Días para probarlo' : 'Days to try it' },
    { value: '24-72h', label: isEs ? 'Envío con seguimiento' : 'Tracked shipping' },
  ]

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#14211F]">
      <Header showBackButton />

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#E5E0D6] bg-[#FAF8F4] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3E4F4B]">
            {isEs ? 'Nuestra historia' : 'Our story'}
          </span>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-[-0.04em] text-[#14211F]">
            {isEs
              ? 'Limpiar no debería costar una tarde'
              : 'Cleaning shouldn\'t cost you an afternoon'}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#5B6B68]">
            {isEs
              ? 'Somos una marca pequeña e independiente con una idea clara: quitar la fricción de las tareas del hogar. Empezamos con Nítida Vapor, un limpiador que despega la grasa y la cal solo con agua. Sin inversores, sin juntas directivas y sin márgenes inflados.'
              : 'We are a small, independent brand with one clear idea: remove friction from household chores. We start with Nítida Vapor, a cleaner that lifts grease and limescale with water only. No investors, no board meetings, no inflated margins.'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#E5E0D6] bg-[#FAF8F4] p-5 text-center">
              <div className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.04em] text-[#14211F]">{stat.value}</div>
              <div className="mt-1 text-[11px] text-[#5B6B68] uppercase tracking-[0.08em]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-center text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#14211F]">
            {isEs ? 'Nuestros valores' : 'Our values'}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#E5E0D6] bg-[#FAF8F4] p-6 transition-all hover:border-[#D8D2C7]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F4EF]">
                  <item.icon size={18} className="text-[#0F766E]" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-[#14211F]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-[#5B6B68]">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-[28px] border border-[#E5E0D6] bg-[linear-gradient(180deg,#FFFFFF,#F7F5F0)] p-8 text-center sm:p-12"
        >
          <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#14211F]">
            {isEs ? '¿Hablamos?' : 'Let\'s talk'}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#5B6B68]">
            {isEs
              ? 'Si tienes cualquier duda antes de comprar, escríbenos. Preferimos que compres seguro a que compres con dudas. Respondemos en menos de 24 horas.'
              : 'If you have any questions before buying, write to us. We\'d rather you buy confident than buy with doubts. We reply within 24 hours.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:hola@noctip.com"
              className="inline-flex items-center rounded-full bg-[#0F766E] px-8 py-4 text-[14px] font-semibold text-[#FFFFFF] transition-all hover:bg-[#0B5F58] hover:-translate-y-[1px]">
              ✉️ {isEs ? 'hola@noctip.com' : 'hola@noctip.com'}
            </a>
          </div>
        </motion.div>

        {/* Trust */}
        <div className="mt-12 grid grid-cols-3 gap-3">
          {[
            { icon: Truck, label: isEs ? 'Envío 24-72 h' : '24-72 h shipping' },
            { icon: RotateCcw, label: isEs ? '30 días garantía' : '30-day guarantee' },
            { icon: Shield, label: isEs ? 'Pago seguro' : 'Secure checkout' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 rounded-xl border border-[#E5E0D6] bg-[#FAF8F4] p-4 text-center">
              <item.icon size={18} className="text-[#0F766E]" />
              <span className="text-[11px] font-medium text-[#5B6B68]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
