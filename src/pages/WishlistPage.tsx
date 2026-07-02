// Wishlist — Dark+Light | BazaarHub
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronLeft } from 'lucide-react';
import { useWishlistProducts, useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const navigate = useNavigate();
  const wishlistProducts = useWishlistProducts();
  const { toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-4 dark:text-white">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"><ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" /></button>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Heart size={24} className="text-red-500"/> My Wishlist ({wishlistProducts.length})</h1>
      </div>
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16"><Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4"/><h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2><p className="text-gray-500 dark:text-gray-400 mb-6">Save items you love!</p><Link to="/products" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">Browse Products</Link></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {wishlistProducts.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden group">
              <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-gray-50 dark:bg-gray-800">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy"/>
                {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">-{product.discount}%</span>}
              </Link>
              <div className="p-2">
                <Link to={`/product/${product.slug}`} className="text-xs font-medium line-clamp-2 hover:text-indigo-600">{product.name}</Link>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">Rs. {product.price.toLocaleString()}</p>
                <div className="flex gap-1 mt-2">
                  <button onClick={() => addToCart(product,1)} className="flex-1 bg-indigo-600 text-white py-1.5 rounded-lg text-[11px] font-semibold hover:bg-indigo-700 flex items-center justify-center gap-1"><ShoppingCart size={12}/>Add</button>
                  <button onClick={() => toggleWishlist(product.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Heart size={16} fill="currentColor"/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
