import { test } from '@playwright/test'

test('can access Index page', async ({ page }) => {
  await page.goto('/')
})
