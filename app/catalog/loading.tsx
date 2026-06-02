import { ObjectCardSkeleton } from '@/components/catalog/object-card'

// Mirrors the catalog layout (header + responsive grid) while the segment loads.
export default function CatalogLoading() {
  return (
    <div
      className="min-h-screen bg-void"
      role="status"
      aria-busy="true"
      aria-label="Loading catalog"
    >
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(16px,5vw,64px)] pt-[clamp(96px,14vh,160px)]">
        {/* Header skeleton: subtitle bar + title block */}
        <div className="mb-10 flex flex-col gap-4">
          <div className="relative h-3 w-40 overflow-hidden rounded bg-nebula-shadow/60">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-12 w-72 overflow-hidden rounded bg-nebula-shadow/80">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>

        {/* Grid of card skeletons matching the explorer's responsive columns */}
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, i) => (
            <ObjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
