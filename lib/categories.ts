import type { CategoryMeta, ObjectCategory } from './types'

// Authoritative metadata per category. `label`/`blurb` are English source copy;
// UI reads localized labels via i18n key `category.<id>`.
export const CATEGORIES: Record<ObjectCategory, CategoryMeta> = {
  star: { id: 'star', label: 'Stars', blurb: 'Self-luminous spheres of plasma', accentColor: 'var(--cat-star)' },
  planet: { id: 'planet', label: 'Planets', blurb: 'Worlds orbiting our Sun', accentColor: 'var(--cat-planet)' },
  'dwarf-planet': { id: 'dwarf-planet', label: 'Dwarf Planets', blurb: 'Worlds that never cleared their orbit', accentColor: 'var(--cat-dwarf-planet)' },
  moon: { id: 'moon', label: 'Moons', blurb: 'Natural satellites of the planets', accentColor: 'var(--cat-moon)' },
  asteroid: { id: 'asteroid', label: 'Asteroids', blurb: 'Rocky remnants of formation', accentColor: 'var(--cat-asteroid)' },
  comet: { id: 'comet', label: 'Comets', blurb: 'Icy wanderers with luminous tails', accentColor: 'var(--cat-comet)' },
  nebula: { id: 'nebula', label: 'Nebulae', blurb: 'Clouds where stars are born and die', accentColor: 'var(--cat-nebula)' },
  'black-hole': { id: 'black-hole', label: 'Black Holes', blurb: 'Where gravity wins', accentColor: 'var(--cat-black-hole)' },
  pulsar: { id: 'pulsar', label: 'Pulsars', blurb: 'Lighthouses of the dead', accentColor: 'var(--cat-pulsar)' },
  galaxy: { id: 'galaxy', label: 'Galaxies', blurb: 'Island universes of stars', accentColor: 'var(--cat-galaxy)' },
}

// Clean, deduplicated display order.
export const CATEGORY_SEQUENCE: ObjectCategory[] = [
  'star',
  'planet',
  'dwarf-planet',
  'moon',
  'asteroid',
  'comet',
  'nebula',
  'black-hole',
  'pulsar',
  'galaxy',
]

export const categoryAccent = (id: ObjectCategory): string => CATEGORIES[id].accentColor
