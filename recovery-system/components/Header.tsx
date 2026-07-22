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
  ArrowLeft, PackageCheck, Search, Sparkles, ChevronRight,
} from 'lucide-react'
import { CATALOG } from '../lib/catalog'

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
    const handleScroll = () => setScrolled(window.scrollY > 10)
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
    <svg className="w-[22px] h-[15px] rounded-[2px]" viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="750" height="500" fill="#c60b1e"/>
      <rect y="125" width="750" height="250" fill="#ffc400"/>
    </svg>
  )

  const FlagEN = () => (
    <svg className="w-[22px] h-[15px] rounded-[2px]" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#FFF" strokeWidth="6"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="3"/>
      <path d="M30 0v30M0 15h60" stroke="#FFF" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="4"/>
    </svg>
  )

  return (
    <>
      {/* ═══ ANNOUNCEMENT BAR ═══ */}
      <div className="bg-[#1a1a1a] text-white">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-6 py-2 text-[10px] sm:text-[12px] font-bold tracking-wide text-center">
            <span className="flex items-center gap-1.5">🚚 {isEs ? 'Envío gratis en todos los pedidos' : 'Free shipping on all orders'}</span>
            <span className="hidden sm:flex items-center gap-1.5">🔄 {isEs ? '30 noches de prueba' : '30-night trial'}</span>
            <span className="hidden md:flex items-center gap-1.5">🔒 {isEs ? 'Pago 100% seguro' : '100% secure payment'}</span>
          </div>
        </div>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : 'border-b border-[#e8e2d8]'
      }`}>
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[56px] sm:h-[64px] items-center justify-between">

            {/* Left: Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {showBackButton && (
                <Link href={resolvedBackHref}
                  className="flex items-center gap-1.5 rounded-full border border-[#e8e2d8] px-3 py-1.5 text-[11px] font-bold text-[#6b7785] hover:text-[#1a1a1a] hover:border-[#d4d0ca] active:scale-95 transition-all mr-2">
                  <ArrowLeft size={11} />
                  {resolvedBackLabel}
                </Link>
              )}

              {/* Productos Dropdown */}
              <div ref={productsRef} className="relative">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  onMouseEnter={() => setProductsOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-bold text-[#1a1a1a] hover:bg-[#f5f0eb] transition-all uppercase tracking-wide"
                  aria-expanded={productsOpen}>
                  {isEs ? 'Productos' : 'Products'}
                  <ChevronDown size={13} className={`transition-transform duration-200 text-[#6b7785] ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      onMouseLeave={() => setProductsOpen(false)}
                      className="absolute left-0 top-full mt-1 w-[260px] rounded-2xl border border-[#e8e2d8] bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50">
                      <Link href={`/${locale}/shop/all`} onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-bold text-[#1a1a1a] hover:bg-[#f5f0eb] transition-colors">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#10BFD8]/15 text-[#10BFD8]">
                          <Search size={14} />
                        </span>
                        {isEs ? 'Ver todos' : 'View all'}
                      </Link>
                      <div className="my-1.5 mx-3 h-px bg-[#e8e2d8]" />
                      {CATALOG.slice(0, 4).map((product) => (
                        <Link key={product.slug} href={`/${locale}/products/${product.slug}`} onClick={() => setProductsOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-[#f5f0eb] transition-colors">
                          <span className="text-lg w-7 text-center">{product.icon}</span>
                          <span className="truncate font-medium">{isEs ? (product.name_es ?? product.name) : (product.name_en ?? product.name)}</span>
                          <ChevronRight size={13} className="ml-auto text-[#6b7785] shrink-0" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href={`/${locale}/contact`}
                className="rounded-lg px-4 py-2 text-[13px] font-bold text-[#1a1a1a] hover:bg-[#f5f0eb] transition-all uppercase tracking-wide">
                {isEs ? 'Contacto' : 'Contact'}
              </Link>
              <Link href={`/${locale}/tracking`}
                className="rounded-lg px-4 py-2 text-[13px] font-bold text-[#1a1a1a] hover:bg-[#f5f0eb] transition-all uppercase tracking-wide">
                {isEs ? 'Seguimiento' : 'Track'}
              </Link>
            </nav>

            {/* Center: Logo */}
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5 group mx-4 lg:mx-8">
              <Image src="/images/logo/logo.png" alt="Noctip" width={44} height={44} priority className="object-contain transition-transform duration-300 group-hover:scale-105" sizes="44px" />
              <div className="flex flex-col">
                <span className="text-[16px] font-extrabold tracking-[0.2em] text-[#1a1a1a] uppercase leading-none">Noctip</span>
                <span className="text-[8px] font-bold tracking-[0.25em] text-[#10BFD8] uppercase mt-0.5 hidden sm:block">{isEs ? 'Sueño & Recuperación' : 'Sleep & Recovery'}</span>
              </div>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
              {/* Language */}
              <Link href={switchHref}
                className="flex items-center gap-1.5 rounded-lg border border-[#e8e2d8] px-2.5 py-1.5 text-[11px] font-bold text-[#1a1a1a] hover:border-[#10BFD8]/40 hover:bg-[#10BFD8]/5 active:scale-95 transition-all"
                aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}>
                {locale === 'es' ? <FlagEN /> : <FlagES />}
                <span className="text-[#10BFD8] hidden sm:inline">{locale === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              {/* Search */}
              <Link href={`/${locale}/shop/all`}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] hover:bg-[#f5f0eb] active:scale-95 transition-all"
                aria-label={isEs ? 'Buscar' : 'Search'}>
                <Search size={18} />
              </Link>

              {/* User */}
              {!auth.user ? (
                <button onClick={() => auth.openModal()}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] hover:bg-[#f5f0eb] active:scale-95 transition-all"
                  aria-label={isEs ? 'Iniciar sesión' : 'Sign in'}>
                  <User size={18} />
                </button>
              ) : (
                <UserMenuInline locale={locale} auth={auth} />
              )}

              {/* Cart */}
              <button onClick={openCart}
                aria-label={`Cart - ${totalItems} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] hover:bg-[#f5f0eb] active:scale-95 transition-all">
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#10BFD8] px-1 text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(16,191,216,0.4)]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] hover:bg-[#f5f0eb] active:scale-95 transition-all"
                aria-label={isEs ? 'Menú' : 'Menu'}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MOBILE MENU ═══ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[360px] flex flex-col bg-white border-l border-[#e8e2d8] shadow-[-24px_0_80px_rgba(0,0,0,0.15)] lg:hidden"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e2d8]">
                <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                  <Image src="/images/logo/logo.png" alt="Noctip" width={38} height={38} className="object-contain" sizes="38px" />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-extrabold tracking-[0.18em] text-[#1a1a1a] uppercase leading-none">Noctip</span>
                    <span className="text-[8px] font-bold tracking-[0.22em] text-[#10BFD8] uppercase mt-0.5">{isEs ? 'Sueño & Recuperación' : 'Sleep & Recovery'}</span>
                  </div>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-[#1a1a1a] hover:bg-[#f5f0eb] active:scale-95"
                  aria-label="Cerrar">
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7785]">
                  {isEs ? 'Productos' : 'Products'}
                </div>
                <MobileLink href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)} delay={0.03}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/15 text-[#10BFD8]">
                    <Search size={16} />
                  </span>
                  {isEs ? 'Ver todos' : 'View all'}
                </MobileLink>
                {CATALOG.slice(0, 4).map((product, idx) => (
                  <motion.div key={product.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + idx * 0.04 }}>
                    <Link href={`/${locale}/products/${product.slug}`} onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-[14px] text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-[#f5f0eb] transition-all min-h-[52px]">
                      <span className="text-xl w-8 text-center">{product.icon}</span>
                      <span className="flex-1 truncate font-semibold">{isEs ? (product.name_es ?? product.name) : (product.name_en ?? product.name)}</span>
                      <ChevronRight size={16} className="text-[#6b7785] shrink-0" />
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 mx-2 h-px bg-[#e8e2d8]" />

                <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7785]">
                  {isEs ? 'Más' : 'More'}
                </div>
                <MobileLink href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)} delay={0.14}>
                  {isEs ? 'Contacto' : 'Contact'}
                </MobileLink>
                <MobileLink href={`/${locale}/tracking`} onClick={() => setMobileMenuOpen(false)} delay={0.16}>
                  {isEs ? 'Seguimiento' : 'Track order'}
                </MobileLink>
                <MobileLink href={`/${locale}/about`} onClick={() => setMobileMenuOpen(false)} delay={0.18}>
                  {isEs ? 'Sobre nosotros' : 'About us'}
                </MobileLink>
                {!auth.user && (
                  <MobileLink href="#" onClick={() => { auth.openModal(); setMobileMenuOpen(false); }} delay={0.2}>
                    {isEs ? 'Iniciar sesión' : 'Sign in'}
                  </MobileLink>
                )}
              </nav>

              {/* Mobile Footer */}
              <div className="border-t border-[#e8e2d8] px-5 py-5 space-y-3">
                <Link href={switchHref} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[14px] font-bold text-[#4a4a4a] hover:bg-[#f5f0eb] hover:text-[#1a1a1a] transition-all min-h-[52px]">
                  <span>{isEs ? 'Cambiar idioma' : 'Change language'}</span>
                  <span className="flex items-center gap-2.5">
                    {locale === 'es' ? <FlagEN /> : <FlagES />}
                    <span className="text-[13px] font-bold text-[#10BFD8]">{locale === 'es' ? 'English' : 'Español'}</span>
                  </span>
                </Link>
                <Link href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2.5 rounded-full bg-[#10BFD8] px-5 py-4 text-[15px] font-extrabold text-white min-h-[56px] active:scale-[0.98] transition-transform shadow-[0_6px_24px_rgba(16,191,216,0.35)]">
                  <Sparkles size={16} />
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

function MobileLink({ href, onClick, delay = 0, children }: { href: string; onClick: () => void; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
      <Link href={href} onClick={onClick}
        className="flex items-center gap-3.5 rounded-xl px-4 py-4 text-[15px] font-bold text-[#1a1a1a] hover:bg-[#f5f0eb] transition-all min-h-[52px]">
        {children}
      </Link>
    </motion.div>
  )
}

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
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] hover:bg-[#f5f0eb] active:scale-95 transition-all"
        aria-expanded={open}
        aria-label={isEs ? 'Menú de usuario' : 'User menu'}>
        <User size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[#e8e2d8] bg-white py-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50">
            <div className="px-5 py-3 border-b border-[#e8e2d8]">
              <p className="text-[11px] text-[#6b7785] truncate">{auth.user!.email}</p>
            </div>
            <Link href={`/${locale}/account/orders`} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-[13px] font-bold text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-[#f5f0eb] transition-colors">
              <PackageCheck size={15} />
              {isEs ? 'Mis pedidos' : 'My orders'}
            </Link>
            <button onClick={() => { auth.logout(); setOpen(false); }}
              className="flex w-full items-center gap-3 px-5 py-3 text-[13px] font-bold text-[#4a4a4a] hover:text-red-500 hover:bg-[#f5f0eb] transition-colors">
              <LogOut size={15} />
              {isEs ? 'Cerrar sesión' : 'Sign out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
