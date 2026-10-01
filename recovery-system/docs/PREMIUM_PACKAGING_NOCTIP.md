# Packaging Premium Noctip — Brief Técnico y Dirección de Arte

> Fecha: 01 Oct 2026 | Versión 2.0 (corregido para fulfillment UE vía CJ/EPROLO)
> SKU piloto: Noctip Halo (`lib/catalog.ts:67`) | Acabado: **mate estándar** (confirmado)
> Ficha fulfillment: `docs/FULFILLMENT_NOCTIP.md` | Identidad: `docs/DESIGN_SYSTEM.md`

---

## 1. Objetivo

Transformar productos de sourcing genérico en experiencia de marca premium accesible, diferenciándose de TikTok Shop y posicionando Noctip frente a referencias premium (Ylekto $35.99) sin alterar el SKU ni el coste base.

**KPIs de éxito:**
| Indicador | Baseline | Objetivo |
|---|---|---|
| AOV (ticket medio) | €13.99–21.99 | +25% vía bundles |
| Tasa de devolución | Sin medir | <5% (garantía 30 noches sostenible) |
| CTR creativos paid | Sin medir | >1.5% (hook correcto) |
| Percepción de valor | "AliExpress" | "Marca de sueño europea" |

---

## 2. Identidad Aplicada (Design System)

| Elemento | Aplicación física |
|---|---|
| Fondo | `#080c12` → interior papel seda oscuro, estuche negro |
| Acento | `#10BFD8` → línea fina lateral + QR code tintado |
| Texto/interfaz | `#f2eee7` → **exterior caja crema mate** (coherente con paleta web) |
| Tipografía | Titulares bold tracking -0.04em; cuerpo lenguaje 2º ESO `AGENTS.md` |
| Tono | Directo, transformacional, sin jerga wellness |
| Iconografía | Lucide (consistencia digital-físico) |
| Claim de marca | "Un sistema, no un producto" (`components/ShopHomePage.tsx:74`) |

**Decisión estética confirmada:** exterior crema `#f2eee7` mate estándar (no negro). El negro mate a bajo coste muestra huellas/polvo → parece barato. El crema mate fotografía mejor para UGC y contrasta con el producto oscuro. Negro reservado para Fase 2 con proveedor premium.

---

## 3. Especificación Técnica de Packaging

### 3.1 Caja — Halo (piloto)

| Parámetro | Especificación |
|---|---|
| Formato | Caja rígida tapa-solapa (two-piece lid & base) |
| Medidas interiores | 100 × 80 × 40 mm (férula + estuche) |
| Material | Cartón rígido 1500gsm chipboard, wrap art paper |
| Exterior | Crema `#f2eee7` **laminado mate estándar** (BK matte) |
| Logo | `NOCTIP` impreso mate `#080c12`, centrado cara frontal |
| Acento | Línea fina 1pt `#10BFD8` en base frontal |
| Interior | Papel seda crema `#f2eee7` (no espuma, ahorra coste) |
| Troquel | 1 formato maestro, reutilizable en 4 SKUs (2 tamaños: pequeño Halo/Back, mediano Rest/Cervical) |
| Peso total | ≈80–120g (incluye caja + seda + inserto) |
| FSC + PPWR | Certificado FSC obligatorio, material reciclable |

### 3.2 Contenido del interior

| Elemento | Especificación | Coste |
|---|---|---|
| Papel seda | 20×20cm crema, 17gsm | €0.02/ud |
| Tarjeta insert | 85×55mm, 300gsm crema mate | €0.05/ud |
| Manual A6 | 8 págs, 150gsm, ES/EN | €0.50/ud (imprenta local / POD) |
| Producto | Férula + estuche (incluye al product) | — |

### 3.3 Pliego de Copy de Caja (literal)

**Cara frontal:**
```
NOCTIP HALO
Férula anti-ronquidos · Silicona de grado médico
30 NOCHES DE PRUEBA
```

**Lateral izquierdo:**
```
Dormíais separados por sus ronquidos.
En 1 noche volvéis a dormir abrazados 8h.

30 noches de prueba · Envío UE 5-10 días
hola@noctip.com · noctip.com
```

**Contraportada (QR + claims):**
```
Escanea para ver cómo ajustar tu Halo en 60s
[Escanear código QR → vídeo 30s en YouTube]

10mm de micro-ajuste · Doble capa · BPA-free
Estuche de viaje incluido · Reutilizable y lavable
```

**Cara interior (solo visible al abrir):**
```
Bienvenido a tu sistema nocturno.
Completa tu ritual: Halo + Rest = Pack Sueño −15%
noctip.com/es/products/sleep-headband
```

### 3.4 Manual A6 — 8 páginas (ES/EN)

