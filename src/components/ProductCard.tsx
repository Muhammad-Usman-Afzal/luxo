// Premium ProductCard — Grid + List, full dark mode, safe images | BazaarHub
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Truck, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SafeImage from './SafeImage';

interface Props { product: Product; variant?: 'grid' | 'list'; }

export default function ProductCard({ product, variant = 'grid' }: Props) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const wishlisted = isWishlisted(product.id);
  const stop = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); };

  if (variant === 'list') {
    return (
      <Link to={`/product/${product.slug}`} className="flex gap-4 sm:gap-5 bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-800 group">
        <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 relative rounded-xl overflow-hidden">
          <SafeImage src={product.images[0]} alt={product.name} category={product.category} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">-{product.discount}%</span>}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mb-0.5">{product.brand}</p>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{product.name}</h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center gap-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded text-[11px] font-semibold">{product.rating} <Star size={10} className="fill-green-700 dark:fill-green-400 text-green-700 dark:text-green-400" /></div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>}
              {product.discount > 0 && <span className="text-[10px] text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">-{product.discount}%</span>}
            </div>
            {!isAdmin && (
              <button onClick={(e) => { stop(e); addToCart(product,1); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:shadow-lg active:scale-95 flex items-center gap-1.5"><ShoppingCart size={13} /> Add</button>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.slug}`} className="group bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl xl:rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100/30 dark:hover:shadow-indigo-900/20 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <SafeImage src={product.images[0]} alt={product.name} category={product.category} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-bold shadow-md">-{product.discount}%</span>}
        {product.freeShipping && <span className="absolute top-2 right-2 bg-green-500/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-semibold flex items-center gap-1 shadow-md"><Truck size={10} /> Free</span>}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1 shadow-lg"><Eye size={12} /> Quick View</span>
        </div>
        {!isAdmin && (
          <button onClick={(e) => { stop(e); toggleWishlist(product.id); }} className={`absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${wishlisted ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-gray-800/90 text-gray-400 dark:text-gray-300 hover:text-red-500'}`}>
            <Heart size={13} className="sm:w-[14px] sm:h-[14px]" fill={wishlisted ? 'white' : 'none'} />
          </button>
        )}
      </div>
      <div className="p-2 sm:p-2.5 xl:p-3 flex flex-col flex-1">
        <p className="text-[9px] sm:text-[10px] xl:text-[9px] text-indigo-500 dark:text-indigo-400 font-medium mb-0.5 uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-[11px] sm:text-[12px] xl:text-[11px] font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug flex-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex items-center gap-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1 py-0.5 rounded text-[9px] sm:text-[9px] font-semibold">{product.rating} <Star size={8} className="fill-green-700 dark:fill-green-400 text-green-700 dark:text-green-400" /></div>
          <span className="text-[9px] sm:text-[9px] text-gray-400 dark:text-gray-500">({product.reviewCount})</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
          <span className="text-sm sm:text-sm xl:text-sm font-bold text-indigo-600 dark:text-indigo-400">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && <span className="text-[9px] sm:text-[11px] text-gray-400 dark:text-gray-500 line-through">Rs. {product.originalPrice.toLocaleString()}</span>}
        </div>
        {product.sizes.length > 0 && <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 truncate">Sizes: {product.sizes.join(', ')}</p>}
        {!isAdmin && (
          <button onClick={(e) => { stop(e); addToCart(product,1); }} className="mt-1.5 sm:mt-2 xl:mt-1.5 w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white py-1.5 rounded-lg sm:rounded-lg text-[10px] sm:text-[10px] xl:text-[9px] font-bold transition-all hover:shadow-lg active:scale-[0.97] flex items-center justify-center gap-1"><ShoppingCart size={10} className="sm:w-[10px] sm:h-[10px]" /> Add to Cart</button>
        )}
      </div>
    </Link>
  );
}
