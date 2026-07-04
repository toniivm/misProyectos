'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { ArrowLeft, Mail, MessageCircle, Clock, Shield, Truck, RotateCcw, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to backend
    setSubmitted(true)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: isEs ? 'Email' : 'Email',
      value: 'noctip95@gmail.com',
      description: isEs ? 'Respuesta en menos de 24h' : 'Response within 24h',
    },
    {
      icon: MessageCircle,
      title: isEs ? 'WhatsApp' : 'WhatsApp',
      value: '+34 600 000 000',
      description: isEs ? 'Lun-Vie 9:00-18:00' : 'Mon-Fri 9:00-18:00',
    },
    {
      icon: Clock,
      title: isEs ? 'Horario' : 'Hours',
      value: isEs ? 'Lun - Vie, 9:00 - 18:00' : 'Mon - Fri, 9:00 - 18:00',
      description: isEs ? 'Hora peninsular española' : 'Spanish peninsular time',
    },
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
            {isEs ? 'Contacto' : 'Contact'}
          </span>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
            {isEs ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#8791a1]">
            {isEs
              ? 'Nuestro equipo de soporte está disponible de lunes a viernes. Resolvemos tu consulta en menos de 24 horas.'
              : 'Our support team is available Monday through Friday. We\'ll resolve your inquiry within 24 hours.'}
          </p>
        </motion.div>

        {/* Contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          {contactMethods.map((method) => (
            <div key={method.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center transition-all hover:border-white/[0.12]">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.08)]">
                <method.icon size={18} className="text-[#10BFD8]" />
              </div>
              <h3 className="mt-3 text-[13px] font-semibold text-[#f2eee7]">{method.title}</h3>
              <p className="mt-1 text-[14px] font-medium text-[#c8d4e2]">{method.value}</p>
              <p className="mt-1 text-[11px] text-[#6b7785]">{method.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          {submitted ? (
            <div className="rounded-2xl border border-[rgba(16,191,216,0.2)] bg-[rgba(16,191,216,0.05)] p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(16,191,216,0.1)]">
                <Send size={24} className="text-[#10BFD8]" />
              </div>
              <h2 className="mt-4 text-[20px] font-bold text-[#f2eee7]">
                {isEs ? 'Mensaje enviado' : 'Message sent'}
              </h2>
              <p className="mt-2 text-[14px] text-[#8791a1]">
                {isEs
                  ? 'Gracias por contactarnos. Te responderemos en menos de 24 horas.'
                  : 'Thank you for reaching out. We\'ll respond within 24 hours.'}
              </p>
              <Link href={`/${locale}`}
                className="mt-6 inline-flex items-center rounded-full bg-[#f2eee7] px-6 py-3 text-[13px] font-semibold text-[#11161d]">
                {isEs ? 'Volver a la tienda' : 'Back to shop'}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6 sm:p-8">
              <h2 className="text-[18px] font-bold text-[#f2eee7]">
                {isEs ? 'Envíanos un mensaje' : 'Send us a message'}
              </h2>
              <p className="mt-1 text-[13px] text-[#8791a1]">
                {isEs
                  ? 'Completa el formulario y te responderemos pronto.'
                  : 'Fill out the form and we\'ll get back to you soon.'}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {isEs ? 'Nombre' : 'Name'}
                  </label>
                  <input type="text" required
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {isEs ? 'Email' : 'Email'}
                  </label>
                  <input type="email" required
                    className="input-premium" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {isEs ? 'Asunto' : 'Subject'}
                  </label>
                  <select className="select-premium">
                    <option value="">{isEs ? 'Selecciona un motivo' : 'Select a reason'}</option>
                    <option value="order">{isEs ? 'Consulta sobre pedido' : 'Order inquiry'}</option>
                    <option value="return">{isEs ? 'Devolución o cambio' : 'Return or exchange'}</option>
                    <option value="product">{isEs ? 'Pregunta sobre producto' : 'Product question'}</option>
                    <option value="other">{isEs ? 'Otro' : 'Other'}</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {isEs ? 'Mensaje' : 'Message'}
                  </label>
                  <textarea rows={4} required
                    placeholder={isEs ? 'Describe tu consulta...' : 'Describe your inquiry...'}
                    className="input-premium resize-none" />
                </div>
              </div>

              <button type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3.5 text-[14px] font-semibold text-[#11161d] transition-all hover:bg-white hover:-translate-y-[1px]">
                <Send size={14} />
                {isEs ? 'Enviar mensaje' : 'Send message'}
              </button>
            </form>
          )}
        </motion.div>

        {/* FAQ quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-center text-[18px] font-bold text-[#f2eee7]">
            {isEs ? 'Preguntas rápidas' : 'Quick questions'}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { q: isEs ? '¿Cuánto tarda el envío?' : 'How long does shipping take?', a: isEs ? '6-9 días laborables en Europa' : '6-9 business days in Europe' },
              { q: isEs ? '¿Cómo devuelvo un producto?' : 'How do I return a product?', a: isEs ? 'Contacta con nosotros en 30 días' : 'Contact us within 30 days' },
              { q: isEs ? '¿El pago es seguro?' : 'Is checkout secure?', a: 'SSL 256-bit + Stripe' },
              { q: isEs ? '¿Dónde está mi pedido?' : 'Where is my order?', a: isEs ? 'Email de seguimiento en 24h' : 'Tracking email within 24h' },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                <p className="text-[13px] font-semibold text-[#f2eee7]">{item.q}</p>
                <p className="mt-1 text-[12px] text-[#8791a1]">{item.a}</p>
              </div>
            ))}
          </div>
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
