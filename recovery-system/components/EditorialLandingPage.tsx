'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Check,
  Moon,
  Package,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react'

type ArtworkProps = {
  className?: string
}

type Product = {
  id: 'pulse' | 'cerviflex' | 'sleepseal'
  label: string
  name: string
  category: string
  preview: string
  description: string
  highlights: string[]
  chips: string[]
  price: string
  comparePrice: string
  review: string
  reviewer: string
  savings: string
  Artwork: ({ className }: ArtworkProps) => JSX.Element
}

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-120px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">{children}</div>
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#97a4b5]">
      {children}
    </span>
  )
}

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-8 w-8 grid-cols-2 gap-1 rounded-[10px] border border-white/10 bg-white/[0.03] p-1">
        <span className="rounded-[4px] bg-[#cfd8e6]" />
        <span className="rounded-[4px] bg-[#8da3c4]" />
        <span className="rounded-[4px] bg-[#7186a4]" />
        <span className="rounded-[4px] bg-[#d8d0c4]" />
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2eee7]">
          Recovery System
        </div>
        <div className="text-[10px] tracking-[0.18em] text-[#7c8798]">Wellness ritual</div>
      </div>
    </div>
  )
}

function MassageGunArt({ className }: ArtworkProps) {
  return (
    <svg viewBox="0 0 220 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="gun-body" x1="44" y1="26" x2="172" y2="284" gradientUnits="userSpaceOnUse">
          <stop stopColor="#222c39" />
          <stop offset="1" stopColor="#111720" />
        </linearGradient>
        <linearGradient id="gun-accent" x1="76" y1="40" x2="144" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9D5E7" />
          <stop offset="1" stopColor="#8EA7C7" />
        </linearGradient>
      </defs>
      <rect x="86" y="142" width="48" height="128" rx="20" fill="url(#gun-body)" stroke="rgba(255,255,255,0.08)" />
      <rect x="54" y="66" width="112" height="94" rx="24" fill="url(#gun-body)" stroke="rgba(255,255,255,0.08)" />
      <rect x="96" y="40" width="28" height="28" rx="10" fill="#17212e" stroke="rgba(255,255,255,0.08)" />
      <circle cx="110" cy="28" r="18" fill="url(#gun-accent)" />
      <circle cx="110" cy="112" r="22" fill="#0f151d" stroke="rgba(255,255,255,0.08)" />
      <circle cx="110" cy="112" r="10" fill="#90a6c4" opacity="0.55" />
      <rect x="72" y="80" width="40" height="18" rx="6" fill="#0f151d" stroke="rgba(255,255,255,0.06)" />
      <rect x="72" y="150" width="76" height="4" rx="2" fill="#8199ba" opacity="0.8" />
      {[168, 180, 192, 204, 216, 228].map((lineY) => (
        <rect key={lineY} x="92" y={lineY} width="36" height="2" rx="1" fill="rgba(255,255,255,0.06)" />
      ))}
    </svg>
  )
}

function NeckMassagerArt({ className }: ArtworkProps) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="neck-body" x1="24" y1="28" x2="208" y2="212" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25303E" />
          <stop offset="1" stopColor="#111720" />
        </linearGradient>
      </defs>
      <path
        d="M48 40V146C48 187 78 214 120 214C162 214 192 187 192 146V40"
        stroke="url(#neck-body)"
        strokeWidth="38"
        strokeLinecap="round"
      />
      <path
        d="M48 40V146C48 187 78 214 120 214C162 214 192 187 192 146V40"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="40"
        strokeLinecap="round"
      />
      {[48, 82, 118, 156, 192].map((x) => (
        <circle key={x} cx={x} cy={x < 120 ? 62 : 178} r="8" fill="#A3B7CF" opacity="0.6" />
      ))}
      <rect x="104" y="22" width="32" height="22" rx="8" fill="#10161E" stroke="rgba(255,255,255,0.08)" />
    </svg>
  )
}

