'use client'

import { motion } from 'motion/react'
import type { Planet } from '@/lib/types'

interface StatsGridProps {
  stats: Planet['stats']
}

export function StatsGrid({ stats }: StatsGridProps) {
  const entries = Object.entries(stats)

  return (
    <div
      className="grid grid-cols-2 gap-px rounded overflow-hidden border border-dust mt-8"
      style={{ background: 'var(--dust)' }}
    >
      {entries.map(([key, stat], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="p-5"
          style={{ background: 'var(--deep)' }}
        >
          <div className="font-display text-[clamp(16px,2vw,24px)] font-bold text-star-white tracking-[0.04em]">
            {stat.value}
            {stat.unit && (
              <span className="text-mist text-[0.7em] ml-1">{stat.unit}</span>
            )}
          </div>
          <div className="font-mono text-[10px] text-orbit tracking-[0.1em] uppercase mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
