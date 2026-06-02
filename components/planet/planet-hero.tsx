'use client'

import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import type { CelestialObject } from '@/lib/types'
import { CelestialOrb } from '@/components/celestial/celestial-orb'
import { softSpring } from '@/lib/motion'

interface PlanetHeroProps {
  object: CelestialObject
  heroOpacity: number
  heroScale: number
  heroTranslateY: number
}

export function PlanetHero({ object, heroOpacity, heroScale, heroTranslateY }: PlanetHeroProps) {
  const { t } = useTranslation()

  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="absolute left-0 right-0 top-[clamp(72px,12vh,120px)] z-20 px-4 text-center font-display text-[clamp(44px,9vw,130px)] font-black uppercase tracking-[0.06em] text-star-white text-balance"
        style={{ opacity: heroOpacity }}
      >
        {object.name}
      </motion.h1>

      {/* Type / classification */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute left-1/2 top-[clamp(140px,22vh,240px)] z-20 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.22em] text-o-iii"
        style={{ opacity: heroOpacity }}
      >
        {object.type}
      </motion.p>

      {/* Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...softSpring, delay: 0.2 }}
        className="relative z-10 flex items-center justify-center"
        style={{
          width: 'clamp(220px,38vw,520px)',
          height: 'clamp(220px,38vw,520px)',
          opacity: heroOpacity,
          transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
        }}
      >
        <CelestialOrb object={object} size={520} fill priority />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-orbit"
        style={{ opacity: heroOpacity }}
      >
        {t('detail.scrollHint')}
        <ChevronDown className="size-3.5 animate-[bounce-hint_2s_ease-in-out_infinite]" aria-hidden />
      </motion.div>
    </section>
  )
}
