import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../data/products'; 

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-wider">NUEVA COLECCIÓN</h1>
      
      {/* Search Bar - Estilo limpio con borde inferior */}
      <div className="mb-12 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="w-full p-3 border-b border-gray-300 text-lg focus:outline-none focus:border-black transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cuadrícula de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
          <p className="text-center text-xl text-gray-500 mt-20">
              No se encontraron resultados para "<strong>{searchTerm}</strong>".
          </p>
      )}
    </div>
  );
};

export default HomePage;
