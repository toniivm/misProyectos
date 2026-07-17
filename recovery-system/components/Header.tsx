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
  ArrowLeft, PackageCheck, Search, Sparkles,
} from 'lucide-react'
import {
  CATALOG,
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
    <svg className="w-[22px] h-[16px] rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.3)]" viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="750" height="500" fill="#c60b1e"/>
      <rect y="125" width="750" height="250" fill="#ffc400"/>
    </svg>
  )

  const FlagEN = () => (
    <svg className="w-[22px] h-[16px] rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.3)]" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#FFF" strokeWidth="6"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="3"/>
      <path d="M30 0v30M0 15h60" stroke="#FFF" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="4"/>
    </svg>
  )

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(8,12,16,0.98)] h-[56px] shadow-[0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.5)]'
          : 'bg-[rgba(8,12,16,0.95)] h-[64px]'
      } backdrop-blur-2xl`}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3 group">
              <div className="relative">
                <Image src="/images/logo/logo.png" alt="Noctip" width={42} height={42} priority className="object-contain transition-transform duration-300 group-hover:scale-105" sizes="42px" />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[16px] font-extrabold tracking-[0.18em] text-[#f2eee7] uppercase">Noctip</span>
                <span className="text-[9px] font-medium tracking-[0.2em] text-[#10BFD8] uppercase mt-0.5">{isEs ? 'Sueño & Recuperación' : 'Sleep & Recovery'}</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Productos Dropdown */}
              <div ref={productsRef} className="relative">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  onMouseEnter={() => setProductsOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold text-[#c8d4e2] hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] transition-all duration-200"
                  aria-expanded={productsOpen}
                  aria-haspopup="true">
                  {isEs ? 'Productos' : 'Products'}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      onMouseLeave={() => setProductsOpen(false)}
                      className="absolute left-0 top-full mt-0 w-[280px] rounded-2xl border border-white/[0.08] bg-[#0d1219] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50">
                      <Link href={`/${locale}/shop/all`} onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-semibold text-white hover:bg-white/[0.06] transition-colors">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/10 text-[#10BFD8]">
                          <Search size={15} />
                        </span>
                        {isEs ? 'Ver todos los productos' : 'View all products'}
                      </Link>
                      <div className="my-1.5 mx-3 h-px bg-white/[0.06]" />
                      {CATALOG.slice(0, 4).map((product) => (
                        <Link key={product.slug} href={`/${locale}/products/${product.slug}`} onClick={() => setProductsOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-white hover:bg-white/[0.06] transition-colors">
                          <span className="text-lg">{product.icon}</span>
                          <span className="truncate">{isEs ? (product.name_es ?? product.name) : (product.name_en ?? product.name)}</span>
                        </Link>
                      ))}
                      <div className="my-1.5 mx-3 h-px bg-white/[0.06]" />
                      <Link href={`/${locale}/shop/sleep-audio`} onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-white hover:bg-white/[0.06] transition-colors">
                        <span className="text-lg">🌙</span>
                        {isEs ? 'Sueño y anti-ronquidos' : 'Sleep & Anti-Snoring'}
                      </Link>
                      <Link href={`/${locale}/shop/neck-recovery`} onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] text-[#8791a1] hover:text-white hover:bg-white/[0.06] transition-colors">
                        <span className="text-lg">💪</span>
                        {isEs ? 'Postura y recuperación' : 'Posture & Recovery'}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href={`/${locale}/contact`}
                className="rounded-lg px-4 py-2 text-[13px] font-semibold text-[#c8d4e2] hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] transition-all duration-200">
                {isEs ? 'Contacto' : 'Contact'}
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Link href={resolvedBackHref}
                  className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#8791a1] hover:text-white hover:border-white/20 hover:bg-white/[0.06] active:scale-95 transition-all">
                  <ArrowLeft size={12} />
                  {resolvedBackLabel}
                </Link>
              )}

              <Link href={`/${locale}/tracking`}
                className="hidden sm:flex items-center rounded-lg px-3 py-2 text-[12px] font-semibold text-[#8791a1] hover:text-white hover:bg-white/[0.06] transition-all">
                {isEs ? 'Seguimiento' : 'Track'}
              </Link>

              {/* Language */}
              <Link href={switchHref}
                className="hidden sm:flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11px] font-bold text-[#c8d4e2] hover:text-white hover:border-white/[0.18] hover:bg-white/[0.04] active:scale-95 transition-all"
                aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}>
                {locale === 'es' ? <FlagEN /> : <FlagES />}
                <span>{locale === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              {/* User */}
              {!auth.user ? (
                <button onClick={() => auth.openModal()}
                  className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-[12px] font-semibold text-[#c8d4e2] transition-all hover:border-[#10BFD8]/30 hover:text-white hover:bg-[#10BFD8]/5 active:scale-95"
                  aria-label={isEs ? 'Iniciar sesión' : 'Sign in'}>
                  <User size={14} />
                  <span className="hidden xl:inline">{isEs ? 'Entrar' : 'Sign in'}</span>
                </button>
              ) : (
                <UserMenuInline locale={locale} auth={auth} />
              )}

              {/* Cart */}
              <button onClick={openCart}
                aria-label={`Cart - ${totalItems} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#c8d4e2] transition-all duration-200 hover:text-white hover:bg-white/[0.06] active:scale-95">
                <ShoppingCart size={19} strokeWidth={1.8} />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#10BFD8] px-1 text-[10px] font-bold text-[#080c12] shadow-[0_2px_8px_rgba(16,191,216,0.4)]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full text-[#c8d4e2] transition-all duration-200 hover:text-white hover:bg-white/[0.06] active:scale-95"
                aria-label={isEs ? 'Abrir menú' : 'Open menu'}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[340px] flex flex-col bg-[#0a0e14] border-l border-white/[0.06] shadow-[-20px_0_80px_rgba(0,0,0,0.6)] lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Image src="/images/logo/logo.png" alt="Noctip" width={38} height={38} className="object-contain" sizes="38px" />
                  <div className="flex flex-col leading-none">
                    <span className="text-[15px] font-extrabold tracking-[0.16em] text-white uppercase">Noctip</span>
                    <span className="text-[8px] font-medium tracking-[0.18em] text-[#10BFD8] uppercase mt-0.5">{isEs ? 'Sueño & Recuperación' : 'Sleep & Recovery'}</span>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#8791a1] transition-all hover:bg-white/[0.06] hover:text-white active:scale-95"
                  aria-label={isEs ? 'Cerrar menú' : 'Close menu'}>
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-5 py-5">
                {/* Productos */}
                <div className="mb-1 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5a6678]">
                  {isEs ? 'Productos' : 'Products'}
                </div>
                <MobileLink href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)} delay={0.03}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10BFD8]/10 text-[#10BFD8]">
                    <Search size={14} />
                  </span>
                  {isEs ? 'Ver todos los productos' : 'View all products'}
                </MobileLink>
                {CATALOG.slice(0, 4).map((product, idx) => (
                  <motion.div key={product.slug}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + idx * 0.04 }}>
                    <Link href={`/${locale}/products/${product.slug}`} onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] text-[#c8d4e2] hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] transition-all min-h-[48px]">
                      <span className="text-lg">{product.icon}</span>
                      <span className="truncate">{isEs ? (product.name_es ?? product.name) : (product.name_en ?? product.name)}</span>
                    </Link>
                  </motion.div>
                ))}
                <div className="my-1.5 mx-4 h-px bg-white/[0.06]" />
                <MobileLink href={`/${locale}/shop/sleep-audio`} onClick={() => setMobileMenuOpen(false)} delay={0.1}>
                  <span className="text-lg">🌙</span>
                  {isEs ? 'Sueño y anti-ronquidos' : 'Sleep & Anti-Snoring'}
                </MobileLink>
                <MobileLink href={`/${locale}/shop/neck-recovery`} onClick={() => setMobileMenuOpen(false)} delay={0.12}>
                  <span className="text-lg">💪</span>
                  {isEs ? 'Postura y recuperación' : 'Posture & Recovery'}
                </MobileLink>

                <div className="my-3 mx-1 h-px bg-white/[0.06]" />

                <MobileLink href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)} delay={0.14}>
                  {isEs ? 'Contacto' : 'Contact'}
                </MobileLink>
                <MobileLink href={`/${locale}/tracking`} onClick={() => setMobileMenuOpen(false)} delay={0.16}>
                  {isEs ? 'Seguimiento' : 'Track order'}
                </MobileLink>
                {!auth.user && (
                  <MobileLink href="#" onClick={() => { auth.openModal(); setMobileMenuOpen(false); }} delay={0.18}>
                    {isEs ? 'Iniciar sesión' : 'Sign in'}
                  </MobileLink>
                )}
              </nav>

              {/* Footer */}
              <div className="border-t border-white/[0.06] px-5 py-5 space-y-3">
                <Link href={switchHref} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium text-[#8791a1] hover:bg-white/[0.06] hover:text-white active:bg-white/[0.08] transition-all min-h-[48px]">
                  <span>{isEs ? 'Idioma' : 'Language'}</span>
                  <span className="flex items-center gap-2.5">
                    {locale === 'es' ? <FlagEN /> : <FlagES />}
                    <span className="text-[13px] font-bold text-[#10BFD8]">{locale === 'es' ? 'EN' : 'ES'}</span>
                  </span>
                </Link>
                <Link href={`/${locale}/shop/all`} onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#10BFD8] px-4 py-3.5 text-[14px] font-bold text-[#080c12] min-h-[52px] active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(16,191,216,0.3)]">
                  <Sparkles size={15} />
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
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
      <Link href={href} onClick={onClick}
        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold text-[#f2eee7] hover:bg-white/[0.06] active:bg-white/[0.08] transition-all min-h-[48px]">
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
        className="flex h-10 items-center gap-2 rounded-full border border-white/[0.08] px-3.5 text-[#c8d4e2] transition-all hover:border-[#10BFD8]/30 hover:text-white hover:bg-[#10BFD8]/5 active:scale-95"
        aria-expanded={open}
        aria-label={isEs ? 'Menú de usuario' : 'User menu'}>
        <User size={14} />
        <span className="text-[12px] font-semibold max-w-[80px] truncate">{auth.user!.displayName || auth.user!.email}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/[0.08] bg-[#0d1219] py-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50">
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <p className="text-[11px] text-[#5a6678] truncate">{auth.user!.email}</p>
            </div>
            <Link href={`/${locale}/account/orders`} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-[#8791a1] hover:text-white hover:bg-white/[0.06] transition-colors">
              <PackageCheck size={14} />
              {isEs ? 'Mis pedidos' : 'My orders'}
            </Link>
            <button onClick={() => { auth.logout(); setOpen(false); }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-[#8791a1] hover:text-red-400 hover:bg-white/[0.06] transition-colors">
              <LogOut size={14} />
              {isEs ? 'Cerrar sesión' : 'Sign out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
