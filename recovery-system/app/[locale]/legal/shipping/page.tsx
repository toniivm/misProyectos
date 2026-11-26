'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function ShippingPage(){
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');

  return (
    <div className="min-h-screen bg-white text-[#14211F]">
      <header className="border-b border-[#E5E0D6] bg-white/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#14211F]">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0F766E] text-[13px] font-extrabold leading-none text-[#FFFFFF]">N</span>
            <span className="hidden sm:block">Nítida</span>
          </Link>
          <Link href={`/${locale}`} className="flex items-center gap-1.5 text-[13px] text-[#5B6B68] hover:text-[#14211F] transition-colors">
            <ArrowLeft size={14} />
            {isEs ? 'Volver' : 'Back'}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#14211F]">{isEs ? 'Información de Envío' : 'Shipping Information'}</h1>
        <p className="mt-2 text-[13px] text-[#5B6B68]">{isEs ? 'Última actualización: Junio 2025' : 'Last updated: June 2025'}</p>

        <div className="mt-8 space-y-8 text-[14px] leading-7 text-[#5B6B68]">
          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? 'Procesamiento' : 'Processing'}</h2>
            <p>{isEs
              ? 'Procesamos y enviamos todos los pedidos en un máximo de 24 horas desde la confirmación del pago.'
              : 'We process and ship all orders within 24 hours of payment confirmation.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? 'Envío estándar' : 'Standard Shipping'}</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>España peninsular:</strong> {isEs ? '24-72 h laborables (procesamiento 24h + tránsito) — seguimiento incluido' : '24-72 business hours (24h processing + transit) — tracking included'}</li>
              <li><strong>{isEs ? 'Europa' : 'Europe'}:</strong> {isEs ? '24-72 h laborables — seguimiento incluido' : '24-72 business hours — tracking included'}</li>
              <li><strong>{isEs ? 'Resto del mundo' : 'Rest of world'}:</strong> {isEs ? '7-14 días laborables' : '7-14 business days'}</li>
            </ul>
            <p className="mt-2">{isEs ? 'Envío gratuito en todos los pedidos. Transportista: transportista con seguimiento. Plazo máximo legal 30 días.' : 'Free shipping on all orders. Carrier: transportista con seguimiento. Legal max 30 days.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? 'Seguimiento' : 'Tracking'}</h2>
            <p>{isEs
              ? 'Todos los envíos incluyen seguimiento. Recibirás un email con el número de tracking cuando tu pedido sea enviado.'
              : 'All shipments include tracking. You will receive an email with the tracking number when your order is shipped.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? 'Duties and taxes' : 'Duties and Taxes'}</h2>
            <p>{isEs
              ? 'Los precios incluyen IVA para envíos dentro de la UE. Para envíos fuera de la UE, el cliente es responsable de posibles aranceles e impuestos de importación.'
              : 'Prices include VAT for EU shipments. For non-EU shipments, the customer is responsible for any import duties and taxes.'}</p>
          </section>
        </div>
      </main>
    </div>
  )
}
