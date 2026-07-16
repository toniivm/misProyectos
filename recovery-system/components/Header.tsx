'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import {
  ShoppingCart, Menu, X, ChevronRight, User, LogOut,
  ArrowLeft, PackageCheck,
} from 'lucide-react'
import {
  CATEGORIES,
  getLocalizedCategoryName,
} from '../lib/catalog'

interface HeaderProps {
  showBackButton?: boolean
  backLabel?: string
  backHref?: string
}

export default function Header({ showBackButton = false, backLabel, backHref }: HeaderProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const pathname = usePathname() || '/'
  const { totalItems, open: openCart } = useCart()
  const auth = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const switchHref = (() => {
    let p = pathname
    if (!p.startsWith('/')) p = '/' + p
    if (/^\/es(\/|$)/.test(p)) return p.replace(/^\/es/, '/en')
    if (/^\/en(\/|$)/.test(p)) return p.replace(/^\/en/, '/es')
    return `/${locale === 'es' ? 'en' : 'es'}${p === '/' ? '/' : p}`
  })()

  const resolvedBackLabel = backLabel ?? (isEs ? 'Volver' : 'Back')
  const resolvedBackHref = backHref ?? `/${locale}`

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev || '' }
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className={`sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'bg-[rgba(8,12,16,0.95)] h-14' : 'bg-[rgba(8,12,16,0.88)] h-16'
      }`}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-full items-center gap-4 sm:gap-6">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5">
              <Image src="/images/logo/logo.png" alt="Noctip" width={32} height={32} priority className="object-contain" sizes="32px" />
              <span className="hidden text-[13px] font-bold uppercase tracking-[0.14em] text-[#f2eee7] sm:block">Noctip</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              <Link href={`/${locale}/shop/all`}
                className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                {isEs ? 'Productos' : 'Products'}
              </Link>
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`}
                  className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                  {getLocalizedCategoryName(cat, locale)}
                </Link>
              ))}
              <Link href={`/${locale}/contact`}
                className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                {isEs ? 'Contacto' : 'Contact'}
              </Link>
              <Link href={`/${locale}/about`}
                className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                {isEs ? 'Sobre nosotros' : 'About'}
              </Link>
            </nav>

            <div className="flex-1" />

            {/* Desktop Actions */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {showBackButton && (
                <Link href={resolvedBackHref}
                  className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:border-white/20 hover:bg-white/[0.06] active:scale-95 transition-all min-h-[40px]">
                  <ArrowLeft size={14} />
                  {resolvedBackLabel}
                </Link>
              )}

              <Link href={`/${locale}/tracking`}
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                {isEs ? 'Seguimiento' : 'Track order'}
              </Link>

              <Link href={switchHref}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200 min-h-[44px]"
                aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}>
                <span>{locale === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              {/* User menu */}
              {!auth.user ? (
                <button onClick={() => auth.openModal()}
                  className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-[#8791a1] transition hover:border-white/20 hover:text-[#f2eee7] active:scale-95 min-h-[44px]">
                  <User size={14} />
                  <span className="hidden sm:inline text-[12px] font-medium">{isEs ? 'Entrar' : 'Sign in'}</span>
                </button>
              ) : (
                <UserMenuInline locale={locale} auth={auth} />
              )}

              <button onClick={openCart}
                aria-label={`Cart - ${totalItems} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#8791a1] transition-colors duration-200 hover:text-[#f2eee7] hover:bg-white/[0.04] active:scale-95">
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#10BFD8] px-1 text-[10px] font-bold text-[#080c12]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-[#8791a1] transition-colors duration-200 hover:text-[#f2eee7] active:scale-95"
                aria-label="Menu">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[320px] flex flex-col bg-[#0a0e14] border-l border-white/[0.06] shadow-[-20px_0_60px_rgba(0,0,0,0.5)] md:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Image src="/images/logo/logo.png" alt="Noctip" width={28} height={28} className="object-contain" sizes="28px" />
                  <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#f2eee7]">Noctip</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#8791a1] transition-colors hover:bg-white/[0.06] hover:text-[#f2eee7] active:scale-95"
                  aria-label={isEs ? 'Cerrar menú' : 'Close menu'}>
                  <X size={18} />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5a6678]">
                  {isEs ? 'Productos' : 'Products'}
                </div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
                  <Link href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    {isEs ? 'Todos los productos' : 'All products'}
                    <ChevronRight size={16} className="text-[#5a6678]" />
                  </Link>
                </motion.div>
                {CATEGORIES.map((cat, idx) => (
                  <motion.div key={cat.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + (idx + 1) * 0.05 }}>
                    <Link href={`/${locale}/shop/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                      {getLocalizedCategoryName(cat, locale)}
                      <ChevronRight size={16} className="text-[#5a6678]" />
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 mx-3 h-px bg-white/[0.06]" />

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    {isEs ? 'Contacto' : 'Contact'}
                  </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}>
                  <Link href={`/${locale}/about`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    {isEs ? 'Sobre nosotros' : 'About'}
                  </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }}>
                  <Link href={`/${locale}/tracking`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    {isEs ? 'Seguimiento' : 'Track order'}
                  </Link>
                </motion.div>
              </nav>

              {/* Menu Footer */}
              <div className="border-t border-white/[0.06] px-4 py-4 space-y-2">
                <Link href={switchHref} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium text-[#8791a1] hover:bg-white/[0.04] hover:text-[#f2eee7] active:bg-white/[0.08] transition-all min-h-[48px]">
                  <span>{isEs ? 'Idioma' : 'Language'}</span>
                  <span className="text-[13px] font-semibold text-[#10BFD8]">{locale === 'es' ? 'ES → EN' : 'EN → ES'}</span>
                </Link>
                <Link href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-[#f2eee7] px-4 py-3.5 text-[14px] font-semibold text-[#080c12] min-h-[48px] active:scale-[0.98] transition-transform">
                  {isEs ? 'Ver todos los productos' : 'View all products'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   USER MENU INLINE (for desktop header)
═══════════════════════════════════════════════════════ */
function UserMenuInline({ locale, auth }: { locale: string; auth: ReturnType<typeof useAuth> }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isEs = locale === 'es'

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-[#8791a1] transition hover:border-white/20 hover:text-[#f2eee7] active:scale-95 min-h-[44px]">
        <User size={14} />
        <span className="text-[12px] font-medium max-w-[80px] truncate">{auth.user!.displayName || auth.user!.email}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/[0.08] bg-[#0d1219] py-1.5 shadow-xl z-50">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <p className="text-[11px] text-[#5a6678] truncate">{auth.user!.email}</p>
          </div>
          <Link href={`/${locale}/account/orders`} onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] transition-colors">
            <PackageCheck size={14} />
            {isEs ? 'Mis pedidos' : 'My orders'}
          </Link>
          <button onClick={() => { auth.logout(); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-red-400 hover:bg-white/[0.04] transition-colors">
            <LogOut size={14} />
            {isEs ? 'Cerrar sesión' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  )
}
