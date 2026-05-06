import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-void text-star-white p-8">
      <h1 className="font-display text-[clamp(48px,8vw,96px)] font-black tracking-[0.06em] uppercase text-star-white mb-4">
        404
      </h1>
      <h2 className="font-display text-[clamp(18px,3vw,28px)] font-semibold tracking-[0.1em] uppercase text-mist mb-8">
        Lost in Space
      </h2>
      <p className="font-body text-[16px] text-orbit text-center max-w-md mb-12 leading-relaxed">
        The celestial body you&apos;re looking for has drifted beyond our observable universe. Perhaps it was consumed by a black hole.
      </p>
      <Link
        href="/"
        className="font-display text-[11px] font-semibold tracking-[0.14em] text-o-iii uppercase px-6 py-3 border border-o-iii rounded-sm transition-all duration-200 hover:bg-o-iii hover:text-void"
      >
        Return to Solar System
      </Link>
    </div>
  )
}
