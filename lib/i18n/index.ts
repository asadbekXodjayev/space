'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en/common.json'
import { defaultNS, fallbackLng } from './settings'

// Initialise exactly once. The guard keeps this safe when the module is
// evaluated on the server during RSC rendering of client components.
if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      en: { common: en },
    },
    lng: fallbackLng,
    fallbackLng,
    defaultNS,
    ns: [defaultNS],
    interpolation: { escapeValue: false }, // React already escapes
    react: { useSuspense: false }, // avoid Suspense boundaries during hydration
  })
}

export default i18n
