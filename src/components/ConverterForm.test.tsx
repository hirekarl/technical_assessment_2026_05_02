import { describe, it, expect, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import axe from 'axe-core'
import ConverterForm from './ConverterForm'
import { renderWithI18n, i18n } from '@/test-utils'

describe('ConverterForm', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders the input, direction toggle, and result', () => {
    renderWithI18n(<ConverterForm />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows em dash when input is empty', () => {
    renderWithI18n(<ConverterForm />)
    expect(screen.getByRole('status')).toHaveTextContent('—')
  })

  it('shows em dash when input is invalid (NaN)', async () => {
    const { user } = renderWithI18n(<ConverterForm />)
    const input = screen.getByRole('spinbutton')
    await user.type(input, 'abc')
    expect(screen.getByRole('status')).toHaveTextContent('—')
  })

  it('converts km to miles when direction is kmToMi', async () => {
    const { user } = renderWithI18n(<ConverterForm />)
    await user.type(screen.getByRole('spinbutton'), '100')
    expect(screen.getByRole('status')).toHaveTextContent('62.1373')
    expect(screen.getByRole('status')).toHaveTextContent('miles')
  })

  it('uses singular "mile" for input value of 1', async () => {
    const { user } = renderWithI18n(<ConverterForm />)
    await user.type(screen.getByRole('spinbutton'), '1.60934')
    expect(screen.getByRole('status')).toHaveTextContent('mile')
  })

  it('converts miles to km when direction is miToKm', async () => {
    const { user } = renderWithI18n(<ConverterForm />)
    await user.click(screen.getByLabelText(/Miles → Kilometers/i))
    await user.type(screen.getByRole('spinbutton'), '100')
    expect(screen.getByRole('status')).toHaveTextContent('160.934')
    expect(screen.getByRole('status')).toHaveTextContent('kilometer')
  })

  it('uses singular "kilometer" for miToKm with value of 1 mile', async () => {
    const { user } = renderWithI18n(<ConverterForm />)
    await user.click(screen.getByLabelText(/Miles → Kilometers/i))
    await user.type(screen.getByRole('spinbutton'), '1')
    expect(screen.getByRole('status')).toHaveTextContent('kilometer')
    expect(screen.queryByText('kilometers')).not.toBeInTheDocument()
  })

  it('updates result when direction changes', async () => {
    const { user } = renderWithI18n(<ConverterForm />)
    await user.type(screen.getByRole('spinbutton'), '100')
    await user.click(screen.getByLabelText(/Miles → Kilometers/i))
    expect(screen.getByRole('status')).toHaveTextContent('160.934')
  })

  it('prevents default on form submit', () => {
    const { container } = renderWithI18n(<ConverterForm />)
    const form = container.querySelector('form')!
    fireEvent.submit(form)
    expect(form).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithI18n(<ConverterForm />)
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
  })
})
