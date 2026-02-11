import { test, expect } from '@playwright/test';

test('Join Form attributes are correct', async ({ page }) => {
  await page.goto('/join');

  // STEP 1: District Finder - ZIP Code Input
  const zipInput = page.getByPlaceholder('Enter 5-digit ZIP Code');
  await expect(zipInput).toHaveAttribute('autocomplete', 'postal-code');
  await expect(zipInput).toHaveAttribute('inputmode', 'numeric');

  // Test error state accessibility
  // Trigger an error by entering invalid ZIP
  await zipInput.fill('00000');
  await page.getByRole('button', { name: 'Find' }).click();

  const errorMessage = page.locator('#zip-error'); // We expect this ID to be added
  await expect(errorMessage).toBeVisible();

  // Check aria attributes
  await expect(zipInput).toHaveAttribute('aria-invalid', 'true');
  await expect(zipInput).toHaveAttribute('aria-describedby', 'zip-error');

  // Clear error and check if aria-invalid is removed (optional but good)
  await zipInput.fill('30030');
  // Triggering input clears error in the component logic: oninput={() => (error = '')}
  await expect(zipInput).not.toHaveAttribute('aria-invalid', 'true');

  // Proceed to Step 2 to check other inputs
  // We need a valid zip to proceed. 30030 should work based on other tests.
  await page.getByRole('button', { name: 'Find' }).click();
  await expect(page.getByText('Your Georgia House District is:')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  // STEP 2: Personal Info Inputs
  const firstNameInput = page.getByLabel('First Name');
  await expect(firstNameInput).toHaveAttribute('autocomplete', 'given-name');

  const lastNameInput = page.getByLabel('Last Name');
  await expect(lastNameInput).toHaveAttribute('autocomplete', 'family-name');

  const emailInput = page.getByLabel('Email');
  await expect(emailInput).toHaveAttribute('autocomplete', 'email');

  const phoneInput = page.getByLabel('Cell (Optional)');
  // It might be label "Cell (Optional)" or just "Cell" depending on how getByLabel matches.
  // The label text is "Cell (Optional)".
  await expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
});
