import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import SkeletonGrid from './components/SkeletonGrid';
import CartSidebar from './components/CartSidebar';
import ProtectedRoute from './components/ProtectedRoute';
import CookieConsent from './components/CookieConsent';
import NewsletterSignup from './components/NewsletterSignup';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const Login = lazy(() => import('./pages/Login'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const Terms = lazy(() => import('./pages/Terms')); // new
const ShippingReturns = lazy(() => import('./pages/ShippingReturns'));
const SizeGuide = lazy(() => import('./pages/SizeGuide'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  console.log('🎨 [VALTREX] App component mounting');
  
  // Prefetch critical routes
  useEffect(() => {
    const prefetchRoutes = ['/productos', '/tallas', '/checkout'];
    prefetchRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
    console.log('⚡ [VALTREX Performance] Critical routes prefetched');
  }, []);
  
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white text-gray-900 flex flex-col"> 
            <CookieConsent />
            <Header />
            
            <main className="flex-1">
              <ErrorBoundary>
              <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-10"><SkeletonGrid count={8} /></div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/productos" element={<ProductPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/producto/:slug" element={<ProductDetailPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />          
                    <Route path="/envios" element={<ShippingReturns />} />
                    <Route path="/tallas" element={<SizeGuide />} />
                    <Route path="/privacidad" element={<PrivacyPolicy />} />
                    <Route path="/terminos" element={<Terms />} />
                    <Route path="/contacto" element={<Contact />} />
                </Routes>
              </Suspense>
              </ErrorBoundary>
            </main>
            
            <footer className="bg-gray-900 text-white mt-auto">
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Columna 1 - Marca */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      <span className="text-white">VALT</span>
                      <span className="text-gray-400">REX</span>
                    </h3>
                    <p className="text-gray-400 text-sm">
                      VALTREX — Rendimiento deportivo y estilo urbano premium.
                    </p>
                  </div>

                  {/* Columna 2 - Tienda */}
                  <div>
                    <h4 className="font-bold mb-4 text-lg">Tienda</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li><Link to="/productos" className="hover:text-white transition">Todos los productos</Link></li>
                      <li><Link to="/?filter=nuevos" className="hover:text-white transition">Novedades</Link></li>
                      <li><Link to="/?filter=ofertas" className="hover:text-white transition">Ofertas</Link></li>
                      <li><Link to="/productos?category=camisetas" className="hover:text-white transition">Camisetas</Link></li>
                      <li><Link to="/productos?category=pantalones" className="hover:text-white transition">Pantalones</Link></li>
                      <li><Link to="/envios" className="hover:text-white transition">Envíos</Link></li>
                      <li><Link to="/tallas" className="hover:text-white transition">Guía de Tallas</Link></li>
                    </ul>
                  </div>

                  {/* Columna 3 - Ayuda */}
                  <div>
                    <h4 className="font-bold mb-4 text-lg">Ayuda</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li><Link to="/envios" className="hover:text-white transition">Envíos y devoluciones</Link></li>
                      <li><Link to="/tallas" className="hover:text-white transition">Guía de tallas</Link></li>
                      <li><Link to="/terminos" className="hover:text-white transition">Términos</Link></li>
                      <li><Link to="/contacto" className="hover:text-white transition">Contacto</Link></li>
                      <li><Link to="/privacidad" className="hover:text-white transition">Privacidad</Link></li>
                    </ul>
                  </div>

                  {/* Columna 4 - Newsletter */}
                  <div>
                    <h4 className="font-bold mb-4 text-lg">Newsletter</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Suscríbete para recibir ofertas exclusivas
                    </p>
                    <NewsletterSignup />
                    
                    {/* Redes Sociales */}
                    <div className="flex gap-4 mt-6">
                      <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>© 2025 VALTREX. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-4 opacity-80">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" loading="lazy" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" loading="lazy" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" loading="lazy" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            </footer>
            
            <CartSidebar />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;