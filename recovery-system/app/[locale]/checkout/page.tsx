'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {ArrowLeft, Check, CreditCard, Lock, ShieldCheck, Truck} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {useCart} from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

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
  'pulse-pro-x': '#0d1f2d',
  cerviflex: '#0d1f1a',
  sleepseal: '#1a1028',
  'sleepband-pro': '#101828',
  'sleepseal-plus': '#0d1828',
  'white-noise-pro': '#131020',
  'neckpulse-pro': '#101c28',
  'posture-band': '#0e1a20',
  'vibrapulse-mini': '#0f1824',
  'thermapad-pro': '#1a1010',
  'weighted-mask-pro': '#12101e',
  breathcalm: '#0d1820',
  'travel-pillow-ultra': '#101822',
  'portable-pulse': '#10181e',
  'napkit-pro': '#141020',
};
const PRODUCT_ICON: Record<string, string> = {
  'pulse-pro-x': '💆',
  cerviflex: '🧘',
  sleepseal: '🌙',
  'sleepband-pro': '🎧',
  'sleepseal-plus': '🌛',
  'white-noise-pro': '🔊',
  'neckpulse-pro': '🦴',
  'posture-band': '🏋️',
  'vibrapulse-mini': '⚡',
  'thermapad-pro': '🔥',
  'weighted-mask-pro': '😴',
  breathcalm: '🌬️',
  'travel-pillow-ultra': '✈️',
  'portable-pulse': '🎒',
  'napkit-pro': '🧳',
};

