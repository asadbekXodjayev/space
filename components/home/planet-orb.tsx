'use client'

import Image from 'next/image'
import type { Planet } from '@/lib/types'
import { PlanetLabel } from './planet-label'
import { useCosmosStore } from '@/store/cosmos.store'

interface PlanetOrbProps {
  planet: Planet
  size: number
  onNavigate: (slug: string) => void
}

export function PlanetOrb({ planet, size, onNavigate }: PlanetOrbProps) {
  const isVisited = useCosmosStore((state) => state.isVisited)
  const visited = isVisited(planet.slug)
  
  // Saturn needs extra width for rings
  const displayWidth = planet.slug === 'saturn' ? size * 1.8 : size
  
  return (
    <div
      className="relative flex flex-col items-center cursor-pointer group flex-shrink-0"
      style={{
        animation: `float ${planet.floatDuration}s ease-in-out infinite ${planet.floatDelay}s`,
      }}
      onClick={() => onNavigate(planet.slug)}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${planet.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNavigate(planet.slug)
        }
      }}
    >
      <PlanetLabel name={planet.name} visited={visited} />
      
      <div
        className="relative transition-all duration-300 ease-out group-hover:scale-105 group-hover:brightness-110"
        style={{
          width: displayWidth,
          height: size,
          minWidth: 44,
          minHeight: 44,
        }}
      >
        <Image
          src={planet.imagePath}
          alt={planet.imageAlt}
          fill
          className="object-contain"
          sizes={`${Math.round(displayWidth)}px`}
          loading="lazy"
        />
        
        {/* Visited indicator - subtle teal ring */}
        {visited && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: '0 0 0 2px rgba(26, 188, 156, 0.3)',
            }}
          />
        )}
      </div>
    </div>
  )
}
