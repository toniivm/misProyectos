'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Play, Zap } from 'lucide-react'

function MassageGunSVG() {
  return (
    <svg viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_24px_rgba(14,165,233,0.5)]">
      <defs>
        <linearGradient id="gunBodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="gunAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Handle */}
      <rect x="70" y="130" width="40" height="110" rx="14" fill="url(#gunBodyGrad)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* Handle grip lines */}
      {[150, 162, 174, 186, 198, 210].map((y) => (
        <rect key={y} x="74" y={y} width="32" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
      ))}
      {/* Body */}
      <rect x="42" y="50" width="96" height="90" rx="18" fill="url(#gunBodyGrad)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Motor indicator circle */}
      <circle cx="90" cy="92" r="22" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
      <circle cx="90" cy="92" r="14" fill="rgba(14,165,233,0.12)" />
      {/* Head attachment connector */}
      <rect x="76" y="26" width="28" height="28" rx="6" fill="#1e293b" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
      {/* Head ball */}
      <circle cx="90" cy="22" r="18" fill="url(#gunAccent)" filter="url(#glowFilter)" opacity="0.95" />
      <circle cx="85" cy="17" r="5" fill="rgba(255,255,255,0.3)" />
      {/* LED strip */}
      <rect x="50" y="128" width="80" height="5" rx="2.5" fill="url(#gunAccent)" opacity="0.85" filter="url(#glowFilter)" />
      {/* RS logo */}
      <text x="90" y="97" textAnchor="middle" fill="rgba(14,165,233,0.8)" fontSize="10" fontFamily="monospace" fontWeight="bold">RS™</text>
      {/* Side vents */}
      {[65, 75, 85, 95].map((y) => (
        <rect key={y} x="42" y={y} width="6" height="1.5" rx="0.75" fill="rgba(255,255,255,0.08)" />
      ))}
      {[65, 75, 85, 95].map((y) => (
        <rect key={`r-${y}`} x="132" y={y} width="6" height="1.5" rx="0.75" fill="rgba(255,255,255,0.08)" />
      ))}
    </svg>
  )
}

function NeckMassagerSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_24px_rgba(14,165,233,0.5)]">
      <defs>
        <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="neckAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <filter id="neckGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Main U body */}
      <path d="M 38,30 L 38,130 Q 38,175 100,175 Q 162,175 162,130 L 162,30" stroke="url(#neckGrad)" strokeWidth="34" fill="none" strokeLinecap="round" />
      {/* Outer accent */}
      <path d="M 38,30 L 38,130 Q 38,175 100,175 Q 162,175 162,130 L 162,30" stroke="rgba(14,165,233,0.15)" strokeWidth="36" fill="none" strokeLinecap="round" />
      {/* Inner detail */}
      <path d="M 38,30 L 38,130 Q 38,175 100,175 Q 162,175 162,130 L 162,30" stroke="rgba(255,255,255,0.04)" strokeWidth="28" fill="none" strokeLinecap="round" />
      {/* Nodes (massage heads) */}
      {[
        [38, 50], [38, 80], [38, 110],
        [162, 50], [162, 80], [162, 110],
        [60, 170], [100, 175], [140, 170],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="9" fill="url(#neckAccent)" opacity="0.9" filter="url(#neckGlow)" />
      ))}
      {/* LED panel */}
      <rect x="84" y="20" width="32" height="20" rx="4" fill="#0f172a" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
      <text x="100" y="34" textAnchor="middle" fill="#0ea5e9" fontSize="8" fontFamily="monospace" fontWeight="bold">3★</text>
      {/* USB port */}
      <rect x="93" y="10" width="14" height="8" rx="2" fill="#0f172a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    </svg>
  )
}

