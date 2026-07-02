// ============================================================
// TypeScript Interfaces — DarazClone E-Commerce
// ============================================================

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string; // simulated
  role: 'admin' | 'user';
  phone: string;
  avatar: string;
  address: string;
  city: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
  parentId: number | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  categoryId: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sizes: string[]; // for clothing
  colors: string[];
  deliveryDays: number;
  freeShipping: boolean;
  featured: boolean;
  createdAt: string;
  specifications: Record<string, string>;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  deliveredAt: string | null;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  productId: number | null;
  productName?: string;
  productImage?: string;
  productPrice?: number;
  content: string;
  quotedMessageId: number | null;
  quotedMessage?: ChatMessage | null;
  status: 'sent' | 'delivered' | 'seen';
  createdAt: string;
}

// Helper for nullable product fields on quoted messages
export type ChatMessageInput = Omit<ChatMessage, 'productId' | 'quotedMessage'> & {
  productId?: number | null;
  quotedMessage?: ChatMessage | null;
};

export interface ChatContact {
  userId: number;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

// ViewModels (simulating what .NET backend would return)
export interface ProductViewModel {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  categories: Category[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductDetailViewModel {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
  averageRating: number;
}

export interface CheckoutViewModel {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  userAddresses: string[];
}

export interface UserDashboardViewModel {
  user: User;
  recentOrders: Order[];
  wishlistCount: number;
  cartCount: number;
  totalOrders: number;
}

export interface AdminDashboardViewModel {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: Product[];
  salesChart: { month: string; sales: number }[];
  orderStatusDistribution: { status: string; count: number }[];
}
