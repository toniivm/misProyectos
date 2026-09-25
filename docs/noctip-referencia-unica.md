# Noctip — Documento de Referencia Única (real, sin inventar)

> Fuente: código local `recovery-system/` + verificado vivo `https://noctip.com` (curl 2026-09-25). Si dato no existe, figura como **falta**. Citas `archivo:línea`.

---

## 1. PRODUCTOS (de `lib/catalog.ts:64-269` y confirmado vivo)

> Vivo: `curl https://noctip.com/es/products/halo` → `<title>Noctip Halo — Férula Anti-ronquidos Ajustable 10mm | Elimina Ronquidos Noche 1` coincide con `lib/catalog.ts:67` + `app/[locale]/products/[slug]/page.tsx:29 SEO_TITLES`. Precios vivos no scrapeados por fuera de catálogo (no hay API pública), se asume catálogo = vivo.

### 1.1 Noctip Halo — férula anti-ronquidos
- **Nombre completo:** Noctip Halo (`name: Noctip Halo`, `name_es: Noctip Halo`, `name_en: Noctip Halo`) — `lib/catalog.ts:68-70`
- **Slug:** `halo` (old: `sleepband-pro`) — `lib/catalog.ts:276-289`
- **Precio:** `price 13.99` / `comparePrice 29.99` → **-53%** (`lib/catalog.ts:72-73`) — badge `bestseller` comentado `// Activar cuando haya datos reales` `lib/catalog.ts:76`
- **Precio con bundle:**
  - Solo Halo: €13.99
  - `full-sleep-pack` (halo+sleep-headband) 15%: conjunto €33.98 → **€28.88** (ahorras €5.10)
  - Triple `hws`/`hwn`/`hsn` 20% si Halo va en pack de 3: ej `halo+wave+sleep-headband` €53.97 → **€43.18**
  - `complete-pack` 4 productos 20%: €75.96 → **€60.77**
- **Descripción completa (real, no resumida) `lib/catalog.ts:80-85` ES:**
  > Cada noche que roncas, arruinas tu descanso y el de tu pareja. El Noctip Halo resuelve el problema en su origen: avanza suavemente la mandíbula para abrir la vía aérea, eliminando los ronquidos antes de que empiecen.
  > 
  > El diseño ajustable de doble capa se adapta perfectamente a tu boca con 10mm de micro-ajustes. Silicona de grado médico, hipoalergénica, suave y segura para uso nocturno. Incluye estuche de viaje compacto.
  > 
  > Desde la primera noche notarás la diferencia. Despiertas descansado, sin fatiga, sin dolor de garganta. Y tu pareja duerme por fin en silencio.

  **EN `lib/catalog.ts:82-83`:** `Every night you snore, you ruin your rest — and your partner's... From night one...`

- **Features `lib/catalog.ts:86-93`:**
  1. Elimina ronquidos desde la primera noche — abre tu vía aérea
  2. Ajuste personalizado — 10mm de micro-ajustes para tu boca
  3. Silicona de grado médico — suave, hipoalergénica, segura
  4. Diseño de doble capa — sujeta la mandíbula en posición natural
  5. Estuche de viaje incluido — compacto y discreto
  6. Reutilizable y fácil de limpiar — moldeado hervir y morder

- **Specs `lib/catalog.ts:94-102`:**
  - Tipo: Férula de avanzamiento mandibular anti-ronquidos
  - Ajuste: Rango de 10mm — micro-ajustes individuales
  - Material: Silicona médica libre de BPA
  - Diseño: Doble capa — bandejas superior e inferior
  - Moldeado: Hervir y morder — ajuste personalizado
  - Incluye: Férula + estuche de viaje
  - Reutilizable: Sí — lavable y duradera

- **Imágenes `lib/catalog.ts:103-110`:** `/images/mouthpiece-1.jpg` → `/images/mouthpiece-6.jpg` (6) — existen en `public/images/mouthpiece-*.jpg` ✅
- **Vídeo:** **falta** (no hay `video` en `lib/catalog.ts:111` para halo)
- **Promesa principal / claim:** `Elimina los ronquidos desde la primera noche. Tu pareja también dormirá mejor.` (`shortDescription` `lib/catalog.ts:77`) + `Desde la primera noche notarás la diferencia.`
- **Nicho/problema:** Anti-ronquido pareja, apnea leve posicional, vía aérea mandíbula. **Falta** diagnóstico médico (no claim apnea).

