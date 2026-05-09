'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {ArrowLeft, Check, CreditCard, Lock, ShieldCheck, Truck} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {useState} from 'react';
import {useCart} from '../../../context/CartContext';

const PRODUCT_BG: Record<string, string> = {
  'pulse-pro-x': '#f0f9ff',
  cerviflex: '#f0fdf4',
  sleepseal: '#faf5ff',
};
const PRODUCT_ICON: Record<string, string> = {
  'pulse-pro-x': '💆',
  cerviflex: '🧘',
  sleepseal: '🌙',
};

export default function CheckoutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const {items, subtotal, clear} = useCart();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({email: '', phone: ''});
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Spain',
    zip: '',
  });
  const [payment, setPayment] = useState({
    card: '',
    expiry: '',
    cvc: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate processing
    await new Promise((r) => setTimeout(r, 1800));
    clear();
    setLoading(false);
    setStep('success');
  };

  const orderNumber = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-100 bg-white px-5 py-4">
          <div className="mx-auto max-w-6xl">
            <Link href={`/${locale}`} className="font-display text-sm font-extrabold tracking-widest text-gray-900">
              RECOVER™
            </Link>
          </div>
        </header>
        <div className="flex min-h-[80vh] items-center justify-center px-5">
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.4}}
            className="text-center max-w-md"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check size={36} className="text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-black text-gray-900">Order confirmed!</h1>
            <p className="mt-3 text-gray-500">
              Thank you for your purchase. We've sent a confirmation to {contact.email || 'your email'}.
            </p>
            <p className="mt-2 rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
              Order {orderNumber}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Estimated delivery: <span className="font-semibold text-gray-900">3–5 business days</span>
            </div>
            <Link href={`/${locale}`} className="btn-primary mt-8 inline-flex">
              Continue shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="font-display text-sm font-extrabold tracking-widest text-gray-900">
            RECOVER™
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Lock size={12} />
            Secure checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Contact */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="mb-5 font-display text-lg font-bold text-gray-900">Contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({...c, email: e.target.value}))}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({...c, phone: e.target.value}))}
                    placeholder="+34 600 000 000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="mb-5 font-display text-lg font-bold text-gray-900">Shipping address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">First name</label>
                  <input
                    type="text"
                    required
                    value={shipping.firstName}
                    onChange={(e) => setShipping((s) => ({...s, firstName: e.target.value}))}
                    placeholder="John"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">Last name</label>
                  <input
                    type="text"
                    required
                    value={shipping.lastName}
                    onChange={(e) => setShipping((s) => ({...s, lastName: e.target.value}))}
                    placeholder="Doe"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">Address</label>
                  <input
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping((s) => ({...s, address: e.target.value}))}
                    placeholder="123 Main Street"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">City</label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping((s) => ({...s, city: e.target.value}))}
                    placeholder="Madrid"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">ZIP code</label>
                  <input
                    type="text"
                    required
                    value={shipping.zip}
                    onChange={(e) => setShipping((s) => ({...s, zip: e.target.value}))}
                    placeholder="28001"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">Country</label>
                  <select
                    value={shipping.country}
                    onChange={(e) => setShipping((s) => ({...s, country: e.target.value}))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  >
                    <option>Spain</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Mexico</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-gray-900">Payment</h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Lock size={11} />
                  256-bit encryption
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">Card number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={payment.card}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const formatted = v.match(/.{1,4}/g)?.join(' ') ?? v;
                        setPayment((p) => ({...p, card: formatted}));
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                    />
                    <CreditCard
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">Expiry</label>
                    <input
                      type="text"
                      required
                      value={payment.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                        setPayment((p) => ({...p, expiry: v}));
                      }}
                      placeholder="MM / YY"
                      maxLength={5}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">CVC</label>
                    <input
                      type="text"
                      required
                      value={payment.cvc}
                      onChange={(e) =>
                        setPayment((p) => ({...p, cvc: e.target.value.replace(/\D/g, '').slice(0, 4)}))
                      }
                      placeholder="123"
                      maxLength={4}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing…
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Place order — ${subtotal}
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><ShieldCheck size={12} /> 30-day guarantee</span>
              <span className="flex items-center gap-1"><Truck size={12} /> Free shipping</span>
              <span className="flex items-center gap-1"><Lock size={12} /> Secure checkout</span>
            </div>
          </form>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 lg:sticky lg:top-24">
            <h2 className="mb-5 font-display text-lg font-bold text-gray-900">Order summary</h2>

            {items.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-400">
                Your cart is empty.{' '}
                <Link href={`/${locale}`} className="text-gray-700 underline">
                  Add items
                </Link>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.slug} className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                        style={{background: PRODUCT_BG[item.slug] ?? '#f9fafb'}}
                      >
                        {PRODUCT_ICON[item.slug] ?? '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        ${item.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">${subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-xl font-black text-gray-900">${subtotal}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-3 text-center text-xs text-gray-500">
                  <Check size={12} className="mr-1 inline text-green-600" />
                  30-day money-back guarantee
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
