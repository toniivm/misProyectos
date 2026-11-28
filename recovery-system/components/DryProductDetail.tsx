'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  ArrowRight, Check, ChevronDown, CreditCard, Footprints, PackageOpen,
  PlugZap, RotateCcw, ShieldCheck, Sparkles, Timer, Truck, Wind,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import Header from './Header'

const PLANS = [
  { slug: 'dry', qty: 1, price: 39.99, labelEs: '1 unidad', labelEn: '1 unit', perUnit: '39,99 €', saveEs: '', saveEn: '' },
  { slug: 'dry-duo', qty: 2, price: 69.99, labelEs: '2 unidades', labelEn: '2 units', perUnit: '35,00 €', saveEs: 'Ahorras 9,99 €', saveEn: 'Save €9.99' },
  { slug: 'dry-trio', qty: 3, price: 94.99, labelEs: '3 unidades', labelEn: '3 units', perUnit: '31,66 €', saveEs: 'Ahorras 24,98 €', saveEn: 'Save €24.98' },
]

const eur = (n: number) => n.toFixed(2).replace('.', ',') + ' €'

const PRODUCT_IMAGES = [
  '/images/dry/hero-boots.jpg',
  '/images/dry/studio.jpg',
  '/images/dry/folded.jpg',
  '/images/dry/detail-vents.jpg',
]

