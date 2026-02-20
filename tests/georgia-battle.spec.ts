import { test, expect } from '@playwright/test';

test('Georgia Battle Share Button Feedback', async ({ page }) => {
  page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));
  page.on('pageerror', exception => console.log(`BROWSER ERROR: "${exception}"`));

  // Mock clipboard API
  await page.addInitScript(() => {
    try {
        // @ts-ignore
        if (!navigator.clipboard) {
            // @ts-ignore
            navigator.clipboard = {};
        }
        // @ts-ignore
        navigator.clipboard.writeText = async (text) => { console.log(`Clipboard writeText called with: ${text}`); };
    } catch (e) {
        console.error("Failed to mock clipboard", e);
    }
  });

  await page.goto('/georgia-battle');
  await page.waitForLoadState('networkidle');

  // Verify mock
  const isMocked = await page.evaluate(() => {
      // @ts-ignore
      return !!navigator.clipboard?.writeText;
  });
  console.log('Clipboard mocked:', isMocked);

  // The initial state has aria-label="Share this page"
  const shareButton = page.getByLabel('Share this page');
  await expect(shareButton).toBeVisible();

  console.log('Clicking button...');
  // Click the share button
  await shareButton.click();
  console.log('Button clicked.');

  // Expect the button text to change to "Copied!"
  await expect(page.getByText('Copied! ✓')).toBeVisible();

  // Also expect the aria-label to update
  await expect(page.getByLabel('Link copied')).toBeVisible();
});

test('Georgia Battle Timeline Renders', async ({ page }) => {
  await page.goto('/georgia-battle');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.timeline-card')).toHaveCount(4);
});
