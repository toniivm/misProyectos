'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import {
  ShoppingCart, ChevronRight, Star, Check, Search,
  Truck, RotateCcw, Shield, X, ArrowLeft, SlidersHorizontal,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG, CATEGORIES, getCategoryById, getProductsByCategory,
  getLocalizedCategoryName, getLocalizedProductName,
  getLocalizedProductShortDescription,
  type CatalogProduct,
} from '../lib/catalog'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'

const SORT_LABELS: Record<string, { en: string; es: string }> = {
  featured: { en: 'Featured', es: 'Destacados' },
  'price-asc': { en: 'Price: Low to High', es: 'Precio: menor a mayor' },
  'price-desc': { en: 'Price: High to Low', es: 'Precio: mayor a menor' },
  rating: { en: 'Top Rated', es: 'Mejor valorados' },
  reviews: { en: 'Most Reviews', es: 'Más reseñas' },
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'} />
      ))}
    </span>
  )
}

function Badge({ type }: { type: CatalogProduct['badge'] }) {
  if (!type) return null
  const map = {
    bestseller: { label: 'Best Seller', cls: 'bg-amber-400/15 text-amber-300 border-amber-400/25' },
    new: { label: 'New', cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25' },
    deal: { label: 'Deal', cls: 'bg-rose-400/15 text-rose-300 border-rose-400/25' },
    trending: { label: 'Trending', cls: 'bg-violet-400/15 text-violet-300 border-violet-400/25' },
  }
  const b = map[type]
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${b.cls}`}>
      {b.label}
    </span>
  )
}

const CATEGORY_EDITORIAL: Record<string, {
  eyebrow: { en: string; es: string }
  title: { en: string; es: string }
  copy: { en: string; es: string }
  needs: { en: string[]; es: string[] }
  highlights: string[]
}> = {
  all: {
    eyebrow: { en: 'Recovery store', es: 'Tienda de recuperación' },
    title: { en: 'Everything you need for better rest.', es: 'Todo lo que necesitas para descansar mejor.' },
    copy: { en: 'Shop by the problem you feel first: trouble sleeping, desk tension, sore muscles, or sensory overload. The structure is simple so the right product is obvious fast.', es: 'Compra por el problema que sientes primero: mal sueño, tensión cervical, agujetas o sobrecarga sensorial. Todo es simple para encontrar lo que necesitas rápido.' },
    needs: { en: ['Sleep routines', 'Neck relief', 'Muscle reset', 'Travel comfort'], es: ['Rutinas de sueño', 'Alivio cervical', 'Recuperación muscular', 'Confort de viaje'] },
    highlights: [`${CATALOG.length} products`, '5 categories', '30-night guarantee'],
  },
  'sleep-audio': {
    eyebrow: { en: 'Sleep & Audio', es: 'Sueño y audio' },
    title: { en: 'Tools that help you switch off faster.', es: 'Herramientas para desconectar más rápido.' },
    copy: { en: 'Audio sleep gear, white noise and breathing support for people who struggle to wind down, block noise or sleep comfortably without hard earbuds.', es: 'Equipo de audio para dormir, ruido blanco y apoyo respiratorio para quienes no logran desconectar.' },
    needs: { en: ['Side sleepers', 'Noisy bedrooms', 'Night routines', 'Travel sleep'], es: ['Duermen de lado', 'Habitaciones ruidosas', 'Rutinas nocturnas', 'Dormir viajando'] },
    highlights: ['Bluetooth comfort', 'Noise masking', 'Faster wind-down'],
  },
  'neck-recovery': {
    eyebrow: { en: 'Neck & Recovery', es: 'Cuello y recuperación' },
    title: { en: 'Daily relief for stiff necks and desk tension.', es: 'Alivio diario para cuellos rígidos.' },
    copy: { en: 'Built for screen-heavy routines: cervical decompression, light massage and posture support that fit into short recovery windows at home.', es: 'Diseñado para rutinas con mucha pantalla: descompresión cervical, masaje y soporte postural.' },
    needs: { en: ['Desk workers', 'Posture reset', 'Upper-trap tension', 'Daily relief'], es: ['Trabajo de escritorio', 'Reset postural', 'Tensión cervical', 'Alivio diario'] },
    highlights: ['At-home decompression', 'Portable use', 'Short daily sessions'],
  },
  sensory: {
    eyebrow: { en: 'Sensory & Relaxation', es: 'Sensorial y relajación' },
    title: { en: 'Calmer evenings through sensory comfort.', es: 'Tardes más tranquilas con confort sensorial.' },
    copy: { en: 'Weighted masks, blackout sleep accessories and tools for people who need a softer way to slow down, nap or recover from overstimulation.', es: 'Antifaces con peso, accesorios de oscuridad total y herramientas para relajarse más rápido.' },
    needs: { en: ['Eye strain', 'Light sensitivity', 'Calm breathing', 'Shift sleep'], es: ['Fatiga visual', 'Sensibilidad a la luz', 'Respiración calmada', 'Sueño irregular'] },
    highlights: ['Blackout comfort', 'Pressure-based calm', 'Portable rituals'],
  },
}

function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const { add, open: openCart } = useCart()
  const [added, setAdded] = useState(false)
  const name = getLocalizedProductName(product, locale)
  const desc = getLocalizedProductShortDescription(product, locale)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    add({ slug: product.slug, name, price: product.price, icon: product.cartIcon })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  const savings = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] transition-all duration-500 hover:border-white/[0.14] hover:shadow-card-hover">
        <div className="relative flex h-48 items-center justify-center overflow-hidden" style={{ background: product.color }}>
          {product.images ? (
            <img src={product.images[0]} alt={name} loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: '50% 5%' }} />
          ) : (
            <span className="text-5xl opacity-60 transition-transform duration-500 group-hover:scale-110">{product.icon}</span>
          )}
          {product.badge && (
            <div className="absolute left-3 top-3 z-10"><Badge type={product.badge} /></div>
          )}
          <div className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-[#0c1016]/60 px-2 py-0.5 text-[11px] font-medium text-white/70 backdrop-blur-sm">
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
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${
                added
                  ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                  : 'btn-light !px-3.5 !py-2 !text-[12px]'
              }`}>
              {added ? <><Check size={12} />{locale === 'es' ? 'Añadido' : 'Added'}</> : <><ShoppingCart size={12} />{locale === 'es' ? 'Añadir' : 'Add'}</>}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FilterPanel({
  locale, isEs, categorySlug, maxPrice, setMaxPrice, isAll, showFilters, setShowFilters
}: {
  locale: string; isEs: boolean; categorySlug: string;
  maxPrice: number; setMaxPrice: (v: number) => void;
  isAll: boolean; showFilters: boolean; setShowFilters: (v: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#f2eee7] mb-4">
        <SlidersHorizontal size={14} />
        {isEs ? 'Filtros' : 'Filters'}
      </div>

      <div className="mb-5">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b7785]">
          {isEs ? 'Precio máx:' : 'Max price:'} €{maxPrice}
        </div>
        <input type="range" min={20} max={200} step={5} value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#f2eee7]" />
        <div className="mt-1 flex justify-between text-[10px] text-[#4a5568]">
          <span>€20</span>
          <span>€200</span>
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b7785]">
          {isEs ? 'Categorías' : 'Categories'}
        </div>
        <ul className="space-y-1">
          <li>
            <Link href={`/${locale}/shop/all`}
              onClick={() => setShowFilters(false)}
              className={`block rounded-lg px-3 py-2 text-[12px] transition ${
                isAll ? 'bg-white/[0.07] text-[#f2eee7]' : 'text-[#8791a1] hover:bg-white/[0.04] hover:text-[#f2eee7]'
              }`}>
              {isEs ? 'Todos los productos' : 'All products'} ({CATALOG.length})
            </Link>
          </li>
          {CATEGORIES.map((cat) => {
            const count = CATALOG.filter(p => p.category === cat.id).length
            return (
              <li key={cat.id}>
                <Link href={`/${locale}/shop/${cat.slug}`}
                  onClick={() => setShowFilters(false)}
                  className={`block rounded-lg px-3 py-2 text-[12px] transition ${
                    cat.slug === categorySlug
                      ? 'bg-white/[0.07] text-[#f2eee7]'
                      : 'text-[#8791a1] hover:bg-white/[0.04] hover:text-[#f2eee7]'
                  }`}>
                  {cat.icon} {getLocalizedCategoryName(cat, locale)} ({count})
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function CategoryPage({ categorySlug }: { categorySlug: string }) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const { totalItems, open: openCart } = useCart()
  const [sort, setSort] = useState<SortOption>('featured')
  const [maxPrice, setMaxPrice] = useState<number>(200)
  const [showFilters, setShowFilters] = useState(false)

  const isAll = categorySlug === 'all'
  const category = isAll ? null : getCategoryById(categorySlug)
  const raw = isAll ? CATALOG : getProductsByCategory(categorySlug)
  const editorial = CATEGORY_EDITORIAL[categorySlug] ?? CATEGORY_EDITORIAL.all
  const featuredProduct = [...raw].sort((a, b) => b.reviewCount + b.rating * 100 - (a.reviewCount + a.rating * 100))[0] ?? CATALOG[0]
  const priceFloor = raw.length > 0 ? Math.min(...raw.map(p => p.price)) : 0

  const products = useMemo(() => {
    let list = raw.filter(p => p.price <= maxPrice)
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating)
      case 'reviews': return [...list].sort((a, b) => b.reviewCount - a.reviewCount)
      default: return list
    }
  }, [raw, sort, maxPrice])

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024)
    const onResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowFilters(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const eTitle = isEs ? editorial.title.es : editorial.title.en
  const eCopy = isEs ? editorial.copy.es : editorial.copy.en
  const eNeeds = isEs ? editorial.needs.es : editorial.needs.en

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-14 items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2 text-[#8791a1] hover:text-[#f2eee7] transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden text-[12px] font-bold uppercase tracking-[0.2em] text-[#f2eee7] sm:block">Noctip™</span>
            </Link>
            <div className="flex-1" />
            <nav className="hidden items-center gap-1 overflow-x-auto sm:flex">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`}
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                    cat.slug === categorySlug
                      ? 'border-white/[0.2] bg-white/[0.08] text-[#f2eee7]'
                      : 'border-white/[0.07] bg-white/[0.02] text-[#9aa7b9] hover:border-white/[0.14] hover:text-[#f2eee7]'
                  }`}>
                  {cat.icon} {getLocalizedCategoryName(cat, locale)}
                </Link>
              ))}
            </nav>
            {/* Language switcher with flag */}
            <Link href={`/${locale === 'es' ? 'en' : 'es'}${usePathname()?.replace(/^\/(es|en)/, '') || '/'}`}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-[#9aa7b9] hover:text-[#f2eee7] hover:border-white/20 transition-all"
              aria-label={isEs ? 'Switch to English' : 'Cambiar a español'}>
              <svg className="w-5 h-3.5 rounded-sm" viewBox="0 0 50 30">
                {isEs ? (
                  <><rect width="50" height="30" fill="#c60b1e"/><rect y="3" width="50" height="24" fill="#ffc400"/><rect y="3" width="50" height="4" fill="#c60b1e"/><rect y="23" width="50" height="4" fill="#c60b1e"/></>
                ) : (
                  <><rect width="60" height="30" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#FFF" strokeWidth="6"/><path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="3"/><path d="M30 0v30M0 15h60" stroke="#FFF" strokeWidth="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="4"/></>
                )}
              </svg>
              <span>{isEs ? 'EN' : 'ES'}</span>
            </Link>
            <button onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#c8d4e2] transition hover:bg-white/[0.08]">
              <ShoppingCart size={15} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f2eee7] text-[9px] font-bold text-[#11161d]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 pb-28 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-[12px] text-[#6b7785]" aria-label="Breadcrumb">
          <Link href={`/${locale}`} className="hover:text-[#f2eee7] transition-colors">{isEs ? 'Inicio' : 'Home'}</Link>
          <ChevronRight size={12} />
          <span className="text-[#f2eee7]">{isAll ? (isEs ? 'Todos los productos' : 'All Products') : getLocalizedCategoryName(category!, locale)}</span>
        </nav>

        {/* Editorial hero */}
        <section className="mb-12 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(13,18,25,0.98),rgba(10,15,22,0.94))] shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa7b9]">
                  {isEs ? editorial.eyebrow.es : editorial.eyebrow.en}
                </span>
              </div>

              <h1 className="text-[clamp(2rem,5vw,3.7rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#f6f2eb]">
                {eTitle}
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#8791a1]">
                {category ? `${isEs ? category.description_es ?? category.description : category.description_en ?? category.description} ${eCopy}` : eCopy}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {eNeeds.map((need) => (
                  <span key={need}
                    className="inline-flex items-center rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-[#b8c4d0]">
                    {need}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { value: `${raw.length}`, label: isEs ? 'productos en esta colección' : 'products in this collection' },
                  { value: `From €${priceFloor}`, label: isEs ? 'precio inicial' : 'entry price' },
                  { value: '30 nights', label: isEs ? 'devolución sin riesgo' : 'risk-free returns' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                    <div className="text-[15px] font-bold text-[#f2eee7]">{item.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={`/${locale}/products/${featuredProduct.slug}`}
                  className="btn-light !rounded-full">
                  {isEs ? 'Ver producto destacado' : 'View featured pick'}
                  <ChevronRight size={14} />
                </Link>
                <a href="#products"
                  className="btn-dark !rounded-full">
                  {isEs ? 'Ver todos' : 'Browse all'}
                </a>
              </div>
            </div>

            <div className="relative min-h-[300px] sm:min-h-[400px] overflow-hidden rounded-[30px] m-3 lg:m-4">
              {featuredProduct.images ? (
                <img src={featuredProduct.images[1] ?? featuredProduct.images[0]}
                  alt={getLocalizedProductName(featuredProduct, locale)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ objectPosition: featuredProduct.slug === 'sleepband-pro' ? '50% 100%' : '50% 30%' }} />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[96px]" style={{ background: featuredProduct.color }}>
                  {featuredProduct.icon}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,12,16,0.7)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-[rgba(10,15,22,0.55)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d6dde7] backdrop-blur-sm">
                  {isEs ? 'Destacado' : 'Featured'}
                </div>
                <div className="text-[24px] font-bold leading-tight tracking-[-0.03em] text-[#f6f2eb]">
                  {getLocalizedProductName(featuredProduct, locale)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping', sub: isEs ? 'En todos los pedidos' : 'On every order' },
            { icon: RotateCcw, label: isEs ? '30 noches de prueba' : '30-night trial', sub: isEs ? 'Compra sin riesgo' : 'Buy with less risk' },
            { icon: Shield, label: isEs ? 'Pago seguro' : 'Secure checkout', sub: isEs ? 'Stripe cifrado' : 'Stripe encrypted' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-4">
              <item.icon size={17} className="shrink-0 text-[#8ea7c7]" />
              <div>
                <div className="text-[13px] font-semibold text-[#f2eee7]">{item.label}</div>
                <div className="text-[11px] text-[#6b7785]">{item.sub}</div>
              </div>
            </div>
          ))}
        </section>

        <div id="products" className="flex flex-col gap-6 lg:flex-row">
          {/* Mobile filter toggle */}
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 lg:hidden rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-[#c8d4e2]">
            <SlidersHorizontal size={14} />
            {isEs ? 'Filtros' : 'Filters'}
          </button>

          {/* Filters sidebar */}
          {isDesktop && (
            <aside className="shrink-0 lg:w-56">
              <FilterPanel
                locale={locale} isEs={isEs} categorySlug={categorySlug}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                isAll={isAll} showFilters={showFilters} setShowFilters={setShowFilters}
              />
            </aside>
          )}

          {/* Mobile filters modal */}
          <AnimatePresence>
            {showFilters && !isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
              >
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  className="relative w-full max-w-sm rounded-t-2xl bg-[#0c1016] border border-white/[0.07] p-5 max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[15px] font-semibold text-[#f2eee7]">
                      {isEs ? 'Filtros' : 'Filters'}
                    </span>
                    <button onClick={() => setShowFilters(false)} className="text-[#8791a1] hover:text-white">
                      <X size={18} />
                    </button>
                  </div>
                  <FilterPanel
                    locale={locale} isEs={isEs} categorySlug={categorySlug}
                    maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                    isAll={isAll} showFilters={showFilters} setShowFilters={setShowFilters}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[13px] text-[#6b7785]">{products.length} {isEs ? 'resultados' : 'results'}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-white/[0.1] bg-[#0d1219] px-4 py-2 text-[12px] text-[#f2eee7] outline-none">
                {Object.entries(SORT_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{isEs ? val.es : val.en}</option>
                ))}
              </select>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search size={32} className="mb-4 text-[#4a5568]" />
                <div className="text-[15px] font-medium text-[#8791a1]">
                  {isEs ? 'No hay productos con estos filtros' : 'No products match your filters'}
                </div>
                <button onClick={() => setMaxPrice(200)}
                  className="mt-4 btn-light !rounded-full">
                  {isEs ? 'Restablecer filtros' : 'Reset filters'}
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.slug} product={p} locale={locale} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky cart */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.95)] p-3 backdrop-blur-xl sm:hidden">
        <button onClick={openCart}
          className="flex w-full items-center justify-center gap-2 btn-light !rounded-full">
          <ShoppingCart size={15} />
          {totalItems > 0
            ? `${isEs ? 'Ver carrito' : 'View cart'} (${totalItems})`
            : (isEs ? 'Carrito' : 'Cart')}
        </button>
      </div>
    </div>
  )
}
