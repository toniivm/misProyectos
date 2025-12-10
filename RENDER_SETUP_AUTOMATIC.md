# RENDER DEPLOYMENT INSTRUCTIONS
# ================================
# This file contains step-by-step instructions to fix the Render deployment automatically.

## PROBLEMA ACTUAL
- El servicio backend está sirviendo el Dockerfile del FRONTEND
- Las variables de entorno están en el lugar equivocado
- Render necesita crear los servicios desde cero con render.yaml correcto

## SOLUCIÓN AUTOMÁTICA
# Elimina el servicio actual en Render Dashboard y sigue estos pasos:

1. VE A: https://dashboard.render.com/
2. BUSCA: El servicio "valtre-backend" o similar (el que tiene STRIPE_SECRET_KEY)
3. CLICK: Settings (esquina arriba a la derecha)
4. SCROLL: Hasta el final y busca "Delete Service"
5. CONFIRMA: Escribe el nombre del servicio y delete
6. ESPERA: 30 segundos

Después de eliminar:
7. VE A: Tu repositorio GitHub (misProyectos)
8. VE A: https://dashboard.render.com/
9. CLICK: "+ New" → "Web Service"
10. SELECCIONA: "Connect a repository" → misProyectos
11. RENDER DETECTARÁ render.yaml automáticamente
12. CONFIRMA: Los servicios se crearán correctamente

El proceso tardará:
- 2-3 min: Build del backend
- 1-2 min: Build del frontend
- 1 min: Deploy

Total: ~5-7 minutos para ambos servicios ONLINE.

## ALTERNATIVA MÁS RÁPIDA
Si prefieres no borrar, simplemente en Settings del servicio backend:
- Root Directory: server
- Dockerfile Path: ./Dockerfile
- Click: Save → Manual Deploy

## QUÉ PASARÁ
✅ Backend en: https://valtrex-backend.onrender.com (CORRECTO)
✅ Frontend en: https://valtre.onrender.com (CORRECTO)
✅ Frontend llamará al backend correctamente
✅ Login y checkout funcionarán
