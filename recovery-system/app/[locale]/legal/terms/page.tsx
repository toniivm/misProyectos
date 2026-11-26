'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage(){
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
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#14211F]">{isEs ? 'Términos y Condiciones' : 'Terms and Conditions'}</h1>
        <p className="mt-2 text-[13px] text-[#5B6B68]">{isEs ? 'Última actualización: Junio 2025' : 'Last updated: June 2025'}</p>

        <div className="mt-8 space-y-8 text-[14px] leading-7 text-[#5B6B68]">
          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '1. Acceptance' : '1. Acceptance'}</h2>
            <p>{isEs
              ? 'Al realizar un pedido en noctip.com, aceptas estos términos y condiciones. Si no estás de acuerdo, no utilices nuestro servicio.'
              : 'By placing an order on noctip.com, you accept these terms and conditions. If you do not agree, do not use our service.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '2. Productos' : '2. Products'}</h2>
            <p>{isEs
              ? 'Todos los productos son de uso personal y doméstico. Las imágenes son representativas pero pueden variar ligeramente del producto real.'
              : 'All products are for personal and domestic use. Images are representative but may vary slightly from the actual product.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '3. Precios y pago' : '3. Pricing and Payment'}</h2>
            <p>{isEs
              ? 'Los precios incluyen IVA para envíos dentro de la UE. Los pagos se procesan de forma segura a través de Stripe. Aceptamos Visa, Mastercard, Amex, Apple Pay y Google Pay.'
              : 'Prices include VAT for EU shipments. Payments are securely processed through Stripe. We accept Visa, Mastercard, Amex, Apple Pay, and Google Pay.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '4. Envío' : '4. Shipping'}</h2>
            <p>{isEs
              ? 'Procesamos y enviamos los pedidos en un máximo de 24 horas. Entrega estándar en Europa: 24-72 h laborables. Envío exprés disponible en el checkout. Seguimiento incluido en todos los envíos.'
              : 'We process and ship orders within 24 hours. Standard delivery in Europe: 6-9 business days. Express shipping available at checkout. Tracking included on all orders.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '5. Devoluciones' : '5. Returns'}</h2>
            <p>{isEs
              ? 'Tienes 30 días desde la recepción para devolver cualquier producto. Si no estás satisfecho, contacta con soporte y gestionamos la recogida y el reembolso completo.'
              : 'You have 30 days from receipt to return any product. If you are not satisfied, contact support and we arrange pickup and a full refund.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '6. Garantía' : '6. Warranty'}</h2>
            <p>{isEs
              ? 'Todos nuestros productos tienen una garantía de 30 días de prueba. Si el producto no cumple tus expectativas, te devolvemos el importe íntegro.'
              : 'All our products come with a 30-day trial guarantee. If the product does not meet your expectations, we refund the full amount.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '7. Limitación de responsabilidad' : '7. Limitation of Liability'}</h2>
            <p>{isEs
              ? 'Nítida no se hace responsable del uso indebido de los productos. Consulta las instrucciones de uso incluidas en cada paquete.'
              : 'Nítida is not responsible for misuse of the products. See the usage instructions included in each package.'}</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#14211F] mb-3">{isEs ? '8. Propiedad intelectual' : '8. Intellectual Property'}</h2>
            <p>{isEs
              ? 'Todo el contenido de noctip.com (textos, imágenes, diseño) es propiedad de Nítida y está protegido por la legislación de propiedad intelectual.'
              : 'All content on noctip.com (texts, images, design) is the property of Nítida and is protected by intellectual property legislation.'}</p>
          </section>
        </div>
      </main>
    </div>
  )
}
