// Quita el fondo blanco del producto (flood-fill desde los bordes) y exporta PNG con transparencia.
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assets = path.join(__dirname, 'assets')

const SRC = path.join(assets, 'product-source.jpg')
const CROP = { left: 30, top: 105, width: 745, height: 400 }
const OUT = path.join(assets, 'product-cut.png')

const { data, info } = await sharp(SRC)
  .extract(CROP)
  .resize({ width: 1400, kernel: 'lanczos3' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width: W, height: H, channels: C } = info
const px = data
const idx = (x, y) => (y * W + x) * C

const isBg = (i) => px[i] > 242 && px[i + 1] > 242 && px[i + 2] > 242 && Math.max(px[i], px[i + 1], px[i + 2]) - Math.min(px[i], px[i + 1], px[i + 2]) < 14

const seen = new Uint8Array(W * H)
const stack = []
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return
  const p = y * W + x
  if (seen[p]) return
  seen[p] = 1
  stack.push(p)
}

// sembrar desde todos los bordes
for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1) }
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y) }

let removed = 0
while (stack.length) {
  const p = stack.pop()
  const i = p * C
  if (!isBg(i)) continue
  px[i + 3] = 0 // alpha 0
  removed++
  const x = p % W, y = (p - x) / W
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1)
}

// suavizar el borde del alpha un poco
const cut = await sharp(px, { raw: { width: W, height: H, channels: C } })
  .png()
  .toBuffer()

await sharp(cut).toFile(OUT)

// previews para revisar
const bgDark = { r: 8, g: 12, b: 18, alpha: 1 }
const bgLight = { r: 244, g: 246, b: 248, alpha: 1 }
await sharp({ create: { width: W, height: H, channels: 4, background: bgDark } })
  .composite([{ input: cut }]).png().toFile(path.join(assets, '_preview-dark.png'))
await sharp({ create: { width: W, height: H, channels: 4, background: bgLight } })
  .composite([{ input: cut }]).png().toFile(path.join(assets, '_preview-light.png'))

console.log('product-cut.png listo. Pixeles de fondo eliminados:', removed, 'de', W * H)
