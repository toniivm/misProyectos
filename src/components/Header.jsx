import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X, User, Search, LogOut, Heart, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { usePrivacy } from "../context/PrivacyContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Header() {
  const { cart, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = wishlist.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user: currentUser, setUser } = useAuth();
  const { privacyMode, togglePrivacyMode } = usePrivacy();
  
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Tienda", path: "/productos" },
    { name: "Ofertas", path: "/?filter=ofertas" },
    { name: "Novedades", path: "/?filter=nuevos" },
  ];

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 px-4 text-xs md:text-sm font-medium">
        🔒 Envío Gratis en pedidos +100€ • Pago Seguro SSL • Autenticidad Garantizada 100%
      </div>

      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Main Header Row */}
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Menú"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* LOGO - Centered on mobile */}
            <Link
              to="/"
              className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg md:text-xl">V</span>
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">VALTREX</span>
              </span>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Icon - Mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>

              {/* Privacy Mode Toggle */}
              <button
                onClick={togglePrivacyMode}
                className={`relative p-2 rounded-lg transition ${privacyMode ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                aria-label="Modo Privacidad"
                title={privacyMode ? 'Privacidad activada' : 'Activar modo privacidad'}
              >
                <Shield size={20} />
              </button>

              {/* WISHLIST */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Wishlist"
              >
                <Heart size={20} className="md:size-22" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                    {wishlistItems}
                  </span>
                )}
              </button>

              {/* CARRITO */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition group"
                aria-label="Carrito"
              >
                <ShoppingBag size={20} className="md:size-22 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation - Below Logo */}
          <nav className="hidden md:flex items-center justify-center gap-8 pb-3 border-t border-gray-100 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-xs font-bold uppercase tracking-widest transition-all duration-200 text-gray-600 hover:text-black group"
              >
                {link.name}
                <span className="absolute left-0 bottom-[-8px] w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Search Bar Desktop */}
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-48 px-4 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            
            {/* USUARIO - Desktop */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
                  aria-label="Usuario"
                >
                  <User size={18} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Conectado como</p>
                      <p className="text-sm font-semibold truncate">{currentUser.email?.split('@')[0]}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                    >
                      <LogOut size={16} />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wide rounded-full hover:bg-gray-800 transition-all hover:scale-105"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 shadow-xl"
          >
            <nav className="flex flex-col px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-black hover:bg-gray-100 px-4 py-3 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              ))}

              {/* Search Mobile */}
              <div className="relative pt-4">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                />
                <Search size={16} className="absolute right-4 top-1/2 text-gray-400" />
              </div>

              {/* User Mobile */}
              {currentUser ? (
                <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black px-4 py-3 hover:bg-gray-100 rounded-lg"
                  >
                    <User size={18} />
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 text-sm font-semibold text-red-600 hover:text-red-700 px-4 py-3 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut size={18} />
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 bg-black text-white text-center py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-gray-800"
                >
                  Iniciar Sesión
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </header>
    </>
  );
}