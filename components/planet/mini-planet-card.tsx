'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { Planet } from '@/lib/types'

interface MiniPlanetCardProps {
  planet: Planet
  visible: boolean
  onScrollToTop: () => void
}

export function MiniPlanetCard({ planet, visible, onScrollToTop }: MiniPlanetCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.4 }}
      onClick={onScrollToTop}
      className="fixed top-8 left-8 z-50 flex items-center gap-4 cursor-pointer"
      style={{ pointerEvents: visible ? 'all' : 'none' }}
      aria-label={`Scroll back to ${planet.name}`}
    >
      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-dust">
        <Image
          src={planet.imagePath}
          alt={planet.name}
          width={56}
          height={56}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-left">
        <div className="font-display text-[13px] font-bold tracking-[0.1em] text-star-white uppercase">
          {planet.name}
        </div>
        <div className="font-body text-[12px] text-mist tracking-[0.04em] mt-0.5">
          {planet.type}
        </div>
      </div>
    </motion.button>
  )
}
