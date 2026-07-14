import { test, expect } from '@playwright/test';

test('invalid admin credentials show an error message', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('Username').fill('wrong-user');
  await page.getByPlaceholder('Password').fill('wrong-pass');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page.getByText(/invalid credentials/i)).toBeVisible();
});
