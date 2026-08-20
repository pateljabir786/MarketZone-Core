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
  
  const [storeName, setStoreName] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [cat, setCat] = useState('');
  const [moq, setMoq] = useState('');

  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [spamCount, setSpamCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const [prods, setProds] = useState([
    { id: 1, name: 'Wireless Earbuds', price: 49.99, cat: 'Electronics', moq: '10 Pcs', store: 'Global Electronics Hub', desc: 'High-quality wireless bluetooth earbuds with active noise cancellation and long battery life.' },
    { id: 2, name: 'Smart Watch X', price: 89.99, cat: 'Electronics', moq: '5 Pcs', store: 'Global Electronics Hub', desc: 'Advanced smart watch with fitness tracking, heart rate monitor, and custom dials.' },
    { id: 3, name: 'Leather Backpack', price: 35.50, cat: 'Fashion', moq: '20 Pcs', store: 'TrendStyle Store', desc: 'Durable genuine leather backpack suitable for daily office commute and travel.' }
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

  const addProd = (e) => {
    e.preventDefault();
    if (isBlocked) {
      alert('સુરક્ષા ચેતવણી: શંકાસ્પદ પ્રવૃત્તિને કારણે તમને કામચલાઉ રીતે બ્લોક કરવામાં આવ્યા છે.');
      return;
    }
    const now = Date.now();
    if (now - lastSubmitTime < 3000) {
      setSpamCount(prev => prev + 1);
      if (spamCount >= 3) {
        setIsBlocked(true);
        alert('સુરક્ષા ચેતવણી: વધુ પડતી શંકાસ્પદ વિનંતીઓ મળી છે.');
      } else {
        alert('સુરક્ષા ચેતવણી: મહેરબાની કરીને થોડી રાહ જુઓ.');
      }
      return;
    }
    if (!title.trim() || !price || !storeName.trim()) {
      alert('મહેરબાની કરીને તમામ જરૂરી વિગતો ભરો.');
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
      desc: 'MarketZone પર નવું રજીસ્ટર થયેલ એન્ટરપ્રાઈઝ ઉત્પાદન.'
    }, ...prods]);
    setTitle(''); setPrice(''); setCat(''); setMoq(''); setStoreName('');
    alert('🛡️ પ્રોડક્ટ સફળતાપૂર્વક પબ્લિશ થઈ ગઈ છે!');
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
    alert('🛡️ સુરક્ષિત ઓર્ડર પ્લેસ થઈ ગયો છે!');
  };

  const filteredProds = prods.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.cat === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', paddingBottom: '40px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#1e293b', borderBottom: '1px solid #334155', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ background: '#f59e0b', padding: '8px 10px', borderRadius: '8px', fontSize: '16px' }}>🛍️</span>
          <div>
            <h1 style={{ fontSize: '18px', margin: 0, color: '#38bdf8', fontWeight: 'bold' }}>MarketZone</h1>
            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600' }}>ENTERPRISE B2B/B2C GLOBAL HUB</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <select value={region} onChange={handleRegionChange} style={{ padding: '8px', borderRadius: '6px', color: '#fff', background: '#334155', border: '1px solid #475569', fontSize: '12px' }}>
            <option value="Global (USD)">🌍 Global (USD - $)</option>
            <option value="UAE (Gulf)">🇦🇪 UAE (AED)</option>
            <option value="Saudi Arabia (Gulf)">🇸🇦 Saudi Arabia (SAR)</option>
            <option value="South Africa">🇿🇦 South Africa (ZAR)</option>
            <option value="India">🇮🇳 India (INR)</option>
            <option value="Europe">🇪🇺 Europe (EUR)</option>
          </select>
          <button onClick={() => setShowCartModal(true)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
            🛒 Cart ({cart.length})
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#1e293b', borderBottom: '1px solid #334155', maxWidth: '800px', margin: '0 auto', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
        <button onClick={() => setActiveTab('buyer')} style={{ flex: 1, padding: '12px', background: activeTab === 'buyer' ? '#0f172a' : 'transparent', color: activeTab === 'buyer' ? '#38bdf8' : '#94a3b8', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderBottom: activeTab === 'buyer' ? '3px solid #38bdf8' : 'none', fontSize: '13px' }}>
          🛍️ Buyer Marketplace
        </button>
        <button onClick={() => setActiveTab('vendor')} style={{ flex: 1, padding: '12px', background: activeTab === 'vendor' ? '#0f172a' : 'transparent', color: activeTab === 'vendor' ? '#10b981' : '#94a3b8', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderBottom: activeTab === 'vendor' ? '3px solid #10b981' : 'none', fontSize: '13px' }}>
          📦 Vendor Dashboard
        </button>
      </div>

      {/* Buyer Section */}
      {activeTab === 'buyer' && (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Search enterprise products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 2, minWidth: '200px', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13px' }} />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ flex: 1, minWidth: '130px', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '13px' }}>
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="General">General</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
            {filteredProds.length > 0 ? (
              filteredProds.map((item) => (
                <div key={item.id} style={{ background: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer', flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '10px', background: '#0284c7', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{item.cat}</span>
                      <span style={{ fontSize: '10px', background: '#059669', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Store: {item.store}</span>
                      <span style={{ fontSize: '10px', background: '#065f46', border: '1px solid #10b981', padding: '2px 6px', borderRadius: '4px', color: '#34d399', fontWeight: 'bold' }}>🛡️ Verified Legal</span>
                    </div>
                    <h3 style={{ fontSize: '16px', margin: '6px 0', color: '#fff' }}>{item.name} 🔍</h3>
                    <p style={{ fontSize: '12px', color: '#38bdf8', margin: '0 0 6px 0' }}>MOQ: {item.moq}</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>{sym[cur]} {conv(item.price)}</p>
                  </div>
                  <button onClick={() => setCart([...cart, item])} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>No products found.</p>
            )}
          </div>

          <div style={{ background: '#1e293b', padding: '16px', borderRadius: '10px', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '15px', color: '#38bdf8', marginTop: 0, marginBottom: '12px' }}>📦 Secure Order History</h3>
            {orders.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>No orders placed yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {orders.map((ord, idx) => (
                  <div key={idx} style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #334155', fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>{ord.id}</span>
                      <span style={{ background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{ord.status}</span>
                    </div>
                    <div style={{ color: '#cbd5e1', marginBottom: '4px' }}>Items: {ord.items.map(i => i.name).join(', ')}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                      <span>Date: {ord.date}</span>
                      <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>Total: {sym[cur]} {conv(ord.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vendor Section */}
      {activeTab === 'vendor' && (
        <div style={{ padding: '20px', maxWidth: '550px', margin: '0 auto' }}>
          <form onSubmit={addProd} style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#10b981', fontSize: '16px', marginBottom: '14px' }}>🛡️ Secure Vendor Storefront</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: '#cbd5e1' }}>Store Name</label>
              <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. MS Kids Store" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box', fontSize: '13px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: '#cbd5e1' }}>Product Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kids Wear Set" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box', fontSize: '13px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: '#cbd5e1' }}>Price (USD)</label>
                <input type="number" step="0.01" min="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box', fontSize: '13px' }} />
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: '#cbd5e1' }}>Category</label>
                <input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Fashion" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box', fontSize: '13px' }} />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: '#cbd5e1' }}>MOQ</label>
              <input type="text" value={moq} onChange={(e) => setMoq(e.target.value)} placeholder="10 Pcs" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box', fontSize: '13px' }} />
            </div>
            <button type="submit" style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              Publish Secure Product
            </button>
          </form>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ background: '#1e293b', width: '100%', maxWidth: '420px', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#38bdf8' }}>Product Quick View</h3>
              <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', marginBottom: '14px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', background: '#0284c7', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{selectedProduct.cat}</span>
                <span style={{ fontSize: '10px', background: '#059669', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Store: {selectedProduct.store}</span>
              </div>
              <span style={{ fontSize: '10px', background: '#065f46', border: '1px solid #10b981', padding: '2px 6px', borderRadius: '4px', color: '#34d399', fontWeight: 'bold', display: 'inline-block', marginBottom: '8px' }}>🛡️ Verified Legal Seller</span>
              <h2 style={{ fontSize: '16px', color: '#fff', margin: '0 0 6px 0' }}>{selectedProduct.name}</h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.4', marginBottom: '10px' }}>{selectedProduct.desc}</p>
              <div style={{ fontSize: '12px', color: '#38bdf8', marginBottom: '6px' }}>MOQ: <b>{selectedProduct.moq}</b></div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginTop: '8px' }}>{sym[cur]} {conv(selectedProduct.price)}</div>
            </div>
            <button onClick={() => { setCart([...cart, selectedProduct]); setSelectedProduct(null); }} style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ background: '#1e293b', width: '100%', maxWidth: '420px', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#38bdf8' }}>Your Shopping Cart</h3>
              <button onClick={() => setShowCartModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            {cart.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center', margin: '30px 0', fontSize: '13px' }}>Your cart is empty.</p>
            ) : (
              <div>
                <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #334155' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', display: 'block' }}>{item.name}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>MOQ: {item.moq}</span>
                      </div>
                      <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '13px' }}>{sym[cur]} {conv(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #334155', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontWeight: 'bold', fontSize: '14px' }}>
                  <span>Total:</span>
                  <span style={{ color: '#38bdf8', fontSize: '16px' }}>{sym[cur]} {conv(cartTotal)}</span>
                </div>
                <button onClick={placeOrder} style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', marginTop: '40px', fontSize: '11px', color: '#64748b', fontWeight: '500' }}>
        © 2026 MarketZone B2B & B2C Engine - Enterprise Edition.
      </footer>
    </div>
  );
}
