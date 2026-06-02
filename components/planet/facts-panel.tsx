'use client'

import { motion } from 'motion/react'
import { inViewOnce } from '@/lib/motion'

export function FactsPanel({ facts }: { facts: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-6">
      {facts.map((fact, index) => (
        <motion.li
          key={fact}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="border-l-2 border-o-iii pl-4 font-body text-[16px] font-normal leading-[1.78] text-mist"
        >
          {fact}
        </motion.li>
      ))}
    </ul>
  )
}
