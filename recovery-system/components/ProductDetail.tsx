'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, ChevronRight, Minus, Package, Plus, RotateCcw, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCart } from '../context/CartContext';
import { getCatalogProductBySlug, getProductsByCategory, CATEGORIES, getLocalizedProductName, type CatalogProduct } from '../lib/catalog';

export interface Product {
  slug: string;
  name: string;
  tag: string;
  price: number;
  comparePrice: number;
  icon: string;
  bg: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'} />
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

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="grid gap-3">
      {items.map((faq, idx) => (
        <div key={idx} className={`rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 ${
          openIdx === idx ? 'border-white/[0.15] bg-white/[0.04]' : ''
        }`}>
          <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
            <span className="text-[14px] font-semibold text-[#f2eee7]">{faq.q}</span>
            <ChevronDown size={16}
              className={`shrink-0 text-[#6b7785] transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-48' : 'max-h-0'}`}>
            <p className="px-5 pb-4 text-[13px] leading-6 text-[#8791a1]">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductDetail({ product: legacyProduct }: { product: Product }) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const { add, open: openCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [showMobileGallery, setShowMobileGallery] = useState(false);

  const product = getCatalogProductBySlug(legacyProduct.slug);
  const category = product ? CATEGORIES.find((c) => c.id === product.category) : null;
  const related = product ? getProductsByCategory(product.category).filter((p) => p.slug !== product.slug).slice(0, 3) : [];

  function getLocalizedField(obj: any, field: string) {
    if (!obj) return undefined;
    const en = obj[`${field}_en`];
    const es = obj[`${field}_es`];
    if (String(locale || '').toLowerCase().startsWith('es')) {
      return es ?? obj[field] ?? en;
    }
    return en ?? obj[field] ?? es;
  }

  const displayName = product ? getLocalizedField(product, 'name') ?? legacyProduct.name : legacyProduct.name;
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
    setTimeout(() => setAdded(false), 2500);
  };

  const reviews = [
    { author: isEs ? 'Elena V.' : 'Elena V.', role: isEs ? 'Compra verificada' : 'Verified buyer', stars: 5, text: isEs ? `Tal como se describe. El ${displayName} funciona bien y llegó rápido.` : `Exactly as described. The ${displayName} works well and arrived quickly.` },
    { author: isEs ? 'Marco R.' : 'Marco R.', role: isEs ? 'Compra verificada' : 'Verified buyer', stars: 5, text: isEs ? 'Llevo dos semanas usándolo a diario. Diferencia notable. Volvería a comprarlo.' : 'Been using it every day for two weeks. Genuinely noticeable difference. Would buy again.' },
    { author: isEs ? 'Nora S.' : 'Nora S.', role: isEs ? 'Compra verificada' : 'Verified buyer', stars: 4, text: isEs ? 'Buena calidad de construcción, mejor de lo esperado por el precio.' : 'Good product. Build quality is better than I expected at this price point.' },
  ];

  const routineHighlights = [
    { title: isEs ? 'Fácil de usar' : 'Low-friction to use', text: isEs ? 'Diseñado para encajar en tu rutina nocturna sin sentirse como trabajo extra.' : 'Designed to fit into a nightly or post-workout routine without feeling like extra work.' },
    { title: isEs ? 'Portátil por diseño' : 'Portable by design', text: isEs ? 'Fácil de llevar a casa, de viaje o usar en pequeños descansos.' : 'Easy to keep at home, pack for travel, or use during short reset windows.' },
    { title: isEs ? 'Respaldado por garantía' : 'Backed by a guarantee', text: isEs ? 'Pruébalo 30 noches. Quédatelo solo si se gana un lugar en tu rutina.' : 'Try it for 30 nights and keep it only if it earns a place in your routine.' },
  ];

  const productFaqs = [
    { q: isEs ? `¿Cuánto tarda en llegar ${displayName}?` : `How quickly will my ${displayName} arrive?`, a: isEs ? 'Los pedidos salen en 24h y llegan en 3-5 días laborables con seguimiento incluido.' : 'Orders ship within 24 hours and arrive in 3-5 business days with tracking.' },
    { q: isEs ? '¿Puedo devolverlo?' : 'Can I return it?', a: isEs ? 'Sí. Tienes 30 días para probarlo. Si no te funciona, lo devuelves.' : 'Yes. You have a 30-day window to test it at home.' },
    { q: isEs ? '¿El pago es seguro?' : 'Is checkout secure?', a: isEs ? 'Sí. Todos los pagos se procesan con Stripe y cifrado SSL.' : 'Yes. Payments are processed through Stripe with SSL encryption.' },
    { q: isEs ? '¿Para quién es este producto?' : 'Who is this product for?', a: getLocalizedField(product, 'shortDescription') ?? product?.shortDescription ?? `${displayName} is built for people who want better sleep or recovery at home.` },
  ];

  const allImages = product?.images ?? [];

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Language flag SVGs */}
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
            <span className="hidden sm:block">Noctas</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/${locale === 'es' ? 'en' : 'es'}${'/'}`}
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
            <Link href={`/${locale}/checkout`}
              className="btn-light !rounded-full !px-5 !py-2 !text-[12px]">
              {isEs ? 'Pagar' : 'Checkout'}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 pb-28 sm:px-6 lg:pb-40">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-[12px] text-[#6b7785]">
          <Link href={`/${locale}`} className="hover:text-[#f2eee7] transition-colors">{isEs ? 'Inicio' : 'Home'}</Link>
          {category && (
            <><ChevronRight size={12} />
              <Link href={`/${locale}/shop/${category.slug}`} className="hover:text-[#f2eee7] transition-colors">
                {isEs ? (category as any).name_es ?? category.name : (category as any).name_en ?? category.name}
              </Link></>
          )}
          <ChevronRight size={12} />
          <span className="text-[#f2eee7]">{displayName}</span>
        </nav>

        {/* Main product layout */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left — Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {/* Main image */}
            <div className="relative flex min-h-[360px] sm:min-h-[500px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] cursor-pointer"
              style={{ background: product?.color ?? '#111720' }}
              onClick={() => allImages.length > 1 && setShowMobileGallery(true)}>
              {product?.images ? (
                <img src={product.images[activeImg]} alt={displayName} loading="lazy"
                  className="h-full w-full object-cover transition-all duration-500"
                  style={{ objectPosition: activeImg === 0 ? '50% 10%' : activeImg === 1 ? '50% 70%' : '50% 40%' }} />
              ) : (
                <span className="text-[80px] opacity-40 select-none">{product?.icon ?? '📦'}</span>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                {product?.badge && <Badge type={product.badge} />}
              </div>
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, idx) => (
                    <button key={idx} onClick={(e) => { e.stopPropagation(); setActiveImg(idx); }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeImg ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                      }`} />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {allImages.map((src, idx) => (
                  <button key={idx} onClick={() => setActiveImg(idx)}
                    className={`overflow-hidden rounded-xl border-2 transition-all ${
                      activeImg === idx ? 'border-[#f2eee7]/50' : 'border-white/10 opacity-50 hover:opacity-75'
                    }`}>
                    <img src={src} alt="" className="h-20 w-full object-cover" loading="lazy"
                      style={{ objectPosition: idx === 0 ? '50% 10%' : idx === 1 ? '50% 70%' : '50% 40%' }} />
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
            className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start"
          >
            {/* Category + badge */}
            <div className="flex items-center gap-2 flex-wrap">
              {category && (
                <Link href={`/${locale}/shop/${category.slug}`}
                  className="text-[12px] text-[#8791a1] hover:text-[#f2eee7] transition-colors">
                  {category.icon} {isEs ? (category as any).name_es ?? category.name : (category as any).name_en ?? category.name}
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
                  ({product.reviewCount.toLocaleString()} {isEs ? 'reseñas' : 'reviews'})
                </span>
              </div>
            )}

            {/* Short description */}
            {product && (
              <p className="text-[14px] leading-7 text-[#9aa7b9]">
                {getLocalizedField(product, 'shortDescription') ?? product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-[2.4rem] font-bold tracking-[-0.04em] text-[#f6f2eb]">€{displayPrice}</span>
              <span className="text-[16px] text-[#4a5568] line-through">€{displayComparePrice}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9fb1c9]">
                {isEs ? 'Ahorra' : 'Save'} {savings}%
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
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors">
                  <Minus size={14} />
                </button>
                <span className="min-w-[2ch] text-center text-[14px] font-semibold text-[#f2eee7]">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={handleAdd}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold transition-all duration-200 ${
                  added
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'btn-light !rounded-full'
                }`}>
                {added ? (
                  <><Check size={15} /> {isEs ? 'Añadido' : 'Added to cart'}</>
                ) : (
                  <><ShoppingCart size={15} /> {isEs ? 'Añadir al carrito' : 'Add to cart'} — €{displayPrice * qty}</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping' },
                { icon: RotateCcw, label: isEs ? '30 días devolución' : '30-day returns' },
                { icon: Shield, label: isEs ? 'Pago seguro' : 'Secure checkout' },
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
                {isEs ? 'Envío y entrega' : 'Shipping & delivery'}
              </div>
              <p className="mt-1.5">
                {isEs ? 'Envío en 24h · llega en 3–5 días · Gratis en todos los pedidos' : 'Ships within 24h · arrives in 3–5 days · Free on all orders'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 border-b border-white/[0.07] overflow-x-auto scrollbar-none">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-[13px] font-medium capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#f2eee7] text-[#f2eee7]'
                    : 'text-[#6b7785] hover:text-[#f2eee7]'
                }`}>
                {tab === 'reviews'
                  ? `${isEs ? 'Reseñas' : 'Reviews'} (${product?.reviewCount?.toLocaleString() ?? 0})`
                  : tab === 'description'
                    ? (isEs ? 'Descripción' : 'Description')
                    : (isEs ? 'Especificaciones' : 'Specifications')}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-2xl">
                <p className="text-[15px] leading-8 text-[#9aa7b9]">
                  {getLocalizedField(product, 'description') ?? product?.description ?? legacyProduct.tag}
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
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">{r.role}</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-[#c8d0da]">&ldquo;{r.text}&rdquo;</p>
                    <div className="mt-3 text-[12px] font-semibold text-[#8791a1]">{r.author}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Why this product section */}
        <section className="mt-4 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {product?.images ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {product.images.slice(0, 3).map((src, idx) => (
                <div key={src}
                  className={`overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#10161f] ${
                    idx === 0 ? 'sm:col-span-2 min-h-[280px]' : 'min-h-[200px]'
                  }`}>
                  <img src={src} alt={`${displayName} in use`} loading="lazy"
                    className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,#101722,#0c1118)] p-7 sm:p-8">
            <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ea7c7]">
              {isEs ? 'Por qué funciona' : 'Why this product works'}
            </span>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
              {isEs ? 'Diseñado para uso diario' : 'Built for repeated use'}
            </h2>
            <p className="mt-4 text-[14px] leading-7 text-[#8791a1]">
              {isEs
                ? 'Las mejores tiendas no solo muestran especificaciones. Muestran cómo el producto encaja en la vida diaria. Beneficios claros, configuración sencilla y suficiente confianza para comprar sin dudar.'
                : 'The strongest stores do not just show specs. They show how the product fits into daily life. Clear benefits, simple setup and enough trust to buy without hesitation.'}
            </p>

            <div className="mt-7 grid gap-3">
              {routineHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
                  <div className="text-[14px] font-semibold text-[#f2eee7]">{item.title}</div>
                  <p className="mt-1.5 text-[12px] leading-6 text-[#6f7c8b]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ accordions */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">
                {isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'}
              </h2>
              <p className="mt-1 text-[13px] text-[#6b7785]">
                {isEs ? 'Respuestas rápidas antes de añadirlo a tu rutina.' : 'Quick answers before you add it to your routine.'}
              </p>
            </div>
          </div>
          <FAQ items={productFaqs} />
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-5 text-[18px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? 'Más de ' : 'More from '}
              {category ? (isEs ? (category as any).name_es ?? category.name : (category as any).name_en ?? category.name) : (isEs ? 'nuestro catálogo' : 'our catalog')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => {
                const rName = getLocalizedProductName(p, locale);
                return (
                  <Link key={p.slug} href={`/${locale}/products/${p.slug}`} className="group block">
                    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] transition-all hover:border-white/[0.14] hover:shadow-card">
                      <div className="flex h-32 items-center justify-center overflow-hidden" style={{ background: p.color }}>
                        {p.images ? (
                          <img src={p.images[0]} alt={rName} loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ objectPosition: '50% 5%' }} />
                        ) : (
                          <span className="text-3xl opacity-50">{p.icon}</span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-[13px] font-semibold text-[#f2eee7]">{rName}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[12px] text-[#f2eee7]">€{p.price}</span>
                          <span className="text-[11px] text-[#4a5568] line-through">€{p.comparePrice}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Desktop sticky buy bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-white/[0.08] bg-[rgba(8,12,16,0.95)] backdrop-blur-xl lg:block">
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            {product?.images ? (
              <img src={product.images[0]} alt={displayName} loading="lazy"
                className="h-14 w-14 shrink-0 rounded-2xl border border-white/[0.08] object-cover" />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#111720] text-2xl">
                {product?.icon ?? legacyProduct.icon}
              </div>
            )}
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold text-[#f2eee7]">{displayName}</div>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-[#8791a1]">
                {product ? (
                  <><Stars rating={product.rating} size={12} /><span>{product.rating} · {product.reviewCount.toLocaleString()} {isEs ? 'reseñas' : 'reviews'}</span></>
                ) : (
                  <span>{legacyProduct.tag}</span>
                )}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-0 rounded-full border border-white/[0.12] bg-[#111720]">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors">
                <Minus size={14} />
              </button>
              <span className="min-w-[2ch] text-center text-[14px] font-semibold text-[#f2eee7]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors">
                <Plus size={14} />
              </button>
            </div>

            <div className="text-right">
              <div className="text-[19px] font-bold text-[#f6f2eb]">€{displayPrice * qty}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{isEs ? 'Ahorra' : 'Save'} {savings}%</div>
            </div>

            <button onClick={handleAdd}
              className={`inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-200 ${
                added
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'btn-light !rounded-full'
              }`}>
              {added ? <><Check size={15} /> {isEs ? 'Añadido' : 'Added to cart'}</> : <><ShoppingCart size={15} /> {isEs ? 'Añadir' : 'Add to cart'}</>}
            </button>

            <Link href={`/${locale}/checkout`}
              className="hidden items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-[#d6dde7] transition hover:border-white/[0.2] hover:text-white xl:inline-flex">
              {isEs ? 'Pagar' : 'Checkout'}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sticky add to cart */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.95)] p-3 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0 rounded-full border border-white/[0.12] bg-[#111720]">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center text-[#c8d0da]">
              <Minus size={14} />
            </button>
            <span className="min-w-[2ch] text-center text-[14px] font-semibold text-[#f2eee7]">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center text-[#c8d0da]">
              <Plus size={14} />
            </button>
          </div>
          <button onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold transition ${
              added ? 'bg-emerald-500/20 text-emerald-300' : 'btn-light !rounded-full'
            }`}>
            {added ? <><Check size={14} /> {isEs ? 'Añadido' : 'Added!'}</> : <><ShoppingCart size={14} /> {isEs ? 'Añadir' : 'Add to cart'} — €{displayPrice * qty}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
