import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, type ReactNode } from 'react';
import type { ChatMessage, ChatContact } from '../types';
import { useAuth } from './AuthContext';

interface ChatContextType {
  contacts: ChatContact[];
  messages: ChatMessage[];
  sendMessage: (content: string, productId?: number | null, productName?: string, productImage?: string, productPrice?: number, quotedMessageId?: number | null, targetId?: number) => Promise<void>;
  markAsSeen: (messageIds: number[]) => Promise<void>;
  getMessagesWithUser: (otherUserId: number) => ChatMessage[];
  setActiveContact: (userId: number | null) => void;
  unreadCount: number;
}

const ChatContext = createContext<ChatContextType>({
  contacts: [], messages: [], sendMessage: async () => {}, markAsSeen: async () => {}, getMessagesWithUser: () => [], setActiveContact: () => {}, unreadCount: 0,
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const activeContactRef = useRef<number | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contactsPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch contacts from backend
  const fetchContacts = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/chat/contacts?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch { /* backend unreachable */ }
  }, [user]);

  // Fetch contacts on mount / user change, then poll every 10s
  useEffect(() => {
    if (!user) { setContacts([]); setMessages([]); return; }
    fetchContacts();
    contactsPollRef.current = setInterval(fetchContacts, 10000);
    return () => { if (contactsPollRef.current) clearInterval(contactsPollRef.current); };
  }, [user, fetchContacts]);

  // Fetch messages between current user and another user
  const fetchMessages = useCallback(async (otherUserId: number) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/chat/messages?userId=${user.id}&otherUserId=${otherUserId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch { /* backend unreachable */ }
  }, [user]);

  const setActiveContact = useCallback((userId: number | null) => {
    activeContactRef.current = userId;
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    if (userId) {
      fetchMessages(userId);
      pollRef.current = setInterval(() => { fetchMessages(userId); fetchContacts(); }, 10000);
    } else {
      setMessages([]);
    }
  }, [fetchMessages, fetchContacts]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (contactsPollRef.current) clearInterval(contactsPollRef.current);
    };
  }, []);

  const sendMessage = useCallback(async (content: string, productId?: number | null, productName?: string, productImage?: string, productPrice?: number, quotedMessageId?: number | null, targetId?: number) => {
    if (!user) return;
    let receiverId = targetId;
    if (!receiverId) {
      if (user.role === 'admin') {
        receiverId = activeContactRef.current;
      } else {
        const adminContact = contacts.find(c => c.userName.toLowerCase().includes('admin') && c.userId !== user.id);
        receiverId = adminContact?.userId ?? null;
      }
    }
    if (!receiverId) return;
    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: user.id, receiverId, content, productId: productId ?? null, quotedMessageId: quotedMessageId ?? null })
      });
      if (res.ok) {
        const newMsg = await res.json();
        setMessages(prev => [...prev, newMsg]);
        fetchContacts();
      }
    } catch { /* backend unreachable */ }
  }, [user, contacts, fetchContacts]);

  const markAsSeen = useCallback(async (messageIds: number[]) => {
    if (!user || messageIds.length === 0) return;
    try {
      await fetch('/api/chat/seen', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageIds })
      });
      setMessages(prev => prev.map(m => messageIds.includes(m.id) ? { ...m, status: 'seen' as const } : m));
    } catch { /* backend unreachable */ }
  }, [user]);

  const getMessagesWithUser = useCallback((otherId: number) => {
    if (!user) return [];
    return messages.filter(m =>
      (m.senderId === user.id && m.receiverId === otherId) || (m.senderId === otherId && m.receiverId === user.id)
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [messages, user]);

  const unreadCount = useMemo(() => contacts.reduce((s, c) => s + c.unreadCount, 0), [contacts]);

  return (
    <ChatContext.Provider value={{ contacts, messages, sendMessage, markAsSeen, getMessagesWithUser, setActiveContact, unreadCount }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() { return useContext(ChatContext); }
