// Server component: lightweight full-screen route loader.
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Initializing"
      className="flex min-h-screen items-center justify-center bg-void"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinning orbit ring: dim outer ring + teal-topped inner spinner */}
        <div className="relative size-12" aria-hidden>
          <div className="absolute inset-0 rounded-full border-2 border-dust" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-o-iii" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-orbit">
          Initializing
        </span>
      </div>
    </div>
  )
}
