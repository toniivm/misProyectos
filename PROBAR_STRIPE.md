# 🧪 PROBAR STRIPE - Guía Rápida

## ✅ ¡Tu Stripe está Configurado!

**Clave instalada:** `pk_test_51SY4J5...`

---

## 🎯 CÓMO PROBAR (3 minutos)

### **PASO 1: Esperar a que cargue el servidor**
Espera a que en la terminal veas:
```
Compiled successfully!

Local: http://localhost:3000
```

### **PASO 2: Abrir el sitio**
1. Abre: **http://localhost:3000**
2. Añade productos al carrito (click en productos + "Añadir al carrito")
3. Click en el icono del carrito (arriba derecha)
4. Click "**Finalizar Compra**"

### **PASO 3: Completar Paso 1 - Envío**
Rellena los datos de envío:
```
Nombre: Juan Pérez Test
Email: test@valtrex.com
Teléfono: 612345678
Dirección: Calle Serrano 45
Ciudad: Madrid
Provincia: Madrid
CP: 28001
```

Click "**Continuar al Pago**"

### **PASO 4: Usar Tarjeta de Test de Stripe** 🎉

**IMPORTANTE:** Usa esta tarjeta de prueba (Stripe la acepta):

```
Número de tarjeta:  4242 4242 4242 4242
Fecha vencimiento:  12/34  (cualquier fecha futura)
CVV:                123
Nombre:             JUAN PEREZ
Código postal:      28001
```

### **PASO 5: Completar Pago**

En el Paso 2 deberías ver:
- ✅ Formulario de Stripe (no el manual anterior)
- ✅ Campos de tarjeta con validación automática
- ✅ Botón "Pagar X.XX €"

Si estás en **Safari/iPhone**, también verás:
- 🍎 Botón "Apple Pay" (opcional, puedes usar tarjeta)

Rellena con la tarjeta de test y click "**Pagar**"

### **PASO 6: Verificar Éxito** ✅

Deberías ver:
- ✅ Pantalla: "¡Pedido Confirmado!"
- ✅ Número de pedido: #ORD-XXXXX
- ✅ Mensaje de seguimiento

**¡FUNCIONA!** 🎉

---

## 💳 Más Tarjetas de Test

| Tipo | Número | Resultado |
|------|--------|-----------|
| **Visa (éxito)** | 4242 4242 4242 4242 | ✅ Pago exitoso |
| **Mastercard (éxito)** | 5555 5555 5555 4444 | ✅ Pago exitoso |
| **Amex (éxito)** | 3782 822463 10005 | ✅ Pago exitoso |
| **Visa (rechazo)** | 4000 0000 0000 0002 | ❌ Tarjeta rechazada |
| **Visa (3D Secure)** | 4000 0025 0000 3155 | 🔐 Requiere autenticación |

**Para todas:**
- Fecha: Cualquier futura (ej: 12/34)
- CVV: Cualquiera (ej: 123)
- CP: Cualquiera (ej: 28001)

---

## 🍎 Probar Apple Pay (Si tienes Mac/iPhone)

### **Requisitos:**
- Navegador Safari o iPhone
- Apple Pay configurado en tu dispositivo
- Tarjeta añadida en Wallet

### **Pasos:**
1. Abre el checkout en **Safari** (no Chrome)
2. En el Paso 2, verás botón **"🍎 Apple Pay"**
3. Click en "Apple Pay"
4. Autoriza con Face ID / Touch ID
5. ¡Pago completado en 5 segundos!

---

## 🔍 Ver Pagos en Stripe Dashboard

### **Ver tus transacciones de test:**
1. Ve a: **https://dashboard.stripe.com/**
2. Asegúrate de estar en **"Test mode"** (toggle arriba derecha)
3. Click en "**Payments**" (menú lateral izquierdo)
4. Verás todos los pagos de prueba que hagas

**Cada pago de test te mostrará:**
- Monto
- Estado (Succeeded, Failed, etc.)
- Tarjeta usada (últimos 4 dígitos)
- Email del cliente
- Timestamp

---

## 🐛 Problemas Comunes

### **"Stripe is not defined"**
**Solución:**
- Reinicia el servidor: `Ctrl+C` → `npm start`
- Verifica que el `.env` tenga la clave correcta

### **"Invalid API Key"**
**Solución:**
- Verifica que la clave en `.env` sea `pk_test_51SY4J5...`
- Asegúrate de que guardaste el archivo `.env` (`Ctrl+S`)
- Reinicia el servidor

### **No veo el formulario de Stripe**
**Solución:**
- Abre la consola del navegador (`F12`)
- Busca errores en rojo
- Verifica que estés en http://localhost:3000 (no en otra URL)

### **Apple Pay no aparece**
**Esto es normal si:**
- Estás en Chrome/Firefox (solo funciona en Safari)
- No tienes Apple Pay configurado
- No afecta el funcionamiento, puedes usar tarjeta normal

---

## ✅ Checklist de Verificación

Antes de pasar a producción, verifica:

- [ ] Servidor iniciado y compilado sin errores
- [ ] Sitio abierto en http://localhost:3000
- [ ] Productos añadidos al carrito
- [ ] Checkout completado (Paso 1 - Envío)
- [ ] Formulario de Stripe visible en Paso 2
- [ ] Tarjeta de test funciona: `4242 4242 4242 4242`
- [ ] Pago procesado correctamente
- [ ] Pantalla de confirmación mostrada
- [ ] Pedido guardado en Firebase Firestore
- [ ] Pago visible en Stripe Dashboard → Payments

---

## 🚀 Próximos Pasos

### **1. Configurar en Producción (Render.com)**
1. Ve a: https://dashboard.render.com/
2. Tu proyecto: **valtre**
3. Tab "**Environment**"
4. Añadir variable:
   ```
   Key:   REACT_APP_STRIPE_PUBLIC_KEY
   Value: pk_test_51SY4J5CiLTbtsf8Woq8Jp3tqK1J77a3iSVmfz5ltIrowAmwpF0vdeOvJ347D7tG9ugkgDmgZnbl3UMNwE3omb6ic008ZDcnkJ8
   ```
5. Click "**Save Changes**"
6. Render auto-desplegará con Stripe funcionando

### **2. Modo LIVE (Pagos Reales)**
**Cuando estés listo para recibir pagos reales:**

1. **Activar cuenta Stripe:**
   - Dashboard → "Activate your account"
   - Completa información del negocio
   - Añade cuenta bancaria para recibir pagos

2. **Cambiar a claves LIVE:**
   - Dashboard → Developers → API Keys
   - Desactiva "Test mode" (toggle)
   - Copia la clave `pk_live_...`
   - Actualiza `.env` y Render con la clave LIVE

3. **Verificar dominio para Apple Pay:**
   - Dashboard → Settings → Payment Methods → Apple Pay
   - Añade: `valtre.onrender.com`
   - Verifica el dominio

---

## 💰 Recordatorio de Costes

**Modo TEST (actual):** 0€ - Gratis ilimitado
**Modo LIVE:** 1.4% + 0.25€ por transacción

---

**Fecha:** 15 de enero de 2025
**Estado:** ✅ Stripe Configurado y Listo para Probar
