const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const products = [
  { pattern: 'mouthpiece', count: 6, ext: 'jpg', bg: '#f6f2eb', name: 'halo' },
  { pattern: 'posture-corrector', count: 6, ext: 'webp', bg: '#f5f0eb', name: 'back' },
  { pattern: 'sleep-headband', count: 6, ext: 'webp', bg: '#0d1219', name: 'rest' },
  { pattern: 'cervical-gallery', count: 3, ext: 'jpg', bg: '#f6f2eb', name: 'cervical' },
];

const baseDir = path.join(__dirname, '..', 'recovery-system', 'public', 'images');
const outDir = path.join(__dirname, '..', 'recovery-system', 'public', 'images', '_premium');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function processOne(filePath, bg, outPath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const isJpg = ext === '.jpg' || ext === '.jpeg';
    const img = sharp(filePath);
    const resized = await img.resize(900, 900, { fit: 'inside', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
    const rMeta = await sharp(resized).metadata();
    const left = Math.round((1200 - rMeta.width) / 2);
    const top = Math.round((1200 - rMeta.height) / 2);
    const canvas = sharp({
      create: { width: 1200, height: 1200, channels: 4, background: bg }
    });
    const pipeline = canvas.composite([{ input: resized, left, top }]);
    if (isJpg) await pipeline.jpeg({ quality: 88 }).toFile(outPath);
    else await pipeline.webp({ quality: 88 }).toFile(outPath);
    console.log(`✓ ${path.basename(filePath)} → ${path.basename(outPath)} (${rMeta.width}x${rMeta.height} on ${bg} → ${isJpg ? 'jpeg' : 'webp'})`);
  } catch (e) {
    console.error(`✗ ${filePath}:`, e.message);
  }
}

(async () => {
  for (const p of products) {
    for (let i = 1; i <= p.count; i++) {
      const src = path.join(baseDir, `${p.pattern}-${i}.${p.ext}`);
      if (!fs.existsSync(src)) { console.log(`skip ${src}`); continue; }
      const out = path.join(baseDir, `${p.pattern}-${i}.${p.ext}.new`);
      await processOne(src, p.bg, out);
      // backup original (do not auto-replace here — bash cp does it to avoid EBUSY)
      const bak = src + '.aliexpress.bak';
      if (!fs.existsSync(bak)) {
        try { fs.copyFileSync(src, bak); console.log(`  backup ${path.basename(bak)}`); } catch (e) { console.log(`  backup skip: ${e.message}`); }
      }
      console.log(`  generated ${path.basename(out)} ready for cp`);
    }
  }
  console.log('Done — all aliexpress photos replaced with premium background');
})();
