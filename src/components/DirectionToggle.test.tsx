import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import axe from 'axe-core'
import DirectionToggle from './DirectionToggle'
import { renderWithI18n } from '@/test-utils'

describe('DirectionToggle', () => {
  it('renders both direction options', () => {
    renderWithI18n(<DirectionToggle value="kmToMi" onChange={() => {}} />)
    expect(screen.getByLabelText(/Kilometers → Miles/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Miles → Kilometers/i)).toBeInTheDocument()
  })

  it('marks the current direction as checked', () => {
    renderWithI18n(<DirectionToggle value="kmToMi" onChange={() => {}} />)
    const kmToMi = screen.getByLabelText(/Kilometers → Miles/i)
    expect(kmToMi).toBeChecked()
  })

  it('marks miToKm as checked when selected', () => {
    renderWithI18n(<DirectionToggle value="miToKm" onChange={() => {}} />)
    const miToKm = screen.getByLabelText(/Miles → Kilometers/i)
    expect(miToKm).toBeChecked()
  })

  it('calls onChange when direction is changed', async () => {
    const onChange = vi.fn()
    const { user } = renderWithI18n(<DirectionToggle value="kmToMi" onChange={onChange} />)
    await user.click(screen.getByLabelText(/Miles → Kilometers/i))
    expect(onChange).toHaveBeenCalledWith('miToKm')
  })

  it('renders a fieldset with a legend', () => {
    renderWithI18n(<DirectionToggle value="kmToMi" onChange={() => {}} />)
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithI18n(<DirectionToggle value="kmToMi" onChange={() => {}} />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })
})
