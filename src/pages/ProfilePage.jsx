import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { LogOut, ShoppingBag } from 'lucide-react';
import PRODUCTS from '../data/products';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const orders = (() => {
    try { return JSON.parse(localStorage.getItem('orders') || '[]').sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)); } catch { return []; }
  })();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <img
            src={user?.photo || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-black shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight mb-1">{user?.name}</h1>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/checkout')}
                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-lg transition"
                aria-label="Ir a checkout"
              >
                <ShoppingBag size={18} /> Nuevo pedido
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-lg transition"
                aria-label="Cerrar sesión"
              >
                <LogOut size={18} /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">Historial de pedidos almacenado localmente (demo). Para producción usar base de datos segura.</p>
      </div>

      <div className="space-y-6">
        {orders.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-sm text-gray-700">No tienes pedidos guardados todavía.</div>
        )}
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-bold">Pedido <span className="font-mono">{order.id}</span></h2>
                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Artículos: {order.items.length}</p>
                <p className="text-xl font-extrabold">{order.total.toFixed(2)} €</p>
              </div>
            </div>
            <div className="divide-y max-h-64 overflow-y-auto">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-3">
                  <img src={(it.images && it.images[0]) || it.image} alt={it.title} className="w-14 h-14 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{it.title}</p>
                    <p className="text-xs text-gray-500">Talla: {it.size} • Cant: {it.quantity}</p>
                  </div>
                  <p className="text-sm font-bold whitespace-nowrap">{(it.price * it.quantity).toFixed(2)} €</p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50 text-xs text-gray-600 flex flex-wrap gap-4">
              <span>Envío: {order.method}</span>
              <span>Destino: {order.shipping.city}, {order.shipping.state}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}