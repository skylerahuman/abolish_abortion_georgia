import { test, expect } from '@playwright/test';

test.describe('Accessibility: Skip Link', () => {
	test('should have a functional skip to main content link', async ({ page }) => {
		await page.goto('/');

		// The skip link should be present
		const skipLink = page.getByRole('link', { name: 'Skip to main content' });
		await expect(skipLink).toBeAttached();

		// Focus the link (simulate Tab as it should be the first element)
		await page.keyboard.press('Tab');

		// Now it should be the active element
		await expect(skipLink).toBeFocused();

		// And it should be visible to sighted users now
		await expect(skipLink).toBeVisible();

		// Click/Enter to activate
		await page.keyboard.press('Enter');

		// The main content should be focused
		const mainContent = page.locator('#main-content');
		await expect(mainContent).toBeFocused();
	});
});
