Guía rápida: desplegar backend en Render y frontend en Firebase

Resumen
- Backend (API): desplegar la carpeta `server` como Web Service en Render.
- Frontend (Next.js): construir con las variables de entorno y desplegar a Firebase Hosting (o cualquier hosting que prefieras).

Archivos que ya añadí al repo
- `recovery-system/.env.production` — variables de Firebase para el build (NO recomendable para repos públicos; borra o mueve a CI después).
- `recovery-system/.env.local` — contiene `NEXT_PUBLIC_ALLOW_DEV_AUTH=true` para desarrollo local.

Variables de entorno que debes configurar en Render (Backend)
- `ADMIN_API_KEY` — string secreta para rutas admin.
- `STRIPE_SECRET_KEY` — clave secreta de Stripe.
- `STRIPE_WEBHOOK_SECRET` — secreto del webhook de Stripe (opcional, pero recomendado).
- `FIREBASE_SERVICE_ACCOUNT_JSON` — JSON completo del service account (recomendado) OR usa:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY` (asegúrate de preservar las nuevas líneas o usa `\n` según el panel).
- `SENDGRID_API_KEY` — (opcional) para correos reales.
- `SENDER_EMAIL` — email remitente para envíos.
- `CORS_ORIGINS` — orígenes permitidos adicionales (coma-separados).
- `FRONTEND_URL` — URL pública del frontend (ej. `https://valtre-73c7b.web.app`).
- `SKIP_EXTERNAL=false` — para habilitar servicios externos en producción.

Cómo añadir variables en Render
1. Entra a https://dashboard.render.com → tu servicio → Environment → Environment Variables.
2. Añade cada clave como variable de entorno. Para `FIREBASE_SERVICE_ACCOUNT_JSON` pega el JSON entero (Render soporta valores multilínea).
3. Guarda y pulsa "Deploy" para redeploy.

Configurar el servicio en Render (pasos rápidos)
- Crea un nuevo Web Service apuntando al repo `misProyectos` y rama `main`.
- Importante: en "Root Directory" pon `server` (para usar `server/package.json`).
- Build Command: `npm install` (Render instalará dependencias) — o `cd server && npm install` según la UI.
- Start Command: `npm start` (usa `node src/index.js`).
- Añade las Environment Variables mencionadas arriba.

Frontend (Firebase Hosting) — build y deploy
- Opciones:
  - A) Si usas CI (GitHub Actions, etc.), define las variables de entorno para la etapa de build y ejecuta `npm run build`.
  - B) Build localmente y deploy con Firebase CLI.

Comandos locales (ejemplo desde la máquina de desarrollo):

1) Frontend (recovery-system)

```bash
cd recovery-system
# instala dependencias si hace falta
npm install
# construye con las variables dentro de recovery-system/.env.production
npm run build
# para pruebas locales
npm run dev
```

2) Backend (server)

```bash
cd server
# asegúrate de tener las env vars en tu entorno local (o usa .env en local solo)
npm install
# start
npm run dev       # para desarrollo (watch)
npm start         # producción (node src/index.js)
```

Notas importantes sobre Firebase y Next.js
- Next.js necesita las variables en tiempo de build para incluir `NEXT_PUBLIC_...` en el bundle. Si usas Firebase Hosting, asegúrate de que el build (en CI o local) tenga las variables `NEXT_PUBLIC_FIREBASE_*` disponibles.
- Si tu sitio usa funciones SSR de Next.js, Firebase Hosting requerirá Cloud Functions o un adaptador; para simplicidad recomiendo hospedar el frontend estático en Firebase only si tu app se puede exportar estáticamente o usar Vercel para SSR.

Chequear que el login funcione
- Asegúrate en Firebase Console:
  - Authentication → Sign-in method → habilitar `Google` y/o `Email/Password`.
  - Authentication → Authorized domains → incluye `valtre-73c7b.web.app` y el dominio de Render si es necesario.
- Rebuild y redeploy del frontend después de añadir las `NEXT_PUBLIC_FIREBASE_*` en el entorno de build.

Prueba rápida post-deploy
- Frontend: abre `https://valtre-73c7b.web.app` y abre el modal de login.
- Backend: revisa `https://<your-render-service>.onrender.com/health` para comprobar `externals` (stripe/firebase/sendgrid) están habilitados.

Si quieres, puedo:
- A) Añadir un script de `deploy` a `server/package.json` o `recovery-system/package.json` para automatizar builds.
- B) Preparar un GitHub Actions workflow que haga `npm run build` (frontend) con secrets y despliegue a Firebase automáticamente.

Dime qué prefieres y lo preparo.