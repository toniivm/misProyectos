import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

export default function ProductPage() {
  const { products, loading, error } = useProducts();
  const [rawSearch, setRawSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const productList = useMemo(() => (Array.isArray(products) ? products : []), [products]);
  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(rawSearch.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [rawSearch]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('destacados');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);

  const synonymMap = useMemo(() => ({
    zapatillas: ['sneakers', 'sneaker', 'tenis', 'calzado', 'shoes', 'shoe'],
    bolsos: ['bolso', 'bag', 'bags', 'cartera', 'bolsa', 'handbag', 'tote'],
    nike: ['air force', 'air max', 'jordan'],
    louis: ['louis vuitton', 'lv'],
    prada: ['nylon', 're-edition'],
    gucci: ['gg', 'marmont'],
    hermès: ['hermes'],
    dior: ['oblique', 'book tote'],
  }), []);

  const normalizeText = (text) =>
    (text || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u001F]/g, ' ')
        .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const keywordMap = useMemo(() => {
    const map = {};
    productList.forEach((p) => {
      const synonyms = [];
      if (p.category && synonymMap[p.category]) synonyms.push(...synonymMap[p.category]);
      const brandKey = typeof p.brand === 'string' ? p.brand.toLowerCase() : '';
      if (brandKey && synonymMap[brandKey]) synonyms.push(...synonymMap[brandKey]);
      const fields = [
        p.title,
        p.description,
        p.brand,
        p.category,
        Array.isArray(p.colors) ? p.colors.join(' ') : '',
        Array.isArray(p.sizes) ? p.sizes.join(' ') : '',
      ];
      const joined = [...fields, ...synonyms].join(' ');
      map[p.id] = normalizeText(joined);
    });
    return map;
  }, [productList, synonymMap]);

  const priceBounds = useMemo(() => {
    if (!productList.length) return { min: 0, max: 3000 };
    const prices = productList.map((p) => Number(p.price) || 0);
    const min = Math.max(0, Math.floor(Math.min(...prices) / 10) * 10);
    const maxCandidate = Math.ceil(Math.max(...prices, 200) / 50) * 50;
    const max = Math.max(200, maxCandidate, min + 50);
    return { min, max };
  }, [productList]);

  useEffect(() => {
    setPriceRange([priceBounds.min, priceBounds.max]);
  }, [priceBounds.min, priceBounds.max]);

  const categories = useMemo(() => {
    const dynamicCats = Array.from(new Set(productList.map((p) => p.category).filter(Boolean)));
    const withNames = dynamicCats.map((id) => ({ id, name: id.charAt(0).toUpperCase() + id.slice(1) }));
    return [{ id: 'todos', name: 'Todos' }, ...withNames];
  }, [productList]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);
    const source = productList;
    let filtered = source.filter((product) => {
      const keywords = keywordMap[product.id] || '';
      const matchesSearch = !normalizedSearch || keywords.includes(normalizedSearch);
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesPrice = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];
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
  }, [productList, keywordMap, searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Productos</h1>
          <p className="text-gray-600">Descubre toda nuestra colección de moda urbana</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Barra de búsqueda */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar zapatillas, bolsos, sneakers, marcas..."
            className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            value={rawSearch}
            onChange={(e) => setRawSearch(e.target.value.slice(0,80))}
            name="search"
            aria-label="Buscar productos"
          />
        </div>

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
              <h3 className="text-lg font-bold">Filtros Avanzados</h3>
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
                    min={priceBounds.min}
                    max={priceBounds.max}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                    name="priceMin"
                  />
                  <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {!loading && filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} highlightTerm={searchTerm} />
            </motion.div>
          ))}
        </motion.div>
        
        {loading && (
          <div className="text-center py-20 text-gray-500">Cargando productos...</div>
        )}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-4">
              No se encontraron productos
            </p>
            <p className="text-gray-400">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        )}
        {error && (
          <p className="text-center text-xs text-red-500 mt-4">Usando datos locales: {error}</p>
        )}
      </div>
    </div>
  );
}
