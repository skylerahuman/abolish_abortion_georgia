import { test, expect } from '@playwright/test';

test('Skip to Main Content link is accessible', async ({ page }) => {
	await page.goto('/');

	// Press Tab to focus the first element, which should be the skip link
	await page.keyboard.press('Tab');

	const skipLink = page.getByRole('link', { name: 'Skip to Main Content' });

	// Verify it's focused and visible (it should become visible on focus)
	await expect(skipLink).toBeFocused();
	await expect(skipLink).toBeVisible();

	// Verify href
	await expect(skipLink).toHaveAttribute('href', '#main-content');

	// Trigger the link
	await page.keyboard.press('Enter');

	// Verify focus moves to main content
	const mainContent = page.locator('#main-content');
	await expect(mainContent).toBeFocused();
});
