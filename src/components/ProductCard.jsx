import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import SafeImage from './SafeImage';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const image = product.images ? product.images[0] : 'https://placehold.co/800x800/222/FFF?text=Producto'; 
  
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative"
      whileHover={{ y: -5 }}
    >
      {/* Etiquetas superiores */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
            NUEVO
          </span>
        )}
        {hasDiscount && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Botón de Favorito */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsLiked(!isLiked);
        }}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300"
      >
        <Heart
          size={20}
          className={`transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
        />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        {/* Imagen del producto */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <SafeImage
            src={image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay con botón de compra rápida */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-6">
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <ShoppingCart size={18} />
              Añadir al carrito
            </button>
          </div>
        </div>
        
        {/* Información del producto */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
            {product.title}
          </h3>
          
          {/* Colores disponibles */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 mb-3">
              {product.colors.slice(0, 4).map((color, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-full border-2 border-gray-300"
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
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 self-center">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
          
          {/* Precio */}
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-black">
                  {discountedPrice.toFixed(2)} €
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.price.toFixed(2)} €
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-black">
                {product.price.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Tallas disponibles */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3 text-xs text-gray-500">
              Tallas: {product.sizes.slice(0, 5).join(', ')}
              {product.sizes.length > 5 && '...'}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
