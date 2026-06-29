'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function ShippingPage(){
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      <header className="border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <Image src="/images/logo/logo.png" alt="Noctip" width={28} height={28} className="object-contain" sizes="28px" />
            <span className="hidden sm:block">Noctip</span>
          </Link>
          <Link href={`/${locale}`} className="flex items-center gap-1.5 text-[13px] text-[#6b7785] hover:text-[#f2eee7] transition-colors">
            <ArrowLeft size={14} />
            {isEs ? 'Volver' : 'Back'}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#f2eee7]">{isEs ? 'Información de Envío' : 'Shipping Information'}</h1>
        <p className="mt-2 text-[13px] text-[#6b7785]">{isEs ? 'Última actualización: Junio 2025' : 'Last updated: June 2025'}</p>

        <div className="mt-8 space-y-8 text-[14px] leading-7 text-[#9aa7b9]">
          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? 'Procesamiento' : 'Processing'}</h2>
            <p>{isEs
              ? 'Procesamos y enviamos todos los pedidos en un máximo de 24 horas desde la confirmación del pago.'
              : 'We process and ship all orders within 24 hours of payment confirmation.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? 'Envío estándar' : 'Standard Shipping'}</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>España peninsular:</strong> {isEs ? '2-4 días laborables' : '2-4 business days'}</li>
              <li><strong>{isEs ? 'Europa' : 'Europe'}:</strong> {isEs ? '3-7 días laborables' : '3-7 business days'}</li>
              <li><strong>{isEs ? 'Resto del mundo' : 'Rest of world'}:</strong> {isEs ? '7-14 días laborables' : '7-14 business days'}</li>
            </ul>
            <p className="mt-2">{isEs ? 'Envío gratuito en todos los pedidos.' : 'Free shipping on all orders.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? 'Seguimiento' : 'Tracking'}</h2>
            <p>{isEs
              ? 'Todos los envíos incluyen seguimiento. Recibirás un email con el número de tracking cuando tu pedido sea enviado.'
              : 'All shipments include tracking. You will receive an email with the tracking number when your order is shipped.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? 'Duties and taxes' : 'Duties and Taxes'}</h2>
            <p>{isEs
              ? 'Los precios incluyen IVA para envíos dentro de la UE. Para envíos fuera de la UE, el cliente es responsable de posibles aranceles e impuestos de importación.'
              : 'Prices include VAT for EU shipments. For non-EU shipments, the customer is responsible for any import duties and taxes.'}</p>
          </section>
        </div>
      </main>
    </div>
  )
}
