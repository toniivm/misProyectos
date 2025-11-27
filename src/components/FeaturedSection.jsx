import { motion } from 'framer-motion';
import { TrendingUp, Tag, Zap } from 'lucide-react';
import ProductCard from './ProductCard';
import PRODUCTS from '../data/products';

const FeaturedSection = () => {
  const newProducts = PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const discountProducts = PRODUCTS.filter(p => p.discount > 0).slice(0, 4);
  const popularProducts = PRODUCTS.slice(0, 4);

  const Section = ({ title, products, icon: Icon, color }) => (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`${color}`} size={28} />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Section 
        title="✨ Novedades" 
        products={newProducts} 
        icon={Zap}
        color="text-yellow-500"
      />
      <Section 
        title="🔥 Ofertas Especiales" 
        products={discountProducts} 
        icon={Tag}
        color="text-red-500"
      />
      <Section 
        title="⭐ Más Populares" 
        products={popularProducts} 
        icon={TrendingUp}
        color="text-blue-500"
      />
    </div>
  );
};

export default FeaturedSection;
