'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, Lock, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import PhoneInputField from '../../../components/PhoneInputField';
import AddressAutocomplete from '../../../components/AddressAutocomplete';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://misproyectos-neyj.onrender.com';

const COUNTRY_CODES: Record<string, string> = {
  Spain: 'ES', 'United States': 'US', 'United Kingdom': 'GB', France: 'FR',
  Germany: 'DE', Mexico: 'MX', Portugal: 'PT', Italy: 'IT',
  Netherlands: 'NL', Belgium: 'BE', Brazil: 'BR', Argentina: 'AR',
  Colombia: 'CO', Chile: 'CL', Peru: 'PE', Japan: 'JP',
  'South Korea': 'KR', China: 'CN', Australia: 'AU', Canada: 'CA',
  Switzerland: 'CH', Austria: 'AT', Poland: 'PL', Sweden: 'SE',
  Norway: 'NO', Denmark: 'DK', Finland: 'FI', Ireland: 'IE',
  Greece: 'GR', Turkey: 'TR', Morocco: 'MA', 'Dominican Republic': 'DO',
  Other: 'ES',
};

const COUNTRY_FROM_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_CODES).map(([name, code]) => [code, name])
);

const PRODUCT_BG: Record<string, string> = {
  'sleepband-pro': '#0b0f14',
  'white-noise-pro': '#131020',
  'sleep-headband': '#101828',
  'neck-massager': '#121a24',
  'weighted-mask-pro': '#12101e',
};

const PRODUCT_ICON: Record<string, string> = {
  'sleepband-pro': '😴',
  'white-noise-pro': '🧘',
  'sleep-headband': '🎧',
  'neck-massager': '🧘',
  'weighted-mask-pro': '😴',
};

const SPAIN_POSTAL_CITIES: Record<string, string> = {
  '28': 'Madrid', '08': 'Barcelona', '46': 'Valencia', '41': 'Sevilla',
  '30': 'Murcia', '15': 'A Coruña', '36': 'Pontevedra', '33': 'Asturias',
  '48': 'Bilbao', '31': 'Navarra', '50': 'Zaragoza', '37': 'Salamanca',
  '06': 'Badajoz', '14': 'Córdoba', '23': 'Jaén', '29': 'Málaga',
  '11': 'Cádiz', '03': 'Alicante', '12': 'Castellón', '17': 'Girona',
  '25': 'Lleida', '43': 'Tarragona', '09': 'Burgos', '26': 'La Rioja',
  '05': 'Ávila', '04': 'Almería', '21': 'Huelva', '35': 'Las Palmas',
  '38': 'Tenerife', '07': 'Illes Balears', '10': 'Cáceres',
  '32': 'Ourense', '27': 'Lugo', '24': 'León', '34': 'Palencia',
  '01': 'Álava', '20': 'Gipuzkoa', '47': 'Valladolid', '42': 'Soria',
  '19': 'Guadalajara', '16': 'Cuenca', '45': 'Toledo', '13': 'Ciudad Real',
  '02': 'Albacete', '18': 'Granada', '22': 'Huesca', '44': 'Teruel',
  '49': 'Zamora', '39': 'Cantabria',
};

