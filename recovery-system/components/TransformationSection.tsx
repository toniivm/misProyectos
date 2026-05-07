'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const before = [
  { label: 'Waking up exhausted every morning' },
  { label: 'Neck locked from 8 hours at a screen' },
  { label: 'Muscles still sore 3 days after training' },
  { label: 'Falling asleep but never actually resting' },
  { label: 'Stress accumulating with no release valve' },
  { label: 'Relying on caffeine to function' },
]

const after = [
  { label: 'Rising energized — every single morning' },
  { label: 'Neck tension dissolved in 15 minutes' },
  { label: 'Recovered and ready for the next session' },
  { label: 'Deep REM sleep unlocked through nasal breathing' },
  { label: 'Parasympathetic reset built into your evening' },
  { label: 'Natural energy from actual recovery' },
]

export default function TransformationSection() {
  return (
    <section id="transformation" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#060610] to-[#050508]" />

      {/* Blue glow center */}
      <div className="glow-blob w-[700px] h-[400px] bg-electric-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="section-tag mb-6">The Transformation</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            Before vs.{' '}
            <span className="gradient-text-blue">After.</span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-lg mx-auto">
            The difference between someone who recovers and someone who doesn't is not genetics — it's tools.
          </p>
        </motion.div>

        {/* Split comparison */}
        <div className="relative grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/5">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#0a0508] p-10 lg:p-14"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/8 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                  <X size={18} className="text-red-400" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-red-400/60 uppercase font-medium">The State You're In</div>
                  <div className="font-display font-black text-2xl text-white">BEFORE</div>
                </div>
              </div>

              <ul className="space-y-4">
                {before.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={10} className="text-red-400" />
                    </div>
                    <span className="text-slate-500 text-sm leading-relaxed">{item.label}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-red-500/10">
                <p className="text-xs text-slate-600 italic">
                  "This is where 90% of people are stuck — silently breaking down."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-electric-500/30 to-transparent hidden lg:block z-20" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#050508] border border-electric-500/30 flex items-center justify-center z-30 hidden lg:flex">
            <span className="text-electric-400 font-bold text-xs">VS</span>
          </div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative bg-[#04080f] p-10 lg:p-14"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-500/8 to-transparent" />
            {/* Glow pulse */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-electric-500/6 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-electric-500/15 border border-electric-500/25 flex items-center justify-center animate-glow-pulse">
                  <Check size={18} className="text-electric-400" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-electric-400/60 uppercase font-medium">Where You're Going</div>
                  <div className="font-display font-black text-2xl text-white">AFTER</div>
                </div>
              </div>

              <ul className="space-y-4">
                {after.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-5 h-5 rounded-full bg-electric-500/10 border border-electric-500/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-electric-400" />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed font-medium">{item.label}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-electric-500/10">
                <p className="text-xs text-electric-400/60 italic">
                  "This is where high performers live — and where you're going."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <a href="#offer" className="btn-primary inline-flex">
            <span className="relative z-10">Start Your Transformation</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
