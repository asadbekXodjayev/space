// ─────────────────────────────────────────────────────────────────────────────
// COSMOS — celestial object domain model
// A single rich schema covers every kind of object in the catalog: stars,
// planets, dwarf planets, moons, asteroids, comets, nebulae, black holes,
// pulsars and galaxies. Objects without a real image fall back to a
// procedurally-rendered orb driven by `gradient` + `accentColor`.
// ─────────────────────────────────────────────────────────────────────────────

export type ObjectCategory =
  | 'star'
  | 'planet'
  | 'dwarf-planet'
  | 'moon'
  | 'asteroid'
  | 'comet'
  | 'nebula'
  | 'black-hole'
  | 'pulsar'
  | 'galaxy'

/** A single physical/orbital statistic, rendered in the stats grid. */
export interface ObjectStat {
  /** Stable identifier, also used as the React key. */
  key: string
  value: string
  unit?: string
  /** Human label (English source copy). */
  label: string
}

/** One slice of the composition breakdown bar chart. */
export interface CompositionEntry {
  name: string
  percent: number
  color: string
}

/** An extended prose section on the detail page ("extremely detailed"). */
export interface DetailSection {
  heading: string
  body: string
}

export interface CelestialObject {
  // ── identity ──────────────────────────────────────────────────────────────
  slug: string
  name: string
  category: ObjectCategory
  /** Display sub-type, e.g. "Terrestrial Planet", "Emission Nebula". */
  type: string
  tagline: string

  // ── content ─────────────────────────────────────────────────────────────--
  /** Lead paragraph shown under the hero. */
  overview: string
  /** Long-form sections — the heart of the detailed page. */
  sections: DetailSection[]
  facts: string[]
  stats: ObjectStat[]
  composition: CompositionEntry[]

  // ── visuals ─────────────────────────────────────────────────────────────--
  /** Real image URL. When omitted, a generated orb is rendered instead. */
  imagePath?: string
  imageAlt: string
  accentColor: string
  /** [core, mid, edge] colours for the procedural orb gradient. */
  gradient?: [string, string, string]
  /** Renders Saturn-style rings around the orb. */
  ringed?: boolean
  /** Adds an emissive glow (stars, pulsars, some nebulae). */
  glow?: boolean

  // ── relationships & placement ───────────────────────────────────────────--
  /** Slug of the body this object orbits (e.g. a moon's planet). */
  parent?: string
  /** Mean orbital radius in AU (solar-system bodies only). */
  orbitRadiusAu?: number
  diameterKm?: number
  /** Distance in light-years (deep-space objects only). */
  distanceLy?: number
  /** Discovery note, e.g. "1846 · Le Verrier & Galle". */
  discovered?: string

  // ── home-screen float animation tuning ──────────────────────────────────--
  floatDuration: number
  floatDelay: number
}

/** Lightweight projection used by lists/cards to avoid shipping full prose. */
export interface CelestialSummary {
  slug: string
  name: string
  category: ObjectCategory
  type: string
  tagline: string
  accentColor: string
  imagePath?: string
  gradient?: [string, string, string]
  ringed?: boolean
  glow?: boolean
}

export type CosmosPhase =
  | 'home'
  | 'transitioning-out'
  | 'transitioning-in'
  | 'detail'

export interface CategoryMeta {
  id: ObjectCategory
  /** English label (also drives the i18n key `category.<id>`). */
  label: string
  /** Short tagline for the category header. */
  blurb: string
  accentColor: string
}
