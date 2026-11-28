'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ArrowRight, Check, ChevronDown, CloudRain, CreditCard, Droplets, Footprints,
  Minus, PackageOpen, Play, PlugZap, RotateCcw, ShieldCheck, Sparkles, Timer,
  Truck, Wind, X,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import Header from './Header'

const EASE = [0.22, 1, 0.36, 1] as const

const PLANS = [
  { slug: 'dry', qty: 1, price: 39.99, labelEs: '1 unidad', labelEn: '1 unit', perUnit: '39,99 €', saveEs: '', saveEn: '' },
  { slug: 'dry-duo', qty: 2, price: 69.99, labelEs: '2 unidades', labelEn: '2 units', perUnit: '35,00 €', saveEs: 'Ahorras 9,99 €', saveEn: 'Save €9.99' },
  { slug: 'dry-trio', qty: 3, price: 94.99, labelEs: '3 unidades', labelEn: '3 units', perUnit: '31,66 €', saveEs: 'Ahorras 24,98 €', saveEn: 'Save €24.98' },
]

const eur = (n: number) => n.toFixed(2).replace('.', ',') + ' €'

const COPY = {
  es: {
    eyebrow: 'NUEVO · CALZADO SECO',
    title1: 'Zapatos secos',
    title2: 'y sin olor',
    title3: 'cada mañana.',
    sub: 'Aire caliente a 360° que seca tus botas y zapatillas por dentro. Eliges 3, 6 o 9 horas, se apaga solo y por la mañana están listas. Sin radiadores. Sin periódicos.',
    bullets: ['Aire 360°', 'Temporizador 3/6/9 h', 'Se pliega'],
    cta: 'Comprar Nítida Dry',
    ctaSub: 'Envío gratis · 30 días para probarlo · 2 años de garantía',
    secondary: 'Ver cómo funciona',
    videoTag: 'Así trabaja por dentro',
    heroChips: [
      ['3 h', 'zapatillas'],
      ['130 W', 'bajo consumo'],
      ['Sin ruido', 'de noche'],
    ],
    trust: [
      { icon: Truck, title: 'Envío gratis', sub: 'Con seguimiento' },
      { icon: RotateCcw, title: '30 días', sub: 'Devolución sencilla' },
      { icon: ShieldCheck, title: '2 años', sub: 'Garantía' },
      { icon: CreditCard, title: 'Pago seguro', sub: 'Stripe · SSL' },
    ],
    marquee: ['Para botas y zapatillas', 'Guantes y calcetines', '130 W', 'Cable 1,2 m', 'Se pliega', 'Apagado automático'],
    problemTitle: 'Llegar a casa con los pies mojados tiene arreglo.',
    problemSub: 'No hace falta poner el calzado encima del radiador ni llenarlo de papel. El problema es la humedad de dentro.',
    problems: [
      { icon: CloudRain, title: 'Lluvia y nieve', desc: 'La suela aguanta. Lo que no seca es la plantilla ni la puntera.', tag: 'Invierno' },
      { icon: Droplets, title: 'Olor a humedad', desc: 'El calzado húmedo cria bacterias. El aire caliente lo seca por dentro.', tag: 'Olor' },
      { icon: Wind, title: 'Radiador y periódico', desc: 'Calientan por fuera, deforman el cuero y tardan medio día.', tag: 'Métodos de siempre' },
    ],
    howTitle: 'Tres pasos. Cero vigilancia.',
    howSub: 'Lo enchufas, eliges el tiempo y te olvidas. Se apaga solo.',
    steps: [
      { icon: Footprints, n: '01', title: 'Coloca', desc: 'Mete los dos tubos dentro del calzado. Llegan a la puntera y al talón.', detail: 'Sin herramientas' },
      { icon: Timer, n: '02', title: 'Elige el tiempo', desc: '3 horas para zapatillas. 6 o 9 para botas y calzado grueso.', detail: 'Temporizador' },
      { icon: PlugZap, n: '03', title: 'Olvídate', desc: 'Se apaga solo. Por la mañana está seco y sin olor.', detail: 'Apagado automático' },
    ],
    videoHowTitle: 'Míralo funcionar',
    videoHowSub: 'Aire templado y constante por dos tubos perforados. No es un chorro de calor: es circulación.',
    unboxTitle: 'Lo que llega a tu puerta',
    unboxSub: 'Una caja. El secador montado, los dos tubos y el manual. Solo hay que enchufarlo.',
    unbox: [
      { icon: PackageOpen, name: 'Secador Nítida Dry', detail: 'Plegado, listo para usar' },
      { icon: Wind, name: '2 tubos de aire', detail: 'Llegan a la puntera' },
      { icon: Sparkles, name: 'Manual en español', detail: 'Tres pasos, sin líos' },
      { icon: PlugZap, name: 'Cable de 1,2 m', detail: 'Enchufe europeo' },
    ],
    compareTitle: 'Radiador, periódico o Nítida Dry',
    compareSub: 'La diferencia no es la potencia: es que el aire llega donde el trapo no.',
    compareHead: ['', 'Nítida Dry', 'Radiador', 'Periódico'],
    compareRows: [
      ['Seca por dentro', true, false, false],
      ['No deforma el cuero', true, 'A veces', true],
      ['Se apaga solo', true, false, false],
      ['Sin olor a humedad', true, false, false],
      ['Se guarda en un cajón', true, false, false],
    ] as const,
    specsTitle: 'Ficha técnica',
    specs: [
      ['Potencia', '130 W'],
      ['Voltaje', '220-240 V'],
      ['Temporizador', '3 / 6 / 9 horas'],
      ['Apagado', 'Automático al terminar'],
      ['Salidas de aire', '2 tubos perforados, 360°'],
      ['Plegable', 'Sí'],
      ['Cable', '1,2 m'],
      ['Uso', 'Calzado, botas, guantes y calcetines'],
      ['Certificado', 'CE'],
      ['Garantía', '2 años'],
    ],
    guaranteeTitle: 'Pruébalo 30 días. Si no seca, te devolvemos el dinero.',
    guaranteeBody: 'Úsalo con tu calzado real. Si no notas la diferencia, escríbenos y lo recogemos. Sin formularios y sin discutir.',
    guaranteeCards: [
      { icon: RotateCcw, title: '30 días', desc: 'Devolución completa' },
      { icon: ShieldCheck, title: '2 años', desc: 'Garantía del producto' },
      { icon: CreditCard, title: 'Pago seguro', desc: 'Stripe · SSL 256 bits' },
    ],
    faqTitle: 'Preguntas antes de comprar',
    faqs: [
      ['¿Cuánto tarda en secar?', 'Para unas zapatillas húmedas, 3 horas suelen bastar. Para botas gruesas o muy empapadas, usa 6 o 9 horas. El tiempo depende del material y de la humedad.'],
      ['¿Sirve para botas altas?', 'Sí. Los tubos llegan hasta la puntera y el aire sale por toda la superficie. Para botas muy altas, colócalas con la caña hacia arriba.'],
      ['¿Hace ruido?', 'Es un ventilador suave. Se puede dejar en el recibidor o en el baño por la noche.'],
      ['¿Es seguro dejarlo toda la noche?', 'Sí. Tiene apagado automático al terminar el tiempo y funciona a temperatura constante. No deja el calzado ardiendo.'],
      ['¿Se calienta mucho el calzado?', 'No. El aire es templado y constante, no un chorro de calor fuerte. Por eso vale para cuero, gamuza y tejidos.'],
      ['¿Qué incluye la caja?', 'El secador, dos tubos de aire, el manual y el cable de 1,2 m. Llega montado.'],
      ['¿Cuánto tarda el envío?', 'Preparamos el pedido en 24 horas laborables. La entrega suele tardar entre 3 y 7 días laborables con seguimiento. Te enviamos el número por email.'],
      ['¿Puedo devolverlo?', 'Sí. Tienes 30 días desde la entrega. Nos escribes y te indicamos cómo devolverlo.'],
    ],
    finalTitle: 'Mañana te pones zapatos secos.',
    finalSub: 'Nítida Dry · 130 W · Temporizador 3/6/9 h · 2 años de garantía.',
    add: 'Añadir al carrito',
    added: 'Añadido',
    sticky: 'Comprar Nítida Dry',
    reviews: 'Producto nuevo. Aún no hay reseñas: las que veas aquí serán de compras reales.',
  },
  en: {
    eyebrow: 'NEW · DRY FOOTWEAR',
    title1: 'Dry shoes.',
    title2: 'No smell.',
    title3: 'Every morning.',
    sub: '360° warm air that dries your boots and trainers from the inside. Choose 3, 6 or 9 hours, it switches off by itself and they are ready in the morning. No radiators. No newspaper.',
    bullets: ['360° air', '3/6/9 h timer', 'Folds flat'],
    cta: 'Buy Nítida Dry',
    ctaSub: 'Free shipping · 30 days to try it · 2-year warranty',
    secondary: 'See how it works',
    videoTag: 'How it works inside',
    heroChips: [
      ['3 h', 'trainers'],
      ['130 W', 'low power'],
      ['Quiet', 'at night'],
    ],
    trust: [
      { icon: Truck, title: 'Free shipping', sub: 'Tracked delivery' },
      { icon: RotateCcw, title: '30 days', sub: 'Easy returns' },
      { icon: ShieldCheck, title: '2 years', sub: 'Warranty' },
      { icon: CreditCard, title: 'Secure payment', sub: 'Stripe · SSL' },
    ],
    marquee: ['Boots & trainers', 'Gloves & socks', '130 W', '1.2 m cable', 'Folds flat', 'Auto shut-off'],
    problemTitle: 'Coming home with wet feet is fixable.',
    problemSub: 'You do not need to put your shoes on the radiator or fill them with newspaper. The problem is the damp inside.',
    problems: [
      { icon: CloudRain, title: 'Rain and snow', desc: 'The sole holds up. What does not dry is the insole or the toe.', tag: 'Winter' },
      { icon: Droplets, title: 'Damp smell', desc: 'Wet shoes grow bacteria. Warm air dries them from the inside.', tag: 'Odour' },
      { icon: Wind, title: 'Radiator and newspaper', desc: 'They heat from outside, warp leather and take half a day.', tag: 'The old way' },
    ],
    howTitle: 'Three steps. Zero watching.',
    howSub: 'Plug it in, choose the time and forget it. It switches off by itself.',
    steps: [
      { icon: Footprints, n: '01', title: 'Place', desc: 'Put the two tubes inside your shoes. They reach the toe and the heel.', detail: 'No tools' },
      { icon: Timer, n: '02', title: 'Choose the time', desc: '3 hours for trainers. 6 or 9 for boots and thick footwear.', detail: 'Timer' },
      { icon: PlugZap, n: '03', title: 'Forget it', desc: 'It switches off by itself. Dry and odour-free in the morning.', detail: 'Auto shut-off' },
    ],
    videoHowTitle: 'Watch it work',
    videoHowSub: 'Gentle, constant warm air through two perforated tubes. Not a blast of heat: circulation.',
    unboxTitle: 'What arrives at your door',
    unboxSub: 'One box. The dryer assembled, both tubes and the manual. Just plug it in.',
    unbox: [
      { icon: PackageOpen, name: 'Nítida Dry dryer', detail: 'Folded, ready to use' },
      { icon: Wind, name: '2 air tubes', detail: 'Reach the toe' },
      { icon: Sparkles, name: 'Manual in Spanish', detail: 'Three steps, no fuss' },
      { icon: PlugZap, name: '1.2 m cable', detail: 'EU plug' },
    ],
    compareTitle: 'Radiator, newspaper or Nítida Dry',
    compareSub: 'The difference is not power: it is that air reaches where a cloth cannot.',
    compareHead: ['', 'Nítida Dry', 'Radiator', 'Newspaper'],
    compareRows: [
      ['Dries from the inside', true, false, false],
      ['Does not warp leather', true, 'Sometimes', true],
      ['Switches off by itself', true, false, false],
      ['No damp smell', true, false, false],
      ['Fits in a drawer', true, false, false],
    ] as const,
    specsTitle: 'Specs',
    specs: [
      ['Power', '130 W'],
      ['Voltage', '220-240 V'],
      ['Timer', '3 / 6 / 9 hours'],
      ['Shut-off', 'Automatic when finished'],
      ['Air outlets', '2 perforated tubes, 360°'],
      ['Foldable', 'Yes'],
      ['Cable', '1.2 m'],
      ['Use', 'Footwear, boots, gloves and socks'],
      ['Certification', 'CE'],
      ['Warranty', '2 years'],
    ],
    guaranteeTitle: 'Try it for 30 days. If it does not dry, we refund you.',
    guaranteeBody: 'Use it with your real footwear. If you do not notice a difference, write to us and we will collect it. No forms, no arguing.',
    guaranteeCards: [
      { icon: RotateCcw, title: '30 days', desc: 'Full refund' },
      { icon: ShieldCheck, title: '2 years', desc: 'Product warranty' },
      { icon: CreditCard, title: 'Secure payment', desc: 'Stripe · SSL 256-bit' },
    ],
    faqTitle: 'Questions before buying',
    faqs: [
      ['How long does it take to dry?', 'For damp trainers, 3 hours is usually enough. For thick or soaked boots, use 6 or 9 hours. Time depends on the material and the dampness.'],
      ['Does it work with tall boots?', 'Yes. The tubes reach the toe and air comes out along the whole surface. For very tall boots, place them with the shaft up.'],
      ['Is it noisy?', 'It is a gentle fan. You can leave it in the hallway or bathroom overnight.'],
      ['Is it safe to leave on all night?', 'Yes. It switches off automatically when the timer ends and runs at a constant temperature. It does not leave footwear burning hot.'],
      ['Does it get the shoes very hot?', 'No. The air is warm and constant, not a blast of heat. That is why it is suitable for leather, suede and fabrics.'],
      ['What is in the box?', 'The dryer, two air tubes, the manual and the 1.2 m cable. It arrives assembled.'],
      ['How long does shipping take?', 'We prepare the order within 24 working hours. Delivery usually takes 3 to 7 working days with tracking. We email you the number.'],
      ['Can I return it?', 'Yes. You have 30 days from delivery. Write to us and we will tell you how to return it.'],
    ],
    finalTitle: 'Dry shoes tomorrow morning.',
    finalSub: 'Nítida Dry · 130 W · 3/6/9 h timer · 2-year warranty.',
    add: 'Add to cart',
    added: 'Added',
    sticky: 'Buy Nítida Dry',
    reviews: 'New product. No reviews yet: any you see here will come from real purchases.',
  },
}

