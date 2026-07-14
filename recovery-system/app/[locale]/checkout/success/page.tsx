"use client";

import { CheckCircle2, ArrowRight, Shield, Truck, RotateCcw, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCart } from '../../../../context/CartContext';
import { useAuth } from '../../../../context/AuthContext';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://misproyectos-neyj.onrender.com';

export default function CheckoutSuccessPage() {
  const urlParams = useParams();
  const locale = (urlParams?.locale as string) || 'es';
  const t = useTranslations('success');
  const [ref, setRef] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const { clear } = useCart();
  const auth = useAuth();
  const isEs = locale === 'es';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const orderId = urlParams.get('orderId');
    setRef(orderId ? orderId.slice(-8).toUpperCase() : (sessionId ? sessionId.slice(-8).toUpperCase() : null));
    
    try {
      clear?.();
    } catch (e) {
      console.warn('Could not clear cart after checkout success', e);
    }
    try {
      localStorage.removeItem('recover_cart');
    } catch (e) {
      console.warn('Could not remove recover_cart key', e);
    }

    if (auth.user?.email) {
      try {
        const stored = localStorage.getItem('noctas_orders');
        if (stored) {
          const orders = JSON.parse(stored);
          const userEmail = auth.user.email.toLowerCase();
          let found = false;

          if (orderId && orders[orderId] && orders[orderId].email?.toLowerCase() === userEmail) {
            orders[orderId].status = 'paid';
            found = true;
          } else {
            const pendingOrders = Object.entries(orders)
              .filter(([_, o]: [string, any]) => o.email?.toLowerCase() === userEmail && o.status === 'pending')
              .sort(([_, a]: [string, any], [__, b]: [string, any]) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            if (pendingOrders.length > 0) {
              orders[pendingOrders[0][0]].status = 'paid';
              found = true;
            }
          }

          if (found) {
            localStorage.setItem('noctas_orders', JSON.stringify(orders));
          }
        }
      } catch (e) {
        console.warn('Could not update order status', e);
      }
    }

    // Request confirmation email from backend
    if (orderId) {
      fetch(`${API_BASE_URL}/orders/${orderId}/send-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setEmailSent(data?.ok ?? false);
          if (data?.ok) {
            console.log('✅ Confirmation email requested successfully');
          } else {
            console.warn('⚠ Confirmation email request failed:', data);
          }
        })
        .catch((err) => {
          console.warn('⚠ Could not request confirmation email:', err);
          setEmailSent(false);
        });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080c16] px-5 text-center">
      <div className="mx-auto max-w-md">
        {/* Success icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(16,191,216,0.1)] border border-[rgba(16,191,216,0.2)]">
            <CheckCircle2 size={40} className="text-[#10BFD8]" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-[28px] font-bold tracking-tight text-[#f6f2eb] sm:text-[32px]">
          {t('title')}
        </h1>

        <p className="mt-4 text-[15px] text-[#8791a1]">
          {t('subtitle')}
        </p>

        {ref && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3">
            <span className="text-[12px] text-[#6b7280]">{t('ref')}</span>
            <span className="font-mono text-[14px] font-bold text-[#f2eee7]">{ref}</span>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center gap-1 text-[14px] text-[#8791a1]">
          <span>
            {t('delivery')}:{' '}
            <strong className="text-[#f2eee7]">6–9 {t('deliveryDays')}</strong>
          </span>
        </div>

        {/* Email confirmation status */}
        {emailSent === true && (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-300">
            <Mail size={14} />
            {isEs ? 'Email de confirmación enviado' : 'Confirmation email sent'}
          </div>
        )}
        {emailSent === false && (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-[13px] text-yellow-300">
            <Mail size={14} />
            {isEs ? 'Recibirás tu confirmación por email en breve' : 'You will receive your confirmation email shortly'}
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[11px] text-[#5a6678]">
          <span className="flex items-center gap-1"><Shield size={11} className="text-[#10BFD8]" />{isEs ? 'Pago seguro' : 'Secure'}</span>
          <span className="flex items-center gap-1"><Truck size={11} className="text-[#10BFD8]" />{isEs ? 'Envío gratis' : 'Free shipping'}</span>
          <span className="flex items-center gap-1"><RotateCcw size={11} className="text-[#10BFD8]" />30 {isEs ? 'días' : 'days'}</span>
        </div>

        <Link
          href={`/${locale}`}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-8 py-4 text-[14px] font-semibold text-[#11161d] transition-all hover:bg-white hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(242,238,231,0.2)]"
        >
          {t('continueShopping')} <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
