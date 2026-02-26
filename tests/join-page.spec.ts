import { test, expect } from '@playwright/test';

test.describe('Join Page', () => {
	test('should display join form with all 3 steps and map', async ({ page }) => {
		// Navigate to join page
		await page.goto('/join');

		// Wait for the page to load
		await page.waitForLoadState('networkidle');

		// Check that the form title is visible
		await expect(page.getByRole('heading', { name: 'Join the Fight' })).toBeVisible();

		// Check that ZIP input is visible
		const zipInput = page.locator('input[id="zip"]');
		await expect(zipInput).toBeVisible();

		// Fill in ZIP code and find district
		// Using 30228 (Hampton, GA) for reliable district lookup
		await zipInput.fill('30228');

		// Wait for scramble animation / result
		// "Found District" is the success indicator in JoinForm.svelte
		// Increased timeout to be safe
		await expect(page.getByText('Found District')).toBeVisible({ timeout: 10000 });

		// Verify district is shown
		await expect(page.locator('.text-green-400')).toBeVisible();

		// Click Next to go to Step 2
		// Explicitly click the visible Next button for Step 1
		// In JoinForm.svelte, Step 1 is visible when registrationState.step === 1
		// The button is in the first "flex-1 flex flex-col" container
		await page.getByRole('button', { name: 'Next' }).first().click();

		// Verify Step 2 content
		await expect(page.getByText('Step 2 of 3')).toBeVisible();

		// Fill in contact info
		await page.locator('#firstName').fill('Test');
		await page.locator('#lastName').fill('User');
		await page.locator('#email').fill('test@example.com');
		await page.locator('#address').fill('123 Main St');
		await page.locator('#city').fill('Atlanta');

		// Click Next to go to Step 3
		// Now that we are on Step 2, there might be two Next buttons in the DOM (one from Step 1 hidden, one for Step 2 visible)
		// We want the visible one.
		await page.getByRole('button', { name: 'Next' }).filter({ hasText: 'Next' }).last().click();

		// Verify Step 3 content
		await expect(page.getByText('Step 3 of 3')).toBeVisible();
		await expect(page.locator('#homeChurch')).toBeVisible();

		// Scroll map into view to trigger lazy loading
		const mapContainer = page.getByTestId('map-container');
		await mapContainer.scrollIntoViewIfNeeded();

		// Verify map initializes (leaflet container appears)
		await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 10000 });

		// Verify Pastor CTA is visible
		await expect(page.getByText('Are you a Pastor?')).toBeVisible();

		// Verify mailto link
		const pastorLink = page.getByRole('link', { name: 'Add Your Church' });
		await expect(pastorLink).toBeVisible();
		await expect(pastorLink).toHaveAttribute('href', 'mailto:join@operationgospel.life');
	});
});
