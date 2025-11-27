# GUÍA: Integración de Stripe Payment Gateway

## 🎯 Objetivo
Integrar **Stripe** para procesar pagos reales con tarjetas, Apple Pay, Google Pay y PayPal.

---

## 📝 Paso 1: Crear Cuenta en Stripe

### 1.1. Registro
1. Ve a: **https://stripe.com/**
2. Click "Start now" o "Empezar"
3. Completa el registro con tu email
4. Verifica tu email
5. Completa el perfil de tu negocio

### 1.2. Obtener Claves API
1. Ve al **Dashboard de Stripe**: https://dashboard.stripe.com/
2. Click en "Developers" (menú superior derecho)
3. Click en "API keys"
4. Verás dos claves:
   - **Publishable key** (empieza con `pk_test_...` en modo test)
   - **Secret key** (empieza con `sk_test_...` en modo test)

⚠️ **IMPORTANTE:** 
- Usa claves de **TEST** primero (`pk_test_` y `sk_test_`)
- Cuando todo funcione, activa tu cuenta y usa claves **LIVE** (`pk_live_` y `sk_live_`)

---

## 📦 Paso 2: Instalación (Ya Completado ✅)

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

## 🔐 Paso 3: Configurar Variables de Entorno

### 3.1. Crear archivo `.env` en la raíz del proyecto:

```env
# Stripe Public Key (FRONTEND - seguro compartir)
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_TU_CLAVE_PUBLICA_AQUI

# Firebase (ya existentes)
REACT_APP_FIREBASE_API_KEY=AIzaSyCwPVVjeFsFOst_VCio5b-BwKoDkIvrH50
REACT_APP_FIREBASE_AUTH_DOMAIN=valtre-73c7b.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=valtre-73c7b
```

### 3.2. Añadir `.env` a `.gitignore`:

Verifica que tu `.gitignore` incluya:
```
.env
.env.local
.env.production
```

### 3.3. Configurar en Render.com:

1. Ve a: https://dashboard.render.com/
2. Selecciona tu proyecto `valtre`
3. Tab "Environment"
4. Añade variable:
   - **Key:** `REACT_APP_STRIPE_PUBLIC_KEY`
   - **Value:** `pk_test_...` (tu clave pública)
5. Click "Save Changes"

---

## 🚀 Paso 4: Arquitectura de Integración

### ¿Cómo Funciona?

```
┌─────────────────┐
│   FRONTEND      │
│  (React App)    │
│                 │
│  1. Usuario     │
│     completa    │
│     checkout    │
│                 │
│  2. Stripe      │
│     Elements    │
│     captura     │
│     pago        │
└────────┬────────┘
         │
         │ 3. Crea PaymentIntent
         ▼
┌─────────────────┐
│  BACKEND        │
│ (Firebase       │
│  Functions)     │
│                 │
│  4. Stripe API  │
│     procesa el  │
│     pago        │
└────────┬────────┘
         │
         │ 5. Confirmación
         ▼
┌─────────────────┐
│   STRIPE        │
│   Servers       │
│                 │
│  6. Cargo real  │
│     a la        │
│     tarjeta     │
└─────────────────┘
```

---

## 💳 Paso 5: Componente StripeCheckout (Ya Creado)

**Archivo:** `src/components/StripeCheckout.jsx`

Este componente reemplaza el formulario manual de tarjeta con Stripe Elements, que maneja:
- Validación automática de tarjetas
- Apple Pay (si está disponible)
- Google Pay (si está disponible)
- Seguridad PCI-DSS completa
- 3D Secure (autenticación bancaria)

---

## 🔧 Paso 6: Firebase Functions (Backend)

### 6.1. Instalar Firebase CLI:
```bash
npm install -g firebase-tools
```

### 6.2. Login en Firebase:
```bash
firebase login
```

### 6.3. Inicializar Functions:
```bash
firebase init functions
```
- Selecciona: **Firestore, Functions**
- Lenguaje: **JavaScript**
- ESLint: Sí
- Instalar dependencias: Sí

### 6.4. Instalar Stripe en Functions:
```bash
cd functions
npm install stripe
cd ..
```

### 6.5. Crear `functions/index.js`:

```javascript
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_TU_SECRET_KEY_AQUI'); // Reemplazar con tu Secret Key
const admin = require('firebase-admin');

admin.initializeApp();

// Crear Payment Intent
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const { amount, currency = 'eur' } = data;
    
    // Validación
    if (!amount || amount <= 0) {
      throw new functions.https.HttpsError('invalid-argument', 'Amount must be greater than 0');
    }
    
    // Crear PaymentIntent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: currency,
      payment_method_types: ['card', 'apple_pay', 'google_pay'],
      metadata: {
        userId: context.auth?.uid || 'guest',
        timestamp: new Date().toISOString(),
      },
    });
    
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
    
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Webhook para confirmar pagos (opcional pero recomendado)
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_TU_WEBHOOK_SECRET_AQUI'; // Obtener de Stripe Dashboard
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Manejar eventos
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      
      // Aquí puedes actualizar el pedido en Firestore
      await admin.firestore().collection('orders').doc(paymentIntent.metadata.orderId).update({
        status: 'paid',
        paymentIntentId: paymentIntent.id,
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      break;
      
    case 'payment_intent.payment_failed':
      console.log('PaymentIntent failed:', event.data.object.id);
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  res.json({ received: true });
});
```

