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

// Register service worker with inline code (CRA doesn't copy public/*.js to build)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    const swCode = `
      const CACHE_VERSION = 'urbanstyle-v1';
      const STATIC_CACHE = CACHE_VERSION + '-static';
      const DYNAMIC_CACHE = CACHE_VERSION + '-dynamic';
      
      self.addEventListener('install', (e) => {
        console.log('[SW] Installing...');
        e.waitUntil(
          caches.open(STATIC_CACHE).then(cache => {
            return cache.addAll(['/', '/index.html', '/manifest.json']);
          }).then(() => self.skipWaiting())
        );
      });
      
      self.addEventListener('activate', (e) => {
        console.log('[SW] Activating...');
        e.waitUntil(
          caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
              if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                return caches.delete(key);
              }
            }));
          }).then(() => self.clients.claim())
        );
      });
      
      self.addEventListener('fetch', (e) => {
        if (e.request.method !== 'GET') return;
        const url = new URL(e.request.url);
        if (url.origin.includes('firebase') || url.origin.includes('googleapis')) return;
        
        e.respondWith(
          caches.match(e.request).then(cached => {
            if (cached) return cached;
            return fetch(e.request).then(response => {
              if (response && response.status === 200 && (
                e.request.url.includes('/static/') ||
                e.request.url.match(/\\.(js|css|png|jpg|jpeg|svg|gif|woff2?)$/)
              )) {
                const clone = response.clone();
                caches.open(DYNAMIC_CACHE).then(cache => cache.put(e.request, clone));
              }
              return response;
            }).catch(() => {
              if (e.request.destination === 'document') {
                return caches.match('/index.html');
              }
            });
          })
        );
      });
    `;
    
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('[PWA] Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.log('[PWA] Service Worker registration failed:', error);
      });
  });
}

// Always log this even in dev
console.log('[URBANSTYLE] App initialized - Web Vitals monitoring active');
console.log('[ENV] NODE_ENV:', process.env.NODE_ENV);
console.log('[ENV] Is Production:', process.env.NODE_ENV === 'production');

// Log web vitals metrics
function sendToAnalytics(metric) {
  console.log(`[Web Vitals] ${metric.name}:`, metric.value, 'ms', metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
