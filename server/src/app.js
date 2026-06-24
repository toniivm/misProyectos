// @version: 2.1.0-payment-methods (2026-05-12) - PayPal, Google Pay, Apple Pay support
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { Resend } from 'resend';
import fs from 'fs/promises';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import rateLimit from 'express-rate-limit';
import PRODUCTS from './products.js';

// In-memory cache for stock map (5 min TTL)
let stockMapCache = null;
let stockMapCacheTime = 0;
const STOCK_CACHE_TTL = 5 * 60 * 1000;

function parseBool(value) {
  if (value == null) return false;
  const s = String(value).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
}

// For quick staging tests, default to skipping external services unless explicitly disabled.
// This forces mock behaviour (emails, stripe, firestore) when SKIP_EXTERNAL is not set.
const skipExternal = parseBool(process.env.SKIP_EXTERNAL ?? 'true');
const isProd = (process.env.NODE_ENV || 'production') === 'production';

const externalStatus = {
  skipExternal,
  stripe: { enabled: false, reason: null },
  firebase: { enabled: false, reason: null },
  email: { enabled: false, reason: null },
};

function createMockDb() {
  // In-memory mock store
  const store = {
    orders: {},
    products: {
      'pulse-pro-x': { stock: 10 },
      cerviflex: { stock: 5 },
      sleepseal: { stock: 15 },
    },
  };
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
  stripe = {
    paymentIntents: {
      create: async ({ amount, currency, metadata }) => ({
        client_secret: 'test_client_secret_' + Date.now(),
        id: 'pi_test_' + Date.now(),
        amount,
        currency,
        metadata,
      }),
    },
    checkout: {
      sessions: {
        create: async ({ success_url, cancel_url, metadata }) => ({
          id: 'cs_test_' + Date.now(),
          url: success_url || cancel_url || 'https://checkout.stripe.test/session/mock',
          metadata,
        }),
      },
    },
    webhooks: {
      constructEvent: () => ({
        type: 'payment_intent.succeeded',
        data: { object: { id: 'pi_test', metadata: { orderId: 'order_mock' } } },
      }),
    },
  };
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

  if (process.env.RESEND_API_KEY && String(process.env.RESEND_API_KEY).trim()) {
    externalStatus.email.enabled = true;
  } else {
    externalStatus.email.enabled = false;
    externalStatus.email.reason = 'Missing RESEND_API_KEY';
  }
} else {
  db = createMockDb();
  // Minimal substitute for admin.firestore.FieldValue.serverTimestamp()
  admin.FieldValue = { serverTimestamp: () => new Date() };
  externalStatus.firebase.enabled = true;
  externalStatus.firebase.reason = 'SKIP_EXTERNAL enabled';
  externalStatus.email.enabled = true;
  externalStatus.email.reason = 'SKIP_EXTERNAL enabled';
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

function isFirestoreRuntimeError(err) {
  const message = err?.message || '';
  return (
    message.includes('UNAUTHENTICATED') ||
    message.includes('invalid authentication credentials') ||
    message.includes('Could not load the default credentials') ||
    message.includes('credential')
  );
}

const app = express();
// Trust the Render proxy (needed for express-rate-limit and X-Forwarded-For)
app.set('trust proxy', 1);
app.use(compression({ level: 6, threshold: 1024 }));

const defaultOrigins = [
  'https://noctip.com',
  'https://www.noctip.com',
  'https://valtre.onrender.com',
  'https://valtre-73c7b.web.app',
  'https://valtre-73c7b.firebaseapp.com',
  'http://localhost:3000'
];
const envOrigins = (process.env.CORS_ORIGIN || process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(helmet({ 
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://js.stripe.com'],
      connectSrc: ["'self'", 'https://api.stripe.com', 'https://checkout.stripe.com'],
      frameSrc: ['https://js.stripe.com', 'https://hooks.stripe.com', 'https://checkout.stripe.com'],
      imgSrc: ["'self'", 'data:', 'https://*.stripe.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com', 'https://checkout.stripe.com'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'", 'https://checkout.stripe.com'],
      upgradeInsecureRequests: [],
    },
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS_NOT_ALLOWED'), false);
  },
  methods: ['GET','POST','PATCH','OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'X-Admin-Key', 'Idempotency-Key', 'idempotency-key']
}));

// Cache middleware for GET /products and /health
app.use('/products', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});

app.use('/health', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=60');
  next();
});

