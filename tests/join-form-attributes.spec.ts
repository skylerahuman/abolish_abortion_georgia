import { test, expect } from '@playwright/test';

test('Join Form attributes for better UX/a11y', async ({ page }) => {
  await page.goto('/join');

  // STEP 1: District Finder - ZIP Code Input
  const zipInput = page.getByPlaceholder('Enter 5-digit ZIP Code');
  await expect(zipInput).toBeVisible();

  // Check attributes for mobile numeric keyboard and autocomplete
  await expect(zipInput).toHaveAttribute('autocomplete', 'postal-code');
  await expect(zipInput).toHaveAttribute('inputmode', 'numeric');
  await expect(zipInput).toHaveAttribute('pattern', '[0-9]*');

  // Proceed to Step 2 to check other inputs
  await zipInput.fill('30030');
  await page.getByRole('button', { name: 'Find' }).click();

  // Wait for the district to be found
  await expect(page.getByText('Your Georgia House District is:')).toBeVisible();

  // Click Next
  await page.getByRole('button', { name: 'Next' }).click();

  // STEP 2: Contact Info
  const firstNameInput = page.getByLabel('First Name');
  await expect(firstNameInput).toBeVisible();
  await expect(firstNameInput).toHaveAttribute('autocomplete', 'given-name');

  const lastNameInput = page.getByLabel('Last Name');
  await expect(lastNameInput).toHaveAttribute('autocomplete', 'family-name');

  const emailInput = page.getByLabel('Email');
  await expect(emailInput).toHaveAttribute('autocomplete', 'email');

  const phoneInput = page.getByLabel('Cell (Optional)');
  await expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
});
