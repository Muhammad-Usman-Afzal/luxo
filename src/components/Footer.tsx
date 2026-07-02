// Footer — Dark/Light responsive | BazaarHub
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto border-t border-gray-800">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-700 dark:via-indigo-600 dark:to-violet-700 text-white py-5 sm:py-6">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="text-2xl sm:text-3xl">📬</span>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">Subscribe to Our Newsletter</h3>
              <p className="text-[11px] sm:text-sm text-indigo-100">Get the latest deals and offers straight to your inbox!</p>
            </div>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 sm:w-56 px-4 py-2.5 rounded-xl text-sm bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/25 transition" />
            <button className="bg-white text-indigo-700 hover:bg-gray-100 px-5 py-2.5 rounded-xl font-bold text-sm transition hover:scale-105 active:scale-95 whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">How to Buy</a></li>
            <li><a href="#" className="hover:text-white transition">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">LUXO</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/electronics" className="hover:text-white transition">Electronics</Link></li>
            <li><Link to="/category/fashion" className="hover:text-white transition">Fashion</Link></li>
            <li><Link to="/category/home-living" className="hover:text-white transition">Home & Living</Link></li>
            <li><Link to="/category/sports" className="hover:text-white transition">Sports</Link></li>
            <li><Link to="/category/beauty" className="hover:text-white transition">Beauty & Health</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Payment</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-white text-gray-900 px-2 py-1 rounded">💳 Visa</span>
            <span className="bg-white text-gray-900 px-2 py-1 rounded">💳 Mastercard</span>
            <span className="bg-white text-gray-900 px-2 py-1 rounded">📱 JazzCash</span>
            <span className="bg-white text-gray-900 px-2 py-1 rounded">📱 Easypaisa</span>
            <span className="bg-white text-gray-900 px-2 py-1 rounded">💰 COD</span>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} /> +92 300 1234567</li>
            <li className="flex items-center gap-2"><Mail size={14} /> support@luxo.pk</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Islamabad, Pakistan</li>
          </ul>
          <div className="flex gap-3 mt-3 text-lg">
            <a href="#" className="text-gray-400 hover:text-white transition">📘</a>
            <a href="#" className="text-gray-400 hover:text-white transition">🐦</a>
            <a href="#" className="text-gray-400 hover:text-white transition">📷</a>
            <a href="#" className="text-gray-400 hover:text-white transition">▶️</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        <p>&copy; 2026 LUXO. All rights reserved. This is a demo e-commerce platform.</p>
      </div>
    </footer>
  );
}
