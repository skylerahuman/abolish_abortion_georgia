import { test, expect } from '@playwright/test';

test('Join Form has correct autocomplete attributes', async ({ page }) => {
	await page.goto('/join');

	// Step 1: Zip Code
	await expect(page.getByLabel('Find Your Georgia House District')).toHaveAttribute(
		'autocomplete',
		'postal-code'
	);

	// Fill zip to get to step 2
	await page.getByLabel('Find Your Georgia House District').fill('30228');

	// Explicitly click Find to be robust
	await page.getByRole('button', { name: 'Find' }).click();

	// Wait for the lookup to complete and button to be ready
	await expect(page.getByText('Found District')).toBeVisible();

	const nextButton = page.getByRole('button', { name: 'Next' });
	await expect(nextButton).toBeEnabled();
	await nextButton.click();

	// Step 2
	await expect(page.getByLabel('First Name')).toHaveAttribute('autocomplete', 'given-name');
	await expect(page.getByLabel('Last Name')).toHaveAttribute('autocomplete', 'family-name');
	await expect(page.getByLabel('Email')).toHaveAttribute('autocomplete', 'email');
	await expect(page.getByLabel('Physical Address')).toHaveAttribute(
		'autocomplete',
		'street-address'
	);
	await expect(page.getByLabel('City')).toHaveAttribute('autocomplete', 'address-level2');
	await expect(page.getByLabel('Cell (Optional)')).toHaveAttribute('autocomplete', 'tel');
});
