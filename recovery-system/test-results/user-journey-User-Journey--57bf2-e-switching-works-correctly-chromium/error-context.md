# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journey.spec.ts >> User Journey: TikTok ad -> Order Complete >> language switching works correctly
- Location: tests\e2e\user-journey.spec.ts:56:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Recover better').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('text=Recover better').first()

```

```yaml
- text: Free shipping on every order 4.9 stars - 6,000+ happy customers 30-day return guarantee, no questions asked Secure checkout via Stripe Ships within 24 hours Free shipping on every order 4.9 stars - 6,000+ happy customers 30-day return guarantee, no questions asked Secure checkout via Stripe Ships within 24 hours
- banner:
  - link "Noctas":
    - /url: /en/
  - img
  - textbox "Search sleep headbands, massage guns, eye masks..."
  - link "Switch to Spanish":
    - /url: /es/
    - text: ES
  - button "Iniciar sesión"
  - button "Cart - 0 items":
    - img
  - link "🎧 Sleep & Audio":
    - /url: /en/shop/sleep-audio/
  - link "🧘 Neck & Recovery":
    - /url: /en/shop/neck-recovery/
  - link "🌙 Sensory & Relaxation":
    - /url: /en/shop/sensory/
- main:
  - img
  - text: Tecnología premium de bienestar
  - heading "Recupérate mejor. Descansa más. Rinde más." [level=1]
  - paragraph: "A sleep and recovery store built around what people actually feel every day: poor sleep, neck tension, sore muscles and travel fatigue. Premium hardware, cleaner routines and less guesswork."
  - link "😴 Can't switch off":
    - /url: /en/shop/sleep-audio/
    - text: 😴 Can't switch off
    - img
  - link "🦴 Desk neck tension":
    - /url: /en/shop/neck-recovery/
    - text: 🦴 Desk neck tension
    - img
  - link "🌙 Need deeper calm":
    - /url: /en/shop/sensory/
    - text: 🌙 Need deeper calm
    - img
  - link "Shop all products (5)":
    - /url: /en/shop/all/
    - img
    - text: Shop all products (5)
  - link "Explore Noctive Halo":
    - /url: /en/products/sleepband-pro/
  - text: Side sleepers sleep-first essentials Desk workers neck and posture relief Frequent flyers portable recovery gear
  - 'link "Noctive Halo Flagship product Noctive Halo The easiest entry point into better sleep: soft audio, no hard earbuds, nightly comfort."':
    - /url: /en/products/sleepband-pro/
    - img "Noctive Halo"
    - text: Flagship product Noctive Halo
    - paragraph: "The easiest entry point into better sleep: soft audio, no hard earbuds, nightly comfort."
  - img "Clean hardware"
  - text: Clean hardware Low-profile comfort built for nightly use
  - img "Travel ready"
  - text: Travel ready Portable recovery for flights, hotels and naps
  - img
  - text: Free shipping On all orders
  - img
  - text: 30-day returns No questions asked
  - img
  - text: Secure checkout SSL + Stripe encrypted
  - img
  - text: 4.9 average 6,000+ verified reviews
  - heading "Start with the routine that matches your problem." [level=2]
  - paragraph: Instead of browsing randomly, begin with the type of recovery you need most.
  - link "😴 Curated start Night reset For people who cannot switch off, sleep through noise, or wear hard earbuds in bed. Noctive Halo Noctive Wave Sleep Headband Shop this routine":
    - /url: /en/shop/sleep-audio/
    - text: 😴 Curated start
    - heading "Night reset" [level=3]
    - paragraph: For people who cannot switch off, sleep through noise, or wear hard earbuds in bed.
    - img
    - text: Noctive Halo
    - img
    - text: Noctive Wave
    - img
    - text: Sleep Headband Shop this routine
    - img
  - link "🦴 Curated start Daily relief For stiff necks, screen-heavy routines, and anyone who needs to decompress after a long day. Neck Massager Noctive Calm Mask Shop this routine":
    - /url: /en/shop/neck-recovery/
    - text: 🦴 Curated start
    - heading "Daily relief" [level=3]
    - paragraph: For stiff necks, screen-heavy routines, and anyone who needs to decompress after a long day.
    - img
    - text: Neck Massager
    - img
    - text: Noctive Calm Mask Shop this routine
    - img
  - heading "One store. Every recovery need." [level=2]
  - paragraph: Find the right product for your specific problem.
  - link "😴 Can't sleep? Sleep & Audio Bluetooth sleep headbands, white noise machines and ambient sound systems. Fall asleep faster, stay asleep longer. Shop now":
    - /url: /en/shop/sleep-audio/
    - text: 😴 Can't sleep?
    - heading "Sleep & Audio" [level=3]
    - paragraph: Bluetooth sleep headbands, white noise machines and ambient sound systems. Fall asleep faster, stay asleep longer.
    - text: Shop now
    - img
  - link "🦴 Neck or back pain? Neck & Recovery Neck massagers with heat therapy. Undo hours at a desk in minutes. Shop now":
    - /url: /en/shop/neck-recovery/
    - text: 🦴 Neck or back pain?
    - heading "Neck & Recovery" [level=3]
    - paragraph: Neck massagers with heat therapy. Undo hours at a desk in minutes.
    - text: Shop now
    - img
  - link "🌙 Need deeper relaxation? Sensory & Relaxation Weighted sleep masks and sensory tools for faster, deeper relaxation at home. Shop now":
    - /url: /en/shop/sensory/
    - text: 🌙 Need deeper relaxation?
    - heading "Sensory & Relaxation" [level=3]
    - paragraph: Weighted sleep masks and sensory tools for faster, deeper relaxation at home.
    - text: Shop now
    - img
  - heading "How it works" [level=2]
  - text: 🎯 01
  - heading "Pick your problem" [level=3]
  - paragraph: "Browse by category: sleep, neck relief or sensory relaxation. Every product targets a specific daily issue."
  - text: 📦 02
  - heading "Order today, ships tomorrow" [level=3]
  - paragraph: Every order ships within 24 hours with free tracked delivery across Europe. Typically arrives in 3-5 days.
  - text: ✨ 03
  - heading "30-night guarantee" [level=3]
  - paragraph: Try it for a month. If you don't feel the difference, contact us for a full refund. Zero risk.
  - text: Recovery made practical
  - heading "Premium tools that fit into real routines." [level=2]
  - paragraph: "The reference you shared is strong because it explains the product with images, small proof blocks and clear use cases. We are applying that same structure here, but translated into a calmer recovery brand: less playful, more premium, more sleep-focused."
  - text: Use it every night
  - paragraph: Audio sleep gear and eye masks designed for repeated, low-friction use instead of one-off gimmicks.
  - text: Portable enough to travel
  - paragraph: Compact products for planes, hotels, post-gym recovery and quick resets between long work days.
  - text: Built around specific problems
  - paragraph: "Each category is organized by what you feel first: poor sleep, stiff neck or accumulated stress."
  - link "See flagship routine":
    - /url: /en/products/sleepband-pro/
    - text: See flagship routine
    - img
  - img "Faster wind-down"
  - text: Faster wind-down Soft audio at night without hard earbuds
  - img "Clean hardware"
  - text: Clean hardware Low-profile comfort built for nightly use
  - img "Travel ready"
  - text: Travel ready Portable recovery for flights, hotels and naps
  - heading "Shop by Category" [level=2]
  - link "🎧 Sleep & Audio 3 products":
    - /url: /en/shop/sleep-audio/
  - link "🧘 Neck & Recovery 1 product":
    - /url: /en/shop/neck-recovery/
  - link "🌙 Sensory & Relaxation 1 product":
    - /url: /en/shop/sensory/
  - img
  - heading "Best Sellers" [level=2]
  - link "View all":
    - /url: /en/shop/all/
    - text: View all
    - img
  - link "Noctive Halo Best Seller -43% 4.9 (1,578) Noctive Halo Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio. €17€30 Add":
    - /url: /en/products/sleepband-pro/
    - img "Noctive Halo"
    - text: Best Seller -43%
    - img
    - img
    - img
    - img
    - img
    - text: 4.9 (1,578)
    - heading "Noctive Halo" [level=3]
    - paragraph: Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio.
    - text: €17€30
    - button "Add":
      - img
      - text: Add
  - img
  - heading "Deals & Trending" [level=2]
  - img
  - heading "All Products" [level=2]
  - link "Noctive Halo Best Seller -43% 4.9 (1,578) Noctive Halo Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio. €17€30 Add":
    - /url: /en/products/sleepband-pro/
    - img "Noctive Halo"
    - text: Best Seller -43%
    - img
    - img
    - img
    - img
    - img
    - text: 4.9 (1,578)
    - heading "Noctive Halo" [level=3]
    - paragraph: Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio.
    - text: €17€30
    - button "Add":
      - img
      - text: Add
  - link "Noctive Wave New -38% 4.8 (812) Noctive Wave Compact ambient sound system with studio‑tuned sleep profiles and adaptive soft light. €20€32 Add":
    - /url: /en/products/white-noise-pro/
    - img "Noctive Wave"
    - text: New -38%
    - img
    - img
    - img
    - img
    - img
    - text: 4.8 (812)
    - heading "Noctive Wave" [level=3]
    - paragraph: Compact ambient sound system with studio‑tuned sleep profiles and adaptive soft light.
    - text: €20€32
    - button "Add":
      - img
      - text: Add
  - link "Sleep Headband -45% 4.4 (120) Sleep Headband Comfortable Bluetooth sleep headband with thin speakers. €12€22 Add":
    - /url: /en/products/sleep-headband/
    - img "Sleep Headband"
    - text: "-45%"
    - img
    - img
    - img
    - img
    - img
    - text: 4.4 (120)
    - heading "Sleep Headband" [level=3]
    - paragraph: Comfortable Bluetooth sleep headband with thin speakers.
    - text: €12€22
    - button "Add":
      - img
      - text: Add
  - link "Neck Massager -40% 4.5 (210) Neck Massager Portable neck massager with heat and multiple modes. €15€25 Add":
    - /url: /en/products/neck-massager/
    - img "Neck Massager"
    - text: "-40%"
    - img
    - img
    - img
    - img
    - img
    - text: 4.5 (210)
    - heading "Neck Massager" [level=3]
    - paragraph: Portable neck massager with heat and multiple modes.
    - text: €15€25
    - button "Add":
      - img
      - text: Add
  - link "Noctive Calm Mask New -35% 4.7 (512) Noctive Calm Mask Weighted sleep mask that combines gentle pressure and breathable design for faster relaxation. €11€17 Add":
    - /url: /en/products/weighted-mask-pro/
    - img "Noctive Calm Mask"
    - text: New -35%
    - img
    - img
    - img
    - img
    - img
    - text: 4.7 (512)
    - heading "Noctive Calm Mask" [level=3]
    - paragraph: Weighted sleep mask that combines gentle pressure and breathable design for faster relaxation.
    - text: €11€17
    - button "Add":
      - img
      - text: Add
  - text: Bundle & Save
  - heading "Build your complete recovery system" [level=2]
  - paragraph: Combine massage, neck relief and sleep audio into one routine. Bundle discounts applied automatically at checkout.
  - link "Shop all products":
    - /url: /en/shop/all/
    - text: Shop all products
    - img
  - link "Go to checkout":
    - /url: /en/checkout/
  - text: 🎧 Noctive Halo €17
  - heading "What customers say" [level=2]
  - img
  - img
  - img
  - img
  - img
  - text: Verified purchase
  - paragraph: "\"I bought it because of the price and didn't expect much, but the headband is comfortable and the sound is clear. I fall asleep much faster now.\""
  - text: Andrea L. Student Noctive Halo
  - img
  - img
  - img
  - img
  - img
  - text: Verified purchase
  - paragraph: "\"I get neck tightness from working on the computer all day. After using the Neck Massager 15 min a day, the difference is noticeable. Worth it.\""
  - text: Miguel Á. IT Specialist Neck Massager
  - img
  - img
  - img
  - img
  - img
  - text: Verified purchase
  - paragraph: "\"Noctive Halo has been a game changer for my sleep. It's comfortable and the sound quality is great. I fall asleep much faster.\""
  - text: Carla F. Fitness enthusiast Noctive Halo
  - img
  - img
  - img
  - img
  - img
  - text: Verified purchase
  - paragraph: "\"I was skeptical but the weighted mask helps me relax so much faster. The gentle pressure is really calming. Great value for this price.\""
  - text: Laura P. New mom Noctive Calm Mask
  - img
  - img
  - img
  - img
  - img
  - text: Verified purchase
  - paragraph: "\"I travel a lot for work and the sleep headband lets me rest anywhere. Very portable and comfortable.\""
  - text: David R. Consultant Sleep Headband
  - img
  - img
  - img
  - img
  - img
  - text: Verified purchase
  - paragraph: "\"I live on a ground floor and street noise was a problem. This white noise machine masks everything. My sleep has improved dramatically.\""
  - text: Sara M. Teacher Noctive Wave
  - img "Noctas product scene"
  - img "Noctas product scene"
  - img "Noctas product scene"
  - img "Noctas product scene"
  - text: Real-world visuals
  - heading "A store that shows the routine, not just the product." [level=2]
  - paragraph: "This is the core lesson from the references: customers need to see context, lifestyle and use-case clarity. So the store now mixes product blocks with real imagery, trust signals and direct explanations instead of relying only on catalog cards."
  - text: Sleep audio and sensory products Relief neck and muscle recovery Travel portable calm on demand
  - link "Browse the full store":
    - /url: /en/shop/all/
    - text: Browse the full store
    - img
  - heading "Frequently asked questions" [level=2]
  - text: How long does shipping take?
  - paragraph: Standard orders ship within 24 hours and arrive in 3-5 business days across Europe. Express 1-2 day shipping is available at checkout.
  - text: What is your return policy?
  - paragraph: Try any product for 30 nights. If it does not work for you, contact us for a free return and full refund with no questions asked.
  - text: Are the products compatible with all devices?
  - paragraph: Bluetooth products connect via Bluetooth 5.0 to any smartphone, tablet or computer. USB-C products charge with any standard USB-C cable.
  - text: Is checkout secure?
  - paragraph: Yes. All payments are processed through Stripe with SSL encryption. We never store your card details.
  - text: Can I track my order?
  - paragraph: Yes. You will receive a tracking email within 24 hours of your order shipping. All shipments include real-time tracking.
  - text: Do you offer bundles?
  - paragraph: Yes. Add multiple products to your cart and bundle discounts are applied automatically. You can also contact us for custom bundle quotes.
