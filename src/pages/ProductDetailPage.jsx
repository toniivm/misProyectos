import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, Shield, Star } from 'lucide-react';
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductCard from "../components/ProductCard";
import SEOHelper from "../components/SEOHelper";
import useProducts from "../hooks/useProducts";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const [retryCount, setRetryCount] = useState(0);
  const product = useMemo(() => {
    const numericId = parseInt(id, 10);
    return (products || []).find((p) => p.id === numericId || String(p.id) === String(id));
  }, [products, id]);
  const [activeTab, setActiveTab] = useState('descripcion');

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">El producto que buscas no existe o ha sido eliminado.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Volver a la tienda
            </Link>
            {retryCount < 3 && (
              <button 
                onClick={() => setRetryCount(prev => prev + 1)}
                className="px-6 py-2 border-2 border-black rounded-lg hover:bg-gray-100 transition"
              >
                Reintentar ({retryCount}/3)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const { images = [], sizes = [] } = product;
  
  // Productos relacionados (misma categoría)
  const relatedProducts = (products || []).filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Reviews simuladas
  const reviews = [
    { id: 1, name: "María G.", rating: 5, comment: "¡Excelente calidad! Muy satisfecha con la compra.", date: "15/11/2025" },
    { id: 2, name: "Carlos R.", rating: 4, comment: "Buena relación calidad-precio. Recomendado.", date: "10/11/2025" },
    { id: 3, name: "Laura M.", rating: 5, comment: "Superó mis expectativas. Muy cómodo y el diseño es precioso.", date: "05/11/2025" },
  ];

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="bg-white">
      <SEOHelper 
        title={product.title}
        description={product.description}
        image={product.images?.[0]}
        url={window.location.href}
      />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-black">Inicio</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-black capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-black">{product.title}</span>
        </div>
      </div>

      {/* Producto Principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGallery images={images} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 self-start"
          >
            <ProductInfo product={{...product, sizes}} />
          </motion.div>
        </div>

        {/* Características y Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 py-8 border-y border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-full">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Envío Gratis</h3>
              <p className="text-sm text-gray-600">En pedidos superiores a 50€</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-full">
              <RefreshCw size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Devoluciones Gratis</h3>
              <p className="text-sm text-gray-600">30 días para cambios y devoluciones</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-full">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Compra Segura</h3>
              <p className="text-sm text-gray-600">Pago 100% seguro y protegido</p>
            </div>
          </div>
        </div>

        {/* Tabs de Información */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              {['descripcion', 'tallas', 'resenas'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-semibold text-sm uppercase transition-all ${
                    activeTab === tab
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab === 'descripcion' ? 'Descripción' : tab === 'tallas' ? 'Guía de Tallas' : 'Reseñas'}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'descripcion' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose max-w-none"
              >
                <h3 className="text-2xl font-bold mb-4">Detalles del Producto</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                
                <h4 className="text-lg font-bold mb-3">Características:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Material de alta calidad y duradero</li>
                  <li>Diseño moderno y versátil</li>
                  <li>Disponible en múltiples colores y tallas</li>
                  <li>Fácil cuidado y mantenimiento</li>
                </ul>
              </motion.div>
            )}

            {activeTab === 'tallas' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-bold mb-6">Guía de Tallas</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left">Talla</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Pecho (cm)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Cintura (cm)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Cadera (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 px-4 py-3">XS</td><td className="border border-gray-300 px-4 py-3">86-89</td><td className="border border-gray-300 px-4 py-3">66-69</td><td className="border border-gray-300 px-4 py-3">90-93</td></tr>
                      <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-3">S</td><td className="border border-gray-300 px-4 py-3">90-93</td><td className="border border-gray-300 px-4 py-3">70-73</td><td className="border border-gray-300 px-4 py-3">94-97</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-3">M</td><td className="border border-gray-300 px-4 py-3">94-97</td><td className="border border-gray-300 px-4 py-3">74-77</td><td className="border border-gray-300 px-4 py-3">98-101</td></tr>
                      <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-3">L</td><td className="border border-gray-300 px-4 py-3">98-101</td><td className="border border-gray-300 px-4 py-3">78-81</td><td className="border border-gray-300 px-4 py-3">102-105</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-3">XL</td><td className="border border-gray-300 px-4 py-3">102-107</td><td className="border border-gray-300 px-4 py-3">82-87</td><td className="border border-gray-300 px-4 py-3">106-111</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-600">* Las medidas son aproximadas y pueden variar según el modelo.</p>
              </motion.div>
            )}

            {activeTab === 'resenas' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl font-bold">{avgRating.toFixed(1)}</div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{reviews.length} reseñas</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-bold">{review.name}</div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
        {error && (
          <p className="text-center text-xs text-red-500 mt-8">Usando datos locales: {error}</p>
        )}
      </div>
    </div>
  );
}