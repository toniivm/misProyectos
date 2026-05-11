'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, Zap, Shield, Star } from 'lucide-react'

// --- SVG product visuals (inline, reused from hero) ---
function MassageGunDetailSVG() {
  return (
    <svg viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dgunBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0c1520" />
        </linearGradient>
        <linearGradient id="dgunAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <radialGradient id="dgunGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
        <filter id="dglow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ambient glow */}
      <ellipse cx="120" cy="170" rx="100" ry="120" fill="url(#dgunGlow)" />
      {/* Handle */}
      <rect x="95" y="165" width="50" height="150" rx="18" fill="url(#dgunBody)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Grip texture */}
      {[180,194,208,222,234,246,258,270,280,290].map((y) => (
        <rect key={y} x="99" y={y} width="42" height="2.5" rx="1.25" fill="rgba(255,255,255,0.04)" />
      ))}
      {/* USB-C port */}
      <rect x="112" y="308" width="16" height="5" rx="2" fill="rgba(14,165,233,0.3)" />
      {/* Body */}
      <rect x="56" y="60" width="128" height="115" rx="22" fill="url(#dgunBody)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      {/* Body edge highlight */}
      <rect x="56" y="60" width="128" height="2" rx="1" fill="rgba(255,255,255,0.04)" />
      {/* Motor circle */}
      <circle cx="120" cy="118" r="30" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.15)" strokeWidth="1" />
      <circle cx="120" cy="118" r="18" fill="rgba(14,165,233,0.1)" />
      <circle cx="120" cy="118" r="8" fill="rgba(14,165,233,0.3)" />
      {/* Display */}
      <rect x="72" y="70" width="56" height="28" rx="6" fill="#050810" stroke="rgba(14,165,233,0.2)" strokeWidth="0.5" />
      <text x="100" y="89" textAnchor="middle" fill="#0ea5e9" fontSize="11" fontFamily="monospace" fontWeight="bold">L3</text>
      {/* Speed indicators */}
      {[0,1,2,3,4].map((i) => (
        <rect key={i} x={135 + i * 9} y="78" width="6" height="10" rx="2" fill={i < 3 ? '#0ea5e9' : 'rgba(255,255,255,0.05)'} opacity={i < 3 ? 0.9 : 1} />
      ))}
      {/* Connector neck */}
      <rect x="104" y="34" width="32" height="30" rx="8" fill="#0f1c2e" stroke="rgba(14,165,233,0.25)" strokeWidth="1" />
      {/* Head ball */}
      <circle cx="120" cy="24" r="24" fill="url(#dgunAccent)" filter="url(#dglow)" opacity="0.95" />
      <circle cx="112" cy="16" r="8" fill="rgba(255,255,255,0.25)" />
      {/* LED strip */}
      <rect x="60" y="164" width="120" height="6" rx="3" fill="url(#dgunAccent)" opacity="0.9" filter="url(#dglow)" />
      {/* Side vents */}
      {[80,93,106,119,132,145].map((y) => (
        <rect key={y} x="57" y={y} width="8" height="2" rx="1" fill="rgba(255,255,255,0.06)" />
      ))}
      {/* Brand text */}
      <text x="120" y="122" textAnchor="middle" fill="rgba(14,165,233,0.9)" fontSize="12" fontFamily="monospace" fontWeight="bold">PULSE PRO X</text>
    </svg>
  )
}

function NeckMassagerDetailSVG() {
  return (
    <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dneckBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0c1520" />
        </linearGradient>
        <linearGradient id="dneckAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <radialGradient id="dneckGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
        <filter id="dnglow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="130" cy="130" rx="100" ry="100" fill="url(#dneckGlow)" />
      {/* Shadow path */}
      <path d="M 50,40 L 50,155 Q 50,225 130,225 Q 210,225 210,155 L 210,40" stroke="rgba(14,165,233,0.08)" strokeWidth="55" fill="none" strokeLinecap="round" />
      {/* Main body */}
      <path d="M 50,40 L 50,155 Q 50,225 130,225 Q 210,225 210,155 L 210,40" stroke="url(#dneckBody)" strokeWidth="44" fill="none" strokeLinecap="round" />
      {/* Edge highlight */}
      <path d="M 50,40 L 50,155 Q 50,225 130,225 Q 210,225 210,155 L 210,40" stroke="rgba(255,255,255,0.05)" strokeWidth="46" fill="none" strokeLinecap="round" />
      {/* Inner channel */}
      <path d="M 50,40 L 50,155 Q 50,225 130,225 Q 210,225 210,155 L 210,40" stroke="rgba(255,255,255,0.02)" strokeWidth="32" fill="none" strokeLinecap="round" />
      {/* Massage nodes */}
      {[
        [50, 60], [50, 95], [50, 130], [50, 160],
        [210, 60], [210, 95], [210, 130], [210, 160],
        [75, 218], [108, 225], [130, 226], [152, 225], [185, 218],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="11" fill="url(#dneckAccent)" opacity="0.9" filter="url(#dnglow)" />
      ))}
      {/* Control panel */}
      <rect x="106" y="26" width="48" height="28" rx="6" fill="#050810" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
      <circle cx="121" cy="40" r="5" fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.4)" strokeWidth="1" />
      <circle cx="130" cy="40" r="5" fill="rgba(14,165,233,0.8)" />
      <circle cx="139" cy="40" r="5" fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.4)" strokeWidth="1" />
      <text x="130" y="33" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="6" fontFamily="monospace">MODE</text>
      {/* USB port */}
      <rect x="120" y="16" width="20" height="9" rx="2.5" fill="#0a1625" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    </svg>
  )
}

