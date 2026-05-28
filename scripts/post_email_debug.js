(async () => {
  try {
    const url = 'https://misproyectos-neyj.onrender.com/emails/order-confirmation';
    const payload = { orderId: 'v50djv4kyPuz0zFcltyh', email: 'tonivfortnite@gmail.com' };
    console.log('POST', url);
    console.log('Payload:', JSON.stringify(payload));
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    console.log('Status:', res.status);
    console.log('Headers:');
    for (const h of res.headers) console.log(' ', h[0] + ': ' + h[1]);
    const text = await res.text();
    console.log('Body length:', text ? text.length : 0);
    console.log('Body:', text);
    try { console.log('Parsed JSON:', JSON.parse(text)); } catch (e) { /* not JSON */ }
  } catch (err) {
    console.error('Request error:', err && err.message ? err.message : err);
  }
})();
