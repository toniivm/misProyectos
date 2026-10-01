# Sourcing AliExpress + Branding Noctip — Plan Completo (incl. Yelkoo/Ylekto)

> Fecha: 01 Oct 2026 | Estado: Build — listo para ejecutar
> Productos: `halo` · `wave` · `sleep-headband` · `neck-massager` (`lib/catalog.ts:64`)
> Referencia Julito: 1 producto x N ángulos, no N productos (`docs/JULITO_ECOM_NOCTIP.md`)

---

## 1. Resumen Ejecutivo

**No busques producto nuevo. Busca mejor supplier del mismo SKU + marca Noctip.**

Tus 4 SKUs son genéricos (mismo molde TikTok Shop). Tu ventaja no es fábrica, es:
- Caja rígida Noctip + manual ES/EN + estuche
- Envío UE 5-10d + 30 noches prueba (`components/ShopHomePage.tsx:117`)
- Bundles 15-20% (`lib/catalog.ts:337`) + soporte `hola@noctip.com`
- Landing avatar dedicada (pareja 55a que duerme separada vs general)

**Yelkoo/Ylekto:** no existe marca "Yelkoo" indexada. El benchmark más cercano es **Ylekto** (cervical pillow 4.87★ Amazon, $35.99, CertiPUR-US memory foam, butterfly shape). Lo incluimos como benchmark premium para `neck-massager`/`cervical`. Si tienes link exacto Yelkoo, lo añado.

---

## 2. Sourcing AliExpress — Qué Pedir y Dónde

### 2.1 Links directos (wholesale, filtrar Choice + 4.7★+ + Orders 1000+)

| Producto Noctip | Búsqueda AliExpress | Link directo | Filtro recomendado |
|-----------------|---------------------|--------------|-------------------|
| **Halo** (`halo` 10mm mouthpiece) | `anti snoring mouthpiece adjustable 10mm medical silicone` | https://es.aliexpress.com/w/wholesale-anti-snoring-mouthpiece.html | Choice, 4.7★+, 1000+ orders, UE warehouse |
| **Back** (`wave` Y corrector) | `posture corrector Y shape breathable invisible` | https://es.aliexpress.com/w/wholesale-posture-corrector.html | Choice, Premium Quality, 2000+ orders |
| **Rest** (`sleep-headband` 45g 10h) | `bluetooth sleep headband washable 10h` | https://www.aliexpress.com/w/wholesale-sleep-headband-bluetooth.html | Choice, 4.8★+, 5000+ orders |
| **Cervical** (`neck-massager` heat) | `neck massager heat EMS portable cervical` | https://www.aliexpress.com/w/wholesale-cervical-orthopedic-pillow.html (variante pillow) + https://www.aliexpress.com/w/wholesale-cervical-pillow-memory-foam.html | Choice, 4.7★+ |

> Tip Julito: no mires nº de anuncios, mira **gasto** en Kalodata. En AliExpress mira **orders + review fotos reales**, no título.

### 2.2 Criterios de Supplier (Checklist)

Para cada SKU pide a **2 suppliers**: 1 AliExpress Choice (rápido, 7-12d) + 1 Alibaba/1688 fábrica (white label, 15-20d).

```
[ ] 4.7★+ y 1000+ orders con fotos reales de compradores 50-70a?
[ ] Responde <24h en inglés/español? Pide video fábrica (molde, batería, calor)
[ ] Chip Bluetooth 5.0 real (Rest) o solo 5.0 etiqueta? Pide certificado
[ ] Silicona médica libre BPA (Halo) — pide MSDS / CertiPUR si aplica (Ylekto lo tiene)
[ ] MOQ white label: 50-100uds con logo Noctip en producto + caja? Coste extra?
[ ] Envío UE: ¿tiene warehouse España/Polonia? (AliExpress Choice sí, 5-10d)
[ ] Embalaje: ¿puede enviar sin logo genérico, solo caja blanca Noctip?
[ ] Política devolución/30 noches: ¿acepta devolución sin pregunta?
```

### 2.3 Rango de Coste Real (Oct 2026, sin envío)

| SKU | AliExpress retail | Coste fábrica 50uds white label | Tu PVP `lib/catalog.ts` | Margen bruto |
|-----|-------------------|----------------------------------|------------------------|--------------|
| Halo | €6-9 | €3.5-5.0 + caja €0.60 | €13.99 (compare €29.99) | ~60% |
| Back | €4-6 | €2.2-3.5 | €19.99 (compare €31.99) | ~65% |
| Rest | €5-8 | €3.0-4.5 | €19.99 (compare €31.99) | ~62% |
| Cervical | €9-13 | €6-8 | €21.99 (compare €34.99) | ~55% |

> Con bundle 15-20% sigues >50% margen si coste <€5, como predica Julito en `Efdy8HuYQFQ` (60% en 5k/día sin COD).

### 2.4 Yelkoo / Ylekto Benchmark (para Cervical)

