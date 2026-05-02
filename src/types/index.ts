export type ConversionDirection = 'kmToMi' | 'miToKm'

export type LocaleCode = 'en' | 'en-GB' | 'es' | 'fr' | 'ar'

export interface LocaleMeta {
  code: LocaleCode
  nativeName: string
  dir: 'ltr' | 'rtl'
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', nativeName: 'English (US)', dir: 'ltr' },
  { code: 'en-GB', nativeName: 'English (UK)', dir: 'ltr' },
  { code: 'es', nativeName: 'Español', dir: 'ltr' },
  { code: 'fr', nativeName: 'Français', dir: 'ltr' },
  { code: 'ar', nativeName: 'العربية', dir: 'rtl' },
]

export const RTL_LOCALES: LocaleCode[] = ['ar']