**Estructura:**
| Pág | Contenido |
|---|---|
| 1 | Portada: "Tu sistema nocturno" + logo + claim |
| 2 | Paso 1: Hervir 70s (foto persona 55a) |
| 3 | Paso 2: Morder para moldear (foto detalle mandíbula) |
| 4 | Paso 3: Ajustar 10mm micro (foto perilla ajuste) |
| 5 | Paso 4: Limpiar (foto lavabo + estuche) |
| 6 | Paso 5: Guardar (foto estuche cerrado) |
| 7 | Garantía 30 noches + soporte hola@noctip.com + QR vídeo |
| 8 | "Completa tu ritual" → Pack Sueño / Pack Recuperación + QR tienda |

**Normas de redacción (AGENTS.md mobile-first):**
- Lenguaje 2º ESO: "Nuca piedra", no "tensión cervical"
- 16px mínimo en inputs (aunque es papel, aplicar misma filosofía: claridad)
- Frases cortas, sin jerga médica ("reduce ronquidos", nunca "apnea")
- Siempre visible: "30 noches de prueba" + email soporte

---

## 4. Dirección de Arte y Shot-list

**Principios de rodaje:**
- Luz natural de ventana o lámpara cálida (NUNCA flash, NUNCA estudio)
- Vivienda real española (dormitorio con sábanas reales, mesita, lámpara)
- Talento 55–65 años (NO modelo 22a — `AGENTS.md` target)
- Formatos: 9:16 (paid) + 4:5 (PDP) + 1:1 (thumbnail)
- Fondo producto: `#080c12` o crema `#f2eee7` (consistencia)
- Cero stock, cero mockups 3D, cero personas falsas

| Plano | Descripción | Uso | Timing |
|---|---|---|---|
| 1. Hero | Producto en mesita de noche, lámpara cálida, cama real deshecha | PDP principal, ad hook | 1 foto |
| 2. Escala | Mano 55–65a sujetando férula (percibir tamaño real) | Confianza producto | 1 foto |
| 3. En uso | Persona durmiendo de lado, cenital suave, férula en boca | Beneficio clave | 1 foto |
| 4. Macro | Detalle silicona médica, luz ventana, textura suave | Calidad percibida | 1 foto |
| 5. Unboxing | Caja abierta crema mate: férula + estuche + manual + seda | Premium (el salto) | 1 foto |
| 6. Resultado | Pareja 55–65a durmiendo juntos (mismo lecho) | Transformación Julito | 1 foto |
| 7. Vídeo UGC | Guión A Julito, 30s, escena por escena (ver §5) | Paid social, hero PDP | 1 vídeo 9:16 |

**Ratios de export:**
- 9:16 → 1080×1920 (Reels/TikTok/Stories)
- 4:5 → 1080×1350 (PDP feed)
- 1:1 → 1080×1080 (thumbnail)
- Fondo `#080c12` para centrar producto, crema `#f2eee7` para lifestyle

---

## 5. Guion Vídeo UGC 30s (Guión A Julito: Situación → Deseo → Mecanismo)

**Plano 1 (0–3s) — HOOK** *[texto overlay 28px blanco, visual pareja separada]*
> "Dormís separados por ronquidos? Lleváis 2 años así?"

**Plano 2 (3–8s) — SITUACIÓN** *[UGC hombre 55a, cama vacía, voz apagada]*
> "Probamos tiras, spray, almohada... nada. Ella al sofá, yo culpable cada mañana."

**Plano 3 (8–13s) — DESEO** *[close-up férula en mano, luz cálida]*
> "Quiero despertar abrazados, sin codazos a las 3 de la mañana."

**Plano 4 (13–23s) — MECANISMO** *[demo Halo: ajuste 10mm, silicona, estuche]*
> "Halo avanza 10mm tu mandíbula, abre la vía aérea. Silicona de grado médico, doble capa, estuche de viaje. Desde la primera noche."

**Plano 5 (23–28s) — PRUEBA** *[caja abierta, bundle Halo+Rest]*
> "Pack Sueño: Halo + Rest, 30 noches de prueba, envío UE 5-10 días."

**Plano 6 (28–30s) — CTA** *[logo Noctip, pausa visual]*
> "Dormid juntos mañana. Noctip."

**Specs técnicos del vídeo:**
- Duración: 25–35s (Meta Ad: 28s óptimo)
- Formato: 9:16 vertical, 1080×1920, 30fps
- Subtítulos: 16px bold blanco con sombra (obligatorio, 80% ve sin sonido)
- Botón: mínimo 48×48px (accesibilidad `AGENTS.md`)
- Sin `type="number"` en ningún overlay
- Música: licencia libre, volumen bajo (voz protagonista)
- Editing: cortes rápidos, sin transiciones fancy (esto NO es TikTok GenZ)

---

## 6. Producción y Cronograma

