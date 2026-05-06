'use client'

import { PLANETS } from '@/data/planets'
import { PLANET_HOME_SIZES, EARTH_BASE_SIZE_PX } from '@/lib/constants'
import { Sun } from './sun'
import { PlanetOrb } from './planet-orb'

interface SolarSystemProps {
  onNavigate: (slug: string) => void
}

export function SolarSystem({ onNavigate }: SolarSystemProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center overflow-hidden">
      {/* Sun */}
      <Sun />
      
      {/* Planets row */}
      <div
        className="flex items-center flex-1 overflow-x-auto overflow-y-hidden md:overflow-hidden"
        style={{
          gap: 'clamp(18px, 3.2vw, 64px)',
          paddingLeft: 'clamp(12px, 2vw, 40px)',
          paddingRight: 'clamp(12px, 2vw, 40px)',
        }}
      >
        {PLANETS.map((planet) => {
          const sizeMultiplier = PLANET_HOME_SIZES[planet.slug] ?? 1
          const size = Math.round(sizeMultiplier * EARTH_BASE_SIZE_PX)
          
          return (
            <PlanetOrb
              key={planet.slug}
              planet={planet}
              size={size}
              onNavigate={onNavigate}
            />
          )
        })}
      </div>
    </div>
  )
}
