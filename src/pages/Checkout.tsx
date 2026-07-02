// Checkout — Dark+Light | BazaarHub
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Wallet, Banknote, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive your order' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard' },
  { id: 'jazzcash', name: 'JazzCash', icon: Wallet, desc: 'Pay via JazzCash mobile wallet' },
  { id: 'easypaisa', name: 'Easypaisa', icon: Wallet, desc: 'Pay via Easypaisa mobile wallet' },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shipping = subtotal >= 5000 ? 0 : 200;
  const total = subtotal + shipping;
  const inputClass = "w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none bg-white dark:bg-gray-800 dark:text-white focus:ring-1 focus:ring-indigo-500 transition";

  if (!isAuthenticated) return <div className="max-w-2xl mx-auto px-4 py-20 text-center dark:text-white"><p className="text-5xl mb-4">🔒</p><h1 className="text-2xl font-bold mb-4">Please Login to Checkout</h1><Link to="/login" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">Go to Login</Link></div>;
  if (items.length === 0 && !orderPlaced) return <div className="max-w-2xl mx-auto px-4 py-20 text-center dark:text-white"><p className="text-5xl mb-4">🛒</p><h1 className="text-2xl font-bold mb-4">Your cart is empty</h1><Link to="/products" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700"><ArrowLeft size={18} /> Shop Now</Link></div>;
  if (orderPlaced) {
    return (<div className="max-w-2xl mx-auto px-4 py-20 text-center dark:text-white"><CheckCircle size={64} className="mx-auto text-green-500 mb-4" /><h1 className="text-2xl font-bold mb-2">Order Placed Successfully! 🎉</h1><p className="text-gray-500 dark:text-gray-400 mb-2">Order #{Date.now().toString().slice(-6)}</p><p className="text-gray-500 dark:text-gray-400 mb-6">We'll send you a confirmation email shortly.</p><div className="flex gap-3 justify-center"><Link to="/dashboard/orders" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700">Track Order</Link><Link to="/" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700">Continue Shopping</Link></div></div>);
  }

  const handlePlaceOrder = () => { if (!address.trim() || !city.trim() || !phone.trim()) { alert('Please fill in all shipping details.'); return; } setOrderPlaced(true); clearCart(); };

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-4 dark:text-white">
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1,2].map(s => (<div key={s} className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>{s}</div><span className={`text-sm font-medium ${s <= step ? 'text-indigo-600' : 'text-gray-400'}`}>{s === 1 ? 'Shipping' : 'Confirmation'}</span>{s === 1 && <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-600" />}</div>))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {step === 1 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Truck size={20} /> Shipping Details</h2>
              <div className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">Full Name</label><input type="text" value={user?.fullName || ''} disabled className={`${inputClass} bg-gray-50 dark:bg-gray-700`} /></div>
                <div><label className="block text-sm font-medium mb-1">Phone *</label><input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+92 300 1234567" className={inputClass} /></div>
                <div><label className="block text-sm font-medium mb-1">City *</label><input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter your city" className={inputClass} /></div>
                <div><label className="block text-sm font-medium mb-1">Address *</label><textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} placeholder="House no., street, area..." className={inputClass} /></div>
              </div>
              <button onClick={() => setStep(2)} className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700">Continue to Payment</button>
            </div>
          )}
          {step === 2 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
              <h2 className="text-lg font-bold mb-4">💳 Payment Method</h2>
              <div className="space-y-3">{paymentMethods.map(pm => { const Icon = pm.icon; return (
                <label key={pm.id} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${paymentMethod === pm.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'}`}>
                  <input type="radio" name="pay" checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} className="accent-indigo-600" /><Icon size={24} className="text-gray-600 dark:text-gray-400" /><div><p className="font-medium text-sm">{pm.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{pm.desc}</p></div>
                </label>
              );})}</div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(1)} className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800">← Back</button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700">Place Order — Rs. {total.toLocaleString()}</button>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 h-fit sticky top-28">
          <h2 className="text-lg font-bold mb-4">Your Order</h2>
          <div className="space-y-3">{items.map(item => (
            <div key={item.id} className="flex gap-2 text-sm"><img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg flex-shrink-0" /><div className="min-w-0 flex-1"><p className="truncate">{item.product.name}</p><p className="text-gray-500 dark:text-gray-400 text-xs">Qty: {item.quantity}</p></div><span className="font-semibold text-xs">Rs. {(item.product.price * item.quantity).toLocaleString()}</span></div>
          ))}</div>
          <div className="border-t border-gray-100 dark:border-gray-800 mt-3 pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Shipping</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span></div>
            <div className="flex justify-between font-bold text-base border-t border-gray-100 dark:border-gray-800 pt-2"><span>Total</span><span className="text-indigo-600 dark:text-indigo-400">Rs. {total.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
