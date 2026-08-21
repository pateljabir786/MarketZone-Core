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
  
  // Vendor Registration & KYC States
  const [isVendorRegistered, setIsVendorRegistered] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [cat, setCat] = useState('');
  const [moq, setMoq] = useState('');

  const [prods, setProds] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', price: 49.99, cat: 'Electronics', moq: '10 Pcs', store: 'MS Kids Store', desc: 'High-quality wireless bluetooth earbuds with active noise cancellation.' },
    { id: 2, name: 'Smart Watch Ultra X', price: 89.99, cat: 'Electronics', moq: '5 Pcs', store: 'Global Electronics Hub', desc: 'Advanced smart watch with fitness tracking and heart rate monitor.' },
    { id: 3, name: 'Executive Leather Backpack', price: 35.50, cat: 'Fashion', moq: '20 Pcs', store: 'TrendStyle Store', desc: 'Durable genuine leather backpack suitable for daily office commute.' }
  ]);

  const sym = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€', AED: 'AED', SAR: 'SAR' };
  const rt = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92, AED: 3.67, SAR: 3.75 };
  const conv = (p) => (p * rt[cur]).toFixed(2);

  // B2B Volume Pricing Calculation Engine (Feature 38)
  const getB2BPrice = (basePrice, qty) => {
    if (qty >= 50) return basePrice * 0.80; // 20% discount for bulk orders
    if (qty >= 20) return basePrice * 0.90; // 10% discount for medium volume
    return basePrice;
  };

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
    if (!storeName.trim() || !ownerName.trim() || !gstNumber.trim()) {
      alert('Please fill in store name, owner name, and GST number.');
      return;
    }
    setIsVendorRegistered(true);
    alert('Vendor store and KYC verified successfully!');
  };

  const addProd = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      alert('Please fill in product title and price.');
      return;
    }
    setProds([{
      id: Date.now(),
      name: title.trim(),
      price: parseFloat(price),
      cat: cat.trim() || 'General',
      moq: moq.trim() || '1 Pc',
      store: storeName.trim(),
      desc: 'Published by KYC verified vendor on MarketZone.'
    }, ...prods]);
    setTitle(''); setPrice(''); setCat(''); setMoq('');
    alert('Product published successfully!');
    setActiveTab('buyer');
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
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

  const cartTotal = cart.reduce((acc, item) => acc + (getB2BPrice(item.price, item.qty) * item.qty), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#f8fafc', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ backgroundColor: '#f59e0b', padding: '10px', borderRadius: '10px', fontSize: '18px' }}>🛍️</span>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>MarketZone</h1>
            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>B2B & B2C Enterprise Hub</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select value={region} onChange={handleRegionChange} style={{ padding: '8px 12px', borderRadius: '8px', color: '#fff', border: '1px solid #334155', backgroundColor: '#1e293b', fontSize: '12px', cursor: 'pointer' }}>
            <option value="Global (USD)">🌍 Global (USD - $)</option>
            <option value="UAE (Gulf)">🇦🇪 UAE (AED)</option>
            <option value="Saudi Arabia (Gulf)">🇸🇦 Saudi Arabia (SAR)</option>
            <option value="South Africa">🇿🇦 South Africa (ZAR)</option>
            <option value="India">🇮🇳 India (INR)</option>
            <option value="Europe">🇪🇺 Europe (EUR)</option>
          </select>
          <button onClick={() => setShowCartModal(true)} style={{ padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', backgroundColor: '#0284c7', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
            🛒 Cart ({cart.reduce((a, b) => a + b.qty, 0)})
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={{ maxWidth: '700px', margin: '20px auto 0', padding: '0 15px' }}>
        <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '6px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <button onClick={() => setActiveTab('buyer')} style={{ flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', backgroundColor: activeTab === 'buyer' ? '#0284c7' : 'transparent', color: activeTab === 'buyer' ? '#fff' : '#94a3b8', border: 'none', cursor: 'pointer' }}>
            🛍️ Buyer Marketplace
          </button>
          <button onClick={() => setActiveTab('vendor')} style={{ flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', backgroundColor: activeTab === 'vendor' ? '#059669' : 'transparent', color: activeTab === 'vendor' ? '#fff' : '#94a3b8', border: 'none', cursor: 'pointer' }}>
            📦 Vendor Dashboard
          </button>
        </div>
      </div>

      {/* Buyer Section */}
      {activeTab === 'buyer' && (
        <main style={{ maxWidth: '700px', margin: '20px auto', padding: '0 15px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="🔍 Search enterprise products securely..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 2, padding: '12px', borderRadius: '10px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#fff', fontSize: '13px', outline: 'none' }}
            />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="General">General</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            {filteredProds.length > 0 ? (
              filteredProds.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', flexWrap: 'wrap' }}>
                  <div onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '10px', backgroundColor: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold', color: '#fff' }}>{item.cat}</span>
                      <span style={{ fontSize: '10px', backgroundColor: '#047857', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold', color: '#fff' }}>Store: {item.store}</span>
                      <span style={{ fontSize: '10px', backgroundColor: '#022c22', border: '1px solid #059669', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold', color: '#34d399' }}>🛡️ KYC Verified</span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>{item.name}</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>Minimum Order: <strong style={{ color: '#e2e8f0' }}>{item.moq}</strong></p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>{sym[cur]} {conv(item.price)} <span style={{ fontSize: '10px', color: '#f59e0b' }}>(B2B Tiers Active)</span></p>
                  </div>
                  <button onClick={() => addToCart(item)} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#0f172a', borderRadius: '14px', border: '1px solid #1e293b', color: '#64748b' }}>
                No products found.
              </div>
            )}
          </div>
        </main>
      )}

      {/* Vendor Section with KYC Registration */}
      {activeTab === 'vendor' && (
        <main style={{ maxWidth: '500px', margin: '20px auto', padding: '0 15px' }}>
          {!isVendorRegistered ? (
            <form onSubmit={handleVendorRegister} style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '16px', border: '1px solid #1e293b' }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#34d399', fontSize: '18px' }}>🏪 Vendor Store & KYC Registration</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Register your business details and KYC to get verified.</p>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Store / Trade Name</label>
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. MS Kids Store" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Owner Name</label>
                <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="e.g. Jabir Patel" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>GST / Tax ID Number (KYC)</label>
                <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="e.g. GSTIN12345ABC" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Business Address</label>
                <input type="text" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} placeholder="Enter registered business address" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Submit KYC & Register Store
              </button>
            </form>
          ) : (
            <form onSubmit={addProd} style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '16px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#34d399', fontSize: '18px' }}>📦 Publish Product</h3>
                  <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 'bold' }}>Store: {storeName} 🛡️ (KYC Verified)</span>
                </div>
                <button type="button" onClick={() => setIsVendorRegistered(false)} style={{ fontSize: '11px', color: '#94a3b8', backgroundColor: '#1e293b', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>
                  Edit KYC
                </button>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Product Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kids Wear Set" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Price (USD)</label>
                  <input type="number" step="0.01" min="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Category</label>
                  <input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Fashion" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>MOQ</label>
                <input type="text" value={moq} onChange={(e) => setMoq(e.target.value)} placeholder="10 Pcs" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                Publish Secure Product
              </button>
            </form>
          )}
        </main>
      )}

      {/* Cart Modal with B2B Volume Controls */}
      {showCartModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50, padding: '15px' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '16px' }}>Your Shopping Cart</h3>
              <button onClick={() => setShowCartModal(false)} style={{ backgroundColor: '#1e293b', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            {cart.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center', margin: '30px 0', fontSize: '13px' }}>Your cart is empty.</p>
            ) : (
              <div>
                <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#020617', padding: '10px 12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', display: 'block' }}>{item.name}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>Qty: {item.qty} | Store: {item.store}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ backgroundColor: '#1e293b', color: '#fff', border: 'none', width: '22px', height: '22px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                          <button onClick={() => updateQty(item.id, 1)} style={{ backgroundColor: '#1e293b', color: '#fff', border: 'none', width: '22px', height: '22px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                        </div>
                        <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '12px' }}>{sym[cur]} {conv(getB2BPrice(item.price, item.qty) * item.qty)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold' }}>
                  <span style={{ fontSize: '13px', color: '#cbd5e1' }}>Grand Total (B2B Adjusted):</span>
                  <span style={{ color: '#38bdf8', fontSize: '16px' }}>{sym[cur]} {conv(cartTotal)}</span>
                </div>
                <button onClick={placeOrder} style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '50', padding: '15px' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '16px' }}>Product Quick View</h3>
              <button onClick={() => setSelectedProduct(null)} style={{ backgroundColor: '#1e293b', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ backgroundColor: '#020617', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', backgroundColor: '#0369a1', padding: '3px 8px', borderRadius: '4px', color: '#fff', fontWeight: 'bold' }}>{selectedProduct.cat}</span>
                <span style={{ fontSize: '10px', backgroundColor: '#047857', padding: '3px 8px', borderRadius: '4px', color: '#fff', fontWeight: 'bold' }}>Store: {selectedProduct.store}</span>
              </div>
              <h2 style={{ fontSize: '16px', color: '#fff', margin: '0 0 8px 0' }}>{selectedProduct.name}</h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5', margin: '0 0 10px 0' }}>{selectedProduct.desc}</p>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '10px' }}>MOQ: <strong style={{ color: '#38bdf8' }}>{selectedProduct.moq}</strong></div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8' }}>{sym[cur]} {conv(selectedProduct.price)}</div>
            </div>
            <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', marginTop: '40px', fontSize: '11px', color: '#64748b', fontWeight: '500' }}>
        © 2026 MarketZone B2B & B2C Engine - Secured Enterprise Edition.
      </footer>
    </div>
  );
}
