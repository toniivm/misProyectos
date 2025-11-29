import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import sgMail from '@sendgrid/mail';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

// Init clients
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    })
  });
}
const db = admin.firestore();
if (process.env.SENDGRID_API_KEY) sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = process.env.PORT || 8080;

// Security
app.use(helmet({
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
}));
app.use(cors({ origin: '*', methods: ['GET','POST','PATCH','OPTIONS'] }));
app.use(morgan('combined'));

// Stripe webhook must use raw body
app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Schemas
const createIntentSchema = Joi.object({
  items: Joi.array().items(Joi.object({ id: Joi.string().required(), qty: Joi.number().min(1).required(), price: Joi.number().min(0).required(), name: Joi.string().required() })).min(1).required(),
  currency: Joi.string().default('eur'),
  email: Joi.string().email().required(),
  shipping: Joi.object({ name: Joi.string().required(), address: Joi.object({ line1: Joi.string().required(), city: Joi.string().required(), postal_code: Joi.string().required(), country: Joi.string().required() }).required() }).required()
});

// Helpers
function calcAmount(items){
  return items.reduce((sum, it) => sum + Math.round(it.price * 100) * it.qty, 0);
}

// Create Payment Intent
app.post('/payments/create-intent', async (req, res) => {
  const { error, value } = createIntentSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: 'INVALID_PAYLOAD', details: error.details });
  const { items, currency, email, shipping } = value;

  try {
    const amount = calcAmount(items);
    const idempotencyKey = req.headers['idempotency-key'] || uuidv4();

    // Create order placeholder (pending)
    const orderRef = db.collection('orders').doc();
    const orderData = { status: 'pending', email, items, amount, currency, shipping, createdAt: admin.firestore.FieldValue.serverTimestamp() };
    await orderRef.set(orderData);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: email,
      metadata: { orderId: orderRef.id }
    }, { idempotencyKey });

    res.json({ clientSecret: paymentIntent.client_secret, orderId: orderRef.id });
  } catch (e) {
    console.error('create-intent error', e);
    res.status(500).json({ error: 'INTENT_ERROR' });
  }
});

// Stripe webhook
app.post('/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        const orderId = pi.metadata?.orderId;
        if (orderId) {
          await db.collection('orders').doc(orderId).set({ status: 'paid', paymentIntentId: pi.id, paidAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object;
        const orderId = pi.metadata?.orderId;
        if (orderId) {
          await db.collection('orders').doc(orderId).set({ status: 'failed', paymentIntentId: pi.id, failedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
        }
        break;
      }
      default:
        // ignore
        break;
    }
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook handling error', err);
    res.status(500).send('Webhook handler failed');
  }
});

// Email: order confirmation
app.post('/emails/order-confirmation', async (req, res) => {
  if (!process.env.SENDGRID_API_KEY) return res.status(501).json({ error: 'EMAIL_DISABLED' });
  const { orderId } = req.body || {};
  if (!orderId) return res.status(400).json({ error: 'MISSING_ORDER_ID' });
  const orderSnap = await db.collection('orders').doc(orderId).get();
  if (!orderSnap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  const order = orderSnap.data();
  const to = order.email;
  const total = (order.amount / 100).toFixed(2);

  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject: `Confirmación de pedido #${orderId}`,
    html: `<h1>Gracias por tu compra</h1><p>Pedido #${orderId}</p><p>Total: ${total} ${order.currency.toUpperCase()}</p>`
  };
  try {
    await sgMail.send(msg);
    res.json({ ok: true });
  } catch (e) {
    console.error('Send email error', e);
    res.status(500).json({ error: 'EMAIL_ERROR' });
  }
});

app.listen(port, () => {
  console.log(`VALTREX backend listening on :${port}`);
});
