import { Link } from 'react-router-dom';
import { X, ShoppingCart, Search, Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const WishlistSidebar = () => {
  const { wishlist, removeFromWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWishlist = useMemo(() => {
    if (!searchTerm.trim()) return wishlist;
    const term = searchTerm.toLowerCase();
    return wishlist.filter(item => 
      item.title.toLowerCase().includes(term) ||
      item.brand?.toLowerCase().includes(term) ||
      item.category?.toLowerCase().includes(term) ||
      (Array.isArray(item.colors) && item.colors.some(c => c.toLowerCase().includes(term)))
    );
  }, [wishlist, searchTerm]);

  const handleAddToCart = (product) => {
    try {
      const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Único';
      addToCart({ ...product, size: defaultSize, quantity: 1 });
      removeFromWishlist(product.id);
    } catch (err) {
      console.error('[Wishlist] Error adding to cart:', err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isWishlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setIsWishlistOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isWishlistOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 w-96 max-w-full h-full bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Heart size={24} className="text-red-500 fill-red-500" />
              Mi Lista de Deseos
            </h2>
            <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Search box */}
          {wishlist.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar favoritos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Tu lista de deseos está vacía</p>
              <Link to="/" onClick={() => setIsWishlistOpen(false)} className="text-blue-600 hover:underline">
                Explorar productos
              </Link>
            </div>
          ) : filteredWishlist.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay resultados para "{searchTerm}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredWishlist.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <Link to={`/product/${item.id}`} onClick={() => setIsWishlistOpen(false)}>
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} onClick={() => setIsWishlistOpen(false)}>
                      <h3 className="font-semibold hover:text-red-600 text-sm">{item.title}</h3>
                    </Link>
                    <p className="text-lg font-bold text-black mt-1">{item.price?.toFixed(2) || '0.00'} €</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1 text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                      >
                        <ShoppingCart size={12} />
                        Carrito
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                      >
                        <Trash2 size={12} />
                        Quitar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default WishlistSidebar;
