# Auditoría Premium Noctip — Documento de Mejora

## Resumen Ejecutivo

**Problema central:** La web funciona pero transmite "tienda pequeña". Falta contenido visual, lifestyle, storytelling emocional y elementos de confianza que las marcas premium utilizan para generar credibilidad.

**Principales hallazgos:**
- 85% del contenido es texto, solo 15% visual
- Sin fotografía lifestyle (personas usando productos)
- Sin vídeo en ninguna sección
- Sin infografías explicativas
- Confianza repetida 5+ veces en vez de una sección fuerte
- Sin social proof real (reviews = 0 en todos los productos)
- Ritmo visual monótono (heading + paragraph + grid repetido)

---

## TABLA 1: HOMEPAGE (`ShopHomePage.tsx`)

| Sección | Problema detectado | Impacto (1-10) | Propuesta de mejora | Recursos necesarios | Prioridad |
|---|---|---|---|---|---|
| **Announcement Bar** | Barra cyan plana con texto rotativo — patrón dropshipping | 7 | Cambiar a barra sutil monocroma con un solo mensaje estático o eliminarse | Ninguno | Alta |
| **Hero** | Imagen de producto sobre fondo oscuro, sin lifestyle, sin emoción | 10 | Hero con imagen lifestyle panorámica (persona durmiendo tranquila), producto flotante, beneficio emocional | Foto lifestyle hero, imagen producto flotante | Crítica |
| **Hero - Social Proof** | Badge "Trusted by thousands" sin evidencia | 8 | Eliminar claim sin datos o mostrar métricas reales (pedidos, países) | Datos reales del backend | Alta |
| **Trust Bar** | 4 badges de texto repetidos 5+ veces en la web | 6 | Consolidar en una sola sección de confianza premium con iconos propios | Iconos custom, imagen de garantía | Media |
| **Productos** | Cards con SVG/ilustraciones como imagen principal | 10 | Reemplazar con fotografías reales de cada producto sobre fondo limpio | 6 fotos por producto (ver lista) | Crítica |
| **Productos - Badge** | Badges "bestseller"/"new" genéricos | 5 | Badges personalizados con estilo de marca | Diseño de badges | Baja |
| **Problemas** | 3 cards con iconos genéricos (Moon, Zap, Heart) y texto negativo | 7 | Reformular como "Momentos que recuperarás" con fotos lifestyle positivas | 3 fotos lifestyle (pareja durmiendo, persona trabajando, persona descansando) | Alta |
| **Cómo funciona** | 3 cards numeradas genéricas, patrón template | 6 | Reemplazar con sección visual tipo timeline con imágenes de cada paso | 3 fotos (packaging, usando producto, durmiendo tranquilo) | Media |
| **Comparativa** | Tabla 100% vs 0% — no es creíble | 9 | Eliminar tabla o hacer comparativa equilibrada con "soluciones alternativas" | Ninguno | Alta |
| **Garantías** | 4 cards de texto con checkmarks | 5 | Convertir en sección visual con imagen de garantía + iconos | 1 imagen de garantía (badges SSL, Stripe) | Baja |
| **FAQ** | Acordeón funcional pero aburrido | 4 | Mantener pero con mejor diseño visual | Ninguno | Baja |
| **CTA final** | Texto + 2 botones, sin emoción | 6 | Añadir imagen lifestyle de fondo o vídeo sutil | 1 lifestyle hero | Media |
| **Mobile Sticky CTA** | Muestra "Shop now — From €11.99" — patrón discount store | 7 | Cambiar a "Comprar ahora" sin precio o con precio del producto destacado | Ninguno | Media |

**Impacto total de la Homepage:** 95/140 puntos

---

## TABLA 2: PÁGINA DE PRODUCTO (`ProductDetail.tsx`)

