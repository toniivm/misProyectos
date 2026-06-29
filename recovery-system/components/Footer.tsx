'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES, getLocalizedCategoryName } from '../lib/catalog'
import { Shield, CreditCard, Truck, RotateCcw } from 'lucide-react'

export default function Footer() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const t = useTranslations('footer')

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#080c10]">
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
                width={52}
                height={52}
                className="object-contain"
                sizes="52px"
              />
              <span className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#f2eee7]">Noctip</span>
            </div>
            <p className="max-w-xs text-[13px] leading-6 text-[#5a6678]">
              {isEs
                ? 'Herramientas de sueño y recuperación que funcionan. Anti-ronquidos, corrección postural y masaje cervical — diseñados para gente que no puede dormir mal.'
                : 'Sleep and recovery tools that work. Anti-snoring, posture correction, and cervical massage — designed for people who can\'t afford to sleep badly.'}
            </p>
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

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
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
