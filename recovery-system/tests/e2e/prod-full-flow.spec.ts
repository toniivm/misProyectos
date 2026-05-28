import { test, expect } from '@playwright/test';

test('prod full flow - TikTok user (non-destructive)', async ({ page }) => {
  // Visit site with TikTok UTM params
  await page.goto('/?utm_source=tiktok&utm_medium=social&utm_campaign=tt_ad1');

  // Basic sanity: page title
  await expect(page).toHaveTitle(/RECOVERY|Recovery/i, { timeout: 15000 });

  // Wait briefly for any overlay/backdrop to disappear (in-app browsers)
  const overlay = page.locator('.fixed.inset-0.z-50, .backdrop, .modal-backdrop');
  await overlay.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});

  // Add first available product to cart
  const addBtn = page.locator('text=Add').first();
  await addBtn.waitFor({ state: 'visible', timeout: 15000 });
  await addBtn.click();

  // Verify cart button updated (aria-label shows count)
  const cartButton = page.locator('button[aria-label^="Cart"]');
  await expect(cartButton).toHaveAttribute('aria-label', /1 item|1 items/);

  // Open cart (only click if panel not already visible)
  // The cart drawer uses Tailwind classes: fixed right-0 top-0 z-60
  const cartPanel = page.locator('aside.fixed.right-0.top-0, aside[class*="z-60"]');
  const isCartVisible = await cartPanel.isVisible().catch(() => false);
  if (!isCartVisible) {
    await cartButton.waitFor({ state: 'visible', timeout: 3000 });
    await cartButton.click();
    await cartPanel.waitFor({ state: 'visible', timeout: 5000 });
  } else {
    await cartPanel.waitFor({ state: 'visible', timeout: 5000 });
  }

  // Click proceed to checkout but do NOT complete payment
  let proceedBtn = cartPanel.locator('text=Proceed to checkout');
  if ((await proceedBtn.count()) === 0) proceedBtn = cartPanel.locator('text=Checkout');
  await proceedBtn.waitFor({ state: 'visible', timeout: 3000 });
  await proceedBtn.click();

  // Assert we either land on /checkout or an auth modal appears
  let reached: string | null = null;
  try {
    await page.waitForURL('**/checkout**', { timeout: 5000 });
    reached = 'checkout';
  } catch {}

  if (!reached) {
    const authDialog = page.locator('[role="dialog"]');
    await authDialog.waitFor({ state: 'visible', timeout: 5000 });
    reached = 'auth-modal';
  }

  expect(reached).not.toBeNull();
});
