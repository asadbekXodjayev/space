'use client'

import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { CelestialOrb } from '@/components/celestial/celestial-orb'
import type { CelestialObject } from '@/lib/types'

interface MiniPlanetCardProps {
  object: CelestialObject
  visible: boolean
  onScrollToTop: () => void
}

/** Compact identity chip that fades in once the hero scrolls away. */
export function MiniPlanetCard({ object, visible, onScrollToTop }: MiniPlanetCardProps) {
  const { t } = useTranslation()

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.4 }}
      onClick={onScrollToTop}
      className="fixed left-[clamp(16px,5vw,48px)] top-[clamp(64px,9vh,84px)] z-40 flex items-center gap-3 rounded-full border border-dust bg-deep/70 py-1.5 pl-1.5 pr-5 backdrop-blur-md transition-colors hover:border-o-iii/60 active:scale-[0.98]"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
      aria-label={`${t('detail.backToTop')} — ${object.name}`}
    >
      <span className="flex size-11 items-center justify-center overflow-hidden rounded-full">
        <CelestialOrb object={object} size={40} muteGlow />
      </span>
      <span className="text-left">
        <span className="block font-display text-[13px] font-bold uppercase tracking-[0.1em] text-star-white">
          {object.name}
        </span>
        <span className="mt-0.5 block font-body text-[11px] tracking-[0.04em] text-mist">
          {object.type}
        </span>
      </span>
    </motion.button>
  )
}
