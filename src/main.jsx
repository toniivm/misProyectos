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

// ALWAYS log first - even before SW registration
console.log('🚀 [URBANSTYLE] App initialized');
console.log('🔧 [ENV] NODE_ENV:', process.env.NODE_ENV);
console.log('🏗️  [ENV] Is Production:', process.env.NODE_ENV === 'production');

// Register service worker (SIMPLIFIED - no dependencies on external files)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    console.log('📦 [SW] Attempting registration...');
    
    // Inline minimal service worker
    const swCode = `
      console.log('✅ [SW] Service Worker executing');
      const CACHE_NAME = 'urbanstyle-v1';
      
      self.addEventListener('install', (e) => {
        console.log('⚙️ [SW] Installing...');
        self.skipWaiting();
      });
      
      self.addEventListener('activate', (e) => {
        console.log('✅ [SW] Activated!');
        e.waitUntil(self.clients.claim());
      });
      
      self.addEventListener('fetch', (e) => {
        // Pass-through - no caching for now
      });
    `;
    
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker
      .register(swUrl)
      .then((reg) => {
        console.log('✅ [SW] Registration successful! Scope:', reg.scope);
        console.log('🔄 [SW] Reload the page once to activate control');
        
        // Check controller immediately
        if (navigator.serviceWorker.controller) {
          console.log('✅ [SW] Page is already controlled!');
        } else {
          console.log('⏳ [SW] Page not controlled yet - reload needed');
        }
      })
      .catch((error) => {
        console.error('❌ [SW] Registration FAILED:', error);
      });
  });
} else {
  if (!('serviceWorker' in navigator)) {
    console.warn('⚠️ [SW] Service Workers not supported in this browser');
  } else {
    console.log('🔧 [SW] Skipped - running in development mode');
  }
}

// Log web vitals metrics
function sendToAnalytics(metric) {
  console.log(`[Web Vitals] ${metric.name}:`, metric.value, 'ms', metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
