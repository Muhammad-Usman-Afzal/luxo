import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: { fullName: string; email: string; password: string; phone: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null, isAuthenticated: false, isAdmin: false,
  login: async () => ({ success: false, message: 'No provider' }),
  register: async () => ({ success: false, message: 'No provider' }),
  logout: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = sessionStorage.getItem('luxo_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/account/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) return { success: false, message: 'Invalid email or password.' };
      const data = await res.json();
      const userData: User = { id: data.id, fullName: data.fullName, email: data.email, password: '', role: data.role, phone: data.phone, avatar: data.avatar, address: data.address, city: data.city, createdAt: data.createdAt };
      setUser(userData);
      try { sessionStorage.setItem('luxo_user', JSON.stringify(userData)); } catch {}
      return { success: true, message: `Welcome back, ${data.fullName}!` };
    } catch {
      return { success: false, message: 'Server not reachable. Make sure backend is running.' };
    }
  }, []);

  const register = useCallback(async (data: { fullName: string; email: string; password: string; phone: string }) => {
    try {
      const res = await fetch('/api/account/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) { const err = await res.json(); return { success: false, message: err.message || 'Registration failed.' }; }
      const result = await res.json();
      const userData: User = { id: result.id, fullName: result.fullName, email: result.email, password: '', role: result.role, phone: result.phone, avatar: result.avatar || '👤', address: result.address || '', city: result.city || '', createdAt: result.createdAt };
      setUser(userData);
      try { sessionStorage.setItem('luxo_user', JSON.stringify(userData)); } catch {}
      return { success: true, message: 'Account created successfully!' };
    } catch {
      return { success: false, message: 'Server not reachable. Make sure backend is running.' };
    }
  }, []);

  const logout = useCallback(() => { setUser(null); try { sessionStorage.removeItem('luxo_user'); } catch {} }, []);
  const updateProfile = useCallback((data: Partial<User>) => {
    setUser(prev => { if (!prev) return null; const updated = { ...prev, ...data }; try { sessionStorage.setItem('luxo_user', JSON.stringify(updated)); } catch {} return updated; });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin: user?.role === 'admin', login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
