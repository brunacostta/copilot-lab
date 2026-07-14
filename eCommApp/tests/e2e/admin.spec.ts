import { test, expect } from '@playwright/test';

test('admin can login and activate a sale', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page.getByRole('heading', { name: /welcome to the admin portal/i })).toBeVisible();

  await page.locator('#salePercent').fill('15');
  await page.getByRole('button', { name: /submit/i }).click();

  await expect(page.getByText(/all products are 15% off/i)).toBeVisible();
});
