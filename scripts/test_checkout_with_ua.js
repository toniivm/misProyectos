const https = require('https');

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
    console.log('STATUS', r.statusCode);
    try {
      console.log(JSON.stringify(JSON.parse(r.body), null, 2));
    } catch (e) {
      console.log('BODY', r.body);
    }
  } catch (e) {
    console.error('ERROR', e.message || e);
  }
})();