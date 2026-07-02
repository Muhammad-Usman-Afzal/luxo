import { Component, type ReactNode } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { ChatProvider } from './context/ChatContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import WishlistPage from './pages/WishlistPage';
import ChatPage from './pages/ChatPage';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProfile from './pages/admin/AdminProfile';
import AdminDashboard from './pages/admin/AdminDashboard';

class TopErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(e: Error) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-8">
          <div className="text-center max-w-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">App Crashed</h1>
            <pre className="text-left bg-gray-200 dark:bg-gray-800 p-4 rounded-xl text-xs overflow-auto max-h-60 mb-4">
              {this.state.error.message}
              {'\n\n'}
              {this.state.error.stack}
            </pre>
            <button onClick={() => window.location.reload()} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <TopErrorBoundary>
      <ThemeProvider>
        <HashRouter>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ProductProvider>
                  <ChatProvider>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductListing />} />
                      <Route path="/category/:slug" element={<ProductListing />} />
                      <Route path="/product/:slug" element={<ProductDetail />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/chat" element={<ChatPage />} />
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/admin/orders" element={<AdminOrders />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/products" element={<AdminProducts />} />
                      <Route path="/admin/users" element={<AdminUsers />} />
                      <Route path="/admin/profile" element={<AdminProfile />} />
                    </Route>
                  </Routes>
                </ChatProvider>
                </ProductProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </HashRouter>
      </ThemeProvider>
    </TopErrorBoundary>
  );
}
