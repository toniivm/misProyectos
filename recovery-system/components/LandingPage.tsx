'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Check, ChevronDown, Globe, Menu, ShoppingBag, ShieldCheck, X, Zap, Moon, Battery, Activity, Heart} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {useRouter, usePathname} from 'next/navigation';
import {useMemo, useRef, useEffect, useState, useTransition} from 'react';
import {useCart} from '../context/CartContext';
import {useAuth} from '../context/AuthContext';
import {PRODUCTS} from '../lib/products';

/* ── Shared fade-up animation ── */
const fadeUp = {
  hidden: {opacity: 0, y: 20},
  show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: 'easeOut'}}
};

/* ── Product placeholder visual ── */
const PRODUCT_BG = ['#f0f9ff', '#f0fdf4', '#faf5ff'];
const PRODUCT_ICON = ['💆', '🧘', '🌙'];

function ProductVisual({index, size = 'md'}: {index: number; size?: 'sm' | 'md' | 'lg'}) {
  const heights: Record<string, string> = {sm: 'h-40', md: 'h-52', lg: 'h-64'};
  return (
    <div
      className={`flex ${heights[size]} w-full items-center justify-center rounded-2xl text-5xl`}
      style={{background: PRODUCT_BG[index], border: '1px solid #e5e7eb'}}
    >
      {PRODUCT_ICON[index]}
    </div>
  );
}

function FAQItem({question, answer}: {question: string; answer: string}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-5">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronDown size={18} className={`flex-shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{duration: 0.2}}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Language switcher ── */
function LanguageSwitch() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (code: string) => {
    setOpen(false);
    if (code === locale) return;
    // Replace locale prefix in current path — SPA navigation, no full reload
    const newPath = pathname.replace(/^\/(es|en)/, '/' + code);
    startTransition(() => {
      router.push(newPath === pathname ? '/' + code : newPath);
    });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
        aria-label="Switch language"
      >
        <Globe size={13} />
        {locale.toUpperCase()}
        <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0, y: 4}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 4}}
            transition={{duration: 0.12}}
            className="absolute right-0 mt-1.5 w-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            {(['es', 'en'] as const).map((code) => (
              <button
                key={code}
                onClick={() => switchLocale(code)}
                className={`block w-full px-4 py-2.5 text-left text-xs font-semibold transition ${
                  locale === code ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {code.toUpperCase()}
              </button>
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
  const locale = useLocale();
  const [mobileMenu, setMobileMenu] = useState(false);
  const {totalItems, add, open: openCart} = useCart();
  const {user, openModal, logout} = useAuth();

  const problemItems  = t.raw('problem.items')   as string[];
  const benefits      = t.raw('benefits.items')  as string[];
  const before        = t.raw('transformation.before') as string[];
  const after         = t.raw('transformation.after')  as string[];
  const products      = t.raw('system.products') as Array<{name: string; tag: string; focus: string; features: string[]}>;
  const testimonials  = t.raw('social.testimonials') as Array<{name: string; role: string; quote: string}>;
  const plans         = t.raw('plans.cards') as Array<{name: string; price: string; description: string; items: string[]}>;
  const faqItems      = t.raw('faq.items') as Array<{q: string; a: string}>;

  const benefitIcons = [Activity, Moon, Heart, Zap, ShieldCheck, Battery];

  const navLinks = useMemo(() => [
    {href: '#system',   label: t('nav.links.system')},
    {href: '#benefits', label: t('nav.links.benefits')},
    {href: '#reviews',  label: t('nav.links.reviews')},
    {href: '#plans',    label: t('nav.links.plans')},
  ], [t]);

  const handleAddToCart = (i: number) => {
    const p = PRODUCTS[i];
    add({slug: p.slug, name: p.name, price: p.price, icon: p.icon});
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">

          <Link href={`/${locale}`} className="font-display text-sm font-extrabold tracking-widest text-gray-900">
            RECOVER™
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

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <LanguageSwitch />
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                    {(user.displayName?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()}
                  </div>
                  <button onClick={logout} className="text-xs text-gray-500 transition hover:text-gray-900">
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <button onClick={openModal} className="text-sm font-medium text-gray-600 transition hover:text-gray-900">
                  {t('nav.login')}
                </button>
              )}
            </div>

            <button
              onClick={openCart}
              className="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="inline-flex rounded-lg border border-gray-200 bg-white p-2 text-gray-600 lg:hidden"
              onClick={() => setMobileMenu((v) => !v)}
              aria-label="menu"
            >
              {mobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
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
                  {user ? (
                    <button onClick={logout} className="text-sm font-medium text-gray-600">{t('nav.logout')}</button>
                  ) : (
                    <button onClick={() => {setMobileMenu(false); openModal();}} className="btn-primary text-sm">
                      {t('nav.login')}
                    </button>
                  )}
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
                <Link href={`/${locale}/products/${PRODUCTS[i].slug}`}>
                  <ProductVisual index={i} />
                </Link>
                <div className="mt-5 flex-1 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">{product.tag}</span>
                  <h3 className="font-display text-2xl font-bold text-gray-900">
                    <Link href={`/${locale}/products/${PRODUCTS[i].slug}`} className="transition hover:text-[#1a56db]">
                      {product.name}
                    </Link>
                  </h3>
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
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-gray-900">${PRODUCTS[i].price}</span>
                    <span className="ml-1.5 text-sm text-gray-400 line-through">${PRODUCTS[i].comparePrice}</span>
                  </div>
                  <button onClick={() => handleAddToCart(i)} className="btn-primary py-2 text-xs">
                    {t('nav.addToCart')}
                  </button>
                </div>
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
                  <Link
                    href={`/${locale}/checkout`}
                    className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition ${
                      isFeatured
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'btn-primary'
                    }`}
                  >
                    {t('nav.cta')}
                  </Link>
                </motion.article>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">{t('plans.footnote')}</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{once: true}} variants={fadeUp}
            className="mb-10 font-display text-4xl font-bold tracking-tight text-gray-900"
          >
            {t('faq.title')}
          </motion.h2>
          <div className="rounded-2xl border border-gray-100 bg-white px-6 shadow-sm">
            {faqItems.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
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
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <span className="font-display font-black tracking-widest text-gray-900">RECOVER™</span>
              <p className="mt-2 text-sm text-gray-400">{t('footer.tagline')}</p>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">{t('footer.shop')}</p>
              <ul className="space-y-2 text-sm text-gray-600">
                {PRODUCTS.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${locale}/products/${p.slug}`} className="transition hover:text-gray-900">{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">{t('footer.support')}</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#faq" className="transition hover:text-gray-900">{t('faq.title')}</a></li>
                <li>{t('footer.returns')}</li>
                <li>{t('footer.shipping')}</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-8 sm:flex-row">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} RECOVER™. {t('footer.rights')}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <ShieldCheck size={12} />
              {t('footer.securePayments')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
