'use client'
import { useLocale } from 'next-intl'

export default function ShippingPage(){
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-4">{isEs ? 'Envíos' : 'Shipping'}</h1>
      <p className="mb-4 text-sm text-slate-500">
        {isEs ? (
          <>Los tiempos estimados de envío para pedidos son 10–20 días. Usamos dropshipping; el pedido se realiza con la dirección que proporcionaste.</>
        ) : (
          <>Estimated shipping times for orders are 10–20 days. We use dropshipping; the supplier ships to the address you provided.</>
        )}
      </p>
    </div>
  )
}
