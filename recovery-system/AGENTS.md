# Guía del Proyecto Noctip

## Identidad del Proyecto
Noctip es una marca premium de productos de sueño y recuperación. Vende 4 productos:
- **Noctip Halo** — Férula anti-ronquidos (€17.99, antes €29.99)
- **Noctip Back** — Corrector postural (€19.99, antes €31.99)
- **Noctip Rest** — Banda de audio para dormir (€11.99, antes €21.99)
- **Noctip Cervical** — Masajeador cervical (€14.99, antes €24.99)

Mercado: Europa. Idiomas: Español (`es`) e Inglés (`en`). Locale por defecto: `es`.

## Stack Técnico
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Auth + DB:** Firebase (Auth + Firestore)
- **Pagos:** Stripe (checkout sessions via API route + backend externo)
- **i18n:** next-intl (`useLocale`, `useTranslations`, `setRequestLocale`)
- **Iconos:** Lucide React (NUNCA usar otros iconos)
- **Tests:** Playwright (E2E)
- **Analytics:** Google Analytics 4 (`G-HVTC1MN829`)

## Arquitectura de Descuentos
El sistema de descuentos tiene 3 capas:
1. **Precios de venta** — Cada producto tiene `price` y `comparePrice` en `lib/catalog.ts`. Son estáticos.
2. **Descuentos por bundle** — `BUNDLES[]` en `lib/catalog.ts`. Se aplican automáticamente al añadir productos al carrito (15-20% off). Sin código.
3. **Códigos promocionales** — **DESACTIVADOS**. La validación era externa (`/promo/validate`). Se desactivaron el input en checkout y `allow_promotion_codes: false` en Stripe.

## Estructura de Directorios
```
recovery-system/
├── app/
│   ├── [locale]/              # Páginas (es/en)
│   │   ├── page.tsx           # Home → ShopHomePage
│   │   ├── products/[slug]/   # Fichas de producto (generateMetadata + JSON-LD)
│   │   ├── shop/[category]/   # Páginas de categoría (generateMetadata)
│   │   ├── checkout/          # Checkout (client component)
│   │   ├── checkout/success/  # Confirmación de pedido
│   │   ├── about/             # Sobre nosotros
│   │   ├── contact/           # Contacto
│   │   ├── account/orders/    # Pedidos del usuario
│   │   ├── admin/             # Panel admin
│   │   ├── tracking/          # Seguimiento de pedidos
│   │   └── legal/             # Políticas legales
│   │       ├── privacy/
│   │       ├── terms/
│   │       ├── shipping/
│   │       ├── returns/
│   │       ├── cookies/
│   │       └── legal-notice/
│   ├── api/
│   │   └── payments/create-checkout-session/route.ts
│   ├── globals.css
│   ├── layout.tsx             # Root layout (metadata estático)
│   ├── sitemap.ts             # Sitemap dinámico
│   └── robots.ts              # Robots.txt
├── components/
│   ├── ShopHomePage.tsx       # Home page completa
│   ├── ProductDetail.tsx      # Ficha de producto
│   ├── ProductImage.tsx       # Imágenes SVG + fallback real
│   ├── CategoryPage.tsx       # Páginas de categoría
│   ├── CartSidebar.tsx        # Carrito lateral
│   ├── CartButton.tsx         # Botón del carrito (floating)
│   ├── Footer.tsx
│   ├── ConversionBoosters.tsx  # TrustStrip, RatingStars, UrgencyBar
│   ├── NewsletterPopup.tsx    # Popup de newsletter
│   ├── CookieConsent.tsx      # Banner de cookies
│   ├── AuthModal.tsx          # Modal de login/registro
│   ├── PhoneInputField.tsx    # Input de teléfono con banderas
│   ├── AddressAutocomplete.tsx # Autocompletado de direcciones
│   ├── ErrorBoundary.tsx      # Error boundary global
│   ├── UtmCapture.tsx         # Captura de parámetros UTM
│   ├── GoogleAnalytics.tsx    # GA4 tracking
│   ├── BackendWarmup.tsx      # Warmup del backend
│   ├── LocalePreferenceSync.tsx # Sync de preferencia de idioma
│   └── ui/
│       ├── Badge.tsx          # Badges de producto
│       ├── FAQ.tsx            # Sección FAQ
│       └── Stars.tsx          # Estrellas de valoración
├── context/
│   ├── AuthContext.tsx         # Estado de autenticación
│   └── CartContext.tsx         # Estado del carrito (useReducer + localStorage)
├── lib/
│   └── catalog.ts             # Catálogo, categorías, bundles, helpers
├── i18n/
│   └── routing.ts             # Locale config (es, en)
├── messages/
│   ├── es.json                # Traducciones español
│   └── en.json                # Traducciones inglés
└── public/images/             # Imágenes estáticas
```