### 1.2 Noctip Rest — banda audio para dormir
- **Nombre:** Noctip Rest (`sleep-headband`) — `lib/catalog.ts:165-168` — old `sleepband`, `rest`, `sleep-headband`
- **Precio:** `19.99` / `34.99?` no, `31.99` `lib/catalog.ts:171-173` → -37% — **sin badge**
- **Bundle:** solo: €19.99 / duo Halo+Rest 15% €28.88 / triple 20% €43-49 / 4-pack €60.77. **Quantity-break nuevo `components/BundleSelector.tsx:20-44`:** `Compra 2, ¡1 Gratis!` 3 uds por €39.98 (pagas 2) y `Compra 3, ¡2 Gratis!` 5 uds por €59.97 (pagas 3) — precio por bundle cuantitativo.
- **Descripción completa `lib/catalog.ts:177-182` ES:**
  > Si nunca has probado una banda de sueño, empieza aquí. 45 gramos que no sientes. Lavable a máquina. 10 horas de batería. Sin apps, sin cables, sin curva de aprendizaje.
  > 
  > Te la pones y funciona. Así de simple. Los altavoces ultrafinos no presionan tus orejas — la tela suave desaparece al ponértela. Conecta por Bluetooth a tu móvil y duerme con tu podcast, música o ruido blanco favorito.
  > 
  > Despiertas preguntándote por qué no lo intentaste antes.

- **Features `lib/catalog.ts:183-192` (7):**
  - Bluetooth 5.0 — conexión estable y rápida sin cables
  - Altavoces ultrafinos — sin presión en orejas, ideal lado
  - Lavable a máquina — retira altavoces en segundos
  - 10+ horas batería — toda la noche
  - Tela transpirable PVC — fresca, cómoda y duradera
  - Talla única elástica — se adapta a cualquier cabeza
  - Control volumen integrado — sin móvil
  - Rango 20-20000 Hz — sonido claro

- **Specs `lib/catalog.ts:193-204`:**
  - Tipo: Auriculares inalámbricos para dormir
  - Batería: 10+ horas
  - Carga: ≈1.5h (Micro-USB)
  - Conectividad: Bluetooth 5.0
  - Material: PVC transpirable — resistente y ligero
  - Tallas: Talla única — elástica
  - Peso: ≈45g
  - Frecuencia: 20-20000 Hz
  - Control: Volumen integrado
  - Incluye: Banda + Cable carga

- **Imágenes:** `/images/sleep-headband-1.webp` → `-6.webp` (6) existen `public/images/sleep-headband-*.webp` ✅ + `/images/products/sleep-headband.jpg` OG
- **Vídeo:** `video: '/videos/noctip-rest-val.mp4'` `lib/catalog.ts:213` — existe `public/videos/noctip-rest-val.mp4` + `uyt0dv-h265-hd.mp4` ✅
- **Promesa:** `Audio para dormir sin auriculares. 45 gramos que desaparecen al ponértelos.` + `Despiertas preguntándote por qué no lo intentaste antes.`
- **Nicho:** Insomnio leve, side-sleeper odia auriculares, pareja roncador, viajero.

### 1.3 Noctip Back — corrector postural
- **Nombre:** Noctip Back (`slug: wave`, `name: Noctip Back`) — `lib/catalog.ts:116-119` — old `white-noise-pro`, `back`, `wave` — carpeta imágenes `posture-corrector-*.webp` no `wave`
- **Precio:** `19.99` / `31.99` -37% `lib/catalog.ts:121-122` — badge `new` `lib/catalog.ts:125`
- **Bundle:** solo €19.99 / `recovery-pack` wave+neck-massager 15% €35.68 / triples 20% €43-49 / 4-pack €60.77. Quantity-break igual que Rest: 3 uds €39.98, 5 uds €59.97.
- **Descripción completa `lib/catalog.ts:129-134` ES:**
  > Tu columna recuerda la mala postura. Cada hora encorvado frente al ordenador se acumula y termina en dolor crónico. El Noctip Back reentrena tu postura con soporte ergonómico en forma de Y que jala tus hombros hacia atrás suavemente.
  > 
  > Correas ajustables de XS a XL, se adapta a cualquier cuerpo. Úsalo debajo de la ropa — nadie lo notará. Solo 15 minutos al día son suficientes para reconstruir el hábito.
  > 
  > En dos semanas, tu cuerpo recuerda solo. Sin dolor, sin esfuerzo consciente. Tu quiropráctico notará la diferencia.

