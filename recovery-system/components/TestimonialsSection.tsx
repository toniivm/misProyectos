'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ThumbsUp } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'CrossFit Athlete — 4× weekly training',
    rating: 5,
    text: "I've tried Theragun, Hypervolt, everything. The Pulse Pro X hits different — the pressure-adaptive motor actually adjusts to the muscle depth. My quads recovered in 24 hours instead of 72. This isn't placebo.",
    product: 'PULSE PRO X',
    highlight: 'recovered in 24h',
    avatar: 'MT',
    verified: true,
    helpful: 47,
  },
  {
    name: 'Sofia R.',
    role: 'Product Designer — 9h/day remote work',
    rating: 5,
    text: "The CerviFlex literally changed my work life. I had cervical pain for 3 years. Two weeks of daily 15-minute sessions and the tension I'd normalized as 'just how things are' completely disappeared. I wasted years accepting that.",
    product: 'CERVIFLEX™',
    highlight: '3 years of pain gone',
    avatar: 'SR',
    verified: true,
    helpful: 92,
  },
  {
    name: 'James K.',
    role: 'Entrepreneur & Biohacker — Sleep optimizer',
    rating: 5,
    text: "My Oura ring data doesn't lie. First night with SleepSeal: deep sleep up 44 minutes, HRV jumped 22 points. I've been stacking this with red light and it's the biggest sleep upgrade I've done since blue light blocking.",
    product: 'SLEEPSEAL™',
    highlight: '+44 min deep sleep',
    avatar: 'JK',
    verified: true,
    helpful: 134,
  },
  {
    name: 'Priya M.',
    role: 'Triathlete — Training for Ironman',
    rating: 5,
    text: "Training for an Ironman means recovery IS the sport. The complete kit cut my passive rest days from 2 down to 1 per week. The massage gun + neck massager combo after a long ride is elite-level recovery at a fraction of the cost.",
    product: 'Complete Kit',
    highlight: '50% fewer rest days',
    avatar: 'PM',
    verified: true,
    helpful: 61,
  },
  {
    name: 'Daniel F.',
    role: 'Software Engineer & Amateur Boxer',
    rating: 5,
    text: "Was skeptical because I've bought cheap massage guns before. This one is genuinely different — the motor doesn't stall under pressure. Used it on my traps after sparring and slept the deepest I have in months. The system works.",
    product: 'PULSE PRO X',
    highlight: 'Deepest sleep in months',
    avatar: 'DF',
    verified: true,
    helpful: 38,
  },
  {
    name: 'Elena V.',
    role: 'Nurse — 12-hour shifts, constant standing',
    rating: 5,
    text: "My feet and lower back are destroyed by every shift. I started the full system 3 weeks ago. I genuinely look forward to my recovery routine now. The neck massager during my notes is a game changer. Recommend to every colleague.",
    product: 'Complete Kit',
    highlight: 'Game changer for shifts',
    avatar: 'EV',
    verified: true,
    helpful: 55,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#07060f] to-[#050508]" />
      <div className="glow-blob w-[500px] h-[500px] bg-violet-500/5 top-1/2 right-0 translate-x-1/4 -translate-y-1/2" />
      <div className="glow-blob w-[400px] h-[400px] bg-electric-500/5 bottom-0 left-0 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="section-tag mb-6">Real Results</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            10,000 people{' '}
            <span className="gradient-text">already recovering.</span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Athletes, desk workers, nurses, entrepreneurs. One thing in common — they stopped accepting poor recovery.
          </p>
        </motion.div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-6 mb-14"
        >
          <div className="text-center">
            <div className="font-display font-black text-5xl text-white">4.9</div>
            <Stars count={5} />
            <div className="text-xs text-slate-500 mt-1">10,000+ reviews</div>
          </div>
          <div className="h-16 w-px bg-white/5" />
          <div className="flex flex-col gap-1.5">
            {[5, 4, 3].map((stars, i) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-2">{stars}</span>
                <Star size={9} className="text-yellow-400 fill-yellow-400" />
                <div className="w-28 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-400"
                    style={{ width: i === 0 ? '91%' : i === 1 ? '7%' : '2%' }}
                  />
                </div>
                <span className="text-xs text-slate-600">{i === 0 ? '91%' : i === 1 ? '7%' : '2%'}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative glass-card border border-white/5 rounded-2xl p-7 flex flex-col gap-5 cursor-default"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-electric-500/30 absolute top-6 right-6" />

              {/* Stars + product tag */}
              <div className="flex items-center justify-between">
                <Stars count={t.rating} />
                <span className="text-[9px] font-bold tracking-[0.2em] text-electric-400 bg-electric-500/10 border border-electric-500/20 px-2 py-0.5 rounded-full">
                  {t.product}
                </span>
              </div>

              {/* Highlight pull quote */}
              <div className="text-electric-400 text-xs font-bold tracking-wider uppercase bg-electric-500/8 border border-electric-500/15 rounded-lg px-3 py-2">
                ✦ {t.highlight}
              </div>

              {/* Review text */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-electric-500/15 border border-electric-500/25 flex items-center justify-center">
                    <span className="text-xs font-bold text-electric-400">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-[10px] text-slate-600 leading-tight mt-0.5 max-w-[160px]">{t.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <ThumbsUp size={11} />
                  <span>{t.helpful}</span>
                </div>
              </div>

              {t.verified && (
                <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50 flex items-center justify-center">
                    <span className="text-green-400 text-[8px]">✓</span>
                  </div>
                  Verified purchase
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* TikTok UGC strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 electric-border rounded-2xl p-8 glass-card text-center"
        >
          <div className="text-xs tracking-[0.25em] text-slate-500 uppercase mb-3">Trending on social</div>
          <div className="font-display font-bold text-xl text-white mb-4">
            <span className="text-electric-400">#RecoverySystem</span> — 2.4M views
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['@fitnesswith.marcus', '@biohack.daily', '@sleepdoc.james', '@ceo.recovery', '@ironman.sofia'].map((handle) => (
              <span key={handle} className="text-xs text-slate-500 bg-white/3 border border-white/5 px-3 py-1.5 rounded-full hover:text-electric-400 hover:border-electric-500/20 transition-colors cursor-default">
                {handle}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
