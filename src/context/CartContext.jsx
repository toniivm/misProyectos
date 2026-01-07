import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Función de ayuda para obtener el carrito de localStorage
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('sneaker_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error al cargar carrito de localStorage:', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem('sneaker_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar carrito en localStorage:', error);
    }
  }, [cart]);


  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        // Identificar ítem por ID, TALLA y COLOR para evitar duplicados
        (item) => item.id === product.id && item.size === product.size && item.color === product.color
      );

      if (existingItemIndex > -1) {
        // Ítem encontrado: sumar la nueva cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + (product.quantity || 1), 
        };
        return updatedCart;
      } else {
        // Ítem nuevo: añadir al carrito
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
    setIsCartOpen(true); // Abrir sidebar automáticamente al añadir
  };

  const removeFromCart = (itemId, itemSize, itemColor) => {
    setCart((prev) =>
      // Filtrar por ID, TALLA y COLOR
      prev.filter((item) => !(item.id === itemId && item.size === itemSize && item.color === itemColor))
    );
  };

  // Limpiar carrito completamente (para después del checkout)
  const clearCart = () => {
    setCart([]);
  };

  // Cálculo total: (precio * cantidad) de todos los ítems
  const total = useMemo(() =>
    cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
  , [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};