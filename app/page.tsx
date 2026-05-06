'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { StarField } from '@/components/canvas/star-field'
import { SolarSystem } from '@/components/home/solar-system'
import { DiscoveryCounter } from '@/components/home/discovery-counter'
import { useCosmosStore } from '@/store/cosmos.store'
import { TRANSITION_DURATION_MS } from '@/lib/constants'

export default function HomePage() {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)
  const setPhase = useCosmosStore((state) => state.setPhase)
  const setActivePlanet = useCosmosStore((state) => state.setActivePlanet)

  const handleNavigate = (slug: string) => {
    setIsExiting(true)
    setPhase('transitioning-out')
    setActivePlanet(slug)
    
    setTimeout(() => {
      router.push(`/planets/${slug}`)
    }, TRANSITION_DURATION_MS - 100)
  }

  return (
    <main className="relative w-full h-screen overflow-hidden cursor-crosshair">
      <StarField />
      <DiscoveryCounter />
      
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: TRANSITION_DURATION_MS / 1000 }}
            className="relative z-10"
          >
            <SolarSystem onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