// Enhanced rate limiting with different strategies
const apiLimiter = rateLimit({ 
  windowMs: 15*60*1000, 
  max: 300,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !isProd // Skip rate limiting validation in development
});
const checkoutLimiter = rateLimit({
  windowMs: 60*1000,
  max: 5,
  message: { error: 'Too many checkout attempts, please slow down' }
});

app.use(morgan(isProd ? ':status :response-time ms' : ':date[iso] :method :url :status :response-time ms'));
app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10kb' }));
app.use(apiLimiter);

// Request logging and validation middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    if (!isProd || res.statusCode >= 400) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode}`);
    }
  });
  next();
});

// Schemas
const createIntentSchema = Joi.object({
  items: Joi.array().items(Joi.object({ 
    id: Joi.string().required(), 
    qty: Joi.number().min(1).integer().required(), 
    price: Joi.number().min(0).required(), 
    name: Joi.string().max(200).required(),
    personalization: Joi.object().optional()
  })).min(1).max(100).required(),
  currency: Joi.string().valid('eur', 'usd', 'gbp', 'jpy').default('eur'),
  email: Joi.string().email().max(100).required(),
  phone: Joi.string().max(30).required(),
  shipping: Joi.object({ 
    name: Joi.string().max(100).required(), 
    address: Joi.object({ 
      line1: Joi.string().max(200).required(), 
      line2: Joi.string().max(200).optional().allow('', null),
      city: Joi.string().max(100).required(), 
      state: Joi.string().max(100).optional().allow('', null),
      postal_code: Joi.string().max(20).required(), 
      country: Joi.string().length(2).required() 
    }).required() 
  }).required(),
  promoCode: Joi.string().max(50).optional().allow('', null),
  discountPercent: Joi.number().min(0).max(100).optional()
});

const checkoutUrlSchema = Joi.string().custom((value, helpers) => {
  try {
    const normalized = value.replace('{CHECKOUT_SESSION_ID}', 'cs_test_placeholder');
    new URL(normalized);
    return value;
  } catch {
    return helpers.error('string.uri');
  }
}, 'Stripe checkout redirect URL validation');

const createSessionSchema = createIntentSchema.keys({
  successUrl: checkoutUrlSchema.optional(),
  cancelUrl: checkoutUrlSchema.optional(),
  // Allow optional metadata (utm, campaign tags) with string values
  metadata: Joi.object().pattern(Joi.string(), Joi.string()).optional(),
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

function calcAmount(items, discountPercent = 0){
  const subtotal = items.reduce((sum, it) => sum + Math.round(it.price * 100) * it.qty, 0);
  if (discountPercent > 0 && discountPercent <= 100) {
    return Math.max(0, Math.round(subtotal * (1 - discountPercent / 100)));
  }
  return subtotal;
}

function toStripeLineItems(items, currency){
  return items
    .filter((it) => it && Number.isFinite(it.price) && it.qty > 0 && Math.round(Number(it.price) * 100) > 0)
    .map((it) => ({
      price_data: {
        currency,
        unit_amount: Math.round(Number(it.price) * 100),
        product_data: {
          name: (it.name || `Item ${it.id || ''}`).toString().slice(0, 200),
          description: 'Noctip™ — Recuperación premium',
        },
      },
      quantity: it.qty,
    }));
}

const envFrontendBaseUrl = (process.env.FRONTEND_URL || process.env.FRONTEND_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
function resolveFrontendBaseUrl(req) {
  const envUrl = envFrontendBaseUrl && envFrontendBaseUrl !== 'http://localhost:3000' ? envFrontendBaseUrl : null;
  const origin = req.get('origin');
  const referer = req.get('referer');
  let refererOrigin = null;
  if (referer) {
    try {
      refererOrigin = new URL(referer).origin;
    } catch {
      refererOrigin = null;
    }
  }
  const fallback = allowedOrigins?.[0] || 'http://localhost:3000';
  return (envUrl || origin || refererOrigin || fallback).replace(/\/$/, '');
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
  // Check cache first
  const now = Date.now();
  if (stockMapCache && (now - stockMapCacheTime) < STOCK_CACHE_TTL) {
    return stockMapCache;
  }

  try {
    if (!db) return {};
    const snap = await db.collection('products').get();
    const map = {};
    snap.docs.forEach(doc => {
      const data = doc.data();
      if (typeof data?.stock === 'number') map[doc.id] = data.stock;
    });
    
    // Update cache
    stockMapCache = map;
    stockMapCacheTime = now;
    return map;
  } catch (e){
    console.error('Error reading stock map', e);
    return {};
  }
}

// Promo codes config (add more as needed)
const PROMO_CODES = {
  'NOCTIP10': { discountPercent: 10, label: 'NOCTIP10' },
  'NOCTIP20': { discountPercent: 20, label: 'NOCTIP20' },
  'BIENVENIDO': { discountPercent: 15, label: 'BIENVENIDO' },
  'RECUPERA5': { discountPercent: 5, label: 'RECUPERA5' },
};

app.post('/promo/validate', (req, res) => {
  const { code } = req.body || {};
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ valid: false, detail: 'Missing promo code' });
  }
  const promo = PROMO_CODES[code.toUpperCase().trim()];
  if (promo) {
    return res.json({ valid: true, discountPercent: promo.discountPercent, label: promo.label });
  }
  return res.json({ valid: false, detail: 'Código no válido o caducado' });
});

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
      email: externalStatus.email,
    }
  });
});

