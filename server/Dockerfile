# Backend Dockerfile (Render Docker runtime)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src ./src
COPY tests ./tests

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

CMD ["node", "src/index.js"]
