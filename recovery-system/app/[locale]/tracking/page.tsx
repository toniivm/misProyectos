'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { Package, Search, Clock, Truck, CheckCircle, AlertCircle } from 'lucide-react'
import Header from '../../../components/Header'

interface OrderData {
  id: string
  status: string
  email: string
  items: Array<{ id: string; name: string; qty: number; price: number; icon?: string }>
  amount: number
  currency: string
  createdAt: string
  trackingNumber?: string
  carrier?: string
}

const STATUS_CONFIG: Record<string, { es: string; en: string; icon: React.ReactNode; color: string }> = {
  pending: {
    es: 'Pedido recibido',
    en: 'Order received',
    icon: <Clock size={18} />,
    color: 'text-amber-400 border-amber-400/20 bg-amber-400/10',
  },
  paid: {
    es: 'Pago confirmado',
    en: 'Payment confirmed',
    icon: <CheckCircle size={18} />,
    color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10',
  },
  processing: {
    es: 'Preparando pedido',
    en: 'Preparing order',
    icon: <Package size={18} />,
    color: 'text-blue-400 border-blue-400/20 bg-blue-400/10',
  },
  shipped: {
    es: 'Enviado',
    en: 'Shipped',
    icon: <Truck size={18} />,
    color: 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10',
  },
  delivered: {
    es: 'Entregado',
    en: 'Delivered',
    icon: <CheckCircle size={18} />,
    color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10',
  },
  cancelled: {
    es: 'Cancelado',
    en: 'Cancelled',
    icon: <AlertCircle size={18} />,
    color: 'text-rose-400 border-rose-400/20 bg-rose-400/10',
  },
}

function getStatusLabel(status: string, isEs: boolean): string {
  return STATUS_CONFIG[status]?.[isEs ? 'es' : 'en'] ?? status
}

function getStatusIcon(status: string) {
  return STATUS_CONFIG[status]?.icon ?? <Package size={18} />
}

function getStatusColor(status: string): string {
  return STATUS_CONFIG[status]?.color ?? 'text-[#8791a1] border-white/[0.1] bg-white/[0.04]'
}

