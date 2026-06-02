import Link from 'next/link'

// Server component: renders before client i18n is ready, so copy stays English.
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-6 text-star-white">
      {/* Faint decorative orbit ring for atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dust/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[min(52vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dust/10"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="mb-4 font-display text-[clamp(64px,14vw,180px)] font-black leading-none tracking-[0.06em] text-star-white">
          404
        </h1>
        <h2 className="mb-8 font-display text-[clamp(18px,3vw,28px)] font-semibold uppercase tracking-[0.1em] text-mist">
          Lost in Space
        </h2>
        <p className="mb-12 max-w-md font-body text-[16px] leading-relaxed text-orbit">
          The celestial body you&apos;re looking for has drifted beyond our
          observable universe. Perhaps it was consumed by a black hole.
        </p>
        <Link
          href="/"
          className="rounded-md border border-o-iii px-6 py-3 font-display text-[11px] uppercase tracking-widest text-o-iii transition-colors duration-[var(--dur-base)] hover:bg-o-iii hover:text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-o-iii active:scale-[0.97]"
        >
          Return to Solar System
        </Link>
      </div>
    </main>
  )
}
