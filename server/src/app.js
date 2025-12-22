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
import PRODUCTS from './products.js';

function parseBool(value) {
  if (value == null) return false;
  const s = String(value).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
}

const skipExternal = parseBool(process.env.SKIP_EXTERNAL);
const isProd = (process.env.NODE_ENV || 'production') === 'production';

const externalStatus = {
  skipExternal,
  stripe: { enabled: false, reason: null },
  firebase: { enabled: false, reason: null },
  sendgrid: { enabled: false, reason: null },
};

function createMockDb() {
  // In-memory mock store
  const store = { orders: {}, products: { '1': { stock: 10 }, '2': { stock: 5 } } };
  return {
    collection(name) {
      return {
        doc(id) {
          const _id = id || Math.random().toString(36).slice(2);
          return {
            id: _id,
            async set(data) {
              if (name === 'orders') {
                store.orders[_id] = { ...(store.orders[_id] || {}), ...data };
              } else if (name === 'products') {
                store.products[_id] = { ...(store.products[_id] || {}), ...data };
              }
            },
            async get() {
              const data = name === 'orders' ? store.orders[_id] : store.products[_id];
              return { exists: !!data, data: () => data };
            },
          };
        },
        async get() {
          const arr = Object.entries(name === 'orders' ? store.orders : store.products).map(([id, data]) => ({ id, data: () => data }));
          return { docs: arr };
        },
      };
    },
    runTransaction: async (fn) => {
      const tx = {
        async get(ref) { return ref.get(); },
        update(ref, data) { ref.set(data, { merge: true }); },
      };
      await fn(tx);
    },
  };
}

function missingEnv(keys) {
  return keys.filter((k) => !process.env[k] || !String(process.env[k]).trim());
}

function normalizeServiceAccount(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = { ...obj };
  if (typeof out.private_key === 'string') out.private_key = out.private_key.replace(/\\n/g, '\n');
  if (typeof out.project_id === 'string') out.project_id = out.project_id.trim();
  return out;
}

// Init external clients (or mocks)
let stripe;
if (!skipExternal) {
  if (process.env.STRIPE_SECRET_KEY && String(process.env.STRIPE_SECRET_KEY).trim()) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    externalStatus.stripe.enabled = true;
  } else if (!isProd) {
    stripe = new Stripe('sk_test_dummy', { apiVersion: '2024-06-20' });
    externalStatus.stripe.enabled = true;
    externalStatus.stripe.reason = 'Using dummy Stripe key (development only)';
  } else {
    stripe = null;
    externalStatus.stripe.enabled = false;
    externalStatus.stripe.reason = 'Missing STRIPE_SECRET_KEY';
  }
} else {
  stripe = { paymentIntents: { create: async ({ amount, currency, metadata }) => ({ client_secret: 'test_client_secret_'+Date.now(), id: 'pi_test_'+Date.now(), amount, currency, metadata }) }, webhooks: { constructEvent: () => ({ type: 'payment_intent.succeeded', data: { object: { id: 'pi_test', metadata: { orderId: 'order_mock' } } } }) } };
  externalStatus.stripe.enabled = true;
  externalStatus.stripe.reason = 'SKIP_EXTERNAL enabled';
}

let db;
if (!skipExternal) {
  try {
    let serviceAccount = null;

    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      serviceAccount = normalizeServiceAccount(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
    } else {
      const missing = missingEnv(['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY']);
      if (!missing.length) {
        serviceAccount = normalizeServiceAccount({
          project_id: process.env.FIREBASE_PROJECT_ID,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          private_key: process.env.FIREBASE_PRIVATE_KEY,
        });
      } else {
        externalStatus.firebase.enabled = false;
        externalStatus.firebase.reason = `Missing env vars: ${missing.join(', ')}`;
      }
    }

    if (serviceAccount) {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      }
      db = admin.firestore();
      externalStatus.firebase.enabled = true;
    } else {
      db = null;
    }
  } catch (e) {
    console.error('Firebase init error', e);
    db = null;
    externalStatus.firebase.enabled = false;
    externalStatus.firebase.reason = e?.message || 'Firebase init failed';
  }

  if (process.env.SENDGRID_API_KEY && String(process.env.SENDGRID_API_KEY).trim()) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    externalStatus.sendgrid.enabled = true;
  } else {
    externalStatus.sendgrid.enabled = false;
    externalStatus.sendgrid.reason = 'Missing SENDGRID_API_KEY';
  }
} else {
  db = createMockDb();
  // Minimal substitute for admin.firestore.FieldValue.serverTimestamp()
  admin.FieldValue = { serverTimestamp: () => new Date() };
  externalStatus.firebase.enabled = true;
  externalStatus.firebase.reason = 'SKIP_EXTERNAL enabled';
  externalStatus.sendgrid.enabled = true;
  externalStatus.sendgrid.reason = 'SKIP_EXTERNAL enabled';
}

