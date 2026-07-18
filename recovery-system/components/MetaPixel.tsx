'use client'

import { useEffect, useState } from 'react'

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    _fbq: ReturnType<typeof window.fbq> | undefined
  }
}

function loadMetaPixel() {
  if (!META_PIXEL_ID || document.querySelector('script[src*="facebook.net/en_US/fbevents.js"]')) return

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  // fbq stub: queues calls until the real script loads
  const queue: unknown[][] = []
  const fbqStub = (...args: unknown[]) => { queue.push(args) }
  ;(fbqStub as any).q = queue
  window.fbq = fbqStub as typeof window.fbq
  window.fbq('init', META_PIXEL_ID)
  window.fbq('track', 'PageView')
}

export function trackMetaAddToCart(value: number, contentIds: string[]) {
  if (!META_PIXEL_ID || typeof window.fbq !== 'function') return
  window.fbq('track', 'AddToCart', { value, currency: 'EUR', content_ids: contentIds, content_type: 'product' })
}

export function trackMetaInitiateCheckout(value: number, contentIds: string[]) {
  if (!META_PIXEL_ID || typeof window.fbq !== 'function') return
  window.fbq('track', 'InitiateCheckout', { value, currency: 'EUR', num_items: contentIds.length, content_ids: contentIds })
}

export function trackMetaPurchase(value: number, contentIds: string[]) {
  if (!META_PIXEL_ID || typeof window.fbq !== 'function') return
  window.fbq('track', 'Purchase', { value, currency: 'EUR', content_ids: contentIds, content_type: 'product' })
}

export function trackMetaViewContent(value: number, contentIds: string[]) {
  if (!META_PIXEL_ID || typeof window.fbq !== 'function') return
  window.fbq('track', 'ViewContent', { value, currency: 'EUR', content_ids: contentIds, content_type: 'product' })
}

export default function MetaPixel() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (!META_PIXEL_ID || typeof window === 'undefined') return
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
    loadMetaPixel()
  }, [consented])

  return null
}
