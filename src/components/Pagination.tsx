// Pagination — Dark+Light | BazaarHub
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props { currentPage: number; totalPages: number; onPageChange: (p: number) => void; }

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;
  const getPages = () => {
    const pages: (number|'...')[] = [];
    if (totalPages <= 7) { for (let i=1;i<=totalPages;i++) pages.push(i); }
    else { pages.push(1); if (currentPage>3) pages.push('...'); for (let i=Math.max(2,currentPage-1);i<=Math.min(totalPages-1,currentPage+1);i++) pages.push(i); if (currentPage<totalPages-2) pages.push('...'); pages.push(totalPages); }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button onClick={()=>onPageChange(currentPage-1)} disabled={currentPage===1} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"><ChevronLeft size={16}/></button>
      {getPages().map((p,i)=>(
        <button key={i} onClick={()=>typeof p==='number'&&onPageChange(p)} disabled={p==='...'} className={`min-w-[36px] h-9 text-sm rounded-lg transition ${p===currentPage?'bg-indigo-600 text-white font-semibold':p==='...'?'cursor-default text-gray-400':'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>{p}</button>
      ))}
      <button onClick={()=>onPageChange(currentPage+1)} disabled={currentPage===totalPages} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"><ChevronRight size={16}/></button>
    </div>
  );
}
