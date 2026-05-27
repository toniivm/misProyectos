'use client'
import { useLocale } from 'next-intl'

export default function ReturnsPage(){
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-4">{isEs ? 'Devoluciones' : 'Returns'}</h1>
      <p className="mb-4 text-sm text-slate-500">
        {isEs ? (
          <>Aceptamos devoluciones por defecto o daño comprobado. Contacta a soporte para iniciar una devolución.</>
        ) : (
          <>We accept returns for defects or verified damage. Contact support to start a return.</>
        )}
      </p>
    </div>
  )
}
