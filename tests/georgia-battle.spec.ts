import { test, expect } from '@playwright/test';

test.describe('Georgia Battle Page', () => {
  test('timeline should render and use optimized animations', async ({ page }) => {
    await page.goto('/georgia-battle');

    // Verify page title
    await expect(page.locator('h1')).toContainText('The Current Battleground');

    // Scroll to the timeline section
    const cards = page.locator('.timeline-card');
    await expect(cards).toHaveCount(4);

    const lastCard = cards.last();
    await lastCard.scrollIntoViewIfNeeded();

    // Allow observer to trigger
    await page.waitForTimeout(1000);

    // Get the inner animating div
    const innerDiv = lastCard.locator('.animate-fade-in-left');
    await expect(innerDiv).toBeVisible();

    // Check inner div style
    const style = await innerDiv.getAttribute('style');
    expect(style).toBeTruthy();
    expect(style).toContain('var(--delay');

    // Check outer div style (should have --delay set by observer)
    const parentStyle = await lastCard.getAttribute('style');
    expect(parentStyle).toContain('--delay');
  });
});
