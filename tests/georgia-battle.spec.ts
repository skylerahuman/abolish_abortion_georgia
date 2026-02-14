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

test('Georgia Battle Timeline Rendering', async ({ page }) => {
  await page.goto('/georgia-battle');

  // Wait for hydration/mounting
  await page.waitForLoadState('networkidle');

  // Check if timeline cards are rendered
  const cards = page.locator('.timeline-card');
  await expect(cards).toHaveCount(4); // Based on the 4 items in timeline.json

  // Scroll to the first card to trigger intersection observer
  const firstCard = cards.first();
  await firstCard.scrollIntoViewIfNeeded();

  // Verify content of the first card (Roe v. Wade)
  await expect(firstCard).toContainText('Roe v. Wade');
  await expect(firstCard).toContainText('Jan 1973');

  // Verify content of the last card (HB 441)
  const lastCard = cards.last();
  await lastCard.scrollIntoViewIfNeeded();
  await expect(lastCard).toContainText('HB 441 Introduced');
  await expect(lastCard).toContainText('2023');
});
