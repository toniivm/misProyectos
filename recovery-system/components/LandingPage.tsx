'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Check, ChevronDown, Globe, Menu, ShieldCheck, X, Zap, Moon, Battery, Activity, Heart} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {useMemo, useState} from 'react';

/* ── Shared fade-up animation ── */
const fadeUp = {
  hidden: {opacity: 0, y: 20},
  show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: 'easeOut'}}
};

/* ── Product placeholder visual ── */
const productColors = [
  {bg: '#f8fafc', icon: '💆'},
  {bg: '#f0fdf4', icon: '🧘'},
  {bg: '#f0f9ff', icon: '🌙'},
];

function ProductVisual({index}: {index: number}) {
  const {bg, icon} = productColors[index];
  return (
    <div
      className="flex h-52 w-full items-center justify-center rounded-2xl text-5xl"
      style={{background: bg, border: '1px solid #e5e7eb'}}
    >
      {icon}
    </div>
  );
}

/* ── Language switcher ── */
function LanguageSwitch() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
      >
        <Globe size={13} />
        {locale.toUpperCase()}
        <ChevronDown size={12} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 6}}
            transition={{duration: 0.15}}
            className="absolute right-0 mt-1.5 w-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            {(['es', 'en'] as const).map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-xs font-semibold transition ${
                  locale === code
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {code.toUpperCase()}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function LandingPage() {
  const t = useTranslations();
  const [mobileMenu, setMobileMenu] = useState(false);

  const problemItems  = t.raw('problem.items')   as string[];
  const benefits      = t.raw('benefits.items')  as string[];
  const before        = t.raw('transformation.before') as string[];
  const after         = t.raw('transformation.after')  as string[];
  const products      = t.raw('system.products') as Array<{name: string; tag: string; focus: string; features: string[]}>;
  const testimonials  = t.raw('social.testimonials') as Array<{name: string; role: string; quote: string}>;
  const plans         = t.raw('plans.cards') as Array<{name: string; price: string; description: string; items: string[]}>;

  const benefitIcons = [Activity, Moon, Heart, Zap, ShieldCheck, Battery];

  const navLinks = useMemo(() => [
    {href: '#system',   label: t('nav.links.system')},
    {href: '#benefits', label: t('nav.links.benefits')},
    {href: '#reviews',  label: t('nav.links.reviews')},
    {href: '#plans',    label: t('nav.links.plans')},
  ], [t]);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">

          <Link href="#" className="font-display text-sm font-extrabold tracking-widest text-gray-900">
            {t('nav.brand')}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map(({href, label}) => (
              <a key={href} href={href}
                className="text-sm font-medium text-gray-500 transition hover:text-gray-900">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch />
            <a href="#plans" className="btn-primary text-sm">{t('nav.cta')}</a>
          </div>

          <button
            className="inline-flex rounded-lg border border-gray-200 bg-white p-2 text-gray-600 lg:hidden"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label="menu"
          >
            {mobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.2}}
              className="overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="space-y-1 px-5 py-4">
                {navLinks.map(({href, label}) => (
                  <a key={href} href={href}
                    onClick={() => setMobileMenu(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {label}
                  </a>
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <LanguageSwitch />
                  <a href="#plans" onClick={() => setMobileMenu(false)}
                    className="btn-primary text-sm">
                    {t('nav.cta')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial="hidden" animate="show" variants={fadeUp}
          className="space-y-6"
        >
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-600">
            {t('hero.kicker')}
          </span>

          <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl">
            {t('hero.line1')}<br />
            <span className="text-[#1a56db]">{t('hero.line2')}</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-gray-500">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#plans" className="btn-primary">{t('hero.primary')}</a>
            <a href="#system" className="btn-secondary">{t('hero.secondary')}</a>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {[t('hero.metrics.users'), t('hero.metrics.rating'), t('hero.metrics.guarantee')].map((m) => (
              <div key={m} className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                <Check size={14} className="text-[#1a56db]" />
                {m}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.15}}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2"><ProductVisual index={0} /></div>
          <ProductVisual index={1} />
          <ProductVisual index={2} />
        </motion.div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="max-w-2xl"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900">
              {t('problem.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">{t('problem.body')}</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{once: true}}
            variants={{show: {transition: {staggerChildren: 0.06}}}}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {problemItems.map((item) => (
              <motion.div key={item} variants={fadeUp}
                className="flex items-start gap-3 rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-100">
                <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-400" />
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="system" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="mb-12 max-w-xl"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900">{t('system.title')}</h2>
            <p className="mt-4 text-lg text-gray-500">{t('system.description')}</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product, i) => (
              <motion.article
                key={product.name}
                initial="hidden" whileInView="show" viewport={{once: true}}
                variants={fadeUp}
                transition={{delay: i * 0.08}}
                whileHover={{y: -4, transition: {duration: 0.2}}}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <ProductVisual index={i} />
                <div className="mt-5 flex-1 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">{product.tag}</span>
                  <h3 className="font-display text-2xl font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{product.focus}</p>
                  <ul className="space-y-1.5 pt-1">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={13} className="flex-shrink-0 text-[#1a56db]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#plans" className="btn-primary mt-6 w-full">{t('nav.cta')}</a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="benefits" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="mb-10 font-display text-4xl font-bold tracking-tight text-gray-900"
          >
            {t('benefits.title')}
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <motion.div key={benefit}
                  initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
                  transition={{delay: i * 0.05}}
                  className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eff3ff]">
                    <Icon size={18} className="text-[#1a56db]" />
                  </span>
                  <span className="font-semibold text-gray-800">{benefit}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="mb-10 font-display text-4xl font-bold tracking-tight text-gray-900"
          >
            {t('transformation.title')}
          </motion.h2>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
              className="rounded-2xl border border-red-100 bg-red-50 p-8"
            >
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-red-400">Before</p>
              <ul className="space-y-3">
                {before.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-red-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
              transition={{delay: 0.1}}
              className="rounded-2xl border border-green-100 bg-green-50 p-8"
            >
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-green-500">After</p>
              <ul className="space-y-3">
                {after.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-green-900">
                    <Check size={14} className="flex-shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="mb-10 font-display text-4xl font-bold tracking-tight text-gray-900"
          >
            {t('social.title')}
          </motion.h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.article key={item.name}
                initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
                transition={{delay: i * 0.08}}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <div className="mb-4 flex gap-0.5 text-amber-400">
                  {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-700">"{item.quote}"</p>
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{item.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="plans" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="mb-12 text-center font-display text-4xl font-bold tracking-tight text-gray-900"
          >
            {t('plans.title')}
          </motion.h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => {
              const isFeatured = i === 1;
              return (
                <motion.article key={plan.name}
                  initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
                  transition={{delay: i * 0.08}}
                  className={`relative flex flex-col rounded-2xl p-8 ${
                    isFeatured
                      ? 'bg-gray-900 text-white shadow-2xl'
                      : 'border border-gray-100 bg-white shadow-sm'
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#1a56db] px-4 py-1 text-xs font-bold text-white">
                      Most popular
                    </span>
                  )}
                  <p className={`text-xs font-bold uppercase tracking-widest ${isFeatured ? 'text-blue-300' : 'text-gray-400'}`}>
                    {plan.name}
                  </p>
                  <p className={`mt-3 font-display text-5xl font-black ${isFeatured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </p>
                  <p className={`mt-2 text-sm ${isFeatured ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.items.map((entry) => (
                      <li key={entry} className={`flex items-center gap-2.5 text-sm ${isFeatured ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Check size={14} className={isFeatured ? 'text-blue-400' : 'text-[#1a56db]'} />
                        {entry}
                      </li>
                    ))}
                  </ul>
                  <a href="#"
                    className={`mt-8 w-full rounded-xl py-3 text-center text-sm font-semibold transition ${
                      isFeatured
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'btn-primary'
                    }`}
                  >
                    {plan.name}
                  </a>
                </motion.article>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">{t('plans.footnote')}</p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-gray-900 py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <motion.div
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="font-display text-5xl font-black tracking-tight text-white">
              {t('finalCta.title')}
            </h2>
            <p className="text-lg text-gray-400">{t('finalCta.subtitle')}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a href="#plans" className="btn-accent px-8 py-3.5 text-sm">{t('finalCta.primary')}</a>
              <a href="#system" className="btn-secondary-light">{t('finalCta.secondary')}</a>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs text-gray-400">
              <ShieldCheck size={13} />
              Premium checkout · Secure payments · Free shipping
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-gray-400 sm:flex-row">
          <span className="font-display font-bold tracking-widest text-gray-900">{t('nav.brand')}</span>
          <span>© {new Date().getFullYear()} · Premium Recovery Technology</span>
        </div>
      </footer>
    </div>
  );
}


const reveal = {
  hidden: {opacity: 0, y: 26},
  show: {opacity: 1, y: 0}
};

function ProductVisual({index}: {index: number}) {
  const styles = [
    'from-sky-100 to-slate-100',
    'from-slate-100 to-blue-50',
    'from-white to-sky-50'
  ];

  return (
    <motion.div
      initial={{y: 0}}
      animate={{y: [0, -6, 0]}}
      transition={{repeat: Infinity, duration: 5 + index, ease: 'easeInOut'}}
      className={`h-56 w-full rounded-2xl bg-gradient-to-br ${styles[index]} border border-slate-200 shadow-[0_16px_60px_rgba(15,23,42,0.15)]`}
    >
      <div className="h-full w-full rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.3),transparent_45%)] p-5">
        <div className="h-full w-full rounded-xl border border-white/80 bg-white/60 backdrop-blur-sm" />
      </div>
    </motion.div>
  );
}

function LanguageSwitch() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const options = [
    {code: 'es', label: 'ES'},
    {code: 'en', label: 'EN'}
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-white"
      >
        <Globe size={14} />
        {locale.toUpperCase()}
        <ChevronDown size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 8}}
            className="absolute right-0 mt-2 w-24 rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
          >
            {options.map((opt) => (
              <Link
                key={opt.code}
                href={`/${opt.code}`}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  locale === opt.code
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  const t = useTranslations();
  const [mobileMenu, setMobileMenu] = useState(false);

  const problemItems = t.raw('problem.items') as string[];
  const benefits = t.raw('benefits.items') as string[];
  const before = t.raw('transformation.before') as string[];
  const after = t.raw('transformation.after') as string[];
  const products = t.raw('system.products') as Array<{
    name: string;
    tag: string;
    focus: string;
    features: string[];
  }>;
  const testimonials = t.raw('social.testimonials') as Array<{
    name: string;
    role: string;
    quote: string;
  }>;
  const plans = t.raw('plans.cards') as Array<{
    name: string;
    price: string;
    description: string;
    items: string[];
  }>;

  const navLinks = useMemo(
    () => [
      {href: '#system', label: t('nav.links.system')},
      {href: '#benefits', label: t('nav.links.benefits')},
      {href: '#reviews', label: t('nav.links.reviews')},
      {href: '#plans', label: t('nav.links.plans')}
    ],
    [t]
  );

  return (
    <main className="relative bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_45%,#f8fafc_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(30,64,175,0.1),transparent_30%)]" />

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="#" className="text-sm font-extrabold tracking-[0.18em] text-slate-900">
            {t('nav.brand')}
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch />
            <a href="#plans" className="btn-primary">
              {t('nav.cta')}
            </a>
          </div>

          <button
            className="inline-flex rounded-full border border-slate-300 bg-white p-2 lg:hidden"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label="menu"
          >
            {mobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{opacity: 0, y: -8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              className="border-t border-slate-200 bg-white p-5 lg:hidden"
            >
              <div className="mb-4 flex flex-col gap-3">
                {navLinks.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileMenu(false)} className="text-sm font-medium text-slate-700">
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3">
                <LanguageSwitch />
                <a href="#plans" className="btn-primary text-xs">
                  {t('nav.cta')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="relative mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-14 px-5 pb-16 pt-14 lg:grid-cols-2 lg:px-8">
        <motion.div initial="hidden" animate="show" variants={reveal} transition={{duration: 0.6}} className="space-y-7">
          <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
            {t('hero.kicker')}
          </p>
          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl">
            {t('hero.line1')}
            <span className="mt-2 block bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent">{t('hero.line2')}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-600">{t('hero.subtitle')}</p>

          <div className="flex flex-wrap gap-3">
            <a href="#plans" className="btn-primary">{t('hero.primary')}</a>
            <a href="#system" className="btn-secondary">{t('hero.secondary')}</a>
          </div>

          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">{t('hero.metrics.users')}</div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">{t('hero.metrics.rating')}</div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">{t('hero.metrics.guarantee')}</div>
          </div>
        </motion.div>

        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.7, delay: 0.2}} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><ProductVisual index={0} /></div>
          <ProductVisual index={1} />
          <ProductVisual index={2} />
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <motion.div whileInView="show" initial="hidden" viewport={{once: true}} variants={reveal} transition={{duration: 0.5}} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] lg:p-12">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950">{t('problem.title')}</h2>
          <p className="mt-4 max-w-3xl text-slate-600">{t('problem.body')}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problemItems.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="system" className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <motion.div whileInView="show" initial="hidden" viewport={{once: true}} variants={reveal} className="mb-8">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950">{t('system.title')}</h2>
          <p className="mt-4 max-w-3xl text-slate-600">{t('system.description')}</p>
        </motion.div>
        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.article
              key={product.name}
              whileInView={{opacity: 1, y: 0}}
              initial={{opacity: 0, y: 20}}
              viewport={{once: true}}
              transition={{delay: i * 0.1}}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.07)]"
            >
              <ProductVisual index={i} />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">{product.tag}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">{product.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.focus}</p>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check size={14} className="text-sky-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="benefits" className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950">{t('benefits.title')}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div key={benefit} whileHover={{y: -4}} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-xl bg-sky-100 p-3 text-sky-700">
                {i % 2 === 0 ? <Zap size={18} /> : <Sparkles size={18} />}
              </div>
              <p className="font-semibold text-slate-900">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8">
          <h3 className="text-lg font-bold uppercase tracking-[0.15em] text-rose-800">Before</h3>
          <ul className="mt-5 space-y-2 text-rose-900">
            {before.map((item) => (
              <li key={item} className="rounded-lg bg-white/70 px-4 py-2">{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
          <h3 className="text-lg font-bold uppercase tracking-[0.15em] text-emerald-800">After</h3>
          <ul className="mt-5 space-y-2 text-emerald-900">
            {after.map((item) => (
              <li key={item} className="rounded-lg bg-white/80 px-4 py-2">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="reviews" className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950">{t('social.title')}</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-1 text-amber-500">★★★★★</div>
              <p className="text-sm leading-relaxed text-slate-700">“{item.quote}”</p>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="plans" className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950">{t('plans.title')}</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-7 shadow-sm ${
                i === 1
                  ? 'border-sky-400 bg-sky-50 shadow-[0_20px_70px_rgba(14,165,233,0.2)]'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{plan.name}</p>
              <p className="mt-3 font-display text-4xl font-extrabold text-slate-950">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {plan.items.map((entry) => (
                  <li key={entry} className="flex items-center gap-2">
                    <Check size={14} className="text-sky-700" />
                    {entry}
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-primary mt-6 w-full justify-center">
                {plan.name}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-medium text-slate-500">{t('plans.footnote')}</p>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-24 pt-10 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-10 text-center text-white shadow-[0_20px_80px_rgba(2,6,23,0.5)] lg:p-14">
          <Moon className="mx-auto mb-4 text-sky-300" />
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{t('finalCta.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">{t('finalCta.subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#plans" className="btn-primary">{t('finalCta.primary')}</a>
            <a href="#system" className="btn-secondary-light">{t('finalCta.secondary')}</a>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-slate-300">
            <ShieldCheck size={14} />
            Premium checkout · Secure payments · Free shipping
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/80 py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-500 lg:flex-row lg:px-8">
          <p>{t('nav.brand')}</p>
          <p>© {new Date().getFullYear()} · Premium Recovery Technology</p>
        </div>
      </footer>
    </main>
  );
}
