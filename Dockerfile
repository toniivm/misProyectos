# Etapa 1: Build de la aplicación (Node 20 para compatibilidad de engines)
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias con fallback
RUN npm ci || npm install

# Copiar el resto de archivos
COPY . .

# Variables de construcción que se inyectarán en tiempo de build
# Render pasa estas como variables de entorno que necesitamos capturar
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_STORAGE_BUCKET
ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID
ARG REACT_APP_FIREBASE_MEASUREMENT_ID
ARG REACT_APP_API_BASE
ARG REACT_APP_STRIPE_PUBLIC_KEY

# Copiar variables de entorno del sistema (Render las pasa como env)
ENV REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY:-} \
	REACT_APP_FIREBASE_AUTH_DOMAIN=${REACT_APP_FIREBASE_AUTH_DOMAIN:-} \
	REACT_APP_FIREBASE_PROJECT_ID=${REACT_APP_FIREBASE_PROJECT_ID:-} \
	REACT_APP_FIREBASE_STORAGE_BUCKET=${REACT_APP_FIREBASE_STORAGE_BUCKET:-} \
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${REACT_APP_FIREBASE_MESSAGING_SENDER_ID:-} \
	REACT_APP_FIREBASE_APP_ID=${REACT_APP_FIREBASE_APP_ID:-} \
	REACT_APP_FIREBASE_MEASUREMENT_ID=${REACT_APP_FIREBASE_MEASUREMENT_ID:-} \
	REACT_APP_API_BASE=${REACT_APP_API_BASE:-} \
	REACT_APP_STRIPE_PUBLIC_KEY=${REACT_APP_STRIPE_PUBLIC_KEY:-}

# Construir la aplicación (sin pasos de debug)
RUN npm run build

# Etapa 2: Servidor de producción con Nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 8080 (Render usa PORT=8080)
EXPOSE 8080
# Mantener root (nginx necesita binding al puerto 80). Workers siguen siendo no-root internos.

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
