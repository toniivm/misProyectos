import { chromium } from 'playwright'

const out = 'D:/OpenCode/temp'
const base = 'http://localhost:4173'
const jobs = [
  { name: 'dry-home-1440', path: '/es', w: 1440, h: 1000 },
  { name: 'dry-home-390', path: '/es', w: 390, h: 844 },
  { name: 'dry-how-1440', path: '/es', w: 1440, h: 1000, scroll: '#como-funciona' },
  { name: 'dry-product-1440', path: '/es/products/dry', w: 1440, h: 1000 },
  { name: 'dry-product-390', path: '/es/products/dry', w: 390, h: 844 },
]

const browser = await chromium.launch()
for (const job of jobs) {
  const page = await browser.newPage({ viewport: { width: job.w, height: job.h } })
  const errors = []
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
  await page.goto(base + job.path, { waitUntil: 'load', timeout: 45000 })
  await page.waitForTimeout(2200)
  if (job.scroll) {
    await page.locator(job.scroll).scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)
  }
  await page.screenshot({ path: `${out}/${job.name}.png` })
  console.log(job.name, 'errors:', errors.length, errors.slice(0, 3).join(' | '))
  await page.close()
}
await browser.close()
