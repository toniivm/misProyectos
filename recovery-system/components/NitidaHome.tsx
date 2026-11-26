'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ArrowRight, Brush, Check, ChevronDown, Circle, CornerDownRight, CreditCard,
  Droplets, Flame, Maximize2, Package, RotateCcw, ShieldCheck, Sparkles,
  Square, Timer, Truck, Waves, Wind, X,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import Header from './Header'
import ProductImage from './ProductImage'

const EASE = [0.22, 1, 0.36, 1] as const

const PLANS = [
  { slug: 'vapor', qty: 1, price: 39.99, labelEs: '1 unidad', labelEn: '1 unit', perUnit: '39,99 €', saveEs: '', saveEn: '' },
  { slug: 'vapor-duo', qty: 2, price: 69.99, labelEs: '2 unidades', labelEn: '2 units', perUnit: '35,00 €', saveEs: 'Ahorras 9,99 €', saveEn: 'Save €9.99' },
  { slug: 'vapor-trio', qty: 3, price: 94.99, labelEs: '3 unidades', labelEn: '3 units', perUnit: '31,66 €', saveEs: 'Ahorras 24,98 €', saveEn: 'Save €24.98' },
]

const eur = (n: number) => n.toFixed(2).replace('.', ',') + ' €'


const PRODUCT_IMAGES = [
  '/images/vapor/vs-studio-product-800.webp',
  '/images/vapor/vs-studio-kit.webp',
  '/images/vapor/vs-gal-limpieza-800.webp',
]

