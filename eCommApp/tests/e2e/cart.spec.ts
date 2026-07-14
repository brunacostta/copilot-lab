import { test, expect } from '@playwright/test';

test('user can add a product to cart and complete checkout', async ({ page }) => {
  await page.goto('/products');

  await page.locator('.product-card').filter({ hasText: 'Apple' }).getByRole('button', { name: /add to cart/i }).click();
  await page.getByRole('link', { name: /cart/i }).click();

  await expect(page.getByRole('heading', { name: /your cart/i })).toBeVisible();
  await expect(page.getByText('Apple')).toBeVisible();

  await page.getByRole('button', { name: /checkout/i }).click();
  await page.getByRole('button', { name: /continue checkout/i }).click();

  await expect(page.getByRole('heading', { name: /your order has been processed/i })).toBeVisible();
});
