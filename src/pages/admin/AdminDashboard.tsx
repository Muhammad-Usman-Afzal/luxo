// Admin Dashboard — Premium Responsive | LUXO
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, TrendingUp, DollarSign, ArrowUp, ArrowDown, Star, ListOrdered, BarChart3 } from 'lucide-react';
import { products, orders, adminDashboardData } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const sc: Record<string, string> = {
  pending: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400',
  confirmed: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
  shipped: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
  delivered: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400',
  cancelled: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400',
};
const statusBarColors: Record<string, string> = {
  delivered: 'bg-green-500', pending: 'bg-yellow-500', cancelled: 'bg-red-500',
  shipped: 'bg-violet-500', confirmed: 'bg-blue-500',
};
const statusCountColors: Record<string, string> = {
  delivered: 'text-green-600 dark:text-green-400', pending: 'text-yellow-600 dark:text-yellow-400',
  cancelled: 'text-red-600 dark:text-red-400', shipped: 'text-violet-600 dark:text-violet-400',
  confirmed: 'text-blue-600 dark:text-blue-400',
};

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    fetch('/api/admin/users', { credentials: 'include' })
      .then(r => r.json())
      .then(u => setUserCount(u.filter((x: any) => x.role === 'user').length))
      .catch(() => {});
  }, []);
  if (!isAdmin) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center dark:text-white">
      <p className="text-5xl mb-4">🚫</p><h1 className="text-2xl font-bold">Access Denied</h1>
      <Link to="/" className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline">Go Home</Link>
    </div>
  );

  const tr = orders.reduce((s,o)=>s+o.total,0);
  const mx = Math.max(...adminDashboardData.salesChart.map(i=>i.sales));

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-3 sm:py-5 dark:text-white space-y-4 sm:space-y-5">
      {/* ═══ ACCENT BAR ═══ */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 rounded-full" />

      {/* ── PREMIUM GRADIENT HEADER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-4 sm:p-6 shadow-xl shadow-indigo-500/25">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/10">
              <BarChart3 size={22} />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-indigo-200 text-[11px] sm:text-xs">Welcome back, <span className="font-semibold text-white">{user?.fullName}</span></p>
            </div>
          </div>

        </div>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {[
          {l:'Revenue',v:`Rs.${(tr/1000).toFixed(0)}K`,i:DollarSign,c:'from-emerald-500 to-teal-600',sh:'shadow-emerald-500/25',ch:'+12%',up:true},
          {l:'Orders',v:orders.length,i:ShoppingBag,c:'from-blue-500 to-cyan-600',sh:'shadow-blue-500/25',ch:'+8%',up:true},
          {l:'Users',v:userCount,i:Users,c:'from-violet-500 to-purple-600',sh:'shadow-violet-500/25',ch:'+24%',up:true},
          {l:'Products',v:products.length,i:Package,c:'from-indigo-500 to-blue-600',sh:'shadow-indigo-500/25',ch:'+3',up:true},
        ].map(s=>{const I=s.i;return(
          <div key={s.l} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 sm:p-4 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all group">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${s.c} flex items-center justify-center shadow-md ${s.sh}`}>
                <I size={18} className="text-white sm:w-5 sm:h-5" />
              </div>
              <span className={`text-[10px] sm:text-xs flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-full ${s.up ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'}`}>
                {s.up ? <ArrowUp size={10}/> : <ArrowDown size={10}/>}{s.ch}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{s.v}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-0.5">{s.l}</p>
          </div>
        );})}
      </div>

      {/* ── MIDDLE ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-sm sm:text-base font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <TrendingUp size={18} className="text-indigo-600 dark:text-indigo-400" /> Monthly Sales
            </h2>
            <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full font-medium">Last 6 months</span>
          </div>
          <div className="flex items-end gap-1.5 sm:gap-2 h-44 sm:h-52">
            {adminDashboardData.salesChart.map((it,i)=>{const h=(it.sales/mx)*100;return(
              <div key={it.month} className="flex-1 flex flex-col items-center min-w-0 group">
                <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 mb-1.5 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {it.sales>=1000 ? `Rs.${(it.sales/1000).toFixed(0)}K` : `Rs.${it.sales}`}
                </span>
                <div className="w-full relative rounded-t-lg sm:rounded-t-xl overflow-hidden shadow-sm shadow-indigo-200/30 dark:shadow-indigo-900/20"
                  style={{height:`${Math.max(h,5)}%`, minHeight:8}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 dark:from-indigo-500 dark:via-indigo-400 dark:to-indigo-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 uppercase font-semibold tracking-wider">{it.month}</span>
              </div>
            );})}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-sm sm:text-base font-bold mb-4 sm:mb-5 flex items-center gap-2 text-gray-900 dark:text-white">
            <ShoppingBag size={18} className="text-indigo-600 dark:text-indigo-400" /> Order Status
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {adminDashboardData.orderStatusDistribution.map(it=>{const pct=(it.count/orders.length)*100;return(
              <div key={it.status}>
                <div className="flex justify-between items-baseline text-[10px] sm:text-xs mb-1.5">
                  <span className="capitalize font-semibold text-gray-700 dark:text-gray-300">{it.status}</span>
                  <span className={`font-bold ${statusCountColors[it.status]||'text-gray-500'}`}>{it.count}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 sm:h-3 overflow-hidden shadow-inner">
                  <div className={`h-full rounded-full transition-all duration-700 ${statusBarColors[it.status]||'bg-gray-400'} relative overflow-hidden`} style={{width:`${Math.max(pct,5)}%`}}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
              </div>
            );})}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-[10px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">View All <ArrowUp size={12} className="rotate-90" /></Link>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {orders.slice(0,5).map(o=>(
              <div key={o.id} className="flex items-center justify-between py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-violet-50/30 dark:hover:from-indigo-900/10 dark:hover:to-violet-900/5 transition border-b border-gray-50 dark:border-gray-800 last:border-0 relative">
                <div className="absolute left-0 inset-y-2 w-[3px] bg-gradient-to-b from-indigo-500 to-violet-600 rounded-r-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">{o.orderNumber}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{new Date(o.createdAt).toLocaleDateString()} &bull; {o.items.length} item{o.items.length!==1?'s':''}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className={`text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full font-bold capitalize border shadow-sm ${sc[o.status]}`}>{o.status}</span>
                  <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">Rs. {o.total.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Star size={18} className="text-yellow-500 fill-yellow-500" /> Top Products
          </h2>
          <div className="space-y-1 sm:space-y-1.5">
            {products.sort((a,b)=>b.rating-a.rating).slice(0,5).map(p=>(
              <div key={p.id} className="flex items-center gap-3 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-violet-50/30 dark:hover:from-indigo-900/10 dark:hover:to-violet-900/5 transition border-b border-gray-50 dark:border-gray-800 last:border-0 relative">
                <div className="absolute left-0 inset-y-2 w-[3px] bg-gradient-to-b from-amber-500 to-orange-600 rounded-r-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <img src={p.images[0]} alt={p.name} className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-xl bg-gray-50 dark:bg-gray-800 flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700"/>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Star size={10} className="text-yellow-500 fill-yellow-500" /> {p.rating} &bull; {p.reviewCount} reviews
                  </p>
                </div>
                <span className="font-bold text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 shrink-0">Rs.{p.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
