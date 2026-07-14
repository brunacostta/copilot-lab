import { test, expect } from '@playwright/test';

test('checkout is not available when cart is empty', async ({ page }) => {
  await page.goto('/cart');

  await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /checkout/i })).toHaveCount(0);
});
