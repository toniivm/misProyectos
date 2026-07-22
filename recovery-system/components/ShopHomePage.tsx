'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Truck, RotateCcw, ShieldCheck, ShoppingCart, Check, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CATALOG, CATEGORIES, getLocalizedProductName, getLocalizedCategoryName, type CatalogProduct } from '../lib/catalog'
import ProductImage from './ProductImage'
import Header from './Header'

const COPY = {
  en: {
    hero: {
      tagline: 'REST. RECOVER. RECHARGE.',
      title: 'Products for better rest and real recovery.',
      subtitle: 'Sleep and recovery solutions designed to help you sleep deeply, relieve tension, and recover your body — thoughtfully designed to move with your day.',
      cta: 'Shop the collection',
    },
    trust: [
      { icon: Truck, label: 'Free shipping', sub: 'On every order, no minimum.' },
      { icon: RotateCcw, label: '30-day money-back', sub: 'Love it or get a full refund.' },
      { icon: ShieldCheck, label: 'Secure checkout', sub: 'Encrypted and protected.' },
    ],
    products: { heading: 'Featured favorites', viewAll: 'View all' },
    why: {
      heading: 'Why Noctip?',
      body: 'We make calm, useful wellness tech for the small moments that matter — the night you can\'t switch off, the morning you wake up tired, the evening you finally slow down. Thoughtfully designed, quietly effective, made to move with your day.',
      motto: 'Recovery shouldn\'t be complicated. It should just work.',
    },
    bestseller: {
      badge: 'Bestseller',
      heading: 'Noctip Halo',
      price: '€17.99',
      comparePrice: '€29.99',
      subtitle: 'Stop snoring from night one. The Halo gently advances your jaw to open your airway.',
      cta: 'Shop now',
      features: ['Medical-grade silicone', 'Custom boil-and-bite fit', '30-night risk-free trial', 'Free shipping & returns'],
    },
    reviews: { heading: 'Customer Reviews' },
    guarantee: {
      heading: 'Love it, or send it back.',
      body: 'Try Noctip for 30 days. If it\'s not for you, return it for a full refund — no questions asked.',
      cta: 'Shop bestsellers',
    },
    mobile: { cta: 'Shop now' },
  },
  es: {
    hero: {
      tagline: 'DESCANSA. RECUPÉRATE. RECÁRGATE.',
      title: 'Productos para un descanso real y una recuperación de verdad.',
      subtitle: 'Soluciones de sueño y recuperación diseñadas para ayudarte a dormir, aliviar tensiones y recuperar tu cuerpo — pensadas para acompañarte cada día.',
      cta: 'Ver la colección',
    },
    trust: [
      { icon: Truck, label: 'Envío gratis', sub: 'En todos los pedidos, sin mínimo.' },
      { icon: RotateCcw, label: '30 días de devolución', sub: 'Te lo devolvemos todo.' },
      { icon: ShieldCheck, label: 'Pago seguro', sub: 'Cifrado y protegido.' },
    ],
    products: { heading: 'Favoritos destacados', viewAll: 'Ver todo' },
    why: {
      heading: '¿Por qué Noctip?',
      body: 'Hacemos tecnología de bienestar tranquila y útil para esos pequeños momentos que importan — la noche que no puedes desconectar, la mañana que te levantas cansado, la tarde en por fin te relajas. Diseñados con cuidado, efectivos en silencio, hechos para acompañarte.',
      motto: 'La recuperación no debería ser complicada. Solo debería funcionar.',
    },
    bestseller: {
      badge: 'Más vendido',
      heading: 'Noctip Halo',
      price: '€17.99',
      comparePrice: '€29.99',
      subtitle: 'Elimina los ronquidos desde la primera noche. El Halo avanza suavemente tu mandíbula para abrir la vía aérea.',
      cta: 'Comprar ahora',
      features: ['Silicona de grado médico', 'Ajuste personalizado hiérvelo-y-muerde', 'Prueba de 30 noches sin riesgo', 'Envío y devolución gratis'],
    },
    reviews: { heading: 'Reseñas de clientes' },
    guarantee: {
      heading: 'Te gusta, o te lo devolvemos.',
      body: 'Prueba Noctip durante 30 días. Si no es para ti, lo devuelves y te reembolsamos todo — sin preguntas.',
      cta: 'Ver productos',
    },
    mobile: { cta: 'Comprar ahora' },
  },
}

