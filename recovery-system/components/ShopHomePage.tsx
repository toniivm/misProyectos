'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Truck, RotateCcw, ShieldCheck, ShoppingCart, Check, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CATALOG, CATEGORIES, getLocalizedProductName, getLocalizedCategoryName, getProductsByCategory, type CatalogProduct } from '../lib/catalog'
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
      heading: 'WHY NOCTIP?',
      body: 'We make calm, useful wellness tech for the small moments that matter — the night you can\'t switch off, the morning you wake up tired, the evening you finally slow down. Thoughtfully designed, quietly effective, made to move with your day.',
      motto: 'Recovery shouldn\'t be complicated. It should just work.',
    },
    bestseller: {
      badge: 'BESTSELLER',
      heading: 'Noctip Rest',
      price: '€19.99',
      comparePrice: '€31.99',
      savings: '(38% off)',
      subtitle: 'Sleep audio without earbuds. 45 grams that disappear when you wear them.',
      cta: 'Shop now',
      features: ['Bluetooth 5.0 wireless', 'Ultra-thin built-in speakers', 'Machine washable band', '10+ hours battery'],
    },
    reviews: { heading: 'Customer Reviews', write: 'Write a review' },
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
      heading: '¿POR QUÉ NOCTIP?',
      body: 'Hacemos tecnología de bienestar tranquila y útil para esos pequeños momentos que importan — la noche que no puedes desconectar, la mañana que te levantas cansado, la tarde en por fin te relajas. Diseñados con cuidado, efectivos en silencio, hechos para acompañarte.',
      motto: 'La recuperación no debería ser complicada. Solo debería funcionar.',
    },
    bestseller: {
      badge: 'MÁS VENDIDO',
      heading: 'Noctip Rest',
      price: '€19.99',
      comparePrice: '€31.99',
      savings: '(38% dto.)',
      subtitle: 'Audio para dormir sin auriculares. 45 gramos que desaparecen al ponértelos.',
      cta: 'Comprar ahora',
      features: ['Bluetooth 5.0 inalámbrico', 'Altavoces ultrafinos integrados', 'Banda lavable a máquina', '10+ horas de batería'],
    },
    reviews: { heading: 'Reseñas de clientes', write: 'Escribir reseña' },
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
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl" style={{ background: product.color }}>
          <ProductImage slug={product.slug as any} color={product.color} icon={product.icon} images={product.images} alt={name} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]" />
        </div>
        <div className="mt-3">
          <h3 className="text-[14px] font-medium text-[#f2eee7]">{name}</h3>
          <span className="text-[14px] font-bold text-[#f2eee7]">€{product.price}</span>
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
  const flagship = CATALOG.find(p => p.slug === 'sleep-headband') ?? CATALOG[0]
  const flagshipImage = flagship.images?.[0] ?? '/images/sleep-headband-1.webp'
  const flagshipVideo = '/videos/noctip-rest-val.mp4'

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      <Header />
      <main className="pb-24 sm:pb-0">

        {/* HERO — Image LEFT, Text RIGHT */}
        <section>
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link href={`/${locale}/shop/all`} className="group block">
                  <div className="overflow-hidden rounded-xl">
                    <img src={flagshipImage} alt={getLocalizedProductName(flagship, locale)}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#8791a1] mb-4 block">{copy.hero.tagline}</span>
                <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#f6f2eb]">{copy.hero.title}</h1>
                <p className="mt-4 max-w-md text-[15px] sm:text-[16px] leading-[1.7] text-[#8791a1]">{copy.hero.subtitle}</p>
                <Link href={`/${locale}/shop/all`}
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#1a1a1a] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#2a2a2a] min-h-[48px]">
                  {copy.hero.cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BAR — Icons centered */}
        <section className="bg-[#f5f0eb]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid grid-cols-3">
              {copy.trust.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1 py-5 sm:py-6 px-2 text-center">
                  <item.icon size={20} className="text-[#6b7785]" strokeWidth={1.5} />
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#1a1a1a]">{item.label}</span>
                  <span className="text-[10px] sm:text-[11px] text-[#6b7785]">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-[#1a1a1a]">{copy.products.heading}</h2>
              <Link href={`/${locale}/shop/all`} className="text-[13px] font-medium text-[#6b7785] hover:text-[#1a1a1a] transition-colors">{copy.products.viewAll}</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CATALOG.map((product) => (
                <ProductCard key={product.slug} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* SHOP BY COLLECTION */}
        <section className="py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <h2 className="text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-[#1a1a1a] mb-6 sm:mb-8">{isEs ? 'Comprar por categoría' : 'Shop by collection'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat, idx) => {
                const catProducts = getProductsByCategory(cat.id)
                const firstProduct = catProducts[0]
                const catImage = firstProduct?.images?.[0] ?? ''
                return (
                  <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`} className="group block">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="relative overflow-hidden rounded-xl aspect-[16/9] bg-[#e8e2d8]">
                      {catImage && (
                        <img src={catImage} alt={getLocalizedCategoryName(cat, locale)}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20">
                        <span className="text-[16px] sm:text-[18px] font-bold text-white">{getLocalizedCategoryName(cat, locale)}</span>
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHY NOCTIP */}
        <section className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[640px] px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.25em] text-[#6b7785] mb-4">{copy.why.heading}</h2>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#4a4a4a]">{copy.why.body}</p>
              <p className="mt-5 text-[14px] sm:text-[15px] italic text-[#6b7785]">&ldquo;{copy.why.motto}&rdquo;</p>
            </motion.div>
          </div>
        </section>

        {/* BESTSELLER — Full width image with overlay */}
        <section className="relative">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#0d1219]">
            <img src={flagshipImage} alt={copy.bestseller.heading}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 w-full">
              <div className="max-w-md">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#10BFD8] mb-3">{copy.bestseller.badge}</span>
                  <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-bold text-white leading-[1.1]">{copy.bestseller.heading}</h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-[20px] font-bold text-white">{copy.bestseller.price}</span>
                    <span className="text-[14px] text-white/50 line-through">{copy.bestseller.comparePrice}</span>
                    <span className="text-[12px] text-white/60">{copy.bestseller.savings}</span>
                  </div>
                  <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.6] text-white/70">{copy.bestseller.subtitle}</p>
                  <ul className="mt-4 space-y-1.5">
                    {copy.bestseller.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-white/80">
                        <Check size={13} className="text-[#10BFD8] shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/products/sleep-headband`}
                    className="mt-5 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-[14px] font-semibold text-[#1a1a1a] transition-all hover:bg-white/90 min-h-[48px]">
                    {copy.bestseller.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-[#1a1a1a]">{copy.reviews.heading}</h2>
              <Link href={`/${locale}/products/halo`} className="text-[13px] font-medium text-[#6b7785] hover:text-[#1a1a1a] transition-colors underline">{copy.reviews.write}</Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-10">
              <div className="flex flex-col items-center sm:items-start shrink-0">
                <span className="text-[48px] sm:text-[56px] font-bold text-[#1a1a1a] leading-none">4.8</span>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-[13px] text-[#6b7785] mt-1.5">{isEs ? '300 reseñas' : '300 reviews'}</span>
              </div>
              <div className="flex-1 space-y-1.5 max-w-xs">
                {[5,4,3,2,1].map(star => {
                  const pcts = [72, 20, 5, 2, 1]
                  const pct = pcts[5 - star]
                  return (
                    <div key={star} className="flex items-center gap-2.5">
                      <span className="w-3 text-[12px] text-[#6b7785]">{star}</span>
                      <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                      <div className="h-2 flex-1 overflow-hidden rounded bg-[#e8e2d8]">
                        <div className="h-full rounded bg-amber-400" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-6 text-right text-[11px] text-[#6b7785]">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'María G.', initials: 'MG', color: 'bg-[#10BFD8]', rating: 5, date: isEs ? 'hace 1 mes' : '1 month ago', comment: isEs ? 'Llevo una semana usándola y duermo como nunca. Me pongo un podcast y me quedo dormida en minutos.' : 'I\'ve been using it for a week and I sleep like never before. I put on a podcast and fall asleep in minutes.', verified: true },
                { name: 'Javier P.', initials: 'JP', color: 'bg-amber-500', rating: 5, date: isEs ? 'hace 1 mes' : '1 month ago', comment: isEs ? 'Primera noche y no ronqué. Mi mujer no lo podía creer. Llevaba años intentando de todo.' : 'First night with it and I didn\'t snore. My wife couldn\'t believe it.', verified: true },
                { name: 'Laura M.', initials: 'LM', color: 'bg-emerald-500', rating: 5, date: isEs ? 'hace 2 meses' : '2 months ago', comment: isEs ? 'La tela es suave y no aprieta. La batería dura toda la noche. Muy recomendada.' : 'The fabric is soft and doesn\'t squeeze. Battery lasts all night.', verified: true },
                { name: 'Carlos R.', initials: 'CR', color: 'bg-purple-500', rating: 5, date: isEs ? 'hace 2 meses' : '2 months ago', comment: isEs ? 'Escéptico al principio, pero la diferencia es brutal. En dos semanas se me quitó el dolor de espalda.' : 'Skeptical at first, but the difference is brutal. In two weeks my back pain is gone.', verified: true },
              ].map((review, idx) => (
                <motion.div key={review.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                  className="border-b border-[#e8e2d8] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${review.color}`}>{review.initials}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#1a1a1a]">{review.name}</span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                          <Check size={10} /> {isEs ? 'Compra verificada' : 'Verified purchase'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1.5 ml-11">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-[#d4d0ca]'} />)}
                    <span className="text-[11px] text-[#6b7785] ml-1.5">{review.date}</span>
                  </div>
                  <p className="text-[13px] leading-[1.6] text-[#4a4a4a] ml-11">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="py-14 sm:py-20 lg:py-24 border-t border-[#e8e2d8]">
          <div className="mx-auto max-w-[640px] px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[clamp(1.4rem,4vw,2.2rem)] font-bold text-[#1a1a1a] leading-[1.15]">{copy.guarantee.heading}</h2>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-[#6b7785]">{copy.guarantee.body}</p>
              <Link href={`/${locale}/shop/all`}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#1a1a1a] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#2a2a2a] min-h-[48px]">
                {copy.guarantee.cta}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* MOBILE CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[#e8e2d8] bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden transition-transform duration-300 ${isCartOpen ? 'translate-y-full' : ''}`}>
        <div className="flex items-center gap-2.5">
          <button onClick={openCart} className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f5f0eb] text-[#1a1a1a]" aria-label="Cart">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10BFD8] text-[10px] font-bold text-white">{totalItems > 9 ? '9+' : totalItems}</span>
            )}
          </button>
          <Link href={`/${locale}/shop/all`}
            className="flex flex-1 items-center justify-center rounded-lg bg-[#1a1a1a] py-3 text-[14px] font-semibold text-white min-h-[48px]">
            {copy.mobile.cta} — €13.99
          </Link>
        </div>
      </div>
    </div>
  )
}
