'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import {
  ShoppingCart, Check, ChevronRight, Menu, X,
  Shield, Truck, RotateCcw, User, LogOut,
  PackageCheck, ArrowRight, Star, Minus, Plus,
  CreditCard, Headphones, Moon, Zap, Heart,
  ChevronDown, Sparkles, ShieldCheck, Clock,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG, CATEGORIES,
  getLocalizedCategoryName, getLocalizedProductName,
  getLocalizedProductShortDescription,
  type CatalogProduct,
} from '../lib/catalog'
import ProductImage from './ProductImage'
import Badge from './ui/Badge'
import FAQ from './ui/FAQ'

const ANNOUNCEMENT_MESSAGES = {
  en: [
    { icon: Truck, text: 'Free shipping · 30-night trial · Secure checkout' },
  ],
  es: [
    { icon: Truck, text: 'Envío gratis · 30 noches de prueba · Pago seguro' },
  ],
}

const COPY = {
  en: {
    add: 'Add',
    added: 'Added',
    cart: 'Cart',
    nav: { shop: 'Shop', track: 'Track order', signIn: 'Sign in', about: 'About' },
    hero: {
      badge: 'Trusted by thousands across Europe',
      title1: 'Sleep better.',
      title2: 'Wake up restored.',
      subtitle: 'Premium sleep and recovery technology designed for people who can\'t afford to sleep badly.',
      cta: 'Shop now',
      secondary: 'View all products',
      price: 'From €13.99',
      socialProof: '30-day money-back guarantee',
    },
    trust: [
      { icon: Truck, label: 'Free shipping', sub: 'On every order, worldwide' },
      { icon: RotateCcw, label: '30-night trial', sub: 'Full refund, no questions' },
      { icon: ShieldCheck, label: 'Secure checkout', sub: 'SSL + Stripe encryption' },
      { icon: Headphones, label: 'Real support', sub: 'Human response in 24h' },
    ],
    problems: {
      heading: 'Problems we solve',
      sub: 'You\'re not alone. These are the issues our products address every day.',
      items: [
        { icon: Moon, title: 'Snoring', text: 'You snore every night. Your partner can\'t sleep. You wake up tired no matter how many hours you rest.' },
        { icon: Zap, title: 'Back pain', text: 'Hours at a desk have destroyed your posture. Your back hurts. Your neck is stiff. You\'ve tried everything.' },
        { icon: Heart, title: 'Poor sleep quality', text: 'You can\'t fall asleep. Your mind won\'t stop. You need something that actually helps you rest.' },
      ],
    },
    products: { heading: 'Our products', sub: 'Each one solves a specific problem. No gimmicks.' },
    howItWorks: {
      heading: 'How it works',
      sub: 'Three steps to better sleep',
      steps: [
        { num: '01', title: 'Choose your product', text: 'Snoring? Back pain? Neck tension? Pick the product that matches your problem.' },
        { num: '02', title: 'At your door tomorrow', text: 'We ship within 24 hours. Free delivery across Europe. Tracking included.' },
        { num: '03', title: '30 nights to decide', text: 'Try it in your real life. If it doesn\'t work, we refund every cent. No questions.' },
      ],
    },
    comparison: {
      heading: 'Why Noctip?',
      sub: 'We\'re not the cheapest. We\'re the ones that work.',
      rows: [
        { feature: '30-night trial', us: true, them: false },
        { feature: 'Free shipping', us: true, them: false },
        { feature: 'Medical-grade materials', us: true, them: false },
        { feature: 'Real customer support', us: true, them: false },
        { feature: 'Secure checkout (Stripe)', us: true, them: false },
        { feature: 'Fast processing (24h)', us: true, them: false },
      ],
    },
    guarantees: {
      heading: 'Our guarantees',
      sub: 'Built on trust, not fine print',
      items: [
        { icon: RotateCcw, title: '30-night trial', text: 'Test any product for 30 nights. If it doesn\'t work for you, we arrange a free return and full refund.' },
        { icon: Truck, title: 'Free shipping', text: 'Every order ships free within Europe. We process and dispatch within 24 hours.' },
        { icon: ShieldCheck, title: 'Secure payments', text: 'All transactions processed through Stripe with 256-bit SSL encryption.' },
        { icon: Headphones, title: 'Real support', text: 'Have a question? Write to us and a real person answers within 24 hours.' },
      ],
    },
    faq: {
      heading: 'Common questions',
      sub: 'Quick answers before you buy',
      items: [
        { q: 'How fast is shipping?', a: 'We ship all orders within 24 hours. Standard delivery: 6-9 business days across Europe. Tracking included.' },
        { q: 'What does the 30-night guarantee cover?', a: 'Test any product for 30 nights. If it doesn\'t meet your expectations, we arrange a free return and full refund.' },
        { q: 'How does the anti-snoring mouthpiece work?', a: 'The Noctip Halo uses jaw advancement to gently move your lower jaw forward, opening your airway and stopping snoring.' },
        { q: 'Is checkout secure?', a: 'Yes. All payments processed through Stripe with 256-bit SSL encryption. We never store card details.' },
        { q: 'How do I contact support?', a: 'Email us at support@noctip.com. A real person responds within 24 hours.' },
        { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, American Express, PayPal, Apple Pay, and Google Pay.' },
      ],
    },
    cta: {
      heading: 'Ready to sleep better?',
      sub: 'Start with one product. If it doesn\'t work, we\'ll refund everything.',
      primary: 'Shop now',
      secondary: 'View best sellers',
    },
    mobile: { cta: 'Shop now' },
  },
  es: {
    add: 'Añadir',
    added: 'Añadido',
    cart: 'Carrito',
    nav: { shop: 'Tienda', track: 'Seguimiento', signIn: 'Entrar', about: 'Nosotros' },
    hero: {
      badge: 'Confianza de miles de personas en Europa',
      title1: 'Duerme mejor.',
      title2: 'Despierta renovado.',
      subtitle: 'Tecnología premium de sueño y recuperación, diseñada para personas que no pueden permitirse dormir mal.',
      cta: 'Comprar ahora',
      secondary: 'Ver todos los productos',
      price: 'Desde €13.99',
      socialProof: 'Garantía de devolución de 30 noches',
    },
    trust: [
      { icon: Truck, label: 'Envío gratis', sub: 'En todos los pedidos' },
      { icon: RotateCcw, label: '30 noches de prueba', sub: 'Reembolso completo' },
      { icon: ShieldCheck, label: 'Pago seguro', sub: 'Cifrado SSL + Stripe' },
      { icon: Headphones, label: 'Soporte real', sub: 'Respuesta en 24h' },
    ],
    problems: {
      heading: 'Problemas que resolvemos',
      sub: 'No estás solo. Estos son los problemas que nuestros productos abordan cada día.',
      items: [
        { icon: Moon, title: 'Ronquidos', text: 'Roncas cada noche. Tu pareja no puede dormir. Despiertas cansado sin importar cuántas horas duermas.' },
        { icon: Zap, title: 'Dolor de espalda', text: 'Horas frente al ordenador han destruido tu postura. Te duele la espalda. El cuello tenso. Lo has intentado todo.' },
        { icon: Heart, title: 'Mala calidad de sueño', text: 'No puedes dormirte. Tu mente no para. Necesitas algo que realmente te ayude a descansar.' },
      ],
    },
    products: { heading: 'Nuestros productos', sub: 'Cada uno resuelve un problema específico. Sin trucos.' },
    howItWorks: {
      heading: 'Cómo funciona',
      sub: '3 pasos para dormir mejor',
      steps: [
        { num: '01', title: 'Elige tu producto', text: '¿Roncas? ¿Dolor de espalda? ¿Tensión en el cuello? Elige el producto que se adapta a tu problema.' },
        { num: '02', title: 'Mañana en tu puerta', text: 'Enviamos en 24 horas. Envío gratis en Europa. Seguimiento incluido.' },
        { num: '03', title: '30 noches para decidir', text: 'Pruébalo en tu vida real. Si no funciona, te devolvemos cada euro. Sin preguntas.' },
      ],
    },
    comparison: {
      heading: '¿Por qué Noctip?',
      sub: 'No somos los más baratos. Somos los que funcionan.',
      rows: [
        { feature: 'Prueba de 30 noches', us: true, them: false },
        { feature: 'Envío gratis', us: true, them: false },
        { feature: 'Materiales de grado médico', us: true, them: false },
        { feature: 'Soporte al cliente real', us: true, them: false },
        { feature: 'Pago seguro (Stripe)', us: true, them: false },
        { feature: 'Procesamiento rápido (24h)', us: true, them: false },
      ],
    },
    guarantees: {
      heading: 'Nuestras garantías',
      sub: 'Construidas en confianza, sin letra pequeña',
      items: [
        { icon: RotateCcw, title: '30 noches de prueba', text: 'Prueba cualquier producto durante 30 noches. Si no funciona para ti, gestionamos la devolución y el reembolso completo.' },
        { icon: Truck, title: 'Envío gratis', text: 'Todo pedido se envía gratis dentro de Europa. Procesamos y despachamos en 24 horas.' },
        { icon: ShieldCheck, title: 'Pagos seguros', text: 'Todas las transacciones se procesan a través de Stripe con cifrado SSL de 256 bits.' },
        { icon: Headphones, title: 'Soporte real', text: '¿Tienes una pregunta? Escríbenos y una persona real responde en menos de 24 horas.' },
      ],
    },
    faq: {
      heading: 'Preguntas frecuentes',
      sub: 'Respuestas rápidas antes de comprar',
      items: [
        { q: '¿Cuánto tarda el envío?', a: 'Enviamos todos los pedidos en 24 horas. Entrega estándar: 6-9 días laborables en Europa. Seguimiento incluido.' },
        { q: '¿Qué cubre la garantía de 30 noches?', a: 'Prueba cualquier producto durante 30 noches. Si no cumple tus expectativas, gestionamos la devolución y el reembolso completo.' },
        { q: '¿Cómo funciona la férula anti-ronquidos?', a: 'El Noctip Halo usa avanzamiento mandibular para mover suavemente la mandíbula hacia adelante, abriendo la vía aérea.' },
        { q: '¿El pago es seguro?', a: 'Sí. Pagos procesados por Stripe con cifrado SSL de 256 bits. Nunca almacenamos datos de tarjeta.' },
        { q: '¿Cómo contacto con soporte?', a: 'Escríbenos a support@noctip.com. Una persona real responde en menos de 24 horas.' },
        { q: '¿Qué métodos de pago aceptáis?', a: 'Visa, Mastercard, American Express, PayPal, Apple Pay y Google Pay.' },
      ],
    },
    cta: {
      heading: '¿Listo para dormir mejor?',
      sub: 'Empieza con un producto. Si no funciona, te devolvemos todo.',
      primary: 'Comprar ahora',
      secondary: 'Ver más vendidos',
    },
    mobile: { cta: 'Comprar ahora' },
  },
}

type CopyType = typeof COPY.en
function getCopy(locale: string): CopyType { return locale === 'es' ? COPY.es as CopyType : COPY.en }

/* ═══════════════════════════════════════════════════════
   ANNOUNCEMENT BAR — Scrolling messages
═══════════════════════════════════════════════════════ */
function AnnouncementBar({ locale }: { locale: string }) {
  const messages = ANNOUNCEMENT_MESSAGES[locale as 'en' | 'es'] || ANNOUNCEMENT_MESSAGES.en
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [messages.length])

  return (
    <div className="relative overflow-hidden border-b border-white/[0.04] bg-[#0a0f15] py-2 text-[11px] font-medium text-[#5a6678]">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-center gap-2">
          {(() => {
            const Icon = messages[0].icon
            return <Icon size={12} className="shrink-0 text-[#10BFD8]" />
          })()}
          <span>{messages[0].text}</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   HEADER — Sticky with scroll reduction
═══════════════════════════════════════════════════════ */
function Header({ locale, copy, switchHref }: { locale: string; copy: CopyType; switchHref: string }) {
  const { totalItems, open: openCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isEs = locale === 'es'

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
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`}
                  className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                  {getLocalizedCategoryName(cat, locale)}
                </Link>
              ))}
              <Link href={`/${locale}/about`}
                className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                {copy.nav.about}
              </Link>
            </nav>

            <div className="flex-1" />

            {/* Desktop Actions */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Link href={`/${locale}/tracking`}
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200">
                {copy.nav.track}
              </Link>

              <Link href={switchHref}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#8791a1] hover:text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-200 min-h-[44px]"
                aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}>
                <span>{locale === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              <UserMenu locale={locale} />

              <button onClick={openCart}
                aria-label={`${copy.cart} - ${totalItems} items`}
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

      {/* Mobile Menu — Premium fullscreen overlay */}
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
                  {copy.nav.shop}
                </div>
                {CATEGORIES.map((cat, idx) => (
                  <motion.div key={cat.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.05 }}>
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
                  <Link href={`/${locale}/about`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    {copy.nav.about}
                  </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <Link href={`/${locale}/tracking`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#f2eee7] hover:bg-white/[0.04] active:bg-white/[0.08] transition-all min-h-[48px]">
                    {copy.nav.track}
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
                  {copy.hero.secondary}
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
   USER MENU
═══════════════════════════════════════════════════════ */
function UserMenu({ locale }: { locale: string }) {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!auth.user) {
    return (
      <button onClick={() => auth.openModal()}
        className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-[#8791a1] transition hover:border-white/20 hover:text-[#f2eee7] active:scale-95 min-h-[44px]">
        <User size={14} />
        <span className="hidden sm:inline text-[12px] font-medium">{locale === 'es' ? 'Entrar' : 'Sign in'}</span>
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[#8791a1] transition hover:text-[#f2eee7] active:scale-95 min-h-[44px]">
        <User size={14} />
        <span className="max-w-[80px] truncate text-[12px] font-medium">{auth.user.displayName || auth.user.email?.split('@')[0] || 'Account'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d1219] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            <Link href={`/${locale}/account/orders`} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[13px] text-[#8791a1] transition hover:bg-white/[0.04] hover:text-[#f2eee7] active:bg-white/[0.08] min-h-[44px]">
              <PackageCheck size={14} className="text-[#5a6678]" />
              {locale === 'es' ? 'Mis pedidos' : 'My orders'}
            </Link>
            <button onClick={() => { setOpen(false); auth.logout() }}
              className="flex w-full items-center gap-3 px-4 py-3 text-[13px] text-[#8791a1] transition hover:bg-white/[0.04] hover:text-[#f2eee7] active:bg-white/[0.08] border-t border-white/[0.06] min-h-[44px]">
              <LogOut size={14} className="text-[#5a6678]" />
              {locale === 'es' ? 'Salir' : 'Sign out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PRODUCT CARD — Premium dark style
═══════════════════════════════════════════════════════ */
function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const { add, open: openCart } = useCart()
  const [added, setAdded] = useState(false)
  const copy = getCopy(locale)
  const name = getLocalizedProductName(product, locale)
  const desc = getLocalizedProductShortDescription(product, locale)
  const savings = product.comparePrice > 0 ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    add({ slug: product.slug, name, price: product.price, icon: product.cartIcon })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1219] transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="relative flex aspect-square items-center justify-center overflow-hidden" style={{ background: product.color }}>
          <ProductImage slug={product.slug as any} color={product.color} icon={product.icon} images={product.images} alt={name} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
          {savings > 0 && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
              <span className="rounded-full bg-[#10BFD8]/20 backdrop-blur-md border border-[#10BFD8]/30 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-[#10BFD8] uppercase tracking-wide">
                -{savings}%
              </span>
            </div>
          )}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
              <Badge type={product.badge} locale={locale} />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 sm:gap-2 p-3 sm:p-4">
          <h3 className="text-[13px] sm:text-[15px] font-semibold leading-snug text-[#f2eee7] group-hover:text-[#10BFD8] transition-colors line-clamp-2">{name}</h3>
          <p className="line-clamp-2 text-[11px] sm:text-[13px] leading-4 sm:leading-5 text-[#6b7785]">{desc}</p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-1.5 sm:pt-2">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-[15px] sm:text-[17px] font-bold text-[#f2eee7]">€{product.price}</span>
              {savings > 0 && <span className="text-[10px] sm:text-[12px] text-[#4a5568] line-through">€{product.comparePrice}</span>}
            </div>
            <button onClick={handleAdd} aria-label={`${copy.add} ${name}`}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-[13px] font-semibold transition-all duration-200 min-h-[36px] sm:min-h-[44px] active:scale-95 ${
                added ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-[#f2eee7] text-[#080c12] hover:bg-white hover:shadow-[0_4px_16px_rgba(242,238,231,0.15)]'
              }`}>
              {added ? (<><Check size={11} />{copy.added}</>) : (<><ShoppingCart size={11} /><span className="hidden sm:inline">{copy.add}</span></>)}
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function ShopHomePage() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const copy = getCopy(locale)
  const { open: openCart, totalItems, isOpen: isCartOpen } = useCart()
  const rawPathname = usePathname() || '/'
  const switchHref = (() => {
    let p = rawPathname
    if (!p.startsWith('/')) p = '/' + p
    if (/^\/es(\/|$)/.test(p)) return p.replace(/^\/es/, '/en')
    if (/^\/en(\/|$)/.test(p)) return p.replace(/^\/en/, '/es')
    return `/${locale === 'es' ? 'en' : 'es'}${p === '/' ? '/' : p}`
  })()

  const flagship = CATALOG.find(p => p.slug === 'halo') ?? CATALOG[0]
  const flagshipImage = flagship.images?.[0] ?? '/images/mouthpiece-1.jpg'

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      <AnnouncementBar locale={locale} />
      <Header locale={locale} copy={copy} switchHref={switchHref} />

      <main className="pb-24 sm:pb-0">

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,191,216,0.08),transparent)]" />
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-4 sm:mb-5">
                  <Sparkles size={12} />
                  {copy.hero.badge}
                </span>
                <h1 className="text-[clamp(2.2rem,8vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#f6f2eb]">
                  {copy.hero.title1}<br />{copy.hero.title2}
                </h1>
                <p className="mt-4 sm:mt-5 max-w-md text-[15px] sm:text-[16px] leading-[1.65] sm:leading-[1.7] text-[#8791a1]">{copy.hero.subtitle}</p>
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href={`/${locale}/products/${flagship.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-7 sm:px-8 py-3.5 sm:py-4 text-[14px] sm:text-[15px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(242,238,231,0.15)] min-h-[48px] sm:min-h-[52px]">
                    {copy.hero.cta} <ArrowRight size={16} />
                  </Link>
                  <a href="#products"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-medium text-[#8791a1] transition-all duration-300 hover:border-white/25 hover:text-[#f2eee7] min-h-[48px] sm:min-h-[52px]">
                    {copy.hero.secondary}
                  </a>
                </div>
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 text-[12px] sm:text-[13px] text-[#5a6678]">
                  <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#10BFD8]" /> {isEs ? 'Envío gratis' : 'Free shipping'}</span>
                  <span className="flex items-center gap-1.5"><RotateCcw size={14} className="text-[#10BFD8]" /> 30 {isEs ? 'noches' : 'nights'}</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#10BFD8]" /> {isEs ? 'Pago seguro' : 'Secure'}</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="block">
                <Link href={`/${locale}/products/${flagship.slug}`} className="group block">
                  <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0d1219] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden">
                      <img src={flagshipImage} alt={getLocalizedProductName(flagship, locale)}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        className="absolute inset-0 h-full w-full object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST BAR ═══ */}
        <section className="border-y border-white/[0.06] bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
              {copy.trust.map((item) => (
                <div key={item.label} className="flex items-center justify-center gap-2.5 sm:gap-3 py-3.5 sm:py-5 px-2 sm:px-4">
                  <div className="flex h-8 sm:h-9 w-8 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.08)]">
                    <item.icon size={14} className="text-[#10BFD8]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-[12px] font-semibold text-[#f2eee7] truncate">{item.label}</div>
                    <div className="text-[10px] sm:text-[11px] text-[#5a6678] truncate">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRODUCTS ═══ */}
        <section id="products" className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.products.heading}</h2>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.products.sub}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {CATALOG.map((product) => (
                <ProductCard key={product.slug} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROBLEMS WE SOLVE ═══ */}
        <section className="py-12 sm:py-20 lg:py-24 bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.problems.heading}</h2>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.problems.sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {copy.problems.items.map((problem, idx) => (
                <motion.div key={problem.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/[0.06] bg-[#111720] p-5 sm:p-7 text-center">
                  <div className="mx-auto mb-3 sm:mb-4 flex h-11 sm:h-12 w-11 sm:w-12 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.08)]">
                    <problem.icon size={20} className="text-[#10BFD8]" />
                  </div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#f2eee7]">{problem.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] leading-[1.6] sm:leading-6 text-[#6b7785]">{problem.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.howItWorks.heading}</h2>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.howItWorks.sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {copy.howItWorks.steps.map((step, idx) => (
                <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5 sm:p-7 text-center relative">
                  {idx < 2 && (
                    <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-6 text-[#2a3548]">
                      <ChevronRight size={20} className="rotate-90" />
                    </div>
                  )}
                  <span className="inline-flex items-center justify-center w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-[#10BFD8]/10 text-[14px] sm:text-[16px] font-bold text-[#10BFD8] mb-3 sm:mb-4">{step.num}</span>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#f2eee7]">{step.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] leading-[1.6] sm:leading-6 text-[#6b7785]">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY NOCTIP ═══ */}
        <section className="py-12 sm:py-20 lg:py-24 bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.comparison.heading}</h2>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.comparison.sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {[
                { icon: ShieldCheck, title: isEs ? 'Grado médico' : 'Medical grade', text: isEs ? 'Silicona de grado médico, hipoalergénica, segura para uso nocturno.' : 'Medical-grade silicone, hypoallergenic, safe for nightly use.' },
                { icon: RotateCcw, title: isEs ? '30 noches sin riesgo' : '30 nights risk-free', text: isEs ? 'Prueba el producto en tu entorno real. Si no funciona, reembolso completo.' : 'Try it in your real environment. Full refund if it doesn\'t work.' },
                { icon: Truck, title: isEs ? 'Envío en 24h' : 'Ships in 24h', text: isEs ? 'Procesamos y enviamos en 24 horas. Entrega en 6-9 días con seguimiento.' : 'We ship within 24 hours. Delivery in 6-9 days with tracking.' },
                { icon: Shield, title: isEs ? 'Pago 100% seguro' : '100% secure', text: isEs ? 'Cifrado SSL de 256 bits. Stripe. Nunca almacenamos datos de tarjeta.' : '256-bit SSL encryption. Stripe. We never store card data.' },
                { icon: Headphones, title: isEs ? 'Soporte humano' : 'Human support', text: isEs ? 'Una persona real responde en menos de 24 horas. Sin bots.' : 'A real person responds within 24 hours. No bots.' },
                { icon: CreditCard, title: isEs ? 'Flexibilidad de pago' : 'Flexible payment', text: isEs ? 'Visa, Mastercard, Amex, PayPal, Apple Pay y Google Pay.' : 'Visa, Mastercard, Amex, PayPal, Apple Pay, and Google Pay.' },
              ].map((item, idx) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                  className="flex items-start gap-3 sm:gap-4 rounded-2xl border border-white/[0.06] bg-[#111720] p-4 sm:p-5">
                  <div className="flex h-9 sm:h-10 w-9 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.08)]">
                    <item.icon size={17} className="text-[#10BFD8]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#f2eee7]">{item.title}</h3>
                    <p className="mt-1 text-[12px] sm:text-[13px] leading-[1.6] sm:leading-6 text-[#6b7785]">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GUARANTEES ═══ */}
        <section className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.guarantees.heading}</h2>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.guarantees.sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {copy.guarantees.items.map((item, idx) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5 sm:p-7">
                  <div className="flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.08)] mb-3 sm:mb-4">
                    <item.icon size={17} className="text-[#10BFD8]" />
                  </div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#f2eee7]">{item.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] leading-[1.6] sm:leading-6 text-[#6b7785]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="py-12 sm:py-20 lg:py-24 bg-[#0d1219]">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.faq.heading}</h2>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.faq.sub}</p>
            </div>
            <FAQ items={copy.faq.items} />
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6 text-center">
            <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.cta.heading}</h2>
            <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.cta.sub}</p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link href={`/${locale}/shop/all`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-7 sm:px-8 py-3.5 sm:py-4 text-[14px] sm:text-[15px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(242,238,231,0.15)] min-h-[48px] sm:min-h-[52px]">
                {copy.cta.primary} <ArrowRight size={16} />
              </Link>
              <Link href={`/${locale}/shop/all?sort=rating`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-medium text-[#8791a1] transition-all duration-300 hover:border-white/25 hover:text-[#f2eee7] min-h-[48px] sm:min-h-[52px]">
                {copy.cta.secondary}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Mobile sticky CTA ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.97)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden transition-transform duration-300 ${isCartOpen ? 'translate-y-full' : ''}`}>
        <div className="flex items-center gap-2.5">
          <button onClick={openCart}
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-[#8791a1]"
            aria-label="Open cart">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10BFD8] text-[10px] font-bold text-[#080c12]">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <Link href={`/${locale}/products/${flagship.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3 text-[15px] font-bold text-[#080c12] min-h-[48px]">
            {copy.mobile.cta} — {copy.hero.price}
          </Link>
        </div>
      </div>
    </div>
  )
}
