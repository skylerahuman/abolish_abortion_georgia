import { test, expect } from '@playwright/test';

test('Skip to main content link should be present and functional', async ({ page }) => {
  await page.goto('/');

  // Find the skip link
  const skipLink = page.getByRole('link', { name: 'Skip to Main Content' });

  // It should be in the DOM but potentially hidden visually (unless focused)
  await expect(skipLink).toBeAttached();

  // Focus the link (simulating tab navigation)
  await skipLink.focus();

  // Verify it becomes visible on focus
  await expect(skipLink).toBeVisible();

  // Click the link
  await skipLink.click();

  // Verify the URL hash changes
  expect(page.url()).toContain('#main-content');

  // Verify focus moves to the main content area
  // Note: We need to check if the active element is the main content wrapper
  const mainContentId = await page.evaluate(() => document.activeElement?.id);
  expect(mainContentId).toBe('main-content');
});
