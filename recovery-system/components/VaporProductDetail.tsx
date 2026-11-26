'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ArrowRight, Brush, Check, ChevronDown, Circle, CornerDownRight,
  CreditCard, Droplets, Maximize2, Package, RotateCcw,
  ShieldCheck, Sparkles, Square, Timer, Truck, Waves, Wind,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import Header from './Header'
import ProductImage from './ProductImage'

const PRICE = 39.99
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
    breadcrumb: 'Limpieza sin frotar',
    eyebrow: 'NÍTIDA VAPOR',
    title: 'La grasa y la cal se derriten. Tú no.',
    sub: 'Limpiador de vapor a presión con 12 accesorios. Cocina, baño, juntas, mamparas y tapicería. Solo agua del grifo.',
    price: '39,99 €',
    priceNote: 'IVA incluido · Envío gratis',
    qty: 'Cantidad',
    add: 'Añadir al carrito',
    buyNow: 'Comprar ahora',
    trust: [
      { icon: Truck, title: 'Envío 24-72 h', sub: 'Con seguimiento' },
      { icon: RotateCcw, title: '30 días', sub: 'Devolución completa' },
      { icon: ShieldCheck, title: '2 años', sub: 'Garantía' },
    ],
    bullets: [
      '12 accesorios para cocina, baño, cristales y tapicería',
      '3 bar de presión y hasta 115 °C: sin frotar',
      'Solo agua del grifo, sin detergentes',
      'Listo en 3-5 minutos · depósito de 350 ml',
      'Apagado automático y tapa de seguridad',
    ],
    kitTitle: 'Qué incluye la caja',
    kit: [
      'Vaso medidor', 'Embudo', 'Paño para cabezal',
      'Cepillo de nailon ×3', 'Cepillo de latón', 'Boquilla recta',
      'Boquilla angular', 'Manguera flexible', 'Cabezal grande',
      'Rasqueta para cristales', 'Manual de uso', 'Caja lista para usar',
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
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      ['¿Funciona en vitrocerámica, mármol y azulejos?', 'Sí. En vitrocerámica, azulejos, juntas, acero, cristal y mármol sellado. En superficies delicadas, prueba primero en una zona pequeña y usa el cepillo de nailon, no el de latón.'],
      ['¿Necesito detergente?', 'No. El depósito es solo agua del grifo. El vapor a presión ablanda la grasa y la cal. Sin detergente no quedan restos en la vitro ni en el colchón.'],
      ['¿Cuánto tarda en calentarse?', 'Entre 3 y 5 minutos. La luz del frontal te avisa cuando está listo.'],
      ['¿Es seguro con niños y mascotas?', 'El vapor sale a más de 100 °C: mantén el aparato fuera del alcance de los niños y no lo apuntes a personas o animales. La tapa tiene cierre de seguridad y se apaga solo cuando se queda sin agua.'],
      ['¿Cómo va el envío y el pago?', 'Enviamos en 24-72 h laborables con seguimiento. Pagas con tarjeta en un checkout seguro de Stripe. No guardamos los datos de tu tarjeta.'],
      ['¿Y si no me convence?', 'Tienes 30 días desde la entrega. Nos escribes, te damos la dirección de devolución y te devolvemos el importe del producto.'],
    ],
  },
  en: {
    breadcrumb: 'Clean without scrubbing',
    eyebrow: 'NÍTIDA VAPOR',
    title: 'Grease and limescale melt away. You don’t.',
    sub: 'Pressurised steam cleaner with 12 accessories. Kitchen, bathroom, grout, shower screens and upholstery. Tap water only.',
    price: '€39.99',
    priceNote: 'VAT included · Free shipping',
    qty: 'Quantity',
    add: 'Add to cart',
    buyNow: 'Buy now',
    trust: [
      { icon: Truck, title: '24-72 h shipping', sub: 'Tracked delivery' },
      { icon: RotateCcw, title: '30 days', sub: 'Full refund' },
      { icon: ShieldCheck, title: '2 years', sub: 'Warranty' },
    ],
    bullets: [
      '12 accessories for kitchen, bathroom, glass and upholstery',
      '3 bar and up to 115 °C: no scrubbing',
      'Tap water only, no detergents',
      'Ready in 3-5 minutes · 350 ml tank',
      'Auto shut-off and safety cap',
    ],
    kitTitle: 'What is in the box',
    kit: [
      'Measuring cup', 'Funnel', 'Cloth head pad',
      'Nylon brush ×3', 'Brass brush', 'Straight nozzle',
      'Angled nozzle', 'Flexible hose', 'Large head',
      'Glass scraper', 'User manual', 'Ready-to-use box',
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
    faqTitle: 'FAQ',
    faqs: [
      ['Does it work on induction hobs, marble and tiles?', 'Yes. On induction hobs, tiles, grout, steel, glass and sealed marble. On delicate surfaces, test a small area first and use the nylon brush, not the brass one.'],
      ['Do I need detergent?', 'No. The tank is tap water only. Pressurised steam softens grease and limescale. No detergent means no residue on your hob or mattress.'],
      ['How long does it take to heat up?', 'Between 3 and 5 minutes. The front light tells you when it is ready.'],
      ['Is it safe around children and pets?', 'Steam comes out above 100 °C: keep the unit away from children and never point it at people or animals. The cap has a safety lock and the unit shuts off automatically when empty.'],
      ['How do shipping and payment work?', 'We ship in 24-72 working hours with tracking. You pay by card in a secure Stripe checkout. We never store your card details.'],
      ['What if I do not like it?', 'You have 30 days from delivery. Write to us, we send you the return address and refund the product price.'],
    ],
  },
}

