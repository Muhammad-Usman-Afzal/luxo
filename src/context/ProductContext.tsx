import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { products as mockProducts } from '../data/mockData';
import type { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  loading: boolean;
}

export const ProductContext = createContext<ProductContextType>({
  products: [], addProduct: async () => {}, updateProduct: async () => {},
  deleteProduct: async () => {}, loading: true,
});

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/products');
        if (res.ok) {
          const data = await res.json();
          const merged = data.map((p: Product) => {
            const mock = mockProducts.find(m => m.id === p.id);
            if (mock && mock.images.length > (p.images?.length || 0)) {
              return { ...p, images: mock.images };
            }
            return p;
          });
          setProducts(merged);
        } else throw new Error('API failed');
      } catch {
        setProducts(mockProducts);
      }
      setLoading(false);
    })();
  }, []);

  const addProduct = useCallback(async (product: Product) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const saved = await res.json();
        setProducts(prev => [saved, ...prev]);
        return;
      }
    } catch {}
    setProducts(prev => [product, ...prev]);
  }, []);

  const updateProduct = useCallback(async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const saved = await res.json();
        setProducts(prev => prev.map(p => p.id === saved.id ? saved : p));
        return;
      }
    } catch {}
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    } catch {}
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
