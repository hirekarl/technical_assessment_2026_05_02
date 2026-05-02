import type { ConversionDirection } from '@/types'

export const KM_PER_MILE = 1.60934

export const kmToMiles = (km: number): number => km / KM_PER_MILE

export const milesToKm = (miles: number): number => miles * KM_PER_MILE

export const convert = (value: number, direction: ConversionDirection): number =>
  direction === 'kmToMi' ? kmToMiles(value) : milesToKm(value)

export const formatResult = (value: number): string => {
  const rounded = Math.round(value * 10000) / 10000
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  })
}
