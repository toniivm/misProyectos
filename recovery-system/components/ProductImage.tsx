'use client'

import { useState } from 'react'

type ProductType = 'halo' | 'wave' | 'sleep-headband' | 'neck-massager' | 'vapor'

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
  'halo': {
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
  'wave': {
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
  'vapor': {
    gradient: 'from-[#0b1a24] via-[#0a141d] to-[#0b1a24]',
    elements: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="vapor-glow">
            <stop offset="0%" stopColor="#10BFD8" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#10BFD8" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#10BFD8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vapor-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eafbff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#bfeaf2" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#7fd9ff" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="vapor-handle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f2eee7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10BFD8" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="165" fill="url(#vapor-glow)" />

        {/* Steam puffs */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} opacity={0.35 - i * 0.06}>
            <path
              d={`M${118 - i * 18} ${268 - i * 8} C${92 - i * 20} ${250 - i * 10}, ${88 - i * 20} ${228 - i * 10}, ${108 - i * 22} ${214 - i * 10}`}
              stroke="#7FD9FF"
              strokeWidth={2 - i * 0.25}
              strokeLinecap="round"
              strokeDasharray="4 7"
            />
            <path
              d={`M${120 - i * 16} ${286 + i * 6} C${92 - i * 18} ${288 + i * 8}, ${78 - i * 18} ${272 + i * 8}, ${86 - i * 18} ${252 + i * 8}`}
              stroke="#10BFD8"
              strokeWidth={1.6 - i * 0.2}
              strokeLinecap="round"
              strokeDasharray="3 8"
            />
          </g>
        ))}

        {/* Nozzle */}
        <path d="M176 250 L120 272 L126 292 L180 276 Z" fill="#cfeef6" fillOpacity="0.55" stroke="#7FD9FF" strokeWidth="1.2" strokeOpacity="0.7" />
        <path d="M124 274 L112 279" stroke="#eafbff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />

        {/* Body / tank */}
        <rect x="176" y="158" width="92" height="152" rx="30" fill="url(#vapor-body)" fillOpacity="0.18" stroke="#bfeaf2" strokeWidth="2" strokeOpacity="0.75" />
        <rect x="188" y="186" width="68" height="106" rx="20" fill="#0b1520" fillOpacity="0.35" stroke="#10BFD8" strokeWidth="1" strokeOpacity="0.25" />

        {/* Water level */}
        <path d="M194 250 Q222 242 250 250 L250 280 Q222 288 194 280 Z" fill="#10BFD8" fillOpacity="0.18" />
        <path d="M194 250 Q222 242 250 250" stroke="#10BFD8" strokeWidth="1.2" strokeOpacity="0.55" />

        {/* Handle */}
        <path d="M186 170 C186 120, 214 108, 240 118 C258 125, 262 150, 256 172" stroke="url(#vapor-handle)" strokeWidth="16" strokeLinecap="round" fill="none" />
        <path d="M186 170 C186 120, 214 108, 240 118 C258 125, 262 150, 256 172" stroke="#0b1520" strokeWidth="7" strokeLinecap="round" fill="none" strokeOpacity="0.35" />

        {/* Trigger */}
        <path d="M252 194 L268 202 L262 224 L246 216 Z" fill="#10BFD8" fillOpacity="0.55" stroke="#7FD9FF" strokeWidth="1" strokeOpacity="0.6" />

        {/* Safety cap */}
        <rect x="198" y="146" width="48" height="14" rx="7" fill="#f2eee7" fillOpacity="0.35" stroke="#eafbff" strokeWidth="1" strokeOpacity="0.5" />

        {/* Power light */}
        <circle cx="218" cy="236" r="5" fill="#10BFD8" />
        <circle cx="218" cy="236" r="10" fill="#10BFD8" fillOpacity="0.18" />

        {/* Accessories floating */}
        <g opacity="0.55">
          <circle cx="304" cy="168" r="16" stroke="#7FD9FF" strokeWidth="1.4" />
          {[0, 45, 90, 135].map((a) => (
            <line key={a} x1="304" y1="168" x2={304 + 14 * Math.cos((a * Math.PI) / 180)} y2={168 + 14 * Math.sin((a * Math.PI) / 180)} stroke="#7FD9FF" strokeWidth="1" />
          ))}
          <rect x="292" y="204" width="24" height="10" rx="4" stroke="#10BFD8" strokeWidth="1.2" />
          <path d="M292 224 L316 224 L312 238 L296 238 Z" stroke="#10BFD8" strokeWidth="1.2" />
        </g>
      </svg>
    )
  }
}

export default function ProductImage({ slug, color, icon, images, alt, className = '', activeIndex = 0 }: Props) {
  const [imgError, setImgError] = useState<Record<number, boolean>>({})
  
  const config = PRODUCT_GRAPHICS[slug] || PRODUCT_GRAPHICS['halo']
  const hasRealImage = images && images.length > activeIndex && !imgError[activeIndex]

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: hasRealImage ? '#f5f0eb' : color }}>
      {!hasRealImage && (
        <>
          {/* Background gradient always visible */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

          {/* SVG illustration always visible as background */}
          <div className="absolute inset-0 flex items-center justify-center">
            {config.elements}
          </div>
        </>
      )}

      {/* Real image on top if available — opacity-100 always, onError removes it */}
      {hasRealImage && (
        <img
          key={`${slug}-${activeIndex}`}
          src={images![activeIndex]}
          alt={alt || 'Product'}
          onError={() => setImgError(prev => ({ ...prev, [activeIndex]: true }))}
          className="absolute inset-0 h-full w-full object-contain p-3 sm:p-4"
          style={{ objectPosition: 'center center' }}
        />
      )}

      {/* Icon badge removed — was showing as unwanted square */}
    </div>
  )
}
