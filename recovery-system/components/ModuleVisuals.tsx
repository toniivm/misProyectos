// Shared module visual components — extracted from ProductsSection.tsx and HeroSection.tsx
// Each exports a React SVG component. Use via the MODULE_VISUALS map by slug.

export function SleepInductionVisual({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="simGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="40%" stopColor="#1e2a1e" />
          <stop offset="60%" stopColor="#1e2a1e" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="simAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8B89A" />
          <stop offset="50%" stopColor="#E8D8BA" />
          <stop offset="100%" stopColor="#C8B89A" />
        </linearGradient>
        <radialGradient id="simGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#C8B89A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C8B89A" stopOpacity="0" />
        </radialGradient>
        <filter id="simf"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="140" cy="90" rx="120" ry="60" fill="url(#simGlow)" />
      <rect x="36" y="66" width="208" height="48" rx="24" fill="rgba(200,184,154,0.04)" />
      <rect x="36" y="62" width="208" height="56" rx="28" fill="url(#simGrad)" stroke="rgba(232,228,223,0.08)" strokeWidth="1.5" />
      <rect x="40" y="63" width="200" height="3" rx="1.5" fill="rgba(232,228,223,0.05)" />
      {[-40,-20,0,20,40].map((x) => (
        <ellipse key={x} cx={140 + x} cy="90" rx="9" ry="7" fill="rgba(7,7,7,0.9)" stroke="rgba(200,184,154,0.18)" strokeWidth="0.5" />
      ))}
      <rect x="44" y="88" width="192" height="4" rx="2" fill="url(#simAccent)" opacity="0.5" filter="url(#simf)" />
      <text x="140" y="83" textAnchor="middle" fill="rgba(200,184,154,0.12)" fontSize="20" fontFamily="monospace" fontWeight="900" letterSpacing="8">RS™</text>
      <text x="140" y="114" textAnchor="middle" fill="rgba(200,184,154,0.4)" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="4">SIM™</text>
      <ellipse cx="36" cy="90" rx="18" ry="28" fill="#141414" stroke="rgba(232,228,223,0.05)" strokeWidth="1" />
      <ellipse cx="244" cy="90" rx="18" ry="28" fill="#141414" stroke="rgba(232,228,223,0.05)" strokeWidth="1" />
      {[[56,32],[200,32],[100,145],[180,145],[140,20]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fill={`rgba(200,184,154,${0.1 + i*0.04})`} fontSize={8 + (i%3)*3}>✦</text>
      ))}
    </svg>
  )
}

export function CervicalDownshiftVisual({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="cdmBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="cdmAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8B89A" />
          <stop offset="100%" stopColor="#E8D8BA" />
        </linearGradient>
        <radialGradient id="cdmGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#C8B89A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C8B89A" stopOpacity="0" />
        </radialGradient>
        <filter id="cdmf"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="130" cy="130" rx="100" ry="100" fill="url(#cdmGlow)" />
      <path d="M 50,40 L 50,155 Q 50,225 130,225 Q 210,225 210,155 L 210,40" stroke="rgba(200,184,154,0.06)" strokeWidth="55" fill="none" strokeLinecap="round" />
      <path d="M 50,40 L 50,155 Q 50,225 130,225 Q 210,225 210,155 L 210,40" stroke="url(#cdmBody)" strokeWidth="44" fill="none" strokeLinecap="round" />
      <path d="M 50,40 L 50,155 Q 50,225 130,225 Q 210,225 210,155 L 210,40" stroke="rgba(232,228,223,0.04)" strokeWidth="46" fill="none" strokeLinecap="round" />
      {[
        [50,60],[50,95],[50,130],[50,160],
        [210,60],[210,95],[210,130],[210,160],
        [75,218],[108,225],[130,226],[152,225],[185,218],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="11" fill="url(#cdmAccent)" opacity="0.8" filter="url(#cdmf)" />
      ))}
      <rect x="106" y="26" width="48" height="28" rx="6" fill="#0a0a0a" stroke="rgba(200,184,154,0.25)" strokeWidth="1" />
      <circle cx="121" cy="40" r="5" fill="rgba(200,184,154,0.15)" stroke="rgba(200,184,154,0.3)" strokeWidth="1" />
      <circle cx="130" cy="40" r="5" fill="rgba(200,184,154,0.7)" />
      <circle cx="139" cy="40" r="5" fill="rgba(200,184,154,0.15)" stroke="rgba(200,184,154,0.3)" strokeWidth="1" />
      <text x="130" y="33" textAnchor="middle" fill="rgba(200,184,154,0.4)" fontSize="6" fontFamily="monospace">MODE</text>
      <rect x="120" y="16" width="20" height="9" rx="2.5" fill="#0a0a0a" stroke="rgba(232,228,223,0.08)" strokeWidth="0.5" />
    </svg>
  )
}

