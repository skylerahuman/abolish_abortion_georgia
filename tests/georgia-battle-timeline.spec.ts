import { test, expect } from '@playwright/test';

test('Georgia Battle Timeline Rendering', async ({ page }) => {
  await page.goto('/georgia-battle');

  // Wait for hydration/rendering
  await page.waitForLoadState('networkidle');

  // Check if timeline cards exist in the DOM (outer containers)
  const cards = page.locator('.timeline-card');
  await expect(cards).toHaveCount(4);

  // Scroll each card into view to trigger observer
  for (let i = 0; i < 4; i++) {
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();
    // Wait a bit for observer to fire
    await page.waitForTimeout(200);
  }

  // Wait for animations to complete (max delay is index 3 * 150ms = 450ms)
  await page.waitForTimeout(1000);

  // Check that content inside cards is present (the inner div)
  const innerContent = page.locator('.timeline-card > div');
  await expect(innerContent).toHaveCount(4);
});