function SleepTapeDetailSVG() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dtapeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a2535" />
          <stop offset="40%" stopColor="#1e3048" />
          <stop offset="60%" stopColor="#1e3048" />
          <stop offset="100%" stopColor="#1a2535" />
        </linearGradient>
        <linearGradient id="dtapeAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <radialGradient id="dtapeGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
        <filter id="dtglow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ambient glow */}
      <ellipse cx="140" cy="90" rx="120" ry="60" fill="url(#dtapeGlow)" />
      {/* Shadow */}
      <rect x="36" y="66" width="208" height="48" rx="24" fill="rgba(14,165,233,0.06)" />
      {/* Main body */}
      <rect x="36" y="62" width="208" height="56" rx="28" fill="url(#dtapeGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      {/* Top highlight */}
      <rect x="40" y="63" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
      {/* Breathing ventilation holes */}
      {[-40,-20,0,20,40].map((x) => (
        <ellipse key={x} cx={140 + x} cy="90" rx="9" ry="7" fill="rgba(7,12,20,0.8)" stroke="rgba(14,165,233,0.2)" strokeWidth="0.5" />
      ))}
      {/* Center glow strip */}
      <rect x="44" y="88" width="192" height="4" rx="2" fill="url(#dtapeAccent)" opacity="0.6" filter="url(#dtglow)" />
      {/* Brand watermark */}
      <text x="140" y="83" textAnchor="middle" fill="rgba(14,165,233,0.15)" fontSize="20" fontFamily="monospace" fontWeight="900" letterSpacing="8">RS™</text>
      {/* SLEEPSEAL text */}
      <text x="140" y="114" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="4">SLEEPSEAL™</text>
      {/* Left tab */}
      <ellipse cx="36" cy="90" rx="18" ry="28" fill="#162030" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* Right tab */}
      <ellipse cx="244" cy="90" rx="18" ry="28" fill="#162030" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* Moon stars */}
      {[[56, 32], [200, 32], [100, 145], [180, 145], [140, 20]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fill={`rgba(14,165,233,${0.15 + i * 0.05})`} fontSize={8 + (i % 3) * 3}>✦</text>
      ))}
      {/* Zzz */}
      {[[-45, 36], [-20, 28], [5, 34]].map(([x, y], i) => (
        <text key={i} x={140 + x} y={y} fill="rgba(14,165,233,0.25)" fontSize={8 + i * 3} fontFamily="sans-serif">z</text>
      ))}
    </svg>
  )
}

const products = [
  {
    id: 'pulse-pro',
    tag: 'DEEP TISSUE',
    name: 'PULSE PRO X',
    subtitle: 'Percussive Massage Gun',
    tagline: 'The recovery weapon trusted by elite athletes.',
    description:
      'Professional-grade percussive therapy that reaches 16mm deep into muscle tissue. 8 precision heads, 6 speed levels, and smart pressure-adaptive technology — so your muscles release completely after every session.',
    features: [
      '8 interchangeable precision heads',
      '6 adaptive speed levels (600–3200 RPM)',
      'Smart pressure-sensing motor',
      '16mm amplitude — deep tissue reach',
      '4-hour battery life, Type-C charging',
      'Ultra-quiet brushless motor (<45dB)',
    ],
    specs: ['Battery: 2500mAh', 'Stall Force: 28 lbs', 'Weight: 0.95kg', 'Noise: <45dB'],
    useCases: ['Post-workout recovery', 'Gym soreness', 'Injury prevention', 'Deep tissue release'],
    price: '€89',
    badge: 'Best Seller',
    Visual: MassageGunDetailSVG,
    accent: 'from-blue-500/20 via-transparent to-transparent',
    glow: 'shadow-[0_0_60px_rgba(14,165,233,0.2)]',
  },
  {
    id: 'cerviflex',
    tag: 'NECK RELIEF',
    name: 'CERVIFLEX™',
    subtitle: 'Smart Cervical Massager',
    tagline: 'Undo 8 hours of desk damage in 15 minutes.',
    description:
      'Clinically-designed U-shape cradles your cervical spine with 9 multi-directional massage nodes. Three intensity modes and pulsed heat therapy dissolve tension patterns that accumulate from screen time, commuting, and stress.',
    features: [
      '9 multi-directional massage nodes',
      '3 intensity modes + heat therapy',
      'Ergonomic U-shape cervical fit',
      'USB-C rechargeable (10h battery)',
      'ABS + medical-grade TPR material',
      'Portable — use anywhere, anytime',
    ],
    specs: ['Material: ABS+TPR', 'Battery: 600mAh', 'Input: 5V/1A USB-C', 'Weight: 180g'],
    useCases: ['Office neck pain', 'Posture correction', 'Stress relief', 'Shoulder decompression'],
    price: '€59',
    badge: 'Fan Favorite',
    Visual: NeckMassagerDetailSVG,
    accent: 'from-cyan-500/20 via-transparent to-transparent',
    glow: 'shadow-[0_0_60px_rgba(6,182,212,0.2)]',
  },
  {
    id: 'sleepseal',
    tag: 'SLEEP OPTIMIZATION',
    name: 'SLEEPSEAL™',
    subtitle: 'Nasal Breathing Strip',
    tagline: 'Upgrade your sleep. Every single night.',
    description:
      'Engineered for nasal breathing optimization during sleep. Forces your airway into its optimal configuration — increasing oxygen intake, reducing snoring, and unlocking the deeper REM and slow-wave recovery cycles your body needs.',
    features: [
      'Medical-grade hypoallergenic material',
      'Adjustable breathing resistance',
      'Snore-reduction technology',
      'Promotes nasal over mouth breathing',
      'Odorless, skin-safe adhesive',
      '30-day starter pack included',
    ],
    specs: ['Type: Physical', 'Function: Anti-snore', 'Material: TPE', 'Pack: 30 strips'],
    useCases: ['Deeper REM sleep', 'Snoring elimination', 'Oxygen optimization', 'Recovery overnight'],
    price: '€29',
    badge: 'Sleep Hack',
    Visual: SleepTapeDetailSVG,
    accent: 'from-violet-500/20 via-transparent to-transparent',
    glow: 'shadow-[0_0_60px_rgba(139,92,246,0.2)]',
  },
]

