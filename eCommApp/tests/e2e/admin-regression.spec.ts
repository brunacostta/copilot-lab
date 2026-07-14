import { test, expect } from '@playwright/test';

test('admin page supports sale activation, reset and invalid input handling', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page.getByRole('heading', { name: /welcome to the admin portal/i })).toBeVisible();

  await page.locator('#salePercent').fill('20');
  await page.getByRole('button', { name: /submit/i }).click();
  await expect(page.getByText(/all products are 20% off/i)).toBeVisible();

  await page.getByRole('button', { name: /end sale/i }).click();
  await expect(page.getByText(/no sale active/i)).toBeVisible();

  await page.locator('#salePercent').fill('abc');
  await page.getByRole('button', { name: /submit/i }).click();
  await expect(page.getByText(/invalid input/i)).toBeVisible();
  await expect(page.getByText(/please enter a valid number/i)).toBeVisible();
});
