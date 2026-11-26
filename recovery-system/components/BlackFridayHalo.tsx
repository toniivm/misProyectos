'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  RotateCcw,
  Shield,
  Truck,
  Volume2,
  VolumeX,
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

export default function BlackFridayHalo() {
  const locale = useLocale()
  const es = locale === 'es'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [sound, setSound] = useState(false)

  const productHref = `/${locale}/products/halo`

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setSound(!v.muted)
    if (!v.muted) v.play().catch(() => {})
  }

  const benefits = es
    ? [
        {
          title: 'Se adapta a tu boca',
          text: '10 mm de micro-ajustes. No es una talla única: se moldea contigo.',
        },
        {
          title: 'Silicona suave, sin BPA',
          text: 'Doble capa de silicona de grado médico. Suave para dormir toda la noche.',
        },
        {
          title: 'Lista en 3 minutos',
          text: 'Agua caliente, muerdes, se enfría. Sin apps, sin citas, sin complicaciones.',
        },
        {
          title: 'Se guarda y se limpia fácil',
          text: 'Estuche de viaje incluido. Se enjuaga y lista para la noche siguiente.',
        },
      ]
    : [
        {
          title: 'Fits your mouth',
          text: '10 mm of micro-adjustments. Not one-size-fits-all: it molds to you.',
        },
        {
          title: 'Soft, BPA-free silicone',
          text: 'Dual-layer medical-grade silicone. Comfortable enough to sleep in.',
        },
        {
          title: 'Ready in 3 minutes',
          text: 'Hot water, bite, cool. No apps, no appointments, no fuss.',
        },
        {
          title: 'Easy to store and clean',
          text: 'Travel case included. Rinse it and it is ready for the next night.',
        },
      ]

  const steps = es
    ? [
        { n: '01', title: 'Hierve', text: 'Sumerge la férula en agua caliente unos segundos.' },
        { n: '02', title: 'Muerde', text: 'La colocas y muerdes suavemente para tomar la forma de tu boca.' },
        { n: '03', title: 'Duerme', text: 'Se enfría, se ajusta y se queda así. Cada noche igual.' },
      ]
    : [
        { n: '01', title: 'Heat', text: 'Dip the mouthguard in hot water for a few seconds.' },
        { n: '02', title: 'Bite', text: 'Place it and bite gently so it takes the shape of your mouth.' },
        { n: '03', title: 'Sleep', text: 'It cools, sets and stays that way. Same fit every night.' },
      ]

  const faqs = es
    ? [
        {
          q: '¿Cuánto tarda en llegar?',
          a: 'Entre 7 y 20 días con seguimiento incluido. Te enviamos el número de seguimiento por email en cuanto sale del almacén.',
        },
        {
          q: '¿Es cómodo para dormir?',
          a: 'Es silicona suave y se ajusta a tu boca. La mayoría necesita 2 o 3 noches para acostumbrarse. Si no te adaptas, tienes 30 noches para devolverlo.',
        },
        {
          q: '¿Cómo lo ajusto?',
          a: 'Hierves agua, sumerges la férula unos segundos, la colocas y muerdes suavemente. Se enfría con la forma de tu boca y se queda así.',
        },
        {
          q: '¿Puedo devolverlo?',
          a: 'Sí. 30 noches de prueba. Si no te convence, lo recogemos y te devolvemos el 100%.',
        },
        {
          q: '¿Sirve para todo el mundo?',
          a: 'No es un dispositivo médico. Si tienes apnea diagnosticada, problemas de mandíbula, brackets o prótesis, consúltalo antes con tu profesional.',
        },
      ]
    : [
        {
          q: 'How long does delivery take?',
          a: 'Between 7 and 20 days with tracking included. We email your tracking number as soon as it leaves the warehouse.',
        },
        {
          q: 'Is it comfortable to sleep in?',
          a: 'It is soft silicone and molds to your mouth. Most people need 2–3 nights to get used to it. If it is not for you, you have 30 nights to return it.',
        },
        {
          q: 'How do I fit it?',
          a: 'Boil water, dip the mouthguard for a few seconds, place it and bite gently. It cools in the shape of your mouth and stays that way.',
        },
        {
          q: 'Can I return it?',
          a: 'Yes. 30-night trial. If it is not for you, we collect it and refund 100%.',
        },
        {
          q: 'Is it for everyone?',
          a: 'It is not a medical device. If you have diagnosed sleep apnoea, jaw problems, braces or dentures, check with your professional first.',
        },
      ]

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      {/* Header mínimo: menos distracción, más conversión */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-4 sm:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <img
              src="/images/logo/logo-compact.webp"
              alt="Noctip"
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
              Noctip
            </span>
          </Link>
          <Link
            href={`/${locale}/shop/all`}
            className="text-[12px] font-semibold text-[#8791a1] transition hover:text-white"
          >
            {es ? 'Ver toda la colección' : 'View the collection'}
          </Link>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#10BFD8]/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#10BFD8]/30 bg-[#10BFD8]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#10BFD8]">
                {es ? 'Black Friday · Halo' : 'Black Friday · Halo'}
              </span>

              <h1 className="mt-5 text-[clamp(2.3rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.05em] text-[#f6f2eb]">
                {es ? (
                  <>
                    Dormir en la misma cama.
                    <br />
                    <span className="text-[#10BFD8]">Otra vez.</span>
                  </>
                ) : (
                  <>
                    Sleep in the same bed.
                    <br />
                    <span className="text-[#10BFD8]">Again.</span>
                  </>
                )}
              </h1>

              <p className="mt-5 max-w-[520px] text-[15px] leading-[1.7] text-[#9aa7b9] sm:text-[16px]">
                {es
                  ? 'Noctip Halo es una férula ajustable que se moldea a tu boca en 3 minutos. 10 mm de micro-ajustes, doble capa de silicona de grado médico y estuche de viaje.'
                  : 'Noctip Halo is an adjustable mouthguard that molds to your mouth in 3 minutes. 10 mm of micro-adjustments, dual-layer medical-grade silicone and a travel case.'}
              </p>

              <ul className="mt-6 space-y-2.5">
                {(es
                  ? ['Ajuste real, no talla única', 'Suave para dormir toda la noche', 'Se limpia en segundos']
                  : ['A real fit, not one-size-fits-all', 'Soft enough to sleep in', 'Cleans in seconds']
                ).map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[13px] text-[#c8d0da]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#10BFD8]/30 bg-[#10BFD8]/10">
                      <Check size={11} className="text-[#10BFD8]" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-end gap-3">
                <span className="text-[34px] font-bold leading-none text-[#f6f2eb]">
                  13,99 €
                </span>
                <span className="text-[16px] text-white/40 line-through">29,99 €</span>
                <span className="rounded-full bg-[#10BFD8]/15 px-2.5 py-1 text-[11px] font-bold text-[#10BFD8]">
                  -53%
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={productHref}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12] shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition-all hover:-translate-y-0.5 hover:bg-[#f2eee7]"
                >
                  {es ? 'Lo quiero — 13,99 €' : 'Get it — €13.99'} <ArrowRight size={15} />
                </Link>
                <span className="text-[12px] leading-[1.5] text-[#6b7785]">
                  {es
                    ? 'Envío gratis · 30 noches de prueba · Pago seguro'
                    : 'Free shipping · 30-night trial · Secure payment'}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Truck, label: es ? 'Envío con seguimiento' : 'Tracked shipping' },
                  { icon: Shield, label: es ? 'Pago Stripe' : 'Stripe payment' },
                  { icon: RotateCcw, label: es ? '30 noches' : '30 nights' },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#b8c4d0]"
                  >
                    <Icon size={12} className="text-[#10BFD8]" /> {label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Vídeo vertical */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mx-auto w-full max-w-[360px]"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
                <div className="relative overflow-hidden rounded-[1.6rem] bg-[#080c12]">
                  <video
                    ref={videoRef}
                    src="/ads/noctip-halo-9x16.mp4"
                    poster="/images/brand/halo-photo-1.jpg"
                    className="aspect-[9/16] w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                    aria-label={sound ? 'Silenciar' : 'Activar sonido'}
                  >
                    {sound ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-[#5a6678]">
                {es ? '18 segundos. Sin humo.' : '18 seconds. No fluff.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="border-y border-white/[0.06] bg-[#0d1219]/50">
          <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-6 sm:py-16">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#10BFD8]">
                {es ? 'Por qué funciona' : 'Why it works'}
              </span>
              <h2 className="mt-2 text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#f6f2eb]">
                {es ? 'No es una talla única. Es tu boca.' : 'It is not one size. It is your mouth.'}
              </h2>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: EASE }}
                  className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5 transition-colors hover:border-white/[0.12]"
                >
                  <h3 className="text-[15px] font-bold text-[#f2eee7]">{b.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#8791a1]">{b.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO SE USA */}
        <section className="mx-auto max-w-[1180px] px-5 py-12 sm:px-6 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#10BFD8]">
                {es ? 'Cómo se usa' : 'How to use'}
              </span>
              <h2 className="mt-2 text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#f6f2eb]">
                {es ? 'Tres minutos. Y ya es tuya.' : 'Three minutes. Then it is yours.'}
              </h2>
              <p className="mt-4 max-w-[460px] text-[14px] leading-[1.7] text-[#9aa7b9]">
                {es
                  ? 'No hay app, no hay configuración y no hay que ir a ningún sitio. Se hace en la cocina, una vez, y se queda así.'
                  : 'No app, no setup, no appointment. You do it once in the kitchen and it stays that way.'}
              </p>

              <div className="mt-7 space-y-4">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.45, ease: EASE }}
                    className="flex gap-4"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#10BFD8]/25 bg-[#10BFD8]/10 text-[12px] font-bold text-[#10BFD8]">
                      {s.n}
                    </span>
                    <div>
                      <div className="text-[15px] font-bold text-[#f2eee7]">{s.title}</div>
                      <p className="mt-1 text-[13px] leading-[1.6] text-[#8791a1]">{s.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0d1219]"
            >
              <img
                src="/images/brand/halo-photo-1.jpg"
                alt={es ? 'Noctip Halo, férula anti-ronquidos' : 'Noctip Halo mouthguard'}
                className="h-full max-h-[460px] w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>

        {/* GARANTÍA */}
        <section className="border-y border-white/[0.06] bg-[#0d1219]/50">
          <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-6 sm:py-16">
            <div className="grid items-center gap-8 rounded-[24px] border border-[#10BFD8]/20 bg-gradient-to-br from-[#0d1219] via-[#0d1219] to-[#0f1a1f] p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#10BFD8]/30 bg-[#10BFD8]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#10BFD8]">
                  <Shield size={12} /> {es ? 'Sin riesgo' : 'Risk-free'}
                </span>
                <h2 className="mt-3 text-[clamp(1.5rem,3.5vw,2.1rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#f6f2eb]">
                  {es ? '30 noches. Si no te convence, te lo recogemos.' : '30 nights. If it is not for you, we collect it.'}
                </h2>
                <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-[#9aa7b9]">
                  {es
                    ? 'Pruébalo en tu cama, con tu pareja, en tu rutina real. Si no notas la diferencia, lo devuelves y te devolvemos el 100%. Sin formularios eternos.'
                    : 'Try it in your bed, with your partner, in your real routine. If you do not notice a difference, send it back and we refund 100%. No endless forms.'}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(es
                    ? ['1. Lo pruebas', '2. Tú decides', '3. Reembolso 100%']
                    : ['1. Try it', '2. You decide', '3. 100% refund']
                  ).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#c8d0da]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <Link
                  href={productHref}
                  className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-bold text-[#080c12] transition hover:bg-[#f2eee7]"
                >
                  {es ? 'Probar 30 noches' : 'Try it for 30 nights'} <ArrowRight size={14} />
                </Link>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-[#080c12] p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#10BFD8]/30 bg-[#10BFD8]/10">
                  <span className="text-[28px] font-bold text-[#10BFD8]">30</span>
                </div>
                <div className="mt-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#f2eee7]">
                  {es ? 'Noches de prueba' : 'Night trial'}
                </div>
                <p className="mt-1 text-[12px] leading-[1.5] text-[#6b7785]">
                  {es ? 'Devolución completa. Recogida incluida.' : 'Full refund. Pickup included.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[820px] px-5 py-12 sm:px-6 sm:py-16">
          <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold tracking-[-0.04em] text-[#f6f2eb]">
            {es ? 'Lo que preguntan antes de comprar' : 'What people ask before buying'}
          </h2>

          <div className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-semibold text-[#f2eee7]">
                  {f.q}
                  <span className="text-[#10BFD8] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#8791a1]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CIERRE */}
        <section className="border-t border-white/[0.06] bg-[#0d1219]/60">
          <div className="mx-auto max-w-[820px] px-5 py-14 text-center sm:px-6 sm:py-20">
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold leading-[1] tracking-[-0.05em] text-[#f6f2eb]">
              {es ? 'Esta noche puede ser distinta.' : 'Tonight can be different.'}
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-[1.7] text-[#9aa7b9]">
              {es
                ? '13,99 €. Estuche incluido. 30 noches para probarlo sin riesgo.'
                : '€13.99. Travel case included. 30 nights to try it risk-free.'}
            </p>
            <Link
              href={productHref}
              className="mt-7 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#10BFD8] px-9 py-4 text-[15px] font-bold text-[#04141a] transition-all hover:-translate-y-0.5 hover:bg-[#3ad4e8]"
            >
              {es ? 'Comprar Noctip Halo' : 'Buy Noctip Halo'} <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-[11px] text-[#5a6678]">
              {es ? 'Envío gratis · 7-20 días con seguimiento · Pago seguro' : 'Free shipping · 7-20 days with tracking · Secure payment'}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-3 px-5 py-6 text-[11px] text-[#5a6678] sm:flex-row sm:px-6">
          <span>© 2026 Noctip™</span>
          <div className="flex gap-4">
            <Link href={`/${locale}/legal/returns`} className="transition hover:text-white">
              {es ? 'Devoluciones' : 'Returns'}
            </Link>
            <Link href={`/${locale}/legal/privacy`} className="transition hover:text-white">
              {es ? 'Privacidad' : 'Privacy'}
            </Link>
            <Link href={`/${locale}/legal/terms`} className="transition hover:text-white">
              {es ? 'Términos' : 'Terms'}
            </Link>
          </div>
        </div>
      </footer>

      {/* CTA fija en móvil */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,18,0.96)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-[520px] items-center gap-3">
          <div className="min-w-0">
            <div className="text-[15px] font-bold leading-none text-[#f2eee7]">13,99 €</div>
            <div className="mt-1 text-[10px] text-[#6b7785]">{es ? 'Envío gratis · 30 noches' : 'Free shipping · 30 nights'}</div>
          </div>
          <Link
            href={productHref}
            className="ml-auto inline-flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#10BFD8] px-5 text-[13px] font-bold text-[#04141a]"
          >
            {es ? 'Comprar' : 'Buy'} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="h-20 lg:hidden" />
    </div>
  )
}