function SleepSealArt({ className }: ArtworkProps) {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="seal-body" x1="28" y1="80" x2="252" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1B2431" />
          <stop offset="0.5" stopColor="#273242" />
          <stop offset="1" stopColor="#171E28" />
        </linearGradient>
      </defs>
      <rect x="32" y="54" width="216" height="52" rx="26" fill="url(#seal-body)" stroke="rgba(255,255,255,0.08)" />
      {[96, 118, 140, 162, 184].map((x) => (
        <ellipse key={x} cx={x} cy="80" rx="8" ry="6" fill="#0E141B" stroke="rgba(255,255,255,0.06)" />
      ))}
      <rect x="46" y="77" width="188" height="3" rx="1.5" fill="#A3B7CF" opacity="0.45" />
      <ellipse cx="32" cy="80" rx="16" ry="26" fill="#1A212C" stroke="rgba(255,255,255,0.08)" />
      <ellipse cx="248" cy="80" rx="16" ry="26" fill="#1A212C" stroke="rgba(255,255,255,0.08)" />
    </svg>
  )
}

const products: Product[] = [
  {
    id: 'pulse',
    label: 'Deep tissue relief',
    name: 'Pulse Pro X',
    category: 'Quiet percussion massage gun',
    preview: 'For sore legs, lower back tension and post-training muscle release.',
    description:
      'A compact percussion tool with studio-level depth, a calm acoustic profile and enough control to fit into a nightly ritual instead of screaming “fitness gadget”.',
    highlights: ['16 mm deep tissue reach', 'Six quiet intensity levels', 'Brushless motor under 45 dB'],
    chips: ['Post-training', 'Desk recovery', 'Deep release'],
    price: '€89',
    comparePrice: '€149',
    review: 'Feels closer to premium studio equipment than a gym accessory.',
    reviewer: 'Marcus, endurance athlete',
    savings: 'Save 40%',
    Artwork: MassageGunArt,
  },
  {
    id: 'cerviflex',
    label: 'Neck decompression',
    name: 'CerviFlex',
    category: 'Cervical relief massager',
    preview: 'For long desk days, shoulder tightness and a quieter evening reset.',
    description:
      'A soft-touch cervical massager that reduces tension without looking clinical. Designed for daily decompression after screens, commuting and posture-heavy routines.',
    highlights: ['Three gentle massage modes', 'Heat-assisted relaxation', 'Light enough for every night use'],
    chips: ['Neck relief', 'Shoulders', 'Posture reset'],
    price: '€59',
    comparePrice: '€99',
    review: 'The first neck tool that feels elegant enough to leave out at home.',
    reviewer: 'Sofia, product designer',
    savings: 'Save 40%',
    Artwork: NeckMassagerArt,
  },
  {
    id: 'sleepseal',
    label: 'Sleep optimization',
    name: 'SleepSeal',
    category: 'Night breathing support',
    preview: 'For deeper nights, quieter breathing and less fragmented sleep.',
    description:
      'A low-profile breathing aid designed to support nasal breathing and a calmer sleep routine. Functional, discreet and intentionally minimal in the bedroom.',
    highlights: ['30-night starter pack', 'Soft-touch hypoallergenic material', 'Designed for nightly consistency'],
    chips: ['Night routine', 'Breathing', 'Deeper sleep'],
    price: '€29',
    comparePrice: '€49',
    review: 'Small enough to disappear visually, noticeable enough to stay in the routine.',
    reviewer: 'James, founder',
    savings: 'Save 41%',
    Artwork: SleepSealArt,
  },
]

const trustItems = [
  { icon: ShieldCheck, title: '30-night guarantee', body: 'Try the ritual at home with low friction.' },
  { icon: Truck, title: 'Free shipping', body: 'Fast delivery on every bundle.' },
  { icon: Star, title: 'Trusted by athletes', body: '4.9 average rating across the system.' },
]

const detailCards = [
  {
    title: 'Designed to feel at home',
    body: 'Materials, proportions and color choices were treated like objects you want visible in your space.',
  },
  {
    title: 'A quiet ritual, not a gadget stack',
    body: 'The system is structured to move from muscle relief to cervical downshift to deeper sleep without sensory overload.',
  },
  {
    title: 'Premium enough to trust, simple enough to repeat',
    body: 'Clear protocols, lower visual noise and enough proof to remove purchase hesitation without turning the page into a banner farm.',
  },
]

