'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ExternalLink, Package, Truck, Clock } from 'lucide-react'
import { Suspense } from 'react'
import { useLocale } from 'next-intl'

function TrackingContent() {
  const searchParams = useSearchParams()
  const locale = useLocale()
  const isEs = locale === 'es'
  const trackingNumber = searchParams.get('n') || ''
  const carrier = searchParams.get('carrier') || 'Cainiao'
  const order = searchParams.get('order') || ''

  if (!trackingNumber) {
    return (
      <div className="min-h-screen bg-[#080c16] text-[#f4f1ea] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[15px] text-[#8791a1]">
            {isEs ? 'No se ha proporcionado número de seguimiento.' : 'No tracking number provided.'}
          </p>
          <Link href={`/${locale}`} className="mt-4 inline-block text-[14px] text-[#10BFD8] underline">
            {isEs ? 'Volver a la tienda' : 'Back to shop'}
          </Link>
        </div>
      </div>
    )
  }

  // Build external tracking URL — hidden behind noctip branding
  // Customer sees noctip.com, never sees Cainiao/AliExpress
  const c = carrier.toLowerCase()
  let externalUrl = '#'
  if (c.includes('cainiao') || c.includes('aliexpress')) {
    externalUrl = `https://global.cainiao.com/newDetail.htm?mailNoList=${trackingNumber}`
  } else if (c.includes('correos')) {
    externalUrl = `https://www.correos.es/es/es/herramientas/localizador-de-envios/detalle?tracking-number=${trackingNumber}`
  } else if (c.includes('dhl')) {
    externalUrl = `https://www.dhl.com/es-es/home/tracking/tracking-express.html?submit=1&tracking-id=${trackingNumber}`
  } else if (c.includes('seur')) {
    externalUrl = `https://www.seur.com/livetracking/?segOnlineNum=${trackingNumber}`
  } else {
    externalUrl = `https://t.17track.net/en#nums=${trackingNumber}`
  }

  return (
    <div className="min-h-screen bg-[#080c16] text-[#f4f1ea]">
      <header className="border-b border-white/[0.06] bg-[rgba(8,12,22,0.92)] px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-center">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">
            <Image src="/images/logo/logo.png" alt="Noctip" width={32} height={32} className="object-contain" sizes="32px" />
            NOCTIP
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-8">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10BFD8]/10 border border-[#10BFD8]/20">
              <Package size={28} className="text-[#10BFD8]" />
            </div>
          </div>

          <h1 className="text-center text-[22px] font-bold text-[#f2eee7]">
            {isEs ? 'Seguimiento de tu pedido' : 'Track your order'}
          </h1>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10BFD8]/10">
                <Truck size={18} className="text-[#10BFD8]" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#f2eee7]">{isEs ? 'Estado' : 'Status'}</div>
                <div className="text-[12px] text-[#8791a1]">{isEs ? 'En tránsito hacia tu dirección' : 'In transit to your address'}</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#6b7280] mb-1">{isEs ? 'Transportista' : 'Carrier'}</div>
              <div className="text-[14px] font-semibold text-[#f2eee7]">{carrier}</div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#6b7280] mb-1">{isEs ? 'Nº de seguimiento' : 'Tracking number'}</div>
              <div className="font-mono text-[16px] font-bold text-[#10BFD8] tracking-wide">{trackingNumber}</div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10BFD8]/10">
                <Clock size={18} className="text-[#10BFD8]" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#f2eee7]">{isEs ? 'Entrega estimada' : 'Estimated delivery'}</div>
                <div className="text-[12px] text-[#8791a1]">{isEs ? '6-9 días hábiles' : '6-9 business days'}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-center">
            <p className="text-[13px] text-[#8791a1]">
              {isEs ? 'Tu paquete está en camino. Entrega estimada en' : 'Your package is on its way. Estimated delivery in'}{' '}
              <strong className="text-[#f2eee7]">{isEs ? '6-9 días hábiles' : '6-9 business days'}</strong>.
            </p>
            <p className="mt-2 text-[12px] text-[#5a6678]">
              {isEs ? 'Si tienes preguntas, contacta con' : 'If you have questions, contact'}{' '}
              <a href="mailto:noctip95@gmail.com" className="text-[#10BFD8] underline">noctip95@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-[12px] text-[#4a5568]">
          {isEs ? '¿Problemas con tu pedido?' : 'Problems with your order?'}{' '}
          <a href="mailto:noctip95@gmail.com" className="text-[#10BFD8] underline">noctip95@gmail.com</a>
        </div>
      </div>
    </div>
  )
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080c16] flex items-center justify-center text-[#8791a1]">Loading...</div>}>
      <TrackingContent />
    </Suspense>
  )
}
