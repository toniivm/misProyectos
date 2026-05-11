import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { locale: string };
  searchParams: { session_id?: string };
}

export default function CheckoutSuccessPage({ params, searchParams }: Props) {
  const { locale } = params;
  const ref = searchParams.session_id?.slice(-8).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center">
      <CheckCircle2 size={64} className="mb-6 text-green-500" strokeWidth={1.5} />

      <h1 className="font-display text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
        {locale === 'es' ? '¡Pedido confirmado!' : 'Order confirmed!'}
      </h1>

      <p className="mt-4 max-w-sm text-gray-500">
        {locale === 'es'
          ? 'Gracias por tu compra. Recibirás un email de confirmación en breve.'
          : 'Thank you for your purchase. A confirmation email is on its way.'}
      </p>

      {ref && (
        <p className="mt-4 rounded-xl bg-gray-50 px-5 py-2.5 font-mono text-sm font-semibold text-gray-600">
          Ref: {ref}
        </p>
      )}

      <div className="mt-6 flex flex-col items-center gap-1 text-sm text-gray-400">
        <span>
          {locale === 'es' ? 'Entrega estimada:' : 'Estimated delivery:'}
          <strong className="text-gray-700"> 3–5 {locale === 'es' ? 'días hábiles' : 'business days'}</strong>
        </span>
      </div>

      <Link
        href={`/${locale}`}
        className="mt-10 rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
      >
        {locale === 'es' ? 'Seguir comprando' : 'Continue shopping'}
      </Link>
    </div>
  );
}
