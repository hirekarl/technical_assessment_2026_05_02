import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTheme } from './useTheme'

const mockMatchMedia = (matches: boolean) => {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.removeItem('konvertr-theme')
    document.documentElement.classList.remove('dark')
    mockMatchMedia(false)
  })

  it('defaults to light when no stored preference and system prefers light', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('defaults to dark when system prefers dark and nothing is stored', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('uses stored dark preference', () => {
    localStorage.setItem('konvertr-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('uses stored light preference over system dark preference', () => {
    localStorage.setItem('konvertr-theme', 'light')
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('toggle switches theme from light to dark', () => {
    const { result } = renderHook(() => useTheme())
    act(() => {
      result.current.toggle()
    })
    expect(result.current.theme).toBe('dark')
  })

  it('toggle switches theme from dark to light', () => {
    localStorage.setItem('konvertr-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    act(() => {
      result.current.toggle()
    })
    expect(result.current.theme).toBe('light')
  })

  it('adds dark class to documentElement when theme is dark', () => {
    localStorage.setItem('konvertr-theme', 'dark')
    renderHook(() => useTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class from documentElement when theme is light', () => {
    document.documentElement.classList.add('dark')
    renderHook(() => useTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('persists theme to localStorage after toggle', () => {
    const { result } = renderHook(() => useTheme())
    act(() => {
      result.current.toggle()
    })
    expect(localStorage.getItem('konvertr-theme')).toBe('dark')
  })
})