type CopyType = typeof COPY.en
function getCopy(locale: string): CopyType { return locale === 'es' ? COPY.es as CopyType : COPY.en }

function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const name = getLocalizedProductName(product, locale)
  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl" style={{ background: product.color }}>
          <ProductImage slug={product.slug as any} color={product.color} icon={product.icon} images={product.images} alt={name} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]" />
        </div>
        <div className="mt-3 sm:mt-4">
          <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#f2eee7]">{name}</h3>
          <span className="text-[14px] sm:text-[15px] font-bold text-[#f2eee7]">€{product.price}</span>
        </div>
      </motion.div>
    </Link>
  )
}

export default function ShopHomePage() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const copy = getCopy(locale)
  const { open: openCart, totalItems, isOpen: isCartOpen } = useCart()
  const flagship = CATALOG.find(p => p.slug === 'halo') ?? CATALOG[0]
  const flagshipImage = flagship.images?.[0] ?? '/images/mouthpiece-1.jpg'

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      <Header />
      <main className="pb-24 sm:pb-0">

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,191,216,0.08),transparent)]" />
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8791a1] mb-5 sm:mb-6 block">{copy.hero.tagline}</span>
                <h1 className="text-[clamp(2.2rem,7vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#f6f2eb]">{copy.hero.title}</h1>
                <p className="mt-5 sm:mt-6 max-w-md text-[15px] sm:text-[17px] leading-[1.7] text-[#8791a1]">{copy.hero.subtitle}</p>
                <Link href={`/${locale}/shop/all`}
                  className="mt-7 sm:mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] min-h-[52px]">
                  {copy.hero.cta}
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                <Link href={`/${locale}/shop/all`} className="group block">
                  <div className="relative rounded-3xl overflow-hidden bg-[#0d1219]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={flagshipImage} alt={getLocalizedProductName(flagship, locale)}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-y border-white/[0.06] bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
              {copy.trust.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 py-5 sm:py-6 px-2 text-center">
                  <item.icon size={18} className="text-[#10BFD8]" />
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#f2eee7]">{item.label}</span>
                  <span className="text-[10px] sm:text-[11px] text-[#5a6678]">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.products.heading}</h2>
              <Link href={`/${locale}/shop/all`} className="text-[13px] font-semibold text-[#8791a1] hover:text-[#f2eee7] transition-colors">{copy.products.viewAll}</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CATALOG.map((product) => (
                <ProductCard key={product.slug} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* SHOP BY COLLECTION */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-bold tracking-[-0.03em] text-[#f2eee7] mb-6 sm:mb-8">{isEs ? 'Comprar por categoría' : 'Shop by collection'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {CATEGORIES.map((cat, idx) => (
                <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`} className="group block">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-[#0d1219]">
                    <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                      <span className="text-[16px] sm:text-[18px] font-bold text-white z-10">{getLocalizedCategoryName(cat, locale)}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY NOCTIP */}
        <section className="py-16 sm:py-24 lg:py-28 bg-[#0d1219]">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] font-bold tracking-[-0.04em] text-[#f6f2eb] leading-[1.1]">{copy.why.heading}</h2>
              <p className="mt-5 text-[14px] sm:text-[16px] leading-[1.8] text-[#b8c4d0]">{copy.why.body}</p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5">
                <span className="text-[#10BFD8]">✦</span>
                <span className="text-[13px] sm:text-[14px] font-medium text-[#c8d4e2] italic">&ldquo;{copy.why.motto}&rdquo;</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BESTSELLER */}
        <section className="py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 border border-amber-400/20 px-3 py-1 text-[10px] font-bold text-amber-300 uppercase tracking-wide mb-4">
                  {copy.bestseller.badge}
                </span>
                <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[#f6f2eb] leading-[1.1]">{copy.bestseller.heading}</h2>
                <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.7] text-[#8791a1]">{copy.bestseller.subtitle}</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-[28px] sm:text-[32px] font-bold text-[#f2eee7]">{copy.bestseller.price}</span>
                  <span className="text-[15px] text-[#4a5568] line-through">{copy.bestseller.comparePrice}</span>
                </div>
                <ul className="mt-5 space-y-2">
                  {copy.bestseller.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] sm:text-[14px] text-[#c8d4e2]">
                      <Check size={14} className="text-[#10BFD8] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/products/halo`}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] min-h-[52px]">
                  {copy.bestseller.cta}
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="relative rounded-3xl overflow-hidden bg-[#0d1219]">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={flagshipImage} alt={copy.bestseller.heading}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-14 sm:py-24 lg:py-28 bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-bold tracking-[-0.03em] text-[#f2eee7] mb-8 sm:mb-10">{copy.reviews.heading}</h2>
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-10">
                <div className="flex flex-col items-center sm:items-start shrink-0">
                  <span className="text-[56px] sm:text-[64px] font-bold text-[#f2eee7] leading-none">4.8</span>
                  <div className="flex items-center gap-1 mt-2">
                    {[1,2,3,4,5].map(s => <Star key={s} size={18} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-[13px] text-[#8791a1] mt-2">{isEs ? '300 reseñas' : '300 reviews'}</span>
                </div>
                <div className="flex-1 space-y-2 max-w-xs">
                  {[5,4,3,2,1].map(star => {
                    const pcts = [72, 20, 5, 2, 1]
                    const pct = pcts[5 - star]
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-3 text-[13px] font-medium text-[#8791a1]">{star}</span>
                        <Star size={13} className="fill-amber-400 text-amber-400 shrink-0" />
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right text-[12px] text-[#5a6678]">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { name: 'María G.', initials: 'MG', color: 'bg-[#10BFD8]', rating: 5, comment: isEs ? 'Llevo una semana usándola y duermo como nunca. Me pongo un podcast y me quedo dormida en minutos.' : 'I\'ve been using it for a week and I sleep like never before. I put on a podcast and fall asleep in minutes.', verified: true },
                  { name: 'Javier P.', initials: 'JP', color: 'bg-amber-500', rating: 5, comment: isEs ? 'Primera noche y no ronqué. Mi mujer no lo podía creer. Llevaba años intentando de todo.' : 'First night with it and I didn\'t snore. My wife couldn\'t believe it. I\'d been trying different things for years.', verified: true },
                  { name: 'Laura M.', initials: 'LM', color: 'bg-emerald-500', rating: 5, comment: isEs ? 'La tela es suave y no aprieta. La batería dura toda la noche. Muy recomendada.' : 'The fabric is soft and doesn\'t squeeze. Battery lasts all night. Highly recommended.', verified: true },
                  { name: 'Carlos R.', initials: 'CR', color: 'bg-purple-500', rating: 5, comment: isEs ? 'Escéptico al principio, pero la diferencia es brutal. En dos semanas se me quitó el dolor de espalda.' : 'Skeptical at first, but the difference is brutal. In two weeks my back pain is gone.', verified: true },
                ].map((review, idx) => (
                  <motion.div key={review.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                    className="border-b border-white/[0.06] pb-5 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-[#080c12] ${review.color}`}>{review.initials}</div>
                      <div>
                        <span className="text-[14px] font-semibold text-[#f2eee7]">{review.name}</span>
                        {review.verified && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#10BFD8]">
                            <Check size={11} /> {isEs ? 'Compra verificada' : 'Verified purchase'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={13} className={s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-[#2a3448]'} />)}
                    </div>
                    <p className="text-[14px] leading-[1.6] text-[#c8d0da]">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-[-0.04em] text-[#f6f2eb]">{copy.guarantee.heading}</h2>
              <p className="mt-4 text-[14px] sm:text-[16px] leading-[1.7] text-[#8791a1]">{copy.guarantee.body}</p>
              <Link href={`/${locale}/shop/all`}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] min-h-[52px]">
                {copy.guarantee.cta}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* MOBILE CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.97)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden transition-transform duration-300 ${isCartOpen ? 'translate-y-full' : ''}`}>
        <div className="flex items-center gap-2.5">
          <button onClick={openCart} className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-[#8791a1]" aria-label="Cart">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10BFD8] text-[10px] font-bold text-[#080c12]">{totalItems > 9 ? '9+' : totalItems}</span>
            )}
          </button>
          <Link href={`/${locale}/shop/all`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[15px] font-bold text-[#080c12] min-h-[52px] shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
            {copy.mobile.cta} — €13.99
          </Link>
        </div>
      </div>
    </div>
  )
}