// Test Firestore write — verifies DB is accessible
app.get('/test-firestore', async (_req, res) => {
  if (!db) return res.status(503).json({ error: 'DB not initialized', skipExternal });
  try {
    const ts = new Date().toISOString();
    await db.collection('_test').doc('ping').set({ ts, ok: true });
    const snap = await db.collection('_test').doc('ping').get();
    const data = snap.data();
    await db.collection('_test').doc('ping').delete();
    res.json({ ok: true, written: ts, readBack: data });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message, code: e?.code });
  }
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
    // Invalidate cache after seeding
    stockMapCache = null;
    stockMapCacheTime = 0;
    res.json({ ok: true, count: PRODUCTS.length, defaultStock });
  } catch (e){
    console.error('Error seeding products', e);
    res.status(500).json({ error: 'SEED_FAILED' });
  }
});

app.post('/payments/create-intent', checkoutLimiter, async (req,res) => {
  console.log(`\n🔵 POST /payments/create-intent started`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  
  if (!requireDb(res)) {
    console.log(`❌ DB not available`);
    return;
  }
  if (!requireStripe(res)) {
    console.log(`❌ Stripe not available`);
    return;
  }
  
  try {
    const { error, value } = createIntentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.warn('Validation error in checkout:', error.details.map(e => e.message).join(', '));
      return res.status(400).json({ error: 'INVALID_PAYLOAD', details: error.details.map(e => e.message) });
    }
    
    const { items, currency, email, phone, shipping, promoCode, discountPercent } = value;
    
    // Verify inventory before creating intent
    try {
      await verifyInventory(items);
    } catch (invErr) {
      console.error('Inventory verification failed:', invErr.message);
      if (invErr.message?.startsWith('OUT_OF_STOCK')) {
        return res.status(409).json({ error: 'OUT_OF_STOCK', detail: invErr.message });
      }
      if (invErr.message?.startsWith('NO_PRODUCT')) {
        return res.status(404).json({ error: 'PRODUCT_NOT_FOUND', detail: invErr.message });
      }
      throw invErr;
    }
    
    const amount = calcAmount(items, discountPercent);
    if (amount <= 0) return res.status(400).json({ error: 'INVALID_AMOUNT' });
    
    const idempotencyKey = req.headers['idempotency-key'] || uuidv4();
    const orderRef = db.collection('orders').doc();
    
    const orderData = {
      status: 'pending',
      email,
      phone: phone || null,
      items,
      amount,
      currency,
      shipping,
      promoCode: promoCode || null,
      discountPercent: discountPercent || 0,
      ip: req.ip,
      userAgent: req.get('user-agent') || null,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30*60*1000) // 30 minute expiry
    };
    
    console.log(`📝 Saving order ${orderRef.id}...`);
    await orderRef.set(orderData);
    console.log(`✓ Order saved: ${orderRef.id}`);

    // Save/update customer data in customers collection
    if (email) {
      try {
        const customerRef = db.collection('customers').doc(email);
        const customerSnap = await customerRef.get();
        const existingOrders = customerSnap.exists ? (customerSnap.data().orderIds || []) : [];
        const customerData = {
          name: `${shipping?.name || ''}`.trim(),
          email,
          phone: phone || null,
          address: shipping?.address || null,
          orderIds: [...new Set([...existingOrders, orderRef.id])],
          lastOrderAt: new Date(),
          createdAt: customerSnap.exists ? customerSnap.data().createdAt : new Date(),
        };
        await customerRef.set(customerData, { merge: true });
        console.log(`✓ Customer saved: ${email}`);
      } catch (custErr) {
        console.error('Failed to save customer data:', custErr?.message || custErr);
      }
    }
    
    console.log(`💳 Creating Stripe intent for order ${orderRef.id}...`);
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
    console.error('Stack:', e.stack);
    
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

app.post('/payments/create-checkout-session', checkoutLimiter, async (req,res) => {
  console.log(`\n🔵 POST /payments/create-checkout-session started [2026-05-11T22:12 PAYMENT_METHODS_V2]`);
  console.log(`Body: ${JSON.stringify(req.body)}`);

  if (!requireStripe(res)) {
    console.log(`❌ Stripe not available`);
    return;
  }

  try {
    // Extract paymentMethod BEFORE validation (not part of base schema)
    const paymentMethod = req.body.paymentMethod || 'card';
    
    // Validate payment method
    if (!['card'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'INVALID_PAYMENT_METHOD', detail: `Payment method must be: card` });
    }

    // Remove paymentMethod from body before Joi validation
    const bodyForValidation = { ...req.body };
    delete bodyForValidation.paymentMethod;

    // Validate rest of payload
    const { error, value } = createSessionSchema.validate(bodyForValidation, { abortEarly: false });
    if (error) {
      console.warn('Validation error in checkout session:', error.details.map(e => e.message).join(', '));
      return res.status(400).json({ error: 'INVALID_PAYLOAD', details: error.details.map(e => e.message) });
    }

    const { items, currency, email, phone, shipping, successUrl, cancelUrl, promoCode, discountPercent } = value;

    if (db) {
      try {
        await verifyInventory(items);
      } catch (invErr) {
        console.error('Inventory verification failed:', invErr.message);
        if (invErr.message?.startsWith('OUT_OF_STOCK')) {
          return res.status(409).json({ error: 'OUT_OF_STOCK', detail: invErr.message });
        }
        if (invErr.message?.startsWith('NO_PRODUCT')) {
          return res.status(404).json({ error: 'PRODUCT_NOT_FOUND', detail: invErr.message });
        }
        if (isFirestoreRuntimeError(invErr)) {
          console.warn('⚠ Firestore inventory check skipped due to runtime auth/config issue');
        } else {
          throw invErr;
        }
      }
    } else {
      console.warn('⚠ Firestore unavailable, skipping inventory verification for checkout session');
    }

    const amount = calcAmount(items, discountPercent);
    if (amount <= 0) return res.status(400).json({ error: 'INVALID_AMOUNT' });

    const idempotencyKey = req.headers['idempotency-key'] || uuidv4();
    const orderRef = db ? db.collection('orders').doc() : null;
    const orderId = orderRef?.id || uuidv4();

    const orderData = {
      status: 'pending',
      email,
      phone: phone || null,
      items,
      amount,
      currency,
      shipping,
      promoCode: promoCode || null,
      discountPercent: discountPercent || 0,
      ip: req.ip,
      userAgent: req.get('user-agent') || null,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30*60*1000) // 30 minute expiry
    };

    if (orderRef) {
      try {
        console.log(`📝 Saving order ${orderId} (checkout session)...`);
        console.log(`  db type: ${typeof db}, db null: ${db === null}`);
        await orderRef.set(orderData);
        console.log(`✓ Order saved to Firestore: ${orderId}`);
      } catch (dbErr) {
        console.error(`❌ Failed to save order ${orderId}:`, dbErr?.message || dbErr);
        console.error(`  code: ${dbErr?.code}, details:`, JSON.stringify(dbErr));
        if (isFirestoreRuntimeError(dbErr)) {
          console.warn(`⚠ Order ${orderId} not persisted because Firestore is misconfigured`);
        } else {
          throw dbErr;
        }
      }
    } else {
      console.warn(`⚠ orderRef is null — order ${orderId} NOT saved (db=${!!db})`);
    }

    // Save/update customer data in customers collection
    console.log(`👤 Saving customer data: email=${email}, db=${!!db}`);
    if (db && email) {
      try {
        const customerRef = db.collection('customers').doc(email);
        const customerSnap = await customerRef.get();
        const existingOrders = customerSnap.exists ? (customerSnap.data().orderIds || []) : [];
        const customerData = {
          name: `${shipping?.name || ''}`.trim(),
          email,
          phone: phone || null,
          address: shipping?.address || null,
          orderIds: [...new Set([...existingOrders, orderId])],
          lastOrderAt: new Date(),
          createdAt: customerSnap.exists ? customerSnap.data().createdAt : new Date(),
        };
        console.log(`  customerData:`, JSON.stringify(customerData));
        await customerRef.set(customerData, { merge: true });
        console.log(`✓ Customer saved to Firestore: ${email}`);
      } catch (custErr) {
        console.error(`❌ Failed to save customer ${email}:`, custErr?.message || custErr);
        console.error(`  code: ${custErr?.code}, details:`, JSON.stringify(custErr));
      }
    } else {
      console.warn(`⚠ Customer NOT saved: db=${!!db}, email=${email}`);
    }

    const productItems = items.filter((it) => !String(it.id).startsWith('shipping:'));
    const shippingItems = items.filter((it) => String(it.id).startsWith('shipping:'));
    const lineItems = [
      ...toStripeLineItems(productItems, currency),
      ...toStripeLineItems(shippingItems, currency),
    ];

    if (!lineItems.length) return res.status(400).json({ error: 'INVALID_AMOUNT' });

    const frontendBaseUrl = resolveFrontendBaseUrl(req);
    const defaultSuccess = `${frontendBaseUrl}/checkout?status=success&orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`;
    const defaultCancel = `${frontendBaseUrl}/checkout?status=cancel&orderId=${orderId}`;

    // Map payment method to Stripe payment_method_types
    // Stripe shows Apple Pay/Google Pay automatically on capable devices when using 'card'
    const paymentMethodTypes = {
      'card': ['card'],
    };

    console.log(`💳 Creating Stripe Checkout session for order ${orderId}... (method: ${paymentMethod})`);
    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        payment_method_types: paymentMethodTypes[paymentMethod] || ['card'],
        line_items: lineItems,
        customer_email: email,
        success_url: successUrl || defaultSuccess,
        cancel_url: cancelUrl || defaultCancel,
        metadata: { orderId, items: JSON.stringify(items.map((item) => ({ id: item.id, qty: item.qty }))), paymentMethod },
        payment_intent_data: {
          metadata: { orderId, paymentMethod },
          description: `Pedido #${orderId} — Noctip`,
        },
        // 3D Secure — obligatorio para máxima seguridad
        // El banco del cliente solicitará verificación (código SMS, huella, etc.)
        // Esto NO es un hackeo — es tu banco protegiendo tu compra
        payment_method_options: {
          card: {
            request_three_d_secure: 'any',
          },
        },
        // Minimize friction: auto-redirect after payment
        after_expiration: {
          recovery: { enabled: false },
        },
        // Billing address collection for better fraud prevention
        billing_address_collection: 'auto',
        // Phone collection is optional - already collected in form
        phone_number_collection: { enabled: false },
      },
      { idempotencyKey }
    );

    console.log(`✓ Checkout session created: ${session.id} for order ${orderId}`);
    res.json({ sessionId: session.id, url: session.url, orderId });
  } catch (e) {
    console.error('Checkout session error:', e.message);
    if (e?.raw) console.error('Stripe raw error:', JSON.stringify({ code: e.raw.code, type: e.raw.type, param: e.raw.param, message: e.raw.message }, null, 2));
    console.error('Stack:', e.stack);

    if (e.message?.startsWith('OUT_OF_STOCK')) {
      return res.status(409).json({ error: 'OUT_OF_STOCK', detail: e.message });
    }
    if (e.message?.startsWith('NO_PRODUCT')) {
      return res.status(404).json({ error: 'PRODUCT_NOT_FOUND', detail: e.message });
    }
    if (e.message?.startsWith('RACE_OUT_OF_STOCK')) {
      return res.status(409).json({ error: 'OUT_OF_STOCK', detail: 'Item sold out during processing' });
    }

    res.status(500).json({ error: 'CHECKOUT_SESSION_ERROR', detail: e?.message || 'Failed to create checkout session' });
  }
});

