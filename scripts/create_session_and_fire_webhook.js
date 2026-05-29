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

function post(path, data, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const d = typeof data === 'string' ? data : JSON.stringify(data);
    const options = {
      hostname: 'misproyectos-neyj.onrender.com',
      port: 443,
      path,
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(d) }, extraHeaders),
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on('error', (e) => reject(e));
    req.write(d);
    req.end();
  });
}

(async () => {
  try {
    console.log('Creating checkout session...');
    const r = await post('/payments/create-checkout-session', payload);
    console.log('Create session status:', r.statusCode);
    let parsed;
    try { parsed = JSON.parse(r.body); } catch (e) { console.error('Failed parsing response body', r.body); process.exit(2); }
    fs.writeFileSync('tmp/session_response.json', JSON.stringify(parsed, null, 2), 'utf8');
    console.log('Saved tmp/session_response.json');

    const orderId = parsed.orderId || (parsed?.session && parsed.session.metadata && parsed.session.metadata.orderId) || null;
    const sessionId = parsed.sessionId || parsed.sessionId || parsed.session?.id || parsed.id || (parsed.session && parsed.session.id) || null;

    if (!orderId) {
      console.error('No orderId in response, cannot simulate webhook. Response:', parsed);
      process.exit(3);
    }

    const event = {
      id: 'evt_test_' + Date.now(),
      type: 'checkout.session.completed',
      data: {
        object: {
          id: sessionId || ('cs_test_' + Date.now()),
          metadata: { orderId }
        }
      }
    };

    console.log('Sending simulated webhook event for orderId:', orderId);
    const w = await post('/stripe/webhook', JSON.stringify(event), { 'Content-Type': 'application/json' });
    console.log('Webhook response status:', w.statusCode);
    console.log('Webhook response body:', w.body);
    fs.writeFileSync('tmp/webhook_response.json', JSON.stringify({ webhookStatus: w.statusCode, webhookBody: w.body }, null, 2), 'utf8');
    console.log('Saved tmp/webhook_response.json');
    process.exit(0);
  } catch (e) {
    console.error('ERROR', e.message || e);
    process.exit(4);
  }
})();
