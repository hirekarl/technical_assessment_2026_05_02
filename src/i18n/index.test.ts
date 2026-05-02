import { describe, it, expect } from 'vitest'
import i18n, { SUPPORTED_LOCALES } from './index'

describe('i18n', () => {
  it('is initialized', () => {
    expect(i18n.isInitialized).toBe(true)
  })

  it('has all supported locales', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'en-GB', 'es', 'fr', 'ar'])
  })

  it('falls back to en', () => {
    const fallback = i18n.options.fallbackLng
    const resolved = Array.isArray(fallback) ? fallback[0] : fallback
    expect(resolved).toBe('en')
  })

  it('has translation resources for all locales', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(i18n.hasResourceBundle(locale, 'translation')).toBe(true)
    }
  })

  it('translates known keys in English', () => {
    expect(i18n.t('units.km', { lng: 'en' })).toBe('kilometer')
    expect(i18n.t('units.km', { lng: 'en-GB' })).toBe('kilometre')
  })
})
