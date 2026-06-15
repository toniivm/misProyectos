'use client'

import React, { useState, useEffect } from 'react'
import { Lock } from 'lucide-react'

const ADMIN_AUTH_KEY = 'noctas_admin_authed'

export default function AdminPage(){
  const [adminKey, setAdminKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(ADMIN_AUTH_KEY) === '1') {
      setAuthed(true)
    }
  }, [])

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

  function login(){
    if (!adminKey) return setError('Introduce la clave de administrador')
    // Store auth in localStorage
    localStorage.setItem(ADMIN_AUTH_KEY, '1')
    setAuthed(true)
    setError('')
  }

  async function loadOrders(){
    setError('')
    if (!adminKey) return setError('Clave de admin requerida')
    setLoading(true)
    try{
      const res = await fetch(`${apiBase}/orders`, { headers: { 'X-Admin-Key': adminKey } })
      if (!res.ok) throw new Error(await res.text())
      const payload = await res.json()
      setOrders(payload.orders || [])
    }catch(e:any){
      setError(String(e.message || e))
    }finally{ setLoading(false) }
  }

  async function shipOrder(orderId: string){
    const tracking = prompt('Número de tracking')
    const carrier = prompt('Transportista (ej: Correos, DHL, SEUR)')
    if (!tracking || !carrier) return
    try{
      const res = await fetch(`${apiBase}/orders/${orderId}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
        body: JSON.stringify({ trackingNumber: tracking, carrier })
      })
      if (!res.ok) throw new Error(await res.text())
      alert('✅ Tracking enviado al cliente')
      loadOrders()
    }catch(e:any){
      alert('Error: ' + (e.message || e))
    }
  }

  function logout(){
    localStorage.removeItem(ADMIN_AUTH_KEY)
    setAuthed(false)
    setAdminKey('')
    setOrders([])
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c1016] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0d1219] p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <Lock size={24} className="text-[#8ea7c7]" />
            </div>
            <h1 className="text-[20px] font-bold text-[#f2eee7]">Admin — Noctip</h1>
            <p className="mt-2 text-[13px] text-[#6b7280]">Acceso restringido a administradores</p>
          </div>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Clave de administrador"
            className="mb-3 w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-[#f2eee7] placeholder:text-[#3d4a5c] outline-none transition focus:border-white/30"
          />
          {error && <p className="mb-3 text-[13px] text-red-400">{error}</p>}
          <button
            onClick={login}
            className="w-full rounded-full bg-[#f2eee7] py-3 text-[14px] font-semibold text-[#11161d] transition hover:bg-white"
          >
            Acceder
          </button>
        </div>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-400/10 text-yellow-400',
    paid: 'bg-blue-400/10 text-blue-400',
    processing: 'bg-purple-400/10 text-purple-400',
    packed: 'bg-orange-400/10 text-orange-400',
    shipped: 'bg-emerald-400/10 text-emerald-400',
    delivered: 'bg-green-400/10 text-green-400',
    cancelled: 'bg-red-400/10 text-red-400',
  }

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      <header className="border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-[16px] font-bold text-[#f2eee7]">Noctip — Admin</h1>
            <p className="text-[12px] text-[#6b7280]">Gestión de pedidos</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="API Key"
              className="rounded-lg border border-white/[0.1] bg-[#111720] px-3 py-2 text-[12px] text-[#f2eee7] outline-none"
            />
            <button onClick={loadOrders} disabled={loading} className="rounded-full bg-[#f2eee7] px-5 py-2 text-[12px] font-semibold text-[#11161d] transition hover:bg-white disabled:opacity-50">
              {loading ? 'Cargando...' : 'Cargar pedidos'}
            </button>
            <button onClick={logout} className="rounded-full border border-white/[0.1] px-4 py-2 text-[12px] text-[#8791a1] transition hover:text-white">
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-[13px] text-red-400">
            {error}
          </div>
        )}

        {orders.length === 0 && !loading && !error && (
          <div className="py-16 text-center">
            <p className="text-[15px] text-[#6b7280]">No hay pedidos. Carga los pedidos con el botón superior.</p>
          </div>
        )}

        <div className="grid gap-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-white/[0.08] bg-[#0d1219] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#f2eee7]">Pedido #{o.id?.slice(0, 8)}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase ${statusColors[o.status] || 'bg-white/10 text-white'}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-1 text-[13px] text-[#6b7280]">
                    {o.email} · {new Date(o.createdAt?._seconds * 1000 || o.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {o.shipping?.name && (
                    <div className="mt-1 text-[13px] text-[#8791a1]">
                      📍 {o.shipping.name} · {o.shipping.address?.city}, {o.shipping.address?.country}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {o.trackingNumber ? (
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-right">
                      <div className="text-[10px] uppercase text-[#6b7280]">Tracking</div>
                      <div className="text-[13px] font-mono font-semibold text-[#f2eee7]">{o.trackingNumber}</div>
                      <div className="text-[11px] text-[#8791a1]">{o.carrier}</div>
                    </div>
                  ) : (
                    <button onClick={() => shipOrder(o.id)} className="rounded-full bg-emerald-600 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-emerald-500">
                      Añadir tracking
                    </button>
                  )}
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-[#f2eee7]">€{((o.amount || 0) / 100).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6b7280] mb-2">Productos</div>
                <ul className="space-y-1">
                  {(o.items || []).map((it: any, i: number) => (
                    <li key={i} className="flex justify-between text-[13px] text-[#8791a1]">
                      <span>{it.name} ×{it.qty}</span>
                      <span className="text-[#f2eee7]">€{((it.price || 0) * it.qty).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
