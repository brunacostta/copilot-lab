import { test, expect } from '@playwright/test';

test('user can submit a product review', async ({ page }) => {
  await page.goto('/products');

  await page.locator('.product-card').filter({ hasText: 'Apple' }).getByRole('img').click();
  await page.getByPlaceholder('Your name').fill('QA Tester');
  await page.getByPlaceholder('Your review').fill('Great product!');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('QA Tester')).toBeVisible();
  await expect(page.getByText('Great product!')).toBeVisible();
});
