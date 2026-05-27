'use client'

import React, { useState } from 'react'

export default function AdminPage(){
  const [adminKey, setAdminKey] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

  async function loadOrders(){
    setError('')
    if (!adminKey) return setError('Admin key required')
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
    const tracking = prompt('Introduce número de tracking')
    const carrier = prompt('Transportista (ej: Correos, DHL)')
    if (!tracking || !carrier) return
    try{
      const res = await fetch(`${apiBase}/orders/${orderId}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
        body: JSON.stringify({ trackingNumber: tracking, carrier })
      })
      if (!res.ok) throw new Error(await res.text())
      alert('Tracking enviado')
      loadOrders()
    }catch(e:any){
      alert('Error: ' + (e.message || e))
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Pedidos</h1>
      <div className="mb-4 flex gap-2">
        <input value={adminKey} onChange={(e)=>setAdminKey(e.target.value)} placeholder="Admin API Key" className="flex-1 rounded border px-3 py-2" />
        <button onClick={loadOrders} className="rounded bg-blue-600 px-4 py-2 text-white">Cargar pedidos</button>
      </div>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading && <div>Cargando...</div>}
      <div className="grid gap-3">
        {orders.map(o => (
          <div key={o.id} className="rounded border p-3">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Pedido #{o.id}</div>
                <div className="text-sm text-gray-600">{o.email} · {o.status}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>shipOrder(o.id)} className="rounded bg-green-600 px-3 py-1 text-white">Enviar (añadir tracking)</button>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <div>Items:</div>
              <ul className="list-disc ml-5">
                {(o.items || []).map((it:any, i:number) => (
                  <li key={i}>{it.name} x{it.qty}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
