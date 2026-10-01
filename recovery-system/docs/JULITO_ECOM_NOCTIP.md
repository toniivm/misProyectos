# Julito Ecom (Julian Cides) — Investigación Completa para Noctip

> Fecha: 1 Oct 2026 | Canales analizados: `@julitoecom` (16 videos) + `@Juliancides` principal
> Método: `yt-dlp --flat-playlist` + proxy Piped `api.piped.private.coffee/timedtext` para extraer transcripciones auto-generadas (75.000+ palabras). Sin IA, lectura manual.

---

## 1. Quién es Julito

**Julian Cides, 21 años, argentino.** Alias Julito.

- Vendía servicios / high-ticket / marca personal 2.5 años, llegó a +10k/mes vendiendo a otros negocios. Se quedó en 0, quemó barcos, se endeudó (última tarjeta = valor del curso).
- Empieza **branded dropshipping moda** de 0 absoluto. Documenta todo semana a semana en YouTube:
  - Mes 1: ~15k
  - Mes 2: ~50k
  - Mes 3: **+100k/mes** (menos de 90 días) — lo tiene todo grabado
- Objetivo actual: escalar a **+900k/mes**. Ya vive en Dubai/Bali, villa 5 plantas, viaja en business.
- No vende curso enlatado. Vende **mentoría 1a1 VIP** → `https://wa.link/bsyq82` (aparece en los 16 videos).

**Canales:**

| Canal | ID | Handle | Subs | Foco |
|-------|----|--------|------|------|
| Principal | `UCYLhV1pGvSRs8be5nU6JPVQ` | `@Juliancides` | 2.400 | Lifestyle + mindset + tactical. 200+ videos |
| Secundario | `UCfZ0ejVyWAyFWI3Z5dCV2Ug` | `@julitoecom` | 289 | 100% marketing/ventas, 1 video/día. Es el analizado |

Descripción secundario: *"Este canal está enfocado 100% en Ecommerce"*.

> Por qué importa para Noctip: no es gurú de 100k subs, es operador que documenta. Su framework es replicable sin equipo grande.

---

## 2. Tesis Central: EL PRODUCTO GANADOR NO EXISTE

Frase que repite en 16/16 videos. Base bíblica del canal.

> "Vas a la próxima testa pensando que el producto no vende porque es malo. No vende porque tu mensaje no conecta. El producto se HACE ganador con marketing." — `GE0GHg--nm8`

**Modelo viejo que ataca:**
- 5 testeos/día de productos de Aliexpress por nº de anuncios
- Copiar anuncio 1:1 con Claude
- Cambiar producto cuando no vende día 1

**Modelo Julito:**
- 1 producto → N avatares → N ángulos → N guiones
- "Con un pedacito de torta haces muchísimo dinero" — no necesitas ser generalista.

Esto encaja perfecto con Noctip: ya tenéis `lib/catalog.ts` con 4 productos sistema (`halo`, `wave`, `sleep-headband`, `neck-massager`), no necesitáis más productos. Necesitáis más **ángulos por producto**.

---

## 3. Los 16 Videos @julitoecom — Resumen Táctico

### 1. `Arkf3wZkui4` — Cómo ganan +$2.5M/mes moda SIN producto ganador (34:37)
**Case 2.5M/mes tienda branded moda.**
- No es general store. Tiene **funnel madre + sub-funnels dedicados por avatar**.
- Cada avatar = landing distinta, mismo producto.
- Analiza en vivo WinningHunter (no preparado). Enseña a leer por qué un anuncio vende: no es producto, es alineación mensaje-idea-formato.
- **Para Noctip:** Halo necesita funnel "pareja 55a que duerme separada" distinto a funnel "viajero que ronca en hotel".

