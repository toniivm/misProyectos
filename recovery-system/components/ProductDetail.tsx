'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, Minus, Package, Plus, Play, RotateCcw, Shield, ShoppingCart, Truck, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { getCatalogProductBySlug, getProductsByCategory, CATEGORIES, BUNDLES, getLocalizedProductName, type CatalogProduct } from '../lib/catalog';
import ProductImage from './ProductImage';
import Stars from './ui/Stars';
import Badge from './ui/Badge';
import FAQ from './ui/FAQ';

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

export default function ProductDetail({ product: legacyProduct }: { product: Product }) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const pathname = usePathname();
  const { add, open: openCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

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
  const savings = displayComparePrice > 0 ? Math.round(((displayComparePrice - displayPrice) / displayComparePrice) * 100) : 0;

  const handleAdd = () => {
    const icon = product?.cartIcon ?? legacyProduct.icon;
    const sizeSuffix = selectedSize ? ` (${selectedSize})` : '';
    for (let q = 0; q < qty; q++) {
      add({ slug: legacyProduct.slug, name: displayName + sizeSuffix, price: displayPrice, icon });
    }
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  const reviews = [
    { author: 'P***s', date: '07 DIC 2025', color: isEs ? 'Azul' : 'Blue', role: isEs ? 'Compra verificada' : 'Verified buyer', stars: 5, helpful: 7, text: isEs
      ? '¡Se acabó! Desde el primer uso. Muy bueno. Me ayudó mucho con la apnea del sueño. Además, casi eliminó mis ronquidos. Lo recomiendo muchísimo... de hecho, voy a comprar otro para tenerlo como respaldo.'
      : 'It\'s over! From the first use. Very good. It helped me a lot with sleep apnea. It also almost eliminated my snoring. I highly recommend it... in fact, I\'m going to buy another one to have as a backup.' },
    { author: 'Anónimo', date: '25 NOV 2025', color: isEs ? 'Múltiple' : 'Multiple', role: isEs ? 'Compra verificada' : 'Verified buyer', stars: 5, helpful: 3, text: isEs
      ? 'Muy bueno, coincide perfectamente con la descripción. Lo probé durante varias noches y funciona para problemas de apnea del sueño.'
      : 'Very good, matches the description perfectly. I tried it for several nights and it works for sleep apnea problems.' },
    { author: 'Cliente verificado', date: '15 NOV 2025', color: isEs ? 'Azul' : 'Blue', role: isEs ? 'Compra verificada' : 'Verified buyer', stars: 5, helpful: 5, text: isEs
      ? 'No lo hierva por más de 3 minutos. Una vez que lo moldeas, queda perfecto y es muy cómodo. Excelente producto para la apnea y los ronquidos.'
      : 'Don\'t boil it for more than 3 minutes. Once you mold it, it\'s perfect and very comfortable. Excellent product for apnea and snoring.' },
  ];

  const productFaqs = [
    { q: isEs ? '¿Cuándo llega?' : 'When does it arrive?', a: isEs
      ? 'Procesamos y enviamos en 24 horas. Entrega estándar: 6-9 días laborables. Exprés de 1-2 días disponible en el checkout. Seguimiento incluido.'
      : 'We process and ship within 24 hours. Standard delivery: 6-9 business days. Express 1-2 day shipping available at checkout. Tracking included.' },
    { q: isEs ? '¿Y si no me gusta?' : 'What if I don\'t like it?', a: isEs
      ? 'Pruébalo 30 noches. Si no cumple, contactas y gestionamos la devolución y el reembolso completo. Sin preguntas.'
      : 'Try it for 30 nights. If it doesn\'t meet your expectations, contact us and we arrange pickup and a full refund. No questions.' },
    { q: isEs ? '¿El pago es seguro?' : 'Is payment secure?', a: isEs
      ? 'Sí. Stripe con cifrado SSL de 256 bits. Nunca almacenamos datos de tarjeta. Visa, Mastercard, Amex, Apple Pay y Google Pay.'
      : 'Yes. Stripe with 256-bit SSL encryption. We never store card data. Visa, Mastercard, Amex, Apple Pay, and Google Pay.' },
    { q: isEs ? '¿Qué incluye exactamente?' : 'What exactly is included?', a: isEs
      ? `El ${displayName} incluye el producto, manual de instrucciones, y todo lo necesario para empezar a usarlo inmediatamente.`
      : `The ${displayName} includes the product, instruction manual, and everything you need to start using it immediately.` },
  ];

  const allImages = product?.images ?? [];
  const hasVideo = !!product?.video;
  const videoIdx = allImages.length;
  const isVideoActive = hasVideo && activeImg === videoIdx;

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-3 sm:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <Image
              src="/images/logo/logo.png"
              alt="Noctip"
              width={36}
              height={36}
              className="object-contain"
              sizes="36px"
            />
            <span className="hidden sm:block">Noctip</span>
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link href={`/${locale === 'es' ? 'en' : 'es'}${pathname?.replace(/^\/(es|en)/, '') || '/'}`}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-2 text-[11px] font-medium text-[#9aa7b9] hover:text-[#f2eee7] hover:border-white/20 transition-all min-h-[44px]"
              aria-label={isEs ? 'Switch to English' : 'Cambiar a español'}>
              <svg className="w-5 h-3.5 rounded-sm" viewBox="0 0 60 30">
                {isEs ? (
                  <><rect width="50" height="30" fill="#c60b1e"/><rect y="3" width="50" height="24" fill="#ffc400"/><rect y="3" width="50" height="4" fill="#c60b1e"/><rect y="23" width="50" height="4" fill="#c60b1e"/></>
                ) : (
                  <><rect width="60" height="30" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#FFF" strokeWidth="6"/><path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="3"/><path d="M30 0v30M0 15h60" stroke="#FFF" strokeWidth="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="4"/></>
                )}
              </svg>
              <span>{isEs ? 'EN' : 'ES'}</span>
            </Link>
            <button onClick={handleAdd}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#080c12] min-h-[44px]">
              <ShoppingCart size={14} />
              <span className="hidden sm:inline">{isEs ? 'Añadir' : 'Add'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-3 pb-32 sm:px-6 lg:pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-[12px] text-[#6b7785]" aria-label="Breadcrumb">
          <Link href={`/${locale}`} className="hover:text-[#f2eee7] transition-colors">{isEs ? 'Inicio' : 'Home'}</Link>
          {category && (
            <><ChevronRight size={12} />
              <Link href={`/${locale}/shop/${category.slug}`} className="hover:text-[#f2eee7] transition-colors">
                {getLocalizedField(category, 'name') ?? category.name}
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
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{ background: product?.color ?? '#111720' }}>
              {isVideoActive ? (
                <video
                  src={product!.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ProductImage
                    slug={product?.slug as any ?? legacyProduct.slug as any}
                    color={product?.color ?? legacyProduct.bg}
                    icon={product?.icon ?? legacyProduct.icon}
                    images={product?.images ?? []}
                    alt={displayName}
                    activeIndex={activeImg}
                    className="h-full w-full"
                  />
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {product?.badge && <Badge type={product.badge} locale={locale} />}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none sm:grid sm:grid-cols-5 sm:overflow-visible pb-1">
              {allImages.map((src, idx) => (
                <button key={idx} onClick={() => setActiveImg(idx)}
                  className={`overflow-hidden rounded-xl border-2 transition-all aspect-square shrink-0 w-[72px] sm:w-auto ${
                    activeImg === idx ? 'border-[#f2eee7]/50' : 'border-white/10 opacity-50 hover:opacity-75'
                  }`}>
                  <img src={src} alt="" className="h-full w-full object-contain p-1" loading={idx === 0 ? 'eager' : 'lazy'} decoding="async"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </button>
              ))}
              {hasVideo && (
                <button onClick={() => setActiveImg(videoIdx)}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all aspect-square shrink-0 w-[72px] sm:w-auto ${
                    activeImg === videoIdx ? 'border-[#f2eee7]/50' : 'border-white/10 opacity-50 hover:opacity-75'
                  }`}>
                  {allImages[0] ? (
                    <img src={allImages[0]} alt="" className="h-full w-full object-contain p-1" loading="lazy" decoding="async" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#111720] text-[#5a6678]">
                      <Play size={16} />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                      <Play size={14} className="ml-0.5 text-[#080c12]" fill="#080c12" />
                    </div>
                  </div>
                </button>
              )}
            </div>
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
                  {getLocalizedField(category, 'name') ?? category.name}
                </Link>
              )}
              {product?.badge && <Badge type={product.badge} locale={locale} />}
            </div>

            {/* Title */}
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
              {displayName}
            </h1>

            {/* Rating */}
            {product && (
              <div className="flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-[14px] text-[#f2eee7] font-medium">{product.rating}</span>
                <span className="text-[13px] text-[#8791a1]">
                  ({product.reviewCount.toLocaleString()} {isEs ? 'reseñas' : 'reviews'})
                </span>
              </div>
            )}

            {/* Short description */}
            {product && (
              <p className="text-[15px] leading-7 text-[#9aa7b9]">
                {getLocalizedField(product, 'shortDescription') ?? product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-[2.4rem] font-bold tracking-[-0.04em] text-[#f6f2eb]">€{displayPrice}</span>
              <span className="text-[16px] text-[#4a5568] line-through">€{displayComparePrice}</span>
              <span className="rounded-full bg-[#10BFD8]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#10BFD8]">
                {isEs ? 'Ahorra' : 'Save'} {savings}%
              </span>
            </div>

            {/* Shipping badge */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <Truck size={16} className="text-emerald-400" />
              <div>
                <span className="text-[13px] font-semibold text-emerald-300">{isEs ? 'Envío gratis · Envia en 24h' : 'Free shipping · Ships in 24h'}</span>
                <span className="ml-2 text-[12px] text-[#8791a1]">· {isEs ? 'Llega en 6-9 días' : 'Arrives in 6-9 days'}</span>
              </div>
            </div>

            {/* Features */}
            {product?.features && (
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] leading-6 text-[#c8d0da]">
                    <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Check size={11} className="text-[#a9b9cc]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Size selector */}
            {product?.specs?.['Tallas'] && (
              <div>
                <span className="text-[13px] font-medium text-[#c8d0da] mb-2 block">
                  {isEs ? 'Seleccionar talla' : 'Select size'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.specs['Tallas'].split(' / ').map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all min-h-[44px] ${
                        selectedSize === size
                          ? 'border-[#10BFD8] bg-[#10BFD8]/10 text-[#10BFD8]'
                          : 'border-white/10 bg-white/[0.03] text-[#8791a1] hover:border-white/20 hover:text-[#c8d0da]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0 rounded-full border border-white/[0.12] bg-[#111720]">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors"
                  aria-label="Decrease quantity">
                  <Minus size={15} />
                </button>
                <span className="min-w-[2ch] text-center text-[15px] font-semibold text-[#f2eee7]">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors"
                  aria-label="Increase quantity">
                  <Plus size={15} />
                </button>
              </div>
              <button onClick={handleAdd}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-semibold transition-all duration-200 min-h-[52px] ${
                  added
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white text-[#080c12] hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
                }`}>
                {added ? (
                  <><Check size={16} /> {isEs ? 'Añadido' : 'Added to cart'}</>
                ) : (
                  <><ShoppingCart size={16} /> {isEs ? 'Añadir al carrito' : 'Add to cart'} — €{displayPrice * qty}</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping', sub: isEs ? 'En todos los pedidos' : 'On all orders' },
                { icon: RotateCcw, label: isEs ? '30 días garantía' : '30-day guarantee', sub: isEs ? 'Devolución completa' : 'Full refund' },
                { icon: Shield, label: isEs ? 'Pago seguro' : 'Secure checkout', sub: 'SSL + Stripe' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-center transition-all hover:border-[rgba(16,191,216,0.15)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.08)]">
                    <item.icon size={15} className="text-[#10BFD8]" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#f2eee7]">{item.label}</span>
                  <span className="text-[10px] text-[#5a6678]">{item.sub}</span>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div className="flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <span className="text-[11px] text-[#5a6678] mr-1">{isEs ? 'Aceptamos:' : 'We accept:'}</span>
              <span className="text-[11px] font-medium text-[#6b7280]">Visa</span>
              <span className="text-[11px] font-medium text-[#6b7280]">MC</span>
              <span className="text-[11px] font-medium text-[#6b7280]">Amex</span>
              <span className="text-[11px] font-medium text-[#6b7280]">PayPal</span>
              <span className="text-[11px] font-medium text-[#6b7280]">G Pay</span>
              <span className="text-[11px] font-medium text-[#6b7280]">Apple Pay</span>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            HOW IT WORKS — Product specific
        ═══════════════════════════════════════════════════════ */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7] mb-6">
            {isEs ? 'Cómo funciona' : 'How it works'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { num: '01', title: isEs ? 'Recibe tu pedido' : 'Receive your order', text: isEs ? 'Lo enviamos en 24 horas. Llega a tu puerta en 6-9 días con seguimiento incluido.' : 'We ship within 24 hours. Arrives at your door in 6-9 days with tracking included.' },
              { num: '02', title: isEs ? 'Úsalo esta noche' : 'Use it tonight', text: isEs ? 'Sin configuraciones complejas. Funciona desde el primer momento. Solo ábrelo y úsalo.' : 'No complex settings. Works from the moment you open it. Just unbox and use.' },
              { num: '03', title: isEs ? '30 noches sin riesgo' : '30 nights risk-free', text: isEs ? 'Pruébalo en tu entorno real. Si no notas la diferencia, te devolvemos cada euro.' : 'Try it in your real environment. If you don\'t feel the difference, we refund every cent.' },
            ].map((step, idx) => (
              <div key={step.num} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#10BFD8]/10 text-[16px] font-bold text-[#10BFD8] mb-3">
                  {step.num}
                </span>
                <h3 className="text-[15px] font-semibold text-[#f2eee7]">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-[#6b7785]">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            REVIEWS — No tabs, just scroll
        ═══════════════════════════════════════════════════════ */}
        <section className="mt-12 sm:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? 'Reseñas verificadas' : 'Verified reviews'}
            </h2>
            <span className="rounded-full bg-[#10BFD8]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#10BFD8]">
              {product?.reviewCount ?? 0}
            </span>
          </div>
          <div className="grid gap-4 max-w-2xl">
            {reviews.map((r) => (
              <div key={r.author} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Stars rating={r.stars} size={12} />
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">{r.role}</span>
                  </div>
                  <span className="text-[11px] text-[#5a6678]">{r.date}</span>
                </div>
                <p className="mt-2 text-[14px] leading-6 text-[#c8d0da]">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold text-[#8791a1]">{r.author}</span>
                    <span className="text-[11px] text-[#5a6678]">|</span>
                    <span className="text-[11px] text-[#5a6678]">{isEs ? 'Color:' : 'Color:'} {r.color}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#5a6678]">
                    <span>{isEs ? 'Te ha ayudado' : 'Helpful'} ({r.helpful})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FAQ — Product specific
        ═══════════════════════════════════════════════════════ */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7] mb-2">
            {isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'}
          </h2>
          <p className="text-[13px] text-[#6b7785] mb-6">
            {isEs ? 'Respuestas rápidas.' : 'Quick answers.'}
          </p>
          <div className="max-w-2xl">
            <FAQ items={productFaqs} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            RELATED PRODUCTS
        ═══════════════════════════════════════════════════════ */}
        {related.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="mb-5 text-[18px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? 'Más de ' : 'More from '}
              {category ? (getLocalizedField(category, 'name') ?? category.name) : (isEs ? 'nuestro catálogo' : 'our catalog')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => {
                const rName = getLocalizedProductName(p, locale);
                return (
                  <Link key={p.slug} href={`/${locale}/products/${p.slug}`} className="group block">
                    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] transition-all hover:border-white/[0.14] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                      <div className="flex aspect-square items-center justify-center overflow-hidden p-4" style={{ background: p.color }}>
                        {p.images && p.images.length > 0 ? (
                          <img src={p.images[0]} alt={rName} loading="lazy" decoding="async"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <span className="text-3xl opacity-50">{p.icon}</span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-[14px] font-semibold text-[#f2eee7]">{rName}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[14px] font-bold text-[#f2eee7]">€{p.price}</span>
                          <span className="text-[12px] text-[#4a5568] line-through">€{p.comparePrice}</span>
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
            {product?.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={displayName} loading="eager" decoding="async"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                className="h-14 w-14 shrink-0 rounded-2xl border border-white/[0.08] object-contain bg-[#111720] p-1" />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#111720] text-2xl">
                {product?.icon ?? legacyProduct.icon}
              </div>
            )}
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold text-[#f2eee7]">{displayName}</div>
              <div className="mt-1 flex items-center gap-2 text-[12px] text-[#8791a1]">
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
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors"
                aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span className="min-w-[2ch] text-center text-[14px] font-semibold text-[#f2eee7]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0da] hover:text-white transition-colors"
                aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>

            <div className="text-right">
              <div className="text-[19px] font-bold text-[#f6f2eb]">€{displayPrice * qty}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{isEs ? 'Ahorra' : 'Save'} {savings}%</div>
            </div>

            <button onClick={handleAdd}
              className={`inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-200 min-h-[48px] ${
                added
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white text-[#080c12] hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
              }`}>
              {added ? <><Check size={15} /> {isEs ? 'Añadido' : 'Added to cart'}</> : <><ShoppingCart size={15} /> {isEs ? 'Añadir' : 'Add to cart'}</>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sticky add to cart */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.97)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-0 rounded-full border border-white/[0.12] bg-[#111720]">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-[#c8d0da] active:bg-white/[0.06]"
              aria-label="Decrease quantity">
              <Minus size={15} />
            </button>
            <span className="min-w-[2ch] text-center text-[15px] font-semibold text-[#f2eee7]">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center text-[#c8d0da] active:bg-white/[0.06]"
              aria-label="Increase quantity">
              <Plus size={15} />
            </button>
          </div>
          <button onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-semibold transition min-h-[48px] ${
              added ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white text-[#080c12]'
            }`}>
            {added ? <><Check size={15} /> {isEs ? 'Añadido' : 'Added!'}</> : <><ShoppingCart size={15} /> {isEs ? 'Añadir' : 'Add'} — €{displayPrice * qty}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
