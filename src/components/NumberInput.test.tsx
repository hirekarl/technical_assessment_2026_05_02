import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import axe from 'axe-core'
import NumberInput from './NumberInput'
import { renderWithI18n } from '@/test-utils'

describe('NumberInput', () => {
  it('renders with the provided label', () => {
    renderWithI18n(
      <NumberInput id="test-input" value="" onChange={() => {}} label="Enter a value" />
    )
    expect(screen.getByText('Enter a value')).toBeInTheDocument()
  })

  it('renders the input with the correct id', () => {
    renderWithI18n(
      <NumberInput id="test-input" value="" onChange={() => {}} label="Enter a value" />
    )
    expect(screen.getByRole('spinbutton')).toHaveAttribute('id', 'test-input')
  })

  it('displays the current value', () => {
    renderWithI18n(
      <NumberInput id="test-input" value="42" onChange={() => {}} label="Enter a value" />
    )
    expect(screen.getByRole('spinbutton')).toHaveValue(42)
  })

  it('calls onChange when the user types', async () => {
    const onChange = vi.fn()
    const { user } = renderWithI18n(
      <NumberInput id="test-input" value="" onChange={onChange} label="Enter a value" />
    )
    await user.type(screen.getByRole('spinbutton'), '5')
    expect(onChange).toHaveBeenCalled()
  })

  it('uses ltr direction on the input', () => {
    renderWithI18n(
      <NumberInput id="test-input" value="" onChange={() => {}} label="Enter a value" />
    )
    expect(screen.getByRole('spinbutton')).toHaveAttribute('dir', 'ltr')
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithI18n(
      <NumberInput id="test-input" value="" onChange={() => {}} label="Enter a value" />
    )
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })
})
