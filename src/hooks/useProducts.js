import { useEffect, useState } from 'react';
import LOCAL_PRODUCTS from '../data/products';

// Support both legacy REACT_APP_API_BASE and new REACT_APP_API_URL
const API_BASE = (process.env.REACT_APP_API_URL || process.env.REACT_APP_API_BASE || '').replace(/\/$/, '');
let cache = null;
let pending = null;

function normalize(products){
  if (!Array.isArray(products)) return [];
  return products.map((p) => ({
    ...p,
    id: typeof p.id === 'string' ? p.id : String(p.id)
  }));
}

export function useProducts(){
  // OPTIMIZACIÓN: Cargar productos locales inmediatamente sin esperar fetch
  const [products, setProducts] = useState(() => cache || normalize(LOCAL_PRODUCTS));
  const [loading, setLoading] = useState(false); // No mostrar loading si ya tenemos productos locales
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay API configurada, usar productos locales directamente
    if (!API_BASE || API_BASE === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.info('No API configured, using local products');
      }
      return;
    }

    let cancelled = false;
    let controller;
    const load = async () => {
      controller = new AbortController();
      // OPTIMIZACIÓN: Reducir timeout a 2 segundos (más rápido)
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      let hasError = false;
      
      try {
        if (!pending) {
          pending = fetch(`${API_BASE}/products`, { 
            headers: { 'Accept': 'application/json' }, 
            signal: controller.signal 
          })
            .then(async (res) => {
              if (!res.ok) throw new Error(`HTTP_${res.status}`);
              const body = await res.json();
              return normalize(body?.products || []);
            })
            .catch((err) => {
              throw err;
            });
        }
        const remote = await pending;
        if (!cancelled && remote && remote.length > 0){
          cache = remote;
          setProducts(cache);
          setError(null);
        }
      } catch (err){
        hasError = true;
        if (!cancelled){
          // Reset pending on error so next request can retry
          pending = null;
          // Solo loggear en desarrollo
          if (err?.name !== 'AbortError' && process.env.NODE_ENV !== 'production') {
            console.info('API fetch failed, using local products', err.message);
          }
          // Ya tenemos productos locales, no necesitamos actualizar
        }
      } finally {
        clearTimeout(timeoutId);
        if (!cancelled) {
          setLoading(false);
          // Reset pending on success
          if (!hasError) {
            pending = null;
          }
        }
      }
    };
    
    // Solo hacer fetch si hay cache vieja o no hay cache
    if (!cache) {
      load();
    }
    
    return () => { cancelled = true; if (controller) controller.abort(); };
  }, []);

  return { products, loading, error };
}

export default useProducts;