export default function NitidaDryHome() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const copy = isEs ? COPY.es : COPY.en
  const { add, open } = useCart()
  const [plan, setPlan] = useState(0)
  const selected = PLANS[plan]

  const buy = () => {
    add({
      slug: selected.slug,
      name: selected.qty === 1 ? 'Nítida Dry' : `Nítida Dry — Pack ${selected.qty}`,
      price: selected.price,
      icon: '',
    })
    open()
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#14211F]">
      <Header />
      <main className="pb-28 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[680px] w-[1080px] -translate-x-1/2 rounded-full bg-[#0F766E]/[0.08] blur-[100px]" />
            <div className="absolute -right-32 top-24 h-[460px] w-[460px] rounded-full bg-[#C2410C]/[0.07] blur-[90px] hidden lg:block" />
          </div>

          <div className="relative mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
            <div className="grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F766E] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    <Sparkles size={11} />
                    {copy.eyebrow}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D6] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#5B6B68]">
                    {isEs ? 'Producto nuevo' : 'New product'}
                  </span>
                </div>

                <h1 className="mt-5 text-[clamp(2.55rem,8.2vw,4.9rem)] font-bold leading-[0.92] tracking-[-0.045em] text-[#14211F]">
                  {copy.title1}
                  <br />
                  <span className="text-[#0F766E]">{copy.title2}</span>
                  <br />
                  {copy.title3}
                </h1>

                <p className="mt-5 max-w-[540px] text-[15px] leading-[1.65] text-[#5B6B68] sm:text-[16px]">
                  {copy.sub}
                </p>

                <div className="mt-5 overflow-hidden rounded-2xl border border-[#E5E0D6] bg-[#F3E7D7] lg:hidden">
                  <div className="relative">
                    <img
                      src="/images/dry/studio.jpg"
                      alt={isEs ? 'Nítida Dry con aire caliente a 360°' : 'Nítida Dry with 360° warm air'}
                      className="aspect-[4/3] w-full object-cover"
                      loading="eager"
                    />
                    <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0F766E] backdrop-blur-md">
                      {isEs ? 'Aire 360°' : '360° air'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {copy.bullets.map((b) => (
                    <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D6] bg-[#F1EDE5] px-3 py-1.5 text-[11px] font-semibold text-[#3E4F4B]">
                      <Check size={12} className="text-[#0F766E]" />
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-end gap-3">
                  <div className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[#14211F] sm:text-[40px]">{eur(selected.price)}</div>
                  <div className="pb-1 text-[12px] text-[#5B6B68]">
                    <div>{isEs ? 'Envío gratis' : 'Free shipping'}</div>
                    <div>{isEs ? 'IVA incluido' : 'VAT included'}</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {PLANS.map((p, i) => (
                    <button
                      key={p.slug}
                      onClick={() => setPlan(i)}
                      aria-pressed={plan === i}
                      className={`relative flex min-h-[58px] items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition sm:block sm:min-h-[92px] sm:px-3 sm:py-3 ${plan === i ? 'border-[#0F766E] bg-[#0F766E]/10' : 'border-[#E5E0D6] bg-[#F7F5F0] hover:border-[#0F766E]/30'}`}
                    >
                      <div className="flex min-w-0 items-center gap-2 sm:block">
                        <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#3E4F4B]">{isEs ? p.labelEs : p.labelEn}</span>
                        {i === 1 && (
                          <span className="rounded-full bg-[#0F766E] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
                            {isEs ? 'Recomendado' : 'Recommended'}
                          </span>
                        )}
                      </div>
                      <div className="shrink-0 text-right sm:mt-1.5 sm:text-left">
                        <div className="text-[15px] font-bold leading-none text-[#14211F]">{eur(p.price)}</div>
                        <div className="mt-1 text-[9px] text-[#5B6B68]">{p.perUnit}/ud</div>
                        {p.saveEs && <div className="mt-0.5 text-[9px] font-semibold text-[#15803D]">{isEs ? p.saveEs : p.saveEn}</div>}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button
                    onClick={buy}
                    className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#0F766E] px-7 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B5F58] hover:shadow-[0_12px_32px_rgba(15,118,110,0.18)] active:scale-[0.99]"
                  >
                    {copy.cta} — {eur(selected.price)}
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href="#como-funciona"
                    className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-[#D8D2C7] px-6 py-4 text-[14px] font-medium text-[#3E4F4B] transition hover:border-[#0F766E]/50 hover:text-[#0F766E]"
                  >
                    <Play size={14} />
                    {copy.secondary}
                  </a>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-[#5B6B68]">{copy.ctaSub}</p>
              </div>

              <div
                className="relative order-2 lg:order-none"
              >
                <div className="relative overflow-hidden rounded-[28px] border border-[#E5E0D6] bg-[#F3E7D7] shadow-[0_24px_70px_rgba(20,33,31,0.14)]">
                  <video
                    className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/dry/hero-boots.jpg"
                    aria-label={isEs ? 'Nítida Dry secando unas botas' : 'Nítida Dry drying a pair of boots'}
                  >
                    <source src="/videos/dry-hero.mp4" type="video/mp4" />
                  </video>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#1B120B]/85 via-[#1B120B]/20 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5EEAD4]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                      {copy.videoTag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                    {copy.heroChips.map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-white/20 bg-white/15 px-2 py-2 text-center backdrop-blur-md">
                        <div className="text-[13px] font-bold text-white">{k}</div>
                        <div className="text-[9px] uppercase tracking-wide text-white/75">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TRUST */}
            <div className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-14 sm:grid-cols-4 sm:gap-3">
              {copy.trust.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-2.5 rounded-xl border border-[#E5E0D6] bg-white px-3 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F766E]/10">
                    <Icon size={15} className="text-[#0F766E]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#14211F]">{title}</div>
                    <div className="truncate text-[10px] text-[#5B6B68]">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="border-y border-[#E5E0D6] bg-[#F1EDE5]">
          <div className="mx-auto max-w-[1280px] overflow-hidden px-4 py-3 sm:px-6">
            <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {copy.marquee.map((item) => (
                <span key={item} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E5E0D6] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#3E4F4B]">
                  <Check size={11} className="text-[#0F766E]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PROBLEM */}
        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="max-w-[760px]"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2410C]">{isEs ? 'El problema' : 'The problem'}</p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.04em]">{copy.problemTitle}</h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-[#5B6B68]">{copy.problemSub}</p>
          </motion.div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {copy.problems.map(({ icon: Icon, title, desc, tag }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
                className="rounded-2xl border border-[#E5E0D6] bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2410C]/10">
                    <Icon size={18} className="text-[#C2410C]" />
                  </span>
                  <span className="rounded-full bg-[#F1EDE5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#5B6B68]">{tag}</span>
                </div>
                <h3 className="mt-4 text-[16px] font-bold tracking-[-0.02em]">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-[#5B6B68]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS + VIDEO */}
        <section id="como-funciona" className="scroll-mt-24 border-y border-[#E5E0D6] bg-[#0F2B27] text-white">
          <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5EEAD4]">{isEs ? 'Cómo funciona' : 'How it works'}</p>
                <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white">{copy.howTitle}</h2>
                <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-white/70">{copy.howSub}</p>

                <div className="mt-8 space-y-4">
                  {copy.steps.map(({ icon: Icon, n, title, desc, detail }) => (
                    <div key={n} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5EEAD4]/15">
                        <Icon size={17} className="text-[#5EEAD4]" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-[0.14em] text-white/40">{n}</span>
                          <h3 className="text-[15px] font-bold text-white">{title}</h3>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white/60">{detail}</span>
                        </div>
                        <p className="mt-1 text-[13px] leading-[1.6] text-white/65">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative overflow-hidden rounded-[28px] border border-white/15 bg-black/20 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              >
                <video
                  className="aspect-[4/5] w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/dry/studio.jpg"
                  aria-label={isEs ? 'Vídeo de Nítida Dry funcionando' : 'Nítida Dry in use'}
                >
                  <source src="/videos/dry-how.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5EEAD4]">{copy.videoHowTitle}</div>
                  <p className="mt-1 max-w-[340px] text-[12px] leading-[1.5] text-white/70">{copy.videoHowSub}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* UNBOXING */}
        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative order-2 overflow-hidden rounded-[28px] border border-[#E5E0D6] bg-[#F3E7D7] lg:order-none"
            >
              <video
                className="aspect-[4/5] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/dry/folded.jpg"
                aria-label={isEs ? 'Contenido de la caja de Nítida Dry' : 'What is inside the Nítida Dry box'}
              >
                <source src="/videos/dry-unbox.mp4" type="video/mp4" />
              </video>
              <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0F766E] backdrop-blur-md">
                {isEs ? 'Llega montado' : 'Arrives assembled'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">{isEs ? 'Cómo llega' : 'Unboxing'}</p>
              <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.04em]">{copy.unboxTitle}</h2>
              <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-[#5B6B68]">{copy.unboxSub}</p>

              <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {copy.unbox.map(({ icon: Icon, name, detail }) => (
                  <div key={name} className="flex items-start gap-3 rounded-2xl border border-[#E5E0D6] bg-white p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0F766E]/10">
                      <Icon size={16} className="text-[#0F766E]" />
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-[#14211F]">{name}</div>
                      <div className="text-[11px] text-[#5B6B68]">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#E5E0D6] bg-[#F1EDE5] px-4 py-3">
                <Check size={15} className="mt-0.5 shrink-0 text-[#0F766E]" />
                <p className="text-[12px] leading-[1.6] text-[#3E4F4B]">
                  {isEs
                    ? 'No hace falta montar nada. Despliega los brazos, enchufa y elige el tiempo.'
                    : 'Nothing to assemble. Unfold the arms, plug it in and choose the time.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="border-y border-[#E5E0D6] bg-[#F1EDE5]">
          <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[760px]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">{isEs ? 'Comparativa' : 'Comparison'}</p>
              <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.04em]">{copy.compareTitle}</h2>
              <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-[#5B6B68]">{copy.compareSub}</p>
            </motion.div>

            <div className="mt-9 overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white">
              <div className="grid grid-cols-4 border-b border-[#E5E0D6] bg-[#F7F5F0]">
                {copy.compareHead.map((h, i) => (
                  <div key={i} className={`px-3 py-3 text-[10px] font-bold uppercase tracking-[0.06em] sm:text-[11px] ${i === 1 ? 'text-[#0F766E]' : 'text-[#5B6B68]'}`}>
                    {h || ''}
                  </div>
                ))}
              </div>
              {copy.compareRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 border-b border-[#E5E0D6] last:border-0">
                  {row.map((cell, i) => (
                    <div key={i} className={`flex items-center px-3 py-3 text-[11px] sm:text-[13px] ${i === 0 ? 'font-semibold text-[#14211F]' : 'justify-center text-[#5B6B68]'}`}>
                      {cell === true ? (
                        <Check size={15} className={i === 1 ? 'text-[#0F766E]' : 'text-[#15803D]'} />
                      ) : cell === false ? (
                        <X size={14} className="text-[#C2410C]/60" />
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px]"><Minus size={11} />{cell}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-[#5B6B68]">
              {isEs
                ? 'Comparación de métodos, no de marcas. El tiempo de secado depende del material y de la humedad.'
                : 'A comparison of methods, not brands. Drying time depends on the material and dampness.'}
            </p>
          </div>
        </section>

        {/* SPECS + REVIEWS NOTE */}
        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">{isEs ? 'Sin humo' : 'Straight facts'}</p>
              <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.04em]">{copy.specsTitle}</h2>
              <p className="mt-4 max-w-[460px] text-[14px] leading-[1.7] text-[#5B6B68]">
                {isEs
                  ? 'Lo que ves es lo que hay. Sin medidas inventadas ni potencias de folleto.'
                  : 'What you see is what you get. No invented numbers or brochure wattage.'}
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white">
                {copy.specs.map(([k, v], i) => (
                  <div key={k} className={`flex items-center justify-between gap-4 px-4 py-3 text-[12px] sm:text-[13px] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]'}`}>
                    <span className="text-[#5B6B68]">{k}</span>
                    <span className="text-right font-semibold text-[#14211F]">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <div className="overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white">
                <img
                  src="/images/dry/detail-vents.jpg"
                  alt={isEs ? 'Detalle del secador Nítida Dry' : 'Nítida Dry detail'}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-[16px] font-bold tracking-[-0.02em]">{isEs ? 'Dos tubos, no uno' : 'Two tubes, not one'}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-[#5B6B68]">
                    {isEs
                      ? 'Cada tubo seca un zapato a la vez. El aire sale por toda la superficie perforada, no solo por la punta.'
                      : 'Each tube dries one shoe at a time. Air comes out along the whole perforated surface, not just the tip.'}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white">
                <img
                  src="/images/dry/detail-panel.jpg"
                  alt={isEs ? 'Panel con temporizador de 3, 6 y 9 horas' : '3, 6 and 9-hour timer panel'}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-[16px] font-bold tracking-[-0.02em]">{isEs ? '3, 6 o 9 horas' : '3, 6 or 9 hours'}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-[#5B6B68]">
                    {isEs
                      ? 'Un botón. Elige el tiempo y vete. Al terminar, se apaga solo.'
                      : 'One button. Choose the time and walk away. It switches off when finished.'}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-[#D8D2C7] bg-[#F7F5F0] p-5">
                <p className="text-[12px] leading-[1.65] text-[#5B6B68]">{copy.reviews}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="border-y border-[#E5E0D6] bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mx-auto max-w-[720px] text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E]/10">
                <ShieldCheck size={22} className="text-[#0F766E]" />
              </span>
              <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.04em]">{copy.guaranteeTitle}</h2>
              <p className="mt-4 text-[14px] leading-[1.7] text-[#5B6B68]">{copy.guaranteeBody}</p>
            </motion.div>

            <div className="mx-auto mt-8 grid max-w-[820px] gap-3 sm:grid-cols-3">
              {copy.guaranteeCards.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-[#E5E0D6] bg-[#F7F5F0] p-5 text-center">
                  <Icon size={18} className="mx-auto text-[#0F766E]" />
                  <div className="mt-2 text-[14px] font-bold text-[#14211F]">{title}</div>
                  <div className="text-[11px] text-[#5B6B68]">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F766E]">FAQ</p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.04em]">{copy.faqTitle}</h2>
          </motion.div>

          <div className="mt-7 divide-y divide-[#E5E0D6] overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white">
            {copy.faqs.map(([q, a]) => (
              <details key={q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-semibold text-[#14211F] [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown size={16} className="shrink-0 text-[#0F766E] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-2 pr-6 text-[13px] leading-[1.7] text-[#5B6B68]">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[30px] bg-[#0F2B27] px-6 py-12 text-center sm:px-10 sm:py-16">
            <h2 className="mx-auto max-w-[760px] text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.045em] text-white">{copy.finalTitle}</h2>
            <p className="mt-4 text-[13px] text-white/60">{copy.finalSub}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={buy}
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#5EEAD4] px-8 py-4 text-[15px] font-bold text-[#0F2B27] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#99F6E4] active:scale-[0.99]"
              >
                {copy.cta} — {eur(selected.price)}
                <ArrowRight size={16} />
              </button>
              <Link
                href={`/${locale}/products/${selected.slug}`}
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 px-6 py-4 text-[14px] font-medium text-white/80 transition hover:border-white/40 hover:text-white"
              >
                {isEs ? 'Ver la ficha completa' : 'See full product page'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E0D6] bg-[#F7F5F0]/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-bold leading-none text-[#14211F]">{eur(selected.price)}</div>
            <div className="mt-0.5 truncate text-[10px] text-[#5B6B68]">{isEs ? 'Envío gratis · 30 días' : 'Free shipping · 30 days'}</div>
          </div>
          <button
            onClick={buy}
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-5 py-3 text-[13px] font-bold text-white active:scale-[0.99]"
          >
            {copy.sticky}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
