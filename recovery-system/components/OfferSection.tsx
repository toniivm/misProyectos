'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Shield, Truck, Zap, Star, Clock } from 'lucide-react'

const plans = [
  {
    id: 'starter',
    name: 'STARTER',
    tagline: 'Begin your recovery',
    price: '€89',
    original: '€149',
    savings: 'Save €60',
    badge: null,
    description: 'The perfect entry point. Start with the most impactful recovery tool.',
    items: ['PULSE PRO X Massage Gun', '8 interchangeable heads', 'Type-C carry case', 'Recovery guide PDF', 'Email support'],
    notIncluded: ['Neck Massager', 'SleepSeal Strips', 'Priority support'],
    cta: 'Get Starter Kit',
    accent: 'border-white/8',
    glow: '',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'PRO',
    tagline: 'The complete experience',
    price: '€148',
    original: '€248',
    savings: 'Save €100 (40%)',
    badge: 'MOST POPULAR',
    description: 'Muscle recovery + cervical relief. The 2-product stack for daily performers.',
    items: [
      'PULSE PRO X Massage Gun',
      'CERVIFLEX™ Neck Massager',
      '8 interchangeable heads',
      'Premium carry case',
      'Recovery protocol guide',
      'Priority email + chat support',
      'Free tracked shipping',
    ],
    notIncluded: ['SleepSeal Strips'],
    cta: 'Get Pro Kit',
    accent: 'border-electric-500/40',
    glow: 'shadow-[0_0_60px_rgba(14,165,233,0.2)]',
    highlight: true,
  },
  {
    id: 'elite',
    name: 'ELITE',
    tagline: 'Maximum performance recovery',
    price: '€177',
    original: '€297',
    savings: 'Save €120 (40%)',
    badge: 'BEST VALUE',
    description: 'The full RECOVERY SYSTEM™. All 3 tools. Complete 24/7 recovery protocol.',
    items: [
      'PULSE PRO X Massage Gun',
      'CERVIFLEX™ Neck Massager',
      'SLEEPSEAL™ 30-night pack',
      '8 interchangeable heads',
      'Premium carry case + pouch',
      'Elite recovery protocol guide',
      'Priority VIP support',
      'Free express shipping',
      '30-day money-back guarantee',
    ],
    notIncluded: [],
    cta: 'Get Elite System',
    accent: 'border-violet-500/30',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    highlight: false,
  },
]

const trustSignals = [
  { icon: Shield, label: '30-Day Money-Back', sub: 'Zero questions asked' },
  { icon: Truck, label: 'Free Shipping', sub: 'On all orders' },
  { icon: Zap, label: 'Ships in 24h', sub: 'Express available' },
  { icon: Star, label: '4.9 / 5 Stars', sub: '10,000+ reviews' },
  { icon: Clock, label: '24/7 Support', sub: 'Real humans respond' },
]

export default function OfferSection() {
  const [selected, setSelected] = useState('pro')

  return (
    <section id="offer" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#08070f] to-[#050508]" />

      {/* Ambient */}
      <div className="glow-blob w-[600px] h-[400px] bg-electric-500/8 top-1/4 left-1/2 -translate-x-1/2" />
      <div className="glow-blob w-[500px] h-[300px] bg-violet-500/6 bottom-1/4 right-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-6">Limited Offer</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-6">
            Choose your{' '}
            <span className="gradient-text">recovery kit.</span>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Bundle pricing unlocked for a limited time. The full system pays for itself in the first week of better sleep alone.
          </p>

          {/* Urgency bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Limited stock — 847 kits sold this week
          </motion.div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onClick={() => setSelected(plan.id)}
              className={`relative glass-card rounded-3xl p-8 border cursor-pointer transition-all duration-300 ${plan.accent} ${plan.glow} ${
                selected === plan.id ? 'ring-2 ring-electric-500/50' : ''
              } ${plan.highlight ? 'scale-[1.02] lg:scale-105' : ''}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full ${
                    plan.id === 'pro'
                      ? 'bg-electric-500 text-white shadow-glow'
                      : 'bg-violet-500/80 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="text-xs font-black tracking-[0.25em] text-slate-500 mb-2">{plan.name}</div>
                <div className="font-display font-black text-4xl text-white">{plan.price}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-600 line-through">{plan.original}</span>
                  <span className="text-xs font-semibold text-green-400">{plan.savings}</span>
                </div>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{plan.description}</p>
              </div>

              {/* Items */}
              <ul className="space-y-2.5 mb-6">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className="text-electric-400 mt-0.5 shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
                {plan.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm opacity-40">
                    <span className="w-3.5 mt-0.5 shrink-0 text-slate-600 text-center">—</span>
                    <span className="text-slate-500 line-through">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-electric-500 text-white hover:bg-electric-400 shadow-glow hover:shadow-glow-lg'
                    : plan.id === 'elite'
                    ? 'bg-violet-600/80 text-white hover:bg-violet-500'
                    : 'glass-card border border-white/10 text-white hover:border-white/20'
                }`}
              >
                {plan.cta}
              </motion.button>

              {/* Guarantee note */}
              <p className="text-center text-xs text-slate-600 mt-4">
                30-day money-back guarantee
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {trustSignals.map((t) => (
            <div key={t.label} className="glass-card border border-white/5 rounded-xl p-4 text-center">
              <t.icon size={18} className="text-electric-400 mx-auto mb-2" />
              <div className="text-xs font-semibold text-white">{t.label}</div>
              <div className="text-[10px] text-slate-600 mt-0.5">{t.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Payment logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <span className="text-xs text-slate-600">Secure checkout:</span>
          {['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map((p) => (
            <span key={p} className="text-[10px] font-bold text-slate-600 bg-white/3 border border-white/5 px-3 py-1.5 rounded-md tracking-wider">
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
