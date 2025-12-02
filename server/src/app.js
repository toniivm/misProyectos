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
import rateLimit from 'express-rate-limit';

const skipExternal = !!process.env.SKIP_EXTERNAL;

// Init external clients (or mocks)
let stripe;
if (!skipExternal) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', { apiVersion: '2024-06-20' });
} else {
  stripe = { paymentIntents: { create: async ({ amount, currency, metadata }) => ({ client_secret: 'test_client_secret_'+Date.now(), id: 'pi_test_'+Date.now(), amount, currency, metadata }) }, webhooks: { constructEvent: () => ({ type: 'payment_intent.succeeded', data: { object: { id: 'pi_test', metadata: { orderId: 'order_mock' } } } }) } };
}

let db;
if (!skipExternal) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      })
    });
  }
  db = admin.firestore();
  if (process.env.SENDGRID_API_KEY) sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  // In-memory mock store
  const store = { orders: {}, products: { '1': { stock: 10 }, '2': { stock: 5 } } };
  db = {
    collection(name){
      return {
        doc(id){
          const _id = id || Math.random().toString(36).slice(2);
          return {
            id: _id,
            async set(data, opts){
              if (name === 'orders') {
                store.orders[_id] = { ...(store.orders[_id]||{}), ...data };
              } else if (name === 'products') {
                store.products[_id] = { ...(store.products[_id]||{}), ...data };
              }
            },
            async get(){
              const data = name === 'orders' ? store.orders[_id] : store.products[_id];
              return { exists: !!data, data: () => data };
            }
          };
        },
        async orderBy(){ return this; },
        async limit(){ return this; },
        async get(){
          const arr = Object.entries(name === 'orders' ? store.orders : store.products).map(([id,data]) => ({ id, data: () => data }));
          return { docs: arr };
        }
      };
    },
    runTransaction: async (fn) => {
      const tx = {
        async get(ref){ return ref.get(); },
        update(ref, data){ ref.set(data, { merge: true }); }
      };
      await fn(tx);
    }
  };
  // Minimal substitute for admin.firestore.FieldValue.serverTimestamp()
  admin.FieldValue = { serverTimestamp: () => new Date() };
}

const app = express();
app.use(helmet({ crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' } }));
app.use(cors({ origin: '*', methods: ['GET','POST','PATCH','OPTIONS'] }));
app.use(rateLimit({ windowMs: 15*60*1000, max: 200 }));
app.use(morgan('dev'));
app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Schemas
const createIntentSchema = Joi.object({
  items: Joi.array().items(Joi.object({ id: Joi.string().required(), qty: Joi.number().min(1).required(), price: Joi.number().min(0).required(), name: Joi.string().required() })).min(1).required(),
  currency: Joi.string().default('eur'),
  email: Joi.string().email().required(),
  shipping: Joi.object({ name: Joi.string().required(), address: Joi.object({ line1: Joi.string().required(), city: Joi.string().required(), postal_code: Joi.string().required(), country: Joi.string().required() }).required() }).required()
});

const orderUpdateSchema = Joi.object({
  status: Joi.string().valid('pending','paid','processing','packed','shipped','delivered','cancelled').optional(),
  trackingNumber: Joi.string().max(64).optional(),
  carrier: Joi.string().max(64).optional()
}).min(1);

function adminAuth(req,res,next){
  const key = req.headers['x-admin-key'];
  if (!process.env.ADMIN_API_KEY) return res.status(501).json({ error: 'ADMIN_DISABLED' });
  if (!key || key !== process.env.ADMIN_API_KEY) return res.status(403).json({ error: 'FORBIDDEN' });
  next();
}

function calcAmount(items){
  return items.reduce((sum, it) => sum + Math.round(it.price * 100) * it.qty, 0);
}
async function verifyInventory(items){
  const productItems = items.filter(it => !it.id.startsWith('shipping:'));
  for (const it of productItems){
    const snap = await db.collection('products').doc(it.id).get();
    if (!snap.exists) throw new Error(`NO_PRODUCT:${it.id}`);
    const data = snap.data();
    if (typeof data.stock !== 'number') throw new Error(`NO_STOCK_FIELD:${it.id}`);
    if (data.stock < it.qty) throw new Error(`OUT_OF_STOCK:${it.id}`);
  }
}
async function decrementInventory(items){
  const productItems = items.filter(it => !it.id.startsWith('shipping:'));
  if (!productItems.length) return;
  await db.runTransaction(async (tx) => {
    for (const it of productItems){
      const ref = db.collection('products').doc(it.id);
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error(`NO_PRODUCT:${it.id}`);
      const data = snap.data();
      if (data.stock < it.qty) throw new Error(`RACE_OUT_OF_STOCK:${it.id}`);
      const newStock = data.stock - it.qty;
      ref.set({ stock: newStock }, { merge: true });
    }
  });
}

app.get('/health', (_req,res) => res.json({ ok: true, test: skipExternal }));

app.post('/payments/create-intent', async (req,res) => {
  const { error, value } = createIntentSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: 'INVALID_PAYLOAD', details: error.details });
  const { items, currency, email, shipping } = value;
  try {
    await verifyInventory(items);
    const amount = calcAmount(items);
    const idempotencyKey = req.headers['idempotency-key'] || uuidv4();
    const orderRef = db.collection('orders').doc();
    const orderData = { status: 'pending', email, items, amount, currency, shipping, createdAt: new Date() };
    await orderRef.set(orderData);
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency, receipt_email: email, metadata: { orderId: orderRef.id } }, { idempotencyKey });
    res.json({ clientSecret: paymentIntent.client_secret, orderId: orderRef.id });
  } catch (e){
    if (e.message?.startsWith('OUT_OF_STOCK')) return res.status(409).json({ error: 'OUT_OF_STOCK', detail: e.message });
    if (e.message?.startsWith('NO_PRODUCT')) return res.status(404).json({ error: 'PRODUCT_NOT_FOUND', detail: e.message });
    res.status(500).json({ error: 'INTENT_ERROR' });
  }
});