- **Features `lib/catalog.ts:135-142`:**
  - Corrige postura naturalmente — soporte Y
  - Se adapta — correas XS a XL
  - Invisible bajo ropa — nadie lo notará
  - Malla transpirable — comodidad todo el día
  - Resultados visibles en 2 semanas — antes/después real
  - Ligero y portátil — llévalo a cualquier parte

- **Specs `lib/catalog.ts:143-151`:**
  - Tipo: Corrector postural en forma de Y
  - Tallas: XS / S / M / L / XL
  - Material: Malla transpirable + correas reforzadas
  - Ajuste: Correas velcro — posiciones ilimitadas
  - Peso: ≈120g
  - Cuidado: Lavar a mano — secar al aire
  - Guía tallas: Medición ancho pecho incluida

- **Imágenes:** `/images/posture-corrector-1.webp` → `-6.webp` (6) existen `public/images/posture-corrector-*.webp` ✅ — vacíos `public/images/back/gallery|details` **falta contenido**
- **Vídeo:** **falta**
- **Promesa:** `Corrige tu postura en 2 semanas. Adiós al dolor de espalda del escritorio.` (claim 14 días sin fuente clínica — riesgo)
- **Nicho:** Dolor espalda oficina/teletrabajo, postura encorvada, cintura.

### 1.4 Noctip Cervical — masajeador cervical
- **Nombre:** Noctip Cervical (`neck-massager`) — `lib/catalog.ts:221-224` — old `weighted-mask-pro`, `cervical`, `neck-massager` — badge comentado
- **Precio:** `21.99` / `34.99` -37% `lib/catalog.ts:226-228`
- **Bundle:** solo €21.99 / recovery-pack €35.68 / triples €44-49 / 4-pack €60.77. Quantity-break igual.
- **Descripción completa `lib/catalog.ts:234-239` ES (reescrita P0-5 humana, ya sin aerosol mate):**
  > Tensión acumulada en cuello y hombros después de horas sentado. El Noctip Cervical la libera en 15 minutos con calor suave y masaje sin cables.
  > 
  > Se adapta a cualquier cuello, no aprieta y no da alergia. Pequeño y portátil: úsalo en casa, en la oficina o de viaje. Una sesión y notas los hombros más ligeros.
  > 
  > 15 minutos al día y mejora la circulación. Material ABS+TPR resistente, 200g, con temporizador automático.

  **Descripción original antes P0-5 (histórica):** `Almohadillas de electrodos curvos pintados con aerosol mate... Tres capas de relajación — desde los nervios hasta los vasos sanguíneos...` (traducción AliExpress, ya eliminada).

- **Features actuales `lib/catalog.ts:240-247`:**
  - Se adapta a cualquier cuello — cómodo y no alergénico
  - Calor suave + masaje — alivia en 15 min
  - Sesión 15 min — temporización automática
  - Compacto y portátil — úsalo donde quieras
  - No alergénico — material alta calidad
  - Uso en casa, oficina o viaje

- **Specs `lib/catalog.ts:248-259`:**
  - Tipo: Masajeador cervical con electrodos curvos
  - Material: ABS y TPR
  - Peso: 200g
  - Dimensiones: 17 × 5 × 17 cm
  - Color: Blanco
  - Tiempo masaje: 15 min (auto)
  - Electrónico: Sí
  - Fuente: Corriente Continua
  - Voltaje: <50V CA
  - Incluye: Masajeador, Cable USB, Manual

- **Imágenes:** `/images/cervical-gallery-1.jpg` → `-3.jpg` (3) existen `public/images/cervical-gallery-*.jpg` + `products/neck-massager.jpg` ✅ — vacíos `cervical/details|package` falta
- **Vídeo:** **falta**
- **Promesa:** `Alivio cervical en 15 minutos. Calor suave, sin cables.` / `Alivio cervical profesional en 15 minutos.` (ya suavizado)
- **Nicho:** Tensión cuello/hombros trabajo 10h, conductor, oficina.

---

## 2. BUNDLES

> Fuente: `lib/catalog.ts:337-402` — `export const BUNDLES: Bundle[]` + `getActiveBundle(cartSlugs: string[]): Bundle | null` `lib/catalog.ts:404-414`
> Lógica: `unique = [...new Set(cartSlugs)]` → `hasAll = bundle.slugs.every(s=>unique.includes(s))` → elige mayor `discountPercent`.

