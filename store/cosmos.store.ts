'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CosmosPhase } from '@/lib/types'

interface CosmosStore {
  // Navigation phase
  phase: CosmosPhase
  setPhase: (phase: CosmosPhase) => void

  // Active planet
  activePlanet: string | null
  setActivePlanet: (slug: string | null) => void

  // Discovery tracking (persisted to localStorage)
  visited: string[]
  markVisited: (slug: string) => void
  isVisited: (slug: string) => boolean
}

export const useCosmosStore = create<CosmosStore>()(
  persist(
    (set, get) => ({
      phase: 'home',
      setPhase: (phase) => set({ phase }),

      activePlanet: null,
      setActivePlanet: (slug) => set({ activePlanet: slug }),

      visited: [],
      markVisited: (slug) => {
        const { visited } = get()
        if (!visited.includes(slug)) set({ visited: [...visited, slug] })
      },
      isVisited: (slug) => get().visited.includes(slug),
    }),
    {
      name: 'cosmos-discovery',
      partialize: (state) => ({ visited: state.visited }),
    }
  )
)
