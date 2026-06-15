import { test, expect } from '@playwright/test';

const BASE = 'https://noctip.com';

test('production smoke: homepage loads and add-to-cart updates cart count', async ({ page }) => {
  await page.goto(`${BASE}/es`);

  // Basic page sanity
  await expect(page).toHaveTitle(/NOCTIP/i);

  // Wait for product cards and click Añadir
  const addBtn = page.locator('text=Añadir').first();
  await addBtn.waitFor({ state: 'visible', timeout: 15000 });
  await addBtn.click();

  // Verify cart button shows count
  const cartButton = page.locator('button[aria-label*="Carrito"]');
  await expect(cartButton.locator('span').first()).toContainText('1', { timeout: 5000 });
});
