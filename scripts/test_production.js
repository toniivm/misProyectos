const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve) => {
    try {
      const lib = url.startsWith('https://') ? https : http;
      const req = lib.get(url, (res) => {
        let body = '';
        res.on('data', (c) => (body += String(c)));
        res.on('end', () => resolve({ url, statusCode: res.statusCode, body }));
      });
      req.on('error', (e) => resolve({ url, error: e.message }));
      req.setTimeout(15000, () => {
        req.abort();
        resolve({ url, error: 'timeout' });
      });
    } catch (e) {
      resolve({ url, error: e.message });
    }
  });
}

function postJson(url, data) {
  return new Promise((resolve) => {
    try {
      const lib = url.startsWith('https://') ? https : http;
      const u = new URL(url);
      const payload = JSON.stringify(data);
      const opts = {
        hostname: u.hostname,
        port: u.port || (u.protocol === 'https:' ? 443 : 80),
        path: u.pathname + u.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };
      const req = lib.request(opts, (res) => {
        let body = '';
        res.on('data', (c) => (body += String(c)));
        res.on('end', () => resolve({ url, statusCode: res.statusCode, body }));
      });
      req.on('error', (e) => resolve({ url, error: e.message }));
      req.setTimeout(20000, () => {
        req.abort();
        resolve({ url, error: 'timeout' });
      });
      req.write(payload);
      req.end();
    } catch (e) {
      resolve({ url, error: e.message });
    }
  });
}

(async () => {
  console.log('Testing production endpoints...');
  const health = await fetchUrl('https://misproyectos-neyj.onrender.com/health');
  const apple = await fetchUrl('https://valtre-73c7b.web.app/.well-known/apple-developer-merchantid-domain-association');

  const payload = {
    items: [{ id: 'sleepband-pro', qty: 1, price: 69, name: 'Noctive Halo' }],
    currency: 'eur',
    email: 'test@noctive.com',
    shipping: { name: 'Tester', address: { line1: 'C/ Test 1', city: 'Madrid', postal_code: '28001', country: 'ES' } },
    successUrl: 'https://valtre-73c7b.web.app/checkout?status=success&orderId={ORDER_ID}',
    cancelUrl: 'https://valtre-73c7b.web.app/checkout?status=cancel',
    paymentMethod: 'card',
  };

  const session = await postJson('https://misproyectos-neyj.onrender.com/payments/create-checkout-session', payload);

  console.log('\n--- RESULT ---');
  console.log('health:', JSON.stringify(health, null, 2));
  console.log('apple file:', JSON.stringify({ url: apple.url, status: apple.statusCode, bodyPreview: (apple.body || '').slice(0, 200) }, null, 2));
  try {
    const parsed = JSON.parse(session.body || '{}');
    console.log('checkout session:', JSON.stringify({ status: session.statusCode, sessionId: parsed.sessionId, url: parsed.url, orderId: parsed.orderId }, null, 2));
    if (parsed.url && parsed.url.includes('checkout.stripe.com')) {
      console.log('=> Stripe Checkout appears to be real (checkout.stripe.com)');
    } else {
      console.log('=> Checkout session appears mocked or uses frontend redirect (not real Stripe checkout URL)');
    }
  } catch (e) {
    console.log('checkout session raw:', JSON.stringify(session, null, 2));
  }
})();
