'use client'

import { motion } from 'motion/react'
import type { Planet } from '@/lib/types'
import { StatsGrid } from './stats-grid'
import { CompositionBars } from './composition-bars'
import { FactsPanel } from './facts-panel'

interface InfoSectionProps {
  planet: Planet
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.14em] text-o-iii uppercase mb-4 flex items-center gap-2.5">
      <span className="block w-5 h-px bg-o-iii" />
      {children}
    </div>
  )
}

function InfoHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(20px,2.5vw,32px)] font-bold tracking-[0.06em] text-star-white mb-5">
      {children}
    </h2>
  )
}

export function InfoSection({ planet }: InfoSectionProps) {
  return (
    <section
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start"
      style={{ padding: 'clamp(60px, 10vh, 80px) clamp(24px, 8vw, 120px)' }}
    >
      {/* Left column: Overview + Composition */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <InfoLabel>Overview</InfoLabel>
        <InfoHeading>{planet.tagline}</InfoHeading>
        <p className="font-body text-[clamp(14px,1.1vw,17px)] font-normal leading-[1.78] text-mist">
          {planet.overview}
        </p>
        
        <div className="mt-12">
          <InfoLabel>Composition</InfoLabel>
          <CompositionBars composition={planet.composition} />
        </div>
      </motion.div>

      {/* Right column: Stats + Facts */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <InfoLabel>Physical Data</InfoLabel>
        <StatsGrid stats={planet.stats} />
        
        <div className="mt-12">
          <InfoLabel>Remarkable Facts</InfoLabel>
          <FactsPanel facts={planet.facts} />
        </div>
      </motion.div>
    </section>
  )
}
