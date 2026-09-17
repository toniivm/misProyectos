'use client'

import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = 'G-HVTC1MN829'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function initConsentMode() {
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag
  // Consent Mode v2 - default denied until user accepts (GDPR + EU)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
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
  if (!window.gtag) window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    anonymize_ip: true,
  })
}

export function grantConsent() {
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  if (!window.gtag) window.gtag = gtag
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
}

export function denyConsent() {
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  if (!window.gtag) window.gtag = gtag
  gtag('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function trackAddToCart(slug: string, name: string, price: number) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'add_to_cart', currency: 'EUR', value: price, items: [{ item_id: slug, item_name: name, price }] })
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'add_to_cart', { currency: 'EUR', value: price, items: [{ item_id: slug, item_name: name, price }] })
  }
}

export function trackBeginCheckout(items: { slug: string; name: string; price: number; qty: number }[], total: number) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'begin_checkout', currency: 'EUR', value: total, items: items.map(i => ({ item_id: i.slug, item_name: i.name, price: i.price, quantity: i.qty })) })
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', { currency: 'EUR', value: total, items: items.map(i => ({ item_id: i.slug, item_name: i.name, price: i.price, quantity: i.qty })) })
  }
}

export function trackViewItem(slug: string, name: string, price: number) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'view_item', currency: 'EUR', value: price, items: [{ item_id: slug, item_name: name, price }] })
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', { currency: 'EUR', value: price, items: [{ item_id: slug, item_name: name, price }] })
  }
}

export function trackPurchase(orderId: string, items: { slug: string; name: string; price: number; qty: number }[], total: number) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'purchase', transaction_id: orderId, currency: 'EUR', value: total, items: items.map(i => ({ item_id: i.slug, item_name: i.name, price: i.price, quantity: i.qty })) })
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', { transaction_id: orderId, currency: 'EUR', value: total, items: items.map(i => ({ item_id: i.slug, item_name: i.name, price: i.price, quantity: i.qty })) })
  }
}

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Always init consent mode + load GA in denied mode first (required for EU modeling)
    initConsentMode()
    loadGA()

    try {
      const consent = localStorage.getItem('noctip_cookie_consent')
      if (consent === 'accepted') {
        grantConsent()
        setConsented(true)
        return
      }
      if (consent === 'rejected') {
        denyConsent()
        return
      }
    } catch {}

    const observer = new MutationObserver(() => {
      try {
        const consent = localStorage.getItem('noctip_cookie_consent')
        if (consent === 'accepted') {
          grantConsent()
          setConsented(true)
          observer.disconnect()
        } else if (consent === 'rejected') {
          denyConsent()
          observer.disconnect()
        }
      } catch {}
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
