# Seguridad en VALTREX

Este documento resume prácticas y pasos recomendados para mantener la aplicación segura de la tienda VALTREX.

## 1. Firebase App Check
Protege tus recursos de Firebase (Firestore, Storage, etc.) contra abuso.

### Pasos Básicos (Web reCAPTCHA v3)
1. En la consola de Firebase ve a: App Check > Registrar app.
2. Selecciona **reCAPTCHA v3** y genera credenciales.
3. Instala el SDK (ya está instalado `firebase`).
4. Inicializa en tu `src/firebase/config.js`:
```js
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const app = initializeApp(firebaseConfig);
// Reemplaza "TU_CLAVE_RECAPTCHA" con la clave de sitio proporcionada por Firebase
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('TU_CLAVE_RECAPTCHA'),
  isTokenAutoRefreshEnabled: true
});
```
5. Activa la **enforcement** gradualmente desde la consola (modo debug opcional en local añadiendo `?firebaseAppCheckDebugToken=...`).

### Beneficios
- Evita consumo malicioso de cuotas.
- Dificulta scripts automáticos atacando endpoints.

## 2. Cabeceras de Seguridad (Nginx)
Ya configuradas (ver `nginx.conf`):
- `Content-Security-Policy` estricta limitando orígenes.
- `Cross-Origin-Opener-Policy: same-origin-allow-popups` para compatibilidad con login Google.
- `Cross-Origin-Resource-Policy: same-origin`.
- `Permissions-Policy` reduciendo acceso a sensores/cámara.
- `Strict-Transport-Security` (solo si hay HTTPS en el proxy frontal).
- `X-Frame-Options: DENY` impide clickjacking.

## 3. Service Worker
El archivo `public/service-worker.js` implementa:
- Precaching de assets críticos.
- Cache dinámico de imágenes (Unsplash/placehold). Limita tamaño y elimina versiones antiguas.
- Fallback offline a `index.html` para navegación SPA.

Mejoras futuras:
- Integrar Workbox para precached manifest automático.
- Estrategias avanzadas (Stale-While-Revalidate para CSS/JS, Cache First para fuentes).

## 4. Gestión de Dependencias
- Mantén `react-scripts`, `firebase` y librerías de pago (Stripe/PayPal) actualizadas.
- Ejecuta auditoría: `npm audit --production` tras cada actualización.

## 5. Protección de Formularios y Datos
- Sanitización básica implementada (longitud y trimming).
- Añadir en futuro: validación de email avanzada y verificación de dominio.
- Considerar rate limiting con un backend proxy para endpoints sensibles (checkout). 

## 6. Autenticación
- Firebase Auth popups funcionan gracias a COOP ajustada.
- Revisar configuración de dominios autorizados en Firebase Console.

## 7. Política de Cookies / Consentimiento
- Componente `CookieConsent` guarda preferencia en `localStorage`.
- Para RGPD completo: dividir cookies por categorías (necesarias / analíticas / marketing) y ofrecer granularidad.

## 8. Monitoreo CSP (Opcional)
- Activar `report-to` o `report-uri` endpoint (ya placeholder en `nginx.conf` comentado) para registrar violaciones y detectar inyecciones.

## 9. Estrategia de Deploy
- Build en contenedor Node; servido por Nginx endurecido.
- Evitar publicar variables secretas en imagen final. Usa variables de entorno en tiempo de ejecución (Firebase config pública está bien; claves privadas nunca).

## 10. Próximos Pasos Recomendados
- Implementar analíticas de rendimiento (Core Web Vitals) con envío a endpoint propio.
- Añadir comprobación de stock y verificación pre-pago.
- Integrar HTTPS estricto (Certbot / CDN) y renovar certificados automáticamente.
- Añadir tests de smoke para SW y rutas críticas.

Si algo falla en App Check tras habilitar enforcement, revisa:
- Dominio exacto incluido (sin `www` adicional si no se usa).
- Token correcto y no expirado.
- Cache del navegador (limpiar / ventana privada).

---
Mantén este documento actualizado tras cada cambio relevante de seguridad.
