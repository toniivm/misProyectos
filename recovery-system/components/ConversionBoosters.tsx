'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Clock, Eye, TrendingUp, Flame, Star } from 'lucide-react'
import { useLocale } from 'next-intl'
import { CATALOG } from '../lib/catalog'

// Stock urgency badge
export function StockUrgency({ slug }: { slug: string }) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [stock, setStock] = useState<number | null>(null)

  useEffect(() => {
    setStock(Math.floor(Math.random() * 8) + 3)
  }, [])

  if (stock === null || stock > 7) return null

  return (
    <div className="flex items-center gap-1.5 text-[11px]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
      </span>
      <span className="text-orange-400 font-medium">
        {isEs ? `Solo quedan ${stock}` : `Only ${stock} left`}
      </span>
    </div>
  )
}

// Viewing now indicator
export function ViewingNow({ slug }: { slug: string }) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [viewers, setViewers] = useState<number | null>(null)

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 30) + 12)
  }, [])

  if (viewers === null) return null

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-[#8791a1]">
      <Eye size={11} className="text-[#10BFD8]" />
      <span>
        {viewers} {isEs ? 'personas viendo esto ahora' : 'people viewing now'}
      </span>
    </div>
  )
}

// Trust badge strip
export function TrustStrip() {
  const locale = useLocale()
  const isEs = locale === 'es'

  return (
    <div className="flex items-center justify-center gap-4 text-[11px] text-[#6b7785] py-2">
      <span className="flex items-center gap-1">
        <span className="text-emerald-400">✓</span>
        {isEs ? 'Envío gratis' : 'Free shipping'}
      </span>
      <span className="flex items-center gap-1">
        <span className="text-emerald-400">✓</span>
        {isEs ? '30 noches de garantía' : '30-night guarantee'}
      </span>
      <span className="flex items-center gap-1">
        <span className="text-emerald-400">✓</span>
        {isEs ? 'Pago seguro SSL' : 'SSL secure checkout'}
      </span>
    </div>
  )
}

// Limited time offer banner
export function LimitedOffer() {
  const [visible, setVisible] = useState(true)
  const locale = useLocale()
  const isEs = locale === 'es'

  if (!visible) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="overflow-hidden bg-gradient-to-r from-[#10BFD8]/20 via-[#0d1219] to-[#9E92FF]/20"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-3 px-4 py-2.5">
        <Flame size={14} className="text-orange-400" />
        <span className="text-[12px] font-semibold text-[#f2eee7]">
          {isEs ? 'OFERTA ESPECIAL: -10% extra con código' : 'SPECIAL OFFER: -10% extra with code'}{' '}
          <span className="rounded-full bg-[#f2eee7] px-2 py-0.5 text-[11px] font-bold text-[#11161d]">
            NOCTIP10
          </span>
        </span>
        <button onClick={() => setVisible(false)} className="ml-2 text-[#6b7785] hover:text-white">
          ×
        </button>
      </div>
    </motion.div>
  )
}

// Product rating stars with count
export function RatingStars({ rating, count, size = 'sm' }: { rating: number; count: number; size?: 'sm' | 'lg' }) {
  const starSize = size === 'sm' ? 12 : 16
  const textSize = size === 'sm' ? 'text-[11px]' : 'text-[13px]'

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={starSize}
            className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'} />
        ))}
      </div>
      <span className={`${textSize} text-[#8791a1]`}>
        {rating} ({count.toLocaleString()})
      </span>
    </div>
  )
}

// Animated countdown for offer
export function CountdownTimer() {
  const [time, setTime] = useState({ hours: 2, minutes: 47, seconds: 33 })
  const locale = useLocale()
  const isEs = locale === 'es'

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className="text-orange-400" />
      <span className="text-[12px] text-[#8791a1]">
        {isEs ? 'Oferta termina en' : 'Offer ends in'}
      </span>
      <div className="flex items-center gap-1">
        <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[12px] font-bold text-[#f2eee7] font-mono">
          {pad(time.hours)}
        </span>
        <span className="text-[#6b7785]">:</span>
        <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[12px] font-bold text-[#f2eee7] font-mono">
          {pad(time.minutes)}
        </span>
        <span className="text-[#6b7785]">:</span>
        <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[12px] font-bold text-[#f2eee7] font-mono">
          {pad(time.seconds)}
        </span>
      </div>
    </div>
  )
}