| ID | Nombre ES / EN | Slugs | Dto | Condición |
|---|---|---|---|---|
| `full-sleep-pack` | Pack Sueño Completo / Full Sleep Pack | `halo`, `sleep-headband` | 15% | Llevar los 2 |
| `recovery-pack` | Pack Recuperación / Recovery Pack | `wave`, `neck-massager` | 15% | Llevar los 2 |
| `triple-hws` | Pack Triple | `halo`, `wave`, `sleep-headband` | 20% | Cualquier 3 de estos |
| `triple-hwn` | Pack Triple | `halo`, `wave`, `neck-massager` | 20% | Cualquier 3 |
| `triple-hsn` | Pack Triple | `halo`, `sleep-headband`, `neck-massager` | 20% | Cualquier 3 |
| `triple-wsn` | Pack Triple | `wave`, `sleep-headband`, `neck-massager` | 20% | Cualquier 3 |
| `complete-pack` | Pack Todo Noctip / Everything Pack | `halo`, `wave`, `sleep-headband`, `neck-massager` | 20% | Los 4 |

**Plus quantity-break en PDP (nuevo `components/BundleSelector.tsx:20-44`):** No es `BUNDLES`, es oferta por cantidad del *mismo* producto (tipo Oliver West):

| Tier | Label ES / EN | Pagas / Recibes | Ejemplo Rest (19.99) | Compare total |
|---|---|---|---|---|
| 1 | Compra 1 / Buy 1 | 1 / 1 | **€19.99** (€31.99) | 1×31.99 |
| 2 | Compra 2, ¡1 Gratis! / Buy 2, Get 1 Free! (**Más Popular**) | 2 / 3 +Envío Gratis | **€39.98** (€95.97) | 3×31.99 |
| 3 | Compra 3, ¡2 Gratis! / Buy 3, Get 2 Free! (**Mejor Valor**) | 3 / 5 +Envío Gratis | **€59.97** (€159.95) | 5×31.99 |

Cálculo: `tierPrice = paid * unitPrice`, `compare = total * comparePrice`, `save = (compare-price)/compare`. Para producto con tallas (`wave`) despliega selector talla por unidad.

---

## 3. AVATAR / PÚBLICO OBJETIVO (deducido del copy real, no inventado)

> Si dato no está explícito en copy, figura como **falta**.

- **Edad:** **Falta** explícita en `lib/catalog.ts` (no menciona edad). Deducido de `AGENTS.md:48 TARGET 50-70 años, pocas habilidades digitales` + `components/ShopHomePage.tsx:57 ¿TU PAREJA TE ECHA POR RONCAR?` + PDP `En dos semanas tu cuerpo recuerda solo. Tu quiropráctico notará la diferencia` → tono adulto 35-65. **No puedo confirmar 50-70 solo con copy producto** — sale de AGENTS, no de catálogo.
- **Género:** **Mixto**. No hay género en slug/nombre. Copy neutral: `Tu pareja también dormirá mejor` (no dice él/ella), `Se adapta a cualquier cuerpo/cuello` (`lib/catalog.ts:131,239`). **Falta** segmentación explícita.
- **Situación que describe el copy actual por producto:**
  - Halo: `Cada noche que roncas, arruinas tu descanso y el de tu pareja... Despiertas descansado, sin fatiga, sin dolor garganta. Y tu pareja duerme por fin en silencio.` (`lib/catalog.ts:80-85`)
  - Rest: `Si nunca has probado una banda... 45 gramos que no sientes... Te la pones y funciona... Conecta por Bluetooth a tu móvil y duerme con tu podcast...` (`lib/catalog.ts:177-182`)
  - Back: `Tu columna recuerda la mala postura. Cada hora encorvado frente al ordenador se acumula... Solo 15 minutos al día son suficientes...` (`lib/catalog.ts:129-134`) — teletrabajo/oficina.
  - Cervical: `Tensión acumulada en cuello y hombros después de horas sentado... Pequeño y portátil: úsalo en casa, oficina o viaje.` (`lib/catalog.ts:234-239`)

