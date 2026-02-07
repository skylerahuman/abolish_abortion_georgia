import { test, expect } from '@playwright/test';

test('Join Form Input Attributes for Mobile/Autofill', async ({ page }) => {
	await page.goto('/join');

	// STEP 1: District Finder
	const zipInput = page.locator('#zip');
	await expect(zipInput).toBeVisible();

	// Verify Zip Code attributes
	await expect(zipInput).toHaveAttribute('autocomplete', 'postal-code');
	await expect(zipInput).toHaveAttribute('inputmode', 'numeric');
	await expect(zipInput).toHaveAttribute('pattern', '[0-9]*');

	// Fill zip and proceed to Step 2
	await zipInput.fill('30030');
	await page.getByRole('button', { name: 'Find' }).click();
	await expect(page.getByText('Your Georgia House District is:')).toBeVisible();

	await page.getByRole('button', { name: 'Next' }).click();

	// STEP 2: Contact Info
	const firstNameInput = page.locator('#firstName');
	const lastNameInput = page.locator('#lastName');
	const emailInput = page.locator('#email');
	const phoneInput = page.locator('#phone');

	await expect(firstNameInput).toBeVisible();

	// Verify Step 2 attributes
	await expect(firstNameInput).toHaveAttribute('autocomplete', 'given-name');
	await expect(lastNameInput).toHaveAttribute('autocomplete', 'family-name');
	await expect(emailInput).toHaveAttribute('autocomplete', 'email');
	await expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
});