export default function ProductsSection() {
  const [active, setActive] = useState(0)
  const product = products[active]

  return (
    <section id="products" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#07070e] to-[#050508]" />

      {/* Ambient */}
      <div className="glow-blob w-[600px] h-[600px] bg-electric-500/6 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 lg:mb-18"
        >
          <span className="section-tag mb-6">The System</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            The Complete{' '}
            <span className="gradient-text-blue">Recovery System.</span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Three precision-engineered tools. One complete recovery protocol.
          </p>
        </motion.div>

        {/* Product selector tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setActive(i)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                active === i
                  ? 'bg-electric-500 text-white shadow-glow'
                  : 'glass-card border border-white/5 text-slate-400 hover:text-white hover:border-white/10'
              }`}
            >
              {p.badge && active === i && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] bg-white text-electric-600 px-2 py-0.5 rounded-full font-bold tracking-wider">
                  {p.badge}
                </span>
              )}
              <span className="flex items-center gap-2">
                <span className="text-[10px] opacity-60">{`0${i + 1}`}</span>
                {p.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Product showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
            className={`relative glass-card electric-border rounded-3xl overflow-hidden ${product.glow}`}
          >
            {/* BG gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${product.accent}`} />

            <div className="relative z-10 grid lg:grid-cols-2 gap-0">
              {/* Visual side */}
              <div className="relative flex items-center justify-center p-10 lg:p-16 min-h-[340px]">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-500/5 to-transparent" />
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-56 h-56 lg:w-72 lg:h-72"
                >
                  <div className="absolute inset-0 rounded-full bg-glow-blue-strong opacity-70" />
                  <product.Visual />
                </motion.div>

                {/* Spec chips */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                  {product.specs.map((s) => (
                    <span key={s} className="text-[10px] font-medium text-slate-500 bg-white/3 border border-white/5 px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info side */}
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <span className="section-tag text-[10px]">{product.tag}</span>
                    <h3 className="font-display font-black text-3xl lg:text-4xl text-white mt-4">{product.name}</h3>
                    <p className="text-electric-400 text-sm font-medium mt-1 tracking-wider">{product.subtitle}</p>
                    <p className="text-slate-300 font-medium mt-2 text-base italic">"{product.tagline}"</p>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                        <Check size={14} className="text-electric-400 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Use cases */}
                  <div className="flex flex-wrap gap-2">
                    {product.useCases.map((uc) => (
                      <span key={uc} className="text-xs text-electric-300 bg-electric-500/10 border border-electric-500/20 px-3 py-1 rounded-full">
                        {uc}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center gap-6 pt-2">
                    <div>
                      <span className="font-display font-black text-3xl text-white">{product.price}</span>
                      <span className="text-slate-500 text-xs ml-2">one-time</span>
                    </div>
                    <a href="#offer" className="btn-primary text-xs py-3 px-6 flex-shrink-0">
                      <span className="relative z-10">Add to Kit</span>
                      <ChevronRight size={14} className="relative z-10" />
                    </a>
                  </div>

                  {/* Trust signals */}
                  <div className="flex items-center gap-6 pt-1 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" />
                      4.9 / 5.0
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Shield size={11} className="text-electric-400" />
                      30-day guarantee
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Zap size={11} className="text-electric-400" />
                      Free shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full ${
                active === i ? 'w-8 h-2 bg-electric-500' : 'w-2 h-2 bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
