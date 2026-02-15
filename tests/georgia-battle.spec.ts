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

  // Verify timeline content
  // Scroll to trigger IntersectionObserver
  const roeCard = page.locator('.timeline-card[data-id="roe"]');
  await roeCard.scrollIntoViewIfNeeded();
  // Wait for animation/observer
  await page.waitForTimeout(500);
  await expect(page.getByText('Roe v. Wade')).toBeVisible();

  const dobbsCard = page.locator('.timeline-card[data-id="dobbs"]');
  await dobbsCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(page.getByText('Dobbs v. Jackson')).toBeVisible();
});
