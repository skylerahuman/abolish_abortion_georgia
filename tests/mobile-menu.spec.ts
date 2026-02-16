import { test, expect } from '@playwright/test';

test('Mobile menu accessibility', async ({ page }) => {
	// Emulate mobile viewport
	await page.setViewportSize({ width: 375, height: 667 });
	await page.goto('/');

	// Wait for the button to be visible
	const menuButton = page.getByLabel('Toggle menu');
	await expect(menuButton).toBeVisible();

	// Initial state check - expecting failure before fix
	// These assertions should fail before the fix is implemented

	// Check aria-controls
	await expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');

	// Check aria-expanded initial state
	await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

	// Check focus styles
	await expect(menuButton).toHaveClass(/focus-visible:ring-2/);

	// Wait for hydration/load
	await page.waitForLoadState('networkidle');

	// Interaction test
	await menuButton.click();

	// Check aria-expanded after click
	await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

	// Check if menu is visible and has correct ID
	const menu = page.locator('#mobile-menu');
	await expect(menu).toBeVisible();

	// Close menu
	await menuButton.click();
	await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	await expect(menu).not.toBeVisible();
});