| Fase | Semana | Acción | Coste |
|---|---|---|---|
| 0. Auditoría | 1 | Checklist `AUDITORIA_CALIDAD_NOCTIP.md` Halo ≥7/10 | €0 |
| 1. Fotografía | 1 | 6 fotos + 1 vídeo (grabas tú, móvil) | €0 |
| 2. Packaging brief | 2 | Diseño caja/manual + mockup | €0 (diseño) |
| 3. Fabricación packaging | 2–3 | CJ/EPROLO o imprenta local (ver `FULFILLMENT_NOCTIP.md`) | €60–120/50uds |
| 4. Compliance UE | 3 | CE/RoHS, GPSR, EPR, FSC | Certificados proveedor |
| 5. Validación paid | 4 | 1 CBO €35/d, 9 creativos Julito | €245 test |

**Inversión fase piloto (Halo, 100 uds):** €60–120 packaging + €50 manual + €245 ads = **~€355–415**

---

## 7. Control de Calidad (No Negociable)

- [ ] Producto funcional garantizado 30 noches (devoluciones <5%)
- [ ] Cero reviews fabricadas (`AGENTS.md` — nunca mostrar `X estrellas` hardcodeadas)
- [ ] Claims sin lenguaje médico ("reduce ronquidos", nunca "apnea", "tratamiento")
- [ ] Certificados CE/RoHS archivados antes de escalar
- [ ] Dirección UE de devoluciones operativa (CJ la tiene)
- [ ] Packaging FSC + reciclable (PPWR UE)

---

## 8. Plantilla Replicable a Otros SKU

| SKU | Tamaño caja | Acento | Copy diferencial | Bundle recomendado |
|---|---|---|---|---|
| Halo | 100×80×40mm | `#10BFD8` | "10mm micro-ajuste" | Pack Sueño (con Rest) |
| Back | 100×80×40mm (maestro) | `#10BFD8` | "15min/día, XS-XL" | Pack Recuperación (con Cervical) |
| Rest | 140×100×50mm (mediano) | `#10BFD8` | "45g, 10h, lavable" | Pack Sueño (con Halo) |
| Cervical | 140×100×50mm (mediano) | `#10BFD8` | "Calor suave, 200g" | Pack Recuperación (con Back) |

**Troquel maestro único:** solo 2 tamaños (pequeño/mediano). Mismo material, mismo laminado, solo cambia arte. Esto amortiza el troquel y mantiene coherencia visual.

---

## 9. Presupuesto de Referencia (datos verificados 2026)

| Escenario | Coste/ud | Proveedor | Plazo |
|---|---|---|---|
| CJ custom packaging (MOQ 1) | ~$1.0–1.5 | CJ (almacén DE) | 3-5 días a almacén |
| EPROLO custom box (sin MOQ) | ~$0.8–1.2 | EPROLO (EU) | 3-5 días |
| Imprenta local ES (Mawijo, 50uds) | ~€1.5–3 + troquel €80–300 | Madrid | 5–10 días |
| Daohua/Luxopacks (50uds, China) | $2.50–4.50 | Shenzhen | 15–30 días tránsito |

**Recomendación:** EPROLO o CJ para test (sin capital), imprenta local si quieres control total del arte.

---

## 10. Lo que NO Hacer

- [ ] Caja parda genérica AliExpress (mata la percepción premium al instante)
- [ ] Logo en pegatina (siempre impreso o grabado)
- [ ] Traducción Google del manual ("Insertar artículo en cavidad oral" → "Ponte la férula en la boca")
- [ ] Modelo 22a en fotos (tu target es 55-65a, `AGENTS.md`)
- [ ] "Estudio blanco perfecto" (cliente lo nota como fake)
- [ ] Claim médico "cura la apnea" (riesgo legal UE MDR)
- [ ] Reviews falsas (mejor `reviewCount:0` que 4.8★ inventado)

---

## 11. Entregables Creados

| Doc | Contenido |
|---|---|
| `docs/JULITO_ECOM_NOCTIP.md` | Framework Julito completo (3 guiones, hooks, Kalodata) |
| `docs/AUDITORIA_CALIDAD_NOCTIP.md` | Checklist 10 noches, 4 SKU, 2 suppliers |
| `docs/SOURCING_NOCTIP_ALIEXPRESS.md` | Links wholesale, branding Noctip, Yelkoo benchmark |
| `docs/PRODUCTOS_ALTERNATIVOS_NOCTIP.md` | 8 alternativas Tier1/Tier2 |
| `docs/FULFILLMENT_NOCTIP.md` | Playbook EU warehouse (CJ/EPROLO/BrandSKU) |
| **`docs/PREMIUM_PACKAGING_NOCTIP.md`** | **Este doc: spec caja mate, copy, shot-list, guion 30s** |

---

**Siguiente paso:** contacto agente CJ con plantilla de `FULFILLMENT_NOCTIP.md:7` + pedir sample Halo desde almacén DE + mockup caja crema mate.
