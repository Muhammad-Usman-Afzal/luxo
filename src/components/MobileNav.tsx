// MobileNav — Bottom Navigation (mobile only) | BazaarHub
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, ShoppingCart, User, MessageCircle, Package, BarChart3, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useChat } from '../context/ChatContext';

export default function MobileNav() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { unreadCount } = useChat();
  const location = useLocation();

  const isActive = (p: string) => {
    const pn = location.pathname;
    if (p === '/') return pn === '/' || pn === '';
    return pn === p || pn.startsWith(p + '/') || pn.startsWith(p + '?');
  };

  const userItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/chat', label: 'Chat', icon: MessageCircle, badge: unreadCount },
    { path: '/wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: cartCount },
    { path: isAuthenticated ? '/dashboard' : '/login', label: 'Account', icon: User },
  ];

  const adminItems = [
    { path: '/', label: 'Home', icon: Home, badge: 0 },
    { path: '/chat', label: 'Chat', icon: MessageCircle, badge: unreadCount },
    { path: '/admin/dashboard', label: 'Dashboard', icon: BarChart3, badge: 0 },
    { path: '/admin/orders', label: 'Orders', icon: Package, badge: 0 },
    { path: '/admin/profile', label: 'Account', icon: User, badge: 0 },
  ];

  const navItems = isAdmin ? adminItems : userItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.label === 'Account' && isAdmin ? `/admin/profile?tab=profile&_=${Date.now()}` : item.path}
              onClick={() => {
                if (item.label === 'Account') {
                  sessionStorage.removeItem('luxo_admin_tab');
                  return;
                }
                window.scrollTo(0, 0);
              }}
              className={`flex flex-col items-center py-1.5 px-2 min-w-0 text-[10px] transition ${
                active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                {(item.badge ?? 0) > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-bold px-0.5">
                    {(item.badge ?? 0) > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
