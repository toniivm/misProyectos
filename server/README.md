# VALTREX Backend

Production-ready backend for payments, orders and emails.

## Endpoints
- POST `/payments/create-intent` → returns `{ clientSecret, orderId }`
- POST `/stripe/webhook` → Stripe events (raw body)
- POST `/emails/order-confirmation` → send confirmation (requires SendGrid)
- GET `/health` → health check

## Env
Copy `.env.example` to `.env` and fill keys.

## Run
```
cd server
npm install
npm run dev
```

## Deploy
- Render: create a Web Service from `server/`, set env vars, start command `npm start`.
