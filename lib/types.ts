export interface PlanetStat {
  value: string
  unit?: string
  label: string
}

export interface CompositionEntry {
  name: string
  percent: number
  color: string
}

export interface Planet {
  slug: string
  name: string
  type: string
  tagline: string
  overview: string
  facts: string[]
  stats: Record<string, PlanetStat>
  composition: CompositionEntry[]
  imagePath: string
  imageAlt: string
  orbitRadiusAu: number
  diameterKm: number
  accentColor: string
  floatDuration: number
  floatDelay: number
}

export type CosmosPhase =
  | 'home'
  | 'transitioning-out'
  | 'transitioning-in'
  | 'planet'

export interface DiscoveryState {
  visited: Set<string>
}
