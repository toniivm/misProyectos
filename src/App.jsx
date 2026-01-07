import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { PrivacyProvider } from './context/PrivacyContext';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import SkeletonGrid from './components/SkeletonGrid';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentLogos from './components/PaymentLogos';
import ScrollToTop from './components/ScrollToTop';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const Login = lazy(() => import('./pages/Login'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Componente para timeout en Suspense (aviso no bloqueante)
function SuspenseWithTimeout({ children, fallback = null, timeoutMs = 30000 }) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), timeoutMs);
    return () => clearTimeout(timer);
  }, [timeoutMs]);

  const effectiveFallback = (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {fallback || <SkeletonGrid count={8} />}
      {timedOut && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 text-center">
          <p className="font-semibold">La carga está tardando más de lo normal.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-3">
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-black text-white rounded">
              Recargar
            </button>
            <button onClick={() => setTimedOut(false)} className="px-4 py-2 border border-black text-black rounded">
              Seguir esperando
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return <Suspense fallback={effectiveFallback}>{children}</Suspense>;
}

function App() {
  // Lazy routes already optimized by webpack code splitting
  useEffect(() => {
    // No-op: SPA doesn't benefit from link prefetch
  }, []);
  
  return (
    <PrivacyProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-white text-gray-900 flex flex-col"> 
                <Header />
                <WishlistSidebar />
              
              <main className="flex-1">
                <ErrorBoundary>
                <SuspenseWithTimeout fallback={<div className="max-w-7xl mx-auto px-6 py-10"><SkeletonGrid count={8} /></div>}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/productos" element={<ProductPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} /> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                  </Routes>
                </SuspenseWithTimeout>
                </ErrorBoundary>
              </main>
              
              <footer className="bg-gray-900 text-white mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Columna 1 - Marca */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">
                        <span className="text-white">VALTREX</span>
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Tu tienda multimarca de zapatillas y streetwear de lujo. Nike, Adidas, Balenciaga, Gucci, Off-White, Prada y más.
                      </p>
                    </div>

                    {/* Columna 2 - Tienda */}
                    <div>
                      <h4 className="font-bold mb-4 text-lg">Marcas</h4>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="/" className="hover:text-white transition">Nike</a></li>
                        <li><a href="/" className="hover:text-white transition">Adidas</a></li>
                        <li><a href="/" className="hover:text-white transition">Balenciaga</a></li>
                        <li><a href="/" className="hover:text-white transition">Gucci</a></li>
                        <li><a href="/" className="hover:text-white transition">Off-White</a></li>
                      </ul>
                    </div>

                    {/* Columna 3 - Seguridad */}
                    <div>
                      <h4 className="font-bold mb-4 text-lg">Seguridad y Confianza</h4>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Certificado SSL
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verificación 20 Puntos
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Pago Cifrado PCI-DSS
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Envío Discreto 24-48h
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Privacidad Garantizada
                        </li>
                      </ul>
                    </div>

                    {/* Columna 4 - Pago Seguro */}
                    <div>
                      <h4 className="font-bold mb-4 text-lg">Pago Seguro</h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Envío discreto y anónimo. Pago 100% seguro.
                      </p>
                      <PaymentLogos size="sm" showAll={true} />
                      
                      {/* Redes Sociales */}
                      <div className="flex gap-4 mt-6">
                        <a href="/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="/" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex justify-center items-center gap-6 mb-6 flex-wrap">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>SSL CERTIFIED</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span>PCI-DSS COMPLIANT</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>256-BIT ENCRYPTION</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>100% AUTHENTIC</span>
                      </div>
                    </div>
                    
                    <div className="text-center text-gray-400 text-sm">
                      <p className="font-semibold">© 2025 VALTREX. Todos los derechos reservados.</p>
                      <p className="mt-2 text-xs">Envíos discretos y rastreables. Pago 100% cifrado SSL. Verificación de autenticidad garantizada.</p>
                      <p className="mt-1 text-xs text-gray-500">Protegemos tu privacidad. Nunca compartimos tus datos con terceros.</p>
                      
                      {/* Legal Links */}
                      <div className="flex justify-center gap-4 mt-4 flex-wrap">
                        <a href="/terms" className="text-xs text-gray-500 hover:text-white transition underline">
                          Términos y Condiciones
                        </a>
                        <span className="text-gray-700">•</span>
                        <a href="/privacy" className="text-xs text-gray-500 hover:text-white transition underline">
                          Política de Privacidad
                        </a>
                        <span className="text-gray-700">•</span>
                        <a href="mailto:legal@valtrex.com" className="text-xs text-gray-500 hover:text-white transition underline">
                          Contacto Legal
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
              
                <CartSidebar />
              </div>
            </Router>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </PrivacyProvider>
  );
}

export default App;