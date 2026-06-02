'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { CelestialOrb } from '@/components/celestial/celestial-orb'
import type { CelestialSummary } from '@/lib/types'

interface RelatedObjectsProps {
  parent?: CelestialSummary
  children?: CelestialSummary[]
}

export function RelatedObjects({ parent, children = [] }: RelatedObjectsProps) {
  const { t } = useTranslation()
  if (!parent && children.length === 0) return null

  return (
    <div className="flex flex-col gap-8">
      {parent && (
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-orbit">
            {t('detail.satelliteOf')}
          </p>
          <RelatedChip object={parent} />
        </div>
      )}
      {children.length > 0 && (
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-orbit">
            {t('detail.explore')}
          </p>
          <div className="flex flex-wrap gap-3">
            {children.map((c) => (
              <RelatedChip key={c.slug} object={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RelatedChip({ object }: { object: CelestialSummary }) {
  return (
    <Link
      href={`/explore/${object.slug}`}
      className="group inline-flex items-center gap-3 rounded-full border border-dust bg-deep/50 py-1.5 pl-1.5 pr-4 transition-all duration-[var(--dur-fast)] hover:border-o-iii/60 hover:bg-deep active:scale-[0.97]"
    >
      <span className="flex size-9 items-center justify-center">
        <CelestialOrb object={object} size={32} />
      </span>
      <span className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-star-white group-hover:text-o-iii">
        {object.name}
      </span>
    </Link>
  )
}
