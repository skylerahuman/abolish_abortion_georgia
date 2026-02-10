import { test, expect } from '@playwright/test';

test('verify bill analysis page', async ({ page }) => {
  await page.goto('/bill-analysis');
  await page.screenshot({ path: 'test-results/verification.png', fullPage: true });
});
