import { test, expect } from '@playwright/test';

test.describe('UX: Share Button Feedback', () => {
    test.beforeEach(async ({ page }) => {
        // Mock clipboard writeText to avoid permission issues and allow testing
        await page.addInitScript(() => {
            if (!navigator.clipboard) {
                // @ts-ignore
                navigator.clipboard = {};
            }
            navigator.clipboard.writeText = async () => {
                console.log('Mock writeText called');
                return Promise.resolve();
            };
        });
    });

    test('should show "Link Copied!" feedback on Georgia Battle page', async ({ page }) => {
        await page.goto('/georgia-battle');
        await page.waitForLoadState('networkidle');

        // Locate the button using a stable selector (container) to avoid stale element issues when aria-label changes
        const shareButton = page.locator('.text-center.relative button');
        await expect(shareButton).toBeVisible();
        await expect(shareButton).toHaveText('Share →');

        // Click the button
        await shareButton.click();

        // Verify text changes to "Link Copied!"
        await expect(shareButton).toHaveText('Link Copied!', { timeout: 5000 });
        await expect(shareButton).toHaveAttribute('aria-label', 'Link copied');

        // Wait for 2 seconds and verify it resets
        await page.waitForTimeout(2100);
        await expect(shareButton).toHaveText('Share →');
        await expect(shareButton).toHaveAttribute('aria-label', 'Share this page');
    });

    test('should show "Link Copied!" feedback on Abolition Basics page', async ({ page }) => {
        await page.goto('/abolition-basics');
        await page.waitForLoadState('networkidle');

        // Locate the button using a stable selector
        const shareButton = page.locator('.text-center.relative button');
        await expect(shareButton).toBeVisible();
        await expect(shareButton).toHaveText('Share →');

        // Click the button
        await shareButton.click();

        // Verify text changes to "Link Copied!"
        await expect(shareButton).toHaveText('Link Copied!', { timeout: 5000 });
        await expect(shareButton).toHaveAttribute('aria-label', 'Link copied');

        // Wait for 2 seconds and verify it resets
        await page.waitForTimeout(2100);
        await expect(shareButton).toHaveText('Share →');
        await expect(shareButton).toHaveAttribute('aria-label', 'Share this page');
    });
});
