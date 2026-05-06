'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

export function BackButton() {
  const router = useRouter()

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      onClick={() => router.push('/')}
      className="fixed top-8 right-8 z-50 font-display text-[10px] font-semibold tracking-[0.14em] text-orbit uppercase cursor-pointer px-4 py-2 border border-dust rounded-sm bg-transparent transition-colors duration-200 hover:text-o-iii hover:border-o-iii"
      aria-label="Back to solar system"
    >
      Back
    </motion.button>
  )
}