| Sección | Problema detectado | Impacto (1-10) | Propuesta de mejora | Recursos necesarios | Prioridad |
|---|---|---|---|---|---|
| **Header** | Header separado del global, con SVG flags manuales | 7 | Unificar con el header global del layout | Ninguno | Alta |
| **Gallery** | Solo fotos de producto sobre fondo oscuro, sin lifestyle | 10 | Añadir lifestyle shots, "what's in the box", detalles de material | 8-10 fotos por producto | Crítica |
| **Gallery - Video** | Un solo vídeo (Rest), los demás sin vídeo | 8 | Añadir vídeo de uso/cómo funciona a cada producto | 4 vídeos (1 por producto, 15-30s) | Alta |
| **Product Info** | Columna extremadamente densa de texto | 7 | Dividir en secciones visuales: beneficios con iconos, specs con tabla visual | Iconos de beneficios, diseño de specs | Alta |
| **Features** | Lista de 6 features con checkmarks genéricos | 6 | Convertir en grid de iconos + texto corto | 6 iconos custom por producto | Media |
| **Trust Badges** | Debajo del botón de compra — debería estar antes | 8 | Mover badges ANTES del botón de compra para reducir ansiedad | Ninguno | Alta |
| **Size Selector (Back)** | Sin guía visual de tallas | 9 | Añadir guía de tallas con diagrama de cuerpo | Infografía de guía de tallas | Crítica |
| **Payment Methods** | Texto "Visa", "MC", "Amex" en vez de logos reales | 7 | Usar logos SVG de marcas de pago | SVGs de Visa, MC, Amex, PayPal, Apple Pay, Google Pay | Alta |
| **Reviews** | 0 reviews en todos los productos — sección vacía | 9 | Ocultar sección si 0 reviews, o permitir reviews anónimas inicialmente | Ninguno | Alta |
| **How It Works** | Duplica el patrón de la home | 5 | Mantener pero con imágenes reales de cada paso | 3 fotos por producto | Media |
| **Related Products** | Grid de 3 sin énfasis | 5 | Añadir "Frequently bought together" con bundle pricing | Ninguno | Media |
| **Sticky Bar Desktop** | Duplica todo el flujo de compra | 4 | Simplificar: solo imagen + nombre + precio + botón | Ninguno | Baja |
| **Sticky Bar Mobile** | Funcional pero sin contexto de ahorro | 5 | Añadir "Ahorra X%" junto al precio | Ninguno | Baja |

**Impacto total de Producto:** 95/140 puntos

---

## TABLA 3: FOOTER (`Footer.tsx`)

| Sección | Problema detectado | Impacto (1-10) | Propuesta de mejora | Recursos necesarios | Prioridad |
|---|---|---|---|---|---|
| **Social Links** | Facebook, Instagram, Twitter apuntan a `#` | 9 | Enlazar a redes reales o eliminar si no existen | URLs de redes sociales | Alta |
| **Payment Methods** | Texto "Visa", "MC" en vez de logos | 7 | Usar logos SVG de marcas de pago | SVGs de pago | Alta |
| **Newsletter** | Sin backend, solo simula suscripción | 6 | Integrar con servicio real (Mailchimp, Resend) o eliminar | Integración email | Media |
| **Legal Info** | Falta dirección física, CIF, registro mercantil | 8 | Añadir información legal obligatoria en UE | Datos legales reales | Alta |
| **Trust Bar** | Repite los mismos trust signals de toda la web | 5 | Eliminar (ya están en home y producto) | Ninguno | Baja |

**Impacto total de Footer:** 35/50 puntos

---

## TABLA 4: CARRITO (`CartSidebar.tsx`)

| Sección | Problema detectado | Impacto (1-10) | Propuesta de mejora | Recursos necesarios | Prioridad |
|---|---|---|---|---|---|
| **Product Thumbnails** | `cartIcon` es string vacío — thumbnails vacíos | 10 | Usar imágenes reales del catálogo como thumbnail | Ninguno (usar images[0]) | Crítica |
| **Empty State** | "Tu carrito está vacío" sin dirección | 7 | Añadir CTA hacia productos destacados | Ninguno | Media |
| **Bundle Upsell** | No sugiere bundles ni cross-sell | 8 | Añadir "Añade {producto} y ahorra {X}%" cuando sea applicable | Ninguno | Alta |
| **Trust Badges** | Badges tiny de 11px, ilegibles | 5 | Eliminar (ya están en footer y producto) | Ninguno | Baja |