function requireDb(res) {
  if (db) return true;
  res.status(503).json({ error: 'FIREBASE_NOT_CONFIGURED', detail: externalStatus.firebase.reason || 'Firebase is not configured' });
  return false;
}

function requireStripe(res) {
  if (stripe) return true;
  res.status(503).json({ error: 'STRIPE_NOT_CONFIGURED', detail: externalStatus.stripe.reason || 'Stripe is not configured' });
  return false;
}

const app = express();
app.use(helmet({ 
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  contentSecurityPolicy: false,
  frameguard: { action: 'deny' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || ['https://valtre.onrender.com', 'http://localhost:3000'],
  methods: ['GET','POST','PATCH','OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'X-Admin-Key']
}));

// Enhanced rate limiting with different strategies
const apiLimiter = rateLimit({ 
  windowMs: 15*60*1000, 
  max: 300,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});
const checkoutLimiter = rateLimit({
  windowMs: 60*1000,
  max: 5,
  message: { error: 'Too many checkout attempts, please slow down' }
});

app.use(morgan(':date[iso] :method :url :status :response-time ms - :user-agent'));
app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10kb' }));
app.use(apiLimiter);

// Request logging and validation middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode}`);
  });
  next();
});

// Schemas
const createIntentSchema = Joi.object({
  items: Joi.array().items(Joi.object({ 
    id: Joi.string().required(), 
    qty: Joi.number().min(1).integer().required(), 
    price: Joi.number().min(0).required(), 
    name: Joi.string().max(200).required() 
  })).min(1).max(100).required(),
  currency: Joi.string().valid('eur', 'usd', 'gbp', 'jpy').default('eur'),
  email: Joi.string().email().max(100).required(),
  shipping: Joi.object({ 
    name: Joi.string().max(100).required(), 
    address: Joi.object({ 
      line1: Joi.string().max(200).required(), 
      city: Joi.string().max(100).required(), 
      postal_code: Joi.string().max(20).required(), 
      country: Joi.string().length(2).required() 
    }).required() 
  }).required()
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
    const productId = String(it.id);
    const snap = await db.collection('products').doc(productId).get();
    
    // If product doc doesn't exist, check if product ID is in catalog
    if (!snap.exists) {
      const existsInCatalog = PRODUCTS.some(p => String(p.id) === productId);
      if (!existsInCatalog) throw new Error(`NO_PRODUCT:${it.id}`);
      // Product exists in catalog but not yet seeded; assume 100 units available
      continue;
    }
    
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
      const ref = db.collection('products').doc(String(it.id));
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error(`NO_PRODUCT:${it.id}`);
      const data = snap.data();
      if (data.stock < it.qty) throw new Error(`RACE_OUT_OF_STOCK:${it.id}`);
      const newStock = data.stock - it.qty;
      ref.set({ stock: newStock }, { merge: true });
    }
  });
}

async function getStockMap(){
  try {
    if (!db) return {};
    const snap = await db.collection('products').get();
    const map = {};
    snap.docs.forEach(doc => {
      const data = doc.data();
      if (typeof data?.stock === 'number') map[doc.id] = data.stock;
    });
    return map;
  } catch (e){
    console.error('Error reading stock map', e);
    return {};
  }
}

app.get('/health', (_req,res) => {
  const uptime = process.uptime();
  const memory = process.memoryUsage();
  
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(uptime),
    version: process.env.npm_package_version || '1.0.0',
    environment: isProd ? 'production' : 'development',
    skipExternal,
    memory: {
      heapUsed: Math.round(memory.heapUsed / 1024 / 1024) + 'MB',
      heapTotal: Math.round(memory.heapTotal / 1024 / 1024) + 'MB'
    },
    externals: {
      stripe: externalStatus.stripe,
      firebase: externalStatus.firebase,
      sendgrid: externalStatus.sendgrid,
    }
  });
});

app.get('/products', async (_req,res) => {
  try {
    let stockMap = await getStockMap();
    
    // Auto-seed products if stockMap is empty and db is available
    if (db && Object.keys(stockMap).length === 0) {
      console.log('📦 Auto-seeding products with 20 units each...');
      const ops = PRODUCTS.map(async (p) => {
        const id = String(p.id);
        const ref = db.collection('products').doc(id);
        await ref.set({ stock: 20 }, { merge: true });
      });
      try {
        await Promise.all(ops);
        console.log('✓ Auto-seed completed');
        stockMap = await getStockMap(); // Refresh stockMap after seeding
      } catch (seedErr) {
        console.error('⚠ Auto-seed failed (non-fatal)', seedErr.message);
      }
    }
    
    const payload = PRODUCTS.map((p) => ({
      ...p,
      id: String(p.id),
      stock: stockMap[String(p.id)] ?? p.stock ?? null
    }));
    res.json({ products: payload });
  } catch (e){
    console.error('Error returning products', e);
    res.status(500).json({ error: 'PRODUCTS_FETCH_FAILED' });
  }
});

