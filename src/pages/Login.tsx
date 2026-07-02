// Login — Dark+Light | BazaarHub
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) { window.location.href = '/'; return; }
    else setError(result.message);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-800 p-8">
          <div className="text-center mb-6">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">LUXO</span>
            <span className="text-3xl font-light text-gray-700 dark:text-gray-300" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-3">Welcome Back!</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Login to access your account</p>
          </div>
          {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm px-4 py-2 rounded-xl mb-4 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@email.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 transition" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2">
              <LogIn size={18} /> {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Demo accounts:</p>
            <p className="text-gray-700 dark:text-gray-300">Admin: admin@luxo.pk / admin123</p>
            <p className="text-gray-700 dark:text-gray-300">User: ahmed@email.com / user123</p>
          </div>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Don't have an account? </span>
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