export default function CheckoutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const {items, subtotal, hasHydrated} = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay' | 'google_pay'>('card');

  const [contact, setContact] = useState({email: '', phone: ''});
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'Spain',
    zip: '',
  });
  const checkoutItems = hasHydrated ? items : [];
  const checkoutSubtotal = hasHydrated ? subtotal : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasHydrated || !checkoutItems.length) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        currency: 'eur',
        paymentMethod,
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
        items: checkoutItems.map((item) => ({
          id: item.slug,
          qty: item.quantity,
          price: item.price,
          name: item.name,
        })),
        successUrl: `${window.location.origin}/${locale}/checkout/success`,
        cancelUrl: `${window.location.origin}/${locale}/checkout`,
      };

      const endpoint = API_BASE_URL
        ? `${API_BASE_URL}/payments/create-checkout-session`
        : '/api/payments/create-checkout-session';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle non-OK responses first and try to surface meaningful server messages
      if (!response.ok) {
        let msg = 'Could not start payment';
        try {
          const text = await response.text();
          try {
            const parsed = JSON.parse(text);
            msg = parsed?.detail || parsed?.error || text || msg;
          } catch {
            msg = text || msg;
          }
        } catch (e) {
          // ignore parsing errors
        }
        throw new Error(msg);
      }

      // Parse JSON safely
      let data: any = null;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text().catch(() => null);
        throw new Error(text || 'Invalid server response');
      }

      if (!data?.url) {
        throw new Error(data?.detail || data?.error || 'Could not start payment');
      }

      // Attempt navigation robustly: prefer top-level navigation, fall back to open/new tab
      try {
        if (window.top && window.top !== window) {
          try {
            window.top.location.href = data.url;
          } catch (e) {
            // Cross-origin or blocked; open a new tab instead
            const opened = window.open(data.url, '_blank');
            if (!opened) window.location.assign(data.url);
          }
        } else {
          window.location.href = data.url;
        }
      } catch (e) {
        try {
          const opened = window.open(data.url, '_blank');
          if (!opened) window.location.assign(data.url);
        } catch {
          window.location.assign(data.url);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      setLoading(false);
    }
  };

  // Prefill email when user is logged in
  useEffect(() => {
    if (user?.email) setContact((c) => ({ ...c, email: user.email }));
  }, [user]);

  return (
    <div className="min-h-screen bg-[#080c16] text-[#f4f1ea]">
      <header className="border-b border-white/[0.07] bg-[rgba(8,12,22,0.88)] px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2eee7]">
            RECOVERY SYSTEM™
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
            <Lock size={12} />
            Secure checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-[#6b7280] transition hover:text-[#c4cdd6]"
        >
          <ArrowLeft size={14} />
          Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Contact */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6">
              <h2 className="mb-5 text-[17px] font-semibold text-[#f2eee7]">Contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({...c, email: e.target.value}))}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({...c, phone: e.target.value}))}
                    placeholder="+34 600 000 000"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
                  />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6">
              <h2 className="mb-5 text-[17px] font-semibold text-[#f2eee7]">Shipping address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">First name</label>
                  <input
                    type="text"
                    required
                    value={shipping.firstName}
                    onChange={(e) => setShipping((s) => ({...s, firstName: e.target.value}))}
                    placeholder="John"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">Last name</label>
                  <input
                    type="text"
                    required
                    value={shipping.lastName}
                    onChange={(e) => setShipping((s) => ({...s, lastName: e.target.value}))}
                    placeholder="Doe"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">Address</label>
                  <input
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping((s) => ({...s, address: e.target.value}))}
                    placeholder="123 Main Street"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">City</label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping((s) => ({...s, city: e.target.value}))}
                    placeholder="Madrid"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">ZIP code</label>
                  <input
                    type="text"
                    required
                    value={shipping.zip}
                    onChange={(e) => setShipping((s) => ({...s, zip: e.target.value}))}
                    placeholder="28001"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">Country</label>
                  <select
                    value={shipping.country}
                    onChange={(e) => setShipping((s) => ({...s, country: e.target.value}))}
                    className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] outline-none transition focus:border-white/30 focus:bg-[#141c26]"
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

            {/* Payment Methods */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6">
              <h2 className="mb-2 text-[17px] font-semibold text-[#f2eee7]">Preferred checkout method</h2>
              <p className="mb-5 text-[12px] leading-5 text-[#8791a1]">
                Cards work across modern browsers and mobile devices. Apple Pay and Google Pay appear on Stripe's secure page when the device, browser and wallet are compatible.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'card'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}
                >
                  <CreditCard size={18} className="text-[#8ea7c7]" />
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">Card</div>
                    <div className="text-[11px] text-[#6b7280]">Visa, Mastercard, Amex</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'paypal'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="text-lg">🅿️</div>
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">PayPal</div>
                    <div className="text-[11px] text-[#6b7280]">Available where supported</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="text-lg">🍎</div>
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">Apple Pay</div>
                    <div className="text-[11px] text-[#6b7280]">Compatible Apple devices</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'google_pay'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="text-lg">🔵</div>
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">Google Pay</div>
                    <div className="text-[11px] text-[#6b7280]">Compatible Android & Chrome</div>
                  </div>
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[12px] text-[#aab4c2]">
                Stripe-hosted checkout confirms the final payment options for each shopper based on browser, device, location and wallet availability.
              </div>
            </section>

            {error && (
              <div className="rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-[13px] text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !hasHydrated || checkoutItems.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-4 text-[15px] font-semibold text-[#11161d] transition-transform duration-300 hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#11161d] border-t-transparent" />
                  Processing…
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Continue to secure payment — €{checkoutSubtotal.toFixed(2)}
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-[#6b7280]">
              <span className="flex items-center gap-1"><ShieldCheck size={12} /> 30-day guarantee</span>
              <span className="flex items-center gap-1"><Truck size={12} /> Free shipping</span>
              <span className="flex items-center gap-1"><Lock size={12} /> Secure checkout</span>
            </div>
          </form>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6 lg:sticky lg:top-24">
            <h2 className="mb-5 text-[17px] font-semibold text-[#f2eee7]">Order summary</h2>

            {!hasHydrated ? (
              <div className="py-8 text-center text-[13px] text-[#6b7280]">
                Loading your cart...
              </div>
            ) : checkoutItems.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-[#6b7280]">
                Your cart is empty.{' '}
                <Link href={`/${locale}`} className="text-[#c4cdd6] underline">
                  Add items
                </Link>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {checkoutItems.map((item) => (
                    <li key={item.slug} className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-xl"
                        style={{background: PRODUCT_BG[item.slug] ?? '#111720'}}
                      >
                        {PRODUCT_ICON[item.slug] ?? '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold text-[#f2eee7] truncate">{item.name}</p>
                        <p className="text-[12px] text-[#6b7280]">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-[14px] font-semibold text-[#f2eee7]">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#f2eee7]">€{checkoutSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#5fb07c]">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
                    <span className="text-[15px] font-semibold text-[#f2eee7]">Total</span>
                    <span className="text-[20px] font-bold text-[#f2eee7]">€{checkoutSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center text-[12px] text-[#6b7280]">
                  <Check size={12} className="mr-1 inline text-[#5fb07c]" />
                  30-night money-back guarantee
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
