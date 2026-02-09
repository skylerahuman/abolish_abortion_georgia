import { test, expect } from '@playwright/test';

test('Join Form UX improvements', async ({ page }) => {
  await page.goto('/join');

  // STEP 1: District Finder
  await page.getByPlaceholder('Enter 5-digit ZIP Code').fill('30030');
  await page.getByRole('button', { name: 'Find' }).click();

  // Wait for result
  await expect(page.getByText('Your Georgia House District is:')).toBeVisible();

  // CHECK 1: Focus Management on Result
  // The focus should move to the result container or the "Not your district?" button
  const resultContainer = page.locator('.text-center.bg-charcoal\\/50');
  const notYourDistrictBtn = page.getByRole('button', { name: 'Not your district?' });

  // We expect one of them to be focused.
  // Since .or() with toBeFocused might be tricky, let's check active element
  // await expect(resultContainer.or(notYourDistrictBtn)).toBeFocused();
  // Actually Playwright's expect(locator).toBeFocused() works on a single locator.
  // We'll target the container for now as the plan is to focus that or the first focusable element inside.
  // Let's verify if the container is focused.
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

  // CHECK 5: Focus Management Backward (Step 3 -> Step 2)
  // Ensure Step 2 is fully gone so we don't have multiple Back buttons
  await expect(page.getByLabel('First Name')).not.toBeVisible();

  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByLabel('First Name')).toBeFocused();

  // CHECK 6: Focus Management Backward (Step 2 -> Step 1)
  // Ensure Step 3 is fully gone
  await expect(page.getByLabel('Home Church')).not.toBeVisible();

  await page.getByRole('button', { name: 'Back' }).click();

  // Since we found a district earlier, we expect the result container to be focused
  const resultContainerStep1 = page.locator('.text-center.bg-charcoal\\/50');
  await expect(resultContainerStep1).toBeFocused();

  // CHECK 7: Reset District Finder Focus
  await page.getByRole('button', { name: 'Not your district?' }).click();
  await expect(page.getByPlaceholder('Enter 5-digit ZIP Code')).toBeFocused();
});
