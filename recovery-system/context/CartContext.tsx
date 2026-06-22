 'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getActiveBundle, type Bundle } from '../lib/catalog';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  icon: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type Action =
  | { type: 'ADD'; item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE'; slug: string }
  | { type: 'UPDATE_QTY'; slug: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'HYDRATE'; items: CartItem[] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.items };
    case 'ADD': {
      const existing = state.items.find((i) => i.slug === action.item.slug);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.slug === action.item.slug
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => i.slug !== action.slug),
      };
    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.slug !== action.slug),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.slug === action.slug ? { ...i, quantity: action.quantity } : i,
        ),
      };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  totalItems: number;
  subtotal: number;
  activeBundle: Bundle | null;
  bundleDiscount: number;
  totalWithDiscount: number;
  add: (item: Omit<CartItem, 'quantity'>) => void;
  remove: (slug: string) => void;
  updateQty: (slug: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    isOpen: false,
  });
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('recover_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', items: parsed });
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to read cart from localStorage', e);
    }

    // Cross-tab sync: listen for changes to the cart key
    const onStorage = (ev: StorageEvent) => {
      if (ev.key !== 'recover_cart') return;
      try {
        const newVal = ev.newValue;
        if (!newVal) return dispatch({ type: 'HYDRATE', items: [] });
        const parsed = JSON.parse(newVal);
        if (Array.isArray(parsed)) dispatch({ type: 'HYDRATE', items: parsed });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to parse cart from storage event', err);
      }
    };

    window.addEventListener('storage', onStorage);
    setHasHydrated(true);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    try {
      localStorage.setItem('recover_cart', JSON.stringify(state.items));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to write cart to localStorage', e);
    }
  }, [hasHydrated, state.items]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce(
    (s, i) => s + i.price * i.quantity,
    0,
  );

  const activeBundle = getActiveBundle(state.items.map((i) => i.slug));
  const bundleDiscount = activeBundle
    ? Math.round(subtotal * (activeBundle.discountPercent / 100) * 100) / 100
    : 0;
  const totalWithDiscount = Math.max(0, subtotal - bundleDiscount);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        hasHydrated,
        totalItems,
        subtotal,
        activeBundle,
        bundleDiscount,
        totalWithDiscount,
        add: (item) => dispatch({ type: 'ADD', item }),
        remove: (slug) => dispatch({ type: 'REMOVE', slug }),
        updateQty: (slug, quantity) =>
          dispatch({ type: 'UPDATE_QTY', slug, quantity }),
        clear: () => dispatch({ type: 'CLEAR' }),
        open: () => dispatch({ type: 'OPEN' }),
        close: () => dispatch({ type: 'CLOSE' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
