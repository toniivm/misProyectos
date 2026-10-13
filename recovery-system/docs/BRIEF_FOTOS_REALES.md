# Brief de Fotos Reales — Noctip

> Fecha: 13 Oct 2026
> Problema: la web muestra fotos de AliExpress con logos ajenos ("Enjoying", "STAWIN"), textos en inglés y modelos de 25 años. Eso espanta compras.
> Solución: fotos reales de las muestras que ya tienes, hechas con el móvil en 1 hora. Coste: €0.

---

## 1. Qué imágenes hay hoy y cuáles están mal

| Producto | Imagen actual | Problema | Qué hacer |
|---|---|---|---|
| Halo | `mouthpiece-1.jpg` | Caja "MOUTHPIECE ANTI-SNORE", textos "Stop Snoring / Headache / Teeth Grinding", modelo joven mirando mal | Reemplazar por foto real de TU muestra |
| Halo | `mouthpiece-2 a 6.jpg` | Mismo estilo marketplace | Reemplazar |
| Back | `posture-corrector-1.webp` y 2-6 | Logo ajeno **STAWIN**, hombre musculoso sin camiseta, mujer en top | Reemplazar |
| Rest | `sleep-headband-1.webp` | Logo ajeno **Enjoying**, texto "Susceptible de utilización en gyms, sports, running, yoga" | Reemplazar |
| Rest | `sleep-headband-3,4,5,6.webp` | Producto con logo "Enjoying" + fondo de flores de IA | Reemplazar |
| Cervical | `neck-massager.jpg` | Aceptable: producto solo, sin logos ni texto | Mantener de momento |
| Rest | `productos-reales/white-noise-pro.webp` | Buena foto (luz cálida) PERO se lee "Enjoying" | No usar en la web; solo referencia |
| Varios | `*.aliexpress.bak` | Archivos basura (12+ archivos) | Borrar (pendiente de confirmar) |

**Regla de oro:** ninguna foto de la web puede mostrar un logo que no sea Noctip, ni texto en otro idioma, ni una persona que no sea del público (45-70 años).

---

## 2. Preparación (15 minutos, €0)

- **Fondo:** una sábana oscura lisa (mejor azul muy oscuro o negra) sobre una mesa. Sin arrugas.
- **Luz:** de día, junto a la ventana, SIN sol directo. Si es de noche, una lámpara cálida a un lado.
- **Prohibido:** flash directo, filtros de la cámara, fondos con flores o colores pastel.
- **Poses:** tú mismo/a o alguien de la familia con las manos limpias. No hacen falta caras.
- **Formato:** vertical (9:16) para el móvil; si no, cuadrado. **Nunca** apaisado.
- **Truco:** limpia el producto con un paño antes de cada foto. El polvo se ve muchísimo.

## 3. Mini-sesión por producto (4 fotos cada uno)

Para cada producto, dispara en este orden:

1. **Hero:** producto entero, de frente, centrado, fondo oscuro. Es la que se ve primero.
2. **Detalle (macro):** acércate a la parte que importa (silicona del Halo, malla del Back, altavoces del Rest, electrodos del Cervical). Que se llene el encuadre.
3. **En uso (sin cara si quieres):** manos usándolo. En cama si es de dormir, en silla si es postural.
4. **Qué incluye:** todo lo que va en la caja (producto + estuche + cable + manual), colocado como si abrieras la caja. **No uses la caja genérica de AliExpress con logos raros:** si la caja tiene marca ajena, sáltate esta foto por ahora.

## 4. Nombres de archivo (para que la web las coja solas)

Guarda las fotos en la carpeta de cada producto con estos nombres exactos y la web las usará automáticamente:

| Producto | Carpeta | Nombres |
|---|---|---|
| Halo | `public/images/halo/gallery/` | `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` |
| Back | `public/images/back/gallery/` | `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` |
| Rest | `public/images/rest/gallery/` | `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` |
| Cervical | `public/images/cervical/gallery/` | `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` |

Si quieres además lifestyle (personas), guarda en `.../lifestyle/1.jpg` etc.
El sistema (`lib/product-images.ts`) ya detecta estas carpetas: no hay que tocar código para que aparezcan.

## 5. Después de las fotos

- Yo actualizo `lib/catalog.ts` (campo `images`) para que cada producto use sus fotos nuevas.
- Borro los `.aliexpress.bak` y las fotos viejas que nadie use (con tu OK, porque borrar requiere confirmación).
- Repaso final: ninguna página debe quedar con imágenes de proveedor.

## 6. Checklist rápido

- [ ] Ninguna foto con marca ajena ("Enjoying", "STAWIN", etc.)
- [ ] Ningún texto en inglés a la vista
- [ ] Ninguna modelo de 25 años
- [ ] Fondo oscuro liso y producto limpio
- [ ] Vertical o cuadrado, sin flash
- [ ] 4 fotos por producto con los nombres correctos
