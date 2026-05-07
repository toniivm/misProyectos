'use client'

import { motion } from 'framer-motion'
import { BatteryLow, Brain, Flame, Moon, Frown, Wind } from 'lucide-react'

const problems = [
  {
    icon: Flame,
    title: 'Chronic Muscle Soreness',
    body: 'Every workout leaves you stiff for days. Your muscles never fully release. You push harder — they break down faster.',
    color: 'from-orange-500/10 to-transparent',
    border: 'border-orange-500/15',
    iconColor: 'text-orange-400',
  },
  {
    icon: Frown,
    title: 'Neck & Shoulder Tension',
    body: '8 hours at a desk destroy your posture. The tightness spreads up into your skull. Painkillers mask it — nothing fixes it.',
    color: 'from-red-500/10 to-transparent',
    border: 'border-red-500/15',
    iconColor: 'text-red-400',
  },
  {
    icon: Moon,
    title: 'Fragmented Sleep',
    body: "You fall asleep but never reach deep recovery cycles. Morning comes and you\u2019re still exhausted. Night after night.",
    color: 'from-purple-500/10 to-transparent',
    border: 'border-purple-500/15',
    iconColor: 'text-purple-400',
  },
  {
    icon: Brain,
    title: 'Mental Fog & Stress',
    body: 'When your body isn\'t recovering, your mind can\'t recover. Focus disappears. Anxiety rises. Performance collapses.',
    color: 'from-yellow-500/10 to-transparent',
    border: 'border-yellow-500/15',
    iconColor: 'text-yellow-400',
  },
  {
    icon: BatteryLow,
    title: 'Permanent Fatigue',
    body: 'Coffee no longer works. Energy drinks crash you harder. Your body is running on fumes — and it shows.',
    color: 'from-rose-500/10 to-transparent',
    border: 'border-rose-500/15',
    iconColor: 'text-rose-400',
  },
  {
    icon: Wind,
    title: 'Mouth Breathing',
    body: 'Most people breathe wrong during sleep — reducing oxygen quality by 40%. You wake up more tired than when you went to bed.',
    color: 'from-cyan-500/10 to-transparent',
    border: 'border-cyan-500/15',
    iconColor: 'text-cyan-400',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#080810] to-[#050508]" />
      <div className="glow-blob w-[500px] h-[500px] bg-red-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="section-tag mb-6">The Problem</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-6 leading-tight">
            Modern life{' '}
            <span className="gradient-text">destroys recovery.</span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Screens, stress, poor sleep, desk hours, intense training — your body is under siege.
            Most people accept it. High performers don't.
          </p>
        </motion.div>

        {/* Problem cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative glass-card rounded-2xl p-7 border ${problem.border} overflow-hidden group cursor-default`}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center mb-5 ${problem.iconColor}`}>
                  <problem.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">{problem.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{problem.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-block electric-border rounded-2xl px-8 py-5 glass-card">
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              <span className="text-electric-400 font-semibold">The average person loses 2.5 years of productive performance</span>{' '}
              due to poor recovery. You don't have to be average.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
