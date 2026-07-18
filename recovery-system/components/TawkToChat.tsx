'use client'

import { useEffect, useState } from 'react'

const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID

export default function TawkToChat() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!TAWK_PROPERTY_ID || loaded || typeof window === 'undefined') return

    try {
      const consent = localStorage.getItem('noctip_cookie_consent')
      if (consent !== 'accepted') return
    } catch {}

    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID ?? ''}`
    script.charset = 'UTF-8'
    script.crossOrigin = '*'
    document.head.appendChild(script)
    setLoaded(true)
  }, [loaded])

  return null
}
