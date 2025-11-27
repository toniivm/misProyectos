# 🚀 GUÍA RÁPIDA: Activar Stripe en 5 Pasos

## ⚠️ ANTES DE EMPEZAR
He preparado TODO el código necesario. Solo necesitas:
1. Crear cuenta en Stripe (5 minutos)
2. Copiar una clave
3. Reiniciar el servidor

---

## 📝 PASO 1: Crear Cuenta en Stripe

### 1.1. Registro (2 minutos)
1. Abre: **https://stripe.com/**
2. Click "**Start now**" (botón azul arriba derecha)
3. Rellena:
   - Email: tu_email@ejemplo.com
   - Contraseña: (crea una segura)
4. Click "**Create account**"
5. Verifica tu email (revisa bandeja de entrada)

### 1.2. Skip del wizard (opcional)
- Stripe te preguntará sobre tu negocio
- Puedes hacer **Skip** por ahora (lo completarás después)
- O completa básico: Nombre tienda, tipo de productos

---

## 🔑 PASO 2: Obtener Tu Clave Pública (1 minuto)

### 2.1. Ir al Dashboard
Después de crear la cuenta, irás automáticamente al Dashboard de Stripe.
- Si no, ve a: **https://dashboard.stripe.com/**

### 2.2. Activar Modo Test
En la esquina superior derecha, verás un toggle:
- **🔴 Test mode** ← Debe estar activado (fondo naranja/rojo)
- Si dice "Live mode", haz click para cambiar a Test

### 2.3. Obtener la Clave
1. Click en "**Developers**" (menú superior derecho)
2. Click en "**API keys**" (menú lateral izquierdo)
3. Verás dos claves:

```
Publishable key
pk_test_51abc123...xyz789  [🔵 Reveal test key] [📋 Copy]
                              ↑ Click aquí

Secret key  
sk_test_51abc123...xyz789  [👁️ Reveal test key] [🔒]
```

4. **Click en "Reveal test key"** de la **Publishable key** (la primera)
5. **Click en el icono 📋 "Copy"**
6. Ya tienes tu clave copiada ✅

**⚠️ IMPORTANTE:** 
- Copia la **Publishable key** (empieza con `pk_test_`)
- NO copies la Secret key (esa es para el backend)

---

## 💻 PASO 3: Pegar la Clave en tu Proyecto (30 segundos)

### 3.1. Abrir archivo `.env`
En VS Code, abre el archivo: `.env` (en la raíz del proyecto)

Verás esto:
```env
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_REEMPLAZAR_CON_TU_CLAVE_PUBLICA_DE_STRIPE
```

### 3.2. Reemplazar con tu clave
Pega tu clave copiada:
```env
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51abc123...tu_clave_aqui...xyz789
```

### 3.3. Guardar archivo
`Ctrl + S` (Windows) o `Cmd + S` (Mac)

✅ ¡Listo! Ya tienes Stripe configurado en tu proyecto.

---

## 🔄 PASO 4: Reiniciar Servidor (1 minuto)

### 4.1. Detener servidor actual
En la terminal de VS Code:
- `Ctrl + C` (Windows/Mac)
- Escribe: `y` y Enter (si pregunta)

### 4.2. Iniciar servidor de nuevo
```bash
npm start
```

Espera a que diga:
```
Compiled successfully!

You can now view misProyectos in the browser.

  Local:            http://localhost:3000
```

---

## ✅ PASO 5: Probar Stripe en el Checkout

### 5.1. Ir al checkout
1. Abre: http://localhost:3000
2. Añade productos al carrito
3. Click "**Finalizar Compra**"

### 5.2. Completar datos de envío (Paso 1)
- Rellena: Nombre, Email, Dirección, etc.
- Click "**Continuar al Pago**"

### 5.3. Ver Stripe Payment Element (Paso 2)
¡Aquí verás el nuevo formulario de Stripe! 🎉

Deberías ver:
- **Tabs:** Card | Link | (Apple Pay si estás en Safari)
- Formulario de tarjeta de Stripe (no el antiguo manual)
- Botones Apple Pay/Google Pay (si están disponibles)

### 5.4. Probar con tarjeta de test
Usa esta tarjeta de prueba de Stripe:

```
Número:    4242 4242 4242 4242
Fecha:     12/34 (cualquier fecha futura)
CVV:       123
Código:    12345 (cualquier postal code)
```

