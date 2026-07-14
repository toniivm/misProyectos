'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES, getLocalizedCategoryName } from '../lib/catalog'
import { Shield, CreditCard, Truck, RotateCcw, Mail, ArrowRight, Check, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#080c12]">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        {/* Trust bar */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {[
            { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping', sub: isEs ? 'En todos los pedidos' : 'On all orders' },
            { icon: RotateCcw, label: isEs ? 'Devolución 30 días' : '30-day returns', sub: isEs ? 'Sin preguntas' : 'No questions asked' },
            { icon: CreditCard, label: isEs ? 'Pago seguro' : 'Secure payment', sub: 'SSL + Stripe' },
            { icon: Shield, label: isEs ? 'Garantía 30 noches' : '30-night guarantee', sub: isEs ? 'Devolución completa' : 'Full refund' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all hover:border-[rgba(16,191,216,0.15)]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.08)]">
                <Icon size={16} className="text-[#10BFD8]" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#f2eee7]">{label}</div>
                <div className="text-[10px] text-[#5a6678]">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo/logo.png"
                alt="Noctip"
                width={48}
                height={48}
                className="object-contain"
                sizes="48px"
              />
              <span className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#f2eee7]">Noctip</span>
            </div>
            <p className="max-w-xs text-[13px] leading-6 text-[#5a6678]">
              {isEs
                ? 'Herramientas de sueño y recuperación que funcionan. Anti-ronquidos, corrección postural y masaje cervical — diseñados para gente que no puede dormir mal.'
                : 'Sleep and recovery tools that work. Anti-snoring, posture correction, and cervical massage — designed for people who can\'t afford to sleep badly.'}
            </p>

            {/* Newsletter */}
            <div className="max-w-xs">
              <div className="mb-2 text-[12px] font-semibold text-[#f2eee7]">
                {isEs ? 'Suscríbete y obtén 10% de descuento' : 'Subscribe and get 10% off'}
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-300">
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
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 pl-9 pr-3 text-[16px] text-[#f2eee7] placeholder-[#4a5568] outline-none transition focus:border-[#10BFD8]/40 focus:bg-white/[0.05]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8] text-[#080c12] transition-all hover:bg-[#0ea5c7] active:scale-95"
                    aria-label={isEs ? 'Suscribirse' : 'Subscribe'}
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#5a6678] transition-all hover:border-[rgba(16,191,216,0.15)] hover:text-[#10BFD8] active:scale-95"
                aria-label="Facebook">
                <Facebook size={15} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#5a6678] transition-all hover:border-[rgba(16,191,216,0.15)] hover:text-[#10BFD8] active:scale-95"
                aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#5a6678] transition-all hover:border-[rgba(16,191,216,0.15)] hover:text-[#10BFD8] active:scale-95"
                aria-label="Twitter">
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Categorías' : 'Categories'}
            </div>
            <ul className="space-y-2.5">
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
                  {isEs ? 'Todos los productos' : 'All products'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Ayuda' : 'Support'}
            </div>
            <ul className="space-y-2.5">
              {[
                { label: isEs ? 'Contáctanos' : 'Contact us', href: `/${locale}/contact` },
                { label: isEs ? 'Sobre nosotros' : 'About us', href: `/${locale}/about` },
                { label: isEs ? 'Seguimiento de pedido' : 'Track order', href: `/${locale}/tracking` },
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

          {/* Policies */}
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">
              {isEs ? 'Políticas' : 'Policies'}
            </div>
            <ul className="space-y-2.5">
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
        </div>

        {/* Payment methods */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:justify-start">
          <span className="text-[11px] text-[#3d4a5c]">{isEs ? 'Métodos de pago:' : 'Payment methods:'}</span>
          <div className="flex items-center gap-2">
            {['Visa', 'MC', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
              <span key={method} className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium text-[#5a6678]">
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#3d4a5c]">
            &copy; {new Date().getFullYear()} Noctip&trade;. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
              <Shield size={11} className="text-[#10BFD8]" />
              <span className="text-[10px] font-medium text-[#5a6678]">
                {isEs ? 'SSL Seguro' : 'SSL Secure'}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
              <CreditCard size={11} className="text-[#10BFD8]" />
              <span className="text-[10px] font-medium text-[#5a6678]">
                Stripe Payments
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
