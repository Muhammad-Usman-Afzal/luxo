// ProductListing v2 — ID-based filtering | BazaarHub
import { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Grid3X3, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/mockData';
const PG = 8;

export default function ProductListing() {
  const { products } = useProducts();
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const sq = searchParams.get('q') || '';
  const [f, setF] = useState({ c: slug || '', mp: '', xp: '', r: '', s: '' });
  const [pg, setPg] = useState(1);
  const [vw, setVw] = useState<'grid' | 'list'>('grid');

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  useEffect(() => { window.scrollTo(0, 0); }, [pg]);

  const filtered = useMemo(() => {
    let R = [...products].filter(p => p.stock > 0);
    if (sq) { const q = sq.toLowerCase(); R = R.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)); }
    if (f.c) {
      const cat = categories.find(c => c.slug === f.c);
      if (cat) {
        const kids = categories.filter(c => c.parentId === cat.id).map(c => c.id);
        R = R.filter(p => [cat.id, ...kids].includes(p.categoryId));
      }
    }
    if (f.mp) R = R.filter(p => p.price >= +f.mp);
    if (f.xp) R = R.filter(p => p.price <= +f.xp);
    if (f.r) R = R.filter(p => p.rating >= +f.r);
    if (f.s === 'price-asc') R.sort((a,b)=>a.price-b.price);
    else if (f.s === 'price-desc') R.sort((a,b)=>b.price-a.price);
    else if (f.s === 'rating') R.sort((a,b)=>b.rating-a.rating);
    else if (f.s === 'discount') R.sort((a,b)=>b.discount-a.discount);
    return R;
  }, [f, sq]);

  const tp = Math.ceil(filtered.length / PG);
  const disp = filtered.slice((pg-1)*PG, pg*PG);
  const nm = slug ? categories.find(c=>c.slug===slug)?.name||'All' : sq ? `Search: "${sq}"` : 'All Products';
  const af = !!(f.c||f.mp||f.xp||f.r);

  const ff = (up: typeof f) => { setF(up); setPg(1); };

  return (
    <><Navbar />
    <main className="max-w-[1400px] mx-auto px-3 sm:px-4 py-3 sm:py-4 dark:text-white">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link><span>/</span>
        {slug && <><Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">Products</Link><span>/</span></>}
        <span className="text-gray-900 dark:text-white font-medium truncate">{nm}</span>
      </div>
      <div className="flex items-center justify-between mb-3 sm:mb-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3">
        <div className="min-w-0"><h1 className="text-base sm:text-lg font-bold truncate">{nm}</h1><p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">{filtered.length} products</p></div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button onClick={()=>setVw('grid')} className={`p-2 rounded-lg ${vw==='grid'?'bg-indigo-600 text-white':'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><Grid3X3 size={16}/></button>
          <button onClick={()=>setVw('list')} className={`p-2 rounded-lg ${vw==='list'?'bg-indigo-600 text-white':'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><List size={16}/></button>
        </div>
      </div>
      <div className="md:hidden mb-3">
        <div className="flex items-center gap-2">
          <Filters filters={{category:f.c,minPrice:f.mp,maxPrice:f.xp,rating:f.r,sortBy:f.s}} onFilterChange={(x)=>{ff({c:x.category,mp:x.minPrice,xp:x.maxPrice,r:x.rating,s:x.sortBy})}}/>
          {af && <button onClick={()=>ff({c:'',mp:'',xp:'',r:'',s:''})} className="text-[11px] text-red-500 hover:underline">Clear</button>}
        </div>
        {af && <div className="flex flex-wrap gap-1.5 mt-2">
          {f.c && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">{categories.find(c=>c.slug===f.c)?.name||f.c}<button onClick={()=>ff({...f,c:''})} className="hover:text-red-500 font-bold">x</button></span>}
          {f.mp && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">Min {f.mp}<button onClick={()=>ff({...f,mp:''})} className="hover:text-red-500 font-bold">x</button></span>}
          {f.xp && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">Max {f.xp}<button onClick={()=>ff({...f,xp:''})} className="hover:text-red-500 font-bold">x</button></span>}
          {f.r && <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">{f.r}+<button onClick={()=>ff({...f,r:''})} className="hover:text-red-500 font-bold">x</button></span>}
        </div>}
      </div>
      <div className="flex gap-6">
        <div className="hidden md:block w-60 flex-shrink-0"><Filters filters={{category:f.c,minPrice:f.mp,maxPrice:f.xp,rating:f.r,sortBy:f.s}} onFilterChange={(x)=>{ff({c:x.category,mp:x.minPrice,xp:x.maxPrice,r:x.rating,s:x.sortBy})}}/></div>
        <div className="flex-1 min-w-0">
          {disp.length===0?<div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"><p className="text-5xl mb-4">NO</p><h2 className="text-lg font-semibold">No products found</h2><button onClick={()=>ff({c:'',mp:'',xp:'',r:'',s:''})} className="mt-4 text-indigo-600 hover:underline text-sm">Clear filters</button></div>
          :vw==='grid'?<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">{disp.map(p=><ProductCard key={p.id} product={p}/>)}</div>
          :<div className="space-y-3">{disp.map(p=><ProductCard key={p.id} product={p} variant="list"/>)}</div>}
          <Pagination currentPage={pg} totalPages={tp} onPageChange={setPg}/>
        </div>
      </div>
    </main></>
  );
}
