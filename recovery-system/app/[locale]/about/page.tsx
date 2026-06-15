'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowLeft, Shield, Truck, RotateCcw, Heart, Target, Zap, Users } from 'lucide-react'

export default function AboutPage() {
  const locale = useLocale()
  const isEs = locale === 'es'

  const values = [
    {
      icon: Target,
      title: isEs ? 'Ingeniería centrada en resultados' : 'Results-driven engineering',
      text: isEs
        ? 'Cada producto pasa por un proceso de desarrollo riguroso. Sin atajos, sin promesas vacías. Solo specificationes reales y resultados medibles.'
        : 'Every product goes through a rigorous development process. No shortcuts, no empty promises. Only real specifications and measurable results.',
    },
    {
      icon: Shield,
      title: isEs ? 'Calidad sin compromiso' : 'Uncompromised quality',
      text: isEs
        ? 'Seleccionamos materiales premium y componentes de última generación. Cada detalle está pensado para durar.'
        : 'We select premium materials and cutting-edge components. Every detail is designed to last.',
    },
    {
      icon: Heart,
      title: isEs ? 'Diseño centrado en el usuario' : 'User-centered design',
      text: isEs
        ? 'No diseñamos para impresionar. Diseñamos para que encaje perfecto en tu rutina diaria sin complicaciones.'
        : 'We don\'t design to impress. We design to fit perfectly into your daily routine without complications.',
    },
    {
      icon: Zap,
      title: isEs ? 'Innovación accesible' : 'Accessible innovation',
      text: isEs
        ? 'Tecnología premium no debería costar una fortuna. Ofrecemos productos de alta gama a precios justos.'
        : 'Premium technology shouldn\'t cost a fortune. We offer high-end products at fair prices.',
    },
  ]

  const stats = [
    { value: '6.000+', label: isEs ? 'Clientes en Europa' : 'Customers in Europe' },
    { value: '4.9', label: isEs ? 'Valoración media' : 'Average rating' },
    { value: '30', label: isEs ? 'Noches de garantía' : 'Night guarantee' },
    { value: '24h', label: isEs ? 'Envío processing' : 'Order processing' },
  ]

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <div className="grid h-6 w-6 grid-cols-2 gap-[2px] rounded-md border border-white/10 bg-white/[0.03] p-0.5">
              <span className="rounded-[2px] bg-[#cfd8e6]" />
              <span className="rounded-[2px] bg-[#8da3c4]" />
              <span className="rounded-[2px] bg-[#7186a4]" />
              <span className="rounded-[2px] bg-[#d8d0c4]" />
            </div>
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
              ? 'Tecnología que mejora tu descanso'
              : 'Technology that improves your rest'}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#8791a1]">
            {isEs
              ? 'Noctip nació de una idea simple: la tecnología debería hacer tu vida mejor, no más complicada. Diseñamos productos de sueño y recuperación que realmente funcionan, sin marketing excesivo ni promesas vacías.'
              : 'Noctip was born from a simple idea: technology should make your life better, not more complicated. We design sleep and recovery products that actually work, without excessive marketing or empty promises.'}
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
            {isEs ? 'Nuestra misión' : 'Our mission'}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#8791a1]">
            {isEs
              ? 'Hacer que la tecnología de sueño y recuperación de alta gama sea accesible para todos. Productos que realmente funcionan, a precios justos, con una garantía que elimina el riesgo.'
              : 'Make high-end sleep and recovery technology accessible to everyone. Products that actually work, at fair prices, with a guarantee that eliminates risk.'}
          </p>
          <Link href={`/${locale}/shop/all`}
            className="mt-8 inline-flex items-center rounded-full bg-[#f2eee7] px-8 py-4 text-[14px] font-semibold text-[#11161d] transition-all hover:bg-white hover:-translate-y-[1px]">
            {isEs ? 'Ver productos' : 'View products'}
          </Link>
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