const KIT_ICONS = [Droplets, Circle, Square, Brush, Sparkles, ArrowRight, CornerDownRight, Waves, Maximize2, Wind, Package, Timer]

export default function VaporProductDetail() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const copy = isEs ? COPY.es : COPY.en
  const { add, open } = useCart()
  const [plan, setPlan] = useState(0)
  const selected = PLANS[plan]
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  const addToCart = (goCheckout = false) => {
    add({
      slug: selected.slug,
      name: selected.qty === 1 ? 'Nítida Vapor' : `Nítida Vapor — Pack ${selected.qty}`,
      price: selected.price,
      icon: '',
    })
    setAdded(true)
    open()
    window.setTimeout(() => setAdded(false), 2200)
    if (goCheckout) {
      window.setTimeout(() => { window.location.href = `/${locale}/checkout` }, 350)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#14211F]">
      <Header showBackButton backLabel={isEs ? 'Volver' : 'Back'} backHref={`/${locale}`} />
      <main className="pb-28 lg:pb-0">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-10">
          <nav className="flex items-center gap-2 text-[11px] text-[#5B6B68]">
            <Link href={`/${locale}`} className="hover:text-[#0F766E]">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <span className="text-[#5B6B68]">{copy.breadcrumb}</span>
          </nav>

          <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            <div>
              <div className="overflow-hidden rounded-[24px] border border-[#E5E0D6] bg-[#E6F4EF]">
                <ProductImage
                  slug="vapor"
                  color="#E6F4EF"
                  icon=""
                  images={PRODUCT_IMAGES}
                  activeIndex={activeImg}
                  alt="Nítida Vapor, limpiador de vapor a presión con 12 accesorios"
                  className="aspect-square w-full"
                />
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {PRODUCT_IMAGES.map((src, idx) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(idx)}
                    className={`overflow-hidden rounded-lg border bg-[#F5F0EB] transition ${activeImg === idx ? 'border-[#0F766E]' : 'border-[#E5E0D6] hover:border-[#0F766E]/50'}`}
                    aria-label={`${isEs ? 'Ver imagen' : 'View image'} ${idx + 1}`}
                  >
                    <img src={src} alt="" className="aspect-square w-full object-contain p-1" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {[
                  ['3 bar', isEs ? 'presión' : 'pressure'],
                  ['115 °C', isEs ? 'vapor' : 'steam'],
                  ['12', isEs ? 'accesorios' : 'accessories'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-3 py-3 text-center">
                    <div className="text-[15px] font-bold text-[#14211F]">{k}</div>
                    <div className="text-[9px] uppercase tracking-wide text-[#5B6B68]">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0F766E]">{copy.eyebrow}</p>
              <h1 className="mt-2 text-[clamp(1.9rem,4.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.045em] text-[#14211F]">
                {copy.title}
              </h1>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#5B6B68]">{copy.sub}</p>

              <div className="mt-5 flex items-end gap-2">
                <div className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[#14211F]">{eur(selected.price)}</div>
                <div className="pb-1 text-[11px] text-[#5B6B68]">{copy.priceNote}</div>
              </div>

              <ul className="mt-5 space-y-2">
                {copy.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-[#3E4F4B]">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#0F766E]" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
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

              <div className="mt-3 space-y-2">
                <button
                  onClick={() => addToCart(false)}
                  className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 py-4 text-[15px] font-bold text-[#FFFFFF] transition-all hover:bg-[#0B5F58] active:scale-[0.99]"
                >
                  {added ? <Check size={16} /> : null}
                  {added ? (isEs ? 'Añadido al carrito' : 'Added to cart') : copy.add}
                  {!added && <ArrowRight size={16} />}
                </button>
                <button
                  onClick={() => addToCart(true)}
                  className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-[#D8D2C7] px-6 py-3.5 text-[13px] font-semibold text-[#3E4F4B] transition hover:border-[#0F766E]/50 hover:text-[#0F766E]"
                >
                  {copy.buyNow}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {copy.trust.map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="rounded-xl border border-[#E5E0D6] bg-[#FAF8F4] px-2.5 py-2.5 text-center">
                    <Icon size={15} className="mx-auto text-[#0F766E]" />
                    <div className="mt-1 text-[10px] font-semibold text-[#14211F]">{title}</div>
                    <div className="text-[8px] text-[#5B6B68]">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KIT */}
          <section className="mt-12 sm:mt-16">
            <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#14211F] sm:text-[26px]">{copy.kitTitle}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {copy.kit.map((name, idx) => {
                const Icon = KIT_ICONS[idx] ?? Package
                return (
                  <div key={name} className="flex items-center gap-2.5 rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-3 py-3">
                    <Icon size={14} className="shrink-0 text-[#0F766E]" />
                    <span className="text-[11px] text-[#3E4F4B]">{name}</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* SPECS */}
          <section className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="min-w-0">
              <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#14211F] sm:text-[26px]">{copy.specsTitle}</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#E5E0D6]">
                {copy.specs.map(([k, v], idx) => (
                  <div key={k} className={`flex items-center justify-between gap-4 px-4 py-3 text-[12px] ${idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F4]'}`}>
                    <span className="min-w-0 break-words text-[#5B6B68]">{k}</span>
                    <span className="min-w-0 break-words text-right font-semibold text-[#14211F]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#14211F] sm:text-[26px]">{copy.faqTitle}</h2>
              <div className="mt-4 space-y-2">
                {copy.faqs.map(([q, a]) => (
                  <details key={q} className="group rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-4 py-3 open:border-[#0F766E]/30">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[12.5px] font-semibold text-[#14211F] [&::-webkit-details-marker]:hidden">
                      {q}
                      <ChevronDown size={14} className="shrink-0 text-[#5B6B68] transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-2.5 text-[12px] leading-[1.65] text-[#5B6B68]">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* GUARANTEE */}
          <section className="mt-10 rounded-2xl border border-[#E5E0D6] bg-[linear-gradient(135deg,#E6F4EF,#F7F5F0)] p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F766E]/15">
                <ShieldCheck size={20} className="text-[#0F766E]" />
              </div>
              <div className="min-w-[220px] flex-1">
                <div className="text-[14px] font-bold text-[#14211F]">{isEs ? '30 días para probarlo. 2 años de garantía.' : '30 days to try it. 2-year warranty.'}</div>
                <div className="mt-0.5 text-[11px] text-[#5B6B68]">{isEs ? 'Si no limpia como esperabas, lo recogemos y te devolvemos el dinero.' : 'If it does not clean as expected, we collect it and refund you.'}</div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#E5E0D6] px-3 py-1.5 text-[10px] text-[#3E4F4B]">
                <CreditCard size={12} className="text-[#0F766E]" /> Stripe · SSL
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E0D6] bg-[#F7F5F0]/95 px-3 py-2.5 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-[520px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#5B6B68]">Nítida Vapor</div>
            <div className="text-[17px] font-bold leading-tight text-[#14211F]">{eur(selected.price)}</div>
          </div>
          <button
            onClick={() => addToCart(false)}
            className="inline-flex min-h-[50px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#0F766E] px-5 py-3 text-[13px] font-bold text-[#FFFFFF] active:scale-[0.99]"
          >
            {isEs ? 'Añadir' : 'Add'}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
