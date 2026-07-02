// ChatWidget — Dark+Light | BazaarHub
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, Check, CheckCheck, Reply, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { products } from '../data/mockData';
import ChatInput from './ChatInput';
import type { ChatMessage } from '../types';

export default function ChatWidget() {
  const { user } = useAuth();
  const { contacts, getMessagesWithUser, sendMessage, markAsSeen, setActiveContact } = useChat();
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [chatProduct, setChatProduct] = useState<{ id: number; name: string; image: string; price: number } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // USER: Auto-select admin (only 1 contact)
  // ADMIN: Do NOT auto-select — let them pick manually from contact list
  useEffect(() => {
    if (contacts.length > 0 && user && user.role !== 'admin' && !selectedContactId) {
      const ac = contacts.find(c => c.userName.toLowerCase().includes('admin'));
      if (ac) setSelectedContactId(ac.userId);
    }
  }, [contacts, user]);
  useEffect(() => { setActiveContact(selectedContactId); }, [selectedContactId, setActiveContact]);
  const selectedContact = contacts.find(c => c.userId === selectedContactId);
  const chatMessages = selectedContactId ? getMessagesWithUser(selectedContactId) : [];

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);
  useEffect(() => {
    if (selectedContactId && user) {
      const unseen = chatMessages.filter(m => m.receiverId === user.id && m.status !== 'seen').map(m => m.id);
      if (unseen.length > 0) { const t = setTimeout(() => markAsSeen(unseen), 500); return () => clearTimeout(t); }
    }
    // Scroll to bottom on new messages
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [selectedContactId, chatMessages, user, markAsSeen]);

  // Auto-open chat with admin + send product context when coming from product page
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('bazaarhub_chat_product');
      if (stored) {
        const p = JSON.parse(stored) as { id: number; name: string; image: string; price: number };
        setChatProduct(p);
        sessionStorage.removeItem('bazaarhub_chat_product');
        const adminC = contacts.find(c => c.userName.toLowerCase().includes('admin'));
        if (adminC && user) {
          setSelectedContactId(adminC.userId);

        }
      }
    } catch {}
  }, [contacts, user]);

  const handleSendProduct = (pid: number) => { const p = products.find(p => p.id === pid); if (p) sendMessage(`📦 ${p.name} — Rs. ${p.price.toLocaleString()}`, p.id, p.name, p.images[0], p.price, replyTo?.id); setShowProductPicker(false); setReplyTo(null); };
  const fmtTime = (s: string) => new Date(s).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const fmtDate = (s: string) => { const d = new Date(s); const t = new Date(); if (d.toDateString() === t.toDateString()) return 'Today'; const y = new Date(t); y.setDate(t.getDate() - 1); if (d.toDateString() === y.toDateString()) return 'Yesterday'; return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); };

  if (!user) return null;

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* Contact list */}
      <div className={`${selectedContactId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-indigo-600 text-white"><h2 className="text-base font-bold">Messages</h2><p className="text-xs opacity-80">{contacts.length} conversation{contacts.length!==1?'s':''}</p></div>
        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400"><p className="text-4xl mb-3">💬</p><p className="font-medium">No messages yet</p></div>
          ) : contacts.map(c => (
            <button key={c.userId} onClick={() => setSelectedContactId(c.userId)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 transition text-left">
              <div className="relative"><span className="text-2xl">{c.userAvatar}</span>{c.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />}</div>
              <div className="flex-1 min-w-0"><div className="flex justify-between"><span className="font-medium text-sm text-gray-900 dark:text-white truncate">{c.userName}</span><span className="text-[10px] text-gray-400">{c.lastMessageTime ? fmtDate(c.lastMessageTime) : ''}</span></div><p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.lastMessage}</p></div>
              {c.unreadCount > 0 && <span className="bg-green-500 text-white text-[10px] min-w-[20px] h-5 rounded-full flex items-center justify-center font-bold px-1">{c.unreadCount}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className={`${selectedContactId ? 'flex' : 'hidden md:flex'} flex-col flex-1 overflow-hidden`}>
        {selectedContact ? (
          <>
            <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <button onClick={() => setSelectedContactId(null)} className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ArrowLeft size={18} /></button>
              <span className="text-2xl">{selectedContact.userAvatar}</span><div><p className="font-semibold text-sm text-gray-900 dark:text-white">{selectedContact.userName}</p><p className="text-[10px] text-green-600">{selectedContact.isOnline ? 'Online' : 'Offline'}</p></div>
              {user.role === 'admin' && <button onClick={() => setShowProductPicker(!showProductPicker)} className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500"><ShoppingCart size={18} /></button>}
            </div>
            {chatProduct && (
              <Link to={`/product/${products.find(p => p.id === chatProduct.id)?.slug || ''}`} className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-b border-indigo-100 dark:border-indigo-800 p-3 flex items-center gap-3 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/40 transition group cursor-pointer">
                <img src={chatProduct.image} alt={chatProduct.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-white dark:border-gray-700 shadow-sm group-hover:scale-105 transition" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{chatProduct.name}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm mt-0.5">Rs. {chatProduct.price.toLocaleString()}</p>
                </div>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setChatProduct(null); }} className="p-1 text-gray-400 hover:text-gray-600 shrink-0 hover:bg-gray-200/50 rounded-lg"><X size={14} /></button>
              </Link>
            )}
            {showProductPicker && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 max-h-40 overflow-y-auto">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Select product to share:</p>
                <div className="flex gap-2 flex-wrap">{products.slice(0,10).map(p => (
                  <button key={p.id} onClick={() => handleSendProduct(p.id)} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"><img src={p.images[0]} alt={p.name} className="w-8 h-8 object-cover rounded" /><div className="text-left"><p className="text-[10px] font-medium truncate max-w-[120px] text-gray-900 dark:text-white">{p.name}</p><p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Rs. {p.price.toLocaleString()}</p></div></button>
                ))}</div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 w-full bg-[#e5ddd5] dark:bg-[#1a1a2e]">
              {chatMessages.length === 0 ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400"><p className="text-4xl mb-3">👋</p><p>Start a conversation!</p></div>
              ) : chatMessages.map((msg, idx) => {
                const isMine = msg.senderId === user.id;
                const prev = idx > 0 ? chatMessages[idx - 1] : null;
                const showDate = !prev || fmtDate(prev.createdAt) !== fmtDate(msg.createdAt);
                return (
                  <div key={msg.id}>
                    {showDate && <div className="text-center my-3"><span className="bg-white/70 dark:bg-gray-800/70 text-[10px] px-3 py-1 rounded-full text-gray-500 dark:text-gray-400 shadow-sm">{fmtDate(msg.createdAt)}</span></div>}
                    <div className={`flex items-end gap-0.5 w-full ${isMine ? 'flex-row-reverse' : ''}`}>
                      <button onClick={(e)=>{e.stopPropagation();setReplyTo(msg);}} className="opacity-25 md:opacity-0 md:hover:opacity-100 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 shrink-0 self-end mb-1"><Reply size={10} className="text-gray-400" /></button>
                      <div className="min-w-0 max-w-[80%] sm:max-w-[72%]" onClick={() => setReplyTo(msg)}>
                        {msg.quotedMessage && (
                          <div className={`text-[10px] p-1.5 rounded-t-lg border-l-2 max-w-full ${isMine ? 'bg-[#b1d8c4] dark:bg-[#1a3a2a] border-[#6bc28b]' : 'bg-gray-200 dark:bg-gray-700 border-gray-400'}`}>
                            <p className="font-semibold text-indigo-600 dark:text-indigo-400 truncate">{msg.quotedMessage.senderId === user.id ? 'You' : 'them'}</p>
                            <p className="truncate text-gray-600 dark:text-gray-300">{msg.quotedMessage.content}</p>
                            {msg.quotedMessage.productName && <p className="text-indigo-600 dark:text-indigo-400 font-medium truncate">📦 {msg.quotedMessage.productName}</p>}
                          </div>
                        )}
                        {msg.productId && msg.productName && (
                          <Link to={`/product/${products.find(p => p.id === msg.productId)?.slug || ''}`} className={`block p-2 rounded-t-lg ${isMine ? 'bg-[#c7e9d0] dark:bg-[#1a3a2a] border border-[#90c99e]' : 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600'} hover:brightness-95 transition flex items-center gap-2 group`}>
                            <img src={msg.productImage || ''} alt={msg.productName} className="w-10 h-10 object-cover rounded flex-shrink-0 group-hover:scale-105 transition" />
                            <div className="min-w-0 flex-1"><p className="text-[11px] font-medium truncate text-gray-900 dark:text-white group-hover:text-indigo-600">{msg.productName}</p>{msg.productPrice && <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">Rs. {msg.productPrice.toLocaleString()}</p>}</div>
                          </Link>
                        )}
                        <div className={`px-3 py-2 shadow-sm text-sm overflow-hidden ${isMine ? 'bg-[#DCF8C6] dark:bg-[#054b22] text-gray-900 dark:text-gray-100 rounded-l-lg rounded-br-lg' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-r-lg rounded-bl-lg'} ${(msg.quotedMessage || msg.productId) ? 'rounded-t-none' : ''}`}>
                          <p className="whitespace-pre-wrap" style={{ wordBreak: 'break-all' }}>{msg.content}</p>
                          <div className="flex items-center gap-1 justify-end mt-0.5 text-[#667781] dark:text-gray-400">
                            <span className="text-[10px]">{fmtTime(msg.createdAt)}</span>
                            {isMine && (msg.status === 'seen' ? <CheckCheck size={14} className="text-blue-500" /> : msg.status === 'delivered' ? <CheckCheck size={14} /> : <Check size={14} />)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput replyTo={replyTo} onSend={(t) => { const p = chatProduct; sendMessage(t, p?.id || replyTo?.productId || null, p?.name || replyTo?.productName, p?.image || replyTo?.productImage, p?.price || replyTo?.productPrice, replyTo?.id); setReplyTo(null); setChatProduct(null); }} onCancelReply={() => setReplyTo(null)} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900"><div className="text-center"><p className="text-5xl mb-4">💬</p><p className="font-medium text-lg text-gray-700 dark:text-gray-300">LUXO Chat</p><p className="text-sm">Select a conversation</p></div></div>
        )}
      </div>
    </div>
  );
}
