'use client';
import { useState } from 'react';

// GitHub Repository: pateljabir786/MarketZone-Core
// File Path: app/page.js
export default function MarketZoneApp() {
  const [region, setRegion] = useState('Global (USD)');
  const [cur, setCur] = useState('USD');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('buyer');
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Vendor Registration & Store States
  const [isVendorRegistered, setIsVendorRegistered] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  
  // Product Publishing States
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [cat, setCat] = useState('');
  const [moq, setMoq] = useState('');

  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [spamCount, setSpamCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const [prods, setProds] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', price: 49.99, cat: 'Electronics', moq: '10 Pcs', store: 'MS Kids Store', desc: 'High-quality wireless bluetooth earbuds with active noise cancellation.' },
    { id: 2, name: 'Smart Watch Ultra X', price: 89.99, cat: 'Electronics', moq: '5 Pcs', store: 'Global Electronics Hub', desc: 'Advanced smart watch with fitness tracking and heart rate monitor.' },
    { id: 3, name: 'Executive Leather Backpack', price: 35.50, cat: 'Fashion', moq: '20 Pcs', store: 'TrendStyle Store', desc: 'Durable genuine leather backpack suitable for daily office commute.' }
  ]);

  const sym = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€', AED: 'AED', SAR: 'SAR' };
  const rt = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92, AED: 3.67, SAR: 3.75 };
  const conv = (p) => (p * rt[cur]).toFixed(2);

  const handleRegionChange = (e) => {
    const val = e.target.value;
    setRegion(val);
    if (val === 'South Africa') setCur('ZAR');
    else if (val === 'India') setCur('INR');
    else if (val === 'Europe') setCur('EUR');
    else if (val === 'UAE (Gulf)') setCur('AED');
    else if (val === 'Saudi Arabia (Gulf)') setCur('SAR');
    else setCur('USD');
  };

  const handleVendorRegister = (e) => {
    e.preventDefault();
    if (!storeName.trim() || !ownerName.trim()) {
      alert('Please enter both Store Name and Owner Name.');
      return;
    }
    setIsVendorRegistered(true);
    alert('Vendor store registered successfully!');
  };

  const addProd = (e) => {
    e.preventDefault();
    if (isBlocked) {
      alert('Security Alert: You have been blocked due to suspicious activity.');
      return;
    }
    const now = Date.now();
    if (now - lastSubmitTime < 3000) {
      setSpamCount(prev => prev + 1);
      if (spamCount >= 3) {
        setIsBlocked(true);
        alert('Security Alert: Too many requests detected.');
      } else {
        alert('Security Alert: Please wait a few seconds before submitting again.');
      }
      return;
    }
    if (!title.trim() || !price) {
      alert('Please fill in product title and price.');
      return;
    }
    setLastSubmitTime(now);
    setProds([{
      id: Date.now(),
      name: title.trim(),
      price: parseFloat(price),
      cat: cat.trim() || 'General',
      moq: moq.trim() || '1 Pc',
      store: storeName.trim(),
      desc: 'Product published by verified vendor on MarketZone.'
    }, ...prods]);
    setTitle(''); setPrice(''); setCat(''); setMoq('');
    alert('Product published successfully!');
    setActiveTab('buyer');
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      total: cartTotal,
      status: 'Processing (Secure)',
      date: new Date().toLocaleDateString()
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setShowCartModal(false);
    alert('Secure order placed successfully!');
  };

  const filteredProds = prods.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.cat === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 p-2.5 rounded-xl text-black text-lg">🛍️</span>
            <div>
              <h1 className="text-xl font-bold text-sky-400 tracking-wide m-0">MarketZone</h1>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">B2B & B2C Enterprise Hub</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select value={region} onChange={handleRegionChange} className="px-3.5 py-2 rounded-xl text-slate-200 border border-slate-700 bg-slate-800 text-xs font-semibold cursor-pointer">
            <option value="Global (USD)">Global (USD - $)</option>
            <option value="UAE (Gulf)">UAE (AED)</option>
            <option value="Saudi Arabia (Gulf)">Saudi Arabia (SAR)</option>
            <option value="South Africa">South Africa (ZAR)</option>
            <option value="India">India (INR)</option>
            <option value="Europe">Europe (EUR)</option>
          </select>
          <button onClick={() => setShowCartModal(true)} className="px-4 py-2 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm flex items-center gap-2 cursor-pointer">
            Cart <span className="bg-sky-800 px-2 py-0.5 rounded-full text-xs">{cart.length}</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button onClick={() => setActiveTab('buyer')} className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm ${activeTab === 'buyer' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}>
            Buyer Marketplace
          </button>
          <button onClick={() => setActiveTab('vendor')} className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm ${activeTab === 'vendor' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
            Vendor Dashboard
          </button>
        </div>
      </div>

      {/* Buyer Section */}
      {activeTab === 'buyer' && (
        <main className="max-w-3xl mx-auto p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input 
              type="text" 
              placeholder="Search enterprise products securely..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-2 p-3.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-sm focus:outline-none"
            />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="flex-1 p-3.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-sm cursor-pointer">
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="grid gap-4 mb-8">
            {filteredProds.length > 0 ? (
              filteredProds.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div onClick={() => setSelectedProduct(item)} className="cursor-pointer flex-1">
                    <div className="flex gap-2 items-center mb-2.5 flex-wrap">
                      <span className="text-[10px] bg-sky-600 px-2.5 py-1 rounded-lg font-bold text-white">{item.cat}</span>
                      <span className="text-[10px] bg-emerald-600 px-2.5 py-1 rounded-lg font-bold text-white">Store: {item.store}</span>
                      <span className="text-[10px] bg-emerald-950 border border-emerald-600 px-2.5 py-1 rounded-lg font-bold text-emerald-400">Verified Legal</span>
                    </div>
                    <h3 className="text-base font-bold text-white m-0">{item.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Minimum Order: <strong className="text-slate-200">{item.moq}</strong></p>
                    <p className="text-xl font-bold text-sky-400 mt-2">{sym[cur]} {conv(item.price)}</p>
                  </div>
                  <button onClick={() => setCart([...cart, item])} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white border-none px-5 py-3 rounded-xl font-bold cursor-pointer text-xs sm:text-sm">
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-slate-500 text-sm m-0">No products found.</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Vendor Section with Registration & Product Publishing Flow */}
      {activeTab === 'vendor' && (
        <main className="max-w-xl mx-auto p-4 sm:p-6">
          {!isVendorRegistered ? (
            <form onSubmit={handleVendorRegister} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="m-0 text-emerald-400 text-lg font-bold mb-2">Vendor Store Registration</h3>
              <p className="text-xs text-slate-400 mb-6">First register your store details to start publishing products.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold block mb-1.5 text-slate-300">Store / Trade Name</label>
                  <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. MS Kids Store" required className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5 text-slate-300">Owner Name</label>
                  <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="e.g. Jabir Patel" required className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none py-3.5 rounded-xl font-bold cursor-pointer text-sm">
                Register Store & Continue
              </button>
            </form>
          ) : (
            <form onSubmit={addProd} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="m-0 text-emerald-400 text-lg font-bold">Publish Product</h3>
                  <span className="text-xs text-sky-400 font-semibold">Store: {storeName}</span>
                </div>
                <button type="button" onClick={() => setIsVendorRegistered(false)} className="text-xs text-slate-400 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border-none cursor-pointer">
                  Edit Store
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold block mb-1.5 text-slate-300">Product Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kids Wear Set" required className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1.5 text-slate-300">Price (USD)</label>
                    <input type="number" step="0.01" min="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1.5 text-slate-300">Category</label>
                    <input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Fashion" className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5 text-slate-300">MOQ</label>
                  <input type="text" value={moq} onChange={(e) => setMoq(e.target.value)} placeholder="10 Pcs" className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none py-3.5 rounded-xl font-bold cursor-pointer text-sm">
                Publish Secure Product
              </button>
            </form>
          )}
        </main>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="m-0 text-base font-bold text-sky-400">Your Shopping Cart</h3>
              <button onClick={() => setShowCartModal(false)} className="bg-slate-800 text-slate-300 w-8 h-8 rounded-full border-none flex items-center justify-center cursor-pointer">✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-slate-500 text-center my-8 text-sm">Your cart is empty.</p>
            ) : (
              <div>
                <div className="max-h-60 overflow-y-auto mb-4 flex flex-col gap-2.5">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-xs font-bold text-white block">{item.name}</span>
                        <span className="text-[10px] text-slate-400">Store: {item.store}</span>
                      </div>
                      <span className="text-sky-400 font-bold text-xs">{sym[cur]} {conv(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between mb-5 font-bold">
                  <span className="text-sm text-slate-300">Total:</span>
                  <span className="text-sky-400 text-lg">{sym[cur]} {conv(cartTotal)}</span>
                </div>
                <button onClick={placeOrder} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none py-3.5 rounded-xl font-bold cursor-pointer text-sm">
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="text-center mt-16 text-xs text-slate-500 font-medium">
        © 2026 MarketZone B2B & B2C Engine - Secured Enterprise Edition.
      </footer>
    </div>
  );
}
