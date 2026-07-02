import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { ProductContext } from './ProductContext';

interface WishlistContextType {
  wishlistIds: number[];
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (productId: number) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [], isWishlisted: () => false, toggleWishlist: () => {}, wishlistCount: 0,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const isWishlisted = useCallback((id: number) => wishlistIds.includes(id), [wishlistIds]);
  const toggleWishlist = useCallback((id: number) => {
    setWishlistIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistIds, isWishlisted, toggleWishlist, wishlistCount: wishlistIds.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() { return useContext(WishlistContext); }
export function useWishlistProducts() {
  const { wishlistIds } = useWishlist();
  const { products } = useContext(ProductContext);
  return products.filter(p => p.stock > 0 && wishlistIds.includes(p.id));
}
