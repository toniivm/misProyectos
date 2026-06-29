'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { ArrowLeft, Shield, Truck, RotateCcw, Heart, Target, Zap } from 'lucide-react'

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
        ? '30 noches de prueba. Si no te gusta, lo recogemos y te devolvemos el dinero. Sin preguntas, sin formularios interminables.'
        : '30-night trial. If you don\'t like it, we pick it up and refund you. No questions, no endless forms.',
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
    { value: '6.000+', label: isEs ? 'Clientes en Europa' : 'Customers in Europe' },
    { value: '4.9', label: isEs ? 'Valoración media' : 'Average rating' },
    { value: '30', label: isEs ? 'Noches de garantía' : 'Night guarantee' },
    { value: '24h', label: isEs ? 'Procesamiento en 24h' : 'Order processing' },
  ]

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <Image
              src="/images/logo/logo.png"
              alt="Noctip"
              width={36}
              height={36}
              className="object-contain"
              sizes="36px"
            />
            <span className="hidden sm:block">Noctip</span>
          </Link>
          <Link href={`/${locale}`} className="flex items-center gap-1.5 text-[13px] text-[#6b7785] hover:text-[#f2eee7] transition-colors">
            <ArrowLeft size={14} />
            {isEs ? 'Volver' : 'Back'}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ea7c7]">
            {isEs ? 'Nuestra historia' : 'Our story'}
          </span>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
            {isEs
              ? 'Dormir bien no debería ser un lujo'
              : 'Sleeping well shouldn\'t be a luxury'}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#8791a1]">
            {isEs
              ? 'Somos una marca pequeña, independiente, con una idea clara: crear productos de descanso que funcionen de verdad y cuesten lo justo. Sin inversores, sin juntas directivas, sin márgenes inflados. Solo productos que nos gustan y que usamos nosotros mismos.'
              : 'We are a small, independent brand with one clear idea: create rest products that actually work and cost what they should. No investors, no board meetings, no inflated margins. Just products we like and use ourselves.'}
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
            <div key={stat.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">
              <div className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.04em] text-[#f6f2eb]">{stat.value}</div>
              <div className="mt-1 text-[11px] text-[#6b7785] uppercase tracking-[0.08em]">{stat.label}</div>
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
          <h2 className="text-center text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7]">
            {isEs ? 'Nuestros valores' : 'Our values'}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all hover:border-white/[0.12]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.08)]">
                  <item.icon size={18} className="text-[#10BFD8]" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-[#f2eee7]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-[#8791a1]">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,#101722,#0c1118)] p-8 text-center sm:p-12"
        >
          <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f6f2eb]">
            {isEs ? '¿Hablamos?' : 'Let\'s talk'}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#8791a1]">
            {isEs
              ? 'Si tienes cualquier duda antes de comprar, escríbenos. Preferimos que compres seguro a que compres con dudas. Respondemos en menos de 24 horas.'
              : 'If you have any questions before buying, write to us. We\'d rather you buy confident than buy with doubts. We reply within 24 hours.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:noctip95@gmail.com"
              className="inline-flex items-center rounded-full bg-[#f2eee7] px-8 py-4 text-[14px] font-semibold text-[#11161d] transition-all hover:bg-white hover:-translate-y-[1px]">
              ✉️ {isEs ? 'noctip95@gmail.com' : 'noctip95@gmail.com'}
            </a>
          </div>
          <p className="mt-4 text-[12px] text-[#6b7785]">
            {isEs ? 'También por WhatsApp en el botón verde de la web' : 'Also via WhatsApp using the green button on the site'}
          </p>
        </motion.div>

        {/* Trust */}
        <div className="mt-12 grid grid-cols-3 gap-3">
          {[
            { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping' },
            { icon: RotateCcw, label: isEs ? '30 días garantía' : '30-day guarantee' },
            { icon: Shield, label: isEs ? 'Pago seguro' : 'Secure checkout' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-center">
              <item.icon size={18} className="text-[#10BFD8]" />
              <span className="text-[11px] font-medium text-[#8791a1]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
