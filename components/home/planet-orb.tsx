'use client'

import { CelestialOrb } from '@/components/celestial/celestial-orb'
import type { CelestialObject } from '@/lib/types'
import { useCosmosStore } from '@/store/cosmos.store'
import { PlanetLabel } from './planet-label'

interface PlanetOrbProps {
  planet: CelestialObject
  /** Rendered orb diameter in px (already scaled for the viewport). */
  size: number
  onNavigate: (slug: string) => void
}

/**
 * A single interactive planet. A real <button> gives us free keyboard a11y;
 * hover and focus-visible both lift + brighten the orb and reveal its label.
 * The float bob is a pure CSS animation (no JS per frame).
 */
export function PlanetOrb({ planet, size, onNavigate }: PlanetOrbProps) {
  const visited = useCosmosStore((state) => state.isVisited(planet.slug))

  // Saturn's rings overflow the square image — widen the box so it isn't clipped.
  const boxWidth = planet.slug === 'saturn' ? Math.round(size * 1.8) : size

  return (
    <button
      type="button"
      onClick={() => onNavigate(planet.slug)}
      aria-label={planet.name}
      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-transparent outline-none cursor-pointer"
      style={{
        animation: `float ${planet.floatDuration}s ease-in-out infinite`,
        animationDelay: `${planet.floatDelay}s`,
      }}
    >
      <PlanetLabel name={planet.name} visited={visited} />

      <span
        className="relative block rounded-full transition-[transform,filter] duration-[var(--dur-base)] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-110 group-focus-visible:scale-110 group-focus-visible:brightness-110 group-focus-visible:ring-2 group-focus-visible:ring-o-iii group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-void"
        style={{
          width: boxWidth,
          height: size,
          minWidth: 44,
          minHeight: 44,
        }}
      >
        <CelestialOrb object={planet} size={size} fill />

        {/* Visited ring — subtle teal halo */}
        {visited && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 0 2px rgba(26, 188, 156, 0.35)' }}
          />
        )}
      </span>
    </button>
  )
}
