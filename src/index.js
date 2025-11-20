import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

// Dev-only verbose logs
if (process.env.NODE_ENV !== 'production') {
  console.log('🚀 [VALTREX] index.js executing NOW');
  console.log('🔧 [ENV] NODE_ENV:', process.env.NODE_ENV);
  console.log('🏗️ [ENV] Location:', window.location.href);
  console.log('📦 [VALTREX] Imports loaded, creating root...');
}

// Minimal production marker
if (process.env.NODE_ENV === 'production') {
  console.log('[VALTREX] Boot');
}

// Optional minimal SW registration (no caching) to allow future upgrades
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
      console.error('[SW] registration failed:', err.message);
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

if (process.env.NODE_ENV !== 'production') {
  console.log('✅ [VALTREX] App rendered successfully!');
}
