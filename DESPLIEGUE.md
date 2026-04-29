# 🚀 Guía de Despliegue con Docker

## Pasos para desplegar tu tienda FLAGVIBE:

### 1. Instalar dependencias y construir
```bash
npm install
npm run build
```

### 2. Construir la imagen Docker
```bash
docker build -t flagvibe-app .
```

### 3. Ejecutar el contenedor
```bash
docker run -d -p 3000:80 --name flagvibe flagvibe-app
```

O usa docker-compose:
```bash
docker-compose up -d
```

### 4. Ver tu tienda
Abre: http://localhost:3000

---

## 🆓 Opciones GRATUITAS para Desplegar Online:

### ⭐ OPCIÓN 1: Vercel (Recomendada - MÁS FÁCIL)
- ✅ 100% GRATIS
- ✅ Sin necesidad de Docker
- ✅ Deploy automático desde GitHub
- ✅ SSL gratis
- ✅ CDN global

**Pasos:**
1. Crea cuenta en https://vercel.com
2. Conecta tu repositorio de GitHub
3. Click en "Deploy"
4. ¡Listo! Tu tienda estará online en minutos

### 🌟 OPCIÓN 2: Netlify (También muy fácil)
- ✅ 100% GRATIS
- ✅ Drag & drop o desde GitHub
- ✅ SSL automático

**Pasos:**
1. Registrate en https://netlify.com
2. Sube la carpeta `build` o conecta GitHub
3. Deploy automático

### 🐳 OPCIÓN 3: Railway (Con Docker)
- ✅ $5 crédito gratis al mes
- ✅ Soporta Docker
- ✅ Deploy desde GitHub

**Pasos:**
1. Registrate en https://railway.app
2. Conecta GitHub
3. Railway detecta el Dockerfile automáticamente

### 📦 OPCIÓN 4: Render (Con Docker)
- ✅ Plan gratuito (con limitaciones)
- ✅ Soporta Docker
- ✅ SSL gratis

### 🚀 OPCIÓN 5: GitHub Pages (Gratis pero estático)
- ✅ 100% GRATIS
- ✅ Perfecto para proyectos React
- ⚠️ Solo sitios estáticos (sin backend)

---

## 💡 MI RECOMENDACIÓN:

Para tu proyecto React, te recomiendo **Vercel** porque:
- ✅ No necesitas Docker
- ✅ Deploy en 2 minutos
- ✅ Totalmente gratis
- ✅ Actualizaciones automáticas cuando haces push a GitHub
- ✅ Dominio gratis (tuapp.vercel.app)

---

## 📝 Primero instala Node.js, luego te ayudo con el deploy que prefieras.
