'use client'

import { useEffect, useState } from 'react'
import { SYSTEM_BODIES } from '@/data/catalog'
import { PLANET_HOME_SIZES, EARTH_BASE_SIZE_PX } from '@/lib/constants'
import type { CelestialObject } from '@/lib/types'
import { Sun } from './sun'
import { PlanetOrb } from './planet-orb'

interface SolarSystemProps {
  onNavigate: (slug: string) => void
}

/** Per-planet orbital tuning: relative radius (multiples of a base unit),
 *  revolution period in seconds, and the starting angle as a fraction of a
 *  full turn (0–1). Slower outer orbits echo real Keplerian ordering without
 *  the extreme ratios that would stall the outer planets visually. */
const ORBITS: Record<string, { radius: number; period: number; angle: number }> = {
  mercury: { radius: 4.0, period: 24, angle: 0.0 },
  venus: { radius: 5.0, period: 38, angle: 0.15 },
  earth: { radius: 6.0, period: 54, angle: 0.3 },
  mars: { radius: 7.0, period: 78, angle: 0.45 },
  jupiter: { radius: 8.0, period: 120, angle: 0.6 },
  saturn: { radius: 8.8, period: 160, angle: 0.75 },
  uranus: { radius: 9.3, period: 210, angle: 0.85 },
  neptune: { radius: 9.8, period: 270, angle: 0.95 },
}

export function SolarSystem({ onNavigate }: SolarSystemProps) {
  const [mounted, setMounted] = useState(false)
  // Smallest viewport dimension drives all sizing — set once on mount and on
  // resize only. Never per frame: the orbit motion is pure CSS.
  const [minViewport, setMinViewport] = useState(1000)

  useEffect(() => {
    const measure = () =>
      setMinViewport(Math.min(window.innerWidth, window.innerHeight))
    measure()
    setMounted(true)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Render nothing until measured to avoid a hydration mismatch / layout shift.
  if (!mounted) return null

  // Geometry derived from the viewport.
  const planetScale = minViewport / 1400
  const sunSize = Math.round(220 * planetScale)
  const maxOrbitRadius = (minViewport / 2) * 0.92 // 8% safe margin
  const orbitUnit = maxOrbitRadius / 10

  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      {/* Sun — centre of the system, clickable */}
      <button
        type="button"
        onClick={() => onNavigate('sun')}
        aria-label="The Sun"
        className="group absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-transparent outline-none cursor-pointer rounded-full transition-[transform,filter] duration-[var(--dur-base)] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:brightness-110 focus-visible:scale-110 focus-visible:brightness-110 focus-visible:ring-2 focus-visible:ring-o-iii focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        style={{ width: sunSize, height: sunSize }}
      >
        <Sun size={sunSize} />
      </button>

      {/* Orbit rings + planets */}
      {SYSTEM_BODIES.map((planet) => {
        const orbit = ORBITS[planet.slug]
        if (!orbit) return null

        const radiusPx = orbit.radius * orbitUnit
        const sizeMultiplier = PLANET_HOME_SIZES[planet.slug] ?? 1
        const planetSize = Math.max(
          18,
          Math.round(sizeMultiplier * EARTH_BASE_SIZE_PX * planetScale)
        )

        return (
          <Orbit
            key={planet.slug}
            planet={planet}
            radiusPx={radiusPx}
            period={orbit.period}
            angle={orbit.angle}
            planetSize={planetSize}
            onNavigate={onNavigate}
          />
        )
      })}
    </div>
  )
}

interface OrbitProps {
  planet: CelestialObject
  radiusPx: number
  period: number
  angle: number
  planetSize: number
  onNavigate: (slug: string) => void
}

/**
 * One orbit ring + its revolving planet — ZERO JS per frame.
 *
 * Nesting (each layer has a single job):
 *  - ring:        static dashed-subtle circle centred on the Sun.
 *  - rotor:       0×0 box centred on the Sun, spins 360° over `period`s.
 *                 A negative animation-delay places the planet at its start angle.
 *  - offset:      pushed out to the orbit radius via translateX (no rotation).
 *  - counter:     spins in REVERSE at the same period so the planet stays upright.
 *  - PlanetOrb:   self-centres (-50%/-50%) on the offset point.
 */
function Orbit({
  planet,
  radiusPx,
  period,
  angle,
  planetSize,
  onNavigate,
}: OrbitProps) {
  const diameter = radiusPx * 2
  const startDelay = `${-(angle * period)}s` // negative delay = pre-advanced phase

  return (
    <>
      {/* Orbit ring */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orbit/20 pointer-events-none"
        style={{ width: diameter, height: diameter }}
      />

      {/* Rotor — spins the planet around the Sun */}
      <div
        className="absolute left-1/2 top-1/2 h-0 w-0 z-10"
        style={{
          animation: `spin-orbit ${period}s linear infinite`,
          animationDelay: startDelay,
        }}
      >
        {/* Radial offset to the orbit radius */}
        <div
          className="absolute left-0 top-0"
          style={{ transform: `translateX(${radiusPx}px)` }}
        >
          {/* Counter-rotation keeps the planet visually upright */}
          <div
            className="relative"
            style={{
              animation: `spin-orbit ${period}s linear infinite reverse`,
              animationDelay: startDelay,
            }}
          >
            <PlanetOrb
              planet={planet}
              size={planetSize}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </>
  )
}
