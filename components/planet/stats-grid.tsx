'use client'

import { motion } from 'motion/react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { inViewOnce } from '@/lib/motion'
import type { ObjectStat } from '@/lib/types'

export function StatsGrid({ stats }: { stats: ObjectStat[] }) {
  if (stats.length === 0) return null

  return (
    <motion.dl
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-dust"
      style={{ background: 'var(--dust)' }}
    >
      {stats.map((stat) => (
        <motion.div key={stat.key} variants={staggerItem} className="bg-deep p-5">
          <dd className="font-display text-[clamp(16px,2vw,24px)] font-bold tracking-[0.04em] text-star-white">
            {stat.value}
            {stat.unit && <span className="ml-1 text-[0.7em] text-mist">{stat.unit}</span>}
          </dd>
          <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-orbit">
            {stat.label}
          </dt>
        </motion.div>
      ))}
    </motion.dl>
  )
}
