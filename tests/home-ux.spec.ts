import { test, expect } from '@playwright/test';

test.describe('Home Page UX', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should have an accessible scroll indicator', async ({ page }) => {
		// Wait for animations
		await page.waitForTimeout(4000);

		const scrollButton = page.getByLabel('Scroll to Our Focus section');
		await expect(scrollButton).toBeVisible();
		await expect(scrollButton).toHaveAttribute('type', 'button');

		// Verify interactions
		// Note: Testing actual scrolling behavior is flaky in headless environments
		// so we primarily verify the element structure and accessibility here.
		await expect(scrollButton).toBeEnabled();
	});
});
