// Search Page — Full responsive, mobile-friendly | BazaarHub
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductContext';
const PAGE_SIZE = 8;

export default function SearchPage() {
  const { products } = useProducts();
  const [sp] = useSearchParams();
  const sq = sp.get('q') || '';
  const [f, setF] = useState({ category: '', minPrice: '', maxPrice: '', rating: '', sortBy: '' });
  const [pg, setPg] = useState(1);

  useEffect(() => { window.scrollTo(0, 0); setPg(1); setF({ category: '', minPrice: '', maxPrice: '', rating: '', sortBy: '' }); }, [sq]);

  useEffect(() => { window.scrollTo(0, 0); }, [pg]);

  const filtered = useMemo(() => {
    let R = [...products].filter(p => p.stock > 0);
    const q = sq.toLowerCase();
    R = R.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    if (f.minPrice) R = R.filter(p => p.price >= +f.minPrice);
    if (f.maxPrice) R = R.filter(p => p.price <= +f.maxPrice);
    if (f.rating) R = R.filter(p => p.rating >= +f.rating);
    if (f.sortBy === 'price-asc') R.sort((a,b)=>a.price-b.price);
    else if (f.sortBy === 'price-desc') R.sort((a,b)=>b.price-a.price);
    else if (f.sortBy === 'rating') R.sort((a,b)=>b.rating-a.rating);
    else if (f.sortBy === 'discount') R.sort((a,b)=>b.discount-a.discount);
    return R;
  }, [sq, f]);

  const tp = Math.ceil(filtered.length / PAGE_SIZE);
  const disp = filtered.slice((pg-1)*PAGE_SIZE, pg*PAGE_SIZE);
  const hasFilters = !!(f.category || f.minPrice || f.maxPrice || f.rating);

  const ff = (up: typeof f) => { setF(up); setPg(1); };

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-3 sm:py-4 dark:text-white">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2" onClick={() => { setTimeout(() => { const el = document.getElementById('brands'); el?.scrollIntoView({ block: 'start' }); }, 100); }}>
          ← Back
        </Link>
        <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <Search size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
          Results for "<span className="text-indigo-600 dark:text-indigo-400">{sq}</span>"
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{filtered.length} product{filtered.length!==1?'s':''} found</p>
      </div>

      {/* Mobile filter bar */}
      <div className="md:hidden mb-3">
        <div className="flex items-center gap-2">
          <Filters filters={{category:f.category,minPrice:f.minPrice,maxPrice:f.maxPrice,rating:f.rating,sortBy:f.sortBy}} onFilterChange={(x)=>{ff({category:x.category,minPrice:x.minPrice,maxPrice:x.maxPrice,rating:x.rating,sortBy:x.sortBy})}} />
          {hasFilters && <button onClick={()=>ff({category:'',minPrice:'',maxPrice:'',rating:'',sortBy:''})} className="text-[11px] text-red-500 hover:underline">Clear</button>}
        </div>
        {hasFilters && <div className="flex flex-wrap gap-1.5 mt-2">
          {f.category && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded-full">{f.category}<button onClick={()=>ff({...f,category:''})} className="hover:text-red-500 font-bold">x</button></span>}
          {f.minPrice && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded-full">Min {f.minPrice}<button onClick={()=>ff({...f,minPrice:''})} className="hover:text-red-500 font-bold">x</button></span>}
          {f.maxPrice && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded-full">Max {f.maxPrice}<button onClick={()=>ff({...f,maxPrice:''})} className="hover:text-red-500 font-bold">x</button></span>}
          {f.rating && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded-full">{f.rating}+<button onClick={()=>ff({...f,rating:''})} className="hover:text-red-500 font-bold">x</button></span>}
        </div>}
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-60 flex-shrink-0">
          <Filters filters={{category:f.category,minPrice:f.minPrice,maxPrice:f.maxPrice,rating:f.rating,sortBy:f.sortBy}} onFilterChange={(x)=>{ff({category:x.category,minPrice:x.minPrice,maxPrice:x.maxPrice,rating:x.rating,sortBy:x.sortBy})}} />
        </div>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {disp.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <p className="text-5xl sm:text-6xl mb-4">🔍</p>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">No results for "{sq}"</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4">Try different keywords or browse categories</p>
              <div className="flex gap-3 justify-center">
                <Link to="/products" className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition">Browse All</Link>
                {hasFilters && <button onClick={()=>ff({category:'',minPrice:'',maxPrice:'',rating:'',sortBy:''})} className="inline-block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">Clear Filters</button>}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                {disp.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              <Pagination currentPage={pg} totalPages={tp} onPageChange={setPg} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
