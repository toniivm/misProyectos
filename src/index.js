// 🚀 LOGS FIRST - Before ANY imports
console.log('🚀 [URBANSTYLE] index.js executing NOW');
console.log('🔧 [ENV] NODE_ENV:', process.env.NODE_ENV);
console.log('🏗️ [ENV] Location:', window.location.href);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

console.log('📦 [URBANSTYLE] Imports loaded, creating root...');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

console.log('✅ [URBANSTYLE] App rendered successfully!');
