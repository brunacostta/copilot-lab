import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: /the daily harvest/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /welcome to the the daily harvest/i })).toBeVisible();
  await expect(page.getByText(/check out our products page for some great deals/i)).toBeVisible();
});
