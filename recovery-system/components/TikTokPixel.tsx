'use client'

import { useEffect, useState } from 'react'

const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

declare global {
  interface Window {
    ttq: { track: (event: string, params?: Record<string, unknown>) => void; page: () => void }
  }
}

function loadTikTokPixel() {
  if (!TIKTOK_PIXEL_ID || document.querySelector('script[src*="analytics.tiktok.com"]')) return

  // Initialize ttq stub
  const ttq: Record<string, unknown> = {}
  ttq._i = []
  ttq._o = {}
  ttq._c = {}
  ttq._q = []
  ;(window as unknown as Record<string, unknown>).ttq = ttq
  window.ttq = ttq as typeof window.ttq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://analytics.tiktok.com/i18n/pixel/events.js'
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript?.parentNode?.insertBefore(script, firstScript)

  window.ttq.page()
}

export function trackTikTokAddToCart(value: number, contentIds: string[]) {
  if (!TIKTOK_PIXEL_ID || typeof window.ttq?.track !== 'function') return
  window.ttq.track('AddToCart', { value, currency: 'EUR', content_id: contentIds[0], content_type: 'product' })
}

export function trackTikTokInitiateCheckout(value: number, contentIds: string[]) {
  if (!TIKTOK_PIXEL_ID || typeof window.ttq?.track !== 'function') return
  window.ttq.track('InitiateCheckout', { value, currency: 'EUR', content_id: contentIds[0], content_type: 'product' })
}

export function trackTikTokPurchase(value: number, contentIds: string[]) {
  if (!TIKTOK_PIXEL_ID || typeof window.ttq?.track !== 'function') return
  window.ttq.track('CompletePayment', { value, currency: 'EUR', content_id: contentIds[0], content_type: 'product' })
}

export function trackTikTokViewContent(value: number, contentIds: string[]) {
  if (!TIKTOK_PIXEL_ID || typeof window.ttq?.track !== 'function') return
  window.ttq.track('ViewContent', { value, currency: 'EUR', content_id: contentIds[0], content_type: 'product' })
}

export default function TikTokPixel() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (!TIKTOK_PIXEL_ID || typeof window === 'undefined') return
    try {
      const consent = localStorage.getItem('noctip_cookie_consent')
      if (consent === 'accepted') {
        setConsented(true)
        return
      }
    } catch {}

    const observer = new MutationObserver(() => {
      try {
        const consent = localStorage.getItem('noctip_cookie_consent')
        if (consent === 'accepted') {
          setConsented(true)
          observer.disconnect()
        }
      } catch {}
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!consented) return
    loadTikTokPixel()
  }, [consented])

  return null
}
