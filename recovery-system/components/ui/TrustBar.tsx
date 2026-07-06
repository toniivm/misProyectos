'use client'
import { Truck, RotateCcw, Shield, Star } from 'lucide-react'
import { useLocale } from 'next-intl'

export default function TrustBar({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const items = [
    { icon: Truck, label: isEs ? 'Envío gratis' : 'Free shipping', sub: isEs ? 'En todos los pedidos' : 'On all orders' },
    { icon: RotateCcw, label: isEs ? '30 noches de prueba' : '30-night trial', sub: isEs ? 'Reembolso completo' : 'Full refund' },
    { icon: Shield, label: isEs ? 'Pago seguro' : 'Secure checkout', sub: 'SSL + Stripe' },
  ]
  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center gap-6 text-xs text-[#6b7785]">
        {items.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <item.icon size={14} className="text-accent" />
            {item.label}
          </span>
        ))}
      </div>
    )
  }
  return (
    <section className="border-y border-white/[0.06] bg-base-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
          {items.concat([{ icon: Star, label: isEs ? '4.9 media' : '4.9 average', sub: isEs ? 'Reseñas verificadas' : 'Verified reviews' }]).map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 py-5 transition-colors hover:bg-white/[0.02]">
              <item.icon size={18} className="text-accent" />
              <div>
                <div className="text-xs font-semibold text-[#f2eee7]">{item.label}</div>
                <div className="text-[10px] text-[#6b7785]">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
