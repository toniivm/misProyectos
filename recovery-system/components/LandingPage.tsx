'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Check, ChevronDown, Globe, Menu, Moon, ShieldCheck, Sparkles, X, Zap} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {useMemo, useState} from 'react';

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
