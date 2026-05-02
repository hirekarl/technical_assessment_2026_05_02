import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from './locales/en/translation.json'
import enGBTranslation from './locales/en-GB/translation.json'
import esTranslation from './locales/es/translation.json'
import frTranslation from './locales/fr/translation.json'
import arTranslation from './locales/ar/translation.json'

export const SUPPORTED_LOCALES = ['en', 'en-GB', 'es', 'fr', 'ar'] as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      'en-GB': { translation: enGBTranslation },
      es: { translation: esTranslation },
      fr: { translation: frTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LOCALES,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'konvertr-lang',
    },
  })

export default i18n
