import { test, expect } from '@playwright/test';

const BASE = 'https://valtre-73c7b.web.app';

test('prod full flow - TikTok user (non-destructive)', async ({ page }) => {
  // Visit site with TikTok UTM params
  await page.goto(`${BASE}/es?utm_source=tiktok&utm_medium=social&utm_campaign=tt_ad1`);

  // Page title should include NOCTIP
  await expect(page).toHaveTitle(/NOCTIP/i, { timeout: 15000 });

  // Add first product to cart
  const addBtn = page.locator('text=Añadir').first();
  await addBtn.waitFor({ state: 'visible', timeout: 15000 });
  await addBtn.click();

  // Cart drawer should open
  const cartPanel = page.locator('aside');
  await expect(cartPanel).toBeVisible({ timeout: 5000 });

  // Click proceed to checkout - should trigger auth modal or redirect to checkout
  const proceedBtn = cartPanel.locator('text=Ir al pago');
  await proceedBtn.waitFor({ state: 'visible', timeout: 5000 });
  await proceedBtn.click();

  // Either auth modal appears or we reach checkout
  let reached = false;
  try {
    await page.waitForURL('**/checkout**', { timeout: 5000 });
    reached = true;
  } catch {}

  if (!reached) {
    const authDialog = page.locator('[role="dialog"]');
    await authDialog.waitFor({ state: 'visible', timeout: 5000 });
    reached = true;
  }

  expect(reached).toBe(true);
});
