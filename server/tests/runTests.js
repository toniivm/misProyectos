// Simple test runner (no Jest) using supertest
import request from 'supertest';
import { app, skipExternal } from '../src/app.js';

const ADMIN_KEY = process.env.ADMIN_API_KEY || 'changeme_admin_key';

function logResult(name, ok, detail=''){
  const status = ok ? '✅' : '❌';
  console.log(`${status} ${name}${detail ? ' - '+detail : ''}`);
}

async function testHealth(){
  const res = await request(app).get('/health');
  logResult('health endpoint', res.status === 200 && res.body.ok, JSON.stringify(res.body));
}

async function testCreateIntent(){
  const payload = {
    items: [ { id: '1', qty: 1, price: 49.99, name: 'Producto Test' } ],
    currency: 'eur',
    email: 'test@example.com',
    shipping: { name: 'Tester', address: { line1: 'C/ Test 1', city: 'Madrid', postal_code: '28001', country: 'ES' } }
  };
  const res = await request(app).post('/payments/create-intent').send(payload);
  logResult('create-intent', res.status === 200 && !!res.body.clientSecret, `status=${res.status}`);
  return res.body.orderId;
}

async function testInventoryFailure(){
  const payload = {
    items: [ { id: '2', qty: 999, price: 10, name: 'Producto Escaso' } ],
    currency: 'eur',
    email: 'fail@example.com',
    shipping: { name: 'Fail', address: { line1: 'C/ Fail 2', city: 'Madrid', postal_code: '28001', country: 'ES' } }
  };
  const res = await request(app).post('/payments/create-intent').send(payload);
  logResult('create-intent out-of-stock', res.status === 409, `status=${res.status}`);
}

async function testAdminList(){
  const res = await request(app).get('/orders').set('x-admin-key', ADMIN_KEY);
  logResult('admin list orders auth', res.status === 200 && Array.isArray(res.body.orders), `status=${res.status}`);
}

async function testWorkflow(orderId){
  if (!orderId){
    logResult('workflow skipped', false, 'missing orderId');
    return;
  }
  // Directly set order paid (simulate webhook) via patch
  await request(app).patch(`/orders/${orderId}`).send({ status: 'paid' }).set('x-admin-key', ADMIN_KEY);
  const packRes = await request(app).post(`/orders/${orderId}/pack`).set('x-admin-key', ADMIN_KEY);
  logResult('pack order', packRes.status === 200, `status=${packRes.status}`);
  const shipRes = await request(app).post(`/orders/${orderId}/ship`).send({ trackingNumber: 'TRACK123', carrier: 'DHL' }).set('x-admin-key', ADMIN_KEY);
  logResult('ship order', shipRes.status === 200, `status=${shipRes.status}`);
  const deliverRes = await request(app).post(`/orders/${orderId}/deliver`).set('x-admin-key', ADMIN_KEY);
  logResult('deliver order', deliverRes.status === 200, `status=${deliverRes.status}`);
}

(async () => {
  console.log('Running API tests (skipExternal=' + skipExternal + ')');
  try {
    await testHealth();
    const orderId = await testCreateIntent();
    await testInventoryFailure();
    await testAdminList();
    await testWorkflow(orderId);
    console.log('Tests finished');
  } catch (e){
    console.error('Test runner error', e);
    process.exit(1);
  }
})();
