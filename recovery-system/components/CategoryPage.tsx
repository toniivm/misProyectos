'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ShoppingCart,
  ChevronRight,
  SlidersHorizontal,
  Star,
  Check,
  ArrowLeft,
  Search,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG,
  CATEGORIES,
  getCategoryById,
  getProductsByCategory,
  type CatalogProduct,
} from '../lib/catalog'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'}
        />
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
  eyebrow: string
  title: string
  copy: string
  needs: string[]
  highlights: string[]
}> = {
  all: {
    eyebrow: 'Recovery store overview',
    title: 'A better store for sleep, relief and daily recovery.',
    copy:
      'Shop by the problem you feel first: trouble sleeping, desk tension, sore muscles, sensory overload or rough travel days. The structure is simple on purpose, so the right product is obvious fast.',
    needs: ['Sleep routines', 'Neck relief', 'Muscle reset', 'Travel comfort'],
    highlights: ['15 products', '5 focused categories', '30-night guarantee'],
  },
  'sleep-audio': {
    eyebrow: 'Sleep category',
    title: 'Tools that help you switch off faster and stay asleep longer.',
    copy:
      'Audio sleep gear, white noise and breathing support for people who struggle to wind down at night, block noise or sleep comfortably without hard earbuds.',
    needs: ['Side sleepers', 'Noisy bedrooms', 'Night routines', 'Travel sleep'],
    highlights: ['Bluetooth comfort', 'Noise masking', 'Faster wind-down'],
  },
  'neck-recovery': {
    eyebrow: 'Neck category',
    title: 'Daily relief for stiff necks, rounded shoulders and desk tension.',
    copy:
      'This category is built for screen-heavy routines: cervical decompression, light massage and posture support that fit into short recovery windows at home.',
    needs: ['Desk workers', 'Commuters', 'Posture reset', 'Upper-trap tension'],
    highlights: ['At-home decompression', 'Portable use', 'Short daily sessions'],
  },
  'muscle-recovery': {
    eyebrow: 'Muscle category',
    title: 'Recovery hardware for sore legs, heavy shoulders and post-workout fatigue.',
    copy:
      'Massage guns, vibration tools and heat therapy for athletes, gym-goers and anyone who wants faster recovery without leaving home.',
    needs: ['Post workout', 'Heavy legs', 'Tight shoulders', 'Daily soreness'],
    highlights: ['Deep tissue tools', 'Quiet motors', 'Travel-ready options'],
  },
  sensory: {
    eyebrow: 'Relaxation category',
    title: 'Calmer evenings through blackout, breath and sensory comfort.',
    copy:
      'Weighted masks, blackout sleep accessories and guided breathing tools for people who need a softer way to slow down, nap or recover from overstimulation.',
    needs: ['Eye strain', 'Light sensitivity', 'Calm breathing', 'Shift sleep'],
    highlights: ['Blackout comfort', 'Pressure-based calm', 'Portable rituals'],
  },
  travel: {
    eyebrow: 'Travel category',
    title: 'Portable sleep and recovery for flights, hotels and long days on the move.',
    copy:
      'Compact recovery gear for frequent flyers and busy schedules: easier rest, better posture and less stiffness when you are away from home.',
    needs: ['Flights', 'Hotel sleep', 'Carry-on recovery', 'Commute comfort'],
    highlights: ['Compact gear', 'Easy packing', 'Better rest away from home'],
  },
}

