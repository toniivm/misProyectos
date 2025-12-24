import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Edit2, Trash2, Save, X, TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react';
import PRODUCTS from '../data/products';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStock: 0,
    totalValue: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    // Load products from localStorage or use default
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);
      calculateStats(parsedProducts);
    } else {
      setProducts(PRODUCTS);
      calculateStats(PRODUCTS);
      localStorage.setItem('admin_products', JSON.stringify(PRODUCTS));
    }
  }, []);

  const calculateStats = (productList) => {
    const totalProducts = productList.length;
    const totalStock = productList.reduce((sum, p) => sum + (p.stock || 0), 0);
    const lowStock = productList.filter(p => (p.stock || 0) < 10).length;
    const totalValue = productList.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const totalOrders = orders.length;
    const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
    setStats({ totalProducts, totalStock, lowStock, totalValue, totalOrders, revenue });
  };

  const handleSaveProducts = (updatedProducts) => {
    try {
      localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      calculateStats(updatedProducts);
      if (process.env.NODE_ENV === 'development') {
        console.log('Products saved to localStorage');
      }
    } catch (err) {
      console.error('Failed to save products:', err.message);
    }
  };

  const handleStockUpdate = (productId, newStock) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, stock: parseInt(newStock) || 0 } : p
    );
    handleSaveProducts(updated);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Eliminar este producto?')) {
      const updated = products.filter(p => p.id !== productId);
      handleSaveProducts(updated);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updated = products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    );
    handleSaveProducts(updated);
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleAddProduct = (newProduct) => {
    const maxId = Math.max(...products.map(p => p.id), 0);
    const productWithId = {
      ...newProduct,
      id: maxId + 1,
      slug: newProduct.title.toLowerCase().replace(/\s+/g, '-'),
      isNew: true
    };
    const updated = [...products, productWithId];
    handleSaveProducts(updated);
    setShowAddForm(false);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`¿Eliminar ${selectedProducts.length} productos seleccionados?`)) {
      const updated = products.filter(p => !selectedProducts.includes(p.id));
      handleSaveProducts(updated);
      setSelectedProducts([]);
    }
  };

  const handleBulkStockUpdate = (adjustment) => {
    const updated = products.map(p => {
      if (selectedProducts.includes(p.id)) {
        return { ...p, stock: Math.max(0, (p.stock || 0) + adjustment) };
      }
      return p;
    });
    handleSaveProducts(updated);
    setSelectedProducts([]);
  };

  const handleBulkDiscount = (discount) => {
    const updated = products.map(p => {
      if (selectedProducts.includes(p.id)) {
        return { ...p, discount: parseInt(discount) || 0 };
      }
      return p;
    });
    handleSaveProducts(updated);
    setSelectedProducts([]);
  };

  const handleExportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `valtrex-products-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    console.log('📥 [VALTREX Admin] Products exported');
  };

  const handleImportProducts = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported)) {
            handleSaveProducts(imported);
            alert(`✅ ${imported.length} productos importados correctamente`);
          } else {
            alert('❌ Formato de archivo inválido');
          }
        } catch (error) {
          alert('❌ Error al leer el archivo');
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('¿Restaurar productos por defecto? Se perderán los cambios actuales.')) {
      handleSaveProducts(PRODUCTS);
      alert('✅ Productos restaurados');
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="mx-auto mb-4 text-gray-400" size={64} />
          <h2 className="text-2xl font-bold mb-2">Acceso Restringido</h2>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para acceder al panel de administración</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-black">VALTREX</span>
            <span className="text-gray-400"> Admin Panel</span>
          </h1>
          <p className="text-gray-600">Gestión de productos e inventario</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg w-fit mb-2">
              <Package size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-gray-600 text-xs">Productos</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="bg-green-100 text-green-600 p-2 rounded-lg w-fit mb-2">
              <TrendingUp size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalStock}</p>
            <p className="text-gray-600 text-xs">Stock Total</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="bg-red-100 text-red-600 p-2 rounded-lg w-fit mb-2">
              <ShoppingCart size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.lowStock}</p>
            <p className="text-gray-600 text-xs">Stock Bajo</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg w-fit mb-2">
              <DollarSign size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalValue.toFixed(0)}€</p>
            <p className="text-gray-600 text-xs">Valor Stock</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg w-fit mb-2">
              <Users size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-gray-600 text-xs">Pedidos</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg w-fit mb-2">
              <DollarSign size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.revenue.toFixed(0)}€</p>
            <p className="text-gray-600 text-xs">Ingresos</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
              {/* Search */}
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
              
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value="all">Todas las categorías</option>
                <option value="camisetas">Camisetas</option>
                <option value="pantalones">Pantalones</option>
                <option value="chaquetas">Chaquetas</option>
                <option value="sudaderas">Sudaderas</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                <Plus size={18} />
                Añadir
              </button>
              
              <button
                onClick={handleExportProducts}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                📥 Exportar
              </button>
              
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                📤 Importar
                <input type="file" accept=".json" onChange={handleImportProducts} className="hidden" />
              </label>
              
              <button
                onClick={handleResetToDefault}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                title="Restaurar productos por defecto"
              >
                🔄
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="mt-4 pt-4 border-t flex items-center gap-3">
              <span className="text-sm font-semibold">{selectedProducts.length} seleccionados</span>
              <button
                onClick={() => handleBulkStockUpdate(10)}
                className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
              >
                +10 Stock
              </button>
              <button
                onClick={() => handleBulkStockUpdate(-10)}
                className="text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition"
              >
                -10 Stock
              </button>
              <button
                onClick={() => {
                  const discount = prompt('Descuento (%):');
                  if (discount) handleBulkDiscount(discount);
                }}
                className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              >
                Aplicar Descuento
              </button>
              <button
                onClick={handleBulkDelete}
                className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
              >
                Eliminar
              </button>
              <button
                onClick={() => setSelectedProducts([])}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Mostrando {filteredProducts.length} de {products.length} productos
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <AddProductForm
            onSave={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Edit Product Modal */}
        {isEditing && editingProduct && (
          <EditProductModal
            product={editingProduct}
            onChange={setEditingProduct}
            onSave={handleSaveEdit}
            onCancel={() => {
              setIsEditing(false);
              setEditingProduct(null);
            }}
          />
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-black"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelectProduct(product.id)}
                        className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-black"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] || 'https://placehold.co/60x60'}
                          alt={product.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold">{product.title}</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{product.price}€</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={product.stock || 0}
                        onChange={(e) => handleStockUpdate(product.id, e.target.value)}
                        className="w-20 px-2 py-1 border rounded focus:ring-2 focus:ring-black focus:outline-none"
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {(product.stock || 0) < 10 ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                          Stock Bajo
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Disponible
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Product Form Component
function AddProductForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'camisetas',
    stock: '50',
    images: ['https://placehold.co/800x800/333/FFF?text=Nuevo+Producto'],
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      discount: parseInt(formData.discount) || 0
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Añadir Nuevo Producto</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Nombre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Categoría</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          >
            <option value="camisetas">Camisetas</option>
            <option value="pantalones">Pantalones</option>
            <option value="chaquetas">Chaquetas</option>
            <option value="sudaderas">Sudaderas</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Precio (€)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Stock Inicial</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            rows="3"
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
          >
            <Save size={18} />
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
}

// Edit Product Modal Component
function EditProductModal({ product, onChange, onSave, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Editar Producto</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre</label>
            <input
              type="text"
              value={product.title}
              onChange={(e) => onChange({ ...product, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Precio (€)</label>
            <input
              type="number"
              step="0.01"
              value={product.price}
              onChange={(e) => onChange({ ...product, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Stock</label>
            <input
              type="number"
              value={product.stock || 0}
              onChange={(e) => onChange({ ...product, stock: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Categoría</label>
            <select
              value={product.category}
              onChange={(e) => onChange({ ...product, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            >
              <option value="camisetas">Camisetas</option>
              <option value="pantalones">Pantalones</option>
              <option value="chaquetas">Chaquetas</option>
              <option value="sudaderas">Sudaderas</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Descripción</label>
            <textarea
              value={product.description}
              onChange={(e) => onChange({ ...product, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
