'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative py-28 lg:py-44 overflow-hidden">
      {/* Dark BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#060510] to-[#050508]" />

      {/* Ambient glows */}
      <div className="glow-blob w-[800px] h-[800px] bg-electric-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-blob w-[400px] h-[400px] bg-violet-500/8 bottom-0 right-0" />
      <div className="glow-blob w-[300px] h-[300px] bg-electric-500/10 top-1/4 left-1/4" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,165,233,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Tag */}
          <span className="section-tag">Your Next Step</span>

          {/* Headline */}
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-[-0.02em] mt-6">
            <motion.span
              className="block text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Recover harder.
            </motion.span>
            <motion.span
              className="block gradient-text-blue mt-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sleep deeper.
            </motion.span>
            <motion.span
              className="block gradient-text mt-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Perform better.
            </motion.span>
          </h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            The RECOVERY SYSTEM™ is not a product. It's a commitment to your performance.
            Every elite athlete, founder, and high performer has a recovery ritual.
            <span className="text-slate-200 font-medium"> This is yours.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#offer"
              className="btn-primary group text-sm py-5 px-12"
            >
              <span className="relative z-10">Build My Recovery Kit</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#products" className="btn-ghost text-sm py-5 px-10">
              Explore Products
            </a>
          </motion.div>

          {/* Micro-guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-2"
          >
            {[
              '30-day guarantee',
              'Free shipping',
              '10,000+ athletes',
              'Ships today',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-4 h-px bg-electric-500/30" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-electric-500/20 to-transparent" />
      </div>
    </section>
  )
}
