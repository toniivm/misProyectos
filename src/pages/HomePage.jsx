import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FeaturedSection from '../components/FeaturedSection';
import PaymentLogos from '../components/PaymentLogos';
import PRODUCTS from '../data/products'; 

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [sortBy, setSortBy] = useState('destacados');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const brands = [
    { id: 'todos', name: 'Todas las Marcas' },
    { id: 'Nike', name: 'Nike' },
    { id: 'Adidas', name: 'Adidas' },
    { id: 'Balenciaga', name: 'Balenciaga' },
    { id: 'Gucci', name: 'Gucci' },
    { id: 'Off-White', name: 'Off-White' },
    { id: 'Prada', name: 'Prada' },
    { id: 'New Balance', name: 'New Balance' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'todos' || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesBrand && matchesPrice;
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
  }, [searchTerm, selectedBrand, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Stats Bar */}
          <motion.div 
            className="flex justify-center gap-8 mb-8 pb-8 border-b border-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">15K+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Ventas Verificadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">98%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Auténtico</div>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/30">
                🔒 Verificado & Seguro
              </span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl font-black mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              VALTREX
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Marketplace Premium de Sneakers Auténticas
              <span className="block mt-2 text-base text-gray-400">Nike • Adidas • Balenciaga • Gucci • Off-White • Prada</span>
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar Air Jordan, Yeezy, Dunk..."
                  className="w-full px-6 py-5 pr-14 rounded-2xl text-lg text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name="search"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Authentication Guarantee Section - StockX Style */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Authentication Badge */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-green-50 px-6 py-3 rounded-full border-2 border-green-500 mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="text-left">
                <div className="text-lg font-bold text-green-700">Verificación de Autenticidad</div>
                <div className="text-xs text-green-600">Cada producto inspeccionado por expertos</div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Compra con Total Confianza</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Proceso de verificación de 20 puntos para garantizar que cada sneaker sea 100% auténtica
            </p>
          </motion.div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Autenticidad Garantizada</h3>
              <p className="text-sm text-gray-600">Verificación multi-punto por expertos certificados. Garantía de devolución 100%.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Pago Cifrado SSL</h3>
              <p className="text-sm text-gray-600">Certificado SSL 256-bit. Tus datos bancarios siempre protegidos y encriptados.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Envío Express 24-48h</h3>
              <p className="text-sm text-gray-600">Empaquetado discreto y rastreo en tiempo real. Sin marcas externas visibles.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Privacidad Absoluta</h3>
              <p className="text-sm text-gray-600">Sin tracking invasivo. Tus datos nunca serán compartidos o vendidos a terceros.</p>
            </motion.div>
          </div>

          {/* Payment Methods - Enhanced */}
          <motion.div 
            className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Métodos de Pago Seguros</h3>
              <p className="text-gray-400 text-sm">Procesamiento PCI-DSS Level 1 Certificado</p>
            </div>
            <PaymentLogos size="lg" showAll={true} />
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs md:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Pago 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Devolución Garantizada</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 inline text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Cifrado Bancario</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">24/7</div>
              <div className="text-sm text-gray-400">Soporte al Cliente</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">15K+</div>
              <div className="text-sm text-gray-400">Sneakers Vendidas</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">98%</div>
              <div className="text-sm text-gray-400">Clientes Satisfechos</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">48h</div>
              <div className="text-sm text-gray-400">Envío Máximo</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Secciones Destacadas */}
      <FeaturedSection />

      {/* How It Works - Verification Process */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">Proceso de Verificación</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada sneaker pasa por un riguroso control de calidad de 20 puntos antes de llegar a tus manos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Compra Segura</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Realiza tu pedido con pago cifrado SSL. Protegemos tus datos bancarios con tecnología de nivel bancario.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -translate-x-8"></div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Inspección Experta</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nuestros especialistas verifican autenticidad: etiquetas, costuras, materiales, peso, packaging y más.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 -translate-x-8"></div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Certificación</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Una vez verificado, sellamos el producto con certificado de autenticidad digital único e irrepetible.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-pink-500 to-green-500 -translate-x-8"></div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-black text-white">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Envío Discreto</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Empaquetado premium sin marcas externas. Rastreo en tiempo real. Entrega en 24-48h garantizado.
              </p>
            </motion.div>
          </div>

          {/* Guarantee Badge */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="inline-block bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 rounded-2xl border-2 border-green-500">
              <div className="flex items-center gap-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-left">
                  <div className="text-2xl font-black text-gray-900">Garantía de Autenticidad 100%</div>
                  <div className="text-sm text-gray-600 mt-1">Si no es auténtico, te devolvemos el doble de tu dinero</div>
                </div>
              </div>
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

            {/* Marcas */}
            <div className="flex gap-2 flex-wrap">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedBrand === brand.id
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {brand.name}
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
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Todos los Productos</h2>
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
          </p>
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
