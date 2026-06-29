'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage(){
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
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#f2eee7]">{isEs ? 'Política de Privacidad' : 'Privacy Policy'}</h1>
        <p className="mt-2 text-[13px] text-[#6b7785]">{isEs ? 'Última actualización: Junio 2025' : 'Last updated: June 2025'}</p>

        <div className="mt-8 space-y-8 text-[14px] leading-7 text-[#9aa7b9]">
          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '1. Responsable del tratamiento' : '1. Data Controller'}</h2>
            <p><strong>Noctip</strong> — {isEs ? 'CIF pendiente de asignación' : 'Tax ID pending'}. {isEs ? 'Contacto: support@noctip.com' : 'Contact: support@noctip.com'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '2. Datos que recopilamos' : '2. Data We Collect'}</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>{isEs ? 'Nombre y apellidos al realizar un pedido.' : 'Full name when placing an order.'}</li>
              <li>{isEs ? 'Dirección de email para comunicación y seguimiento del pedido.' : 'Email address for communication and order tracking.'}</li>
              <li>{isEs ? 'Dirección de envío para entregar tu pedido.' : 'Shipping address to deliver your order.'}</li>
              <li>{isEs ? 'Número de teléfono para gestión de envío (opcional).' : 'Phone number for shipping management (optional).'}</li>
              <li>{isEs ? 'Datos de pago procesados por Stripe. No almacenamos datos de tarjeta.' : 'Payment data processed by Stripe. We do not store card details.'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '3. Finalidad del tratamiento' : '3. Purpose of Processing'}</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>{isEs ? 'Gestionar y enviar tu pedido.' : 'Manage and ship your order.'}</li>
              <li>{isEs ? 'Enviar confirmaciones y actualizaciones de envío.' : 'Send confirmations and shipping updates.'}</li>
              <li>{isEs ? 'Responder a consultas de soporte.' : 'Respond to support inquiries.'}</li>
              <li>{isEs ? 'Cumplir obligaciones legales (facturación, impuestos).' : 'Comply with legal obligations (billing, taxes).'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '4. Base legal' : '4. Legal Basis'}</h2>
            <p>{isEs
              ? 'El tratamiento se basa en la ejecución de un contrato (tu compra) y en tu consentimiento para comunicaciones comerciales.'
              : 'Processing is based on the execution of a contract (your purchase) and your consent for commercial communications.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '5. Conservación de datos' : '5. Data Retention'}</h2>
            <p>{isEs
              ? 'Conservamos tus datos durante 4 años desde la última compra, obligación legal en España. Puedes solicitar su eliminación en cualquier momento.'
              : 'We retain your data for 4 years from your last purchase, as required by Spanish law. You can request deletion at any time.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '6. Tus derechos' : '6. Your Rights'}</h2>
            <p>{isEs
              ? 'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento escribiendo a support@noctip.com.'
              : 'You can exercise your rights of access, rectification, deletion, opposition, portability and limitation by writing to support@noctip.com.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '7. Cookies' : '7. Cookies'}</h2>
            <p>{isEs
              ? 'Utilizamos cookies propias y de terceros para mejorar tu experiencia. Consulta nuestra política de cookies para más detalles.'
              : 'We use first-party and third-party cookies to improve your experience. See our cookie policy for details.'}</p>
            <Link href={`/${locale}/legal/cookies`} className="text-[#10BFD8] hover:underline">{isEs ? 'Ver política de cookies' : 'View cookie policy'}</Link>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#f2eee7] mb-3">{isEs ? '8. Seguridad' : '8. Security'}</h2>
            <p>{isEs
              ? 'Tus datos se transmiten mediante cifrado SSL/TLS y se almacenan en servidores seguros. Los pagos se procesan exclusivamente a través de Stripe.'
              : 'Your data is transmitted via SSL/TLS encryption and stored on secure servers. Payments are processed exclusively through Stripe.'}</p>
          </section>
        </div>
      </main>
    </div>
  )
}
