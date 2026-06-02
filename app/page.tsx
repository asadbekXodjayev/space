'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { StarField } from '@/components/canvas/star-field'
import { SolarSystem } from '@/components/home/solar-system'
import { DiscoveryCounter } from '@/components/home/discovery-counter'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useCosmosStore } from '@/store/cosmos.store'
import { TRANSITION_DURATION_MS } from '@/lib/constants'

export default function HomePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [isExiting, setIsExiting] = useState(false)
  const setPhase = useCosmosStore((state) => state.setPhase)
  const setActivePlanet = useCosmosStore((state) => state.setActivePlanet)

  // Exit the system, then navigate once the fade-out has nearly completed.
  const handleNavigate = (slug: string) => {
    if (isExiting) return
    setIsExiting(true)
    setPhase('transitioning-out')
    setActivePlanet(slug)

    setTimeout(() => {
      router.push(`/explore/${slug}`)
    }, TRANSITION_DURATION_MS - 100)
  }

  return (
    <main className="relative h-screen w-full overflow-hidden cursor-crosshair">
      <StarField />
      <DiscoveryCounter />

      {/* Top-right controls */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-3">
        <Link
          href="/catalog"
          className="rounded-md border border-dust px-4 py-2 font-display text-[11px] uppercase tracking-widest text-mist transition-colors duration-[var(--dur-fast)] hover:border-o-iii hover:text-o-iii focus-visible:border-o-iii focus-visible:text-o-iii focus-visible:outline-none"
        >
          {t('nav.catalog')}
        </Link>
        <LanguageSwitcher />
      </div>

      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key="solar-system"
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

      {/* Subtle bottom-centre hint */}
      <Link
        href="/catalog"
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-orbit transition-colors duration-[var(--dur-fast)] hover:text-o-iii focus-visible:text-o-iii focus-visible:outline-none"
      >
        {t('home.enter')}
      </Link>
    </main>
  )
}
