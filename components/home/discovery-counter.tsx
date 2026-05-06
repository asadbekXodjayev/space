'use client'

import { useDiscovery } from '@/hooks/use-discovery'

export function DiscoveryCounter() {
  const { visitedCount, totalCount } = useDiscovery()

  return (
    <div className="fixed top-8 left-8 z-50 flex items-center gap-3">
      <div className="font-mono text-[11px] tracking-[0.1em] text-orbit">
        <span className="text-o-iii">{visitedCount}</span>
        <span className="mx-1">/</span>
        <span>{totalCount}</span>
        <span className="ml-2 opacity-60">explored</span>
      </div>
    </div>
  )
}
