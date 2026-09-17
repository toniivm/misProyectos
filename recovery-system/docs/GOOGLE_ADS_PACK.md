# Noctip — Pack Google Ads listo para importar

> Héroe: **Noctip Rest** (banda). Mantener 20€/día test aunque no haya presupuesto: este pack es para cuando tengas 10€/día, no inventa volumen.

## 1. Estructura cuenta (nueva <30 conv)

- **C1 Search Marca 10%** `noctip` [Exacta, Frase] — Max Conversions
- **C2 Search Problema 30%** 4 ad groups: `Ronquido / Sueño / Espalda / Cuello` — Max Clicks 5d → Max Conversions
- **C3 Shopping Estándar 60%** 1 campaña, 2 grupos (Rest, Halo) — feed `https://noctip.com/feeds/noctip_products.xml`

Cuando >50 conv/mes: duplicar C3 en **PMax Captación** con asset groups por dolor.

## 2. Keywords (ES)

**Marca:** `noctip`, `noctip rest`, `noctip halo`, `noctip back`, `noctip cervical`, `noctip opiniones`

**Problema long-tail:**
`como dejar de roncar`, `férula para roncar`, `férula anti ronquidos`, `banda para dormir con música`, `auriculares para dormir de lado`, `no puedo dormir sin ruido`, `dolor cuello al dormir`, `corrector postura funciona`, `como corregir postura jorobada`, `masajeador cervical`

**Producto:**
`banda de sueño bluetooth`, `auriculares para dormir`, `antifaz con bluetooth`, `férula avance mandibular`, `corrector postural`, `masajeador cuello portátil`

**Negativas lista compartida:**
`gratis`, `pdf`, `casero`, `diy`, `segunda mano`, `wallapop`, `milanuncios`, `empleo`, `curso`, `descargar`, `manual`, `aliexpress`, `temu`, `amazon`, `niños`, `bebé`, `veterinario`

## 3. RSAs (15 títulos 30c / 4 desc 90c)

### Grupo Rest
**Títulos:** Banda Sueño Bluetooth 5.0 | 45g No La Sientes | Lavable A Máquina | 10h Batería Toda Noche | Duérmete En Minutos | Sin Cables Ni Apps | Ideal Dormir De Lado | Tela Transpirable Suave | Envío 5-10 Días | 30 Noches De Prueba | Pago Seguro Stripe | Talla Única Elástica | Altavoces Ultrafinos | Desde €19,99 | Noctip® Oficial
**Desc:** Te la pones y funciona. 45g que desaparecen y 10h toda la noche. / Bluetooth 5.0 sin presión. Retira altavoces y a la lavadora. / Envío 5-10 días con seguimiento. 30 noches o reembolso. / Tienda oficial noctip.com. Stripe cifrado.

### Grupo Halo
**Títulos:** Férula Anti-Ronquidos | Deja De Roncar Noche 1 | Silicona Grado Médico | Ajuste 10mm Personalizado | Tu Pareja Dormirá Mejor | Estuche Viaje Incluido | Reutilizable y Lavable | Envío 5-10 Días | 30 Noches De Prueba | Sin Cirugía Ni Pastillas | Doble Capa Ajustable | Hipoalergénica Segura | Desde €13,99 | Noctip® Oficial | Probado En Casa
**Desc:** Avanza la mandíbula y abre la vía aérea. Noches silenciosas desde el inicio. / 10mm micro-ajustes, hervir-morder, silicona médica. / Envío 5-10 días con seguimiento. 30 noches o reembolso. / Tienda oficial noctip.com. Pago Stripe.

## 4. PMax Rest (cuando toque)
Título largo 90c: `Banda de Sueño Noctip Rest con Altavoces Bluetooth — 45g, lavable y 10h batería`
Business: `Noctip`
Imágenes: `sleep-headband-1.webp` a `6.webp` 1:1 sin badge + video `noctip-rest-val.mp4` si es propio
Audience: `in-market sleep aids + custom intent “como dejar de roncar, ruido blanco dormir”`

## 5. CSV para Google Ads Editor
Ver `docs/GOOGLE_ADS_EDITOR.csv` (Campaign,AdGroup,Keyword,Match Type,Headline 1..15, Description 1..4, Final URL)
Feed: `public/feeds/noctip_products.xml` → subir a GMC → URL `https://noctip.com/feeds/noctip_products.xml`
