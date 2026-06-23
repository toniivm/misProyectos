'use client'

import { useState } from 'react'

type ProductType = 'sleepband-pro' | 'white-noise-pro' | 'sleep-headband' | 'neck-massager' | 'weighted-mask-pro'

type Props = {
  slug: ProductType
  color: string
  icon: string
  images?: string[]
  alt?: string
  className?: string
  activeIndex?: number
}

const PRODUCT_GRAPHICS: Record<ProductType, {
  gradient: string
  elements: JSX.Element
}> = {
  'sleepband-pro': {
    gradient: 'from-[#0d1828] via-[#0a1a2e] to-[#0d1828]',
    elements: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        {/* Background glow */}
        <defs>
          <radialGradient id="halo-glow">
            <stop offset="0%" stopColor="#10BFD8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10BFD8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="halo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10BFD8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7FD9FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10BFD8" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="180" r="120" fill="url(#halo-glow)" />
        
        {/* Mouthpiece shape */}
        <path d="M140 200 Q140 140 200 130 Q260 140 260 200 Q260 250 200 260 Q140 250 140 200Z" 
          fill="url(#halo-grad)" stroke="#10BFD8" strokeWidth="1.5" strokeOpacity="0.5" />
        
        {/* Lower tray */}
        <path d="M150 220 Q200 240 250 220 Q260 260 200 270 Q140 260 150 220Z" 
          fill="rgba(16,191,216,0.15)" stroke="#10BFD8" strokeWidth="1" strokeOpacity="0.3" />
        
        {/* Adjustment dots */}
        {[180, 200, 220].map(x => (
          <circle key={x} cx={x} cy={170} r="3" fill="#7FD9FF" opacity="0.6" />
        ))}
        
        {/* Airway arrows */}
        <path d="M160 180 L180 170 M240 180 L220 170" stroke="#10BFD8" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        
        {/* Moon icon for sleep */}
        <circle cx="320" cy="80" r="18" fill="none" stroke="#10BFD8" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="326" cy="74" r="12" fill="#0d1828" />
      </svg>
    )
  },
  'white-noise-pro': {
    gradient: 'from-[#0d1f1a] via-[#0a1a15] to-[#0d1f1a]',
    elements: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="wave-glow">
            <stop offset="0%" stopColor="#10BFD8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#10BFD8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="140" fill="url(#wave-glow)" />
        
        {/* Y-shape posture corrector */}
        <path d="M200 100 L200 220 M200 160 L140 240 M200 160 L260 240" 
          stroke="#10BFD8" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M200 100 L200 220 M200 160 L140 240 M200 160 L260 240" 
          stroke="#7FD9FF" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Shoulder straps */}
        <path d="M140 240 Q100 220 90 260 M260 240 Q300 220 310 260" 
          stroke="#10BFD8" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
        
        {/* Adjustment velcro */}
        {[120, 160, 240, 280].map(x => (
          <rect key={x} x={x-10} y={225} width="20" height="8" rx="2" fill="#10BFD8" opacity="0.3" />
        ))}
        
        {/* Spine alignment indicator */}
        <line x1="200" y1="100" x2="200" y2="280" stroke="#10BFD8" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 4" />
      </svg>
    )
  },
  'sleep-headband': {
    gradient: 'from-[#101828] via-[#0e1522] to-[#101828]',
    elements: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="rest-glow">
            <stop offset="0%" stopColor="#10BFD8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#10BFD8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rest-band" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10BFD8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7FD9FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10BFD8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="180" r="130" fill="url(#rest-glow)" />
        
        {/* Headband shape */}
        <path d="M120 160 Q120 100 200 90 Q280 100 280 160" 
          stroke="url(#rest-band)" strokeWidth="12" strokeOpacity="0.4" fill="none" />
        <path d="M140 200 Q200 180 260 200" 
          stroke="url(#rest-band)" strokeWidth="8" strokeOpacity="0.3" fill="none" />
        
        {/* Speaker dots */}
        <circle cx="150" cy="155" r="8" fill="#10BFD8" opacity="0.3" />
        <circle cx="250" cy="155" r="8" fill="#10BFD8" opacity="0.3" />
        
        {/* Sound waves */}
        {[1,2,3].map(i => (
          <path key={i} d={`M${150 - i*15} ${155 - i*5} Q${150} ${155 - i*12} ${150 + i*5} ${155 - i*8}`}
            stroke="#10BFD8" strokeWidth="1" strokeOpacity="0.15" fill="none" />
        ))}
        
        {/* Music note */}
        <path d="M170 135 L170 160 Q170 168 162 168 Q154 168 154 160 Q154 152 162 152" 
          stroke="#10BFD8" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
        <circle cx="162" cy="135" r="5" fill="#10BFD8" opacity="0.4" />
      </svg>
    )
  },
  'neck-massager': {
    gradient: 'from-[#121a24] via-[#0e1520] to-[#121a24]',
    elements: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="relief-glow">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#ff6b35" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="relief-body" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f2eee7" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f2eee7" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="140" fill="url(#relief-glow)" />
        
        {/* U-shape massager */}
        <path d="M140 180 Q140 280 200 300 Q260 280 260 180" 
          stroke="url(#relief-body)" strokeWidth="14" strokeOpacity="0.5" fill="none" />
        <path d="M140 180 Q140 280 200 300 Q260 280 260 180" 
          stroke="#f2eee7" strokeWidth="10" strokeOpacity="0.3" fill="none" />
        
        {/* Electrode pads */}
        {[
          {cx: 155, cy: 220},
          {cx: 200, cy: 260},
          {cx: 245, cy: 220},
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="10" fill="#10BFD8" opacity="0.15" />
            <circle cx={p.cx} cy={p.cy} r="6" fill="#10BFD8" opacity="0.3" />
            <circle cx={p.cx} cy={p.cy} r="3" fill="#7FD9FF" opacity="0.5" />
          </g>
        ))}
        
        {/* Heat waves */}
        {[1,2,3].map(i => (
          <path key={i} d={`M${170 + i*10} ${240 + i*10} Q${200} ${250 + i*5} ${230 - i*10} ${240 + i*10}`}
            stroke="#ff6b35" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeDasharray="2 3" />
        ))}
        
        {/* USB-C indicator */}
        <rect x="185" y="295" width="30" height="12" rx="4" fill="#f2eee7" opacity="0.2" />
        <rect x="193" y="299" width="14" height="4" rx="1" fill="#10BFD8" opacity="0.4" />
      </svg>
    )
  },
  'weighted-mask-pro': {
    gradient: 'from-[#12101e] via-[#0e0c18] to-[#12101e]',
    elements: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="calm-glow">
            <stop offset="0%" stopColor="#9E92FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#9E92FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="calm-body" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f2eee7" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f2eee7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="180" r="130" fill="url(#calm-glow)" />
        
        {/* Compact massager shape */}
        <ellipse cx="200" cy="200" rx="70" ry="80" stroke="url(#calm-body)" strokeWidth="12" strokeOpacity="0.5" fill="none" />
        <ellipse cx="200" cy="200" rx="70" ry="80" stroke="#f2eee7" strokeWidth="8" strokeOpacity="0.3" fill="none" />
        
        {/* Floating electrodes */}
        {[
          {cx: 165, cy: 190, r: 14},
          {cx: 235, cy: 190, r: 14},
          {cx: 200, cy: 245, r: 12},
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r={p.r} fill="#9E92FF" opacity="0.1" />
            <circle cx={p.cx} cy={p.cy} r={p.r/2} fill="#9E92FF" opacity="0.2" />
            <circle cx={p.cx} cy={p.cy} r={p.r/3} fill="#C4B5FD" opacity="0.4" />
          </g>
        ))}
        
        {/* Pulse lines */}
        {[1,2,3,4].map(i => (
          <path key={i} d={`M${160 + i*10} ${170 - i*5} Q${200} ${160 - i*8} ${240 - i*10} ${170 - i*5}`}
            stroke="#9E92FF" strokeWidth="1" strokeOpacity="0.15" fill="none" />
        ))}
        
        {/* One-button indicator */}
        <circle cx="200" cy="150" r="10" fill="#9E92FF" opacity="0.2" />
        <circle cx="200" cy="150" r="5" fill="#9E92FF" opacity="0.4" />
      </svg>
    )
  }
}

export default function ProductImage({ slug, color, icon, images, alt, className = '', activeIndex = 0 }: Props) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  
  const config = PRODUCT_GRAPHICS[slug] || PRODUCT_GRAPHICS['sleepband-pro']
  const hasRealImage = images && images.length > activeIndex && !imgError

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: color }}>
      {/* Background gradient always visible */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />
      
      {/* SVG illustration always visible as background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {config.elements}
      </div>
      
      {/* Real image on top if available */}
      {hasRealImage && (
        <img 
          key={`${slug}-${activeIndex}`}
          src={images![activeIndex]} 
          alt={alt || 'Product'} 
          onError={() => setImgError(true)}
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectPosition: 'center' }}
        />
      )}
      
      {/* Top-left icon badge */}
      <div className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm text-xl">
        {icon}
      </div>
    </div>
  )
}