**Impacto total de Carrito:** 30/40 puntos

---

## TABLA 5: CATEGORÍA (`CategoryPage.tsx`)

| Sección | Problema detectado | Impacto (1-10) | Propuesta de mejora | Recursos necesarios | Prioridad |
|---|---|---|---|---|---|
| **Header** | Header diferente al global (ArrowLeft + Logo) | 7 | Unificar con header global | Ninguno | Alta |
| **Editorial Hero** | El mejor componente de la web, pero con stats débiles | 5 | Mantener hero, mejorar stats ("Sueño profundo" / "Sin dolor") | Ninguno | Baja |
| **Filter Panel** | Slider de precio para 4 productos es over-engineered | 6 | Eliminar filtros innecesarios, mostrar solo categorías | Ninguno | Media |
| **Product Cards** | Aspect ratio 4/3 inconsistente con home (1:1) | 5 | Unificar a 1:1 en todas partes | Ninguno | Media |
| **Sticky Cart** | Mismo patrón que home CTA | 4 | Mantener consistente | Ninguno | Baja |

**Impacto total de Categoría:** 27/50 puntos

---

## RESUMEN PRIORIDADES

### Crítica (Impacto 9-10) — Implementar primero
1. **Fotografía lifestyle para hero** — 1 imagen panorámica de persona durmiendo
2. **Fotografía de productos** — 6 fotos por producto (24 total)
3. **Thumbnails reales en carrito** — Usar images[0] del catálogo
4. **Guía de tallas visual para Back** — Infografía de sizing
5. **Ocultar reviews si 0** — Evitar sección vacía
6. **Tabla de comparativa** — Eliminar o equilibrar

### Alta (Impacto 7-8) — Implementar segundo
7. **Vídeos de uso** — 1 vídeo por producto (15-30s)
8. **Logos de pago reales** — SVGs de Visa, MC, etc.
9. **Social links reales** — URLs de redes o eliminar
10. **Info legal obligatoria** — Dirección, CIF, registro
11. **Mover trust badges antes del CTA** en producto
12. **Unificar headers** — Un solo header global
13. **Eliminar announcement bar cyan** — Patrón dropshipping
14. **Bundle upsell en carrito** — Cross-sell inteligente

### Media (Impacto 5-6) — Implementar tercero
15. **Infografías de beneficios** — Iconos custom por producto
16. **Sección "Momentos que recuperarás"** — Lifestyle positivo
17. **Newsletter con backend real** — Integración email
18. **Badges personalizados** — Estilo de marca
19. **Vídeo ambiental en hero** — Sutil, looping

### Baja (Impacto 1-4) — Último
20. **Rediseñar FAQ visual** — Mejor acordeón
21. **Simplificar sticky bars** — Menos contenido
22. **Eliminar trust bar repetida** — Consolidar

---

## LISTA DE RECURSOS VISUALES NECESARIOS

### Fotografía por Producto

#### Noctip Halo (Férula anti-ronquidos)
| # | Tipo | Descripción | Uso |
|---|---|---|---|
| 1 | Producto principal | Férula sobre fondo limpio oscuro | Gallery principal |
| 2 | Producto inclinado | Ángulo 45° mostrando detalle | Gallery |
| 3 | Producto lateral | Perfil mostrando grosor | Gallery |
| 4 | Detalle material | Close-up de silicona médica | Gallery + Benefits |
| 5 | Lifestyle: pareja | Pareja durmiendo tranquila, sin ronquidos | Hero + Problems |
| 6 | Lifestyle: despertar | Persona despierta descansada, sonriente | Hero |
| 7 | What's in the box | Férula + estuche + manual | Product page |
| 8 | Modo de uso | Persona colocándose la férula | How it works |
| 9 | Comparativa | Férula vs férulas genéricas | Comparison |
| 10 | Infografía | Cómo funciona la vía aérea | Benefits |

