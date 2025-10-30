import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Función de ayuda para obtener el carrito de localStorage
const getInitialCart = () => {
  const savedCart = localStorage.getItem('sneaker_cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('sneaker_cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        // Identificar ítem por ID y TALLA
        (item) => item.id === product.id && item.size === product.size
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

  const removeFromCart = (itemId, itemSize) => {
    setCart((prev) =>
      // Filtrar por ID y TALLA
      prev.filter((item) => !(item.id === itemId && item.size === itemSize))
    );
  };

  // Cálculo total: (precio * cantidad) de todos los ítems
  const total = useMemo(() =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  , [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};