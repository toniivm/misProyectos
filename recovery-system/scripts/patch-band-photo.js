/**
 * Retoque de precisión v2: deja el panel de control de la banda limpio.
 * - Cubre el bloque superior (texto "Enjoying" + icono + línea azul) con un degradado
 *   calculado del propio color del panel (muestreado de dos zonas limpias).
 * - Tapa la etiqueta blanca de la correa clonando la tela.
 *
 * Uso: node scripts/patch-band-photo.js
 * Salida: public/images/brand/rest-photo-1.jpg
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INPUT = path.join(ROOT, 'public', 'images', 'rest', 'gallery', '1.jpg');
const OUTPUT = path.join(ROOT, 'public', 'images', 'brand', 'rest-photo-1.jpg');

async function avgColor(meta, leftF, topF, widthF, heightF) {
  // stats() de sharp ignora extract; calculamos la media píxel a píxel con raw
  const { data, info } = await sharp(INPUT)
    .extract({
      left: Math.round(leftF * meta.width),
      top: Math.round(topF * meta.height),
      width: Math.round(widthF * meta.width),
      height: Math.round(heightF * meta.height),
    })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  let r = 0, g = 0, b = 0;
  const n = data.length / ch;
  for (let i = 0; i < data.length; i += ch) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  return `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})`;
}

async function main() {
  const meta = await sharp(INPUT).metadata();
  const W = meta.width;
  const H = meta.height;

  // Color del panel: zona limpia entre la línea azul y los botones (medida sobre 1254px)
  const panelColor = await avgColor(meta, 0.22, 0.352, 0.11, 0.032);
  console.log('panel:', panelColor);

  // Parche 1: bloque superior del panel (icono + texto + línea), deja solo los botones
  const destLeft = Math.round(0.203 * W);
  const destTop = Math.round(0.296 * H);
  const destW = Math.round(0.143 * W);
  const destH = Math.round(0.092 * H);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${destW}" height="${destH}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${panelColor}"/><stop offset="100%" stop-color="${panelColor}"/>
    </linearGradient></defs>
    <rect width="${destW}" height="${destH}" rx="14" fill="url(#g)"/>
  </svg>`;
  const panelPatch = await sharp(Buffer.from(svg)).blur(0.8).png().toBuffer();

  // Parche 2: etiqueta blanca de la correa (clon de tela)
  const tagSrc = await sharp(INPUT)
    .extract({
      left: Math.round(0.762 * W),
      top: Math.round(0.55 * H),
      width: Math.round(0.03 * W),
      height: Math.round(0.04 * H),
    })
    .resize({ width: Math.round(0.034 * W), height: Math.round(0.044 * H), fit: 'fill' })
    .blur(1.4)
    .toBuffer();

  const out = await sharp(INPUT)
    .composite([
      { input: panelPatch, left: destLeft, top: destTop },
      { input: tagSrc, left: Math.round(0.760 * W), top: Math.round(0.608 * H) },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(OUTPUT, out);
  console.log('✔', path.relative(ROOT, OUTPUT), `(${Math.round(out.length / 1024)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