#### Noctip Back (Corrector postural)
| # | Tipo | Descripción | Uso |
|---|---|---|---|
| 1 | Producto principal | Corrector sobre fondo limpio | Gallery |
| 2 | Producto desplegado | Mostrando forma de Y | Gallery |
| 3 | Detalle correas | Close-up de velcro y ajuste | Gallery |
| 4 | Detalle malla | Textura transpirable | Gallery |
| 5 | Lifestyle: oficina | Persona trabajando con buena postura | Problems |
| 6 | Lifestyle: ejercicio | Persona estirando con buena postura | Benefits |
| 7 | Guía de tallas | Diagrama de cuerpo con medidas | Size guide |
| 8 | Modo de uso | Cómo ponerse el corrector | How it works |
| 9 | Antes y después | Postura encorvada vs correcta | Comparison |
| 10 | What's in the box | Corrector + manual + guía de tallas | Product page |

#### Noctip Rest (Banda de sueño)
| # | Tipo | Descripción | Uso |
|---|---|---|---|
| 1 | Producto principal | Banda sobre fondo limpio | Gallery |
| 2 | Producto plegado | Mostrando compacidad | Gallery |
| 3 | Detalle altavoces | Close-up de speakers ultrafinos | Gallery |
| 4 | Detalle tela | Textura transpirable | Gallery |
| 5 | Lifestyle: durmiendo | Persona con banda, durmiendo | Hero + Problems |
| 6 | Lifestyle: viaje | Persona en avión/tren con banda | Benefits |
| 7 | Modo de uso | Cómo conectarse y usar | How it works |
| 8 | What's in the box | Banda + cable + manual | Product page |
| 9 | Infografía | Batería, Bluetooth, peso | Benefits |
| 10 | Comparativa | Banda vs auriculares tradicionales | Comparison |

#### Noctip Cervical (Masajeador cervical)
| # | Tipo | Descripción | Uso |
|---|---|---|---|
| 1 | Producto principal | Masajeador sobre fondo limpio | Gallery |
| 2 | Producto lateral | Mostrando electrodos curvos | Gallery |
| 3 | Detalle electrodos | Close-up de pads | Gallery |
| 4 | Lifestyle: sofá | Persona relajándose en sofá | Problems |
| 5 | Lifestyle: oficina | Persona en escritorio usando masajeador | Benefits |
| 6 | Modo de uso | Cómo colocarse en el cuello | How it works |
| 7 | What's in the box | Masajeador + cable USB + manual | Product page |
| 8 | Infografía | 3 capas de relajación | Benefits |
| 9 | Zonas del cuerpo | Mapa de puntos de tensión | Benefits |
| 10 | Comparativa | Masajeador vs masaje manual | Comparison |

### Fotografía Lifestyle General (Homepage)

| # | Tipo | Descripción | Uso |
|---|---|---|---|
| 1 | Hero principal | Dormitorio premium, persona durmiendo tranquila | Hero section |
| 2 | Pareja | Pareja durmiendo abrazada, sin interrupciones | Problems / Trust |
| 3 | Mañana | Persona despertándose descansada, estirándose | CTA final |
| 4 | Trabajo | Persona trabajando erguida, sonriente | Problems |
| 5 | Relax | Persona en sofá, relajada | Benefits |
| 6 | Viaje | Persona descansando en hotel | Benefits |
| 7 | Noche | Rutina nocturna, preparándose para dormir | How it works |
| 8 | Dormitorio | Dormitorio premium con Iluminación cálida | Fondo de secciones |

### Vídeos Necesarios

| # | Producto | Tipo | Duración | Descripción | Uso |
|---|---|---|---|---|---|
| 1 | Halo | Producto | 15s | Férula girando 360° | Gallery |
| 2 | Halo | Uso | 20s | Persona colocándose la férula | How it works |
| 3 | Back | Producto | 15s | Corrector girando 360° | Gallery |
| 4 | Back | Uso | 20s | Persona poniéndose el corrector | How it works |
| 5 | Rest | Producto | 15s | Banda plegando/desplegando | Gallery |
| 6 | Rest | Uso | 20s | Persona durmiendo con banda | How it works |
| 7 | Cervical | Producto | 15s | Masajeador girando 360° | Gallery |
| 8 | Cervical | Uso | 20s | Persona usando masajeador | How it works |
| 9 | Brand | Lifestyle | 30s | Montaje de momentos de sueño y descanso | Hero ambient |
| 10 | Brand | Unboxing | 20s | Unboxing de producto Noctip | Product page |

