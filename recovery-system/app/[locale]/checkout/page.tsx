'use client';

import { ArrowLeft, Check, Lock, ShieldCheck, Truck, RotateCcw, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import PhoneInputField from '../../../components/PhoneInputField';
import AddressAutocomplete from '../../../components/AddressAutocomplete';
import { getActiveBundle } from '../../../lib/catalog';

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
  'halo': '#0b0f14',
  'wave': '#131020',
  'sleep-headband': '#101828',
  'neck-massager': '#121a24',
};

const PRODUCT_ICON: Record<string, string> = {
  'halo': '😴',
  'wave': '🧘',
  'sleep-headband': '🎧',
  'neck-massager': '🧘',
};

const SPAIN_PROVINCES = [
  'Álava/Araba', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Barcelona', 'Bizkaia', 'Burgos', 'Cáceres', 'Cádiz',
  'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gipuzkoa',
  'Girona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Illes Balears',
  'Jaén', 'La Rioja', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga',
  'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Las Palmas', 'Pontevedra',
  'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Zamora',
  'Zaragoza',
];

const COUNTRIES = [
  { value: 'Spain', labelEs: '🇪🇸 España', labelEn: '🇪🇸 Spain' },
  { value: 'Portugal', labelEs: '🇵🇹 Portugal', labelEn: '🇵🇹 Portugal' },
  { value: 'France', labelEs: '🇫🇷 Francia', labelEn: '🇫🇷 France' },
  { value: 'Germany', labelEs: '🇩🇪 Alemania', labelEn: '🇩🇪 Germany' },
  { value: 'Italy', labelEs: '🇮🇹 Italia', labelEn: '🇮🇹 Italy' },
  { value: 'Netherlands', labelEs: '🇳🇱 Países Bajos', labelEn: '🇳🇱 Netherlands' },
  { value: 'Belgium', labelEs: '🇧🇪 Bélgica', labelEn: '🇧🇪 Belgium' },
  { value: 'United Kingdom', labelEs: '🇬🇧 Reino Unido', labelEn: '🇬🇧 United Kingdom' },
  { value: 'United States', labelEs: '🇺🇸 Estados Unidos', labelEn: '🇺🇸 United States' },
  { value: 'Mexico', labelEs: '🇲🇽 México', labelEn: '🇲🇽 Mexico' },
  { value: 'Brazil', labelEs: '🇧🇷 Brasil', labelEn: '🇧🇷 Brazil' },
  { value: 'Argentina', labelEs: '🇦🇷 Argentina', labelEn: '🇦🇷 Argentina' },
  { value: 'Colombia', labelEs: '🇨🇴 Colombia', labelEn: '🇨🇴 Colombia' },
  { value: 'Chile', labelEs: '🇨🇱 Chile', labelEn: '🇨🇱 Chile' },
  { value: 'Peru', labelEs: '🇵🇪 Perú', labelEn: '🇵🇪 Peru' },
  { value: 'Japan', labelEs: '🇯🇵 Japón', labelEn: '🇯🇵 Japan' },
  { value: 'South Korea', labelEs: '🇰🇷 Corea del Sur', labelEn: '🇰🇷 South Korea' },
  { value: 'China', labelEs: '🇨🇳 China', labelEn: '🇨🇳 China' },
  { value: 'Australia', labelEs: '🇦🇺 Australia', labelEn: '🇦🇺 Australia' },
  { value: 'Canada', labelEs: '🇨🇦 Canadá', labelEn: '🇨🇦 Canada' },
  { value: 'Switzerland', labelEs: '🇨🇭 Suiza', labelEn: '🇨🇭 Switzerland' },
  { value: 'Austria', labelEs: '🇦🇹 Austria', labelEn: '🇦🇹 Austria' },
  { value: 'Poland', labelEs: '🇵🇱 Polonia', labelEn: '🇵🇱 Poland' },
  { value: 'Sweden', labelEs: '🇸🇪 Suecia', labelEn: '🇸🇪 Sweden' },
  { value: 'Norway', labelEs: '🇳🇴 Noruega', labelEn: '🇳🇴 Norway' },
  { value: 'Denmark', labelEs: '🇩🇰 Dinamarca', labelEn: '🇩🇰 Denmark' },
  { value: 'Finland', labelEs: '🇫🇮 Finlandia', labelEn: '🇫🇮 Finland' },
  { value: 'Ireland', labelEs: '🇮🇪 Irlanda', labelEn: '🇮🇪 Ireland' },
  { value: 'Greece', labelEs: '🇬🇷 Grecia', labelEn: '🇬🇷 Greece' },
  { value: 'Turkey', labelEs: '🇹🇷 Turquía', labelEn: '🇹🇷 Turkey' },
  { value: 'Morocco', labelEs: '🇲🇦 Marruecos', labelEn: '🇲🇦 Morocco' },
  { value: 'Dominican Republic', labelEs: '🇩🇴 República Dominicana', labelEn: '🇩🇴 Dominican Republic' },
  { value: 'Other', labelEs: 'Otro', labelEn: 'Other' },
];

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

