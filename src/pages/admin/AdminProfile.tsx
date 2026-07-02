// Admin Profile — Premium Responsive with Sidebar | LUXO
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Phone, MapPin, User, Calendar, LogOut, Package, Users, ShoppingBag, Star,
  Shield, CreditCard, BarChart3, ListOrdered, X, LayoutDashboard,
  Search, Plus, Edit3, Trash2, Save, Layers, XCircle, CheckCircle, AlertTriangle, Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { products, orders, categories } from '../../data/mockData';
import AdminDashboard from './AdminDashboard';
import AdminOrdersPage from './AdminOrders';
import AdminUsersPage from './AdminUsers';
import type { Product } from '../../types';

export default function AdminProfile() {
  const { user, isAdmin, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'profile' | 'payment' | 'analytics' | 'dashboard' | 'orders' | 'products' | 'users'>(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('luxo_admin_tab') : null;
    const valid = ['profile', 'payment', 'analytics', 'dashboard', 'orders', 'products', 'users'];
    return (valid.includes(saved as string) ? saved : 'profile') as 'profile';
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  useEffect(() => { try { sessionStorage.setItem('luxo_admin_tab', tab); } catch {} }, [tab]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    fetch('/api/admin/users', { credentials: 'include' })
      .then(r => r.json())
      .then(u => setTotalUsers(u.filter((x: any) => x.role === 'user').length))
      .catch(() => {});
  }, []);

  if (!isAdmin) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center dark:text-white">
      <p className="text-5xl mb-4">🚫</p><h1 className="text-2xl font-bold">Access Denied</h1>
      <Link to="/" className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline">Go Home</Link>
    </div>
  );

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  const statCards = [
    { icon: Package, label: 'Products', value: products.length, color: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/25' },
    { icon: ShoppingBag, label: 'Orders', value: orders.length, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25' },
    { icon: Users, label: 'Users', value: totalUsers, color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/25' },
    { icon: Star, label: 'Revenue', value: `Rs.${(totalRevenue / 1000).toFixed(0)}K`, color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/25' },
  ];

  const profileFields = [
    { icon: Mail, label: 'Email', value: user?.email, gradient: 'from-indigo-500 to-blue-600' },
    { icon: Phone, label: 'Phone', value: user?.phone, gradient: 'from-emerald-500 to-teal-600' },
    { icon: MapPin, label: 'City', value: user?.city || 'Not set', gradient: 'from-violet-500 to-purple-600' },
    { icon: MapPin, label: 'Address', value: user?.address || 'Not set', gradient: 'from-rose-500 to-pink-600' },
    { icon: Calendar, label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A', gradient: 'from-amber-500 to-orange-600' },
    { icon: Shield, label: 'Role', value: user?.role?.toUpperCase() || 'N/A', gradient: 'from-indigo-600 to-violet-600' },
  ];

  // Sidebar nav items — internal tabs + external links
  const sidebarNav = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', type: 'tab' as const },
    { id: 'orders', icon: ListOrdered, label: 'Orders', type: 'tab' as const },
    { id: 'products', icon: Package, label: 'Products', type: 'tab' as const },
    { id: 'users', icon: Users, label: 'Users', type: 'tab' as const },
    { id: 'profile', icon: User, label: 'Profile', type: 'tab' as const },
    { id: 'payment', icon: CreditCard, label: 'Payment', type: 'tab' as const },
    { id: 'analytics', icon: BarChart3, label: 'Report Analysis', type: 'tab' as const },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0a0b12] dark:text-white relative overflow-x-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] pointer-events-none" />
      <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/5 via-fuchsia-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      {/* ═══ LAYOUT: SIDEBAR + CONTENT ═══ */}
      <div className="flex">

        {/* ═══ SIDEBAR ═══ */}
        <aside className="hidden md:flex flex-col w-64 xl:w-72 2xl:w-80 flex-shrink-0 min-h-screen gap-4 border-r border-gray-200/60 dark:border-gray-800/60 pr-4 xl:pr-5 2xl:pr-7 bg-gradient-to-b from-white/90 via-white/95 to-white/80 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-900/80 backdrop-blur-xl rounded-r-3xl shadow-[4px_0_25px_-10px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_25px_-10px_rgba(0,0,0,0.4)] px-3 xl:px-4 2xl:px-5 py-5 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] to-transparent rounded-r-3xl pointer-events-none" />

          {/* Sidebar header — brand mark */}
          <div className="flex items-center gap-3 px-1 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <LayoutDashboard size={16} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight">LUXO</span>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] block -mt-0.5">Admin</span>
            </div>
          </div>



          {/* User card — premium gradient */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 rounded-2xl p-4 xl:p-5 text-white shadow-xl shadow-indigo-500/25 dark:shadow-indigo-900/30 border border-indigo-400/20 mx-1 group hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4 group-hover:translate-x-1/3 group-hover:-translate-y-1/3 transition-transform duration-700" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-12 xl:w-14 h-12 xl:h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl xl:text-3xl mb-2 xl:mb-3 border border-white/10 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                {user?.avatar}
              </div>
              <h3 className="font-bold text-sm xl:text-base truncate group-hover:tracking-wide transition-all duration-300">{user?.fullName}</h3>
              <p className="text-indigo-200 text-[10px] truncate mt-0.5 font-medium">{user?.email}</p>
              <div className="mt-2 xl:mt-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                <span className="text-[9px] text-indigo-200 font-semibold uppercase tracking-[0.1em]">Online</span>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-1.5 xl:p-2 shadow-lg shadow-indigo-500/5 flex-1 mx-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] to-transparent pointer-events-none" />
            {sidebarNav.map(item => {
              if (item.type === 'tab') {
                const Icon = item.icon!;
                const isActive = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setTab(item.id as typeof tab); setMobileSidebarOpen(false); window.scrollTo(0, 0); }}
                    className={`relative w-full flex items-center gap-2.5 xl:gap-3.5 px-2.5 xl:px-3 py-2.5 xl:py-3 rounded-xl text-xs xl:text-sm font-medium transition-all duration-300 mb-1 last:mb-0 group overflow-hidden ${
                      isActive
                        ? 'text-white shadow-lg shadow-indigo-500/25'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 animate-gradient-x rounded-xl" />}
                    {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/0 to-indigo-50/0 dark:from-white/0 dark:via-white/0 dark:to-white/0 group-hover:from-indigo-50/80 dark:group-hover:from-white/[0.04] group-hover:via-indigo-50/40 dark:group-hover:via-white/[0.02] group-hover:to-transparent rounded-xl transition-all duration-500" />}
                    <div className={`relative z-10 w-8 xl:w-9 h-8 xl:h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-white/20 shadow-inner shadow-white/10 scale-110'
                        : 'bg-gradient-to-br from-indigo-500 to-violet-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/25'
                    }`}>
                      <Icon size={15} className={`text-white xl:hidden ${isActive ? 'scale-110' : ''}`} />
                      <Icon size={17} className={`text-white hidden xl:block ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    </div>
                    <span className={`relative z-10 flex-1 font-semibold tracking-wide ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                    {isActive && <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />}
                  </button>
                );
              }
              return null;
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="group relative w-full flex items-center gap-2.5 xl:gap-3.5 px-2.5 xl:px-3 py-2.5 xl:py-3 rounded-xl text-xs xl:text-sm font-semibold text-red-500 hover:text-white transition-all duration-300 border border-transparent hover:border-red-200/50 dark:hover:border-red-900/50 mx-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-50 dark:bg-red-900/20 rounded-xl group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-rose-600 group-hover:opacity-100 transition-all duration-300" />
            <div className="relative z-10 w-8 xl:w-9 h-8 xl:h-9 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-sm">
              <LogOut size={15} className="xl:hidden text-red-500 group-hover:text-white transition-colors duration-300" />
              <LogOut size={17} className="hidden xl:block text-red-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Sign Out</span>
            <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
          </button>
        </aside>

        {/* ═══ MAIN CONTENT ═══ */}
        <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-8 overflow-x-hidden">
          {/* ── Mobile Header + Sidebar Trigger ── */}
          <div className="md:hidden mb-2">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 rounded-2xl p-3 text-white shadow-xl shadow-indigo-500/20 border border-indigo-400/10 mb-2 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="relative flex items-center gap-2.5">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl border border-white/10 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {user?.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{user?.fullName}</h3>
                  <p className="text-indigo-200 text-[10px] truncate font-medium">{user?.email}</p>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-white/25 active:scale-95 transition-all duration-200"
                  title="Open navigation"
                >
                  <LayoutDashboard size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-white capitalize border-l-[3px] border-indigo-600 pl-2.5 animate-fade-in-up">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-sm">
                <User size={12} className="text-white" />
              </div>
              {tab === 'dashboard' ? 'Dashboard' : tab === 'orders' ? 'Orders' : tab === 'products' ? 'Products' : tab === 'users' ? 'Users' : tab === 'profile' ? 'Profile' : tab === 'payment' ? 'Payment' : 'Report Analysis'}
            </div>
          </div>

          {/* ── Mobile Sidebar Drawer ── */}
          {mobileSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-[80vw] max-w-[280px] bg-white dark:bg-gray-900 shadow-2xl p-4 overflow-y-auto animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-600 rounded-full" />
                    <h3 className="font-bold text-base dark:text-white">Navigation</h3>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"><X size={16} /></button>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 rounded-2xl p-3 text-white mb-3 shadow-xl shadow-indigo-500/20">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl mb-2 border border-white/10">{user?.avatar}</div>
                    <h3 className="font-bold text-sm">{user?.fullName}</h3>
                    <p className="text-indigo-200 text-[10px]">{user?.email}</p>
                  </div>
                </div>

                <nav className="space-y-0.5">
                  {sidebarNav.map(item => {
                    if (item.type === 'tab') {
                      const Icon = item.icon!;
                      const isActive = tab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => { setTab(item.id as typeof tab); setMobileSidebarOpen(false); window.scrollTo(0, 0); }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                            isActive ? 'bg-white/20' : 'bg-gradient-to-br from-indigo-500 to-violet-600'
                          }`}>
                            <Icon size={14} className="text-white" />
                          </div>
                          <span className="flex-1 font-semibold">{item.label}</span>
                          {isActive && <div className="w-1 h-1 rounded-full bg-white animate-pulse" />}
                        </button>
                      );
                    }
                    return null;
                  })}
                </nav>

                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="group relative w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all overflow-hidden"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <LogOut size={14} className="text-red-500" />
                    </div>
                    <span className="font-semibold">Sign Out</span>
                  </button>
                </div>

                <p className="text-[9px] text-gray-400 dark:text-gray-600 text-center mt-4 font-medium tracking-wider uppercase">LUXO Admin v2.0</p>
              </div>
            </div>
          )}

          {/* ── Stats Row (premium glass cards) ── */}
          {(tab === 'profile' || tab === 'payment' || tab === 'analytics') && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 mb-5 sm:mb-6 lg:mb-7 stagger-enter">
              {statCards.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="group relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl p-3 sm:p-4 lg:p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="relative flex items-center justify-between mb-2">
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg ${s.shadow} sm:group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={18} className="text-white lg:w-5 lg:h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/60 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
                        {(s.label === 'Revenue' ? '💰' : s.label === 'Products' ? '📦' : s.label === 'Orders' ? '📋' : '👥')}
                      </span>
                    </div>
                    <p className="text-xl lg:text-2xl 2xl:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{s.value}</p>
                    <p className="text-[10px] lg:text-[11px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-[0.15em] mt-1">{s.label}</p>
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-80`} />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── EMBEDDED PAGES (dashboard/orders) ── */}
          {tab === 'dashboard' && <AdminDashboard />}
          {tab === 'orders' && <AdminOrdersPage />}

          {/* ── PRODUCTS COMPACT ── */}
          {tab === 'products' && <CompactProducts />}

          {/* ── USERS TAB ── */}
          {tab === 'users' && <AdminUsersPage />}

          {/* ── PROFILE TAB ── */}
          {tab === 'profile' && (
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/30 rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] overflow-hidden animate-scale-in">
              <div className="hidden sm:block absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="hidden sm:block absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-purple-500/5 via-fuchsia-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative flex items-center justify-between mb-3 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/10">
                    <User size={14} className="sm:w-[18px] sm:h-[18px] text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">Account Details</h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium">Manage your personal information</p>
                  </div>
                </div>
              </div>

              {/* Premium Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-5 stagger-enter">
                {profileFields.map((item, idx) => {
                  const Icon = item.icon;
                  const isEditable = ['Phone', 'City', 'Address'].includes(item.label);
                  const isEditing = editingField === item.label;
                  return (
                    <div
                      key={item.label}
                      className="group relative rounded-xl sm:rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      {/* Gradient border layer */}
                      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Card body */}
                      <div className="relative h-full bg-gradient-to-br from-gray-50/95 to-white/80 dark:from-gray-800/80 dark:to-gray-900/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 lg:p-5 border border-gray-100/90 dark:border-gray-700/50 group-hover:border-transparent transition-all duration-500 overflow-hidden">
                        {/* Premium shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        {/* Subtle gradient glow on hover */}
                        <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.06] blur-2xl rounded-full transition-opacity duration-500 pointer-events-none`} />

                        {/* Content */}
                        <div className="relative flex items-start gap-2 sm:gap-4">
                          {/* Premium icon container */}
                          <div className={`relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-lg shadow-gray-900/5 sm:group-hover:scale-110 sm:group-hover:-rotate-3 transition-all duration-300`}>
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-white/20 inset-ring-1 inset-ring-white/10 pointer-events-none" />
                            <Icon size={13} className="sm:w-[15px] sm:h-[15px] lg:w-[18px] lg:h-[18px] text-white relative z-10" />
                          </div>

                          {/* Text content */}
                          <div className="min-w-0 flex-1">
                            {/* Label */}
                            <div className="flex items-center gap-2">
                              <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-[0.15em]">{item.label}</p>
                              <div className={`hidden sm:block flex-1 h-px bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                            </div>

                            {isEditing ? (
                              <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                                <input
                                  value={editValue}
                                  onChange={e => setEditValue(e.target.value)}
                                  className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-indigo-300 dark:border-indigo-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition shadow-sm"
                                  autoFocus
                                  onKeyDown={e => { if (e.key === 'Enter') { setEditingField(null); } }}
                                />
                                <button
                                  onClick={async () => {
                                    const fieldMap: Record<string, string> = { 'Phone': 'phone', 'City': 'city', 'Address': 'address' };
                                    updateProfile({ [fieldMap[item.label]]: editValue });
                                    try { await fetch('/api/account/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user?.id, [fieldMap[item.label]]: editValue }) }); } catch {}
                                    setEditingField(null);
                                  }}
                                  className="p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-teal-700 transition shadow-md hover:shadow-emerald-500/25 text-xs font-bold active:scale-95"
                                  title="Save"
                                >
                                  <Save size={12} className="sm:w-[14px] sm:h-[14px]" />
                                </button>
                                <button
                                  onClick={() => setEditingField(null)}
                                  className="p-1.5 sm:p-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow-sm text-xs active:scale-95"
                                  title="Cancel"
                                >
                                  <X size={12} className="sm:w-[14px] sm:h-[14px]" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <p className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item.value}</p>
                                {isEditable && (
                                  <button
                                    onClick={() => { setEditingField(item.label); setEditValue(String(item.value === 'Not set' ? '' : item.value)); }}
                                    className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shrink-0 shadow-sm hover:shadow-md hover:scale-110 active:scale-95"
                                    title="Edit"
                                  >
                                    <Edit3 size={10} className="sm:w-[12px] sm:h-[12px]" />
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Premium subtle meta indicator */}
                            {!isEditing && item.label === 'Role' && (
                              <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md text-[8px] sm:text-[9px] font-bold uppercase tracking-wider border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm">Verified</span>
                              </div>
                            )}
                            {!isEditing && item.label === 'Email' && (
                              <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md text-[8px] sm:text-[9px] font-bold uppercase tracking-wider border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm">
                                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                  Confirmed
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Status dot */}
                          <div className={`hidden sm:block w-2 h-2 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2 shadow-sm group-hover:scale-110`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── PAYMENT TAB ── */}
          {tab === 'payment' && (
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/30 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] overflow-hidden animate-scale-in">
              <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CreditCard size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Payment Settings</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Manage your payment methods</p>
                  </div>
                </div>
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full font-semibold border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm">Finance</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 stagger-enter">
                {[
                  { title: 'Cash on Delivery', desc: 'Primary payment method', gradient: 'from-emerald-500 to-teal-600', active: true },
                  { title: 'Bank Transfer', desc: 'HBL — **** 1234', gradient: 'from-blue-500 to-cyan-600', active: true },
                  { title: 'JazzCash Wallet', desc: '+92-300-1111111', gradient: 'from-violet-500 to-purple-600', active: true },
                  { title: 'Easypaisa Wallet', desc: '+92-300-1111111', gradient: 'from-rose-500 to-pink-600', active: false },
                ].map((pm, i) => (
                  <div key={i} className="group relative bg-gradient-to-br from-gray-50/90 to-white/60 dark:from-gray-800/60 dark:to-gray-900/40 rounded-2xl p-3 sm:p-4 lg:p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-gray-100/80 dark:border-gray-700/40 overflow-hidden">
                    <div className={`absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b ${pm.gradient} rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-y-110 origin-center`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${pm.gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-500 rounded-2xl`} />
                    <div className="relative flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${pm.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                        <CreditCard size={16} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{pm.title}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{pm.desc}</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
                      <span className="font-medium">Status</span>
                      <span className={`font-semibold flex items-center gap-1.5 ${pm.active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${pm.active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                        {pm.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── REPORT ANALYSIS TAB ── */}
          {tab === 'analytics' && (
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/30 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] overflow-hidden animate-scale-in">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/5 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <BarChart3 size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Report & Analysis</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Business performance metrics</p>
                  </div>
                </div>
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full font-semibold border border-amber-200/50 dark:border-amber-800/50 shadow-sm">Analytics</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 stagger-enter">
                {[
                  { label: 'Total Revenue', value: `Rs.${(totalRevenue / 100000).toFixed(1)}L`, change: '+12.5%', up: true, gradient: 'from-amber-500 to-orange-600' },
                  { label: 'Orders This Month', value: orders.filter(o => o.status === 'delivered').length.toString(), change: '+8.2%', up: true, gradient: 'from-emerald-500 to-teal-600' },
                  { label: 'Avg. Order Value', value: `Rs.${orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : '0'}`, change: '-2.1%', up: false, gradient: 'from-blue-500 to-cyan-600' },
                  { label: 'Conversion Rate', value: '3.8%', change: '+1.2%', up: true, gradient: 'from-violet-500 to-purple-600' },
                ].map((metric, i) => (
                  <div key={i} className="group relative bg-gradient-to-br from-gray-50/90 to-white/60 dark:from-gray-800/60 dark:to-gray-900/40 rounded-2xl p-3 sm:p-4 lg:p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-gray-100/80 dark:border-gray-700/40 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-500 rounded-2xl`} />
                    <div className={`absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b ${metric.gradient} rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-y-110 origin-center`} />
                    <div className="relative">
                      <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em] font-semibold">{metric.label}</p>
                      <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{metric.value}</p>
                      <p className={`text-[10px] sm:text-xs mt-1.5 flex items-center gap-0.5 font-semibold ${metric.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                        <span className={`text-sm leading-none ${metric.up ? '' : 'rotate-180'}`}>↑</span>
                        {metric.change} from last month
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-50/90 to-white/60 dark:from-gray-800/60 dark:to-gray-900/40 rounded-2xl p-4 sm:p-5 border border-gray-100/80 dark:border-gray-700/40 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-[0.1em]">Recent Activity</h4>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 font-medium">Last 30 days</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { action: 'New order placed', detail: '#ORD-2025-0042', time: '2 hours ago', color: 'from-emerald-500 to-teal-600' },
                    { action: 'Product added', detail: 'Samsung Galaxy S25', time: '5 hours ago', color: 'from-blue-500 to-cyan-600' },
                    { action: 'User registered', detail: 'ahmed@email.com', time: '1 day ago', color: 'from-violet-500 to-purple-600' },
                    { action: 'Order delivered', detail: '#ORD-2025-0038', time: '2 days ago', color: 'from-amber-500 to-orange-600' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100/60 dark:hover:bg-gray-800/40 transition-all group cursor-default">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${activity.color} shadow-sm group-hover:scale-125 transition-transform`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{activity.detail}</p>
                      </div>
                      <span className="text-[9px] text-gray-400 dark:text-gray-500 font-medium shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ─── Premium Compact Products Panel ─── */
function CompactProducts() {
  const { products: localProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState('');
  const [cf, setCf] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Product>({
    id: 0, name: '', slug: '', description: '', price: 0, originalPrice: 0, discount: 0,
    images: [''], categoryId: 1, category: '', brand: '',
    stock: 10, sizes: [], colors: [], deliveryDays: 3, freeShipping: true, featured: true,
    createdAt: new Date().toISOString().split('T')[0], specifications: {},
  });
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');

  useEffect(() => { setVisibleCount(10); }, [search, cf]);
  const cats = [...new Set(localProducts.map(p => p.category))];
  const fl = localProducts.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (cf && p.category !== cf) return false;
    return true;
  });

  const totalStock = localProducts.reduce((s, p) => s + p.stock, 0);
  const outOfStock = localProducts.filter(p => p.stock === 0).length;
  const openAdd = () => {
    setForm({ id: Date.now(), name: '', slug: '', description: '', price: 0, originalPrice: 0, discount: 0, images: [''], categoryId: 1, category: '', brand: '', stock: 10, sizes: [], colors: [], deliveryDays: 3, freeShipping: true, featured: true, createdAt: new Date().toISOString().split('T')[0], specifications: {} });
    setEditingId(null); setSizeInput(''); setColorInput(''); setImageInput(''); setSpecKey(''); setSpecVal('');
    setShowModal(true);
  };
  const openEdit = (p: Product) => { setForm({ ...p }); setEditingId(p.id); setSizeInput(''); setColorInput(''); setImageInput(''); setSpecKey(''); setSpecVal(''); setShowModal(true); };
  const handleSave = async () => {
    if (!form.name.trim() || !form.brand.trim()) return;
    const finalForm = { ...form, slug: form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') };
    if (editingId) await updateProduct(finalForm);
    else await addProduct(finalForm);
    setShowModal(false);
  };
  const handleDelete = (id: number) => { if (confirm('Delete this product?')) deleteProduct(id); };
  const addSize = () => { if (sizeInput.trim() && !form.sizes.includes(sizeInput.trim())) setForm(f => ({ ...f, sizes: [...f.sizes, sizeInput.trim()] })); setSizeInput(''); };
  const addColor = () => { if (colorInput.trim() && !form.colors.includes(colorInput.trim())) setForm(f => ({ ...f, colors: [...f.colors, colorInput.trim()] })); setColorInput(''); };
  const addImage = () => { if (imageInput.trim() && !form.images.includes(imageInput.trim())) setForm(f => ({ ...f, images: [...f.images, imageInput.trim()] })); setImageInput(''); };
  const addSpec = () => { if (specKey.trim() && specVal.trim()) { setForm(f => ({ ...f, specifications: { ...f.specifications, [specKey.trim()]: specVal.trim() } })); setSpecKey(''); setSpecVal(''); } };

  const inpCls = "w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition";
  const lblCls = "block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1";

  const miniStats = [
    { icon: Package, label: 'Total', value: localProducts.length, color: 'from-indigo-500 to-violet-600' },
    { icon: ShoppingBag, label: 'Stock', value: totalStock, color: 'from-emerald-500 to-teal-600' },
    { icon: AlertTriangle, label: 'Out', value: outOfStock, color: 'from-rose-500 to-red-600' },

  ];

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
      {/* Premium top accent bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 flex-shrink-0" />

      {/* ── Premium Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-900/50 px-3 sm:px-5 py-2 sm:py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Product Catalog</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{fl.length} of {localProducts.length} products</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mini stat chips ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        {miniStats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-gray-800 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2.5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-sm shrink-0`}>
                <Icon size={12} className="sm:text-[16px] text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-gray-400" />
        </div>
        <div className="relative">
          <Layers size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select value={cf} onChange={e => setCf(e.target.value)} className="pl-9 pr-7 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none cursor-pointer">
            <option value="">All</option>
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {(search || cf) && (
          <button onClick={() => { setSearch(''); setCf(''); }} className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"><XCircle size={15} /></button>
        )}
        <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-95">
          <Plus size={15} /> Add
        </button>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 border-b border-gray-200 dark:border-gray-700">
              {['Product', 'Price', 'Stock', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 font-extrabold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-[0.12em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fl.slice(0, visibleCount).map((p, i) => (
              <tr key={p.id} className={`border-b border-gray-50 dark:border-gray-800/50 last:border-0 transition-all duration-200 group hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-violet-50/30 dark:hover:from-indigo-900/10 dark:hover:to-violet-900/5 ${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/40 dark:bg-gray-800/20'}`}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-200 dark:border-gray-700 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                      <img src={p.images[0] || ''} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[200px] group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">{p.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{p.category}</span>
                        <span className="text-[10px] text-gray-300 dark:text-gray-600">·</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{p.brand}</span>
                        {p.featured && <span className="text-[10px] text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-full font-bold">★</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">Rs.{p.price.toLocaleString()}</span>
                    {p.originalPrice > p.price && <span className="text-xs text-gray-400 line-through ml-1">Rs.{p.originalPrice.toLocaleString()}</span>}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-xs shadow-sm ${
                    p.stock > 20 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                    p.stock > 5 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800' :
                    'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                  }`}>
                    {p.stock > 0 ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {p.stock}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400 drop-shadow-sm" />

                    <span className="text-xs text-gray-400 dark:text-gray-500">({p.reviewCount})</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                    <button onClick={() => openEdit(p)} className="p-1.5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 rounded-lg transition-all hover:shadow-md hover:scale-110" title="Edit"><Edit3 size={13} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 text-red-500 dark:text-red-400 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/50 dark:hover:to-rose-900/50 rounded-lg transition-all hover:shadow-md hover:scale-110" title="Delete"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="md:hidden space-y-1">
        {fl.slice(0, visibleCount).map(p => (
          <div key={p.id} className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${p.stock > 20 ? 'from-emerald-500 to-teal-600' : p.stock > 5 ? 'from-amber-500 to-orange-600' : 'from-red-500 to-rose-600'} rounded-r-sm`} />
            <div className="flex gap-2 pl-2">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-100 dark:border-gray-700">
                <img src={p.images[0] || ''} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{p.category} · {p.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">Rs.{p.price.toLocaleString()}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    p.stock > 20 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                    p.stock > 5 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                    'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>{p.stock} left</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0 self-center">
                <button onClick={() => openEdit(p)} className="p-1.5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all hover:shadow-md hover:scale-110"><Edit3 size={12} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 text-red-500 dark:text-red-400 hover:from-red-100 hover:to-rose-100 rounded-lg transition-all hover:shadow-md hover:scale-110"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fl.length > 10 && (
        <div className="px-3 sm:px-5 py-2 sm:py-4 text-center border-t border-gray-100 dark:border-gray-800">
          {visibleCount < fl.length ? (
            <button onClick={() => setVisibleCount(prev => prev + 10)} className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-[11px] sm:text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all active:scale-95">
              Show More ({fl.length - visibleCount} remaining)
            </button>
          ) : (
            <button onClick={() => setVisibleCount(10)} className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-[11px] sm:text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
              Show Less
            </button>
          )}
        </div>
      )}
      {fl.length === 0 && (
        <div className="text-center py-12">
          <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-inner">
            <Package size={24} className="text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">No products found</p>
          <button onClick={openAdd} className="mt-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:underline">Add your first product</button>
        </div>
      )}

      {/* ── Premium Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg my-8 border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Premium gradient header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-t-3xl p-5 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -translate-x-1/4 translate-y-1/4" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/10 shadow-inner">
                    {editingId ? <Edit3 size={17} /> : <Plus size={17} />}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">{editingId ? 'Edit Product' : 'New Product'}</h2>
                    <p className="text-indigo-200 text-sm">{editingId ? 'Update product details' : 'Add a new product to catalog'}</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg transition border border-white/10 hover:shadow-lg">
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-5 space-y-3.5 max-h-[58vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lblCls}>Product Name <span className="text-red-400">*</span></label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Samsung Galaxy S25" className={inpCls} />
                </div>
                <div>
                  <label className={lblCls}>Brand <span className="text-red-400">*</span></label>
                  <input value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="e.g. Samsung" className={inpCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className={lblCls}>Price <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                    <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} className={`${inpCls} pl-8`} />
                  </div>
                </div>
                <div>
                  <label className={lblCls}>Orig. Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                    <input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: +e.target.value }))} className={`${inpCls} pl-8`} />
                  </div>
                </div>
                <div>
                  <label className={lblCls}>Discount %</label>
                  <input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: +e.target.value }))} className={inpCls} />
                </div>
                <div>
                  <label className={lblCls}>Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: +e.target.value }))} className={inpCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={lblCls}>Delivery Days</label>
                  <input type="number" value={form.deliveryDays} onChange={e => setForm(f => ({ ...f, deliveryDays: +e.target.value }))} className={inpCls} />
                </div>
              </div>
              <div>
                <label className={lblCls}>Category</label>
                <select value={form.category} onChange={e => { const cat = categories.find(c => c.name === e.target.value); setForm(f => ({ ...f, category: e.target.value, categoryId: cat?.id || 1 })); }} className={inpCls}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-1 border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <input type="checkbox" checked={form.freeShipping} onChange={e => setForm(f => ({ ...f, freeShipping: e.target.checked }))} className="accent-indigo-600 w-3.5 h-3.5" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Free Shipping</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-1 border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-indigo-600 w-3.5 h-3.5" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Featured</span>
                </label>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                <label className={lblCls}>Images</label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {form.images.filter(i => i).map((img, i) => (
                    <div key={i} className="relative w-11 h-11 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-sm group hover:border-indigo-300 dark:hover:border-indigo-600 transition-all">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"><Trash2 size={11} className="text-white" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={imageInput} onChange={e => setImageInput(e.target.value)} placeholder="Image URL" className={inpCls} />
                  <button onClick={addImage} className="px-3 py-1.5 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs hover:shadow-md hover:scale-105 transition-all font-bold"><Plus size={14} /></button>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                  <label className="flex items-center justify-center gap-2 w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-xs font-semibold text-gray-500 dark:text-gray-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer bg-white/50 dark:bg-gray-800/30 active:scale-[0.99]">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                          if (!res.ok) throw new Error('Upload failed');
                          const data = await res.json();
                          setForm(f => ({ ...f, images: [...f.images.filter(i => i), data.url] }));
                        } catch {
                          alert('Upload failed. Try again.');
                        }
                        setUploading(false);
                        e.target.value = '';
                      }}
                    />
                    {uploading ? (
                      <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Uploading...</>
                    ) : (
                      <><Upload size={14} /> Upload from Mobile</>
                    )}
                  </label>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                <label className={lblCls}>Sizes</label>
                {form.sizes.length > 0 && <div className="flex flex-wrap gap-1 mb-1.5">{form.sizes.map(s => (<span key={s} className="text-xs bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-lg font-medium flex items-center gap-1 border border-indigo-200 dark:border-indigo-800 shadow-sm">{s}<button onClick={() => setForm(f => ({ ...f, sizes: f.sizes.filter(x => x !== s) }))} className="hover:text-red-500 ml-0.5 font-bold">×</button></span>))}</div>}
                <div className="flex gap-2">
                  <input value={sizeInput} onChange={e => setSizeInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSize(); } }} placeholder="e.g. M" className={inpCls} />
                  <button onClick={addSize} className="px-3 py-1.5 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs hover:shadow-md hover:scale-105 transition-all font-bold"><Plus size={14} /></button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                <label className={lblCls}>Colors</label>
                {form.colors.length > 0 && <div className="flex flex-wrap gap-1 mb-1.5">{form.colors.map(c => (<span key={c} className="text-xs bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-lg font-medium flex items-center gap-1 border border-indigo-200 dark:border-indigo-800 shadow-sm">{c}<button onClick={() => setForm(f => ({ ...f, colors: f.colors.filter(x => x !== c) }))} className="hover:text-red-500 ml-0.5 font-bold">×</button></span>))}</div>}
                <div className="flex gap-2">
                  <input value={colorInput} onChange={e => setColorInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addColor(); } }} placeholder="e.g. Black" className={inpCls} />
                  <button onClick={addColor} className="px-3 py-1.5 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs hover:shadow-md hover:scale-105 transition-all font-bold"><Plus size={14} /></button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                <label className={lblCls}>Specifications</label>
                {Object.keys(form.specifications).length > 0 && <div className="space-y-1 mb-1.5">{Object.entries(form.specifications).map(([k, v]) => (<div key={k} className="flex items-center gap-1.5 text-xs bg-white dark:bg-gray-700 rounded-lg px-2.5 py-1.5 border border-gray-200 dark:border-gray-600 shadow-sm"><span className="font-bold text-gray-500 dark:text-gray-400 w-16 truncate">{k}:</span><span className="text-gray-900 dark:text-white truncate flex-1">{v}</span><button onClick={() => { const ns = { ...form.specifications }; delete ns[k]; setForm(f => ({ ...f, specifications: ns })); }} className="text-red-400 hover:text-red-600 font-bold">×</button></div>))}</div>}
                <div className="flex gap-2">
                  <input value={specKey} onChange={e => setSpecKey(e.target.value)} placeholder="Key" className={`${inpCls} w-1/3`} />
                  <input value={specVal} onChange={e => setSpecVal(e.target.value)} placeholder="Value" className={`${inpCls} flex-1`} />
                  <button onClick={addSpec} className="px-3 py-1.5 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs hover:shadow-md hover:scale-105 transition-all font-bold"><Plus size={14} /></button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 p-5 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-b-3xl">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-400 hover:shadow-sm">
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98]">
                <Save size={14} /> {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
