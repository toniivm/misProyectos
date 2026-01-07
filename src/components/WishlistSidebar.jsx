import { Link } from 'react-router-dom';
import { X, ShoppingCart, Search } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const WishlistSidebar = ({ isOpen, setIsOpen }) => {
  const { wishlist, removeFromWishlist } = useWishlist();
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
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Único';
    addToCart({ ...product, size: defaultSize, quantity: 1 });
    removeFromWishlist(product.id);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 w-96 max-w-full h-full bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">❤️ Mi Lista de Deseos</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Tu lista de deseos está vacía</p>
              <Link to="/" onClick={() => setIsOpen(false)} className="text-blue-600 hover:underline">
                Explorar productos
              </Link>
            </div>
          ) : filteredWishlist.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay resultados para "{searchTerm}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWishlist.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4">
                  <Link to={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                      <h3 className="font-semibold hover:text-blue-600 text-sm">{item.title}</h3>
                    </Link>
                    <p className="text-lg font-bold mt-1">{item.price.toFixed(2)} €</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                      >
                        <ShoppingCart size={14} />
                        Añadir
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default WishlistSidebar;
