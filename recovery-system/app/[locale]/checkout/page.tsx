'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {ArrowLeft, Check, CreditCard, Lock, ShieldCheck, Truck} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {useState} from 'react';
import {useCart} from '../../../context/CartContext';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://misproyectos-neyj.onrender.com';

const COUNTRY_CODES: Record<string, string> = {
  Spain: 'ES',
  'United States': 'US',
  'United Kingdom': 'GB',
  France: 'FR',
  Germany: 'DE',
  Mexico: 'MX',
  Other: 'ES',
};

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
  const {items, subtotal} = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [contact, setContact] = useState({email: '', phone: ''});
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Spain',
    zip: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        currency: 'eur',
        email: contact.email,
        shipping: {
          name: `${shipping.firstName} ${shipping.lastName}`.trim(),
          address: {
            line1: shipping.address,
            city: shipping.city,
            postal_code: shipping.zip,
            country: COUNTRY_CODES[shipping.country] || 'ES',
          },
        },
        items: items.map((item) => ({
          id: item.slug,
          qty: item.quantity,
          price: item.price,
          name: item.name,
        })),
        successUrl: `${window.location.origin}/${locale}/checkout/success`,
        cancelUrl: `${window.location.origin}/${locale}/checkout`,
      };

      const response = await fetch(`${API_BASE_URL}/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.detail || data?.error || 'Could not start payment');
      }

      window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      setLoading(false);
    }
  };

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

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

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
                  Continue to secure payment — €{subtotal.toFixed(2)}
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
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-xl font-black text-gray-900">€{subtotal.toFixed(2)}</span>
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
