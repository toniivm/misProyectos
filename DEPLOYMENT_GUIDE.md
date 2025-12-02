# 🚀 VALTREX - Deployment & Operations Guide

## Current Deployment Status

### Production URLs
- **Frontend**: https://valtre.onrender.com
- **Backend API**: https://valtrex-backend.onrender.com

### Services Configuration

#### Frontend (valtrex-tienda)
- **Runtime**: Docker (Node 18)
- **Port**: 8080
- **Dockerfile**: `Dockerfile` (root)
- **Health Check**: `/`
- **Instances**: 2

#### Backend (valtrex-backend)
- **Runtime**: Docker (Node 20-alpine)
- **Port**: 8080
- **Dockerfile**: `server/Dockerfile`
- **Docker Context**: `server/`
- **Health Check**: `/health`
- **Instances**: 1

---

## 🔧 Fixed Issues (Dec 2, 2025)

### Backend API 404 Errors
**Problem**: All backend endpoints returning 404
- `/health` → 404
- `/payments/create-intent` → 404
- `/emails/order-confirmation` → 404

**Root Cause**: Incorrect Docker context in render.yaml

**Solution**:
1. Updated `render.yaml` with `dockerContext: server`
2. Fixed `server/Dockerfile` to correctly copy source files
3. Added missing `/emails/order-confirmation` endpoint
4. Added `ADMIN_API_KEY` environment variable

**Files Changed**:
- `server/Dockerfile`
- `server/src/app.js`
- `render.yaml`

---

## 📋 Environment Variables Checklist

### Backend Environment Variables (Required)
```
PORT=8080
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SENDGRID_API_KEY=SG.xxx
SENDER_EMAIL=noreply@yourdomain.com
ADMIN_API_KEY=your-secure-admin-key
```

### Frontend Environment Variables (Required)
```
REACT_APP_FIREBASE_API_KEY=AIzaxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=1:xxx:web:xxx
REACT_APP_FIREBASE_MEASUREMENT_ID=G-xxx
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxx
REACT_APP_API_BASE=https://valtrex-backend.onrender.com
```

---

## 🧪 Testing & Verification

### Quick Health Check
```powershell
# Run verification script
.\scripts\verify_deployment.ps1
```

### Manual API Tests
```powershell
# 1. Health Check
curl.exe -i https://valtrex-backend.onrender.com/health

# 2. Create Payment Intent (with test data)
$body = @{
    items = @(@{ id='demo-1'; qty=1; price=10; name='Demo' })
    currency = 'eur'
    email = 'test@example.com'
    shipping = @{
        name = 'Test User'
        address = @{
            line1 = '123 Test St'
            city = 'Madrid'
            postal_code = '28001'
            country = 'ES'
        }
    }
} | ConvertTo-Json -Depth 5

$headers = @{
    'Content-Type' = 'application/json'
    'Idempotency-Key' = [guid]::NewGuid().ToString()
}

Invoke-RestMethod -Method Post `
    -Uri "https://valtrex-backend.onrender.com/payments/create-intent" `
    -Headers $headers `
    -Body $body
```

### Frontend Test
1. Visit https://valtre.onrender.com
2. Browse products
3. Add items to cart
4. Proceed to checkout
5. Use Stripe test card: `4242 4242 4242 4242`
6. Any expiry date in the future
7. Any CVC (e.g., 123)

---

## 🔐 Security Features

### Implemented
- ✅ Helmet security headers
- ✅ CORS with origin control
- ✅ Rate limiting (200 req/15min)
- ✅ CSP (Content Security Policy)
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Admin API key authentication
- ✅ Idempotency key support
- ✅ Input validation (Joi schemas)
- ✅ Firebase Admin SDK (secure)
- ✅ Stripe webhook signature verification

### CSP Configuration
```
default-src 'self'
script-src 'self' https://js.stripe.com https://*.stripe.com
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
connect-src 'self' https://api.stripe.com https://firestore.googleapis.com 
            https://valtre-backend.onrender.com https://valtrex-backend.onrender.com
frame-src https://js.stripe.com https://*.stripe.com
```

---

## 📦 API Endpoints Reference

### Public Endpoints

#### `GET /health`
Returns backend health status
```json
{ "ok": true, "test": false }
```

#### `POST /payments/create-intent`
Creates a Stripe PaymentIntent
```json
Request:
{
  "items": [{ "id": "product-1", "qty": 2, "price": 89.99, "name": "Nike Air Max" }],
  "currency": "eur",
  "email": "customer@example.com",
  "shipping": {
    "name": "John Doe",
    "address": {
      "line1": "123 Main St",
      "city": "Madrid",
      "postal_code": "28001",
      "country": "ES"
    }
  }
}

Response:
{
  "clientSecret": "pi_xxx_secret_yyy",
  "orderId": "abc123xyz"
}
```

#### `POST /emails/order-confirmation`
Sends order confirmation email
```json
Request:
{
  "orderId": "abc123xyz",
  "email": "customer@example.com"
}

