import { test, expect } from '@playwright/test';

test.describe('Layout Accessibility', () => {
  test('has accessible skip to main content link', async ({ page }) => {
    await page.goto('/');

    // Press Tab to focus the first element
    await page.keyboard.press('Tab');

    // The skip link should be the first focusable element
    const skipLink = page.locator('a[href="#main-content"]');

    // It should exist
    await expect(skipLink).toBeAttached();

    // It should be focused
    await expect(skipLink).toBeFocused();

    // It should be visible when focused (assuming standard skip link patterns)
    await expect(skipLink).toBeVisible();

    // It should have correct text
    await expect(skipLink).toHaveText('Skip to Main Content');
  });

  test('skip link targets main content correctly', async ({ page }) => {
    await page.goto('/');

    // Navigate to skip link
    await page.keyboard.press('Tab');

    // Activate it
    await page.keyboard.press('Enter');

    // Verify the main content wrapper has focus
    // Note: The target element must have tabindex="-1" to receive focus programmatically
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });
});