app.get('/orders', adminAuth, async (req,res) => {
  if (!requireDb(res)) return;
  const snap = await db.collection('orders').get();
  const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json({ orders });
});

app.get('/customers', adminAuth, async (req,res) => {
  if (!requireDb(res)) return;
  const snap = await db.collection('customers').get();
  const customers = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json({ customers });
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

// Email helpers — singleton Resend client
let resendClient = null;
function getResendClient() {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && String(apiKey).trim()) {
    resendClient = new Resend(apiKey);
    return resendClient;
  }
  return null;
}

async function sendEmail(to, subject, html){
  if (skipExternal) {
    console.log(`[MOCK EMAIL][skipExternal] To: ${to} Subject: ${subject}\n${html}`);
    return { ok: true, mock: true };
  }

  const client = getResendClient();
  if (!client) {
    console.log(`⚠️ [NO API KEY] To: ${to} Subject: ${subject}`);
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const from = process.env.SENDER_EMAIL ? `Noctip <${process.env.SENDER_EMAIL}>` : 'Noctip <onboarding@resend.dev>';
    console.log(`📧 Sending email from "${from}" to "${to}"...`);
    const { data, error } = await client.emails.send({
      from,
      to: [to],
      subject,
      html,
    });
    if (error) {
      console.error('❌ Resend API error:', JSON.stringify(error));
      return { ok: false, error: error.message || JSON.stringify(error) };
    }
    console.log(`✅ Email sent to ${to} (Resend)`, data?.id || '');
    return { ok: true, id: data?.id };
  } catch (e){
    console.error('❌ Resend exception:', e?.message || e);
    return { ok: false, error: e?.message || 'Unknown error' };
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

// Stripe webhook handler — verifies signature and marks orders as paid
async function handleOrderPaid(orderId, stripeObj){
  console.log(`\n📧 handleOrderPaid called: orderId=${orderId}`);
  if (!orderId) {
    console.warn('❌ handleOrderPaid: missing orderId');
    return;
  }
  if (!db) {
    console.warn('❌ handleOrderPaid: no DB configured - skipping order update');
    return;
  }

  try {
    const ref = db.collection('orders').doc(orderId);
    const snap = await ref.get();
    if (!snap.exists) {
      console.warn(`❌ Order ${orderId} not found in DB`);
      return;
    }
    const order = snap.data();
    console.log(`  Order ${orderId} current status: ${order.status}, email: ${order.email}`);
    if (['paid','processing','packed','shipped','delivered'].includes(order.status)){
      console.log(`  ℹ Order ${orderId} already in status ${order.status} — skipping`);
      return;
    }

    await ref.set({ status: 'paid', paidAt: new Date(), paymentInfo: { stripe: stripeObj?.id || null } }, { merge: true });
    console.log(`  ✅ Order ${orderId} marked as PAID in Firestore`);

    // Attempt to decrement inventory (best-effort)
    try {
      await decrementInventory(order.items || []);
      console.log(`  ✅ Inventory decremented for order ${orderId}`);
    } catch (e){
      console.error(`❌ Failed to decrement inventory for order ${orderId}`, e?.message || e);
    }

    // Send confirmation email to customer using HTML template
    try {
      console.log(`  📧 Sending confirmation email to ${order.email}...`);
      const customerName = order.shipping?.name || '';
      const itemsList = (order.items || []).map(it => `<li style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;display:flex;justify-content:space-between;"><span>${it.name} x${it.qty}</span><span style="font-weight:600;">€${(it.price * it.qty).toFixed(2)}</span></li>`).join('');
      const itemsHtml = `<ul style="list-style:none;padding:0;margin:0;">${itemsList}</ul>`;
      const total = `€${((order.amount || 0) / 100).toFixed(2)}`;

      let tpl = null;
      try {
        const tplPath = new URL('../templates/order-confirmation.html', import.meta.url);
        tpl = await fs.readFile(tplPath, 'utf8');
      } catch (e) {
        console.warn(`  ⚠ Template not found, using inline HTML: ${e.message}`);
        tpl = null;
      }

      let html;
      if (tpl) {
        html = tpl
          .replace(/{{orderId}}/g, orderId)
          .replace(/{{customerName}}/g, customerName)
          .replace(/{{itemsHtml}}/g, itemsHtml)
          .replace(/{{total}}/g, total);
      } else {
        html = `<h1>Gracias por tu pedido</h1><p>Pedido: <strong>#${orderId}</strong></p><ul>${itemsList}</ul><p><strong>Total: ${total}</strong></p><p>Recibirás un email cuando tu pedido sea enviado.</p>`;
      }

      await sendEmail(order.email, `✅ Confirmación de pedido #${orderId} - Noctip`, html);
      console.log(`  ✅ Confirmation email sent to ${order.email}`);
    } catch (e){
      console.error(`❌ Failed to send order confirmation email for ${orderId}:`, e?.message || e);
    }
  } catch (e){
    console.error('handleOrderPaid error', e?.message || e);
  }
}

app.post('/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'] || req.headers['stripe_signature'];
  console.log(`\n🔔 Stripe webhook received at ${new Date().toISOString()}`);
  console.log(`  Headers: stripe-signature=${sig ? 'present' : 'MISSING'}, content-type=${req.headers['content-type']}`);
  console.log(`  Body type: ${typeof req.body}, isBuffer: ${Buffer.isBuffer(req.body)}, length: ${Buffer.isBuffer(req.body) ? req.body.length : 'N/A'}`);

  let event;
  try {
    if (stripe && stripe.webhooks && process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log(`  ✅ Signature verified OK`);
    } else if (stripe && stripe.webhooks && typeof stripe.webhooks.constructEvent === 'function') {
      try {
        event = stripe.webhooks.constructEvent(req.body);
      } catch (e) {
        console.warn(`  ⚠ constructEvent without secret failed: ${e.message}`);
        event = req.body;
      }
    } else {
      if (Buffer.isBuffer(req.body)) {
        const s = req.body.toString('utf8') || '{}';
        event = JSON.parse(s);
      } else {
        event = req.body;
      }
    }
  } catch (err) {
    console.error(`  ❌ Webhook signature verification FAILED: ${err?.message || err}`);
    console.error(`  STRIPE_WEBHOOK_SECRET configured: ${!!process.env.STRIPE_WEBHOOK_SECRET}`);
    return res.status(400).send(`Webhook Error: ${err?.message || err}`);
  }

  console.log(`  Event type: ${event?.type || 'unknown'}`);

  try {
    const type = event.type;
    if (type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session?.metadata?.orderId || session?.metadata?.order_id;
      console.log(`  📦 checkout.session.completed → orderId=${orderId}`);
      await handleOrderPaid(orderId, session);
    } else if (type === 'payment_intent.succeeded') {
      const pi = event.data.object;
      const orderId = pi?.metadata?.orderId || pi?.metadata?.order_id;
      console.log(`  💰 payment_intent.succeeded → orderId=${orderId}`);
      await handleOrderPaid(orderId, pi);
    } else {
      console.log(`  ℹ Unhandled event type: ${type}`);
    }
  } catch (e) {
    console.error('Error handling webhook event', e?.message || e);
    return res.status(500).send('Webhook handler error');
  }

  res.json({ received: true });
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
  // Send shipment notification with template
  const customerName = order.shipping?.name || '';
  let shipmentHtml = null;
  try {
    const tplPath = new URL('../templates/shipment.html', import.meta.url);
    const tpl = await fs.readFile(tplPath, 'utf8');
    shipmentHtml = tpl
      .replace(/{{orderId}}/g, req.params.id)
      .replace(/{{customerName}}/g, customerName)
      .replace(/{{carrier}}/g, carrier)
      .replace(/{{trackingNumber}}/g, trackingNumber);
  } catch (e) {
    shipmentHtml = null;
  }
  if (shipmentHtml) {
    await sendEmail(order.email, `📦 Tu pedido #${req.params.id} ha sido enviado - Noctip`, shipmentHtml);
  } else {
    await sendEmail(
      order.email,
      `📦 Tu pedido #${req.params.id} ha sido enviado`,
      `<h1>¡Tu pedido está en camino!</h1><p>Pedido: <strong>#${req.params.id}</strong></p><p>Transportista: ${carrier}</p><p>Nº seguimiento: <strong>${trackingNumber}</strong></p><p>Recibirás tu pedido pronto.</p>`
    );
  }
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
    `<h1>¡Pedido entregado!</h1><p>Pedido: <strong>#${req.params.id}</strong></p><p>Tu pedido ha sido entregado con éxito.</p><p>Gracias por tu confianza en Noctip.</p>`
  );
  res.json({ ok: true });
});

