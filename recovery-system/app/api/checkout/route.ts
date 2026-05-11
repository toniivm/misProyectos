import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[checkout] STRIPE_SECRET_KEY is not set');
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Payment service not configured' },
      { status: 503 },
    );
  }

  try {
    const body = await req.json();
    const { items, locale = 'en' } = body as {
      items: Array<{ slug: string; name: string; price: number; icon?: string; quantity: number }>;
      locale: string;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate amounts server-side — never trust client prices in a real system.
    // TODO: replace PRODUCT_PRICES with a Firestore lookup once catalogue is in DB.
    const PRODUCT_PRICES: Record<string, number> = {
      'pulse-pro-x': 89,
      cerviflex: 59,
      sleepseal: 29,
    };

    const lineItems = items.map((item) => {
      const serverPrice = PRODUCT_PRICES[item.slug];
      if (serverPrice === undefined) {
        throw new Error(`Unknown product: ${item.slug}`);
      }
      return {
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(serverPrice * 100),
          product_data: { name: item.name },
        },
        quantity: Math.max(1, Math.floor(item.quantity)),
      };
    });

    const origin =
      req.headers.get('origin') ??
      process.env.NEXT_PUBLIC_APP_URL ??
      'https://valtre.onrender.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}?cancelled=1`,
      // Stripe-hosted page language
      locale: locale === 'es' ? 'es' : 'en',
      // Collect shipping address inside Stripe UI
      shipping_address_collection: {
        allowed_countries: ['ES', 'GB', 'FR', 'DE', 'IT', 'PT', 'US'],
      },
      phone_number_collection: { enabled: true },
      // Allow discount codes
      allow_promotion_codes: true,
      // Apple Pay / Google Pay enabled by default with payment_method_types omitted
      payment_method_configuration: undefined,
      metadata: {
        locale,
        items: JSON.stringify(
          items.map((i) => ({ slug: i.slug, qty: i.quantity })),
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('[checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
