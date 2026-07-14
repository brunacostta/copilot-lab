import { test, expect } from '@playwright/test';

test('out-of-stock product cannot be added to cart', async ({ page }) => {
  await page.goto('/products');

  const orangeCard = page.locator('.product-card').filter({ hasText: 'Orange' });
  await expect(orangeCard.getByRole('button', { name: /out of stock/i })).toBeVisible();
  await expect(orangeCard.getByRole('button', { name: /out of stock/i })).toBeDisabled();
});
