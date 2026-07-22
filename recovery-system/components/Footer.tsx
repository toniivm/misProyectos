'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES, getLocalizedCategoryName } from '../lib/catalog'
import { Shield, CreditCard, Truck, RotateCcw, Mail, ArrowRight, Check, Lock, Phone, Clock } from 'lucide-react'
import PaymentLogos from './PaymentLogos'

export default function Footer() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (data.ok) {
        setSubscribed(true)
        setEmail('')
      } else {
        setError(isEs ? 'Error. Inténtalo de nuevo.' : 'Error. Try again.')
      }
    } catch {
      setError(isEs ? 'Error de conexión.' : 'Connection error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#080c12]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:py-16 sm:px-6">
        {/* Trust bar */}
        <div className="mb-8 sm:mb-12 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 sm:gap-6">
          {[
            { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping', sub: isEs ? 'En todos los pedidos' : 'On all orders' },
            { icon: RotateCcw, label: isEs ? 'Devolución 30 días' : '30-day returns', sub: isEs ? 'Sin preguntas' : 'No questions asked' },
            { icon: CreditCard, label: isEs ? 'Pago seguro' : 'Secure payment', sub: 'SSL + Stripe' },
            { icon: Shield, label: isEs ? 'Garantía 30 noches' : '30-night guarantee', sub: isEs ? 'Devolución completa' : 'Full refund' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 sm:px-4 py-2.5 sm:py-3 transition-all hover:border-[rgba(16,191,216,0.15)]">
              <div className="flex h-8 sm:h-9 w-8 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.08)]">
                <Icon size={14} className="text-[#10BFD8]" />
              </div>
              <div>
                <div className="text-[11px] sm:text-[12px] font-semibold text-[#f2eee7]">{label}</div>
                <div className="text-[9px] sm:text-[10px] text-[#5a6678]">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo/logo.png"
                alt="Noctip"
                width={40}
                height={40}
                className="object-contain"
                sizes="40px"
              />
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.12em] text-[#f2eee7]">Noctip</span>
            </div>
            <p className="max-w-xs text-[12px] sm:text-[13px] leading-[1.6] sm:leading-6 text-[#5a6678]">
              {isEs
                ? 'Herramientas de sueño y recuperación que funcionan. Anti-ronquidos, corrección postural y masaje cervical — diseñados para gente que no puede dormir mal.'
                : 'Sleep and recovery tools that work. Anti-snoring, posture correction, and cervical massage — designed for people who can\'t afford to sleep badly.'}
            </p>

            {/* Newsletter */}
            <div className="max-w-xs">
              <div className="mb-2 text-[11px] sm:text-[12px] font-semibold text-[#f2eee7]">
                {isEs ? 'Suscríbete y obtén 10% de descuento' : 'Subscribe and get 10% off'}
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-emerald-300">
                  <Check size={14} />
                  {isEs ? '¡Gracias! Revisa tu email.' : 'Thanks! Check your email.'}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isEs ? 'Tu email' : 'Your email'}
                      required
                      autoComplete="email"
                      inputMode="email"
                      disabled={loading}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 sm:py-3 pl-9 pr-3 text-[15px] sm:text-[16px] text-[#f2eee7] placeholder-[#4a5568] outline-none transition focus:border-[#10BFD8]/40 focus:bg-white/[0.05] disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-10 sm:h-11 w-10 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8] text-[#080c12] transition-all hover:bg-[#0ea5c7] active:scale-95 disabled:opacity-50"
                    aria-label={isEs ? 'Suscribirse' : 'Subscribe'}
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a href="https://www.tiktok.com/@noctip2" target="_blank" rel="noopener noreferrer"
                className="flex h-10 sm:h-11 w-10 sm:w-11 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#5a6678] transition-all hover:border-[rgba(16,191,216,0.15)] hover:text-[#10BFD8] active:scale-95"
                aria-label="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.46V13a8.28 8.28 0 0 0 5.58 2.15v-3.45a4.85 4.85 0 0 1-5.58-2.74V6.69h5.58z"/>
                </svg>
              </a>
            </div>

            {/* Customer Service */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
              <div className="text-[12px] font-bold text-[#f2eee7] uppercase tracking-wide">
                {isEs ? 'Atención al cliente' : 'Customer Service'}
              </div>
              <div className="space-y-2">
                <a href="mailto:support@noctip.com" className="flex items-center gap-2 text-[12px] text-[#6b7785] hover:text-[#10BFD8] transition-colors">
                  <Mail size={12} />
                  support@noctip.com
                </a>
                <div className="flex items-center gap-2 text-[12px] text-[#6b7785]">
                  <Clock size={12} />
                  {isEs ? 'Lun-Vie 9am-6pm CET' : 'Mon-Fri 9am-6pm CET'}
                </div>
              </div>
              <p className="text-[10px] text-[#4a5568] leading-[1.5]">
                {isEs ? 'Una persona real responde en menos de 24 horas.' : 'A real person responds within 24 hours.'}
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="mb-3 sm:mb-4 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Categorías' : 'Categories'}
            </div>
            <ul className="space-y-2 sm:space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${locale}/shop/${cat.slug}`}
                    className="text-[13px] sm:text-[14px] text-[#6b7785] transition-colors hover:text-[#f2eee7] active:text-[#f2eee7]">
                    {getLocalizedCategoryName(cat, locale)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${locale}/shop/all`}
                  className="text-[13px] sm:text-[14px] text-[#6b7785] transition-colors hover:text-[#f2eee7] active:text-[#f2eee7]">
                  {isEs ? 'Todos los productos' : 'All products'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="mb-3 sm:mb-4 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Ayuda' : 'Support'}
            </div>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: isEs ? 'Contáctanos' : 'Contact us', href: `/${locale}/contact` },
                { label: isEs ? 'Sobre nosotros' : 'About us', href: `/${locale}/about` },
                { label: isEs ? 'Seguimiento de pedido' : 'Track order', href: `/${locale}/tracking` },
                { label: isEs ? 'Devoluciones' : 'Returns', href: `/${locale}/legal/returns` },
                { label: isEs ? 'Envíos' : 'Shipping', href: `/${locale}/legal/shipping` },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] sm:text-[14px] text-[#6b7785] transition-colors hover:text-[#f2eee7] active:text-[#f2eee7]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <div className="mb-3 sm:mb-4 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Políticas' : 'Policies'}
            </div>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: isEs ? 'Privacidad' : 'Privacy', href: `/${locale}/legal/privacy` },
                { label: isEs ? 'Términos' : 'Terms', href: `/${locale}/legal/terms` },
                { label: isEs ? 'Cookies' : 'Cookies', href: `/${locale}/legal/cookies` },
                { label: isEs ? 'Aviso legal' : 'Legal notice', href: `/${locale}/legal/legal-notice` },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] sm:text-[14px] text-[#6b7785] transition-colors hover:text-[#f2eee7] active:text-[#f2eee7]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-3 text-[10px] sm:text-[11px] text-[#3d4a5c] text-center sm:text-left">
            {isEs ? 'Métodos de pago:' : 'Payment methods:'}
          </div>
          <PaymentLogos className="sm:justify-start" />
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 border-t border-white/[0.06] pt-6 sm:pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] sm:text-[11px] text-[#3d4a5c]">
            &copy; {new Date().getFullYear()} Noctip&trade;. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 sm:px-3 py-1 sm:py-1.5">
              <Lock size={10} className="text-[#10BFD8]" />
              <span className="text-[9px] sm:text-[10px] font-medium text-[#5a6678]">
                {isEs ? 'SSL Seguro' : 'SSL Secure'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 sm:px-3 py-1 sm:py-1.5">
              <CreditCard size={10} className="text-[#10BFD8]" />
              <span className="text-[9px] sm:text-[10px] font-medium text-[#5a6678]">
                Stripe Payments
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
