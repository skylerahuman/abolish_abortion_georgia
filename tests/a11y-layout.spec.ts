import { test, expect } from '@playwright/test';

test.describe('Accessibility Improvements - Layout', () => {
	test('Skip to main content link works', async ({ page }) => {
		// 1. Visit the home page
		await page.goto('/');

		// 2. Initial state: Link should be visually hidden (off-screen)
		const skipLink = page.getByRole('link', { name: 'Skip to Main Content' });

		// It might be in the DOM but off-screen. Playwright's `toBeVisible()` checks if it's on-screen.
		// If we use `absolute -top-96`, it's technically "visible" to the browser but off-viewport.
		// Let's check its CSS top property or just focus it.

		// 3. Press Tab to focus the first element
		await page.keyboard.press('Tab');

		// 4. Verify the skip link is now focused
		await expect(skipLink).toBeFocused();

		// 5. Verify the skip link is now visible on screen (e.g. top property changed)
		// We can check if it's within the viewport
		const box = await skipLink.boundingBox();
		expect(box?.y).toBeGreaterThanOrEqual(0); // Should be in the viewport

		// 6. Press Enter to activate the link
		await page.keyboard.press('Enter');

		// 7. Verify focus moves to the main content area
		const mainContent = page.locator('#main-content');
		await expect(mainContent).toBeFocused();
	});
});
