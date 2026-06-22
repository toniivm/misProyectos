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
  PackageCheck, Moon, Sparkles, ArrowRight, Heart, Leaf, Flame, Eye,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG, CATEGORIES, getBestSellers,
  getLocalizedCategoryName, getLocalizedProductName,
  getLocalizedProductShortDescription,
  type CatalogProduct,
} from '../lib/catalog'
import { SocialProofNotification, StockUrgency, ViewingNow, TrustStrip, LimitedOffer, CountdownTimer } from './ConversionBoosters'
import ProductImage from './ProductImage'

const SHOP_HOME_COPY = {
  en: {
    searchPlaceholder: 'Search sleep headbands, massagers, posture correctors...',
    addLabel: 'Add',
    addedLabel: 'Added',
    cartLabel: 'Cart',
    switchLabel: 'ES',
    switchAria: 'Switch to Spanish',
    announcement: [
      'Free shipping — always',
      '4.9 ★ — 6,000+ people sleeping better',
      '30 nights to try it — full refund if not',
      '100% secure payment (Stripe + SSL)',
      'Ships tomorrow',
    ],
    heroKicker: 'Sleep & recovery technology that actually works',
    heroLine1: 'Stop sleeping badly.',
    heroLine2: 'Start recovering.',
    heroSubtitle: 'Products your body feels from night one. Anti-snoring, posture correction, and cervical relief — built for people who can\'t afford to sleep badly.',
    heroQuickLinks: [
      { emoji: '😴', label: 'I snore every night', slug: 'sleep-audio' },
      { emoji: '🦴', label: 'My posture is getting worse', slug: 'neck-recovery' },
      { emoji: '🧘', label: 'My neck is always tense', slug: 'sensory' },
    ],
    heroPrimary: 'Find my solution',
    heroSecondary: 'See best sellers',
    trustItems: [
      { icon: Truck, label: 'Free shipping', sub: 'On all orders' },
      { icon: RotateCcw, label: '30-night trial', sub: 'Full refund, no questions' },
      { icon: Shield, label: 'Secure checkout', sub: 'SSL + Stripe' },
      { icon: Star, label: '4.9 average', sub: '6,000+ verified reviews' },
    ],
    categoriesHeading: 'What\'s your problem?',
    categoriesSub: 'Pick what bothers you most — we\'ll show you the fix',
    problemCards: [
      {
        emoji: '😴', problem: 'Snoring ruining your sleep?', solution: 'Stop snoring. Start sleeping.',
        description: 'Jaw-advancement mouthpieces that open your airway and eliminate snoring at the source. Your partner sleeps better too.',
        slug: 'sleep-audio', colorFrom: '#0d1828', colorTo: '#0c1520',
      },
      {
        emoji: '🦴', problem: 'Bad posture from desk work?', solution: 'Fix your posture. Free your neck.',
        description: 'Posture corrector braces that realign your spine and relieve chronic back pain. Visible results in 2 weeks.',
        slug: 'neck-recovery', colorFrom: '#0d1f1a', colorTo: '#0c1520',
      },
      {
        emoji: '🧘', problem: 'Chronic neck pain?', solution: 'Pulse therapy that adapts to you.',
        description: 'Cervical massagers with floating electrodes that conform to your neck curves. Relief at your desk, at home, anywhere.',
        slug: 'sensory', colorFrom: '#1a1020', colorTo: '#0c1520',
      },
    ],
    bestSellersHeading: 'Best sellers',
    bestSellersSub: 'Products 6,000+ people already use every night',
    stepsHeading: 'How it works',
    stepsSub: 'Three steps to better rest',
    steps: [
      { step: '01', icon: '🎯', title: 'Pick your problem', text: 'Snoring? Bad posture? Neck pain? Choose what bothers you and we\'ll show you exactly what helps.' },
      { step: '02', icon: '📦', title: 'At your door tomorrow', text: 'Free shipping. Real-time tracking. We process and ship within 24 hours. No surprises.' },
      { step: '03', icon: '✨', title: '30 nights to decide', text: 'If you don\'t feel the difference, we refund every cent. No questions. That\'s how confident we are.' },
    ],
    testimonialsHeading: 'Real people. Real results.',
    testimonialsSub: 'Verified reviews from actual buyers',
    verifiedPurchase: 'Verified purchase',
    reviews: [
      { text: 'After years of snoring that kept my wife awake, the Noctip Halo was a game changer. The jaw adjustment is comfortable and the snoring stopped from night one. We both sleep better now.', author: 'Andrea L.', role: 'Student', stars: 5, product: 'Noctip Halo' },
      { text: 'The Noctip Wave posture brace has visibly improved my desk posture in just two weeks. I wear it under my shirt and nobody notices. My back pain from sitting 8 hours a day is almost gone.', author: 'Miguel Á.', role: 'IT Specialist', stars: 4, product: 'Noctip Wave' },
      { text: 'The Noctip Relief neck massager is surprisingly powerful for its size. The electrode pads adapt perfectly to my neck and the pulse modes are genuinely effective. I use it every day at my desk.', author: 'Carla F.', role: 'Fitness enthusiast', stars: 5, product: 'Noctip Relief' },
      { text: 'The Noctip Calm pulse massager fits my neck perfectly with the floating electrode design. The button-start is simple and the automatic timing means I don\'t have to think about it. Great value.', author: 'Laura P.', role: 'New mom', stars: 4, product: 'Noctip Calm' },
      { text: 'As a frequent business traveler, the Noctip Rest headband has become indispensable. Portable, comfortable, and the battery lasts through long-haul flights. Highly recommended for road warriors.', author: 'David R.', role: 'Consultant', stars: 5, product: 'Noctip Rest' },
      { text: 'The Noctip Wave brace realigned my posture faster than I expected. After years of slouching at a computer, the Y-shaped support pulled my shoulders back naturally. My chiropractor noticed the difference.', author: 'Sara M.', role: 'Teacher', stars: 4, product: 'Noctip Wave' },
    ],
    stats: [
      { value: '5', label: 'Premium products' },
      { value: '6,000+', label: 'Happy customers' },
      { value: '4.9', label: 'Average rating' },
      { value: '30', label: 'Night guarantee' },
    ],
    faqHeading: 'Frequently asked questions',
    faqSub: 'Quick answers before you buy',
    faqs: [
      { q: 'How fast is shipping?', a: 'We ship all orders within 24 hours. Standard delivery: 3-5 business days across Europe. Express 1-2 day shipping available at checkout. All shipments include real-time tracking.' },
      { q: 'What does the 30-night guarantee cover?', a: 'Test any product for 30 nights. If it doesn\'t work for you, we arrange a free return with a full refund. No justification required.' },
      { q: 'How does the anti-snoring mouthpiece work?', a: 'The Noctip Halo uses jaw advancement to gently move your lower jaw forward, opening your airway and stopping snoring at the source. The dual-layer design adjusts with 10mm of micro-settings. It molds to your teeth with a boil-and-bite process.' },
      { q: 'What sizes does the posture corrector come in?', a: 'The Noctip Wave comes in 5 sizes (XS-XL) based on chest width. Measure at the widest point and check our size guide. Velcro straps allow fine-tuning within each size.' },
      { q: 'Is checkout secure?', a: 'Yes. All payments processed through Stripe with 256-bit SSL encryption. We never store card details. Visa, Mastercard, Amex, Apple Pay, and Google Pay accepted.' },
      { q: 'Do bundle discounts apply automatically?', a: 'Yes. Add multiple products to your cart and discounts are applied at checkout. The more you add, the more you save.' },
    ],
    ctaHeading: 'How many more nights will you sleep badly?',
    ctaSub: '6,000+ people are already sleeping better. Tonight could be your first good night.',
    ctaPrimary: 'Shop all products',
    ctaSecondary: 'View best sellers',
    badgeLabels: { bestseller: 'Best Seller', new: 'New', deal: 'Deal', trending: 'Trending' },
    mobileCta: 'Shop now',
  },
  es: {
    searchPlaceholder: 'Busca bandas de sueño, masajeadores, correctores posturales...',
    addLabel: 'Añadir',
    addedLabel: 'Añadido',
    cartLabel: 'Carrito',
    switchLabel: 'EN',
    switchAria: 'Switch to English',
    announcement: [
      'Envío gratis — siempre',
      '4,9 ★ — 6.000+ personas duermen mejor',
      '30 noches para probarlo — te devolvemos todo',
      'Pago 100% seguro (Stripe + SSL)',
      'Lo enviamos mañana',
    ],
    heroKicker: 'Tecnología de sueño y recuperación que funciona de verdad',
    heroLine1: 'Deja de dormir mal.',
    heroLine2: 'Empieza a recuperarte.',
    heroSubtitle: 'Productos que tu cuerpo nota desde la primera noche. Anti-ronquidos, corrección postural y alivio cervical — para gente que no puede permitirse dormir mal.',
    heroQuickLinks: [
      { emoji: '😴', label: 'Rono todas las noches', slug: 'sleep-audio' },
      { emoji: '🦴', label: 'Mi postura está empeorando', slug: 'neck-recovery' },
      { emoji: '🧘', label: 'Tengo el cuello siempre tenso', slug: 'sensory' },
    ],
    heroPrimary: 'Encontrar mi solución',
    heroSecondary: 'Ver más vendidos',
    trustItems: [
      { icon: Truck, label: 'Envío gratis', sub: 'En todos los pedidos' },
      { icon: RotateCcw, label: '30 noches de prueba', sub: 'Reembolso completo, sin preguntas' },
      { icon: Shield, label: 'Pago seguro', sub: 'SSL + Stripe' },
      { icon: Star, label: 'Media de 4,9', sub: 'Más de 6.000 reseñas verificadas' },
    ],
    categoriesHeading: '¿Cuál es tu problema?',
    categoriesSub: 'Elige lo que más te molesta — te mostramos la solución',
    problemCards: [
      { emoji: '😴', problem: '¿Roncas todas las noches?', solution: 'Deja de roncar. Empieza a dormir.', description: 'Férulas de avanzamiento mandibular que abren tu vía aérea y eliminan los ronquidos en su origen. Tu pareja también duerme mejor.', slug: 'sleep-audio', colorFrom: '#0d1828', colorTo: '#0c1520' },
      { emoji: '🦴', problem: '¿Mala postura por trabajar sentado?', solution: 'Mejora tu postura. Libera tu cuello.', description: 'Correctores posturales que realinean tu columna y alivian el dolor crónico de espalda. Resultados visibles en 2 semanas.', slug: 'neck-recovery', colorFrom: '#0d1f1a', colorTo: '#0c1520' },
      { emoji: '🧘', problem: '¿Dolor cervical crónico?', solution: 'Terapia por pulsos que se adapta a ti.', description: 'Masajeadores cervicales con electrodos flotantes que se adaptan a las curvas de tu cuello. Alivio en el trabajo, en casa, en cualquier lugar.', slug: 'sensory', colorFrom: '#1a1020', colorTo: '#0c1520' },
    ],
    bestSellersHeading: 'Más vendidos',
    bestSellersSub: 'Productos que 6.000+ personas ya usan cada noche',
    stepsHeading: 'Cómo funciona',
    stepsSub: 'Tres pasos para descansar mejor',
    steps: [
      { step: '01', icon: '🎯', title: 'Elige tu problema', text: '¿Roncas? ¿Mala postura? ¿Dolor de cuello? Elige lo que más te molesta y te mostramos exactamente qué te ayuda.' },
      { step: '02', icon: '📦', title: 'Mañana en tu puerta', text: 'Envío gratis. Seguimiento en tiempo real. Procesamos y enviamos en 24 horas. Sin sorpresas.' },
      { step: '03', icon: '✨', title: '30 noches para decidir', text: 'Si no notas la diferencia, te devolvemos cada euro. Sin preguntas. Así de seguros estamos.' },
    ],
    testimonialsHeading: 'Personas reales. Resultados reales.',
    testimonialsSub: 'Reseñas verificadas de compradores reales',
    verifiedPurchase: 'Compra verificada',
    reviews: [
      { text: 'Después de años de ronquidos que impedían dormir a mi esposa, el Noctip Halo fue un cambio total. El ajuste mandibular es cómodo y los ronquidos desaparecieron desde la primera noche. Los dos dormimos mejor.', author: 'Andrea L.', role: 'Estudiante', stars: 5, product: 'Noctip Halo' },
      { text: 'El corrector postural Noctip Wave ha mejorado visiblemente mi postura en el escritorio en solo dos semanas. Lo uso debajo de la camisa y nadie se da cuenta. Mi dolor de espalda por sentar 8 horas casi ha desaparecido.', author: 'Miguel Á.', role: 'Informático', stars: 4, product: 'Noctip Wave' },
      { text: 'El masajeador cervical Noctip Relief es sorprendentemente potente para su tamaño. Los electrodos se adaptan perfectamente a mi cuello y los modos de pulso son realmente efectivos. Lo uso todos los días en el trabajo.', author: 'Carla F.', role: 'Deportista', stars: 5, product: 'Noctip Relief' },
      { text: 'El masajeador por pulsos Noctip Calm se adapta perfectamente a mi cuello con el diseño de electrodos flotantes. El botón de inicio es simple y la temporización automática significa que no tengo que pensar en ello. Gran relación calidad-precio.', author: 'Laura P.', role: 'Madre primeriza', stars: 4, product: 'Noctip Calm' },
      { text: 'Como viajero frecuente de negocios, la banda Noctip Rest se ha vuelto imprescindible. Portátil, cómoda y la batería dura vuelos de larga distancia. Altamente recomendada para profesionales en movimiento.', author: 'David R.', role: 'Consultor', stars: 5, product: 'Noctip Rest' },
      { text: 'El corrector Noctip Wave ha realineado mi postura más rápido de lo esperado. Después de años encorvado frente al ordenador, el soporte en forma de Y juntó mis hombros hacia atrás naturalmente. Mi quiropráctico notó la diferencia.', author: 'Sara M.', role: 'Profesora', stars: 4, product: 'Noctip Wave' },
    ],
    stats: [
      { value: '5', label: 'Productos premium' },
      { value: '6.000+', label: 'Clientes felices' },
      { value: '4,9', label: 'Valoración media' },
      { value: '30', label: 'Noches de garantía' },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqSub: 'Respuestas rápidas antes de comprar',
    faqs: [
      { q: '¿Cuánto tarda el envío?', a: 'Enviamos todos los pedidos en 24 horas. Entrega estándar: 3-5 días laborables en Europa. Envío exprés de 1-2 días disponible en el checkout. Seguimiento incluido.' },
      { q: '¿Qué cubre la garantía de 30 noches?', a: 'Prueba cualquier producto durante 30 noches. Si no funciona, gestionamos la devolución y el reembolso completo. Sin justificación.' },
      { q: '¿Cómo funciona la férula anti-ronquidos?', a: 'El Noctip Halo usa avanzamiento mandibular para mover suavemente la mandíbula hacia adelante, abriendo la vía aérea y eliminando los ronquidos en su origen. El diseño de doble capa se ajusta con 10mm de micro-ajustes.' },
      { q: '¿En qué tallas viene el corrector postural?', a: 'El Noctip Wave viene en 5 tallas (XS-XL) según el ancho de pecho. Mide en el punto más amplio y consulta nuestra guía. Las correas de velcro permiten ajuste fino.' },
      { q: '¿El pago es seguro?', a: 'Sí. Pagos procesados por Stripe con cifrado SSL de 256 bits. Nunca almacenamos datos de tarjeta. Aceptamos Visa, Mastercard, Amex, Apple Pay y Google Pay.' },
      { q: '¿Los descuentos por packs se aplican solos?', a: 'Sí. Añade varios productos al carrito y los descuentos se aplican automáticamente en el checkout. Cuanto más añades, más ahorras.' },
    ],
    ctaHeading: '¿Cuántas noches más vas a dormir mal?',
    ctaSub: '6.000+ personas ya duermen mejor. Esta noche podría ser tu primera buena noche.',
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
  const [isHovered, setIsHovered] = useState(false)
  const copy = getCopy(locale)
  const name = getLocalizedProductName(product, locale)
  const desc = getLocalizedProductShortDescription(product, locale)
  const localeStr = locale === 'es' ? 'es-ES' : 'en-US'

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    add({ slug: product.slug, name, price: product.price, icon: product.cartIcon })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2500)
  }

  const savings = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
  const viewers = Math.floor(Math.random() * 30) + 12

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0d1219] transition-all duration-700 hover:border-[rgba(16,191,216,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(16,191,216,0.08)]"
      >
        {/* Image area - premium visual */}
        <div className="relative flex h-56 sm:h-64 items-center justify-center overflow-hidden">
          <ProductImage 
            slug={product.slug as any} 
            color={product.color}
            icon={product.icon}
            images={product.images}
            alt={name}
            className="h-full w-full"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute left-4 top-4 z-10"><Badge type={product.badge} locale={locale} /></div>
          )}
          
          {/* Savings badge */}
          <div className="absolute right-4 top-4 z-10 rounded-full bg-[#10BFD8] px-3 py-1 text-[11px] font-bold text-[#080c16]">
            -{savings}%
          </div>
          
          {/* Bottom overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-8 bg-gradient-to-t from-[#0d1219] via-[#0d1219]/80 to-transparent">
            <div className="flex items-center gap-1.5">
              <Stars rating={product.rating} />
              <span className="text-[11px] text-[#8791a1]">
                {product.rating} ({product.reviewCount.toLocaleString(localeStr)})
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          {/* Name */}
          <h3 className="text-[16px] font-bold leading-snug text-[#f2eee7] group-hover:text-white transition-colors">{name}</h3>
          
          {/* Description */}
          <p className="line-clamp-2 text-[13px] leading-5 text-[#8791a1]">{desc}</p>
          
          {/* Price + CTA */}
          <div className="mt-auto flex items-end justify-between gap-3 pt-4 border-t border-white/[0.06]">
            <div>
              <span className="text-[22px] font-bold text-[#f2eee7]">€{product.price}</span>
              <span className="ml-2 text-[13px] text-[#4a5568] line-through">€{product.comparePrice}</span>
            </div>
            <button onClick={handleAdd}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[12px] font-semibold transition-all duration-300 ${
                added
                  ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 scale-95'
                  : 'bg-[#f2eee7] text-[#11161d] hover:bg-white hover:shadow-[0_4px_20px_rgba(242,238,231,0.3)] hover:-translate-y-0.5'
              }`}>
              {added ? (<><Check size={13} />{copy.addedLabel}</>) : (<><ShoppingCart size={13} />{copy.addLabel}</>)}
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
        className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-[#c8d4e2] transition hover:border-white/20 hover:bg-white/[0.08]">
        <User size={14} />
        <span className="text-[11px] font-medium">{locale === 'es' ? 'Entrar' : 'Sign in'}</span>
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-[#c8d4e2] transition hover:text-white">
        <User size={14} />
        <span className="max-w-[80px] truncate text-[12px] font-medium">
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
    <div className="min-h-screen bg-[#080c12] text-[#f4f1ea]">
      <LimitedOffer />
      <AnnouncementBar copy={copy} />
      <Header locale={locale} copy={copy} switchHref={switchHref} />

      <main className="pb-0">
        {/* ═══════════════════════════════════════════════════════
            HERO — Full-width, cinematic
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#080c12] to-[#0d0a1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,191,216,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(158,146,255,0.08),transparent_50%)]" />
          
          {/* Floating orbs */}
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full bg-[#10BFD8]/5 blur-[120px] animate-breathe" />
          <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] rounded-full bg-[#9E92FF]/5 blur-[100px] animate-breathe" style={{ animationDelay: '2s' }} />

          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-20 w-full">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
              {/* Left — Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/5 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10BFD8] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10BFD8]" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10BFD8]">{copy.heroKicker}</span>
                </div>

                <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white">
                  {copy.heroLine1}
                  <br />
                  <span className="bg-gradient-to-r from-[#10BFD8] to-[#9E92FF] bg-clip-text text-transparent">
                    {copy.heroLine2}
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-[16px] leading-8 text-[#8791a1]">{copy.heroSubtitle}</p>

                {/* Quick links */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {copy.heroQuickLinks.map((item) => (
                    <Link key={item.slug} href={`/${locale}/shop/${item.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-[#b8c4d0] transition-all hover:border-[#10BFD8]/40 hover:bg-[#10BFD8]/10 hover:text-white hover:shadow-[0_0_20px_rgba(16,191,216,0.15)]">
                      <span className="text-lg">{item.emoji}</span>
                      {item.label}
                      <ChevronRight size={14} className="opacity-30 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href={`/${locale}/shop/all`}
                    className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12] transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-0.5">
                    <ShoppingCart size={16} />
                    {copy.heroPrimary}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="#all-products"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-[15px] font-medium text-[#d0d8e4] transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white">
                    {copy.heroSecondary}
                  </a>
                </div>

                {/* Social proof */}
                <div className="mt-10 flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {['👩', '👨', '👩‍🦰', '🧑', '👴'].map((emoji, i) => (
                      <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#080c12] bg-[#1a2332] text-sm">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">6.000+ personas</div>
                    <div className="text-[11px] text-[#6b7785]">{isEs ? 'ya duermen mejor' : 'sleeping better already'}</div>
                  </div>
                </div>
              </motion.div>

              {/* Right — Product showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded-[40px] overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#0d1828] to-[#0a0f18] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                  <Link href={`/${locale}/products/${flagship.slug}`} className="group block">
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                      <img src={flagship.images?.[1] ?? flagship.images?.[0]}
                        alt={getLocalizedProductName(flagship, locale)}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        style={{ objectPosition: '50% 30%' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c12] via-transparent to-transparent" />
                      
                      {/* Product info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="mb-3 inline-flex items-center rounded-full bg-[#10BFD8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#080c12]">
                          {copy.badgeLabels.bestseller}
                        </div>
                        <h2 className="text-[28px] sm:text-[32px] font-bold leading-tight text-white">
                          {getLocalizedProductName(flagship, locale)}
                        </h2>
                        <p className="mt-2 text-[14px] text-[#d6dde7] line-clamp-2">
                          {getLocalizedProductShortDescription(flagship, locale)}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <span className="text-[28px] font-bold text-white">€{flagship.price}</span>
                          <span className="text-[16px] text-[#6b7785] line-through">€{flagship.comparePrice}</span>
                          <span className="rounded-full bg-[#10BFD8]/20 px-3 py-1 text-[12px] font-bold text-[#10BFD8]">
                            -{Math.round(((flagship.comparePrice - flagship.price) / flagship.comparePrice) * 100)}%
                          </span>
                        </div>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-[#080c12] transition-all group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                          {isEs ? 'Ver producto' : 'View product'} <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 sm:left-4 rounded-2xl border border-white/[0.1] bg-[#0d1219]/95 px-4 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                      <Check size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-white">{isEs ? 'Envío gratis' : 'Free shipping'}</div>
                      <div className="text-[10px] text-[#6b7785]">{isEs ? 'Entrega en 24-48h' : 'Delivery in 24-48h'}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating rating */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -top-4 -right-4 sm:right-4 rounded-2xl border border-white/[0.1] bg-[#0d1219]/95 px-4 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[12px] font-bold text-white">4.9</span>
                    <span className="text-[10px] text-[#6b7785]">(1.578)</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TRUST BAR — Compact, below hero
        ═══════════════════════════════════════════════════════ */}
        <section className="border-y border-white/[0.06] bg-[#0a0f18]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
              {copy.trustItems.map((item) => (
                <div key={item.label}
                  className="flex items-center justify-center gap-3 py-5 transition-colors hover:bg-white/[0.02]">
                  <item.icon size={18} className="text-[#10BFD8]" />
                  <div>
                    <div className="text-[12px] font-semibold text-[#f2eee7]">{item.label}</div>
                    <div className="text-[10px] text-[#6b7785]">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            ALL PRODUCTS — Premium grid
        ═══════════════════════════════════════════════════════ */}
        <section id="all-products" className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="section-tag mb-4 inline-flex">
                {isEs ? 'Catálogo completo' : 'Full catalog'}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white mt-4">
                {isEs ? 'Elige tu solución' : 'Pick your solution'}
              </h2>
              <p className="mt-3 text-[15px] text-[#6b7785] max-w-md mx-auto">
                {isEs ? 'Cada producto resuelve un problema específico. Sin distracciones.' : 'Each product solves one specific problem. No distractions.'}
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {allProducts.map((product) => (
                <ProductCard key={product.slug} product={product} locale={locale} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href={`/${locale}/shop/all`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-[14px] font-medium text-[#d0d8e4] transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white">
                {isEs ? 'Ver catálogo completo' : 'View full catalog'} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            WHY NOCTIP — Brand story
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#080c12] via-[#0a1020] to-[#080c12]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="section-tag mb-4 inline-flex">
                {isEs ? 'La diferencia Noctip' : 'The Noctip difference'}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white mt-4">
                {isEs ? 'No somos una marketplace.' : 'We\'re not a marketplace.'}
                <br />
                <span className="bg-gradient-to-r from-[#10BFD8] to-[#9E92FF] bg-clip-text text-transparent">
                  {isEs ? 'Somos una marca.' : 'We\'re a brand.'}
                </span>
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: '🎯',
                  title: isEs ? 'Un problema, un producto' : 'One problem, one product',
                  text: isEs ? 'Cada producto resuelve UN problema específico. Sin distracciones, sin compromisos.' : 'Each product solves ONE specific problem. No distractions, no compromises.',
                  stat: '5',
                  statLabel: isEs ? 'Productos' : 'Products',
                },
                {
                  icon: '🔬',
                  title: isEs ? 'Probado, no prometido' : 'Tested, not promised',
                  text: isEs ? '6.000+ clientes reales. Resultados que hablan por sí solos.' : '6,000+ real customers. Results that speak for themselves.',
                  stat: '4.9',
                  statLabel: isEs ? 'Estrellas media' : 'Avg rating',
                },
                {
                  icon: '🛡️',
                  title: isEs ? 'Sin riesgo' : 'Zero risk',
                  text: isEs ? '30 noches para probarlo. Si no funciona, te devolvemos cada euro.' : '30 nights to try it. If it doesn\'t work, we refund every cent.',
                  stat: '30',
                  statLabel: isEs ? 'Noches garantía' : 'Night guarantee',
                },
                {
                  icon: '⚡',
                  title: isEs ? 'Envío inmediato' : 'Instant shipping',
                  text: isEs ? 'Enviamos en 24 horas. Mañana en tu puerta.' : 'We ship within 24 hours. At your door tomorrow.',
                  stat: '24h',
                  statLabel: isEs ? 'Procesamiento' : 'Processing',
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-[#10BFD8]/20 hover:bg-[#10BFD8]/[0.03] hover:shadow-[0_0_40px_rgba(16,191,216,0.05)]"
                >
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="mt-4 text-[15px] font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#6b7785]">{item.text}</p>
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <span className="text-[24px] font-bold text-[#10BFD8]">{item.stat}</span>
                    <span className="ml-2 text-[11px] text-[#6b7785] uppercase tracking-wider">{item.statLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TESTIMONIALS — Premium carousel
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="section-tag mb-4 inline-flex">
                <Heart size={11} />
                {copy.testimonialsHeading}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white mt-4">{copy.testimonialsHeading}</h2>
              <p className="mt-3 text-[15px] text-[#6b7785]">{copy.testimonialsSub}</p>
            </motion.div>

            <Testimonials reviews={copy.reviews} copy={copy} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FAQ — Clean, centered
        ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="py-20 sm:py-28 bg-gradient-to-b from-[#080c12] to-[#0a0f18]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="section-tag mb-4 inline-flex">
                <Leaf size={11} />
                FAQ
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white mt-4">{copy.faqHeading}</h2>
              <p className="mt-3 text-[15px] text-[#6b7785]">{copy.faqSub}</p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <FAQ items={copy.faqs} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FINAL CTA — Full-width, cinematic
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#080c12] to-[#0d0a1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,191,216,0.1),transparent_60%)]" />
          
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
                {copy.ctaHeading}
              </h2>
              <p className="mt-5 max-w-lg mx-auto text-[16px] leading-7 text-[#8791a1]">{copy.ctaSub}</p>
              
              <div className="mt-6 flex items-center justify-center">
                <CountdownTimer />
              </div>
              
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href={`/${locale}/shop/all`} className="group relative inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-[16px] font-bold text-[#080c12] transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-1">
                  {copy.ctaPrimary}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href={`/${locale}/shop/all?sort=rating`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-10 py-5 text-[16px] font-medium text-[#d0d8e4] transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white">
                  {copy.ctaSecondary}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-[13px] text-[#6b7785]">
                <span className="flex items-center gap-2"><Shield size={14} className="text-[#10BFD8]" /> {isEs ? 'Pago seguro SSL' : 'SSL secure checkout'}</span>
                <span className="flex items-center gap-2"><Truck size={14} className="text-[#10BFD8]" /> {isEs ? 'Envío gratis siempre' : 'Free shipping always'}</span>
                <span className="flex items-center gap-2"><RotateCcw size={14} className="text-[#10BFD8]" /> {isEs ? '30 noches sin riesgo' : '30-night risk-free trial'}</span>
              </div>
            </motion.div>
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
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3 text-[14px] font-semibold text-[#11161d] btn-cta-pulse">
            {copy.mobileCta} <ChevronRight size={15} />
          </Link>
        </div>
        <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-[#5a6678]">
          <span className="flex items-center gap-1"><Shield size={10} className="text-[#10BFD8]" />{isEs ? 'Pago seguro' : 'Secure'}</span>
          <span className="flex items-center gap-1"><Truck size={10} className="text-[#10BFD8]" />{isEs ? 'Envío gratis' : 'Free shipping'}</span>
          <span className="flex items-center gap-1"><RotateCcw size={10} className="text-[#10BFD8]" />30 {isEs ? 'días' : 'days'}</span>
        </div>
      </div>

      {/* Social proof notification */}
      <SocialProofNotification />
    </div>
  )
}
