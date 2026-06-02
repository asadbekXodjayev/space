'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { languages, LANGUAGE_STORAGE_KEY, type AppLanguage } from '@/lib/i18n/settings'
import { cn } from '@/lib/utils'

const menuVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = i18n.language as AppLanguage

  const change = (lng: AppLanguage) => {
    void i18n.changeLanguage(lng)
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lng)
    setOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.label')}
        className="group flex items-center gap-2 rounded-md border border-dust bg-deep/60 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mist backdrop-blur-sm transition-colors duration-[var(--dur-fast)] hover:border-o-iii hover:text-o-iii active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Globe className="size-3.5" aria-hidden />
        <span>{current.toUpperCase()}</span>
        <ChevronDown
          className={cn('size-3 transition-transform duration-[var(--dur-fast)]', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* click-away */}
            <div className="fixed inset-0 z-40" aria-hidden onClick={() => setOpen(false)} />
            <motion.ul
              role="listbox"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-dust bg-deep/95 p-1 shadow-[var(--shadow-lg)] backdrop-blur-md"
            >
              {languages.map((lng) => (
                <li key={lng}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={current === lng}
                    onClick={() => change(lng)}
                    className="flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left font-body text-[13px] text-star-white transition-colors duration-[var(--dur-fast)] hover:bg-nebula-shadow focus-visible:bg-nebula-shadow"
                  >
                    {t(`language.${lng}`)}
                    {current === lng && <Check className="size-3.5 text-o-iii" aria-hidden />}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
