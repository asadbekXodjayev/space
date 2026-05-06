// Animation timing
export const TRANSITION_DURATION_MS = 600
export const SCROLL_MINI_THRESHOLD_PX = 80
export const PLANET_FLOAT_RANGE_PX = 8

// Canvas
export const STAR_COUNT_DESKTOP = 220
export const STAR_COUNT_MOBILE = 90

// Sizing — relative planet display sizes on home page
// All relative to Earth = 1.0
export const PLANET_HOME_SIZES: Record<string, number> = {
  mercury: 0.38,
  venus: 0.95,
  earth: 1.0,
  mars: 0.53,
  jupiter: 2.8,
  saturn: 2.4,
  uranus: 1.65,
  neptune: 1.6,
}

// Base size in px for Earth on home page (scales with viewport)
export const EARTH_BASE_SIZE_PX = 80

// Colors (mirrors CSS vars — for canvas use only)
export const COLORS = {
  void: '#04060F',
  deep: '#0A0F1E',
  nebulaShadow: '#131B35',
  dust: '#1E2A4A',
  hAlpha: '#C0392B',
  oIII: '#1ABC9C',
  sII: '#D4A843',
  ionBlue: '#7B8FD4',
  starWhite: '#EAEEF8',
  mist: '#8899CC',
  orbit: '#3D4F7C',
} as const