**Ylekto** (buscado como Yelkoo):
- Producto: Cervical Pillow butterfly, memory foam CertiPUR-US, ice silk cover, $35.99 Amazon (4.87★ 53641 reviews)
- Links: https://theylekto.com/ + https://www.amazon.com/Ylekto-Cervical-Neck-Pillow-Relief/dp/B0GR9H6FGJ
- Qué copiar: altura dual 5.5" lado, arm hole, cooling cover lavable, storytelling "spinal alignment".
- Qué NO copiar: precio $35 (tú €21.99) — tu posicionamiento es "sistema nocturno" no "pillow premium". Usa su estructura de PDP (beneficio → prueba → ajuste) para tu `neck-massager`.

Si Yelkoo es otro (link AliExpress que tengas), pásamelo y lo añado en <24h a tabla.

---

## 3. Branding Noctip — Cómo Enfocar Nombre

### 3.1 Mantén Noctip. No lo cambies.

Análisis:
- **Fonética:** 6 letras, 2 sílabas, fácil ES/EN, noche+tip (consejo). No es descriptivo genérico tipo "SleepPro".
- **Visual:** ya en `#080c12` + `#10BFD8` `docs/DESIGN_SYSTEM.md` — premium oscuro vs TikTok Shop colorido barato. Diferencia instantánea.
- **Arquitectura actual** `lib/catalog.ts:316` ya es `Noctip Halo/Back/Rest/Cervical` — coherente. No lo cambies a "Sleep Headband Pro".

### 3.2 Qué reforzar (no renombrar)

| Elemento | Actual | Mejora white label |
|----------|--------|-------------------|
| **Logo** | `public/images/logo/logo.png` + texto `NOCTIP` `app/[locale]/checkout/page.tsx:442` | Grabado láser en Halo + etiqueta tejida Rest (no pegatina) |
| **Caja** | parda AliExpress | **Rígida blanca mate** 180g, logo #080c12 foil, claim "30 noches de prueba · Envío UE" |
| **Manual** | traducción AliExpress | 8 pasos fotos 55a en dormitorio real ES, QR video 30s, garantía `hola@noctip.com` |
| **Estuche Halo** | genérico | Estuche negro Noctip con cierre magnético (ya en `lib/catalog.ts:91` "estuche viaje incluido" — hazlo premium) |
| **Unboxing** | bolsa plástico | Papel seda + tarjeta "Tu sistema nocturno: Halo+Rest" → push bundle |

**Claim para diferenciarte de TikTok Shop:**
- TikTok: "€11.99 envío 15-20d, sin garantía"
- Noctip: "€19.99 envío UE 5-10d, 30 noches prueba, soporte humano hola@noctip.com, bundle -15%"

Esto justifica `comparePrice` y sube AOV.

### 3.3 Historia (para PDP y ads)

No vendas features, vende sistema `components/ShopHomePage.tsx:74`:
> "Sueño y recuperación no van separados. Noctip es tu ritual: noches silenciosas (Halo/Rest) + cuello suelto + espalda recta (Back/Cervical). Elige la pieza que necesitas, completa tu sistema."

Julito: mensaje avatar > producto. Mismo Halo para avatar "pareja separada" vs "viajera con vergüenza" → landing distinta, mismo SKU.

---

## 4. Diferenciación vs TikTok Shop / Yelkoo

|  | TikTok Shop genérico | Ylekto premium | **Noctip (tú)** |
|---|---|---|---|
| Precio | €11-14 | $35.99 | €13.99-21.99 |
| Envío | 15-20d CN | 2d Amazon | 5-10d UEChoice |
| Garantía | 14d o nada | 30d Amazon | **30 noches Noctip** |
| Soporte | bot | Amazon | hola@noctip.com humano |
| Bundle | no | no | **15-20% pack sueño/recuperación** |
| Ads | feature "10h batería" | benefit "spinal alignment" | **transformación "Dormíais separados → abrazados 8h"** `lib/catalog.ts:77` |

Tu hueco: **premium accesible UE con sistema**, ni barato TikTok ni caro Ylekto.

---

## 5. Plan de Ejecución (14-21 días)

> **Actualizado Oct 2026:** con fulfillment China directo + packaging en almacén UE, el sourcing cambia. Prioridad: **CJ/EPROLO** sobre AliExpress retail.

### Semana 1 (Días 1-7) — Sourcing + fulfillment, sin gastar ads

- [ ] **Día 1:** Contacta agente CJ con plantilla `FULFILLMENT_NOCTIP.md:7` — envía links AliExpress actuales, pide sourcing + sample desde almacén DE + cotización packaging custom mate.
- [ ] **Día 1:** Alternativa EPROLO — registro free, busca SKUs en catálogo EU, pide sample.
- [ ] **Día 2-3:** Kalodata: busca "sleep headband" 15d+ activos, anota 10 guiones ganadores (para no copiar a ciegas).
- [ ] **Día 3-5:** Escribe 9 guiones Halo avatar pareja 55a (3 guiones Julito x3 hooks) `docs/JULITO_ECOM_NOCTIP.md:7`. Mientras llegan muestras, no gastas.
- [ ] **Día 5:** Brief caja/manual para CJ/EPROLO custom packaging (ver `PREMIUM_PACKAGING_NOCTIP.md`).

