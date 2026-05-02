import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('konvertr-lang', 'en')
    })
    await page.reload()
  })

  test('has no axe violations on initial load', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test('has no axe violations with a conversion result', async ({ page }) => {
    await page.getByRole('spinbutton').fill('100')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test('has no axe violations in Arabic (RTL)', async ({ page }) => {
    await page.getByRole('combobox').selectOption('ar')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test('switching to Arabic sets dir="rtl" on html element', async ({ page }) => {
    await page.getByRole('combobox').selectOption('ar')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  })

  test('switching back from Arabic restores dir="ltr"', async ({ page }) => {
    await page.getByRole('combobox').selectOption('ar')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await page.getByRole('combobox').selectOption('en')
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  })

  test('result region has aria-live="polite"', async ({ page }) => {
    const output = page.getByRole('status')
    await expect(output).toHaveAttribute('aria-live', 'polite')
    await expect(output).toHaveAttribute('aria-atomic', 'true')
  })

  test('direction toggle uses radio inputs inside a fieldset', async ({ page }) => {
    const fieldset = page.locator('fieldset')
    await expect(fieldset).toBeVisible()
    const radios = fieldset.getByRole('radio')
    await expect(radios).toHaveCount(2)
  })
})
