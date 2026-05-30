'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAuth } from '../context/AuthContext';
import { MODULES, SYSTEMS, getSystemByStressLevel } from '../lib/modules';
import { MODULE_VISUALS } from './ModuleVisuals';

// ─── Types ───────────────────────────────────────────────────────
type StressLevel = 'low' | 'moderate' | 'high';

// ─── Easing ──────────────────────────────────────────────────────
const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

// ─── Entry Gate ──────────────────────────────────────────────────
function EntryGate({ onComplete }: { onComplete: (level: StressLevel) => void }) {
  const [phase, setPhase] = useState<'in' | 'out'>('out');

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p === 'in' ? 'out' : 'in')), 4000);
    return () => clearInterval(t);
  }, []);

  const states: { id: StressLevel; label: string; size: number }[] = [
    { id: 'low', label: 'Manageable', size: 52 },
    { id: 'moderate', label: 'Elevated', size: 72 },
    { id: 'high', label: 'Overloaded', size: 96 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    >
      {/* Breathing circle */}
      <div className="relative flex items-center justify-center mb-16">
        <motion.div
          className="absolute rounded-full border border-[#E8E4DF]/10"
          style={{ width: 200, height: 200 }}
          animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
          transition={{ duration: 3, ease: 'easeOut', repeat: Infinity }}
        />
        <motion.div
          className="rounded-full border border-[#E8E4DF]/20"
          style={{ width: 160, height: 160, boxShadow: '0 0 80px rgba(232,228,223,0.04)' }}
          animate={{
            scale: phase === 'in' ? 1.12 : 1,
            opacity: phase === 'in' ? 0.75 : 0.35,
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
      </div>

      <motion.p
        className="text-[#E8E4DF] text-lg font-light tracking-[0.08em] mb-14 text-center px-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
      >
        How overstimulated are you right now?
      </motion.p>

      <motion.div
        className="flex items-end gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
      >
        {states.map(({ id, label, size }) => (
          <button
            key={id}
            onClick={() => onComplete(id)}
            className="flex flex-col items-center gap-4 group cursor-pointer"
          >
            <motion.div
              className="rounded-full border border-[#E8E4DF]/15 bg-[#E8E4DF]/[0.04] transition-colors duration-700 group-hover:border-[#E8E4DF]/35 group-hover:bg-[#E8E4DF]/[0.08]"
              style={{ width: size, height: size }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6 }}
            />
            <span className="text-[#8A8580] text-[10px] tracking-[0.18em] uppercase font-light">
              {label}
            </span>
          </button>
        ))}
      </motion.div>

      <motion.button
        className="absolute bottom-10 text-[#4A4744] text-xs tracking-widest hover:text-[#8A8580] transition-colors duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={() => onComplete('moderate')}
      >
        SKIP
      </motion.button>
    </motion.div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────
function RecoveryNavbar({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false);

  const localeHook = useLocale();
  const rawPathname = usePathname() || '/';
  const auth = useAuth();

  const switchHref = (() => {
    let p = rawPathname;
    if (!p.startsWith('/')) p = '/' + p;
    if (/^\/es(\/|$)/.test(p)) return p.replace(/^\/es/, '/en');
    if (/^\/en(\/|$)/.test(p)) return p.replace(/^\/en/, '/es');
    const other = (localeHook === 'es' ? 'en' : 'es');
    return `/${other}${p === '/' ? '/' : p}`;
  })();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 h-16 transition-all duration-700"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(232,228,223,0.06)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <span className="font-display font-semibold text-[#E8E4DF] tracking-[0.12em] text-sm">
        RS™
      </span>

      <div className="hidden md:flex items-center gap-8">
        {[
          { label: 'Modules', href: '#modules' },
          { label: 'Systems', href: '#systems' },
          { label: 'Protocol', href: '#protocol' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-[#8A8580] text-xs tracking-[0.14em] uppercase hover:text-[#E8E4DF] transition-colors duration-500"
          >
            {label}
          </a>
        ))}
      </div>

      <a
        href="#modules"
        className="text-[#080808] bg-[#E8E4DF] text-xs tracking-[0.14em] uppercase px-5 py-2 hover:bg-[#C8B89A] transition-colors duration-[600ms] font-medium"
      >
        Begin Protocol
      </a>

      <div className="flex items-center gap-3">
        <a href={switchHref} className="inline-flex items-center text-[#8A8580] text-xs hover:text-[#E8E4DF]">{(localeHook||locale).toUpperCase()}</a>
        <button
          data-rs-login="true"
          aria-label={auth && auth.user ? 'Cerrar sesión' : 'Abrir inicio de sesión'}
          onClick={() => {
            if (auth && auth.user) auth.logout();
            else auth.openModal();
          }}
          className="text-xs text-[#8A8580] hover:text-[#E8E4DF] ml-2"
        >
          {auth && auth.user ? 'Logout' : 'Login'}
        </button>
      </div>
    </motion.nav>
  );
}

// ─── Protocol Section ─────────────────────────────────────────────
function ProtocolSection({
  stressLevel,
  locale,
}: {
  stressLevel: StressLevel;
  locale: string;
}) {
  const system = getSystemByStressLevel(stressLevel);

  const phaseColors: Record<number, string> = {
    0: '#4A4744',
    1: '#7A6E60',
    2: '#9A8E80',
    3: '#C8B89A',
  };

  return (
    <section
      id="protocol"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-24"
    >
      <motion.p
        className="text-[#4A4744] text-[10px] tracking-[0.22em] uppercase mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Tonight's Protocol
      </motion.p>

      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-[#E8E4DF] leading-[0.92] tracking-[-0.02em] mb-6 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
      >
        {system.name}
      </motion.h1>

      <motion.p
        className="text-[#8A8580] text-lg md:text-xl font-light tracking-wide mb-4 max-w-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        {system.tagline}
      </motion.p>

      <motion.p
        className="text-[#4A4744] text-sm font-light mb-14 max-w-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        {system.target}
      </motion.p>

      <motion.div
        className="flex flex-col gap-0 mb-14 max-w-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.45 }}
      >
        {system.protocol.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-6 py-4"
            style={{ borderBottom: '1px solid rgba(232,228,223,0.06)' }}
          >
            <span className="text-[#4A4744] text-xs tracking-widest font-mono w-16 shrink-0">
              {step.time}
            </span>
            <div
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: phaseColors[step.phase] }}
            />
            <span className="text-[#E8E4DF] text-sm font-light flex-1">{step.module}</span>
            <span className="text-[#4A4744] text-xs font-mono">{step.duration}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.55 }}
      >
        <span className="text-[#4A4744] text-xs tracking-widest font-mono">
          {system.nights > 1 ? `${system.nights}-NIGHT PROTOCOL` : system.duration.toUpperCase()}
        </span>
        <a
          href="#modules"
          className="text-[#E8E4DF] text-xs tracking-[0.16em] uppercase hover:text-[#C8B89A] transition-colors duration-[600ms]"
          style={{ borderBottom: '1px solid rgba(232,228,223,0.2)', paddingBottom: '2px' }}
        >
          Configure Modules →
        </a>
      </motion.div>
    </section>
  );
}

// ─── Modules Section ──────────────────────────────────────────────
function ModulesSection({ locale }: { locale: string }) {
  return (
    <section id="modules" className="px-6 md:px-16 lg:px-24 py-24">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[#4A4744] text-[10px] tracking-[0.22em] uppercase mb-4">
          Hardware Modules
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#E8E4DF] tracking-[-0.02em] max-w-xl">
          Four input nodes. One protocol.
        </h2>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: '1px', background: 'rgba(232,228,223,0.06)' }}
      >
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT }}
          >
            <Link
              href={`/${locale}/products/${mod.slug}`}
              className="group block bg-[#080808] p-8 md:p-10 hover:bg-[#0D0D0D] transition-colors duration-700"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-mono text-[#4A4744] text-[11px] tracking-widest px-3 py-1.5"
                  style={{ border: '1px solid rgba(232,228,223,0.08)' }}
                >
                  {mod.abbr}
                </span>
                <span className="font-mono text-[#4A4744] text-[10px] tracking-widest">
                  {mod.phase}
                </span>
              </div>

              {/* Module visual preview */}
              {(() => {
                const Visual = MODULE_VISUALS[mod.slug];
                return Visual ? (
                  <div className="w-full h-36 mb-6 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                    <Visual className="w-auto h-full" />
                  </div>
                ) : null;
              })()}

              <h3 className="font-display text-2xl md:text-3xl font-medium text-[#E8E4DF] tracking-[-0.01em] mb-3 group-hover:text-[#C8B89A] transition-colors duration-[600ms]">
                {mod.name}
              </h3>

              <p className="text-[#8A8580] text-sm mb-5 tracking-wide">{mod.function}</p>

              <p className="text-[#4A4744] text-sm font-light leading-relaxed mb-8 max-w-sm">
                {mod.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[#4A4744] font-mono text-xs">{mod.duration}</span>
                <span className="text-[#8A8580] text-xs tracking-[0.14em] uppercase group-hover:text-[#E8E4DF] transition-colors duration-500">
                  Add to protocol →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Systems Section ──────────────────────────────────────────────
function SystemsSection({ locale }: { locale: string }) {
  const [active, setActive] = useState(0);
  const system = SYSTEMS[active];

  const phaseColors: Record<number, string> = {
    0: '#4A4744',
    1: '#7A6E60',
    2: '#9A8E80',
    3: '#C8B89A',
  };

  return (
    <section
      id="systems"
      className="px-6 md:px-16 lg:px-24 py-24"
      style={{ borderTop: '1px solid rgba(232,228,223,0.06)' }}
    >
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[#4A4744] text-[10px] tracking-[0.22em] uppercase mb-4">
          Recovery Systems
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#E8E4DF] tracking-[-0.02em] max-w-xl">
          Three complete experiences.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-0">
          {SYSTEMS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="text-left py-6 transition-all duration-[600ms]"
              style={{
                borderBottom: '1px solid rgba(232,228,223,0.06)',
                paddingLeft: '1rem',
                borderLeft: `2px solid ${active === i ? '#C8B89A' : 'transparent'}`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-display text-xl font-medium tracking-tight transition-colors duration-[600ms]"
                  style={{ color: active === i ? '#E8E4DF' : '#4A4744' }}
                >
                  {s.name}
                </span>
                <span className="font-mono text-xs text-[#4A4744]">{s.duration}</span>
              </div>
              <p
                className="text-sm font-light transition-colors duration-[600ms]"
                style={{ color: active === i ? '#8A8580' : '#4A4744' }}
              >
                {s.target.split('.')[0]}
              </p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={system.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="p-8 md:p-10"
            style={{ background: '#111111' }}
          >
            <p className="text-[#C8B89A] text-xs tracking-widest uppercase mb-6 font-mono">
              {system.tagline}
            </p>

            <h3 className="font-display text-3xl font-semibold text-[#E8E4DF] tracking-tight mb-8">
              {system.name}
            </h3>

            <div className="flex flex-col gap-0 mb-8">
              {system.protocol.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 py-3.5"
                  style={{ borderBottom: '1px solid rgba(232,228,223,0.06)' }}
                >
                  <span className="text-[#4A4744] text-xs font-mono w-16 shrink-0">
                    {step.time}
                  </span>
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: phaseColors[step.phase] }}
                  />
                  <span className="text-[#E8E4DF] text-sm font-light flex-1">{step.module}</span>
                  <span className="text-[#4A4744] text-xs font-mono text-right">
                    {step.duration}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/products/sleep-induction-module`}
              className="inline-block text-[#080808] bg-[#E8E4DF] px-7 py-3 text-xs tracking-[0.16em] uppercase hover:bg-[#C8B89A] transition-colors duration-[600ms] font-medium"
            >
              Enter System
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Philosophy Section ───────────────────────────────────────────
function PhilosophySection() {
  return (
    <section
      className="px-6 md:px-16 lg:px-24 py-32"
      style={{ borderTop: '1px solid rgba(232,228,223,0.06)' }}
    >
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE_OUT }}
      >
        <p className="text-[#4A4744] text-[10px] tracking-[0.22em] uppercase mb-8">
          System Philosophy
        </p>
        <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[#E8E4DF] leading-[1.2] tracking-[-0.01em] mb-8">
          "The system is intelligent.{' '}
          <span style={{ color: '#4A4744' }}>
            The user surrenders to it. That surrender is the product.
          </span>"
        </blockquote>
        <p className="text-[#8A8580] text-sm font-light leading-relaxed max-w-md">
          Recovery System is not a product company that sells devices. It is an operating system
          that uses devices as input nodes. The mental model is not{' '}
          <em style={{ color: '#4A4744' }}>"I bought a device."</em> It is:{' '}
          <em style={{ color: '#E8E4DF' }}>"I enrolled in a protocol."</em>
        </p>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function RecoveryFooter({ locale }: { locale: string }) {
  return (
    <footer
      className="px-6 md:px-16 lg:px-24 py-12"
      style={{ borderTop: '1px solid rgba(232,228,223,0.06)' }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-display font-semibold text-[#E8E4DF] tracking-[0.12em] text-sm block mb-2">
            RS™
          </span>
          <p className="text-[#4A4744] text-xs font-light max-w-xs leading-relaxed">
            A mental recovery operating system designed for overstimulated modern humans.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 text-xs text-[#4A4744]">
          <div className="flex flex-col gap-3">
            {MODULES.slice(0, 2).map((m) => (
              <Link
                key={m.slug}
                href={`/${locale}/products/${m.slug}`}
                className="hover:text-[#8A8580] transition-colors duration-500"
              >
                {m.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {MODULES.slice(2).map((m) => (
              <Link
                key={m.slug}
                href={`/${locale}/products/${m.slug}`}
                className="hover:text-[#8A8580] transition-colors duration-500"
              >
                {m.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-[#8A8580] transition-colors duration-500">
              Privacy
            </a>
            <a href="#" className="hover:text-[#8A8580] transition-colors duration-500">
              Legal
            </a>
            <a href="#" className="hover:text-[#8A8580] transition-colors duration-500">
              Module Support
            </a>
          </div>
        </div>
      </div>

      <p className="text-[#4A4744] text-[10px] tracking-widest mt-10">
        © {new Date().getFullYear()} RECOVERY SYSTEM™. All rights reserved.
      </p>
    </footer>
  );
}

// ─── Recovery OS ──────────────────────────────────────────────────
function RecoveryOS({ stressLevel, locale }: { stressLevel: StressLevel; locale: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: EASE_OUT }}
    >
      <RecoveryNavbar locale={locale} />
      <ProtocolSection stressLevel={stressLevel} locale={locale} />
      <ModulesSection locale={locale} />
      <SystemsSection locale={locale} />
      <PhilosophySection />
      <RecoveryFooter locale={locale} />
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────
export default function LandingPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';
  const [stressLevel, setStressLevel] = useState<StressLevel | null>(null);
  const [entryDone, setEntryDone] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('rs_stress_level') as StressLevel | null;
    if (saved) {
      setStressLevel(saved);
      setEntryDone(true);
    }
  }, []);

  const handleEntryComplete = (level: StressLevel) => {
    sessionStorage.setItem('rs_stress_level', level);
    setStressLevel(level);
    setEntryDone(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!entryDone ? (
        <EntryGate key="entry" onComplete={handleEntryComplete} />
      ) : (
        <RecoveryOS key="os" stressLevel={stressLevel!} locale={locale} />
      )}
    </AnimatePresence>
  );
}