- **Dolor/problema principal por producto:**
  - Halo: ronquido, vía aérea mandíbula, fatiga, dolor garganta, conflicto pareja.
  - Rest: insomnio leve, auriculares incómodos de lado, luz/ruido.
  - Back: dolor espalda crónico, hombros encorvados, hábito postural.
  - Cervical: tensión nuca, circulación, 15min fisio.

- **Tono de voz usado (de `ShopHomePage COPY` y `catalog.ts`):**
  - `components/ShopHomePage.tsx:13-96 COPY.es` hero `title: Duerme toda la noche. Despierta como si hubieras descansado.` → **cercano, directo, 2º ESO, sin jerga técnica** (cumple `AGENTS.md: textos simple`).
  - `body: No vendemos "bienestar". Vendemos noches sin roncar, cuellos que no crujen... Si no se nota desde la primera noche, no lo vendemos.` → **desafiante, honesto, aspiracional vs cotidiano**.
  - `subtitle: Sin pastillas ni aparatos enormes...` → **anti-pastilla, anti-aparato, cercano**.
  - PDP features con verbo: `Elimina, Corrige, Se adapta...` → **beneficio primero, no característica**.
  - **Falta** humor negro salvo tagline `¿TU PAREJA TE ECHA...?` que es **humor ligero** `ShopHomePage.tsx:57`.

---

## 4. COPY EXISTENTE reutilizable

> Fuente: `messages/es.json` 156 líneas, `components/ShopHomePage.tsx:13-96`, `components/ProductDetail.tsx:184-203` FAQs, `lib/catalog.ts` short/descriptions.

**Headlines y taglines ya usados:**

- **Hero tagline `ShopHomePage.tsx:57` (ES):** `¿TU PAREJA TE ECHA POR RONCAR? · ¿NO SOPORTAS DORMIR CON AURICULARES?` / EN `YOUR PARTNER KICKED YOU OUT FOR SNORING? · CAN'T SLEEP WITH EARBUDS?`
- **Hero title `ShopHomePage.tsx:58`:** `Duerme toda la noche. Despierta como si hubieras descansado.` / `Sleep through the night. Wake up like you actually rested.`
- **Hero subtitle `ShopHomePage.tsx:59`:** `Sin pastillas ni aparatos enormes. Férula anti-ronquidos, banda de 45g y correctores posturales — entrega 5–10 días, 30 noches de prueba. Elige tu problema, nosotros el resto.`
- **Section `ShopHomePage.tsx:68` products heading:** `Elige tu problema` / `Pick your problem` — `sub: 4 herramientas — cada una resuelve una cosa bien.`
- **Why Noctip `ShopHomePage.tsx:71`:** `¿POR QUÉ NOCTIP? No vendemos "bienestar". Vendemos noches sin roncar, cuellos que no crujen y espaldas que no duelen tras 8h sentado. Si no se nota desde la primera noche, no lo vendemos.` + motto `Un problema, un producto que lo soluciona.`
- **Bestseller `ShopHomePage.tsx:74-86` Rest:** badge `PRODUCTO HÉROE`, heading `Noctip Rest`, `Price €19.99 / Compare €31.99 (38% dto.)`, subtitle `Audio para dormir sin auriculares. 45g, no presiona — ideal si duermes de lado. Lavable. 10h.`, features 4 bullets, CTA `Quiero Rest — 30 noches`
- **Guarantee `ShopHomePage.tsx:90-92`:** heading `Pruébalo 30 noches. Quédate solo si duermes mejor.` body `Si tus noches no son más silenciosas o tu cuello/espalda no lo nota, lo recogemos y te devolvemos el 100% — sin formularios.`
- **Mobile CTA `ShopHomePage.tsx:94`:** `Mi solución` / `Find my fix`

**CTAs actuales:**

- `Encuentra mi solución en 30s` (`hero.cta` `ShopHomePage.tsx:60`) → scroll `#quiz`
- `Ver todos` / `See all products` (`ShopHomePage.tsx:61`)
- `Quiero Rest — 30 noches` (`bestseller.cta` `ShopHomePage.tsx:85`)
- `Comprar con garantía` (`guarantee.cta` `ShopHomePage.tsx:92`)
- PDP: `Añadir al carrito — €{price*qty}` (`ProductDetail.tsx:377`), ahora reemplazado por `BundleSelector.tsx` `Añadir al carrito — €{tierPrice}` con `BundleTier` 2+1/3+2
- Sticky: `Añadir — €` (PDP desktop/mobile)
- Checkout `messages/es.json:66`: `Continuar al pago`, `Pagar`, `Paga de forma segura con tarjeta, PayPal, Apple Pay o Google Pay` (actualizado P0-5)
- Success `messages/es.json`: `Gracias por tu pedido`, `Seguir comprando`

