'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface for observability; replace with your telemetry sink if desired.
    console.error('[COSMOS] route error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void p-8 text-center">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-h-alpha">
        Signal lost
      </p>
      <h1 className="mb-4 font-display text-[clamp(28px,5vw,48px)] font-black uppercase tracking-[0.06em] text-star-white">
        Something went wrong
      </h1>
      <p className="mb-10 max-w-md font-body text-[15px] leading-relaxed text-mist">
        An unexpected disturbance interrupted the observation. You can retry the
        last action or return to the solar system.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md border border-o-iii px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-o-iii transition-all duration-[var(--dur-fast)] hover:bg-o-iii hover:text-void active:scale-[0.97]"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-dust px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-mist transition-all duration-[var(--dur-fast)] hover:border-star-white hover:text-star-white active:scale-[0.97]"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
