/**
 * Fábrica de Anuncios Noctip — genera piezas listas para publicar desde línea de comandos.
 *
 *   node scripts/generate-ads.js                 → tarjetas + vídeos de los 5 productos
 *   node scripts/generate-ads.js --cards-only    → solo tarjetas (rápido)
 *   node scripts/generate-ads.js --video-only    → solo vídeos
 *
 * Salida en /ads:
 *   card-hook-{slug}-9x16.png      Tarjeta de gancho pantalla completa (portada del vídeo)
 *   card-cta-{slug}-9x16.png       Tarjeta final con CTA (30 noches de prueba + noctip.com)
 *   card-cta-{slug}-1x1.png        Versión cuadrada para feed
 *   overlay-hook-{slug}-9x16.png   Texto del gancho con fondo, transparente (para CapCut)
 *   {slug}-anuncio-9x16.mp4        Vídeo 17s con Ken Burns y fundidos (9:16 1080x1920)
 *
 * Reglas: sin promesas de salud, sin datos inventados, producto real (renders o fotos).
 * La música se añade en CapCut. Si el vídeo lleva voz/cara de IA, etiquetarlo al publicar.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const ADS = path.join(ROOT, 'ads');
const IMAGES = path.join(ROOT, 'public', 'images');
fs.mkdirSync(ADS, { recursive: true });

let ffmpeg = null;
try {
  ffmpeg = require('ffmpeg-static');
} catch (e) {
  console.log('⚠ ffmpeg-static no disponible: solo se generarán tarjetas.');
}

// ── Config de producto: hooks honestos, sin claims médicos ─────────────

const PRODUCTS = {
  antifaz: {
    name: 'Noctip Antifaz',
    hook: 'Duermes de lado y siempre entra luz',
    sub: 'Cazoleta 3D + peso. No aprieta los ojos y no se mueve.',
    pill: 'Cazoleta 3D + peso — no toca los ojos',
    images: ['brand/antifaz-real-1.jpg', 'brand/antifaz-real-3.jpg', 'brand/antifaz-real-2.jpg'],
  },
  halo: {
    name: 'Noctip Halo',
    hook: 'Dormís separados por los ronquidos',
    sub: '10mm de micro-ajuste. Estuche de viaje incluido.',
    pill: 'Ajuste 10mm — estuche incluido',
    images: ['brand/halo-photo-1.jpg', 'brand/halo-hero.jpg', 'brand/halo-detail.jpg'],
  },
  wave: {
    name: 'Noctip Back',
    hook: 'Camisa torcida a las 4 de la tarde',
    sub: '15 min al día. XS-XL. Invisible bajo la ropa.',
    pill: '15 min/día — invisible bajo la ropa',
    images: ['brand/wave-photo-1.jpg', 'brand/wave-hero.jpg', 'brand/wave-detail.jpg'],
  },
  'sleep-headband': {
    name: 'Noctip Rest',
    hook: 'Auriculares clavados en la oreja toda la noche',
    sub: '45 g que no sientes. Lavable. 10 h de batería.',
    pill: '45 g — lavable — 10 h de batería',
    images: ['brand/rest-photo-1.jpg', 'brand/sleep-headband-hero.jpg', 'brand/sleep-headband-context.jpg'],
  },
  'neck-massager': {
    name: 'Noctip Cervical',
    hook: 'Nuca de piedra a las 7 de la tarde',
    sub: 'Calor suave y masaje. 15 minutos sin cables.',
    pill: 'Calor suave + masaje — 15 min',
    images: ['cervical/gallery/1.jpg', 'brand/neck-massager-hero.jpg', 'productos-reales/neck-massager.jpg'],
  },
};

// ── Utilidades ─────────────────────────────────────────────────────────

const CREAM = '#f5f0eb';
const INK = '#141a22';
const CYAN = '#10BFD8';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

function linesSvg(lines, { x, y, size, lh, fill, weight = '800', anchor = 'start' }) {
  return lines
    .map((l, i) => `<text x="${x}" y="${y + i * lh}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(l)}</text>`)
    .join('');
}

const grain = `
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.03"/></feComponentTransfer><feComposite operator="over" in2="SourceGraphic"/></filter>`;

function hookCardSvg(w, h, p) {
  const maxChars = w > h ? 26 : 17;
  const lines = wrap(p.hook, maxChars);
  const size = w > h ? 92 : 104;
  const lh = size * 1.12;
  const blockH = lines.length * lh;
  const y0 = h * 0.52 - blockH / 2 + size * 0.8;
  const subLines = wrap(p.sub, maxChars + 8);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="32%" r="80%">
        <stop offset="0%" stop-color="#faf6f1"/><stop offset="100%" stop-color="${CREAM}"/>
      </radialGradient>
      ${grain}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)" filter="url(#grain)"/>
    <text x="${w / 2}" y="${h * 0.14}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 30 : 34}" font-weight="700" letter-spacing="14" fill="${INK}" text-anchor="middle">NOCTIP</text>
    ${linesSvg(lines, { x: w / 2, y: y0, size, lh, fill: INK, anchor: 'middle' })}
    <rect x="${w / 2 - 60}" y="${y0 + blockH - size + 44}" width="120" height="8" rx="4" fill="${CYAN}"/>
    ${linesSvg(subLines, { x: w / 2, y: y0 + blockH + 76, size: w > h ? 38 : 42, lh: 56, fill: '#5b6575', weight: '600', anchor: 'middle' })}
    <text x="${w / 2}" y="${h - h * 0.07}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 30 : 34}" font-weight="600" fill="#6b7785" text-anchor="middle">30 noches de prueba · noctip.com</text>
  </svg>`;
}

function ctaCardSvg(w, h, p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <radialGradient id="bgi" cx="50%" cy="30%" r="85%">
        <stop offset="0%" stop-color="#1d2531"/><stop offset="100%" stop-color="#0c1118"/>
      </radialGradient>
      ${grain}
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bgi)" filter="url(#grain)"/>
    <text x="${w / 2}" y="${h * 0.30}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 44 : 50}" font-weight="700" letter-spacing="16" fill="#f2eee7" text-anchor="middle">NOCTIP</text>
    <text x="${w / 2}" y="${h * 0.44}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 64 : 74}" font-weight="800" fill="#ffffff" text-anchor="middle">${esc(p.name.replace('Noctip ', ''))}</text>
    <rect x="${w / 2 - 70}" y="${h * 0.485}" width="140" height="8" rx="4" fill="${CYAN}"/>
    <text x="${w / 2}" y="${h * 0.56}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 40 : 46}" font-weight="700" fill="#f2eee7" text-anchor="middle">30 noches de prueba</text>
    <text x="${w / 2}" y="${h * 0.60}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 30 : 34}" font-weight="500" fill="#8791a1" text-anchor="middle">Devolución sin preguntas</text>
    <text x="${w / 2}" y="${h * 0.72}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 52 : 60}" font-weight="800" fill="${CYAN}" text-anchor="middle">noctip.com</text>
    <text x="${w / 2}" y="${h - h * 0.06}" font-family="Segoe UI, Arial, sans-serif" font-size="${w > h ? 26 : 30}" font-weight="500" fill="#6b7785" text-anchor="middle">Envío con seguimiento · Soporte humano</text>
  </svg>`;
}

function overlayHookSvg(w, h, p) {
  const maxChars = 17;
  const lines = wrap(p.hook, maxChars);
  const size = 96;
  const lh = size * 1.14;
  const boxH = lines.length * lh + 90;
  const boxY = h * 0.12;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect x="${w * 0.06}" y="${boxY}" width="${w * 0.88}" height="${boxH}" rx="34" fill="rgba(12,17,24,0.72)"/>
    ${linesSvg(lines, { x: w / 2, y: boxY + 84 + size * 0.6, size, lh, fill: '#ffffff', anchor: 'middle' })}
    <text x="${w / 2}" y="${boxY + boxH + 78}" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#ffffff" text-anchor="middle" opacity="0.92">${esc(p.sub)}</text>
  </svg>`;
}

function pillSvg(w, h, text) {
  const size = 46;
  const pad = 36;
  const bw = text.length * size * 0.58 + pad * 2;
  const bh = size + pad * 1.2;
  const x = (w - bw) / 2;
  const y = h * 0.775;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="${bh / 2}" fill="rgba(10,14,20,0.76)"/>
    <text x="${w / 2}" y="${y + bh / 2 + size * 0.34}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="700" fill="#ffffff" text-anchor="middle">${esc(text)}</text>
  </svg>`;
}

// ── Generación de tarjetas ─────────────────────────────────────────────

async function makeCards(slug, p) {
  const jobs = [
    { file: `card-hook-${slug}-9x16.png`, svg: hookCardSvg(1080, 1920, p) },
    { file: `card-cta-${slug}-9x16.png`, svg: ctaCardSvg(1080, 1920, p) },
    { file: `card-cta-${slug}-1x1.png`, svg: ctaCardSvg(1080, 1080, p) },
    { file: `overlay-hook-${slug}-9x16.png`, svg: overlayHookSvg(1080, 1920, p) },
    { file: `pill-${slug}-9x16.png`, svg: pillSvg(1080, 1920, p.pill) },
  ];
  for (const j of jobs) {
    const out = path.join(ADS, j.file);
    await sharp(Buffer.from(j.svg)).png({ compressionLevel: 9 }).toFile(out);
    console.log('✔', path.relative(ROOT, out));
  }
}

// ── Generación de vídeo (ffmpeg) ───────────────────────────────────────

function runFfmpeg(args) {
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });
}

const FPS = 25;
const VW = 1080;
const VH = 1920;
const XFADE = 0.5;

function imageSegmentPro(img, dur, overlayPng, out, opts = {}) {
  const { zoomIn = true, fadeFirst = false, fadeLast = false } = opts;
  const zExpr = zoomIn
    ? `min(zoom+0.0011,1.14)`
    : `if(eq(on,1),1.14,max(zoom-0.0011,1.0))`;
  const base = `scale=${VW}:${VH}:force_original_aspect_ratio=increase,crop=${VW}:${VH},zoompan=z='${zExpr}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${VW}x${VH}:fps=${FPS},setsar=1`;
  const fades = [];
  if (fadeFirst) fades.push(`fade=t=in:st=0:d=0.35`);
  if (fadeLast) fades.push(`fade=t=out:st=${(dur - 0.35).toFixed(2)}:d=0.35`);

  const args = ['-loop', '1', '-t', String(dur), '-i', img];
  let filter;
  if (overlayPng && fs.existsSync(overlayPng)) {
    args.push('-loop', '1', '-t', String(dur), '-i', overlayPng);
    filter = `[0:v]${base}[bg];[1:v]scale=${VW}:${VH},setsar=1[fg];[bg][fg]overlay=0:0:format=auto`;
    if (fades.length) filter += ',' + fades.join(',');
    filter += ',format=yuv420p';
    args.push('-filter_complex', filter);
  } else {
    filter = base + (fades.length ? ',' + fades.join(',') : '') + ',format=yuv420p';
    args.push('-vf', filter);
  }
  args.push('-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-r', String(FPS), '-an', out);
  runFfmpeg(args);
}

function cardSegmentPro(card, dur, out, opts = {}) {
  const { fadeFirst = false, fadeLast = false } = opts;
  const fades = [];
  if (fadeFirst) fades.push(`fade=t=in:st=0:d=0.35`);
  if (fadeLast) fades.push(`fade=t=out:st=${(dur - 0.35).toFixed(2)}:d=0.35`);
  runFfmpeg([
    '-loop', '1', '-t', String(dur), '-i', card,
    '-vf', `scale=${VW}:${VH},setsar=1${fades.length ? ',' + fades.join(',') : ''},format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-r', String(FPS), '-an', out,
  ]);
}

function xfadeMerge(a, b, out, durA) {
  runFfmpeg([
    '-i', a, '-i', b,
    '-filter_complex', `[0:v][1:v]xfade=transition=fade:duration=${XFADE}:offset=${(durA - XFADE).toFixed(2)}`,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-an', out,
  ]);
}

async function makeVideo(slug, p) {
  if (!ffmpeg) {
    console.log('⚠ Sin ffmpeg: se salta el vídeo de', slug);
    return;
  }
  const tmp = path.join(ADS, `.tmp-${slug}`);
  fs.mkdirSync(tmp, { recursive: true });

  const imgs = p.images.map((f) => path.join(IMAGES, f)).filter((f) => fs.existsSync(f));
  if (imgs.length < 2) {
    console.log('⚠ Faltan imágenes de', slug, '— vídeo no generado');
    return;
  }

  const hookOverlay = path.join(ADS, `overlay-hook-${slug}-9x16.png`);
  const pillOverlay = path.join(ADS, `pill-${slug}-9x16.png`);
  const ctaCard = path.join(ADS, `card-cta-${slug}-9x16.png`);

  const plan = [
    { type: 'img', src: imgs[0], dur: 4.2, ov: hookOverlay, zoomIn: true },
    { type: 'img', src: imgs[1], dur: 3.6, ov: pillOverlay, zoomIn: false },
    { type: 'img', src: imgs[2] ?? imgs[1], dur: 3.6, ov: pillOverlay, zoomIn: true },
    { type: 'card', src: ctaCard, dur: 3.6 },
  ];

  const segs = [];
  const durs = [];
  plan.forEach((step, i) => {
    const out = path.join(tmp, `seg${i}.mp4`);
    const first = i === 0;
    const last = i === plan.length - 1;
    if (step.type === 'card') cardSegmentPro(step.src, step.dur, out, { fadeFirst: first, fadeLast: last });
    else imageSegmentPro(step.src, step.dur, step.ov, out, { zoomIn: step.zoomIn, fadeFirst: first, fadeLast: last });
    segs.push(out);
    durs.push(step.dur);
  });

  // Cadena de fundidos cruzados: sensación de vídeo, no de pase de diapositivas
  let current = segs[0];
  let currentDur = durs[0];
  for (let i = 1; i < segs.length; i++) {
    const merged = path.join(tmp, `merge${i}.mp4`);
    xfadeMerge(current, segs[i], merged, currentDur);
    currentDur = currentDur + durs[i] - XFADE;
    current = merged;
  }

  const outFile = path.join(ADS, `${slug}-anuncio-9x16.mp4`);
  fs.copyFileSync(current, outFile);
  console.log('✔', path.relative(ROOT, outFile), `(≈${currentDur.toFixed(1)}s, música en CapCut)`);

  fs.rmSync(tmp, { recursive: true, force: true });
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const cardsOnly = args.includes('--cards-only');
  const videoOnly = args.includes('--video-only');
  const onlyArg = args.find((a) => a.startsWith('--only='));
  const only = onlyArg ? onlyArg.split('=')[1] : null;

  for (const [slug, p] of Object.entries(PRODUCTS)) {
    if (only && slug !== only) continue;
    if (!videoOnly) await makeCards(slug, p);
    if (!cardsOnly) await makeVideo(slug, p);
  }
  console.log('\nListo. Piezas en /ads');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
