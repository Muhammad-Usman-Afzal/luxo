// ============================================================
// Mock Data — Simulates SQL Server Database with Seed Data
// ============================================================

import type { Product, Category, User, Order, Review, ChatMessage, CartItem, AdminDashboardViewModel } from '../types';

// ---------- USERS ----------
export const users: User[] = [
  { id: 1, fullName: 'Admin User', email: 'admin@luxo.pk', password: 'admin123', role: 'admin', phone: '+92-300-1111111', avatar: '👑', address: '123 Admin Street, Islamabad', city: 'Islamabad', createdAt: '2025-01-01' },
  { id: 2, fullName: 'Ahmed Khan', email: 'ahmed@email.com', password: 'user123', role: 'user', phone: '+92-300-2222222', avatar: '👨', address: '456 Main Road, Lahore', city: 'Lahore', createdAt: '2025-02-15' },
  { id: 3, fullName: 'Fatima Ali', email: 'fatima@email.com', password: 'user123', role: 'user', phone: '+92-300-3333333', avatar: '👩', address: '789 Park Avenue, Karachi', city: 'Karachi', createdAt: '2025-03-10' },
  { id: 4, fullName: 'Ali Hassan', email: 'ali@email.com', password: 'user123', role: 'user', phone: '+92-300-4444444', avatar: '🧑', address: '321 Canal Road, Faisalabad', city: 'Faisalabad', createdAt: '2025-04-20' },
  { id: 5, fullName: 'Sana Malik', email: 'sana@email.com', password: 'user123', role: 'user', phone: '+92-301-5555555', avatar: '👩‍🦰', address: '12 Model Town', city: 'Lahore', createdAt: '2025-05-10' },
  { id: 6, fullName: 'Usman Ghani', email: 'usman@email.com', password: 'user123', role: 'user', phone: '+92-302-6666666', avatar: '👨‍🦱', address: '55 Clifton Road', city: 'Karachi', createdAt: '2025-05-15' },
  { id: 7, fullName: 'Zainab Bibi', email: 'zainab@email.com', password: 'user123', role: 'user', phone: '+92-303-7777777', avatar: '👩‍🦳', address: '78 GT Road', city: 'Rawalpindi', createdAt: '2025-06-01' },
  { id: 8, fullName: 'Bilal Ahmed', email: 'bilal@email.com', password: 'user123', role: 'user', phone: '+92-304-8888888', avatar: '👨‍💼', address: '90 University Road', city: 'Peshawar', createdAt: '2025-06-12' },
  { id: 9, fullName: 'Ayesha Khan', email: 'ayesha@email.com', password: 'user123', role: 'user', phone: '+92-305-9999999', avatar: '👩‍🎓', address: '23 B-Block', city: 'Multan', createdAt: '2025-06-20' },
  { id: 10, fullName: 'Kamran Abbas', email: 'kamran@email.com', password: 'user123', role: 'user', phone: '+92-306-1010101', avatar: '🧔', address: '67 Peoples Colony', city: 'Faisalabad', createdAt: '2025-07-05' },
  { id: 11, fullName: 'Nadia Hussain', email: 'nadia@email.com', password: 'user123', role: 'user', phone: '+92-307-1112111', avatar: '👩‍🦱', address: '34 Garden Town', city: 'Lahore', createdAt: '2025-07-18' },
  { id: 12, fullName: 'Tariq Mehmood', email: 'tariq@email.com', password: 'user123', role: 'user', phone: '+92-308-1212121', avatar: '👨‍🦳', address: '12 Satellite Town', city: 'Rawalpindi', createdAt: '2025-08-02' },
  { id: 13, fullName: 'Rabia Anjum', email: 'rabia@email.com', password: 'user123', role: 'user', phone: '+92-309-1313131', avatar: '👧', address: '88 Defence Phase 2', city: 'Islamabad', createdAt: '2025-08-15' },
  { id: 14, fullName: 'Imran Ali', email: 'imran@email.com', password: 'user123', role: 'user', phone: '+92-310-1414141', avatar: '👨‍🔧', address: '45 Sadder Bazaar', city: 'Quetta', createdAt: '2025-09-01' },
  { id: 15, fullName: 'Hina Parveen', email: 'hina@email.com', password: 'user123', role: 'user', phone: '+92-311-1515151', avatar: '👩‍🍳', address: '92 Wapda Town', city: 'Lahore', createdAt: '2025-09-10' },
  { id: 16, fullName: 'Shahid Iqbal', email: 'shahid@email.com', password: 'user123', role: 'user', phone: '+92-312-1616161', avatar: '👨‍🌾', address: '33 Small Industries', city: 'Gujranwala', createdAt: '2025-09-25' },
  { id: 17, fullName: 'Mariam Javed', email: 'mariam@email.com', password: 'user123', role: 'user', phone: '+92-313-1717171', avatar: '👩‍💻', address: '76 Lake Road', city: 'Hyderabad', createdAt: '2025-10-05' },
  { id: 18, fullName: 'Fahad Riaz', email: 'fahad@email.com', password: 'user123', role: 'user', phone: '+92-314-1818181', avatar: '👨‍🎤', address: '21 Civil Lines', city: 'Sialkot', createdAt: '2025-10-18' },
  { id: 19, fullName: 'Sumbal Akhtar', email: 'sumbal@email.com', password: 'user123', role: 'user', phone: '+92-315-1919191', avatar: '👩‍🏫', address: '58 Shahrah-e-Faisal', city: 'Karachi', createdAt: '2025-11-01' },
  { id: 20, fullName: 'Naveed Butt', email: 'naveed@email.com', password: 'user123', role: 'user', phone: '+92-316-2020202', avatar: '👨‍💼', address: '14 Muslim Town', city: 'Lahore', createdAt: '2025-11-15' },
];

