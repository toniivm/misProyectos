# Auditoría de Calidad Noctip — Qué Hacer Esta Semana

> Objetivo: validar si tus 4 productos pueden escalar a 4-5k/día sin que devoluciones maten margen. No busques producto nuevo hasta pasar esto. Basado en framework Julito (1 producto x N ángulos, no N productos).

---

## Regla de Oro

**Si el producto falla en mano, falla en Meta.** Julito: 25 testeos de Brian fallaron no por ángulo, sino por cambiar producto cada 2 días sin validar calidad base. Tú ya tienes sistema `lib/catalog.ts:64` + bundles `lib/catalog.ts:337` + garantía 30 noches `components/ShopHomePage.tsx:117`. No lo rompas buscando producto mágico.

TikTok Shop vende el MISMO molde de Rest a €14.99. Tu diferencia no es fábrica, es: **caja Noctip + manual ES/EN + estuche + soporte hola@noctip.com + envío UE 5-10 días + 30 noches prueba**. Eso justifica €19.99 vs €11.99 y sube AOV.

---

## Paso 1: Pide Muestras (Hoy)

Pide a tu proveedor actual + 1 alternativo (Zendrop / CJdropshipping / Alibaba sample):

| Producto | SKU actual | Pedir 1 muestra a | Pedir 1 muestra a | Coste |
|----------|------------|-------------------|-------------------|-------|
| Halo `halo` | mouthpiece | Proveedor actual | CJdropshipping “anti-snoring mouthpiece medical silicone 10mm” | ~€15+envío |
| Back `wave` | posture corrector Y | Proveedor actual | Zendrop “Y shape posture corrector XS-XL” | ~€8 |
| Rest `sleep-headband` | sleep headband 45g | Proveedor actual | Alibaba “Bluetooth 5.0 sleep headband 10h” | ~€6 |
| Cervical `neck-massager` | cervical massager 200g | Proveedor actual | Proveedor 1688 “neck massager heat ABS+TPR” | ~€12 |

**Especifica:** sin logo genérico, con tu caja blanca Noctip. Pide video de fábrica (molde, silicona, bateria).

---

## Paso 2: Checklist por Producto (Cuando lleguen, 10 noches test)

Testa TÚ + 2 personas 50-70a (tu target `AGENTS.md: mobile-first 50-70a`). No tu sobrino 22a.

### Halo — Férula `halo` (`lib/catalog.ts:67`)
- [ ] **Olor**: abrir caja → ¿olor químico fuerte? Silicona médica no huele.
- [ ] **Moldeado**: hervir 70s + morder → ¿ajuste 10mm real? ¿se queda fijo o baila?
- [ ] **Confort noche 1-3**: ¿babeo excesivo? ¿dolor mandíbula mañana? ¿marca dientes?
- [ ] **Eficacia**: pareja mide ronquido (app SnoreLab) noche 0 vs noche 2 → ¿baja >50%?
- [ ] **Limpieza**: lavar 10 noches → ¿amarillea? ¿agarra olor?
- [ ] **Estuche**: ¿cierra bien viaje? ¿entra en neceser?
- [ ] **Instrucciones**: ¿manual ES sin faltas? ¿8 pasos claros? Si no, reescribe.
- **FAIL si:** dolor mandíbula >3 días, no baja ronquido, silicona amarilla día 7.

### Back — Corrector `wave` (`lib/catalog.ts:116`)
- [ ] **Tallas**: probar XS y XL → ¿velcro aguanta? ¿se despegó día 5?
- [ ] **Invisible**: bajo camisa blanca → ¿se marca en Y? ¿pica malla?
- [ ] **15min/día 14 días**: ¿a las 2 semanas postura erguida sin llevarlo? (foto 4pm día 1 vs día 14)
- [ ] **Transpirable**: 30°C 15min andando → ¿sudor excesivo?
- [ ] **Costuras**: lavar mano 5x → ¿se deshilacha?
- **FAIL si:** marca bajo ropa fina, pica 3/3 testers, velcro falla día 7.

### Rest — Banda `sleep-headband` (`lib/catalog.ts:165`)
- [ ] **Peso**: báscula → ¿45g real? ¿se siente de lado 7h?
- [ ] **Presión**: dormir lado 3 noches → ¿dolor oreja? Altavoces ultrafinos no deben presionar.
- [ ] **Batería**: carga 1.5h → ¿10h reales? Medir con podcast continuo.
- [ ] **Lavable**: sacar altavoces (¿fácil 10s?) → lavadora 30°C 3x → ¿deforma banda?
- [ ] **Bluetooth 5.0**: distancia 5m tras pared → ¿corte?
- [ ] **Volumen**: control integrado → ¿anciano 65a lo entiende sin móvil?
- **FAIL si:** dolor oreja día 2, batería <7h, se deforma lavada.

