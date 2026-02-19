import { test, expect } from '@playwright/test';

test('Join Form inputs should have correct autocomplete attributes', async ({ page }) => {
	// Navigate to join page
	await page.goto('/join');
	await page.waitForLoadState('networkidle');

	// Step 1: ZIP Code
	const zipInput = page.locator('input[id="zip"]');
	await expect(zipInput).toBeVisible();

	// Expect autocomplete="postal-code"
	await expect(zipInput).toHaveAttribute('autocomplete', 'postal-code');

	// Fill valid ZIP to proceed
	await zipInput.fill('30228');

    // Wait for district to be found (auto-lookup happens on 5 digits)
    // We increase timeout just in case, but default should be fine.
	await expect(page.getByText('Found District')).toBeVisible();

	// Proceed to Step 2
	await page.getByRole('button', { name: 'Next' }).click();
	await page.waitForTimeout(500); // Wait for transition

	// Step 2: Contact Info
	await expect(page.getByText('Step 2 of 3')).toBeVisible();

	// Check First Name
	const firstNameInput = page.locator('input[id="firstName"]');
	await expect(firstNameInput).toBeVisible();
	await expect(firstNameInput).toHaveAttribute('autocomplete', 'given-name');

	// Check Last Name
	const lastNameInput = page.locator('input[id="lastName"]');
	await expect(lastNameInput).toBeVisible();
	await expect(lastNameInput).toHaveAttribute('autocomplete', 'family-name');

	// Check Email
	const emailInput = page.locator('input[id="email"]');
	await expect(emailInput).toBeVisible();
	await expect(emailInput).toHaveAttribute('autocomplete', 'email');

	// Check Address
	const addressInput = page.locator('input[id="address"]');
	await expect(addressInput).toBeVisible();
	await expect(addressInput).toHaveAttribute('autocomplete', 'street-address');

	// Check City
	const cityInput = page.locator('input[id="city"]');
	await expect(cityInput).toBeVisible();
	await expect(cityInput).toHaveAttribute('autocomplete', 'address-level2');

	// Check Phone
	const phoneInput = page.locator('input[id="phone"]');
	await expect(phoneInput).toBeVisible();
	await expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
});