// ---------- CATEGORIES ----------
export const categories: Category[] = [
  { id: 1, name: 'Electronics', slug: 'electronics', icon: '📱', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop', parentId: null },
  { id: 2, name: 'Fashion', slug: 'fashion', icon: '👗', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop', parentId: null },
  { id: 3, name: 'Home & Living', slug: 'home-living', icon: '🏠', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop', parentId: null },
  { id: 4, name: 'Sports & Outdoors', slug: 'sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8cf1a5?w=400&h=300&fit=crop', parentId: null },
  { id: 5, name: 'Beauty & Health', slug: 'beauty', icon: '💄', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop', parentId: null },
  { id: 6, name: 'Groceries', slug: 'groceries', icon: '🛒', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop', parentId: null },
  { id: 7, name: 'Mobile Phones', slug: 'mobile-phones', icon: '📲', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', parentId: 1 },
  { id: 8, name: 'Men\'s Clothing', slug: 'mens-clothing', icon: '👔', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=300&fit=crop', parentId: 2 },
  { id: 9, name: 'Women\'s Clothing', slug: 'womens-clothing', icon: '👚', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3bb0?w=400&h=300&fit=crop', parentId: 2 },
];

// ---------- PRODUCTS ----------
export const products: Product[] = [
  {
    id: 1, name: 'Samsung Galaxy S25 Ultra', slug: 'samsung-galaxy-s25-ultra',
    description: 'The ultimate Galaxy experience with AI-powered camera, S Pen, and stunning titanium design. Features a 200MP camera, 6.8" Dynamic AMOLED display, and 5000mAh battery.',
    price: 349999, originalPrice: 399999, discount: 13, images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606041011872-596597976b25?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
    ],
    categoryId: 7, category: 'Mobile Phones', brand: 'Samsung', rating: 4.7, reviewCount: 2340, stock: 45,
    sizes: [], colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet'],
    deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-06-01',
    specifications: { 'Display': '6.8" Dynamic AMOLED 2X', 'Processor': 'Snapdragon 8 Gen 4', 'RAM': '12GB', 'Storage': '256GB', 'Camera': '200MP + 50MP + 50MP + 12MP', 'Battery': '5000mAh' }
  },
  {
    id: 2, name: 'iPhone 16 Pro Max', slug: 'iphone-16-pro-max',
    description: 'Apple\'s most powerful iPhone with A18 Pro chip, 48MP Fusion camera, and titanium design. Delivers extraordinary performance and all-day battery life.',
    price: 459999, originalPrice: 479999, discount: 4, images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop',
    ],
    categoryId: 7, category: 'Mobile Phones', brand: 'Apple', rating: 4.8, reviewCount: 1890, stock: 20,
    sizes: [], colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium'],
    deliveryDays: 5, freeShipping: true, featured: true, createdAt: '2025-05-20',
    specifications: { 'Display': '6.9" Super Retina XDR', 'Processor': 'A18 Pro', 'RAM': '8GB', 'Storage': '256GB', 'Camera': '48MP Fusion', 'Battery': '4685mAh' }
  },
  {
    id: 3, name: 'Men\'s Premium Cotton Kurta Shalwar', slug: 'mens-cotton-kurta-shalwar',
    description: 'Elegant hand-stitched cotton kurta shalwar perfect for Eid and formal occasions. Made from 100% pure cotton with intricate embroidery.',
    price: 4999, originalPrice: 7999, discount: 38, images: [
      'https://images.unsplash.com/photo-1617952236317-0dc127c1fb09?w=600&h=600&fit=crop',
    ],
    categoryId: 99, category: 'REMOVED', brand: 'Khaadi', rating: 4.3, reviewCount: 567, stock: 0,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['White', 'Black', 'Navy Blue'],
    deliveryDays: 4, freeShipping: false, featured: false, createdAt: '2025-06-10',
    specifications: { 'Fabric': '100% Cotton', 'Style': 'Traditional', 'Occasion': 'Eid, Formal', 'Care': 'Machine Wash' }
  },
  {
    id: 4, name: 'XX DELETED Lawn Suit', slug: 'womens-lawn-suit',
    description: 'Beautiful lawn printed 3-piece suit with embroidered neckline. Includes shirt, trouser, and dupatta. Perfect for summer.',
    price: 3499, originalPrice: 5499, discount: 36, images: [
      'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?w=600&h=600&fit=crop',
    ],
    categoryId: 9, category: 'Women\'s Clothing', brand: 'Gul Ahmed DEL', rating: 4.5, reviewCount: 890, stock: 0,
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Green', 'Pink', 'Blue', 'Yellow'],
    deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-06-15',
    specifications: { 'Fabric': 'Premium Lawn', 'Pieces': '3 (Shirt+Trouser+Dupatta)', 'Season': 'Summer', 'Care': 'Machine Wash' }
  },
  {
    id: 5, name: 'Sony WH-1000XM6 Wireless Headphones', slug: 'sony-wh1000xm6',
    description: 'Industry-leading noise cancellation with premium sound quality. 40-hour battery life and multipoint connection.',
    price: 54999, originalPrice: 69999, discount: 21, images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    ],
    categoryId: 1, category: 'Electronics', brand: 'Sony', rating: 4.6, reviewCount: 1320, stock: 75,
    sizes: [], colors: ['Black', 'Silver', 'Midnight Blue'],
    deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-04-10',
    specifications: { 'Type': 'Over-Ear', 'Connectivity': 'Bluetooth 5.3', 'Battery': '40 Hours', 'ANC': 'Yes' }
  },
  {
    id: 6, name: 'MacBook Air M3 15-inch', slug: 'macbook-air-m3',
    description: 'Supercharged by M3 chip. Strikingly thin 15.3-inch Liquid Retina display. Up to 18 hours of battery life.',
    price: 289999, originalPrice: 299999, discount: 3, images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    ],
    categoryId: 1, category: 'Electronics', brand: 'Apple', rating: 4.9, reviewCount: 890, stock: 15,
    sizes: [], colors: ['Midnight', 'Starlight', 'Space Gray'],
    deliveryDays: 5, freeShipping: true, featured: true, createdAt: '2025-03-15',
    specifications: { 'Display': '15.3" Liquid Retina', 'Chip': 'M3', 'RAM': '16GB', 'Storage': '512GB SSD' }
  },
  {
    id: 7, name: 'Nike Air Max 270 React', slug: 'nike-air-max-270',
    description: 'Comfortable lifestyle sneakers with Max Air unit and React foam. Breathable mesh upper for all-day wear.',
    price: 24999, originalPrice: 32999, discount: 24, images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    ],
    categoryId: 4, category: 'Sports & Outdoors', brand: 'Nike', rating: 4.4, reviewCount: 2100, stock: 90,
    sizes: ['7', '8', '9', '10', '11', '12'], colors: ['White/Red', 'Black/White', 'Blue/Orange'],
    deliveryDays: 4, freeShipping: false, featured: false, createdAt: '2025-05-01',
    specifications: { 'Type': 'Lifestyle', 'Upper': 'Mesh', 'Sole': 'React Foam', 'Closure': 'Lace-Up' }
  },

  {
    id: 9, name: 'L\'Oreal Paris Revitalift Serum', slug: 'loreal-revitalift-serum',
    description: 'Anti-aging face serum with 1.5% pure hyaluronic acid. Visibly reduces wrinkles and improves skin texture.',
    price: 2999, originalPrice: 4499, discount: 33, images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
    ],
    categoryId: 5, category: 'Beauty & Health', brand: 'L\'Oreal', rating: 4.2, reviewCount: 780, stock: 300,
    sizes: [], colors: [],
    deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-06-05',
    specifications: { 'Volume': '30ml', 'Key Ingredient': 'Hyaluronic Acid', 'Skin Type': 'All', 'SPF': 'None' }
  },
  {
    id: 10, name: 'Organic Basmati Rice 5kg', slug: 'organic-basmati-rice',
    description: 'Premium quality organic basmati rice. Aromatic long-grain rice perfect for biryani and pulao.',
    price: 1499, originalPrice: 1999, discount: 25, images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop',
    ],
    categoryId: 6, category: 'Groceries', brand: 'Organic Farm', rating: 4.1, reviewCount: 234, stock: 500,
    sizes: [], colors: [],
    deliveryDays: 1, freeShipping: false, featured: false, createdAt: '2025-06-18',
    specifications: { 'Weight': '5kg', 'Type': 'Long Grain', 'Origin': 'Pakistan', 'Organic': 'Yes' }
  },
  {
    id: 11, name: 'Samsung 55" QLED 4K Smart TV', slug: 'samsung-qled-55-smart-tv',
    description: 'Stunning 4K resolution with Quantum Dot technology. Smart TV with built-in streaming apps and voice assistant.',
    price: 219999, originalPrice: 259999, discount: 15, images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
    ],
    categoryId: 1, category: 'Electronics', brand: 'Samsung', rating: 4.5, reviewCount: 678, stock: 12,
    sizes: [], colors: ['Black'],
    deliveryDays: 5, freeShipping: true, featured: false, createdAt: '2025-04-25',
    specifications: { 'Display': '55" QLED 4K', 'HDR': 'HDR10+', 'Smart': 'Tizen OS', 'HDMI': '4 Ports' }
  },
  {
    id: 12, name: 'Leather Office Chair Ergonomic', slug: 'leather-office-chair-old',
    description: 'High-back ergonomic office chair with genuine leather, adjustable lumbar support, and 360° swivel.',
    price: 34999, originalPrice: 44999, discount: 22, images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop',
    ],
    categoryId: 99, category: 'REMOVED', brand: 'HomeStyle OLD', rating: 4.3, reviewCount: 345, stock: 25,
    sizes: [], colors: ['Black', 'Brown', 'Tan'],
    deliveryDays: 6, freeShipping: false, featured: false, createdAt: '2025-05-10',
    specifications: { 'Material': 'Velvet', 'Style': 'Modern', 'Size': '3-Seater', 'Warranty': '5 Years' }
  },
  {
    id: 13, name: 'Yoga Mat Premium 6mm', slug: 'yoga-mat-premium',
    description: 'Non-slip TPE yoga mat with carrying strap. Eco-friendly, double-sided, perfect for yoga and pilates.',
    price: 2499, originalPrice: 3999, discount: 38, images: [
      'https://images.unsplash.com/photo-1616699002805-96b1e12e02cf?w=600&h=600&fit=crop',
    ],
    categoryId: 4, category: 'Sports & Outdoors', brand: 'FitPro', rating: 4.0, reviewCount: 567, stock: 0,
    sizes: [], colors: ['Purple', 'Blue', 'Green', 'Pink'],
    deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-06-08',
    specifications: { 'Thickness': '6mm', 'Material': 'TPE', 'Length': '183cm', 'Width': '61cm' }
  },
  {
    id: 14, name: 'Casio G-Shock Digital Watch', slug: 'casio-g-shock-watch',
    description: 'Rugged digital watch with shock resistance, 200M water resistance, and world time. LED backlight.',
    price: 14999, originalPrice: 18999, discount: 21, images: [
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop',
    ],
    categoryId: 1, category: 'Electronics', brand: 'Casio', rating: 4.6, reviewCount: 1230, stock: 65,
    sizes: [], colors: ['Black', 'Military Green', 'Gray'],
    deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-04-05',
    specifications: { 'Water Resistance': '200M', 'Display': 'Digital', 'Battery': '2 Years', 'Feature': 'Stopwatch + Alarm' }
  },
  {
    id: 15, name: 'Men\'s Denim Jeans Slim Fit', slug: 'mens-denim-jeans-slim',
    description: 'Classic slim-fit denim jeans with stretch. Comfortable all-day wear with modern styling.',
    price: 2999, originalPrice: 4999, discount: 40, images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop',
    ],
    categoryId: 8, category: 'Men\'s Clothing', brand: 'Levi\'s', rating: 4.4, reviewCount: 890, stock: 180,
    sizes: ['28', '30', '32', '34', '36', '38'], colors: ['Dark Blue', 'Light Blue', 'Black'],
    deliveryDays: 3, freeShipping: false, featured: false, createdAt: '2025-05-22',
    specifications: { 'Fit': 'Slim', 'Fabric': '98% Cotton 2% Elastane', 'Rise': 'Mid', 'Care': 'Machine Wash' }
  },
  {
    id: 16, name: 'XX DELETED Instant Pot', slug: 'xx-removed-instant-pot',
    description: '9-in-1 electric pressure cooker: pressure cook, slow cook, rice cooker, steamer, sauté, yogurt maker, warmer, sterilizer.',
    price: 24999, originalPrice: 31999, discount: 22, images: [
      'https://images.unsplash.com/photo-1585653621032-a5f5e4e1411d?w=600&h=600&fit=crop',
    ],
    categoryId: 99, category: 'REMOVED', brand: 'Instant Pot DELETED', rating: 0, reviewCount: 0, stock: 0,
    sizes: [], colors: ['Stainless Steel'],
    deliveryDays: 4, freeShipping: false, featured: false, createdAt: '2025-03-01',
    specifications: { 'Capacity': '6 Liters', 'Functions': '9-in-1', 'Power': '1000W', 'Material': 'Stainless Steel' }
  },
  {
    id: 17, name: 'Himalayan Pink Salt Lamp', slug: 'removed-salt-lamp',
    description: 'Natural Himalayan pink salt lamp with dimmable wooden base. Creates warm ambient light and purifies air.',
    price: 1999, originalPrice: 3499, discount: 43, images: [
      'https://images.unsplash.com/photo-1604427336494-8c60ff4d5297?w=600&h=600&fit=crop',
    ],
    categoryId: 99, category: 'REMOVED', brand: 'Nature REMOVED', rating: 4.2, reviewCount: 456, stock: 0,
    sizes: [], colors: [],
    deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-06-12',
    specifications: { 'Weight': '2-3kg', 'Material': 'Himalayan Salt', 'Base': 'Wooden', 'Dimmable': 'Yes' }
  },
  {
    id: 18, name: 'Maybelline Fit Me Foundation', slug: 'maybelline-fit-me-foundation',
    description: 'Matte + poreless foundation for normal to oily skin. Blurs pores and controls shine for a natural look.',
    price: 1999, originalPrice: 2799, discount: 29, images: [
      'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop',
    ],
    categoryId: 5, category: 'Beauty & Health', brand: 'Maybelline', rating: 4.3, reviewCount: 1567, stock: 250,
    sizes: [], colors: ['Ivory', 'Sand', 'Natural Beige', 'Honey'],
    deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-05-30',
    specifications: { 'Volume': '30ml', 'Finish': 'Matte', 'SPF': '18', 'Skin Type': 'Normal to Oily' }
  },
  {
    id: 19, name: 'Dell Inspiron 15 Laptop', slug: 'dell-inspiron-15',
    description: 'Versatile 15.6" laptop with Intel Core i7, 16GB RAM, 512GB SSD. Perfect for work, study, and entertainment.',
    price: 129999, originalPrice: 149999, discount: 13, images: [
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop',
    ],
    categoryId: 1, category: 'Electronics', brand: 'Dell', rating: 4.4, reviewCount: 567, stock: 20,
    sizes: [], colors: ['Silver', 'Black'],
    deliveryDays: 4, freeShipping: true, featured: false, createdAt: '2025-04-15',
    specifications: { 'Display': '15.6" FHD', 'Processor': 'Intel Core i7-1355U', 'RAM': '16GB', 'Storage': '512GB SSD' }
  },
  {
    id: 20, name: 'Wheat Flour Chakki Atta 10kg', slug: 'chakki-atta-10kg',
    description: 'Freshly ground whole wheat flour. 100% pure chakki atta perfect for chapatis and rotis.',
    price: 1299, originalPrice: 1599, discount: 19, images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop',
    ],
    categoryId: 6, category: 'Groceries', brand: 'Bake Parlor', rating: 4.0, reviewCount: 345, stock: 800,
    sizes: [], colors: [],
    deliveryDays: 1, freeShipping: false, featured: false, createdAt: '2025-06-20',
    specifications: { 'Weight': '10kg', 'Type': 'Whole Wheat', 'Origin': 'Pakistan', 'Shelf Life': '6 Months' }
  },


  { id: 22, name: 'Google Pixel 9 Pro', slug: 'google-pixel-9-pro', description: 'Pure Android with AI camera. Tensor G4 chip.', price: 189999, originalPrice: 209999, discount: 10, images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop'], categoryId: 7, category: 'Mobile Phones', brand: 'Google', rating: 4.6, reviewCount: 670, stock: 28, sizes: [], colors: ['Porcelain','Obsidian'], deliveryDays: 4, freeShipping: true, featured: false, createdAt: '2025-07-05', specifications: { 'Display': '6.7" LTPO OLED', 'Chip': 'Tensor G4', 'Camera': '50MP' } },
  { id: 23, name: 'Xiaomi 15 Ultra', slug: 'xiaomi-15-ultra', description: '200MP Leica camera, Snapdragon 8 Gen 4, 5300mAh battery.', price: 159999, originalPrice: 179999, discount: 11, images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop'], categoryId: 7, category: 'Mobile Phones', brand: 'Xiaomi', rating: 4.4, reviewCount: 560, stock: 50, sizes: [], colors: ['Black','White'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-07-08', specifications: { 'Camera': '200MP Leica', 'Battery': '5300mAh', 'Charging': '120W' } },
  { id: 25, name: 'Wool Blend Waistcoat', slug: 'wool-blend-waistcoat', description: 'Elegant wool blend waistcoat for weddings and formal events.', price: 6999, originalPrice: 9999, discount: 30, images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: 'Amir Adnan', rating: 4.5, reviewCount: 234, stock: 60, sizes: ['M','L','XL','XXL'], colors: ['Black','Navy','Maroon'], deliveryDays: 5, freeShipping: true, featured: true, createdAt: '2025-07-10', specifications: { 'Fabric': 'Wool Blend', 'Style': 'Formal', 'Care': 'Dry Clean Only' } },
  { id: 26, name: "Men's Casual Polo Shirt", slug: 'mens-casual-polo-shirt', description: 'Classic pique cotton polo with ribbed collar.', price: 2499, originalPrice: 3999, discount: 38, images: ['https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: 'Polo', rating: 4.3, reviewCount: 678, stock: 200, sizes: ['S','M','L','XL','XXL'], colors: ['Navy','White','Red','Green'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-05', specifications: { 'Fabric': 'Pique Cotton', 'Fit': 'Regular' } },
  { id: 28, name: "Women's Cotton Kurti", slug: 'womens-cotton-kurti', description: 'Stylish straight-cut cotton kurti with digital print.', price: 1999, originalPrice: 3499, discount: 43, images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Limelight', rating: 4.2, reviewCount: 567, stock: 250, sizes: ['XS','S','M','L','XL'], colors: ['Yellow','Blue','Pink','White'], deliveryDays: 2, freeShipping: false, featured: false, createdAt: '2025-07-03', specifications: { 'Fabric': '100% Cotton', 'Style': 'Straight Cut' } },
  { id: 29, name: 'Party Wear Silk Dress', slug: 'party-wear-silk-dress', description: 'Luxurious silk dress with intricate embellishments.', price: 8999, originalPrice: 14999, discount: 40, images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Maria B', rating: 4.7, reviewCount: 456, stock: 40, sizes: ['S','M','L'], colors: ['Red','Gold','Black'], deliveryDays: 5, freeShipping: true, featured: true, createdAt: '2025-07-12', specifications: { 'Fabric': 'Silk', 'Style': 'Party Wear', 'Care': 'Dry Clean Only' } },
  { id: 30, name: "REMOVED Denim Jacket", slug: 'womens-denim-jacket', description: 'Trendy oversized denim jacket for casual layering.', price: 4499, originalPrice: 6999, discount: 36, images: ['https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=600&h=600&fit=crop'], categoryId: 99, category: "REMOVED", brand: 'Outfitters', rating: 4.3, reviewCount: 234, stock: 0, sizes: ['S','M','L','XL'], colors: ['Light Blue','Dark Blue','Black'], deliveryDays: 3, freeShipping: false, featured: false, createdAt: '2025-07-06', specifications: { 'Fabric': 'Denim', 'Style': 'Oversized' } },
  { id: 31, name: 'Adidas Running Shoes', slug: 'adidas-running-shoes', description: 'Lightweight running shoes with Boost cushioning.', price: 19999, originalPrice: 27999, discount: 29, images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop'], categoryId: 4, category: 'Sports & Outdoors', brand: 'Adidas', rating: 4.5, reviewCount: 1567, stock: 80, sizes: ['7','8','9','10','11'], colors: ['Core Black','Cloud White','Grey'], deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-07-09', specifications: { 'Type': 'Running', 'Sole': 'Boost', 'Weight': '280g' } },
  { id: 32, name: 'Dumbbell Set 20kg', slug: 'dumbbell-set-20kg', description: 'Adjustable dumbbell set with foam grip. 2 x 10kg plates.', price: 8999, originalPrice: 12999, discount: 31, images: ['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop'], categoryId: 4, category: 'Sports & Outdoors', brand: 'FitPro', rating: 4.3, reviewCount: 890, stock: 55, sizes: [], colors: [], deliveryDays: 4, freeShipping: false, featured: false, createdAt: '2025-07-04', specifications: { 'Weight': '20kg Total', 'Type': 'Adjustable', 'Grip': 'Foam' } },
  { id: 33, name: 'Mountain Bike 26"', slug: 'mountain-bike-26', description: '27-speed mountain bike with dual disc brakes.', price: 49999, originalPrice: 69999, discount: 29, images: ['https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&h=600&fit=crop'], categoryId: 4, category: 'Sports & Outdoors', brand: 'Atlas', rating: 4.4, reviewCount: 345, stock: 15, sizes: [], colors: ['Black/Red','Blue/White'], deliveryDays: 7, freeShipping: false, featured: false, createdAt: '2025-07-11', specifications: { 'Wheel': '26"', 'Gears': '27 Speed', 'Brakes': 'Dual Disc' } },
  { id: 34, name: 'King Size Bed Sheet Set', slug: 'king-size-bed-sheet-set-old', description: 'REMOVED', price: 0, originalPrice: 0, discount: 0, images: [''], categoryId: 99, category: 'Home & Living', brand: 'ChenOne', rating: 4.5, reviewCount: 678, stock: 0, sizes: [], colors: ['White','Beige','Grey','Blue'], deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-07-07', specifications: { 'Size': 'King', 'Thread Count': '300 TC', 'Pieces': '3' } },
  { id: 35, name: 'The Ordinary Niacinamide Serum', slug: 'the-ordinary-niacinamide', description: '10% Niacinamide + 1% Zinc. Reduces blemishes.', price: 3499, originalPrice: 4999, discount: 30, images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: 'The Ordinary', rating: 4.6, reviewCount: 2340, stock: 150, sizes: [], colors: [], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-01', specifications: { 'Volume': '30ml', 'Key Ingredient': 'Niacinamide 10% + Zinc 1%', 'Vegan': 'Yes' } },
  { id: 36, name: 'Vitamin C Face Cream', slug: 'vitamin-c-face-cream', description: 'Brightening face cream with 20% Vitamin C.', price: 1999, originalPrice: 3499, discount: 43, images: ['https://images.unsplash.com/photo-1570194065650-d99fb4b88cc1?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: 'Ponds', rating: 4.2, reviewCount: 890, stock: 300, sizes: [], colors: [], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-05', specifications: { 'Volume': '50ml', 'Key Ingredient': '20% Vitamin C', 'SPF': '15' } },
  { id: 37, name: 'Argan Oil Hair Repair', slug: 'argan-oil-hair-repair', description: 'Moroccan argan oil treatment for damaged hair.', price: 2499, originalPrice: 3999, discount: 38, images: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: "L'Oreal", rating: 4.4, reviewCount: 567, stock: 180, sizes: [], colors: [], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-09', specifications: { 'Volume': '100ml', 'Key Ingredient': 'Argan Oil', 'Paraben Free': 'Yes' } },
  { id: 38, name: 'Green Tea 100 Bags', slug: 'green-tea-100-bags', description: 'Pure green tea bags rich in antioxidants.', price: 899, originalPrice: 1299, discount: 31, images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop'], categoryId: 6, category: 'Groceries', brand: 'Lipton', rating: 4.3, reviewCount: 567, stock: 400, sizes: [], colors: [], deliveryDays: 1, freeShipping: false, featured: false, createdAt: '2025-07-02', specifications: { 'Count': '100 Bags', 'Type': 'Pure Green Tea', 'Origin': 'China' } },
  { id: 39, name: 'Cooking Oil 5 Litre', slug: 'cooking-oil-5-litre', description: 'Premium cooking oil. Cholesterol free, rich in Vitamin A, D & E.', price: 2999, originalPrice: 3499, discount: 14, images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop'], categoryId: 6, category: 'Groceries', brand: 'Sufi', rating: 4.1, reviewCount: 890, stock: 500, sizes: [], colors: [], deliveryDays: 1, freeShipping: false, featured: false, createdAt: '2025-07-06', specifications: { 'Volume': '5 Litres', 'Cholesterol': 'Free', 'Vitamins': 'A, D, E' } },
  { id: 40, name: 'Mixed Dry Fruits Gift Box', slug: 'mixed-dry-fruits-gift-box', description: 'Premium mixed dry fruits: almonds, cashews, pistachios, walnuts & raisins.', price: 3499, originalPrice: 4999, discount: 30, images: ['https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=600&fit=crop'], categoryId: 6, category: 'Groceries', brand: 'Nutty Affair', rating: 4.5, reviewCount: 234, stock: 80, sizes: [], colors: [], deliveryDays: 2, freeShipping: true, featured: true, createdAt: '2025-07-10', specifications: { 'Weight': '1kg', 'Contents': 'Almonds, Cashews, Pistachios, Walnuts, Raisins', 'Packaging': 'Gift Box' } },
  // ═══ Samsung (+3) ═══
  { id: 41, name: 'Samsung Galaxy Tab S10', slug: 'samsung-galaxy-tab-s10', description: '12.4" Dynamic AMOLED 2X display, S Pen included, IP68 water resistant.', price: 159999, originalPrice: 179999, discount: 11, images: ['https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Samsung', rating: 4.5, reviewCount: 890, stock: 30, sizes: [], colors: ['Graphite','Silver'], deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-07-15', specifications: { 'Display': '12.4" AMOLED', 'RAM': '12GB', 'Storage': '256GB', 'Battery': '10090mAh' } },
  { id: 42, name: 'Samsung Galaxy Watch 7', slug: 'samsung-galaxy-watch-7', description: 'Advanced health tracking with BioActive sensor, sleep coaching, and 40hr battery.', price: 49999, originalPrice: 59999, discount: 17, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Samsung', rating: 4.3, reviewCount: 567, stock: 50, sizes: [], colors: ['Black','Silver'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-16', specifications: { 'Display': '1.5" Super AMOLED', 'Battery': '40hr', 'Water': '5ATM', 'Sensor': 'BioActive' } },
  { id: 43, name: 'Samsung Galaxy Buds 3 Pro', slug: 'samsung-galaxy-buds-3-pro', description: 'Premium ANC earbuds with 360 sound, IP57 water resistance, 30hr battery.', price: 34999, originalPrice: 44999, discount: 22, images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Samsung', rating: 4.4, reviewCount: 780, stock: 80, sizes: [], colors: ['White','Black'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-17', specifications: { 'ANC': 'Yes', 'Battery': '30hr', 'Water': 'IP57', 'Codec': 'Hi-Fi 24bit' } },
  // ═══ Apple (+3) ═══
  { id: 44, name: 'Apple iPad Air M2', slug: 'xx-deleted-ipad', description: 'DELETED', price: 0, originalPrice: 0, discount: 0, images: [''], categoryId: 99, category: 'REMOVED', brand: 'Apple DEL', rating: 0, reviewCount: 0, stock: 0, sizes: [], colors: [], deliveryDays: 0, freeShipping: false, featured: false, createdAt: '2020-01-01', specifications: {} },
  { id: 45, name: 'Apple Watch Ultra 2', slug: 'apple-watch-ultra-2', description: '49mm titanium case, precision dual-frequency GPS, 100m water resistance.', price: 219999, originalPrice: 239999, discount: 8, images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Apple', rating: 4.9, reviewCount: 890, stock: 18, sizes: [], colors: ['Titanium','Black Titanium'], deliveryDays: 5, freeShipping: true, featured: true, createdAt: '2025-07-19', specifications: { 'Display': '49mm', 'Chip': 'S9', 'Battery': '36hr', 'Water': '100m' } },
  { id: 46, name: 'Apple AirPods Pro 3', slug: 'apple-airpods-pro-3', description: 'Adaptive audio, USB-C, MagSafe charging, up to 2x more ANC than previous gen.', price: 59999, originalPrice: 69999, discount: 14, images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Apple', rating: 4.7, reviewCount: 2100, stock: 60, sizes: [], colors: ['White'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-20', specifications: { 'ANC': 'Yes', 'Battery': '6hr', 'Charging': 'USB-C + MagSafe', 'Chip': 'H2' } },
  // ═══ Sony (+4) ═══
  { id: 47, name: 'Sony PlayStation 5 Slim', slug: 'sony-ps5-slim', description: 'PS5 Slim with 1TB SSD, ray tracing, 4K gaming, DualSense wireless controller.', price: 149999, originalPrice: 169999, discount: 12, images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Sony', rating: 4.9, reviewCount: 3400, stock: 22, sizes: [], colors: ['White'], deliveryDays: 5, freeShipping: false, featured: true, createdAt: '2025-07-21', specifications: { 'Storage': '1TB SSD', 'Resolution': '4K', 'FPS': '120', 'Controller': 'DualSense' } },
  { id: 48, name: 'Sony Bravia 65" OLED', slug: 'sony-bravia-65-oled', description: '65" 4K OLED with Google TV, Dolby Vision Atmos, 120Hz refresh rate.', price: 349999, originalPrice: 399999, discount: 13, images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Sony', rating: 4.7, reviewCount: 567, stock: 10, sizes: [], colors: ['Black'], deliveryDays: 7, freeShipping: false, featured: false, createdAt: '2025-07-22', specifications: { 'Display': '65" OLED 4K', 'HDR': 'Dolby Vision', 'Refresh': '120Hz', 'Smart': 'Google TV' } },
  { id: 49, name: 'Sony Alpha ZV-E10 Camera', slug: 'sony-alpha-zv-e10', description: 'Vlog camera with 24.2MP APS-C sensor, 4K video, flip screen, product showcase mode.', price: 129999, originalPrice: 149999, discount: 13, images: ['https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Sony', rating: 4.6, reviewCount: 890, stock: 20, sizes: [], colors: ['Black','White'], deliveryDays: 4, freeShipping: true, featured: false, createdAt: '2025-07-23', specifications: { 'Sensor': '24.2MP APS-C', 'Video': '4K 30fps', 'Screen': 'Flip Touch', 'Mic': 'Directional 3-capsule' } },
  { id: 50, name: 'Sony SRS-XB100 Speaker', slug: 'sony-srs-xb100', description: 'Ultra-portable Bluetooth speaker with deep bass, IP67 waterproof, 16hr battery.', price: 8999, originalPrice: 11999, discount: 25, images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Sony', rating: 4.4, reviewCount: 670, stock: 90, sizes: [], colors: ['Black','Blue','Orange'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-24', specifications: { 'Battery': '16hr', 'Water': 'IP67', 'Connect': 'Bluetooth 5.3', 'Weight': '274g' } },
  // ═══ Nike (+4) ═══
  { id: 51, name: 'Nike Dri-FIT Training Tee', slug: 'nike-drifit-training-tee', description: 'Sweat-wicking training t-shirt with Dri-FIT technology, crew neck, relaxed fit.', price: 4499, originalPrice: 5999, discount: 25, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop'], categoryId: 4, category: 'Sports & Outdoors', brand: 'Nike', rating: 4.4, reviewCount: 890, stock: 150, sizes: ['S','M','L','XL','XXL'], colors: ['Black','White','Navy','Red'], deliveryDays: 2, freeShipping: false, featured: false, createdAt: '2025-07-25', specifications: { 'Fabric': 'Dri-FIT Polyester', 'Fit': 'Relaxed', 'Neck': 'Crew', 'Care': 'Machine Wash' } },
  { id: 52, name: 'Nike Pro Compression Shorts', slug: 'nike-pro-compression-shorts', description: 'Tight-fit compression shorts with Dri-FIT, elastic waistband, flat seams.', price: 3499, originalPrice: 4499, discount: 22, images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop'], categoryId: 4, category: 'Sports & Outdoors', brand: 'Nike', rating: 4.3, reviewCount: 567, stock: 120, sizes: ['S','M','L','XL'], colors: ['Black','Blue','Red'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-07-26', specifications: { 'Fabric': 'Dri-FIT', 'Fit': 'Compression', 'Waist': 'Elastic', 'Length': 'Mid-Thigh' } },
  { id: 53, name: 'Nike Air Force 1 \'07', slug: 'nike-air-force-1-07', description: 'Iconic street-style sneakers with durable leather upper, Air cushioning, timeless design.', price: 26999, originalPrice: 32999, discount: 18, images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop'], categoryId: 4, category: 'Sports & Outdoors', brand: 'Nike', rating: 4.7, reviewCount: 3400, stock: 70, sizes: ['7','8','9','10','11','12'], colors: ['White','Black'], deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-07-27', specifications: { 'Upper': 'Leather', 'Sole': 'Air Cushion', 'Style': 'Lifestyle', 'Closure': 'Lace-Up' } },
  { id: 54, name: 'Nike Sportswear Club Hoodie', slug: 'nike-sportswear-club-hoodie', description: 'Fleece-lined hoodie with kangaroo pocket, adjustable drawcord hood, relaxed fit.', price: 6999, originalPrice: 9999, discount: 30, images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop'], categoryId: 4, category: 'Sports & Outdoors', brand: 'Nike', rating: 4.5, reviewCount: 1230, stock: 100, sizes: ['S','M','L','XL','XXL'], colors: ['Black','Grey','Navy','Green'], deliveryDays: 3, freeShipping: false, featured: false, createdAt: '2025-07-28', specifications: { 'Fabric': 'Fleece Cotton', 'Fit': 'Relaxed', 'Hood': 'Drawcord', 'Pocket': 'Kangaroo' } },
  // ═══ Dyson (+4) ═══
  { id: 55, name: 'Dyson Airwrap Multi-Styler', slug: 'dyson-airwrap', description: 'All-in-one hair styler with Coanda effect, multiple attachments, no extreme heat.', price: 129999, originalPrice: 149999, discount: 13, images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop'], categoryId: 99, category: 'REMOVED', brand: 'Dyson', rating: 4.8, reviewCount: 2100, stock: 0, sizes: [], colors: ['Fuchsia/Nickel','Blue/Copper'], deliveryDays: 4, freeShipping: true, featured: false, createdAt: '2025-07-29', specifications: { 'Type': 'Hair Styler', 'Tech': 'Coanda Effect', 'Heat': 'No Extreme', 'Attachments': '6' } },

  { id: 57, name: 'Dyson Supersonic Hair Dryer', slug: 'dyson-supersonic-old', description: 'Fast drying with Air Multiplier, intelligent heat control, magnetic attachments.', price: 69999, originalPrice: 84999, discount: 18, images: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop'], categoryId: 99, category: 'REMOVED', brand: 'Dyson', rating: 4.7, reviewCount: 1560, stock: 0, sizes: [], colors: ['Fuchsia','Silver'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-07-31', specifications: { 'Motor': 'Digital V9', 'Tech': 'Air Multiplier', 'Heat': 'Intelligent Control', 'Attachments': 'Magnetic' } },
  { id: 58, name: 'Dyson Lightcycle Morph Desk Lamp', slug: 'dyson-lightcycle-morph', description: 'Intelligent task light with ambient light detection, 60yr LED life, USB-C charging.', price: 139999, originalPrice: 159999, discount: 13, images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop'], categoryId: 99, category: 'REMOVED', brand: 'Dyson', rating: 4.5, reviewCount: 345, stock: 0, sizes: [], colors: ['Black','White'], deliveryDays: 5, freeShipping: true, featured: false, createdAt: '2025-08-01', specifications: { 'LED Life': '60 Years', 'Detection': 'Ambient Light', 'Charging': 'USB-C', 'Modes': 'Task, Indirect, Feature' } },
  // ═══ Levi's (+4) ═══
  { id: 59, name: "Levi's 511 Slim Fit Jeans", slug: 'levis-511-slim-fit', description: 'Classic slim-fit jeans with stretch denim, sits below waist, narrow leg opening.', price: 6999, originalPrice: 9999, discount: 30, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: "Levi's", rating: 4.5, reviewCount: 1800, stock: 130, sizes: ['28','30','32','34','36','38'], colors: ['Dark Wash','Light Wash','Black'], deliveryDays: 3, freeShipping: false, featured: true, createdAt: '2025-08-02', specifications: { 'Fit': 'Slim', 'Rise': 'Mid', 'Fabric': 'Stretch Denim', 'Leg': 'Narrow' } },
  { id: 60, name: "Levi's Trucker Jacket", slug: 'levis-trucker-jacket', description: 'Iconic denim trucker jacket with button front, chest pockets, straight silhouette.', price: 12999, originalPrice: 16999, discount: 24, images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: "Levi's", rating: 4.6, reviewCount: 890, stock: 60, sizes: ['S','M','L','XL','XXL'], colors: ['Medium Blue','Black','Light Wash'], deliveryDays: 4, freeShipping: true, featured: false, createdAt: '2025-08-03', specifications: { 'Type': 'Trucker Jacket', 'Fabric': '100% Cotton Denim', 'Closure': 'Button Front', 'Pockets': '4' } },
  { id: 61, name: "Levi's 501 Original Jeans", slug: 'levis-501-original', description: 'The original straight-fit jean since 1873. Button fly, regular through the thigh.', price: 7999, originalPrice: 10999, discount: 27, images: ['https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: "Levi's", rating: 4.7, reviewCount: 2300, stock: 110, sizes: ['28','30','32','34','36','38','40'], colors: ['Original Blue','Black','Vintage Wash'], deliveryDays: 3, freeShipping: false, featured: true, createdAt: '2025-08-04', specifications: { 'Fit': 'Straight', 'Fly': 'Button', 'Fabric': 'Non-Stretch Denim', 'Origin': 'Iconic 501' } },
  { id: 62, name: "Levi's Cotton Graphic Tee", slug: 'levis-cotton-graphic-tee', description: 'Soft cotton t-shirt with Levi\'s classic logo print, crew neck, regular fit.', price: 2999, originalPrice: 3999, discount: 25, images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: "Levi's", rating: 4.3, reviewCount: 567, stock: 200, sizes: ['S','M','L','XL','XXL'], colors: ['White','Black','Navy','Red'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-05', specifications: { 'Fabric': '100% Cotton', 'Fit': 'Regular', 'Neck': 'Crew', 'Print': 'Logo Graphic' } },
  // ═══ Khaadi (+4) ═══
  { id: 63, name: 'Khaadi Embroidered Kurti', slug: 'khaadi-embroidered-kurti', description: 'Beautiful embroidered straight kurti in pure cotton, perfect for casual wear.', price: 4499, originalPrice: 6499, discount: 31, images: ['https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Khaadi', rating: 4.5, reviewCount: 780, stock: 110, sizes: ['XS','S','M','L','XL'], colors: ['White','Navy','Peach'], deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-08-06', specifications: { 'Fabric': '100% Cotton', 'Style': 'Straight Kurti', 'Work': 'Embroidery', 'Length': 'Knee' } },
  { id: 64, name: 'Khaadi Lawn Dupatta', slug: 'khaadi-lawn-dupatta', description: 'Printed lawn dupatta with embroidered border, 2.5m length, perfect for summer.', price: 1999, originalPrice: 2999, discount: 33, images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Khaadi', rating: 4.4, reviewCount: 456, stock: 150, sizes: [], colors: ['Pink','Blue','Mint'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-08-07', specifications: { 'Fabric': 'Lawn', 'Length': '2.5m', 'Work': 'Embroidered Border', 'Season': 'Summer' } },
  { id: 65, name: 'Khaadi Men\'s Linen Shirt', slug: 'khaadi-mens-linen-shirt', description: 'Breathable linen shirt with button-down collar, perfect for summer formal wear.', price: 5499, originalPrice: 7999, discount: 31, images: ['https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: 'Khaadi', rating: 4.4, reviewCount: 345, stock: 90, sizes: ['S','M','L','XL','XXL'], colors: ['White','Blue','Beige'], deliveryDays: 3, freeShipping: false, featured: false, createdAt: '2025-08-08', specifications: { 'Fabric': '100% Linen', 'Fit': 'Regular', 'Collar': 'Button-Down', 'Season': 'Summer' } },
  { id: 66, name: 'Khaadi Pret Collection Trouser', slug: 'khaadi-pret-trouser', description: 'Straight-fit pret trouser with elastic waistband, dyed cambric cotton.', price: 2999, originalPrice: 4499, discount: 33, images: ['https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Khaadi', rating: 4.3, reviewCount: 234, stock: 130, sizes: ['XS','S','M','L','XL'], colors: ['Black','Navy','Olive'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-09', specifications: { 'Fabric': 'Cambric Cotton', 'Fit': 'Straight', 'Waist': 'Elastic', 'Collection': 'Pret' } },
  // ═══ Gul Ahmed (+4) ═══
  { id: 67, name: 'Gul Ahmed Printed Lawn Suit', slug: 'gul-ahmed-printed-lawn', description: '3-piece printed lawn suit with embroidered neckline, includes shirt, trouser, dupatta.', price: 4999, originalPrice: 7499, discount: 33, images: ['https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Gul Ahmed', rating: 4.6, reviewCount: 980, stock: 140, sizes: ['XS','S','M','L','XL'], colors: ['Green','Blue','Pink','Maroon'], deliveryDays: 3, freeShipping: true, featured: true, createdAt: '2025-08-10', specifications: { 'Fabric': 'Premium Lawn', 'Pieces': '3', 'Season': 'Summer', 'Work': 'Embroidered Neckline' } },
  { id: 68, name: 'Gul Ahmed Winter Shawl', slug: 'gul-ahmed-winter-shawl', description: 'Luxurious wool-blend shawl with tassels, perfect for winter layering, 200x70cm.', price: 3999, originalPrice: 5999, discount: 33, images: ['https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Gul Ahmed', rating: 4.5, reviewCount: 567, stock: 80, sizes: [], colors: ['Sand','Grey','Burgundy'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-08-11', specifications: { 'Fabric': 'Wool Blend', 'Size': '200x70cm', 'Season': 'Winter', 'Details': 'Tassels' } },
  { id: 69, name: 'Gul Ahmed Men\'s Cotton Suit', slug: 'gul-ahmed-mens-cotton-suit', description: 'Stitched 2-piece cotton suit with subtle texture, mandarin collar, straight trousers.', price: 6999, originalPrice: 9999, discount: 30, images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop'], categoryId: 8, category: "Men's Clothing", brand: 'Gul Ahmed', rating: 4.4, reviewCount: 456, stock: 70, sizes: ['S','M','L','XL','XXL'], colors: ['Navy','Charcoal','Beige'], deliveryDays: 4, freeShipping: false, featured: false, createdAt: '2025-08-12', specifications: { 'Fabric': 'Textured Cotton', 'Pieces': '2', 'Collar': 'Mandarin', 'Season': 'All' } },
  { id: 70, name: 'Gul Ahmed Digital Print Kurta', slug: 'gul-ahmed-digital-kurta', description: 'Vibrant digital print straight kurta with side slits, cambric cotton, round neck.', price: 3499, originalPrice: 5499, discount: 36, images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'], categoryId: 9, category: "Women's Clothing", brand: 'Gul Ahmed', rating: 4.3, reviewCount: 678, stock: 120, sizes: ['XS','S','M','L','XL'], colors: ['Multi Print','Blue','Pink'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-13', specifications: { 'Fabric': 'Cambric Cotton', 'Style': 'Straight Kurta', 'Neck': 'Round', 'Print': 'Digital' } },
  // ═══ Casio (+4) ═══
  { id: 71, name: 'Casio F-91W Classic Watch', slug: 'casio-f91w-classic', description: 'Iconic digital watch with chronograph, alarm, 7-year battery, 30m water resistance.', price: 3999, originalPrice: 5499, discount: 27, images: ['https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Casio', rating: 4.8, reviewCount: 5600, stock: 300, sizes: [], colors: ['Black','Navy','Grey'], deliveryDays: 2, freeShipping: true, featured: true, createdAt: '2025-08-14', specifications: { 'Display': 'Digital', 'Battery': '7 Years', 'Water': '30m', 'Features': 'Alarm + Stopwatch' } },
  { id: 72, name: 'Casio Edifice Chronograph', slug: 'casio-edifice-chronograph', description: 'Stainless steel chronograph with sapphire crystal, tachymeter, 100m water resistance.', price: 29999, originalPrice: 39999, discount: 25, images: ['https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Casio', rating: 4.6, reviewCount: 890, stock: 40, sizes: [], colors: ['Silver','Black'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-08-15', specifications: { 'Display': 'Analog + Digital', 'Crystal': 'Sapphire', 'Water': '100m', 'Case': 'Stainless Steel' } },
  { id: 73, name: 'Casio Calculator CA-53W', slug: 'casio-calculator-ca53w', description: 'Retro calculator watch with 8-digit display, dual time, daily alarm, iconic 80s design.', price: 6999, originalPrice: 8999, discount: 22, images: ['https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Casio', rating: 4.5, reviewCount: 1200, stock: 55, sizes: [], colors: ['Black'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-16', specifications: { 'Display': '8-Digit Calculator', 'Battery': '5 Years', 'Water': 'Splash', 'Style': 'Retro' } },
  { id: 74, name: 'Casio Baby-G Women\'s Watch', slug: 'casio-babyg-womens', description: 'Shock-resistant digital watch for women, LED light, world time, 100m water resistance.', price: 12999, originalPrice: 16999, discount: 24, images: ['https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Casio', rating: 4.5, reviewCount: 780, stock: 65, sizes: [], colors: ['Pink','White','Blue'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-08-17', specifications: { 'Display': 'Digital', 'Shock': 'Resistant', 'Water': '100m', 'Feature': 'World Time' } },
  // ═══ Maybelline (+4) ═══
  { id: 75, name: 'Maybelline Lash Sensational Mascara', slug: 'maybelline-lash-sensational', description: 'Fan-effect brush mascara for fuller, longer lashes without clumping. Ophthalmologist tested.', price: 2499, originalPrice: 3499, discount: 29, images: ['https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: 'Maybelline', rating: 4.5, reviewCount: 3400, stock: 200, sizes: [], colors: ['Black','Brown'], deliveryDays: 2, freeShipping: true, featured: true, createdAt: '2025-08-18', specifications: { 'Type': 'Mascara', 'Effect': 'Volume + Length', 'Waterproof': 'Yes', 'Tested': 'Ophthalmologist' } },
  { id: 76, name: 'Maybelline SuperStay Lipstick', slug: 'maybelline-superstay-lipstick', description: '24-hour matte liquid lipstick, transfer-proof, highly pigmented, precise applicator.', price: 1999, originalPrice: 2999, discount: 33, images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: 'Maybelline', rating: 4.4, reviewCount: 2300, stock: 250, sizes: [], colors: ['Ruby Red','Nude','Berry','Coral'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-19', specifications: { 'Type': 'Liquid Lipstick', 'Duration': '24 Hours', 'Finish': 'Matte', 'Transfer': 'Proof' } },
  { id: 77, name: 'Maybelline Instant Age Rewind Concealer', slug: 'maybelline-age-rewind-concealer', description: 'Anti-aging concealer with goji berry + Haloxyl, sponge tip applicator, covers dark circles.', price: 1799, originalPrice: 2499, discount: 28, images: ['https://images.unsplash.com/photo-1570194065650-d99fb4b88cc1?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: 'Maybelline', rating: 4.6, reviewCount: 4500, stock: 180, sizes: [], colors: ['Fair','Light','Medium','Sand'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-20', specifications: { 'Type': 'Concealer', 'Concern': 'Dark Circles', 'Ingredients': 'Goji Berry + Haloxyl', 'Applicator': 'Sponge Tip' } },
  { id: 78, name: 'Maybelline Sky High Mascara', slug: 'maybelline-sky-high-mascara', description: 'Extreme length mascara with bamboo extract, flexible tower brush, washable formula.', price: 2799, originalPrice: 3999, discount: 30, images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: 'Maybelline', rating: 4.7, reviewCount: 5600, stock: 220, sizes: [], colors: ['Black','Brown'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-21', specifications: { 'Type': 'Mascara', 'Effect': 'Extreme Length', 'Ingredients': 'Bamboo Extract', 'Formula': 'Washable' } },
  // ═══ L'Oreal (+3) ═══
  { id: 79, name: "L'Oreal Paris Infallible Foundation", slug: 'loreal-infallible-foundation', description: '32HR fresh wear foundation, medium-to-full coverage, SPF 25, waterproof formula.', price: 3999, originalPrice: 5499, discount: 27, images: ['https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: "L'Oreal", rating: 4.4, reviewCount: 2100, stock: 160, sizes: [], colors: ['Ivory','Sand','Golden','Honey'], deliveryDays: 2, freeShipping: true, featured: true, createdAt: '2025-08-22', specifications: { 'Type': 'Foundation', 'Coverage': 'Medium-Full', 'Duration': '32HR', 'SPF': '25' } },
  { id: 80, name: "L'Oreal Paris Color Riche Lipstick", slug: 'loreal-color-riche-lipstick', description: 'Creamy lipstick enriched with argan oil + vitamin E, satin finish, 30+ shades.', price: 2499, originalPrice: 3499, discount: 29, images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: "L'Oreal", rating: 4.5, reviewCount: 1500, stock: 190, sizes: [], colors: ['Pure Red','Rose','Coral','Plum'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-23', specifications: { 'Type': 'Lipstick', 'Finish': 'Satin', 'Enriched': 'Argan Oil + Vitamin E', 'Shades': '30+' } },
  { id: 81, name: "L'Oreal Paris Magic Retouch Spray", slug: 'loreal-magic-retouch', description: 'Instant root concealer spray, covers grey roots in seconds, no smudge, 3 shades.', price: 1499, originalPrice: 2199, discount: 32, images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop'], categoryId: 5, category: 'Beauty & Health', brand: "L'Oreal", rating: 4.3, reviewCount: 890, stock: 300, sizes: [], colors: ['Black','Brown','Blonde'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-24', specifications: { 'Type': 'Root Concealer', 'Format': 'Spray', 'Dry Time': 'Instantly', 'Smudge': 'Proof' } },
  // ═══ Dell (+4) ═══
  { id: 82, name: 'Dell XPS 16 Laptop', slug: 'dell-xps-16', description: '16.3" 4K+ OLED, Intel Ultra 9, 32GB RAM, 1TB SSD, CNC aluminum body.', price: 379999, originalPrice: 419999, discount: 10, images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Dell', rating: 4.7, reviewCount: 567, stock: 12, sizes: [], colors: ['Platinum','Graphite'], deliveryDays: 5, freeShipping: true, featured: true, createdAt: '2025-08-25', specifications: { 'Display': '16.3" 4K+ OLED', 'CPU': 'Intel Ultra 9', 'RAM': '32GB', 'Storage': '1TB SSD' } },
  { id: 83, name: 'Dell 27" 4K Monitor', slug: 'dell-27-4k-monitor', description: '27" USB-C 4K monitor with IPS panel, 60Hz, built-in speakers, adjustable stand.', price: 89999, originalPrice: 109999, discount: 18, images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Dell', rating: 4.5, reviewCount: 890, stock: 20, sizes: [], colors: ['Black'], deliveryDays: 4, freeShipping: true, featured: false, createdAt: '2025-08-26', specifications: { 'Display': '27" 4K IPS', 'Connect': 'USB-C + HDMI', 'Refresh': '60Hz', 'Speaker': 'Built-in' } },
  { id: 84, name: 'Dell Wireless Keyboard & Mouse', slug: 'dell-wireless-kb-mouse', description: 'Slim wireless keyboard + mouse combo, 2.4GHz, 12-month battery, quiet keys.', price: 8999, originalPrice: 11999, discount: 25, images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Dell', rating: 4.3, reviewCount: 567, stock: 80, sizes: [], colors: ['Black'], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-08-27', specifications: { 'Connect': '2.4GHz Wireless', 'Battery': '12 Months', 'Keys': 'Quiet', 'Combo': 'Keyboard + Mouse' } },
  { id: 85, name: 'Dell USB-C Docking Station', slug: 'dell-usbc-dock', description: 'Universal USB-C dock with dual 4K display, 90W charging, 10 ports including Ethernet.', price: 34999, originalPrice: 44999, discount: 22, images: ['https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&h=600&fit=crop'], categoryId: 1, category: 'Electronics', brand: 'Dell', rating: 4.4, reviewCount: 345, stock: 30, sizes: [], colors: ['Black'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-08-28', specifications: { 'Type': 'USB-C Dock', 'Display': 'Dual 4K', 'Charge': '90W', 'Ports': '10' } },
  // ═══ NEW Home & Living (+5) ═══
  { id: 86, name: 'Premium Velvet Sofa 3-Seater', slug: 'premium-velvet-sofa', description: 'Luxurious velvet upholstered 3-seater sofa with golden legs, high-density foam, perfect for modern living rooms.', price: 89999, originalPrice: 129999, discount: 31, images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop'], categoryId: 3, category: 'Home & Living', brand: 'Interwood', rating: 4.6, reviewCount: 567, stock: 15, sizes: [], colors: ['Emerald Green','Navy Blue','Blush Pink'], deliveryDays: 7, freeShipping: false, featured: true, createdAt: '2025-09-01', specifications: { 'Material': 'Velvet', 'Seating': '3-Seater', 'Frame': 'Solid Wood', 'Cushion': 'High-Density Foam' } },
  { id: 87, name: 'Crystal Chandelier Modern', slug: 'crystal-chandelier-modern', description: 'Stunning 12-light crystal chandelier with adjustable chain, dimmable LED compatible, perfect for dining and living rooms.', price: 45999, originalPrice: 69999, discount: 34, images: ['https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop'], categoryId: 3, category: 'Home & Living', brand: 'Royal Lighting', rating: 4.7, reviewCount: 234, stock: 20, sizes: [], colors: ['Gold','Silver'], deliveryDays: 5, freeShipping: true, featured: true, createdAt: '2025-09-02', specifications: { 'Type': 'Crystal Chandelier', 'Lights': '12 E14', 'Height': '80cm', 'Dimmable': 'Yes' } },
  { id: 88, name: 'Non-Stick Cooking Pot Set 7pc', slug: 'cooking-pot-set-7pc', description: 'Premium 7-piece cooking pot set with granite non-stick coating, bakelite handles, suitable for all stove types including induction.', price: 15999, originalPrice: 24999, discount: 36, images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop'], categoryId: 3, category: 'Home & Living', brand: 'Prestige', rating: 4.5, reviewCount: 890, stock: 45, sizes: [], colors: ['Black','Red'], deliveryDays: 3, freeShipping: true, featured: false, createdAt: '2025-09-03', specifications: { 'Pieces': '7', 'Coating': 'Granite Non-Stick', 'Handles': 'Bakelite', 'Stove': 'All Types' } },
  { id: 89, name: 'Wall Art Canvas Painting', slug: 'wall-art-canvas-painting', description: 'Large 120x80cm abstract canvas wall art, hand-painted, gallery-wrapped wooden frame, ready to hang.', price: 8999, originalPrice: 14999, discount: 40, images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop'], categoryId: 3, category: 'REMOVED', brand: 'Artisan Decor', rating: 4.4, reviewCount: 345, stock: 30, sizes: [], colors: ['Abstract Blue','Abstract Gold','Nature Green'], deliveryDays: 4, freeShipping: true, featured: true, createdAt: '2025-09-04', specifications: { 'Size': '120x80cm', 'Type': 'Hand-Painted', 'Frame': 'Gallery Wrapped', 'Ready': 'Ready to Hang' } },
  { id: 90, name: 'Scented Candle Gift Set 6pc', slug: 'scented-candle-gift-set', description: 'Luxury soy wax scented candle set — 6 fragrances: Vanilla, Lavender, Rose, Jasmine, Sandalwood & Ocean Breeze. 40hr burn each.', price: 4999, originalPrice: 7999, discount: 38, images: ['https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop'], categoryId: 3, category: 'Home & Living', brand: 'Aroma Luxe', rating: 4.6, reviewCount: 678, stock: 80, sizes: [], colors: [], deliveryDays: 2, freeShipping: true, featured: false, createdAt: '2025-09-05', specifications: { 'Count': '6 Candles', 'Wax': 'Soy Wax', 'Burn Time': '40hr Each', 'Fragrances': 'Vanilla, Lavender, Rose, Jasmine, Sandalwood, Ocean' } },
];

// ---------- REVIEWS ----------
export const reviews: Review[] = [
  { id: 1, productId: 1, userId: 2, userName: 'Ahmed Khan', userAvatar: '👨', rating: 5, comment: 'Amazing phone! The camera quality is outstanding and battery lasts forever. Worth every rupee!', createdAt: '2025-06-15' },
  { id: 2, productId: 1, userId: 3, userName: 'Fatima Ali', userAvatar: '👩', rating: 4, comment: 'Great phone overall. Fast performance and beautiful display. Only downside is no charger in box.', createdAt: '2025-06-18' },
  { id: 3, productId: 2, userId: 4, userName: 'Ali Hassan', userAvatar: '🧑', rating: 5, comment: 'Best iPhone yet! The camera is incredible and the titanium finish feels premium.', createdAt: '2025-06-10' },
  { id: 4, productId: 3, userId: 2, userName: 'Ahmed Khan', userAvatar: '👨', rating: 4, comment: 'Very comfortable fabric. Perfect for summer. Sizing is accurate.', createdAt: '2025-06-20' },
  { id: 5, productId: 4, userId: 3, userName: 'Fatima Ali', userAvatar: '👩', rating: 5, comment: 'Beautiful print and excellent quality. Got many compliments! Fast delivery too.', createdAt: '2025-06-22' },
  { id: 6, productId: 16, userId: 3, userName: 'Fatima Ali', userAvatar: '👩', rating: 5, comment: 'Life-changing appliance! I use it daily. Perfect for quick meals.', createdAt: '2025-04-10' },
];

// ---------- CART (per user) ----------
export const mockCartItems: Record<number, CartItem[]> = {
  2: [
    { id: 1, productId: 1, product: products[0], quantity: 1, color: 'Titanium Black' },
    { id: 2, productId: 4, product: products[3], quantity: 2, size: 'M', color: 'Green' },
  ],
  3: [
    { id: 3, productId: 5, product: products[4], quantity: 1, color: 'Black' },
  ],
  4: [],
};

// ---------- ORDERS ----------
export const orders: Order[] = [
  {
    id: 1, userId: 2, orderNumber: 'ORD-2025-001', items: [
      { id: 1, productId: 1, productName: 'Samsung Galaxy S25 Ultra', productImage: products[0].images[0], price: 349999, quantity: 1 },
    ],
    subtotal: 349999, shipping: 0, tax: 0, total: 349999,
    status: 'delivered', paymentMethod: 'Credit Card', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-06-01', deliveredAt: '2025-06-04',
  },
  {
    id: 2, userId: 2, orderNumber: 'ORD-2025-002', items: [
      { id: 2, productId: 16, productName: 'Instant Pot Duo Plus 6L', productImage: products[14].images[0], price: 24999, quantity: 1 },
      { id: 3, productId: 10, productName: 'Organic Basmati Rice 5kg', productImage: products[8].images[0], price: 1499, quantity: 3 },
    ],
    subtotal: 29496, shipping: 200, tax: 0, total: 29696,
    status: 'shipped', paymentMethod: 'Cash on Delivery', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-06-15', deliveredAt: null,
  },
  {
    id: 3, userId: 3, orderNumber: 'ORD-2025-003', items: [
      { id: 4, productId: 4, productName: 'Women\'s Lawn Printed Suit', productImage: products[3].images[0], price: 3499, quantity: 2, size: 'M', color: 'Pink' },
    ],
    subtotal: 6998, shipping: 0, tax: 0, total: 6998,
    status: 'confirmed', paymentMethod: 'JazzCash', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-06-20', deliveredAt: null,
  },
  {
    id: 4, userId: 4, orderNumber: 'ORD-2025-004', items: [
      { id: 5, productId: 7, productName: 'Nike Air Max 270 React', productImage: products[6].images[0], price: 24999, quantity: 1, size: '10' },
    ],
    subtotal: 24999, shipping: 150, tax: 0, total: 25149,
    status: 'pending', paymentMethod: 'Easypaisa', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-06-23', deliveredAt: null,
  },
  // ── 10 Additional Orders ──
  {
    id: 5, userId: 2, orderNumber: 'ORD-2025-005', items: [
      { id: 6, productId: 6, productName: 'MacBook Air M3 15-inch', productImage: products[5].images[0], price: 289999, quantity: 1 },
      { id: 7, productId: 83, productName: 'Dell 27" 4K Monitor', productImage: products[77].images[0], price: 89999, quantity: 1 },
    ],
    subtotal: 379998, shipping: 0, tax: 0, total: 379998,
    status: 'delivered', paymentMethod: 'Bank Transfer', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-07-05', deliveredAt: '2025-07-09',
  },
  {
    id: 6, userId: 3, orderNumber: 'ORD-2025-006', items: [
      { id: 8, productId: 45, productName: 'Apple Watch Ultra 2', productImage: products[40].images[0], price: 219999, quantity: 1, color: 'Titanium' },
    ],
    subtotal: 219999, shipping: 0, tax: 0, total: 219999,
    status: 'delivered', paymentMethod: 'Credit Card', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-07-12', deliveredAt: '2025-07-16',
  },
  {
    id: 7, userId: 4, orderNumber: 'ORD-2025-007', items: [
      { id: 9, productId: 47, productName: 'Sony PlayStation 5 Slim', productImage: products[42].images[0], price: 149999, quantity: 1 },
      { id: 10, productId: 43, productName: 'Samsung Galaxy Buds 3 Pro', productImage: products[38].images[0], price: 34999, quantity: 1 },
    ],
    subtotal: 184998, shipping: 200, tax: 0, total: 185198,
    status: 'shipped', paymentMethod: 'Cash on Delivery', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-07-20', deliveredAt: null,
  },
  {
    id: 8, userId: 2, orderNumber: 'ORD-2025-008', items: [
      { id: 11, productId: 67, productName: 'Gul Ahmed Printed Lawn Suit', productImage: products[61].images[0], price: 4999, quantity: 2, size: 'M', color: 'Green' },
      { id: 12, productId: 64, productName: 'Khaadi Lawn Dupatta', productImage: products[58].images[0], price: 1999, quantity: 1 },
    ],
    subtotal: 11997, shipping: 0, tax: 0, total: 11997,
    status: 'confirmed', paymentMethod: 'JazzCash', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-08-01', deliveredAt: null,
  },
  {
    id: 9, userId: 3, orderNumber: 'ORD-2025-009', items: [
      { id: 13, productId: 46, productName: 'Apple AirPods Pro 3', productImage: products[41].images[0], price: 59999, quantity: 1 },
      { id: 14, productId: 48, productName: 'Sony Bravia 65" OLED', productImage: products[43].images[0], price: 349999, quantity: 1 },
    ],
    subtotal: 409998, shipping: 0, tax: 0, total: 409998,
    status: 'pending', paymentMethod: 'Bank Transfer', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-08-10', deliveredAt: null,
  },
  {
    id: 10, userId: 4, orderNumber: 'ORD-2025-010', items: [
      { id: 15, productId: 86, productName: 'Premium Velvet Sofa 3-Seater', productImage: products[80].images[0], price: 89999, quantity: 1, color: 'Navy Blue' }
    ],
    subtotal: 89999, shipping: 500, tax: 0, total: 90499,
    status: 'delivered', paymentMethod: 'Easypaisa', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-08-15', deliveredAt: '2025-08-22',
  },
  {
    id: 11, userId: 2, orderNumber: 'ORD-2025-011', items: [
      { id: 16, productId: 53, productName: 'Nike Air Force 1 \'07', productImage: products[48].images[0], price: 26999, quantity: 1, size: '10' },
      { id: 17, productId: 54, productName: 'Nike Sportswear Club Hoodie', productImage: products[49].images[0], price: 6999, quantity: 2, size: 'L', color: 'Black' },
    ],
    subtotal: 40997, shipping: 0, tax: 0, total: 40997,
    status: 'shipped', paymentMethod: 'Credit Card', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-08-20', deliveredAt: null,
  },
  {
    id: 12, userId: 3, orderNumber: 'ORD-2025-012', items: [
      { id: 18, productId: 75, productName: 'Maybelline Lash Sensational Mascara', productImage: products[69].images[0], price: 2499, quantity: 3 },
      { id: 19, productId: 76, productName: 'Maybelline SuperStay Lipstick', productImage: products[70].images[0], price: 1999, quantity: 2, color: 'Ruby Red' },
      { id: 20, productId: 77, productName: 'Maybelline Instant Age Rewind Concealer', productImage: products[71].images[0], price: 1799, quantity: 2 },
    ],
    subtotal: 15094, shipping: 0, tax: 0, total: 15094,
    status: 'confirmed', paymentMethod: 'JazzCash', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-08-25', deliveredAt: null,
  },
  {
    id: 13, userId: 4, orderNumber: 'ORD-2025-013', items: [
      { id: 21, productId: 82, productName: 'Dell XPS 16 Laptop', productImage: products[76].images[0], price: 379999, quantity: 1 },
    ],
    subtotal: 379999, shipping: 0, tax: 0, total: 379999,
    status: 'pending', paymentMethod: 'Bank Transfer', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-09-01', deliveredAt: null,
  },
  {
    id: 14, userId: 2, orderNumber: 'ORD-2025-014', items: [
      { id: 22, productId: 61, productName: "Levi's 501 Original Jeans", productImage: products[55].images[0], price: 7999, quantity: 2, size: '32', color: 'Original Blue' },
      { id: 23, productId: 59, productName: "Levi's 511 Slim Fit Jeans", productImage: products[53].images[0], price: 6999, quantity: 1, size: '34', color: 'Dark Wash' },
    ],
    subtotal: 22997, shipping: 0, tax: 0, total: 22997,
    status: 'delivered', paymentMethod: 'Cash on Delivery', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-09-05', deliveredAt: '2025-09-08',
  },
  // ── 5 More Orders ──
  {
    id: 15, userId: 3, orderNumber: 'ORD-2025-015', items: [
      { id: 24, productId: 87, productName: 'Crystal Chandelier Modern', productImage: products[81].images[0], price: 45999, quantity: 1, color: 'Gold' },
      { id: 25, productId: 90, productName: 'Scented Candle Gift Set 6pc', productImage: products[84].images[0], price: 4999, quantity: 2 },
    ],
    subtotal: 55997, shipping: 300, tax: 0, total: 56297,
    status: 'shipped', paymentMethod: 'JazzCash', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-09-12', deliveredAt: null,
  },
  {
    id: 16, userId: 4, orderNumber: 'ORD-2025-016', items: [
      { id: 26, productId: 71, productName: 'Casio F-91W Classic Watch', productImage: products[65].images[0], price: 3999, quantity: 3 },
      { id: 27, productId: 73, productName: 'Casio Calculator CA-53W', productImage: products[67].images[0], price: 6999, quantity: 1 },
    ],
    subtotal: 18996, shipping: 0, tax: 0, total: 18996,
    status: 'delivered', paymentMethod: 'Credit Card', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-09-18', deliveredAt: '2025-09-21',
  },
  {
    id: 17, userId: 2, orderNumber: 'ORD-2025-017', items: [
      { id: 28, productId: 88, productName: 'Non-Stick Cooking Pot Set 7pc', productImage: products[82].images[0], price: 15999, quantity: 1 },
      { id: 29, productId: 40, productName: 'Mixed Dry Fruits Gift Box', productImage: products[35].images[0], price: 3499, quantity: 4 },
      { id: 30, productId: 38, productName: 'Green Tea 100 Bags', productImage: products[33].images[0], price: 899, quantity: 6 },
    ],
    subtotal: 33091, shipping: 150, tax: 0, total: 33241,
    status: 'confirmed', paymentMethod: 'Cash on Delivery', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-09-25', deliveredAt: null,
  },
  {
    id: 18, userId: 3, orderNumber: 'ORD-2025-018', items: [
      { id: 31, productId: 31, productName: 'Adidas Running Shoes', productImage: products[26].images[0], price: 19999, quantity: 1, size: '9' },
    ],
    subtotal: 19999, shipping: 0, tax: 0, total: 19999,
    status: 'pending', paymentMethod: 'Easypaisa', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-10-01', deliveredAt: null,
  },
  {
    id: 19, userId: 4, orderNumber: 'ORD-2025-019', items: [
      { id: 32, productId: 33, productName: 'Mountain Bike 26"', productImage: products[28].images[0], price: 49999, quantity: 1 },
      { id: 33, productId: 32, productName: 'Dumbbell Set 20kg', productImage: products[27].images[0], price: 8999, quantity: 2 },
    ],
    subtotal: 67997, shipping: 500, tax: 0, total: 68497,
    status: 'shipped', paymentMethod: 'Bank Transfer', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-10-05', deliveredAt: null,
  },
  // ── 31 More Orders ──
  {
    id: 20, userId: 1, orderNumber: 'ORD-2025-020', items: [
      { id: 34, productId: 50, productName: "Peter England Men's Shirt", productImage: products[45].images[0], price: 3999, quantity: 2, size: 'L' },
    ],
    subtotal: 7998, shipping: 0, tax: 0, total: 7998,
    status: 'delivered', paymentMethod: 'Cash on Delivery', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-10-08', deliveredAt: '2025-10-11',
  },
  {
    id: 21, userId: 2, orderNumber: 'ORD-2025-021', items: [
      { id: 35, productId: 45, productName: 'Nike Air Force 1 White', productImage: products[40].images[0], price: 21999, quantity: 1, size: '10' },
      { id: 36, productId: 46, productName: 'Nike Revolution 7 Running', productImage: products[41].images[0], price: 14999, quantity: 1, size: '9.5' },
    ],
    subtotal: 36998, shipping: 0, tax: 0, total: 36998,
    status: 'shipped', paymentMethod: 'Credit Card', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-10-10', deliveredAt: null,
  },
  {
    id: 22, userId: 3, orderNumber: 'ORD-2025-022', items: [
      { id: 37, productId: 10, productName: 'iPhone 16 Pro Max 256GB', productImage: products[8].images[0], price: 429999, quantity: 1, color: 'Desert Titanium' },
    ],
    subtotal: 429999, shipping: 0, tax: 0, total: 429999,
    status: 'pending', paymentMethod: 'Bank Transfer', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-10-12', deliveredAt: null,
  },
  {
    id: 23, userId: 4, orderNumber: 'ORD-2025-023', items: [
      { id: 38, productId: 67, productName: 'Balenciaga Classic City Bag', productImage: products[62].images[0], price: 58500, quantity: 1, color: 'Black' },
    ],
    subtotal: 58500, shipping: 500, tax: 0, total: 59000,
    status: 'confirmed', paymentMethod: 'Easypaisa', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-10-14', deliveredAt: null,
  },
  {
    id: 24, userId: 1, orderNumber: 'ORD-2025-024', items: [
      { id: 39, productId: 22, productName: "Men's Premium Cotton Kurta Shalwar", productImage: products[19].images[0], price: 4999, quantity: 3, size: 'M', color: 'White' },
      { id: 40, productId: 23, productName: "Men's Khaki Shalwar Kameez", productImage: products[20].images[0], price: 5999, quantity: 2, size: 'L', color: 'Khaki' },
    ],
    subtotal: 26995, shipping: 0, tax: 0, total: 26995,
    status: 'delivered', paymentMethod: 'Cash on Delivery', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-10-15', deliveredAt: '2025-10-18',
  },
  {
    id: 25, userId: 2, orderNumber: 'ORD-2025-025', items: [
      { id: 41, productId: 69, productName: "L'Oreal Paris Lipstick Collection", productImage: products[64].images[0], price: 8999, quantity: 2, color: 'Red' },
      { id: 42, productId: 70, productName: "L'Oreal Revitalift Serum", productImage: products[65].images[0], price: 6499, quantity: 1 },
    ],
    subtotal: 24497, shipping: 0, tax: 0, total: 24497,
    status: 'shipped', paymentMethod: 'JazzCash', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-10-18', deliveredAt: null,
  },
  {
    id: 26, userId: 3, orderNumber: 'ORD-2025-026', items: [
      { id: 43, productId: 13, productName: 'Sony WH-1000XM6 Headphones', productImage: products[11].images[0], price: 74999, quantity: 1, color: 'Midnight Blue' },
    ],
    subtotal: 74999, shipping: 0, tax: 0, total: 74999,
    status: 'delivered', paymentMethod: 'Credit Card', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-10-20', deliveredAt: '2025-10-23',
  },
  {
    id: 27, userId: 4, orderNumber: 'ORD-2025-027', items: [
      { id: 44, productId: 35, productName: 'Organic Honey 500g', productImage: products[30].images[0], price: 1499, quantity: 5 },
      { id: 45, productId: 36, productName: 'Organic Almonds 250g', productImage: products[31].images[0], price: 999, quantity: 10 },
      { id: 46, productId: 37, productName: 'Organic Dates Premium 1kg', productImage: products[32].images[0], price: 2499, quantity: 3 },
    ],
    subtotal: 26382, shipping: 0, tax: 0, total: 26382,
    status: 'confirmed', paymentMethod: 'Cash on Delivery', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-10-22', deliveredAt: null,
  },
  {
    id: 28, userId: 1, orderNumber: 'ORD-2025-028', items: [
      { id: 47, productId: 80, productName: 'Mehndi Cone 12pc', productImage: products[75].images[0], price: 599, quantity: 8 },
    ],
    subtotal: 4792, shipping: 100, tax: 0, total: 4892,
    status: 'cancelled', paymentMethod: 'Easypaisa', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-10-24', deliveredAt: null,
  },
  {
    id: 29, userId: 2, orderNumber: 'ORD-2025-029', items: [
      { id: 48, productId: 54, productName: "Puma Men's T-Shirt Pack 3", productImage: products[49].images[0], price: 5999, quantity: 2, size: 'XL' },
      { id: 49, productId: 55, productName: "Adidas Men's Joggers", productImage: products[50].images[0], price: 8499, quantity: 1, size: 'L' },
    ],
    subtotal: 20497, shipping: 0, tax: 0, total: 20497,
    status: 'shipped', paymentMethod: 'Credit Card', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-10-25', deliveredAt: null,
  },
  {
    id: 30, userId: 3, orderNumber: 'ORD-2025-030', items: [
      { id: 50, productId: 16, productName: 'MacBook Air M4 15"', productImage: products[14].images[0], price: 399999, quantity: 1, color: 'Space Black' },
    ],
    subtotal: 399999, shipping: 0, tax: 0, total: 399999,
    status: 'delivered', paymentMethod: 'Bank Transfer', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-10-26', deliveredAt: '2025-10-29',
  },
  {
    id: 31, userId: 4, orderNumber: 'ORD-2025-031', items: [
      { id: 51, productId: 83, productName: 'Portable Bluetooth Speaker', productImage: products[78].images[0], price: 3999, quantity: 3 },
    ],
    subtotal: 11997, shipping: 0, tax: 0, total: 11997,
    status: 'pending', paymentMethod: 'JazzCash', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-10-28', deliveredAt: null,
  },
  {
    id: 32, userId: 1, orderNumber: 'ORD-2025-032', items: [
      { id: 52, productId: 29, productName: "Women's Embroidered Fancy Suit", productImage: products[24].images[0], price: 8999, quantity: 2, size: 'M', color: 'Red' },
      { id: 53, productId: 30, productName: "Women's Chiffon Fancy Suit", productImage: products[25].images[0], price: 7999, quantity: 1, size: 'L', color: 'Blue' },
    ],
    subtotal: 24997, shipping: 0, tax: 0, total: 24997,
    status: 'confirmed', paymentMethod: 'Cash on Delivery', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-10-30', deliveredAt: null,
  },
  {
    id: 33, userId: 2, orderNumber: 'ORD-2025-033', items: [
      { id: 54, productId: 62, productName: 'Adidas Essentials Hoodie', productImage: products[57].images[0], price: 12999, quantity: 1, size: 'L', color: 'Grey' },
    ],
    subtotal: 12999, shipping: 150, tax: 0, total: 13149,
    status: 'shipped', paymentMethod: 'Easypaisa', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-11-01', deliveredAt: null,
  },
  {
    id: 34, userId: 3, orderNumber: 'ORD-2025-034', items: [
      { id: 55, productId: 78, productName: 'Dyson V15 Detect Vacuum', productImage: products[72].images[0], price: 179999, quantity: 1 },
    ],
    subtotal: 179999, shipping: 0, tax: 0, total: 179999,
    status: 'delivered', paymentMethod: 'Credit Card', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-11-03', deliveredAt: '2025-11-06',
  },
  {
    id: 35, userId: 4, orderNumber: 'ORD-2025-035', items: [
      { id: 56, productId: 43, productName: 'Khaadi Embroidered Collection', productImage: products[38].images[0], price: 14999, quantity: 1, size: 'M', color: 'Gold' },
    ],
    subtotal: 14999, shipping: 0, tax: 0, total: 14999,
    status: 'confirmed', paymentMethod: 'Cash on Delivery', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-11-05', deliveredAt: null,
  },
  {
    id: 36, userId: 1, orderNumber: 'ORD-2025-036', items: [
      { id: 57, productId: 19, productName: 'iPad Pro M4 13"', productImage: products[17].images[0], price: 299999, quantity: 1, color: 'Silver' },
    ],
    subtotal: 299999, shipping: 0, tax: 0, total: 299999,
    status: 'shipped', paymentMethod: 'Bank Transfer', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-11-07', deliveredAt: null,
  },
  {
    id: 37, userId: 2, orderNumber: 'ORD-2025-037', items: [
      { id: 58, productId: 84, productName: 'Stainless Steel Water Bottle 1L', productImage: products[79].images[0], price: 2499, quantity: 4, color: 'Black' },
      { id: 59, productId: 85, productName: 'Glass Food Container Set 5pc', productImage: products[80].images[0], price: 5999, quantity: 2 },
    ],
    subtotal: 21994, shipping: 0, tax: 0, total: 21994,
    status: 'delivered', paymentMethod: 'JazzCash', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-11-08', deliveredAt: '2025-11-10',
  },
  {
    id: 38, userId: 3, orderNumber: 'ORD-2025-038', items: [
      { id: 60, productId: 14, productName: 'Apple Watch Ultra 3', productImage: products[12].images[0], price: 169999, quantity: 1, color: 'Natural Titanium' },
    ],
    subtotal: 169999, shipping: 0, tax: 0, total: 169999,
    status: 'pending', paymentMethod: 'Credit Card', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-11-10', deliveredAt: null,
  },
  {
    id: 39, userId: 4, orderNumber: 'ORD-2025-039', items: [
      { id: 61, productId: 53, productName: 'Nike Dri-FIT Training Tee', productImage: products[48].images[0], price: 4999, quantity: 3, size: 'M', color: 'Black' },
    ],
    subtotal: 14997, shipping: 0, tax: 0, total: 14997,
    status: 'shipped', paymentMethod: 'Easypaisa', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-11-12', deliveredAt: null,
  },
  {
    id: 40, userId: 1, orderNumber: 'ORD-2025-040', items: [
      { id: 62, productId: 2, productName: 'iPhone 17 Air', productImage: products[1].images[0], price: 279999, quantity: 1, color: 'Rose Gold' },
      { id: 63, productId: 3, productName: 'Samsung Galaxy Z Fold 7', productImage: products[2].images[0], price: 529999, quantity: 1, color: 'Navy' },
    ],
    subtotal: 809998, shipping: 0, tax: 0, total: 809998,
    status: 'delivered', paymentMethod: 'Bank Transfer', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-11-14', deliveredAt: '2025-11-17',
  },
  {
    id: 41, userId: 2, orderNumber: 'ORD-2025-041', items: [
      { id: 64, productId: 34, productName: 'Basmati Rice Premium 5kg', productImage: products[29].images[0], price: 3499, quantity: 4 },
    ],
    subtotal: 13996, shipping: 200, tax: 0, total: 14196,
    status: 'confirmed', paymentMethod: 'Cash on Delivery', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-11-16', deliveredAt: null,
  },
  {
    id: 42, userId: 3, orderNumber: 'ORD-2025-042', items: [
      { id: 65, productId: 79, productName: 'iRobot Roomba j9+', productImage: products[74].images[0], price: 149999, quantity: 1 },
    ],
    subtotal: 149999, shipping: 0, tax: 0, total: 149999,
    status: 'cancelled', paymentMethod: 'Credit Card', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-11-18', deliveredAt: null,
  },
  {
    id: 43, userId: 4, orderNumber: 'ORD-2025-043', items: [
      { id: 66, productId: 56, productName: "Women's Khussa Handcrafted", productImage: products[51].images[0], price: 3999, quantity: 2, size: '7', color: 'Gold' },
      { id: 67, productId: 57, productName: "Women's Embroidered Khussa", productImage: products[52].images[0], price: 5999, quantity: 1, size: '8', color: 'Red' },
    ],
    subtotal: 13997, shipping: 0, tax: 0, total: 13997,
    status: 'shipped', paymentMethod: 'JazzCash', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-11-20', deliveredAt: null,
  },
  {
    id: 44, userId: 1, orderNumber: 'ORD-2025-044', items: [
      { id: 68, productId: 26, productName: "Women's Digital Printed Suit", productImage: products[22].images[0], price: 6999, quantity: 2, size: 'L', color: 'Purple' },
    ],
    subtotal: 13998, shipping: 0, tax: 0, total: 13998,
    status: 'delivered', paymentMethod: 'Cash on Delivery', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-11-22', deliveredAt: '2025-11-25',
  },
  {
    id: 45, userId: 2, orderNumber: 'ORD-2025-045', items: [
      { id: 69, productId: 18, productName: 'Samsung Galaxy Tab S10 Ultra', productImage: products[16].images[0], price: 249999, quantity: 1, color: 'Silver' },
      { id: 70, productId: 17, productName: 'AirPods Pro 3', productImage: products[15].images[0], price: 49999, quantity: 1 },
    ],
    subtotal: 299998, shipping: 0, tax: 0, total: 299998,
    status: 'confirmed', paymentMethod: 'Credit Card', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-11-24', deliveredAt: null,
  },
  {
    id: 46, userId: 3, orderNumber: 'ORD-2025-046', items: [
      { id: 71, productId: 41, productName: 'Sana Safinaz Luxury Pret', productImage: products[36].images[0], price: 24999, quantity: 1, size: 'M', color: 'Emerald' },
    ],
    subtotal: 24999, shipping: 0, tax: 0, total: 24999,
    status: 'pending', paymentMethod: 'Easypaisa', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-11-26', deliveredAt: null,
  },
  {
    id: 47, userId: 4, orderNumber: 'ORD-2025-047', items: [
      { id: 72, productId: 11, productName: 'Google Pixel 10 Pro', productImage: products[9].images[0], price: 299999, quantity: 1, color: 'Obsidian' },
    ],
    subtotal: 299999, shipping: 0, tax: 0, total: 299999,
    status: 'shipped', paymentMethod: 'Bank Transfer', shippingAddress: '321 Canal Road, Faisalabad',
    createdAt: '2025-11-28', deliveredAt: null,
  },
  {
    id: 48, userId: 1, orderNumber: 'ORD-2025-048', items: [
      { id: 73, productId: 58, productName: 'Polo Ralph Lauren Shirt', productImage: products[53].images[0], price: 6999, quantity: 2, size: 'M', color: 'Navy' },
      { id: 74, productId: 60, productName: "Levi's 512 Slim Taper Jeans", productImage: products[54].images[0], price: 7499, quantity: 1, size: '32', color: 'Black' },
    ],
    subtotal: 21497, shipping: 0, tax: 0, total: 21497,
    status: 'delivered', paymentMethod: 'Cash on Delivery', shippingAddress: '123 Main Street, Islamabad',
    createdAt: '2025-12-01', deliveredAt: '2025-12-04',
  },
  {
    id: 49, userId: 2, orderNumber: 'ORD-2025-049', items: [
      { id: 75, productId: 12, productName: 'OnePlus 13 Pro', productImage: products[10].images[0], price: 199999, quantity: 1, color: 'Emerald Green' },
    ],
    subtotal: 199999, shipping: 0, tax: 0, total: 199999,
    status: 'confirmed', paymentMethod: 'JazzCash', shippingAddress: '456 Main Road, Lahore',
    createdAt: '2025-12-05', deliveredAt: null,
  },
  {
    id: 50, userId: 3, orderNumber: 'ORD-2025-050', items: [
      { id: 76, productId: 86, productName: 'Kitchen Trolley Cart 3-Tier', productImage: products[81].images[0], price: 12999, quantity: 1, color: 'White' },
      { id: 77, productId: 89, productName: 'LED Desk Lamp Touch Control', productImage: products[83].images[0], price: 4999, quantity: 2, color: 'Silver' },
    ],
    subtotal: 22997, shipping: 500, tax: 0, total: 23497,
    status: 'pending', paymentMethod: 'Easypaisa', shippingAddress: '789 Park Avenue, Karachi',
    createdAt: '2025-12-08', deliveredAt: null,
  },
];

// ---------- CHAT MESSAGES ----------
export const chatMessages: ChatMessage[] = [
  { id: 1, senderId: 2, receiverId: 1, productId: 1, productName: 'Samsung Galaxy S25 Ultra', productImage: products[0].images[0], productPrice: 349999, content: 'Is this available in Titanium Black?', quotedMessageId: null, status: 'seen', createdAt: '2025-06-20T10:30:00' },
  { id: 2, senderId: 1, receiverId: 2, productId: null, content: 'Yes, Titanium Black is in stock! Would you like me to reserve one for you?', quotedMessageId: 1, quotedMessage: { id: 1, senderId: 2, receiverId: 1, productId: 1, productName: 'Samsung Galaxy S25 Ultra', productImage: products[0].images[0], productPrice: 349999, content: 'Is this available in Titanium Black?', quotedMessageId: null, status: 'seen', createdAt: '2025-06-20T10:30:00' }, status: 'seen', createdAt: '2025-06-20T10:32:00' },
  { id: 3, senderId: 3, receiverId: 1, productId: 4, productName: 'Women\'s Lawn Printed Suit', productImage: products[3].images[0], productPrice: 3499, content: 'What sizes are available in the Pink color?', quotedMessageId: null, status: 'seen', createdAt: '2025-06-22T14:00:00' },
  { id: 4, senderId: 1, receiverId: 3, productId: null, content: 'Pink is available in M, L, and XL sizes. M is selling fast!', quotedMessageId: 3, quotedMessage: { id: 3, senderId: 3, receiverId: 1, productId: 4, productName: 'Women\'s Lawn Printed Suit', productImage: products[3].images[0], productPrice: 3499, content: 'What sizes are available in the Pink color?', quotedMessageId: null, status: 'seen', createdAt: '2025-06-22T14:00:00' }, status: 'seen', createdAt: '2025-06-22T14:05:00' },
  { id: 5, senderId: 3, receiverId: 1, productId: null, content: 'Great! I\'ll order size M right away. Thank you!', quotedMessageId: null, status: 'delivered', createdAt: '2025-06-22T14:07:00' },
];

// ---------- WISHLIST ----------
export const mockWishlist: Record<number, number[]> = {
  2: [2, 5, 8],
  3: [4, 9, 16],
  4: [1, 7],
};

// ---------- ADMIN DASHBOARD DATA ----------
export const adminDashboardData: AdminDashboardViewModel = {
  totalSales: 1687500,
  totalOrders: 1458,
  totalUsers: 3421,
  totalProducts: 85,
  recentOrders: orders,
  topProducts: products.slice(0, 5),
  salesChart: [
    { month: 'Jan', sales: 120000 }, { month: 'Feb', sales: 150000 }, { month: 'Mar', sales: 180000 },
    { month: 'Apr', sales: 140000 }, { month: 'May', sales: 200000 }, { month: 'Jun', sales: 220000 },
  ],
  orderStatusDistribution: [
    { status: 'pending', count: 45 }, { status: 'confirmed', count: 120 }, { status: 'shipped', count: 89 },
    { status: 'delivered', count: 1156 }, { status: 'cancelled', count: 48 },
  ],
};
