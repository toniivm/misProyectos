import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_PRIVATE_KEY;
if (!stripeSecret) {
  // We intentionally do not crash the server at import time in case env is set later,
  // but attempts to create sessions will return a clear error.
}

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return new Response(JSON.stringify({ error: 'Stripe not configured on server' }), { status: 500 });
    }

    const body = await req.json();
    const items = Array.isArray(body.items) ? body.items : [];

    const line_items = items.map((i: any) => ({
      price_data: {
        currency: (body.currency || 'eur').toLowerCase(),
        product_data: { name: String(i.name || i.id || 'Product') },
        unit_amount: Math.round(Number(i.price || 0) * 100),
      },
      quantity: Number(i.qty || 1),
    }));

    const origin = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || null;
    const defaultBase = origin || `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`;
    const successUrl = body.successUrl || `${defaultBase}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = body.cancelUrl || `${defaultBase}/checkout`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error('create-checkout-session error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
