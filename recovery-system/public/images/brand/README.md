# Imágenes de marca Noctip

Renders de producto generados por código (SVG + sharp). Sustituyen a las fotos de proveedor
con logos ajenos ("Enjoying", "STAWIN"), texto en inglés y modelos que no son el público.

## Contenido

| Archivo | Uso |
|---|---|
| `{slug}-hero.jpg` | Ficha de producto (primera imagen de la galería) |
| `{slug}-detail.jpg` | Detalle |
| `{slug}-context.jpg` | En contexto (mesita, luz cálida) |
| `{slug}-{hero,detail,context}-1x1.jpg` | Feed social / anuncios 1200x1200 |
| `{slug}-{hero,detail,context}-4x5.jpg` | Feed social 1080x1350 |
| `{slug}-{hero,detail,context}-9x16.jpg` | Stories / Reels / TikTok 1080x1920 |

Slugs: `halo`, `wave`, `sleep-headband`, `neck-massager`.

## Regenerar

```bash
node scripts/generate-brand-images.js
```

No necesita claves de API. Requiere `sharp` (ya está en devDependencies).

## Reemplazar por fotos reales

Estos renders son una base limpia y consistente, **no fotografía real**. El plan
para fotos de verdad (gratis, con el móvil) está en `docs/BRIEF_FOTOS_REALES.md`.

Dos opciones:

1. **Guardar las fotos con los mismos nombres** en esta carpeta (`halo-hero.jpg`, etc.)
   y la web las usará sin tocar código.
2. **Carpetas por producto** (`public/images/halo/gallery/1.jpg`...) que el sistema
   auto-detecta vía `lib/product-images.ts`.

Después de cambiar imágenes, actualizar `images: [...]` en `lib/catalog.ts` si hace falta.

## Reglas

- Cero logos de terceros, cero texto incrustado, cero modelos de banco de imágenes.
- Fondo claro `#f5f0eb` (coherente con la "plataforma" de la galería web).
- Acento cyan `#10BFD8` solo en detalles interactivos (botones del módulo).
