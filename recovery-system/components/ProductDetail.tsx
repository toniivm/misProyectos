'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, Minus, Package, Plus, RotateCcw, Shield, ShoppingCart, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
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
      ? 'Muy bueno, coincide perfectamente con la descripción. Lo probé durante varias noches y funciona para problemas de apnea del sueño. Aún lleva algo de tiempo acostumbrarse a tener algo en la boca mientras duermes.'
      : 'Very good, matches the description perfectly. I tried it for several nights and it works for sleep apnea problems. It still takes some time to get used to having something in your mouth while you sleep.' },
    { author: 'Cliente verificado', date: '15 NOV 2025', color: isEs ? 'Azul' : 'Blue', role: isEs ? 'Compra verificada' : 'Verified buyer', stars: 5, helpful: 5, text: isEs
      ? 'No lo hierva por más de 3 minutos, se convierte en una pasta. Una vez que lo moldeas, queda perfecto y es muy cómodo. Excelente producto para la apnea y los ronquidos.'
      : 'Don\'t boil it for more than 3 minutes, it becomes a paste. Once you mold it, it\'s perfect and very comfortable. Excellent product for apnea and snoring.' },
  ];

  const routineHighlights = [
    { title: isEs ? 'Sin complicaciones' : 'Zero friction', text: isEs
      ? 'Sin configuraciones complejas, sin apps que instalar. Funciona desde el primer momento. Solo ábrelo y úsalo.'
      : 'No complex settings, no apps to install. Works from the moment you open it. Just unbox and use.' },
    { title: isEs ? 'Llévalo a cualquier parte' : 'Take it anywhere', text: isEs
      ? 'Compacto y ligero. Diseñado para casa, oficina o viaje. No ocupa espacio en tu equipaje.'
      : 'Compact and lightweight. Designed for home, office, or travel. Takes up zero space in your luggage.' },
    { title: isEs ? '30 noches sin riesgo' : '30 nights risk-free', text: isEs
      ? 'Pruébalo una noche. Si no notas la diferencia, te devolvemos cada euro. Sin preguntas, sin formularios.'
      : 'Try it one night. If you don\'t feel the difference, we refund every cent. No questions, no forms.' },
  ];

  const productFaqs = [
    { q: isEs ? `¿Cuándo llega?` : `When does it arrive?`, a: isEs
      ? 'Procesamos y enviamos en 24 horas. Entrega estándar: 6-9 días laborables. Exprés de 1-2 días disponible en el checkout. Seguimiento incluido en todos los envíos.'
      : 'We process and ship within 24 hours. Standard delivery: 6-9 business days. Express 1-2 day shipping available at checkout. Tracking included on all orders.' },
    { q: isEs ? '¿Y si no me gusta?' : 'What if I don\'t like it?', a: isEs
      ? 'Pruébalo 30 noches en tu entorno real. Si no cumple tus expectativas, contactas y gestionamos la recogida y el reembolso completo. Sin preguntas, sin formularios.'
      : 'Try it for 30 nights in your real environment. If it doesn\'t meet your expectations, contact us and we arrange pickup and a full refund. No questions, no forms.' },
    { q: isEs ? '¿El pago es seguro?' : 'Is payment secure?', a: isEs
      ? 'Sí. Stripe con cifrado SSL de 256 bits. Nunca almacenamos datos de tarjeta. Visa, Mastercard, Amex, Apple Pay y Google Pay.'
      : 'Yes. Stripe with 256-bit SSL encryption. We never store card data. Visa, Mastercard, Amex, Apple Pay, and Google Pay.' },
    { q: isEs ? '¿Qué incluye exactamente?' : 'What exactly is included?', a: isEs
      ? `El ${displayName} incluye el producto, manual de instrucciones en español e inglés, y todo lo necesario para empezar a usarlo inmediatamente. Empaquetado premium, listo para regalo.`
      : `The ${displayName} includes the product, instruction manual in Spanish and English, and everything you need to start using it immediately. Premium gift-ready packaging.` },
  ];

  const allImages = product?.images ?? [];

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      {/* Language flag SVGs */}
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
            <Link href={`/${locale}/checkout`}
              className="btn-secondary min-h-[44px] px-4">
              {isEs ? 'Pagar' : 'Checkout'}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-3 pb-32 sm:px-6 lg:pb-44">
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
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{ background: product?.color ?? '#111720' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                {showVideo && product?.video ? (
                  <video 
                    src={product.video} 
                    controls 
                    autoPlay 
                    loop
                    muted
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <ProductImage 
                    slug={product?.slug as any ?? legacyProduct.slug as any}
                    color={product?.color ?? legacyProduct.bg}
                    icon={product?.icon ?? legacyProduct.icon}
                    images={product?.images ?? []}
                    alt={displayName}
                    activeIndex={activeImg}
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {product?.badge && <Badge type={product.badge} locale={locale} />}
              </div>
            </div>

            {/* Thumbnails — horizontal scroll on mobile, grid on desktop */}
            <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none sm:grid sm:grid-cols-3 sm:overflow-visible pb-1">
              {allImages.map((src, idx) => (
                <button key={idx} onClick={() => { setActiveImg(idx); setShowVideo(false); }}
                  className={`overflow-hidden rounded-xl border-2 transition-all aspect-square shrink-0 w-[72px] sm:w-auto ${
                    !showVideo && activeImg === idx ? 'border-[#f2eee7]/50' : 'border-white/10 opacity-50 hover:opacity-75'
                  }`}>
                  <img src={src} alt="" className="h-full w-full object-contain p-1" loading={idx === 0 ? 'eager' : 'lazy'} decoding="async"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </button>
              ))}
              {product?.video && (
                <button onClick={() => setShowVideo(true)}
                  className={`overflow-hidden rounded-xl border-2 transition-all aspect-square relative shrink-0 w-[72px] sm:w-auto ${
                    showVideo ? 'border-[#f2eee7]/50' : 'border-white/10 opacity-50 hover:opacity-75'
                  }`}>
                  <div className="h-full w-full bg-[#111720] flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#10BFD8] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#080c12] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
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
                  {category.icon} {isEs ? (category as any).name_es ?? category.name : (category as any).name_en ?? category.name}
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
              <span className="rounded-full bg-[#10BFD8]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#10BFD8]">
                {isEs ? 'Ahorra' : 'Save'} {savings}%
              </span>
            </div>

            {/* Shipping badge — prominent */}
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
                  <li key={f} className="flex items-start gap-2.5 text-[13px] leading-6 text-[#c8d0da]">
                    <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Check size={11} className="text-[#a9b9cc]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Size selector (for products with sizes like Back) */}
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
                      className={`rounded-full border px-4 py-2 text-[12px] font-medium transition-all ${
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
                    : 'btn-secondary'
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
                { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping', sub: isEs ? 'En todos los pedidos' : 'On all orders' },
                { icon: RotateCcw, label: isEs ? '30 días garantía' : '30-day guarantee', sub: isEs ? 'Devolución completa' : 'Full refund' },
                { icon: Shield, label: isEs ? 'Pago seguro' : 'Secure checkout', sub: 'SSL + Stripe' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-center transition-all hover:border-[rgba(16,191,216,0.15)]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.08)]">
                    <item.icon size={14} className="text-[#10BFD8]" />
                  </div>
                  <span className="text-[10px] font-semibold text-[#f2eee7]">{item.label}</span>
                  <span className="text-[9px] text-[#5a6678]">{item.sub}</span>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div className="flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <span className="text-[10px] text-[#5a6678] mr-1">{isEs ? 'Aceptamos:' : 'We accept:'}</span>
              <svg viewBox="0 0 48 16" className="h-4 w-8 opacity-50" fill="#1A1F71"><path d="M19.5 2.5c-2.8 0-5.2.8-6.9 2.2L13 3.6c1.6-1.3 3.8-2.1 6.5-2.1 3.9 0 6.6 1.7 6.6 4.3v.3c0 1.2-.8 2.1-2.2 2.8-1.3.7-3 1.1-4.4 1.5-1.2.3-2.2.6-2.2 1.3 0 .5.4.8 1.2.8.9 0 2-.3 3.2-.9s2.3-1.3 2.3-1.3l-.3 1.8s-1 .7-2.7 1.2c-1 .3-2.1.5-3.2.5-2.5 0-4.1-1.2-4.1-3.2 0-2 1.6-3.2 4.2-4.1 1.4-.5 3.1-.9 4.4-1.2 1.1-.3 1.8-.6 1.8-1.2 0-.6-.6-1-1.9-1-1.1 0-2.4.2-3.6.7z"/><path d="M37.5 10.6c.6 0 1.2-.1 1.8-.4l-.5 1.6c-.5.2-1.1.4-1.7.4-2.1 0-3.3-1.2-3.3-3.1 0-2.2 1.5-3.8 3.5-3.8 1.1 0 2 .5 2.5 1.2l-.7 1.5c-.4-.5-.9-.8-1.6-.8-1.2 0-2 1-2 2.6 0 1.4.7 2.2 2 2.2z"/><path d="M42 .5h2.2L40.5 12.5h-2.2L42 .5z"/><path d="M2.5 2.5H6c1 0 1.8.1 2.2.3l-.4 1.9c-.3-.2-.8-.3-1.5-.3H4.9l-1.2 6.1H1.2L2.5 2.5z"/><path d="M10.5 2.5l-1.5 9.2h-2L9 .5h2.5l2.2 7.8L15 .5h2l-1.5 9.2h-2l1.2-7-2.2 7h-2L10.5 2.5z"/><path d="M26.5 2.5l-1.5 9.2h-2l1.5-9.2h2z"/><path d="M31 2.5l-1.5 9.2h-1.9l1.5-9.2H31zM31.5.5c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4c0-.8.6-1.4 1.4-1.4s1.4.6 1.4 1.4z"/></svg>
              <svg viewBox="0 0 48 16" className="h-4 w-8 opacity-50"><circle fill="#F79F1A" cx="15.5" cy="8" r="7"/><circle fill="#EB001B" cx="28.5" cy="8" r="7" opacity=".8"/><path fill="#FF5F00" d="M22 2c2.8 2.1 4.2 5.4 4.2 8.9 0 3.5-1.4 6.8-4.2 8.9-2.8-2.1-4.2-5.4-4.2-8.9 0-3.5 1.4-6.8 4.2-8.9z"/></svg>
              <svg viewBox="0 0 48 16" className="h-4 w-8 opacity-50"><rect width="48" height="16" rx="2" fill="#006FCF"/><text x="24" y="11" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">AMEX</text></svg>
              <span className="text-[10px] font-medium text-[#6b7280]">PayPal</span>
              <span className="text-[10px] font-medium text-[#6b7280]">G Pay</span>
              <span className="text-[10px] font-medium text-[#6b7280]">Apple Pay</span>
            </div>

            {/* Shipping info */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-[12px] leading-6 text-[#8791a1]">
              <div className="flex items-center gap-2 font-medium text-[#f2eee7]">
                <Package size={13} className="text-[#10BFD8]" />
                {isEs ? 'Logística y entrega' : 'Logistics & delivery'}
              </div>
              <div className="mt-2 space-y-1.5">
                <p className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#10BFD8]" />
                  {isEs ? 'Preparación del pedido: 24h máximo' : 'Order processing: within 24h'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#10BFD8]" />
                  {isEs ? 'Entrega estándar: 6-9 días laborables' : 'Standard delivery: 6-9 business days'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#10BFD8]" />
                  {isEs ? 'Envío exprés disponible (1-2 días)' : 'Express shipping available (1-2 days)'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#10BFD8]" />
                  {isEs ? 'Seguimiento incluido en todos los pedidos' : 'Tracking included on all orders'}
                </p>
              </div>
            </div>

            {/* Bundle suggestion */}
            {product && (
              (() => {
                const matchingBundle = BUNDLES.find(b => b.slugs.includes(product.slug) && b.slugs.length > 1);
                if (!matchingBundle) return null;
                const bundleProducts = matchingBundle.slugs
                  .filter(s => s !== product.slug)
                  .map(s => getCatalogProductBySlug(s))
                  .filter(Boolean) as CatalogProduct[];
                if (bundleProducts.length === 0) return null;
                return (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[13px] font-semibold text-emerald-300">
                        {isEs ? 'Combina y ahorra' : 'Bundle & save'} — -{matchingBundle.discountPercent}%
                      </span>
                    </div>
                    <p className="text-[12px] text-[#8791a1] mb-3">
                      {isEs
                        ? `Añade ${bundleProducts.map(p => getLocalizedField(p, 'name') ?? p.name).join(' y ')} y obtén ${matchingBundle.discountPercent}% de descuento automático.`
                        : `Add ${bundleProducts.map(p => getLocalizedField(p, 'name') ?? p.name).join(' and ')} and get ${matchingBundle.discountPercent}% off automatically.`}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {bundleProducts.map(bp => {
                        const bpName = getLocalizedField(bp, 'name') ?? bp.name;
                        return (
                          <Link key={bp.slug} href={`/${locale}/products/${bp.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300 transition hover:bg-emerald-500/20">
                            {bp.cartIcon} {bpName} +€{bp.price}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })()
            )}
          </motion.div>
        </div>

        {/* Tabs — larger touch targets for mobile */}
        <div className="mt-10 sm:mt-12">
          <div className="flex gap-1 border-b border-white/[0.07] overflow-x-auto scrollbar-none">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-4 text-[13px] font-medium capitalize whitespace-nowrap transition-colors min-h-[48px] ${
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Stars rating={r.stars} size={12} />
                        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">{r.role}</span>
                      </div>
                      <span className="text-[11px] text-[#5a6678]">{r.date}</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-6 text-[#c8d0da]">&ldquo;{r.text}&rdquo;</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-semibold text-[#8791a1]">{r.author}</span>
                        <span className="text-[11px] text-[#5a6678]">|</span>
                        <span className="text-[11px] text-[#5a6678]">{isEs ? 'Color:' : 'Color:'} {r.color}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#5a6678]">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>{isEs ? 'Te ha ayudado' : 'Helpful'} ({r.helpful})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Why this product section */}
        <section className="mt-4 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {product?.images && product.images.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {product.images.slice(0, 3).map((src, idx) => (
                <div key={src}
                  className={`overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#10161f] ${
                    idx === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}>
                  <img src={src} alt={`${displayName} in use`} loading={idx === 0 ? 'eager' : 'lazy'} decoding="async"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    className="h-full w-full object-contain p-4" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,#101722,#0c1118)] p-7 sm:p-8">
            <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ea7c7]">
              {isEs ? 'Por qué funciona' : 'Why it works'}
            </span>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">
              {isEs ? 'Diseñado para que funcione, no para vender' : 'Designed to work, not to sell'}
            </h2>
            <p className="mt-4 text-[14px] leading-7 text-[#8791a1]">
              {isEs
                ? 'Cada producto Noctip pasa por un desarrollo centrado en un solo objetivo: que sea mejor de lo que esperas. Sin promesas vacías. Sin marketing excesivo. Resultados que tu cuerpo nota desde la primera noche.'
                : 'Every Noctip product goes through development focused on one goal: being better than you expect. No empty promises. No excessive marketing. Results your body feels from night one.'}
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
                    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] card-elevated transition-all hover:border-white/[0.14] hover:shadow-card">
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
                  : 'btn-secondary'
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

      {/* Mobile sticky add to cart — visible on all screens below lg */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.97)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-0 rounded-full border border-white/[0.12] bg-[#111720]">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-[#c8d0da] active:bg-white/[0.06]">
              <Minus size={15} />
            </button>
            <span className="min-w-[2ch] text-center text-[15px] font-semibold text-[#f2eee7]">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center text-[#c8d0da] active:bg-white/[0.06]">
              <Plus size={15} />
            </button>
          </div>
          <button onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-semibold transition min-h-[48px] ${
              added ? 'bg-emerald-500/20 text-emerald-300' : 'btn-secondary'
            }`}>
            {added ? <><Check size={15} /> {isEs ? 'Añadido' : 'Added!'}</> : <><ShoppingCart size={15} /> {isEs ? 'Añadir' : 'Add'} — €{displayPrice * qty}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