Click "**Pagar X.XX €**"

### 5.5. Resultado esperado
- ✅ Spinner "Procesando pago..."
- ✅ Pantalla de éxito: "¡Pedido Confirmado!"
- ✅ Número de pedido generado

---

## 🍎 BONUS: Apple Pay (Si tienes Mac/iPhone)

Si estás en **Safari** o **iPhone**, verás automáticamente:
- Botón "**🍎 Apple Pay**" en el Paso 2
- Click para pagar con Face ID/Touch ID
- ¡Checkout en 5 segundos!

**Requisitos:**
- Safari o iPhone
- Apple Pay configurado en tu dispositivo

---

## 🎉 ¡YA ESTÁ FUNCIONANDO!

Si seguiste los pasos correctamente:
- ✅ Stripe está integrado
- ✅ Pagos con tarjeta funcionan
- ✅ Apple Pay/Google Pay automáticos (si disponibles)
- ✅ Validación de Stripe
- ✅ 3D Secure automático
- ✅ PCI-DSS compliant

---

## 🌐 PASO 6: Configurar en Render.com (Producción)

### 6.1. Ir a Render Dashboard
1. Abre: https://dashboard.render.com/
2. Login con tu cuenta
3. Click en tu proyecto "**valtre**"

### 6.2. Añadir Variable de Entorno
1. Tab "**Environment**" (menú lateral)
2. Scroll hasta la sección "Environment Variables"
3. Click "**Add Environment Variable**"
4. Rellena:
   ```
   Key:    REACT_APP_STRIPE_PUBLIC_KEY
   Value:  pk_test_51abc123...tu_clave...xyz789
   ```
5. Click "**Save Changes**"

### 6.3. Deploy Automático
Render automáticamente re-desplegará tu app con la nueva variable.
- Espera 2-3 minutos
- Ve a: https://valtre.onrender.com/
- ¡Stripe estará funcionando en producción! 🚀

---

## 📊 Ver Pagos en Stripe Dashboard

### Dashboard: https://dashboard.stripe.com/

Verás:
- **Payments:** Lista de todos los pagos (incluso de test)
- **Customers:** Clientes que han pagado
- **Logs:** Debug de errores

**Filtrar por test:** Click en "**View test data**" arriba

---

## 🐛 ¿Problemas?

### Error: "Stripe is not defined"
**Solución:**
1. Verifica que ejecutaste: `npm install @stripe/stripe-js @stripe/react-stripe-js`
2. Reinicia el servidor: `Ctrl+C` y `npm start`

### Error: "Invalid API Key"
**Solución:**
1. Verifica que copiaste la clave **Publishable** (pk_test_...)
2. Verifica que pegaste bien en `.env` (sin espacios)
3. Verifica que guardaste el archivo `.env`
4. Reinicia el servidor

### No veo el formulario de Stripe
**Solución:**
1. Abre la consola del navegador (`F12`)
2. Busca errores en rojo
3. Verifica que `REACT_APP_STRIPE_PUBLIC_KEY` esté en `.env`
4. Reinicia el servidor

### Apple Pay no aparece
**Normal si:**
- Estás en Chrome/Firefox (solo Safari)
- No tienes Apple Pay configurado
- No es un problema, tarjetas siguen funcionando

---

## 📞 Soporte

**Documentación Stripe:** https://stripe.com/docs
**Support:** https://support.stripe.com/

---

## ✅ Checklist Final

- [ ] Cuenta Stripe creada
- [ ] Clave `pk_test_...` copiada
- [ ] Clave pegada en `.env`
- [ ] Servidor reiniciado (`npm start`)
- [ ] Checkout abierto en navegador
- [ ] Formulario de Stripe visible
- [ ] Tarjeta de test probada: `4242 4242 4242 4242`
- [ ] Pago procesado exitosamente
- [ ] Variable configurada en Render.com

---

**¡Listo!** Stripe está funcionando. 🎉

Ahora tienes:
- Pagos reales con tarjetas
- Apple Pay automático
- Google Pay automático
- Validación de Stripe
- Seguridad PCI-DSS

**Próximo paso:** Cuando quieras aceptar pagos reales:
1. Activa tu cuenta Stripe (completa datos del negocio)
2. Cambia `pk_test_` por `pk_live_` 
3. Listo para producción 💰
