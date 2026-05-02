import { test, expect, type Page } from '@playwright/test'

async function selectDirection(page: Page, dir: 'kmToMi' | 'miToKm') {
  await page.locator(`label:has(input[value="${dir}"])`).click()
}

test.describe('Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('konvertr-lang', 'en')
    })
    await page.reload()
  })

  test('displays the app title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Konvertr')
  })

  test('shows em dash by default when input is empty', async ({ page }) => {
    await expect(page.getByRole('status')).toContainText('—')
  })

  test('converts 100 km to miles', async ({ page }) => {
    await page.getByRole('spinbutton').fill('100')
    await expect(page.getByRole('status')).toContainText('62.1373')
    await expect(page.getByRole('status')).toContainText('miles')
  })

  test('converts 100 miles to km', async ({ page }) => {
    await selectDirection(page, 'miToKm')
    await page.getByRole('spinbutton').fill('100')
    await expect(page.getByRole('status')).toContainText('160.934')
    await expect(page.getByRole('status')).toContainText('kilometer')
  })

  test('updates result when direction is toggled', async ({ page }) => {
    await page.getByRole('spinbutton').fill('100')
    await expect(page.getByRole('status')).toContainText('62.1373')
    await selectDirection(page, 'miToKm')
    await expect(page.getByRole('status')).toContainText('160.934')
  })

  test('clears result when input is cleared', async ({ page }) => {
    await page.getByRole('spinbutton').fill('100')
    await expect(page.getByRole('status')).toContainText('62.1373')
    await page.getByRole('spinbutton').fill('')
    await expect(page.getByRole('status')).toContainText('—')
  })

  test('is keyboard navigable', async ({ page }) => {
    // Tab from language switcher to number input
    await page.getByRole('combobox').focus()
    await page.keyboard.press('Tab')
    const input = page.getByRole('spinbutton')
    await expect(input).toBeFocused()
    await page.keyboard.type('50')
    await expect(page.getByRole('status')).toContainText('miles')
  })

  test('language switcher shows all 5 options', async ({ page }) => {
    const options = await page.getByRole('combobox').locator('option').all()
    expect(options).toHaveLength(5)
  })

  test('switching to Spanish translates UI', async ({ page }) => {
    await page.getByRole('combobox').selectOption('es')
    await expect(page.getByText('Dirección de conversión')).toBeVisible()
  })

  test('switching to French translates UI', async ({ page }) => {
    await page.getByRole('combobox').selectOption('fr')
    await expect(page.getByText('Sens de conversion')).toBeVisible()
  })

  test('en-GB shows "kilometre" spelling in result', async ({ page }) => {
    await page.getByRole('combobox').selectOption('en-GB')
    await selectDirection(page, 'miToKm')
    await page.getByRole('spinbutton').fill('1')
    await expect(page.getByRole('status')).toContainText('kilometre')
  })
})
