'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart,
  Search,
  Star,
  Check,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
  X,
  TrendingUp,
  Zap,
  Package,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CATALOG, CATEGORIES, getBestSellers, getDeals, searchProducts, type CatalogProduct } from '../lib/catalog'

// ─── helpers ─────────────────────────────────────────────────────────────────

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-transparent text-white/20'
          }
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

// ─── Product card ─────────────────────────────────────────────────────────────

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
        {/* Image area */}
        <div
          className="relative flex h-44 items-center justify-center overflow-hidden"
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

        {/* Content */}
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
                  : 'bg-[#f2eee7] text-[#11161d] hover:bg-white hover:shadow-[0_4px_12px_rgba(242,238,231,0.2)]'
              }`}
            >
              {added ? (
                <>
                  <Check size={12} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart size={12} />
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Search bar ───────────────────────────────────────────────────────────────

function SearchBar({ locale }: { locale: string }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => searchProducts(query), [query])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setFocused(false)
      router.push(`/${locale}/shop/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7785]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search sleep headbands, massage guns, eye masks..."
          className="w-full rounded-full border border-white/[0.1] bg-[#111720] py-3 pl-11 pr-10 text-[14px] text-[#f2eee7] placeholder:text-[#4a5568] outline-none transition-all duration-200 focus:border-white/[0.22] focus:bg-[#141c26] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7785] hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d1219] shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {results.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/products/${p.slug}`}
                onClick={() => { setFocused(false); setQuery('') }}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <span className="text-xl">{p.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-[#f2eee7]">{p.name}</div>
                  <div className="truncate text-[11px] text-[#8791a1]">{p.shortDescription}</div>
                </div>
                <span className="shrink-0 text-[13px] font-semibold text-[#f2eee7]">€{p.price}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ShopHomePage() {
  const locale = useLocale()
  const { totalItems, open: openCart } = useCart()
  const bestSellers = getBestSellers()
  const deals = getDeals()
  const allProducts = CATALOG
  const flagship = CATALOG.find((product) => product.slug === 'sleepband-pro') ?? bestSellers[0]
  const starterRoutines = [
    {
      title: 'Night reset',
      slug: 'sleep-audio',
      accent: '😴',
      copy: 'For people who cannot switch off, sleep through noise, or wear hard earbuds in bed.',
      picks: ['SleepBand Pro', 'White Noise Pro', 'SleepSeal+ Pack'],
    },
    {
      title: 'Desk recovery',
      slug: 'neck-recovery',
      accent: '🦴',
      copy: 'For stiff necks, screen-heavy routines and shoulders that feel loaded by the end of the day.',
      picks: ['CerviFlex', 'NeckPulse Pro', 'PostureBand'],
    },
    {
      title: 'Travel reset',
      slug: 'travel',
      accent: '✈️',
      copy: 'For flights, hotel nights and long days away from home where recovery has to stay portable.',
      picks: ['TravelPillow Ultra', 'PortablePulse', 'NapKit Pro'],
    },
  ]

  const lifestyleShots = [
    {
      src: '/images/sleepband-lifestyle.avif',
      title: 'Faster wind-down',
      copy: 'Soft audio at night without hard earbuds',
      objectPosition: '50% 100%',
    },
    {
      src: '/images/sleepband-product.jpg',
      title: 'Clean hardware',
      copy: 'Low-profile comfort built for nightly use',
      objectPosition: '50% 5%',
    },
    {
      src: '/images/sleepband-sport.avif',
      title: 'Travel ready',
      copy: 'Portable recovery for flights, hotels and naps',
      objectPosition: '50% 55%',
    },
  ]

  const TICKER = [
    '🚚 Free shipping on every order',
    '⭐ 4.9 stars — 6,000+ happy customers',
    '🔄 30-day return guarantee, no questions asked',
    '🔒 Secure checkout via Stripe',
    '📦 Ships within 24 hours',
  ]

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* ── Announcement bar ───────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#0d1520] py-2.5 border-b border-white/[0.05]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="flex w-max items-center gap-10"
        >
          {[...TICKER, ...TICKER].map((msg, i) => (
            <span key={i} className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8791a1]">
              {msg}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link href={`/${locale}`} className="shrink-0 flex items-center gap-2.5">
              <div className="grid h-7 w-7 grid-cols-2 gap-[3px] rounded-lg border border-white/10 bg-white/[0.04] p-1">
                <span className="rounded-[3px] bg-[#cfd8e6]" />
                <span className="rounded-[3px] bg-[#8da3c4]" />
                <span className="rounded-[3px] bg-[#7186a4]" />
                <span className="rounded-[3px] bg-[#d8d0c4]" />
              </div>
              <span className="hidden text-[12px] font-bold uppercase tracking-[0.2em] text-[#f2eee7] sm:block">
                Recovery System
              </span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-auto">
              <SearchBar locale={locale} />
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={openCart}
                aria-label={`Cart — ${totalItems} items`}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#c8d4e2] transition hover:border-white/20 hover:bg-white/[0.08]"
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

          {/* Category nav */}
          <div className="flex items-center gap-1 overflow-x-auto pb-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/shop/${cat.slug}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#9aa7b9] transition hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-[#f2eee7]"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_50%,rgba(20,48,90,0.16),transparent)]" />

          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(13,18,25,0.98),rgba(10,15,22,0.94))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center p-8 sm:p-10 lg:p-12"
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5">
                  <Headphones size={12} className="text-[#8ea7c7]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa7b9]">
                    Premium recovery store
                  </span>
                </div>

                <h1 className="text-[clamp(2.35rem,5.4vw,4.35rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#f6f2eb]">
                  Quieter nights.
                  <br />Better mornings.
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#8791a1]">
                  A sleep and recovery store built around what people actually feel every day:
                  poor sleep, neck tension, sore muscles and travel fatigue. Premium hardware,
                  cleaner routines and less guesswork.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {([
                    { emoji: '😴', label: "Can't switch off", slug: 'sleep-audio' },
                    { emoji: '🦴', label: 'Desk neck tension', slug: 'neck-recovery' },
                    { emoji: '💆', label: 'Heavy legs and sore muscles', slug: 'muscle-recovery' },
                    { emoji: '✈️', label: 'Flights and hotel nights', slug: 'travel' },
                  ] as const).map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${locale}/shop/${item.slug}`}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-[#b8c4d0] transition hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white"
                    >
                      <span>{item.emoji}</span>
                      {item.label}
                      <ChevronRight size={12} className="opacity-30 group-hover:opacity-70" />
                    </Link>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${locale}/shop/all`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-6 py-3.5 text-[14px] font-semibold text-[#11161d] shadow-[0_4px_20px_rgba(242,238,231,0.1)] transition hover:bg-white hover:shadow-[0_4px_20px_rgba(242,238,231,0.25)]"
                  >
                    <ShoppingCart size={14} />
                    Shop all 15 products
                  </Link>
                  <Link
                    href={`/${locale}/products/${flagship.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3.5 text-[14px] font-medium text-[#c8d4e2] transition hover:border-white/[0.22] hover:text-white"
                  >
                    Explore {flagship.name}
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { value: 'Side sleepers', label: 'sleep-first essentials' },
                    { value: 'Desk workers', label: 'neck and posture relief' },
                    { value: 'Frequent flyers', label: 'portable recovery gear' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                      <div className="text-[15px] font-bold text-[#f2eee7]">{item.value}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid gap-3 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
              >
                <Link
                  href={`/${locale}/products/${flagship.slug}`}
                  className="group relative min-h-[340px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#10161f] sm:min-h-[420px]"
                >
                  <img
                    src={flagship.images?.[1] ?? flagship.images?.[0]}
                    alt={flagship.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: '50% 100%' }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.1),rgba(8,12,16,0.65))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-[rgba(10,15,22,0.55)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d6dde7] backdrop-blur-sm">
                      Flagship product
                    </div>
                    <div className="max-w-[18rem] text-[22px] font-bold leading-tight tracking-[-0.03em] text-[#f6f2eb]">
                      {flagship.name}
                    </div>
                    <p className="mt-2 max-w-[19rem] text-[13px] leading-6 text-[#d6dde7]">
                      The easiest entry point into better sleep: soft audio, no hard earbuds, nightly comfort.
                    </p>
                  </div>
                </Link>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {lifestyleShots.slice(1).map((shot) => (
                    <div
                      key={shot.title}
                      className="relative min-h-[168px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#10161f]"
                    >
                      <img
                        src={shot.src}
                        alt={shot.title}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: shot.objectPosition }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.02),rgba(8,12,16,0.62))]" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="text-[13px] font-semibold text-[#f2eee7]">{shot.title}</div>
                        <div className="mt-1 text-[11px] leading-5 text-[#c1ccd8]">{shot.copy}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust strip ─────────────────────────────────────────────── */}
        <section className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Truck, label: 'Free shipping', sub: 'On all orders' },
            { icon: RotateCcw, label: '30-day returns', sub: 'No questions asked' },
            { icon: Shield, label: 'Secure checkout', sub: 'SSL + Stripe encrypted' },
            { icon: Star, label: '4.9★ average', sub: '6,000+ verified reviews' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"
            >
              <item.icon size={16} className="shrink-0 text-[#8ea7c7]" />
              <div>
                <div className="text-[12px] font-semibold text-[#f2eee7]">{item.label}</div>
                <div className="text-[11px] text-[#6b7785]">{item.sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Starter routines ─────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7]">
                Start with the routine that matches your problem.
              </h2>
              <p className="mt-2 text-[14px] text-[#6b7785]">
                Instead of browsing randomly, begin with the type of recovery you need most.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {starterRoutines.map((routine) => (
              <Link
                key={routine.slug}
                href={`/${locale}/shop/${routine.slug}`}
                className="group block overflow-hidden rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,#101722,#0c1118)] p-6 transition hover:border-white/[0.14] hover:shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-3xl">{routine.accent}</span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    Curated start
                  </span>
                </div>

                <h3 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7] group-hover:text-white">
                  {routine.title}
                </h3>
                <p className="mt-3 text-[13px] leading-7 text-[#8791a1]">{routine.copy}</p>

                <div className="mt-6 space-y-2">
                  {routine.picks.map((pick) => (
                    <div key={pick} className="flex items-center gap-2 text-[12px] text-[#c8d0da]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px]">
                        <Check size={11} className="text-[#8ea7c7]" />
                      </span>
                      {pick}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-1 text-[13px] font-semibold text-[#8ea7c7] transition-colors group-hover:text-[#c9d8e7]">
                  Shop this routine
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── What we solve ──────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <h2 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold tracking-[-0.035em] text-[#f2eee7]">
                One store. Every recovery need.
              </h2>
              <p className="mt-1.5 text-[13px] text-[#6b7785]">
                Find the right product for your specific problem.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                emoji: '😴',
                problem: "Can't sleep?",
                solution: 'Sleep & Audio',
                description: 'Bluetooth sleep headbands, white noise machines and nasal strips. Fall asleep faster, stay asleep longer.',
                slug: 'sleep-audio',
                colorFrom: '#0d1828',
                colorTo: '#0c1520',
                borderColor: '#1e3a5f',
                borderHover: '#2a5080',
              },
              {
                emoji: '🦴',
                problem: 'Neck or back pain?',
                solution: 'Neck Recovery',
                description: 'Cervical traction devices, targeted massagers and posture correctors. Undo hours at a desk in 20 minutes.',
                slug: 'neck-recovery',
                colorFrom: '#0d1f1a',
                colorTo: '#0c1520',
                borderColor: '#1a3d2e',
                borderHover: '#246040',
              },
              {
                emoji: '💆',
                problem: 'Sore or tired muscles?',
                solution: 'Muscle Recovery',
                description: 'Percussion massage guns, vibration massagers and heating pads. Pro-level recovery at home.',
                slug: 'muscle-recovery',
                colorFrom: '#1a1020',
                colorTo: '#0c1520',
                borderColor: '#3a1f5f',
                borderHover: '#5a3080',
              },
              {
                emoji: '✈️',
                problem: 'Always travelling?',
                solution: 'Travel Recovery',
                description: 'Compact travel pillows, portable massagers and complete sleep kits. Quality rest wherever you land.',
                slug: 'travel',
                colorFrom: '#101828',
                colorTo: '#0c1520',
                borderColor: '#1e3550',
                borderHover: '#2a4a70',
              },
            ].map((item) => (
              <Link key={item.slug} href={`/${locale}/shop/${item.slug}`} className="group block">
                <div
                  className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  style={{
                    background: `linear-gradient(160deg, ${item.colorFrom}, ${item.colorTo})`,
                    borderColor: item.borderColor,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = item.borderHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = item.borderColor)}
                >
                  <span className="mb-4 text-3xl">{item.emoji}</span>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5a6878]">
                    {item.problem}
                  </div>
                  <h3 className="mb-2.5 text-[15px] font-bold text-[#f2eee7] group-hover:text-white transition-colors">
                    {item.solution}
                  </h3>
                  <p className="flex-1 text-[12px] leading-[1.6] text-[#6b7a8a]">{item.description}</p>
                  <div className="mt-5 flex items-center gap-1 text-[12px] font-semibold text-[#7a9ab8] group-hover:text-[#a8c0d8] transition-colors">
                    Shop now
                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────── */}
        <section className="mb-16 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 sm:p-10">
          <h2 className="mb-8 text-center text-[18px] font-bold tracking-[-0.03em] text-[#f2eee7]">
            How it works
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                icon: '🎯',
                title: 'Pick your problem',
                text: 'Browse by category — sleep, pain relief, muscle recovery or travel. Every product targets a specific daily issue.',
              },
              {
                step: '02',
                icon: '📦',
                title: 'Order today, ships tomorrow',
                text: 'Every order ships within 24 hours with free tracked delivery across Europe. Typically arrives in 3–5 days.',
              },
              {
                step: '03',
                icon: '✨',
                title: '30-night guarantee',
                text: 'Try it for a month. If you don\'t feel the difference, contact us for a full refund. Zero risk.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-[18px]">
                    {item.icon}
                  </span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#4a5568]">{item.step}</span>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-[#f2eee7]">{item.title}</h3>
                <p className="text-[13px] leading-6 text-[#6b7785]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recovery In Real Life ─────────────────────────────────── */}
        <section className="mb-16 grid gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,#101722,#0c1118)] p-7 sm:p-8">
            <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ea7c7]">
              Recovery made practical
            </span>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.35rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
              Premium tools that fit into real routines.
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-7 text-[#8791a1]">
              The reference you shared is strong because it explains the product with images, small proof blocks and very clear use cases.
              We are applying that same structure here, but translated into a calmer recovery brand: less playful, more premium, more sleep-focused.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                {
                  title: 'Use it every night',
                  copy: 'Audio sleep gear and eye masks designed for repeated, low-friction use instead of one-off gimmicks.',
                },
                {
                  title: 'Portable enough to travel',
                  copy: 'Compact products for planes, hotels, post-gym recovery and quick resets between long work days.',
                },
                {
                  title: 'Built around specific problems',
                  copy: 'Each category is organized by what you feel first: poor sleep, stiff neck, sore muscles or travel fatigue.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
                  <div className="text-[14px] font-semibold text-[#f2eee7]">{item.title}</div>
                  <p className="mt-1.5 text-[12px] leading-6 text-[#6f7c8b]">{item.copy}</p>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/products/${flagship.slug}`}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-5 py-3 text-[13px] font-semibold text-[#11161d] transition hover:bg-white"
            >
              See flagship routine
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {lifestyleShots.map((shot, idx) => (
              <div
                key={shot.title}
                className={`relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#10161f] ${
                  idx === 0 ? 'sm:col-span-2 min-h-[280px]' : 'min-h-[220px]'
                }`}
              >
                <img
                  src={shot.src}
                  alt={shot.title}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: shot.objectPosition }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.02),rgba(8,12,16,0.6))]" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="text-[14px] font-semibold text-[#f2eee7]">{shot.title}</div>
                  <div className="mt-1 text-[12px] leading-6 text-[#d6dde7]">{shot.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Categories ───────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((cat) => {
              const count = CATALOG.filter((p) => p.category === cat.id).length
              return (
                <Link
                  key={cat.id}
                  href={`/${locale}/shop/${cat.slug}`}
                  className="group flex flex-col items-center rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-6 text-center transition-all hover:border-white/[0.16] hover:bg-white/[0.05]"
                >
                  <span className="mb-3 text-4xl group-hover:scale-110 transition-transform duration-200">
                    {cat.icon}
                  </span>
                  <div className="text-[13px] font-semibold text-[#f2eee7]">{cat.name}</div>
                  <div className="mt-1 text-[11px] text-[#6b7785]">{count} products</div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── Best Sellers ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-amber-400" />
              <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">Best Sellers</h2>
            </div>
            <Link
              href={`/${locale}/shop/all`}
              className="flex items-center gap-1 text-[13px] text-[#8791a1] transition hover:text-[#f2eee7]"
            >
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </section>

        {/* ── Deals & Trending ─────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <Zap size={18} className="text-rose-400" />
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">Deals & Trending</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deals.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </section>

        {/* ── All Products ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <Package size={18} className="text-[#8ea7c7]" />
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">All Products</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProducts.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </section>

        {/* ── Bundle CTA ──────────────────────────────────────────────── */}
        <section className="mb-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(135deg,#111c2e,#0d1219)] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300">
                Bundle & Save
              </span>
              <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
                Build your complete<br />recovery system
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#8791a1]">
                Combine massage, neck relief and sleep audio into one routine. Bundle discounts applied automatically at checkout.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/shop/all`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-6 py-3 text-[14px] font-semibold text-[#11161d] transition hover:bg-white hover:shadow-[0_4px_16px_rgba(242,238,231,0.2)]"
                >
                  Shop all products
                  <ChevronRight size={15} />
                </Link>
                <Link
                  href={`/${locale}/checkout`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-[14px] font-medium text-[#d0d8e4] transition hover:border-white/[0.2] hover:text-white"
                >
                  Go to checkout
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {bestSellers.slice(0, 4).map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className="text-[12px] font-semibold text-[#f2eee7]">{p.name}</div>
                    <div className="text-[11px] text-[#8791a1]">€{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social proof ────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="mb-6 text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">
            What customers say
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                text: 'The SleepBand Pro is incredible. Fell asleep to audiobooks for the first time without earbuds hurting after an hour.',
                author: 'Marco R.', role: 'UX Designer', stars: 5, product: 'SleepBand Pro',
              },
              {
                text: 'Pulse Pro X is whisper quiet compared to my old massager. I can actually use it in the living room at night.',
                author: 'Elena V.', role: 'Night-shift nurse', stars: 5, product: 'Pulse Pro X',
              },
              {
                text: 'CerviFlex genuinely reduces my neck tension after long desk days. Hard to go back to not using it.',
                author: 'James B.', role: 'Software engineer', stars: 5, product: 'CerviFlex',
              },
              {
                text: 'SleepSeal Mask is the first sleep mask I have not ripped off at 3am. The 3D shape actually works.',
                author: 'Nora S.', role: 'Strength coach', stars: 5, product: 'SleepSeal Mask',
              },
              {
                text: 'TravelPillow Ultra gets used every flight. Packs tiny and the memory foam is genuinely supportive.',
                author: 'Priya M.', role: 'Triathlete', stars: 5, product: 'TravelPillow Ultra',
              },
              {
                text: 'White Noise Pro blocks out street noise completely. Sleep quality went up measurably on my tracker.',
                author: 'Daniel K.', role: 'Founder', stars: 5, product: 'White Noise Pro',
              },
            ].map((r) => (
              <div
                key={r.author}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
              >
                <div className="flex items-center gap-2">
                  <Stars rating={r.stars} />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">
                    Verified purchase
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-6 text-[#c8d0da]">"{r.text}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[12px] font-semibold text-[#f2eee7]">{r.author}</div>
                    <div className="text-[11px] text-[#6b7785]">{r.role}</div>
                  </div>
                  <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] text-[#8791a1]">
                    {r.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Buyer Moments ─────────────────────────────────────────── */}
        <section className="mb-16 overflow-hidden rounded-[32px] border border-white/[0.07] bg-[linear-gradient(135deg,#0e1520,#101822)]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="grid grid-cols-2 gap-3 p-4 sm:p-6">
              {[
                { src: '/images/sleepband-product.jpg', objectPosition: '50% 5%' },
                { src: '/images/sleepband-lifestyle.avif', objectPosition: '50% 100%' },
                { src: '/images/sleepband-sport.avif', objectPosition: '50% 55%' },
                { src: '/images/sleepband-battery.avif', objectPosition: 'center' },
              ].map((shot, idx) => (
                <div
                  key={shot.src}
                  className={`overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#111720] ${idx === 0 ? 'col-span-2 min-h-[220px]' : 'min-h-[170px]'}`}
                >
                  <img
                    src={shot.src}
                    alt="Recovery System product scene"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: shot.objectPosition }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="inline-flex w-fit items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ea7c7]">
                Real-world visuals
              </span>
              <h2 className="mt-4 text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[#f6f2eb]">
                A store that shows the routine, not just the product.
              </h2>
              <p className="mt-4 text-[14px] leading-7 text-[#8791a1]">
                This is the core lesson from the references: customers need to see context, lifestyle and use-case clarity.
                So the store now mixes product blocks with real imagery, trust signals and direct explanations instead of relying only on catalog cards.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  { value: 'Sleep', label: 'audio and sensory products' },
                  { value: 'Relief', label: 'neck and muscle recovery' },
                  { value: 'Travel', label: 'portable calm on demand' },
                ].map((item) => (
                  <div key={item.value} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="text-[16px] font-bold text-[#f2eee7]">{item.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/shop/all`}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-[#d6dde7] transition hover:border-white/[0.2] hover:text-white"
              >
                Browse the full store
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="mb-6 text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">
            Frequently asked questions
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { q: 'How long does shipping take?', a: 'Standard orders ship within 24 hours and arrive in 3–5 business days across Europe. Express 1–2 day shipping is available at checkout.' },
              { q: 'What is your return policy?', a: 'Try any product for 30 nights. If it does not work for you, contact us for a free return and full refund — no questions asked.' },
              { q: 'Are the products compatible with all devices?', a: 'Bluetooth products (SleepBand Pro) connect via Bluetooth 5.0 to any smartphone, tablet, or computer. USB-C products charge with any standard USB-C cable.' },
              { q: 'Is checkout secure?', a: 'Yes. All payments are processed through Stripe with SSL encryption. We never store your card details.' },
              { q: 'Can I track my order?', a: 'Yes — you will receive a tracking email within 24 hours of your order shipping. All shipments include real-time tracking.' },
              { q: 'Do you offer bundles?', a: 'Yes. Add multiple products to your cart and bundle discounts are applied automatically. You can also contact us for custom bundle quotes.' },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="text-[14px] font-semibold text-[#f2eee7]">{faq.q}</div>
                <p className="mt-2 text-[13px] leading-6 text-[#8791a1]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.07] bg-[#080c10]">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="grid h-6 w-6 grid-cols-2 gap-[2px] rounded-md border border-white/10 bg-white/[0.03] p-0.5">
                  <span className="rounded-[2px] bg-[#cfd8e6]" />
                  <span className="rounded-[2px] bg-[#8da3c4]" />
                  <span className="rounded-[2px] bg-[#7186a4]" />
                  <span className="rounded-[2px] bg-[#d8d0c4]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">Recovery System</span>
              </div>
              <p className="text-[12px] leading-6 text-[#5a6678]">
                Premium sleep and recovery products for daily wellness.
              </p>
            </div>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">Categories</div>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/${locale}/shop/${cat.slug}`} className="text-[13px] text-[#6b7785] hover:text-[#f2eee7] transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">Support</div>
              <ul className="space-y-2">
                {['Contact us', 'Track your order', 'Return a product', 'Warranty info'].map((l) => (
                  <li key={l}><span className="text-[13px] text-[#6b7785]">{l}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">Policies</div>
              <ul className="space-y-2">
                {['Shipping policy', 'Return policy', 'Privacy policy', 'Terms of service'].map((l) => (
                  <li key={l}><span className="text-[13px] text-[#6b7785]">{l}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/[0.06] pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-[#3d4a5c]">© 2026 Recovery System™. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <Shield size={12} className="text-[#3d4a5c]" />
              <span className="text-[11px] text-[#3d4a5c]">SSL Secure · Stripe Payments</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Mobile sticky CTA ────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.95)] p-4 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-[#c8d4e2]"
          >
            <ShoppingCart size={16} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f2eee7] text-[9px] font-bold text-[#11161d]">
                {totalItems}
              </span>
            )}
          </button>
          <Link
            href={`/${locale}/shop/sleep-audio`}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3 text-[14px] font-semibold text-[#11161d]"
          >
            Shop now <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