function lookupProvinceFromZip(zip: string): string | null {
  const cleaned = zip.replace(/\s/g, '');
  if (!/^\d{5}$/.test(cleaned)) return null;
  const prefix = cleaned.substring(0, 2);
  return SPAIN_POSTAL_CITIES[prefix] || null;
}

type FieldErrors = Record<string, string>;

function validateField(name: string, value: string, isEs: boolean): string {
  switch (name) {
    case 'email':
      if (!value.trim()) return isEs ? 'Introduce tu correo electrónico' : 'Enter your email address';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return isEs ? 'Introduce un correo válido' : 'Enter a valid email address';
      return '';
    case 'phone':
      if (!value.trim()) return isEs ? 'Introduce tu número de teléfono' : 'Enter your phone number';
      const digits = value.replace(/\D/g, '');
      if (digits.length < 9) return isEs ? 'El teléfono debe tener al menos 9 dígitos' : 'Phone must have at least 9 digits';
      return '';
    case 'firstName':
      if (!value.trim()) return isEs ? 'Introduce tu nombre' : 'Enter your first name';
      if (value.trim().length < 2) return isEs ? 'El nombre debe tener al menos 2 caracteres' : 'First name must be at least 2 characters';
      return '';
    case 'lastName':
      if (!value.trim()) return isEs ? 'Introduce tus apellidos' : 'Enter your last name';
      if (value.trim().length < 2) return isEs ? 'Los apellidos deben tener al menos 2 caracteres' : 'Last name must be at least 2 characters';
      return '';
    case 'streetName':
      if (!value.trim()) return isEs ? 'Introduce tu dirección' : 'Enter your street address';
      if (value.trim().length < 5) return isEs ? 'La dirección debe ser más específica' : 'Please enter a more specific address';
      return '';
    case 'streetNumber':
      if (!value.trim()) return isEs ? 'Introduce el número' : 'Enter the street number';
      return '';
    case 'city':
      if (!value.trim()) return isEs ? 'Introduce tu ciudad' : 'Enter your city';
      if (value.trim().length < 2) return isEs ? 'Introduce una ciudad válida' : 'Enter a valid city';
      return '';
    case 'province':
      if (!value.trim()) return isEs ? 'Selecciona tu provincia' : 'Select your province/state';
      return '';
    case 'zip':
      if (!value.trim()) return isEs ? 'Introduce tu código postal' : 'Enter your postal code';
      if (!/^\d{5}$/.test(value.replace(/\s/g, ''))) return isEs ? 'El código postal debe tener 5 dígitos' : 'Postal code must be 5 digits';
      return '';
    case 'country':
      if (!value) return isEs ? 'Selecciona tu país' : 'Select your country';
      return '';
    default:
      return '';
  }
}

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const isEs = locale === 'es';
  const { items, subtotal, hasHydrated } = useCart();
  const { user, openModal, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

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
    firstName: '', lastName: '', streetName: '', streetNumber: '', floor: '', city: '', province: '', country: 'Spain', zip: '',
  });
  const checkoutItems = hasHydrated ? items : [];
  const checkoutSubtotal = hasHydrated ? subtotal : 0;
  const activeBundle = hasHydrated ? getActiveBundle(items.map((i) => i.slug)) : null;
  const bundleDiscount = activeBundle
    ? Math.round(checkoutSubtotal * (activeBundle.discountPercent / 100) * 100) / 100
    : 0;
  const checkoutTotal = Math.max(0, checkoutSubtotal - bundleDiscount);

  const validateAndUpdateField = useCallback((name: string, value: string) => {
    const error = validateField(name, value, isEs);
    setFieldErrors((prev) => {
      if (error) return { ...prev, [name]: error };
      const next = { ...prev };
      delete next[name];
      return next;
    });
    if (!error && value.trim()) {
      setValidFields((prev) => ({ ...prev, [name]: true }));
    } else {
      setValidFields((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [isEs]);

  const handleFieldBlur = useCallback((name: string, value: string) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateAndUpdateField(name, value);
  }, [validateAndUpdateField]);

  const handleFieldChange = useCallback((name: string, value: string) => {
    if (touchedFields[name]) {
      validateAndUpdateField(name, value);
    }
  }, [touchedFields, validateAndUpdateField]);

  const validateAllFields = useCallback((): boolean => {
    const errors: FieldErrors = {};
    const allFields: Record<string, string> = {
      email: contact.email,
      phone: contact.phone,
      firstName: shipping.firstName,
      lastName: shipping.lastName,
      streetName: shipping.streetName,
      streetNumber: shipping.streetNumber,
      city: shipping.city,
      province: shipping.province,
      zip: shipping.zip,
      country: shipping.country,
    };
    for (const [name, value] of Object.entries(allFields)) {
      const err = validateField(name, value, isEs);
      if (err) errors[name] = err;
    }
    setFieldErrors(errors);
    setTouchedFields(Object.keys(allFields).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return Object.keys(errors).length === 0;
  }, [contact, shipping, isEs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasHydrated || !checkoutItems.length) return;

    if (!validateAllFields()) {
      setError(isEs ? 'Por favor, revisa los campos marcados en rojo.' : 'Please review the fields highlighted in red.');
      return;
    }

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
            state: shipping.province || undefined,
            postal_code: shipping.zip,
            country: COUNTRY_CODES[shipping.country] || 'ES',
          },
        },
        items: checkoutItems.map((item) => ({
          id: item.slug, qty: item.quantity, price: item.price, name: item.name,
        })),
        successUrl: `${window.location.origin}/${locale}/checkout/success`,
        cancelUrl: `${window.location.origin}/${locale}/checkout`,
        bundleId: activeBundle?.id || undefined,
        discountPercent: activeBundle?.discountPercent || undefined,
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
        let msg = isEs
          ? 'No hemos podido iniciar el pago. Por favor, inténtalo de nuevo.'
          : 'Could not start payment. Please try again.';
        try {
          const text = await response.text();
          try {
            const parsed = JSON.parse(text);
            if (parsed?.error === 'OUT_OF_STOCK') {
              msg = isEs ? 'Lo sentimos, uno de los productos se ha agotado mientras procesábamos tu pedido.' : 'Sorry, one of the products is out of stock.';
            } else if (parsed?.error === 'INVALID_AMOUNT') {
              msg = isEs ? 'El importe no es válido. Revisa tu carrito e inténtalo de nuevo.' : 'Invalid amount. Please check your cart.';
            } else if (parsed?.error === 'INVALID_PAYLOAD') {
              msg = isEs ? 'Algunos datos no son correctos. Por favor, revisa el formulario.' : 'Some information is incorrect. Please review the form.';
            } else if (parsed?.error === 'CHECKOUT_SESSION_ERROR') {
              msg = isEs ? 'Ha ocurrido un problema al preparar el pago. Inténtalo de nuevo.' : 'A problem occurred preparing payment. Please try again.';
            } else if (parsed?.detail) {
              msg = parsed.detail;
            } else if (parsed?.error) {
              msg = isEs ? 'No hemos podido completar la operación. Inténtalo de nuevo.' : 'Could not complete the operation. Please try again.';
            }
          } catch { msg = text || msg; }
        } catch {}
        throw new Error(msg);
      }

      const data = await response.json();
      if (!data?.url) throw new Error(isEs ? 'No hemos podido iniciar el pago. Inténtalo de nuevo.' : 'Could not start payment. Please try again.');

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
      setError(err instanceof Error ? err.message : (isEs ? 'Ha ocurrido un problema. Por favor, inténtalo de nuevo.' : 'Something went wrong. Please try again.'));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) setContact((c) => ({ ...c, email: user.email }));
    if (user?.displayName) {
      const parts = user.displayName.split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';
      setShipping((s) => ({
        ...s,
        firstName: s.firstName || firstName,
        lastName: s.lastName || lastName,
      }));
    }
  }, [user]);

  const getFieldClassName = (name: string, hasValue: boolean) => {
    if (fieldErrors[name] && touchedFields[name]) return 'input-premium input-error';
    if (validFields[name] && hasValue) return 'input-premium input-success';
    return 'input-premium';
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-[#f4f1ea]">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[rgba(8,12,22,0.92)] px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <Image
              src="/images/logo/logo.png"
              alt="Noctip"
              width={32}
              height={32}
              className="object-contain"
              sizes="32px"
            />
            NOCTIP
          </Link>
          <div className="flex items-center gap-2 text-[12px] text-[#6b7280]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10BFD8]/10">
              <Lock size={11} className="text-[#10BFD8]" />
            </div>
            <span className="hidden sm:inline">{t('title')}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-3 sm:px-5 py-4 sm:py-8 lg:py-10">
        {/* Progress indicator */}
        <div className="mb-5 sm:mb-8">
          <div className="flex items-center justify-center gap-0">
            {[
              { num: '1', label: isEs ? 'Contacto' : 'Contact' },
              { num: '2', label: isEs ? 'Envío' : 'Shipping' },
              { num: '3', label: isEs ? 'Pago' : 'Payment' },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-full bg-[#10BFD8]/15 text-[11px] sm:text-[12px] font-bold text-[#10BFD8]">
                    {step.num}
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-medium text-[#8791a1] hidden sm:inline">{step.label}</span>
                </div>
                {idx < 2 && (
                  <div className="w-6 sm:w-12 h-px bg-white/10 mx-1.5 sm:mx-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Link href={`/${locale}`}
          className="mb-6 sm:mb-8 inline-flex items-center gap-1.5 text-[13px] text-[#6b7280] transition hover:text-[#c4cdd6]">
          <ArrowLeft size={14} />
          {t('backToShop')}
        </Link>

        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[1fr_380px]">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
            {/* ── Contact ── */}
            <section className="checkout-section !p-4 sm:!p-6">
              <div className="mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-lg bg-[#10BFD8]/10 text-[12px] sm:text-[13px] font-bold text-[#10BFD8]">1</div>
                <h2 className="checkout-section-title">{t('contact')}</h2>
              </div>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 sm:mb-1.5 block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('email')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    autoComplete="email"
                    onChange={(e) => {
                      setContact((c) => ({...c, email: e.target.value}));
                      handleFieldChange('email', e.target.value);
                    }}
                    onBlur={(e) => handleFieldBlur('email', e.target.value)}
                    placeholder="tu@email.com"
                    className={getFieldClassName('email', !!contact.email)}
                  />
                  {fieldErrors.email && touchedFields.email && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.email}</div>
                  )}
                  {!fieldErrors.email && touchedFields.email && contact.email && validFields.email && (
                    <div className="success-hint"><CheckCircle2 size={12} /></div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('phone')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <PhoneInputField
                    value={contact.phone}
                    onChange={(val) => {
                      setContact((c) => ({...c, phone: val || ''}));
                      handleFieldChange('phone', val || '');
                    }}
                    onBlur={() => handleFieldBlur('phone', contact.phone)}
                    required
                  />
                  {fieldErrors.phone && touchedFields.phone && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.phone}</div>
                  )}
                </div>
              </div>
            </section>

            {/* ── Shipping ── */}
            <section className="checkout-section !p-4 sm:!p-6">
              <div className="mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-lg bg-[#10BFD8]/10 text-[12px] sm:text-[13px] font-bold text-[#10BFD8]">2</div>
                <h2 className="checkout-section-title">{t('shippingAddress')}</h2>
              </div>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('firstName')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <input type="text" required value={shipping.firstName}
                    autoComplete="given-name"
                    onChange={(e) => {
                      setShipping((s) => ({...s, firstName: e.target.value}));
                      handleFieldChange('firstName', e.target.value);
                    }}
                    onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
                    placeholder={isEs ? 'Ej: María' : 'e.g. John'}
                    className={getFieldClassName('firstName', !!shipping.firstName)} />
                  {fieldErrors.firstName && touchedFields.firstName && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.firstName}</div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('lastName')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <input type="text" required value={shipping.lastName}
                    autoComplete="family-name"
                    onChange={(e) => {
                      setShipping((s) => ({...s, lastName: e.target.value}));
                      handleFieldChange('lastName', e.target.value);
                    }}
                    onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
                    placeholder={isEs ? 'Ej: García López' : 'e.g. Smith'}
                    className={getFieldClassName('lastName', !!shipping.lastName)} />
                  {fieldErrors.lastName && touchedFields.lastName && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.lastName}</div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('streetName')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <AddressAutocomplete
                    value={shipping.streetName}
                    onChange={(val) => {
                      setShipping((s) => ({...s, streetName: val}));
                      handleFieldChange('streetName', val);
                    }}
                    onAddressSelect={handleAddressSelect}
                    required
                    locale={locale}
                    className={getFieldClassName('streetName', !!shipping.streetName)}
                  />
                  {fieldErrors.streetName && touchedFields.streetName && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.streetName}</div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('streetNumber')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <input type="text" required value={shipping.streetNumber}
                    inputMode="numeric"
                    onChange={(e) => {
                      setShipping((s) => ({...s, streetNumber: e.target.value}));
                      handleFieldChange('streetNumber', e.target.value);
                    }}
                    onBlur={(e) => handleFieldBlur('streetNumber', e.target.value)}
                    placeholder="Nº"
                    className={getFieldClassName('streetNumber', !!shipping.streetNumber)} />
                  {fieldErrors.streetNumber && touchedFields.streetNumber && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.streetNumber}</div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{t('floor')}</label>
                  <input type="text" value={shipping.floor}
                    onChange={(e) => setShipping((s) => ({...s, floor: e.target.value}))}
                    placeholder={isEs ? '2ºB, Portal A' : 'Apt 2B'}
                    className="input-premium" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('city')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <input type="text" required value={shipping.city}
                    autoComplete="address-level2"
                    onChange={(e) => {
                      setShipping((s) => ({...s, city: e.target.value}));
                      handleFieldChange('city', e.target.value);
                    }}
                    onBlur={(e) => handleFieldBlur('city', e.target.value)}
                    className={getFieldClassName('city', !!shipping.city)} />
                  {fieldErrors.city && touchedFields.city && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.city}</div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {isEs ? 'Provincia' : 'State / Province'} <span className="text-[#10BFD8]">*</span>
                  </label>
                  {shipping.country === 'Spain' || shipping.country === 'ES' ? (
                    <select
                      required
                      value={shipping.province}
                      autoComplete="address-level1"
                      onChange={(e) => {
                        setShipping((s) => ({...s, province: e.target.value}));
                        handleFieldChange('province', e.target.value);
                      }}
                      onBlur={(e) => handleFieldBlur('province', e.target.value)}
                      className={`${getFieldClassName('province', !!shipping.province)} ${!shipping.province ? 'text-[#4a5568]' : ''}`}>
                      <option value="">{isEs ? 'Selecciona provincia' : 'Select province'}</option>
                      {SPAIN_PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  ) : (
                    <input type="text" required value={shipping.province}
                      autoComplete="address-level1"
                      onChange={(e) => {
                        setShipping((s) => ({...s, province: e.target.value}));
                        handleFieldChange('province', e.target.value);
                      }}
                      onBlur={(e) => handleFieldBlur('province', e.target.value)}
                      placeholder={isEs ? 'Ej: Madrid, California, London' : 'e.g. Madrid, California, London'}
                      className={getFieldClassName('province', !!shipping.province)} />
                  )}
                  {fieldErrors.province && touchedFields.province && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.province}</div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('zip')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <input type="text" required value={shipping.zip}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    onChange={(e) => {
                      setShipping((s) => ({...s, zip: e.target.value}));
                      handleFieldChange('zip', e.target.value);
                    }}
                    onBlur={(e) => {
                      handleFieldBlur('zip', e.target.value);
                      if (!shipping.city) {
                        const city = lookupCityFromZip(e.target.value, shipping.country);
                        if (city) setShipping((s) => ({...s, city}));
                      }
                      if (!shipping.province) {
                        const province = lookupProvinceFromZip(e.target.value);
                        if (province) setShipping((s) => ({...s, province}));
                      }
                    }}
                    placeholder={isEs ? '28001' : '28001'}
                    className={getFieldClassName('zip', !!shipping.zip)} />
                  {fieldErrors.zip && touchedFields.zip && (
                    <div className="error-message"><AlertCircle size={12} />{fieldErrors.zip}</div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
                    {t('country')} <span className="text-[#10BFD8]">*</span>
                  </label>
                  <select value={shipping.country}
                    autoComplete="country"
                    onChange={(e) => setShipping((s) => ({...s, country: e.target.value}))}
                    className="select-premium">
                    {COUNTRIES.map((c) => (
                      <option key={c.value} value={c.value}>{isEs ? c.labelEs : c.labelEn}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* ── Promo codes disabled ── */}

            {/* ── Payment ── */}
            <section className="checkout-section !p-4 sm:!p-6">
              <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-lg bg-[#10BFD8]/10 text-[12px] sm:text-[13px] font-bold text-[#10BFD8]">3</div>
                <h2 className="checkout-section-title">{t('paymentMethod')}</h2>
              </div>

              {/* Payment methods available */}
              <div className="mb-4 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                {/* Visa */}
                <svg viewBox="0 0 48 16" className="payment-icon" fill="#1A1F71"><path d="M19.5 2.5c-2.8 0-5.2.8-6.9 2.2L13 3.6c1.6-1.3 3.8-2.1 6.5-2.1 3.9 0 6.6 1.7 6.6 4.3v.3c0 1.2-.8 2.1-2.2 2.8-1.3.7-3 1.1-4.4 1.5-1.2.3-2.2.6-2.2 1.3 0 .5.4.8 1.2.8.9 0 2-.3 3.2-.9s2.3-1.3 2.3-1.3l-.3 1.8s-1 .7-2.7 1.2c-1 .3-2.1.5-3.2.5-2.5 0-4.1-1.2-4.1-3.2 0-2 1.6-3.2 4.2-4.1 1.4-.5 3.1-.9 4.4-1.2 1.1-.3 1.8-.6 1.8-1.2 0-.6-.6-1-1.9-1-1.1 0-2.4.2-3.6.7z"/><path d="M37.5 10.6c.6 0 1.2-.1 1.8-.4l-.5 1.6c-.5.2-1.1.4-1.7.4-2.1 0-3.3-1.2-3.3-3.1 0-2.2 1.5-3.8 3.5-3.8 1.1 0 2 .5 2.5 1.2l-.7 1.5c-.4-.5-.9-.8-1.6-.8-1.2 0-2 1-2 2.6 0 1.4.7 2.2 2 2.2z"/><path d="M42 .5h2.2L40.5 12.5h-2.2L42 .5z"/><path d="M2.5 2.5H6c1 0 1.8.1 2.2.3l-.4 1.9c-.3-.2-.8-.3-1.5-.3H4.9l-1.2 6.1H1.2L2.5 2.5z"/><path d="M10.5 2.5l-1.5 9.2h-2L9 .5h2.5l2.2 7.8L15 .5h2l-1.5 9.2h-2l1.2-7-2.2 7h-2L10.5 2.5z"/><path d="M26.5 2.5l-1.5 9.2h-2l1.5-9.2h2z"/><path d="M31 2.5l-1.5 9.2h-1.9l1.5-9.2H31zM31.5.5c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4c0-.8.6-1.4 1.4-1.4s1.4.6 1.4 1.4z"/></svg>
                {/* Mastercard */}
                <svg viewBox="0 0 48 16" className="payment-icon"><circle fill="#F79F1A" cx="15.5" cy="8" r="7"/><circle fill="#EB001B" cx="28.5" cy="8" r="7" opacity=".8"/><path fill="#FF5F00" d="M22 2c2.8 2.1 4.2 5.4 4.2 8.9 0 3.5-1.4 6.8-4.2 8.9-2.8-2.1-4.2-5.4-4.2-8.9 0-3.5 1.4-6.8 4.2-8.9z"/></svg>
                {/* Amex */}
                <svg viewBox="0 0 48 16" className="payment-icon"><rect width="48" height="16" rx="2" fill="#006FCF"/><text x="24" y="11" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">AMEX</text></svg>
                {/* PayPal */}
                <svg viewBox="0 0 48 16" className="payment-icon"><text x="24" y="11" textAnchor="middle" fill="#003087" fontSize="7" fontWeight="bold" fontFamily="Arial">PayPal</text></svg>
                {/* Google Pay */}
                <svg viewBox="0 0 48 16" className="payment-icon"><text x="24" y="11" textAnchor="middle" fill="#5F6368" fontSize="7" fontWeight="bold" fontFamily="Arial">G Pay</text></svg>
                {/* Apple Pay */}
                <svg viewBox="0 0 48 16" className="payment-icon"><text x="24" y="11" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold" fontFamily="Arial">Pay</text></svg>
              </div>

              {/* Security info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-xl border border-[rgba(16,191,216,0.15)] bg-[rgba(16,191,216,0.04)] px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10BFD8]/10">
                    <Lock size={16} className="text-[#10BFD8]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{isEs ? 'Pago 100% seguro' : '100% secure payment'}</div>
                    <div className="text-[11px] text-[#6b7280]">{isEs ? 'Cifrado SSL de 256 bits — tus datos nunca se almacenan' : '256-bit SSL encryption — your data is never stored'}</div>
                  </div>
                  <ShieldCheck size={18} className="text-[#10BFD8]" />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10BFD8]/10">
                    <Truck size={16} className="text-[#10BFD8]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{isEs ? 'Envío protegido' : 'Protected shipping'}</div>
                    <div className="text-[11px] text-[#6b7280]">{isEs ? 'Seguimiento incluido · Entrega en 6-9 días' : 'Tracking included · Delivery in 6-9 days'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10BFD8]/10">
                    <RotateCcw size={16} className="text-[#10BFD8]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-[#f2eee7]">{isEs ? 'Garantía 30 días' : '30-day guarantee'}</div>
                    <div className="text-[11px] text-[#6b7280]">{isEs ? 'Devolución completa sin preguntas' : 'Full refund, no questions asked'}</div>
                  </div>
                </div>
              </div>

              {/* Stripe badge */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[#4a5568]">
                <Lock size={9} />
                <span>{isEs ? 'Procesado por' : 'Powered by'} <span className="font-semibold text-[#6b7280]">Stripe</span></span>
              </div>
            </section>

            {/* ── Auth prompt (optional) ── */}
            {!user && !authLoading && (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-[13px] text-[#c8d4e2]">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10BFD8]/10">
                    <User size={12} className="text-[#10BFD8]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#f2eee7] font-medium">{isEs ? '¿Tienes cuenta? ' : 'Have an account? '}</span>
                    <button type="button" onClick={() => openModal()}
                      className="inline-flex items-center rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[12px] font-semibold text-[#10BFD8] transition hover:bg-[#10BFD8]/15">
                      {isEs ? 'Inicia sesión para ir más rápido' : 'Sign in for faster checkout'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Global error ── */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3.5 text-[13px] text-red-300">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <AlertCircle size={13} className="text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-300">{error}</p>
                    <p className="mt-1.5 text-[11px] text-red-300/60">
                      {isEs
                        ? 'Si el problema persiste, escríbenos a noctip95@gmail.com'
                        : 'If the problem persists, email us at noctip95@gmail.com'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Submit ── */}
            <button type="submit"
              disabled={loading || !hasHydrated || checkoutItems.length === 0}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#f2eee7] py-4 text-[15px] font-semibold text-[#11161d] shadow-[0_4px_20px_rgba(242,238,231,0.08)] transition-all duration-200 hover:bg-white hover:-translate-y-[1px] hover:shadow-[0_6px_24px_rgba(242,238,231,0.12)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 min-h-[52px]">
              {loading ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#11161d] border-t-transparent" />{t('processing')}</>
              ) : (
                <><Lock size={15} />{t('continueToPayment')} — €{checkoutTotal.toFixed(2)}</>
              )}
            </button>

            {/* ── Trust row ── */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-[#5a6678]">
              <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-[#10BFD8]" /> {isEs ? 'Garantía 30 días' : '30-day guarantee'}</span>
              <span className="flex items-center gap-1.5"><Truck size={12} className="text-[#10BFD8]" /> {isEs ? 'Envío gratis' : 'Free shipping'}</span>
              <span className="flex items-center gap-1.5"><Lock size={12} className="text-[#10BFD8]" /> {isEs ? 'Pago seguro' : 'Secure checkout'}</span>
              <span className="flex items-center gap-1.5"><RotateCcw size={12} className="text-[#10BFD8]" /> {isEs ? 'Devolución fácil' : 'Easy returns'}</span>
            </div>
          </form>

          {/* ── Order Summary ── */}
          <aside className="h-fit rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#0d1219] to-[#0b1018] p-3.5 sm:p-5 lg:p-6 lg:sticky lg:top-24 order-first lg:order-last">
            <h2 className="mb-3 sm:mb-4 text-[14px] sm:text-[16px] font-semibold text-[#f2eee7]">{t('orderSummary')}</h2>

            {!hasHydrated ? (
              <div className="py-8 text-center text-[13px] text-[#6b7280]">{t('loadingCart')}</div>
            ) : checkoutItems.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-[#6b7280]">
                {t('emptyCart')}{' '}
                <Link href={`/${locale}`} className="text-[#c4cdd6] underline">{t('addItems')}</Link>
              </div>
            ) : (
              <>
                <ul className="space-y-3">
                  {checkoutItems.map((item) => (
                    <li key={item.slug} className="flex items-center gap-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-lg"
                        style={{ background: PRODUCT_BG[item.slug] ?? '#111720' }}>
                        {PRODUCT_ICON[item.slug] ?? '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#f2eee7] truncate">{item.name}</p>
                        <p className="text-[11px] text-[#5a6678]">{t('qty')}: {item.quantity}</p>
                      </div>
                      <span className="text-[13px] font-semibold text-[#f2eee7]">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                  <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                    <span>{t('subtotalLine')}</span>
                    <span className="font-semibold text-[#f2eee7]">€{checkoutSubtotal.toFixed(2)}</span>
                  </div>

                  {bundleDiscount > 0 && activeBundle && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#5fb07c]">
                        {isEs ? `Descuento ${activeBundle.name_es || activeBundle.name}` : `Discount ${activeBundle.name}`}
                        {' '}({activeBundle.discountPercent}%)
                      </span>
                      <span className="font-semibold text-[#5fb07c]">-€{bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                    <span>{t('shippingLine')}</span>
                    <span className="font-semibold text-[#5fb07c]">{t('freeShipping')}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                    <span className="text-[14px] font-semibold text-[#f2eee7]">{t('totalLine')}</span>
                    <span className="text-[19px] font-bold text-[#f2eee7]">€{checkoutTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Guarantee badge */}
                <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-center text-[12px] text-[#6b7280]">
                  <Check size={12} className="mr-1 inline text-[#5fb07c]" />
                  {t('guaranteeBadge')}
                </div>

                {/* Quick trust icons */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { icon: '🔒', label: isEs ? 'SSL 256-bit' : 'SSL 256-bit' },
                    { icon: '🚚', label: isEs ? 'Envío gratis' : 'Free shipping' },
                    { icon: '↩️', label: isEs ? '30 días' : '30-day return' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-1 rounded-lg border border-white/[0.05] bg-white/[0.02] py-2 text-center">
                      <span className="text-[14px]">{item.icon}</span>
                      <span className="text-[9px] text-[#5a6678]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
