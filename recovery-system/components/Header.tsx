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
  ShoppingCart, Menu, X, ChevronDown, User, LogOut,
  ArrowLeft, PackageCheck, Search,
} from 'lucide-react'
import {
  CATALOG,
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
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const FlagES = () => (
    <svg className="w-5 h-[15px] rounded-[2px] shadow-sm" viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="750" height="500" fill="#c60b1e"/>
      <rect y="125" width="750" height="250" fill="#ffc400"/>
    </svg>
  )

  const FlagEN = () => (
    <svg className="w-5 h-[15px] rounded-[2px] shadow-sm" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#FFF" strokeWidth="6"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="3"/>
      <path d="M30 0v30M0 15h60" stroke="#FFF" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="4"/>
    </svg>
  )

  return (
    <>
      <header className={`sticky top-0 z-50 border-b border-white/[0.08] backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'bg-[rgba(8,12,16,0.97)] h-14 shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-[rgba(8,12,16,0.92)] h-16'
      }`}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-full items-center gap-3 sm:gap-5">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5">
              <Image src="/images/logo/logo.png" alt="Noctip" width={40} height={40} priority className="object-contain" sizes="40px" />
              <span className="text-[15px] font-extrabold uppercase tracking-[0.16em] text-[#f2eee7] sm:block">Noctip</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 ml-2">
              {/* Productos Dropdown */}
              <div ref={productsRef} className="relative">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200 min-h-[40px]"
                  aria-expanded={productsOpen}
                  aria-haspopup="true">
                  {isEs ? 'Productos' : 'Products'}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-white/[0.08] bg-[#0d1219] py-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)] z-50">
                      <Link href={`/${locale}/shop/all`} onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-[#f2eee7] hover:bg-white/[0.04] transition-colors">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10BFD8]/10 text-[#10BFD8]">
                          <Search size={14} />
                        </span>
                        {isEs ? 'Todos los productos' : 'All products'}
                      </Link>
                      <div className="my-1 mx-3 h-px bg-white/[0.06]" />
                      {CATALOG.slice(0, 4).map((product) => (
                        <Link key={product.slug} href={`/${locale}/products/${product.slug}`} onClick={() => setProductsOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] transition-colors">
                          <span className="text-base">{product.icon}</span>
                          <span className="truncate">{isEs ? (product.name_es ?? product.name) : (product.name_en ?? product.name)}</span>
                        </Link>
                      ))}
                      <div className="my-1 mx-3 h-px bg-white/[0.06]" />
                      <Link href={`/${locale}/shop/sleep-audio`} onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] transition-colors">
                        <span className="text-base">🌙</span>
                        {isEs ? 'Sueño y anti-ronquidos' : 'Sleep & Anti-Snoring'}
                      </Link>
                      <Link href={`/${locale}/shop/neck-recovery`} onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] transition-colors">
                        <span className="text-base">💪</span>
                        {isEs ? 'Postura y recuperación' : 'Posture & Recovery'}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href={`/${locale}/contact`}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200 min-h-[40px] flex items-center">
                {isEs ? 'Contacto' : 'Contact'}
              </Link>
            </nav>

            <div className="flex-1" />

            {/* Desktop Actions */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              {showBackButton && (
                <Link href={resolvedBackHref}
                  className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:border-white/20 hover:bg-white/[0.06] active:scale-95 transition-all min-h-[36px]">
                  <ArrowLeft size={12} />
                  {resolvedBackLabel}
                </Link>
              )}

              <Link href={`/${locale}/tracking`}
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200 min-h-[40px]">
                {isEs ? 'Seguimiento' : 'Track order'}
              </Link>

              {/* Language switcher */}
              <Link href={switchHref}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[11px] font-semibold text-[#8791a1] hover:text-[#f2eee7] hover:border-white/[0.16] active:scale-95 transition-all duration-200 min-h-[40px]"
                aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}>
                {locale === 'es' ? <FlagEN /> : <FlagES />}
                <span>{locale === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              {/* User menu */}
              {!auth.user ? (
                <button onClick={() => auth.openModal()}
                  className="hidden sm:flex h-10 items-center gap-2 rounded-full border border-white/[0.08] px-3 text-[#8791a1] transition hover:border-white/20 hover:text-[#f2eee7] active:scale-95 min-h-[40px]"
                  aria-label={isEs ? 'Iniciar sesión' : 'Sign in'}>
                  <User size={14} />
                  <span className="hidden lg:inline text-[12px] font-medium">{isEs ? 'Entrar' : 'Sign in'}</span>
                </button>
              ) : (
                <UserMenuInline locale={locale} auth={auth} />
              )}

              {/* Cart */}
              <button onClick={openCart}
                aria-label={`Cart - ${totalItems} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#8791a1] transition-colors duration-200 hover:text-[#f2eee7] hover:bg-white/[0.04] active:scale-95 min-h-[44px] min-w-[44px]">
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#10BFD8] px-1 text-[10px] font-bold text-[#080c12]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-[#8791a1] transition-colors duration-200 hover:text-[#f2eee7] active:scale-95 min-h-[44px] min-w-[44px]"
                aria-label={isEs ? 'Abrir menú' : 'Open menu'}>
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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
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
                <div className="flex items-center gap-3">
                  <Image src="/images/logo/logo.png" alt="Noctip" width={36} height={36} className="object-contain" sizes="36px" />
                  <span className="text-[15px] font-extrabold uppercase tracking-[0.14em] text-[#f2eee7]">Noctip</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#8791a1] transition-colors hover:bg-white/[0.06] hover:text-[#f2eee7] active:scale-95"
                  aria-label={isEs ? 'Cerrar menú' : 'Close menu'}>
                  <X size={18} />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {/* Productos section */}
                <MobileSection title={isEs ? 'Productos' : 'Products'}>
                  <Link href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10BFD8]/10 text-[#10BFD8]">
                      <Search size={14} />
                    </span>
                    {isEs ? 'Todos los productos' : 'All products'}
                  </Link>
                  {CATALOG.slice(0, 4).map((product, idx) => (
                    <motion.div key={product.slug}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}>
                      <Link href={`/${locale}/products/${product.slug}`} onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] text-[#c8d4e2] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                        <span className="text-base">{product.icon}</span>
                        <span className="truncate">{isEs ? (product.name_es ?? product.name) : (product.name_en ?? product.name)}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <div className="my-1 mx-4 h-px bg-white/[0.06]" />
                  <Link href={`/${locale}/shop/sleep-audio`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    <span className="text-base">🌙</span>
                    {isEs ? 'Sueño y anti-ronquidos' : 'Sleep & Anti-Snoring'}
                  </Link>
                  <Link href={`/${locale}/shop/neck-recovery`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    <span className="text-base">💪</span>
                    {isEs ? 'Postura y recuperación' : 'Posture & Recovery'}
                  </Link>
                </MobileSection>

                <div className="my-2 mx-3 h-px bg-white/[0.06]" />

                <MobileLink href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)} delay={0.15}>
                  {isEs ? 'Contacto' : 'Contact'}
                </MobileLink>

                <MobileLink href={`/${locale}/tracking`} onClick={() => setMobileMenuOpen(false)} delay={0.18}>
                  {isEs ? 'Seguimiento' : 'Track order'}
                </MobileLink>

                {!auth.user && (
                  <MobileLink href="#" onClick={() => { auth.openModal(); setMobileMenuOpen(false); }} delay={0.21}>
                    {isEs ? 'Iniciar sesión' : 'Sign in'}
                  </MobileLink>
                )}
              </nav>

              {/* Menu Footer */}
              <div className="border-t border-white/[0.06] px-4 py-4 space-y-2">
                <Link href={switchHref} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium text-[#8791a1] hover:bg-white/[0.04] hover:text-[#f2eee7] active:bg-white/[0.08] transition-all min-h-[48px]">
                  <span>{isEs ? 'Idioma' : 'Language'}</span>
                  <span className="flex items-center gap-2">
                    {locale === 'es' ? <FlagEN /> : <FlagES />}
                    <span className="text-[13px] font-semibold text-[#10BFD8]">{locale === 'es' ? 'EN' : 'ES'}</span>
                  </span>
                </Link>
                <Link href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-[#10BFD8] px-4 py-3.5 text-[14px] font-bold text-[#080c12] min-h-[48px] active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(16,191,216,0.3)]">
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
   MOBILE NAV HELPERS
═══════════════════════════════════════════════════════ */
function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-1">
      <div className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5a6678]">
        {title}
      </div>
      {children}
    </div>
  )
}

function MobileLink({ href, onClick, delay = 0, children }: { href: string; onClick: () => void; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
      <Link href={href} onClick={onClick}
        className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
        {children}
      </Link>
    </motion.div>
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
        className="flex h-10 items-center gap-2 rounded-full border border-white/[0.08] px-3 text-[#8791a1] transition hover:border-white/20 hover:text-[#f2eee7] active:scale-95 min-h-[40px]"
        aria-expanded={open}
        aria-label={isEs ? 'Menú de usuario' : 'User menu'}>
        <User size={14} />
        <span className="text-[12px] font-medium max-w-[80px] truncate">{auth.user!.displayName || auth.user!.email}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/[0.08] bg-[#0d1219] py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)] z-50">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