**Frases/ángulos que se repiten (señal de marca fuerte):**

- `45g` (Rest) — aparece en `shortDescription`, `description`, `features`, `hero subtitle`, `specs` (7 veces)
- `10 horas batería` / `10h` (Rest)
- `10mm micro-ajustes` (Halo)
- `15 minutos al día` / `15 min` (Back y Cervical) — ancla tiempo corto
- `Lavable` / `lavable a máquina` (Rest) — 3 veces
- `Sin pastillas ni aparatos enormes` (`ShopHomePage:59`) — angle anti-farmacia
- `Sin apps, sin cables, sin curva de aprendizaje` (`Rest description`)
- `Invisible bajo la ropa — nadie lo notará` (Back)
- `30 noches de prueba` / `30 noches` — en hero, bestseller, guarantee, PDP trust, cart, shipping, legal (12+ veces) — claim central
- `Envío 5-10 días` / `5–10 day delivery` — hero, trust bar, PDP, checkout, footer

---

## 5. IDENTIDAD DE MARCA

> `app/globals.css:1-466` + `tailwind.config.js:1-136` + `docs/DESIGN_SYSTEM.md`

- **Nombre:** **Noctip™** — `lib/catalog.ts:68` + `app/layout.tsx:35 title.default`. **Significado:** `docs/gurus-dropshipping-ia-2025.md` interpreta `nocti` (noche en latín) + `tip` (consejo/punta) pero **falta documentado oficial** en repo (no hay `AGENTS.md` sección etimología). No inventado → **falta significado oficial**.
- **Paleta (de `globals.css:11-32` y `tailwind.config.js:14-62`):**
  - `--bg-base: #080c12` (fondo principal)
  - `--bg-secondary: #0d1219` (cards)
  - `--bg-tertiary: #111720` (elevated)
  - `--text-primary: #f2eee7` (texto principal)
  - `--text-secondary: #8791a1`
  - `--text-muted: #6b7785`
  - `--accent: #10BFD8` (cyan CTA)
  - `--accent-hover: #0ea5c0`
  - `--border-subtle: rgba(255,255,255,0.06)`
  - `tailwind text.primary: #EAF1FF`, `accent.DEFAULT: #10BFD8`, `base.DEFAULT: #080c12` (duplicado)
  - Header vivo blanco `#ffffff` con `bg-white` (`components/Header.tsx:100`) — contraste light header vs dark body

- **Tono visual:** `DESIGN_SYSTEM.md`: `Oscuro premium, minimalista Apple/Nothing/WHOOP-like, confianza premium tecnología accesible` — `ShopHomePage` Nuvoro-style light hero + dark PDP, `rounded-2xl border border-white/[0.06] bg-[#0d1219]`, `rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#080c12]` CTA blanco, `motion.div initial opacity 0 y 20 viewport once`

- **Qué NO hace la marca (de `AGENTS.md:38` + auditoría):**
  - **NO testimonios ficticios:** `AGENTS.md:309 NUNCA mostrar testimonials ficticios (nombres inventados)` — violado antes P0-2, ahora `CustomerReviews.tsx` y `TrustpilotReviews.tsx` devuelven `null` hasta reviews reales Firestore
  - **NO rating fake:** `AGENTS.md:309 NUNCA mostrar "4.9 estrellas" hardcodeada — solo si reviewStats.total>0` — cumple `ProductDetail.tsx:268 displayReviewCount>0 && <Stars>`
  - **NO urgencia falsa:** No hay `quedan X unidades` ni contador roto en PDP (a propósito para 50-70a) — `ConversionBoosters.tsx` no existe
  - **NO promo codes:** `AGENTS.md:2 Descuentos por bundle DESACTIVADOS` — `allow_promotion_codes: false` en `app/api/payments/...route.ts:65` y checkout `Promo codes disabled` `page.tsx:718`
  - **NO type="number" en inputs:** `AGENTS.md` `NUNCA usar type="number"` — checkout usa `type="text"` + `inputMode="text"` `page.tsx:678`
  - **NO zoom móvil:** `viewport maximumScale:1 userScalable:false` `app/layout.tsx:28` + `globals.css:84 font-size 16px !important` para 50-70