export function SensoryStillnessVisual({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ssmBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        <linearGradient id="ssmAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8B89A" />
          <stop offset="100%" stopColor="#E8D0A0" />
        </linearGradient>
        <radialGradient id="ssmGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#C8B89A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8B89A" stopOpacity="0" />
        </radialGradient>
        <filter id="ssmf"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="120" cy="170" rx="100" ry="120" fill="url(#ssmGlow)" />
      <rect x="95" y="165" width="50" height="150" rx="18" fill="url(#ssmBody)" stroke="rgba(232,228,223,0.06)" strokeWidth="1" />
      {[180,194,208,222,234,246,258,270,280,290].map((y) => (
        <rect key={y} x="99" y={y} width="42" height="2.5" rx="1.25" fill="rgba(232,228,223,0.03)" />
      ))}
      <rect x="112" y="308" width="16" height="5" rx="2" fill="rgba(200,184,154,0.25)" />
      <rect x="56" y="60" width="128" height="115" rx="22" fill="url(#ssmBody)" stroke="rgba(232,228,223,0.07)" strokeWidth="1.5" />
      <rect x="56" y="60" width="128" height="2" rx="1" fill="rgba(232,228,223,0.04)" />
      <circle cx="120" cy="118" r="30" fill="rgba(200,184,154,0.05)" stroke="rgba(200,184,154,0.12)" strokeWidth="1" />
      <circle cx="120" cy="118" r="18" fill="rgba(200,184,154,0.08)" />
      <circle cx="120" cy="118" r="8" fill="rgba(200,184,154,0.25)" />
      <rect x="72" y="70" width="56" height="28" rx="6" fill="#060606" stroke="rgba(200,184,154,0.18)" strokeWidth="0.5" />
      <text x="100" y="89" textAnchor="middle" fill="rgba(200,184,154,0.8)" fontSize="10" fontFamily="monospace" fontWeight="bold">SSM</text>
      {[0,1,2,3,4].map((i) => (
        <rect key={i} x={135 + i * 9} y="78" width="6" height="10" rx="2" fill={i < 3 ? 'rgba(200,184,154,0.85)' : 'rgba(232,228,223,0.04)'} />
      ))}
      <rect x="104" y="34" width="32" height="30" rx="8" fill="#101010" stroke="rgba(200,184,154,0.2)" strokeWidth="1" />
      <circle cx="120" cy="24" r="24" fill="url(#ssmAccent)" filter="url(#ssmf)" opacity="0.9" />
      <circle cx="112" cy="16" r="8" fill="rgba(255,255,255,0.2)" />
      <rect x="60" y="164" width="120" height="6" rx="3" fill="url(#ssmAccent)" opacity="0.8" filter="url(#ssmf)" />
      {[80,93,106,119,132,145].map((y) => (
        <rect key={y} x="57" y={y} width="8" height="2" rx="1" fill="rgba(232,228,223,0.05)" />
      ))}
    </svg>
  )
}

export function EnvironmentCalibrationVisual({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="ecmGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#C8B89A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C8B89A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ecmBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <filter id="ecmf"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ambient glow */}
      <circle cx="140" cy="140" r="120" fill="url(#ecmGlow)" />
      {/* Outer ring */}
      <circle cx="140" cy="140" r="90" stroke="rgba(200,184,154,0.1)" strokeWidth="1" fill="none" />
      <circle cx="140" cy="140" r="70" stroke="rgba(200,184,154,0.07)" strokeWidth="1" fill="none" />
      {/* Body disc */}
      <circle cx="140" cy="140" r="50" fill="url(#ecmBody)" stroke="rgba(232,228,223,0.08)" strokeWidth="1.5" />
      {/* Ring marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 140 + Math.cos(angle) * 78
        const y1 = 140 + Math.sin(angle) * 78
        const x2 = 140 + Math.cos(angle) * 85
        const y2 = 140 + Math.sin(angle) * 85
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,184,154,0.2)" strokeWidth="1.5" />
      })}
      {/* Warm light arc */}
      <path d="M 80 140 A 60 60 0 0 1 200 140" stroke="rgba(200,184,154,0.4)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#ecmf)" />
      {/* Center dot */}
      <circle cx="140" cy="140" r="10" fill="rgba(200,184,154,0.6)" filter="url(#ecmf)" />
      <circle cx="140" cy="140" r="5" fill="rgba(232,228,223,0.9)" />
      {/* Label */}
      <text x="140" y="205" textAnchor="middle" fill="rgba(200,184,154,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="4">ECM™</text>
      {/* Dot indicators around ring */}
      {[0, 60, 120, 240, 300].map((deg, i) => {
        const angle = (deg * Math.PI) / 180
        return (
          <circle
            key={i}
            cx={140 + Math.cos(angle) * 90}
            cy={140 + Math.sin(angle) * 90}
            r="3"
            fill="rgba(200,184,154,0.5)"
            filter="url(#ecmf)"
          />
        )
      })}
    </svg>
  )
}

// Slug → visual component map
export const MODULE_VISUALS: Record<string, React.ComponentType<{ className?: string }>> = {
  'sleep-induction-module': SleepInductionVisual,
  'cervical-downshift-module': CervicalDownshiftVisual,
  'sensory-stillness-module': SensoryStillnessVisual,
  'environment-calibration-module': EnvironmentCalibrationVisual,
}
