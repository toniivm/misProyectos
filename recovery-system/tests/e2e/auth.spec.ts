import { test, expect } from '@playwright/test';

test('signup and signin via auth modal (dev auth)', async ({ page }) => {
  await page.goto('/es');

  // Add first product to cart
  await page.locator('text=Add').first().click();

  // Open cart via header button
  await page.locator('button[aria-label^="Cart"]').click();

  // Click proceed to checkout - this will open auth modal if not signed in
  await page.locator('text=Proceed to checkout').click();

  // Auth modal should be visible: fill email and password
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await page.locator('input[type="email"]').fill('playwright+1@example.com');
  await page.locator('input[type="password"]').fill('Password123!');

  // Switch to sign up mode and submit
  await page.locator('text=Sign up').click();
  await page.locator('button:has-text("Create account")').click();

  // Modal should close and user should be able to access checkout
  await expect(page.locator('#auth-modal-title')).toBeHidden();
  await page.goto('/es/checkout');
  await expect(page.locator('text=Shipping address')).toBeVisible();
});