### 6.6. Desplegar Functions:
```bash
firebase deploy --only functions
```

---

## 🧪 Paso 7: Tarjetas de Test

Usa estas tarjetas para probar (modo TEST):

| Tipo | Número | Fecha | CVV | Resultado |
|------|--------|-------|-----|-----------|
| **Visa** | 4242 4242 4242 4242 | 12/34 | 123 | ✅ Éxito |
| **Mastercard** | 5555 5555 5555 4444 | 12/34 | 123 | ✅ Éxito |
| **Amex** | 3782 822463 10005 | 12/34 | 1234 | ✅ Éxito |
| **Decline** | 4000 0000 0000 0002 | 12/34 | 123 | ❌ Rechazada |
| **3D Secure** | 4000 0025 0000 3155 | 12/34 | 123 | 🔐 Requiere auth |

**Documentación completa:** https://stripe.com/docs/testing

---

## 🍎 Paso 8: Activar Apple Pay

### 8.1. Requisitos:
- Dominio con **HTTPS** ✅ (Render ya lo tiene)
- Navegador Safari o iPhone
- Usuario con Apple Pay configurado

### 8.2. Verificar Dominio en Stripe:
1. Stripe Dashboard → Settings → Payment Methods
2. Click "Apple Pay"
3. Click "Add Domain"
4. Añade: `valtre.onrender.com`
5. Descarga archivo de verificación
6. Súbelo a: `public/.well-known/apple-developer-merchantid-domain-association`

### 8.3. Stripe Habilitará Apple Pay Automáticamente
- Si el dominio está verificado
- Si el navegador es Safari
- Si el usuario tiene Apple Pay

---

## 🎨 Paso 9: UI/UX Mejorado

El componente `StripeCheckout` incluye:
- ✅ Validación automática en tiempo real
- ✅ Iconos de marcas de tarjetas
- ✅ Mensajes de error claros
- ✅ Loading states
- ✅ 3D Secure integrado
- ✅ Apple Pay button (si está disponible)
- ✅ Google Pay button (si está disponible)

---

## 📊 Paso 10: Monitoreo en Stripe Dashboard

Después de integrar, podrás ver en Stripe:
- **Payments:** Todos los pagos procesados
- **Customers:** Lista de clientes
- **Analytics:** Métricas de conversión
- **Logs:** Debug de pagos fallidos
- **Webhooks:** Eventos recibidos

**Dashboard:** https://dashboard.stripe.com/

---

## 🔥 Paso 11: Activar Modo LIVE (Producción)

Cuando esté todo probado:

1. **Activar cuenta Stripe:**
   - Stripe Dashboard → Activate Account
   - Completa información del negocio
   - Verifica cuenta bancaria para recibir pagos

2. **Cambiar claves:**
   - Usa `pk_live_...` en `.env` y Render
   - Usa `sk_live_...` en Firebase Functions

3. **Actualizar dominio:**
   - Re-verificar `valtre.onrender.com` para Apple Pay en modo LIVE

4. **Deploy final:**
```bash
git add .
git commit -m "feat: Stripe LIVE mode activado"
git push origin main
```

---

## 💰 Costes de Stripe

- **Por transacción:** 1.4% + 0.25€ (tarjetas europeas)
- **Sin cuotas mensuales**
- **Sin setup fee**

**Calculadora:** https://stripe.com/es/pricing

---

## 🐛 Troubleshooting

### Error: "Stripe is not defined"
- Verifica que instalaste: `npm install @stripe/stripe-js`
- Reinicia el servidor: `npm start`

### Error: "Invalid API Key"
- Verifica que copiaste bien la clave de Stripe Dashboard
- Asegúrate de usar `pk_test_` en frontend, `sk_test_` en backend

### Apple Pay no aparece
- Verifica que estés en Safari/iPhone
- Verifica que el dominio esté verificado en Stripe
- Verifica que el usuario tenga Apple Pay configurado

### Payment Intent Failed
- Revisa Stripe Dashboard → Logs para ver el error exacto
- Verifica que el amount sea mayor a 0
- Verifica que la tarjeta de test sea válida

---

## 📚 Recursos

- **Documentación Stripe:** https://stripe.com/docs
- **React Integration:** https://stripe.com/docs/stripe-js/react
- **Testing:** https://stripe.com/docs/testing
- **Apple Pay:** https://stripe.com/docs/apple-pay
- **Dashboard:** https://dashboard.stripe.com/

---

## ✅ Checklist Final

- [ ] Cuenta Stripe creada
- [ ] Claves API obtenidas (pk_test_ y sk_test_)
- [ ] Variables de entorno configuradas (.env + Render)
- [ ] StripeCheckout.jsx integrado en CheckoutPage
- [ ] Firebase Functions desplegadas
- [ ] Tarjetas de test probadas
- [ ] Apple Pay verificado (opcional)
- [ ] Modo LIVE activado (cuando estés listo)

---

**Fecha:** 15 de enero de 2025
**Versión:** 3.0.0 - Stripe Payment Gateway
