import { test, expect } from '@playwright/test';

test('user can remove an item from the cart', async ({ page }) => {
  await page.goto('/products');

  await page.locator('.product-card').filter({ hasText: 'Apple' }).getByRole('button', { name: /add to cart/i }).click();
  await page.getByRole('link', { name: 'Cart' }).click();

  await expect(page.getByText('Apple')).toBeVisible();

  await page.getByRole('button', { name: /remove/i }).click();

  await expect(page.getByText(/your cart is empty/i)).toBeVisible();
});