---

## 6. ESTADO ACTUAL DEL NEGOCIO (de auditoría Fase 0-1, commits hasta `26b1efd`)

### Qué está roto o pendiente ahora mismo

**P0 bloqueantes — 5/5 resueltos y pusheados `main` 2026-09-25:**
- ✅ P0-1 Meta Pixel `1114595834244725` ya en `components/ProductDetail.tsx:24,96,145` ViewContent/AddToCart + `checkout/page.tsx:13 InitiateCheckout` + `success/page.tsx:11 Purchase` — **pendiente tuyo:** `Render Environment NEXT_PUBLIC_META_PIXEL_ID` ya lo añadiste, falta verificar Helper tras rebuild (curl aún 0 fbq cache)
- ✅ P0-2 reseñas falsas eliminadas `CustomerReviews.tsx`/`TrustpilotReviews.tsx` → `return null`
- ✅ P0-3 GA4 purchase con dto `getActiveBundle` + dedup `sessionStorage purchase_fired_` + no 0€ fallback `success/page.tsx:61-129`
- ✅ P0-4 legal LSSI placeholder `C/ Fernando Vela Nº 18, 28023 Madrid + [NIF pendiente] + [Tel pendiente]` en `legal-notice`/`privacy:33` + contact form ahora `POST ${API_BASE_URL}/emails/contact` `contact/page.tsx:15-19` + `server/src/app.js:1297` endpoint — **pendiente tuyo:** reemplazar `[Pendiente]` con NIF/CIF forma jurídica + teléfono real
- ✅ P0-5 PayPal copy incluye PayPal `checkout/page.tsx:730` + `BundleSelector.tsx` 2+1/3+2 + cervical reescrito humano

**P1/P2 importantes — 80% resueltos en `26b1efd`:**
- ✅ P1-9 sitemap `app/sitemap.ts:9 new Date()` dinámico (antes hardcode 2026-09-17) + robots `disallow: ['/admin','/checkout']` sin slash + `products/[slug]/page.tsx:58` y `shop/[category]/page.tsx:33` `x-default` + `ProductGallery.tsx:256` alt honesto + `shipping/page.tsx:41` unificado 5-10 días + `cookies/page.tsx:84` tabla real `recover_cart/noctip_cookie_consent` + cervical humanizado
- **Pendiente P1:** `CategoryPage.tsx` hero editorial 600px empuja grid below fold (2 scrolls 375px) — no tocado; `CartContext.tsx:72` REMOVE por `slug` solo borra todas tallas `Back M+L` (sigue); slider precio 20-200 inútil; sort rating placebo (rating 0)
- **Pendiente P2:** Higgsfield/TikTok Pixel aún sin ID (solo Meta), TawkTo sin observer, `ProductDetail` still 789 líneas con `selectedSize` legacy no usado tras BundleSelector

### Qué SEO/tracking está activo vs no

**Activo ✅:**
- GA4 `G-HVTC1MN829` `components/GoogleAnalytics.tsx:5` con Consent Mode v2 `default denied` → `grantConsent` tras `CookieConsent` + events `PageView` (config), `view_item` PDP, `add_to_cart` (con tierPrice ahora), `begin_checkout` (con dto), `purchase` (con dto)
- Meta Pixel ID `1114595834244725` PageView+ViewContent/AddToCart/InitiateCheckout/Purchase (tras P0-1) — vivo pendiente rebuild
- SEO técnico: `app/sitemap.ts` 66 URLs (es/en × 4 productos × 2 categorías × static), `app/robots.ts` allow/ disallow correcto, `metadataBase https://noctip.com` `app/layout.tsx:47`, `generateMetadata` canonical + hreflang `x-default` solo en locale layout y ahora también PDP/category, `OG images` absolutas `https://noctip.com${cp.images[0]}`, `JSON-LD` Organization + WebSite SearchAction + OnlineStore + FAQPage + BreadcrumbList + Product Offer `priceValidUntil +365` + `aggregateRating` solo si >0 honesto