// Public endpoint: request order confirmation email (used by frontend after Stripe redirect)
app.post('/orders/:id/send-confirmation', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'MISSING_ORDER_ID' });
  if (!db) return res.status(503).json({ error: 'DB_NOT_AVAILABLE' });

  try {
    const ref = db.collection('orders').doc(id);
    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });

    const order = snap.data();
    if (!order.email) return res.status(400).json({ error: 'NO_EMAIL_ON_ORDER' });

    // Only send if order is paid and email hasn't been sent yet
    if (order.status !== 'paid' && order.status !== 'processing' && order.status !== 'packed' && order.status !== 'shipped') {
      return res.status(409).json({ error: 'ORDER_NOT_PAID', detail: `Order status is ${order.status}` });
    }

    if (order.confirmationEmailSent) {
      return res.json({ ok: true, alreadySent: true });
    }

    // Send confirmation email
    const customerName = order.shipping?.name || '';
    const itemsList = (order.items || []).map(it => `<li style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;display:flex;justify-content:space-between;"><span>${it.name} x${it.qty}</span><span style="font-weight:600;">€${(it.price * it.qty).toFixed(2)}</span></li>`).join('');
    const itemsHtml = `<ul style="list-style:none;padding:0;margin:0;">${itemsList}</ul>`;
    const total = `€${((order.amount || 0) / 100).toFixed(2)}`;

    let tpl = null;
    try {
      const tplPath = new URL('../templates/order-confirmation.html', import.meta.url);
      tpl = await fs.readFile(tplPath, 'utf8');
    } catch (e) {
      tpl = null;
    }

    let html;
    if (tpl) {
      html = tpl
        .replace(/{{orderId}}/g, id)
        .replace(/{{customerName}}/g, customerName)
        .replace(/{{itemsHtml}}/g, itemsHtml)
        .replace(/{{total}}/g, total);
    } else {
      html = `<h1>Gracias por tu pedido</h1><p>Pedido: <strong>#${id}</strong></p><ul>${itemsList}</ul><p><strong>Total: ${total}</strong></p><p>Recibirás un email cuando tu pedido sea enviado.</p>`;
    }

    const result = await sendEmail(order.email, `✅ Confirmación de pedido #${id} - Noctip`, html);

    // Mark email as sent to avoid duplicates
    if (result?.ok) {
      await ref.set({ confirmationEmailSent: true, confirmationEmailSentAt: new Date() }, { merge: true });
    }

    res.json({ ok: result?.ok ?? true, email: result });
  } catch (e) {
    console.error('Error sending confirmation email:', e?.message || e);
    res.status(500).json({ error: 'EMAIL_SEND_FAILED' });
  }
});

