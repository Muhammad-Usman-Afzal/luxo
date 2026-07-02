// Navbar — Category navigation with dark mode
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const mainCategories = categories.filter(c => c.parentId === null);

export default function Navbar() {
  const { isAdmin } = useAuth();
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hidden md:block">
      <div className="max-w-[1400px] mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto">
          {mainCategories.map(cat => (
            <li key={cat.id}>
              <Link to={`/category/${cat.slug}`} className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition whitespace-nowrap">
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/products" className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition whitespace-nowrap">
              <span className="text-lg">🔥</span>
              <span>All Products</span>
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}