### Cervical — Masajeador `neck-massager` (`lib/catalog.ts:220`)
- [ ] **Calor**: 15min sesión → ¿calor suave perceptible? ¿quema?
- [ ] **Ajuste cuello fino vs ancho** (48cm vs 42cm) → ¿aprieta o baila?
- [ ] **Autonomía**: ¿temporizador 15min corta solo? ¿200g real?
- [ ] **Material**: ¿alergia 3h uso? ABS+TPR no debe picar.
- [ ] **Ruido**: ¿motor silencioso para oficina?
- **FAIL si:** no calienta, aprieta cuello fino, alergia.

---

## Paso 3: Tabla Comparativa Proveedor

|  | Proveedor Actual | Proveedor Alt | Ganador |
|---|---|---|---|
| Halo olor / ajuste |  /10 |  /10 |  |
| Back velcro / invisible |  /10 |  /10 |  |
| Rest batería / presión |  /10 |  /10 |  |
| Cervical calor / alergia |  /10 |  /10 |  |
| Packaging (caja blanca Noctip) |  |  |  |
| Tiempo UE 5-10d |  |  |  |
| Precio coste + envío |  |  |  |

**Decisión:**
- **7-10/10 y pasa 10 noches** → quédate con ese supplier, escala ángulo (no busques producto nuevo).
- **5-7/10** → pide mejora (manual ES, estuche, velcro reforzado) y re-audita.
- **<5/10 o FAIL** → cambia supplier del MISMO SKU, no cambies nicho. Ej: Halo sigue siendo Halo, solo cambia fábrica.

---

## Paso 4: Plan 14 Días (Lo Que Más Recomiendo)

**Día 1 (hoy):** Pide 8 muestras (4 productos x2 suppliers). Mientras llegan (7-10 días), no pares:

**Día 1-7: Prepara 1 avatar (sin gastar)**
- Avatar foco: **Halo pareja 55a dormida separada** (dolor emocional más alto, ticket €13.99 + bundle Halo+Rest 15% = €29.98 AOV).
- Escribe 3 guiones Julito `docs/JULITO_ECOM_NOCTIP.md:7` (Situación+Mecanismo / Deseo 1ª persona / Ruptura objeción) → 3 hooks cada uno = 9 guiones en Google Doc. Usa lenguaje 2º ESO `AGENTS.md`: "Nuca piedra" no "tensión cervical".
- Prepara landing avatar: `/es/products/halo?avatar=pareja` clona `lib/catalog.ts:77` headline "Dormíais separados..." como H1, no genérico.

**Día 7-10: Llegan muestras → auditoría 10 noches**
- Test 3 personas 50-70a, documenta foto/video SnoreLab, tabla arriba.
- Si Rest falla batería, contacta supplier alt antes de escalar ads.

**Día 11-14: 1 test paid**
- Si Halo pasa auditoría ≥7/10 → lanza 1 CBO €35/día, 3 adsets (1 por guión), 3 ads por adset (1 por hook) = 9 creativos, 1 producto, 1 avatar. No 5 productos.
- Lee ATC cost `docs/JULITO_ECOM_NOCTIP.md:10`: ATC €6 barato 0 compra = oferta, no producto → añade bundle -15%.
- Si Halo falla <5/10 → no lances ads. Cambia supplier, repite auditoría. Mejor perder 10 días que quemar €500 en devoluciones.

---

## Paso 5: Qué NO Hacer Esta Semana

- [ ] Buscar 5 productos nuevos en TikTok Creative Center
- [ ] Pedir 10 samples random categorías distintas
- [ ] Escribir guiones con Claude (sí para transcribir Kalodata, no para escribir)
- [ ] Inventar reviews `reviewCount:0` `lib/catalog.ts:74` → mejor badge "30 noches prueba" que 4.8★ falso `AGENTS.md: NUNCA mostrar X estrellas hardcodeadas`
- [ ] Cambiar `price` sin auditar coste nuevo

---

## Entregable

Al terminar día 10, tendrás:

- Tabla comparativa 4 productos x2 suppliers con nota /10
- Decisión: escalar / cambiar supplier / mantener
- 9 guiones listos para grabar (si pasa) o 0€ quemados (si falla y cambias supplier)

¿Hacemos? Día 1 = pide muestras hoy y te preparo los 9 guiones Halo pareja mientras llegan.

