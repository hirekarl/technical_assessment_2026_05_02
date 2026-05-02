import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import axe from 'axe-core'
import ThemeToggle from './ThemeToggle'
import { renderWithI18n, i18n } from '@/test-utils'

describe('ThemeToggle', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders a button', () => {
    renderWithI18n(<ThemeToggle theme="light" onToggle={vi.fn()} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has aria-label for switching to dark mode when theme is light', () => {
    renderWithI18n(<ThemeToggle theme="light" onToggle={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to dark mode/i)
  })

  it('has aria-label for switching to light mode when theme is dark', () => {
    renderWithI18n(<ThemeToggle theme="dark" onToggle={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to light mode/i)
  })

  it('calls onToggle when clicked', () => {
    const handleToggle = vi.fn()
    renderWithI18n(<ThemeToggle theme="light" onToggle={handleToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleToggle).toHaveBeenCalledOnce()
  })

  it('has no accessibility violations in light theme', async () => {
    const { container } = renderWithI18n(<ThemeToggle theme="light" onToggle={vi.fn()} />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })

  it('has no accessibility violations in dark theme', async () => {
    const { container } = renderWithI18n(<ThemeToggle theme="dark" onToggle={vi.fn()} />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })
})
