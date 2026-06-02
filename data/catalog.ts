import type { CelestialObject, CelestialSummary, ObjectCategory } from '@/lib/types'
import { OBJECTS } from './objects.generated'

const bySlug = new Map<string, CelestialObject>(OBJECTS.map((o) => [o.slug, o]))

export { OBJECTS }

export const OBJECT_SLUGS = OBJECTS.map((o) => o.slug)

export const getObject = (slug: string): CelestialObject | undefined => bySlug.get(slug)

export const toSummary = (o: CelestialObject): CelestialSummary => ({
  slug: o.slug,
  name: o.name,
  category: o.category,
  type: o.type,
  tagline: o.tagline,
  accentColor: o.accentColor,
  imagePath: o.imagePath,
  gradient: o.gradient,
  ringed: o.ringed,
  glow: o.glow,
})

export const SUMMARIES: CelestialSummary[] = OBJECTS.map(toSummary)

export const getByCategory = (category: ObjectCategory): CelestialObject[] =>
  OBJECTS.filter((o) => o.category === category)

export const getChildren = (parentSlug: string): CelestialObject[] =>
  OBJECTS.filter((o) => o.parent === parentSlug)

export const getParent = (o: CelestialObject): CelestialObject | undefined =>
  o.parent ? bySlug.get(o.parent) : undefined

/** The Sun + 8 planets ordered by orbital radius — drives the home system. */
export const SYSTEM_BODIES: CelestialObject[] = OBJECTS.filter(
  (o) => o.category === 'planet'
).sort((a, b) => (a.orbitRadiusAu ?? 0) - (b.orbitRadiusAu ?? 0))

export const SUN: CelestialObject | undefined = getObject('sun')

/** Total catalogued objects (used by the discovery counter). */
export const TOTAL_OBJECTS = OBJECTS.length
