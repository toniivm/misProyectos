# Productos Alternativos Noctip — Si Los 4 Actuales Fallan Auditoría

> Fecha: 01 Oct 2026 | Condición: SOLO si auditoría `AUDITORIA_CALIDAD_NOCTIP.md` da <5/10 y cambiar supplier mismo SKU no soluciona
> Principio Julito: no añadas 5 productos/día. Añade **1 producto que sirva al mismo avatar** que ya validaste.

Tus 4 actuales (`lib/catalog.ts:64` halo/wave/sleep-headband/neck-massager) son correctos para sistema `ShopHomePage.tsx:74`. Alternativos abajo son **complementarios**, no reemplazo random.

---

## Ranking 8 Alternativas (Sleep & Recovery, 50-70a, €12-30, ligero, sin regulación médica dura)

### TIER 1 — Complementos directos (añadir como upsell/bundle sin cambiar sistema)

| # | Nombre Noctip | AliExpress search | Por qué encaja avatar | Precio Ali | PVP Noctip | Saturación TikTok | Riesgo |
|---|---------------|-------------------|----------------------|------------|------------|-------------------|--------|
| **1** | **Noctip Tape** — Mouth tape hipoalergénico | `mouth tape sleep nasal breathing 30pcs` → https://es.aliexpress.com/w/wholesale-mouth-tape-sleep.html | Avatar 1 Halo: quien ronca por boca, tape + Halo = sistema. Consumible → recompra mensual | €2-3 /30uds | €14.99 (90uds) | Media (viral 2024) | Bajo, consumible |
| **2** | **Noctip Mask** — 3D weighted sleep mask memoria | `3d sleep mask memory foam weighted` → https://es.aliexpress.com/w/wholesale-weighted-sleep-mask.html (ej: 1005003111407667) | Avatar 3 Rest: duerme de lado, luz molesta. Rest audio + Mask oscuridad = pack sueño total | €3-5 | €16.99 | Alta pero diferenciable con peso | Bajo |
| **3** | **Noctip Calm Mini** — White noise portable USB | `portable white noise machine sleep 10 sounds` | Avatar 4 joven ansioso: Rest sin móvil + Calm sin Bluetooth. No pantallas. | €7-10 | €22.99 | Media | Bajo |
| **4** | **Noctip Lumbar** — Cojín lumbar memory foam oficina | `lumbar support cushion memory foam` → https://es.aliexpress.com/item/1005006116129533.html | Avatar 5 Back: si Back corrige hombros, Lumbar corrige lumbar 8h silla. Pack Recuperación crece | €6-9 | €19.99 | Media | Bajo |

**Recomendación:** Si Halo pasa auditoría, añade **Tape** como order bump €9.99 en checkout `app/[locale]/checkout/page.tsx:746` (no nuevo héroe, solo AOV).

### TIER 2 — Nuevos héroes si auditoría falla grave

| # | Nombre | Search | Avatar | Coste | PVP | Notas |
|---|--------|--------|--------|-------|-----|-------|
| **5** | **Noctip Stretch** — Tabla descompresión espalda | `back stretcher massage board` | Avatar 5/6 dolor lumbar crónico | €5-7 | €18.99 | Viral TikTok, pero ocupa más stock |
| **6** | **Noctip Roll** — Almohada cervical tracción | `cervical traction pillow memory foam` → https://es.aliexpress.com/w/wholesale-cervical-orthopedic-pillow.html | Avatar 6 cuello piedra | €12-16 | €29.99 | Compite con Ylekto $35.99 — necesitas altura dual, CertiPUR story. Más pesado envío. |
| **7** | **Noctip Acupress** — Mat + pillow acupresión | `acupressure mat recovery` | Avatar recuperación 40-65a | €8-11 | €24.99 | Buen bundle con Cervical, pero nicho yoga |
| **8** | **Noctip Socks** — Calcetines compresión recovery | `compression socks recovery` | Avatar 6 piernas cansadas | €3-5 | €14.99 | Muy barato, pero fuera de sistema noche (pierde foco) |

---

## Qué NO Añadir (aunque esté viral)

- **Jaw strap anti-snoring** (`jaw-strap-anti-snoring`): compite directo Halo, peor eficacia, reseñas malas → canibaliza.
- **Magnetic therapy neck**: claim magnetismo no probado → riesgo legal UE (no hagas claim médico `lib/catalog.ts:87` ya dice "abre vía aérea" límite).
- **Eye mask bluetooth**: solapa 100% Rest, no aporta sistema.

---

## Matriz Decisión

```
Auditoría Halo ≥7/10? 
  → SÍ: no añadas producto. Escala Halo avatar pareja con 9 creativos `JULITO_ECOM_NOCTIP.md:7` + Tape como bump.
  → NO (supplier malo): cambia supplier mismo Halo (no saltes a Mask).
  → NO (categoría no vende tras 2 suppliers): entonces TIER 1 #2 Mask (mismo avatar Rest) o #1 Tape (mismo avatar Halo).
```

**Regla:** 1 producto nuevo = 1 avatar ya validado. No 8 a la vez.

---

## Sourcing Rápido Alternativos (si decides)

Links directos para muestras (wholesale):

- Tape: https://es.aliexpress.com/w/wholesale-mouth-tape-sleep.html
- Mask: https://es.aliexpress.com/item/1005003111407667.html
- Lumbar: https://es.aliexpress.com/item/1005006116129533.html
- Roll: https://www.aliexpress.com/w/wholesale-cervical-pillow-memory-foam.html

Mismo checklist `AUDITORIA_CALIDAD_NOCTIP.md:2` pero adaptado:
- Tape: ¿hipoalergénico 8h sin irritar? ¿30uds duran 30 noches?
- Mask: ¿3D no presiona pestañas? ¿peso 150g?
- Calm: ¿10 sonidos sin loop audible? ¿USB-C?
- Lumbar: ¿memory foam 50D no se hunde 3 meses?

---

## Plan Si Pides Alternativo

**Día 1:** Pide 2 muestras del TIER 1 elegido + 1 de Halo alt supplier.
**Día 7-10:** Auditoría 10 noches paralela (misma tabla /10).
**Día 11:** Solo si alternativo ≥8/10 y Halo <5/10 → lanzas 1 CBO €35/d con alternativo, mismo guión Julito.

Si Halo pasa, guarda alternativos para Q4 (bundle navidad "Pack Sueño Completo + Mask" 20%).

---

## Entregable Siguiente

¿Quieres que pida muestras de **Tape + Mask** como Tier1 (coste €15) junto a Halo, o prefieres esperar auditoría de los 4 actuales antes de gastar?

Archivo relacionado: `SOURCING_NOCTIP_ALIEXPRESS.md` (links wholesale + branding) + `AUDITORIA_CALIDAD_NOCTIP.md`.
