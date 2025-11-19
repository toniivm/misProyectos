import React, { useState, useMemo } from "react";
import { Heart, Share2 } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

export default function ProductInfo({ product }) {
  const sizesList = product.sizes || ["M"]; 
  const initialSize = sizesList[0]; 
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount ? product.price * (1 - product.discount / 100) : product.price;
  const formattedPrice = useMemo(() => discountedPrice.toFixed(2), [discountedPrice]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Etiquetas */}
      <div className="flex gap-2">
        {product.isNew && (
          <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
            NUEVO
          </span>
        )}
        {hasDiscount && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{product.discount}% OFF
          </span>
        )}
      </div>

      {/* Título y precio */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">{product.title}</h1>
        <div className="flex items-baseline gap-3">
          {hasDiscount ? (
            <>
              <span className="text-3xl font-bold">{formattedPrice} €</span>
              <span className="text-xl text-gray-500 line-through">{product.price.toFixed(2)} €</span>
            </>
          ) : (
            <span className="text-3xl font-bold">{formattedPrice} €</span>
          )}
        </div>
      </div>

      {/* Descripción */}
      <p className="text-gray-700 text-base leading-relaxed border-b border-gray-200 pb-6">
        {product.description}
      </p>

      {/* Colores disponibles */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase">
            Colores Disponibles
          </label>
          <div className="flex gap-3">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer hover:border-black transition"
                  style={{
                    backgroundColor: color === 'Blanco' ? '#fff' :
                                   color === 'Negro' ? '#000' :
                                   color === 'Gris' ? '#6b7280' :
                                   color === 'Azul' || color === 'Azul Marino' || color === 'Azul Oscuro' ? '#1e3a8a' :
                                   color === 'Rojo' ? '#dc2626' :
                                   color === 'Verde' || color === 'Verde Militar' ? '#16a34a' :
                                   color === 'Beige' || color === 'Camel' ? '#d4a574' :
                                   '#9ca3af'
                  }}
                  title={color}
                />
                <span className="text-xs text-gray-600">{color}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selector de Talla */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-semibold text-gray-900 uppercase">
            Selecciona tu talla
          </label>
          <button className="text-xs text-gray-600 underline hover:text-black">
            Guía de tallas
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {sizesList.map((t) => (
            <button
              key={t}
              onClick={() => setSize(t)}
              className={`
                px-6 py-3 border-2 text-sm font-semibold transition-all 
                ${size === t 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-900 border-gray-300 hover:border-black'}
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de Cantidad */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase">
          Cantidad
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 border-2 border-gray-300 rounded hover:border-black transition font-bold"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max="10" 
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="border-2 border-gray-300 p-3 w-20 text-center font-semibold focus:outline-none focus:border-black"
            name="quantity"
          />
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-10 h-10 border-2 border-gray-300 rounded hover:border-black transition font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-3 mt-4">
        <AddToCartButton product={product} size={size} quantity={quantity} />
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex-1 flex items-center justify-center gap-2 border-2 py-3 rounded-lg font-semibold transition ${
              isFavorite 
                ? 'border-red-500 text-red-500 bg-red-50' 
                : 'border-gray-300 text-gray-700 hover:border-black'
            }`}
          >
            <Heart size={20} className={isFavorite ? 'fill-red-500' : ''} />
            {isFavorite ? 'En Favoritos' : 'Favorito'}
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-black transition"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <div className="w-1 h-1 rounded-full bg-black mt-2"></div>
          <p className="text-gray-600">Envío gratis en pedidos superiores a 50€</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-1 h-1 rounded-full bg-black mt-2"></div>
          <p className="text-gray-600">Devoluciones gratuitas en 30 días</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-1 h-1 rounded-full bg-black mt-2"></div>
          <p className="text-gray-600">Pago 100% seguro y protegido</p>
        </div>
      </div>
    </div>
  );
}
