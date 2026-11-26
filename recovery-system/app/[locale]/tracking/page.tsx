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
  return STATUS_CONFIG[status]?.color ?? 'text-[#5B6B68] border-[#E5E0D6] bg-[#F1EDE5]'
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
    <div className="min-h-screen bg-[#F7F5F0] text-[#14211F]">
      <Header showBackButton />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E]/10 border border-[#10BFD8]/20">
            <Package size={24} className="text-[#0F766E]" />
          </div>
          <h1 className="text-[24px] font-bold text-[#14211F]">
            {isEs ? 'Seguimiento de tu pedido' : 'Track your order'}
          </h1>
          <p className="mt-2 text-[14px] text-[#5B6B68]">
            {isEs ? 'Introduce tu número de pedido y el email de la compra.' : 'Enter your order number and the email used at checkout.'}
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8 space-y-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5B6B68]">
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
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5B6B68]">
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
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0F766E] py-3.5 text-[14px] font-semibold text-[#FFFFFF] transition-all hover:bg-[#0B5F58] disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
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
            <div className="rounded-2xl border border-[#E5E0D6] bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B68] mb-1">
                    {isEs ? 'Estado del pedido' : 'Order status'}
                  </div>
                  <div className="text-[13px] font-mono text-[#5B6B68]">
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
                    <div className={`h-1.5 rounded-full transition-all ${step.done ? 'bg-[#0F766E]' : 'bg-[#F1EDE5]'}`} />
                    <div className={`mt-1.5 text-[10px] text-center ${step.done ? 'text-[#0F766E]' : 'text-[#7A8A86]'}`}>
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order details */}
            <div className="rounded-2xl border border-[#E5E0D6] bg-white p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#5B6B68]">{isEs ? 'Fecha' : 'Date'}</span>
                  <span className="font-medium text-[#14211F]">
                    {new Date(result.createdAt).toLocaleDateString(isEs ? 'es-ES' : 'en-US', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#5B6B68]">{isEs ? 'Total' : 'Total'}</span>
                  <span className="font-semibold text-[#14211F]">€{(result.amount / 100).toFixed(2)}</span>
                </div>
                {result.trackingNumber && (
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#5B6B68]">{isEs ? 'Seguimiento' : 'Tracking'}</span>
                    <span className="font-mono text-[#0F766E]">{result.trackingNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="rounded-2xl border border-[#E5E0D6] bg-white p-5">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B68] mb-3">
                {isEs ? 'Productos' : 'Items'}
              </div>
              <div className="space-y-2">
                {result.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[13px]">
                    <span className="text-[#c8d0da]">{item.name} × {item.qty}</span>
                    <span className="text-[#14211F]">€{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="text-center text-[12px] text-[#7A8A86]">
              {isEs ? '¿Problemas con tu pedido?' : 'Problems with your order?'}{' '}
              <a href="mailto:support@noctip.com" className="text-[#0F766E] underline">support@noctip.com</a>
            </div>
          </div>
        )}

        {/* No search yet */}
        {!searched && !result && (
          <div className="text-center py-8">
            <p className="text-[13px] text-[#7A8A86]">
              {isEs
                ? 'Tu número de pedido aparece en el email de confirmación de tu compra.'
                : 'Your order number is in your order confirmation email.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
