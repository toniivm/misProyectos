'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCart } from '../context/CartContext';
import { getModuleBySlug, MODULES } from '../lib/modules';
import { type Product, PRODUCTS } from '../lib/products';
import { MODULE_VISUALS } from './ModuleVisuals';

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const MODULE_FUNCTIONS: Record<string, string[]> = {
  'sleep-induction-module': [
    'Beta → alpha → theta brainwave entrainment',
    'Calibrated audio frequencies for sleep induction',
    'Compatible with Night Reset, Deep Sleep, and Full Recovery protocols',
    'Phase 3 activation — final stage of the protocol',
    '22–45 min session duration',
  ],
  'cervical-downshift-module': [
    'Releases cervical-trapezius tension accumulation',
    'Decompresses the primary site of chronic mental load',
    'Phase 1 activation — first stage, physical gateway',
    'Prepares the nervous system for neural decompression',
    '18–45 min session duration',
  ],
  'sensory-stillness-module': [
    'Reduces external sensory input',
    'Creates perceptual isolation for parasympathetic shift',
    'Phase 2 activation — descent stage',
    'Works in sequence after Cervical Downshift',
    '20–30 min session duration',
  ],
  'environment-calibration-module': [
    'Synchronizes light temperature, sound floor, and air',
    'Creates a personalized sleep-optimized environment signature',
    'Passive activation — begins 90 min before protocol',
    'Conditions the body before conscious effort begins',
    'Required for Deep Sleep and Full Recovery Systems',
  ],
};

