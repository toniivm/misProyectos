import { test, expect } from '@playwright/test';

test('production smoke: homepage loads and add-to-cart updates cart count', async ({ page }) => {
  await page.goto('/');

  // Basic page sanity
  await expect(page).toHaveTitle(/RECOVERY SYSTEM/i);

  // Wait for product cards and click the first Add
  const addBtn = page.locator('text=Add').first();
  await addBtn.waitFor({ state: 'visible', timeout: 15000 });
  await addBtn.click();

  // Verify cart button updated its aria-label to show 1 item
  const cartButton = page.locator('button[aria-label^="Cart"]');
  await expect(cartButton).toHaveAttribute('aria-label', /1 items|1 item/);
});
