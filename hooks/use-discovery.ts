'use client'

import { useCosmosStore } from '@/store/cosmos.store'
import { TOTAL_OBJECTS } from '@/data/catalog'

/** Aggregates discovery progress across the entire catalog. */
export function useDiscovery() {
  const visited = useCosmosStore((state) => state.visited)
  const markVisited = useCosmosStore((state) => state.markVisited)
  const isVisited = useCosmosStore((state) => state.isVisited)

  const totalCount = TOTAL_OBJECTS
  const visitedCount = visited.length
  const percentExplored = totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0

  return { visited, visitedCount, totalCount, percentExplored, isVisited, markVisited }
}
