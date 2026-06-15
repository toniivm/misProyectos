'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import {
  ShoppingCart, Star, Check, ChevronRight, ChevronDown, Menu, X,
  Shield, Truck, RotateCcw, User, LogOut,
  PackageCheck, Moon, Sparkles, ArrowRight, Heart, Leaf,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG, CATEGORIES, getBestSellers,
  getLocalizedCategoryName, getLocalizedProductName,
  getLocalizedProductShortDescription,
  type CatalogProduct,
} from '../lib/catalog'

const SHOP_HOME_COPY = {
  en: {
    searchPlaceholder: 'Search sleep headbands, massage guns, eye masks...',
    addLabel: 'Add',
    addedLabel: 'Added',
    cartLabel: 'Cart',
    switchLabel: 'ES',
    switchAria: 'Switch to Spanish',
    announcement: [
      'Free shipping on every order',
      '4.9 stars — 6,000+ happy customers',
      '30-day return guarantee',
      'Secure checkout via Stripe',
      'Ships within 24 hours',
    ],
    heroKicker: 'Premium wellness technology',
    heroLine1: 'Sleep deeper.',
    heroLine2: 'Recover faster. Live better.',
    heroSubtitle: 'Premium sleep and recovery tools designed for real routines. From Bluetooth sleep headbands to weighted masks — find what your body actually needs.',
    heroQuickLinks: [
      { emoji: '😴', label: 'Can\'t switch off', slug: 'sleep-audio' },
      { emoji: '🦴', label: 'Desk neck tension', slug: 'neck-recovery' },
      { emoji: '🌙', label: 'Need deeper calm', slug: 'sensory' },
    ],
    heroPrimary: 'Shop all products',
    heroSecondary: 'See best sellers',
    trustItems: [
      { icon: Truck, label: 'Free shipping', sub: 'On all orders' },
      { icon: RotateCcw, label: '30-day returns', sub: 'No questions asked' },
      { icon: Shield, label: 'Secure checkout', sub: 'SSL + Stripe' },
      { icon: Star, label: '4.9 average', sub: '6,000+ verified reviews' },
    ],
    categoriesHeading: 'Shop by category',
    categoriesSub: 'Find the right product for your specific need',
    problemCards: [
      {
        emoji: '😴', problem: 'Can\'t sleep?', solution: 'Sleep & Audio',
        description: 'Bluetooth sleep headbands, white noise machines and ambient sound. Fall asleep faster, stay asleep longer.',
        slug: 'sleep-audio', colorFrom: '#0d1828', colorTo: '#0c1520',
      },
      {
        emoji: '🦴', problem: 'Neck or back pain?', solution: 'Neck & Recovery',
        description: 'Neck massagers with heat therapy. Undo hours at a desk in minutes.',
        slug: 'neck-recovery', colorFrom: '#0d1f1a', colorTo: '#0c1520',
      },
      {
        emoji: '🌙', problem: 'Need deeper relaxation?', solution: 'Sensory & Relaxation',
        description: 'Weighted sleep masks and sensory tools for faster, deeper relaxation at home.',
        slug: 'sensory', colorFrom: '#1a1020', colorTo: '#0c1520',
      },
    ],
    bestSellersHeading: 'Best sellers',
    bestSellersSub: 'Most popular choices for better sleep and recovery',
    stepsHeading: 'How it works',
    stepsSub: 'Three simple steps to better rest',
    steps: [
      { step: '01', icon: '🎯', title: 'Pick your problem', text: 'Browse by category: sleep, neck relief or sensory relaxation. Every product targets a specific daily issue.' },
      { step: '02', icon: '📦', title: 'Order today, ships tomorrow', text: 'Every order ships within 24 hours with free tracked delivery across Europe.' },
      { step: '03', icon: '✨', title: '30-night guarantee', text: 'Try it for a month. If you don\'t feel the difference, contact us for a full refund.' },
    ],
    testimonialsHeading: 'What our customers say',
    testimonialsSub: 'Real reviews from real people',
    verifiedPurchase: 'Verified purchase',
    reviews: [
      { text: 'I bought it because of the price and didn\'t expect much, but the headband is comfortable and the sound is clear. I fall asleep much faster now.', author: 'Andrea L.', role: 'Student', stars: 5, product: 'Noctive Halo' },
      { text: 'I get neck tightness from working on the computer all day. After using the Neck Massager 15 min a day, the difference is noticeable.', author: 'Miguel Á.', role: 'IT Specialist', stars: 4, product: 'Neck Massager' },
      { text: 'Noctive Halo has been a game changer for my sleep. It\'s comfortable and the sound quality is great.', author: 'Carla F.', role: 'Fitness enthusiast', stars: 5, product: 'Noctive Halo' },
      { text: 'The weighted mask helps me relax so much faster. The gentle pressure is really calming. Great value.', author: 'Laura P.', role: 'New mom', stars: 4, product: 'Noctive Calm Mask' },
      { text: 'I travel a lot for work and the sleep headband lets me rest anywhere. Very portable and comfortable.', author: 'David R.', role: 'Consultant', stars: 5, product: 'Sleep Headband' },
      { text: 'The white noise machine masks everything. My sleep has improved dramatically.', author: 'Sara M.', role: 'Teacher', stars: 4, product: 'Noctive Wave' },
    ],
    stats: [
      { value: '15+', label: 'Premium products' },
      { value: '6,000+', label: 'Happy customers' },
      { value: '4.9', label: 'Average rating' },
      { value: '30', label: 'Night guarantee' },
    ],
    faqHeading: 'Frequently asked questions',
    faqSub: 'Everything you need to know before your first order',
    faqs: [
      { q: 'How long does shipping take?', a: 'Standard orders ship within 24 hours and arrive in 3–5 business days across Europe. Express 1–2 day shipping is available at checkout.' },
      { q: 'What is your return policy?', a: 'Try any product for 30 nights. If it does not work for you, contact us for a free return and full refund with no questions asked.' },
      { q: 'Are the products compatible with all devices?', a: 'Bluetooth products connect via Bluetooth 5.0 to any smartphone, tablet or computer. USB-C products charge with any standard USB-C cable.' },
      { q: 'Is checkout secure?', a: 'Yes. All payments are processed through Stripe with SSL encryption. We never store your card details.' },
      { q: 'Can I track my order?', a: 'Yes. You will receive a tracking email within 24 hours of your order shipping. All shipments include real-time tracking.' },
      { q: 'Do you offer bundles?', a: 'Yes. Add multiple products to your cart and bundle discounts are applied automatically at checkout.' },
    ],
    ctaHeading: 'Ready to transform your sleep?',
    ctaSub: 'Join 6,000+ customers who have already improved their recovery routine',
    ctaPrimary: 'Shop all products',
    ctaSecondary: 'View best sellers',
    badgeLabels: { bestseller: 'Best Seller', new: 'New', deal: 'Deal', trending: 'Trending' },
    mobileCta: 'Shop now',
  },
  es: {
    searchPlaceholder: 'Busca bandas de sueño, masajeadores, antifaces...',
    addLabel: 'Añadir',
    addedLabel: 'Añadido',
    cartLabel: 'Carrito',
    switchLabel: 'EN',
    switchAria: 'Switch to English',
    announcement: [
      'Envío gratis en todos los pedidos',
      '4,9 estrellas — más de 6.000 clientes',
      'Garantía de devolución de 30 días',
      'Pago seguro con Stripe',
      'Envío en 24 horas',
    ],
    heroKicker: 'Tecnología premium de bienestar',
    heroLine1: 'Duerme más profundo.',
    heroLine2: 'Recupérate mejor. Vive mejor.',
    heroSubtitle: 'Herramientas premium de sueño y recuperación diseñadas para rutinas reales. Desde bandas Bluetooth hasta antifaces con peso — encuentra lo que tu cuerpo necesita.',
    heroQuickLinks: [
      { emoji: '😴', label: 'No consigues desconectar', slug: 'sleep-audio' },
      { emoji: '🦴', label: 'Tensión de cuello', slug: 'neck-recovery' },
      { emoji: '🌙', label: 'Necesitas más calma', slug: 'sensory' },
    ],
    heroPrimary: 'Ver todos los productos',
    heroSecondary: 'Ver más vendidos',
    trustItems: [
      { icon: Truck, label: 'Envío gratis', sub: 'En todos los pedidos' },
      { icon: RotateCcw, label: 'Devoluciones 30 días', sub: 'Sin preguntas' },
      { icon: Shield, label: 'Pago seguro', sub: 'SSL + Stripe' },
      { icon: Star, label: 'Media de 4,9', sub: 'Más de 6.000 reseñas' },
    ],
    categoriesHeading: 'Compra por categoría',
    categoriesSub: 'Encuentra el producto adecuado para tu necesidad',
    problemCards: [
      { emoji: '😴', problem: '¿No puedes dormir?', solution: 'Sueño y audio', description: 'Bandas Bluetooth, máquinas de ruido blanco y sonido ambiental. Duérmete más rápido, descansa más.', slug: 'sleep-audio', colorFrom: '#0d1828', colorTo: '#0c1520' },
      { emoji: '🦴', problem: '¿Dolor de cuello?', solution: 'Cuello y recuperación', description: 'Masajeadores con calor. Revierte horas de escritorio en minutos.', slug: 'neck-recovery', colorFrom: '#0d1f1a', colorTo: '#0c1520' },
      { emoji: '🌙', problem: '¿Necesitas relajarte?', solution: 'Sensorial y relajación', description: 'Antifaces con peso y herramientas sensoriales para una relajación más profunda.', slug: 'sensory', colorFrom: '#1a1020', colorTo: '#0c1520' },
    ],
    bestSellersHeading: 'Más vendidos',
    bestSellersSub: 'Las opciones más populares para descansar y recuperarte',
    stepsHeading: 'Cómo funciona',
    stepsSub: 'Tres pasos simples para descansar mejor',
    steps: [
      { step: '01', icon: '🎯', title: 'Elige tu problema', text: 'Compra por categoría: sueño, alivio o relajación. Cada producto resuelve una necesidad concreta.' },
      { step: '02', icon: '📦', title: 'Pídelo hoy, sale mañana', text: 'Cada pedido sale en 24 horas con envío gratis y seguimiento en toda Europa.' },
      { step: '03', icon: '✨', title: 'Garantía de 30 noches', text: 'Pruébalo durante un mes. Si no notas la diferencia, te devolvemos el dinero.' },
    ],
    testimonialsHeading: 'Lo que dicen nuestros clientes',
    testimonialsSub: 'Opiniones reales de personas reales',
    verifiedPurchase: 'Compra verificada',
    reviews: [
      { text: 'Lo compré por el precio y no esperaba mucho, pero la cinta es cómoda y el sonido se escucha bien. Me duermo mucho más rápido.', author: 'Andrea L.', role: 'Estudiante', stars: 5, product: 'Noctive Halo' },
      { text: 'Tengo contracturas en el cuello por el ordenador. Desde que uso el masajeador 15 min al día, he notado mucha mejora.', author: 'Miguel Á.', role: 'Informático', stars: 4, product: 'Masajeador de cuello' },
      { text: 'Noctive Halo me ha cambiado el sueño. Es cómoda y el sonido se escucha genial.', author: 'Carla F.', role: 'Deportista', stars: 5, product: 'Noctive Halo' },
      { text: 'El antifaz con peso me ayuda a relajarme mucho más rápido. La presión suave es muy calmante.', author: 'Laura P.', role: 'Madre primeriza', stars: 4, product: 'Noctive Calm Mask' },
      { text: 'Viajo mucho por trabajo y la cinta de sueño me permite dormir en cualquier sitio.', author: 'David R.', role: 'Consultor', stars: 5, product: 'Sleep Headband' },
      { text: 'La máquina de ruido blanco lo tapa todo. Mi sueño ha mejorado un montón.', author: 'Sara M.', role: 'Profesora', stars: 4, product: 'Noctive Wave' },
    ],
    stats: [
      { value: '15+', label: 'Productos premium' },
      { value: '6.000+', label: 'Clientes felices' },
      { value: '4,9', label: 'Valoración media' },
      { value: '30', label: 'Noches de garantía' },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqSub: 'Todo lo que necesitas saber antes de tu primer pedido',
    faqs: [
      { q: '¿Cuánto tarda el envío?', a: 'Los pedidos estándar salen en 24 horas y llegan en 3–5 días laborables dentro de Europa. En el checkout puedes elegir envío exprés de 1–2 días.' },
      { q: '¿Cuál es vuestra política de devoluciones?', a: 'Prueba cualquier producto durante 30 noches. Si no te funciona, contáctanos y gestionamos la devolución y el reembolso completo.' },
      { q: '¿Los productos son compatibles?', a: 'Los productos Bluetooth se conectan por Bluetooth 5.0 a cualquier móvil, tablet u ordenador. Los USB-C cargan con cualquier cable estándar.' },
      { q: '¿El checkout es seguro?', a: 'Sí. Todos los pagos se procesan con Stripe y cifrado SSL. Nunca almacenamos los datos de tu tarjeta.' },
      { q: '¿Puedo seguir mi pedido?', a: 'Sí. Recibirás un correo con seguimiento dentro de las 24 horas posteriores al envío.' },
      { q: '¿Ofrecéis packs?', a: 'Sí. Añade varios productos al carrito y los descuentos de bundle se aplican automáticamente.' },
    ],
    ctaHeading: '¿Listo para transformar tu descanso?',
    ctaSub: 'Únete a más de 6.000 clientes que ya han mejorado su rutina de recuperación',
    ctaPrimary: 'Ver todos los productos',
    ctaSecondary: 'Ver más vendidos',
    badgeLabels: { bestseller: 'Más vendido', new: 'Nuevo', deal: 'Oferta', trending: 'Tendencia' },
    mobileCta: 'Comprar ahora',
  },
}

type CopyType = typeof SHOP_HOME_COPY.en

function getCopy(locale: string): CopyType {
  return locale === 'es' ? SHOP_HOME_COPY.es as CopyType : SHOP_HOME_COPY.en
}

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'} />
      ))}
    </span>
  )
}

