import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import axe from 'axe-core'
import LanguageSwitcher from './LanguageSwitcher'
import { renderWithI18n, i18n } from '@/test-utils'

describe('LanguageSwitcher', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  afterEach(() => {
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
  })

  it('renders a select element', () => {
    renderWithI18n(<LanguageSwitcher />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders all 5 locale options', () => {
    renderWithI18n(<LanguageSwitcher />)
    expect(screen.getAllByRole('option')).toHaveLength(5)
  })

  it('shows the current locale as selected', () => {
    renderWithI18n(<LanguageSwitcher />)
    expect(screen.getByRole('combobox')).toHaveValue('en')
  })

  it('changes language when a new option is selected', async () => {
    const { user } = renderWithI18n(<LanguageSwitcher />)
    await user.selectOptions(screen.getByRole('combobox'), 'es')
    expect(i18n.language).toBe('es')
  })

  it('has a visually hidden label', () => {
    renderWithI18n(<LanguageSwitcher />)
    const label = screen.getByText('Language')
    expect(label).toHaveClass('sr-only')
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithI18n(<LanguageSwitcher />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })
})
