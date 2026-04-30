const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const buildDir = path.join(__dirname, '..', 'build');

function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  // gzip
  try {
    const gz = zlib.gzipSync(buffer, { level: 9 });
    fs.writeFileSync(filePath + '.gz', gz);
    console.log('gzipped', filePath);
  } catch (e) {
    console.error('gzip failed', filePath, e.message);
  }

  // brotli (node >= 10.16)
  try {
    const br = zlib.brotliCompressSync(buffer, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      }
    });
    fs.writeFileSync(filePath + '.br', br);
    console.log('brotli', filePath);
  } catch (e) {
    console.error('brotli failed', filePath, e.message);
  }
}

function walk(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (stat.isFile()) {
      const ext = path.extname(full).toLowerCase();
      if (['.js', '.css', '.html', '.svg', '.json', '.txt', '.map'].includes(ext)) {
        compressFile(full);
      }
    }
  }
}

if (fs.existsSync(buildDir)) {
  walk(buildDir);
  console.log('Compression finished');
} else {
  console.error('Build directory not found:', buildDir);
  process.exitCode = 1;
}