function Badge({ type, locale }: { type?: CatalogProduct['badge']; locale: string }) {
  if (!type) return null
  const c = getCopy(locale)
  const map = {
    bestseller: { label: c.badgeLabels.bestseller, cls: 'bg-amber-400/15 text-amber-300 border-amber-400/25' },
    new: { label: c.badgeLabels.new, cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25' },
    deal: { label: c.badgeLabels.deal, cls: 'bg-rose-400/15 text-rose-300 border-rose-400/25' },
    trending: { label: c.badgeLabels.trending, cls: 'bg-violet-400/15 text-violet-300 border-violet-400/25' },
  }
  const b = map[type]
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${b.cls}`}>
      {b.label}
    </span>
  )
}

function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const { add, open: openCart } = useCart()
  const [added, setAdded] = useState(false)
  const copy = getCopy(locale)
  const name = getLocalizedProductName(product, locale)
  const desc = getLocalizedProductShortDescription(product, locale)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    add({ slug: product.slug, name, price: product.price, icon: product.cartIcon })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2500)
  }

  const savings = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] transition-all duration-500 hover:border-[rgba(16,191,216,0.25)] hover:shadow-[0_8px_32px_rgba(16,191,216,0.12)]"
      >
        <div className="relative flex h-48 items-center justify-center overflow-hidden" style={{ background: product.color }}>
          {product.images ? (
            <img src={product.images[0]} alt={name} loading="lazy"
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              style={{ objectPosition: '50% 5%' }} />
          ) : (
            <span className="text-5xl opacity-60 transition-transform duration-500 group-hover:scale-110">{product.icon}</span>
          )}
          {product.badge && (
            <div className="absolute left-3 top-3 z-10"><Badge type={product.badge} locale={locale} /></div>
          )}
          <div className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-[#0c1016]/70 px-2.5 py-1 text-[11px] font-bold text-white/80 backdrop-blur-md">
            -{savings}%
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="text-[11px] text-[#8791a1]">
              {product.rating} ({product.reviewCount.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')})
            </span>
          </div>
          <h3 className="text-[15px] font-semibold leading-snug text-[#f2eee7] group-hover:text-white transition-colors">{name}</h3>
          <p className="line-clamp-2 text-[12px] leading-5 text-[#8791a1]">{desc}</p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div>
              <span className="text-[18px] font-bold text-[#f2eee7]">€{product.price}</span>
              <span className="ml-2 text-[12px] text-[#4a5568] line-through">€{product.comparePrice}</span>
            </div>
            <button onClick={handleAdd}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[12px] font-semibold transition-all duration-300 ${
                added
                  ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 scale-95'
                  : 'btn-light !px-4 !py-2.5 !text-[12px] shadow-[0_4px_12px_rgba(242,238,231,0.15)] hover:shadow-[0_6px_20px_rgba(242,238,231,0.25)]'
              }`}>
              {added ? (<><Check size={12} />{copy.addedLabel}</>) : (<><ShoppingCart size={12} />{copy.addLabel}</>)}
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function AnnouncementBar({ copy }: { copy: CopyType }) {
  return (
    <div className="overflow-hidden border-b border-white/[0.05] bg-[#0d1520] py-2.5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        className="flex w-max items-center gap-10"
      >
        {[...copy.announcement, ...copy.announcement].map((msg, i) => (
          <span key={`${msg}-${i}`} className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8791a1]">
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const ES_FLAG = (
  <svg className="w-5 h-3.5 rounded-sm" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="30" fill="#c60b1e"/>
    <rect y="3" width="50" height="24" fill="#ffc400"/>
    <rect y="3" width="50" height="4" fill="#c60b1e"/>
    <rect y="23" width="50" height="4" fill="#c60b1e"/>
  </svg>
)

const EN_FLAG = (
  <svg className="w-5 h-3.5 rounded-sm" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="uk_clip"><rect width="60" height="30"/></clipPath>
    <g clipPath="url(#uk_clip)">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#FFF" strokeWidth="6"/>
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="3"/>
      <path d="M30 0v30M0 15h60" stroke="#FFF" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="4"/>
    </g>
  </svg>
)

function Header({ locale, copy, switchHref }: { locale: string; copy: CopyType; switchHref: string }) {
  const { totalItems, open: openCart } = useCart()
  const t = useTranslations()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-16 items-center gap-4">
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5 group">
              <div className="grid h-7 w-7 grid-cols-2 gap-[3px] rounded-lg border border-white/10 bg-white/[0.04] p-1 transition-all group-hover:border-white/20">
                <span className="rounded-[3px] bg-[#cfd8e6]" />
                <span className="rounded-[3px] bg-[#8da3c4]" />
                <span className="rounded-[3px] bg-[#7186a4]" />
                <span className="rounded-[3px] bg-[#d8d0c4]" />
              </div>
              <span className="hidden text-[12px] font-bold uppercase tracking-[0.2em] text-[#f2eee7] sm:block">Noctip</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-6">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`}
                  className="rounded-full px-3 py-1.5 text-[12px] font-medium text-[#9aa7b9] hover:text-[#f2eee7] hover:bg-white/[0.04] transition-all">
                  {getLocalizedCategoryName(cat, locale)}
                </Link>
              ))}
            </nav>

            <div className="flex-1" />

            <div className="flex shrink-0 items-center gap-1.5">
              {/* Language switcher with flags */}
              <Link href={switchHref}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-[#9aa7b9] hover:text-[#f2eee7] hover:border-white/20 transition-all"
                aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}>
                {locale === 'es' ? EN_FLAG : ES_FLAG}
                <span>{locale === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              <Link href={`/${locale}/shop/all`}
                className="hidden sm:inline-flex items-center rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-[12px] font-medium text-[#c8d4e2] hover:bg-white/[0.08] transition-all">
                {copy.heroPrimary}
              </Link>

              <UserMenu locale={locale} t={t} />

              <button onClick={openCart}
                aria-label={`${copy.cartLabel} - ${totalItems} items`}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#c8d4e2] transition hover:border-white/20 hover:bg-white/[0.08]">
                <ShoppingCart size={15} />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f2eee7] text-[9px] font-bold text-[#11161d]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#c8d4e2] transition hover:border-white/20 hover:bg-white/[0.08]">
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-white/[0.07] bg-[rgba(12,16,22,0.98)] backdrop-blur-xl md:hidden overflow-hidden"
          >
            <nav className="mx-auto max-w-[1280px] px-4 py-4 space-y-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium text-[#c8d4e2] hover:bg-white/[0.04] transition-all">
                  {getLocalizedCategoryName(cat, locale)}
                  <ChevronRight size={14} className="text-[#4a5568]" />
                </Link>
              ))}
              <Link href={`/${locale}/shop/all`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[13px] font-semibold text-[#f2eee7] mt-2">
                {copy.heroPrimary}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function UserMenu({ locale, t }: { locale: string; t: (key: string) => string }) {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!auth.user) {
    return (
      <button onClick={() => auth.openModal()}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#c8d4e2] transition hover:border-white/20 hover:bg-white/[0.08]">
        <User size={14} />
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-sm text-[#c8d4e2] transition hover:text-white">
        <User size={14} />
        <span className="hidden sm:inline max-w-[100px] truncate">
          {auth.user.displayName || auth.user.email?.split('@')[0] || 'Account'}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0d1219] shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
            <Link href={`/${locale}/account/orders`} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#c8d4e2] transition hover:bg-white/[0.04] hover:text-white">
              <PackageCheck size={14} className="text-[#8ea7c7]" />
              {t('account.myOrders')}
            </Link>
            <button onClick={() => { setOpen(false); auth.logout() }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#c8d4e2] transition hover:bg-white/[0.04] hover:text-white border-t border-white/[0.06]">
              <LogOut size={14} className="text-[#6b7785]" />
              {t('nav.logout')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="grid gap-3">
      {items.map((faq, idx) => (
        <div key={idx}
          className={`rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 ${
            openIdx === idx ? 'border-white/[0.15] bg-white/[0.04]' : ''
          }`}>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
            <span className="text-[14px] font-semibold text-[#f2eee7]">{faq.q}</span>
            <ChevronDown size={16}
              className={`shrink-0 text-[#6b7785] transition-transform duration-300 ${
                openIdx === idx ? 'rotate-180' : ''
              }`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${
            openIdx === idx ? 'max-h-48' : 'max-h-0'
          }`}>
            <p className="px-5 pb-4 text-[13px] leading-6 text-[#8791a1]">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Testimonials({ reviews, copy }: { reviews: CopyType['reviews']; copy: CopyType }) {
  const [active, setActive] = useState(0)
  const max = Math.ceil(reviews.length / 2)

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(active * 2, active * 2 + 3).map((review) => (
          <motion.div
            key={`${review.author}-${review.product}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all hover:border-white/[0.12]"
          >
            <div className="flex items-center gap-2 mb-2">
              <Stars rating={review.stars} />
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">{copy.verifiedPurchase}</span>
            </div>
            <p className="text-[13px] leading-6 text-[#c8d0da]">&ldquo;{review.text}&rdquo;</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-[12px] font-semibold text-[#f2eee7]">{review.author}</div>
                <div className="text-[11px] text-[#6b7785]">{review.role}</div>
              </div>
              <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] text-[#8791a1]">{review.product}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {max > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: max }).map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-[#f2eee7]' : 'w-2 bg-white/[0.15] hover:bg-white/[0.25]'
              }`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ShopHomePage() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const t = useTranslations()
  const copy = getCopy(locale)
  const { open: openCart, totalItems } = useCart()
  const rawPathname = usePathname() || '/'
  const switchHref = (() => {
    let p = rawPathname
    if (!p.startsWith('/')) p = '/' + p
    if (/^\/es(\/|$)/.test(p)) return p.replace(/^\/es/, '/en')
    if (/^\/en(\/|$)/.test(p)) return p.replace(/^\/en/, '/es')
    const other = locale === 'es' ? 'en' : 'es'
    return `/${other}${p === '/' ? '/' : p}`
  })()

  const bestSellers = getBestSellers()
  const allProducts = CATALOG
  const flagship = CATALOG.find(p => p.slug === 'sleepband-pro') ?? bestSellers[0]

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      <AnnouncementBar copy={copy} />
      <Header locale={locale} copy={copy} switchHref={switchHref} />

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-32">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pb-8 pt-10 sm:pt-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,191,216,0.08),transparent_60%)]" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(13,18,25,0.98),rgba(10,15,22,0.94))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center p-8 sm:p-10 lg:p-12"
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5">
                  <Sparkles size={12} className="text-[#8ea7c7]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa7b9]">{copy.heroKicker}</span>
                </div>

                <h1 className="text-[clamp(2.35rem,5.4vw,4.35rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#f6f2eb]">
                  {copy.heroLine1}
                  <br />
                  {copy.heroLine2}
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#8791a1]">{copy.heroSubtitle}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {copy.heroQuickLinks.map((item) => (
                    <Link key={item.slug} href={`/${locale}/shop/${item.slug}`}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-[#b8c4d0] transition hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white">
                      <span>{item.emoji}</span>
                      {item.label}
                      <ChevronRight size={12} className="opacity-30 transition-opacity group-hover:opacity-70" />
                    </Link>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href={`/${locale}/shop/all`}
                    className="btn-light !rounded-full">
                    <ShoppingCart size={14} />
                    {copy.heroPrimary}
                  </Link>
                  <a href="#best-sellers"
                    className="btn-dark !rounded-full">
                    {copy.heroSecondary}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative min-h-[340px] sm:min-h-[460px] overflow-hidden rounded-[32px] m-3 lg:m-4"
              >
                <img src={flagship.images?.[1] ?? flagship.images?.[0]}
                  alt="Premium sleep and recovery products"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ objectPosition: '50% 60%' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,12,16,0.7)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-[rgba(10,15,22,0.55)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d6dde7] backdrop-blur-sm">
                    {copy.badgeLabels.bestseller}
                  </div>
                  <div className="max-w-[20rem] text-[22px] font-bold leading-tight tracking-[-0.03em] text-white">
                    {getLocalizedProductName(flagship, locale)}
                  </div>
                  <p className="mt-1 text-[13px] text-[#d6dde7]">
                    €{flagship.price}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[rgba(16,191,216,0.04)] via-[rgba(13,18,25,0.98)] to-[rgba(158,146,255,0.04)] p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {copy.trustItems.map((item) => (
                <div key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-4 transition-all hover:border-[rgba(16,191,216,0.2)] hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.1)]">
                    <item.icon size={18} className="text-[#10BFD8]" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{item.label}</div>
                    <div className="text-[11px] text-[#6b7785]">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Categories ── */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <span className="section-tag mb-3 inline-flex">{copy.categoriesHeading}</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7] mt-3">{copy.categoriesHeading}</h2>
            <p className="mt-2 text-[14px] text-[#6b7785]">{copy.categoriesSub}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.problemCards.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={item.slug}
              >
                <Link href={`/${locale}/shop/${item.slug}`} className="group block h-full">
                  <div
                    className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1"
                    style={{ background: `linear-gradient(160deg, ${item.colorFrom}, ${item.colorTo})`, borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <span className="mb-4 text-3xl">{item.emoji}</span>
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5a6878]">{item.problem}</div>
                    <h3 className="mb-2.5 text-[15px] font-bold text-[#f2eee7] transition-colors group-hover:text-white">{item.solution}</h3>
                    <p className="flex-1 text-[12px] leading-[1.6] text-[#6b7a8a]">{item.description}</p>
                    <div className="mt-5 flex items-center gap-1 text-[12px] font-semibold text-[#7a9ab8] transition-colors group-hover:text-[#a8c0d8]">
                      Shop now <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Best Sellers ── */}
        <section id="best-sellers" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="section-tag mb-3 inline-flex">
              <Star size={11} className="text-amber-400" />
              {copy.bestSellersHeading}
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7] mt-3">{copy.bestSellersHeading}</h2>
            <p className="mt-2 text-[14px] text-[#6b7785]">{copy.bestSellersSub}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product, idx) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href={`/${locale}/shop/all`} className="btn-dark !rounded-full">
              {copy.heroPrimary} <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {copy.stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6"
              >
                <div className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.04em] text-[#f6f2eb]">{stat.value}</div>
                <div className="mt-1 text-[12px] text-[#6b7785] uppercase tracking-[0.08em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <span className="section-tag mb-3 inline-flex">
              <Moon size={11} />
              {copy.stepsHeading}
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7] mt-3">{copy.stepsHeading}</h2>
            <p className="mt-2 text-[14px] text-[#6b7785]">{copy.stepsSub}</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {copy.steps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center sm:text-left"
              >
                <div className="flex items-center gap-3 mb-4 sm:justify-start justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-[22px]">
                    {item.icon}
                  </span>
                  <span className="font-mono text-[12px] font-semibold tracking-[0.2em] text-[#4a5568]">{item.step}</span>
                </div>
                <h3 className="mb-2 text-[16px] font-bold text-[#f2eee7]">{item.title}</h3>
                <p className="text-[13px] leading-6 text-[#6b7785]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <span className="section-tag mb-3 inline-flex">
              <Heart size={11} />
              {copy.testimonialsHeading}
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7] mt-3">{copy.testimonialsHeading}</h2>
            <p className="mt-2 text-[14px] text-[#6b7785]">{copy.testimonialsSub}</p>
          </motion.div>

          <Testimonials reviews={copy.reviews} copy={copy} />
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <span className="section-tag mb-3 inline-flex">
              <Leaf size={11} />
              FAQ
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7] mt-3">{copy.faqHeading}</h2>
            <p className="mt-2 text-[14px] text-[#6b7785]">{copy.faqSub}</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <FAQ items={copy.faqs} />
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(135deg,#111c2e,#0d1219)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(16,191,216,0.06),transparent)]" />
          <div className="relative px-8 py-14 sm:px-14 sm:py-20 text-center">
            <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#f6f2eb]">
              {copy.ctaHeading}
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-[15px] leading-7 text-[#8791a1]">{copy.ctaSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={`/${locale}/shop/all`} className="btn-light !rounded-full !px-8 !py-4">
                {copy.ctaPrimary} <ArrowRight size={16} />
              </Link>
              <Link href={`/${locale}/shop/all?sort=rating`} className="btn-dark !rounded-full !px-8 !py-4">
                {copy.ctaSecondary}
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-[12px] text-[#6b7785]">
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-[#8ea7c7]" /> Secure checkout</span>
              <span className="flex items-center gap-1.5"><Truck size={12} className="text-[#8ea7c7]" /> Free shipping</span>
              <span className="flex items-center gap-1.5"><RotateCcw size={12} className="text-[#8ea7c7]" /> 30-day returns</span>
            </div>
          </div>
        </section>
      </main>

      {/* ── Mobile sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.95)] p-3 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-3">
          <button onClick={openCart}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-[#c8d4e2]">
            <ShoppingCart size={16} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#10BFD8] text-[9px] font-bold text-[#080c16]">
                {totalItems}
              </span>
            )}
          </button>
          <Link href={`/${locale}/shop/all`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3 text-[14px] font-semibold text-[#11161d] shadow-[0_4px_16px_rgba(242,238,231,0.2)]">
            {copy.mobileCta} <ChevronRight size={15} />
          </Link>
        </div>
        <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-[#5a6678]">
          <span className="flex items-center gap-1"><Shield size={10} className="text-[#10BFD8]" />{isEs ? 'Pago seguro' : 'Secure'}</span>
          <span className="flex items-center gap-1"><Truck size={10} className="text-[#10BFD8]" />{isEs ? 'Envío gratis' : 'Free shipping'}</span>
          <span className="flex items-center gap-1"><RotateCcw size={10} className="text-[#10BFD8]" />30 {isEs ? 'días' : 'days'}</span>
        </div>
      </div>
    </div>
  )
}