function SleepTapeSVG() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_24px_rgba(14,165,233,0.5)]">
      <defs>
        <linearGradient id="tapeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#162032" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="tapeAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="tapeGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Background ambient glow */}
      <ellipse cx="100" cy="70" rx="80" ry="40" fill="rgba(14,165,233,0.06)" />
      {/* Main tape body */}
      <rect x="30" y="50" width="140" height="40" rx="20" fill="url(#tapeGrad)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Center breathing hole pattern */}
      {[-20, 0, 20].map((x) => (
        <ellipse key={x} cx={100 + x} cy="70" rx="7" ry="5" fill="rgba(14,165,233,0.12)" stroke="rgba(14,165,233,0.25)" strokeWidth="0.5" />
      ))}
      {/* Edges - rounded ends */}
      <ellipse cx="30" cy="70" rx="12" ry="20" fill="#1a2535" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <ellipse cx="170" cy="70" rx="12" ry="20" fill="#1a2535" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      {/* Glow accent line */}
      <rect x="35" y="68" width="130" height="4" rx="2" fill="url(#tapeAccent)" opacity="0.5" filter="url(#tapeGlow)" />
      {/* Brand mark */}
      <text x="100" y="74" textAnchor="middle" fill="rgba(14,165,233,0.8)" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="3">RS™</text>
      {/* Zzz sleep indicator */}
      {[[-30, 30], [-10, 20], [10, 28]].map(([x, y], i) => (
        <text key={i} x={100 + x} y={y} fill="rgba(14,165,233,0.4)" fontSize={8 + i * 2} fontFamily="sans-serif">z</text>
      ))}
      {/* Stars decoration */}
      {[[40, 25], [155, 25], [70, 110], [130, 110]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fill="rgba(14,165,233,0.3)" fontSize="10">✦</text>
      ))}
    </svg>
  )
}

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-12, 0, -12],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const line1 = ['YOUR', 'BODY', 'NEVER', 'FULLY', 'RECOVERS.']
  const line2 = ['UNTIL', 'NOW.']

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glow-blob w-[900px] h-[900px] bg-electric-500/8 -top-40 -left-40 animate-spin-slow opacity-60" />
        <div className="glow-blob w-[600px] h-[600px] bg-electric-500/10 top-1/2 right-0 translate-x-1/2 animate-float-slow" />
        <div className="glow-blob w-[400px] h-[400px] bg-violet-500/6 bottom-0 left-1/4 animate-float" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14,165,233,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text side */}
          <div className="space-y-8">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="section-tag inline-flex items-center gap-2">
                <Zap size={10} />
                Premium Wellness Tech
              </span>
            </motion.div>

            {/* Headline line 1 */}
            <h1 className="font-display font-black leading-[0.9] tracking-[-0.02em]">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-5xl sm:text-6xl lg:text-[5.5rem]">
                {line1.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className={word === 'RECOVERS.' ? 'gradient-text-blue' : 'text-white'}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              {/* Line 2 */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-5xl sm:text-6xl lg:text-[5.5rem] mt-2">
                {line2.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={line1.length + i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="gradient-text"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-lg"
            >
              Deep muscle relief. Better sleep. Faster recovery.{' '}
              <span className="text-slate-300">The complete system used by elite athletes and high performers.</span>
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="flex items-center gap-8"
            >
              {[
                { value: '10K+', label: 'Athletes' },
                { value: '4.9★', label: 'Avg Rating' },
                { value: '30-Day', label: 'Guarantee' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-bold text-2xl text-electric-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 tracking-wider uppercase mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#offer" className="btn-primary">
                <span className="relative z-10">Start Recovering</span>
                <ArrowDown size={14} className="relative z-10" />
              </a>
              <a href="#products" className="btn-ghost inline-flex items-center gap-2">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <Play size={10} fill="currentColor" />
                </span>
                Watch the Routine
              </a>
            </motion.div>
          </div>

          {/* Product cluster */}
          <div className="relative flex items-center justify-center h-[420px] lg:h-[560px]">
            {/* Ambient glow ring */}
            <div className="absolute w-72 h-72 rounded-full border border-electric-500/15 animate-ping-slow" />
            <div className="absolute w-96 h-96 rounded-full border border-electric-500/8" />

            {/* Main product – massage gun */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="absolute top-10 right-8 w-28 h-44 lg:w-36 lg:h-56"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-2xl bg-glow-blue-strong opacity-60" />
                <MassageGunSVG />
              </div>
            </motion.div>

            {/* Neck massager */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-10 left-4 w-32 h-32 lg:w-40 lg:h-40"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-glow-blue opacity-60" />
                <NeckMassagerSVG />
              </div>
            </motion.div>

            {/* Sleep tape */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-20 right-4 w-36 h-24 lg:w-44 lg:h-28"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-xl bg-glow-blue opacity-40" />
                <SleepTapeSVG />
              </div>
            </motion.div>

            {/* Central glow orb */}
            <div className="relative w-40 h-40 lg:w-56 lg:h-56 rounded-full">
              <div className="absolute inset-0 rounded-full bg-electric-500/10 animate-glow-pulse" />
              <div className="absolute inset-4 rounded-full bg-electric-500/8 blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display font-black text-3xl lg:text-4xl text-electric-400 leading-none">RS</div>
                  <div className="text-[10px] tracking-[0.3em] text-slate-500 uppercase mt-1">System™</div>
                </div>
              </div>
            </div>

            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="absolute top-8 left-6 glass-card px-3 py-2 rounded-lg border border-white/5"
            >
              <div className="text-[10px] text-electric-400 font-medium tracking-wider">PULSE PRO X</div>
              <div className="text-[9px] text-slate-500">Massage Gun</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="absolute top-1/3 right-2 glass-card px-3 py-2 rounded-lg border border-white/5"
            >
              <div className="text-[10px] text-electric-400 font-medium tracking-wider">CERVIFLEX™</div>
              <div className="text-[9px] text-slate-500">Neck Relief</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-3 py-2 rounded-lg border border-white/5"
            >
              <div className="text-[10px] text-electric-400 font-medium tracking-wider">SLEEPSEAL™</div>
              <div className="text-[9px] text-slate-500">Sleep Optimizer</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.3em] text-slate-600 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-7 border border-white/10 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-electric-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