function lookupCityFromZip(zip: string, country: string): string | null {
  if (country !== 'Spain' && country !== 'ES') return null;
  const cleaned = zip.replace(/\s/g, '');
  if (!/^\d{5}$/.test(cleaned)) return null;
  const prefix = cleaned.substring(0, 2);
  return SPAIN_POSTAL_CITIES[prefix] || null;
}

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const isEs = locale === 'es';
  const { items, subtotal, hasHydrated } = useCart();
  const { user, openModal, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoLabel, setPromoLabel] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleAddressSelect = useCallback((addr: { streetName: string; streetNumber: string; city: string; postalCode: string; country: string }) => {
    setShipping((s) => ({
      ...s,
      streetName: addr.streetName || s.streetName,
      streetNumber: addr.streetNumber || s.streetNumber,
      city: addr.city || s.city,
      zip: addr.postalCode || s.zip,
      country: COUNTRY_FROM_CODE[addr.country] || addr.country || s.country,
    }));
  }, []);

  const [contact, setContact] = useState({ email: '', phone: '' });
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', streetName: '', streetNumber: '', floor: '', city: '', country: 'Spain', zip: '',
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
        paymentMethod: 'card',
        email: contact.email,
        phone: contact.phone || undefined,
        shipping: {
          name: `${shipping.firstName} ${shipping.lastName}`.trim(),
          address: {
            line1: `${shipping.streetName} ${shipping.streetNumber}`.trim(),
            line2: shipping.floor || undefined,
            city: shipping.city,
            postal_code: shipping.zip,
            country: COUNTRY_CODES[shipping.country] || 'ES',
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
            NOCTIP
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
                    autoComplete="email"
                    onChange={(e) => setContact((c) => ({...c, email: e.target.value}))}
                    placeholder="you@example.com"
                    className="input-premium" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('phone')}</label>
                  <PhoneInputField
                    value={contact.phone}
                    onChange={(val) => setContact((c) => ({...c, phone: val || ''}))}
                    required
                  />
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
                    autoComplete="given-name"
                    onChange={(e) => setShipping((s) => ({...s, firstName: e.target.value}))}
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('lastName')}</label>
                  <input type="text" required value={shipping.lastName}
                    autoComplete="family-name"
                    onChange={(e) => setShipping((s) => ({...s, lastName: e.target.value}))}
                    className="input-premium" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('streetName')}</label>
                  <AddressAutocomplete
                    value={shipping.streetName}
                    onChange={(val) => setShipping((s) => ({...s, streetName: val}))}
                    onAddressSelect={handleAddressSelect}
                    required
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('streetNumber')}</label>
                  <input type="text" required value={shipping.streetNumber}
                    onChange={(e) => setShipping((s) => ({...s, streetNumber: e.target.value}))}
                    placeholder="Nº"
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('floor')}</label>
                  <input type="text" value={shipping.floor}
                    onChange={(e) => setShipping((s) => ({...s, floor: e.target.value}))}
                    placeholder="2ºB, Portal A"
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('city')}</label>
                  <input type="text" required value={shipping.city}
                    autoComplete="address-level2"
                    onChange={(e) => setShipping((s) => ({...s, city: e.target.value}))}
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('zip')}</label>
                  <input type="text" required value={shipping.zip}
                    autoComplete="postal-code"
                    onChange={(e) => setShipping((s) => ({...s, zip: e.target.value}))}
                    onBlur={(e) => {
                      if (!shipping.city) {
                        const city = lookupCityFromZip(e.target.value, shipping.country);
                        if (city) setShipping((s) => ({...s, city}));
                      }
                    }}
                    className="input-premium" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('country')}</label>
                  <select value={shipping.country}
                    autoComplete="country"
                    onChange={(e) => setShipping((s) => ({...s, country: e.target.value}))}
                    className="select-premium">
                    <option value="Spain">España</option>
                    <option value="Portugal">Portugal</option>
                    <option value="France">Francia</option>
                    <option value="Germany">Alemania</option>
                    <option value="Italy">Italia</option>
                    <option value="Netherlands">Países Bajos</option>
                    <option value="Belgium">Bélgica</option>
                    <option value="United Kingdom">Reino Unido</option>
                    <option value="United States">Estados Unidos</option>
                    <option value="Mexico">México</option>
                    <option value="Brazil">Brasil</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Chile">Chile</option>
                    <option value="Peru">Perú</option>
                    <option value="Japan">Japón</option>
                    <option value="South Korea">Corea del Sur</option>
                    <option value="China">China</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canadá</option>
                    <option value="Switzerland">Suiza</option>
                    <option value="Austria">Austria</option>
                    <option value="Poland">Polonia</option>
                    <option value="Sweden">Suecia</option>
                    <option value="Norway">Noruega</option>
                    <option value="Denmark">Dinamarca</option>
                    <option value="Finland">Finlandia</option>
                    <option value="Ireland">Irlanda</option>
                    <option value="Greece">Grecia</option>
                    <option value="Turkey">Turquía</option>
                    <option value="Morocco">Marruecos</option>
                    <option value="Dominican Republic">República Dominicana</option>
                    <option value="Other">Otro</option>
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
                  placeholder={isEs ? 'Ej: NOCTIP10' : 'e.g. NOCTIP10'}
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

              {/* Stripe secure payment badge */}
              <div className="flex items-center gap-3 rounded-xl border-2 border-[rgba(16,191,216,0.3)] bg-[rgba(16,191,216,0.05)] px-4 py-4">
                <Lock size={22} className="text-[#10BFD8]" />
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-[#f2eee7]">{t('payWithCard')}</div>
                  <div className="text-[11px] text-[#6b7280]">{t('payWithCardDesc')}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 48 16" className="h-4 w-10" fill="#1A1F71"><path d="M19.5 2.5c-2.8 0-5.2.8-6.9 2.2L13 3.6c1.6-1.3 3.8-2.1 6.5-2.1 3.9 0 6.6 1.7 6.6 4.3v.3c0 1.2-.8 2.1-2.2 2.8-1.3.7-3 1.1-4.4 1.5-1.2.3-2.2.6-2.2 1.3 0 .5.4.8 1.2.8.9 0 2-.3 3.2-.9s2.3-1.3 2.3-1.3l-.3 1.8s-1 .7-2.7 1.2c-1 .3-2.1.5-3.2.5-2.5 0-4.1-1.2-4.1-3.2 0-2 1.6-3.2 4.2-4.1 1.4-.5 3.1-.9 4.4-1.2 1.1-.3 1.8-.6 1.8-1.2 0-.6-.6-1-1.9-1-1.1 0-2.4.2-3.6.7z"/><path d="M37.5 10.6c.6 0 1.2-.1 1.8-.4l-.5 1.6c-.5.2-1.1.4-1.7.4-2.1 0-3.3-1.2-3.3-3.1 0-2.2 1.5-3.8 3.5-3.8 1.1 0 2 .5 2.5 1.2l-.7 1.5c-.4-.5-.9-.8-1.6-.8-1.2 0-2 1-2 2.6 0 1.4.7 2.2 2 2.2z"/><path d="M42 .5h2.2L40.5 12.5h-2.2L42 .5z"/><path d="M2.5 2.5H6c1 0 1.8.1 2.2.3l-.4 1.9c-.3-.2-.8-.3-1.5-.3H4.9l-1.2 6.1H1.2L2.5 2.5z"/><path d="M10.5 2.5l-1.5 9.2h-2L9 .5h2.5l2.2 7.8L15 .5h2l-1.5 9.2h-2l1.2-7-2.2 7h-2L10.5 2.5z"/><path d="M26.5 2.5l-1.5 9.2h-2l1.5-9.2h2z"/><path d="M31 2.5l-1.5 9.2h-1.9l1.5-9.2H31zM31.5.5c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4c0-.8.6-1.4 1.4-1.4s1.4.6 1.4 1.4z"/></svg>
                  <svg viewBox="0 0 48 16" className="h-4 w-10"><circle fill="#F79F1A" cx="15.5" cy="8" r="7"/><circle fill="#EB001B" cx="28.5" cy="8" r="7" opacity=".8"/><path fill="#FF5F00" d="M22 2c2.8 2.1 4.2 5.4 4.2 8.9 0 3.5-1.4 6.8-4.2 8.9-2.8-2.1-4.2-5.4-4.2-8.9 0-3.5 1.4-6.8 4.2-8.9z"/></svg>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-[11px] text-[#6b7280]">
                <span className="flex items-center gap-1"><Lock size={10} className="text-[#10BFD8]" />{isEs ? 'Cifrado SSL 256-bit' : '256-bit SSL encryption'}</span>
                <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-[#10BFD8]" />{isEs ? 'Datos protegidos' : 'Data protected'}</span>
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
