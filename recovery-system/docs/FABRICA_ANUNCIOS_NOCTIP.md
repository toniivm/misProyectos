# Fábrica de Anuncios Noctip — Playbook completo

> Fecha: 14 Oct 2026 | Basado en `docs/JULITO_ECOM_NOCTIP.md`, `docs/CREATIVOS_NOCTIP_BASE.md`, `docs/ANZUELO_GANADOR_NOCTIP.md`
> Objetivo: producir y publicar anuncios ganadores con ~€0 de herramientas, y saber exactamente cuándo gastar.

---

## 0. Cómo funciona (el flujo completo)

```
TÚ: fotos reales de la muestra (o usamos renders) + aprobar textos
 │
 ▼
FÁBRICA (scripts): tarjetas PNG + overlays + vídeos MP4 9:16 con movimiento
 │
 ▼
CAPCUT: música, subtítulos, retoques (5-10 min por pieza)
 │
 ▼
PUBLICAR gratis: TikTok + Instagram Reels + YouTube Shorts
 │
 ▼
MEDIR (CSV): retención 3s, guardados, clics, ATC
 │
 ▼
BOOST €10-15 SOLO al ganador (Spark Ads / Reel) → leer ATC
 │
 ▼
RENOVAR 70/30 (mismo mensaje, otro escenario) y repetir
```

**Principio Julito que manda:** mensaje > idea > formato > guion > hook. El 99% del creativo es el hook (primeros 3 segundos). Si no conecta, cambia el hook — no el producto.

---

## 1. Qué genera la fábrica (comandos)

```bash
# Renders de producto (hero, detalle, contexto) en 4 formatos
node scripts/generate-brand-images.js

# Piezas de anuncio: tarjetas + overlays + vídeos (en /ads)
node scripts/generate-ads.js
node scripts/generate-ads.js --cards-only    # solo PNGs (rápido)
node scripts/generate-ads.js --video-only    # solo MP4
```

**Salida (carpeta `/ads`):**

| Archivo | Para qué |
|---|---|
| `card-hook-{producto}-9x16.png` | Portada/gancho del anuncio (pantalla completa) |
| `card-cta-{producto}-9x16.png` | Cierre con oferta: 30 noches + noctip.com |
| `card-cta-{producto}-1x1.png` | Versión cuadrada para feed |
| `overlay-hook-{producto}-9x16.png` | Texto con fondo semitransparente para poner en CapCut sobre TU vídeo real |
| `{producto}-anuncio-9x16.mp4` | Vídeo 17s listo: gancho → producto (zoom suave) → detalle → contexto → CTA |

**Cambiar los textos:** edita `PRODUCTS` en `scripts/generate-ads.js` (hook, sub, nombre) y vuelve a ejecutar. Reglas de copy más abajo (§6).

---

## 2. CapCut: montaje final (paso a paso, 10 min)

1. Importa el MP4 (`ads/{producto}-anuncio-9x16.mp4`).
2. Añade música de la librería (volumen 20-30%; la voz manda si la hay).
3. Subtítulos: "Auto captions" → **corrige a mano** (el plan gratis tiene límite mensual).
4. Si quieres poner TU voz o tu vídeo real:
   - Graba con el móvil un plano de uso real de la muestra.
   - Pega el `overlay-hook` encima (queda perfecto en CapCut como sticker/PNG).
   - Corta el vídeo del producto entre el gancho y el CTA.
5. Exporta 1080x1920, 30 fps.
6. **Si usas voz/cara de IA:** antes de publicar activa el aviso "contenido generado por IA" (TikTok) o el texto en pantalla. Nunca una IA diciendo "yo lo uso cada noche" (testimonio falso, prohibido).

---

## 3. Opciones de IA para vídeo (de más barata a más potente)

| Opción | Coste | Qué hace | Cuándo usarla |
|---|---|---|---|
| **A. Fábrica + CapCut** | €0 | MP4 con movimiento + tarjetas + tus clips reales | **Ahora.** Es la recomendada |
| **B. CapCut IA** | €0 (límites) | Plantillas, captions, efectos | Para retoques rápidos |
| **C. Higgsfield** | Pago (créditos) | Ads Studio recrea anuncios con tu producto; AI Influencer; Genjutsu cambia el escenario de un vídeo real | Cuando tengas un ganador y quieras 5 variaciones sin volver a grabar |
| **D. Vídeo 100% IA (avatar)** | Pago | Presentador sintético | Solo con etiquetado y nunca como "cliente real". Peor rendimiento en TikTok |

**Regla de oro:** el vídeo del producto real (manos, cama, linterna, tela) siempre gana al vídeo artificial. La IA es para multiplicar, no para sustituir la demostración.

---

## 4. La matriz 3x3 — los 9 creativos del antifaz

1 producto × 3 guiones × 3 hooks. Todo sale del mismo material (renders + muestras): solo cambia el gancho y el orden.

### Guion 1 — Problema (el primero a grabar)

| Hook | Texto en pantalla (0-3s) | Cuerpo |
|---|---|---|
| H1 | "Duermes de lado y entra luz" | Linterna al lado → me pongo el antifaz → oscuro |
| H2 | "3 antifaces y todos se mueven" | Pruebo uno normal (se mueve) → el nuestro (peso) |
| H3 | "La luz entra por el lado del antifaz" | Primer plano del hueco de la cazoleta 3D |

