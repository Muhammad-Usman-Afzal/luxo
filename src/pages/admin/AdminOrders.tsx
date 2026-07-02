// Admin Orders — Premium Compact | LUXO
import { useState } from 'react';
import { Eye, X, Package, Truck, CheckCircle, Clock, XCircle, MapPin, CreditCard, ShoppingBag, DollarSign, Search, ListOrdered, Layers, ArrowUp, ArrowDown } from 'lucide-react';
import type { Order } from '../../types';
import { orders as allOrders, users } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  confirmed: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  shipped: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  delivered: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  cancelled: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
};

const statusIcons: Record<string, typeof Package> = {
  pending: Clock, confirmed: CheckCircle, shipped: Truck, delivered: Package, cancelled: XCircle,
};

const statusGradients: Record<string, string> = {
  pending: 'from-amber-500 to-orange-600',
  confirmed: 'from-blue-500 to-indigo-600',
  shipped: 'from-purple-500 to-pink-600',
  delivered: 'from-emerald-500 to-teal-600',
  cancelled: 'from-red-500 to-rose-600',
};

export default function AdminOrders() {
  const { isAdmin } = useAuth();
  const [search, setSearch] = useState('');
  const [sf, setSf] = useState('');
  const [orderList, setOrderList] = useState(allOrders);
  const [detailOrder, setDetailOrder] = useState<(typeof allOrders)[0] | null>(null);
  const [editingStatus, setEditingStatus] = useState('');
  if (!isAdmin) return <div className="text-center py-20 text-gray-500">Access Denied</div>;

  const fl = orderList.filter(o => {
    if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase())) return false;
    if (sf && o.status !== sf) return false;
    return true;
  });

  const totalRevenue = orderList.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orderList.filter(o => o.status === 'pending').length;
  const deliveredOrders = orderList.filter(o => o.status === 'delivered').length;

  const miniStats = [
    { icon: ShoppingBag, label: 'Total', value: orderList.length, color: 'from-indigo-500 to-violet-600', change: '+12%', up: true },
    { icon: DollarSign, label: 'Revenue', value: `Rs.${(totalRevenue / 1000).toFixed(0)}K`, color: 'from-emerald-500 to-teal-600', change: '+8.5%', up: true },
    { icon: Clock, label: 'Pending', value: pendingOrders, color: 'from-amber-500 to-orange-600', change: pendingOrders > 5 ? '-3' : '+1', up: pendingOrders <= 5 },
    { icon: Package, label: 'Delivered', value: deliveredOrders, color: 'from-blue-500 to-cyan-600', change: '+15%', up: true },
  ];

  const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="max-w-[1400px] mx-auto px-2 sm:px-3 py-0.5 sm:py-1 dark:text-white space-y-0.5 sm:space-y-1">
      <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.3)] overflow-hidden w-full">
      {/* Premium top accent bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />

      {/* ── PREMIUM GRADIENT HEADER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-3 sm:px-4 py-2.5 shadow-lg shadow-indigo-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/10 shadow-inner">
              <ListOrdered size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Orders</h2>
              <p className="text-xs text-indigo-200">{fl.length} of {orderList.length} orders &middot; Rs.{totalRevenue.toLocaleString()} revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 shrink-0">
        {miniStats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 hover:border-indigo-200/50 dark:hover:border-indigo-800 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-1.5">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md shrink-0`}>
                  <Icon size={14} className="text-white" />
                </div>
                <span className={`text-[8px] flex items-center gap-0.5 font-bold px-1 py-0.5 rounded-full ${s.up ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'}`}>
                  {s.up ? <ArrowUp size={8} /> : <ArrowDown size={8} />}{s.change}
                </span>
              </div>
              <p className="text-xs font-black text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-[8px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by order number..."
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400 shadow-sm"
          />
        </div>
        <div className="relative">
          <Layers size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={sf} onChange={e => setSf(e.target.value)}
            className="pl-9 pr-7 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer shadow-sm"
          >
            <option value="">All</option>
            {statusOptions.map(s => <option key={s} className="capitalize">{s}</option>)}
          </select>
        </div>
        {(search || sf) && (
          <button onClick={() => { setSearch(''); setSf(''); }} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all hover:shadow-md hover:scale-110"><XCircle size={15} /></button>
        )}
      </div>

      {/* ── DESKTOP TABLE (scrollable) ── */}
      <div className="hidden md:block overflow-y-auto w-full" style={{ maxHeight: '66vh' }}>  <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 border-b border-gray-200 dark:border-gray-700">
              {['Order #', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date', ''].map(h => (
                <th key={h} className="text-left px-3 py-2 font-extrabold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-[0.12em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fl.map((o, i) => {
              const SI = statusIcons[o.status] || Package;
              return (
                <tr key={o.id} className={`border-b border-gray-50 dark:border-gray-800/50 last:border-0 transition-all duration-200 group cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-violet-50/30 dark:hover:from-indigo-900/10 dark:hover:to-violet-900/5 ${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/40 dark:bg-gray-800/20'}`}
                  onClick={() => { setDetailOrder(o); setEditingStatus(o.status); }}>
                  <td className="px-5 py-3 relative">
                    <div className="absolute left-0 inset-y-2 w-[3px] bg-gradient-to-b from-indigo-500 to-violet-600 rounded-r-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="font-bold text-gray-900 dark:text-white text-sm tracking-wider">{o.orderNumber}</span>
                  </td>
                  <td className="px-3 py-2">
                    {(() => {
                      const u = users.find(x => x.id === o.userId);
                      const n = u?.fullName || `User #${o.userId}`;
                      return (
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm border border-indigo-200 dark:border-indigo-800 shrink-0">
                            {n.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{n}</span>
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{o.items.length} item{o.items.length !== 1 ? 's' : ''}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">Rs.{o.total.toLocaleString()}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <CreditCard size={13} /> {o.paymentMethod}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold capitalize border shadow-sm ${statusColors[o.status]}`}>
                      <SI size={12} className={o.status === 'pending' ? 'animate-pulse' : ''} /> {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                      <button className="p-1.5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all hover:shadow-md hover:scale-110" title="View Details">
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {fl.length === 0 && (
          <div className="text-center py-8 px-4">
            <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10" />
              <ShoppingBag size={24} className="text-gray-400 dark:text-gray-500 relative z-10" />
            </div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">No orders found</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
      </div>

      {/* ═══ MOBILE CARDS (scrollable) ═══ */}
      <div className="md:hidden overflow-y-auto px-2 sm:px-3 pb-2 pt-1 space-y-1 w-full" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {fl.map(o => {
          const SI = statusIcons[o.status] || Package;
          return (
            <div
              key={o.id}
              className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2.5 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 active:scale-[0.98] overflow-hidden group"
              onClick={() => { setDetailOrder(o); setEditingStatus(o.status); }}
            >
              {/* Left gradient accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${statusGradients[o.status] || 'from-indigo-500 to-violet-600'} rounded-r-sm`} />
              <div className="flex items-center justify-between mb-2 pl-2">
                <span className="font-bold text-xs text-gray-900 dark:text-white tracking-wider">{o.orderNumber}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold capitalize inline-flex items-center gap-1 border shadow-sm ${statusColors[o.status]}`}>
                  <SI size={10} /> {o.status}
                </span>
              </div>
              <div className="flex items-center justify-between pl-2">
                <div className="space-y-0.5 text-[11px] text-gray-500">
                  <p>{o.items.length} item{o.items.length !== 1 ? 's' : ''} · <span className="flex items-center gap-1 inline-flex"><CreditCard size={10} /> {o.paymentMethod}</span></p>
                  <p className="text-[9px] text-gray-400 flex items-center gap-1">
                    <Clock size={9} /> {new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xs group-hover:scale-105 transition-transform">Rs.{o.total.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
        {fl.length === 0 && (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
              <ShoppingBag size={20} className="text-gray-400 dark:text-gray-500 relative z-10" />
            </div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">No orders found</p>
          </div>
        )}
      </div>

      {/* ═══ PREMIUM DETAIL MODAL ═══ */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetailOrder(null)} />
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg my-8 border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Premium gradient header */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${statusGradients[detailOrder.status] || 'from-indigo-600 to-violet-600'} rounded-t-3xl p-5 shadow-lg`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -translate-x-1/4 translate-y-1/4" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/10 shadow-inner">
                    {(() => { const I = statusIcons[detailOrder.status] || Package; return <I size={18} />; })()}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">{detailOrder.orderNumber}</h2>
                    <p className="text-white/70 text-sm">{detailOrder.status === 'delivered' ? 'Delivered' : detailOrder.status === 'cancelled' ? 'Cancelled' : 'In Progress'}</p>
                  </div>
                </div>
                <button onClick={() => setDetailOrder(null)} className="p-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg transition border border-white/10 hover:shadow-lg">
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3.5 max-h-[58vh] overflow-y-auto">
              {/* Status + Date */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-bold capitalize border shadow-sm ${statusColors[detailOrder.status]}`}>
                  {(() => { const I = statusIcons[detailOrder.status] || Package; return <I size={14} />; })()}
                  {detailOrder.status}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {new Date(detailOrder.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Total</p>
                  <p className="font-extrabold text-indigo-600 dark:text-indigo-400 text-base">Rs.{detailOrder.total.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Payment</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-1.5"><CreditCard size={14} />{detailOrder.paymentMethod}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Shipping</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Rs.{detailOrder.shipping.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Customer</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">User #{detailOrder.userId}</p>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-1">Shipping Address</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm flex items-start gap-1.5">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-indigo-400" />
                  {detailOrder.shippingAddress}
                </p>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-sm font-bold mb-2.5 text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Package size={14} /> Items ({detailOrder.items.length})
                </h3>
                <div className="space-y-2">
                  {detailOrder.items.map(i => (
                    <div key={i.id} className="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition border border-gray-100 dark:border-gray-700">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex-shrink-0 shadow-sm">
                        <img src={i.productImage} alt={i.productName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate text-gray-900 dark:text-white">{i.productName}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                          {i.quantity}× Rs.{i.price.toLocaleString()}
                          {i.size && <span className="ml-1.5">| Size: {i.size}</span>}
                          {i.color && <span className="ml-1.5">| {i.color}</span>}
                        </p>
                      </div>
                      <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">Rs.{(i.price * i.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 p-5 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-b-3xl">
              <button onClick={() => setDetailOrder(null)} className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-400 hover:shadow-sm">
                Close
              </button>
              <select
                value={editingStatus}
                onChange={e => setEditingStatus(e.target.value)}
                className="flex-1 py-2.5 px-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold bg-white dark:bg-gray-800 dark:text-white outline-none text-center cursor-pointer focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              >
                {statusOptions.map(s => <option key={s} className="capitalize">{s}</option>)}
              </select>
              <button
                onClick={() => { setOrderList(prev => prev.map(o => o.id === detailOrder!.id ? { ...o, status: editingStatus as Order['status'] } : o)); setDetailOrder(null); }}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
