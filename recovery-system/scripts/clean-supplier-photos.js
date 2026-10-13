/**
 * Limpia fotos de proveedor: recorta la parte del producto (dentro de infografías
 * con texto en inglés) y las deja como fotos de producto limpias.
 *
 * Uso: node scripts/clean-supplier-photos.js
 * Salida: public/images/brand/{slug}-photo-{n}.jpg (1600px ancho, calidad 82)
 *
 * Los recortes usan PORCENTAJES del tamaño real (seguro ante cualquier resolución).
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'public', 'images');
const BRAND = path.join(IMG, 'brand');

// leftF/topF/widthF/heightF = fracción 0..1 del tamaño real de la imagen
const JOBS = [
  {
    // Halo: férula + estuche dentro de la infografía "SNORE SOLUTION EXPERT"
    input: path.join(IMG, 'mouthpiece-3.jpg'),
    output: path.join(BRAND, 'halo-photo-1.jpg'),
    crop: { leftF: 0.245, topF: 0.335, widthF: 0.37, heightF: 0.335 },
  },
  {
    // Back: corrector en Y (vista plana) dentro de la infografía con tabla de tallas
    input: path.join(IMG, 'posture-corrector-3.webp'),
    output: path.join(BRAND, 'wave-photo-1.jpg'),
    crop: { leftF: 0.07, topF: 0.10, widthF: 0.50, heightF: 0.44 },
  },
];

async function main() {
  for (const job of JOBS) {
    if (!fs.existsSync(job.input)) {
      console.log('⚠ No existe:', job.input);
      continue;
    }
    const meta = await sharp(job.input).metadata();
    const left = Math.round(job.crop.leftF * meta.width);
    const top = Math.round(job.crop.topF * meta.height);
    const width = Math.round(job.crop.widthF * meta.width);
    const height = Math.round(job.crop.heightF * meta.height);

    const buf = await sharp(job.input)
      .extract({
        left: Math.min(left, meta.width - 10),
        top: Math.min(top, meta.height - 10),
        width: Math.min(width, meta.width - left),
        height: Math.min(height, meta.height - top),
      })
      .resize({ width: 1600 })
      .flatten({ background: '#f8f5f1' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(job.output, buf);
    console.log('✔', path.relative(ROOT, job.output), `(${Math.round(buf.length / 1024)} KB)`, `${meta.width}x${meta.height} → crop ${left},${top},${width},${height}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
