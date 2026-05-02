import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import axe from 'axe-core'
import App from './App'
import { renderWithI18n, i18n } from '@/test-utils'

describe('App', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  afterEach(() => {
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('konvertr-theme')
  })

  it('renders the app title', () => {
    renderWithI18n(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Konvertr')
  })

  it('renders the tagline', () => {
    renderWithI18n(<App />)
    expect(screen.getByText(/instant kilometer/i)).toBeInTheDocument()
  })

  it('renders the converter form', () => {
    renderWithI18n(<App />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('renders the language switcher', () => {
    renderWithI18n(<App />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('sets dir="ltr" on document for English', async () => {
    renderWithI18n(<App />)
    await i18n.changeLanguage('en')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('sets dir="rtl" on document when Arabic is selected', async () => {
    renderWithI18n(<App />)
    await i18n.changeLanguage('ar')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('sets the lang attribute on document', async () => {
    renderWithI18n(<App />)
    await i18n.changeLanguage('fr')
    expect(document.documentElement.lang).toBe('fr')
  })

  it('renders the theme toggle button', () => {
    renderWithI18n(<App />)
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  it('clicking theme toggle applies dark mode', async () => {
    const { user } = renderWithI18n(<App />)
    await user.click(screen.getByRole('button', { name: /switch to dark mode/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('clicking theme toggle twice returns to light mode', async () => {
    const { user } = renderWithI18n(<App />)
    await user.click(screen.getByRole('button', { name: /switch to dark mode/i }))
    await user.click(screen.getByRole('button', { name: /switch to light mode/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithI18n(<App />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })
})
