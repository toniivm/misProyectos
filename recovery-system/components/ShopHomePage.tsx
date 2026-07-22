'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ShoppingCart, Check, ChevronRight,
  Truck, RotateCcw,
  ArrowRight,
  Moon, Zap, Heart, Headphones,
  Sparkles, ShieldCheck, Star,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG,
  getLocalizedProductName,
  getLocalizedProductShortDescription,
  type CatalogProduct,
} from '../lib/catalog'
import ProductImage from './ProductImage'
import Badge from './ui/Badge'
import FAQ from './ui/FAQ'
import Header from './Header'
import TrustpilotReviews from './TrustpilotReviews'
import CustomerVideos from './CustomerVideos'
import BlogSection from './BlogSection'
import ProductQuiz from './ProductQuiz'
import { trackAddToCart } from './GoogleAnalytics'

const COPY = {
  en: {
    add: 'Add',
    added: 'Added',
    hero: {
      badge: 'Wellness designed for your recovery',
      title1: 'Rest better.',
      title2: 'Recover better.',
      subtitle: 'Wellness solutions designed to help you sleep deeply, relieve tension, and recover your body every day.',
      cta: 'Discover products',
      secondary: 'See how it works',
      price: 'From €13.99',
    },
    trust: [
      { icon: Truck, label: 'Free shipping', sub: 'On every order' },
      { icon: RotateCcw, label: '30-night trial', sub: 'Full refund, no questions' },
      { icon: ShieldCheck, label: 'Secure checkout', sub: 'SSL + Stripe' },
      { icon: Headphones, label: 'Real support', sub: 'Response in 24h' },
    ],
    problems: {
      heading: 'Problems we solve',
      sub: 'You\'re not alone. These are the issues our products address every day.',
      items: [
        { icon: Moon, title: 'Snoring', text: 'You snore every night. Your partner can\'t sleep. You wake up tired no matter how many hours you rest.' },
        { icon: Zap, title: 'Back pain', text: 'Hours at a desk have destroyed your posture. Your back hurts. Your neck is stiff. You\'ve tried everything.' },
        { icon: Heart, title: 'Poor sleep quality', text: 'You can\'t fall asleep. Your mind won\'t stop. You need something that actually helps you rest.' },
      ],
    },
    products: { heading: 'Our products', sub: 'Each one solves a specific problem. No gimmicks.' },
    bestseller: {
      badge: 'Most popular',
      heading: 'The Noctip Halo',
      sub: 'Your nights, transformed. The Halo gently advances your jaw to open your airway, stopping snoring at the source. Thousands already sleep better.',
      price: '€17.99',
      comparePrice: '€29.99',
      savings: '40% off',
      cta: 'Shop now',
      features: [
        'Medical-grade silicone, hypoallergenic',
        'Boil-and-bite custom fit',
        'Adjustable for comfort',
        'Includes travel case',
      ],
    },
    comparison: {
      heading: 'Halo vs. traditional solutions',
      items: [
        { feature: 'Custom fit', noctip: true, alt1: 'No', alt2: 'No' },
        { feature: 'Medical-grade materials', noctip: true, alt1: 'No', alt2: 'Limited' },
        { feature: '30-night risk-free trial', noctip: true, alt1: 'No', alt2: 'No' },
        { feature: 'Free shipping & returns', noctip: true, alt1: 'No', alt2: 'No' },
        { feature: 'Works from night one', noctip: true, alt1: 'Yes', alt2: 'No' },
      ],
    },
    howItWorks: {
      heading: 'How it works',
      sub: 'Three steps to better sleep',
      steps: [
        { num: '01', title: 'Choose your product', text: 'Snoring? Back pain? Neck tension? Pick the product that matches your problem.' },
        { num: '02', title: 'At your door tomorrow', text: 'We ship within 24 hours. Free delivery across Europe. Tracking included.' },
        { num: '03', title: '30 nights to decide', text: 'Try it in your real life. If it doesn\'t work, we refund every cent. No questions.' },
      ],
    },
    whyNoctip: {
      heading: 'Rest should never be a luxury.',
      sub: 'At Noctip, we believe that sleeping well, relieving tension, and recovering your body shouldn\'t be complicated or expensive.',
      body: 'We created Noctip because we saw too many people suffering — from snoring, back pain, restless nights — and settling for products that didn\'t work. So we designed our own. Simple. Effective. Made with quality materials. Backed by real guarantees.',
      motto: 'Recovery shouldn\'t be complicated. It should just work.',
    },
    guarantees: {
      heading: 'Our guarantees',
      sub: 'Built on trust, not fine print',
      items: [
        { icon: RotateCcw, title: '30-night trial', text: 'Test any product for 30 nights. If it doesn\'t work for you, we arrange a free return and full refund.' },
        { icon: Truck, title: 'Free shipping', text: 'Every order ships free within Europe. We process and dispatch within 24 hours.' },
        { icon: ShieldCheck, title: 'Secure payments', text: 'All transactions processed through Stripe with 256-bit SSL encryption.' },
        { icon: Headphones, title: 'Real support', text: 'Have a question? Write to us and a real person answers within 24 hours.' },
      ],
    },
    faq: {
      heading: 'Common questions',
      sub: 'Quick answers before you buy',
      items: [
        { q: 'How fast is shipping?', a: 'We ship all orders within 24 hours. Standard delivery: 6-9 business days across Europe. Tracking included.' },
        { q: 'What does the 30-night guarantee cover?', a: 'Test any product for 30 nights. If it doesn\'t meet your expectations, we arrange a free return and full refund.' },
        { q: 'How does the anti-snoring mouthpiece work?', a: 'The Noctip Halo uses jaw advancement to gently move your lower jaw forward, opening your airway and stopping snoring.' },
        { q: 'Is checkout secure?', a: 'Yes. All payments processed through Stripe with 256-bit SSL encryption. We never store card details.' },
        { q: 'How do I contact support?', a: 'Email us at support@noctip.com. A real person responds within 24 hours.' },
        { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, American Express, PayPal, Apple Pay, and Google Pay.' },
      ],
    },
    cta: {
      heading: 'Ready to sleep better?',
      sub: 'Start with one product. If it doesn\'t work, we\'ll refund everything.',
      primary: 'Shop now',
      secondary: 'View all products',
    },
    mobile: { cta: 'Shop now' },
    reviews: {
      heading: 'What our customers say',
      sub: 'Real reviews from real people.',
      items: [
        { name: 'María G.', product: 'Noctip Rest', rating: 5, comment: 'I\'ve been using it for a week and I sleep like never before. I put on a podcast and fall asleep in minutes. The best: it doesn\'t move even if you sleep on your side.', verified: true },
        { name: 'Javier P.', product: 'Noctip Halo', rating: 5, comment: 'First night with it and I didn\'t snore. My wife couldn\'t believe it. I\'d been trying different things for years.', verified: true },
        { name: 'Laura M.', product: 'Noctip Rest', rating: 5, comment: 'Very good sound quality for a headband. The fabric is soft and doesn\'t squeeze. Battery lasts all night. Recommended.', verified: true },
        { name: 'Carlos R.', product: 'Noctip Back', rating: 5, comment: 'Skeptical at first, but the difference is brutal. I use it 15 minutes a day and in two weeks my back pain is gone.', verified: true },
      ],
    },
  },
  es: {
    add: 'Añadir',
    added: 'Añadido',
    hero: {
      badge: 'Bienestar diseñado para tu recuperación',
      title1: 'Descansa mejor.',
      title2: 'Recupérate mejor.',
      subtitle: 'Soluciones de bienestar diseñadas para ayudarte a dormir profundamente, aliviar tensiones y recuperar tu cuerpo cada día.',
      cta: 'Descubrir productos',
      secondary: 'Ver cómo funciona',
      price: 'Desde €13.99',
    },
    trust: [
      { icon: Truck, label: 'Envío gratis', sub: 'En todos los pedidos' },
      { icon: RotateCcw, label: '30 noches de prueba', sub: 'Reembolso completo' },
      { icon: ShieldCheck, label: 'Pago seguro', sub: 'Cifrado SSL + Stripe' },
      { icon: Headphones, label: 'Soporte real', sub: 'Respuesta en 24h' },
    ],
    problems: {
      heading: 'Problemas que resolvemos',
      sub: 'No estás solo. Estos son los problemas que nuestros productos abordan cada día.',
      items: [
        { icon: Moon, title: 'Ronquidos', text: 'Roncas cada noche. Tu pareja no puede dormir. Despiertas cansado sin importar cuántas horas duermas.' },
        { icon: Zap, title: 'Dolor de espalda', text: 'Horas frente al ordenador han destruido tu postura. Te duele la espalda. El cuello tenso. Lo has intentado todo.' },
        { icon: Heart, title: 'Mala calidad de sueño', text: 'No puedes dormirte. Tu mente no para. Necesitas algo que realmente te ayude a descansar.' },
      ],
    },
    products: { heading: 'Nuestros productos', sub: 'Cada uno resuelve un problema específico. Sin trucos.' },
    bestseller: {
      badge: 'Más popular',
      heading: 'Noctip Halo',
      sub: 'Tus noches, transformadas. El Halo avanza suavemente tu mandíbula para abrir las vías respiratorias, eliminando los ronquidos de raíz. Miles ya descansan mejor.',
      price: '€17.99',
      comparePrice: '€29.99',
      savings: '40% dto.',
      cta: 'Comprar ahora',
      features: [
        'Silicona de grado médico, hipoalergénica',
        'Ajuste personalizado hiérvelo-y-muerde',
        'Diseñado para máxima comodidad',
        'Incluye estuche de viaje',
      ],
    },
    comparison: {
      heading: 'Halo vs. soluciones tradicionales',
      items: [
        { feature: 'Ajuste personalizado', noctip: true, alt1: 'No', alt2: 'No' },
        { feature: 'Materiales grado médico', noctip: true, alt1: 'No', alt2: 'Limitado' },
        { feature: 'Prueba de 30 noches sin riesgo', noctip: true, alt1: 'No', alt2: 'No' },
        { feature: 'Envío y devolución gratis', noctip: true, alt1: 'No', alt2: 'No' },
        { feature: 'Funciona desde la primera noche', noctip: true, alt1: 'Sí', alt2: 'No' },
      ],
    },
    howItWorks: {
      heading: 'Cómo funciona',
      sub: '3 pasos para dormir mejor',
      steps: [
        { num: '01', title: 'Elige tu producto', text: '¿Roncas? ¿Dolor de espalda? ¿Tensión en el cuello? Elige el producto que se adapta a tu problema.' },
        { num: '02', title: 'Mañana en tu puerta', text: 'Enviamos en 24 horas. Envío gratis en Europa. Seguimiento incluido.' },
        { num: '03', title: '30 noches para decidir', text: 'Pruébalo en tu vida real. Si no funciona, te devolvemos cada euro. Sin preguntas.' },
      ],
    },
    whyNoctip: {
      heading: 'Descansar no debería ser un lujo.',
      sub: 'En Noctip creemos que dormir bien, aliviar tensiones y recuperar tu cuerpo no debería ser complicado ni caro.',
      body: 'Creamos Noctip porque vimos a demasiadas personas sufriendo — por ronquidos, dolor de espalda, noches sin descanso — y conformándose con productos que no funcionaban. Así que diseñamos los nuestros. Simples. Efectivos. Hechos con materiales de calidad. Respaldados por garantías reales.',
      motto: 'La recuperación no debería ser complicada. Solo debería funcionar.',
    },
    guarantees: {
      heading: 'Nuestras garantías',
      sub: 'Construidas en confianza, sin letra pequeña',
      items: [
        { icon: RotateCcw, title: '30 noches de prueba', text: 'Prueba cualquier producto durante 30 noches. Si no funciona para ti, gestionamos la devolución y el reembolso completo.' },
        { icon: Truck, title: 'Envío gratis', text: 'Todo pedido se envía gratis dentro de Europa. Procesamos y despachamos en 24 horas.' },
        { icon: ShieldCheck, title: 'Pagos seguros', text: 'Todas las transacciones se procesan a través de Stripe con cifrado SSL de 256 bits.' },
        { icon: Headphones, title: 'Soporte real', text: '¿Tienes una pregunta? Escríbenos y una persona real responde en menos de 24 horas.' },
      ],
    },
    faq: {
      heading: 'Preguntas frecuentes',
      sub: 'Respuestas rápidas antes de comprar',
      items: [
        { q: '¿Cuánto tarda el envío?', a: 'Enviamos todos los pedidos en 24 horas. Entrega estándar: 6-9 días laborables en Europa. Seguimiento incluido.' },
        { q: '¿Qué cubre la garantía de 30 noches?', a: 'Prueba cualquier producto durante 30 noches. Si no cumple tus expectativas, gestionamos la devolución y el reembolso completo.' },
        { q: '¿Cómo funciona la férula anti-ronquidos?', a: 'El Noctip Halo usa avanzamiento mandibular para mover suavemente la mandíbula hacia adelante, abriendo la vía aérea.' },
        { q: '¿El pago es seguro?', a: 'Sí. Pagos procesados por Stripe con cifrado SSL de 256 bits. Nunca almacenamos datos de tarjeta.' },
        { q: '¿Cómo contacto con soporte?', a: 'Escríbenos a support@noctip.com. Una persona real responde en menos de 24 horas.' },
        { q: '¿Qué métodos de pago aceptáis?', a: 'Visa, Mastercard, American Express, PayPal, Apple Pay y Google Pay.' },
      ],
    },
    cta: {
      heading: '¿Listo para dormir mejor?',
      sub: 'Empieza con un producto. Si no funciona, te devolvemos todo.',
      primary: 'Comprar ahora',
      secondary: 'Ver todos los productos',
    },
    mobile: { cta: 'Comprar ahora' },
    reviews: {
      heading: 'Lo que dicen nuestros clientes',
      sub: 'Opiniones reales de personas reales.',
      items: [
        { name: 'María G.', product: 'Noctip Rest', rating: 5, comment: 'Llevo una semana usándola y duermo como nunca. Me pongo un podcast y me quedo dormida en minutos. Lo mejor: no se mueve aunque duermas de lado.', verified: true },
        { name: 'Javier P.', product: 'Noctip Halo', rating: 5, comment: 'Primera noche con ella y no ronqué. Mi mujer no lo podía creer. Llevaba años intentando cosas diferentes.', verified: true },
        { name: 'Laura M.', product: 'Noctip Rest', rating: 5, comment: 'Muy buena calidad de sonido para ser una banda. La tela es suave y no aprieta. La batería me dura toda la noche. Recomendada.', verified: true },
        { name: 'Carlos R.', product: 'Noctip Back', rating: 5, comment: 'Escéptico al principio, pero la diferencia es brutal. La uso 15 minutos al día y en dos semanas se me quitó el dolor de espalda.', verified: true },
      ],
    },
  },
}

type CopyType = typeof COPY.en
function getCopy(locale: string): CopyType { return locale === 'es' ? COPY.es as CopyType : COPY.en }

function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const { add, open: openCart } = useCart()
  const [added, setAdded] = useState(false)
  const copy = getCopy(locale)
  const name = getLocalizedProductName(product, locale)
  const desc = getLocalizedProductShortDescription(product, locale)
  const savings = product.comparePrice > 0 ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    add({ slug: product.slug, name, price: product.price, icon: product.cartIcon })
    trackAddToCart(product.slug, name, product.price)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1219] transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="relative flex aspect-square items-center justify-center overflow-hidden" style={{ background: product.color }}>
          <ProductImage slug={product.slug as any} color={product.color} icon={product.icon} images={product.images} alt={name} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
          {savings > 0 && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
              <span className="rounded-full bg-[#10BFD8]/20 backdrop-blur-md border border-[#10BFD8]/30 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-[#10BFD8] uppercase tracking-wide">
                -{savings}%
              </span>
            </div>
          )}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
              <Badge type={product.badge} locale={locale} />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 sm:gap-2 p-3 sm:p-4">
          <h3 className="text-[13px] sm:text-[15px] font-semibold leading-snug text-[#f2eee7] group-hover:text-[#10BFD8] transition-colors line-clamp-2">{name}</h3>
          <p className="line-clamp-2 text-[11px] sm:text-[13px] leading-4 sm:leading-5 text-[#6b7785]">{desc}</p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-1.5 sm:pt-2">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-[15px] sm:text-[17px] font-bold text-[#f2eee7]">€{product.price}</span>
              {savings > 0 && <span className="text-[10px] sm:text-[12px] text-[#4a5568] line-through">€{product.comparePrice}</span>}
            </div>
            <button onClick={handleAdd} aria-label={`${copy.add} ${name}`}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-[13px] font-bold transition-all duration-200 min-h-[36px] sm:min-h-[44px] active:scale-95 ${
                added ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-[#10BFD8] text-[#080c12] hover:shadow-[0_4px_16px_rgba(16,191,216,0.3)]'
              }`}>
              {added ? (<><Check size={11} />{copy.added}</>) : (<><ShoppingCart size={11} /><span className="hidden sm:inline">{copy.add}</span></>)}
            </button>
          </div>
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

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,191,216,0.08),transparent)]" />
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#b8c4d0] uppercase tracking-wide mb-5 sm:mb-6">
                  {copy.hero.badge}
                </span>
                <h1 className="text-[clamp(2.4rem,8vw,4.2rem)] font-bold leading-[1.0] tracking-[-0.04em] text-[#f6f2eb]">
                  {copy.hero.title1}<br />{copy.hero.title2}
                </h1>
                <p className="mt-5 sm:mt-6 max-w-lg text-[15px] sm:text-[17px] leading-[1.65] sm:leading-[1.7] text-[#8791a1]">{copy.hero.subtitle}</p>
                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href={`/${locale}/shop/all`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 sm:px-10 py-4 sm:py-4.5 text-[15px] sm:text-[16px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] min-h-[52px] sm:min-h-[56px]">
                    {copy.hero.cta} <ArrowRight size={18} strokeWidth={2.5} />
                  </Link>
                  <a href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-4 sm:py-4.5 text-[14px] sm:text-[15px] font-medium text-[#b8c4d0] transition-all duration-300 hover:border-white/25 hover:text-white min-h-[52px] sm:min-h-[56px]">
                    {copy.hero.secondary}
                  </a>
                </div>
                <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4 text-[12px] sm:text-[13px] text-[#5a6678]">
                  <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#10BFD8]" /> {isEs ? 'Envío gratis' : 'Free shipping'}</span>
                  <span className="flex items-center gap-1.5"><RotateCcw size={14} className="text-[#10BFD8]" /> 30 {isEs ? 'noches de prueba' : 'nights trial'}</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#10BFD8]" /> {isEs ? 'Pago seguro' : 'Secure checkout'}</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="block">
                <Link href={`/${locale}/shop/all`} className="group block">
                  <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0d1219] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden">
                      <img src={flagshipImage} alt={getLocalizedProductName(flagship, locale)}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        className="absolute inset-0 h-full w-full object-contain p-8 sm:p-10 transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST BAR ═══ */}
        <section className="border-y border-white/[0.06] bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
              {copy.trust.map((item) => (
                <div key={item.label} className="flex items-center justify-center gap-2.5 sm:gap-3 py-3.5 sm:py-5 px-2 sm:px-4">
                  <div className="flex h-8 sm:h-9 w-8 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.08)]">
                    <item.icon size={14} className="text-[#10BFD8]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-[12px] font-semibold text-[#f2eee7] truncate">{item.label}</div>
                    <div className="text-[10px] sm:text-[11px] text-[#5a6678] truncate">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRODUCTS ═══ */}
        <section id="products" className="py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[clamp(1.4rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.products.heading}</h2>
              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-[#6b7785]">{copy.products.sub}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {CATALOG.map((product) => (
                <ProductCard key={product.slug} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROBLEMS WE SOLVE ═══ */}
        <section className="py-14 sm:py-24 lg:py-28 bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-4">
                {isEs ? '¿Te suena?' : 'Sound familiar?'}
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.problems.heading}</h2>
              <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-[14px] sm:text-[16px] text-[#6b7785] leading-relaxed">{copy.problems.sub}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {copy.problems.items.map((problem, idx) => (
                <motion.div key={problem.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.12, duration: 0.5 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#111720] p-6 sm:p-8 text-center transition-all duration-300 hover:border-[#10BFD8]/20 hover:shadow-[0_8px_40px_rgba(16,191,216,0.08)]">
                  <div className="mx-auto mb-4 sm:mb-5 flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-2xl bg-[#10BFD8]/10 transition-colors duration-300 group-hover:bg-[#10BFD8]/15">
                    <problem.icon size={24} className="text-[#10BFD8]" />
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#f2eee7] mb-2">{problem.title}</h3>
                  <p className="text-[13px] sm:text-[14px] leading-[1.7] text-[#8791a1]">{problem.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section id="how-it-works" className="py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-4">
                {isEs ? 'Simple' : 'Simple'}
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.howItWorks.heading}</h2>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] text-[#6b7785]">{copy.howItWorks.sub}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative">
              {copy.howItWorks.steps.map((step, idx) => (
                <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.12, duration: 0.5 }}
                  className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-6 sm:p-8 text-center relative">
                  {idx < 2 && (
                    <div className="hidden sm:flex absolute top-1/2 -right-3 z-10 h-6 w-6 items-center justify-center">
                      <ChevronRight size={18} className="text-[#10BFD8]/40" />
                    </div>
                  )}
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#10BFD8]/10 text-[18px] font-bold text-[#10BFD8] mb-4">{step.num}</span>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#f2eee7] mb-2">{step.title}</h3>
                  <p className="text-[13px] sm:text-[14px] leading-[1.7] text-[#8791a1]">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY NOCTIP ═══ */}
        <section className="py-16 sm:py-28 lg:py-32 bg-[#0d1219]">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[#f6f2eb] leading-[1.1]">{copy.whyNoctip.heading}</h2>
              <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-[1.7] text-[#8791a1] max-w-xl mx-auto">{copy.whyNoctip.sub}</p>
              <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
                <p className="text-[14px] sm:text-[16px] leading-[1.8] text-[#b8c4d0]">{copy.whyNoctip.body}</p>
              </div>
              <div className="mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3">
                <span className="text-[#10BFD8] text-lg">✦</span>
                <span className="text-[14px] sm:text-[15px] font-medium text-[#c8d4e2] italic">&ldquo;{copy.whyNoctip.motto}&rdquo;</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ BESTSELLER ═══ */}
        <section className="py-16 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 border border-amber-400/20 px-3 py-1 text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wide mb-5">
                  <Sparkles size={12} />
                  {copy.bestseller.badge}
                </span>
                <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[#f6f2eb] leading-[1.1]">{copy.bestseller.heading}</h2>
                <p className="mt-4 sm:mt-5 text-[14px] sm:text-[16px] leading-[1.7] text-[#8791a1]">{copy.bestseller.sub}</p>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-[28px] sm:text-[32px] font-bold text-[#f2eee7]">{copy.bestseller.price}</span>
                  <span className="text-[15px] sm:text-[17px] text-[#4a5568] line-through">{copy.bestseller.comparePrice}</span>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">{copy.bestseller.savings}</span>
                </div>
                <ul className="mt-6 sm:mt-7 space-y-2.5">
                  {copy.bestseller.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px] sm:text-[14px] text-[#c8d4e2]">
                      <Check size={15} className="text-[#10BFD8] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/products/halo`}
                  className="mt-7 sm:mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 sm:px-10 py-4 sm:py-4.5 text-[15px] sm:text-[16px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] min-h-[52px] sm:min-h-[56px]">
                  {copy.bestseller.cta} <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0d1219] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={flagshipImage} alt={getLocalizedProductName(flagship, locale)}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      className="absolute inset-0 h-full w-full object-contain p-8 sm:p-12 transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Comparison table */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-16 sm:mt-20 max-w-2xl mx-auto">
              <h3 className="text-center text-[15px] sm:text-[17px] font-bold text-[#f2eee7] mb-6">{copy.comparison.heading}</h3>
              <div className="rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden">
                <div className="grid grid-cols-4 gap-0 text-[11px] sm:text-[12px] font-bold uppercase tracking-wide">
                  <div className="px-4 py-3 text-left text-[#5a6678]">{isEs ? 'Característica' : 'Feature'}</div>
                  <div className="px-3 py-3 text-center text-[#10BFD8]">Noctip</div>
                  <div className="px-3 py-3 text-center text-[#5a6678]">{isEs ? 'Alternativa A' : 'Option A'}</div>
                  <div className="px-3 py-3 text-center text-[#5a6678]">{isEs ? 'Alternativa B' : 'Option B'}</div>
                </div>
                {copy.comparison.items.map((row, i) => (
                  <div key={row.feature} className={`grid grid-cols-4 gap-0 text-[12px] sm:text-[13px] ${i < copy.comparison.items.length - 1 ? 'border-t border-white/[0.04]' : ''}`}>
                    <div className="px-4 py-3 text-left text-[#b8c4d0]">{row.feature}</div>
                    <div className="px-3 py-3 text-center">
                      <Check size={14} className="mx-auto text-[#10BFD8]" />
                    </div>
                    <div className="px-3 py-3 text-center text-[#4a5568]">{row.alt1}</div>
                    <div className="px-3 py-3 text-center text-[#4a5568]">{row.alt2}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ GUARANTEES ═══ */}
        <section className="py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-4">
                {isEs ? 'Confianza' : 'Trust'}
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.guarantees.heading}</h2>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] text-[#6b7785]">{copy.guarantees.sub}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {copy.guarantees.items.map((item, idx) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#0d1219] p-6 sm:p-8 transition-all duration-300 hover:border-[#10BFD8]/20">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/10 transition-colors duration-300 group-hover:bg-[#10BFD8]/15">
                      <item.icon size={20} className="text-[#10BFD8]" />
                    </div>
                    <div>
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#f2eee7] mb-1.5">{item.title}</h3>
                      <p className="text-[13px] sm:text-[14px] leading-[1.7] text-[#8791a1]">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CUSTOMER REVIEWS ═══ */}
        <section className="py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-4">
                {isEs ? 'Opiniones reales' : 'Real reviews'}
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.reviews.heading}</h2>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] text-[#6b7785]">{copy.reviews.sub}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {copy.reviews.items.map((review, idx) => (
                <motion.div key={review.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5 sm:p-6 transition-all duration-300 hover:border-[#10BFD8]/20">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} className={star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-[#2a3448]'} />
                    ))}
                    {review.verified && (
                      <span className="ml-1 text-[9px] font-bold uppercase tracking-wider text-[#10BFD8]">
                        ✓ {isEs ? 'Verificada' : 'Verified'}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[#c8d0da] mb-4">&ldquo;{review.comment}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[13px] font-semibold text-[#f2eee7]">{review.name}</span>
                      <span className="block text-[11px] text-[#6b7785]">{review.product}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CUSTOMER VIDEOS ═══ */}
        <CustomerVideos />

        {/* ═══ TRUSTPILOT REVIEWS ═══ */}
        <TrustpilotReviews />

        {/* ═══ BLOG SECTION ═══ */}
        <BlogSection />

        {/* ═══ PRODUCT QUIZ ═══ */}
        <ProductQuiz />

        {/* ═══ FAQ ═══ */}
        <section className="py-14 sm:py-24 lg:py-28 bg-[#0d1219]">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14">
              <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.faq.heading}</h2>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] text-[#6b7785]">{copy.faq.sub}</p>
            </motion.div>
            <FAQ items={copy.faq.items} />
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.cta.heading}</h2>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] text-[#6b7785]">{copy.cta.sub}</p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <Link href={`/${locale}/shop/all`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10BFD8] px-9 py-4.5 text-[16px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(16,191,216,0.35)] min-h-[56px]">
                  {copy.cta.primary} <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
                <Link href={`/${locale}/shop/all?sort=rating`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/15 px-8 py-4.5 text-[15px] font-semibold text-[#f2eee7] transition-all duration-300 hover:border-[#10BFD8]/40 hover:text-[#10BFD8] hover:bg-[#10BFD8]/5 min-h-[56px]">
                  {copy.cta.secondary}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Mobile sticky CTA ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.97)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden transition-transform duration-300 ${isCartOpen ? 'translate-y-full' : ''}`}>
        <div className="flex items-center gap-2.5">
          <button onClick={openCart}
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-[#8791a1]"
            aria-label="Open cart">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10BFD8] text-[10px] font-bold text-[#080c12]">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <Link href={`/${locale}/shop/all`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#10BFD8] py-3.5 text-[15px] font-bold text-[#080c12] min-h-[52px] shadow-[0_4px_20px_rgba(16,191,216,0.3)]">
            {copy.mobile.cta} — {copy.hero.price}
          </Link>
        </div>
      </div>
    </div>
  )
}
