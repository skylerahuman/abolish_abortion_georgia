import { test, expect } from '@playwright/test';
import path from 'path';

test('verify bill analysis page', async ({ page }, testInfo) => {
	await page.goto('/bill-analysis');
	// Use testInfo.outputDir to save relative to the test results
	const screenshotPath = path.join(testInfo.outputDir, 'verification.png');
	await page.screenshot({ path: screenshotPath, fullPage: true });
});