### Infografías Necesarias

| # | Tipo | Descripción | Uso |
|---|---|---|---|
| 1 | Halo: Vía aérea | Corte anatómico mostrando cómo abre la vía | Benefits |
| 2 | Halo: Ajuste | Diagrama de los 10mm de micro-ajustes | How it works |
| 3 | Back: Postura | Comparativa columna encorvada vs alineada | Benefits |
| 4 | Back: Guía tallas | Diagrama de cuerpo con medidas XS-XL | Size guide |
| 5 | Rest: Batería | Icono de batería con horas | Benefits |
| 6 | Rest: Bluetooth | Diagrama de conectividad | Benefits |
| 7 | Cervical: 3 capas | Diagrama de nervios, vasos, músculos | Benefits |
| 8 | Cervical: Zonas | Mapa de puntos de tensión cervical | Benefits |
| 9 | Garantía | Badge visual de 30 noches + envío gratis | Trust |
| 10 | Pago seguro | Badge SSL + Stripe | Trust |

### Iconos Custom Necesarios

| # | Icono | Descripción | Uso |
|---|---|---|---|
| 1 | Anti-ronquidos | Silueta de persona durmiendo sin ondas | Navigation |
| 2 | Postura | Silueta de columna recta | Navigation |
| 3 | Sueño | Luna con estrellas | Navigation |
| 4 | Cuello | Silueta de cuello con punto de alivio | Navigation |
| 5 | Envío | Paquete con alas | Trust |
| 6 | Garantía | Escudo con check | Trust |
| 7 | Pago | Candado con tarjeta | Trust |
| 8 | Soporte | Auriculares con chat | Trust |
| 9 | Material médico | Gotas de silicona | Benefits |
| 10 | Reciclable | Icono ecológico | Benefits |

---

## PLAN DE IMPLEMENTACIÓN POR FASES

### FASE 1: corrección de confianza (1-2 días)
- [x] Eliminar tabla de comparativa 100% vs 0%
- [x] Ocultar reviews si 0 reviews
- [x] Thumbnails reales en carrito
- [x] Mover trust badges antes del CTA en producto
- [x] Eliminar announcement bar cyan
- [ ] Unificar headers (producto y categoría usen el global)
- [ ] Logos de pago reales (SVGs)
- [ ] Info legal obligatoria en footer
- [ ] Social links reales o eliminar

### FASE 2: Contenido visual (1 semana)
- [ ] Sesión de fotos profesional (productos + lifestyle)
- [ ] Crear/generar 24 fotos de producto
- [ ] Crear/generar 8 fotos lifestyle
- [ ] Generar 10 infografías
- [ ] Diseñar 10 iconos custom
- [ ] Grabar/generar 4 vídeos de uso

### FASE 3: Rediseño visual (3-5 días)
- [ ] Hero con imagen lifestyle
- [ ] Sección "Momentos que recuperarás" con lifestyle
- [ ] Product cards con fotos reales
- [ ] Infografías de beneficios integradas
- [ ] Vídeos en galería de producto
- [ ] Guía de tallas visual para Back
- [ ] Bundle upsell en carrito

### FASE 4: Optimización CRO (2-3 días)
- [ ] Bundle upsell en home
- [ ] Cross-sell en carrito
- [ ] Newsletter con backend real
- [ ] Badges personalizados
- [ ] Video ambiental en hero
- [ ] Sticky CTA mejorado

### FASE 5: Footer premium (1 día)
- [ ] Info legal completa
- [ ] Logos de pago SVG
- [ ] Redes sociales reales
- [ ] Newsletter funcional
- [ ] Eliminar trust bar repetida
