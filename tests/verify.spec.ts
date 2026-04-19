import { test, expect } from '@playwright/test';

test('verify bill analysis page', async ({ page }, testInfo) => {
	await page.goto('/bill-analysis');
	// Use testInfo.outputDir to save relative to the test results
	const screenshotPath = `${testInfo.outputDir}/verification.png`;
	await page.screenshot({ path: screenshotPath, fullPage: true });
});
