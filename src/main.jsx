import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { getCLS, getFID, getLCP } from 'web-vitals';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Register service worker (production only, build required)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.log('[PWA] Service Worker registration failed:', error);
      });
  });
} else {
  console.log('[PWA] Service Worker not registered (dev mode or not built)');
}

// Log web vitals metrics
function sendToAnalytics(metric) {
  console.log(`[Web Vitals] ${metric.name}:`, metric.value, 'ms', metric);
  // You can send to analytics here (Google Analytics, Sentry, etc.)
}

// Web Vitals will log after user interactions
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);

console.log('[URBANSTYLE] App initialized - Web Vitals monitoring active');
