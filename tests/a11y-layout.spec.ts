import { test, expect } from '@playwright/test';

test('Skip to main content link works', async ({ page }) => {
	await page.goto('/');

	// The skip link should be the first focusable element
	await page.keyboard.press('Tab');

	const skipLink = page.getByRole('link', { name: 'Skip to Main Content' });

	await expect(skipLink).toBeFocused();
	await expect(skipLink).toBeVisible(); // Should be visible when focused

	// Activate the link
	await page.keyboard.press('Enter');

	// Verify focus moves to main content
	await expect(page.locator('#main-content')).toBeFocused();
});
