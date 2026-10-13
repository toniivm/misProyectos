/**
 * Generador de imágenes de producto Noctip — rendes vectoriales premium.
 *
 * Genera fotos de producto limpias (sin logos ajenos, sin texto en inglés, sin modelos)
 * con la estética de la marca: fondo crema #f5f0eb, sombras suaves, acento cyan #10BFD8.
 *
 * Uso:  node scripts/generate-brand-images.js
 * Salida:
 *   public/images/brand/{slug}-hero.jpg     1600x2000 (web, ficha producto)
 *   public/images/brand/{slug}-detail.jpg   1600x2000 (web, detalle)
 *   public/images/brand/{slug}-context.jpg  1600x2000 (web, en contexto)
 *   public/images/brand/{slug}-1x1.jpg      1200x1200 (social feed)
 *   public/images/brand/{slug}-4x5.jpg      1080x1350 (social feed)
 *   public/images/brand/{slug}-9x16.jpg     1080x1920 (stories/reels)
 *
 * Requisitos: sharp (ya está en devDependencies)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'images', 'brand');
fs.mkdirSync(OUT, { recursive: true });

const CREAM = '#f5f0eb';
const CREAM_DARK = '#e9e2d9';
const INK = '#141a22';
const CYAN = '#10BFD8';

// ── Utilidades de composición ──────────────────────────────────────────

function svgWrap(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;
}

function background(w, h, opts = {}) {
  const { warm = true, vignette = true } = opts;
  return `
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="${warm ? '#faf6f1' : '#161c24'}"/>
      <stop offset="100%" stop-color="${warm ? CREAM : '#0b1016'}"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${warm ? '#efe8df' : '#131922'}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${warm ? '#e4dbd0' : '#0e141b'}" stop-opacity="0.85"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.035"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${vignette ? `<rect width="${w}" height="${h}" fill="none" stroke="${warm ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}" stroke-width="${Math.round(w * 0.08)}"/>` : ''}
  <rect x="0" y="${Math.round(h * 0.72)}" width="${w}" height="${Math.round(h * 0.28)}" fill="url(#floor)"/>`;
}

function shadow(w, h, cx, cy, rx, ry, opacity = 0.16) {
  return `
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#1a140f" opacity="${opacity}">
    <animate attributeName="opacity" values="${opacity};${opacity + 0.03};${opacity}" dur="7s" repeatCount="indefinite"/>
  </ellipse>
  <ellipse cx="${cx}" cy="${cy + ry * 0.15}" rx="${rx * 0.7}" ry="${ry * 0.6}" fill="#1a140f" opacity="${opacity * 0.6}"/>`;
}

function spotlight(w, h, cx, cy, r) {
  return `<radialGradient id="spot" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </radialGradient>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#spot)"/>`;
}

// ── Dibujos de producto (vectoriales, limpios, sin marcas) ─────────────

// HALO — férula anti-ronquidos: doble bandeja en arco, ligeramente abierta
function drawHalo(scale = 1) {
  const tray = (yOff, fillId, opacity) => `
    <g transform="translate(0 ${yOff})">
      <path d="M -560 -50 C -560 -240 -300 -330 0 -330 C 300 -330 560 -240 560 -50 L 556 20 C 556 96 300 156 0 156 C -300 156 -556 96 -556 20 Z"
        fill="url(#${fillId})" stroke="#dcf4fb" stroke-width="6" opacity="${opacity}"/>
      <path d="M -424 -58 C -424 -196 -230 -262 0 -262 C 230 -262 424 -196 424 -58 L 420 4 C 420 62 230 104 0 104 C -230 104 -420 62 -420 4 Z"
        fill="#5fb6d4" opacity="0.42"/>
      <path d="M -424 -58 C -424 -196 -230 -262 0 -262 C 230 -262 424 -196 424 -58" stroke="#ffffff" stroke-width="9" fill="none" opacity="0.5" stroke-linecap="round"/>
    </g>`;
  return `
  <g id="halo">
    <defs>
      <linearGradient id="haloUpper" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="#eafaff" stop-opacity="0.97"/>
        <stop offset="50%" stop-color="#b9e8f5" stop-opacity="0.94"/>
        <stop offset="100%" stop-color="#74c5de" stop-opacity="0.92"/>
      </linearGradient>
      <linearGradient id="haloLower" x1="0" y1="1" x2="0.6" y2="0">
        <stop offset="0%" stop-color="#6cbcd8" stop-opacity="0.94"/>
        <stop offset="100%" stop-color="#8fd4e9" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <!-- bandeja inferior (ligeramente desplazada) -->
    ${tray(112, 'haloLower', 0.97)}
    <!-- bandeja superior -->
    ${tray(0, 'haloUpper', 1)}
    <!-- bisagra central entre capas -->
    <rect x="-70" y="52" width="140" height="26" rx="13" fill="#ffffff" opacity="0.6"/>
    <circle cx="0" cy="65" r="9" fill="#eaf9ff" stroke="#8fcfe3" stroke-width="3"/>
    <!-- tornillos de micro-ajuste -->
    <circle cx="-330" cy="-10" r="13" fill="#eaf9ff" stroke="#8fcfe3" stroke-width="4"/>
    <circle cx="330" cy="-10" r="13" fill="#eaf9ff" stroke="#8fcfe3" stroke-width="4"/>
    <!-- brillo principal -->
    <path d="M -480 -110 C -420 -210 -220 -280 20 -282" stroke="#ffffff" stroke-width="13" fill="none" opacity="0.55" stroke-linecap="round"/>
  </g>`;
}

// BACK — corrector postural en Y visto plano (como en las fotos de producto)
function drawBack(scale = 1) {
  return `
  <g id="back">
    <defs>
      <linearGradient id="backPad" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="#3a465c"/>
        <stop offset="100%" stop-color="#1a2230"/>
      </linearGradient>
      <linearGradient id="strap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#323c4e"/>
        <stop offset="100%" stop-color="#1d2531"/>
      </linearGradient>
      <linearGradient id="strapHi" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4d5a71" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#4d5a71" stop-opacity="0"/>
      </linearGradient>
      <pattern id="mesh" width="17" height="17" patternUnits="userSpaceOnUse">
        <circle cx="4.5" cy="4.5" r="1.7" fill="#4e5b74"/>
        <circle cx="13" cy="13" r="1.7" fill="#4e5b74"/>
      </pattern>
    </defs>
    <!-- correa de hombro izquierda (sube en diagonal) -->
    <path d="M -80 -240 C -220 -420 -380 -560 -560 -600" stroke="url(#strap)" stroke-width="110" fill="none" stroke-linecap="round"/>
    <path d="M -80 -240 C -220 -420 -380 -560 -560 -600" stroke="url(#strapHi)" stroke-width="34" fill="none" stroke-linecap="round"/>
    <!-- correa de hombro derecha -->
    <path d="M 80 -240 C 220 -420 380 -560 560 -600" stroke="url(#strap)" stroke-width="110" fill="none" stroke-linecap="round"/>
    <path d="M 80 -240 C 220 -420 380 -560 560 -600" stroke="url(#strapHi)" stroke-width="34" fill="none" stroke-linecap="round"/>
    <!-- puntas con velcro -->
    <rect x="-640" y="-668" width="170" height="130" rx="26" fill="#0f151e" transform="rotate(-32 -555 -603)"/>
    <rect x="470" y="-668" width="170" height="130" rx="26" fill="#0f151e" transform="rotate(32 555 -603)"/>
    <g transform="rotate(-32 -555 -603)" opacity="0.9">
      <path d="M -600 -640 L -510 -640 M -600 -620 L -510 -620 M -600 -580 L -510 -580" stroke="#38445a" stroke-width="8" stroke-dasharray="12 9"/>
    </g>
    <g transform="rotate(32 555 -603)" opacity="0.9">
      <path d="M 510 -640 L 600 -640 M 510 -620 L 600 -620 M 510 -580 L 600 -580" stroke="#38445a" stroke-width="8" stroke-dasharray="12 9"/>
    </g>
    <!-- columna central (placa alargada con malla) -->
    <path d="M -108 -320 C -110 -430 -80 -520 0 -560 C 80 -520 110 -430 108 -320 L 96 180 C 92 280 50 330 0 330 C -50 330 -92 280 -96 180 Z"
      fill="url(#backPad)" stroke="#46536c" stroke-width="5"/>
    <path d="M -108 -320 C -110 -430 -80 -520 0 -560 C 80 -520 110 -430 108 -320 L 96 180 C 92 280 50 330 0 330 C -50 330 -92 280 -96 180 Z"
      fill="url(#mesh)" opacity="0.85"/>
    <!-- refuerzo central vertical -->
    <path d="M -34 -420 C -36 -470 -20 -510 0 -530 C 20 -510 36 -470 34 -420 L 30 260 C 28 300 14 316 0 316 C -14 316 -28 300 -30 260 Z"
      fill="#3f4c63" opacity="0.95"/>
    <path d="M -8 -480 L -8 300 M 8 -480 L 8 300" stroke="#5c6b84" stroke-width="5" opacity="0.7"/>
    <!-- costuras laterales -->
    <path d="M -88 -300 C -92 -180 -90 -40 -80 160" stroke="#5c6b84" stroke-width="4" fill="none" stroke-dasharray="9 8" opacity="0.8"/>
    <path d="M 88 -300 C 92 -180 90 -40 80 160" stroke="#5c6b84" stroke-width="4" fill="none" stroke-dasharray="9 8" opacity="0.8"/>
    <!-- brillo superior del arnés -->
    <path d="M -516 -580 C -350 -548 -200 -430 -96 -300" stroke="#7d8aa0" stroke-width="9" fill="none" opacity="0.4" stroke-linecap="round"/>
    <path d="M 516 -580 C 350 -548 200 -430 96 -300" stroke="#7d8aa0" stroke-width="9" fill="none" opacity="0.4" stroke-linecap="round"/>
  </g>`;
}

// REST — banda de audio para dormir (gris marengo, sin logos, curva 3/4)
function drawRest(scale = 1) {
  return `
  <g id="rest">
    <defs>
      <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5a6980"/>
        <stop offset="40%" stop-color="#3d4a5e"/>
        <stop offset="100%" stop-color="#26303f"/>
      </linearGradient>
      <linearGradient id="bandInner" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#232c3a"/>
        <stop offset="100%" stop-color="#151b26"/>
      </linearGradient>
      <linearGradient id="bandSheen" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
        <stop offset="45%" stop-color="#ffffff" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <filter id="blurRest"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <!-- banda: elipse gruesa con abertura frontal grande (se ve el interior) -->
    <path d="M -560 90 C -580 -90 -360 -230 -20 -240 C 320 -230 540 -90 520 90 C 505 240 300 330 0 332 C -300 330 -505 240 -520 90 Z"
      fill="url(#band)" stroke="#6b7890" stroke-width="5"/>
    <!-- abertura interior grande -->
    <path d="M -430 80 C -444 -50 -270 -150 -10 -158 C 250 -150 424 -50 410 80 C 396 190 230 258 0 260 C -230 258 -396 190 -410 80 Z"
      fill="url(#bandInner)"/>
    <!-- costura textil perimetral -->
    <path d="M -528 60 C -440 -130 -180 -216 0 -218 C 180 -216 440 -130 528 60" stroke="#7d8aa0" stroke-width="4" fill="none" stroke-dasharray="9 10" opacity="0.75"/>
    <path d="M -500 160 C -380 260 -180 300 0 302 C 180 300 380 260 500 160" stroke="#7d8aa0" stroke-width="4" fill="none" stroke-dasharray="9 10" opacity="0.5"/>
    <!-- pliegues de tela -->
    <path d="M -380 -60 C -300 -120 -140 -152 0 -154" stroke="#7d8aa0" stroke-width="6" fill="none" opacity="0.35" stroke-linecap="round"/>
    <path d="M 380 -60 C 300 -120 140 -152 0 -154" stroke="#7d8aa0" stroke-width="6" fill="none" opacity="0.35" stroke-linecap="round"/>
    <path d="M -330 200 C -230 254 -110 282 0 284" stroke="#7d8aa0" stroke-width="6" fill="none" opacity="0.25" stroke-linecap="round"/>
    <!-- sheen superior -->
    <path d="M -540 40 C -420 -120 -140 -200 0 -202 C 140 -200 420 -120 540 40" stroke="url(#bandSheen)" stroke-width="30" fill="none" stroke-linecap="round" opacity="0.5"/>
    <!-- módulo de control (sin marca) -->
    <g transform="translate(0 96)">
      <rect x="-84" y="-52" width="168" height="96" rx="22" fill="#1b222e" stroke="#46536c" stroke-width="4"/>
      <circle cx="-42" cy="-8" r="13" fill="${CYAN}" opacity="0.95"/>
      <path d="M -14 -22 L -14 -6 M -24 -14 L -4 -14" stroke="#e9eef5" stroke-width="5" stroke-linecap="round"/>
      <circle cx="16" cy="-8" r="13" fill="#2f3a4c" stroke="#4a5568" stroke-width="3"/>
      <path d="M 8 -16 L 14 -8 L 24 -8" stroke="#e9eef5" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="54" cy="-8" r="13" fill="#2f3a4c" stroke="#4a5568" stroke-width="3"/>
      <path d="M 54 -18 L 54 2 M 46 -8 L 62 -8" stroke="#e9eef5" stroke-width="4" stroke-linecap="round"/>
    </g>
    <!-- altavoz tras el borde (insinuación) -->
    <ellipse cx="-250" cy="150" rx="52" ry="34" fill="#4a5568" opacity="0.5"/>
    <ellipse cx="250" cy="150" rx="52" ry="34" fill="#4a5568" opacity="0.5"/>
  </g>`;
}

// CERVICAL — masajeador de cuello en U (blanco, electrodos metálicos, vista 3/4)
function drawCervical(scale = 1) {
  return `
  <g id="cervical">
    <defs>
      <linearGradient id="shell" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="55%" stop-color="#f2f4f7"/>
        <stop offset="100%" stop-color="#d9dee5"/>
      </linearGradient>
      <linearGradient id="shellSide" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#e6eaef"/>
        <stop offset="100%" stop-color="#c2c9d3"/>
      </linearGradient>
      <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#eef1f5"/>
        <stop offset="45%" stop-color="#b9c2cd"/>
        <stop offset="100%" stop-color="#8d97a4"/>
      </linearGradient>
      <filter id="blurCerv"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <!-- brazos laterales del U (cuerpo) -->
    <path d="M -330 -300 C -430 -220 -470 -60 -420 110 C -390 220 -300 300 -180 330 L -120 336 C -70 340 -30 310 -26 260 C -22 210 -60 176 -110 164 C -190 146 -246 90 -262 0 C -278 -100 -250 -190 -190 -240 C -160 -264 -130 -280 -100 -288"
      fill="url(#shell)" stroke="#c9cfd8" stroke-width="5"/>
    <path d="M 330 -300 C 430 -220 470 -60 420 110 C 390 220 300 300 180 330 L 120 336 C 70 340 30 310 26 260 C 22 210 60 176 110 164 C 190 146 246 90 262 0 C 278 -100 250 -190 190 -240 C 160 -264 130 -280 100 -288"
      fill="url(#shell)" stroke="#c9cfd8" stroke-width="5"/>
    <!-- zona interior oscura (donde va el cuello) -->
    <path d="M -100 -288 C -140 -296 -190 -290 -240 -262 C -320 -218 -352 -140 -338 -40 C -322 76 -250 150 -150 178 C -100 192 -60 184 -50 148 C -40 112 -70 88 -110 76 C -170 58 -206 6 -214 -66 C -222 -140 -186 -206 -122 -232 C -114 -236 -106 -256 -100 -288 Z"
      fill="#c6ccd6" opacity="0.6"/>
    <path d="M 100 -288 C 140 -296 190 -290 240 -262 C 320 -218 352 -140 338 -40 C 322 76 250 150 150 178 C 100 192 60 184 50 148 C 40 112 70 88 110 76 C 170 58 206 6 214 -66 C 222 -140 186 -206 122 -232 C 114 -236 106 -256 100 -288 Z"
      fill="#c6ccd6" opacity="0.6"/>
    <!-- electrodos metálicos internos -->
    <ellipse cx="-158" cy="-96" rx="74" ry="44" fill="url(#metal)" stroke="#98a2af" stroke-width="4" transform="rotate(24 -158 -96)"/>
    <ellipse cx="158" cy="-96" rx="74" ry="44" fill="url(#metal)" stroke="#98a2af" stroke-width="4" transform="rotate(-24 158 -96)"/>
    <path d="M -210 -120 C -180 -140 -130 -134 -104 -110" stroke="#ffffff" stroke-width="6" fill="none" opacity="0.6" stroke-linecap="round"/>
    <path d="M 210 -120 C 180 -140 130 -134 104 -110" stroke="#ffffff" stroke-width="6" fill="none" opacity="0.6" stroke-linecap="round"/>
    <!-- flejes metálicos laterales -->
    <rect x="-352" y="-208" width="70" height="30" rx="12" fill="url(#metal)" stroke="#98a2af" stroke-width="3" transform="rotate(-16 -317 -193)"/>
    <rect x="282" y="-208" width="70" height="30" rx="12" fill="url(#metal)" stroke="#98a2af" stroke-width="3" transform="rotate(16 317 -193)"/>
    <!-- panel de control en el brazo izquierdo -->
    <g transform="translate(-300 76) rotate(14)">
      <rect x="-44" y="-70" width="88" height="140" rx="20" fill="#eef1f5" stroke="#c9cfd8" stroke-width="4"/>
      <circle cx="0" cy="-34" r="14" fill="#dfe4ea" stroke="#aab3bf" stroke-width="3"/>
      <circle cx="0" cy="0" r="14" fill="#dfe4ea" stroke="#aab3bf" stroke-width="3"/>
      <rect x="-16" y="26" width="32" height="12" rx="6" fill="#cfd5dd"/>
    </g>
    <!-- brillos de carcasa -->
    <path d="M -300 -270 C -240 -300 -160 -308 -80 -296" stroke="#ffffff" stroke-width="12" fill="none" opacity="0.75" stroke-linecap="round"/>
    <path d="M 300 -270 C 240 -300 160 -308 80 -296" stroke="#ffffff" stroke-width="12" fill="none" opacity="0.75" stroke-linecap="round"/>
    <path d="M -404 60 C -420 -40 -400 -140 -350 -210" stroke="#ffffff" stroke-width="8" fill="none" opacity="0.5" stroke-linecap="round"/>
    <path d="M 404 60 C 420 -40 400 -140 350 -210" stroke="#ffffff" stroke-width="8" fill="none" opacity="0.5" stroke-linecap="round"/>
  </g>`;
}

// ── Escenas ─────────────────────────────────────────────────────────────

const PRODUCTS = {
  halo: { draw: drawHalo, label: 'halo' },
  wave: { draw: drawBack, label: 'back' },
  'sleep-headband': { draw: drawRest, label: 'rest' },
  'neck-massager': { draw: drawCervical, label: 'cervical' },
};

function scene(w, h, productKey, variant) {
  const { draw } = PRODUCTS[productKey];
  const cx = w / 2;

  // Bounds reales por producto (en unidades del dibujo) para sombra y escala
  const BOUNDS = {
    halo: { hw: 570, hh: 305 },
    wave: { hw: 660, hh: 505 },
    'sleep-headband': { hw: 560, hh: 300 },
    'neck-massager': { hw: 480, hh: 330 },
  };
  const b = BOUNDS[productKey];
  const zoom = variant === 'detail' ? 1.5 : 1;
  // escala para ocupar ~62% del ancho en hero (más en detail)
  const fit = Math.min((w * (variant === 'detail' ? 0.78 : 0.6)) / (b.hw * 2), (h * 0.52) / (b.hh * 2));
  const s = fit;

  let inner = background(w, h);
  inner += spotlight(w, h, cx, h * 0.34, w * 0.55);

  if (variant === 'context') {
    // props suaves: mesita con libro y taza
    const props = `
      <rect x="${cx - w * 0.4}" y="${h * 0.68}" width="${w * 0.34}" height="${h * 0.014}" rx="7" fill="#cfc6b9"/>
      <rect x="${cx - w * 0.37}" y="${h * 0.615}" width="${w * 0.27}" height="${h * 0.068}" rx="12" fill="#b9ad9c" opacity="0.9"/>
      <rect x="${cx - w * 0.36}" y="${h * 0.608}" width="${w * 0.25}" height="${h * 0.014}" rx="7" fill="#efe9df"/>
      <circle cx="${cx + w * 0.3}" cy="${h * 0.63}" r="${w * 0.04}" fill="#e6dfd4"/>
      <rect x="${cx + w * 0.262}" y="${h * 0.66}" width="${w * 0.076}" height="${h * 0.034}" rx="9" fill="#ddd4c7"/>
    `;
    inner += props;
  }

  const baselineY = variant === 'detail' ? h * 0.52 : h * 0.48;
  const drawScale = variant === 'context' ? s * 0.82 : s * zoom;

  // sombra elíptica bajo el producto, en contacto con la base
  const shadowY = baselineY + b.hh * drawScale * 0.98;
  const shadowRx = b.hw * drawScale * 0.85;
  inner += `<ellipse cx="${cx}" cy="${shadowY}" rx="${shadowRx}" ry="${shadowRx * 0.16}" fill="#1a140f" opacity="${variant === 'context' ? 0.14 : 0.17}"/>`;
  inner += `<ellipse cx="${cx}" cy="${shadowY + shadowRx * 0.05}" rx="${shadowRx * 0.62}" ry="${shadowRx * 0.10}" fill="#1a140f" opacity="0.12"/>`;

  inner += `<g transform="translate(${cx} ${baselineY}) scale(${drawScale})">${draw()}</g>`;

  // nota de marca discreta (círculo inicial, no claims)
  inner += `
  <g opacity="0.45">
    <circle cx="${w - 96}" cy="${h - 96}" r="26" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M ${w - 108} ${h - 96} L ${w - 84} ${h - 96}" stroke="${INK}" stroke-width="3"/>
  </g>`;

  return svgWrap(w, h, inner);
}

// ── Render ──────────────────────────────────────────────────────────────

async function renderProduct(productKey, variant, w, h) {
  const svg = scene(w, h, productKey, variant);
  const buf = await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  return buf;
}

async function main() {
  const variants = ['hero', 'detail', 'context'];
  const formats = [
    { name: 'web', w: 1600, h: 2000 },
    { name: '1x1', w: 1200, h: 1200 },
    { name: '4x5', w: 1080, h: 1350 },
    { name: '9x16', w: 1080, h: 1920 },
  ];

  for (const [key] of Object.entries(PRODUCTS)) {
    for (const variant of variants) {
      // base web size first, then derive social sizes from same scene
      const buf = await renderProduct(key, variant, 1600, 2000);
      const webFile = path.join(OUT, `${key}-${variant}.jpg`);
      fs.writeFileSync(webFile, buf);
      console.log('✔', webFile.replace(process.cwd(), '.'));

      for (const f of formats) {
        if (f.name === 'web') continue;
        const b = await renderProduct(key, variant, f.w, f.h);
        const file = path.join(OUT, `${key}-${variant}-${f.name}.jpg`);
        fs.writeFileSync(file, b);
        console.log('✔', file.replace(process.cwd(), '.'));
      }
    }
  }
  console.log('\nListo. Imágenes en public/images/brand/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
