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
  const [products, setProducts] = useState(() => cache || normalize(LOCAL_PRODUCTS));
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        if (!pending) {
          pending = fetch(`${API_BASE}/products`, { headers: { 'Accept': 'application/json' } })
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
        if (!cancelled){
          cache = remote.length ? remote : normalize(LOCAL_PRODUCTS);
          setProducts(cache);
          setError(null);
        }
      } catch (err){
        if (!cancelled){
          console.error('Products fetch failed, using fallback', err);
          setProducts(normalize(LOCAL_PRODUCTS));
          setError(err.message || 'FETCH_FAILED');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}

export default useProducts;
