/**
 * Composita el antifaz (render vectorial) sobre la foto de cama real (g3) para crear
 * una foto de producto en contexto creíble: producto + sombra multiplicada + encaje.
 *
 * Uso: node scripts/composite-mask-bed.js
 * Salida: public/images/brand/antifaz-bed-1.jpg  (antifaz sobre las sábanas)
 *         public/images/brand/antifaz-bed-2.jpg  (antifaz sobre la almohada)
 *         public/images/brand/antifaz-bedroom.jpg (cama vacía, ambiente)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'images', 'brand');
const SRC = path.join(process.env.LOCALAPPDATA, 'Temp', 'opencode', 'antifaz-ai', 'g3.jpg');

// ── dibujo del antifaz (mismo estilo que los renders de marca) ──────────

function drawAntifaz() {
  return `
  <g>
    <defs>
      <linearGradient id="maskBody" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="#3d4a5e"/>
        <stop offset="55%" stop-color="#232c3a"/>
        <stop offset="100%" stop-color="#141a22"/>
      </linearGradient>
      <radialGradient id="cup" cx="50%" cy="42%" r="62%">
        <stop offset="0%" stop-color="#10151c"/>
        <stop offset="70%" stop-color="#2c3646"/>
        <stop offset="100%" stop-color="#4a5568"/>
      </radialGradient>
      <linearGradient id="strapG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2b3442"/>
        <stop offset="100%" stop-color="#171e26"/>
      </linearGradient>
    </defs>
    <path d="M -540 -60 C -760 -160 -900 -120 -940 40 C -960 160 -880 260 -760 280" stroke="url(#strapG)" stroke-width="54" fill="none" stroke-linecap="round"/>
    <path d="M 540 -60 C 760 -160 900 -120 940 40 C 960 160 880 260 760 280" stroke="url(#strapG)" stroke-width="54" fill="none" stroke-linecap="round"/>
    <path d="M -580 -30 C -580 -250 -300 -340 0 -340 C 300 -340 580 -250 580 -30 C 580 150 430 280 250 300 C 190 306 150 296 120 270 L 60 210 C 30 180 -30 180 -60 210 L -120 270 C -150 296 -190 306 -250 300 C -430 280 -580 150 -580 -30 Z"
      fill="url(#maskBody)" stroke="#55617a" stroke-width="5"/>
    <ellipse cx="-260" cy="-70" rx="210" ry="160" fill="url(#cup)"/>
    <ellipse cx="260" cy="-70" rx="210" ry="160" fill="url(#cup)"/>
    <ellipse cx="-260" cy="-70" rx="210" ry="160" fill="none" stroke="#5c6b84" stroke-width="6" opacity="0.7"/>
    <ellipse cx="260" cy="-70" rx="210" ry="160" fill="none" stroke="#5c6b84" stroke-width="6" opacity="0.7"/>
    <path d="M -350 -160 C -300 -190 -200 -196 -150 -170" stroke="#8a97ad" stroke-width="8" fill="none" opacity="0.5" stroke-linecap="round"/>
    <path d="M 170 -170 C 200 -196 300 -190 350 -160" stroke="#8a97ad" stroke-width="8" fill="none" opacity="0.5" stroke-linecap="round"/>
    <path d="M -540 -40 C -520 -220 -280 -300 0 -300 C 280 -300 520 -220 540 -40" stroke="#5c6b84" stroke-width="4" fill="none" stroke-dasharray="10 9" opacity="0.8"/>
    <path d="M -420 -240 C -240 -320 -60 -330 100 -310" stroke="#7d8aa0" stroke-width="10" fill="none" opacity="0.4" stroke-linecap="round"/>
  </g>`;
}

function maskSvg(w) {
  const h = Math.round((w / 1960) * 740);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="-980 -390 1960 740">${drawAntifaz()}</svg>`;
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.log('⚠ Falta la foto base:', SRC);
    process.exit(1);
  }

  // 1) Preparar la foto base: quitar marca de agua (abajo) y normalizar a 1080
  const meta = await sharp(SRC).metadata();
  const baseBuf = await sharp(SRC)
    .extract({ left: 0, top: 0, width: meta.width, height: meta.height - 46 })
    .resize({ width: 1080 })
    .jpeg({ quality: 90 })
    .toBuffer();
  const base = sharp(baseBuf);
  const bMeta = await base.metadata();
  const W = bMeta.width;
  const H = bMeta.height;
  console.log('base:', W + 'x' + H);

  fs.writeFileSync(path.join(OUT, 'antifaz-bedroom.jpg'), baseBuf);

  // 2) Render transparente del antifaz
  const maskPng = await sharp(Buffer.from(maskSvg(1400))).png().toBuffer();

  // 3) Silueta negra para la sombra (multiply)
  const silMeta = await sharp(maskPng).metadata();
  const silhouette = await sharp({
    create: { width: silMeta.width, height: silMeta.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
  })
    .composite([{ input: maskPng, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 4) Dos variantes: sobre las sábanas y sobre la almohada
  const variants = [
    {
      name: 'antifaz-bed-1.jpg',
      maskW: Math.round(W * 0.40),
      rotate: -12,
      left: Math.round(W * 0.08),
      top: Math.round(H * 0.63),
      shadowOffset: 14,
      shadowBlur: 9,
    },
    {
      name: 'antifaz-bed-2.jpg',
      maskW: Math.round(W * 0.30),
      rotate: 7,
      left: Math.round(W * 0.55),
      top: Math.round(H * 0.40),
      shadowOffset: 10,
      shadowBlur: 8,
    },
  ];

  for (const v of variants) {
    const maskScaled = await sharp(maskPng).resize({ width: v.maskW }).rotate(v.rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const shadowScaled = await sharp(silhouette).resize({ width: v.maskW }).rotate(v.rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).blur(v.shadowBlur).png().toBuffer();

    const out = await sharp(baseBuf)
      .composite([
        { input: shadowScaled, left: v.left, top: v.top + v.shadowOffset, blend: 'multiply' },
        { input: maskScaled, left: v.left, top: v.top, blend: 'over' },
      ])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(path.join(OUT, v.name), out);
    console.log('✔', v.name, `(${Math.round(out.length / 1024)} KB)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
