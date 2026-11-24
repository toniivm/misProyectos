# Nítida — tienda de una página

Página lista para vender **un solo producto**: un cepillo eléctrico giratorio con mango telescópico.
No necesita Next, ni build, ni servidor: es un `index.html` que se sube tal cual.

```
nitida/
├── index.html            ← la tienda entera (HTML + CSS + JS, sin dependencias)
├── media/                ← aquí van las fotos y el vídeo reales
├── legal/legal.html      ← aviso legal, condiciones, envíos, devoluciones, privacidad y cookies
├── tipos-de-tienda.md    ← 9 modelos reales y las 7 estrategias a seguir
├── benchmarks-trendtrack.md ← datos brutos de las 7 tiendas top
└── proveedores.md        ← comparación de proveedores y preguntas antes de contratar
```

## Lo que falta para publicar (y no puedo hacer yo)

1. **Fotos y vídeo reales del producto.** Sin ellos, la página no se publica.
2. **El enlace de Stripe** (2 minutos, gratis).
3. **Las páginas legales** con tu NIF y dirección.

Todo lo demás ya está hecho.

---

## 1. Proveedor: Dropea (gratis, 2 minutos)

> Antes de darte de alta, lee **`proveedores.md`**. Ahí está la comparación con BigBuy, OcioStock y Kairós, y por qué Dropea vale para esta semana pero no es la mejor a largo plazo.

`dropea.com` → *Quiero empezar a vender* → **Dropshipper**.

Pide NIF, teléfono y firma: eso solo lo puedes hacer tú.

Dentro, busca y filtra **stock 24 h**:

- `limpiador eléctrico`
- `cepillo giratorio`
- `spin scrubber`

Coge el que tenga: mango telescópico, **9 accesorios**, batería de **90 min**, carga **USB-C**, **25 W** y **marcado CE**.
Coste objetivo: **≤ 17 €**. Si el único que hay pasa de 20 €, no compres: cambia de modelo.

No pidas especificaciones que no estén en la ficha del proveedor. Las que llevaba la web (IPX7, 380 rpm, 2.000 mAh) se quitaron porque no estaban verificadas.

Antes de pagar nada, mándales las **5 preguntas** de `proveedores.md` (plazo real, IVA, comisión, rechazo y devolución) y guarda la respuesta por escrito.

**Y comprueba dos cosas antes de escribir una sola línea de anuncio:**

1. **Stock real del SKU**, no que el producto exista en el catálogo. (Klack tenía el cepillo perfecto: agotado.)
2. **Que el proveedor no lo venda al público más barato que tu precio.** Si su tienda lo tiene a 18,90 €, tu 39,99 € es una trampa para ti.

**Envíame el enlace del producto** (o 6 fotos + el coste). Con eso:
- ajusto precios y margen real,
- sustituyo las fotos,
- dejo el vídeo montado.

## 2. Fotos que necesito (6 + 1 vídeo)

Guárdalas en `media/` con estos nombres exactos:

| Archivo | Qué debe mostrar |
|---|---|
| `hero.jpg` | Producto en vertical, en el baño, mango extendido |
| `antes.jpg` | Junta o mampara **sucia**, sin retocar |
| `despues.jpg` | **La misma** junta, limpia, mismo ángulo y luz |
| `detalle-1.jpg` | Cabezales separados, vistos desde arriba |
| `detalle-2.jpg` | Mango telescópico a medio extender |
| `detalle-3.jpg` | Producto en la mano, para dar escala |
| `hero.mp4` | 9:16, 10-15 s: pasada sobre la mampara, suciedad → limpio |

Regla: **foto real o nada**. Las de catálogo del proveedor valen para empezar; las de banco de imágenes se notan y restan.

El vídeo se reproduce solo y sin sonido: tiene que entenderse en silencio.

## 3. Cobrar: Stripe Payment Link

1. Stripe → **Productos** → crea «Nítida — 1 unidad» a **39,99 €**.
2. Añade «Nítida — pack 2 unidades» a **69,99 €** y «Nítida — pack 3 unidades» a **94,99 €**.
3. En cada producto → **Crear enlace de pago**.
4. Pega los tres enlaces en `index.html`, en el botón:

```html
<a class="btn" id="buyBtn" href="#"
   data-1="https://buy.stripe.com/xxxx1ud"
   data-2="https://buy.stripe.com/xxxx2uds"
   data-3="https://buy.stripe.com/xxxx3uds">
```

El selector de la página cambia el enlace solo. Si un pack no tiene enlace, el botón se queda en el de 2: no lo dejes a medias.

**Contra reembolso:** se activa como método de pago en Stripe si tu cuenta lo permite, o se gestiona con el panel de Dropea (recibes el pedido por email y lo lanzas tú). El recargo de 2,50 € tiene que estar en el precio o en el checkout.

## 4. Publicar

Cualquiera de estas tres, en 5 minutos:

- **Netlify Drop** → arrastras la carpeta `nitida/` → tienes URL.
- **Render** → *Static Site* → build vacío, publish `nitida`.
- **GitHub Pages** → subes la carpeta.

Luego apunta el dominio (`nitida.es` o el que elijas) y listo.

## 5. Legal mínimo (no es opcional)

- Alta como autónomo o empresa e IVA.
- **Aviso legal** con nombre, NIF, dirección y email.
- **Privacidad** y **cookies**.
- **Envíos**: 24-72 h laborables en península.
- **Devoluciones**: 14 días de desistimiento + tus 30 días comerciales.
- **GPSR**: fabricante o importador UE y datos de contacto. Pídeselos a Dropea por escrito.
- El precio tachado debe ser tu precio más bajo de los últimos 30 días. Si no lo fue, quita el tachado.

## 6. Lo que NO se hace

- **No inventar reseñas.** La página no tiene opiniones y así se queda hasta que haya pedidos reales. Cuando los tengas, se añaden con nombre y fecha.
- **No inventar stock** («solo 3 unidades») si no es verdad.
- **No prometer plazos** que Dropea no confirme por escrito.
- **No decir** que cura ni que es un producto médico. Limpia. Nada más.

## 7. Números (para no vender a pérdida)

| Concepto | 1 ud | 2 uds | 3 uds |
|---|---|---|---|
| Precio | 39,99 € | 69,99 € | 94,99 € |
| Producto | −16,00 € | −32,00 € | −48,00 € |
| Envío | −4,00 € | −4,00 € | −4,00 € |
| Contra reembolso | −2,50 € | −2,50 € | −2,50 € |
| Pasarela | −0,60 € | −0,90 € | −1,20 € |
| **Margen** | **16,89 €** | **30,59 €** | **39,29 €** |
| **CPA máximo** | 14 € | 26 € | 32 € |

Por eso el pack de 2 está preseleccionado y el de 3 existe: con una sola unidad, el anuncio tiene que ser muy barato para salir vivo. Lo que separa a Blissy (6,69 $ por visita) de Loop (1,05 $) es exactamente esto.
