'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

export interface TopNavProps {
  /** When set, renders a back control on the left that links here. */
  backHref?: string
  /** Optional contextual title shown beside/under the wordmark. */
  title?: string
  /** Show the right-side catalog ghost link. Defaults to true. */
  showCatalogLink?: boolean
}

/** Fixed, blurred top chrome shared across screens: back control, COSMOS wordmark, catalog link, language switcher. */
export function TopNav({ backHref, title, showCatalogLink = true }: TopNavProps) {
  const { t } = useTranslation()

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-dust/50 bg-deep/50 py-3 backdrop-blur-md"
    >
      <nav
        aria-label={t('app.title')}
        className="mx-auto flex w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
      >
        {/* Left: optional back control + wordmark (+ optional contextual title) */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-1.5 rounded-md font-body text-[13px] text-mist transition-colors duration-[var(--dur-fast)] hover:text-o-iii focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-o-iii active:scale-95"
            >
              <ArrowLeft className="size-4" aria-hidden />
              <span className="hidden sm:inline">{t('nav.back')}</span>
            </Link>
          )}

          <div className="flex min-w-0 items-baseline gap-2.5">
            <Link
              href="/"
              className="rounded-md font-display text-[14px] font-black tracking-widest text-star-white transition-colors duration-[var(--dur-fast)] hover:text-o-iii focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-o-iii active:scale-95"
            >
              {t('app.title')}
            </Link>

            {title && (
              <span className="hidden truncate font-mono text-[11px] uppercase tracking-[0.12em] text-orbit sm:inline">
                {title}
              </span>
            )}
          </div>
        </div>

        {/* Right: catalog ghost link + language switcher */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {showCatalogLink && (
            <Link
              href="/catalog"
              className="rounded-md border border-dust px-4 py-2 font-display text-[11px] uppercase tracking-[0.14em] text-mist transition-colors duration-[var(--dur-fast)] hover:border-o-iii hover:text-o-iii focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-o-iii active:scale-95"
            >
              {t('nav.catalog')}
            </Link>
          )}
          <LanguageSwitcher />
        </div>
      </nav>
    </motion.header>
  )
}
