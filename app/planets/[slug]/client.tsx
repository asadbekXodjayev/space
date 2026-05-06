'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import type { Planet } from '@/lib/types'
import { useCosmosStore } from '@/store/cosmos.store'
import { usePlanetScroll } from '@/hooks/use-planet-scroll'
import { StarField } from '@/components/canvas/star-field'
import { PlanetHero } from '@/components/planet/planet-hero'
import { MiniPlanetCard } from '@/components/planet/mini-planet-card'
import { InfoSection } from '@/components/planet/info-section'
import { BackButton } from '@/components/ui/back-button'
import { ProgressLine } from '@/components/ui/progress-line'

interface PlanetDetailClientProps {
  planet: Planet
}

export function PlanetDetailClient({ planet }: PlanetDetailClientProps) {
  const markVisited = useCosmosStore((state) => state.markVisited)
  const setPhase = useCosmosStore((state) => state.setPhase)

  const {
    scrollRef,
    scrollToTop,
    showMiniCard,
    heroOpacity,
    heroScale,
    heroTranslateY,
    progressLineWidth,
  } = usePlanetScroll()

  useEffect(() => {
    markVisited(planet.slug)
    setPhase('planet')
  }, [planet.slug, markVisited, setPhase])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-screen overflow-hidden"
    >
      <StarField />
      <ProgressLine width={progressLineWidth} />
      <BackButton />
      <MiniPlanetCard
        planet={planet}
        visible={showMiniCard}
        onScrollToTop={scrollToTop}
      />

      <div
        ref={scrollRef}
        className="relative z-10 h-full overflow-y-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <PlanetHero
          planet={planet}
          heroOpacity={heroOpacity}
          heroScale={heroScale}
          heroTranslateY={heroTranslateY}
        />
        <InfoSection planet={planet} />
      </div>
    </motion.div>
  )
}
