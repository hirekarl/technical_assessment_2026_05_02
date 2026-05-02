import { describe, it, expect } from 'vitest'
import { KM_PER_MILE, kmToMiles, milesToKm, convert, formatResult } from './conversion'

describe('KM_PER_MILE', () => {
  it('is the correct conversion factor', () => {
    expect(KM_PER_MILE).toBe(1.60934)
  })
})

describe('kmToMiles', () => {
  it('converts 0 km to 0 miles', () => {
    expect(kmToMiles(0)).toBe(0)
  })

  it('converts 1 km correctly', () => {
    expect(kmToMiles(1)).toBeCloseTo(0.62137, 4)
  })

  it('converts 100 km to ~62.1371 miles', () => {
    expect(kmToMiles(100)).toBeCloseTo(62.1371, 3)
  })

  it('converts negative values', () => {
    expect(kmToMiles(-10)).toBeCloseTo(-6.2137, 4)
  })

  it('converts large values', () => {
    expect(kmToMiles(1_000_000)).toBeCloseTo(621372.74, 0)
  })
})

describe('milesToKm', () => {
  it('converts 0 miles to 0 km', () => {
    expect(milesToKm(0)).toBe(0)
  })

  it('converts 1 mile correctly', () => {
    expect(milesToKm(1)).toBeCloseTo(1.60934, 5)
  })

  it('converts 100 miles to ~160.934 km', () => {
    expect(milesToKm(100)).toBeCloseTo(160.934, 3)
  })

  it('converts negative values', () => {
    expect(milesToKm(-10)).toBeCloseTo(-16.0934, 4)
  })

  it('converts large values', () => {
    expect(milesToKm(1_000_000)).toBeCloseTo(1_609_340, 0)
  })
})

describe('convert', () => {
  it('delegates to kmToMiles when direction is kmToMi', () => {
    expect(convert(100, 'kmToMi')).toBeCloseTo(62.1371, 3)
  })

  it('delegates to milesToKm when direction is miToKm', () => {
    expect(convert(100, 'miToKm')).toBeCloseTo(160.934, 3)
  })

  it('handles zero for both directions', () => {
    expect(convert(0, 'kmToMi')).toBe(0)
    expect(convert(0, 'miToKm')).toBe(0)
  })
})

describe('formatResult', () => {
  it('formats whole numbers without decimals', () => {
    expect(formatResult(100)).toBe('100')
  })

  it('rounds to 4 decimal places', () => {
    expect(formatResult(62.13712)).toBe('62.1371')
  })

  it('trims trailing zeros', () => {
    expect(formatResult(1.5)).toBe('1.5')
  })

  it('formats zero', () => {
    expect(formatResult(0)).toBe('0')
  })

  it('formats large numbers with comma separators', () => {
    expect(formatResult(1000000)).toBe('1,000,000')
  })

  it('handles negative values', () => {
    expect(formatResult(-62.1371)).toBe('-62.1371')
  })

  it('rounds 5th decimal up correctly', () => {
    expect(formatResult(1.23456)).toBe('1.2346')
  })

  it('returns "0" for values that round to zero', () => {
    expect(formatResult(0.00004)).toBe('0')
  })

  it('handles Infinity', () => {
    expect(formatResult(Infinity)).toBe('∞')
  })

  it('handles -Infinity', () => {
    expect(formatResult(-Infinity)).toBe('-∞')
  })
})
