'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Lock, RefreshCw, Package, MapPin, Mail, Phone, Copy, Check, ShoppingBag, Truck, Clock, ChevronRight, LogOut, ExternalLink, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const ADMIN_AUTH_KEY = 'noctas_admin_authed'
const DEFAULT_KEY = 'changeme_admin_key'

function getTrackingUrl(carrier: string, trackingNumber: string): string {
  const c = carrier.toLowerCase()
  if (c.includes('correos')) return `https://www.correos.es/es/es/herramientas/localizador-de-envios/detalle?tracking-number=${trackingNumber}`
  if (c.includes('dhl')) return `https://www.dhl.com/es-es/home/tracking/tracking-express.html?submit=1&tracking-id=${trackingNumber}`
  if (c.includes('seur')) return `https://www.seur.com/livetracking/?segOnlineNum=${trackingNumber}`
  if (c.includes('gls')) return `https://www.gls-spain.es/tracking?id=${trackingNumber}`
  if (c.includes('ups')) return `https://www.ups.com/track?loc=es_ES&tracknum=${trackingNumber}`
  if (c.includes('mrw')) return `https://www.mrw.es/seguimiento-envios.asp?numero=${trackingNumber}`
  if (c.includes('ctt')) return `https://www.ctt.pt/tracktrace/detalhe?CTT0=${trackingNumber}`
  return `https://t.17track.net/en#nums=${trackingNumber}`
}

