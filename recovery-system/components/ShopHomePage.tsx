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
  const router = useRouter()
  const bestSellers = getBestSellers()
  const deals = getDeals()
  const allProducts = CATALOG

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
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
        <section className="py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#f6f2eb]">
              Premium Sleep &<br />Recovery Gear
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-[#8791a1] sm:text-[16px]">
              Over 15 products for better sleep, faster recovery and daily wellness.
              Free shipping. 30-day returns.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${locale}/shop/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-[#d0d8e4] transition hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </motion.div>
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
