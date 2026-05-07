'use client'

import { motion } from 'framer-motion'
import { Zap, Moon, Smile, Battery, Wind, Home } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Faster Recovery',
    body: 'Percussive therapy flushes lactic acid 3× faster than passive rest. Return to peak performance sooner.',
    metric: '3× faster',
  },
  {
    icon: Moon,
    title: 'Deeper Sleep',
    body: 'Nasal breathing optimization increases deep-wave sleep by an average of 40 minutes per night.',
    metric: '+40 min REM',
  },
  {
    icon: Smile,
    title: 'Zero Pain',
    body: 'Multi-point cervical relief and deep muscle release eliminate chronic tension at the source — not the symptom.',
    metric: '92% relief rate',
  },
  {
    icon: Battery,
    title: 'More Energy',
    body: 'When your body fully recovers overnight, morning energy is compound-interest. Stack recovery nights, stack performance.',
    metric: '+35% energy',
  },
  {
    icon: Wind,
    title: 'Deep Relaxation',
    body: 'Activates parasympathetic nervous system response — the biological off-switch for chronic stress and anxiety.',
    metric: 'HRV +18%',
  },
  {
    icon: Home,
    title: 'Recovery at Home',
    body: 'Pro-level recovery protocols used by NFL athletes — now available in a complete take-anywhere kit.',
    metric: 'No gym needed',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#070710] to-[#050508]" />

      {/* Decorative diagonal grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `linear-gradient(60deg, rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(-60deg, rgba(14,165,233,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="section-tag mb-6">Why It Works</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            What recovery{' '}
            <span className="gradient-text">actually feels like.</span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Six science-backed outcomes measured across 10,000+ users in their first 30 days.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: '0 0 40px rgba(14,165,233,0.15), 0 16px 48px rgba(0,0,0,0.5)',
                transition: { duration: 0.2 },
              }}
              className="relative glass-card rounded-2xl p-8 border border-white/5 overflow-hidden group cursor-default"
            >
              {/* Hover glow bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/0 group-hover:from-electric-500/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              {/* Top border glow on hover */}
              <div className="absolute top-0 left-6 right-6 h-px bg-electric-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mb-6 group-hover:border-electric-500/40 group-hover:bg-electric-500/15 transition-all duration-300">
                  <b.icon size={22} className="text-electric-400" />
                </div>

                {/* Metric badge */}
                <div className="inline-block text-[10px] font-bold tracking-wider text-electric-400 bg-electric-500/10 border border-electric-500/20 px-2.5 py-1 rounded-full mb-4">
                  {b.metric}
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            { value: '10,000+', label: 'Athletes & performers' },
            { value: '4.9 / 5', label: 'Average satisfaction' },
            { value: '87%', label: 'Report better sleep in week 1' },
            { value: '30 days', label: 'Money-back guarantee' },
          ].map((s) => (
            <div key={s.label} className="glass-card border border-white/5 rounded-2xl p-6 text-center">
              <div className="font-display font-black text-2xl lg:text-3xl text-electric-400">{s.value}</div>
              <div className="text-xs text-slate-500 mt-2 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
