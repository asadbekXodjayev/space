'use client'

export function Sun() {
  return (
    <div className="relative flex-shrink-0 flex items-center" style={{ marginLeft: '-4%' }}>
      <svg
        viewBox="0 0 340 680"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        style={{ width: 'clamp(180px, 22vw, 340px)', height: 'clamp(360px, 66vh, 680px)' }}
      >
        <defs>
          <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="15%" stopColor="#FFF8E0" />
            <stop offset="40%" stopColor="#FFD580" />
            <stop offset="70%" stopColor="#F0820A" />
            <stop offset="90%" stopColor="#C0460A" />
            <stop offset="100%" stopColor="#8B2200" />
          </radialGradient>
          <radialGradient id="sun-glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD580" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#F07020" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#04060F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sun-glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF4E0" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#04060F" stopOpacity="0" />
          </radialGradient>
          <clipPath id="sun-clip">
            <rect x="0" y="0" width="340" height="680" />
          </clipPath>
        </defs>
        
        {/* Corona layers */}
        <ellipse
          cx="170"
          cy="340"
          rx="310"
          ry="310"
          fill="url(#sun-glow2)"
          className="animate-[sun-corona_6s_ease-in-out_infinite]"
        />
        <ellipse
          cx="170"
          cy="340"
          rx="240"
          ry="240"
          fill="url(#sun-glow1)"
          className="animate-[sun-pulse_4s_ease-in-out_infinite]"
        />
        
        {/* Sun body — clipped so half is off screen left */}
        <g clipPath="url(#sun-clip)">
          <circle cx="170" cy="340" r="290" fill="url(#sun-core)" />
          
          {/* Texture bands */}
          <ellipse cx="170" cy="280" rx="290" ry="12" fill="#F07020" opacity="0.12" />
          <ellipse cx="170" cy="350" rx="290" ry="8" fill="#FFD580" opacity="0.09" />
          <ellipse cx="170" cy="420" rx="290" ry="14" fill="#C05010" opacity="0.10" />
          
          {/* Surface spots */}
          <circle cx="220" cy="290" r="18" fill="#8B2200" opacity="0.35" />
          <circle cx="140" cy="380" r="12" fill="#8B2200" opacity="0.28" />
          <circle cx="250" cy="400" r="8" fill="#8B2200" opacity="0.22" />
        </g>
        
        {/* Edge light leak */}
        <ellipse
          cx="170"
          cy="340"
          rx="292"
          ry="292"
          fill="none"
          stroke="#FFD580"
          strokeWidth="1.5"
          opacity="0.18"
        />
      </svg>
    </div>
  )
}
