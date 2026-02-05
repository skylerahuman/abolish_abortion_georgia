import { test, expect } from '@playwright/test';

test('Join Form attributes for autocomplete and accessibility', async ({ page }) => {
  await page.goto('/join');

  // STEP 1: District Finder
  const zipInput = page.getByPlaceholder('Enter 5-digit ZIP Code');
  await expect(zipInput).toBeVisible();

  // Check ZIP attributes
  await expect(zipInput).toHaveAttribute('autocomplete', 'postal-code');
  await expect(zipInput).toHaveAttribute('inputmode', 'numeric');

  // Perform lookup to get to Step 2
  await zipInput.fill('30030');
  await page.getByRole('button', { name: 'Find' }).click();

  // Wait for result and click Next
  await expect(page.getByText('Your Georgia House District is:')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  // STEP 2: Contact Info
  // Check First Name attributes
  const firstNameInput = page.getByLabel('First Name');
  await expect(firstNameInput).toBeVisible();
  await expect(firstNameInput).toHaveAttribute('autocomplete', 'given-name');

  // Check Last Name attributes
  const lastNameInput = page.getByLabel('Last Name');
  await expect(lastNameInput).toHaveAttribute('autocomplete', 'family-name');

  // Check Email attributes
  const emailInput = page.getByLabel('Email');
  await expect(emailInput).toHaveAttribute('autocomplete', 'email');

  // Check Phone attributes
  const phoneInput = page.getByLabel('Cell (Optional)');
  await expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
});