### 2. `zbfJL07VILg` — Los 3 mejores guiones que siempre venden (26:07)
**Framework más importante del canal.**
- Orden: **Mensaje > Idea > Formato > Guión > Hook**. Validas MENSAJE primero, luego ideas (mismo mensaje con historias distintas), luego formatos.
- **3 guiones base:**
  1. **Situación Inicial + Mecanismo Único/Deseo** — Empiezas por dolor actual en hook visual+texto ("Dormís separados hace 2 años?"), luego deseo transformacional ("Volvéis abrazados 8h"), luego mecanismo (mandíbula 10mm).
  2. **Deseo en 1ª persona + Situación** — Empiezas por deseo ya sentido "Quiero dormir de lado sin dolor de oreja" → tocas dolor "40min dando vueltas con auriculares".
  3. **Ruptura de Objeción / Bottom Funnel** — Para quien ya conoce categoría, rompes objeciones: "No se mueve, no marca, no aprieta, XS-XL".
- Hook no es solo texto, es visual que rompe scroll.
- **Para Noctip:** 1 avatar x 3 guiones = 9 creativos mínimo. No 9 productos.

### 3. `u0k4JIA8HjE` — De 0 a +$15k en 30 días (primer producto) (38:10)
**Caso Eric (20) + Gian (18) Colombia.**
- Venían de COD (contraentrega) con 0, última tarjeta = curso. Encontraron tienda con 30 ads pero 0 gasto → producto NO validado. Lo lanzaron igual.
- Primer producto global con Julito → 30 días 15K, 20-30% comisión entre los dos. Quejas solo por envío lento, pero clientes agradecidos al recibir.
- **Para Noctip:** Valida por **gasto** en librería, no por nº de ads. EU warehouse 5-10 días es ventaja vs COD Latam.

### 4. `GE0GHg--nm8` — De "no vende" a +$100k/mes (29:15)
- Pregunta correcta no es "qué hago cuando deja de vender" sino "por qué vendió".
- Producto no muere, muere tu comunicación. Si entendiste por qué vendió, puedes revivirlo.
- Muestra captura Brian 11k/día, Eric 5k/día con 50-60% margen día anterior.
- **Para Noctip:** Si Halo vendió 3 días y cae, no cambies a Back. Cambia hook/ángulo del mismo Halo.

### 5. `Efdy8HuYQFQ` — 60% ganancia en +$5k/día (23:10)
- Eric: $2.000 con $150 ads → día siguiente $5.000 con $80 ads. Brian 11k/día estable.
- "Asquerosamente envidiable" porque es **sin COD**, margen 50-60% vs COD 10-15%.
- **Para Noctip:** Ya estáis en global Stripe (sin COD). Bundles 15-20% `lib/catalog.ts:337` suben AOV y margen. No necesitáis COD.

### 6. `CY_KvmR2n5I` — Que TODOS tus productos vendan siempre (22:53)
- "Todos mis CBOs venden". Paul, VIP que nunca abrió Shopify, primera venta 8am día 1.
- Brian 10k€/día = 11k$/día con primer producto con Julito.
- **Para Noctip:** Si tus CBOs no venden, no es producto, es que lanzas sin avatar claro.

### 7. `QGzFJVfRtQg` — Claude está matando el dropshipping (15:38)
- Usa IA gratis para creativos que le hacen +1k/mes, pero explica por qué Claude como lo usa todo el mundo mata.
- **Para Noctip:** Ver punto 10.

### 8. `y0eFDypKqdM` — Renovar anuncios con Kalodata (secreto 100k) (16:45)
- Su secreto escala: **renovar creativos que NO parecen renovados**.
- Viene de vender high-ticket 2.5 años haciendo millones de visitas — aprendió a iterar.
- **Para Noctip:** Buscar en Kalodata "sleep headband" / "anti snoring" filtrar 15d+ activos, analizar estructura, renovar 30% visual manteniendo 70% mensaje.

### 9. `JRQViFhpG4U` + 10. `VCLXPorqEpM` — Por qué NO uso Claude para guiones (23:27 x2, duplicado)
**Video clave anti-IA.**
- Error #1: toda la gente hace guiones con Claude → todos los creativos son copia de Claude.
- Pre-producción = creatividad humana diaria. Claude es potenciador, no reemplazo. Si no tienes ideas originales, no tienes creativos únicos.
- "Tu nivel de creatividad no lo puedes delegar".
- **Para Noctip:** Usa Claude para transcribir ads ganadores, extraer estructura, pero escribe guión tú con lenguaje 2º ESO ("Nuca piedra", no "tensión cervical") `AGENTS.md`.