export default function TrackingPage() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [searching, setSearching] = useState(false)
  const [result, setResult] = useState<OrderData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim() || !email.trim()) return

    setSearching(true)
    setError(null)
    setResult(null)
    setSearched(false)

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800))

    try {
      const stored = localStorage.getItem('noctas_orders')
      if (!stored) {
        setError(isEs ? 'No se encontró ningún pedido con esos datos.' : 'No order found with those details.')
        setSearched(true)
        setSearching(false)
        return
      }

      const orders = JSON.parse(stored) as Record<string, OrderData>
      const searchId = orderId.trim().toLowerCase()
      const searchEmail = email.trim().toLowerCase()

      const found = Object.values(orders).find((order) => {
        const matchesId = order.id?.toLowerCase().includes(searchId)
        const matchesEmail = order.email?.toLowerCase() === searchEmail
        return matchesId && matchesEmail
      })

      if (found) {
        setResult(found)
      } else {
        setError(isEs ? 'No se encontró ningún pedido con esos datos. Verifica tu número de pedido y email.' : 'No order found with those details. Check your order number and email.')
      }
    } catch {
      setError(isEs ? 'Error al buscar el pedido. Inténtalo de nuevo.' : 'Error looking up order. Please try again.')
    }

    setSearched(true)
    setSearching(false)
  }

  const steps = result ? [
    { key: 'pending', label: isEs ? 'Recibido' : 'Received', done: true },
    { key: 'paid', label: isEs ? 'Pagado' : 'Paid', done: ['paid', 'processing', 'shipped', 'delivered'].includes(result.status) },
    { key: 'processing', label: isEs ? 'Preparando' : 'Preparing', done: ['processing', 'shipped', 'delivered'].includes(result.status) },
    { key: 'shipped', label: isEs ? 'Enviado' : 'Shipped', done: ['shipped', 'delivered'].includes(result.status) },
    { key: 'delivered', label: isEs ? 'Entregado' : 'Delivered', done: result.status === 'delivered' },
  ] : []

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      <Header showBackButton />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10BFD8]/10 border border-[#10BFD8]/20">
            <Package size={24} className="text-[#10BFD8]" />
          </div>
          <h1 className="text-[24px] font-bold text-[#f2eee7]">
            {isEs ? 'Seguimiento de tu pedido' : 'Track your order'}
          </h1>
          <p className="mt-2 text-[14px] text-[#8791a1]">
            {isEs ? 'Introduce tu número de pedido y el email de la compra.' : 'Enter your order number and the email used at checkout.'}
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8 space-y-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
              {isEs ? 'Número de pedido' : 'Order number'}
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder={isEs ? 'Ej: ABC12345' : 'e.g. ABC12345'}
              required
              className="input-premium"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">
              {isEs ? 'Email de la compra' : 'Email used at checkout'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
              className="input-premium"
            />
          </div>
          <button
            type="submit"
            disabled={searching || !orderId.trim() || !email.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3.5 text-[14px] font-semibold text-[#11161d] transition-all hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
          >
            {searching ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#11161d] border-t-transparent" />
            ) : (
              <><Search size={15} /> {isEs ? 'Buscar pedido' : 'Find order'}</>
            )}
          </button>
        </form>

        {/* Error */}
        {error && searched && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-[13px] text-red-300">
            <div className="flex items-start gap-3">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
              <div>
                <p className="font-medium">{error}</p>
                <p className="mt-1 text-[11px] text-red-300/60">
                  {isEs ? 'Si necesitas ayuda, escríbenos a ' : 'If you need help, contact us at '}
                  <a href="mailto:support@noctip.com" className="underline">support@noctip.com</a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            {/* Status card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#6b7785] mb-1">
                    {isEs ? 'Estado del pedido' : 'Order status'}
                  </div>
                  <div className="text-[13px] font-mono text-[#8791a1]">
                    #{result.id.slice(-8).toUpperCase()}
                  </div>
                </div>
                <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold ${getStatusColor(result.status)}`}>
                  {getStatusIcon(result.status)}
                  {getStatusLabel(result.status, isEs)}
                </div>
              </div>

              {/* Progress steps */}
              <div className="flex items-center gap-1 mt-4">
                {steps.map((step, idx) => (
                  <div key={step.key} className="flex-1">
                    <div className={`h-1.5 rounded-full transition-all ${step.done ? 'bg-[#10BFD8]' : 'bg-white/[0.06]'}`} />
                    <div className={`mt-1.5 text-[10px] text-center ${step.done ? 'text-[#10BFD8]' : 'text-[#4a5568]'}`}>
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order details */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#8791a1]">{isEs ? 'Fecha' : 'Date'}</span>
                  <span className="font-medium text-[#f2eee7]">
                    {new Date(result.createdAt).toLocaleDateString(isEs ? 'es-ES' : 'en-US', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#8791a1]">{isEs ? 'Total' : 'Total'}</span>
                  <span className="font-semibold text-[#f2eee7]">€{(result.amount / 100).toFixed(2)}</span>
                </div>
                {result.trackingNumber && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#8791a1]">{isEs ? 'Seguimiento' : 'Tracking'}</span>
                    <span className="font-mono text-[#10BFD8]">{result.trackingNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-5">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#6b7785] mb-3">
                {isEs ? 'Productos' : 'Items'}
              </div>
              <div className="space-y-2">
                {result.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[13px]">
                    <span className="text-[#c8d0da]">{item.name} × {item.qty}</span>
                    <span className="text-[#f2eee7]">€{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="text-center text-[12px] text-[#5a6678]">
              {isEs ? '¿Problemas con tu pedido?' : 'Problems with your order?'}{' '}
              <a href="mailto:support@noctip.com" className="text-[#10BFD8] underline">support@noctip.com</a>
            </div>
          </div>
        )}

        {/* No search yet */}
        {!searched && !result && (
          <div className="text-center py-8">
            <p className="text-[13px] text-[#5a6678]">
              {isEs
                ? 'Tu número de pedido aparece en el email de confirmación y en esta página.'
                : 'Your order number can be found in your confirmation email and on this page.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
