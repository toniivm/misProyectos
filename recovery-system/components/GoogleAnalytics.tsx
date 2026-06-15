'use client'

import { useEffect } from 'react'

const GA_MEASUREMENT_ID = 'G-HVTC1MN829'

declare global {
  interface Window {
    dataLayer: unknown[][]
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return

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
  }, [])

  return null
}
