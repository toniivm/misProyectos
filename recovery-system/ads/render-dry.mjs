import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const temp = 'D:/OpenCode/temp'
const ffmpeg = 'D:/OpenCode/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe'

const [html, outArg, wArg, hArg, durArg, crfArg] = process.argv.slice(2)
if (!html || !outArg) {
  console.error('Uso: node render-dry.mjs <html> <out.mp4> [w] [h] [dur] [crf]')
  process.exit(1)
}

const W = Number(wArg || 1080)
const H = Number(hArg || 1350)
const DURATION = Number(durArg || 7)
const CRF = String(crfArg || 23)
const out = path.isAbsolute(outArg) ? outArg : path.resolve(__dirname, '..', outArg)

fs.mkdirSync(path.dirname(out), { recursive: true })
fs.mkdirSync(temp, { recursive: true })
const dir = fs.mkdtempSync(path.join(temp, 'dry-'))

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: W, height: H },
  recordVideo: { dir, size: { width: W, height: H } },
})
const t0 = Date.now()
const page = await context.newPage()
await page.goto('file:///' + path.join(__dirname, html).replace(/\\/g, '/'), { waitUntil: 'load' })
await page.waitForLoadState('networkidle').catch(() => null)
await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 20000 }).catch(() => null)
await page.waitForTimeout(350)
await page.evaluate(() => window.__playAd && window.__playAd())
const lead = (Date.now() - t0) / 1000
await page.waitForTimeout(DURATION * 1000 + 900)
const video = page.video()
await context.close()
const webm = await video.path()

execFileSync(ffmpeg, [
  '-y', '-ss', String(Math.max(0, lead - 0.05)), '-i', webm,
  '-t', String(DURATION),
  '-vf', `scale=${W}:${H}:flags=lanczos,fps=30`,
  '-c:v', 'libx264', '-preset', 'medium', '-crf', CRF,
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
  out,
], { stdio: 'inherit' })

console.log('lead', lead.toFixed(2), 'sec')
console.log('out', out, (fs.statSync(out).size / 1024 / 1024).toFixed(1) + ' MB')
await browser.close()
