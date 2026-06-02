// Reusable Framer Motion variants — declared at module scope so they are not
// re-created on every render (a measurable win for staggered lists).
// Animate transform/opacity only to stay on the compositor.

import type { Variants, Transition } from 'motion/react'

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

/** Parent container that staggers its children's reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

/** Child item paired with {@link staggerContainer}. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export const softSpring: Transition = { type: 'spring', stiffness: 120, damping: 18 }

export const baseTransition: Transition = { duration: 0.5, ease: EASE_OUT_EXPO }

/** Standard whileInView reveal config. */
export const inViewOnce = { once: true, amount: 0.25 } as const