## Convenciones de Código
1. Todos los componentes client llevan `'use client'` al inicio
2. Textos con i18n: `useLocale()` para idioma, `useTranslations()` para textos
3. Colores del tema oscuro (ver Design System más abajo)
4. Animaciones con Framer Motion (`motion.div`, `whileInView`, `viewport={{ once: true }}`)
5. Iconos exclusivamente de Lucide React
6. Lazy loading en imágenes: `loading="lazy"` excepto hero
7. Botones mínimos 44x44px en móvil (accesibilidad)
8. Server components para páginas con `generateMetadata` (no mezclar con `'use client'`)

## Paleta de Colores (tema oscuro)
| Variable | Valor | Uso |
|----------|-------|-----|
| bg-base | `#080c12` | Fondo principal |
| bg-surface | `#0d1219` | Cards, superficies |
| bg-elevated | `#111720` | Elementos elevados |
| primary | `#10BFD8` | Cyan — acentos, CTAs |
| text | `#f2eee7` | Texto principal |
| text-secondary | `#8791a1` | Texto secundario |
| text-muted | `#6b7785` | Texto apagado |
| border | `rgba(255,255,255,0.06)` | Bordes sutiles |
| border-hover | `rgba(255,255,255,0.12)` | Bordes hover |
| success | `emerald-400/500` | Éxito, añadido al carrito |
| warning | `amber-300/400` | Urgencia, ofertas |

## SEO
- **Metadata:** Root layout (estático) + locale layout (generateMetadata) + product/category pages (generateMetadata dinámico)
- **Structured Data:** JSON-LD en locale layout (Organization, WebSite, OnlineStore, FAQPage, BreadcrumbList) + product pages (Product con aggregateRating)
- **Sitemap:** Dinámico en `app/sitemap.ts`, genera URLs para todos los locales × productos × categorías
- **Robots:** Permite todo excepto `/admin/`, `/checkout/`, `/api/`, `/account/`, `/tracking/`
- **Canonical URLs:** Configuradas en cada página con `alternates.languages` para hreflang
- **OG Images:** Siempre rutas absolutas (`https://noctip.com/...`)
- **Google Verification:** Configurar en `app/layout.tsx` → `verification.google`

## Comandos Útiles
```bash
cd recovery-system
npm run dev          # Desarrollo
npm run build        # Build producción (SIEMPRE ejecutar después de cambios)
npm run lint         # Linting
npm run test:e2e     # Tests E2E con Playwright
```

## Reglas de Modificación
- **NUNCA** eliminar funcionalidad existente sin preguntar
- **NUNCA** modificar el catálogo de productos (`lib/catalog.ts`) sin confirmación
- **SIEMPRE** mantener compatibilidad i18n (es/en)
- **SIEMPRE** testear que `npm run build` pase después de cambios
- **SIEMPRE** hacer `git add . && git commit && git push` después de cada tarea completada — el usuario quiere que los cambios se suban a GitHub automáticamente
- Preferir edición de archivos existentes sobre creación de nuevos
- Seguir el estilo existente del archivo al editar
- **NUNCA** añadir códigos de promo/descuento — están desactivados intencionalmente
- **NUNCA** usar `type="number"` en inputs de formulario (causa problemas en Android)
- **NUNCA** usar `autoCapitalize="characters"` en inputs de promo (causa bugs en Android)

## Reglas Mobile-First (OBLIGATORIO)
- **TARGET:** Usuarios de 50-70 años, pocas habilidades digitales
- **ZOOM:** NUNCA permitir zoom en móvil — `maximum-scale=1` en viewport
- **FONT SIZE:** Mínimo 16px en móvil para inputs (evita zoom automático en iOS)
- **TOUCH TARGETS:** Mínimo 48x48px en todos los botones interactivos
- **SPACING:** Mínimo 12px entre elementos clickeables
- **TEXT SIMPLE:** Sin jerga técnica. Lenguaje de instituto de 2º de ESO
- **INTUICION:** Si alguien de 60 años no entiende algo en 2 segundos, rediseñarlo
- **CAMPOS FORMULARIO:** Siempre labels visibles, placeholders descriptivos, errores claros
- **ANDROID:** Inputs tipo `text` NUNCA `type="number"` (evita teclados problemáticos)
- **CHECKOUT:** Siempre opción "Compra como invitado" visible
- **FEEDBACK:** Todo botón debe tener estado visual (loading, success, error)
- **NAVEGACIÓN:** Siempre visible, sin menús ocultos en móvil
- **STICKY CTA:** En móvil, botón de compra siempre visible abajo
- **EVITAR:** Zoom al tocar inputs, scroll horizontal accidental, popups que bloqueen

## Diseño de Componentes (ver DESIGN_SYSTEM.md)
- **Cards:** `rounded-2xl border border-white/[0.06] bg-[#0d1219]`
- **Botón primario:** `rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12]`
- **Botón secundario:** `rounded-full border border-white/10 px-8 py-4`
- **Badges:** `rounded-full bg-[#10BFD8]/15 px-2.5 py-0.5 text-[10px]`
- **Breakpoints:** sm:640 md:768 lg:1024 xl:1280 2xl:1536

