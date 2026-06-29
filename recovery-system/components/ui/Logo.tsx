'use client'

import Image from 'next/image'

type LogoProps = {
  variant?: 'full' | 'icon' | 'wordmark'
  className?: string
  priority?: boolean
}

export default function Logo({ variant = 'full', className = '', priority = false }: LogoProps) {
  if (variant === 'icon') {
    return (
      <Image
        src="/images/logo/logo.png"
        alt="Noctip"
        width={40}
        height={40}
        priority={priority}
        className={`object-contain ${className}`}
        sizes="40px"
      />
    )
  }

  if (variant === 'wordmark') {
    return (
      <span className={`text-[13px] font-bold uppercase tracking-[0.2em] text-[#f2eee7] ${className}`}>
        Noctip
      </span>
    )
  }

  return (
    <Image
      src="/images/logo/logo.png"
      alt="Noctip — Descansa. Renueva. Rinde."
      width={120}
      height={40}
      priority={priority}
      className={`object-contain ${className}`}
      sizes="120px"
    />
  )
}
