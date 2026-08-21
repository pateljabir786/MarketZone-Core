'use client';
import { useState } from 'react';

export default function MarketZoneApp() {
  const [region, setRegion] = useState('Global (USD)');
  const [cur, setCur] = useState('USD');
  const [activeTab, setActiveTab] = useState('buyer');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  // Vendor KYC state
  const [isVendorRegistered, setIsVendorRegistered] = useState(true);
  const [storeName, setStoreName] = useState('Global Electronics Hub');
  const [ownerName, setOwnerName] = useState('Jabir Patel');
  const [gstNumber, setGstNumber] = useState('GSTIN12345ABC');

  const [prods, setProds] = useState([
    { id: 1, name: 'Wireless Earbuds', price: 49.99, cat: 'Electronics', store: 'Global Electronics Hub', moq: '10 Pcs' },
    { id: 2, name: 'Smart Watch X', price: 89.99, cat: 'Electronics', store: 'Global Electronics Hub', moq: '5 Pcs' },
    { id: 3, name: 'Leather Backpack', price: 35.50, cat: 'Fashion', store: 'TrendStyle Store', moq: '20 Pcs' }
  ]);

  const sym = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€', AED: 'AED', SAR: 'SAR' };
  const rt = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92, AED: 3.67, SAR: 3.75 };
  const conv = (p) => (p * rt[cur]).toFixed(2);

  const filteredProds = prods.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.cat === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalQty = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div style={{ backgroundColor: '#090d16', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '15px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#f59e0b', padding: '8px 10px', borderRadius: '8px', fontSize: '18px' }}>🛍️</div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>MarketZone</h1>
            <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>B2B & B2C GLOBAL MARKETPLACE</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#0284c7', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
          🛒 Cart ({totalQty})
        </div>
      </div>

      {/* Region & Currency Selector Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <select value={region} onChange={(e) => { setRegion(e.target.value); if(e.target.value.includes('South Africa')) setCur('ZAR'); else if(e.target.value.includes('India')) setCur('INR'); else setCur('USD'); }} style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', fontSize: '12px' }}>
          <option>🌍 Global (USD)</option>
          <option>🇿🇦 South Africa</option>
          <option>🇮🇳 India</option>
        </select>
        <select value={cur} onChange={(e) => setCur(e.target.value)} style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', fontSize: '12px' }}>
          <option value="USD">USD ($)</option>
          <option value="ZAR">ZAR (R)</option>
          <option value="INR">INR (₹)</option>
        </select>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', backgroundColor: '#0f172a', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '15px' }}>
        <button onClick={() => setActiveTab('buyer')} style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', backgroundColor: activeTab === 'buyer' ? '#0284c7' : 'transparent', color: activeTab === 'buyer' ? '#fff' : '#94a3b8', border: 'none', cursor: 'pointer' }}>
          🛍️ Buyer Marketplace
        </button>
        <button onClick={() => setActiveTab('vendor')} style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', backgroundColor: activeTab === 'vendor' ? '#059669' : 'transparent', color: activeTab === 'vendor' ? '#fff' : '#94a3b8', border: 'none', cursor: 'pointer' }}>
          📦 Vendor Dashboard
        </button>
      </div>

      {/* Buyer Marketplace View */}
      {activeTab === 'buyer' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 2, padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#fff', fontSize: '12px', outline: 'none' }}
            />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#0f172a', color: '#fff', fontSize: '12px' }}>
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredProds.map(p => (
              <div key={p.id} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '9px', backgroundColor: '#0369a1', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{p.cat}</span>
                    <span style={{ fontSize: '9px', backgroundColor: '#047857', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold' }}>Store: {p.store}</span>
                    <span style={{ fontSize: '9px', backgroundColor: '#022c22', border: '1px solid #059669', color: '#34d399', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold' }}>🛡️ Verified Legal Seller</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#fff' }}>{p.name} 🔍</h3>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 6px 0' }}>MOQ: <strong style={{ color: '#e2e8f0' }}>{p.moq}</strong></p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>{sym[cur]} {conv(p.price)}</p>
                </div>
                <button onClick={() => setCart([...cart, { ...p, qty: 1 }])} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', height: 'fit-content' }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vendor Dashboard View */}
      {activeTab === 'vendor' && (
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#34d399', fontSize: '16px' }}>📦 Vendor KYC & Store Management</h3>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '15px' }}>Store Status: <strong style={{ color: '#38bdf8' }}>Verified Legal Seller</strong></p>
          <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b', fontSize: '12px', marginBottom: '15px' }}>
            <div>Store Name: <strong>{storeName}</strong></div>
            <div>Owner: <strong>{ownerName}</strong></div>
            <div>GST / Tax ID: <strong>{gstNumber}</strong></div>
          </div>
          <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>Products Listed: {prods.length} Active Items</div>
        </div>
      )}
    </div>
  );
}