const COPY = {
  es: {
    breadcrumb: 'Calzado seco',
    eyebrow: 'NÍTIDA DRY',
    title: 'Zapatos secos y sin olor cada mañana.',
    sub: 'Aire caliente a 360° que seca tus botas y zapatillas por dentro. Temporizador de 3, 6 o 9 horas y apagado automático. Sin radiadores. Sin periódicos.',
    priceNote: 'IVA incluido · Envío gratis',
    add: 'Añadir al carrito',
    buyNow: 'Comprar ahora',
    added: 'Añadido al carrito',
    trust: [
      { icon: Truck, title: 'Envío gratis', sub: 'Con seguimiento' },
      { icon: RotateCcw, title: '30 días', sub: 'Devolución completa' },
      { icon: ShieldCheck, title: '2 años', sub: 'Garantía' },
    ],
    bullets: [
      'Seca el calzado por dentro con aire caliente a 360°',
      'Temporizador de 3, 6 o 9 horas con apagado automático',
      'Dos tubos perforados: llegan a la puntera y al talón',
      '130 W de bajo consumo · se pliega y cabe en un cajón',
      '30 días para probarlo · garantía de 2 años',
    ],
    videoTitle: 'Míralo funcionar',
    videoSub: 'Aire templado y constante por dos tubos perforados. No es un chorro de calor: es circulación.',
    kitTitle: 'Qué incluye la caja',
    kitSub: 'Llega montado. Solo hay que desplegar los brazos y enchufar.',
    kit: [
      { icon: PackageOpen, name: 'Secador Nítida Dry', detail: 'Plegado, listo para usar' },
      { icon: Wind, name: '2 tubos de aire', detail: 'Llegan a la puntera' },
      { icon: Sparkles, name: 'Manual en español', detail: 'Tres pasos, sin líos' },
      { icon: PlugZap, name: 'Cable de 1,2 m', detail: 'Enchufe europeo' },
    ],
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
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      ['¿Cuánto tarda en secar?', 'Con el temporizador en 3 horas, unas zapatillas mojadas quedan secas. Para botas gruesas o muy empapadas, usa 6 o 9 horas. El tiempo depende del material y de la humedad.'],
      ['¿Sirve para botas altas?', 'Sí. Los tubos llegan hasta la puntera y el aire sale por toda la superficie. Para botas muy altas, colócalas con la caña hacia arriba.'],
      ['¿Hace ruido?', 'Es un ventilador suave. Se puede dejar en el recibidor o en el baño por la noche.'],
      ['¿Es seguro dejarlo toda la noche?', 'Sí. Tiene apagado automático al terminar el tiempo y funciona a temperatura constante. No deja el calzado ardiendo.'],
      ['¿Se calienta mucho el calzado?', 'No. El aire es templado y constante, no un chorro de calor fuerte. Por eso vale para cuero, gamuza y tejidos.'],
      ['¿Cómo va el envío y el pago?', 'Preparamos el pedido en 24 horas laborables. La entrega suele tardar entre 3 y 7 días laborables con seguimiento. Pagas con tarjeta, Bizum o PayPal en un checkout seguro de Stripe.'],
      ['¿Y si no me convence?', 'Tienes 30 días desde la entrega. Nos escribes, te damos la dirección de devolución y te devolvemos el importe del producto.'],
    ],
    guaranteeTitle: '30 días para probarlo. 2 años de garantía.',
    guaranteeSub: 'Si no seca como esperabas, lo recogemos y te devolvemos el dinero.',
    reviewsNote: 'Producto nuevo. Aún no hay reseñas: las que veas aquí serán de compras reales.',
  },
  en: {
    breadcrumb: 'Dry footwear',
    eyebrow: 'NÍTIDA DRY',
    title: 'Dry, odour-free shoes every morning.',
    sub: '360° warm air that dries your boots and trainers from the inside. 3, 6 or 9-hour timer and automatic shut-off. No radiators. No newspaper.',
    priceNote: 'VAT included · Free shipping',
    add: 'Add to cart',
    buyNow: 'Buy now',
    added: 'Added to cart',
    trust: [
      { icon: Truck, title: 'Free shipping', sub: 'Tracked delivery' },
      { icon: RotateCcw, title: '30 days', sub: 'Full refund' },
      { icon: ShieldCheck, title: '2 years', sub: 'Warranty' },
    ],
    bullets: [
      'Dries footwear from the inside with 360° warm air',
      '3, 6 or 9-hour timer with automatic shut-off',
      'Two perforated tubes reach the toe and the heel',
      'Low 130 W consumption · folds flat into a drawer',
      '30 days to try it · 2-year warranty',
    ],
    videoTitle: 'Watch it work',
    videoSub: 'Gentle, constant warm air through two perforated tubes. Not a blast of heat: circulation.',
    kitTitle: 'What is in the box',
    kitSub: 'It arrives assembled. Just unfold the arms and plug it in.',
    kit: [
      { icon: PackageOpen, name: 'Nítida Dry dryer', detail: 'Folded, ready to use' },
      { icon: Wind, name: '2 air tubes', detail: 'Reach the toe' },
      { icon: Sparkles, name: 'Manual in Spanish', detail: 'Three steps, no fuss' },
      { icon: PlugZap, name: '1.2 m cable', detail: 'EU plug' },
    ],
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
    faqTitle: 'FAQ',
    faqs: [
      ['How long does it take to dry?', 'With the 3-hour timer, wet trainers are dry. For thick or soaked boots, use 6 or 9 hours. Time depends on the material and the dampness.'],
      ['Does it work with tall boots?', 'Yes. The tubes reach the toe and air comes out along the whole surface. For very tall boots, place them with the shaft up.'],
      ['Is it noisy?', 'It is a gentle fan. You can leave it in the hallway or bathroom overnight.'],
      ['Is it safe to leave on all night?', 'Yes. It switches off automatically when the timer ends and runs at a constant temperature. It does not leave footwear burning hot.'],
      ['Does it get the shoes very hot?', 'No. The air is warm and constant, not a blast of heat. That is why it is suitable for leather, suede and fabrics.'],
      ['How do shipping and payment work?', 'We prepare the order within 24 working hours. Delivery usually takes 3 to 7 working days with tracking. Pay by card, Bizum or PayPal in a secure Stripe checkout.'],
      ['What if I do not like it?', 'You have 30 days from delivery. Write to us, we send you the return address and refund the product price.'],
    ],
    guaranteeTitle: '30 days to try it. 2-year warranty.',
    guaranteeSub: 'If it does not dry as expected, we collect it and refund you.',
    reviewsNote: 'New product. No reviews yet: any you see here will come from real purchases.',
  },
}

