# PROMPTS PARA VIDEOS DE PRODUCTO NOCTIP
## Herramientas: Runway ML + CapCut

---

## ESTRUCTURA UNIVERSAL (15-30 segundos)

| Tiempo | Contenido | Tipo de toma |
|--------|-----------|--------------|
| 0-3s | Problema (dolor/roncando/mala postura) | Lifestyle oscuro |
| 3-8s | Producto aparece | Hero shot animado |
| 8-15s | Producto en uso | Lifestyle premium |
| 15-20s | Resultado (persona descansando) | Lifestyle cálido |
| 20-25s | CTA + Precio + Garantía | Texto overlay |

---

## NOCTIP HALO (Anti-ronquidos)

### Runway ML Prompts

**Escena 1 - Problema (0-3s):**
```
A person tossing and turning in bed at night, dark bedroom, frustrated expression, partner covering ears, cinematic lighting, 4K, slow motion
```

**Escena 2 - Producto (3-8s):**
```
A transparent blue anti-snoring mouthpiece floating in dark space, dramatic blue accent lighting, slow rotation, premium product reveal, 4K
```

**Escena 3 - Uso (8-15s):**
```
A person sleeping peacefully with mouthpiece, soft morning light, partner sleeping beside them, peaceful expression, premium bedroom, 4K
```

**Escena 4 - Resultado (15-20s):**
```
A couple waking up refreshed, smiling at each other, soft golden hour light through window, modern bedroom, wellness lifestyle, 4K
```

### CapCut Text Overlays:
- 0-3s: "¿Roncas todas las noches?"
- 3-8s: "Noctip Halo"
- 8-15s: "Elimina ronquidos desde la primera noche"
- 15-20s: "Tu pareja también dormirá mejor"
- 20-25s: "€17 | Garantía 30 noches | Envío gratis"

---

## NOCTIP WAVE (Corrector Postural)

### Runway ML Prompts

**Escena 1 - Problema (0-3s):**
```
A person hunched over a desk working on laptop, rubbing lower back in pain, dark office lighting, cinematic, 4K
```

**Escena 2 - Producto (3-8s):**
```
A black Y-shaped posture corrector brace floating in dark space, dramatic lighting, slow rotation, premium product reveal, 4K
```

**Escena 3 - Uso (8-15s):**
```
A person sitting with perfect posture at desk, wearing posture corrector under white shirt, natural light, modern home office, 4K
```

**Escena 4 - Resultado (15-20s):**
```
A person stretching their back comfortably, smiling, standing in sunlight, modern interior, wellness lifestyle, 4K
```

### CapCut Text Overlays:
- 0-3s: "Tu postura está empeorando"
- 3-8s: "Noctip Wave"
- 8-15s: "Corrige tu postura en 2 semanas"
- 15-20s: "Adiós al dolor de espalda"
- 20-25s: "€20 | Garantía 30 noches | Envío gratis"

---

## NOCTIP REST (Banda de Sueño)

### Runway ML Prompts

**Escena 1 - Problema (0-3s):**
```
A person lying in bed staring at ceiling unable to sleep, dark room, frustrated expression, tossing pillow, cinematic, 4K
```

**Escena 2 - Producto (3-8s):**
```
A sleek black sleep headband floating in dark space, dramatic lighting, slow rotation, premium product reveal, 4K
```

**Escena 3 - Uso (8-15s):**
```
A person wearing sleep headband lying in bed, eyes closed, peaceful expression, soft ambient lighting, modern bedroom, 4K
```

**Escena 4 - Resultado (15-20s):**
```
A person waking up refreshed, stretching happily, morning sunlight, modern bedroom, wellness lifestyle, 4K
```

### CapCut Text Overlays:
- 0-3s: "No puedes dormir"
- 3-8s: "Noctip Rest"
- 8-15s: "Audio para dormir sin auriculares"
- 15-20s: "45 gramos que no sientes"
- 20-25s: "€12 | Garantía 30 noches | Envío gratis"

---

## NOCTIP RELIEF (Masajeador Cervical)

### Runway ML Prompts

**Escena 1 - Problema (0-3s):**
```
A person holding their neck in pain, trying to turn head, grimacing, office setting, cinematic lighting, 4K
```

**Escena 2 - Producto (3-8s):**
```
A white U-shaped cervical massager floating in dark space, dramatic lighting with soft glow on electrode pads, premium product reveal, 4K
```

**Escena 3 - Uso (8-15s):**
```
A person using cervical massager while working at laptop, relaxed expression, modern home office, natural light, 4K
```

**Escena 4 - Resultado (15-20s):**
```
A person turning head freely, smiling, stretching neck comfortably, modern interior, wellness lifestyle, 4K
```

### CapCut Text Overlays:
- 0-3s: "No puedes girar la cabeza"
- 3-8s: "Noctip Relief"
- 8-15s: "De 'no puedo' a 'todo bien' en 15 minutos"
- 15-20s: "Tres modos de masaje + calor"
- 20-25s: "€15 | Garantía 30 noches | Envío gratis"

---

## NOCTIP CALM (Masajeador por Pulsos)

### Runway ML Prompts

**Escena 1 - Problema (0-3s):**
```
A person rubbing their neck after long day, tired expression, evening lighting, modern living room, cinematic, 4K
```

**Escena 2 - Producto (3-8s):**
```
A compact white cervical pulse massager floating in dark space, dramatic lighting, premium product reveal, 4K
```

**Escena 3 - Uso (8-15s):**
```
A person wearing pulse massager while reading on couch, relaxed expression, warm ambient lighting, cozy modern interior, 4K
```

**Escena 4 - Resultado (15-20s):**
```
A person looking relaxed and refreshed, soft smile, warm lighting, modern living room, wellness lifestyle, 4K
```

### CapCut Text Overlays:
- 0-3s: "Tensión cervical constante"
- 3-8s: "Noctip Calm"
- 8-15s: "Electrodos flotantes que se adaptan a ti"
- 15-20s: "Alivio en cualquier lugar"
- 20-25s: "€11 | Garantía 30 noches | Envío gratis"

---

## FLUJO DE TRABAJO

### Paso 1: Generar imágenes hero con DALL-E 3
```bash
cd recovery-system
node scripts/generate-images.js
```

### Paso 2: Animar con Runway ML
1. Subir imagen hero de cada producto
2. Seleccionar "Gen-3 Alpha"
3. Pegar el prompt de Runway de la escena
4. Generar clip de 5-10 segundos
5. Repetir para cada escena

### Paso 3: Editar en CapCut
1. Importar clips generados
2. Añadir transiciones suaves (dissolve/fade)
3. Añadir text overlays con los textos indicados
4. Añadir música premium (buscar "cinematic wellness" en la librería)
5. Añadir sonido ambiente sutil
6. Exportar en 9:16 (Reels/TikTok) y 16:9 (web)

### Paso 4: Publicar
- Instagram Reels: 9:16, 15-30 segundos
- TikTok: 9:16, 15-30 segundos
- YouTube Shorts: 9:16, 15-30 segundos
- Web (hero video): 16:9, 15-30 segundos

---

## MÚSICA RECOMENDADA

Buscar en CapCut Audio:
- "Cinematic Ambient"
- "Soft Inspiration"
- "Wellness Corporate"
- "Minimal Tech"

BPM ideal: 80-100 (tranquilo pero con movimiento)

---

*Prompts generados para Noctip — Junio 2026*
