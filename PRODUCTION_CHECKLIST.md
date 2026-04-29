# VALTREX - Production Deployment Checklist

## ✅ Backend Configuration

### Environment Variables (Render Backend Service)
```bash
PORT=8080
STRIPE_SECRET_KEY=sk_live_xxx           # ⚠️ USAR CLAVE LIVE, no test
STRIPE_WEBHOOK_SECRET=whsec_xxx          # Configurar desde Stripe Dashboard
SENDGRID_API_KEY=SG.xxx                  # Opcional pero recomendado
SENDER_EMAIL=noreply@valtrex.com         # Email verificado en SendGrid
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@xxx.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXX\n-----END PRIVATE KEY-----\n"
ADMIN_API_KEY=STRONG_RANDOM_KEY_HERE     # Generar con: openssl rand -base64 32
```

### Stripe Webhook Setup
1. Ir a Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://valtrex-backend.onrender.com/stripe/webhook`
3. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copiar webhook secret a `STRIPE_WEBHOOK_SECRET`

### Firebase Firestore
- Crear colección `products` con documentos:
  ```json
  {
    "id": "1",
    "title": "Nombre Producto",
    "price": 99.99,
    "stock": 50,    // ⚠️ CAMPO OBLIGATORIO (number)
    "brand": "Sin marca",
    "images": ["url1", "url2"]
  }
  ```
- Crear índices si necesario para `orders` (campo `createdAt` DESC)

---

## ✅ Frontend Configuration

### Environment Variables (Render Frontend Service)
```bash
REACT_APP_API_BASE=https://valtrex-backend.onrender.com
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_xxx  # ⚠️ USAR CLAVE LIVE
```

### Build & Deploy
- Build automático desde `Dockerfile` en Render
- Nginx sirve static assets con headers de seguridad (CSP, HSTS)

---

## ✅ Security Checklist

- [ ] CSP en `nginx.conf` incluye todos los dominios necesarios (Stripe, Firebase, backend)
- [ ] HTTPS activado (automático en Render)
- [ ] `ADMIN_API_KEY` fuerte y único
- [ ] Variables secretas no commitadas en Git
- [ ] Rate limiting activo (200 req/15min por IP)
- [ ] Helmet configurado con headers seguros

---

## ✅ Testing Pre-Production

### Backend Tests
```bash
cd server
npm test  # Debe pasar todos los tests
```

### Manual Test Flow
1. **Crear producto en Firestore** con stock > 0
2. **Agregar al carrito** en frontend
3. **Checkout** → rellenar datos envío
4. **Pago** → usar tarjeta test Stripe: `4242 4242 4242 4242` (12/34, CVV 123)
5. **Verificar**:
   - Orden creada en Firestore (status: `paid`)
   - Stock decrementado
   - Email de confirmación recibido
6. **Admin workflow** (con Postman/curl):
   ```bash
   # Marcar como empaquetado
   curl -X POST https://backend.com/orders/ORDER_ID/pack \
     -H "x-admin-key: YOUR_KEY"
   
   # Marcar como enviado
   curl -X POST https://backend.com/orders/ORDER_ID/ship \
     -H "x-admin-key: YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"trackingNumber":"TRACK123","carrier":"DHL"}'
   
   # Marcar como entregado
   curl -X POST https://backend.com/orders/ORDER_ID/deliver \
     -H "x-admin-key: YOUR_KEY"
   ```
7. **Verificar emails** de envío y entrega

---

## ✅ Monitoring & Operations

### Health Check
- `GET /health` debe devolver `{"ok":true}`

### Admin Endpoints (requieren header `x-admin-key`)
- `GET /orders?limit=50` - Listar órdenes
- `PATCH /orders/:id` - Actualizar orden (status, tracking)
- `POST /orders/:id/pack` - Marcar empaquetado
- `POST /orders/:id/ship` - Marcar enviado (envía email)
- `POST /orders/:id/deliver` - Marcar entregado (envía email)

### Log Monitoring
- Render logs dashboard para errores/warnings
- Monitorear `create-intent error`, `Inventory decrement error`, `Email send error`

---

## ✅ Performance & Scale

- Rate limit ajustable en `app.js` (actual: 200/15min)
- Firestore límites: 10K escrituras/s (suficiente para e-commerce pequeño/mediano)
- Stripe límites: depende del plan
- Render: escala automáticamente según plan

---

## ✅ Rollback Plan

Si algo falla en producción:
1. Revertir commit: `git revert HEAD`
2. Push: `git push origin main`
3. Render redeploya automáticamente
4. Verificar health endpoint

---

## 📋 Post-Deployment Tasks

- [ ] Cambiar Stripe de test a live mode
- [ ] Configurar dominio personalizado (opcional)
- [ ] SSL cert verificado
- [ ] Monitoring/alertas configuradas
- [ ] Backup de Firestore activado
- [ ] Documentar procedimientos admin

---

## 🚀 Ready to Deploy

**Todos los tests pasados ✅**  
**Variables configuradas ✅**  
**Flujo completo validado ✅**

```bash
git add .
git commit -m "feat: production-ready VALTREX e-commerce with payments, inventory, shipping workflow"
git push origin main
```

Render desplegará automáticamente ambos servicios.
