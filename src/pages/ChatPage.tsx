// Chat Page — Full-screen WhatsApp-style | BazaarHub
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center px-4">
        <MessageCircle size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4"/>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Login to Chat</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Login to chat with sellers and get product support.</p>
        <Link to="/login" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">Go to Login</Link>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <Link to="/" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">💬 Messages</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatWidget />
      </div>
    </div>
  );
}
