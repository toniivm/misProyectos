import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

export default function AddToCartButton({ product, size, quantity }) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAdd = () => {
    // Validar que producto existe y tiene precio
    if (!product || typeof product.price !== 'number' || product.price < 0) {
      setToastMessage("Producto inválido");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    // Validar cantidad positiva
    if (quantity < 1 || !Number.isInteger(quantity)) {
      setToastMessage("Cantidad inválida");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    // Validar si es bolso (sizes vacío es válido) o zapatilla/ropa (size requerido)
    const isBag = product.sizes && product.sizes.length === 0;
    if ((quantity < 1 && !isBag) || (!isBag && !size)) {
      setToastMessage("Por favor selecciona una talla");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    // Validar stock
    const stock = Math.max(0, product.stock || 999);
    if (quantity > stock) {
      setToastMessage(`Solo hay ${stock} unidades disponibles`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    addToCart({ ...product, size: isBag ? "Único" : size, quantity });
    setToastMessage("Producto añadido al carrito ✅");
    setShowToast(true);
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
      {showToast && <Toast message={toastMessage} />}
    </>
  );
}