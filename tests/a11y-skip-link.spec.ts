import { test, expect } from '@playwright/test';

test('has accessible skip to content link', async ({ page }) => {
  await page.goto('/');

  const skipLink = page.getByRole('link', { name: 'Skip to Content' });
  const mainContent = page.locator('#main-content');

  // Verify link exists in DOM
  await expect(skipLink).toBeAttached();

  // Verify link is initially hidden (off-screen)
  // We check the CSS property directly. Tailwind -top-96 is -24rem = -384px
  await expect(skipLink).toHaveCSS('top', '-384px');

  // Focus the link
  await skipLink.focus();

  // Verify link becomes visible (moves into view)
  // Tailwind top-4 is 1rem = 16px
  await expect(skipLink).toHaveCSS('top', '16px');

  // Verify target exists
  await expect(mainContent).toBeAttached();
  await expect(mainContent).toHaveAttribute('tabindex', '-1');

  // Click the link
  await skipLink.click();

  // Verify URL hash
  expect(page.url()).toContain('#main-content');
});