const reviews = [
  {
    quote:
      'I wanted recovery products that worked but did not make my bedroom feel like a sports lab. This is the first system that gets both right.',
    author: 'Elena V.',
    role: 'Night-shift nurse',
  },
  {
    quote:
      'The ritual feels expensive in the right way: restrained, useful and easy to come back to every night.',
    author: 'Daniel K.',
    role: 'Founder and runner',
  },
  {
    quote:
      'The massage gun does the heavy lifting, the neck unit calms me down, and SleepSeal finishes the job. The flow makes sense.',
    author: 'Nora S.',
    role: 'Strength coach',
  },
]

const bundles = [
  {
    name: 'Starter',
    price: '€89',
    comparePrice: '€149',
    badge: 'Entry ritual',
    highlight: false,
    items: ['Pulse Pro X', 'Six intensity levels', 'USB-C charging', '30-night guarantee'],
    cta: 'Choose Starter',
  },
  {
    name: 'Complete',
    price: '€148',
    comparePrice: '€248',
    badge: 'Recommended',
    highlight: true,
    items: ['Pulse Pro X', 'CerviFlex', 'Free shipping', 'Priority support'],
    cta: 'Choose Complete',
  },
  {
    name: 'Full Ritual',
    price: '€177',
    comparePrice: '€297',
    badge: 'Best value',
    highlight: false,
    items: ['Pulse Pro X', 'CerviFlex', 'SleepSeal 30-night pack', 'Express shipping'],
    cta: 'Choose Full Ritual',
  },
]