**No activo / falta ❌:**
- TikTok Pixel `NEXT_PUBLIC_TIKTOK_PIXEL_ID` **falta** (vacío `.env.local:32`)
- Conversions API server-side **falta** (solo browser pixel, iOS bloquea 30-40%) — P0-1 nota: necesita `POST graph.facebook.com/v19.0/<ID>/events` en `server/src/app.js`
- Google Search Console / Merchant Center verificación `verification.google` **falta** en `app/layout.tsx:75`
- TikTok/TawkTo no cargan sin ID, UtmCapture early return no actualiza utm, sitemap sin `<xhtml:link hreflang>` (Next MetadataRoute no soporta, solo canonical)

---

## 7. ASSETS DISPONIBLES

### Imágenes / vídeos ya existentes `public/images` y `public/videos`

> `ls -R public/images` + `ls public/videos` 2026-09-25

**Reutilizables directos (catálogo, 44 archivos):**
- `public/images/mouthpiece-1.jpg` → `-6.jpg` (6) — Halo
- `public/images/posture-corrector-1.webp` → `-6.webp` (6) — Back
- `public/images/sleep-headband-1.webp` → `-6.webp` (6) — Rest
- `public/images/cervical-gallery-1.jpg` → `-3.jpg` (3) — Cervical
- `public/images/products/sleep-headband.jpg` (OG 1200x630) + `products/neck-massager.jpg`
- `public/images/logo/logo.png` (logo)
- `public/images/pomelli_creative_video_9_16_0626MasajeEspalda.mp4` (1) — en `images/` no en `videos/` — mal ubicado
- `public/images/productos-reales/sleepband-pro.avif`, `-2.avif`, `sleep-headband.avif`, `-2.avif` (4), `weighted-mask-pro.webp`, `white-noise-pro.webp` — **no referenciados en catálogo** (desperdicio, pero reutilizables para UGC crudo)
- `public/images/rest/lifestyle/1.png` → `5.png` (5) — ex avatares fake CustomerReviews (ya no usados, pero son lifestyle reales)
- `public/images/rest/gallery/1.jpg`, `2.png` (2), `cervical/gallery/1.jpg` (1)
- Vacíos: `public/images/back/details|gallery|lifestyle|package`, `cervical/details|lifestyle|package`, `halo/details|gallery|lifestyle|package`, `rest/details|package` — **falta contenido** (0 archivos)

**Vídeos `public/videos`:**
- `public/videos/noctip-rest-val.mp4` — usado `lib/catalog.ts:213` Rest PDP gallery ✅
- `public/videos/uyt0dv-h265-hd.mp4` — **no referenciado** (reutilizable para ads)

**Peso:** `.webp/.jpg` optimizados pero `next.config.js:9 unoptimized:true` → se sirven tal cual sin `/_next/image` responsive (375 necesita 400px pero baja 1200px).

### Blog posts existentes `app/[locale]/blog/page.tsx:4-37` + `app/sitemap.ts:52-55`

| Slug | Título ES | Título EN | Tema para guión |
|---|---|---|---|
| `como-dejar-de-roncar-sin-cirugia` | Cómo dejar de roncar sin cirugía: guía honesta 2026 | How to Stop Snoring Without Surgery: Honest Guide 2026 | Base Halo — qué funciona vs no, cuándo férula (Initial→Deseada Halo) |
| `como-dormir-mejor-sin-pastillas` | Cómo dormir mejor sin pastillas: 7 rutinas que sí ayudan | How to Sleep Better Without Pills: 7 Routines That Help | Base Rest — luz/ruido/rutina, banda como alternativa auriculares |
| `corrector-postura-funciona-de-verdad` | Corrector de postura: ¿funciona de verdad o es placebo? | Posture Corrector: Does It Really Work or Is It Placebo? | Base Back — evidencia 15min/día + ejercicios, cuándo ayuda Back |
| `masajeador-cervical-beneficios` | Masajeador cervical: beneficios y contraindicaciones | Cervical Massager: Benefits and Contraindications | Base Cervical — 15min 3 capas, quién sí/no, rutina segura |

Cada uno tiene `excerpt_es/en` + `date 2026-09-17` — sirven de **guión largo → script UGC 28s** (hook problema + 7 tips resumidos en 15s demo).

---

> **Cómo usar este doc:** Copia `docs/noctip-higgsfield-angles.md` (prompts Initial→Deseada) + esta sección 1 (descripciones verbatim) + sección 4 (headlines repetidos `45g/10mm/15min/30 noches`) para brief a Higgsfield/Novoads/CapCut. No inventes specs: si falta, pon `falta` (ej Halo vídeo falta, Back package falta).