// Order confirmation email (called by admin)
app.post('/emails/order-confirmation', adminAuth, async (req,res) => {
  if (!requireDb(res)) return;
  const { orderId, email } = req.body;
  if (!orderId || !email) return res.status(400).json({ error: 'MISSING_FIELDS' });
  
  const ref = db.collection('orders').doc(orderId);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
  
  const order = snap.data();
  const itemsList = (order.items || []).map(it => `<li>${it.name} x${it.qty} - €${(it.price * it.qty).toFixed(2)}</li>`).join('');
  const total = ((order.amount || 0) / 100).toFixed(2);

  // Try to load HTML template if available
  let tpl = null;
  try {
    const tplPath = new URL('../templates/order-confirmation.html', import.meta.url);
    tpl = await fs.readFile(tplPath, 'utf8');
  } catch (e) {
    tpl = null;
  }

  const customerName = order.shipping?.name || '';
  let emailResult;
  if (tpl) {
    const html = tpl
      .replace(/{{orderId}}/g, orderId)
      .replace(/{{customerName}}/g, customerName)
      .replace(/{{itemsHtml}}/g, `<ul>${itemsList}</ul>`)
      .replace(/{{total}}/g, `€${total}`);

    emailResult = await sendEmail(email, `✅ Confirmación de pedido #${orderId} - Noctip`, html);
  } else {
    emailResult = await sendEmail(
      email,
      `✅ Confirmación de pedido #${orderId} - Noctip`,
      `<h1>¡Gracias por tu pedido!</h1>
      <p>Pedido: <strong>#${orderId}</strong></p>
      <h3>Artículos:</h3>
      <ul>${itemsList}</ul>
      <p><strong>Total: €${total}</strong></p>
      <p>Recibirás un email cuando tu pedido sea enviado.</p>
      <p>Gracias por confiar en Noctip.</p>`
    );
  }

  res.json({ ok: emailResult?.ok ?? true, email: emailResult });
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

// Startup verification: test Firestore connection
if (db && !skipExternal) {
  (async () => {
    try {
      const testRef = db.collection('_healthcheck').doc('ping');
      await testRef.set({ ts: new Date() });
      console.log('✅ Firestore connection OK — writes work');
      await testRef.delete();
    } catch (e) {
      console.error('❌ Firestore connection FAILED:', e?.message || e);
      console.error('  code:', e?.code);
    }
  })();
}
