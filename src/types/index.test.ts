import { describe, it, expect } from 'vitest'
import { LOCALES, RTL_LOCALES } from './index'

describe('LOCALES', () => {
  it('contains 5 locales', () => {
    expect(LOCALES).toHaveLength(5)
  })

  it('has en as LTR', () => {
    expect(LOCALES.find((l) => l.code === 'en')?.dir).toBe('ltr')
  })

  it('has ar as RTL', () => {
    expect(LOCALES.find((l) => l.code === 'ar')?.dir).toBe('rtl')
  })

  it('includes all expected locale codes', () => {
    const codes = LOCALES.map((l) => l.code)
    expect(codes).toEqual(['en', 'en-GB', 'es', 'fr', 'ar'])
  })
})

describe('RTL_LOCALES', () => {
  it('contains only ar', () => {
    expect(RTL_LOCALES).toEqual(['ar'])
  })
})
