import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import SafeImage from './SafeImage';
import Button from './Button';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, highlightTerm }) => {
  const { isInWishlist, addToWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);
  const image = product?.images?.[0] || 'https://images.unsplash.com/photo-1555062407-98eeb64c6a62?w=800&h=800&fit=crop'; 
  
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 group relative border border-gray-100"
      whileHover={{ y: -6 }}
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
          addToWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300 shadow"
      >
        <Heart
          size={20}
          className={`transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
        />
      </button>

      <Link to={product.slug ? `/producto/${product.slug}` : `/product/${product.id}`} className="block">
        {/* Imagen del producto */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <SafeImage
            src={image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            fetchPriority="low"
          />
          
          {/* Overlay con CTA */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <Button variant="secondary" size="md" className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0">
              <ShoppingCart size={18} className="mr-2" />
              Añadir al carrito
            </Button>
          </div>
        </div>
        
        {/* Información del producto */}
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
            {product.brand && (
              <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                {product.brand}
              </span>
            )}
          </div>
          
          <h3
            className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: highlightTerm && highlightTerm.length > 1
                ? product.title.replace(new RegExp(`(${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'), '<mark class="bg-yellow-200">$1</mark>')
                : product.title
            }}
          />
          
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
          
          {/* Precio y stock */}
          <div className="flex items-center gap-2 sm:gap-3">
            {hasDiscount ? (
              <>
                <span className="text-base sm:text-lg font-extrabold text-black">
                  {discountedPrice.toFixed(2)} €
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {product.price.toFixed(2)} €
                </span>
              </>
            ) : (
              <span className="text-base sm:text-lg font-extrabold text-black">
                {product.price.toFixed(2)} €
              </span>
            )}
            {product.stock !== undefined && (
              <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {product.stock < 10 ? 'Stock bajo' : 'Disponible'}
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
