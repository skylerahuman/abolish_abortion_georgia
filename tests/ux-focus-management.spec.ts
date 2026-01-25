import { test, expect } from '@playwright/test';

test.describe('UX Improvements', () => {
	test('should manage focus correctly between form steps', async ({ page }) => {
		await page.goto('/join');
		await page.waitForLoadState('networkidle');

		// STEP 1
		const zipInput = page.locator('input[id="zip"]');
		await zipInput.fill('30228'); // Hampton, GA
		await page.getByRole('button', { name: 'Find' }).click();

		// Wait for result
		await expect(page.getByText('Your Georgia House District is:')).toBeVisible();

		// Click Next (Step 1 -> Step 2)
		await page.getByRole('button', { name: 'Next' }).click();

		// Wait for transition
		await page.waitForTimeout(500);

		// Verify Focus Step 2
		const firstNameInput = page.locator('input[id="firstName"]');
		await expect(firstNameInput).toBeFocused();

		// Fill Step 2
		await firstNameInput.fill('Test');
		await page.locator('input[id="lastName"]').fill('User');
		await page.locator('input[id="email"]').fill('test@example.com');

		// Click Next (Step 2 -> Step 3)
		await page.getByRole('button', { name: 'Next' }).last().click();

		// Wait for transition
		await page.waitForTimeout(500);

		// STEP 3 - Verify focus
		const homeChurchInput = page.locator('input[id="homeChurch"]');
		await expect(homeChurchInput).toBeFocused();

		// Go Back to Step 2
		await page.getByRole('button', { name: 'Back' }).click();
		await page.waitForTimeout(500);
		// Should focus Step 2 input
		await expect(firstNameInput).toBeFocused();

		// Go Back to Step 1
		await page.getByRole('button', { name: 'Back' }).click();
		await page.waitForTimeout(500);
		// Zip input is hidden (district shown), so no focus or undefined behavior.
		// We are not testing this edge case as it's undefined in spec.

		// BUT: Reset District Finder
		await page.getByRole('button', { name: 'Not your district?' }).click();
		// Zip input appears. Should be focused.
		await expect(zipInput).toBeVisible();
		await expect(zipInput).toBeFocused();
	});
});
