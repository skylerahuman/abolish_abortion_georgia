import { test, expect } from '@playwright/test';

test('Georgia Battle Timeline Rendering', async ({ page }) => {
  // Set a large viewport to ensure intersection is easier
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto('/georgia-battle');

  // Wait for at least one timeline card to be present (handles async fetch)
  const firstCard = page.locator('.timeline-card').first();
  await expect(firstCard).toBeVisible({ timeout: 10000 });

  const cards = page.locator('.timeline-card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  // Iterate through all cards
  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();

    // Allow time for IntersectionObserver to fire and animation to start
    // The animation has a delay of index * 150ms.
    // For 4 items, max delay is 450ms + 600ms duration.
    // We should wait enough.
    await expect(card.locator('h3')).toBeVisible({ timeout: 10000 });
  }
});
