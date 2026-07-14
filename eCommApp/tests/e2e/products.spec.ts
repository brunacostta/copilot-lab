import { test, expect } from '@playwright/test';

test('products page shows available products', async ({ page }) => {
  await page.goto('/products');

  await expect(page.getByRole('heading', { name: /our products/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Apple' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Grapes' })).toBeVisible();
});