### 11. `QUSjLLkTWxA` — +$6k/día SIN ganador (imperio comida) (25:42)
- Analogía: imperio comida (McDonald's) no necesita producto ganador, necesita sistema. Mismo con dropshipping.
- Llegó a Bali 11pm, reflexiona 10h sin business → idea video.
- **Para Noctip:** No busques "producto virgen". Construye sistema Noctip (problema→solución) y repite.

### 12. `ZIWmSbC2ZXQ` — Dejar de perder y ganar 5k/día en 20 días (caso real) (32:27)
**Caso Brian documentado:**
- 25 testeos moda fallidos, -€1500, 0 ventas.
- Con Julito, mismo producto, 1er testeo no vende → call 1a1 cambia cosas → 24h → 2 pedidos en 5h → 20 días → 5k/día. Hoy 9k/día.
- **Para Noctip:** Tus 25 testeos fallidos no son fracaso, son data si cambias mensaje. No cambies producto día 2.

### 13. `_yLOISgZbyQ` — ¿Moda funciona? (17:25)
- 2.5 años emprendiendo, primeros 10k vendiendo servicios, quemó barcos.
- Gente con contenido gratis YouTube le dice "tenías razón, 5 productos/día moda general no funciona".
- **Para Noctip:** Noctip NO es moda, pero mismo principio: nicho sueño/recuperación funciona si es branded, no general.

### 14. `_2Din8-8zeg` — De 0 a 4k/día en 20 días: leo métricas Meta (27:00)
**Video más táctico para no apagar.**
- Caso: 25 ago ATC $23 carísimo 0 ventas → Julito pide cambiar cosas → 26 ago 5h 2 pedidos → 20 días 4k/día.
- "Piensan que problema es producto, cambian producto. Problema es mensaje".
- **Para Noctip:** Si Halo ATC €8-12 0 compra = landing/oferta, no producto. Añade bundle Halo+Rest -15% y cambia hook.

### 15. `V_GZ1Q_o54g` — Hooks de +$100k/mes (49:36) — **EL MÁS LARGO Y VALIOSO**
- "Todo el mundo dice 80% anuncio 20% oferta. Verdad, pero 99% del creativo es hook. Si hook no engancha, nada vende".
- Promete no parar hasta analizar 3 tiendas escaladas con WinningHunter/Kalodata, miles/decenas miles en spend.
- Explica por qué hooks que crees buenos son malos para testeo: no hablan a audiencia correcta → funnel Meta no optimiza.
- **Para Noctip:** Testea 3 hooks por avatar, mismo guión. Ej Halo: H1 "¿Dormís separados?" H2 "Amaneced abrazados" H3 "Tu pareja no se va al sofá".

### 16. `LfEBc4Fs7Cs` — +$4k/día SIN ganador moda (35:27) — Entrevista Brian
- Brian: "Gasté €1500 en 1 testeo 25 testeos foul, luego contigo 1er producto 7 días 15K, Italia 4h 4 ventas ROAS 10.9".
- "Ahora agarro cualquier producto y lo hago win".
- **Para Noctip:** Confianza = sistema, no suerte.

---

## 4. Framework Julito Completo

### 4.1 Pirámide

```
HOOK (visual+texto)  ← 99% del creativo
 └─ GUIÓN (3 tipos)
     └─ FORMATO (UGC, demo, POV, founder)
         └─ IDEA (misma mensaje, historia distinta)
             └─ MENSAJE (dolor avatar + mecanismo único)
                 └─ AVATAR (no producto)
```

### 4.2 5 Errores que te mantienen en 0

1. 5 testeos/día general store
2. Claude escribe guiones
3. Copiar 1:1 sin entender mensaje
4. Matar producto día 1 por 0 ventas
5. Buscar producto ganador en vez de ángulo ganador

### 4.3 Stack Herramientas Julito

- **WinningHunter / Kalodata** → espiar ads con gasto, no nº de ads. Renovar 70/30.
- **Shopify branded** → 1 producto = 1 funnel, no 10 productos en home.
- **Meta CBO** → 1 avatar por CBO, 3 ángulos por adset.
- **Google Docs diario** → reflexiona, escribe por qué vendió/no vendió.
- **WhatsApp 1a1** → feedback métricas en <24h (él lo hace con VIP).

---

## 5. Mapeo a Noctip — Qué Ya Hacéis Bien

| Julito pide | Noctip ya lo tiene | Archivo |
|-------------|-------------------|---------|
| Problema→Solución, no features | `ShopHomePage.tsx:124` "Elige fricción... un problema, un producto" | `components/ShopHomePage.tsx` |
| Copy transformacional | `lib/catalog.ts:77` "Dormíais separados... En 1 noche volvéis abrazados 8h" | `lib/catalog.ts` |
| Sistema, no producto | `ShopHomePage.tsx:74` "Noctip es tu sistema de noche" | `components/ShopHomePage.tsx` |
| Branded tienda oscura premium | `DESIGN_SYSTEM.md` #080c12, #10BFD8 | `recovery-system/docs/DESIGN_SYSTEM.md` |
| Bundles 15-20% | `lib/catalog.ts:337` 7 bundles | `lib/catalog.ts` |
| 30 noches prueba | Hero + checkout | `components/ShopHomePage.tsx`, `app/[locale]/checkout/page.tsx` |
| Sin COD, Stripe global | `allow_promotion_codes:false`, Stripe | `app/api/payments/create-checkout-session/route.ts` |
| Mobile-first 50-70a | `AGENTS.md` 16px min, 48px btn | `AGENTS.md` |

**Gap:** Todo eso está en web, pero **no en ads**. Ads siguen genéricos features. Julito diría: lleva el mismo sistema a Meta.

---

## 6. Avatares Noctip (Prioridad Julito)

No 4 productos → 6 avatares. **1 producto = N avatares.**

| # | Producto | Avatar (edad, contexto, dolor) | Dolor Exacto (texto hook) | Deseo Transformacional |
|---|----------|-------------------------------|---------------------------|------------------------|
| 1 | **Halo** | Hombre 52-68 roncador, pareja en sofá 2 años | "Lleváis 2 años durmiendo separados" | "Mañana dormís abrazados 8h sin codazos" |
| 2 | **Halo** | Mujer 45-60 avergonzada ronquido, miedo hotel/viaje | "No vas a viaje con amigas por miedo a roncar" | "Duerme tranquila en hotel, sin vergüenza" |
| 3 | **Rest** | Mujer 35-55 lateral, odia tapones/auriculares | "40min dando vueltas, auricular clavado duele" | "Te duermes en 12min, 45g que no sientes" |
| 4 | **Rest** | Joven 25-40 ansioso, insomnio pantalla 8h | "Pantalla hasta las 2am, cabeza no para" | "Podcast/ruido blanco, móvil en mesita" |
| 5 | **Back** | Oficinista 35-55 encorvado 4pm camisa torcida | "A las 4pm pareces mayor, espalda cargada" | "Entras erguido 2 semanas, 15min/día invisible" |
| 6 | **Cervical** | 40-65 cuello piedra 7pm sin tiempo fisio | "Nuca piedra a las 7pm, pastilla no soluciona" | "15min suelta sin cables, en oficina" |

**Prioridad test:** Empieza con **Avatar 1 Halo** (dolor más emocional + alto AOV con bundle Halo+Rest). Julito: 1 avatar 20 días antes de abrir 2º.

---

## 7. Guiones Noctip Listos (3 Tipos Julito)

### Plantilla Guión A — Situación Inicial + Mecanismo (para Avatar 1 Halo)
```
HOOK [3s, texto grande 28px, visual pareja separada]:
"Dormís separados por ronquidos? Lleváis 2 años así?"

SITUACIÓN [5s, UGC hombre 55a en cama vacía]:
"Probamos tiras, spray, almohada... nada. Ella al sofá, yo culpable."

DESEO [5s]:
"Quiero despertar abrazados, sin codazos a las 3am."

MECANISMO ÚNICO [10s, demo Halo]:
"Noctip Halo avanza 10mm tu mandíbula, abre vía aérea. Silicona médica, doble capa, estuche viaje. Desde noche 1."

PRUEBA [5s, bundle]:
"Pack Sueño Halo+Rest -15% — 30 noches prueba, envío UE 5-10 días, Stripe."

CTA [2s]:
"Dormid juntos mañana — Noctip.com"
```
Specs: 9:16, 25-35s, subtítulos 16px, botón 48px, sin `type=number`.

### Plantilla Guión B — Deseo 1ª Persona (para Avatar 3 Rest)
```
HOOK [3s, chica de lado con Rest]:
"Por fin duermo de lado sin dolor de oreja"

SITUACIÓN [5s]:
"40min con auriculares clavados, me despertaba cada hora"

DESEO [7s, demo 45g, lavable]:
"Rest 45g, altavoces ultrafinos no presionan, lavas a máquina, 10h batería"

MECANISMO [8s, Bluetooth 5.0]:
"Pongo podcast, móvil en mesita, me olvido"

CTA [2s, bundle]:
"Rest solo €19.99 — Pack Sueño -15%"
```

### Plantilla Guión C — Ruptura Objeción (para Avatar 5 Back)
```
HOOK [3s, camisa torcida vs erguido]:
"Corrector que NO se ve bajo camisa — XS a XL"

OBJECIONES [10s, demo malla transpirable]:
"Los otros marcan y pican. Noctip Back malla transpirable, 120g, invisible"

MECANISMO [10s, 15min/día]:
"15min/día 2 semanas, tu cuerpo recuerda solo. Tu fisio lo notará"

PRUEBA [5s]:
"Pack Recuperación Back+Cervical -15%"

CTA [2s]:
"Entra erguido mañana"
```

**Regla Julito:** Mismo mensaje, 3 ideas, 3 formatos (UGC pareja 55a, demo producto, founder). No 3 productos distintos.

---

## 8. Hooks Noctip (99% del creativo) — Test 3 por Avatar

**Avatar 1 Halo:**
- H1 Dolor: "Dormís en camas separadas?"
- H2 Deseo: "Amaneced abrazados 8h — noche 1"
- H3 Curiosidad/Mecanismo: "10mm que abren tu vía aérea"

**Avatar 3 Rest:**
- H1: "Duermes de lado y todo te molesta?"
- H2: "45g que no sientes — 10h batería"
- H3: "Lava tu banda, no tus auriculares"

**Avatar 5 Back:**
- H1: "Camisa torcida a las 4pm?"
- H2: "15min/día, espalda recta 2 semanas"
- H3: "Invisible bajo ropa — XS-XL"

Julito: hook visual > textual. Test visual: pareja sofá vs dormitorio abrazados vs demo mandíbula.

---

## 9. Kalodata / WinningHunter — Cómo Renovar

1. Buscar `sleep headband`, `posture corrector`, `anti snoring` → filtrar **15d+ activos + spend >$5k**
2. Transcribir guión (con Claude OK para transcribir, no para escribir)
3. Extraer: mensaje, idea, hook visual
4. Renovar 70/30: mantén mensaje, cambia 30% → escenario español real (piso 60m2 Zaragoza, no villa Bali), protagonista 58a, luz cálida nocturna `#f2eee7`
5. No copies 1:1 — Julito: "Si copias con Claude, eres copia de copia"

---

## 10. Métricas Meta — Cuándo NO Apagar (Video 14)

Caso Brian 25 ago: **ATC $23 carísimo 0 ventas** → NO apagó. Cambió oferta + hook → 26 ago 2 ventas en 5h → 20 días 4k/día.

**Checklist Noctip:**

- 0 ventas + 0 ATC en €30 → hook no conecta avatar → cambia hook, no producto
- ATC €8-15 + 0 compra → landing/oferta falla → añade bundle -15% + prueba social (aunque `reviewCount:0` hoy, no inventes — mejor sin fake `AGENTS.md`)
- ATC + IC + 0 compra → checkout fricción → revisa `app/[locale]/checkout/page.tsx` (ya optimizado guest checkout)
- ROAS 1.5-2 con ATC barato → escala CBO manteniendo mensaje, renovando creativo con Kalodata

**No hagas:** 5 adsets con 5 productos día 1. Haz 1 producto / 1 avatar / 3 guiones / 3 hooks = 9 creativos en 1 CBO €30-50/día (EU).

---

## 11. Funnels Branded Noctip

Julito tienda 2.5M: funnel madre + sub-funnels.
Noctip home es general (`ShopHomePage.tsx`), pero Meta debe ir a **funnel dedicado**:

- Ad Halo Avatar 1 → `/es/products/halo?avatar=pareja` con hero "Dormíais separados..." (mismo `lib/catalog.ts:77` pero headline cambia por avatar)
- Ad Rest Avatar 3 → `/es/products/sleep-headband?avatar=lateral` con hero "Dabas vueltas 40min..."
- Bundles `full-sleep-pack` 15% y `complete-pack` 20% como order bump / post-purchase (ya existen).

No crees 4 homes. 1 home general para orgánico, N landings avatar para paid.

---

## 12. Por Qué Margen 60% Sin COD es Ventaja

Julito critica COD Latam (10-15% neto). Noctip ya está en **global Stripe UE** con envío 5-10 días, 30 noches prueba.
- COD deja margen bajo por logística contraentrega + devoluciones.
- Global deja 50-60% porque puedes cobrar envío gratis como valor, bundle + AOV, menos devolución si avatar correcto.
- Mantén `allow_promotion_codes:false` y `price/comparePrice` estático `lib/catalog.ts` — no añadas cupones.

---

## 13. Qué NO Hacer (Lista Negra Julito)

- [ ] `type="number"` en checkout (ya corregido `inputMode=text`)
- [ ] Claude escriba guiones
- [ ] 5 productos/día
- [ ] Fake reviews `rating:0` → mejor no mostrar que inventar `AGENTS.md: NUNCA mostrar X estrellas hardcodeadas`
- [ ] General store con 10 productos
- [ ] Apagar día 1 por 0 ventas sin leer ATC
- [ ] Copiar anuncio US 1:1 sin adaptar a avatar ES 58a

---

## 14. Plan 30 Días Noctip — Estilo Julito

**Días 1-7: Investigación**
- 2h/día Kalodata/WinningHunter transcribir 10 ads ganadores sueño/postura con >15d activos
- Escribir 1 avatar (Halo pareja) x 3 guiones x 3 hooks = 9 guiones en Google Doc
- Grabar UGC con pareja real 58a en dormitorio real (no estudio), luz cálida, móvil 9:16

**Días 8-14: Test único**
- 1 CBO €35/día, 3 adsets (1 por guión), 3 ads por adset (1 por hook) → 9 creativos, 1 producto, 1 avatar
- No toques producto. Lee métricas: ATC cost, CTR hook.

**Días 15-20: Iterar mensaje, no producto**
- Si Guión A ATC €6 y Guión B €18 → mata B, duplica A con nuevo hook visual (mismo texto, otro dormitorio)
- Si ATC barato 0 compra → añade bundle Halo+Rest -15% en landing

**Días 21-30: Escala o pivota avatar**
- Si ROAS >1.8 → escala CBO +20% cada 2 días, crea 3 renovaciones Kalodata 70/30
- Si ROAS <1.2 tras 5 días con ATC barato → pivota a Avatar 3 Rest, mismo sistema, no nuevo producto random

Documenta diario como Julito: "por qué vendió/no vendió".

---

## 15. Videos para Ver en Orden Recomendado

1. `V_GZ1Q_o54g` Hooks 100k (49m) — base
2. `zbfJL07VILg` 3 guiones (26m) — estructura
3. `_2Din8-8zeg` Métricas Meta (27m) — no apagar
4. `ZIWmSbC2ZXQ` Caso 5k 20d (32m) — proceso real
5. `y0eFDypKqdM` Kalodata (16m) — renovar
6. `QGzFJVfRtQg` + `VCLXPorqEpM` No Claude (15+23m) — creatividad

Todos: `https://www.youtube.com/watch?v={ID}`

---

## 16. Frases Julito para Noctip

> "No busques producto ganador, busca ángulo ganador."
> "El producto no muere, muere tu comunicación."
> "99% del creativo es hook."
> "Con un pedacito de torta haces muchísimo dinero."
> "Si usas Claude para guiones, eres copia de copia."

---

**Próximo paso:** Si quieres, genero los 9 guiones literales Halo Avatar 1 listos para grabar (con timing, texto overlay 28px, indicación visual) en `recovery-system/docs/ADS_HALO_GUIONES.md`.