Response:
{ "ok": true }
```

### Admin Endpoints (Require `x-admin-key` header)

#### `GET /orders`
Lists all orders

#### `PATCH /orders/:id`
Updates order status, tracking, etc.

#### `POST /orders/:id/pack`
Marks order as packed

#### `POST /orders/:id/ship`
Marks order as shipped and sends notification
```json
{
  "trackingNumber": "TRACK123",
  "carrier": "DHL"
}
```

#### `POST /orders/:id/deliver`
Marks order as delivered and sends confirmation

---

## 🛠️ Deployment Workflow

### Automatic Deployment
Render auto-deploys on push to `main` branch.

### Manual Redeploy
1. Go to Render Dashboard
2. Select service (valtrex-tienda or valtrex-backend)
3. Click "Manual Deploy" → "Deploy latest commit"

### View Logs
```
Render Dashboard → Service → Logs tab
```

### Common Issues & Solutions

#### Backend Returns 404
- ✅ **Fixed**: Updated `dockerContext: server` in render.yaml
- Check that Docker build completes successfully
- Verify `server/Dockerfile` exists and is correct
- Check logs for startup errors

#### CORS Errors
- Verify `REACT_APP_API_BASE` matches actual backend URL
- Check CSP includes backend domain in `connect-src`
- Ensure backend CORS allows frontend origin

#### Payment Failures
- Verify `STRIPE_SECRET_KEY` is set in backend
- Verify `REACT_APP_STRIPE_PUBLIC_KEY` is set in frontend
- Use test mode keys for testing
- Check Stripe dashboard for webhook events

#### Email Not Sending
- Verify `SENDGRID_API_KEY` is set
- Verify `SENDER_EMAIL` is set and verified in SendGrid
- Check SendGrid dashboard for delivery status
- In test mode, emails may be skipped (check `SKIP_EXTERNAL` env)

#### Firebase Auth Errors
- Add both frontend and backend domains to Firebase Authorized Domains
- Verify all `FIREBASE_*` variables are set correctly
- Check Firebase Console → Authentication → Settings

---

## 📊 Monitoring & Maintenance

### Health Checks
```powershell
# Quick status
Invoke-RestMethod -Uri "https://valtrex-backend.onrender.com/health"

# Full verification
.\scripts\verify_deployment.ps1
```

### Performance
- Monitor Render dashboard metrics
- Check response times in logs
- Adjust instance count if needed

### Database
- Firestore usage: Firebase Console → Firestore → Usage
- Monitor document reads/writes
- Set up budget alerts in Firebase

### Costs
- Render: Starter plan ($7/month per service)
- Firebase: Pay-as-you-go (free tier generous)
- Stripe: No fixed costs (transaction fees only)
- SendGrid: Free tier (100 emails/day)

---

## 🚨 Emergency Procedures

### Backend Down
1. Check Render dashboard for service status
2. View logs: Render Dashboard → valtrex-backend → Logs
3. Verify environment variables are set
4. Try manual redeploy
5. Check recent commits for issues

### Frontend Down
1. Check Render dashboard for service status
2. View logs: Render Dashboard → valtrex-tienda → Logs
3. Check if build completed successfully
4. Verify Nginx configuration
5. Try manual redeploy

### Rollback
```powershell
# Revert to previous commit
git log --oneline -10
git revert HEAD
git push origin main
```

### Contact Support
- Render: support@render.com
- Firebase: Firebase Console → Support
- Stripe: dashboard.stripe.com/support

---

## 📝 Recent Changes Log

### 2025-12-02: Backend API Fix
- **Commit**: `4048c7c`
- **Changes**:
  - Fixed backend 404 errors
  - Added email confirmation endpoint
  - Corrected Docker context configuration
  - Added ADMIN_API_KEY environment variable
- **Impact**: Backend API now fully functional
- **Status**: ✅ Deployed and verified

---

## 🎯 Next Steps / Roadmap

### Immediate (Done ✅)
- ✅ Fix backend 404 errors
- ✅ Add email confirmation endpoint
- ✅ Verify deployment configuration
- ✅ Test end-to-end purchase flow

### Short Term
- [ ] Set up monitoring alerts
- [ ] Configure backup strategy for Firestore
- [ ] Add analytics tracking
- [ ] Implement admin dashboard UI
- [ ] Add more comprehensive error logging

### Medium Term
- [ ] Implement webhook endpoints for Stripe
- [ ] Add order status tracking page
- [ ] Implement returns/refunds flow
- [ ] Add inventory management UI
- [ ] Set up automated testing pipeline

### Long Term
- [ ] Multi-currency support
- [ ] International shipping zones
- [ ] Product recommendations engine
- [ ] Customer loyalty program
- [ ] Mobile app (React Native)

---

## 📚 Additional Resources

- **Render Docs**: https://render.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com

---

**Last Updated**: December 2, 2025
**Version**: 0.2.0
**Status**: 🟢 Production Ready
