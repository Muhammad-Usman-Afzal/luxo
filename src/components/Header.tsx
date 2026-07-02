// Header — Mobile: only logo+search+toggle | Desktop: full with icons | BazaarHub
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, LogOut, Package, ChevronDown, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useChat } from '../context/ChatContext';
import { products } from '../data/mockData';
import SafeImage from './SafeImage';

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { unreadCount } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (val.length > 1) {
      const q = val.toLowerCase();
      setSearchResults(products.filter(p => p.stock > 0 && (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))).slice(0, 6));
      setShowSearch(true);
    } else setShowSearch(false);
  };

  const goToProduct = (slug: string) => { setShowSearch(false); setSearchQuery(''); navigate(`/product/${slug}`); };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/50 border-b border-gray-100 dark:border-gray-800">
      {/* Top strip — desktop only */}
      <div className="bg-indigo-600 dark:bg-indigo-800 text-white text-[10px] sm:text-xs py-1.5 px-4 hidden md:flex justify-between items-center">
        <div className="flex gap-4">
          <a href="#" className="hover:underline">📱 Save More on App</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:underline">🇵🇰 Ship to Pakistan</a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Sell on LUXO</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:underline">Customer Care</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:underline">Track Order</a>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">LUXO</span>
          
        </Link>

        {/* Search bar */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <input
              type="text" placeholder="Search in LUXO..."
              value={searchQuery} onChange={e => handleSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && searchQuery) { setShowSearch(false); navigate(`/search?q=${encodeURIComponent(searchQuery)}`); } }}
              className="w-full bg-transparent px-3 sm:px-4 py-2 sm:py-2.5 text-sm outline-none dark:text-white dark:placeholder-gray-400"
            />
            <button onClick={() => { if (searchQuery) { setShowSearch(false); navigate(`/search?q=${encodeURIComponent(searchQuery)}`); } }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-5 flex items-center justify-center transition">
              <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
          {showSearch && searchResults.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-auto">
              {searchResults.map(p => (
                <button key={p.id} onClick={() => goToProduct(p.slug)} className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-left border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <SafeImage src={p.images[0]} alt={p.name} category={p.category} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate dark:text-white">{p.name}</p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs">Rs. {p.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side — Dark toggle (both) + Desktop-only icons */}
        <div className="flex items-center gap-0.5 sm:gap-1 ml-auto">
          {/* Dark/Light toggle — always visible */}
          <button onClick={toggle} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition" title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}>
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
          </button>

          {/* DESKTOP ONLY: Chat, Wishlist, Cart, User */}
          <div className="hidden md:flex items-center gap-0.5">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <span className="text-xl">{user?.avatar}</span>
                  <span className="hidden lg:inline text-sm dark:text-white">{user?.fullName.split(' ')[0]}</span>
                  <ChevronDown size={14} className="dark:text-gray-400" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 py-1">
                    <Link to={isAdmin ? '/admin/profile' : '/dashboard'} className="block px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white" onClick={() => setShowUserMenu(false)}>
                      {isAdmin ? '👤 My Profile' : '📋 Dashboard'}
                    </Link>

                    <button onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-red-500">
                      <LogOut size={14} className="inline mr-1" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm dark:text-white">
                <User size={18} /> <span className="hidden lg:inline">Login</span>
              </Link>
            )}

            <Link to="/chat" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <span className="text-lg">💬</span>
              {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>}
            </Link>

            {!isAdmin && (
              <>
                <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <Heart size={18} className="dark:text-gray-300" />
                  {wishlistCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
                </Link>
                <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <ShoppingCart size={18} className="dark:text-gray-300" />
                  {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount > 99 ? '99+' : cartCount}</span>}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