- contentinfo:
  - text: Noctas
  - paragraph: Premium sleep and recovery products for daily wellness.
  - text: Categories
  - list:
    - listitem:
      - link "Sleep & Audio":
        - /url: /en/shop/sleep-audio/
    - listitem:
      - link "Neck & Recovery":
        - /url: /en/shop/neck-recovery/
    - listitem:
      - link "Sensory & Relaxation":
        - /url: /en/shop/sensory/
  - text: Support
  - list:
    - listitem: Contact us
    - listitem: Track your order
    - listitem: Return a product
    - listitem: Warranty info
  - text: Policies
  - list:
    - listitem: Shipping policy
    - listitem: Return policy
    - listitem: Privacy policy
    - listitem: Terms of service
  - paragraph: © 2026 Noctas™. All rights reserved.
  - img
  - text: SSL Secure · Stripe Payments
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE = 'https://valtre-73c7b.web.app';
  4   | 
  5   | test.describe('User Journey: TikTok ad -> Order Complete', () => {
  6   | 
  7   |   test('complete purchase flow (ES)', async ({ page }) => {
  8   |     // 1. User arrives from TikTok ad to the Spanish store
  9   |     await page.goto(`${BASE}/es?utm_source=tiktok&utm_medium=social&utm_campaign=tt_ad1`);
  10  |     await expect(page).toHaveTitle(/NOCTAS/);
  11  |     
  12  |     // 2. Verify homepage loaded with products
  13  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
  14  |     await expect(page.locator('text=Sueño y audio').first()).toBeVisible({ timeout: 5000 });
  15  |     
  16  |     // 3. User sees categories and clicks one
  17  |     await page.locator('a[href*="/shop/sleep-audio"]').first().click();
  18  |     await page.waitForURL('**/shop/sleep-audio**');
  19  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
  20  |     
  21  |     // 4. User goes back and adds product to cart
  22  |     await page.goto(`${BASE}/es`);
  23  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 10000 });
  24  |     
  25  |     // Click Añadir button
  26  |     const addBtn = page.locator('text=Añadir').first();
  27  |     await addBtn.scrollIntoViewIfNeeded();
  28  |     await addBtn.click();
  29  |     
  30  |     // 5. Cart drawer opens - verify product is there
  31  |     const cartPanel = page.locator('aside');
  32  |     await expect(cartPanel).toBeVisible({ timeout: 5000 });
  33  |     await expect(cartPanel.locator('text=Noctive Halo').first()).toBeVisible();
  34  |     
  35  |     // 6. User proceeds to checkout - should trigger auth modal
  36  |     await cartPanel.locator('text=Ir al pago').click();
  37  |     
  38  |     // 7. Auth modal opens - verify it appears
  39  |     const authModal = page.locator('[role="dialog"]');
  40  |     await expect(authModal).toBeVisible({ timeout: 5000 });
  41  |     
  42  |     // Fill in signup form
  43  |     const emailInput = authModal.locator('input[type="email"]');
  44  |     await emailInput.fill('test@noctas.com');
  45  |     await authModal.locator('input[type="password"]').fill('test123456');
  46  |     await authModal.locator('button[type="submit"]').click();
  47  |     
  48  |     // 8. Modal closes, user should be on checkout page
  49  |     await page.waitForURL('**/checkout**', { timeout: 10000 });
  50  |     await expect(page.locator('text=Contacto')).toBeVisible({ timeout: 5000 });
  51  |     
  52  |     // 9. Verify order summary shows product
  53  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible();
  54  |   });
  55  | 
  56  |   test('language switching works correctly', async ({ page }) => {
  57  |     // Start in Spanish
  58  |     await page.goto(`${BASE}/es`);
  59  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
  60  |     
  61  |     // Find EN switcher and click
  62  |     const langSwitch = page.locator('a[aria-label="Switch to English"]').first();
  63  |     await expect(langSwitch).toBeVisible({ timeout: 5000 });
  64  |     await langSwitch.click();
  65  |     await page.waitForURL('**/en/**', { timeout: 10000 });
  66  |     
  67  |     // Verify English content - hero should be in English
> 68  |     await expect(page.locator('text=Recover better').first()).toBeVisible({ timeout: 10000 });
      |                                                               ^ Error: expect(locator).toBeVisible() failed
  69  |     await expect(page.locator('text=Sleep deeper').first()).toBeVisible();
  70  |     
  71  |     // Nav should show English
  72  |     await expect(page.locator('text=Sign in').first()).toBeVisible();
  73  |     
  74  |     // Add a product to see cart in English
  75  |     const addBtn = page.locator('text=Add').first();
  76  |     await addBtn.scrollIntoViewIfNeeded();
  77  |     await addBtn.click();
  78  |     
  79  |     const cartPanel = page.locator('aside');
  80  |     await expect(cartPanel).toBeVisible({ timeout: 5000 });
  81  |     await expect(cartPanel.locator('text=Your cart').first()).toBeVisible();
  82  |   });
  83  | 
  84  |   test('cart persistence across page reload', async ({ page }) => {
  85  |     await page.goto(`${BASE}/es`);
  86  |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 15000 });
  87  |     
  88  |     // Add product
  89  |     const addBtn = page.locator('text=Añadir').first();
  90  |     await addBtn.scrollIntoViewIfNeeded();
  91  |     await addBtn.click();
  92  |     
  93  |     // Verify cart panel opened
  94  |     const cartPanel = page.locator('aside');
  95  |     await expect(cartPanel).toBeVisible({ timeout: 5000 });
  96  |     await expect(cartPanel.locator('text=Noctive Halo').first()).toBeVisible();
  97  |     
  98  |     // Reload page
  99  |     await page.reload();
  100 |     await expect(page.locator('text=Noctive Halo').first()).toBeVisible({ timeout: 10000 });
  101 |     
  102 |     // Cart should persist (check cart count badge)
  103 |     const cartButton = page.locator('button[aria-label*="Carrito"]').first();
  104 |     await expect(cartButton.locator('span').first()).toContainText('1', { timeout: 5000 });
  105 |   });
  106 | 
  107 |   test('checkout auth gate - redirects to login when not authenticated', async ({ page }) => {
  108 |     await page.goto(`${BASE}/es/checkout`);
  109 |     
  110 |     // Should see sign in prompt
  111 |     await expect(page.locator('text=Inicia sesión o crea una cuenta')).toBeVisible({ timeout: 10000 });
  112 |     
  113 |     // Submit button should be disabled when not logged in
  114 |     const submitBtn = page.locator('button[type="submit"]');
  115 |     await expect(submitBtn).toBeDisabled();
  116 |   });
  117 | 
  118 |   test('empty cart shows empty state in checkout', async ({ page }) => {
  119 |     await page.goto(`${BASE}/es/checkout`);
  120 |     await page.evaluate(() => localStorage.removeItem('recover_cart'));
  121 |     await page.reload();
  122 |     
  123 |     // Should show empty cart message
  124 |     await expect(page.locator('text=Tu carrito está vacío')).toBeVisible({ timeout: 10000 });
  125 |   });
  126 | 
  127 |   test('success page shows confirmation after order', async ({ page }) => {
  128 |     await page.goto(`${BASE}/es/checkout/success`);
  129 |     
  130 |     // Should show confirmation
  131 |     await expect(page.locator('text=Pedido confirmado')).toBeVisible({ timeout: 10000 });
  132 |     await expect(page.locator('text=Gracias por tu compra')).toBeVisible();
  133 |     await expect(page.locator('text=Entrega estimada')).toBeVisible();
  134 |     await expect(page.locator('text=Seguir comprando')).toBeVisible();
  135 |   });
  136 | });
  137 | 
```