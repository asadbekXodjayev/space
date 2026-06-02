'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import type { CelestialObject, CelestialSummary } from '@/lib/types'

type OrbData = Pick<
  CelestialObject & CelestialSummary,
  'name' | 'imagePath' | 'accentColor' | 'gradient' | 'ringed' | 'glow'
> & { imageAlt?: string }

interface CelestialOrbProps {
  object: OrbData
  /** Rendered px size of the orb. Ignored for layout when `fill` is set, but
   *  still used as the `sizes` hint and ring geometry reference. */
  size: number
  /** Fill the parent (parent must be a sized, square, positioned box). */
  fill?: boolean
  priority?: boolean
  className?: string
  /** Disable the emissive glow even if the object declares one. */
  muteGlow?: boolean
}

/**
 * Renders a celestial body: the real photograph when available, otherwise a
 * procedural gradient sphere built from the object's `gradient`/`accentColor`.
 * Optional Saturn-style ring and emissive glow for stars/pulsars/nebulae.
 */
export function CelestialOrb({
  object,
  size,
  fill = false,
  priority = false,
  className,
  muteGlow = false,
}: CelestialOrbProps) {
  const { imagePath, imageAlt, name, accentColor, gradient, ringed, glow } = object
  const showGlow = glow && !muteGlow

  const orbStyle = useMemo<CSSProperties>(() => {
    const [core, mid, edge] = gradient ?? [accentColor, accentColor, '#04060f']
    return {
      ['--orb-core' as string]: core,
      ['--orb-mid' as string]: mid,
      ['--orb-edge' as string]: edge,
    }
  }, [gradient, accentColor])

  const rootStyle: CSSProperties = fill
    ? { width: '100%', height: '100%' }
    : { width: size, height: size }

  if (imagePath) {
    return (
      <div className={cn('relative', className)} style={rootStyle}>
        {showGlow && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl"
            style={{ background: accentColor, opacity: 0.35 }}
          />
        )}
        <Image
          src={imagePath}
          alt={imageAlt ?? name}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-contain"
          sizes={`${Math.round(size)}px`}
        />
      </div>
    )
  }

  // Procedural orb (no photograph). Ring overflows the square root box.
  return (
    <div
      className={cn('relative grid place-items-center', className)}
      style={{ ...rootStyle, overflow: 'visible' }}
      role="img"
      aria-label={imageAlt ?? name}
    >
      {ringed && (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 rounded-[100%]"
          style={{
            width: '178%',
            height: '50%',
            transform: 'translate(-50%, -50%) rotate(-18deg)',
            border: `clamp(2px, 0.55vw, 8px) solid ${accentColor}`,
            opacity: 0.55,
            boxShadow: `0 0 14px -2px ${accentColor}`,
          }}
        />
      )}
      <div
        className={cn('orb-surface h-full w-full', showGlow && 'orb-glow')}
        style={orbStyle}
      />
    </div>
  )
}
