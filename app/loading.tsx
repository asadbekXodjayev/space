export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-dust" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-o-iii animate-spin" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.14em] text-orbit uppercase">
          Initializing
        </span>
      </div>
    </div>
  )
}
