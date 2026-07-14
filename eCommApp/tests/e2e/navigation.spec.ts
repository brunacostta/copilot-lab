import { test, expect } from '@playwright/test';

test('header navigation moves between major pages', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Products' }).click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole('heading', { name: /our products/i })).toBeVisible();

  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole('heading', { name: /your cart/i })).toBeVisible();
  await expect(page.getByText(/your cart is empty/i)).toBeVisible();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 2, name: /welcome to the the daily harvest/i })).toBeVisible();

  await page.getByRole('button', { name: 'Admin Login' }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: /admin login/i })).toBeVisible();
});
