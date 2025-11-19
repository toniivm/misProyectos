import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

// 🚀 LOGS - After imports to satisfy ESLint
console.log('🚀 [URBANSTYLE] index.js executing NOW');
console.log('🔧 [ENV] NODE_ENV:', process.env.NODE_ENV);
console.log('🏗️ [ENV] Location:', window.location.href);
console.log('📦 [URBANSTYLE] Imports loaded, creating root...');

// Register Service Worker INLINE (production only)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    console.log('📦 [SW] Attempting registration...');
    
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
        // Pass-through for now
      });
    `;
    
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker
      .register(swUrl)
      .then((reg) => {
        console.log('✅ [SW] Registration successful! Scope:', reg.scope);
        console.log('🔄 [SW] Reload once to activate control');
        
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
  console.log('🔧 [SW] Skipped - development mode or not supported');
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

console.log('✅ [URBANSTYLE] App rendered successfully!');
