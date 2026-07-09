# Guía del Proyecto Noctip

## Identidad del Proyecto
Noctip es una marca premium de productos de sueño y recuperación. Vende 4 productos:
- **Noctip Halo** — Férula anti-ronquidos (€17.99, antes €29.99)
- **Noctip Back** — Corrector postural (€19.99, antes €31.99)
- **Noctip Rest** — Banda de audio para dormir (€11.99, antes €21.99)
- **Noctip Cervical** — Masajeador cervical (€14.99, antes €24.99)

Mercado: Europa. Idiomas: Español e Inglés.

## Stack Técnico
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Auth + DB:** Firebase (Auth + Firestore)
- **Pagos:** Stripe
- **i18n:** next-intl (useLocale, useTranslations)
- **Iconos:** Lucide React
- **Tests:** Playwright (E2E)

## Estructura de Directorios
```
recovery-system/
├── app/
│   ├── [locale]/          # Páginas (es/en)
│   │   ├── page.tsx       # Home → ShopHomePage
│   │   ├── products/      # Fichas de producto
│   │   ├── shop/          # Páginas de categoría
│   │   ├── checkout/      # Checkout
│   │   ├── about/         # Sobre nosotros
│   │   ├── contact/       # Contacto
│   │   ├── account/       # Cuenta de usuario
│   │   ├── legal/         # Políticas legales
│   │   └── tracking/      # Seguimiento de pedidos
│   ├── api/               # API routes
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ShopHomePage.tsx   # Home page completa
│   ├── ProductDetail.tsx  # Ficha de producto
│   ├── CartSidebar.tsx    # Carrito lateral
│   ├── Footer.tsx
│   ├── ConversionBoosters.tsx
│   ├── ui/                # Componentes UI (Badge, FAQ, Stars)
│   └── ...
├── context/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/
│   └── catalog.ts         # Catálogo de productos
├── i18n/
├── messages/              # Traducciones (es.json, en.json)
└── public/images/         # Imágenes
```

## Convenciones de Código
1. Todos los componentes client llevan `'use client'` al inicio
2. Textos con i18n: `useLocale()` para idioma, `useTranslations()` para textos
3. Colores del tema oscuro (ver Design System más abajo)
4. Animaciones con Framer Motion (`motion.div`, `whileInView`, `viewport={{ once: true }}`)
5. Iconos exclusivamente de Lucide React
6. Lazy loading en imágenes: `loading="lazy"` excepto hero
7. Botones mínimos 44x44px en móvil (accesibilidad)

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

## Comandos Útiles
```bash
cd recovery-system
npm run dev          # Desarrollo
npm run build        # Build producción
npm run lint         # Linting
npm run test:e2e     # Tests E2E con Playwright
```

## Reglas de Modificación
- **NUNCA** eliminar funcionalidad existente sin preguntar
- **NUNCA** modificar el catálogo de productos (`lib/catalog.ts`) sin confirmación
- **SIEMPRE** mantener compatibilidad i18n (es/en)
- **SIEMPRE** testear que `npm run build` pase después de cambios
- Preferir edición de archivos existentes sobre creación de nuevos
- Seguir el estilo existente del archivo al editar

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
- **PROMO CODE:** Input sin `uppercase` automático (causa bugs en Android), validación suave
- **CHECKOUT:** Siempre opción "Compra como invitado" visible
- **FEEDBACK:** Todo botón debe tener estado visual (loading, success, error)
- **NAVEGACIÓN:** Siempre visible, sin menús ocultos en móvil
- **STICKY CTA:** En móvil, botón de compra siempre visible abajo
- **EVITAR:** Zoom al tocar inputs, scroll horizontal accidental, popups que bloqueen
