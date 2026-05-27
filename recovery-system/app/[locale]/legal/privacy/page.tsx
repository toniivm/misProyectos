'use client'
import { useLocale } from 'next-intl'

export default function PrivacyPage(){
  const locale = useLocale();
  const isEs = String(locale || '').toLowerCase().startsWith('es');
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-4">{isEs ? 'Política de Privacidad' : 'Privacy Policy'}</h1>
      <p className="mb-4 text-sm text-slate-500">
        {isEs ? (
          <>En CALMA nos tomamos en serio tu privacidad. Este documento describe cómo recopilamos, usamos y protegemos tus datos.</>
        ) : (
          <>At CALMA we take your privacy seriously. This document explains how we collect, use and protect your data.</>
        )}
      </p>
      <h2 className="font-semibold mt-4">{isEs ? 'Datos que recopilamos' : 'Data we collect'}</h2>
      <ul className="list-disc ml-6 mt-2 text-sm text-slate-500">
        <li>{isEs ? 'Información de contacto (correo electrónico, teléfono).' : 'Contact information (email, phone).'}</li>
        <li>{isEs ? 'Dirección de envío para procesar pedidos.' : 'Shipping address to fulfill orders.'}</li>
      </ul>
    </div>
  )
}
