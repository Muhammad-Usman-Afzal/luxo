import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [], addToCart: () => {}, removeFromCart: () => {}, updateQuantity: () => {}, clearCart: () => {}, cartCount: 0, subtotal: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1, size?: string, color?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id && i.size === (size ?? undefined) && i.color === (color ?? undefined));
      if (existing) return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i);
      return [...prev, { id: Date.now(), productId: product.id, product, quantity, size, color }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: number) => { setItems(prev => prev.filter(i => i.id !== itemId)); }, []);
  const updateQuantity = useCallback((itemId: number, quantity: number) => { if (quantity < 1) return; setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i)); }, []);
  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
