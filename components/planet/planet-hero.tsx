'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { Planet } from '@/lib/types'

interface PlanetHeroProps {
  planet: Planet
  heroOpacity: number
  heroScale: number
  heroTranslateY: number
}

export function PlanetHero({
  planet,
  heroOpacity,
  heroScale,
  heroTranslateY,
}: PlanetHeroProps) {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Planet name */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="absolute top-[clamp(24px,5vh,60px)] left-0 right-0 text-center z-20 font-display text-[clamp(52px,9vw,130px)] font-black tracking-[0.06em] uppercase text-star-white"
        style={{ opacity: heroOpacity }}
      >
        {planet.name}
      </motion.h1>

      {/* Planet image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
        className="relative z-10"
        style={{
          width: 'clamp(220px, 38vw, 520px)',
          height: 'clamp(220px, 38vw, 520px)',
          opacity: heroOpacity,
          transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
        }}
      >
        <Image
          src={planet.imagePath}
          alt={planet.imageAlt}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 220px, 520px"
        />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[11px] text-orbit tracking-[0.1em] animate-[bounce-hint_2s_ease-in-out_infinite_2s]"
        style={{ opacity: heroOpacity }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce">
          <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        SCROLL TO EXPLORE
      </motion.div>
    </section>
  )
}
