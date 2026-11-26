'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function ReturnsPage(){
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
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#14211F]">{isEs ? 'Política de Devoluciones' : 'Returns Policy'}</h1>
        <p className="mt-2 text-[13px] text-[#5B6B68]">{isEs ? 'Última actualización: Junio 2025' : 'Last updated: June 2025'}</p>

        <div className="mt-8 space-y-8 text-[14px] leading-7 text-[#5B6B68]">
          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? 'Garantía de 30 días' : '30-Day Guarantee'}</h2>
            <p>{isEs
              ? 'Puedes probar cualquier producto Nítida durante 30 días. Si no estás satisfecho, te devolvemos el importe íntegro. Sin preguntas, sin formularios interminables.'
              : 'You can try any Nítida product for 30 days. If you are not satisfied, we refund the full amount. No questions, no endless forms.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? 'Cómo devolver' : 'How to Return'}</h2>
            <ol className="list-decimal ml-5 space-y-3">
              <li>{isEs
                ? 'Escríbenos a hola@noctip.com con tu número de pedido y el motivo de la devolución.'
                : 'Write to hola@noctip.com with your order number and the reason for the return.'}</li>
              <li>{isEs
                ? 'Te enviaremos las instrucciones para la recogida del producto.'
                : 'We will send you instructions for product pickup.'}</li>
              <li>{isEs
                ? 'Una vez recibido el producto, procesaremos el reembolso en un máximo de 5 días laborables.'
                : 'Once we receive the product, we will process the refund within 5 business days.'}</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? 'Condiciones' : 'Conditions'}</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>{isEs ? 'El producto debe estar en buen estado de uso.' : 'The product must be in good used condition.'}</li>
              <li>{isEs ? 'El envío de devolución corre por nuestra cuenta.' : 'Return shipping is on us.'}</li>
              <li>{isEs ? 'El reembolso se realiza por el mismo método de pago original.' : 'The refund is made by the same original payment method.'}</li>
              <li>{isEs ? 'El plazo máximo para solicitar una devolución es de 30 días desde la recepción.' : 'The maximum period to request a return is 30 days from receipt.'}</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
