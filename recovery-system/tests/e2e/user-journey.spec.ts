import { test, expect } from '@playwright/test';

const BASE = 'https://noctip.com';

test.describe('User Journey: TikTok ad -> Order Complete', () => {

  test('complete purchase flow (ES)', async ({ page }) => {
    // 1. User arrives from TikTok ad to the Spanish store
    await page.goto(`${BASE}/es?utm_source=tiktok&utm_medium=social&utm_campaign=tt_ad1`);
    await expect(page).toHaveTitle(/NOCTIP/i);
    
    // 2. Verify homepage loaded with products
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Sueño y audio').first()).toBeVisible({ timeout: 5000 });
    
    // 3. User sees categories and clicks one
    await page.locator('a[href*="/shop/sleep-audio"]').first().click();
    await page.waitForURL('**/shop/sleep-audio**');
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
    
    // 4. User goes back and adds product to cart
    await page.goto(`${BASE}/es`);
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 10000 });
    
    // Click Añadir button
    const addBtn = page.locator('text=Añadir').first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    
    // 5. Cart drawer opens - verify product is there
    const cartPanel = page.locator('aside');
    await expect(cartPanel).toBeVisible({ timeout: 5000 });
    await expect(cartPanel.locator('text=Noctive Halo').first()).toBeVisible();
    
    // 6. User proceeds to checkout - should trigger auth modal
    await cartPanel.locator('text=Ir al pago').click();
    
    // 7. Auth modal opens - verify it appears
    const authModal = page.locator('[role="dialog"]');
    await expect(authModal).toBeVisible({ timeout: 5000 });
    
    // Fill in signup form
    const emailInput = authModal.locator('input[type="email"]');
    await emailInput.fill('test@noctas.com');
    await authModal.locator('input[type="password"]').fill('test123456');
    await authModal.locator('button[type="submit"]').click();
    
    // 8. Modal closes, user should be on checkout page
    await page.waitForURL('**/checkout**', { timeout: 10000 });
    await expect(page.locator('text=Contacto')).toBeVisible({ timeout: 5000 });
    
    // 9. Verify order summary shows product
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
  });

  test('language switching works correctly', async ({ page }) => {
    // Start in Spanish
    await page.goto(`${BASE}/es`);
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
    
    // Find EN switcher and click
    const langSwitch = page.locator('a[aria-label="Switch to English"]').first();
    await expect(langSwitch).toBeVisible({ timeout: 5000 });
    await langSwitch.click();
    await page.waitForURL('**/en/**', { timeout: 10000 });
    
    // Verify English content - hero should be in English
    await expect(page.locator('text=Recover better').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Sleep deeper').first()).toBeVisible();
    
    // Nav should show English
    await expect(page.locator('text=Sign in').first()).toBeVisible();
    
    // Add a product to see cart in English
    const addBtn = page.locator('text=Add').first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    
    const cartPanel = page.locator('aside');
    await expect(cartPanel).toBeVisible({ timeout: 5000 });
    await expect(cartPanel.locator('text=Your cart').first()).toBeVisible();
  });

  test('cart persistence across page reload', async ({ page }) => {
    await page.goto(`${BASE}/es`);
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
    
    // Add product
    const addBtn = page.locator('text=Añadir').first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    
    // Verify cart panel opened
    const cartPanel = page.locator('aside');
    await expect(cartPanel).toBeVisible({ timeout: 5000 });
    await expect(cartPanel.locator('text=Noctive Halo').first()).toBeVisible();
    
    // Reload page
    await page.reload();
    await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 10000 });
    
    // Cart should persist (check cart count badge)
    const cartButton = page.locator('button[aria-label*="Carrito"]').first();
    await expect(cartButton.locator('span').first()).toContainText('1', { timeout: 5000 });
  });

  test('checkout auth gate - redirects to login when not authenticated', async ({ page }) => {
    await page.goto(`${BASE}/es/checkout`);
    
    // Should see sign in prompt
    await expect(page.locator('text=Inicia sesión o crea una cuenta')).toBeVisible({ timeout: 10000 });
    
    // Submit button should be disabled when not logged in
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeDisabled();
  });

  test('empty cart shows empty state in checkout', async ({ page }) => {
    await page.goto(`${BASE}/es/checkout`);
    await page.evaluate(() => localStorage.removeItem('recover_cart'));
    await page.reload();
    
    // Should show empty cart message
    await expect(page.locator('text=Tu carrito está vacío')).toBeVisible({ timeout: 10000 });
  });

  test('success page shows confirmation after order', async ({ page }) => {
    await page.goto(`${BASE}/es/checkout/success`);
    
    // Should show confirmation
    await expect(page.locator('text=Pedido confirmado')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Gracias por tu compra')).toBeVisible();
    await expect(page.locator('text=Entrega estimada')).toBeVisible();
    await expect(page.locator('text=Seguir comprando')).toBeVisible();
  });
});
