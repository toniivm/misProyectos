'use client'

import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = 'G-HVTC1MN829'

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

function loadGA() {
  if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })
}

export function trackAddToCart(slug: string, name: string, price: number) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'add_to_cart', currency: 'EUR', value: price, items: [{ item_id: slug, item_name: name, price }] })
}

export function trackBeginCheckout(items: { slug: string; name: string; price: number; qty: number }[], total: number) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'begin_checkout', currency: 'EUR', value: total, items: items.map(i => ({ item_id: i.slug, item_name: i.name, price: i.price, quantity: i.qty })) })
}

export function trackPurchase(orderId: string, items: { slug: string; name: string; price: number; qty: number }[], total: number) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'purchase', transaction_id: orderId, currency: 'EUR', value: total, items: items.map(i => ({ item_id: i.slug, item_name: i.name, price: i.price, quantity: i.qty })) })
}

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
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
    loadGA()
  }, [consented])

  return null
}
