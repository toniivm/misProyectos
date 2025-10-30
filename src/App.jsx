import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Login from './pages/Login';
import CartSidebar from './components/CartSidebar';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white text-gray-900 flex flex-col"> 
            <Header />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} /> 
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<Login />} />
              <Route  path="/checkout" element={ <ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/profile" element={ <ProtectedRoute><ProfilePage /></ProtectedRoute>} />          
              </Routes>
            </main>
            
            <footer className="bg-white border-t border-gray-100 p-6 text-center text-gray-600 mt-auto">
              © 2025 TIENDA ZAPATILLAS. TODOS LOS DERECHOS RESERVADOS.
            </footer>
            
            <CartSidebar />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;