export default function DryProductDetail() {
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
      name: selected.qty === 1 ? 'Nítida Dry' : `Nítida Dry — Pack ${selected.qty}`,
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
              <div className="relative overflow-hidden rounded-[24px] border border-[#E5E0D6] bg-[#F3E7D7]">
                <img
                  src={PRODUCT_IMAGES[activeImg]}
                  alt={isEs ? 'Nítida Dry, secador de calzado con dos tubos de aire' : 'Nítida Dry, footwear dryer with two air tubes'}
                  className="aspect-[4/5] w-full object-contain sm:aspect-square"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0F766E] backdrop-blur-md">
                  {isEs ? 'Llega montado' : 'Arrives assembled'}
                </div>
              </div>

              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {PRODUCT_IMAGES.map((src, idx) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(idx)}
                    className={`overflow-hidden rounded-lg border bg-white transition ${activeImg === idx ? 'border-[#0F766E]' : 'border-[#E5E0D6] hover:border-[#0F766E]/50'}`}
                    aria-label={`${isEs ? 'Ver imagen' : 'View image'} ${idx + 1}`}
                  >
                    <img src={src} alt="" className="aspect-square w-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {[
                  ['3/6/9 h', isEs ? 'temporizador' : 'timer'],
                  ['130 W', isEs ? 'consumo' : 'power'],
                  ['360°', isEs ? 'aire' : 'air'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-[#E5E0D6] bg-white px-3 py-3 text-center">
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

              <div className="mt-3 space-y-2">
                <button
                  onClick={() => addToCart(false)}
                  className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 py-4 text-[15px] font-bold text-white transition-all hover:bg-[#0B5F58] active:scale-[0.99]"
                >
                  {added ? <Check size={16} /> : null}
                  {added ? copy.added : copy.add}
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

          {/* VIDEO */}
          <section className="mt-12 sm:mt-16">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="overflow-hidden rounded-[24px] border border-[#E5E0D6] bg-[#0F2B27]">
                <video
                  className="aspect-video w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/dry/studio.jpg"
                  aria-label={isEs ? 'Nítida Dry funcionando' : 'Nítida Dry in use'}
                >
                  <source src="/videos/dry-loop-wide.mp4" type="video/mp4" />
                </video>
              </div>
              <div>
                <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#14211F] sm:text-[26px]">{copy.videoTitle}</h2>
                <p className="mt-2 max-w-[420px] text-[13px] leading-[1.7] text-[#5B6B68]">{copy.videoSub}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[isEs ? 'Aire 360°' : '360° air', isEs ? 'Se apaga solo' : 'Auto shut-off', isEs ? 'Se pliega' : 'Folds flat'].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D6] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#3E4F4B]">
                      <Check size={11} className="text-[#0F766E]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* KIT */}
          <section className="mt-12 sm:mt-16">
            <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#14211F] sm:text-[26px]">{copy.kitTitle}</h2>
            <p className="mt-1 text-[12px] text-[#5B6B68]">{copy.kitSub}</p>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {copy.kit.map(({ icon: Icon, name, detail }) => (
                <div key={name} className="flex items-center gap-2.5 rounded-xl border border-[#E5E0D6] bg-white px-3 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F766E]/10">
                    <Icon size={14} className="text-[#0F766E]" />
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold text-[#14211F]">{name}</div>
                    <div className="text-[9px] text-[#5B6B68]">{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SPECS + FAQ */}
          <section className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="min-w-0">
              <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#14211F] sm:text-[26px]">{copy.specsTitle}</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#E5E0D6]">
                {copy.specs.map(([k, v], idx) => (
                  <div key={k} className={`flex items-center justify-between gap-4 px-4 py-3 text-[12px] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]'}`}>
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
                  <details key={q} className="group rounded-xl border border-[#E5E0D6] bg-white px-4 py-3 open:border-[#0F766E]/30">
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
          <section className="mt-10 rounded-2xl border border-[#E5E0D6] bg-[linear-gradient(135deg,#F3E7D7,#F7F5F0)] p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F766E]/15">
                <ShieldCheck size={20} className="text-[#0F766E]" />
              </div>
              <div className="min-w-[220px] flex-1">
                <div className="text-[14px] font-bold text-[#14211F]">{copy.guaranteeTitle}</div>
                <div className="mt-0.5 text-[11px] text-[#5B6B68]">{copy.guaranteeSub}</div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#E5E0D6] px-3 py-1.5 text-[10px] text-[#3E4F4B]">
                <CreditCard size={12} className="text-[#0F766E]" /> Stripe · SSL
              </div>
            </div>
          </section>

          <p className="mt-4 text-[11px] leading-relaxed text-[#5B6B68]">{copy.reviewsNote}</p>
        </div>
      </main>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E0D6] bg-[#F7F5F0]/95 px-3 py-2.5 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-[520px] items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#5B6B68]">Nítida Dry</div>
            <div className="text-[17px] font-bold leading-tight text-[#14211F]">{eur(selected.price)}</div>
          </div>
          <button
            onClick={() => addToCart(false)}
            className="inline-flex min-h-[50px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#0F766E] px-5 py-3 text-[13px] font-bold text-white active:scale-[0.99]"
          >
            {isEs ? 'Añadir' : 'Add'}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
