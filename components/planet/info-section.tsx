'use client'

import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import type { CelestialObject, CelestialSummary } from '@/lib/types'
import { fadeUp, baseTransition, inViewOnce } from '@/lib/motion'
import { StatsGrid } from './stats-grid'
import { CompositionBars } from './composition-bars'
import { FactsPanel } from './facts-panel'
import { DetailSections } from './detail-sections'
import { RelatedObjects } from './related-objects'

interface InfoSectionProps {
  object: CelestialObject
  parent?: CelestialSummary
  related?: CelestialSummary[]
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-o-iii">
      <span className="block h-px w-5 bg-o-iii" />
      {children}
    </div>
  )
}

export function InfoSection({ object, parent, related }: InfoSectionProps) {
  const { t } = useTranslation()

  return (
    <div
      className="mx-auto w-full max-w-[1280px]"
      style={{ padding: 'clamp(48px,9vh,80px) clamp(24px,8vw,120px) clamp(80px,12vh,140px)' }}
    >
      {/* Overview + meta */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        transition={baseTransition}
        className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20"
      >
        <div>
          <Label>{t('detail.overview')}</Label>
          <h2 className="mb-5 font-display text-[clamp(22px,2.8vw,34px)] font-bold tracking-[0.04em] text-star-white text-balance">
            {object.tagline}
          </h2>
          <p className="font-body text-[clamp(15px,1.15vw,18px)] leading-[1.8] text-mist">
            {object.overview}
          </p>
        </div>
        <div>
          <Label>{t('detail.physicalData')}</Label>
          <StatsGrid stats={object.stats} />
        </div>
      </motion.section>

      {/* In-depth sections */}
      {object.sections.length > 0 && (
        <section className="mt-20 md:mt-28">
          <Label>{t('detail.inDepth')}</Label>
          <div className="mt-8">
            <DetailSections sections={object.sections} />
          </div>
        </section>
      )}

      {/* Composition + facts */}
      <section className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-2 md:gap-20">
        {object.composition.length > 0 && (
          <div>
            <Label>{t('detail.composition')}</Label>
            <CompositionBars composition={object.composition} />
          </div>
        )}
        {object.facts.length > 0 && (
          <div>
            <Label>{t('detail.facts')}</Label>
            <FactsPanel facts={object.facts} />
          </div>
        )}
      </section>

      {/* Related */}
      {(parent || (related && related.length > 0)) && (
        <section className="mt-20 md:mt-28">
          <RelatedObjects parent={parent} children={related} />
        </section>
      )}
    </div>
  )
}
