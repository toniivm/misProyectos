const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 10000);
const root = path.join(__dirname, 'out');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function resolvePath(requestPath) {
  const cleanPath = decodeURIComponent((requestPath || '/').split('?')[0]);
  const basePath = cleanPath === '/' ? '/index.html' : cleanPath;
  const candidatePaths = [path.join(root, basePath)];

  if (!path.extname(basePath)) {
    candidatePaths.push(path.join(root, basePath, 'index.html'));
    candidatePaths.push(path.join(root, `${basePath}.html`));
  }

  return candidatePaths.find((candidatePath) => {
    try {
      return fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile();
    } catch {
      return false;
    }
  });
}

http
  .createServer((req, res) => {
    const filePath = resolvePath(req.url);

    if (!filePath) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    res.setHeader(
      'Content-Type',
      mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    );

    fs.createReadStream(filePath).pipe(res);
  })
  .listen(port, '0.0.0.0', () => {
    console.log(`Static storefront available on http://0.0.0.0:${port}`);
  });