app.get('/orders', adminAuth, async (req,res) => {
  const snap = await db.collection('orders').get();
  const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json({ orders });
});

app.patch('/orders/:id', adminAuth, async (req,res) => {
  const { error, value } = orderUpdateSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: 'INVALID_UPDATE', details: error.details });
  const ref = db.collection('orders').doc(req.params.id);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  await ref.set({ ...value, updatedAt: new Date() }, { merge: true });
  const updated = await ref.get();
  res.json({ order: { id: req.params.id, ...updated.data() } });
});

// Email helpers
async function sendEmail(to, subject, html){
  if (skipExternal || !process.env.SENDGRID_API_KEY) return;
  try {
    await sgMail.send({ to, from: process.env.SENDER_EMAIL, subject, html });
  } catch (e){
    console.error('Email send error', e);
  }
}

// Workflow endpoints
app.post('/orders/:id/pack', adminAuth, async (req,res) => {
  const ref = db.collection('orders').doc(req.params.id);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  const order = snap.data();
  if (!['paid','processing'].includes(order.status)) return res.status(409).json({ error: 'INVALID_STATE' });
  await ref.set({ status: 'packed', packedAt: new Date() }, { merge: true });
  res.json({ ok: true });
});

app.post('/orders/:id/ship', adminAuth, async (req,res) => {
  const { trackingNumber, carrier } = req.body || {};
  if (!trackingNumber || !carrier) return res.status(400).json({ error: 'MISSING_FIELDS' });
  const ref = db.collection('orders').doc(req.params.id);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  const order = snap.data();
  if (order.status !== 'packed') return res.status(409).json({ error: 'INVALID_STATE' });
  await ref.set({ status: 'shipped', trackingNumber, carrier, shippedAt: new Date() }, { merge: true });
  // Send shipment notification
  await sendEmail(
    order.email,
    `📦 Tu pedido #${req.params.id} ha sido enviado`,
    `<h1>¡Tu pedido está en camino!</h1><p>Pedido: <strong>#${req.params.id}</strong></p><p>Transportista: ${carrier}</p><p>Nº seguimiento: <strong>${trackingNumber}</strong></p><p>Recibirás tu pedido pronto.</p>`
  );
  res.json({ ok: true });
});

app.post('/orders/:id/deliver', adminAuth, async (req,res) => {
  const ref = db.collection('orders').doc(req.params.id);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  const order = snap.data();
  if (order.status !== 'shipped') return res.status(409).json({ error: 'INVALID_STATE' });
  await ref.set({ status: 'delivered', deliveredAt: new Date() }, { merge: true });
  // Send delivery confirmation
  await sendEmail(
    order.email,
    `✅ Tu pedido #${req.params.id} ha sido entregado`,
    `<h1>¡Pedido entregado!</h1><p>Pedido: <strong>#${req.params.id}</strong></p><p>Tu pedido ha sido entregado con éxito.</p><p>Gracias por tu confianza en VALTREX.</p>`
  );
  res.json({ ok: true });
});

// Order confirmation email (called by frontend after successful payment)
app.post('/emails/order-confirmation', async (req,res) => {
  const { orderId, email } = req.body;
  if (!orderId || !email) return res.status(400).json({ error: 'MISSING_FIELDS' });
  
  const ref = db.collection('orders').doc(orderId);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  
  const order = snap.data();
  const itemsList = order.items.map(it => `<li>${it.name} x${it.qty} - €${(it.price * it.qty).toFixed(2)}</li>`).join('');
  const total = (order.amount / 100).toFixed(2);
  
  await sendEmail(
    email,
    `✅ Confirmación de pedido #${orderId} - VALTREX`,
    `<h1>¡Gracias por tu pedido!</h1>
    <p>Pedido: <strong>#${orderId}</strong></p>
    <h3>Artículos:</h3>
    <ul>${itemsList}</ul>
    <p><strong>Total: €${total}</strong></p>
    <p>Recibirás un email cuando tu pedido sea enviado.</p>
    <p>Gracias por confiar en VALTREX.</p>`
  );
  
  res.json({ ok: true });
});

export { app, db, skipExternal };