## Animaciones (Framer Motion)
```tsx
// Patrón estándar
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-40px' }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>

// Staggered elements
transition={{ delay: idx * 0.08, duration: 0.5 }}
```

## Variables de Entorno
- `NEXT_PUBLIC_API_URL` — URL del backend externo (default: `https://misproyectos-neyj.onrender.com`)
- `STRIPE_SECRET_KEY` / `STRIPE_PRIVATE_KEY` — Clave secreta de Stripe
- `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_SITE_URL` — URL del sitio para Stripe callbacks
- Firebase config en `AuthContext.tsx`

## Archivos Clave por Funcionalidad
| Funcionalidad | Archivo |
|---------------|---------|
| Catálogo productos | `lib/catalog.ts` |
| Carrito (estado) | `context/CartContext.tsx` |
| Auth (estado) | `context/AuthContext.tsx` |
| Reseñas (localStorage) | `lib/reviews.ts` |
| Home page | `components/ShopHomePage.tsx` |
| Ficha producto | `components/ProductDetail.tsx` |
| Checkout | `app/[locale]/checkout/page.tsx` |
| Pagos Stripe | `app/api/payments/create-checkout-session/route.ts` |
| SEO (root) | `app/layout.tsx` |
| SEO (locale) | `app/[locale]/layout.tsx` |
| SEO (producto) | `app/[locale]/products/[slug]/page.tsx` |
| Sitemap | `app/sitemap.ts` |
| Robots | `app/robots.ts` |
| Middleware (i18n) | `middleware.ts` |
| Traducciones ES | `messages/es.json` |
| Traducciones EN | `messages/en.json` |
| Estilos globales | `app/globals.css` |

## Sistema de Reseñas
- **Storage:** localStorage key `noctip_reviews` (array de objetos Review)
- **Por producto:** Cada reseña está vinculada a `productSlug`
- **Login obligatorio:** El formulario solo se muestra si `auth.user` existe. Si no, mostrar botón "Inicia sesión para escribir una reseña"
- **Compra obligatoria:** `hasUserPurchasedProduct(userEmail, productSlug)` verifica que el usuario tenga un pedido pagado que contenga ese producto exacto
- **Una por usuario:** `hasUserReviewedProduct()` compara `userEmail` (no display name) para evitar duplicados
- **Compra verificada:** El campo `verified` se establece según `hasUserPurchasedProduct()`, NUNCA se hardcodea
- **Campos:** rating (1-5), title (opcional), comment, author, userEmail, verified, helpful, reported
- **Sorting:** newest, highest, lowest, helpful
- **Stats:** `getProductReviewStats()` calcula media, total y distribución
- **NUNCA** reutilizar reseñas entre productos
- **NUNCA** mostrar reseñas de otro producto
- **NUNCA** mostrar datos falsos (rating inventado, contador de reseñas falso, testimonials ficticios)

## Datos Falsos — PROHIBIDO en Producción
- **NUNCA** mostrar "X clientes felices" sin datos reales del backend
- **NUNCA** mostrar "X.X estrellas" hardcodeadas — solo si `reviewStats.total > 0`
- **NUNCA** mostrar testimonials ficticios (nombres inventados, roles inventados)
- **NUNCA** mostrar contadores de reseñas falsos — solo `reviewStats.total` real
- **NUNCA** mostrar "Compra verificada" sin verificar la compra realmente
- **MEJOR** no mostrar nada que mostrar datos inventados

## Reglas de Seguridad
- **Admin panel:** La clave admin NO debe estar hardcodeada. Usar variable de entorno.
- **Stripe errors:** NUNCA filtrar errores internos de Stripe al cliente. Mensajes genéricos.
- **localStorage:** SIEMPRE envolver en try/catch (Safari private mode puede fallar)
- **CSRF:** El endpoint de Stripe no necesita auth pero no debe exponer errores internos

## Arquitectura de Descuentos (Flujo Completo)
1. CartContext calcula `bundleDiscount` y `totalWithDiscount`
2. CartSidebar muestra el precio descontado al usuario
3. Checkout page envía `bundleId` y `discountPercent` al backend
4. Stripe route aplica el descuento a cada `unit_amount` antes de crear la sesión
5. **NUNCA** enviar el precio sin descuento a Stripe si hay bundle activo

## Configuración de Build
- **Static export:** `output: 'export'` en next.config.js (API routes no funcionan en producción)
- **Backend externo:** Stripe checkout se procesa en `NEXT_PUBLIC_API_URL` (backend en Render)
- **Middleware:** Compilado pero deshabilitado con static export. Locale routing funciona por URL directa.
- **Trailing slash:** NO usar `trailingSlash: true` (inconsistente con metadata URLs)
