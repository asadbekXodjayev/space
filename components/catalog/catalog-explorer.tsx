'use client'

import { useMemo, useState, useDeferredValue } from 'react'
import { motion } from 'motion/react'
import { Search, X, Telescope } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ObjectCard } from './object-card'
import { CATEGORY_SEQUENCE } from '@/lib/categories'
import { staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { CelestialSummary, ObjectCategory } from '@/lib/types'

type Filter = ObjectCategory | 'all'

export function CatalogExplorer({ objects }: { objects: CelestialSummary[] }) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const deferredQuery = useDeferredValue(query)

  // Only show category chips that actually have objects.
  const availableCategories = useMemo(() => {
    const present = new Set(objects.map((o) => o.category))
    return CATEGORY_SEQUENCE.filter((c) => present.has(c))
  }, [objects])

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return objects.filter((o) => {
      if (filter !== 'all' && o.category !== filter) return false
      if (!q) return true
      return (
        o.name.toLowerCase().includes(q) ||
        o.type.toLowerCase().includes(q) ||
        o.tagline.toLowerCase().includes(q)
      )
    })
  }, [objects, filter, deferredQuery])

  return (
    <div className="mx-auto w-full max-w-[1280px] px-[clamp(16px,5vw,64px)] pb-24 pt-[clamp(96px,14vh,160px)]">
      {/* Header */}
      <header className="mb-10">
        <p className="mb-3 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-o-iii">
          <span className="block h-px w-6 bg-o-iii" />
          {t('catalog.subtitle')}
        </p>
        <h1 className="font-display text-[clamp(36px,7vw,72px)] font-black uppercase tracking-[0.04em] text-star-white text-balance">
          {t('catalog.title')}
        </h1>
      </header>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-orbit" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('catalog.search')}
            aria-label={t('catalog.searchAria')}
            className="w-full rounded-md border border-dust bg-deep/60 py-2.5 pl-10 pr-10 font-body text-[14px] text-star-white placeholder:text-orbit transition-colors duration-[var(--dur-fast)] focus:border-o-iii focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('catalog.clear')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-orbit transition-colors hover:text-star-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('catalog.all')}
          </FilterChip>
          {availableCategories.map((c) => (
            <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
              {t(`category.${c}`)}
            </FilterChip>
          ))}
        </div>

        <p className="font-mono text-[11px] tracking-[0.1em] text-orbit">
          {t('catalog.count', { count: filtered.length })}
        </p>
      </div>

      {/* Grid / empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-dust/60 py-24 text-center">
          <Telescope className="size-8 text-orbit" aria-hidden />
          <p className="font-body text-[15px] text-mist">{t('catalog.empty')}</p>
        </div>
      ) : (
        <motion.div
          key={`${filter}-${deferredQuery}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {filtered.map((o) => (
            <ObjectCard key={o.slug} object={o} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-[var(--dur-fast)] active:scale-95',
        active
          ? 'border-o-iii bg-o-iii/10 text-o-iii'
          : 'border-dust text-mist hover:border-mist hover:text-star-white'
      )}
    >
      {children}
    </button>
  )
}
