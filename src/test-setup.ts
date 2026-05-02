import '@testing-library/jest-dom'
import { vi } from 'vitest'

// jsdom's localStorage implementation is incomplete; provide a full mock
const localStorageData: Record<string, string> = {}
vi.stubGlobal('localStorage', {
  getItem: (key: string) => localStorageData[key] ?? null,
  setItem: (key: string, value: string) => {
    localStorageData[key] = value
  },
  removeItem: (key: string) => {
    delete localStorageData[key]
  },
  clear: () => {
    Object.keys(localStorageData).forEach((k) => {
      delete localStorageData[k]
    })
  },
  get length() {
    return Object.keys(localStorageData).length
  },
  key: (index: number) => Object.keys(localStorageData)[index] ?? null,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
