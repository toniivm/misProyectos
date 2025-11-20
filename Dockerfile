# Etapa 1: Build de la aplicación
FROM node:20 AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY package-lock.json ./

# Instalar dependencias
# Instalar todas las dependencias (incluye devDependencies necesarias para el build)
RUN npm ci

# Copiar el resto de archivos
COPY . .

# Variables opcionales para inyectar configuración en build (CRA usa REACT_APP_*)
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_STORAGE_BUCKET
ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID
ARG REACT_APP_FIREBASE_MEASUREMENT_ID

ENV REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY \
	REACT_APP_FIREBASE_AUTH_DOMAIN=$REACT_APP_FIREBASE_AUTH_DOMAIN \
	REACT_APP_FIREBASE_PROJECT_ID=$REACT_APP_FIREBASE_PROJECT_ID \
	REACT_APP_FIREBASE_STORAGE_BUCKET=$REACT_APP_FIREBASE_STORAGE_BUCKET \
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID=$REACT_APP_FIREBASE_MESSAGING_SENDER_ID \
	REACT_APP_FIREBASE_APP_ID=$REACT_APP_FIREBASE_APP_ID \
	REACT_APP_FIREBASE_MEASUREMENT_ID=$REACT_APP_FIREBASE_MEASUREMENT_ID

# Construir la aplicación (sin pasos de debug)
RUN npm run build

# Crear usuario no root para servir archivos (defensa básica)
RUN adduser -D appuser

# Etapa 2: Servidor de producción con Nginx
FROM nginx:alpine

 # Copiar los archivos compilados desde la etapa de build
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Ajustar permisos y usar usuario no root
RUN chown -R appuser:appuser /usr/share/nginx/html
USER appuser

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