const COPY = {
  es: {
    eyebrow: 'NÍTIDA VAPOR · LIMPIEZA SIN FROTAR',
    title1: 'La grasa y la cal',
    title2: 'se derriten.',
    title3: 'Tú no.',
    sub: 'Limpiador de vapor a presión con 12 accesorios. Cocina, baño, juntas, mamparas y tapicería. Solo agua del grifo.',
    bullets: ['3 bar de presión', 'Hasta 115 °C', '12 accesorios'],
    cta: 'Lo quiero',
    ctaSub: 'Envío 24-72 h · 30 días para probarlo · Garantía 2 años',
    secondary: 'Ver cómo funciona',
    trust: [
      { icon: Truck, title: 'Envío 24-72 h', sub: 'Con seguimiento' },
      { icon: RotateCcw, title: '30 días', sub: 'Devolución sin preguntas' },
      { icon: ShieldCheck, title: 'Garantía 2 años', sub: 'Producto nuevo' },
      { icon: CreditCard, title: 'Pago seguro', sub: 'Stripe · SSL' },
    ],
    problemsTitle: 'Tres sitios donde se nota en 10 segundos',
    problemsSub: 'No es magia: es vapor a presión. La suciedad se ablanda y se despega. Tú solo pasas la boquilla.',
    problems: [
      { icon: Flame, title: 'Vitro y horno', desc: 'La grasa pegada se ablanda y sale con la rasqueta. Sin frotar.', tag: 'Cocina' },
      { icon: Droplets, title: 'Juntas y grifos', desc: 'La cal blanca de la mampara y del grifo se despega con el cepillo.', tag: 'Baño' },
      { icon: Waves, title: 'Sofá y colchón', desc: 'El cabezal con paño limpia tapicería sin dejarla empapada.', tag: 'Tapicería' },
    ],
    howTitle: 'Así se usa',
    howSub: 'Tres pasos. Sin detergentes, sin mezclar productos, sin olores químicos.',
    steps: [
      { n: '01', title: 'Llena', desc: '250 ml de agua del grifo. Ni gota de lejía ni detergente.', detail: 'Depósito 350 ml' },
      { n: '02', title: 'Enchufa', desc: 'En 3-5 minutos sale vapor. La luz te avisa.', detail: '1.050 W · 3 bar' },
      { n: '03', title: 'Dispara', desc: 'Elige boquilla y pasa. La grasa y la cal se despegan.', detail: 'Hasta 115 °C' },
    ],
    kitTitle: '12 accesorios. Una caja.',
    kitSub: 'Cada uno para una zona. Se cambian a mano, sin herramientas.',
    kit: [
      { icon: Droplets, name: 'Vaso medidor' },
      { icon: Circle, name: 'Embudo' },
      { icon: Square, name: 'Paño para cabezal' },
      { icon: Brush, name: 'Cepillo nailon ×3' },
      { icon: Sparkles, name: 'Cepillo de latón' },
      { icon: ArrowRight, name: 'Boquilla recta' },
      { icon: CornerDownRight, name: 'Boquilla angular' },
      { icon: Waves, name: 'Manguera flexible' },
      { icon: Maximize2, name: 'Cabezal grande' },
      { icon: Wind, name: 'Rasqueta cristales' },
      { icon: Timer, name: 'Calentamiento 3-5 min' },
      { icon: Package, name: 'Caja lista para usar' },
    ],
    specsTitle: 'Ficha técnica',
    specs: [
      ['Potencia', '1.050 W'],
      ['Presión', '3 bar (0,3 MPa)'],
      ['Temperatura', 'Hasta 115 °C'],
      ['Depósito', '350 ml (llenado 250 ml)'],
      ['Calentamiento', '3-5 minutos'],
      ['Caudal de vapor', '28 g/min'],
      ['Medidas', '27 × 13 × 24 cm'],
      ['Accesorios', '12 incluidos'],
      ['Apagado', 'Automático sin agua'],
      ['Garantía', '2 años'],
    ],
    compareTitle: 'Por qué no volver al cepillo',
    compareSub: 'La diferencia no es la potencia: es que el vapor llega donde el brazo no.',
    compareHead: ['', 'Nítida Vapor', 'Fregar a mano', 'Químicos fuertes'],
    compareRows: [
      ['Grasa pegada', true, false, 'A veces'],
      ['Cal en grifos y juntas', true, false, false],
      ['Sin restos químicos', true, true, false],
      ['Sin frotar', true, false, false],
      ['Rincones y rejillas', true, false, 'A veces'],
    ] as const,
    guaranteeTitle: 'Pruébalo 30 días. Si no limpia, te devolvemos el dinero.',
    guaranteeBody: 'Úsalo en tu cocina y tu baño reales. Si no notas la diferencia, escríbenos y lo recogemos. Sin formularios y sin discutir.',
    guaranteeCards: [
      { icon: RotateCcw, title: '30 días', desc: 'Devolución completa' },
      { icon: ShieldCheck, title: '2 años', desc: 'Garantía del producto' },
      { icon: CreditCard, title: 'Pago seguro', desc: 'Stripe · SSL 256 bits' },
    ],
    faqTitle: 'Preguntas que se hacen antes de comprar',
    faqs: [
      ['¿Funciona en vitrocerámica, mármol y azulejos?', 'Sí. En vitrocerámica, azulejos, juntas, acero, cristal y mármol sellado. En superficies delicadas, prueba primero en una zona pequeña y usa el cepillo de nailon, no el de latón.'],
      ['¿Necesito detergente?', 'No. El depósito es solo agua del grifo. El vapor a presión ablanda la grasa y la cal. Sin detergente no quedan restos en la vitro ni en el colchón.'],
      ['¿Cuánto tarda en calentarse?', 'Entre 3 y 5 minutos. La luz del frontal te avisa cuando está listo.'],
      ['¿Es seguro con niños y mascotas?', 'El vapor sale a más de 100 °C: hay que mantener el aparato fuera del alcance de los niños y no apuntar a personas o animales. La tapa tiene cierre de seguridad y el aparato se apaga solo cuando se queda sin agua.'],
      ['¿Pesa mucho? ¿Se usa con una mano?', 'Está diseñado para usarlo con una mano. El depósito son 250 ml y la base mide 27 × 13 cm, así que cabe en cualquier armario.'],
      ['¿Qué pasa si se queda sin agua?', 'Se apaga automáticamente. Espera a que enfríe, abre la tapa con cuidado y vuelve a llenar.'],
      ['¿Cómo va el envío y el pago?', 'Enviamos en 24-72 h laborables con seguimiento. Pagas con tarjeta en un checkout seguro de Stripe. No guardamos los datos de tu tarjeta.'],
      ['¿Y si no me convence?', 'Tienes 30 días desde la entrega. Nos escribes, te damos la dirección de devolución y te devolvemos el importe del producto.'],
    ],
    finalTitle: 'La casa limpia. Sin ponerte de rodillas.',
    finalSub: 'Nítida Vapor · 12 accesorios · 3 bar · 2 años de garantía.',
    add: 'Añadir al carrito',
    added: 'Añadido',
  },
  en: {
    eyebrow: 'NÍTIDA VAPOR · CLEAN WITHOUT SCRUBBING',
    title1: 'Grease and limescale',
    title2: 'melt away.',
    title3: 'You don’t.',
    sub: 'Pressurised steam cleaner with 12 accessories. Kitchen, bathroom, grout, shower screens and upholstery. Tap water only.',
    bullets: ['3 bar of pressure', 'Up to 115 °C', '12 accessories'],
    cta: 'I want it',
    ctaSub: '24-72 h shipping · 30 days to try it · 2-year warranty',
    secondary: 'See how it works',
    trust: [
      { icon: Truck, title: '24-72 h shipping', sub: 'Tracked delivery' },
      { icon: RotateCcw, title: '30 days', sub: 'No-questions returns' },
      { icon: ShieldCheck, title: '2-year warranty', sub: 'Brand new unit' },
      { icon: CreditCard, title: 'Secure payment', sub: 'Stripe · SSL' },
    ],
    problemsTitle: 'Three places where you notice it in 10 seconds',
    problemsSub: 'It is not magic: it is pressurised steam. Dirt softens and lifts. You just guide the nozzle.',
    problems: [
      { icon: Flame, title: 'Hob and oven', desc: 'Baked-on grease softens and comes off with the scraper. No scrubbing.', tag: 'Kitchen' },
      { icon: Droplets, title: 'Grout and taps', desc: 'White limescale on shower screens and taps lifts with the brush.', tag: 'Bathroom' },
      { icon: Waves, title: 'Sofa and mattress', desc: 'The cloth head cleans upholstery without soaking it.', tag: 'Upholstery' },
    ],
    howTitle: 'How to use it',
    howSub: 'Three steps. No detergents, no mixing products, no chemical smells.',
    steps: [
      { n: '01', title: 'Fill', desc: '250 ml of tap water. No bleach, no detergent.', detail: '350 ml tank' },
      { n: '02', title: 'Plug in', desc: 'Steam in 3-5 minutes. The light tells you.', detail: '1,050 W · 3 bar' },
      { n: '03', title: 'Pull the trigger', desc: 'Pick a nozzle and pass it. Grease and limescale lift.', detail: 'Up to 115 °C' },
    ],
    kitTitle: '12 accessories. One box.',
    kitSub: 'One for each area. They swap by hand, no tools.',
    kit: [
      { icon: Droplets, name: 'Measuring cup' },
      { icon: Circle, name: 'Funnel' },
      { icon: Square, name: 'Cloth head pad' },
      { icon: Brush, name: 'Nylon brush ×3' },
      { icon: Sparkles, name: 'Brass brush' },
      { icon: ArrowRight, name: 'Straight nozzle' },
      { icon: CornerDownRight, name: 'Angled nozzle' },
      { icon: Waves, name: 'Flexible hose' },
      { icon: Maximize2, name: 'Large head' },
      { icon: Wind, name: 'Glass scraper' },
      { icon: Timer, name: '3-5 min heat-up' },
      { icon: Package, name: 'Ready-to-use box' },
    ],
    specsTitle: 'Specs',
    specs: [
      ['Power', '1,050 W'],
      ['Pressure', '3 bar (0.3 MPa)'],
      ['Temperature', 'Up to 115 °C'],
      ['Tank', '350 ml (250 ml fill)'],
      ['Heat-up', '3-5 minutes'],
      ['Steam flow', '28 g/min'],
      ['Size', '27 × 13 × 24 cm'],
      ['Accessories', '12 included'],
      ['Shut-off', 'Auto when empty'],
      ['Warranty', '2 years'],
    ],
    compareTitle: 'Why go back to the brush?',
    compareSub: 'The difference is not power: steam reaches where your arm cannot.',
    compareHead: ['', 'Nítida Vapor', 'Hand scrubbing', 'Harsh chemicals'],
    compareRows: [
      ['Baked-on grease', true, false, 'Sometimes'],
      ['Limescale on taps and grout', true, false, false],
      ['No chemical residue', true, true, false],
      ['No scrubbing', true, false, false],
      ['Corners and grilles', true, false, 'Sometimes'],
    ] as const,
    guaranteeTitle: 'Try it for 30 days. If it does not clean, we refund you.',
    guaranteeBody: 'Use it in your real kitchen and bathroom. If you do not notice the difference, write to us and we will collect it. No forms, no arguing.',
    guaranteeCards: [
      { icon: RotateCcw, title: '30 days', desc: 'Full refund' },
      { icon: ShieldCheck, title: '2 years', desc: 'Product warranty' },
      { icon: CreditCard, title: 'Secure payment', desc: 'Stripe · 256-bit SSL' },
    ],
    faqTitle: 'Questions people ask before buying',
    faqs: [
      ['Does it work on induction hobs, marble and tiles?', 'Yes. On induction hobs, tiles, grout, steel, glass and sealed marble. On delicate surfaces, test a small area first and use the nylon brush, not the brass one.'],
      ['Do I need detergent?', 'No. The tank is tap water only. Pressurised steam softens grease and limescale. No detergent means no residue on your hob or mattress.'],
      ['How long does it take to heat up?', 'Between 3 and 5 minutes. The front light tells you when it is ready.'],
      ['Is it safe around children and pets?', 'Steam comes out above 100 °C: keep the unit away from children and never point it at people or animals. The cap has a safety lock and the unit shuts off automatically when empty.'],
      ['Is it heavy? Can I use it one-handed?', 'It is designed for one-handed use. The tank holds 250 ml and the base is 27 × 13 cm, so it fits in any cupboard.'],
      ['What happens when it runs out of water?', 'It shuts off automatically. Let it cool, open the cap carefully and refill.'],
      ['How do shipping and payment work?', 'We ship in 24-72 working hours with tracking. You pay by card in a secure Stripe checkout. We never store your card details.'],
      ['What if I do not like it?', 'You have 30 days from delivery. Write to us, we send you the return address and refund the product price.'],
    ],
    finalTitle: 'A clean home. Without getting on your knees.',
    finalSub: 'Nítida Vapor · 12 accessories · 3 bar · 2-year warranty.',
    add: 'Add to cart',
    added: 'Added',
  },
}

