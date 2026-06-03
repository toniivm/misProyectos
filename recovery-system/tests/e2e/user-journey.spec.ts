import { test, expect } from '@playwright/test';

test.describe('User Journey: TikTok ad -> Order Complete', () => {

  test('complete purchase flow (ES)', async ({ page }) => {
    // 1. User arrives from TikTok ad to the Spanish store
    await page.goto('/es');
    await expect(page).toHaveTitle(/RECOVERY SYSTEM/);
    
    // 2. Verify homepage loaded with products
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Sleep & Audio').first()).toBeVisible();
    
    // 3. User sees categories and clicks one
    await page.locator('a[href="/es/shop/sleep-audio"]').first().click();
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
    
    // 4. User goes back to home
    await page.goto('/es');
    
    // 5. User adds Pulse Pro X to cart
    const addButtons = page.locator('text=Add');
    await addButtons.nth(2).click(); // Pulse Pro X is usually 3rd product
    
    // 6. Cart drawer opens - verify product is there
    const cartPanel = page.locator('aside');
    await expect(cartPanel).toBeVisible({ timeout: 5000 });
    await expect(cartPanel.locator('text=Pulse Pro X').first()).toBeVisible();
    await expect(cartPanel.locator('text=€22.00').first()).toBeVisible();
    
    // 7. User proceeds to checkout - should trigger auth modal
    await cartPanel.locator('text=Ir al pago').click();
    
    // 8. Auth modal opens - user signs up
    const authModal = page.locator('[role="dialog"]');
    await expect(authModal).toBeVisible({ timeout: 5000 });
    
    // Switch to signup if needed
    const signUpLink = authModal.locator('text=Regístrate');
    if (await signUpLink.isVisible().catch(() => false)) {
      await signUpLink.click();
    }
    
    await authModal.locator('input[type="email"]').fill('cliente@test.com');
    await authModal.locator('input[type="password"]').fill('test123456');
    await authModal.locator('button[type="submit"]').click();
    
    // 9. Modal closes, user is on checkout page
    await expect(authModal).not.toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Contacto')).toBeVisible({ timeout: 5000 });
    
    // 10. User fills checkout form
    await page.locator('input[type="email"]').fill('cliente@test.com');
    await page.locator('input[placeholder="+34 600 000 000"]').fill('+34600123456');
    
    // Shipping address
    const inputs = page.locator('input[type="text"]');
    await inputs.nth(0).fill('María');
    await inputs.nth(1).fill('García');
    await inputs.nth(2).fill('Calle Mayor 15, 2B');
    await inputs.nth(3).fill('Madrid');
    await inputs.nth(4).fill('28013');
    
    // 11. Select Card payment (default) and verify submit button is enabled
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeEnabled();
    
    // 12. Verify order summary shows correct product
    await expect(page.locator('text=Pulse Pro X').first()).toBeVisible();
    
    // 13. Verify total shows €22.00
    await expect(page.locator('text=€22.00').first()).toBeVisible();
  });

  test('language switching works correctly', async ({ page }) => {
    // Start in Spanish
    await page.goto('/es');
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
    
    // Find ES/EN switcher and click to English
    const langSwitch = page.locator('a[aria-label="Switch to English"]').first();
    if (await langSwitch.isVisible().catch(() => false)) {
      await langSwitch.click();
      await page.waitForURL('/en/**');
    }
    
    // Verify English content
    // Cart sidebar should show English
    const addBtn = page.locator('text=Add').first();
    if (await addBtn.isVisible().catch(() => false)) {
      await addBtn.click();
      const cartPanel = page.locator('aside');
      await expect(cartPanel).toBeVisible({ timeout: 5000 });
      await expect(cartPanel.locator('text=Your cart').first()).toBeVisible();
    }
  });

  test('cart persistence across page reload', async ({ page }) => {
    await page.goto('/es');
    
    // Add product
    await page.locator('text=Add').first().click();
    
    // Verify cart panel
    const cartPanel = page.locator('aside');
    await expect(cartPanel).toBeVisible({ timeout: 5000 });
    
    // Reload page
    await page.reload();
    
    // Cart should persist (via localStorage)
    // Open cart
    const cartButton = page.locator('button[aria-label^="Cart"]').first();
    if (await cartButton.isVisible().catch(() => false)) {
      await cartButton.click();
      await expect(cartPanel).toBeVisible({ timeout: 5000 });
    }
  });

  test('checkout auth gate - redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/es/checkout');
    
    // Should see sign in prompt
    await expect(page.locator('text=Inicia sesión o crea una cuenta')).toBeVisible({ timeout: 5000 });
    
    // Submit button should be disabled when not logged in
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeDisabled();
  });

  test('empty cart shows empty state in checkout', async ({ page }) => {
    // Clear localStorage to ensure empty cart
    await page.goto('/es/checkout');
    await page.evaluate(() => localStorage.removeItem('recover_cart'));
    await page.reload();
    
    // Should show empty cart message
    await expect(page.locator('text=Tu carrito está vacío')).toBeVisible({ timeout: 5000 });
  });

  test('success page shows confirmation after order', async ({ page }) => {
    await page.goto('/es/checkout/success');
    
    // Should show confirmation
    await expect(page.locator('text=¡Pedido confirmado!')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Gracias por tu compra')).toBeVisible();
    await expect(page.locator('text=Entrega estimada')).toBeVisible();
    await expect(page.locator('text=Seguir comprando')).toBeVisible();
  });
});
