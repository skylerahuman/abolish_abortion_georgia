import { test, expect } from '@playwright/test';

test('Join Form UX improvements', async ({ page }) => {
	await page.goto('/join');

	// STEP 1: District Finder
	const zipInput = page.getByPlaceholder('Enter 5-digit ZIP Code');
	await zipInput.fill('30228');

	// Explicitly click find to ensure lookup happens if auto-trigger fails or is slow
	// Use .first() as per previous strict mode fix
	const findButton = page.getByRole('button', { name: 'Find' }).first();

	// Wait for button to be enabled before clicking (it might be disabled while "typing" if logic is weird, or loading)
	// Actually, logic says disabled={isLoading || zipCode.length !== 5}
	// We filled 5 chars.
	await expect(findButton).toBeEnabled();
	await findButton.click();

	// Wait for result
	// Increased timeout to 10s to account for animation/network variability
	await expect(page.getByText('Found District')).toBeVisible({ timeout: 10000 });

	// CHECK 1: Focus Management on Result
	const resultContainer = page.getByText('Found District').locator('..');
	await expect(resultContainer).toBeFocused();

	// Proceed to Step 2
	// Use .first() to avoid strict mode violation if multiple buttons exist (e.g. from transitions)
	await page.getByRole('button', { name: 'Next' }).first().click();

	// CHECK 2: Focus Management on Step Change
	await expect(page.getByLabel('First Name')).toBeFocused();

	// CHECK 3: Validation on Step 2
	// Target the visible Next button for step 2. Using .last() as it's likely the one appended/visible.
	// Filtering by visible might be better but .last() + strict click worked in local thought
	const nextButtonStep2 = page.getByRole('button', { name: 'Next' }).last();

	await nextButtonStep2.click();

	// We should NOT see "Home Church" (Step 3)
	await expect(page.getByLabel('Home Church')).not.toBeVisible();

	// We SHOULD see the error message
	await expect(page.getByRole('alert')).toHaveText('Please fill in all required fields.');

	// Fill valid data
	await page.getByLabel('First Name').fill('John');
	await page.getByLabel('Last Name').fill('Doe');
	await page.getByLabel('Email').fill('john@example.com');
	await page.getByLabel('Physical Address *').fill('123 Main St');
	await page.getByLabel('City *').fill('Atlanta');

	await nextButtonStep2.click();

	// Now Step 3 should be visible
	await expect(page.getByLabel('Home Church')).toBeVisible();

	// CHECK 4: Focus Management on Step 3
	await expect(page.getByLabel('Home Church')).toBeFocused();
});
