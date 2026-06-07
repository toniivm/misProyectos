'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { CATEGORIES, getLocalizedCategoryName } from '../lib/catalog'
import { Shield, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const t = useTranslations('footer')

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#080c10]">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="grid h-7 w-7 grid-cols-2 gap-[3px] rounded-lg border border-white/10 bg-white/[0.04] p-1">
                <span className="rounded-[3px] bg-[#cfd8e6]" />
                <span className="rounded-[3px] bg-[#8da3c4]" />
                <span className="rounded-[3px] bg-[#7186a4]" />
                <span className="rounded-[3px] bg-[#d8d0c4]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">Noctas</span>
            </div>
            <p className="max-w-xs text-[13px] leading-6 text-[#5a6678]">
              {isEs
                ? 'Productos premium de sueño y recuperación para el bienestar diario. Herramientas limpias, rutinas más inteligentes.'
                : 'Premium sleep and recovery products for daily wellness. Cleaner tools, smarter routines.'}
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-[#5a6678] transition hover:border-white/[0.15] hover:text-[#f2eee7]">
                  <Icon size={15} />
                </a>
              ))}
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
                { label: isEs ? 'Contáctanos' : 'Contact us', href: '#' },
                { label: isEs ? 'Seguir pedido' : 'Track order', href: '#' },
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
        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#3d4a5c]">
            &copy; {new Date().getFullYear()} Noctas&trade;. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-3">
            <Shield size={11} className="text-[#3d4a5c]" />
            <span className="text-[11px] text-[#3d4a5c]">
              {isEs ? 'SSL Secure · Pagos Stripe' : 'SSL Secure · Stripe Payments'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
