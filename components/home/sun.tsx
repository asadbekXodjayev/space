import { CelestialOrb } from '@/components/celestial/celestial-orb'
import { SUN } from '@/data/catalog'

interface SunProps {
  /** Rendered diameter in px. */
  size: number
}

/**
 * The Sun at the centre of the home system. Renders the real image via
 * CelestialOrb (SUN declares `glow: true`, so the emissive halo is applied).
 * Renders nothing if the catalog has no `sun` entry.
 */
export function Sun({ size }: SunProps) {
  if (!SUN) return null

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <CelestialOrb object={SUN} size={size} fill priority />
    </div>
  )
}
