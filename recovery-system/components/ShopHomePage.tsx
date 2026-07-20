'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ShoppingCart, Check, ChevronRight,
  Shield, Truck, RotateCcw,
  ArrowRight,
  CreditCard, Headphones, Moon, Zap, Heart,
  Sparkles, ShieldCheck,
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
import { trackAddToCart } from './GoogleAnalytics'

const COPY = {
  en: {
    add: 'Add',
    added: 'Added',
    hero: {
      badge: 'Free shipping across Europe',
      title1: 'Sleep better.',
      title2: 'Wake up restored.',
      subtitle: 'Sleep and recovery products that actually work, designed for people who can\'t afford to sleep badly.',
      cta: 'Shop now',
      secondary: 'View all products',
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
      heading: 'Why Noctip?',
      sub: 'We\'re not the cheapest. We\'re the ones that work.',
      items: [
        { icon: ShieldCheck, title: 'Medical grade', text: 'Medical-grade silicone, hypoallergenic, safe for nightly use.' },
        { icon: RotateCcw, title: '30 nights risk-free', text: 'Try it in your real environment. Full refund if it doesn\'t work.' },
        { icon: Truck, title: 'Ships in 24h', text: 'We ship within 24 hours. Delivery in 6-9 days with tracking.' },
        { icon: Shield, title: '100% secure', text: '256-bit SSL encryption. Stripe. We never store card data.' },
        { icon: Headphones, title: 'Human support', text: 'A real person responds within 24 hours. No bots.' },
        { icon: CreditCard, title: 'Flexible payment', text: 'Visa, Mastercard, Amex, PayPal, Apple Pay, and Google Pay.' },
      ],
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
  },
  es: {
    add: 'Añadir',
    added: 'Añadido',
    hero: {
      badge: 'Envío gratis en toda Europa',
      title1: 'Duerme mejor.',
      title2: 'Despierta renovado.',
      subtitle: 'Productos de sueño y recuperación que funcionan de verdad, diseñados para personas que no pueden permitirse dormir mal.',
      cta: 'Comprar ahora',
      secondary: 'Ver todos los productos',
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
      heading: '¿Por qué Noctip?',
      sub: 'No somos los más baratos. Somos los que funcionan.',
      items: [
        { icon: ShieldCheck, title: 'Grado médico', text: 'Silicona de grado médico, hipoalergénica, segura para uso nocturno.' },
        { icon: RotateCcw, title: '30 noches sin riesgo', text: 'Prueba el producto en tu entorno real. Si no funciona, reembolso completo.' },
        { icon: Truck, title: 'Envío en 24h', text: 'Procesamos y enviamos en 24 horas. Entrega en 6-9 días con seguimiento.' },
        { icon: Shield, title: 'Pago 100% seguro', text: 'Cifrado SSL de 256 bits. Stripe. Nunca almacenamos datos de tarjeta.' },
        { icon: Headphones, title: 'Soporte humano', text: 'Una persona real responde en menos de 24 horas. Sin bots.' },
        { icon: CreditCard, title: 'Flexibilidad de pago', text: 'Visa, Mastercard, Amex, PayPal, Apple Pay y Google Pay.' },
      ],
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
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 sm:py-20 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-4 sm:mb-5">
                  <Sparkles size={12} />
                  {copy.hero.badge}
                </span>
                <h1 className="text-[clamp(2.2rem,8vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#f6f2eb]">
                  {copy.hero.title1}<br />{copy.hero.title2}
                </h1>
                <p className="mt-4 sm:mt-5 max-w-md text-[15px] sm:text-[16px] leading-[1.65] sm:leading-[1.7] text-[#8791a1]">{copy.hero.subtitle}</p>
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link href={`/${locale}/products/${flagship.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10BFD8] px-8 sm:px-9 py-4 sm:py-4.5 text-[15px] sm:text-[16px] font-bold text-[#080c12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(16,191,216,0.35)] min-h-[52px] sm:min-h-[56px]">
                    {copy.hero.cta} <ArrowRight size={18} strokeWidth={2.5} />
                  </Link>
                  <a href="#products"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/15 px-7 py-4 sm:py-4.5 text-[14px] sm:text-[15px] font-semibold text-[#f2eee7] transition-all duration-300 hover:border-[#10BFD8]/40 hover:text-[#10BFD8] hover:bg-[#10BFD8]/5 min-h-[52px] sm:min-h-[56px]">
                    {copy.hero.secondary}
                  </a>
                </div>
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 text-[12px] sm:text-[13px] text-[#5a6678]">
                  <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#10BFD8]" /> {isEs ? 'Envío gratis' : 'Free shipping'}</span>
                  <span className="flex items-center gap-1.5"><RotateCcw size={14} className="text-[#10BFD8]" /> 30 {isEs ? 'noches' : 'nights'}</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#10BFD8]" /> {isEs ? 'Pago seguro' : 'Secure'}</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="block">
                <Link href={`/${locale}/products/${flagship.slug}`} className="group block">
                  <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0d1219] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden">
                      <img src={flagshipImage} alt={getLocalizedProductName(flagship, locale)}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        className="absolute inset-0 h-full w-full object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-[1.03]" />
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
        <section className="py-14 sm:py-24 lg:py-28">
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
        <section className="py-14 sm:py-24 lg:py-28 bg-[#0d1219]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-4">
                {isEs ? 'La diferencia' : 'The difference'}
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.whyNoctip.heading}</h2>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] text-[#6b7785]">{copy.whyNoctip.sub}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {copy.whyNoctip.items.map((item, idx) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[#111720] p-5 sm:p-6 transition-all duration-300 hover:border-[#10BFD8]/20">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/10 transition-colors duration-300 group-hover:bg-[#10BFD8]/15">
                    <item.icon size={19} className="text-[#10BFD8]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#f2eee7] mb-1">{item.title}</h3>
                    <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[#8791a1]">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
          <Link href={`/${locale}/products/${flagship.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#10BFD8] py-3.5 text-[15px] font-bold text-[#080c12] min-h-[52px] shadow-[0_4px_20px_rgba(16,191,216,0.3)]">
            {copy.mobile.cta} — {copy.hero.price}
          </Link>
        </div>
      </div>
    </div>
  )
}
