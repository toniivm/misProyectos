import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const CartSidebar = () => {
  const { cart, removeFromCart, total, isCartOpen, setIsCartOpen } = useCart();
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Focus trap & accessibility handling
  useEffect(() => {
    if (isCartOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    function onKey(e){
      if (!isCartOpen) return;
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || !focusable.length) return;
        const list = Array.from(focusable);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first){
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last){
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, setIsCartOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        role="dialog"
        aria-modal={isCartOpen}
        aria-label="Carrito de compra"
        tabIndex={-1}
        ref={dialogRef}
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-transform duration-400 z-50 flex flex-col w-full sm:w-80 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-5 pt-5 pb-4 flex items-start justify-between border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">Tu carrito 🛍️</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-gray-500 hover:text-black hover:bg-gray-100 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-black/40"
            aria-label="Cerrar carrito"
            ref={closeBtnRef}
          >
            <span className="text-2xl" aria-hidden="true">&times;</span>
          </button>
        </div>
        {/* Scrollable content wrapper */}
        <div className="flex-1 flex flex-col min-h-0">
          <ul className="flex-1 overflow-y-auto px-5 py-5 space-y-5 pr-3" aria-label="Lista de productos en carrito">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center mt-10 p-4 bg-gray-50 rounded-lg">
                Tu carrito está vacío. ¡Es hora de comprar!
              </p>
            ) : (
              cart.map((item, index) => (
                <li key={`${item.id}-${item.size}-${index}`} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-b-0">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl shadow-sm flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Talla: {item.size} | Cant: {item.quantity}</p>
                    <p className="font-bold text-base mt-1 text-black">{(item.price * item.quantity).toFixed(2)} €</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-xs font-medium text-red-500 hover:text-red-600 ml-2 mt-1 flex-shrink-0"
                    aria-label={`Eliminar ${item.title}`}
                  >
                    Eliminar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="px-5 pb-6 pt-4 border-t bg-white shadow-inner">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-lg sm:text-xl font-bold">Total:</p>
            <p className="text-xl sm:text-2xl font-extrabold text-black">{total.toFixed(2)} €</p>
          </div>
          <Link
            to="/checkout"
            onClick={() => setIsCartOpen(false)}
            className={`block w-full text-center py-3 rounded-lg transition font-semibold shadow ${
              cart.length === 0 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800 active:scale-[.98]'
            }`}
            aria-disabled={cart.length === 0}
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;