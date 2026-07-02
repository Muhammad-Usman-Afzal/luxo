// Filters — Click-based pills, Dark+Light | BazaarHub
import { useState } from 'react';
import { Star, X, SlidersHorizontal } from 'lucide-react';
import { categories } from '../data/mockData';

interface FiltersState { category: string; minPrice: string; maxPrice: string; rating: string; sortBy: string; }
interface Props { filters: FiltersState; onFilterChange: (f: FiltersState) => void; }

export default function Filters({ filters, onFilterChange }: Props) {
  const [mo, setMo] = useState(false);
  const update = (k: keyof FiltersState, v: string) => onFilterChange({ ...filters, [k]: v });
  const clearAll = () => onFilterChange({ category: '', minPrice: '', maxPrice: '', rating: '', sortBy: '' });
  const hf = filters.category || filters.minPrice || filters.maxPrice || filters.rating;
  const ic = "w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-1 focus:ring-indigo-500";

  const activeBtn = "bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-600 dark:text-white dark:border-indigo-600";
  const idleBtn = "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500";

  const content = (
    <div className="space-y-5 dark:text-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2"><SlidersHorizontal size={16}/> Filters</h3>
        {hf && <button onClick={clearAll} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Clear All</button>}
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Category</h4>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={()=>update('category','')} key="all" className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${!filters.category ? activeBtn : idleBtn}`}>All</button>
          {categories.map(c => (
            <button key={c.id} onClick={()=>update('category',c.slug)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${filters.category===c.slug ? activeBtn : idleBtn}`}>{c.icon} {c.name}</button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Price Range (Rs.)</h4>
        <div className="flex gap-2"><input placeholder="Min" value={filters.minPrice} onChange={e=>update('minPrice',e.target.value)} className={ic}/><span className="self-center text-gray-400">-</span><input placeholder="Max" value={filters.maxPrice} onChange={e=>update('maxPrice',e.target.value)} className={ic}/></div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Minimum Rating</h4>
        <div className="flex flex-wrap gap-1.5">
          {[4,3,2,1].map(r => (
            <button key={r} onClick={()=>update('rating',filters.rating===String(r)?'':String(r))} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border flex items-center gap-1 ${filters.rating===String(r)?activeBtn:idleBtn}`}>
              {Array.from({length:r}).map((_,i)=><Star key={i} size={12} className="text-yellow-400 fill-yellow-400"/>)} <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sort By</h4>
        <select value={filters.sortBy} onChange={e=>update('sortBy',e.target.value)} className="w-full px-2 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-1 focus:ring-indigo-500">
          <option value="">Default</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Highest Rated</option><option value="discount">Biggest Discount</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <button onClick={()=>setMo(true)} className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium dark:text-white"><SlidersHorizontal size={16}/> Filters {hf && <span className="bg-indigo-600 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">!</span>}</button>
      {mo && (<div className="fixed inset-0 z-50 md:hidden"><div className="absolute inset-0 bg-black/50" onClick={()=>setMo(false)}/><div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-gray-900 p-5 overflow-y-auto shadow-2xl"><div className="flex justify-between items-center mb-4"><h3 className="font-semibold dark:text-white">Filters</h3><button onClick={()=>setMo(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><X size={20}/></button></div>{content}<button onClick={()=>setMo(false)} className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700">Apply Filters</button></div></div>)}
      <aside className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sticky top-28">{content}</aside>
    </>
  );
}
