import { test, expect } from '@playwright/test';

test('Georgia Battle Share Button Feedback', async ({ page }) => {
	page.on('console', (msg) => console.log(`BROWSER LOG: ${msg.text()}`));
	page.on('pageerror', (exception) => console.log(`BROWSER ERROR: "${exception}"`));

	// Mock clipboard API
	await page.addInitScript(() => {
		try {
			// @ts-ignore
			if (!navigator.clipboard) {
				// @ts-ignore
				navigator.clipboard = {};
			}
			// @ts-ignore
			navigator.clipboard.writeText = async (text) => {
				console.log(`Clipboard writeText called with: ${text}`);
			};
		} catch (e) {
			console.error('Failed to mock clipboard', e);
		}
	});

	await page.goto('/georgia-battle');
	await page.waitForLoadState('networkidle');

	// Verify mock
	const isMocked = await page.evaluate(() => {
		// @ts-ignore
		return !!navigator.clipboard?.writeText;
	});
	console.log('Clipboard mocked:', isMocked);

	// The initial state has aria-label="Share this page"
	const shareButton = page.getByLabel('Share this page');
	await expect(shareButton).toBeVisible();

	console.log('Clicking button...');
	// Click the share button
	await shareButton.click();
	console.log('Button clicked.');

	// Expect the button text to change to "Copied!"
	await expect(page.getByText('Copied! ✓')).toBeVisible();

	// Also expect the aria-label to update
	await expect(page.getByLabel('Link copied')).toBeVisible();
});

test('Georgia Battle Timeline Content', async ({ page }) => {
	await page.goto('/georgia-battle');
	// Wait for initial load
	await expect(page.getByRole('heading', { name: 'The Current Battleground' })).toBeVisible();

	// Check for timeline items
	// The content inside the card is lazy-loaded via IntersectionObserver.

	// 1. Roe v. Wade
	const roeCard = page.locator('[data-id="roe"]');
	// Scroll to it
	await roeCard.scrollIntoViewIfNeeded();
	// Expect the title to be visible. This confirms the Observer fired and content rendered.
	await expect(page.getByRole('heading', { name: 'Roe v. Wade' })).toBeVisible();

	// 2. Dobbs v. Jackson
	const dobbsCard = page.locator('[data-id="dobbs"]');
	await dobbsCard.scrollIntoViewIfNeeded();
	await expect(page.getByRole('heading', { name: 'Dobbs v. Jackson' })).toBeVisible();

	// 3. HB 441
	const hb441Card = page.locator('[data-id="hb441"]');
	await hb441Card.scrollIntoViewIfNeeded();
	await expect(page.getByRole('heading', { name: 'HB 441 Introduced' })).toBeVisible();
});
