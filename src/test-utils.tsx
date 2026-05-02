import { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'

export function renderWithI18n(ui: ReactElement, options?: RenderOptions) {
  const user = userEvent.setup()
  const result = render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>, options)
  return { ...result, user }
}

export { i18n }
export * from '@testing-library/react'
