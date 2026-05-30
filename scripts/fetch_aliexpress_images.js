const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchHtml(url){
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(url, dest){
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main(){
  const items = [
    { url: 'https://es.aliexpress.com/item/1005006125125031.html', slug: 'sleep-headband' },
    { url: 'https://es.aliexpress.com/item/1005006678112450.html', slug: 'neck-massager' },
  ];

  const outDir = path.join(__dirname, '..', 'recovery-system', 'public', 'images', 'products');
  fs.mkdirSync(outDir, { recursive: true });

  for (const it of items){
    try{
      console.log('Fetching', it.url);
      const html = await fetchHtml(it.url);
      const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i);
      const imageUrl = m ? m[1] : null;
      if (!imageUrl) {
        console.warn('No og:image found for', it.url);
        continue;
      }
      const ext = path.extname(new URL(imageUrl).pathname).split('?')[0] || '.jpg';
      const dest = path.join(outDir, `${it.slug}${ext}`);
      console.log('Downloading image', imageUrl, '->', dest);
      await downloadImage(imageUrl, dest);
      console.log('Saved', dest);
    }catch(e){
      console.error('Error processing', it.url, e.message || e);
    }
  }
}

if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
