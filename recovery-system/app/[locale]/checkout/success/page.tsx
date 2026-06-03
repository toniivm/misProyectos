"use client";

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '../../../../context/CartContext';
import { useAuth } from '../../../../context/AuthContext';

interface Props {
  params: { locale: string };
}

export default function CheckoutSuccessPage({ params }: Props) {
  const { locale } = params;
  const t = useTranslations('success');
  const [ref, setRef] = useState<string | null>(null);
  const { clear } = useCart();
  const auth = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const orderId = params.get('orderId');
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

    // Mark the most recent pending order for this user as paid
    if (auth.user?.email) {
      try {
        const stored = localStorage.getItem('noctas_orders');
        if (stored) {
          const orders = JSON.parse(stored);
          const userEmail = auth.user.email.toLowerCase();
          let found = false;

          // If we have an orderId from URL, mark that one as paid
          if (orderId && orders[orderId] && orders[orderId].email?.toLowerCase() === userEmail) {
            orders[orderId].status = 'paid';
            found = true;
          } else {
            // Otherwise mark the most recent pending order
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
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center">
      <CheckCircle2 size={64} className="mb-6 text-green-500" strokeWidth={1.5} />

      <h1 className="font-display text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
        {t('title')}
      </h1>

      <p className="mt-4 max-w-sm text-gray-500">
        {t('subtitle')}
      </p>

      {ref && (
        <p className="mt-4 rounded-xl bg-gray-50 px-5 py-2.5 font-mono text-sm font-semibold text-gray-600">
          {t('ref')}: {ref}
        </p>
      )}

      <div className="mt-6 flex flex-col items-center gap-1 text-sm text-gray-400">
        <span>
          {t('delivery')}:{' '}
          <strong className="text-gray-700">3–5 {t('deliveryDays')}</strong>
        </span>
      </div>

      <Link
        href={`/${locale}`}
        className="mt-10 rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
      >
        {t('continueShopping')}
      </Link>
    </div>
  );
}