// Seed Firestore products from the static catalog (admin only)
app.post('/admin/seed-products', adminAuth, async (req,res) => {
  if (!requireDb(res)) return;
  const { defaultStock = 20 } = req.body || {};
  try {
    const ops = PRODUCTS.map(async (p) => {
      const id = String(p.id);
      const ref = db.collection('products').doc(id);
      await ref.set({ stock: typeof p.stock === 'number' ? p.stock : defaultStock }, { merge: true });
    });
    await Promise.all(ops);
    res.json({ ok: true, count: PRODUCTS.length, defaultStock });
  } catch (e){
    console.error('Error seeding products', e);
    res.status(500).json({ error: 'SEED_FAILED' });
  }
});

app.post('/payments/create-intent', checkoutLimiter, async (req,res) => {
  if (!requireDb(res)) return;
  if (!requireStripe(res)) return;
  
  try {
    const { error, value } = createIntentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.warn('Validation error in checkout:', error.details.map(e => e.message).join(', '));
      return res.status(400).json({ error: 'INVALID_PAYLOAD', details: error.details.map(e => e.message) });
    }
    
    const { items, currency, email, shipping } = value;
    
    // Verify inventory before creating intent
    await verifyInventory(items);
    
    const amount = calcAmount(items);
    if (amount <= 0) return res.status(400).json({ error: 'INVALID_AMOUNT' });
    
    const idempotencyKey = req.headers['idempotency-key'] || uuidv4();
    const orderRef = db.collection('orders').doc();
    
    const orderData = {
      status: 'pending',
      email,
      items,
      amount,
      currency,
      shipping,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30*60*1000) // 30 minute expiry
    };
    
    await orderRef.set(orderData);
    
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount,
        currency,
        receipt_email: email,
        metadata: { orderId: orderRef.id },
        description: `Order ${orderRef.id}`
      },
      { idempotencyKey }
    );
    
    console.log(`✓ Payment intent created: ${paymentIntent.id} for order ${orderRef.id}`);
    res.json({ clientSecret: paymentIntent.client_secret, orderId: orderRef.id });
  } catch (e) {
    console.error('Checkout error:', e.message);
    
    if (e.message?.startsWith('OUT_OF_STOCK')) {
      return res.status(409).json({ error: 'OUT_OF_STOCK', detail: e.message });
    }
    if (e.message?.startsWith('NO_PRODUCT')) {
      return res.status(404).json({ error: 'PRODUCT_NOT_FOUND', detail: e.message });
    }
    if (e.message?.startsWith('RACE_OUT_OF_STOCK')) {
      return res.status(409).json({ error: 'OUT_OF_STOCK', detail: 'Item sold out during processing' });
    }
    
    res.status(500).json({ error: 'INTENT_ERROR', detail: 'Failed to create payment intent' });
  }
});

app.get('/orders', adminAuth, async (req,res) => {
  if (!requireDb(res)) return;
  const snap = await db.collection('orders').get();
  const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json({ orders });
});

app.patch('/orders/:id', adminAuth, async (req,res) => {
  if (!requireDb(res)) return;
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
  if (!requireDb(res)) return;
  const ref = db.collection('orders').doc(req.params.id);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  const order = snap.data();
  if (!['paid','processing'].includes(order.status)) return res.status(409).json({ error: 'INVALID_STATE' });
  await ref.set({ status: 'packed', packedAt: new Date() }, { merge: true });
  res.json({ ok: true });
});

app.post('/orders/:id/ship', adminAuth, async (req,res) => {
  if (!requireDb(res)) return;
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
  if (!requireDb(res)) return;
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
  if (!requireDb(res)) return;
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

// 404 handler
app.use((req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'NOT_FOUND', path: req.path });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.status || 500} - ${err.message}`, err.stack);
  
  if (err.status === 429) {
    return res.status(429).json({ error: 'TOO_MANY_REQUESTS' });
  }
  
  if (err.status === 413) {
    return res.status(413).json({ error: 'PAYLOAD_TOO_LARGE' });
  }
  
  res.status(err.status || 500).json({
    error: err.message || 'INTERNAL_SERVER_ERROR',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

export { app, db, skipExternal };
