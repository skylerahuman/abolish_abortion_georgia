import { test, expect } from '@playwright/test';

test('verify bill analysis page', async ({ page }) => {
  await page.goto('/bill-analysis');
  await page.screenshot({ path: 'tests/screenshots/verification-bill-analysis.png', fullPage: true });
});
