import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

export default function AddToCartButton({ product, size, quantity }) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    // Solo añadir si hay cantidad válida
    if (quantity < 1 || !size) return; 

    addToCart({ ...product, size, quantity });
    setShowToast(true);
    // Mostrar el toast por 2.5 segundos
    setTimeout(() => setShowToast(false), 2500); 
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className="w-full bg-black text-white text-lg font-semibold px-6 py-4 rounded-xl hover:bg-gray-800 transition transform hover:scale-[1.01] active:scale-100 shadow-xl"
      >
        Añadir al carrito ({product.price * (quantity || 1)} €)
      </button>
      {showToast && <Toast message="Producto añadido al carrito ✅" />}
    </>
  );
}