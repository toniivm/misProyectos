import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../data/products'; 

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('destacados');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'camisetas', name: 'Camisetas' },
    { id: 'pantalones', name: 'Pantalones' },
    { id: 'chaquetas', name: 'Chaquetas' },
    { id: 'sudaderas', name: 'Sudaderas' },
    { id: 'accesorios', name: 'Accesorios' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Ordenamiento
    switch (sortBy) {
      case 'precio-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'precio-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'nombre':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nuevos':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-50">
      {/* Hero Section */}
      <div className="bg-black text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffffff,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tight font-[Inter]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">VALTREX</span>
            <span className="text-gray-400"> — NUEVA TEMPORADA</span>
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Moda urbana de alto rendimiento. Prendas premium diseñadas para quienes no comprometen estilo ni calidad.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 px-6 py-4 rounded-full text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.slice(0,80).trim())}
              name="search"
            />
            <div className="flex gap-4 justify-center">
              <a href="/productos" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition shadow-lg">Ver catálogo</a>
              <a href="/tallas" className="px-8 py-4 rounded-full bg-gradient-to-r from-black to-gray-700 text-white font-semibold hover:from-gray-900 hover:to-gray-600 transition shadow-lg">Guía de tallas</a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filtros y Ordenamiento */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <SlidersHorizontal size={18} />
              Filtros
            </button>

            {/* Categorías */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenamiento */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            name="sortBy"
          >
            <option value="destacados">Destacados</option>
            <option value="nuevos">Novedades</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
        </div>

        {/* Panel de Filtros Expandible */}
        {showFilters && (
          <motion.div
            className="mb-8 p-6 bg-white rounded-lg border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Filtros</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rango de Precio: {priceRange[0]}€ - {priceRange[1]}€
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                    name="priceMin"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                    name="priceMax"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resultados */}
        <div className="mb-6 text-gray-600">
          Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
        </div>

        {/* Cuadrícula de Productos */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          layout
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-4">
              No se encontraron productos
            </p>
            <p className="text-gray-400">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
