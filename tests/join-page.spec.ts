import { test, expect } from '@playwright/test';

test.describe('Join Page', () => {
	test('should display join form with all 3 steps and map', async ({ page }) => {
		// Navigate to join page
		await page.goto('/join');

		// Wait for the page to load
		await page.waitForLoadState('networkidle');

		// Check that the form title is visible - specific heading locator
		await expect(page.getByRole('heading', { name: 'Join the Fight' })).toBeVisible();

		// Check that ZIP input is visible
		const zipInput = page.locator('input[id="zip"]');
		await expect(zipInput).toBeVisible();

		// Fill in ZIP code - Trigger input event manually if needed or type slowly
		await zipInput.pressSequentially('30228', { delay: 100 });

		// The button is conditionally rendered in Svelte: `{#if !showDistrict}`
		// It might take a tick to update after input.

		const findButton = page.getByRole('button', { name: 'Find' });

		// Wait for it to be attached and visible
		await expect(findButton).toBeVisible({ timeout: 10000 });

		// Ensure it's enabled (might be disabled if zip length check fails)
		await expect(findButton).toBeEnabled();

		await findButton.click();

		// Wait for district to load
		await page.waitForTimeout(1500); // Wait for scramble animation

		// Verify district is shown - specific to current implementation
		await expect(page.getByText('Found District')).toBeVisible();

		// Click Next to go to Step 2
		await page.getByRole('button', { name: 'Next' }).click();
		await page.waitForTimeout(500);

		// Verify Step 2 content
		await expect(page.getByText('Step 2 of 3')).toBeVisible();
		await expect(page.getByLabel('First Name *')).toBeVisible();
		await expect(page.getByLabel('Last Name *')).toBeVisible();
		await expect(page.getByLabel('Email *')).toBeVisible();

		// Fill in contact info
		await page.getByLabel('First Name *').fill('Test');
		await page.getByLabel('Last Name *').fill('User');
		await page.getByLabel('Email *').fill('test@example.com');
		await page.getByLabel('Physical Address *').fill('123 Test St');
		await page.getByLabel('City *').fill('Test City');

		// Click Next to go to Step 3
		await page.getByRole('button', { name: 'Next' }).click();
		await page.waitForTimeout(500);

		// Verify Step 3 content
		await expect(page.getByText('Step 3 of 3')).toBeVisible();
		await expect(page.getByLabel('Home Church')).toBeVisible();
		await expect(page.getByText("I'm interested in...")).toBeVisible();

		// Scroll map into view to trigger lazy loading
		const mapPlaceholder = page.getByTestId('map-container');
		await mapPlaceholder.scrollIntoViewIfNeeded();

		// Verify map is visible
		const mapContainer = page.locator('.leaflet-container');
		await expect(mapContainer).toBeVisible();

		// Verify Pastor CTA is visible
		await expect(page.getByText('Are you a Pastor?')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Add Your Church' })).toBeVisible();

		// Verify mailto link is correct
		const pastorLink = page.getByRole('link', { name: 'Add Your Church' });
		await expect(pastorLink).toHaveAttribute('href', 'mailto:join@operationgospel.life');
	});

	test('map should show Hampton GA church marker', async ({ page }) => {
		await page.goto('/join');
		await page.waitForLoadState('networkidle');

		// Scroll map into view to trigger lazy loading
		const mapPlaceholder = page.getByTestId('map-container');
		await mapPlaceholder.scrollIntoViewIfNeeded();

		// Wait for map to load
		await page.waitForTimeout(2000);

		// Check for church marker
		const marker = page.locator('.church-pin-icon');
		await expect(marker).toBeVisible();

		// Click marker to show popup
		await marker.click();
		await page.waitForTimeout(500);

		// Verify popup content
		await expect(page.getByText('3913 Jonesboro Rd Hampton, GA')).toBeVisible();
		await expect(page.getByText('Pastor Wes Fuller')).toBeVisible();
	});
});
