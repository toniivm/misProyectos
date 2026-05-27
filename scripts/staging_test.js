(async function(){
  try {
    const backend = 'https://misproyectos-neyj.onrender.com';
    const createUrl = backend + '/payments/create-intent';
    const webhookUrl = backend + '/stripe/webhook';

    const payload = {
      items: [{ id: 'cerviflex', qty: 1, price: 59, name: 'CerviFlex' }],
      currency: 'eur',
      email: 'toniuve7@gmail.com',
      shipping: { name: 'Toni', address: { line1: 'Calle Falsa 123', city: 'Madrid', postal_code: '28001', country: 'ES' } }
    };

    console.log('Creating order...');
    const res = await fetch(createUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    console.log('Create response:', JSON.stringify(json));
    if (!json.orderId) {
      console.error('No orderId in response');
      process.exit(2);
    }

    const orderId = json.orderId;
    const event = {
      id: 'evt_test_manual_'+Date.now(),
      object: 'event',
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_test_manual_'+Date.now(),
          metadata: { orderId }
        }
      }
    };

    console.log('Sending webhook event for order', orderId);
    const wh = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(event) });
    const whJson = await wh.text();
    console.log('Webhook response status:', wh.status, 'body:', whJson);
    process.exit(0);
  } catch (e) {
    console.error('Error in staging test:', e.message || e);
    process.exit(1);
  }
})();
