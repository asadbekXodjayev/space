'use client'

import { useTranslation } from 'react-i18next'
import { useDiscovery } from '@/hooks/use-discovery'

/**
 * Subtle top-left progress readout: "{visited} / {total} explored".
 * Teal-accented count in the established mono style.
 */
export function DiscoveryCounter() {
  const { visitedCount, totalCount } = useDiscovery()
  const { t } = useTranslation()

  return (
    <div className="fixed top-8 left-8 z-50 flex items-center gap-3">
      <div className="font-mono text-[11px] tracking-[0.1em] text-orbit">
        <span className="text-o-iii">{visitedCount}</span>
        <span className="mx-1">/</span>
        <span>{totalCount}</span>
        <span className="ml-2 opacity-60">{t('home.explored')}</span>
      </div>
    </div>
  )
}
