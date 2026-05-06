'use client'

import { useEffect, useState } from 'react'
import { PLANETS } from '@/data/planets'
import { PLANET_HOME_SIZES, EARTH_BASE_SIZE_PX } from '@/lib/constants'
import type { Planet } from '@/lib/types'
import { Sun } from './sun'
import { PlanetOrb } from './planet-orb'

interface SolarSystemProps {
  onNavigate: (slug: string) => void
}

interface OrbitData {
  radius: number
  period: number
  initialAngle: number
}

export function SolarSystem({ onNavigate }: SolarSystemProps) {
  const [isClient, setIsClient] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(1920)
  const [viewportHeight, setViewportHeight] = useState(1080)

  useEffect(() => {
    setIsClient(true)
    setViewportWidth(window.innerWidth)
    setViewportHeight(window.innerHeight)
    
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isClient) {
    return null
  }

  // Calculate responsive scale based on viewport - maximize within bounds
  const minViewport = Math.min(viewportWidth, viewportHeight)
  const scale = minViewport / 1000 // Base scale on smallest viewport dimension
  
  // Sun size - scales with viewport like planets
  const basePlanetSize = 40
  const planetScale = minViewport / 1400
  const sunSize = 200 * planetScale // Sun scales proportionally
  const sunRadius = sunSize / 2
  
  // Orbit data for each planet with realistic relative gaps
  // Scaled to fit within 100vh and 100vw
  // Mercury needs significant gap from sun (sun radius + buffer)
  const maxOrbitRadius = (minViewport / 2) * 0.92 // Leave 8% margin
  const baseOrbitUnit = maxOrbitRadius / 10
  
  const orbitData: Record<string, OrbitData> = {
    mercury: { radius: 4.0 * baseOrbitUnit, period: 20, initialAngle: 0 },
    venus: { radius: 5.0 * baseOrbitUnit, period: 35, initialAngle: Math.PI * 0.3 },
    earth: { radius: 6.0 * baseOrbitUnit, period: 50, initialAngle: Math.PI * 0.6 },
    mars: { radius: 7.0 * baseOrbitUnit, period: 75, initialAngle: Math.PI * 0.9 },
    jupiter: { radius: 8.0 * baseOrbitUnit, period: 120, initialAngle: Math.PI * 1.2 },
    saturn: { radius: 8.8 * baseOrbitUnit, period: 160, initialAngle: Math.PI * 1.5 },
    uranus: { radius: 9.3 * baseOrbitUnit, period: 220, initialAngle: Math.PI * 1.8 },
    neptune: { radius: 9.8 * baseOrbitUnit, period: 280, initialAngle: Math.PI * 2.1 },
  }

  return (
    <div className="fixed inset-0 z-10 overflow-hidden bg-transparent">
      {/* Sun in the center - clickable */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        style={{
          width: sunSize,
          height: sunSize,
        }}
        onClick={() => onNavigate('sun')}
        role="button"
        tabIndex={0}
        aria-label="Navigate to Sun"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onNavigate('sun')
          }
        }}
      >
        <div className="relative transition-all duration-300 ease-out group-hover:scale-110 group-hover:brightness-110">
          <Sun />
        </div>
      </div>

      {/* Orbits and planets */}
      {PLANETS.map((planet) => {
        const orbit = orbitData[planet.slug]
        const sizeMultiplier = PLANET_HOME_SIZES[planet.slug] ?? 1
        const planetSize = Math.round(sizeMultiplier * basePlanetSize * planetScale)
        
        return (
          <Orbit
            key={planet.slug}
            planet={planet}
            orbit={orbit}
            planetSize={planetSize}
            onNavigate={onNavigate}
            scale={scale}
          />
        )
      })}
    </div>
  )
}

interface OrbitProps {
  planet: Planet
  orbit: OrbitData
  planetSize: number
  onNavigate: (slug: string) => void
  scale: number
}

function Orbit({ planet, orbit, planetSize, onNavigate, scale }: OrbitProps) {
  const [angle, setAngle] = useState(orbit.initialAngle)

  useEffect(() => {
    let animationFrame: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000
      const newAngle = orbit.initialAngle + (elapsed * 2 * Math.PI) / orbit.period
      setAngle(newAngle)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [orbit.initialAngle, orbit.period])

  // Calculate planet position on orbit
  const x = Math.cos(angle) * orbit.radius
  const y = Math.sin(angle) * orbit.radius

  return (
    <>
      {/* Orbit path */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-700/30 pointer-events-none"
        style={{
          width: orbit.radius * 2,
          height: orbit.radius * 2,
        }}
      />
      
      {/* Planet */}
      <div
        className="absolute top-1/2 left-1/2 z-10"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        }}
      >
        <PlanetOrb
          planet={planet}
          size={planetSize}
          onNavigate={onNavigate}
        />
      </div>
    </>
  )
}