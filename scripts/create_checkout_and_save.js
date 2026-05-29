const https = require('https');
const fs = require('fs');
const tmpDir = 'tmp';
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const payload = {
  items: [{ id: 'sleepband-pro', qty: 1, price: 69, name: 'Noctive Halo' }],
  currency: 'eur',
  email: 'test@noctive.com',
  shipping: { name: 'Tester', address: { line1: 'C/ Test 1', city: 'Madrid', postal_code: '28001', country: 'ES' } },
  successUrl: 'https://valtre-73c7b.web.app/checkout?status=success&orderId={ORDER_ID}',
  cancelUrl: 'https://valtre-73c7b.web.app/checkout?status=cancel',
  paymentMethod: 'card'
};

function createSession() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'misproyectos-neyj.onrender.com',
      port: 443,
      path: '/payments/create-checkout-session',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'User-Agent': 'NodeTest/1.0'
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

(async () => {
  try {
    const r = await createSession();
    if (r.statusCode === 200) {
      const parsed = JSON.parse(r.body);
      if (parsed.url) {
        fs.writeFileSync('tmp/session_url.txt', parsed.url, 'utf8');
        console.log('Saved session URL to tmp/session_url.txt');
        console.log(parsed.url);
        process.exit(0);
      }
    }
    console.error('Failed to create session', r.statusCode, r.body);
    process.exit(1);
  } catch (e) {
    console.error('ERROR', e.message || e);
    process.exit(2);
  }
})();