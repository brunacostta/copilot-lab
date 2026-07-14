import { test, expect } from '@playwright/test';

test('invalid admin discount input shows an error message', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await page.locator('#salePercent').fill('abc');
  await page.getByRole('button', { name: /submit/i }).click();

  await expect(page.getByText(/invalid input/i)).toBeVisible();
  await expect(page.getByText(/please enter a valid number/i)).toBeVisible();
});
