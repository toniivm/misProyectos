import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Truck, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PaymentLogos from '../components/PaymentLogos';
import useProducts from '../hooks/useProducts'; 

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('nuevos');

  // Categorías - Flight Club Style
  const categories = [
    { id: 'nuevos', label: 'Nuevos Lanzamientos', icon: <TrendingUp size={18} /> },
    { id: 'ofertas', label: 'Ofertas', icon: <Award size={18} /> },
    { id: 'jordan', label: 'Air Jordan' },
    { id: 'yeezy', label: 'Yeezy' },
    { id: 'luxury', label: 'Luxury' },
  ];

  const getProductsByCategory = (categoryId) => {
    const source = Array.isArray(products) ? products : [];
    switch (categoryId) {
      case 'nuevos':
        return source.filter(p => p.isNew).slice(0, 8);
      case 'ofertas':
        return source.filter(p => p.discount > 0).slice(0, 8);
      case 'jordan':
        return source.filter(p => p.title.toLowerCase().includes('jordan')).slice(0, 8);
      case 'yeezy':
        return source.filter(p => p.title.toLowerCase().includes('yeezy')).slice(0, 8);
      case 'luxury':
        return source.filter(p => ['Balenciaga', 'Gucci', 'Prada', 'Off-White'].includes(p.brand)).slice(0, 8);
      default:
        return source.slice(0, 8);
    }
  };

  const displayProducts = useMemo(() => getProductsByCategory(selectedCategory), [selectedCategory, products, getProductsByCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Large Image Banner (Refined Mobile) */}
      <div className="relative overflow-hidden bg-black text-white">
        <div className="relative h-[70vh] md:h-[75vh]">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1280&h=1280&fit=crop&q=80" 
            alt="Sneakers Premium"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            fetchPriority="high"
          />
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  SNEAKERS<br/>
                  <span className="text-gray-400">AUTÉNTICAS</span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 max-w-xl font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Las mejores marcas. Verificación garantizada. Envío express 24-48h.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link 
                    to="/productos" 
                    className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm md:text-base hover:bg-gray-200 transition-all inline-flex items-center justify-center gap-2 rounded-md shadow"
                  >
                    EXPLORAR TIENDA
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/productos"
                    className="border border-white/70 text-white px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm md:text-base hover:bg-white hover:text-black transition-all rounded-md backdrop-blur-sm"
                  >
                    NUEVOS LANZAMIENTOS
                  </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="flex items-center gap-2 min-w-[40%]">
                    <Shield size={18} className="text-green-400" />
                    <span className="text-gray-300">100% Auténtico</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-[40%]">
                    <Truck size={18} className="text-blue-400" />
                    <span className="text-gray-300">Envío Gratis +100€</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-[40%]">
                    <Award size={18} className="text-purple-400" />
                    <span className="text-gray-300">Verificación Experta</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs - Sticky (improved mobile spacing) */}
      <div className="border-b border-gray-200 bg-white sticky top-[64px] sm:top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 py-3 sm:py-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2
                  ${selectedCategory === cat.id 
                    ? 'bg-black text-white shadow-inner' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black">
            {categories.find(c => c.id === selectedCategory)?.label}
          </h2>
          <Link 
            to="/productos" 
            className="text-sm font-bold hover:underline flex items-center gap-1 group"
          >
            Ver Todo
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading && (
            <div className="col-span-4 text-center text-gray-500 py-8">Cargando productos...</div>
          )}
          {!loading && displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        {error && (
          <p className="text-xs text-red-500 mt-3">Usando datos locales: {error}</p>
        )}
      </div>

      {/* Featured Brands */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">Marcas Destacadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Nike', 'Adidas', 'Balenciaga', 'Gucci', 'Off-White', 'Prada'].map((brand) => (
              <Link
                key={brand}
                to={`/productos`}
                className="aspect-square bg-white rounded-lg flex items-center justify-center text-xl md:text-2xl font-black hover:shadow-xl transition-all hover:scale-105"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Shield size={48} className="mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">100% Autenticidad</h3>
              <p className="text-gray-400 text-sm">
                Verificación experta de 20 puntos en cada producto
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Truck size={48} className="mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Envío Express</h3>
              <p className="text-gray-400 text-sm">
                Entrega en 24-48h. Empaquetado discreto
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Award size={48} className="mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-2">Garantía Total</h3>
              <p className="text-gray-400 text-sm">
                Devolución garantizada. Compra 100% segura
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Métodos de Pago Seguros</h3>
          <PaymentLogos size="lg" showAll={true} />
          <p className="text-center text-gray-400 text-sm mt-6">
            Pago 100% seguro con cifrado SSL • Procesamiento PCI-DSS Level 1
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            ¿Listo para tu próximo par?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explora nuestra colección completa de sneakers premium
          </p>
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 bg-black text-white px-10 py-5 text-lg font-bold hover:bg-gray-800 transition-all group"
          >
            Ver Toda la Colección
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
