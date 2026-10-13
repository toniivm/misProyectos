# Fotos con IA — El Mejor Modelo y Cómo Configurarlo (14 Oct 2026)

> Pregunta: ¿cuál es la mejor IA para editar fotos como un profesional?
> Respuesta corta: **Nano Banana (el modelo de imagen de Google Gemini)**. Gratis en Google AI Studio y en la app Gemini. También está dentro de Higgsfield (de pago) como "NANO BANANA 2.1".

---

## 1. Qué puede hacer cada herramienta

| Herramienta | Coste | Qué hace | Cuándo usarla |
|---|---|---|---|
| **Nano Banana (Gemini)** | **Gratis** | Editar fotos reales: quitar logos y textos, cambiar fondos, luz de estudio, crear lifestyle con personas | **Para todo.** Es la mejor calidad de edición hoy |
| **Photoroom** (app móvil) | Gratis con marca de agua / pago barato | Quitar fondo, sombras, plantillas pro | Cuando quieras hacerlo desde el móvil en 1 minuto |
| **Higgsfield** | Pago (créditos) | Lo mismo que Nano Banana + vídeo IA + recrear anuncios | Cuando ya haya ventas y queráis multiplicar |
| **Bing Image Creator** | Gratis | Genera imágenes NUEVAS (no edita las tuyas) | Para fondos y escenas desde cero |
| **CapCut** | Gratis | Retoque de vídeo, no de fotos | Vídeos |

**Nota**: ningún modelo de chat (ni GPT-6 Luna ni Kimi K3 ni ninguno de OpenCode) edita fotos. Son cerebros, no cámaras. La herramienta es Nano Banana/Photoroom/Higgsfield.

## 2. Cómo se usa Nano Banana (2 minutos)

1. Ve a **aistudio.google.com** (o la app Gemini en el móvil), con tu cuenta Google.
2. Sube la foto del producto (la de AliExpress o la tuya).
3. Pega el prompt (abajo).
4. Descarga el resultado y mándamelo → yo la pongo en la web.

## 3. Prompts listos para copiar (en inglés, funciona mejor)

**A. Quitar logo ajeno de la banda Rest** (`rest/gallery/1.jpg`):
```
Edit this product photo: remove the brand name "Enjoying" and the small bluetooth icon printed on the control panel of the headband. Keep the three round buttons intact. Keep the product, fabric texture, stitching and lighting exactly the same. Do not change the shape, color or materials. Output a professional e-commerce photo.
```

**B. Limpiar el fondo del Halo** (`halo-photo-1.jpg`):
```
Remove the person and blue pillow visible in the background. Replace the background with a clean warm cream studio background (#f5f0eb), with a soft natural shadow under the product. Keep the mouthpiece and its case exactly identical.
```

**C. Pasar cualquier foto de proveedor a estudio** (genérico):
```
Professional e-commerce retouch: clean the background to a warm cream color (#f5f0eb), remove all text, badges and logos from the image except what is printed on the physical product, keep the product exactly identical (shape, color, materials), soft studio lighting, soft shadow under the product.
```

**D. Crear foto lifestyle con persona** (público 50-70):
```
Photorealistic lifestyle photo, vertical 9:16: a Spanish man in his late 50s with grey hair, sleeping calmly on his side in a real modest bedroom at night, warm bedside lamp light, white sheets. No text, no logos. Natural skin, real home, documentary style, not a studio.
```

**E. Quitar la etiqueta blanca del Back** (`wave-photo-1.jpg`):
```
Remove the small white tag visible on the right strap. Keep everything else identical. Plain white background.
```

## 4. La tubería automática (opción pro)

Si creas una **clave de API gratis** en Google AI Studio (`aistudio.google.com` → "Get API key"):

1. Pégala en `.env.local` como `GEMINI_API_KEY=...` (ese archivo no se sube a GitHub, está en .gitignore).
2. Yo construyo `scripts/edit-photos-ai.js`: coge TODAS las fotos del proveedor del repo, les aplica los prompts de arriba en lote y guarda los resultados listos para la web.
3. Resultado: 20 fotos profesionales en un comando, sin tocar nada a mano.

## 5. Reglas (no negociables)

- El producto de la foto tiene que ser **el producto real que se envía** (forma, color, materiales). La IA no puede "mejorarlo" hasta que parezca otro.
- Nada de texto inventado ni sellos ("certificado", "-70%") dentro de la imagen.
- Si la IA genera una persona, no puede decirse que es cliente. Es una escena, no un testimonio.
