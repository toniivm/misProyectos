# Fulfillment Noctip — Cómo Operan las Marcas que Funcionan

> Fecha: 01 Oct 2026 | Problema: supplier chino envía directo a casa cliente → contradice promesa web `ShopHomePage.tsx:118` "5-10 días · almacén UE" + `legal/shipping/page.tsx:45` Correos/GLS
> Investigación: CJdropshipping, EPROLO, BrandSKU + arancel UE julio 2026

---

## 1. Diagnóstico

**Modelo actual:** pedido Stripe → backend `NEXT_PUBLIC_API_URL` → supplier CN → China Post/YunExpress → casa cliente 15-30 días.

**Problemas:**
- Claims web falsos (riesgo legal consumo UE, reviews 1★ por "estafa entrega")
- Aduana: desde 01 Jul 2026 UE cobra **€3 por artículo** <€150 (CJ subsidia a ~€2/paquete, pero no es sostenible)
- Sin packaging Noctip (caja parda CN), sin control calidad, devolución 30 noches impracticable (retorno a China = 3 meses, se pierde)
- Premium imposible: cliente ve tracking China + pegatina aduana

**La solución de las marcas que escalan:** **EU warehouse fulfillment** — stock + packaging custom almacenados en Alemania/Polonia, envío doméstico 3-7 días.

---

## 2. Playbook Estándar (3 pasos)

```
1. Diseñas packaging custom (caja + tarjeta + manual) → se fabrica y se STOCKea en almacén UE junto al producto
2. Pedido: almacén hace pick & pack: producto + caja Noctip + inserto → paquete doméstico UE
3. Envío local (DE→ES 3-7 días), sin aduana para cliente, tracking Correos/GLS real
```

Así tu web pasa a ser **verdad** sin tocar código.

---

## 3. Plataformas Verificadas

| Plataforma | Almacén UE | Packaging MOQ | Coste | Envío | Ideal para |
|---|---|---|---|---|---|
| **CJdropshipping** (recomendado inicio) | **Alemania** (entre "10+ Global Warehouses") | **1 unidad** (500+ opciones) | €0/mes, €0 storage | DE→ES **3-7 días** | Test sin capital |
| **EPROLO** | US/UK/**EU** | **Sin MOQ** (bolsa, etiqueta, caja) | Free / $19.90 / $99 año | 5-10 días UE (3-7 desde stock) | Validación rápida |
| **BrandSKU** | Sí, in-house | Sin MOQ, imprime en almacén | Por pedido | 3-7 días | Marca completa |
| **3PL propio** (España) | Tú eliges (Barcelona/Madrid) | Tu imprenta ES | Mínimos mensuales altos | 1-3 días | Escala >200 pedidos/mes |

**Detalles CJ verificados:**
- Sourcing gratuito por link/URL/foto (envías tu AliExpress actual, lo replican)
- Ya tienen `Posture Corrector` (~$4.56) + `Magnetic Belt` en catálogo
- Inspección calidad gratis en productos CJ
- API v2 `developers.cjdropshipping.cn` → integrable con tu backend Render
- Procedimiento packaging: *elegir → diseñar → conectar SKU → comprar → llega a almacén → se descuenta por pedido*. Debe estar en **mismo almacén** que el producto.

---

## 4. Coste Estimado por Pedido (desde almacén DE, a verificar con agente)

| Concepto | Rango |
|---|---|
| Producto (CJ, ej Halo) | €4.0-6.0 |
| Caja custom + tarjeta + tissue | €0.8-1.5 |
| Pick & pack | €1.0-2.0 |
| Envío DE→ES (doméstico) | €3.0-5.0 |
| **Total landed** | **€9-14.5** |

| SKU Noctip | PVP `lib/catalog.ts` | Margen solo | Margen con bundle -15% |
|---|---|---|---|
| Halo €13.99 | €0-5 | ✅ con Halo+Rest (€29.98) |
| Rest/Back €19.99 | €5-11 | ✅ |
| Cervical €21.99 | €7-13 | ✅ |

**Lectura:** Halo solo queda ajustado; la rentabilidad está en bundles `lib/catalog.ts:337` (Pack Sueño / Recuperación). Eso es el modelo Julito: AOV sube.

---

## 5. Migración Recomendada (sin capital inicial)

**Fase 1 — Test 1 SKU (Halo) con CJ sin stock:**
1. Contacta agente CJ → envía link AliExpress actual → pide sample desde almacén DE + cotización packaging custom mate
2. Diseña caja (ver `PREMIUM_PACKAGING_NOCTIP.md`: crema `#f2eee7` mate, logo `#080c12`, acento `#10BFD8`)
3. Stockea packaging en almacén DE junto a Halo
4. Conecta pedidos vía agente/API — fulfillment automático
5. Web claims "5-10 días almacén UE" pasan a ser ciertos sin editar `ShopHomePage.tsx` ni `legal/shipping/page.tsx`

**Fase 2 — Escala:**
- Replicar a Rest/Back/Cervical
- Cuando >200 pedidos/mes, comparar coste CJ vs 3PL propio (tú importas a granel + imprimes caja local)

**Alternativa si supplier actual ya tiene almacén UE:** pide que active "private label + custom packaging" desde su almacén UE (muchos proveedores chinos lo ofrecen).

---

## 6. Qué NO Hacer

- Mantener envío directo China con claims "5-10 días almacén UE" → denuncia + chargebacks Stripe
- Enviar packaging local a factory China para envío directo (logística inversa, 30 días, sin almacén)
- Dejar 30 noches sin dirección UE de retorno → provisiona reembolso sin retorno físico (estándar CJ: no aceptan retorno a China por producto barato)

---

## 7. Checklist con Agente CJ (copiar/pegar)

```
Hola, quiero migrar 4 SKUs a almacén DE para delivery 3-7 días en España:
- SKUs: [pega tus links AliExpress actuales de halo/wave/sleep-headband/neck-massager]
- ¿Tenéis estos SKUs en catálogo DE o podéis sourcerlos?
- Coste producto + packaging custom (caja 100x80x40 crema mate, logo #080c12) por pedido MOQ 1
- Stock actual DE de cada SKU
- Coste envío DE→ES por pedido (con tracking Correos/GLS)
- Plazo packaging custom 50 unidades a stock DE
- Proceso retorno 30 noches intra-UE
```

---

## 8. Próximo Paso

1. Contactar agente CJ con bloque anterior
2. Pedir 2 samples Halo desde DE + mockup caja mate
3. Si valida → migrar fulfillment Halo → test 9 creativos Julito `docs/JULITO_ECOM_NOCTIP.md:7`

Archivo relacionado: `PREMIUM_PACKAGING_NOCTIP.md` (spec mate estándar, corregido para fulfillment UE) + `AUDITORIA_CALIDAD_NOCTIP.md`.
