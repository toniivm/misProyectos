import sharp from 'sharp'

// Genera recortes de galería a partir de las FOTOS REALES.
// No crea contenido: solo reencuadra y normaliza tamaño.
// Uso: node scripts/make-gallery-crops.mjs

const dir = 'public/images/brand/'

const jobs = [
  // Halo: detalle de la férula (sin brazo ni fondo del proveedor)
  { src: 'halo-photo-1.jpg', out: 'halo-gallery-2.jpg', w: 1080, h: 1080, fx: 0.90, fy: 0.45, cy: 0.12 },
  // Back: plano limpio 4:5 y detalle del soporte en Y
  { src: 'wave-photo-1.jpg', out: 'wave-gallery-1.jpg', w: 1080, h: 1350, fx: 0.86, fy: 0.86 },
  { src: 'wave-photo-1.jpg', out: 'wave-gallery-2.jpg', w: 1080, h: 1080, fx: 0.58, fy: 0.58 }
]

for (const j of jobs) {
  const meta = await sharp(dir + j.src).metadata()
  const cw = Math.round(meta.width * j.fx)
  const ch = Math.round(meta.height * j.fy)
  const left = Math.round(meta.width * (j.cx ?? (1 - j.fx) / 2))
  const top = Math.round(meta.height * (j.cy ?? (1 - j.fy) / 2))

  await sharp(dir + j.src)
    .extract({ left, top, width: cw, height: ch })
    .resize(j.w, j.h, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(dir + j.out)

  console.log(`OK ${j.out} (${j.w}x${j.h}) desde ${j.src}`)
}