export default function AdminPage(){
  const [adminKey, setAdminKey] = useState(DEFAULT_KEY)
  const [authed, setAuthed] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [copied, setCopied] = useState('')
  const [shipModal, setShipModal] = useState<{ orderId: string; tracking: string; carrier: string; trackingUrl: string } | null>(null)
  const [shipping, setShipping] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(ADMIN_AUTH_KEY) === '1') {
      setAuthed(true)
    }
  }, [])

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

  const loadOrders = useCallback(async () => {
    setError('')
    if (!adminKey && !authed) return
    setLoading(true)
    try{
      const res = await fetch(`${apiBase}/orders`, { 
        headers: { 'X-Admin-Key': adminKey || DEFAULT_KEY } 
      })
      if (!res.ok) throw new Error(await res.text())
      const payload = await res.json()
      setOrders(payload.orders || [])
    }catch(e:any){
      setError(String(e.message || e))
    }finally{ setLoading(false) }
  }, [apiBase, adminKey, authed])

  useEffect(() => {
    if (authed) loadOrders()
  }, [authed, loadOrders])

  useEffect(() => {
    if (!autoRefresh || !authed) return
    const timer = setInterval(loadOrders, 30000)
    return () => clearInterval(timer)
  }, [autoRefresh, authed, loadOrders])

  function login(e: React.FormEvent){
    e.preventDefault()
    if (!adminKey) return setError('Introduce la clave')
    localStorage.setItem(ADMIN_AUTH_KEY, '1')
    setAuthed(true)
    setError('')
  }

  function openShipModal(orderId: string){
    setShipModal({ orderId, tracking: '', carrier: 'Correos', trackingUrl: '' })
  }

  async function confirmShip(){
    if (!shipModal || !shipModal.tracking) return
    setShipping(true)
    try{
      const trackingUrl = getTrackingUrl(shipModal.carrier, shipModal.tracking)
      const res = await fetch(`${apiBase}/orders/${shipModal.orderId}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey || DEFAULT_KEY },
        body: JSON.stringify({
          trackingNumber: shipModal.tracking,
          carrier: shipModal.carrier,
          trackingUrl,
        })
      })
      if (!res.ok) throw new Error(await res.text())
      setShipModal(null)
      loadOrders()
    }catch(e:any){
      alert('Error: ' + (e.message || e))
    }finally{ setShipping(false) }
  }

  async function cancelOrder(orderId: string){
    if (!confirm('¿Cancelar este pedido?')) return
    try{
      const res = await fetch(`${apiBase}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey || DEFAULT_KEY },
      })
      if (!res.ok) throw new Error(await res.text())
      loadOrders()
    }catch(e:any){
      alert('Error: ' + (e.message || e))
    }
  }

  async function copyText(text: string, label: string){
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  function logout(){
    localStorage.removeItem(ADMIN_AUTH_KEY)
    setAuthed(false)
    setOrders([])
    setAdminKey(DEFAULT_KEY)
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080c12] px-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-[#0d1219] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#10BFD8]/10 to-[#10BFD8]/5">
              <Lock size={28} className="text-[#10BFD8]" />
            </div>
            <h1 className="text-[22px] font-bold text-white">Noctip Admin</h1>
            <p className="mt-2 text-[13px] text-[#6b7280]">Panel de gestión de pedidos</p>
          </div>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Clave de administrador"
            autoComplete="current-password"
            className="mb-3 w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3.5 text-[14px] text-white placeholder:text-[#3d4a5c] outline-none transition focus:border-[#10BFD8]/50 focus:bg-[#141c26]"
          />
          {error && <p className="mb-3 text-[13px] text-red-400">{error}</p>}
          <button type="submit"
            className="w-full rounded-full bg-white py-3.5 text-[14px] font-bold text-[#080c12] transition hover:bg-[#e8e4dd] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Acceder
          </button>
        </form>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    paid: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    processing: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    packed: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    shipped: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    delivered: 'bg-green-400/10 text-green-400 border-green-400/20',
    cancelled: 'bg-red-400/10 text-red-400 border-red-400/20',
  }

  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    paid: 'Pagado',
    processing: 'Procesando',
    packed: 'Preparado',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  }

  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'paid' || o.status === 'processing' || o.status === 'packed')
  const shippedOrders = orders.filter(o => o.status === 'shipped' || o.status === 'delivered')
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + (o.amount || 0), 0) / 100

  function formatDate(dateStr: any){
    try {
      const d = dateStr?._seconds ? new Date(dateStr._seconds * 1000) : new Date(dateStr)
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    } catch { return '—' }
  }

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f4f1ea] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[rgba(8,12,18,0.95)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo/logo.png" alt="Noctip" width={36} height={36} className="object-contain" sizes="36px" />
            </Link>
            <div>
              <h1 className="text-[15px] font-bold text-white">Noctip Admin</h1>
              <p className="text-[11px] text-[#6b7280]">{orders.length} pedidos</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-[#6b7280] transition hover:text-white hover:border-white/20">
            <LogOut size={13} /> Salir
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-4">
        {/* Stats bar */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
            <div className="text-[20px] font-bold text-white">{pendingOrders.length}</div>
            <div className="text-[10px] text-[#6b7280] uppercase tracking-wider">Pendientes</div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
            <div className="text-[20px] font-bold text-white">{shippedOrders.length}</div>
            <div className="text-[10px] text-[#6b7280] uppercase tracking-wider">Enviados</div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
            <div className="text-[20px] font-bold text-[#10BFD8]">€{totalRevenue.toFixed(0)}</div>
            <div className="text-[10px] text-[#6b7280] uppercase tracking-wider">Facturado</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 flex items-center gap-2">
          <button onClick={loadOrders} disabled={loading}
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#080c12] transition hover:bg-[#e8e4dd] disabled:opacity-50">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
          <button onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition ${
              autoRefresh ? 'border-[#10BFD8]/30 bg-[#10BFD8]/10 text-[#10BFD8]' : 'border-white/[0.08] bg-white/[0.03] text-[#6b7280]'
            }`}>
            <Clock size={14} />
            Auto {autoRefresh ? 'ON' : 'OFF'}
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-[13px] text-red-400">{error}</div>
        )}

        {orders.length === 0 && !loading && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <Package size={28} className="text-[#3d4a5c]" />
            </div>
            <p className="text-[15px] font-semibold text-white">No hay pedidos aún</p>
            <p className="mt-1 text-[13px] text-[#6b7280]">Cuando llegue un pedido, aparecerá aquí</p>
          </div>
        )}

        {/* Order cards */}
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className={`rounded-2xl border transition-all ${
              o.status === 'shipped' ? 'border-emerald-500/15 bg-white/[0.02]' :
              o.status === 'delivered' ? 'border-green-500/10 bg-white/[0.01] opacity-70' :
              'border-white/[0.08] bg-[#0d1219]'
            }`}>
              {/* Order header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-white font-mono">#{o.id?.slice(0, 8)}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase ${statusColors[o.status] || 'bg-white/5 text-white'}`}>
                    {statusLabels[o.status] || o.status}
                  </span>
                </div>
                <span className="text-[11px] text-[#6b7280]">{formatDate(o.createdAt)}</span>
              </div>

              {/* Customer info */}
              <div className="border-t border-white/[0.05] px-4 py-3 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10BFD8]/10 text-sm">
                    {o.shipping?.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-white truncate">{o.shipping?.name || '—'}</div>
                    <div className="text-[12px] text-[#8791a1] truncate">{o.email}</div>
                  </div>
                </div>

                {/* Address */}
                {o.shipping?.address && (
                  <button onClick={() => copyText(
                    `${o.shipping.name}\n${o.shipping.address.line1}${o.shipping.address.line2 ? ', ' + o.shipping.address.line2 : ''}\n${o.shipping.address.postal_code} ${o.shipping.address.city}\n${o.shipping.address.country}`,
                    `addr-${o.id}`
                  )} className="flex w-full items-start gap-2 rounded-xl bg-white/[0.02] px-3 py-2 text-left transition hover:bg-white/[0.04]">
                    <MapPin size={14} className="text-[#10BFD8] mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-[#8791a1] leading-relaxed">
                        {o.shipping.address.line1}{o.shipping.address.line2 ? ', ' + o.shipping.address.line2 : ''}
                        <br />
                        {o.shipping.address.postal_code} {o.shipping.address.city}
                        <br />
                        {o.shipping.address.country}
                      </p>
                      {copied === `addr-${o.id}` && <span className="text-[11px] text-emerald-400">✓ Copiado</span>}
                    </div>
                    <Copy size={13} className="text-[#4a5568] shrink-0" />
                  </button>
                )}

                {o.phone && (
                  <button onClick={() => copyText(o.phone, `phone-${o.id}`)} className="flex items-center gap-2 text-[12px] text-[#8791a1] hover:text-white">
                    <Phone size={13} className="text-[#6b7280]" />
                    {o.phone}
                    {copied === `phone-${o.id}` && <span className="text-[11px] text-emerald-400">✓</span>}
                  </button>
                )}
              </div>

              {/* Products */}
              <div className="border-t border-white/[0.05] px-4 py-3">
                <div className="space-y-1.5">
                  {(o.items || []).map((it: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-[13px]">
                      <span className="text-[#8791a1]">{it.name} ×{it.qty}</span>
                      <span className="font-semibold text-white">€{((it.price || 0) * it.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-white/[0.05] px-4 py-3 flex items-center justify-between">
                <div className="text-[16px] font-bold text-white">
                  €{((o.amount || 0) / 100).toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  {o.trackingNumber ? (
                    <div className="flex items-center gap-2">
                      <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5">
                        <div className="text-[10px] uppercase text-[#6b7280]">Tracking</div>
                        <div className="text-[12px] font-mono font-semibold text-emerald-400">{o.trackingNumber}</div>
                      </div>
                      {o.trackingUrl && (
                        <a href={o.trackingUrl} target="_blank" rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#6b7280] transition hover:text-[#10BFD8] hover:border-[#10BFD8]/30">
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  ) : (
                    <>
                      {(o.status === 'paid' || o.status === 'processing' || o.status === 'packed') && (
                        <button onClick={() => openShipModal(o.id)}
                          className="flex items-center gap-1.5 rounded-full bg-[#10BFD8] px-4 py-2 text-[12px] font-semibold text-[#080c12] transition hover:bg-[#0ea5c4]">
                          <Truck size={13} /> Enviar
                        </button>
                      )}
                      {o.status !== 'cancelled' && o.status !== 'shipped' && o.status !== 'delivered' && (
                        <button onClick={() => cancelOrder(o.id)}
                          className="rounded-full border border-white/[0.08] px-3 py-2 text-[12px] text-[#6b7280] transition hover:border-red-500/30 hover:text-red-400">
                          ✕
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ship Modal */}
      {shipModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0d1219] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-white">Enviar pedido</h3>
              <button onClick={() => setShipModal(null)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7280] transition hover:bg-white/[0.06] hover:text-white">
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">Transportista</label>
                <select value={shipModal.carrier}
                  onChange={(e) => setShipModal({ ...shipModal, carrier: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-white outline-none transition focus:border-[#10BFD8]/50">
                  <option value="Correos">Correos</option>
                  <option value="SEUR">SEUR</option>
                  <option value="DHL">DHL</option>
                  <option value="GLS">GLS</option>
                  <option value="MRW">MRW</option>
                  <option value="UPS">UPS</option>
                  <option value="CTT Express">CTT Express</option>
                  <option value="AliExpress Standard Shipping">AliExpress Standard Shipping</option>
                  <option value="Cainiao">Cainiao</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">Nº de tracking</label>
                <input type="text" value={shipModal.tracking}
                  onChange={(e) => setShipModal({ ...shipModal, tracking: e.target.value })}
                  placeholder="ej: CB123456789ES"
                  autoFocus
                  className="w-full rounded-xl border border-white/[0.1] bg-[#111720] px-4 py-3 text-[14px] text-white font-mono placeholder:text-[#3d4a5c] outline-none transition focus:border-[#10BFD8]/50" />
              </div>

              {shipModal.tracking && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                  <div className="text-[10px] uppercase text-[#6b7280] mb-1">Vista previa del email</div>
                  <div className="text-[12px] text-[#8791a1]">
                    El cliente recibirá un email con su nº de tracking y un enlace a <span className="text-[#10BFD8]">{shipModal.carrier}</span> para seguir su paquete.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={() => setShipModal(null)}
                className="flex-1 rounded-xl border border-white/[0.1] bg-white/[0.03] py-3 text-[13px] font-semibold text-[#8791a1] transition hover:bg-white/[0.06]">
                Cancelar
              </button>
              <button onClick={confirmShip} disabled={!shipModal.tracking || shipping}
                className="flex-1 rounded-xl bg-[#10BFD8] py-3 text-[13px] font-bold text-[#080c12] transition hover:bg-[#0ea5c4] disabled:opacity-50">
                {shipping ? 'Enviando...' : 'Enviar y notificar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
