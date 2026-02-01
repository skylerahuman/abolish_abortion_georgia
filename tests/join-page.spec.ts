import { test, expect } from '@playwright/test';

test.describe('Join Page', () => {
	test('should display join form with all 3 steps and map', async ({ page }) => {
		// Navigate to join page
		await page.goto('/join');
		
		// Wait for the page to load
		await page.waitForLoadState('networkidle');
		
		// Check that the form title is visible
		await expect(page.getByText('Join the Fight')).toBeVisible();
		
		// Take screenshot of Step 1 (District Finder)
		await page.screenshot({ 
			path: 'tests/screenshots/join-step-1.png',
			fullPage: true 
		});
		
		// Check that ZIP input is visible
		const zipInput = page.locator('input[id="zip"]');
		await expect(zipInput).toBeVisible();
		
		// Fill in ZIP code and find district
		await zipInput.fill('30228'); // Hampton, GA ZIP
		await page.getByRole('button', { name: 'Find' }).click();
		
		// Wait for district to load
		await page.waitForTimeout(1500); // Wait for scramble animation
		
		// Verify district is shown
		await expect(page.getByText('Your Georgia House District is:')).toBeVisible();
		
		// Click Next to go to Step 2
		await page.getByRole('button', { name: 'Next' }).click();
		await page.waitForTimeout(500);
		
		// Take screenshot of Step 2 (Contact Info)
		await page.screenshot({ 
			path: 'tests/screenshots/join-step-2.png',
			fullPage: true 
		});
		
		// Verify Step 2 content
		await expect(page.getByText('Step 2 of 3')).toBeVisible();
		await expect(page.getByLabel('First Name *')).toBeVisible();
		await expect(page.getByLabel('Last Name *')).toBeVisible();
		await expect(page.getByLabel('Email *')).toBeVisible();
		
		// Fill in contact info
		await page.getByLabel('First Name *').fill('Test');
		await page.getByLabel('Last Name *').fill('User');
		await page.getByLabel('Email *').fill('test@example.com');
		
		// Click Next to go to Step 3
		await page.getByRole('button', { name: 'Next' }).click();
		await page.waitForTimeout(500);
		
		// Take screenshot of Step 3 (Interests & Church)
		await page.screenshot({ 
			path: 'tests/screenshots/join-step-3.png',
			fullPage: true 
		});
		
		// Verify Step 3 content
		await expect(page.getByText('Step 3 of 3')).toBeVisible();
		await expect(page.getByLabel('Home Church')).toBeVisible();
		await expect(page.getByText("I'm interested in...")).toBeVisible();
		
		// Verify map is visible
		const mapWrapper = page.getByTestId('map-container');
		await mapWrapper.scrollIntoViewIfNeeded();
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
		const mapWrapper = page.getByTestId('map-container');
		await mapWrapper.scrollIntoViewIfNeeded();
		
		// Check for church marker
		const marker = page.locator('.church-pin-icon');
		await expect(marker).toBeVisible();
		
		// Click marker to show popup
		await marker.click();
		await page.waitForTimeout(500);
		
		// Verify popup content
		await expect(page.getByText('3913 Jonesboro Rd Hampton, GA')).toBeVisible();
		await expect(page.getByText('Pastor Wes Fuller')).toBeVisible();
		
		// Take screenshot of map with popup
		await page.screenshot({ 
			path: 'tests/screenshots/join-map-popup.png',
			fullPage: true 
		});
	});
});
