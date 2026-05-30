'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations('nav')
  const rawPathname = usePathname() || '/'
  const switchHref = (() => {
    let p = rawPathname
    if (!p.startsWith('/')) p = '/' + p
    // If path already starts with /es or /en, swap that prefix
    if (/^\/es(\/|$)/.test(p)) return p.replace(/^\/es/, '/en')
    if (/^\/en(\/|$)/.test(p)) return p.replace(/^\/en/, '/es')
    // Fallback: prefix with the opposite of provider locale
    const other = locale === 'es' ? 'en' : 'es'
    return `/${other}${p === '/' ? '/' : p}`
  })()
  const auth = useAuth()

  const links = [
    { label: t('links.system'), href: '#system' },
    { label: t('links.benefits'), href: '#benefits' },
    { label: t('links.reviews'), href: '#testimonials' },
    { label: t('links.plans'), href: '#offer' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080c16]/92 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-electric-500 rounded-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                <svg viewBox="0 0 32 32" fill="none" className="relative w-8 h-8">
                  <rect x="4" y="4" width="10" height="10" rx="2" fill="#0ea5e9" />
                  <rect x="18" y="4" width="10" height="10" rx="2" fill="#0ea5e9" opacity="0.4" />
                  <rect x="4" y="18" width="10" height="10" rx="2" fill="#0ea5e9" opacity="0.4" />
                  <rect x="18" y="18" width="10" height="10" rx="2" fill="#0ea5e9" />
                </svg>
              </div>
              <span className="font-display font-bold text-sm tracking-[0.2em] uppercase text-white">
                Recovery System<span className="text-electric-400">™</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium tracking-[0.12em] uppercase text-slate-400 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA + language + auth */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <a href="#offer" className="btn-primary text-xs py-2.5 px-5">
                  <span className="relative z-10">{t('cta')}</span>
                </a>
                <div className="text-[9px] text-slate-600 text-center mt-1 tracking-wide">Free shipping · 30-day guarantee</div>
              </div>

              <div className="flex items-center gap-3">
                <a href={switchHref} className="text-xs text-slate-400 hover:text-white transition">{locale.toUpperCase()}</a>
                {auth && auth.user ? (
                  <button data-rs-login="true" onClick={() => auth.logout()} className="text-xs text-slate-300 hover:text-white">{t('logout')}</button>
                ) : (
                  <button data-rs-login="true" onClick={() => auth.openModal()} className="text-xs text-slate-300 hover:text-white">{t('login')}</button>
                )}
              </div>
            </div>

            {/* Desktop quick auth button (always visible on large screens) */}
            <button
              data-rs-login="true"
              onClick={() => {
                if (auth && auth.user) auth.logout()
                else auth.openModal()
              }}
              className="hidden lg:inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-md border border-white/[0.04] hover:bg-white/5"
            >
              {auth && auth.user ? t('logout') : (t('login') || 'Iniciar sesión')}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-slate-400 hover:text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#050508]/95 backdrop-blur-xl border-b border-white/5 lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium tracking-[0.12em] uppercase text-slate-300 hover:text-electric-400 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a href="#offer" className="btn-primary text-xs w-full justify-center" onClick={() => setMenuOpen(false)}>
                <span className="relative z-10">Start Recovering</span>
              </a>
              <a
                href={switchHref}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-[0.12em] uppercase text-slate-300 hover:text-electric-400 transition-colors"
              >
                {locale.toUpperCase()}
              </a>
              <button
                data-rs-login="true"
                onClick={() => {
                  if (auth && auth.user) {
                    auth.logout();
                    setMenuOpen(false);
                  } else {
                    auth.openModal();
                    setMenuOpen(false);
                  }
                }}
                className="text-sm font-medium tracking-[0.12em] uppercase text-slate-300 hover:text-electric-400 transition-colors"
              >
                {auth && auth.user ? t('logout') : (t('login') || 'Iniciar sesión')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
