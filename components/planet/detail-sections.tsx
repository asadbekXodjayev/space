'use client'

import { motion } from 'motion/react'
import { fadeUp, baseTransition, inViewOnce } from '@/lib/motion'
import type { DetailSection } from '@/lib/types'

/** Long-form, numbered prose sections — the "extremely detailed" body. */
export function DetailSections({ sections }: { sections: DetailSection[] }) {
  if (sections.length === 0) return null

  return (
    <div className="flex flex-col gap-12">
      {sections.map((section, index) => (
        <motion.article
          key={section.heading}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          transition={{ ...baseTransition, delay: index * 0.04 }}
          className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-[auto_1fr]"
        >
          <span
            className="font-mono text-[12px] tabular-nums text-orbit md:pt-1.5"
            aria-hidden
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="mb-3 font-display text-[clamp(18px,2.2vw,26px)] font-bold tracking-[0.04em] text-star-white">
              {section.heading}
            </h3>
            <p className="max-w-prose font-body text-[clamp(14px,1.05vw,16px)] leading-[1.8] text-mist">
              {section.body}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
