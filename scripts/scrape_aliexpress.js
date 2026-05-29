#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const PRODUCTS = [
  {
    slug: 'sleepband-pro',
    url: 'https://nl.aliexpress.com/item/1005010707041107.html?spm=a2g0o.productlist.main.2.72e24443k5VN0A&algo_pvid=d43cd453-8da6-4121-9a46-2bb214e999fa&pdp_ext_f=%7B%22order%22%3A%2215951%22%2C%22eval%22%3A%221%22%2C%22orig_sl_item_id%22%3A%221005010707041107%22%2C%22orig_item_id%22%3A%221005010449574912%22%2C%22fromPage%22%3A%22search%22%7D&utparam-url=scene%3Asearch%7Cquery_from%3A%7Cx_object_id%3A1005010707041107%7C_p_origin_prod%3A1005010449574912'
  },
  {
    slug: 'weighted-mask-pro',
    url: 'https://nl.aliexpress.com/item/1005006678112450.html?spm=a2g0o.productlist.main.4.3a5541ba4zXvke&aem_p4p_detail=202605290557331361266788284450001769113&algo_pvid=e6c5f832-4ad2-4e43-bb6c-32a9e3a96561&pdp_ext_f=%7B%22order%22%3A%2211169%22%2C%22eval%22%3A%221%22%2C%22orig_sl_item_id%22%3A%221005006678112450%22%2C%22orig_item_id%22%3A%221005007355072937%22%2C%22fromPage%22%3A%22search%22%7D&utparam-url=scene%3Asearch%7Cquery_from%3A%7Cx_object_id%3A1005006678112450%7C_p_origin_prod%3A'
  },
  {
    slug: 'white-noise-pro',
    url: 'https://nl.aliexpress.com/item/1005009890721743.html?spm=a2g0o.productlist.main.2.581b7ca0hPLnJ2&algo_pvid=e1e09d96-1e6a-48a5-9ebd-21cdd2725ac9&pdp_ext_f=%7B%22order%22%3A%22628%22%2C%22eval%22%3A%221%22%2C%22fromPage%22%3A%22search%22%7D&utparam-url=scene%3Asearch%7Cquery_from%3A%7Cx_object_id%3A1005009890721743%7C_p_origin_prod%3A'
  }
];

const OUT_DIR = path.join(__dirname, '..', 'public', 'img', 'products');
const DATA_DIR = path.join(__dirname, '..', 'data');

function pickExt(urlStr) {
  try {
    const u = new URL(urlStr);
    const p = u.pathname || '';
    const idx = p.lastIndexOf('.');
    if (idx === -1) return '.jpg';
    const ext = p.slice(idx).split('?')[0].toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) return ext;
    return '.jpg';
  } catch (e) {
    return '.jpg';
  }
}

async function fetchText(url) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  };
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function extractJsonLd(html) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of scripts) {
    try {
      const json = JSON.parse(m[1]);
      if (json && (json['@type'] === 'Product' || json.name)) return json;
    } catch (e) {
      // ignore parse errors
    }
  }
  return null;
}

function extractOg(html, prop) {
  const re = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

function extractImageUrlsFromHtml(html) {
  const found = new Set();

  // JSON-LD
  const js = extractJsonLd(html);
  if (js) {
    if (Array.isArray(js.image)) js.image.forEach(i=>found.add(i));
    else if (typeof js.image === 'string') found.add(js.image);
  }

  // OpenGraph
  const ogImage = extractOg(html, 'og:image');
  if (ogImage) found.add(ogImage);

  // data in inline scripts (naive search for "image" arrays)
  const inlineMatches = [...html.matchAll(/\bimage[s]?\b"?\s*[:=]\s*(\[[^\]]+\])/gi)];
  for (const m of inlineMatches) {
    try {
      const arr = JSON.parse(m[1].replace(/(['"])\s*\+/g, '"'));
      if (Array.isArray(arr)) arr.forEach(i=>found.add(String(i)));
    } catch (e) {}
  }

    // fallback: find large images by pattern (alicdn)
    const srcMatches = [...html.matchAll(/https?:\/\/[^"'<>\s]+(?:\.(?:jpg|png|webp))(?:\?[^"'<>\s]*)?/gi)];
  for (const m of srcMatches) found.add(m[0]);

  // normalize protocol-less URLs
  return Array.from(found).map(u => u.startsWith('//') ? 'https:' + u : u);
}

async function downloadImage(url, dest) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`bad status ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(dest, buf);
    return true;
  } catch (e) {
    console.warn('Failed to download', url, e.message || e);
    return false;
  }
}

async function ensureDirs() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function main() {
  console.log('Scraping AliExpress product pages (may fail if remote blocks requests)...');
  await ensureDirs();
  const results = [];

  for (const p of PRODUCTS) {
    console.log('\nProcessing', p.slug, p.url);
    try {
      const html = await fetchText(p.url);
      const images = extractImageUrlsFromHtml(html).slice(0, 6);
      const title = extractOg(html, 'og:title') || (extractJsonLd(html)?.name) || p.slug;
      const description = extractOg(html, 'og:description') || (extractJsonLd(html)?.description) || '';
      let price = null;
      const ld = extractJsonLd(html);
      if (ld && ld.offers && ld.offers.price) price = ld.offers.price;

      const saved = [];
      for (let i = 0; i < images.length; i++) {
        const url = images[i];
        const ext = pickExt(url);
        const filename = `${p.slug}-${i+1}${ext}`;
        const dest = path.join(OUT_DIR, filename);
        const ok = await downloadImage(url, dest);
        if (ok) saved.push(`/img/products/${filename}`);
      }

      const entry = { slug: p.slug, url: p.url, title, description, price, images: saved };
      results.push(entry);
      console.log(' -> found', title, 'images:', saved.length);
    } catch (e) {
      console.error('Error processing', p.slug, e?.message || e);
    }
  }

  const outFile = path.join(DATA_DIR, 'scraped_products.json');
  await fs.writeFile(outFile, JSON.stringify(results, null, 2), 'utf8');
  console.log('\nSaved scraped metadata to', outFile);
  console.log('Done. Review downloaded images in public/img/products and update product entries as needed.');
}

main().catch((e)=>{ console.error(e); process.exit(1); });
