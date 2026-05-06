'use client'

import { motion } from 'motion/react'
import type { Planet } from '@/lib/types'

interface CompositionBarsProps {
  composition: Planet['composition']
}

export function CompositionBars({ composition }: CompositionBarsProps) {
  return (
    <div className="mt-7 flex flex-col gap-3">
      {composition.map((comp, index) => (
        <motion.div
          key={comp.name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex flex-col gap-1.5"
        >
          <div className="flex justify-between items-baseline">
            <span className="font-body text-[13px] font-medium text-star-white">
              {comp.name}
            </span>
            <span className="font-mono text-[11px] text-mist">
              {comp.percent}%
            </span>
          </div>
          <div className="h-[3px] rounded-sm overflow-hidden" style={{ background: 'var(--dust)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${comp.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="h-full rounded-sm"
              style={{ background: comp.color }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
