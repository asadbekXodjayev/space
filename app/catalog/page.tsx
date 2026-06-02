import type { Metadata } from 'next'
import { StarField } from '@/components/canvas/star-field'
import { TopNav } from '@/components/chrome/top-nav'
import { CatalogExplorer } from '@/components/catalog/catalog-explorer'
import { SUMMARIES } from '@/data/catalog'

export const metadata: Metadata = {
  title: 'Catalog | COSMOS',
  description:
    'Browse every object in the COSMOS atlas — planets, moons, stars, nebulae, black holes and more.',
}

export default function CatalogPage() {
  return (
    <main className="relative min-h-screen bg-void">
      {/* Fixed full-bleed starfield backdrop */}
      <StarField />
      {/* Fixed top chrome; CatalogExplorer reserves its own top padding for it */}
      <TopNav backHref="/" />
      <div className="relative z-10">
        <CatalogExplorer objects={SUMMARIES} />
      </div>
    </main>
  )
}
