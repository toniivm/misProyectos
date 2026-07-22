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
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:py-20 sm:px-6">
        {/* Main grid */}
        <div className="grid gap-10 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo/logo.png"
                alt="Noctip"
                width={38}
                height={38}
                className="object-contain"
                sizes="38px"
              />
              <span className="text-[14px] font-extrabold uppercase tracking-[0.2em] text-[#f2eee7]">Noctip</span>
            </div>
            <p className="max-w-sm text-[12px] sm:text-[13px] leading-[1.7] text-[#5a6678]">
              {isEs
                ? 'Herramientas de sueño y recuperación que funcionan. Anti-ronquidos, corrección postural y masaje cervical — diseñados para gente que no puede dormir mal.'
                : 'Sleep and recovery tools that work. Anti-snoring, posture correction, and cervical massage — designed for people who can\'t afford to sleep badly.'}
            </p>

            {/* Customer Service inline */}
            <div className="flex items-center gap-3 text-[12px] text-[#6b7785]">
              <Mail size={13} className="text-[#10BFD8]" />
              <a href="mailto:support@noctip.com" className="hover:text-[#10BFD8] transition-colors">support@noctip.com</a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2.5">
              <a href="https://www.tiktok.com/@noctip2" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#5a6678] transition-all hover:border-[rgba(16,191,216,0.15)] hover:text-[#10BFD8] active:scale-95"
                aria-label="TikTok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.46V13a8.28 8.28 0 0 0 5.58 2.15v-3.45a4.85 4.85 0 0 1-5.58-2.74V6.69h5.58z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="sm:col-span-1 lg:col-span-2">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Productos' : 'Products'}
            </div>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${locale}/shop/${cat.slug}`}
                    className="text-[13px] text-[#6b7785] transition-colors hover:text-[#f2eee7]">
                    {getLocalizedCategoryName(cat, locale)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${locale}/shop/all`}
                  className="text-[13px] text-[#6b7785] transition-colors hover:text-[#f2eee7]">
                  {isEs ? 'Ver todos' : 'All products'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="sm:col-span-1 lg:col-span-2">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Ayuda' : 'Support'}
            </div>
            <ul className="space-y-2">
              {[
                { label: isEs ? 'Contacto' : 'Contact', href: `/${locale}/contact` },
                { label: isEs ? 'Sobre nosotros' : 'About us', href: `/${locale}/about` },
                { label: isEs ? 'Seguimiento' : 'Track order', href: `/${locale}/tracking` },
                { label: isEs ? 'Devoluciones' : 'Returns', href: `/${locale}/legal/returns` },
                { label: isEs ? 'Envíos' : 'Shipping', href: `/${locale}/legal/shipping` },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-[#6b7785] transition-colors hover:text-[#f2eee7]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
                {isEs ? 'Políticas' : 'Policies'}
              </div>
              <ul className="space-y-2">
                {[
                  { label: isEs ? 'Privacidad' : 'Privacy', href: `/${locale}/legal/privacy` },
                  { label: isEs ? 'Términos' : 'Terms', href: `/${locale}/legal/terms` },
                  { label: isEs ? 'Cookies' : 'Cookies', href: `/${locale}/legal/cookies` },
                  { label: isEs ? 'Aviso legal' : 'Legal notice', href: `/${locale}/legal/legal-notice` },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-[#6b7785] transition-colors hover:text-[#f2eee7]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <div className="mb-2 text-[12px] font-semibold text-[#f2eee7]">
                {isEs ? 'Suscríbete y obtén 10% de descuento' : 'Subscribe and get 10% off'}
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2.5 text-[12px] text-emerald-300">
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
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-9 pr-3 text-[15px] text-[#f2eee7] placeholder-[#4a5568] outline-none transition focus:border-[#10BFD8]/40 focus:bg-white/[0.05] disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8] text-[#080c12] transition-all hover:bg-[#0ea5c7] active:scale-95 disabled:opacity-50"
                    aria-label={isEs ? 'Suscribirse' : 'Subscribe'}
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
              {error && <p className="mt-1.5 text-[11px] text-red-400">{error}</p>}
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping', sub: isEs ? 'En todos los pedidos' : 'On all orders' },
            { icon: RotateCcw, label: isEs ? 'Devolución 30 días' : '30-day returns', sub: isEs ? 'Sin preguntas' : 'No questions asked' },
            { icon: CreditCard, label: isEs ? 'Pago seguro' : 'Secure payment', sub: 'SSL + Stripe' },
            { icon: Shield, label: isEs ? 'Garantía 30 noches' : '30-night guarantee', sub: isEs ? 'Devolución completa' : 'Full refund' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 transition-all hover:border-[rgba(16,191,216,0.15)]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.08)]">
                <Icon size={13} className="text-[#10BFD8]" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#f2eee7]">{label}</div>
                <div className="text-[9px] text-[#5a6678]">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-8">
          <div className="mb-2 text-[10px] text-[#3d4a5c] text-center sm:text-left">
            {isEs ? 'Métodos de pago:' : 'Payment methods:'}
          </div>
          <PaymentLogos className="sm:justify-start" />
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#3d4a5c]">
            &copy; {new Date().getFullYear()} Noctip&trade;. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
              <Lock size={10} className="text-[#10BFD8]" />
              <span className="text-[9px] font-medium text-[#5a6678]">{isEs ? 'SSL Seguro' : 'SSL Secure'}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1">
              <CreditCard size={10} className="text-[#10BFD8]" />
              <span className="text-[9px] font-medium text-[#5a6678]">Stripe Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
