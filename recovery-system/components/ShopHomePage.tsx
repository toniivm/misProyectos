'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import {
  ShoppingCart, Star, Check, ChevronRight, ChevronDown, Menu, X,
  Shield, Truck, RotateCcw, User, LogOut,
  PackageCheck, ArrowRight,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG, CATEGORIES, getBestSellers,
  getLocalizedCategoryName, getLocalizedProductName,
  getLocalizedProductShortDescription,
  type CatalogProduct,
} from '../lib/catalog'
import ProductImage from './ProductImage'
import Stars from './ui/Stars'
import Badge from './ui/Badge'
import FAQ from './ui/FAQ'

const SHOP_HOME_COPY = {
  en: {
    addLabel: 'Add',
    addedLabel: 'Added',
    cartLabel: 'Cart',
    announcement: [
      'Free shipping — always',
      '4.9 ★ — Verified reviews',
      '30 nights to try it — full refund if not',
    ],
    heroKicker: 'Anti-snoring that works from night one',
    heroLine1: 'Snoring?',
    heroLine2: 'Stop snoring.',
    heroSubtitle: 'The Noctip Halo mouthpiece opens your airway and eliminates snoring from the first night. Your partner sleeps better too.',
    heroPrice: '€17.99',
    heroOldPrice: '€29.99',
    heroCta: 'Buy now',
    heroSecondary: 'See all 4 products',
    trustItems: [
      { icon: Truck, label: 'Free shipping', sub: 'On all orders' },
      { icon: RotateCcw, label: '30-night trial', sub: 'Full refund, no questions' },
      { icon: Shield, label: 'Secure checkout', sub: 'SSL + Stripe' },
      { icon: Star, label: '4.9 average', sub: 'Verified reviews' },
    ],
    productsHeading: 'Our products',
    productsSub: 'Each one solves a specific problem',
    howItWorksHeading: 'How it works',
    howItWorksSub: '3 simple steps',
    steps: [
      { num: '01', title: 'Choose your product', text: 'Snoring? Back pain? Neck tension? Pick what bothers you.' },
      { num: '02', title: 'At your door tomorrow', text: 'Free shipping. We process and ship within 24 hours.' },
      { num: '03', title: '30 nights to decide', text: 'If it doesn\'t work, we refund every cent. No questions.' },
    ],
    socialHeading: 'What our customers say',
    socialSub: 'Real reviews from real people',
    verifiedPurchase: 'Verified purchase',
    reviews: [
      { text: 'After years of snoring that kept my wife awake, the Noctip Halo was a game changer. The jaw adjustment is comfortable and the snoring stopped from night one.', author: 'Andrea L.', role: 'Student', stars: 5, product: 'Noctip Halo' },
      { text: 'The Noctip Back posture brace has visibly improved my desk posture in just two weeks. I wear it under my shirt and nobody notices.', author: 'Miguel Á.', role: 'IT Specialist', stars: 4, product: 'Noctip Back' },
      { text: 'The Noctip Cervical massager is surprisingly powerful for its size. The electrode pads adapt perfectly to my neck. I use it every day at my desk.', author: 'Carla F.', role: 'Fitness enthusiast', stars: 5, product: 'Noctip Cervical' },
    ],
    faqHeading: 'Common questions',
    faqSub: 'Quick answers before you buy',
    faqs: [
      { q: 'How fast is shipping?', a: 'We ship all orders within 24 hours. Standard delivery: 6-9 business days across Europe. Express 1-2 day shipping available at checkout.' },
      { q: 'What does the 30-night guarantee cover?', a: 'Test any product for 30 nights. If it doesn\'t work, we arrange a free return with a full refund. No justification required.' },
      { q: 'How does the anti-snoring mouthpiece work?', a: 'The Noctip Halo uses jaw advancement to gently move your lower jaw forward, opening your airway and stopping snoring at the source.' },
      { q: 'Is checkout secure?', a: 'Yes. All payments processed through Stripe with 256-bit SSL encryption. We never store card details.' },
      { q: 'Do bundle discounts apply automatically?', a: 'Yes. Add multiple products to your cart and discounts are applied at checkout automatically.' },
    ],
    ctaHeading: 'Ready to sleep better?',
    ctaSub: 'Start with one product. If it doesn\'t work, we\'ll refund everything.',
    ctaPrimary: 'Shop now',
    ctaSecondary: 'View best sellers',
    badgeLabels: { bestseller: 'Best Seller', new: 'New', deal: 'Deal', trending: 'Trending' },
    mobileCta: 'Shop now',
    statsHeading: 'Why Noctip?',
    statsSub: 'Numbers that speak for themselves',
    stats: [
      { value: '2,400+', label: 'Happy customers' },
      { value: '4.9', label: 'Average rating' },
      { value: '30', label: 'Night guarantee' },
      { value: '24h', label: 'Fast processing' },
    ],
  },
  es: {
    addLabel: 'Añadir',
    addedLabel: 'Añadido',
    cartLabel: 'Carrito',
    announcement: [
      'Envío gratis — siempre',
      '4,9 ★ — Reseñas verificadas',
      '30 noches para probarlo — te devolvemos todo',
    ],
    heroKicker: 'Anti-ronquidos que funciona desde la primera noche',
    heroLine1: '¿Roncas?',
    heroLine2: 'Deja de roncar.',
    heroSubtitle: 'La férula Noctip Halo abre tu vía aérea y elimina los ronquidos desde la primera noche. Tu pareja también dormirá mejor.',
    heroPrice: '€17.99',
    heroOldPrice: '€29.99',
    heroCta: 'Comprar ahora',
    heroSecondary: 'Ver los 4 productos',
    trustItems: [
      { icon: Truck, label: 'Envío gratis', sub: 'En todos los pedidos' },
      { icon: RotateCcw, label: '30 noches de prueba', sub: 'Reembolso completo' },
      { icon: Shield, label: 'Pago seguro', sub: 'SSL + Stripe' },
      { icon: Star, label: 'Media de 4,9', sub: 'Reseñas verificadas' },
    ],
    productsHeading: 'Nuestros productos',
    productsSub: 'Cada uno resuelve un problema específico',
    howItWorksHeading: 'Cómo funciona',
    howItWorksSub: '3 pasos sencillos',
    steps: [
      { num: '01', title: 'Elige tu producto', text: '¿Roncas? ¿Dolor de espalda? ¿Tensión en el cuello? Elige lo que más te molesta.' },
      { num: '02', title: 'Mañana en tu puerta', text: 'Envío gratis. Procesamos y enviamos en 24 horas.' },
      { num: '03', title: '30 noches para decidir', text: 'Si no funciona, te devolvemos cada euro. Sin preguntas.' },
    ],
    socialHeading: 'Lo que dicen nuestros clientes',
    socialSub: 'Reseñas reales de personas reales',
    verifiedPurchase: 'Compra verificada',
    reviews: [
      { text: 'Después de años de ronquidos que impedían dormir a mi esposa, el Noctip Halo fue un cambio total. El ajuste mandibular es cómodo y los ronquidos desaparecieron desde la primera noche.', author: 'Andrea L.', role: 'Estudiante', stars: 5, product: 'Noctip Halo' },
      { text: 'El corrector postural Noctip Back ha mejorado visiblemente mi postura en el escritorio en solo dos semanas. Lo uso debajo de la camisa y nadie se da cuenta.', author: 'Miguel Á.', role: 'Informático', stars: 4, product: 'Noctip Back' },
      { text: 'El masajeador cervical Noctip Cervical es sorprendentemente potente para su tamaño. Los electrodos se adaptan perfectamente a mi cuello. Lo uso todos los días.', author: 'Carla F.', role: 'Deportista', stars: 5, product: 'Noctip Cervical' },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqSub: 'Respuestas rápidas antes de comprar',
    faqs: [
      { q: '¿Cuánto tarda el envío?', a: 'Enviamos todos los pedidos en 24 horas. Entrega estándar: 6-9 días laborables en Europa. Envío exprés disponible en el checkout.' },
      { q: '¿Qué cubre la garantía de 30 noches?', a: 'Prueba cualquier producto durante 30 noches. Si no funciona, gestionamos la devolución y el reembolso completo. Sin justificación.' },
      { q: '¿Cómo funciona la férula anti-ronquidos?', a: 'El Noctip Halo usa avanzamiento mandibular para mover suavemente la mandíbula hacia adelante, abriendo la vía aérea y eliminando los ronquidos.' },
      { q: '¿El pago es seguro?', a: 'Sí. Pagos procesados por Stripe con cifrado SSL de 256 bits. Nunca almacenamos datos de tarjeta.' },
      { q: '¿Los descuentos por packs se aplican solos?', a: 'Sí. Añade varios productos al carrito y los descuentos se aplican automáticamente en el checkout.' },
    ],
    ctaHeading: '¿Listo para dormir mejor?',
    ctaSub: 'Empieza con un producto. Si no funciona, te devolvemos todo.',
    ctaPrimary: 'Comprar ahora',
    ctaSecondary: 'Ver más vendidos',
    badgeLabels: { bestseller: 'Más vendido', new: 'Nuevo', deal: 'Oferta', trending: 'Tendencia' },
    mobileCta: 'Comprar ahora',
    statsHeading: '¿Por qué Noctip?',
    statsSub: 'Números que hablan por sí solos',
    stats: [
      { value: '2.400+', label: 'Clientes felices' },
      { value: '4,9', label: 'Valoración media' },
      { value: '30', label: 'Noches de garantía' },
      { value: '24h', label: 'Procesamiento rápido' },
    ],
  },
}

type CopyType = typeof SHOP_HOME_COPY.en

function getCopy(locale: string): CopyType {
  return locale === 'es' ? SHOP_HOME_COPY.es as CopyType : SHOP_HOME_COPY.en
}

/* ─── Product Card — Clean, Koriderm-inspired ─── */
function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const { add, open: openCart } = useCart()
  const [added, setAdded] = useState(false)
  const copy = getCopy(locale)
  const isEs = locale === 'es'
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

  const savings = product.comparePrice > 0 ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1219] transition-all duration-300 hover:border-white/[0.12]"
      >
        {/* Image area — clean background */}
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#111827]">
          <ProductImage
            slug={product.slug as any}
            color={product.color}
            icon={product.icon}
            images={product.images}
            alt={name}
            className="h-full w-full"
          />
          {/* Savings badge — only one, top-right */}
          {savings > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="rounded-full bg-[#10BFD8] px-2.5 py-1 text-[10px] font-bold text-[#080c12] uppercase tracking-wide shadow-lg">
                -{savings}%
              </span>
            </div>
          )}
        </div>

        {/* Info area — clean, minimal */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-[15px] font-semibold leading-snug text-[#f2eee7] group-hover:text-white transition-colors">{name}</h3>
          <p className="line-clamp-2 text-[13px] leading-5 text-[#6b7785]">{desc}</p>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <Stars rating={product.rating} />
            <span className="text-[12px] text-[#6b7785]">
              {product.rating} ({product.reviewCount.toLocaleString(localeStr)})
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-bold text-white">€{product.price}</span>
              {savings > 0 && (
                <span className="text-[13px] text-[#4a5568] line-through">€{product.comparePrice}</span>
              )}
            </div>
            <button onClick={handleAdd}
              aria-label={`${copy.addLabel} ${name}`}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 min-h-[44px] ${
                added
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'bg-white text-[#080c12] hover:bg-white/90 hover:shadow-[0_4px_16px_rgba(255,255,255,0.15)]'
              }`}>
              {added ? (<><Check size={13} />{copy.addedLabel}</>) : (<><ShoppingCart size={13} />{copy.addLabel}</>)}
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

/* ─── Announcement Bar ─── */
function AnnouncementBar({ copy }: { copy: CopyType }) {
  return (
    <div className="border-b border-white/[0.06] bg-[#0a0f18]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-6 px-4 py-2">
        {copy.announcement.slice(0, 3).map((msg, i) => (
          <span key={`${msg}-${i}`} className="hidden sm:block shrink-0 text-[11px] font-medium text-[#6b7785]">
            {msg}
          </span>
        ))}
        <span className="sm:hidden shrink-0 text-[11px] font-medium text-[#6b7785]">
          {copy.announcement[0]}
        </span>
      </div>
    </div>
  )
}

/* ─── Flags ─── */
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

/* ─── Header ─── */
function Header({ locale, copy, switchHref }: { locale: string; copy: CopyType; switchHref: string }) {
  const { totalItems, open: openCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[rgba(8,12,18,0.92)] backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex h-[60px] items-center gap-6">
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
              <Image
                src="/images/logo/logo.png"
                alt="Noctip"
                width={40}
                height={40}
                priority
                className="object-contain"
                sizes="40px"
              />
              <span className="hidden text-[13px] font-semibold uppercase tracking-[0.15em] text-[#f2eee7] sm:block">Noctip</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-4">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`}
                  className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#8791a1] hover:text-white transition-colors duration-200">
                  {getLocalizedCategoryName(cat, locale)}
                </Link>
              ))}
            </nav>

            <div className="flex-1" />

            <div className="flex shrink-0 items-center gap-2">
              <Link href={switchHref}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#6b7785] hover:text-white transition-colors duration-200"
                aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}>
                {locale === 'es' ? EN_FLAG : ES_FLAG}
                <span>{locale === 'es' ? 'EN' : 'ES'}</span>
              </Link>

              <UserMenu locale={locale} />

              <button onClick={openCart}
                aria-label={`${copy.cartLabel} - ${totalItems} items`}
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#8791a1] transition-colors duration-200 hover:text-white">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#f2eee7] px-1 text-[10px] font-bold text-[#080c12]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden h-11 w-11 items-center justify-center rounded-full text-[#8791a1] transition-colors duration-200 hover:text-white"
                aria-label="Menu">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 border-b border-white/[0.07] bg-[rgba(12,16,22,0.98)] backdrop-blur-xl md:hidden overflow-hidden"
          >
            <nav className="mx-auto max-w-[1280px] px-4 py-4 space-y-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#c8d4e2] hover:bg-white/[0.04] transition-all min-h-[48px]">
                  {getLocalizedCategoryName(cat, locale)}
                  <ChevronRight size={16} className="text-[#4a5568]" />
                </Link>
              ))}
              <Link href={`/${locale}/shop/all`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 text-[14px] font-semibold text-[#f2eee7] mt-2 min-h-[48px]">
                {copy.heroSecondary}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── User Menu ─── */
function UserMenu({ locale }: { locale: string }) {
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
        className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-[#c8d4e2] transition hover:border-white/20 hover:bg-white/[0.08] min-h-[44px]">
        <User size={15} />
        <span className="text-[12px] font-medium">{locale === 'es' ? 'Entrar' : 'Sign in'}</span>
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-[#c8d4e2] transition hover:text-white min-h-[44px]">
        <User size={15} />
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
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#c8d4e2] transition hover:bg-white/[0.04] hover:text-white min-h-[44px]">
              <PackageCheck size={15} className="text-[#8ea7c7]" />
              {locale === 'es' ? 'Mis pedidos' : 'My orders'}
            </Link>
            <button onClick={() => { setOpen(false); auth.logout() }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#c8d4e2] transition hover:bg-white/[0.04] hover:text-white border-t border-white/[0.06] min-h-[44px]">
              <LogOut size={15} className="text-[#6b7785]" />
              {locale === 'es' ? 'Salir' : 'Sign out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Testimonials ─── */
function Testimonials({ reviews, copy }: { reviews: CopyType['reviews']; copy: CopyType }) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none px-4 sm:px-0 sm:grid sm:gap-4 sm:grid-cols-3 sm:overflow-visible pb-2 sm:pb-0">
      {reviews.map((review) => (
        <motion.div
          key={`${review.author}-${review.product}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="shrink-0 w-[80vw] sm:w-auto rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6 transition-all hover:border-white/[0.12]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Stars rating={review.stars} />
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">{copy.verifiedPurchase}</span>
          </div>
          <p className="text-[13px] sm:text-[14px] leading-6 text-[#c8d0da]">&ldquo;{review.text}&rdquo;</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-[13px] font-semibold text-[#f2eee7]">{review.author}</div>
              <div className="text-[11px] text-[#6b7785]">{review.role}</div>
            </div>
            <span className="shrink-0 rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] text-[#9aa7b9]">{review.product}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function ShopHomePage() {
  const locale = useLocale()
  const isEs = locale === 'es'
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

  const flagship = CATALOG.find(p => p.slug === 'halo') ?? CATALOG[0]
  const flagshipImage = flagship.images?.[0] ?? '/images/mouthpiece-1.jpg'

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f4f1ea]">
      <AnnouncementBar copy={copy} />
      <Header locale={locale} copy={copy} switchHref={switchHref} />

      <main className="pb-24 sm:pb-0">

        {/* ═══════════════════════════════════════════════════════
            HERO — Clean, Koriderm-inspired layout
        ═══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#080c12]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120] via-[#080c12] to-[#080c12]" />

          {/* ── MOBILE HERO ── */}
          <div className="relative sm:hidden px-5 pt-6 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
                <span className="text-[12px]">🔥</span>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">{isEs ? 'Oferta — 40% OFF' : 'Sale — 40% OFF'}</span>
              </div>

              <h1 className="text-[clamp(2.4rem,9vw,4rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                {copy.heroLine1}
                <br />
                <span className="text-[#10BFD8]">{copy.heroLine2}</span>
              </h1>

              <p className="mt-4 max-w-sm mx-auto text-[14px] leading-[1.6] text-[#8791a1]">
                {copy.heroSubtitle}
              </p>

              <div className="mt-5 flex items-baseline justify-center gap-3">
                <span className="text-[32px] font-bold text-white">{copy.heroPrice}</span>
                <span className="text-[16px] text-[#6b7785] line-through">{copy.heroOldPrice}</span>
                <span className="rounded-full bg-[#10BFD8]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#10BFD8]">-40%</span>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#b8c4d0]">
                  <Truck size={12} className="text-[#10BFD8]" /> {isEs ? 'Envío gratis' : 'Free shipping'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#b8c4d0]">
                  <RotateCcw size={12} className="text-[#10BFD8]" /> 30 {isEs ? 'noches' : 'nights'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#b8c4d0]">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> 4.9
                </span>
              </div>

              <Link href={`/${locale}/products/${flagship.slug}`}
                className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-[16px] font-bold text-[#080c12] w-full min-h-[52px]">
                {copy.heroCta} — {copy.heroPrice}
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Product image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6"
            >
              <Link href={`/${locale}/products/${flagship.slug}`} className="block">
                <div className="relative rounded-[24px] overflow-hidden bg-[#0d1828] border border-white/[0.06]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={flagshipImage}
                      alt={getLocalizedProductName(flagship, locale)}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      className="absolute inset-0 h-full w-full object-contain p-6" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c12]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                        ))}
                        <span className="ml-1 text-[11px] font-medium text-white/70">4.9</span>
                      </div>
                      <h2 className="text-[22px] font-bold text-white">{getLocalizedProductName(flagship, locale)}</h2>
                      <p className="mt-1 text-[12px] text-[#9aa7b9] line-clamp-1">{getLocalizedProductShortDescription(flagship, locale)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ── DESKTOP HERO ── */}
          <div className="hidden sm:block relative z-10 mx-auto max-w-[1280px] px-6 py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                  <span className="text-[13px]">🔥</span>
                  <span className="text-[12px] font-bold text-amber-300 uppercase tracking-wide">{isEs ? 'Oferta — 40% OFF' : 'Sale — 40% OFF'}</span>
                </div>

                <h1 className="text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
                  {copy.heroLine1}
                  <br />
                  <span className="text-[#10BFD8]">{copy.heroLine2}</span>
                </h1>

                <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-[#8791a1]">{copy.heroSubtitle}</p>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-[36px] font-bold text-white">{copy.heroPrice}</span>
                  <span className="text-[18px] text-[#6b7785] line-through">{copy.heroOldPrice}</span>
                  <span className="rounded-full bg-[#10BFD8]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#10BFD8]">-40%</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={`/${locale}/products/${flagship.slug}`}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-[16px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] min-h-[52px]">
                    {copy.heroCta}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="#products"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-[15px] font-medium text-[#b8c4d0] transition-all duration-300 hover:border-white/25 hover:text-white min-h-[52px]">
                    {copy.heroSecondary}
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 text-[13px] font-semibold text-white">4.9</span>
                  </div>
                  <span className="w-px h-4 bg-white/10" />
                  <span className="flex items-center gap-1.5 text-[13px] text-[#6b7785]">
                    <Truck size={14} className="text-[#10BFD8]/60" /> {isEs ? 'Envío gratis' : 'Free shipping'}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/${locale}/products/${flagship.slug}`} className="group block">
                  <div className="relative rounded-[28px] overflow-hidden bg-[#0d1828] border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={flagshipImage}
                        alt={getLocalizedProductName(flagship, locale)}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        className="absolute inset-0 h-full w-full object-contain p-10 transition-transform duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c12]/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-9">
                        <div className="flex items-center gap-2 mb-3">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                          ))}
                          <span className="ml-1 text-[12px] font-medium text-white/70">4.9</span>
                        </div>
                        <h2 className="text-[30px] font-bold text-white leading-tight">
                          {getLocalizedProductName(flagship, locale)}
                        </h2>
                        <p className="mt-2 text-[14px] text-[#9aa7b9] line-clamp-1">
                          {getLocalizedProductShortDescription(flagship, locale)}
                        </p>
                        <div className="mt-4 flex items-baseline gap-3">
                          <span className="text-[28px] font-bold text-white">€{flagship.price}</span>
                          <span className="text-[15px] text-[#6b7785] line-through">€{flagship.comparePrice}</span>
                          <span className="rounded-full bg-[#10BFD8]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#10BFD8]">
                            -{Math.round(((flagship.comparePrice - flagship.price) / flagship.comparePrice) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TRUST BAR — Clean, minimal
        ═══════════════════════════════════════════════════════ */}
        <section className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {copy.trustItems.map((item, idx) => (
                <div key={item.label} className={`flex items-center justify-center gap-3 py-5 ${idx < 3 ? 'border-r border-white/[0.06] sm:border-r' : ''} ${idx < 2 ? 'border-b sm:border-b-0' : ''} ${idx === 2 ? 'border-b sm:border-b-0' : ''}`}>
                  <item.icon size={16} className="text-[#10BFD8] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-[#f2eee7] truncate">{item.label}</div>
                    <div className="text-[10px] text-[#6b7785] truncate">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            PRODUCTS — Clean grid
        ═══════════════════════════════════════════════════════ */}
        <section id="products" className="py-16 sm:py-28">
          <div className="sm:mx-auto sm:max-w-[1280px] sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 px-4 sm:px-0"
            >
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white">
                {copy.productsHeading}
              </h2>
              <p className="mt-2 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785] max-w-md mx-auto">
                {copy.productsSub}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 px-4 sm:px-0">
              {CATALOG.map((product) => (
                <ProductCard key={product.slug} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            HOW IT WORKS — 3 steps visual
        ═══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-28 bg-gradient-to-b from-[#080c12] to-[#0a0f18]">
          <div className="sm:mx-auto sm:max-w-[1280px] sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-14 px-4 sm:px-0"
            >
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white">
                {copy.howItWorksHeading}
              </h2>
              <p className="mt-2 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.howItWorksSub}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
              {copy.steps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 text-center"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#10BFD8]/10 text-[20px] font-bold text-[#10BFD8] mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-[13px] sm:text-[14px] leading-6 text-[#6b7785]">{step.text}</p>
                  {idx < 2 && (
                    <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SOCIAL PROOF — Stats + Testimonials
        ═══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-28">
          <div className="sm:mx-auto sm:max-w-[1280px] sm:px-6">
            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16"
            >
              <h2 className="text-center text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white mb-2">
                {copy.statsHeading}
              </h2>
              <p className="text-center text-[14px] sm:text-[15px] text-[#6b7785] mb-8 sm:mb-12">{copy.statsSub}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 px-4 sm:px-0">
                {copy.stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 text-center"
                  >
                    <div className="text-[28px] sm:text-[32px] font-bold text-[#10BFD8]">{stat.value}</div>
                    <div className="mt-1 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.1em] text-[#6b7785]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 px-4 sm:px-0"
            >
              <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.04em] text-white">
                {copy.socialHeading}
              </h2>
              <p className="mt-2 text-[14px] text-[#6b7785]">{copy.socialSub}</p>
            </motion.div>

            <Testimonials reviews={copy.reviews} copy={copy} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="py-16 sm:py-28 bg-gradient-to-b from-[#080c12] to-[#0a0f18]">
          <div className="sm:mx-auto sm:max-w-[1280px] sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 px-4 sm:px-0"
            >
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-white">{copy.faqHeading}</h2>
              <p className="mt-2 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.faqSub}</p>
            </motion.div>

            <div className="max-w-2xl mx-auto px-4 sm:px-0">
              <FAQ items={copy.faqs} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-16 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#080c12] to-[#0d0a1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,191,216,0.1),transparent_60%)]" />

          <div className="relative sm:mx-auto sm:max-w-[1280px] px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
                {copy.ctaHeading}
              </h2>
              <p className="mt-4 sm:mt-5 max-w-lg mx-auto text-[15px] sm:text-[16px] leading-6 sm:leading-7 text-[#9aa7b9]">{copy.ctaSub}</p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                <Link href={`/${locale}/shop/all`} className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 sm:px-10 py-4 sm:py-5 text-[16px] font-bold text-[#080c12] transition-all hover:-translate-y-1 min-h-[52px]">
                  {copy.ctaPrimary}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href={`/${locale}/shop/all?sort=rating`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 sm:px-10 py-4 sm:py-5 text-[15px] sm:text-[16px] font-medium text-[#d0d8e4] transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white min-h-[52px]">
                  {copy.ctaSecondary}
                </Link>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[12px] sm:text-[13px] text-[#6b7785]">
                <span className="flex items-center gap-1.5 sm:gap-2"><Shield size={14} className="text-[#10BFD8]" /> {isEs ? 'Pago seguro SSL' : 'SSL secure checkout'}</span>
                <span className="flex items-center gap-1.5 sm:gap-2"><Truck size={14} className="text-[#10BFD8]" /> {isEs ? 'Envío gratis' : 'Free shipping'}</span>
                <span className="flex items-center gap-1.5 sm:gap-2"><RotateCcw size={14} className="text-[#10BFD8]" /> {isEs ? '30 noches sin riesgo' : '30-night risk-free'}</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Mobile sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.97)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-2.5">
          <button onClick={openCart}
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-[#c8d4e2] active:bg-white/[0.08]"
            aria-label="Open cart">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10BFD8] text-[10px] font-bold text-[#080c16]">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <Link href={`/${locale}/products/${flagship.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3.5 text-[15px] font-semibold text-[#11161d] min-h-[48px]">
            {copy.mobileCta} — {copy.heroPrice} <ChevronRight size={16} />
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
