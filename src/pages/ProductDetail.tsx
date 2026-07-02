import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, MessageCircle, Minus, Plus, X, LogIn, ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { reviews as allReviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { products } = useProducts();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isAuthenticated, isAdmin } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const product = products.find(p => p.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Product Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">This product may have been removed or doesn't exist.</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-indigo-500/25">
          Browse Products <ShoppingCart size={16} />
        </Link>
      </div>
    );
  }

  const productReviews = allReviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.stock > 0 && p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);
  const avgRating = productReviews.length > 0 ? productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length : product.rating;

  const requireAuth = (fn: () => void) => { if (!isAuthenticated) { setShowLoginPrompt(true); return; } fn(); };
  const handleAddToCart = () => requireAuth(() => { addToCart(product, quantity, selectedSize || undefined, selectedColor || undefined); });
  const handleBuyNow = () => requireAuth(() => { addToCart(product, quantity, selectedSize || undefined, selectedColor || undefined); navigate('/cart'); });
  const handleWishlist = () => requireAuth(() => toggleWishlist(product.id));
  const handleChatClick = () => requireAuth(() => { sessionStorage.setItem('bazaarhub_chat_product', JSON.stringify({ id: product.id, name: product.name, image: product.images[0], price: product.price })); navigate('/chat'); });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* 🔐 Premium Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginPrompt(false)} />
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-black/20 p-6 sm:p-8 max-w-sm w-full border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowLoginPrompt(false)} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition text-gray-400"><X size={18} /></button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                <MessageCircle size={28} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">Chat with Seller</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Login to ask about this product, get instant replies!</p>
            </div>
            <div className="space-y-3">
              <Link to="/login" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-indigo-500/25" onClick={() => { setShowLoginPrompt(false); window.scrollTo(0, 0); }}>
                <LogIn size={18} /> Sign In
              </Link>
              <Link to="/register" onClick={() => { setShowLoginPrompt(false); window.scrollTo(0, 0); }} className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Create Account
              </Link>
              <button onClick={() => setShowLoginPrompt(false)} className="w-full text-center text-sm text-gray-400 hover:text-gray-500 transition py-2">Maybe Later</button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full sm:max-w-[1400px] sm:mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8 overflow-x-hidden">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-gray-400 dark:text-gray-500 mb-3 sm:mb-6 flex-wrap px-1 sm:px-4 py-1 sm:py-2.5">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Home</Link>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
          <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Products</Link>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
          <Link to={`/category/${encodeURIComponent(product.category.toLowerCase().replace(/[\s']/g, '-').replace(/&/g, 'and'))}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{product.category}</Link>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
          <span className="text-gray-900 dark:text-white font-semibold truncate max-w-[120px] sm:max-w-[200px] lg:max-w-[300px]">{product.name}</span>
        </nav>

        {/* ── Main Product Section ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 w-full">
          {/* ── LEFT: Image Gallery (2nd on mobile/tablet, 1st on desktop) ── */}
          <div className="space-y-2 sm:space-y-4">
            <div className="relative bg-white dark:bg-gray-900 rounded-none sm:rounded-3xl overflow-hidden sm:border sm:border-gray-100 dark:border-gray-800 shadow-none sm:shadow-lg sm:shadow-gray-200/50 dark:shadow-black/20" style={{ aspectRatio: '4/3' }}>
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              {product.discount > 0 && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-red-500/30">
                    <Sparkles size={12} /> -{product.discount}% OFF
                  </span>
                </div>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg shadow-amber-500/30 animate-pulse">
                    Only {product.stock} left
                  </span>
                </div>
              )}
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setSelectedImage(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-gray-900 hover:scale-110 border border-white/20">
                    <ChevronLeft size={16} className="text-gray-700 dark:text-gray-300" />
                  </button>
                  <button onClick={() => setSelectedImage(i => (i + 1) % product.images.length)}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-gray-900 hover:scale-110 border border-white/20">
                    <ChevronRight size={16} className="text-gray-700 dark:text-gray-300" />
                  </button>
                </>
              )}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold sm:hidden">
                  {selectedImage + 1}/{product.images.length}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto scroll-smooth">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      i === selectedImage
                        ? 'border-indigo-600 dark:border-indigo-400 ring-1 sm:ring-2 ring-indigo-600/20 dark:ring-indigo-400/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 opacity-60 hover:opacity-100'
                    }`}>
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info (1st on mobile/tablet, 2nd on desktop) ── */}
          <div className="flex flex-col gap-3 sm:gap-5">
            {/* Badge + Brand */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-semibold border border-indigo-100 dark:border-indigo-800">
                <Sparkles size={11} /> {product.category}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">by <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{product.brand}</span></span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm' : 'text-gray-200 dark:text-gray-700'} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">({product.reviewCount} reviews)</span>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-semibold">
                  <Check size={11} /> In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded-full font-semibold">
                  <X size={11} /> Out of Stock
                </span>
              )}
            </div>

            {/* Pricing */}
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3 sm:pb-0 sm:border-0">
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm sm:text-lg lg:text-xl text-gray-400 dark:text-gray-500 line-through font-medium">Rs. {product.originalPrice.toLocaleString()}</span>
                    <span className="inline-flex items-center gap-1 bg-red-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              {product.freeShipping && (
                <div className="mt-2 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                  <Truck size={13} />
                  <span>Free Shipping</span>
                  <span className="text-gray-300 dark:text-gray-600 mx-1">·</span>
                  <ShieldCheck size={13} />
                  <span>7 Days Return</span>
                  <span className="text-gray-300 dark:text-gray-600 mx-1">·</span>
                  <RotateCcw size={13} />
                  <span>COD</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-b border-gray-100 dark:border-gray-800 pb-3 sm:pb-0 sm:border-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="border-b border-gray-100 dark:border-gray-800 pb-3 sm:pb-0 sm:border-0">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Size {selectedSize && <span className="text-gray-900 dark:text-white font-semibold ml-1">{selectedSize}</span>}</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="border-b border-gray-100 dark:border-gray-800 pb-3 sm:pb-0 sm:border-0">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Color {selectedColor && <span className="text-gray-900 dark:text-white font-semibold ml-1">{selectedColor}</span>}</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {product.colors.map(color => (
                    <button key={color} onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                        selectedColor === color
                          ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3 sm:pb-0 sm:border-0 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Quantity</span>
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-semibold text-sm text-gray-900 dark:text-white min-w-[32px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">{product.stock} left</span>
              </div>

              {!isAdmin && (
                <div className="grid grid-cols-4 gap-1.5">
                  <button onClick={handleAddToCart} className="flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold active:scale-[0.98] text-[10px] sm:text-sm shadow">
                    <ShoppingCart size={13} /> Add
                  </button>
                  <button onClick={handleBuyNow} className="flex items-center justify-center gap-1 bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-2.5 rounded-xl font-semibold active:scale-[0.98] text-[10px] sm:text-sm">
                    Buy
                  </button>
                  <button onClick={handleWishlist}
                    className={`flex items-center justify-center gap-1 py-2.5 rounded-xl transition-all active:scale-95 text-[10px] sm:text-sm font-semibold ${
                      wishlisted
                        ? 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                    }`}>
                    <Heart size={12} fill={wishlisted ? 'currentColor' : 'none'} />
                    {wishlisted ? 'Saved' : 'Save'}
                  </button>
                  <button onClick={handleChatClick} className="flex items-center justify-center gap-1 py-2.5 rounded-xl transition-all active:scale-95 text-[10px] sm:text-sm font-semibold bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    <MessageCircle size={12} />
                    Chat
                  </button>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-between sm:grid sm:grid-cols-3 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:flex-col sm:gap-1 sm:bg-white sm:dark:bg-gray-900 sm:border sm:border-gray-100 sm:dark:border-gray-800 sm:rounded-xl sm:p-3">
                <Truck size={14} className="sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5 sm:flex-col sm:gap-1 sm:bg-white sm:dark:bg-gray-900 sm:border sm:border-gray-100 sm:dark:border-gray-800 sm:rounded-xl sm:p-3">
                <ShieldCheck size={14} className="sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5 sm:flex-col sm:gap-1 sm:bg-white sm:dark:bg-gray-900 sm:border sm:border-gray-100 sm:dark:border-gray-800 sm:rounded-xl sm:p-3">
                <RotateCcw size={14} className="sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        {productReviews.length > 0 && (
          <div className="mt-6 sm:mt-10 lg:mt-12 px-3 sm:px-0">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                Reviews <span className="text-sm text-gray-400 font-medium ml-1">({productReviews.length})</span>
              </h2>
              <div className="flex items-center gap-1">
                <span className="text-base font-bold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</span>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={9} className={s <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-gray-700'} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
              {productReviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-3 sm:border sm:border-gray-100 sm:dark:border-gray-800 sm:rounded-xl sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm flex-shrink-0">
                      {review.userAvatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs text-gray-900 dark:text-white truncate">{review.userName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={9} className={s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-gray-700'} />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-6 sm:mt-10 lg:mt-12 px-3 sm:px-0">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-600 sm:w-6 sm:h-6" />
                Related Products
              </h2>
              <Link to="/products" className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
