import { chromium } from '@playwright/test'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'ads')
fs.mkdirSync(outDir, { recursive: true })

const fileUrl = (f) => 'file:///' + path.join(__dirname, f).replace(/\\/g, '/')

const sizes = [
  { w: 1080, h: 1080, tag: '1x1' },
  { w: 1080, h: 1350, tag: '4x5' },
  { w: 1080, h: 1920, tag: '9x16' },
]
const concepts = ['A', 'B', 'C']

const templates = [
  { file: 'ad-light.html', prefix: 'noctip-side-light' },
  { file: 'ad.html', prefix: 'noctip-side-dark' },
]

const browser = await chromium.launch()
const made = []

for (const t of templates) {
  for (const c of concepts) {
    for (const s of sizes) {
      const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 })
      await page.goto(`${fileUrl(t.file)}?concept=${c}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(500)
      const file = path.join(outDir, `${t.prefix}-${c}-${s.tag}.png`)
      await page.screenshot({ path: file })
      made.push(path.basename(file))
      await page.close()
    }
  }
}

// Imagen premium para la web (1200x1200)
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 })
  await page.goto(fileUrl('hero.html'), { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const file = path.join(outDir, 'noctip-side-hero-1200.png')
  await page.screenshot({ path: file })
  made.push(path.basename(file))
  await page.close()
}

await browser.close()
console.log('Generados', made.length, 'archivos en public/ads')
made.forEach((f) => console.log('  -', f))
