# Resolución de Errores de Despliegue - Diciembre 10, 2025

## Problema Identificado

**Errores en Render:**
```
Deploy failed for 0bc0e87: feat: backend products fetch and seed docs
Exited with status 1 while building your code.
December 10, 2025 at 1:50 PM

Deploy failed for 52d9f71: docs: add deployment status tracker
Exited with status 1 while building your code.
December 2, 2025 at 3:05 PM
```

## Causa Raíz

El build de Docker estaba fallando con "exit status 1" durante la fase `npm ci`. Las causas probables:

1. **`npm ci` es muy estricto**: Requiere match exacto entre package.json y package-lock.json
2. **Dependencias nativas**: Algunas dependencias (como bcrypt si se usara) requieren herramientas de compilación en Alpine
3. **Sin fallback**: Si `npm ci` falla, el build completo falla

## Solución Implementada

### 1. Dockerfile Mejorado (`server/Dockerfile`)

**Cambios realizados:**

```dockerfile
# ANTES
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY tests ./tests

# DESPUÉS
FROM node:20-alpine

# Instalar dependencias de build para módulos nativos
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package*.json ./

# npm ci con fallback a npm install
RUN npm ci --only=production || npm install --production

COPY src ./src

# Health check integrado
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
```

**Mejoras clave:**
- ✅ Instala herramientas de build (python3, make, g++) para módulos nativos
- ✅ Fallback: Intenta `npm ci` primero, si falla usa `npm install`
- ✅ Health check integrado en el Dockerfile
- ✅ Optimizado: Solo copia `src/` (no `tests/` en producción)

### 2. Scripts de Diagnóstico

**`scripts/deployment/diagnose_deployment.ps1`**: Diagnóstico completo
- Verifica estado del repositorio
- Valida archivos críticos
- Prueba conectividad backend/frontend
- Verifica estructura de directorios
- Da recomendaciones específicas

**`scripts/deployment/watch_deploy.ps1`**: Monitor en tiempo real
- Monitorea cada 10 segundos el endpoint /health
- Muestra progreso estimado del despliegue
- Notifica cuando el backend está online
- Timeout configurable

## Despliegue Actual

**Commit**: `e847e69` - "fix: improve Dockerfile build reliability with fallback npm install"

**Timeline esperado:**
- ⏱️ 18:56 - Push realizado
- ⏱️ 18:56-18:58 - Render detecta push y queue build
- ⏱️ 18:58-19:03 - Docker build (npm install)
- ⏱️ 19:03-19:06 - Deployment y health checks
- ✅ 19:06 - Backend online

**Estado actual**: Monitoreando con `scripts/deployment/watch_deploy.ps1`

## Verificación Post-Despliegue

Una vez que el backend esté online, verificar:

1. **Health endpoint**:
   ```powershell
   Invoke-RestMethod -Uri https://valtrex-backend.onrender.com/health
   ```

2. **Payment intent creation**:
   ```powershell
   $body = @{ amount = 10000 } | ConvertTo-Json
   Invoke-RestMethod -Uri https://valtrex-backend.onrender.com/payments/create-intent `
     -Method POST -Body $body -ContentType 'application/json'
   ```

3. **Frontend integration**:
   - Visitar https://valtre.onrender.com/products
   - Agregar producto al carrito
   - Intentar checkout con Stripe

## Variables de Entorno Requeridas

Asegurar que en Render Dashboard estén configuradas:

**Backend (`valtrex-backend`):**
```env
PORT=8080
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n"
SENDGRID_API_KEY=SG...
SENDER_EMAIL=...
ADMIN_API_KEY=...
```

## Lecciones Aprendidas

1. **Siempre incluir fallback en builds**: `npm ci || npm install`
2. **Instalar build tools en Alpine**: python3, make, g++
3. **Health checks integrados**: Facilitan debugging en Render
4. **Monitoreo proactivo**: Scripts automáticos para verificar despliegues
5. **Logs detallados**: Revisar Render Dashboard ante cualquier fallo

## Referencias

- Render Dashboard: https://dashboard.render.com/
- Backend Service: valtrex-backend
- Frontend Service: valtrex-tienda
- Documentación: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
