// i18n configuration — single source of truth for languages & namespaces.
// Currently ships English only; adding a language is: drop a locale file in
// locales/<lng>/common.json, import it in ./index.ts, and append the code here.

export const defaultNS = 'common' as const
export const fallbackLng = 'en' as const
export const languages = ['en'] as const

export type AppLanguage = (typeof languages)[number]

export const LANGUAGE_STORAGE_KEY = 'cosmos-language'
