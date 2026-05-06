'use client'

import { useCosmosStore } from '@/store/cosmos.store'
import { PLANETS } from '@/data/planets'

export function useDiscovery() {
  const visited = useCosmosStore((state) => state.visited)
  const markVisited = useCosmosStore((state) => state.markVisited)
  const isVisited = useCosmosStore((state) => state.isVisited)

  const totalCount = PLANETS.length
  const visitedCount = visited.length
  const percentExplored = Math.round((visitedCount / totalCount) * 100)

  return {
    visited,
    visitedCount,
    totalCount,
    percentExplored,
    isVisited,
    markVisited,
  }
}
