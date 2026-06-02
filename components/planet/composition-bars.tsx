'use client'

import { motion } from 'motion/react'
import { EASE_OUT_EXPO, inViewOnce } from '@/lib/motion'
import type { CompositionEntry } from '@/lib/types'

export function CompositionBars({ composition }: { composition: CompositionEntry[] }) {
  if (composition.length === 0) return null

  return (
    <div className="mt-7 flex flex-col gap-3">
      {composition.map((comp, index) => (
        <motion.div
          key={comp.name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="flex flex-col gap-1.5"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-body text-[13px] font-medium text-star-white">{comp.name}</span>
            <span className="font-mono text-[11px] text-mist">{comp.percent}%</span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-sm" style={{ background: 'var(--dust)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${comp.percent}%` }}
              viewport={inViewOnce}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
              className="h-full rounded-sm"
              style={{ background: comp.color }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
