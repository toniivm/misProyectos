import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, User, Search, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Header() {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, setUser } = useAuth();
  
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Tienda", path: "/productos" },
    { name: "Ofertas", path: "/?filter=ofertas" },
    { name: "Novedades", path: "/?filter=nuevos" },
    { name: "Envíos", path: "/envios" },
    { name: "Tallas", path: "/tallas" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider text-gray-900 hover:text-gray-700 transition-transform transform hover:scale-105"
        >
          <span className="text-black">URBAN</span><span className="text-gray-500">STYLE</span>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-sm font-semibold uppercase tracking-wide transition-all duration-200 text-gray-700 hover:text-black hover:after:w-full after:absolute after:left-0 after:bottom-[-6px] after:w-0 after:h-[2px] after:bg-black after:transition-all"
            >
              {link.name}
            </Link>
          ))}

          {/* BUSCADOR */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Buscar"
          >
            <Search size={20} className="text-gray-700" />
          </button>

          {/* CARRITO */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} className="text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {/* PERFIL / LOGIN */}
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-semibold uppercase text-gray-700 hover:text-black transition"
            >
              <User size={20} />
              <span>Login</span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition">
                <img
                  src={user.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition"
                aria-label="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </nav>

        {/* MENÚ MÓVIL */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} className="text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 hover:text-black transition"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col items-start px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-semibold uppercase text-gray-700 hover:text-black transition w-full"
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-base font-semibold uppercase text-gray-700 hover:text-black transition w-full"
              >
                <User size={20} />
                Iniciar sesión
              </Link>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold uppercase text-gray-700 hover:text-black transition w-full"
                >
                  <User size={20} />
                  Mi Perfil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-base font-semibold uppercase text-gray-700 hover:text-black transition w-full text-left"
                >
                  <LogOut size={20} />
                  Cerrar sesión
                </button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* BARRA DE BÚSQUEDA EXPANDIBLE */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              autoFocus
              name="headerSearch"
            />
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  );
}