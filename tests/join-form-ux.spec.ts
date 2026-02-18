import { test, expect } from '@playwright/test';

test('Join Form UX improvements', async ({ page }) => {
	await page.goto('/join');

	// STEP 1: District Finder
	await page.getByPlaceholder('Enter 5-digit ZIP Code').fill('30030');
	await page.getByRole('button', { name: 'Find' }).click();

	// Wait for result
	await expect(page.getByText('Found District')).toBeVisible();

	// CHECK 1: Focus Management on Result
	// The focus should move to the result container.
	// Update locator to match current class "text-center bg-green-900/10" seen in JoinForm.svelte
	const resultContainer = page.locator('.text-center.bg-green-900\\/10');
	await expect(resultContainer).toBeFocused();

	// Proceed to Step 2
	await page.getByRole('button', { name: 'Next' }).click();

	// CHECK 2: Focus Management on Step Change
	// Focus should be on First Name input
	await expect(page.getByLabel('First Name')).toBeFocused();

	// CHECK 3: Validation on Step 2
	// Try to click Next without filling anything
	const nextButtonStep2 = page.getByRole('button', { name: 'Next' }).last();
	// Note: There are two "Next" buttons in the DOM because of the transition?
	// No, Step 1 Next is hidden/removed. But let's be safe.

	await nextButtonStep2.click();

	// We should NOT see "Home Church" (Step 3)
	await expect(page.getByLabel('Home Church')).not.toBeVisible();

	// We SHOULD see the error message
	await expect(page.getByRole('alert')).toHaveText('Please fill in all required fields.');

	// Fill valid data
	await page.getByLabel('First Name').fill('John');
	await page.getByLabel('Last Name').fill('Doe');
	await page.getByLabel('Email').fill('john@example.com');

	await nextButtonStep2.click();

	// Now Step 3 should be visible
	await expect(page.getByLabel('Home Church')).toBeVisible();

	// CHECK 4: Focus Management on Step 3
	await expect(page.getByLabel('Home Church')).toBeFocused();
});
