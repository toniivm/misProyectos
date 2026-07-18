import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getDb } from '../../../../lib/firebase'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

const stripeSecret = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!stripeSecret) {
  console.warn('⚠ STRIPE_SECRET_KEY not set — webhook will not work')
}

const stripe = stripeSecret ? new Stripe(stripeSecret) : null

export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    console.error('Stripe webhook not configured (missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET)')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  // Read raw body for signature verification
  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    console.error('Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Only handle checkout.session.completed
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const sessionId = session.id

  const db = getDb()
  if (!db) {
    console.error(`Firestore not available — cannot write order for session ${sessionId}`)
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  // Idempotency: check if order already exists
  const orderRef = doc(db, 'orders', sessionId)
  const existing = await getDoc(orderRef)
  if (exists(existing)) {
    return NextResponse.json({ received: true, message: 'Order already processed' })
  }

  // Parse items from metadata
  let items: { id: string; name: string; price: number; qty: number }[] = []
  try {
    const itemsJson = session.metadata?.items_json
    if (itemsJson) {
      items = JSON.parse(itemsJson)
    }
  } catch {
    console.error(`Failed to parse items_json for session ${sessionId}`)
  }

  // Fallback: if no items in metadata, extract from line_items
  if (items.length === 0 && session.line_items) {
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
      items = lineItems.data.map((li) => ({
        id: li.description || li.price?.product?.toString() || 'unknown',
        name: li.description || 'Product',
        price: (li.amount_total || 0) / (li.quantity || 1) / 100,
        qty: li.quantity || 1,
      }))
    } catch (err) {
      console.error(`Failed to list line items for session ${sessionId}:`, err)
    }
  }

  const email = session.customer_details?.email?.toLowerCase() || session.customer_email?.toLowerCase() || ''

  try {
    await setDoc(orderRef, {
      email,
      status: 'paid',
      items,
      stripe_session_id: sessionId,
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency || 'eur',
      shipping: (session as any).shipping_details || null,
      createdAt: serverTimestamp(),
    })

    console.log(`✅ Order created for session ${sessionId} — email: ${email}, items: ${items.length}`)
  } catch (err) {
    console.error(`❌ Failed to write order for session ${sessionId}:`, err)
    return NextResponse.json({ error: 'Failed to write order' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

function exists(docSnap: any): boolean {
  return docSnap && docSnap.exists()
}
