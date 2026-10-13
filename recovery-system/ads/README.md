# Carpeta /ads — piezas generadas

Generadas por `scripts/generate-ads.js`. **No editar a mano**: cambia los textos en
`PRODUCTS` dentro del script y vuelve a ejecutar.

| Archivo | Uso |
|---|---|
| `card-hook-{producto}-9x16.png` | Gancho pantalla completa (primera pantalla del vídeo) |
| `card-cta-{producto}-9x16.png` | Cierre: 30 noches de prueba + noctip.com |
| `card-cta-{producto}-1x1.png` | Cuadrado para feed |
| `overlay-hook-{producto}-9x16.png` | Overlay con fondo para poner en CapCut sobre vídeo real |
| `{producto}-anuncio-9x16.mp4` | Vídeo 17s (gancho → producto → detalle → contexto → CTA). **La música se añade en CapCut** |

Productos: `antifaz`, `halo`, `wave`, `sleep-headband`, `neck-massager`.

Los MP4 están en `.gitignore` (pesan y se regeneran con un comando). Las tarjetas PNG sí se versionan.

Playbook completo: `docs/FABRICA_ANUNCIOS_NOCTIP.md`.
