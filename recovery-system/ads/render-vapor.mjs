import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const temp = 'D:/OpenCode/temp'
const ffmpeg = 'D:/OpenCode/ffmpeg/ffmpeg-9.0.2-essentials_build/bin/ffmpeg.exe'
const DURATION = 16.4

const browser = await chromium.launch()
fs.mkdirSync(temp, { recursive: true })
const dir = fs.mkdtempSync(path.join(temp, 'vapor-'))
const t0 = Date.now()

const context = await browser.newContext({
  viewport: { width: 1080, height: 1920 },
  recordVideo: { dir, size: { width: 1080, height: 1920 } },
})
const page = await context.newPage()
await page.goto('file:///' + path.join(__dirname, 'vapor-video.html').replace(/\\/g, '/'), { waitUntil: 'load' })
await page.waitForFunction(() => Array.from(document.images).every(i => i.complete), null, { timeout: 20000 })
await page.waitForTimeout(250)
await page.evaluate(() => window.__playAd())
const lead = (Date.now() - t0) / 1000
await page.waitForTimeout(DURATION * 1000 + 900)
const video = page.video()
await context.close()
const webm = await video.path()

const out = path.join(__dirname, 'nitida-vapor-9x16.mp4')
execFileSync(ffmpeg, [
  '-y', '-ss', String(Math.max(0, lead - 0.05)), '-i', webm,
  '-t', String(DURATION),
  '-vf', 'scale=1080:1920:flags=lanczos,fps=30',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
  out,
], { stdio: 'inherit' })

console.log('lead', lead.toFixed(2), 'sec')
console.log('out', out, (fs.statSync(out).size / 1024 / 1024).toFixed(1) + ' MB')
await browser.close()
