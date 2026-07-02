// ProductChat — Embedded chat box on product detail page | BazaarHub
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, X, LogIn, ArrowLeft } from 'lucide-react';
import type { Product } from '../types';
import { useAuth } from '../context/AuthContext';

// Simple local mock chat state
interface LocalMsg { id: number; isUser: boolean; text: string; time: string; }

export default function ProductChat({ product }: { product: Product }) {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<LocalMsg[]>(() => [{
    id: 1, isUser: false,
    text: `Hello! Ask me anything about ${product.name}. I'm happy to help! 😊`,
    time: formatTime(new Date()),
  }]);
  const [input, setInput] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: LocalMsg = { id: Date.now(), isUser: true, text: input.trim(), time: formatTime(new Date()) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Auto-reply after 1.5s
    setTimeout(() => {
      const replies = [
        `Great question! The ${product.name} is one of our best sellers. Is there anything specific you'd like to know?`,
        `Thanks for your interest! We have ${product.stock} units in stock right now. Would you like to order?`,
        `That's available in ${product.colors.join(', ')}. Which color do you prefer?`,
        `Delivery takes ${product.deliveryDays} day${product.deliveryDays > 1 ? 's' : ''}. Would you like me to reserve one for you?`,
        `The price is Rs. ${product.price.toLocaleString()} with ${product.discount}% off — great deal! Want me to help you place an order?`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const botMsg: LocalMsg = { id: Date.now() + 1, isUser: false, text: randomReply, time: formatTime(new Date()) };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/20">
          <span className="text-2xl">💬</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Chat About This Product</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Login to ask questions directly about {product.name}</p>
        <div className="space-y-2 max-w-xs mx-auto">
          <Link to="/login" className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-sm transition shadow-lg shadow-indigo-500/20">
            <LogIn size={16} /> Sign In to Chat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Chat Header — Product Info */}
      <div className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/20 flex-shrink-0">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-sm leading-tight truncate">{product.name}</h3>
          <p className="text-white/80 text-xs">{product.brand}</p>
          <p className="text-yellow-200 font-bold text-sm">Rs. {product.price.toLocaleString()}</p>
        </div>
        <span className="text-[10px] bg-green-400 text-green-900 px-2 py-0.5 rounded-full font-bold">Online</span>
      </div>

      {/* Messages */}
      <div className="h-[280px] sm:h-[350px] overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 dark:bg-gray-950">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            {!msg.isUser && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mr-2 mt-1">
                BH
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
              msg.isUser
                ? 'bg-indigo-600 text-white rounded-br-md'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <span className={`text-[10px] mt-1 block ${msg.isUser ? 'text-indigo-200' : 'text-gray-400'}`}>{msg.time}</span>
            </div>
            {msg.isUser && (
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[10px] font-bold flex-shrink-0 ml-2 mt-1">
                {user?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'ME'}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 bg-white dark:bg-gray-900">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
          placeholder="Ask about this product..."
          className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-40 transition shadow-lg shadow-indigo-500/20"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
