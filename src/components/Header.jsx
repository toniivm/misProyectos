import React, { useState } from "react";
import { ShoppingBag, Menu, X, User, Search, Sun, Moon, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

// Simulando el contexto del carrito (puedes reemplazar por el tuyo real)
const useCart = () => ({
  cart: [{ quantity: 2 }, { quantity: 1 }],
  setIsCartOpen: () => {},
});

export default function Header() {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, setUser } = useAuth(); // 👤 Usuario actual desde Firebase
  
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
    { name: "Ofertas", path: "/ofertas" },
    { name: "Contacto", path: "/contacto" },
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // ⭐ FUNCIÓN ACTUALIZADA para cerrar sesión correctamente
  const handleLogout = async () => {
    try {
      await signOut(auth); // 🔥 Cierra sesión en Firebase
      localStorage.removeItem("user"); // 🗑️ Limpia localStorage
      setUser(null); // 🔄 Actualiza el estado
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-red-600 via-black to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black shadow-lg backdrop-blur-md transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* 🔥 LOGO */}
          <a
            href="/"
            className="text-2xl font-extrabold tracking-wider text-white hover:text-red-400 transition-transform transform hover:scale-105"
          >
            <span className="text-red-400">Tienda</span>Zapatillas
          </a>

          {/* 🌐 NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="relative text-sm font-semibold uppercase tracking-wide transition-all duration-200 text-gray-200 hover:text-white hover:after:w-full after:absolute after:left-0 after:bottom-[-6px] after:w-0 after:h-[2px] after:bg-red-400 after:transition-all"
              >
                {link.name}
              </a>
            ))}

            {/* 🔍 BUSCADOR */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-gray-800/60 dark:bg-gray-700/60 text-gray-100 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all w-32 group-hover:w-48 focus:w-52"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* 🛒 CARRITO */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 text-sm font-semibold uppercase text-gray-100 hover:text-red-400 transition"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={20} />
              <span>Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* 👤 PERFIL / LOGIN */}
            {!user ? (
              <a
                href="/login"
                className="flex items-center gap-1 text-sm font-semibold uppercase text-gray-100 hover:text-red-400 transition"
              >
                <User size={20} />
                <span>Iniciar sesión</span>
              </a>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={user.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-red-500"
                />
                <span className="text-sm text-gray-100">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 transition"
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            {/* 🌙 MODO OSCURO */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/80 text-gray-200 hover:text-yellow-300 transition"
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* 📱 MENÚ MÓVIL */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-200 hover:text-red-400 transition"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* 📲 MENÚ DESPLEGABLE MÓVIL */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-700 animate-fadeIn">
            <nav className="flex flex-col items-center py-5 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-semibold uppercase text-gray-300 hover:text-white transition"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-base font-semibold uppercase text-gray-200 hover:text-red-400 transition"
              >
                <ShoppingBag size={20} />
                Carrito
              </button>

              {!user ? (
                <a
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold uppercase text-gray-200 hover:text-red-400 transition"
                >
                  <User size={20} />
                  Iniciar sesión
                </a>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-base font-semibold uppercase text-gray-200 hover:text-red-400 transition"
                >
                  <LogOut size={20} />
                  Cerrar sesión
                </button>
              )}

              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-base font-semibold uppercase text-gray-200 hover:text-yellow-400 transition"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                {darkMode ? "Modo Claro" : "Modo Oscuro"}
              </button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}