export default function NitidaHome() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const copy = isEs ? COPY.es : COPY.en
  const { add, open } = useCart()
  const [plan, setPlan] = useState(0)
  const selected = PLANS[plan]

  const buy = () => {
    add({ slug: selected.slug, name: selected.qty === 1 ? 'Nítida Vapor' : `Nítida Vapor — Pack ${selected.qty}`, price: selected.price, icon: '' })
    open()
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#14211F]">
      <Header />
      <main className="pb-28 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[620px] w-[980px] -translate-x-1/2 rounded-full bg-[#0F766E]/[0.07] blur-[90px]" />
            <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.04] blur-[70px] hidden lg:block" />
          </div>

          <div className="relative mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F766E] sm:text-[11px]">
                  {copy.eyebrow}
                </p>
                <h1 className="mt-4 text-[clamp(2.55rem,8.2vw,4.8rem)] font-bold leading-[0.92] tracking-[-0.045em] text-[#14211F]">
                  {copy.title1}
                  <br />
                  {copy.title2}
                  <br />
                  <span className="text-[#0F766E]">{copy.title3}</span>
                </h1>
                <p className="mt-5 max-w-[540px] text-[15px] leading-[1.65] text-[#5B6B68] sm:text-[16px]">
                  {copy.sub}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {copy.bullets.map((b) => (
                    <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D6] bg-[#F1EDE5] px-3 py-1.5 text-[11px] font-semibold text-[#3E4F4B]">
                      <Check size={12} className="text-[#0F766E]" />
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-end gap-3">
                  <div className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[#14211F] sm:text-[38px]">{eur(selected.price)}</div>
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
                          <span className="rounded-full bg-[#0F766E] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#FFFFFF]">
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
                    className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#0F766E] px-7 py-4 text-[15px] font-bold text-[#FFFFFF] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B5F58] hover:shadow-[0_12px_32px_rgba(15,118,110,0.18)] active:scale-[0.99]"
                  >
                    {copy.cta} — {eur(selected.price)}
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href="#como-funciona"
                    className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-[#D8D2C7] px-6 py-4 text-[14px] font-medium text-[#3E4F4B] transition hover:border-[#0F766E]/50 hover:text-[#0F766E]"
                  >
                    {copy.secondary}
                  </a>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-[#5B6B68]">{copy.ctaSub}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="relative order-2 lg:order-none"
              >
                <div className="relative overflow-hidden rounded-[26px] border border-[#E5E0D6] bg-[#E6F4EF] shadow-[0_24px_60px_rgba(20,33,31,0.12)]">
                  <ProductImage
                    slug="vapor"
                    color="#E6F4EF"
                    icon=""
                    images={PRODUCT_IMAGES}
                    alt="Nítida Vapor, limpiador de vapor a presión con 12 accesorios"
                    className="aspect-square w-full"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F7F5F0] to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#E5E0D6] bg-white/90 px-3 py-1.5 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E] shadow-[0_0_8px_rgba(15,118,110,0.5)]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">
                      {isEs ? '12 accesorios' : '12 accessories'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                    {[
                      ['3 bar', isEs ? 'presión' : 'pressure'],
                      ['115 °C', isEs ? 'vapor' : 'steam'],
                      ['1.050 W', isEs ? 'potencia' : 'power'],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-[#E5E0D6] bg-white/85 px-2.5 py-2 text-center backdrop-blur-md">
                        <div className="text-[13px] font-bold text-[#14211F]">{k}</div>
                        <div className="text-[9px] uppercase tracking-wide text-[#5B6B68]">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* TRUST */}
            <div className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-14 sm:grid-cols-4 sm:gap-3">
              {copy.trust.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-2.5 rounded-xl border border-[#E5E0D6] bg-[#F7F5F0] px-3 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F766E]/10">
                    <Icon size={14} className="text-[#0F766E]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-[#14211F]">{title}</div>
                    <div className="truncate text-[9px] text-[#5B6B68]">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-[700px]">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#14211F]">
              {copy.problemsTitle}
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#5B6B68] sm:text-[15px]">{copy.problemsSub}</p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {copy.problems.map(({ icon: Icon, title, desc, tag }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: EASE }}
                className="rounded-2xl border border-[#E5E0D6] bg-[#FFFFFF] p-5 transition hover:border-[#0F766E]/30"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]/10">
                    <Icon size={18} className="text-[#0F766E]" />
                  </span>
                  <span className="rounded-full border border-[#E5E0D6] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#5B6B68]">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-bold tracking-[-0.02em] text-[#14211F]">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-[#5B6B68]">{desc}</p>
              </motion.div>
            ))}
            </div>
        </section>

        {/* HOW */}
        <section id="como-funciona" className="border-y border-[#E5E0D6] bg-[#EFEBE3]">
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#14211F]">
                  {copy.howTitle}
                </h2>
                <p className="mt-3 max-w-[430px] text-[14px] leading-[1.7] text-[#5B6B68] sm:text-[15px]">{copy.howSub}</p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#E5E0D6] bg-[#FFFFFF]">
                  <div className="border-b border-[#E5E0D6] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F766E]">
                    {isEs ? 'Lo que pasa por dentro' : 'What happens inside'}
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
                    {[
                      ['250 ml', isEs ? 'agua' : 'water'],
                      ['3-5 min', isEs ? 'calentar' : 'heat-up'],
                      ['3 bar', isEs ? 'presión' : 'pressure'],
                    ].map(([k, v]) => (
                      <div key={k} className="px-3 py-4 text-center">
                        <div className="text-[16px] font-bold text-[#14211F]">{k}</div>
                        <div className="text-[9px] uppercase tracking-wide text-[#5B6B68]">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white">
                  <img
                    src="/images/vapor/vs-gal-limpieza-800.webp"
                    alt={isEs ? 'Nítida Vapor limpiando fogones y juntas de la cocina' : 'Nítida Vapor cleaning hob and kitchen grout'}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {copy.steps.map((s, idx) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 1, x: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                    className="flex gap-4 rounded-2xl border border-[#E5E0D6] bg-[#FFFFFF] p-4 sm:p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0F766E]/25 bg-[#0F766E]/10 text-[12px] font-bold text-[#0F766E]">
                      {s.n}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[15px] font-bold text-[#14211F]">{s.title}</h3>
                        <span className="rounded-full bg-[#F1EDE5] px-2 py-0.5 text-[9px] font-medium text-[#5B6B68]">{s.detail}</span>
                      </div>
                      <p className="mt-1 text-[13px] leading-[1.55] text-[#5B6B68]">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KIT */}
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-[620px]">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#14211F]">
                {copy.kitTitle}
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-[#5B6B68] sm:text-[15px]">{copy.kitSub}</p>
            </div>
            <div className="rounded-full border border-[#0F766E]/20 bg-[#0F766E]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0F766E]">
              {isEs ? 'Todo en la caja' : 'All in the box'}
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-[#E5E0D6] bg-[#F5F0EB]">
              <img
                src="/images/vapor/vs-studio-kit.webp"
                alt={isEs ? 'Los 12 accesorios de Nítida Vapor' : 'The 12 accessories of Nítida Vapor'}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {copy.kit.map(({ icon: Icon, name }, idx) => (
              <motion.div
                key={name}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.03, ease: EASE }}
                className="flex items-center gap-2.5 rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-3 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1EDE5]">
                  <Icon size={14} className="text-[#0F766E]" />
                </span>
                <span className="text-[11px] font-medium leading-tight text-[#3E4F4B]">{name}</span>
              </motion.div>
            ))}
            </div>
          </div>
        </section>

        {/* SPECS + COMPARE */}
        <section className="border-y border-[#E5E0D6] bg-[#EFEBE3]">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h2 className="text-[clamp(1.6rem,3.4vw,2.3rem)] font-bold tracking-[-0.04em] text-[#14211F]">{copy.specsTitle}</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-[#E5E0D6]">
                {copy.specs.map(([k, v], idx) => (
                  <div key={k} className={`flex items-center justify-between gap-4 px-4 py-3 text-[12px] ${idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F4]'}`}>
                    <span className="min-w-0 break-words text-[#5B6B68]">{k}</span>
                    <span className="min-w-0 break-words text-right font-semibold text-[#14211F]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-[clamp(1.6rem,3.4vw,2.3rem)] font-bold tracking-[-0.04em] text-[#14211F]">{copy.compareTitle}</h2>
              <p className="mt-3 text-[13px] leading-[1.6] text-[#5B6B68]">{copy.compareSub}</p>
              <div className="mt-5 max-w-full overflow-x-auto rounded-2xl border border-[#E5E0D6]">
                <table className="w-full min-w-[430px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#FFFFFF]">
                      {copy.compareHead.map((h, i) => (
                        <th key={i} className={`px-3 py-3 text-[9px] font-bold uppercase tracking-[0.08em] ${i === 1 ? 'text-[#0F766E]' : 'text-[#5B6B68]'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {copy.compareRows.map((row, idx) => (
                      <tr key={String(row[0])} className={idx % 2 === 0 ? 'bg-[#FAF8F4]' : 'bg-[#FFFFFF]'}>
                        {row.map((cell, i) => (
                          <td key={i} className="border-t border-[#E5E0D6] px-3 py-2.5 text-[11px] text-[#3E4F4B]">
                            {typeof cell === 'boolean' ? (
                              cell ? <Check size={13} className="text-[#15803D]" /> : <X size={13} className="text-[#5B6B68]" />
                            ) : (
                              <span className={i === 1 ? 'font-semibold text-[#14211F]' : ''}>{cell}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="rounded-[26px] border border-[#E5E0D6] bg-[linear-gradient(135deg,#E6F4EF,#F7F5F0)] p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">{isEs ? 'SIN RIESGO' : 'RISK-FREE'}</p>
                <h2 className="mt-2 text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#14211F]">
                  {copy.guaranteeTitle}
                </h2>
                <p className="mt-3 max-w-[600px] text-[13px] leading-[1.7] text-[#5B6B68] sm:text-[14px]">{copy.guaranteeBody}</p>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {copy.guaranteeCards.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-[#E5E0D6] bg-[#FAF8F4]/80 p-3.5 text-center">
                    <Icon size={17} className="mx-auto text-[#0F766E]" />
                    <div className="mt-2 text-[13px] font-bold text-[#14211F]">{title}</div>
                    <div className="mt-0.5 text-[9px] leading-tight text-[#5B6B68]">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[900px] px-4 pb-14 sm:px-6 sm:pb-20">
          <h2 className="text-[clamp(1.7rem,3.6vw,2.4rem)] font-bold tracking-[-0.04em] text-[#14211F]">{copy.faqTitle}</h2>
          <div className="mt-6 space-y-2">
            {copy.faqs.map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-4 py-3 open:border-[#0F766E]/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13px] font-semibold text-[#14211F] [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown size={15} className="shrink-0 text-[#5B6B68] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2.5 text-[12px] leading-[1.7] text-[#5B6B68]">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="relative overflow-hidden rounded-[26px] border border-[#E5E0D6] bg-[#FFFFFF]">
            <div className="pointer-events-none absolute -right-20 -top-24 h-[360px] w-[360px] rounded-full bg-[#0F766E]/10 blur-[70px]" />
            <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="mx-auto w-full max-w-[280px] lg:max-w-[320px]">
                <ProductImage slug="vapor" color="#E6F4EF" icon="" images={PRODUCT_IMAGES} alt="Nítida Vapor" className="aspect-square w-full rounded-2xl" />
              </div>
              <div>
                <h2 className="text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#14211F]">
                  {copy.finalTitle}
                </h2>
                <p className="mt-2 text-[13px] text-[#5B6B68]">{copy.finalSub}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <div className="text-[30px] font-bold tracking-[-0.04em] text-[#14211F]">{eur(selected.price)}</div>
                  <button
                    onClick={buy}
                    className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#0F766E] px-7 py-3.5 text-[14px] font-bold text-[#FFFFFF] transition-all hover:-translate-y-0.5 hover:bg-[#0B5F58] active:scale-[0.99]"
                  >
                    {copy.cta} — {eur(selected.price)}
                    <ArrowRight size={15} />
                  </button>
                </div>
                <p className="mt-2 text-[10px] text-[#5B6B68]">{copy.ctaSub}</p>
                <Link href={`/${locale}/products/vapor`} className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0F766E] hover:underline">
                  {isEs ? 'Ver la ficha completa' : 'See the full product page'} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E0D6] bg-[#F7F5F0]/95 px-3 py-2.5 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-[520px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#5B6B68]">Nítida Vapor</div>
            <div className="text-[17px] font-bold leading-tight text-[#14211F]">{eur(selected.price)}</div>
          </div>
          <button
            onClick={buy}
            className="inline-flex min-h-[50px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#0F766E] px-5 py-3 text-[13px] font-bold text-[#FFFFFF] active:scale-[0.99]"
          >
            {isEs ? 'Lo quiero' : 'Get it'}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
