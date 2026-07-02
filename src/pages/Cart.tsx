// Cart Page — Dark+Light | BazaarHub
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { items, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 5000 ? 0 : 200;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything yet!</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Browse Products <ArrowRight size={18} /></Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"><ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" /></button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart ({cartCount} item{cartCount !== 1 ? 's' : ''})</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 sm:p-4 flex gap-3">
              <Link to={`/product/${item.product.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 line-clamp-2">{item.product.name}</Link>
                {item.size && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Size: {item.size}</p>}
                {item.color && <p className="text-xs text-gray-500 dark:text-gray-400">Color: {item.color}</p>}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"><Minus size={12} /></button>
                      <span className="px-2 text-sm font-medium dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"><Plus size={12} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 h-fit sticky top-28">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Subtotal</span><span className="dark:text-white">Rs. {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-semibold' : 'dark:text-white'}>{shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span></div>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex justify-between font-bold text-base"><span className="dark:text-white">Total</span><span className="text-indigo-600 dark:text-indigo-400">Rs. {total.toLocaleString()}</span></div>
          </div>
          {subtotal < 5000 && subtotal > 0 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">Add Rs. {(5000 - subtotal).toLocaleString()} more for free shipping!</p>}
          <button onClick={() => navigate('/checkout')} className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">Proceed to Checkout <ArrowRight size={18} /></button>
          <Link to="/products" className="block text-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-3">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
