'use client'

import { motion } from 'motion/react'

interface FactsPanelProps {
  facts: string[]
}

export function FactsPanel({ facts }: FactsPanelProps) {
  return (
    <div className="flex flex-col gap-6 mt-6">
      {facts.map((fact, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          className="font-body text-[16px] font-normal leading-[1.78] text-mist pl-4 border-l-2 border-o-iii"
        >
          {fact}
        </motion.p>
      ))}
    </div>
  )
}
