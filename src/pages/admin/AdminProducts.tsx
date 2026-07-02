// Admin Products — Premium Create, Edit, Delete with Modal | LUXO
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit3, Trash2, Star, X, Save, Package, AlertTriangle, Layers, ShoppingBag, CheckCircle, XCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { products as allProducts, categories } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../types';

const emptyProduct: Product = {
  id: 0, name: '', slug: '', description: '', price: 0, originalPrice: 0, discount: 0,
  images: [''], categoryId: 1, category: '', brand: '',
  stock: 0, sizes: [], colors: [], deliveryDays: 3, freeShipping: true, featured: false,
  createdAt: new Date().toISOString().split('T')[0], specifications: {},
};

export default function AdminProducts() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState('');
  const [cf, setCf] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  useEffect(() => { setVisibleCount(10); }, [search, cf]);

  if (!isAdmin) return <div className="text-center py-20 text-gray-500">Access Denied</div>;

  const cats = [...new Set(products.map(p => p.category))];
  const fl = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (cf && p.category !== cf) return false;
    return true;
  });

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const outOfStock = products.filter(p => p.stock === 0).length;


  const openAdd = () => {
    setForm({ ...emptyProduct, id: Date.now(), images: [''] });
    setEditingId(null);
    setSizeInput(''); setColorInput(''); setImageInput(''); setSpecKey(''); setSpecVal('');
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setForm({ ...p });
    setEditingId(p.id);
    setSizeInput(''); setColorInput(''); setImageInput(''); setSpecKey(''); setSpecVal('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.brand.trim()) return;
    const finalForm = { ...form, slug: form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') };
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? finalForm : p));
    } else {
      setProducts(prev => [finalForm, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addSize = () => { if (sizeInput.trim() && !form.sizes.includes(sizeInput.trim())) setForm(f => ({ ...f, sizes: [...f.sizes, sizeInput.trim()] })); setSizeInput(''); };
  const addColor = () => { if (colorInput.trim() && !form.colors.includes(colorInput.trim())) setForm(f => ({ ...f, colors: [...f.colors, colorInput.trim()] })); setColorInput(''); };
  const addImage = () => { if (imageInput.trim() && !form.images.includes(imageInput.trim())) setForm(f => ({ ...f, images: [...f.images, imageInput.trim()] })); setImageInput(''); };
  const addSpec = () => { if (specKey.trim() && specVal.trim()) { setForm(f => ({ ...f, specifications: { ...f.specifications, [specKey.trim()]: specVal.trim() } })); setSpecKey(''); setSpecVal(''); } };

  const inputCls = "w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition";
  const labelCls = "block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1";

  const statCards = [
    { icon: Package, label: 'Total Products', value: products.length, color: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/25', change: '+8%', up: true },
    { icon: ShoppingBag, label: 'Total Stock', value: totalStock, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25', change: '+5%', up: true },
    { icon: AlertTriangle, label: 'Out of Stock', value: outOfStock, color: 'from-rose-500 to-red-600', shadow: 'shadow-rose-500/25', change: outOfStock > 2 ? `-${outOfStock - 2}` : '+0', up: outOfStock <= 2 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-2 sm:px-3 py-0.5 sm:py-1 dark:text-white space-y-0.5 sm:space-y-1">
      {/* ═══ ACCENT BAR ═══ */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 rounded-full" />
      {/* ═══ PREMIUM HEADER ═══ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-3 sm:p-4 shadow-xl shadow-indigo-500/25">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/10">
              <Package size={22} />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">Products</h1>
              <p className="text-indigo-200 text-[11px] sm:text-xs">{fl.length} of {products.length} products</p>
            </div>
          </div>
          <div className="flex gap-2">

            <button onClick={openAdd} className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-indigo-700 rounded-xl text-[11px] sm:text-xs font-bold hover:bg-indigo-50 transition shadow-lg shrink-0">
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* ═══ STATS ROW ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-1 sm:mb-2">
        {statCards.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 sm:p-4 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md ${s.shadow}`}>
                  <Icon size={18} className="text-white sm:w-5 sm:h-5" />
                </div>
                <span className={`text-[9px] sm:text-[10px] flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-full ${s.up ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'}`}>
                  {s.up ? <ArrowUp size={9} /> : <ArrowDown size={9} />}{s.change}
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ═══ SEARCH & FILTERS ═══ */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2 sm:p-3 mb-1 sm:mb-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products by name..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400 shadow-sm"
            />
          </div>
          <div className="relative">
            <Layers size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={cf} onChange={e => setCf(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer min-w-[180px] shadow-sm"
            >
              <option value="">All Categories</option>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {search || cf ? (
            <button onClick={() => { setSearch(''); setCf(''); }} className="flex items-center gap-1 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-semibold transition-all hover:shadow-md hover:scale-105 whitespace-nowrap">
              <XCircle size={16} /> Clear
            </button>
          ) : null}
        </div>
      </div>

      {/* ═══ PRODUCTS TABLE (Desktop) ═══ */}
      <div className="hidden md:block bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-y-auto" style={{ maxHeight: '66vh' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                {['Product', 'Category', 'Brand', 'Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="text-left px-3 py-2 font-bold text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fl.slice(0, visibleCount).map((p, i) => (
                <tr key={p.id} className="border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-violet-50/30 dark:hover:from-indigo-900/10 dark:hover:to-violet-900/5 transition group">
                  <td className="px-3 py-2 relative">
                    <div className="absolute left-0 inset-y-1 w-[3px] bg-gradient-to-b from-indigo-500 to-violet-600 rounded-r-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm flex-shrink-0 border border-gray-100 dark:border-gray-700">
                        <img src={p.images[0] || ''} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[240px]">{p.name}</p>
                        {p.featured && <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5 mt-0.5"><Star size={9} className="fill-indigo-500" /> Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2"><span className="text-xs text-gray-600 dark:text-gray-400">{p.category}</span></td>
                  <td className="px-3 py-2"><span className="text-xs font-medium text-gray-700 dark:text-gray-300">{p.brand}</span></td>
                  <td className="px-3 py-2">
                    <div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Rs.{p.price.toLocaleString()}</span>
                      {p.originalPrice > p.price && <span className="text-[10px] text-gray-400 line-through ml-1.5">Rs.{p.originalPrice.toLocaleString()}</span>}
                      {p.discount > 0 && <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold ml-1.5">-{p.discount}%</span>}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-bold ${
                      p.stock > 20 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                      p.stock > 5 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {p.stock > 0 ? <CheckCircle size={10} /> : <XCircle size={10} className="animate-pulse" />}
                      {p.stock} in stock
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1.5">
                      <button onClick={() => openEdit(p)} className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all hover:shadow-md hover:scale-110" title="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-rose-100 rounded-xl transition-all hover:shadow-md hover:scale-110" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {fl.length > 10 && (
          <div className="px-5 py-2 text-center border-t border-gray-100 dark:border-gray-800">
            {visibleCount < fl.length ? (
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Show More ({fl.length - visibleCount} remaining)
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(10)}
                className="px-6 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
              >
                Show Less
              </button>
            )}
          </div>
        )}
        {fl.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10" />
              <Package size={40} className="text-gray-400 dark:text-gray-500 relative z-10" />
            </div>
            <p className="text-lg font-bold text-gray-500 dark:text-gray-400">No products found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or category filter</p>
            <button onClick={openAdd} className="mt-4 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-violet-700 transition shadow-lg shadow-indigo-500/25">Add your first product →</button>
          </div>
        )}
      </div>
      </div>

      {/* ═══ PRODUCT CARDS (Mobile) ═══ */}
      <div className="md:hidden space-y-1 sm:space-y-2">
        {fl.slice(0, visibleCount).map(p => (
          <div key={p.id} className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2.5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${p.stock > 20 ? 'from-emerald-500 to-teal-600' : p.stock > 5 ? 'from-amber-500 to-orange-600' : 'from-red-500 to-rose-600'} rounded-r-sm`} />
            <div className="flex gap-3 pl-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-100 dark:border-gray-700">
                <img src={p.images[0] || ''} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{p.category} · {p.brand}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">Rs.{p.price.toLocaleString()}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    p.stock > 20 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                    p.stock > 5 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                    'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>{p.stock} left</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button onClick={() => openEdit(p)} className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all hover:shadow-md hover:scale-110"><Edit3 size={14} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-rose-100 rounded-xl transition-all hover:shadow-md hover:scale-110"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {fl.length > 10 && (
          <div className="px-4 py-1.5 text-center">
            {visibleCount < fl.length ? (
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Show More ({fl.length - visibleCount} remaining)
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(10)}
                className="w-full px-4 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
              >
                Show Less
              </button>
            )}
          </div>
        )}
        {fl.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10" />
              <Package size={28} className="text-gray-400 dark:text-gray-500 relative z-10" />
            </div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">No products found</p>
          </div>
        )}
      </div>

      {/* ── MODAL: Create / Edit Product ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl my-4 border border-gray-100 dark:border-gray-800">
            {/* Header with gradient */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-600 rounded-t-3xl p-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/10">
                    {editingId ? <Edit3 size={18} /> : <Plus size={18} />}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                    <p className="text-indigo-200 text-[10px]">{editingId ? 'Update product details' : 'Fill in the product information'}</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg transition border border-white/10">
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Product Name <span className="text-red-400">*</span></label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Samsung Galaxy S25" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Brand <span className="text-red-400">*</span></label>
                  <input value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="e.g. Samsung" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Product description..." className={`${inputCls} resize-none`} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>Price <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                    <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} className={`${inputCls} pl-9`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Original Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">Rs.</span>
                    <input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: +e.target.value }))} className={`${inputCls} pl-9`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: +e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Delivery Days</label>
                  <input type="number" value={form.deliveryDays} onChange={e => setForm(f => ({ ...f, deliveryDays: +e.target.value }))} className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Category</label>
                  <select value={form.category} onChange={e => { const cat = categories.find(c => c.name === e.target.value); setForm(f => ({ ...f, category: e.target.value, categoryId: cat?.id || 1 })); }} className={inputCls}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex items-end gap-3 pb-1">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-1">
                    <input type="checkbox" checked={form.freeShipping} onChange={e => setForm(f => ({ ...f, freeShipping: e.target.checked }))} className="accent-indigo-600 w-4 h-4" />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Free Shipping</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-1">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-indigo-600 w-4 h-4" />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Featured</span>
                  </label>
                </div>
              </div>

              {/* Images */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3.5">
                <label className={labelCls}>Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.images.filter(i => i).map((img, i) => (
                    <div key={i} className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-sm group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Trash2 size={14} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={imageInput} onChange={e => setImageInput(e.target.value)} placeholder="Image URL" className={inputCls} />
                  <button onClick={addImage} className="px-3 py-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition font-semibold"><Plus size={16} /></button>
                </div>
              </div>

              {/* Sizes */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3.5">
                <label className={labelCls}>Sizes</label>
                {form.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {form.sizes.map(s => (
                      <span key={s} className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 border border-indigo-200 dark:border-indigo-800">{s}<button onClick={() => setForm(f => ({ ...f, sizes: f.sizes.filter(x => x !== s) }))} className="hover:text-red-500 ml-0.5">×</button></span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input value={sizeInput} onChange={e => setSizeInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSize(); } }} placeholder="Add size (e.g. M)" className={inputCls} />
                  <button onClick={addSize} className="px-3 py-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition font-semibold"><Plus size={16} /></button>
                </div>
              </div>

              {/* Colors */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3.5">
                <label className={labelCls}>Colors</label>
                {form.colors.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {form.colors.map(c => (
                      <span key={c} className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 border border-indigo-200 dark:border-indigo-800">{c}<button onClick={() => setForm(f => ({ ...f, colors: f.colors.filter(x => x !== c) }))} className="hover:text-red-500 ml-0.5">×</button></span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input value={colorInput} onChange={e => setColorInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addColor(); } }} placeholder="Add color (e.g. Black)" className={inputCls} />
                  <button onClick={addColor} className="px-3 py-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition font-semibold"><Plus size={16} /></button>
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3.5">
                <label className={labelCls}>Specifications</label>
                {Object.keys(form.specifications).length > 0 && (
                  <div className="space-y-1 mb-2">
                    {Object.entries(form.specifications).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-2 text-xs bg-white dark:bg-gray-700 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-600">
                        <span className="font-medium text-gray-500 dark:text-gray-400 w-24 truncate">{k}:</span>
                        <span className="text-gray-900 dark:text-white truncate flex-1">{v}</span>
                        <button onClick={() => { const newSpec = { ...form.specifications }; delete newSpec[k]; setForm(f => ({ ...f, specifications: newSpec })); }} className="text-red-400 hover:text-red-600 p-0.5">×</button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input value={specKey} onChange={e => setSpecKey(e.target.value)} placeholder="Key" className={`${inputCls} w-1/3`} />
                  <input value={specVal} onChange={e => setSpecVal(e.target.value)} placeholder="Value" className={`${inputCls} flex-1`} />
                  <button onClick={addSpec} className="px-3 py-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition font-semibold"><Plus size={16} /></button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 rounded-b-3xl">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-400">
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-violet-700 transition shadow-lg shadow-indigo-500/25 active:scale-[0.98]">
                <Save size={16} /> {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