### Guion 2 — Demostración

| Hook | Texto en pantalla | Cuerpo |
|---|---|---|
| H4 | "Mira dónde lleva el peso" | Abrir/cerrar el antifaz, bolsitas de peso |
| H5 | "Cazoleta hueca: los ojos no tocan la tela" | Dedo entre la tela y el ojo (se ve el hueco) |
| H6 | "Se pone en 2 segundos" | Goma ajustable en tiempo real |

### Guion 3 — Objeción

| Hook | Texto en pantalla | Cuerpo |
|---|---|---|
| H7 | "Antifaz normal vs 3D" | Comparación lado a lado |
| H8 | "¿Y si me giro de noche?" | Girarse de lado sin que se mueva |
| H9 | "Para quien duerme de lado y con luz" | Escena final + pack con Rest |

**Formato objetivo:** 15-25s, 9:16. Regrabar la parte real cada 2-3 piezas para no cansar al algoritmo.

---

## 5. Publicación (SOP gratis, todos los días)

1. **Subir a TikTok primero** (es el que más reparte): MP4 + título gancho + 5-8 hashtags simples (#dormir #sueño #antifaz #noctip).
2. **Instagram Reels:** mismo vídeo. Todo el contexto va en el caption (IG no pone título).
3. **YouTube Shorts:** título con palabra clave ("antifaz 3D para dormir de lado").
4. Responder **todos** los comentarios en la primera hora. Fijar un comentario con "lo tienes en noctip.com".
5. Anotar en `docs/SEGUIMIENTO_ANTIFAZ.csv`: vistas, retención 3s, guardados, clics, ATC.
6. **Ritmo:** 1-2 publicaciones al día, misma base, distinto hook. No más: quemas la cuenta y el material.

---

## 6. Reglas de copy (no negociables)

- Nada de: "cura", "elimina", "clínicamente", "desde la primera noche", efectos de salud.
- Nada de datos inventados (reseñas, estrellas, "X clientes").
- El antifaz "bloquea la luz"; no "te hace dormir mejor".
- Precio y envío con las condiciones reales. Sin descuentos falsos (norma UE: el precio tachado debe haber existido 30 días antes).
- Lenguaje de instituto de 2º de eso. Frases cortas. Público 45-70.

---

## 7. Estrategia de anuncios ganadores (Julito aplicado a €30)

### Fase 1 — Orgánico (días 1-4, €0)

Publica 9 piezas (3 guiones × 3 hooks). Lee esto:

| Señal | Qué significa | Qué hacer |
|---|---|---|
| Retención 3s < 30% | Hook flojo | Cambia hook, mismo cuerpo |
| Guardados y comentarios | El ángulo interesa | Duplica esa idea con otro escenario |
| Clics a noctip.com | El anuncio vende | Candidata a boost |

### Fase 2 — Boost (día 5, €10-15 MÁXIMO)

- Impulsa SOLO la pieza con mejor retención + clics (TikTok Spark Ads o Reel destacado).
- Objetivo: clics al producto, no alcance. €15 ≈ 1.000-2.500 impresiones.
- Con este presupuesto no compras ventas: compras datos.

### Fase 3 — Leer y decidir (día 6-7)

| Resultado | Diagnóstico | Acción |
|---|---|---|
| 0 clics | Hook/creativo | Nuevo hook, no tocar producto |
| Clics y 0 añadidos al carrito | Ficha de producto (precio, envío, confianza) | Arreglar ficha |
| Añadidos y 0 compras | Checkout o precio final | Revisar checkout |
| 1+ venta | Ganador | Renovar 70/30 y repetir |

### Renovación 70/30

Mantén el 70% (mensaje, estructura) y cambia el 30%: otro escenario, otro orden, otra mano. Ejemplo: mismo "linterna al lado", grabado en otra cama, con otro tono de voz.

### Cuándo escalar de verdad

- ROAS > 1.8 con ATC barato → subir presupuesto +20% cada 2 días.
- Antes de escalar: auditoría de calidad de muestra pasada y stock/tiempos confirmados con el proveedor.

### Cuándo parar

- 6 semanas sin clics ni ventas tras 3 iteraciones de hook → parar. Pasar al plan B (funda de seda) sin gastar más.

---

## 8. El bucle semanal (domingo, 30 min)

1. Leer el CSV de la semana.
2. Elegir UNA cosa a cambiar (normalmente el hook).
3. Regenerar 3 piezas con `node scripts/generate-ads.js --cards-only`.
4. Escribir en el CSV "por qué vendió / no vendió" (hábito Julito).

---

## 9. Lo que necesito de ti (por orden)

1. **Fotos reales** de la muestra del antifaz (nombres exactos: `docs/BRIEF_FOTOS_REALES.md`). Si no, seguimos con renders.
2. **Confirmar textos** de la ficha (`docs/FICHA_ANTIFAZ_NOCTIP.md`) cuando tengas la muestra en mano.
3. **Publicar** los primeros 3 vídeos (yo te dejo los archivos, tú los subes desde el móvil).
4. **Contar qué pasa** (métricas en el CSV o pantallazos).

Todo el sistema está hecho para que cada semana sea: producir 3 piezas → publicar → medir → cambiar una cosa. Sin heroísmos y sin gastar de más.
