const https = require('https');
const http = require('http');
const urls = [
  'https://valtre.onrender.com/health',
  'https://valtre-backend.onrender.com/health',
  'https://valtre-73c7b.onrender.com/health',
  'https://valtre-backend.valtre.onrender.com/health',
  'http://valtre.onrender.com/health'
];

function check(u){
  return new Promise((resolve) => {
    try {
      const lib = u.startsWith('https') ? https : http;
      const req = lib.get(u, (res) => {
        let b = '';
        res.on('data', (c) => (b += String(c)));
        res.on('end', () => resolve({ url: u, statusCode: res.statusCode, body: b.slice(0,400) }));
      });
      req.on('error', (e) => resolve({ url: u, error: e.message }));
      req.setTimeout(10000, () => {
        req.abort();
        resolve({ url: u, error: 'timeout' });
      });
    } catch (e) {
      resolve({ url: u, error: e.message });
    }
  });
}

(async () => {
  const results = await Promise.all(urls.map(check));
  console.log(JSON.stringify(results, null, 2));
})();
