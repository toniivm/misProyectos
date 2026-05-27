(async function(){
  try{
    const backend = 'https://misproyectos-neyj.onrender.com';
    const url = backend + '/payments/create-checkout-session';
    const payload = {
      items: [{ id: 'cerviflex', qty: 1, price: 59, name: 'CerviFlex' }],
      currency: 'eur',
      email: 'tonivfortnite@gmail.com',
      shipping: { name: 'Toni', address: { line1: 'Calle Falsa 123', city: 'Madrid', postal_code: '28001', country: 'ES' } }
    };
    console.log('Posting to', url);
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const text = await res.text();
    console.log('Status:', res.status);
    let json = null;
    try { json = JSON.parse(text); console.log('Body JSON:', json); } catch (e) { console.log('Body text:', text); }

    if (!json || !json.orderId) {
      console.error('No order/session created, aborting webhook test');
      process.exit(2);
    }

    const { orderId, sessionId } = json;
    const webhookUrl = 'https://misproyectos-neyj.onrender.com/stripe/webhook';
    const event = {
      id: 'evt_test_manual_' + Date.now(),
      object: 'event',
      type: 'checkout.session.completed',
      data: { object: { id: sessionId, metadata: { orderId } } }
    };

    console.log('Posting webhook to', webhookUrl, 'event:', event.type);
    const whRes = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(event) });
    const whText = await whRes.text();
    console.log('Webhook status:', whRes.status);
    try { console.log('Webhook body JSON:', JSON.parse(whText)); } catch (e) { console.log('Webhook body text:', whText); }

      // Force sending order confirmation email (public endpoint)
      try {
        const emailRes = await fetch('https://misproyectos-neyj.onrender.com/emails/order-confirmation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId, email: 'tonivfortnite@gmail.com' }) });
        const emailText = await emailRes.text();
        console.log('Email endpoint status:', emailRes.status);
        try { console.log('Email endpoint JSON:', JSON.parse(emailText)); } catch (e) { console.log('Email endpoint text:', emailText); }
      } catch (e) { console.error('Email endpoint error', e); }
  } catch (e) {
    console.error('Script error', e);
    process.exit(1);
  }
})();
