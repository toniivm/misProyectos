'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, Minus, Package, Plus, RotateCcw, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCart } from '../context/CartContext';
import { getCatalogProductBySlug, getProductsByCategory, CATEGORIES, type CatalogProduct } from '../lib/catalog';
import { type Product } from '../lib/products';

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'}
        />
      ))}
    </span>
  );
}

function Badge({ type }: { type: CatalogProduct['badge'] }) {
  if (!type) return null;
  const map = {
    bestseller: { label: 'Best Seller', cls: 'bg-amber-400/15 text-amber-300 border-amber-400/25' },
    new: { label: 'New', cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25' },
    deal: { label: 'Deal', cls: 'bg-rose-400/15 text-rose-300 border-rose-400/25' },
    trending: { label: 'Trending', cls: 'bg-violet-400/15 text-violet-300 border-violet-400/25' },
  };
  const b = map[type];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${b.cls}`}>
      {b.label}
    </span>
  );
}

export default function ProductDetail({ product: legacyProduct }: { product: Product }) {
  const locale = useLocale();
  const { add, open: openCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  // Use catalog data if available, fall back to legacy product data
  const product = getCatalogProductBySlug(legacyProduct.slug);
  const category = product ? CATEGORIES.find((c) => c.id === product.category) : null;
  const related = product ? getProductsByCategory(product.category).filter((p) => p.slug !== product.slug).slice(0, 3) : [];

  const displayName = product?.name ?? legacyProduct.name;
  const displayPrice = product?.price ?? legacyProduct.price;
  const displayComparePrice = product?.comparePrice ?? legacyProduct.comparePrice;
  const savings = Math.round(((displayComparePrice - displayPrice) / displayComparePrice) * 100);

  const handleAdd = () => {
    const icon = product?.cartIcon ?? legacyProduct.icon;
    for (let q = 0; q < qty; q++) {
      add({ slug: legacyProduct.slug, name: displayName, price: displayPrice, icon });
    }
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const reviews = [
    { author: 'Elena V.', role: 'Verified buyer', stars: 5, text: `Exactly as described. The ${displayName} works well and arrived quickly. Solid quality.` },
    { author: 'Marco R.', role: 'Verified buyer', stars: 5, text: `Been using it every day for two weeks. Genuinely noticeable difference. Would buy again.` },
    { author: 'Nora S.', role: 'Verified buyer', stars: 4, text: `Good product. Build quality is better than I expected at this price point. Shipping was fast.` },
  ];

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <div className="grid h-6 w-6 grid-cols-2 gap-[2px] rounded-md border border-white/10 bg-white/[0.03] p-0.5">
              <span className="rounded-[2px] bg-[#cfd8e6]" />
              <span className="rounded-[2px] bg-[#8da3c4]" />
              <span className="rounded-[2px] bg-[#7186a4]" />
              <span className="rounded-[2px] bg-[#d8d0c4]" />
            </div>
            <span className="hidden sm:block">Recovery System</span>
          </Link>
          <Link
            href={`/${locale}/checkout`}
            className="rounded-full bg-[#f2eee7] px-5 py-2 text-[12px] font-semibold text-[#11161d] transition hover:bg-white"
          >
            Checkout
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-[12px] text-[#6b7785]">
          <Link href={`/${locale}`} className="hover:text-[#f2eee7] transition-colors">Home</Link>
          {category && (
            <>
              <ChevronRight size={12} />
              <Link href={`/${locale}/shop/${category.slug}`} className="hover:text-[#f2eee7] transition-colors">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-[#f2eee7]">{displayName}</span>
        </nav>

        {/* Main product layout */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          {/* Left — Images */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {/* Main image */}
            <div
              className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] sm:min-h-[460px]"
              style={{ background: product?.color ?? '#111720' }}
            >
              {product?.images ? (
                <img
                  src={product.images[activeImg]}
                  alt={displayName}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: activeImg === 0 ? '50% 5%' : activeImg === 1 ? '50% 100%' : '50% 55%' }}
                />
              ) : (
                <span className="text-[80px] opacity-40 select-none">{product?.icon ?? '📦'}</span>
              )}
              {product?.badge && (
                <div className="absolute left-4 top-4">
                  <Badge type={product.badge} />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product?.images && product.images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {product.images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                      activeImg === idx ? 'border-[#f2eee7]/50' : 'border-white/10 opacity-50 hover:opacity-75'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover"
                      style={{ objectPosition: idx === 0 ? '50% 5%' : idx === 1 ? '50% 100%' : 'center' }} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right — Product info */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT }}
            className="flex flex-col gap-5"
          >
            {/* Category + badge */}
            <div className="flex items-center gap-2">
              {category && (
                <Link href={`/${locale}/shop/${category.slug}`} className="text-[12px] text-[#8791a1] hover:text-[#f2eee7] transition-colors">
                  {category.icon} {category.name}
                </Link>
              )}
              {product?.badge && <Badge type={product.badge} />}
            </div>

            {/* Title */}
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
              {displayName}
            </h1>

            {/* Rating */}
            {product && (
              <div className="flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-[13px] text-[#f2eee7] font-medium">{product.rating}</span>
                <span className="text-[13px] text-[#8791a1]">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            )}

            {/* Short description */}
            {product && (
              <p className="text-[14px] leading-7 text-[#9aa7b9]">{product.shortDescription}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-[2.4rem] font-bold tracking-[-0.04em] text-[#f6f2eb]">
                €{displayPrice}
              </span>
              <span className="text-[16px] text-[#4a5568] line-through">€{displayComparePrice}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9fb1c9]">
                Save {savings}%
              </span>
            </div>

            {/* Features */}
            {product?.features && (
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] leading-6 text-[#c8d0da]">
                    <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Check size={11} className="text-[#a9b9cc]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0 rounded-full border border-white/[0.12] bg-[#111720]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-[2ch] text-center text-[14px] font-semibold text-[#f2eee7]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold transition-all duration-200 ${
                  added
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-[#f2eee7] text-[#11161d] hover:bg-white hover:shadow-[0_4px_16px_rgba(242,238,231,0.2)]'
                }`}
              >
                {added ? (
                  <><Check size={15} /> Added to cart</>
                ) : (
                  <><ShoppingCart size={15} /> Add to cart — €{displayPrice * qty}</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, label: 'Free shipping' },
                { icon: RotateCcw, label: '30-day returns' },
                { icon: Shield, label: 'Secure checkout' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-center">
                  <item.icon size={16} className="text-[#8ea7c7]" />
                  <span className="text-[10px] font-medium text-[#8791a1]">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Shipping info */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-[12px] leading-6 text-[#8791a1]">
              <div className="flex items-center gap-2 font-medium text-[#f2eee7]">
                <Package size={13} />
                Shipping &amp; delivery
              </div>
              <p className="mt-1.5">Ships within 24 hours · arrives in 3–5 business days · Free on all orders</p>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 border-b border-white/[0.07]">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-[13px] font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#f2eee7] text-[#f2eee7]'
                    : 'text-[#6b7785] hover:text-[#f2eee7]'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product?.reviewCount?.toLocaleString() ?? 0})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-2xl">
                <p className="text-[15px] leading-8 text-[#9aa7b9]">
                  {product?.description ?? legacyProduct.tag}
                </p>
              </div>
            )}

            {activeTab === 'specs' && product?.specs && (
              <div className="max-w-xl overflow-hidden rounded-xl border border-white/[0.07]">
                <table className="w-full text-[13px]">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                        <td className="px-5 py-3 font-medium text-[#8791a1] border-r border-white/[0.06] w-1/3">{key}</td>
                        <td className="px-5 py-3 text-[#f2eee7]">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="grid gap-4 max-w-2xl">
                {reviews.map((r) => (
                  <div key={r.author} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                    <div className="flex items-center gap-2">
                      <Stars rating={r.stars} size={12} />
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">
                        {r.role}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-[#c8d0da]">&quot;{r.text}&quot;</p>
                    <div className="mt-3 text-[12px] font-semibold text-[#8791a1]">{r.author}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-5 text-[18px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              More from {category?.name ?? 'our catalog'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/${locale}/products/${p.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] transition hover:border-white/[0.14]">
                    <div
                      className="flex h-32 items-center justify-center"
                      style={{ background: p.color }}
                    >
                      {p.images ? (
                        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" style={{ objectPosition: '50% 5%' }} />
                      ) : (
                        <span className="text-3xl opacity-50">{p.icon}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-[13px] font-semibold text-[#f2eee7]">{p.name}</div>
                      <div className="mt-1 text-[12px] text-[#8791a1]">€{p.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile add to cart */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.95)] p-3 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0 rounded-full border border-white/[0.12] bg-[#111720]">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center text-[#c8d0da]">
              <Minus size={14} />
            </button>
            <span className="min-w-[2ch] text-center text-[14px] font-semibold text-[#f2eee7]">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="flex h-10 w-10 items-center justify-center text-[#c8d0da]">
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold transition ${
              added
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-[#f2eee7] text-[#11161d]'
            }`}
          >
            {added ? <><Check size={14} /> Added!</> : <><ShoppingCart size={14} /> Add to cart — €{displayPrice * qty}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