**Plantilla mensaje supplier CJ (copiar/pegar):**
```
Hola, quiero migrar 4 SKUs a almacén DE para delivery 3-7 días en España:
- SKUs: [pega tus links AliExpress actuales]
- ¿Tenéis estos SKUs en catálogo DE o podéis sourcerlos?
- Coste producto + packaging custom (caja 100x80x40 crema mate, logo #080c12) por pedido MOQ 1
- Stock actual DE de cada SKU
- Coste envío DE→ES por pedido (tracking Correos/GLS)
- Plazo packaging custom 50 unidades a stock DE
- Proceso retorno 30 noches intra-UE
```

### Semana 2 (Días 7-14) — Auditoría 10 noches

- [ ] Llegan muestras → test 3 personas 50-70a con checklist `docs/AUDITORIA_CALIDAD_NOCTIP.md:2` (olor, ATC, batería 10h, velcro, calor).
- [ ] Tabla comparativa /10. Decide: ≥7 → escala, <5 → cambia supplier mismo SKU (no nuevo producto).

### Semana 3 (Días 14-21) — Validación paid si pasa

- [ ] 1 CBO €35/d, 3 adsets (1 por guión), 3 ads (1 por hook) = 9 creativos, 1 producto, 1 avatar. Lee ATC cost `docs/JULITO_ECOM_NOCTIP.md:10`.
- [ ] Si ATC barato 0 compra → añade bundle Halo+Rest -15% en PDP.

---

## 6. Presupuesto Estimado (test 50uds white label)

| Concepto | Coste |
|----------|-------|
| 8 muestras AliExpress | €60-90 |
| Caja rígida 50uds Halo | €30 |
| Manual ES/EN 50uds | €20 |
| Envío muestras UE | €15 |
| 1 CBO test 7d €35/d | €245 |
| **Total fase test** | **~€370-400** |

Si supplier actual ya pasa auditoría, ahorras white label y vas directo a ads.

---

## 7. Fulfillment — Implicación Crítica (Oct 2026)

> **Contexto:** el supplier actual envía directo a casa del cliente desde China. Esto contradice los claims web (`ShopHomePage.tsx:118` "almacén UE", `legal/shipping/page.tsx:45` "Correos/GLS", 5-10 días) y es inviable premium. **Todas las marcas que escalan usan EU warehouse fulfillment** (`docs/FULFILLMENT_NOCTIP.md`).

**Qué cambia para sourcing:**
- **Packaging se fabrica en China** (o en almacén CJ/EPROLO) y se stockea junto al producto en almacén DE → pick & pack doméstico 3-7 días.
- **Imprenta local España queda descartada** para Fase 1 (no hay punto de ensamblaje en UE). Alternativas: CJ custom packaging MOQ 1 ($1-1.5/ud), EPROLO sin MOQ ($0.8-1.2/ud), o Daohua/Luxopacks (50uds, $2.50-4.50/ud).
- **Opción preferida:** migrar fulfillment a CJdropshipping (almacén DE) — sourcing por link de tu AliExpress actual, packaging custom mate, envío DE→ES 3-7 días, 0 cuotas mensuales.
- **Devolver producto a China = inviable** (3 meses, se pierde). Solución: refund sin retorno físico (estándar CJ para producto <€25).

---

## 8. Riesgos

- **AliExpress bloqueo JS** → usa wholesale links directos arriba, no scraper genérico.
- **Yelkoo/Ylekto:** benchmark cervical pillow Amazon $35.99, 4.87★. No confundir con proveedor AliExpress.
- **Calidad falla** → no escales, cambia supplier mismo SKU. Mejor perder 10 días que €500 devoluciones 30 noches.
- **Envío directo China** → claim falso + aduanas €3/artículo julio 2026 + sin premium. **Usa almacén UE.**

---

## 9. Entregables Creados

- `docs/JULITO_ECOM_NOCTIP.md` — framework Julito completo
- `docs/AUDITORIA_CALIDAD_NOCTIP.md` — checklist 10 noches por producto
- `docs/FULFILLMENT_NOCTIP.md` — playbook EU warehouse (CJ/EPROLO/BrandSKU)
- `docs/PREMIUM_PACKAGING_NOCTIP.md` — spec caja mate, copy, shot-list, guion 30s
- `docs/PRODUCTOS_ALTERNATIVOS_NOCTIP.md` — 8 alternativas Tier1/Tier2
- Este doc — sourcing + branding + fulfillment

**Siguiente paso:** Contactar agente CJ con plantilla `FULFILLMENT_NOCTIP.md:7` + pedir sample Halo desde almacén DE + mockup caja crema mate.
