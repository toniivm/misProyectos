# Stage 1: build the exported storefront from recovery-system
FROM node:20-alpine AS builder

WORKDIR /app/recovery-system

# Install deps first for better Docker layer caching
COPY recovery-system/package*.json ./
RUN npm ci

# Copy app source and build the static export
COPY recovery-system/ ./
RUN npm run build

# Stage 2: minimal runtime image
FROM node:20-alpine AS runner

# bust Render's stale Docker layer cache
ARG CACHE_BUST=2

WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Copy the exported site and a lightweight static file server
COPY --from=builder /app/recovery-system/out ./out
COPY --from=builder /app/recovery-system/static-server.js ./server.js
COPY server/ ./backend/
EXPOSE 10000

# Render injects PORT=10000 at runtime
ENV PORT=10000
CMD ["node", "server.js"]
