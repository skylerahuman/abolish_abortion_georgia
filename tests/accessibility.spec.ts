import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('Skip to main content link works correctly', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Press Tab to focus the first element, which should be the skip link
    await page.keyboard.press('Tab');

    // Verify the skip link is visible and focused
    const skipLink = page.getByText('Skip to main content');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toBeFocused();

    // Activate the link
    await page.keyboard.press('Enter');

    // Verify the URL has updated (optional, but good practice)
    await expect(page).toHaveURL(/#main-content/);

    // Verify focus has moved to the main content area
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });
});
