import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 2000 } });

test('Verify timeline cards are rendered', async ({ page }) => {
  // Mock clipboard to avoid errors if the share button logic runs (though we are not clicking it)
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

  // Wait for network idle to ensure fetch would have completed (in the old version)
  // or just that the page is ready.
  await page.waitForLoadState('networkidle');

  // Check for the timeline cards
  const cards = page.locator('.timeline-card');
  await expect(cards).toHaveCount(4);

  // Wait for a moment for intersection observer to fire
  await page.waitForTimeout(1000);

  // Scroll to make sure
  await cards.first().scrollIntoViewIfNeeded();
  await expect(cards.first()).toContainText('Roe v. Wade');

  await cards.last().scrollIntoViewIfNeeded();
  await expect(cards.last()).toContainText('HB 441 Introduced');
});
