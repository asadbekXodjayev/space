'use client'

import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'
import { LANGUAGE_STORAGE_KEY, languages, type AppLanguage } from '@/lib/i18n/settings'

/**
 * Wraps the app in the i18next context and restores the persisted language
 * preference on mount. Rendering identical (English) markup on both server and
 * client keeps hydration mismatch-free; the stored language is applied after
 * mount only if it differs.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored && languages.includes(stored as AppLanguage) && stored !== i18n.language) {
      void i18n.changeLanguage(stored)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
