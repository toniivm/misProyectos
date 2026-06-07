'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Lock, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
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
  'pulse-pro-x': '#0d1f2d', cerviflex: '#0d1f1a', sleepseal: '#1a1028',
  'sleepband-pro': '#101828', 'sleepseal-plus': '#0d1828', 'white-noise-pro': '#131020',
  'neckpulse-pro': '#101c28', 'posture-band': '#0e1a20', 'vibrapulse-mini': '#0f1824',
  'thermapad-pro': '#1a1010', 'weighted-mask-pro': '#12101e', breathcalm: '#0d1820',
  'travel-pillow-ultra': '#101822', 'portable-pulse': '#10181e', 'napkit-pro': '#141020',
};

const PRODUCT_ICON: Record<string, string> = {
  'pulse-pro-x': '💆', cerviflex: '🧘', sleepseal: '🌙',
  'sleepband-pro': '🎧', 'sleepseal-plus': '🌛', 'white-noise-pro': '🔊',
  'neckpulse-pro': '🦴', 'posture-band': '🏋️', 'vibrapulse-mini': '⚡',
  'thermapad-pro': '🔥', 'weighted-mask-pro': '😴', breathcalm: '🌬️',
  'travel-pillow-ultra': '✈️', 'portable-pulse': '🎒', 'napkit-pro': '🧳',
};

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const isEs = locale === 'es';
  const { items, subtotal, hasHydrated } = useCart();
  const { user, openModal, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay' | 'google_pay'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoLabel, setPromoLabel] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState('');

  const [contact, setContact] = useState({ email: '', phone: '' });
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', address: '', city: '', country: 'Spain', zip: '',
  });
  const checkoutItems = hasHydrated ? items : [];
  const checkoutSubtotal = hasHydrated ? subtotal : 0;
  const discountAmount = checkoutSubtotal * (promoDiscount / 100);
  const checkoutTotal = Math.max(0, checkoutSubtotal - discountAmount);

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    try {
      const res = await fetch(`${API_BASE_URL}/promo/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode.trim().toUpperCase(), subtotal: checkoutSubtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setPromoDiscount(data.discountPercent || 0);
        setPromoLabel(data.label || promoCode.trim().toUpperCase());
      } else {
        setPromoError(data.detail || (isEs ? 'Código no válido' : 'Invalid promo code'));
        setPromoDiscount(0);
        setPromoLabel('');
      }
    } catch {
      setPromoError(isEs ? 'No se pudo validar el código' : 'Could not validate code');
    }
    setPromoLoading(false);
  };

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
            line1: shipping.address, city: shipping.city,
            postal_code: shipping.zip, country: COUNTRY_CODES[shipping.country] || 'ES',
          },
        },
        items: checkoutItems.map((item) => ({
          id: item.slug, qty: item.quantity, price: item.price, name: item.name,
        })),
        successUrl: `${window.location.origin}/${locale}/checkout/success`,
        cancelUrl: `${window.location.origin}/${locale}/checkout`,
        promoCode: promoDiscount > 0 ? promoCode.trim().toUpperCase() : undefined,
        discountPercent: promoDiscount > 0 ? promoDiscount : undefined,
      };

      const endpoint = API_BASE_URL
        ? `${API_BASE_URL}/payments/create-checkout-session`
        : '/api/payments/create-checkout-session';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let msg = isEs ? 'No se pudo iniciar el pago' : 'Could not start payment';
        try {
          const text = await response.text();
          try { const parsed = JSON.parse(text); msg = parsed?.detail || parsed?.error || text || msg; }
          catch { msg = text || msg; }
        } catch {}
        throw new Error(msg);
      }

      const data = await response.json();
      if (!data?.url) throw new Error(data?.detail || data?.error || (isEs ? 'No se pudo iniciar el pago' : 'Could not start payment'));

      if (data?.orderId && user?.email) {
        try {
          const stored = localStorage.getItem('noctas_orders')
          const orders = stored ? JSON.parse(stored) : {}
          orders[data.orderId] = {
            id: data.orderId, status: 'pending', email: user.email,
            items: checkoutItems.map((item) => ({
              id: item.slug, name: item.name, qty: item.quantity,
              price: item.price, icon: PRODUCT_ICON[item.slug] ?? '📦',
            })),
            amount: Math.round(checkoutSubtotal * 100), currency: 'eur',
            createdAt: new Date().toISOString(),
          }
          localStorage.setItem('noctas_orders', JSON.stringify(orders))
        } catch {}
      }

      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : (isEs ? 'Error de pago' : 'Payment failed'));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) setContact((c) => ({ ...c, email: user.email }));
  }, [user]);

  return (
    <div className="min-h-screen bg-[#080c16] text-[#f4f1ea]">
      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[rgba(8,12,22,0.88)] px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <div className="grid h-6 w-6 grid-cols-2 gap-[2px] rounded-md border border-white/10 bg-white/[0.03] p-0.5">
              <span className="rounded-[2px] bg-[#cfd8e6]" />
              <span className="rounded-[2px] bg-[#8da3c4]" />
              <span className="rounded-[2px] bg-[#7186a4]" />
              <span className="rounded-[2px] bg-[#d8d0c4]" />
            </div>
            NOCTAS
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
            <Lock size={12} />
            {t('title')}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <Link href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-[#6b7280] transition hover:text-[#c4cdd6]">
          <ArrowLeft size={14} />
          {t('backToShop')}
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6 transition-all hover:border-white/[0.12]">
              <h2 className="mb-5 text-[17px] font-semibold text-[#f2eee7]">{t('contact')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('email')}</label>
                  <input type="email" required value={contact.email}
                    onChange={(e) => setContact((c) => ({...c, email: e.target.value}))}
                    placeholder="you@example.com"
                    className="input-premium" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('phone')}</label>
                  <input type="tel" value={contact.phone}
                    onChange={(e) => setContact((c) => ({...c, phone: e.target.value}))}
                    placeholder="+34 600 000 000"
                    className="input-premium" />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6 transition-all hover:border-white/[0.12]">
              <h2 className="mb-5 text-[17px] font-semibold text-[#f2eee7]">{t('shippingAddress')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('firstName')}</label>
                  <input type="text" required value={shipping.firstName}
                    onChange={(e) => setShipping((s) => ({...s, firstName: e.target.value}))}
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('lastName')}</label>
                  <input type="text" required value={shipping.lastName}
                    onChange={(e) => setShipping((s) => ({...s, lastName: e.target.value}))}
                    className="input-premium" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('address')}</label>
                  <input type="text" required value={shipping.address}
                    onChange={(e) => setShipping((s) => ({...s, address: e.target.value}))}
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('city')}</label>
                  <input type="text" required value={shipping.city}
                    onChange={(e) => setShipping((s) => ({...s, city: e.target.value}))}
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('zip')}</label>
                  <input type="text" required value={shipping.zip}
                    onChange={(e) => setShipping((s) => ({...s, zip: e.target.value}))}
                    className="input-premium" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('country')}</label>
                  <select value={shipping.country}
                    onChange={(e) => setShipping((s) => ({...s, country: e.target.value}))}
                    className="select-premium">
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

            {/* Promo */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6 transition-all hover:border-white/[0.12]">
              <h2 className="mb-3 text-[17px] font-semibold text-[#f2eee7]">{isEs ? 'Código promocional' : 'Promo code'}</h2>
              <div className="flex gap-2">
                <input type="text" value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                  placeholder={isEs ? 'Ej: NOCTAS10' : 'e.g. NOCTAS10'}
                  className="input-premium flex-1 uppercase" />
                <button type="button" onClick={applyPromoCode}
                  disabled={promoLoading || !promoCode.trim()}
                  className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-[13px] font-semibold text-[#d1d8e2] transition hover:border-white/20 hover:bg-white/[0.07] disabled:opacity-50">
                  {promoLoading ? '...' : (isEs ? 'Aplicar' : 'Apply')}
                </button>
              </div>
              {promoError && <p className="mt-2 text-[12px] text-red-400">{promoError}</p>}
              {promoDiscount > 0 && (
                <p className="mt-2 text-[12px] text-emerald-400">
                  {isEs ? `¡Código ${promoLabel} aplicado! — ${promoDiscount}% descuento` : `Code ${promoLabel} applied! — ${promoDiscount}% off`}
                </p>
              )}
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6 transition-all hover:border-white/[0.12]">
              <h2 className="mb-3 text-[17px] font-semibold text-[#f2eee7]">{t('paymentMethod')}</h2>
              <p className="mb-5 text-[12px] leading-5 text-[#8791a1]">{t('paymentHint')}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Card */}
                <button type="button" onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'card'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}>
                  <CreditCard size={20} className="text-[#8ea7c7]" />
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{t('card')}</div>
                    <div className="text-[11px] text-[#6b7280]">{t('cardDesc')}</div>
                  </div>
                </button>

                {/* PayPal */}
                <button type="button" onClick={() => setPaymentMethod('paypal')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'paypal'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#0070BA">
                    <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.65c-.525 0-.973.382-1.055.9l-1.519 9.106z"/>
                    <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287" fill="#005091"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{t('paypal')}</div>
                    <div className="text-[11px] text-[#6b7280]">{t('paypalDesc')}</div>
                  </div>
                </button>

                {/* Apple Pay */}
                <button type="button" onClick={() => setPaymentMethod('apple_pay')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="white">
                    <path d="M17.056 12.318c-.01-2.282 1.864-3.376 1.944-3.432-1.058-1.546-2.7-1.758-3.284-1.782-1.398-.142-2.73.824-3.44.824-.708 0-1.804-.804-2.966-.782-1.526.022-2.934.888-3.72 2.256-1.586 2.752-.406 6.828 1.14 9.06.756 1.09 1.656 2.316 2.84 2.272 1.138-.044 1.57-.736 2.946-.736s1.766.736 2.968.714c1.226-.022 2.004-1.112 2.754-2.206.868-1.268 1.224-2.498 1.246-2.56-.028-.012-2.388-.916-2.412-3.634"/>
                    <path d="M14.387 4.128c.628-.758 1.05-1.812.934-2.864-.902.038-1.998.6-2.646 1.358-.58.674-1.09 1.752-.954 2.786.99.076 1.998-.51 2.666-1.28"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{t('applePay')}</div>
                    <div className="text-[11px] text-[#6b7280]">{t('applePayDesc')}</div>
                  </div>
                </button>

                {/* Google Pay */}
                <button type="button" onClick={() => setPaymentMethod('google_pay')}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
                    paymentMethod === 'google_pay'
                      ? 'border-[#8ea7c7] bg-[#8ea7c7]/10'
                      : 'border-white/[0.08] bg-[#111720] hover:border-white/[0.18]'
                  }`}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{t('googlePay')}</div>
                    <div className="text-[11px] text-[#6b7280]">{t('googlePayDesc')}</div>
                  </div>
                </button>
              </div>

              {/* Accepted cards strip */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#5a6678]">
                  {isEs ? 'Aceptamos' : 'We accept'}
                </span>
                <div className="flex items-center gap-2.5">
                  {/* Visa */}
                  <svg viewBox="0 0 48 16" className="h-4 w-12" fill="#1A1F71">
                    <path d="M19.5 2.5c-2.8 0-5.2.8-6.9 2.2L13 3.6c1.6-1.3 3.8-2.1 6.5-2.1 3.9 0 6.6 1.7 6.6 4.3v.3c0 1.2-.8 2.1-2.2 2.8-1.3.7-3 1.1-4.4 1.5-1.2.3-2.2.6-2.2 1.3 0 .5.4.8 1.2.8.9 0 2-.3 3.2-.9s2.3-1.3 2.3-1.3l-.3 1.8s-1 .7-2.7 1.2c-1 .3-2.1.5-3.2.5-2.5 0-4.1-1.2-4.1-3.2 0-2 1.6-3.2 4.2-4.1 1.4-.5 3.1-.9 4.4-1.2 1.1-.3 1.8-.6 1.8-1.2 0-.6-.6-1-1.9-1-1.1 0-2.4.2-3.6.7z"/>
                    <path d="M37.5 10.6c.6 0 1.2-.1 1.8-.4l-.5 1.6c-.5.2-1.1.4-1.7.4-2.1 0-3.3-1.2-3.3-3.1 0-2.2 1.5-3.8 3.5-3.8 1.1 0 2 .5 2.5 1.2l-.7 1.5c-.4-.5-.9-.8-1.6-.8-1.2 0-2 1-2 2.6 0 1.4.7 2.2 2 2.2z"/>
                    <path d="M42 .5h2.2L40.5 12.5h-2.2L42 .5z"/>
                    <path d="M2.5 2.5H6c1 0 1.8.1 2.2.3l-.4 1.9c-.3-.2-.8-.3-1.5-.3H4.9l-1.2 6.1H1.2L2.5 2.5z"/>
                    <path d="M10.5 2.5l-1.5 9.2h-2L9 .5h2.5l2.2 7.8L15 .5h2l-1.5 9.2h-2l1.2-7-2.2 7h-2L10.5 2.5z"/>
                    <path d="M26.5 2.5l-1.5 9.2h-2l1.5-9.2h2z"/>
                    <path d="M31 2.5l-1.5 9.2h-1.9l1.5-9.2H31zM31.5.5c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4c0-.8.6-1.4 1.4-1.4s1.4.6 1.4 1.4z"/>
                  </svg>
                  {/* Mastercard */}
                  <svg viewBox="0 0 48 16" className="h-4 w-12">
                    <circle fill="#F79F1A" cx="15.5" cy="8" r="7"/>
                    <circle fill="#EB001B" cx="28.5" cy="8" r="7" opacity=".8"/>
                    <path fill="#FF5F00" d="M22 2c2.8 2.1 4.2 5.4 4.2 8.9 0 3.5-1.4 6.8-4.2 8.9-2.8-2.1-4.2-5.4-4.2-8.9 0-3.5 1.4-6.8 4.2-8.9z"/>
                    <path fill="#FFF" d="M22 2c-2.8 2.1-4.2 5.4-4.2 8.9 0 3.5 1.4 6.8 4.2 8.9 2.8-2.1 4.2-5.4 4.2-8.9 0-3.5-1.4-6.8-4.2-8.9z" opacity=".1"/>
                  </svg>
                  {/* Amex */}
                  <svg viewBox="0 0 48 16" className="h-4 w-10" fill="#2E77BC">
                    <path d="M6.5.5L1 13h4.5l1-2.5h3l1 2.5H15L9.5.5H6.5zm.5 7l1.5-3.5L10 7.5H7zm7 0l1-2.5H13l1.5 3.5h-1L13 9h-1.5l-.5-1H10l-1 2.5H4l1-2.5h-1L3 12h3.5l1-2.5h3l1 2.5H15l2.5-5.5H14z"/>
                    <path d="M40.5 8.5c0-.8-.3-1.5-.9-2-.6-.5-1.4-.8-2.3-.8h-4V13h4c.9 0 1.7-.3 2.3-.8.6-.5.9-1.2.9-2v-1.7zm-1.8 1.7c0 .4-.2.8-.5 1-.3.3-.7.4-1.2.4h-2V8h2c.5 0 .9.1 1.2.4.3.2.5.6.5 1v1.8z"/>
                    <path d="M48 10.5l-1.5-2L48 6.5h-1.8l-1 1.3-1-1.3h-2.5V13h2.5v-3.2l1 1.3h1.8l-1-1.3.8-1L45.5 10l2.5 3h2l-2-2.5z"/>
                    <path d="M37 3.5h-6V6h5V7h-5v2.5h6V12H29V.5h8v3z"/>
                  </svg>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[12px] text-[#aab4c2] text-center">
                {t('stripeNote')}
              </div>
            </section>

            {/* Auth prompt */}
            {!user && !authLoading && (
              <div className="rounded-xl border border-yellow-600/20 bg-yellow-950/10 px-4 py-3 text-[13px] text-yellow-200">
                {t('signInPrompt')}
                <button type="button" onClick={() => openModal()}
                  className="ml-3 inline-flex items-center rounded-full bg-yellow-200/10 px-3 py-1 text-[13px] font-semibold text-yellow-200">
                  {t('signInButton')}
                </button>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-[13px] text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit"
              disabled={loading || !hasHydrated || checkoutItems.length === 0 || !user}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-4 text-[15px] font-semibold text-[#11161d] transition-all duration-200 hover:bg-white hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#11161d] border-t-transparent" />{t('processing')}</>
              ) : (
                <><Lock size={15} />{t('continueToPayment')} — €{checkoutTotal.toFixed(2)}</>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-[#6b7280]">
              <span className="flex items-center gap-1"><ShieldCheck size={12} /> {t('guarantee')}</span>
              <span className="flex items-center gap-1"><Truck size={12} /> {t('freeShipping')}</span>
              <span className="flex items-center gap-1"><Lock size={12} /> {t('secureCheckout')}</span>
            </div>
          </form>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6 lg:sticky lg:top-24">
            <h2 className="mb-5 text-[17px] font-semibold text-[#f2eee7]">{t('orderSummary')}</h2>

            {!hasHydrated ? (
              <div className="py-8 text-center text-[13px] text-[#6b7280]">{t('loadingCart')}</div>
            ) : checkoutItems.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-[#6b7280]">
                {t('emptyCart')}{' '}
                <Link href={`/${locale}`} className="text-[#c4cdd6] underline">{t('addItems')}</Link>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {checkoutItems.map((item) => (
                    <li key={item.slug} className="flex items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-xl"
                        style={{ background: PRODUCT_BG[item.slug] ?? '#111720' }}>
                        {PRODUCT_ICON[item.slug] ?? '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold text-[#f2eee7] truncate">{item.name}</p>
                        <p className="text-[12px] text-[#6b7280]">{t('qty')}: {item.quantity}</p>
                      </div>
                      <span className="text-[14px] font-semibold text-[#f2eee7]">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                    <span>{t('subtotalLine')}</span>
                    <span className="font-semibold text-[#f2eee7]">€{checkoutSubtotal.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex items-center justify-between text-[13px] text-emerald-400">
                      <span>{isEs ? `Descuento (${promoLabel})` : `Discount (${promoLabel})`}</span>
                      <span className="font-semibold">-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                    <span>{t('shippingLine')}</span>
                    <span className="font-semibold text-[#5fb07c]">{t('freeShipping')}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
                    <span className="text-[15px] font-semibold text-[#f2eee7]">{t('totalLine')}</span>
                    <span className="text-[20px] font-bold text-[#f2eee7]">€{checkoutTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center text-[12px] text-[#6b7280]">
                  <Check size={12} className="mr-1 inline text-[#5fb07c]" />
                  {t('guaranteeBadge')}
                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#5a6678]">
                  <RotateCcw size={11} />{isEs ? '30 días de garantía' : '30-night guarantee'}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