function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const { add, open: openCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    add({ slug: product.slug, name: product.name, price: product.price, icon: product.cartIcon })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  const savings = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
        <div
          className="relative flex h-48 items-center justify-center overflow-hidden"
          style={{ background: product.color }}
        >
          {product.images ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 5%' }}
            />
          ) : (
            <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-300">
              {product.icon}
            </span>
          )}
          {product.badge && (
            <div className="absolute left-3 top-3">
              <Badge type={product.badge} />
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#0c1016]/60 px-2 py-0.5 text-[11px] font-medium text-white/70 backdrop-blur-sm">
            -{savings}%
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="text-[11px] text-[#8791a1]">
              {product.rating} ({product.reviewCount.toLocaleString()})
            </span>
          </div>
          <h3 className="text-[15px] font-semibold leading-snug text-[#f2eee7] group-hover:text-white">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-[12px] leading-5 text-[#8791a1]">
            {product.shortDescription}
          </p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div>
              <span className="text-[18px] font-bold text-[#f2eee7]">€{product.price}</span>
              <span className="ml-2 text-[12px] text-[#4a5568] line-through">€{product.comparePrice}</span>
            </div>
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${
                added
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#f2eee7] text-[#11161d] hover:bg-white'
              }`}
            >
              {added ? <><Check size={12} />Added</> : <><ShoppingCart size={12} />Add</>}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CategoryPage({ categorySlug }: { categorySlug: string }) {
  const locale = useLocale()
  const { totalItems, open: openCart } = useCart()
  const [sort, setSort] = useState<SortOption>('featured')
  const [maxPrice, setMaxPrice] = useState<number>(200)

  const isAll = categorySlug === 'all'
  const category = isAll ? null : getCategoryById(categorySlug)
  const raw = isAll ? CATALOG : getProductsByCategory(categorySlug)
  const editorial = CATEGORY_EDITORIAL[categorySlug] ?? CATEGORY_EDITORIAL.all
  const featuredProduct = [...raw].sort(
    (a, b) => b.reviewCount + b.rating * 100 - (a.reviewCount + a.rating * 100),
  )[0] ?? CATALOG[0]
  const priceFloor = raw.length > 0 ? Math.min(...raw.map((product) => product.price)) : 0

  const products = useMemo(() => {
    let list = raw.filter((p) => p.price <= maxPrice)
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating)
      case 'reviews': return [...list].sort((a, b) => b.reviewCount - a.reviewCount)
      default: return list
    }
  }, [raw, sort, maxPrice])

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-14 items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2 text-[#8791a1] hover:text-[#f2eee7] transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden text-[12px] font-bold uppercase tracking-[0.2em] text-[#f2eee7] sm:block">
                Recovery System™
              </span>
            </Link>
            <div className="flex-1" />
            <div className="hidden items-center gap-1 overflow-x-auto sm:flex">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${locale}/shop/${cat.slug}`}
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                    cat.slug === categorySlug
                      ? 'border-white/[0.2] bg-white/[0.08] text-[#f2eee7]'
                      : 'border-white/[0.07] bg-white/[0.02] text-[#9aa7b9] hover:border-white/[0.14] hover:text-[#f2eee7]'
                  }`}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
            <button
              onClick={openCart}
              className="relative z-40 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#c8d4e2] transition hover:bg-white/[0.08]"
            >
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

      <div className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-[12px] text-[#6b7785]">
          <Link href={`/${locale}`} className="hover:text-[#f2eee7] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[#f2eee7]">{isAll ? 'All Products' : category?.name}</span>
        </nav>

        {/* Editorial hero */}
        <section className="mb-12 overflow-hidden rounded-[30px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(13,18,25,0.98),rgba(10,15,22,0.94))] shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa7b9]">
                  {editorial.eyebrow}
                </span>
              </div>

              <h1 className="text-[clamp(2rem,5vw,3.7rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#f6f2eb]">
                {isAll ? editorial.title : editorial.title}
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#8791a1]">
                {isAll ? editorial.copy : category?.description ? `${category.description} ${editorial.copy}` : editorial.copy}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {editorial.needs.map((need) => (
                  <span
                    key={need}
                    className="inline-flex items-center rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-[#b8c4d0]"
                  >
                    {need}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { value: `${raw.length}`, label: 'products in this collection' },
                  { value: `From €${priceFloor}`, label: 'entry price point' },
                  { value: '30 nights', label: 'risk-free returns' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                    <div className="text-[15px] font-bold text-[#f2eee7]">{item.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/products/${featuredProduct.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-6 py-3.5 text-[14px] font-semibold text-[#11161d] transition hover:bg-white"
                >
                  View featured pick
                  <ChevronRight size={14} />
                </Link>
                <Link
                  href={`/${locale}/shop/all`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3.5 text-[14px] font-medium text-[#c8d4e2] transition hover:border-white/[0.22] hover:text-white"
                >
                  Browse full store
                </Link>
              </div>
            </div>

            <div className="grid gap-3 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
              <Link
                href={`/${locale}/products/${featuredProduct.slug}`}
                className="group relative min-h-[300px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#10161f] sm:min-h-[400px]"
              >
                {featuredProduct.images ? (
                  <img
                    src={featuredProduct.images[1] ?? featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: featuredProduct.slug === 'sleepband-pro' ? '50% 100%' : '50% 5%' }}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-[96px]"
                    style={{ background: featuredProduct.color }}
                  >
                    {featuredProduct.icon}
                  </div>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.08),rgba(8,12,16,0.7))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-[rgba(10,15,22,0.55)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d6dde7] backdrop-blur-sm">
                    Featured in this category
                  </div>
                  <div className="text-[24px] font-bold leading-tight tracking-[-0.03em] text-[#f6f2eb]">
                    {featuredProduct.name}
                  </div>
                  <p className="mt-2 max-w-[19rem] text-[13px] leading-6 text-[#d6dde7]">
                    {featuredProduct.shortDescription}
                  </p>
                </div>
              </Link>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {editorial.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex min-h-[120px] items-end rounded-[24px] border border-white/[0.07] bg-[linear-gradient(160deg,#111720,#0d1219)] p-4"
                  >
                    <div className="text-[15px] font-semibold leading-6 text-[#f2eee7]">{highlight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category trust strip */}
        <section className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Truck, label: 'Free shipping', sub: 'On every order' },
            { icon: RotateCcw, label: '30-night trial', sub: 'Buy with less risk' },
            { icon: Shield, label: 'Secure checkout', sub: 'Stripe encrypted payments' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-4"
            >
              <item.icon size={17} className="shrink-0 text-[#8ea7c7]" />
              <div>
                <div className="text-[13px] font-semibold text-[#f2eee7]">{item.label}</div>
                <div className="text-[11px] text-[#6b7785]">{item.sub}</div>
              </div>
            </div>
          ))}
        </section>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters sidebar */}
          <aside className="shrink-0 lg:w-56">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-[#f2eee7]">
                <SlidersHorizontal size={14} />
                Filters
              </div>

              {/* Price filter */}
              <div className="mb-5">
                <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b7785]">
                  Max price: €{maxPrice}
                </div>
                <input
                  type="range"
                  min={20}
                  max={200}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#f2eee7]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#4a5568]">
                  <span>€20</span>
                  <span>€200</span>
                </div>
              </div>

              {/* Category filter (mobile / sidebar) */}
              <div>
                <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b7785]">
                  Categories
                </div>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href={`/${locale}/shop/all`}
                      className={`block rounded-lg px-3 py-2 text-[12px] transition ${
                        isAll ? 'bg-white/[0.07] text-[#f2eee7]' : 'text-[#8791a1] hover:bg-white/[0.04] hover:text-[#f2eee7]'
                      }`}
                    >
                      All products ({CATALOG.length})
                    </Link>
                  </li>
                  {CATEGORIES.map((cat) => {
                    const count = CATALOG.filter((p) => p.category === cat.id).length
                    return (
                      <li key={cat.id}>
                        <Link
                          href={`/${locale}/shop/${cat.slug}`}
                          className={`block rounded-lg px-3 py-2 text-[12px] transition ${
                            cat.slug === categorySlug
                              ? 'bg-white/[0.07] text-[#f2eee7]'
                              : 'text-[#8791a1] hover:bg-white/[0.04] hover:text-[#f2eee7]'
                          }`}
                        >
                          {cat.icon} {cat.name} ({count})
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[13px] text-[#6b7785]">{products.length} results</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-white/[0.1] bg-[#0d1219] px-4 py-2 text-[12px] text-[#f2eee7] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search size={32} className="mb-4 text-[#4a5568]" />
                <div className="text-[15px] font-medium text-[#8791a1]">No products match your filters</div>
                <button
                  onClick={() => setMaxPrice(200)}
                  className="mt-4 rounded-full bg-[#f2eee7] px-5 py-2 text-[13px] font-semibold text-[#11161d]"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
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
        <button
          onClick={openCart}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3 text-[14px] font-semibold text-[#11161d]"
        >
          <ShoppingCart size={15} />
          {totalItems > 0 ? `View cart (${totalItems})` : 'View cart'}
        </button>
      </div>
    </div>
  )
}
