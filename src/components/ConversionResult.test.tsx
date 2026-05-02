import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import axe from 'axe-core'
import ConversionResult from './ConversionResult'
import { renderWithI18n } from '@/test-utils'

describe('ConversionResult', () => {
  it('shows the em dash when formattedValue is null', () => {
    renderWithI18n(<ConversionResult formattedValue={null} unit="miles" />)
    expect(screen.getByRole('status')).toHaveTextContent('—')
  })

  it('shows the formatted value and unit when provided', () => {
    renderWithI18n(<ConversionResult formattedValue="62.1371" unit="miles" />)
    expect(screen.getByRole('status')).toHaveTextContent('62.1371 miles')
  })

  it('renders an output element with aria-live="polite"', () => {
    renderWithI18n(<ConversionResult formattedValue={null} unit="miles" />)
    const output = screen.getByRole('status')
    expect(output.tagName.toLowerCase()).toBe('output')
    expect(output).toHaveAttribute('aria-live', 'polite')
    expect(output).toHaveAttribute('aria-atomic', 'true')
  })

  it('shows the result label', () => {
    renderWithI18n(<ConversionResult formattedValue="100" unit="kilometers" />)
    expect(screen.getByText('Result')).toBeInTheDocument()
  })

  it('has no accessibility violations when empty', async () => {
    const { container } = renderWithI18n(<ConversionResult formattedValue={null} unit="miles" />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })

  it('has no accessibility violations when populated', async () => {
    const { container } = renderWithI18n(<ConversionResult formattedValue="62.1371" unit="miles" />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })
})
