'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import type { CelestialObject, CelestialSummary } from '@/lib/types'
import { useCosmosStore } from '@/store/cosmos.store'
import { usePlanetScroll } from '@/hooks/use-planet-scroll'
import { StarField } from '@/components/canvas/star-field'
import { TopNav } from '@/components/chrome/top-nav'
import { PlanetHero } from '@/components/planet/planet-hero'
import { MiniPlanetCard } from '@/components/planet/mini-planet-card'
import { InfoSection } from '@/components/planet/info-section'
import { ProgressLine } from '@/components/ui/progress-line'

interface ObjectDetailClientProps {
  object: CelestialObject
  parent?: CelestialSummary
  related?: CelestialSummary[]
}

export function ObjectDetailClient({ object, parent, related }: ObjectDetailClientProps) {
  const markVisited = useCosmosStore((s) => s.markVisited)
  const setPhase = useCosmosStore((s) => s.setPhase)

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
    markVisited(object.slug)
    setPhase('detail')
    return () => setPhase('home')
  }, [object.slug, markVisited, setPhase])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen w-full overflow-hidden"
    >
      <StarField />
      <ProgressLine width={progressLineWidth} />
      <TopNav backHref="/" />
      <MiniPlanetCard object={object} visible={showMiniCard} onScrollToTop={scrollToTop} />

      <div
        ref={scrollRef}
        className="relative z-10 h-full overflow-y-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <PlanetHero
          object={object}
          heroOpacity={heroOpacity}
          heroScale={heroScale}
          heroTranslateY={heroTranslateY}
        />
        <InfoSection object={object} parent={parent} related={related} />
      </div>
    </motion.div>
  )
}
