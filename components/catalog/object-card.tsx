'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { CelestialOrb } from '@/components/celestial/celestial-orb'
import { useCosmosStore } from '@/store/cosmos.store'
import { staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { CelestialSummary } from '@/lib/types'

export function ObjectCard({ object }: { object: CelestialSummary }) {
  const { t } = useTranslation()
  const visited = useCosmosStore((s) => s.visited.includes(object.slug))

  return (
    <motion.div variants={staggerItem} layout>
      <Link
        href={`/explore/${object.slug}`}
        aria-label={`${object.name} — ${object.type}`}
        className={cn(
          'group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-xl border border-dust/70 bg-deep/50 p-6 text-center',
          'transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]',
          'hover:-translate-y-1 hover:border-o-iii/60 hover:bg-deep/80 hover:shadow-[var(--shadow-lg)]',
          'focus-visible:-translate-y-1 focus-visible:border-o-iii active:translate-y-0'
        )}
      >
        {/* category accent wash */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${object.accentColor}, transparent)` }}
        />

        <div className="relative flex h-24 w-24 items-center justify-center">
          <CelestialOrb
            object={object}
            size={84}
            className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:scale-110"
          />
          {visited && (
            <span
              className="absolute right-1 top-1 size-1.5 rounded-full bg-o-iii shadow-[0_0_8px_var(--o-iii)]"
              aria-label="Visited"
            />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orbit">
            {t(`category.${object.category}`)}
          </span>
          <h3 className="font-display text-[16px] font-bold uppercase tracking-[0.06em] text-star-white transition-colors duration-[var(--dur-fast)] group-hover:text-o-iii">
            {object.name}
          </h3>
          <p className="font-body text-[13px] leading-snug text-mist">{object.tagline}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export function ObjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-xl border border-dust/40 bg-deep/30 p-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-nebula-shadow/60">
        <div className="shimmer absolute inset-0" />
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="h-2 w-12 rounded bg-nebula-shadow/60" />
        <div className="h-3 w-20 rounded bg-nebula-shadow/80" />
        <div className="h-2 w-28 rounded bg-nebula-shadow/50" />
      </div>
    </div>
  )
}
