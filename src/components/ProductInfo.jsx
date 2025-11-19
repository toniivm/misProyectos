import React, { useState, useMemo } from "react";
import AddToCartButton from "./AddToCartButton";

export default function ProductInfo({ product }) {
  const sizesList = product.sizes || ["42"]; 
  const initialSize = sizesList[0]; 
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);

  const formattedPrice = useMemo(() => product.price.toFixed(2), [product.price]);

  return (
    <div className="flex flex-col gap-8">
      {/* Título y precio (oculto en móvil si se muestra arriba) */}
      <div className="hidden lg:block">
        <h1 className="text-4xl font-extrabold mb-2 tracking-wide">{product.title}</h1>
        <p className="text-xl font-medium tracking-wide">{formattedPrice} €</p>
      </div>

      <p className="text-gray-700 text-base leading-relaxed border-b border-gray-100 pb-8">{product.description}</p>

      {/* Selector de Talla (Botones estilo minimalista) */}
      <div className="pt-2">
        <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase">Talla (EU)</label>
        <div className="flex flex-wrap gap-3">
          {sizesList.map((t) => (
            <button
              key={t}
              onClick={() => setSize(t)}
              className={`
                px-5 py-2 border border-gray-300 text-sm font-medium transition 
                hover:border-black
                ${size === t ? 'bg-black text-white border-black' : 'bg-white text-gray-900'}
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de Cantidad */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">Cantidad</label>
        <input
          type="number"
          min="1"
          max="10" 
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          // Input con borde negro para un look elegante
          className="border border-black p-3 w-20 text-center text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Botones de acción */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Botón Principal (Negro, ancho) */}
        <AddToCartButton product={product} size={size} quantity={quantity} />
        
        {/* Botón Secundario (Borde, sin fondo) */}
        <button 
          className="w-full text-center border border-black text-black py-3 mt-2 hover:bg-black hover:text-white transition text-sm font-semibold"
        >
          COMPROBAR STOCK EN TIENDA
        </button>
      </div>
    </div>
  );
}
