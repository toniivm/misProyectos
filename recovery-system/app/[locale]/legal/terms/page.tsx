'use client'
import { useLocale } from 'next-intl'

export default function TermsPage(){
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-4">{isEs ? 'Términos de Uso' : 'Terms of Use'}</h1>
      <p className="mb-4 text-sm text-slate-500">
        {isEs ? 'Estos términos describen las condiciones de uso de nuestro sitio y servicios.' : 'These terms describe the conditions for using our website and services.'}
      </p>
      <h2 className="font-semibold mt-4">{isEs ? 'Compras' : 'Purchases'}</h2>
      <p className="text-sm text-slate-500 mt-2">{isEs ? 'Los pedidos se procesan a través de Stripe. Revisa tiempos de envío en la página de envío.' : 'Orders are processed through Stripe. Check shipping times on the shipping page.'}</p>
    </div>
  )
}
