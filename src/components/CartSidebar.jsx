import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, removeFromCart, total, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      {/* Backdrop Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black opacity-60 z-40 transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-2xl transform transition-transform duration-500 z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Tu carrito 🛍️</h2>
            <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-3xl text-gray-500 hover:text-black transition"
                aria-label="Cerrar carrito"
            >
              &times;
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto space-y-5 pr-2">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center mt-10 p-4 bg-gray-50 rounded-lg">
                Tu carrito está vacío. ¡Es hora de comprar!
              </p>
            ) : (
              cart.map((item, index) => (
                <li key={`${item.id}-${item.size}-${index}`} className="flex items-start border-b border-gray-100 pb-4 last:border-b-0">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg shadow-md flex-shrink-0"
                  />
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Talla: {item.size} | Cant: {item.quantity}
                    </p>
                    <p className="font-bold text-md mt-1 text-black">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-sm text-red-500 hover:text-red-700 ml-2 pt-1 flex-shrink-0"
                    aria-label={`Eliminar ${item.title}`}
                  >
                    Eliminar
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-2xl font-extrabold text-black">{total.toFixed(2)} €</p>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className={`block w-full text-center py-3 rounded-xl transition font-semibold shadow-lg ${
                cart.length === 0 
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              aria-disabled={cart.length === 0}
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;