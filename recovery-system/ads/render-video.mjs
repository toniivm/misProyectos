import { chromium } from '@playwright/test'
import path from 'path'
import fs from 'fs'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

// Renderiza ads/videos.html a MP4 1080x1920 sin servicios de pago.
// Uso:  node ads/render-video.mjs

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ads = __dirname
const temp = 'D:/OpenCode/temp'
const ffmpeg = 'D:/OpenCode/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe'

if (!fs.existsSync(ffmpeg)) throw new Error('No encuentro ffmpeg en ' + ffmpeg)

const products = [
  { key: 'halo', total: 18.5, voice: 'halo-voz.mp3', offset: 3 },
  { key: 'back', total: 16 },
  { key: 'rest', total: 16 },
  { key: 'cervical', total: 16 }
]

const browser = await chromium.launch()
fs.mkdirSync(temp, { recursive: true })

for (const p of products) {
  const dir = fs.mkdtempSync(path.join(temp, 'pw-'))
  const t0 = Date.now()

  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    recordVideo: { dir, size: { width: 1080, height: 1920 } }
  })

  const page = await context.newPage()
  await page.goto('file:///' + path.join(ads, 'videos.html').replace(/\\/g, '/') + '?p=' + p.key, { waitUntil: 'load' })
  await page.addStyleTag({ content: '#tools,#time,#hud,#play{display:none!important}' })
  await page.waitForTimeout(250)

  const t1 = Date.now()
  await page.evaluate(() => document.getElementById('play').click())
  await page.waitForTimeout(p.total * 1000 + 900)

  const video = page.video()
  await context.close()
  const webm = await video.path()
  const lead = Math.max(0, (t1 - t0) / 1000)

  const out = path.join(ads, `noctip-${p.key}-9x16.mp4`)
  const args = ['-y', '-ss', lead.toFixed(2), '-i', webm]

  if (p.voice) {
    args.push('-i', path.join(ads, p.voice))
    args.push('-filter_complex', `[1:a]adelay=${p.offset * 1000}|${p.offset * 1000}[a]`)
    args.push('-map', '0:v:0', '-map', '[a]')
  } else {
    args.push('-an')
  }

  args.push('-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-t', String(p.total), out)
  execFileSync(ffmpeg, args, { stdio: 'inherit' })

  const mb = (fs.statSync(out).size / 1048576).toFixed(1)
  console.log(`OK ${p.key} -> ${path.basename(out)} (${mb} MB, corte ${lead.toFixed(2)}s)`)

  fs.rmSync(dir, { recursive: true, force: true })
}

await browser.close()
console.log('Terminado.')
