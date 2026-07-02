// User Dashboard — Side Navbar + Premium | LUXO
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Heart, ShoppingCart, User, Mail, LogOut, CheckCircle, Truck, XCircle, Clock, Phone, MapPin, ChevronRight, LayoutDashboard, ListOrdered, MessageCircle, Home, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { orders } from '../data/mockData';

const sc: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400', confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400', shipped: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400', delivered: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400', cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' };
const si: Record<string, typeof Package> = { pending: Clock, confirmed: CheckCircle, shipped: Truck, delivered: Package, cancelled: XCircle };

export default function UserDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'dashboard' | 'orders' | 'profile' | 'payment'>('profile');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center dark:text-white"><p className="text-5xl mb-4">🔒</p><h1 className="text-2xl font-bold mb-4">Please Login</h1><Link to="/login" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">Go to Login</Link></div>
  );

  const uo = orders.filter(o => o.userId === user!.id);
  const activeOrders = uo.filter(o => ['pending', 'confirmed', 'shipped'].includes(o.status)).length;

  // Sidebar nav items
  const sidebarItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'orders', icon: ListOrdered, label: `My Orders`, badge: uo.length },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'payment', icon: CreditCard, label: 'Payment' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-3 sm:py-5 dark:text-white">
      <div className="flex gap-0 sm:gap-4 lg:gap-6">
        {/* ═══ SIDEBAR ═══ */}
        <aside className="hidden md:flex flex-col w-64 lg:w-72 flex-shrink-0 gap-3">
          {/* User card */}
          <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-4 text-white shadow-xl shadow-indigo-300/25">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl mb-3 border border-white/10">{user?.avatar}</div>
            <h3 className="font-bold text-sm truncate">{user?.fullName}</h3>
            <p className="text-indigo-100 text-[10px] truncate mt-0.5">{user?.email}</p>
            <p className="text-indigo-200 text-[9px] mt-1 capitalize flex items-center gap-1">● {user?.role}</p>
          </div>

          {/* Nav links */}
          <nav className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-2">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition mb-0.5 last:mb-0 ${
                    tab === item.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {(item.badge ?? 0) > 0 && tab !== item.id && (
                    <span className="ml-auto bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick links */}
          <nav className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-2">
            {[
              { to: '/', icon: Home, label: 'Home' },
              { to: '/chat', icon: MessageCircle, label: 'Chat' },
              { to: '/wishlist', icon: Heart, label: `Wishlist`, badge: wishlistCount },
              { to: '/cart', icon: ShoppingCart, label: `Cart`, badge: cartCount },
              { to: '/checkout', icon: CreditCard, label: 'Payment' },
            ].map(item => { const Icon = item.icon; return (
              <Link key={item.to} to={item.to} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition mb-0.5 last:mb-0">
                <Icon size={18} />
                <span>{item.label}</span>
                {(item.badge ?? 0) > 0 && (
                  <span className="ml-auto bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
              </Link>
            );})}
          </nav>

          {/* Logout */}
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"><LogOut size={18} /> Sign Out</button>
        </aside>

        {/* ═══ MAIN CONTENT ═══ */}
        <main className="flex-1 min-w-0">

          {/* Mobile Sidebar Drawer */}
          {mobileSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-[80vw] max-w-[300px] bg-white dark:bg-gray-900 shadow-2xl p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg dark:text-white">Menu</h3>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><X size={18} /></button>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-4 text-white mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-2">{user?.avatar}</div>
                  <h3 className="font-bold text-sm">{user?.fullName}</h3>
                  <p className="text-indigo-100 text-[10px]">{user?.email}</p>
                </div>
                {sidebarItems.map(item => { const Icon = item.icon; return (
                  <button key={item.id} onClick={() => { setTab(item.id as any); setMobileSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition mb-1 ${tab === item.id ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}><Icon size={18} /> {item.label} {(item.badge ?? 0) > 0 && <span className="ml-auto text-[10px] font-bold">{item.badge}</span>}</button>
                );})}
                <div className="border-t border-gray-100 dark:border-gray-800 my-2" />
                {[{ to: '/', icon: Home, label: 'Home' }, { to: '/chat', icon: MessageCircle, label: 'Chat' }, { to: '/wishlist', icon: Heart, label: 'Wishlist', badge: wishlistCount }, { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },{ to: '/checkout', icon: CreditCard, label: 'Payment' }].map(item => { const Icon = item.icon; return (
                  <Link key={item.to} to={item.to} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition mb-1"><Icon size={18} /> {item.label} {(item.badge ?? 0) > 0 && <span className="ml-auto text-[10px] font-bold">{item.badge}</span>}</Link>
                );})}
                <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition mt-2"><LogOut size={18} /> Sign Out</button>
              </div>
            </div>
          )}
          {/* ── MOBILE: Sidebar Drawer Trigger ── */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-2.5 text-gray-600 dark:text-gray-400 shrink-0">
              <LayoutDashboard size={20} />
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-xl flex-1 hidden">
            <div className="flex">
              {[{ id: 'profile', label: 'Profile' }, { id: 'dashboard', label: 'Dash' }, { id: 'orders', label: 'Orders' }, { id: 'payment', label: 'Pay' }].map(t => (
                <button key={t.id} onClick={() => setTab(t.id as any)} className={`flex-1 py-2.5 rounded-xl text-[11px] font-semibold transition text-center ${tab === t.id ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400'}`}>{t.label}</button>
              ))}
            </div>
          </div>
          </div>

          {/* ── Profile Header (mobile) — only show on profile tab ── */}
          {tab === 'profile' && (
            <div className="md:hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-4 mb-3 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl border border-white/10">{user?.avatar}</div>
                <div className="flex-1 min-w-0"><h1 className="font-bold text-sm truncate">{user?.fullName}</h1><p className="text-indigo-100 text-[10px] truncate">{user?.email}</p></div>
              </div>
            </div>
          )}

          {/* ── Quick Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
            {[
              { l: 'Orders', v: uo.length, i: Package, c: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
              { l: 'Wishlist', v: wishlistCount, i: Heart, c: 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400' },
              { l: 'Cart', v: cartCount, i: ShoppingCart, c: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
              { l: 'Active', v: activeOrders, i: Truck, c: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
            ].map(s => { const I = s.i; return (
              <div key={s.l} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 sm:p-4 flex items-center gap-3 hover:shadow-md transition">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${s.c}`}><I size={20} /></div>
                <div><p className="text-xl sm:text-2xl font-bold">{s.v}</p><p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{s.l}</p></div>
              </div>
            );})}
          </div>

          {/* ── Dashboard Tab ── */}
          {tab === 'dashboard' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold mb-4">Dashboard Overview</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { l: 'Total Orders', v: uo.length, icon: Package, color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' },
                  { l: 'Active Orders', v: activeOrders, icon: Truck, color: 'bg-green-50 dark:bg-green-900/30 text-green-600' },
                  { l: 'Wishlist Items', v: wishlistCount, icon: Heart, color: 'bg-red-50 dark:bg-red-900/30 text-red-500' },
                  { l: 'Cart Items', v: cartCount, icon: ShoppingCart, color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' },
                ].map(s => { const I = s.icon; return (
                  <div key={s.l} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><I size={18} /></div>
                    <div><p className="text-xl font-bold">{s.v}</p><p className="text-[10px] text-gray-500 dark:text-gray-400">{s.l}</p></div>
                  </div>
                );})}
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Recent Orders</h3>
                <button onClick={() => setTab('orders')} className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline">View All →</button>
              </div>
              {uo.length === 0 ? (
                <div className="text-center py-6"><Package size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" /><p className="text-gray-500 dark:text-gray-400 text-xs">No orders yet</p><Link to="/products" className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline mt-1 inline-block">Start Shopping →</Link></div>
              ) : (
                <div className="space-y-1.5">{uo.slice(0, 3).map(o => { const SI = si[o.status] || Package; return (
                  <div key={o.id} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs">
                    <div className="flex items-center gap-2 min-w-0"><SI size={14} /><span className="font-medium truncate">{o.orderNumber}</span></div>
                    <div className="flex items-center gap-2 shrink-0"><span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${sc[o.status]}`}>{o.status}</span><span className="font-semibold text-indigo-600 dark:text-indigo-400">Rs. {o.total.toLocaleString()}</span></div>
                  </div>
                );})}</div>
              )}
            </div>
          )}

          {/* ── Orders Tab ── */}
          {tab === 'orders' && (
            <div>
              <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">My Orders</h2>
              {uo.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl"><Package size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" /><p className="text-gray-500 dark:text-gray-400">No orders yet</p><Link to="/products" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm mt-2 inline-block font-semibold">Browse Products →</Link></div>
              ) : (
                <div className="space-y-3 sm:space-y-4">{uo.map(o => (
                  <div key={o.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3"><div><span className="font-semibold text-sm">{o.orderNumber}</span><span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-3">{new Date(o.createdAt).toLocaleDateString()}</span></div><span className={`text-[9px] sm:text-[10px] px-2 py-1 rounded-full font-medium ${sc[o.status]}`}>{o.status.toUpperCase()}</span></div>
                    {o.items.map(i => (<div key={i.id} className="flex gap-3 py-2.5 border-t border-gray-100 dark:border-gray-800"><img src={i.productImage} alt={i.productName} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl bg-gray-50 dark:bg-gray-800" /><div className="flex-1 min-w-0"><p className="text-xs sm:text-sm font-medium truncate">{i.productName}</p>{i.size && <p className="text-[10px] text-gray-500 dark:text-gray-400">Size: {i.size}</p>}{i.color && <p className="text-[10px] text-gray-500 dark:text-gray-400">Color: {i.color}</p>}<p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Qty: {i.quantity} × Rs. {i.price.toLocaleString()}</p></div></div>))}
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-2 flex justify-between items-center"><span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Payment: {o.paymentMethod}</span><span className="font-bold text-sm sm:text-base text-indigo-600 dark:text-indigo-400">Rs. {o.total.toLocaleString()}</span></div>
                  </div>
                ))}</div>
              )}
            </div>
          )}

          {/* ── Profile Tab ── */}
          {tab === 'profile' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-5">My Profile</h2>
              <div className="flex items-center gap-4 mb-6"><div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/25">{user?.avatar}</div><div><h3 className="text-lg sm:text-xl font-bold">{user?.fullName}</h3><p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role} Account</p></div></div>
              <div className="space-y-3">
                {[{ icon: Mail, label: 'Email', value: user?.email }, { icon: Phone, label: 'Phone', value: user?.phone }, { icon: MapPin, label: 'City', value: user?.city || 'Not set' }, { icon: MapPin, label: 'Address', value: user?.address || 'Not set' }].map(item => { const Icon = item.icon; return (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"><div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shrink-0"><Icon size={14} className="text-gray-400" /></div><div className="min-w-0"><p className="text-[10px] sm:text-xs text-gray-400">{item.label}</p><p className="text-sm font-medium truncate">{item.value}</p></div></div>
                );})}
              </div>
              <button onClick={() => { logout(); navigate('/'); }} className="mt-5 w-full md:hidden flex items-center justify-center gap-2 py-3 border-2 border-red-200 dark:border-red-800 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition"><LogOut size={16} /> Sign Out</button>
            </div>
          )}

          {/* ── Payment Tab ── */}
          {tab === 'payment' && (
            <div className="space-y-4 sm:space-y-5 max-w-xl">
              <h2 className="text-base sm:text-lg font-bold">Payment Methods</h2>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'cod', name: 'Cash on Delivery', icon: '💰', color: 'from-green-500 to-emerald-600', desc: 'Pay when you receive your order' },
                  { id: 'card', name: 'Credit/Debit Card', icon: '💳', color: 'from-blue-500 to-cyan-600', desc: 'Visa • Mastercard • **** 4242' },
                  { id: 'jazzcash', name: 'JazzCash Wallet', icon: '📱', color: 'from-red-500 to-rose-600', desc: 'Mobile wallet • 0300-1234567' },
                  { id: 'easypaisa', name: 'Easypaisa Wallet', icon: '📲', color: 'from-purple-500 to-violet-600', desc: 'Mobile wallet • 0300-7654321' },
                ].map(pm => (
                  <div key={pm.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${pm.color} rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-md shrink-0`}>{pm.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{pm.name}</p>
                      <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">{pm.desc}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-indigo-500 flex items-center justify-center shrink-0">
                      {pm.id === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/checkout" className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold text-sm hover:from-indigo-700 hover:to-violet-700 transition shadow-lg shadow-indigo-500/25 active:scale-[0.98]">
                Go to Checkout <ChevronRight size={18} />
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