export default function EditorialLandingPage() {
  const [activeProduct, setActiveProduct] = useState<Product['id']>('pulse')
  const currentProduct = products.find((product) => product.id === activeProduct) ?? products[0]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c1016] text-[#f4f1ea]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-[720px]"
          style={{
            background:
              'radial-gradient(circle at 18% 10%, rgba(144,166,196,0.16), transparent 28%), radial-gradient(circle at 84% 4%, rgba(242,238,231,0.07), transparent 22%), linear-gradient(180deg, rgba(8,12,18,0.94) 0%, rgba(12,16,22,1) 78%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.85) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.45), transparent 75%)',
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <Container>
          <div className="flex items-center justify-between rounded-[22px] border border-white/8 bg-[rgba(12,16,22,0.72)] px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:px-5">
            <LogoMark />

            <nav className="hidden items-center gap-8 md:flex">
              {[
                { label: 'System', href: '#system' },
                { label: 'Ritual', href: '#ritual' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Pricing', href: '#pricing' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[12px] font-medium tracking-[0.18em] text-[#8d97a6] transition-colors duration-300 hover:text-[#f4f1ea]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#pricing"
              className="inline-flex items-center rounded-full border border-[#f2eee7]/70 bg-[#f2eee7] px-4 py-2 text-[12px] font-semibold tracking-[0.06em] text-[#131922] transition-transform duration-300 hover:-translate-y-[1px]"
            >
              Build your ritual
            </a>
          </div>
        </Container>
      </header>

      <main className="relative z-10 pb-28 pt-28 sm:pt-32 lg:pb-36 lg:pt-36">
        <section>
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14">
              <motion.div {...reveal}>
                <SectionEyebrow>Wellness premium, rethought</SectionEyebrow>
                <h1 className="mt-6 max-w-[10ch] text-[clamp(3rem,7vw,5.6rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#f6f2eb]">
                  Recover better. Sleep deeper. Perform clearer.
                </h1>
                <p className="mt-6 max-w-[36rem] text-[1rem] leading-8 text-[#a3adba] lg:text-[1.08rem]">
                  A calm three-step ritual for muscle relief, cervical decompression and deeper nights.
                  Designed to feel premium in your home and serious in daily use.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-5 py-3 text-[14px] font-semibold text-[#11161d] transition-transform duration-300 hover:-translate-y-[1px]"
                  >
                    Build your ritual
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#system"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[14px] font-medium text-[#d1d8e2] transition-colors duration-300 hover:border-white/20 hover:text-white"
                  >
                    See the system
                  </a>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {trustItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.title}
                        className="rounded-[20px] border border-white/8 bg-white/[0.025] px-4 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                      >
                        <Icon size={15} className="text-[#b7c6d9]" />
                        <div className="mt-3 text-[13px] font-medium text-[#f2eee7]">{item.title}</div>
                        <div className="mt-1 text-[12px] leading-6 text-[#8791a1]">{item.body}</div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div {...reveal} className="lg:pl-4">
                <div className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-5">
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
                    <div className="relative min-h-[380px] overflow-hidden rounded-[28px] border border-white/8 bg-[#111720] p-6 sm:min-h-[460px] sm:p-8">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'radial-gradient(circle at 50% 26%, rgba(141,163,196,0.18), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
                        }}
                      />
                      <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-[#9aa7b9]">
                        Hero product
                      </div>
                      <div className="relative flex h-full items-center justify-center">
                        <MassageGunArt className="h-[78%] w-auto max-w-[290px]" />
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                        <div>
                          <div className="text-[12px] uppercase tracking-[0.2em] text-[#8f9caf]">Pulse Pro X</div>
                          <div className="mt-1 text-[13px] leading-6 text-[#b7c0ce]">Deep tissue relief with a quieter visual language.</div>
                        </div>
                        <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] text-[#d8dee7] sm:block">
                          €89
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-[#121821] p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-[#8f9caf]">CerviFlex</div>
                            <div className="mt-2 text-[15px] font-medium text-[#f4f1ea]">Neck decompression</div>
                            <div className="mt-2 text-[13px] leading-6 text-[#8b95a3]">A calmer way to reset desk tension before bed.</div>
                          </div>
                          <NeckMassagerArt className="h-28 w-28 shrink-0" />
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-[#121821] p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.18em] text-[#8f9caf]">SleepSeal</div>
                            <div className="mt-2 text-[15px] font-medium text-[#f4f1ea]">Night breathing support</div>
                            <div className="mt-2 text-[13px] leading-6 text-[#8b95a3]">Small enough to disappear, useful enough to repeat.</div>
                          </div>
                          <SleepSealArt className="h-16 w-32 shrink-0" />
                        </div>
                      </div>

                      <div className="rounded-[28px] border border-white/8 bg-[#141a22] p-5">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[#8f9caf]">Trusted by athletes</div>
                        <div className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-[#f6f2eb]">4.9/5</div>
                        <div className="mt-2 text-[13px] leading-6 text-[#8b95a3]">
                          Real reviews from endurance athletes, founders and desk-heavy professionals.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <section id="system" className="pt-20 lg:pt-24">
          <Container>
            <motion.div {...reveal} className="max-w-[760px]">
              <SectionEyebrow>The system</SectionEyebrow>
              <h2 className="mt-5 text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#f6f2eb]">
                Three quiet tools. One considered ritual.
              </h2>
              <p className="mt-4 max-w-[42rem] text-[15px] leading-8 text-[#98a3b2] sm:text-[16px]">
                Product selector, simplified. Less dashboard energy, more premium object design. Each card exists to guide attention toward the product itself.
              </p>
            </motion.div>

            <div className="mt-10 overflow-x-auto pb-2">
              <div className="grid min-w-[880px] gap-4 md:grid-cols-3">
                {products.map((product) => {
                  const isActive = product.id === activeProduct
                  const Artwork = product.Artwork

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setActiveProduct(product.id)}
                      className={`rounded-[28px] border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-white/18 bg-[#171d27] shadow-[0_18px_40px_rgba(0,0,0,0.14)]'
                          : 'border-white/8 bg-white/[0.025] hover:border-white/14 hover:bg-white/[0.035]'
                      }`}
                    >
                      <div className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-4">
                        <div className="flex h-24 items-center justify-center rounded-[22px] border border-white/8 bg-[#10161d]">
                          <Artwork className="h-16 w-16" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.18em] text-[#8f9caf]">{product.label}</div>
                          <div className="mt-1 text-[18px] font-medium tracking-[-0.03em] text-[#f5f1ea]">{product.name}</div>
                          <div className="mt-2 text-[13px] leading-6 text-[#8b95a3]">{product.preview}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 rounded-[36px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] p-4 shadow-[0_28px_64px_rgba(0,0,0,0.16)] sm:p-6 lg:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12"
                >
                  <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[30px] border border-white/8 bg-[#10161d] p-8 sm:min-h-[540px] lg:p-12">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          currentProduct.id === 'pulse'
                            ? 'radial-gradient(circle at 50% 26%, rgba(141,163,196,0.18), transparent 26%)'
                            : currentProduct.id === 'cerviflex'
                              ? 'radial-gradient(circle at 50% 30%, rgba(214,219,226,0.13), transparent 26%)'
                              : 'radial-gradient(circle at 50% 44%, rgba(184,199,219,0.14), transparent 24%)',
                      }}
                    />
                    <currentProduct.Artwork className="relative h-[78%] w-auto max-w-[360px]" />
                  </div>

                  <div className="flex flex-col justify-center py-2 lg:py-6">
                    <SectionEyebrow>{currentProduct.label}</SectionEyebrow>
                    <h3 className="mt-5 text-[clamp(2rem,3.4vw,3.4rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#f5f1ea]">
                      {currentProduct.name}
                    </h3>
                    <div className="mt-2 text-[15px] text-[#8ea3c3]">{currentProduct.category}</div>

                    <p className="mt-5 max-w-[38rem] text-[15px] leading-8 text-[#98a3b2] sm:text-[16px]">
                      {currentProduct.description}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {currentProduct.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-[#d6dde6]">
                          <span className="mt-[5px] rounded-full border border-white/10 bg-white/[0.03] p-1">
                            <Check size={12} className="text-[#a9b9cc]" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {currentProduct.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-[#b8c4d2]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                      <div className="text-[13px] leading-7 text-[#dbe3ec]">“{currentProduct.review}”</div>
                      <div className="mt-3 text-[12px] uppercase tracking-[0.16em] text-[#8793a3]">
                        {currentProduct.reviewer}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="flex items-end gap-3">
                          <span className="text-[2.6rem] font-semibold tracking-[-0.06em] text-[#f5f1ea]">
                            {currentProduct.price}
                          </span>
                          <span className="pb-2 text-[16px] text-[#6f7a88] line-through">
                            {currentProduct.comparePrice}
                          </span>
                          <span className="mb-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#9fb1c9]">
                            {currentProduct.savings}
                          </span>
                        </div>
                        <div className="mt-2 text-[12px] text-[#7f8b9b]">One-time purchase · no subscription</div>
                      </div>

                      <a
                        href="#pricing"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-5 py-3 text-[14px] font-semibold text-[#11161d] transition-transform duration-300 hover:-translate-y-[1px]"
                      >
                        Add to bundle
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </section>

        <section id="ritual" className="pt-20 lg:pt-24">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-start">
              <motion.div {...reveal} className="rounded-[34px] border border-white/8 bg-white/[0.025] p-6 sm:p-8">
                <SectionEyebrow>Why this feels different</SectionEyebrow>
                <h2 className="mt-5 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[#f6f2eb]">
                  More silence. More product. More trust.
                </h2>
                <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-[#98a3b2]">
                  The page should feel like a premium product showcase, not a bright interface demo.
                  So the hierarchy is slower, the spacing is calmer and the conversion cues are integrated instead of shouted.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    { icon: Activity, label: 'Trusted by athletes' },
                    { icon: Moon, label: '30-night guarantee' },
                    { icon: Package, label: 'Free shipping' },
                  ].map((item) => {
                    const Icon = item.icon

                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-[18px] border border-white/8 bg-[#111720] px-4 py-4">
                        <Icon size={16} className="text-[#b4c3d5]" />
                        <span className="text-[13px] font-medium text-[#e6ebf1]">{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-3">
                {detailCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: index * 0.06 }}
                    className="rounded-[30px] border border-white/8 bg-[#121821] p-6"
                  >
                    <div className="text-[18px] font-medium tracking-[-0.03em] text-[#f5f1ea]">{card.title}</div>
                    <p className="mt-4 text-[14px] leading-7 text-[#8e98a7]">{card.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="reviews" className="pt-20 lg:pt-24">
          <Container>
            <motion.div {...reveal} className="max-w-[720px]">
              <SectionEyebrow>Reviews</SectionEyebrow>
              <h2 className="mt-5 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[#f6f2eb]">
                Trusted by athletes, founders and desk-heavy professionals.
              </h2>
            </motion.div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.author}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.05 }}
                  className="rounded-[30px] border border-white/8 bg-white/[0.025] p-6 sm:p-7"
                >
                  <div className="flex items-center gap-1 text-[#d9cba2]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={14} className="fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-[15px] leading-8 text-[#dde4ec]">“{review.quote}”</p>
                  <div className="mt-6 text-[13px] font-medium text-[#f5f1ea]">{review.author}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#7f8b9b]">{review.role}</div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <section id="pricing" className="pt-20 lg:pt-24">
          <Container>
            <motion.div {...reveal} className="max-w-[720px]">
              <SectionEyebrow>Pricing</SectionEyebrow>
              <h2 className="mt-5 text-[clamp(2.2rem,3.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[#f6f2eb]">
                Choose the ritual that fits your routine.
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-[#98a3b2]">
                Bundle savings, free shipping and a 30-night guarantee. Presented quietly, because the offer should feel confident without shouting.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {bundles.map((bundle, index) => (
                <motion.div
                  key={bundle.name}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.05 }}
                  className={`rounded-[32px] border p-6 sm:p-7 ${
                    bundle.highlight
                      ? 'border-white/16 bg-[#171d27] shadow-[0_24px_48px_rgba(0,0,0,0.16)]'
                      : 'border-white/8 bg-white/[0.025]'
                  }`}
                >
                  <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#97a6b8]">
                    {bundle.badge}
                  </div>

                  <div className="mt-5 text-[28px] font-semibold tracking-[-0.05em] text-[#f6f2eb]">{bundle.name}</div>
                  <div className="mt-5 flex items-end gap-3">
                    <span className="text-[3rem] font-semibold tracking-[-0.07em] text-[#f6f2eb]">{bundle.price}</span>
                    <span className="pb-2 text-[16px] text-[#6f7a88] line-through">{bundle.comparePrice}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {bundle.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-7 text-[#d9e0e9]">
                        <span className="mt-[5px] rounded-full border border-white/10 bg-white/[0.03] p-1">
                          <Check size={12} className="text-[#a9b9cc]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[14px] font-semibold transition-colors duration-300 ${
                      bundle.highlight
                        ? 'bg-[#f2eee7] text-[#11161d] hover:bg-[#f6f2eb]'
                        : 'border border-white/10 bg-white/[0.03] text-[#edf1f6] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    {bundle.cta}
                  </a>

                  <div className="mt-4 text-center text-[12px] text-[#7f8b9b]">30-night guarantee</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {trustItems.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-white/8 bg-[#121821] px-5 py-4 text-center"
                  >
                    <Icon size={16} className="mx-auto text-[#b7c6d9]" />
                    <div className="mt-3 text-[13px] font-medium text-[#eff3f7]">{item.title}</div>
                    <div className="mt-1 text-[12px] leading-6 text-[#8791a1]">{item.body}</div>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>

        <section className="pt-20 lg:pt-24">
          <Container>
            <motion.div
              {...reveal}
              className="overflow-hidden rounded-[36px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] px-6 py-10 text-center shadow-[0_24px_56px_rgba(0,0,0,0.14)] sm:px-10 lg:px-16 lg:py-16"
            >
              <SectionEyebrow>Final step</SectionEyebrow>
              <h2 className="mx-auto mt-5 max-w-[14ch] text-[clamp(2rem,3.6vw,4rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#f6f2eb]">
                Bring a calmer recovery ritual home.
              </h2>
              <p className="mx-auto mt-5 max-w-[42rem] text-[15px] leading-8 text-[#97a2b2]">
                Premium recovery objects, a clearer hierarchy and less visual noise. The page now sells through restraint instead of effects.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-5 py-3 text-[14px] font-semibold text-[#11161d] transition-transform duration-300 hover:-translate-y-[1px]"
                >
                  Choose your ritual
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#system"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[14px] font-medium text-[#e6ebf2] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  Revisit the system
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[12px] text-[#7f8b9b]">
                <span>Free shipping</span>
                <span>30-night guarantee</span>
                <span>Trusted by athletes</span>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <a
          href="#pricing"
          className="flex items-center justify-between rounded-[22px] border border-white/10 bg-[rgba(242,238,231,0.95)] px-4 py-3 text-[#11161d] shadow-[0_20px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl"
        >
          <div>
            <div className="text-[13px] font-semibold">Build your ritual</div>
            <div className="text-[11px] text-[#596170]">Free shipping · 30-night guarantee</div>
          </div>
          <div className="text-[14px] font-semibold">From €89</div>
        </a>
      </div>
    </div>
  )
}