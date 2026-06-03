'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useAuth } from '../../../../context/AuthContext'
import { Package, ChevronRight, ShoppingBag, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  qty: number
  price: number
  icon?: string
}

interface Order {
  id: string
  status: string
  email: string
  items: OrderItem[]
  amount: number
  currency: string
  createdAt: string
  shippedAt?: string
  deliveredAt?: string
  trackingNumber?: string
  carrier?: string
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock size={14} className="text-amber-400" />,
  paid: <CheckCircle size={14} className="text-emerald-400" />,
  processing: <Package size={14} className="text-blue-400" />,
  packed: <Package size={14} className="text-violet-400" />,
  shipped: <Truck size={14} className="text-cyan-400" />,
  delivered: <CheckCircle size={14} className="text-emerald-400" />,
  cancelled: <XCircle size={14} className="text-rose-400" />,
}

const STATUS_LABELS: Record<string, { es: string; en: string }> = {
  pending: { es: 'Pendiente', en: 'Pending' },
  paid: { es: 'Pagado', en: 'Paid' },
  processing: { es: 'En preparación', en: 'Processing' },
  packed: { es: 'Empaquetado', en: 'Packed' },
  shipped: { es: 'Enviado', en: 'Shipped' },
  delivered: { es: 'Entregado', en: 'Delivered' },
  cancelled: { es: 'Cancelado', en: 'Cancelled' },
}

function getStatusLabel(status: string, isEs: boolean): string {
  return STATUS_LABELS[status]?.[isEs ? 'es' : 'en'] ?? status
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    paid: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    processing: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
    packed: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
    shipped: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
    delivered: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    cancelled: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
  }
  return colors[status] ?? 'bg-white/[0.04] text-[#8791a1] border-white/[0.07]'
}

export default function OrdersPage() {
  const locale = useLocale()
  const isEs = String(locale || '').toLowerCase().startsWith('es')
  const auth = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      setLoading(true)
      try {
        const storedOrders = localStorage.getItem('noctas_orders')
        if (storedOrders) {
          const parsed = JSON.parse(storedOrders) as Record<string, Order>
          const userEmail = auth.user?.email
          if (userEmail) {
            const userOrders = Object.values(parsed).filter(
              (o) => o.email?.toLowerCase() === userEmail.toLowerCase()
            )
            setOrders(userOrders.sort((a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ))
          }
        }
      } catch {
        // No orders found or parsing error
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [auth.user])

  if (!auth.user) {
    return (
      <div className="mx-auto max-w-4xl p-8 bg-[#0c1016] text-[#f4f1ea] min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto text-[#3d4a5c] mb-4" />
          <h1 className="text-xl font-bold mb-2">
            {isEs ? 'Inicia sesión para ver tus pedidos' : 'Sign in to view your orders'}
          </h1>
          <p className="text-sm text-[#8791a1] mb-6">
            {isEs
              ? 'Necesitas iniciar sesión para acceder a tu historial de pedidos.'
              : 'You need to sign in to access your order history.'}
          </p>
          <button
            onClick={() => auth.openModal()}
            className="inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-5 py-2.5 text-sm font-semibold text-[#11161d] hover:bg-white transition"
          >
            {isEs ? 'Iniciar sesión' : 'Sign in'}
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-8 bg-[#0c1016] text-[#f4f1ea] min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          {isEs ? 'Mis Pedidos' : 'My Orders'}
        </h1>
        <div className="text-sm text-[#8791a1]">
          {isEs ? 'Cargando…' : 'Loading…'}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-8 bg-[#0c1016] text-[#f4f1ea] min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            {isEs ? 'Mis Pedidos' : 'My Orders'}
          </h1>
          <p className="text-sm text-[#8791a1] mt-1">
            {isEs
              ? `Mostrando ${orders.length} pedido${orders.length !== 1 ? 's' : ''}`
              : `Showing ${orders.length} order${orders.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-sm text-[#8791a1] hover:text-white transition"
        >
          <ShoppingBag size={14} />
          {isEs ? 'Seguir comprando' : 'Continue shopping'}
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto text-[#3d4a5c] mb-4" />
          <h2 className="text-lg font-semibold mb-2">
            {isEs ? 'Aún no tienes pedidos' : 'No orders yet'}
          </h2>
          <p className="text-sm text-[#8791a1] mb-6">
            {isEs
              ? 'Cuando realices tu primer pedido, aparecerá aquí.'
              : 'When you place your first order, it will appear here.'}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-5 py-2.5 text-sm font-semibold text-[#11161d] hover:bg-white transition"
          >
            <ShoppingBag size={14} />
            {isEs ? 'Ir a la tienda' : 'Go to shop'}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-white/[0.12] transition"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono tracking-wider text-[#6b7785]">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${getStatusColor(order.status)}`}>
                      {STATUS_ICONS[order.status]}
                      {getStatusLabel(order.status, isEs)}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b7785] mt-1.5">
                    {new Date(order.createdAt).toLocaleDateString(
                      isEs ? 'es-ES' : 'en-US',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    )}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#f2eee7] shrink-0">
                  €{(order.amount / 100).toFixed(2)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {order.items.slice(0, 4).map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-[#8791a1]"
                  >
                    {item.icon && <span className="text-sm">{item.icon}</span>}
                    {item.name}
                    <span className="text-[#4a5568]">x{item.qty}</span>
                  </span>
                ))}
                {order.items.length > 4 && (
                  <span className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-[#6b7785]">
                    +{order.items.length - 4} {isEs ? 'más' : 'more'}
                  </span>
                )}
              </div>

              {order.trackingNumber && (
                <div className="flex items-center gap-2 text-xs text-[#8791a1]">
                  <Truck size={12} className="text-[#6b7785]" />
                  <span>
                    {isEs ? 'Seguimiento' : 'Tracking'}:{' '}
                    <span className="text-[#c8d4e2] font-mono">{order.trackingNumber}</span>
                    {order.carrier && (
                      <span className="text-[#6b7785]"> ({order.carrier})</span>
                    )}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
