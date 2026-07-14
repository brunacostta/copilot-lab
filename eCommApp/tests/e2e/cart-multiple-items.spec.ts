import { test, expect } from '@playwright/test';

test('user can add multiple products to cart and see quantities', async ({ page }) => {
  await page.goto('/products');

  await page.locator('.product-card').filter({ hasText: 'Apple' }).getByRole('button', { name: /add to cart/i }).click();
  await page.locator('.product-card').filter({ hasText: 'Grapes' }).getByRole('button', { name: /add to cart/i }).click();
  await page.locator('.product-card').filter({ hasText: 'Apple' }).getByRole('button', { name: /add to cart/i }).click();

  await page.getByRole('link', { name: 'Cart' }).click();

  await expect(page.getByRole('heading', { name: /your cart/i })).toBeVisible();
  await expect(page.getByText('Apple')).toBeVisible();
  await expect(page.getByText('Grapes')).toBeVisible();
  await expect(page.getByText(/quantity: 2/i)).toBeVisible();
  await expect(page.getByText(/quantity: 1/i)).toBeVisible();
});
