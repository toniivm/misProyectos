# Backend Dockerfile (Render Docker runtime)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

CMD ["node", "src/index.js"]
