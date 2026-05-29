#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'img', 'products');
const DST_DIR = path.join(ROOT, 'recovery-system', 'public', 'images');
const DATA_FILE = path.join(ROOT, 'data', 'scraped_products.json');

async function main() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const items = JSON.parse(raw);
    await fs.mkdir(DST_DIR, { recursive: true });
    for (const item of items) {
      const images = item.images || [];
      for (let i = 0; i < Math.min(3, images.length); i++) {
        const srcUrl = images[i];
        const basename = path.basename(srcUrl);
        const srcPath = path.join(ROOT, 'public', srcUrl.replace(/^\//, ''));
        const dstName = `${item.slug}-${i+1}${path.extname(basename)}`;
        const dstPath = path.join(DST_DIR, dstName);
        try {
          await fs.copyFile(srcPath, dstPath);
          console.log('Copied', srcPath, '->', dstPath);
        } catch (e) {
          console.warn('Failed to copy', srcPath, e.message);
        }
      }
    }
    console.log('Done copying scraped images.');
  } catch (e) {
    console.error('Error installing scraped images:', e.message || e);
    process.exit(1);
  }
}

main();