export default function ProductDetail({ product }: { product: Product }) {
  const locale = useLocale();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const mod = getModuleBySlug(product.slug);
  const functions = MODULE_FUNCTIONS[product.slug] ?? [];

  const handleAdd = () => {
    for (let q = 0; q < qty; q++) {
      add({ slug: product.slug, name: product.name, price: product.price, icon: product.icon });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const otherModules = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 2);
  const ModuleVisual = MODULE_VISUALS[product.slug] ?? null;

  return (
    <div className="min-h-screen bg-[#080808] text-[#E8E4DF]">
      {/* Minimal header */}
      <header
        className="sticky top-0 z-30 flex h-16 items-center justify-between px-6 md:px-10"
        style={{
          background: 'rgba(8,8,8,0.92)',
          borderBottom: '1px solid rgba(232,228,223,0.06)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Link
          href={`/${locale}`}
          className="font-display font-semibold text-[#E8E4DF] tracking-[0.12em] text-sm"
        >
          RS™
        </Link>
        <Link
          href={`/${locale}/checkout`}
          className="text-[#080808] bg-[#E8E4DF] text-xs tracking-[0.14em] uppercase px-5 py-2 hover:bg-[#C8B89A] transition-colors duration-[600ms] font-medium"
        >
          Proceed to Checkout
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        {/* Back */}
        <Link
          href={`/${locale}`}
          className="mb-12 inline-flex items-center gap-2 text-xs text-[#4A4744] tracking-[0.14em] uppercase hover:text-[#8A8580] transition-colors duration-500"
        >
          <ArrowLeft size={12} />
          Back to Recovery OS
        </Link>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — Module visual */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            {/* Main visual */}
            <div
              className="flex h-80 sm:h-[420px] w-full items-center justify-center p-10"
              style={{
                background: '#111111',
                border: '1px solid rgba(232,228,223,0.08)',
              }}
            >
              {ModuleVisual ? (
                <ModuleVisual className="w-full h-full max-h-[340px] object-contain" />
              ) : (
                <div className="text-center">
                  <span
                    className="font-mono text-[#4A4744] text-xs tracking-widest block mb-6 px-3 py-1.5 mx-auto w-fit"
                    style={{ border: '1px solid rgba(232,228,223,0.08)' }}
                  >
                    {mod?.abbr ?? product.icon}
                  </span>
                  <p className="font-display text-5xl font-light text-[#E8E4DF]/20 tracking-[-0.02em]">
                    {mod?.phase ?? ''}
                  </p>
                </div>
              )}
            </div>

            {/* Three detail panels */}
            <div className="mt-1 grid grid-cols-3 gap-px" style={{ background: 'rgba(232,228,223,0.06)' }}>
              {[
                { label: 'Phase', value: mod?.phaseName ?? '—' },
                { label: 'Duration', value: mod?.duration ?? '—' },
                { label: 'Function', value: mod?.function ?? '—' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#080808] p-5 flex flex-col gap-1"
                >
                  <span className="text-[#4A4744] text-[9px] tracking-widest uppercase font-mono">
                    {label}
                  </span>
                  <span className="text-[#8A8580] text-xs font-light leading-relaxed">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Module info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="flex flex-col"
          >
            {/* Label */}
            <span className="text-[#4A4744] text-[10px] tracking-[0.22em] uppercase font-mono mb-4">
              {mod?.function ?? product.tag}
            </span>

            {/* Name */}
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#E8E4DF] tracking-[-0.02em] mb-6 leading-[0.95]">
              {product.name}
            </h1>

            {/* Description */}
            {mod?.description && (
              <p className="text-[#8A8580] text-base font-light leading-relaxed mb-8">
                {mod.description}
              </p>
            )}

            {/* Functions */}
            {functions.length > 0 && (
              <ul className="flex flex-col gap-3 mb-10">
                {functions.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      size={12}
                      className="mt-0.5 shrink-0"
                      style={{ color: '#C8B89A' }}
                    />
                    <span className="text-[#8A8580] font-light">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Pricing — minimal */}
            <div
              className="flex items-baseline gap-4 py-6 mb-8"
              style={{ borderTop: '1px solid rgba(232,228,223,0.06)', borderBottom: '1px solid rgba(232,228,223,0.06)' }}
            >
              <span className="font-display text-4xl font-semibold text-[#E8E4DF]">
                €{product.price}
              </span>
              <span className="text-[#4A4744] text-sm line-through">€{product.comparePrice}</span>
              <span className="text-[#4A4744] text-xs font-mono">
                Save €{product.comparePrice - product.price}
              </span>
            </div>

            {/* Qty + Add to protocol */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="flex items-center"
                style={{ border: '1px solid rgba(232,228,223,0.1)', background: '#111111' }}
              >
                <button
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="px-5 py-3 text-[#8A8580] hover:text-[#E8E4DF] transition-colors duration-300 text-sm"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm text-[#E8E4DF] font-mono">{qty}</span>
                <button
                  onClick={() => setQty((v) => v + 1)}
                  className="px-5 py-3 text-[#8A8580] hover:text-[#E8E4DF] transition-colors duration-300 text-sm"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 text-xs tracking-[0.14em] uppercase font-medium transition-all duration-[600ms]"
                style={{
                  background: added ? '#2A2A1A' : '#111111',
                  border: `1px solid ${added ? 'rgba(200,184,154,0.4)' : 'rgba(232,228,223,0.15)'}`,
                  color: added ? '#C8B89A' : '#E8E4DF',
                }}
              >
                {added ? '✓ Added to protocol' : 'Add to protocol'}
              </button>
            </div>

            <Link
              href={`/${locale}/checkout`}
              className="flex w-full items-center justify-center py-3.5 text-xs tracking-[0.14em] uppercase font-medium transition-colors duration-[600ms] mb-8"
              style={{ background: '#E8E4DF', color: '#080808' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#C8B89A')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#E8E4DF')}
            >
              Begin with this module — €{(product.price * qty).toFixed(2)}
            </Link>

            {/* Trust */}
            <div
              className="grid grid-cols-3 gap-px"
              style={{ background: 'rgba(232,228,223,0.06)' }}
            >
              {[
                { label: '30-day protocol guarantee' },
                { label: 'Free shipping worldwide' },
                { label: 'Secure checkout' },
              ].map(({ label }) => (
                <div
                  key={label}
                  className="bg-[#080808] px-4 py-4 text-center"
                >
                  <span className="text-[#4A4744] text-[10px] tracking-wide font-light leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related modules */}
        <div
          className="mt-24 pt-16"
          style={{ borderTop: '1px solid rgba(232,228,223,0.06)' }}
        >
          <p className="text-[#4A4744] text-[10px] tracking-[0.22em] uppercase mb-8">
            Related Modules
          </p>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: 'rgba(232,228,223,0.06)' }}
          >
            {otherModules.map((p) => {
              const relMod = getModuleBySlug(p.slug);
              return (
                <Link
                  key={p.slug}
                  href={`/${locale}/products/${p.slug}`}
                  className="group block bg-[#080808] p-8 hover:bg-[#0D0D0D] transition-colors duration-700"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="font-mono text-[#4A4744] text-[11px] tracking-widest px-3 py-1.5"
                      style={{ border: '1px solid rgba(232,228,223,0.08)' }}
                    >
                      {relMod?.abbr ?? p.icon}
                    </span>
                    <span className="font-mono text-[#4A4744] text-[10px] tracking-widest">
                      {relMod?.phase ?? ''}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-[#E8E4DF] mb-2 group-hover:text-[#C8B89A] transition-colors duration-[600ms]">
                    {p.name}
                  </h3>
                  <p className="text-[#4A4744] text-sm font-light">{relMod?.function ?? p.tag}</p>
                  <p className="text-[#8A8580] text-sm mt-3">€{p.price}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
