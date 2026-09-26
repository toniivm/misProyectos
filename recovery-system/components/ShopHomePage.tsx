'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  Truck, RotateCcw, ShieldCheck, ShoppingCart, Check, Star,
  Moon, VolumeX, HeartPulse, PersonStanding, Sparkles, ArrowRight,
  BedDouble, Headphones, Shield, Clock, Package, Award,
  ChevronRight, Quote
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CATALOG, CATEGORIES, getLocalizedProductName, getLocalizedCategoryName, getProductsByCategory, type CatalogProduct } from '../lib/catalog'
import ProductQuiz from './ProductQuiz'
import Header from './Header'

const EASE = [0.22, 1, 0.36, 1] as const

// ── COPY ──────────────────────────────────────────────────────────────────
const COPY = {
  en: {
    hero: {
      eyebrow: 'SLEEP & RECOVERY SYSTEM · 30-NIGHT TRIAL · EU SHIPPING',
      titleLine1: 'Sleep better.',
      titleLine2: 'Recover your body.',
      titleLine3: 'Repeat.',
      subtitle: 'Noctip curates simple tools that work from night one. No pills. No bulky machines. Just the nightly ritual your body has been waiting for.',
      cta: 'Find my solution in 30s',
      ctaSecondary: 'See all products',
      micro: '5–10 day tracked delivery · 30-night trial · Stripe checkout',
    },
    trust: [
      { icon: Truck, label: 'Tracked delivery', sub: '5–10 days · EU warehouse' },
      { icon: RotateCcw, label: '30-night trial', sub: 'Full refund — no questions' },
      { icon: ShieldCheck, label: 'Secure payment', sub: 'Stripe · 256-bit SSL' },
      { icon: HeartPulse, label: 'Real support', sub: 'hola@noctip.com' },
    ],
    problems: {
      eyebrow: 'START WITH YOUR PROBLEM',
      heading: 'What do you want to fix?',
      sub: 'Pick the friction you feel. We match it to the right tool — one problem, one product that solves it well.',
      cards: [
        { id: 'sleep', icon: Moon, label: 'Sleep deeper', desc: 'Fall asleep faster without pills or screens', href: 'sleep-headband', accent: 'bg-[#10BFD8]/10 text-[#10BFD8] border-[#10BFD8]/20' },
        { id: 'snore', icon: VolumeX, label: 'Stop snoring', desc: 'Quiet nights for you and your partner', href: 'halo', accent: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
        { id: 'neck', icon: HeartPulse, label: 'Release neck tension', desc: '15 min to feel your shoulders drop', href: 'neck-massager', accent: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
        { id: 'posture', icon: PersonStanding, label: 'Fix posture', desc: 'Stand taller after 2 weeks · 15 min/day', href: 'wave', accent: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
      ] as const,
    },
    solutions: {
      eyebrow: 'PROBLEM → SOLUTION',
      heading: 'Four tools. Each solves one thing well.',
      sub: 'No wellness fluff. No “all-in-one.” Just focused tools you’ll actually use.',
      viewAll: 'View all →',
    },
    heroProduct: {
      badge: 'HERO RITUAL · MOST CHOSEN',
      heading: 'Your night ritual starts here.',
      sub: 'Noctip Rest — 45g you don’t feel. No pressure on ears. Perfect for side sleepers. Washable. 10h battery.',
      bullets: ['No ear pressure — sleep on your side', 'Speakers pop out → machine washable', '10h battery — lasts the whole night', 'Bluetooth 5.0 — phone stays on nightstand'],
      cta: 'Get Rest — 30-night trial',
      priceNote: '30-night trial · Free shipping · Stripe',
    },
    how: {
      eyebrow: 'HOW IT WORKS',
      heading: 'So simple you’ll forget you’re wearing it.',
      steps: [
        { n: '01', title: 'Place it', desc: 'Put it on. No apps. No setup. It just fits.', detail: 'Elastic one-size · 45g' },
        { n: '02', title: 'Use it', desc: 'Play your podcast, music or white noise. Drift off.', detail: 'Bluetooth 5.0 · Until you sleep' },
        { n: '03', title: 'Forget it', desc: 'Washable, 10h battery. Your night ritual, every night.', detail: 'Speakers out → machine wash' },
      ] as const,
    },
    brand: {
      eyebrow: 'NOCTIP WORLD',
      heading: 'A system, not a product.',
      body: 'Sleep and recovery aren’t separate. Noctip is your evening system: quiet nights, relaxed neck, straight back. Pick the piece you need — then complete your ritual.',
      stats: [
        { k: '45g', v: 'feather-light' },
        { k: '10h', v: 'all night' },
        { k: '30', v: 'night trial' },
      ] as const,
    },
    guarantee: {
      eyebrow: 'RISK-FREE',
      heading: 'Try it 30 nights. Keep it only if you sleep better.',
      body: 'Use it in your real bedroom, your real life. If your nights aren’t quieter — or your neck and back don’t feel it — we pick it up and refund every euro. No forms. No hassle.',
      steps: ['You try it 30 nights', 'You decide', 'We refund 100% if it’s not for you'],
      cta: 'Shop with guarantee',
    },
    cross: {
      heading: 'Complete your ritual',
      sub: 'People who sleep with Rest often pair it with Cervical for a full wind-down system. No hard sell — just a system that works together.',
      bundles: [
        { title: 'Sleep Pack', desc: 'Rest + Halo · Quiet night, calm mind', slugs: ['sleep-headband', 'halo'] },
        { title: 'Recovery Pack', desc: 'Back + Cervical · Straight back, loose neck', slugs: ['wave', 'neck-massager'] },
        { title: 'Full Ritual', desc: 'All 4 · Your complete evening system', slugs: ['sleep-headband', 'halo', 'wave', 'neck-massager'] },
      ] as const,
    },
    collection: { heading: 'Shop by need', sub: 'Two collections. Four focused tools.' },
    why: {
      heading: 'WHY NOCTIP?',
      body: 'We don’t sell “wellness”. We sell quiet nights, necks that don’t crack and backs that don’t ache after 8h at a desk. If it doesn’t help from night one, we don’t sell it.',
      motto: 'One problem, one product that actually fixes it.',
    },
    mobile: { cta: 'Find my fix' },
  },
  es: {
    hero: {
      eyebrow: 'SISTEMA DE SUEÑO & RECUPERACIÓN · 30 NOCHES DE PRUEBA · ENVÍO UE',
      titleLine1: 'Duerme mejor.',
      titleLine2: 'Recupera tu cuerpo.',
      titleLine3: 'Repite.',
      subtitle: 'Noctip selecciona herramientas sencillas que funcionan desde la primera noche. Sin pastillas. Sin aparatos enormes. Solo el ritual que tu cuerpo estaba esperando.',
      cta: 'Encuentra mi solución en 30s',
      ctaSecondary: 'Ver productos',
      micro: 'Entrega 5–10 días con seguimiento · 30 noches de prueba · Pago Stripe',
    },
    trust: [
      { icon: Truck, label: 'Entrega con seguimiento', sub: '5–10 días · almacén UE' },
      { icon: RotateCcw, label: '30 noches de prueba', sub: 'Reembolso total — sin preguntas' },
      { icon: ShieldCheck, label: 'Pago seguro', sub: 'Stripe · SSL 256 bits' },
      { icon: HeartPulse, label: 'Atención real', sub: 'hola@noctip.com' },
    ],
    problems: {
      eyebrow: 'EMPIEZA POR TU PROBLEMA',
      heading: '¿Qué quieres mejorar?',
      sub: 'Elige la fricción que sientes. Nosotros la conectamos con la herramienta correcta — un problema, un producto que lo resuelve bien.',
      cards: [
        { id: 'sleep', icon: Moon, label: 'Dormir mejor', desc: 'Duerme más rápido sin pastillas ni pantallas', href: 'sleep-headband', accent: 'bg-[#10BFD8]/10 text-[#10BFD8] border-[#10BFD8]/20' },
        { id: 'snore', icon: VolumeX, label: 'Dejar de roncar', desc: 'Noches silenciosas para ti y tu pareja', href: 'halo', accent: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
        { id: 'neck', icon: HeartPulse, label: 'Soltar el cuello', desc: '15 min para notar los hombros ligeros', href: 'neck-massager', accent: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
        { id: 'posture', icon: PersonStanding, label: 'Corregir postura', desc: 'Ve erguido en 2 semanas · 15 min/día', href: 'wave', accent: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
      ] as const,
    },
    solutions: {
      eyebrow: 'PROBLEMA → SOLUCIÓN',
      heading: 'Cuatro herramientas. Cada una resuelve una cosa bien.',
      sub: 'Sin humo de “bienestar”. Sin “todo en uno”. Solo herramientas enfocadas que realmente usarás.',
      viewAll: 'Ver todo →',
    },
    heroProduct: {
      badge: 'RITUAL HÉROE · EL MÁS ELEGIDO',
      heading: 'Tu ritual de noche empieza aquí.',
      sub: 'Noctip Rest — 45g que no sientes. Sin presión en las orejas. Ideal de lado. Lavable. 10h de batería.',
      bullets: ['Sin presión — duerme de lado', 'Altavoces salen → lavable a máquina', '10h batería — toda la noche', 'Bluetooth 5.0 — móvil en la mesita'],
      cta: 'Quiero Rest — 30 noches',
      priceNote: '30 noches de prueba · Envío gratis · Stripe',
    },
    how: {
      eyebrow: 'CÓMO FUNCIONA',
      heading: 'Tan sencillo que te olvidarás de que lo llevas.',
      steps: [
        { n: '01', title: 'Lo colocas', desc: 'Te lo pones. Sin apps. Sin configurar. Encaja solo.', detail: 'Talla única elástica · 45g' },
        { n: '02', title: 'Lo usas', desc: 'Pon tu podcast, música o ruido blanco. Y déjate ir.', detail: 'Bluetooth 5.0 · Hasta que te duermes' },
        { n: '03', title: 'Te olvidas', desc: 'Lavable, 10h. Tu ritual de noche, cada noche.', detail: 'Altavoces fuera → a la lavadora' },
      ] as const,
    },
    brand: {
      eyebrow: 'MUNDO NOCTIP',
      heading: 'Un sistema, no un producto.',
      body: 'Sueño y recuperación no van separados. Noctip es tu sistema de noche: noches silenciosas, cuello suelto, espalda recta. Elige la pieza que necesitas — y completa tu ritual.',
      stats: [
        { k: '45g', v: 'ultraligero' },
        { k: '10h', v: 'toda la noche' },
        { k: '30', v: 'noches de prueba' },
      ] as const,
    },
    guarantee: {
      eyebrow: 'SIN RIESGO',
      heading: 'Pruébalo 30 noches. Quédate solo si duermes mejor.',
      body: 'Úsalo en tu habitación real, tu vida real. Si tus noches no son más silenciosas — o tu cuello y espalda no lo notan — lo recogemos y te devolvemos cada euro. Sin formularios. Sin líos.',
      steps: ['Lo pruebas 30 noches', 'Tú decides', 'Te devolvemos el 100% si no te convence'],
      cta: 'Comprar con garantía',
    },
    cross: {
      heading: 'Completa tu ritual',
      sub: 'Quien duerme con Rest suele combinarlo con Cervical para un sistema completo de desconexión. Sin venta agresiva — solo un sistema que funciona junto.',
      bundles: [
        { title: 'Pack Sueño', desc: 'Rest + Halo · Noche silenciosa, mente calmada', slugs: ['sleep-headband', 'halo'] },
        { title: 'Pack Recuperación', desc: 'Back + Cervical · Espalda recta, cuello suelto', slugs: ['wave', 'neck-massager'] },
        { title: 'Ritual Completo', desc: 'Los 4 · Tu sistema de tarde-noche', slugs: ['sleep-headband', 'halo', 'wave', 'neck-massager'] },
      ] as const,
    },
    collection: { heading: 'Compra por necesidad', sub: 'Dos colecciones. Cuatro herramientas enfocadas.' },
    why: {
      heading: '¿POR QUÉ NOCTIP?',
      body: 'No vendemos “bienestar”. Vendemos noches sin roncar, cuellos que no crujen y espaldas que no duelen tras 8h sentado. Si no se nota desde la primera noche, no lo vendemos.',
      motto: 'Un problema, un producto que lo soluciona.',
    },
    mobile: { cta: 'Mi solución' },
  }
}

type CopyType = typeof COPY.en
function getCopy(locale: string): CopyType { return locale === 'es' ? COPY.es as unknown as CopyType : COPY.en }

// ── Helpers ───────────────────────────────────────────────────────────────
const SOLUTION_COPY: Record<string, { problem: { es: string; en: string }; benefit: { es: string; en: string } }> = {
  'sleep-headband': {
    problem: { es: '¿No soportas dormir con auriculares?', en: 'Can’t stand sleeping with earbuds?' },
    benefit: { es: 'Audio nocturno sin presión en las orejas', en: 'Night audio with zero ear pressure' },
  },
  halo: {
    problem: { es: '¿Roncas o tu pareja no duerme?', en: 'Snoring keeping you apart?' },
    benefit: { es: 'Silencio desde la 1ª noche — vía aérea abierta', en: 'Silence from night one — airway open' },
  },
  wave: {
    problem: { es: '¿Espalda cargada tras 8h sentado?', en: 'Back aching after 8h at your desk?' },
    benefit: { es: 'Ve erguido en 15 min/día — invisible bajo la ropa', en: 'Stand taller in 15 min/day — invisible under clothes' },
  },
  'neck-massager': {
    problem: { es: '¿Nuca piedra a las 7pm?', en: 'Neck like stone at 7pm?' },
    benefit: { es: 'Suelta en 15 min — calor + masaje sin cables', en: 'Loose in 15 min — heat + cordless massage' },
  },
}

// ──────────────────────────────────────────────────────────────────────
//  Premium Product Card — PROBLEM → SOLUTION
// ──────────────────────────────────────────────────────────────────────
function SolutionCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const isEs = locale === 'es'
  const name = getLocalizedProductName(product, locale)
  const copy = SOLUTION_COPY[product.slug]
  const savings = product.comparePrice > 0 ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0
  const img = product.images?.[0]

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d1219] transition-all duration-500 hover:border-white/[0.14] hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] hover:-translate-y-1"
      >
        {/* Image — light platform for premium pop */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f0eb] flex items-center justify-center p-6 sm:p-7">
          {/* subtle grain */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 30% 20%, #0a0a0a 1px, transparent 1px)`, backgroundSize: '18px 18px' }} />
          {img ? (
            <img
              src={img}
              alt={name}
              loading="lazy"
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              className="relative z-10 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <span className="text-3xl opacity-20">{product.icon || '◆'}</span>
          )}
          {/* discount pill */}
          <div className="absolute right-3 top-3 z-20 rounded-full bg-[#0c1016] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
            -{savings}%
          </div>
          {/* category micro */}
          <div className="absolute left-3 top-3 z-20 rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a] backdrop-blur">
            {product.category === 'sleep-audio' ? (isEs ? 'Sueño' : 'Sleep') : (isEs ? 'Recuperación' : 'Recovery')}
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#10BFD8]">
            {copy ? (isEs ? copy.problem.es : copy.problem.en) : '—'}
          </p>
          <h3 className="mt-1.5 text-[18px] font-bold tracking-[-0.03em] text-[#f6f2eb] group-hover:text-white transition-colors">
            {name}
          </h3>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-[#8791a1]">
            {copy ? (isEs ? copy.benefit.es : copy.benefit.en) : ''}
          </p>

          <div className="mt-auto pt-4 flex items-end justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[18px] font-bold text-[#f2eee7]">€{product.price.toFixed(2)}</span>
                <span className="text-[12px] text-[#4a5568] line-through">€{product.comparePrice.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-[11px] text-[#5a6678]">{isEs ? '30 noches · Envío gratis' : '30 nights · Free shipping'}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[#080c12] shadow-sm transition group-hover:bg-[#f2eee7] shrink-0">
              {isEs ? 'Ver' : 'View'} <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// ──────────────────────────────────────────────────────────────────────
export default function ShopHomePage() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const copy = getCopy(locale)
  const { open: openCart, totalItems, isOpen: isCartOpen } = useCart()
  const flagship = CATALOG.find(p => p.slug === 'sleep-headband') ?? CATALOG[0]
  const flagshipImg = flagship.images?.[0] ?? '/images/sleep-headband-1.webp'
  // lifestyle for hero visual — use rest lifestyle if exists, else flagship
  const heroLifestyle = '/images/rest/lifestyle/1.png'
  const heroLifestyle2 = '/images/rest/lifestyle/2.png'

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      <Header />
      <main className="pb-24 sm:pb-0">

        {/* ═══ 1. HERO — RESULTADO ═══ */}
        <section className="relative overflow-hidden">
          {/* soft glow behind hero */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#10BFD8]/[0.06] blur-[80px]" />
            <div className="absolute top-20 right-[-80px] h-[400px] w-[400px] rounded-full bg-violet-500/[0.05] blur-[60px] hidden lg:block" />
          </div>

          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
              {/* Visual — on mobile, show first */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  {/* main lifestyle card */}
                  <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0d1219] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
                    {/* bedroom ambience — using lifestyle image as background */}
                    <div className="relative aspect-[4/3.4] lg:aspect-[4/3.2] overflow-hidden bg-[#0c1016]">
                      <img
                        src={heroLifestyle}
                        alt="Noctip lifestyle — persona durmiendo"
                        width={720} height={540}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      {/* fallback gradient if image fails */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c12] via-[#080c12]/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#10BFD8]/10 via-transparent to-violet-500/10 mix-blend-soft-light" />
                      {/* night bedroom glow dots */}
                      <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-amber-300/60 blur-[0.5px] shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                      <div className="absolute top-10 right-12 h-1 w-1 rounded-full bg-white/40" />

                      {/* floating product card — premium */}
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:w-[72%]">
                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.96] p-3 sm:p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.3)] backdrop-blur">
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-[#f5f0eb] border border-black/[0.06] overflow-hidden">
                            <img src={flagshipImg} alt={flagship.name} className="h-full w-full object-contain p-1" loading="eager" decoding="async" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#10BFD8]">Noctip Rest</div>
                            <div className="text-[13px] font-semibold leading-tight text-[#1a1a1a] truncate">{isEs ? '45g · Sin presión · 10h' : '45g · No pressure · 10h'}</div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[13px] font-bold text-[#1a1a1a]">€{flagship.price.toFixed(2)}</span>
                              <span className="text-[11px] text-[#6b7785] line-through">€{flagship.comparePrice.toFixed(2)}</span>
                            </div>
                          </div>
                          <Link href={`/${locale}/products/sleep-headband`} className="hidden sm:inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-white hover:bg-black transition">
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>

                      {/* top badge */}
                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white">{isEs ? 'Ritual de noche' : 'Night ritual'}</span>
                      </div>
                    </div>
                  </div>

                  {/* small accent card behind */}
                  <div className="pointer-events-none absolute -right-2 -top-2 hidden h-[40%] w-[28%] rounded-2xl border border-white/[0.06] bg-[#111720] lg:block overflow-hidden opacity-60">
                    <img src={heroLifestyle2} alt="" className="h-full w-full object-cover opacity-50" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                  </div>
                  {/* honest badge — no fake rating */}
                  <div className="absolute -bottom-3 -right-2 sm:bottom-2 sm:-right-3 hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0d1219] px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10BFD8] text-white border border-white/10">
                      <Check size={12} />
                    </div>
                    <span className="text-[11px] font-semibold text-[#c8d0da]">{isEs ? '30 noches de prueba' : '30-night trial'}</span>
                  </div>
                </div>
                <p className="mt-3 text-center text-[11px] text-[#5a6678] hidden sm:block">{isEs ? 'Escena lifestyle · Producto real, entorno premium' : 'Lifestyle scene · Real product, premium environment'}</p>
              </motion.div>

              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#10BFD8]/20 bg-[#10BFD8]/10 px-3 py-1.5">
                  <Sparkles size={12} className="text-[#10BFD8]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#10BFD8]">{copy.hero.eyebrow}</span>
                </div>

                <h1 className="mt-4 text-[clamp(2.2rem,7vw,3.8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[#f6f2eb]">
                  {copy.hero.titleLine1}<br />
                  {copy.hero.titleLine2}<br />
                  <span className="text-[#10BFD8]">{copy.hero.titleLine3}</span>
                </h1>

                <p className="mt-4 max-w-[560px] text-[15px] sm:text-[16px] leading-[1.7] text-[#9aa7b9]">
                  {copy.hero.subtitle}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#quiz"
                    onClick={(e) => { e.preventDefault(); document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-bold text-[#080c12] shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:bg-[#f2eee7] hover:-translate-y-0.5 transition-all min-h-[48px]"
                  >
                    {copy.hero.cta} <ArrowRight size={14} />
                  </a>
                  <Link
                    href={`/${locale}/shop/all`}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[14px] font-semibold text-[#c8d0da] hover:bg-white hover:text-[#080c12] hover:border-white transition-all min-h-[48px]"
                  >
                    {copy.hero.ctaSecondary}
                  </Link>
                </div>

                <p className="mt-4 text-[12px] text-[#6b7785] flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20"><Check size={10} className="text-emerald-400" /></span>
                  {copy.hero.micro}
                </p>

                {/* mini social proof — honest, no fake numbers */}
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 w-fit">
                  <div className="flex -space-x-1.5">
                    <span className="h-7 w-7 rounded-full bg-[#1a1a1a] border-2 border-[#080c12] flex items-center justify-center text-[11px]">🌙</span>
                    <span className="h-7 w-7 rounded-full bg-[#10BFD8] border-2 border-[#080c12] flex items-center justify-center text-[10px] font-bold text-white">✓</span>
                    <span className="h-7 w-7 rounded-full bg-[#f5f0eb] border-2 border-[#080c12] flex items-center justify-center text-[11px]">💆</span>
                  </div>
                  <span className="text-[12px] text-[#8791a1]">{isEs ? 'Sistema de 4 herramientas · Elige por problema' : '4-tool system · Choose by problem'}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 2. TRUST BAR — dark premium ═══ */}
        <section className="border-y border-white/[0.06] bg-[#0d1219]/60 backdrop-blur">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
              {copy.trust.map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-4 sm:py-5 px-3 sm:px-4">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <item.icon size={16} className="text-[#10BFD8]" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] sm:text-[13px] font-semibold text-[#f2eee7] leading-tight">{item.label}</div>
                    <div className="text-[11px] text-[#6b7785] leading-tight">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 3. PROBLEMAS ═══ */}
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }} className="max-w-3xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#10BFD8]">{copy.problems.eyebrow}</span>
              <h2 className="mt-2 text-[clamp(1.5rem,4vw,2.2rem)] font-bold tracking-[-0.03em] text-[#f6f2eb] leading-[1.05]">{copy.problems.heading}</h2>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-[#8791a1]">{copy.problems.sub}</p>
            </motion.div>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {copy.problems.cards.map((card, idx) => (
                <motion.div key={card.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06, duration: 0.5, ease: EASE }}>
                  <Link href={`/${locale}/products/${card.href}`} className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#0d1219] p-4 sm:p-5 hover:border-white/[0.14] hover:bg-[#111720] hover:-translate-y-0.5 transition-all duration-300">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${card.accent}`}>
                      <card.icon size={18} />
                    </div>
                    <h3 className="mt-3 text-[15px] font-bold text-[#f2eee7] group-hover:text-white transition-colors">{card.label}</h3>
                    <p className="mt-1 text-[13px] leading-[1.5] text-[#6b7785]">{card.desc}</p>
                    <span className="mt-auto pt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#10BFD8] group-hover:gap-1.5 transition-all">
                      {isEs ? 'Ver solución' : 'See solution'} <ChevronRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. PRODUCTOS COMO SOLUCIONES ═══ */}
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#10BFD8]">{copy.solutions.eyebrow}</span>
                <h2 className="mt-2 text-[clamp(1.3rem,3.5vw,2rem)] font-bold tracking-[-0.03em] text-[#f6f2eb] leading-[1.05]">{copy.solutions.heading}</h2>
                <p className="mt-2 text-[13px] sm:text-[14px] text-[#6b7785] max-w-xl">{copy.solutions.sub}</p>
              </div>
              <Link href={`/${locale}/shop/all`} className="hidden sm:inline-flex items-center gap-1 text-[13px] font-semibold text-[#8791a1] hover:text-white transition">
                {copy.solutions.viewAll}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {CATALOG.map((p) => (
                <SolutionCard key={p.slug} product={p} locale={locale} />
              ))}
            </div>

            <div className="mt-4 sm:hidden text-center">
              <Link href={`/${locale}/shop/all`} className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#8791a1] hover:text-white transition">
                {copy.solutions.viewAll}
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ QUIZ ═══ */}
        <div id="quiz">
          <ProductQuiz />
        </div>

        {/* ═══ 5. PRODUCTO HÉROE — REST ═══ */}
        <section className="py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-[#0d1219] shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* lifestyle */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden bg-[#080c12]">
                  <img
                    src="/images/rest/lifestyle/3.png"
                    alt="Noctip Rest lifestyle — durmiendo de lado"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/30" />
                  {/* benefit highlight — not a fake review */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="rounded-2xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-md max-w-[360px]">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 border border-white/20"><Headphones size={10} className="text-white" /></span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">{isEs ? 'Beneficio clave' : 'Key benefit'}</span>
                      </div>
                      <p className="text-[12px] leading-[1.5] text-white/90">
                        “{isEs ? '45 gramos que no sientes. Sin presión en las orejas, ideal de lado.' : '45 grams you don’t feel. Zero ear pressure, perfect for side sleepers.'}”
                      </p>
                      <p className="mt-1 text-[11px] text-white/50">{isEs ? 'Noctip Rest · Lavable · 10h batería' : 'Noctip Rest · Washable · 10h battery'}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a] shadow-lg">
                    {copy.heroProduct.badge}
                  </div>
                </div>

                {/* content */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}>
                    <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#f6f2eb]">{copy.heroProduct.heading}</h2>
                    <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-[#9aa7b9]">{copy.heroProduct.sub}</p>

                    <div className="mt-6 flex items-baseline gap-3">
                      <span className="text-[28px] font-bold text-[#f6f2eb]">€{flagship.price.toFixed(2)}</span>
                      <span className="text-[14px] text-white/40 line-through">€{flagship.comparePrice.toFixed(2)}</span>
                      <span className="rounded-full bg-[#10BFD8]/15 px-2.5 py-1 text-[11px] font-bold text-[#10BFD8]">
                        -{Math.round(((flagship.comparePrice - flagship.price) / flagship.comparePrice) * 100)}%
                      </span>
                    </div>

                    <ul className="mt-6 space-y-2.5">
                      {copy.heroProduct.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-[13px] text-[#c8d0da]">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                            <Check size={11} className="text-[#10BFD8]" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/products/sleep-headband`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-bold text-[#080c12] shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:bg-[#f2eee7] hover:-translate-y-0.5 transition-all min-h-[48px]"
                      >
                        {copy.heroProduct.cta} <ArrowRight size={14} />
                      </Link>
                      <Link
                        href={`/${locale}/shop/all`}
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-[13px] font-semibold text-[#c8d0da] hover:bg-white hover:text-[#080c12] transition min-h-[48px]"
                      >
                        {isEs ? 'Ver colección' : 'View collection'}
                      </Link>
                    </div>
                    <p className="mt-3 text-[11px] text-[#5a6678]">{copy.heroProduct.priceNote}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 6. HOW IT WORKS ═══ */}
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#10BFD8]">{copy.how.eyebrow}</span>
              <h2 className="mt-2 text-[clamp(1.5rem,4vw,2.2rem)] font-bold tracking-[-0.03em] text-[#f6f2eb] leading-[1.05]">{copy.how.heading}</h2>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {copy.how.steps.map((step, idx) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d1219] p-6 hover:border-white/[0.12] hover:bg-[#111720] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10 text-[14px] font-bold text-[#10BFD8] border border-[#10BFD8]/20">
                      {step.n}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">{step.detail}</span>
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold text-[#f2eee7]">{step.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-[#8791a1]">{step.desc}</p>
                  {/* visual hint */}
                  <div className="mt-5 flex h-[88px] items-center justify-center rounded-xl border border-white/[0.05] bg-[#080c12] overflow-hidden">
                    {idx === 0 && <BedDouble size={28} className="text-[#2a3448] group-hover:text-[#3a4a64] transition" />}
                    {idx === 1 && <Headphones size={28} className="text-[#2a3448] group-hover:text-[#3a4a64] transition" />}
                    {idx === 2 && <Moon size={28} className="text-[#2a3448] group-hover:text-[#3a4a64] transition" />}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <a href="#quiz" onClick={(e)=>{e.preventDefault(); document.getElementById('quiz')?.scrollIntoView({behavior:'smooth'})}} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#10BFD8] hover:text-white transition">
                {isEs ? '¿Cuál es tu ritual? Haz el quiz' : 'Find your ritual — take the quiz'} <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* ═══ 7. BRAND WORLD / LIFESTYLE ═══ */}
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#10BFD8]">{copy.brand.eyebrow}</span>
                <h2 className="mt-2 text-[clamp(1.5rem,4vw,2.4rem)] font-bold tracking-[-0.03em] text-[#f6f2eb] leading-[0.95]">{copy.brand.heading}</h2>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-[#9aa7b9] max-w-xl">{copy.brand.body}</p>

                <div className="mt-6 grid grid-cols-3 gap-3 max-w-[420px]">
                  {copy.brand.stats.map((s) => (
                    <div key={s.k} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 text-center">
                      <div className="text-[18px] font-bold text-[#f2eee7]">{s.k}</div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#6b7785]">{s.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/${locale}/shop/all`} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[13px] font-bold text-[#080c12] hover:bg-[#f2eee7] transition min-h-[44px]">
                    {isEs ? 'Explorar sistema' : 'Explore system'} <ArrowRight size={13} className="ml-1.5" />
                  </Link>
                  <Link href={`/${locale}/products/neck-massager`} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[13px] font-semibold text-[#c8d0da] hover:bg-white hover:text-[#080c12] transition min-h-[44px]">
                    {isEs ? 'Ver Cervical' : 'View Cervical'}
                  </Link>
                </div>
              </motion.div>

              {/* mosaic — use available lifestyle images, fallback to gradient cards */}
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] aspect-[4/3] relative">
                  <img src="/images/rest/lifestyle/4.png" alt="Lifestyle Noctip" className="absolute inset-0 h-full w-full object-cover" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur border border-white/10">{isEs ? 'Noche · Rest' : 'Night · Rest'}</span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111720] aspect-square flex items-center justify-center relative">
                  <img src="/images/rest/lifestyle/5.png" alt="Lifestyle Noctip" className="absolute inset-0 h-full w-full object-cover" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur">{isEs ? 'Descanso' : 'Rest'}</span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] aspect-square flex flex-col items-center justify-center p-3 text-center">
                  <Quote size={16} className="text-[#10BFD8]/60 mb-2" />
                  <p className="text-[11px] leading-[1.5] text-[#9aa7b9]">{isEs ? '“Tu cuerpo recuerda el descanso.”' : '“Your body remembers rest.”'}</p>
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] aspect-[4/3] relative">
                    <img src="/images/rest/gallery/1.jpg" alt="Noctip Rest detail" className="absolute inset-0 h-full w-full object-contain p-2 bg-[#f5f0eb]" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111720] aspect-[4/3] relative flex items-center justify-center">
                    <div className="text-center p-2">
                      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#10BFD8]">Sleep</div>
                      <div className="text-[11px] text-[#6b7785]">+ Recovery</div>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] aspect-[4/3] relative">
                    <img src="/images/cervical/gallery/1.jpg" alt="Noctip Cervical" className="absolute inset-0 h-full w-full object-cover" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur">{isEs ? 'Cervical' : 'Cervical'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ SHOP BY COLLECTION — redesigned dark ═══ */}
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-[18px] sm:text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.collection.heading}</h2>
                <p className="text-[13px] text-[#6b7785] mt-1">{copy.collection.sub}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat, idx) => {
                const catProducts = getProductsByCategory(cat.id)
                const first = catProducts[0]
                const img = first?.images?.[0] ?? ''
                return (
                  <Link key={cat.id} href={`/${locale}/shop/${cat.slug}`} className="group block">
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.4 }}>
                      <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] aspect-[16/9] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#f5f0eb] opacity-100" />
                        {img && (
                          <img src={img} alt={getLocalizedCategoryName(cat, locale)} loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} className="relative z-10 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
                        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between">
                          <div>
                            <div className="text-[15px] font-bold text-white">{getLocalizedCategoryName(cat, locale)}</div>
                            <div className="text-[11px] text-white/70">{catProducts.length} {isEs ? 'productos' : 'products'}</div>
                          </div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1a1a1a] group-hover:bg-[#10BFD8] group-hover:text-white transition">
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══ WHY NOCTIP — editorial ═══ */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[720px] px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#10BFD8]">{copy.why.heading}</span>
              <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.7] text-[#c8d0da] font-medium">{copy.why.body}</p>
              <p className="mt-5 text-[14px] italic font-semibold text-[#10BFD8]">“{copy.why.motto}”</p>
            </motion.div>
          </div>
        </section>

        {/* ═══ GARANTÍA — risk reversal visual ═══ */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="overflow-hidden rounded-[24px] border border-[#10BFD8]/20 bg-gradient-to-br from-[#0d1219] via-[#0d1219] to-[#0f1a1f] p-6 sm:p-8 lg:p-10">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#10BFD8]/30 bg-[#10BFD8]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#10BFD8]">
                    <Shield size={12} /> {copy.guarantee.eyebrow}
                  </span>
                  <h2 className="mt-3 text-[clamp(1.4rem,3.5vw,2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#f6f2eb]">{copy.guarantee.heading}</h2>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#9aa7b9]">{copy.guarantee.body}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {copy.guarantee.steps.map((s, i) => (
                      <div key={s} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10BFD8] text-[11px] font-bold text-white">{i + 1}</span>
                        <span className="text-[12px] font-medium text-[#c8d0da]">{s}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/${locale}/shop/all`} className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[14px] font-bold text-[#080c12] hover:bg-[#f2eee7] transition min-h-[48px]">
                    {copy.guarantee.cta} <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>

                <div className="relative">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#080c12] p-6 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#10BFD8]/30 bg-[#10BFD8]/10">
                      <span className="text-[28px] font-bold text-[#10BFD8]">30</span>
                    </div>
                    <div className="mt-3 text-[13px] font-bold uppercase tracking-[0.14em] text-[#f2eee7]">{isEs ? 'Noches de prueba' : 'Night trial'}</div>
                    <div className="mt-1 text-[12px] text-[#6b7785]">{isEs ? 'Si no duermes mejor, reembolso total.' : 'If you don’t sleep better, full refund.'}</div>
                    <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#5a6678]">
                      <Package size={12} /> {isEs ? 'Recogida incluida' : 'Pickup included'} <span className="h-3 w-px bg-white/10" /> <Shield size={12} /> Stripe
                    </div>
                  </div>
                  {/* glow */}
                  <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#10BFD8]/10 blur-[24px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CROSS-SELL ═══ */}
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-[18px] sm:text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.cross.heading}</h2>
              <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.6] text-[#6b7785]">{copy.cross.sub}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {copy.cross.bundles.map((b, idx) => (
                <motion.div key={b.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07, duration: 0.4 }}>
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0d1219] p-5 hover:border-white/[0.12] transition h-full flex flex-col">
                    <div className="text-[14px] font-bold text-[#f2eee7]">{b.title}</div>
                    <p className="mt-1 text-[12px] text-[#8791a1]">{b.desc}</p>
                    <div className="mt-3 flex -space-x-1">
                      {b.slugs.slice(0, 4).map((slug) => {
                        const p = CATALOG.find((x) => x.slug === slug)
                        return (
                          <div key={slug} className="h-9 w-9 rounded-full border-2 border-[#0d1219] bg-[#f5f0eb] flex items-center justify-center overflow-hidden">
                            {p?.images?.[0] ? (
                              <img src={p.images[0]} alt={p.name} className="h-full w-full object-contain p-0.5" loading="lazy" />
                            ) : (
                              <span className="text-[10px]">{p?.icon ?? '•'}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    <Link href={`/${locale}/shop/all`} className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#10BFD8] hover:text-white transition">
                      {isEs ? 'Ver packs' : 'View bundles'} <ArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,18,0.96)] backdrop-blur-xl p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden transition-transform duration-300 ${isCartOpen ? 'translate-y-full' : ''}`}>
        <div className="flex items-center gap-2.5">
          <button onClick={openCart} className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-[#f2eee7]" aria-label="Cart">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10BFD8] text-[10px] font-bold text-white">{totalItems > 9 ? '9+' : totalItems}</span>
            )}
          </button>
          <Link href={`/${locale}/products/sleep-headband`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[14px] font-bold text-[#080c12] shadow-[0_8px_24px_rgba(255,255,255,0.15)] min-h-[48px]">
            {copy.mobile.cta} — €{flagship.price.toFixed(2)}
          </Link>
        </div>
      </div>
    </div>
  )
}
