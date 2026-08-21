'use client';
import { useState } from 'react';

// GitHub Repository: pateljabir786/MarketZone-Core
// File Path: app/page.js
export default function MarketZoneApp() {
  const [region, setRegion] = useState('Global (USD)');
  const [cur, setCur] = useState('USD');
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('buyer');
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [prods, setProds] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', price: 49.99, cat: 'Electronics', moq: '10 Pcs', store: 'MS Kids Store' },
    { id: 2, name: 'Smart Watch Ultra X', price: 89.99, cat: 'Electronics', moq: '5 Pcs', store: 'Global Electronics Hub' }
  ]);

  const sym = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€', AED: 'AED', SAR: 'SAR' };
  const rt = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92, AED: 3.67, SAR: 3.75 };
  const conv = (p) => (p * rt[cur]).toFixed(2);

  // B2B Pricing Logic: Discounts applied based on quantity
  const getB2BPrice = (basePrice, qty) => {
    if (qty >= 50) return basePrice * 0.80; // 20% discount
    if (qty >= 20) return basePrice * 0.90; // 10% discount
    return basePrice;
  };

  // Add to cart with quantity tracking
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

  // Final Total calculation with B2B discount
  const cartTotal = cart.reduce((acc, item) => acc + (getB2BPrice(item.price, item.qty) * item.qty), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#f8fafc', paddingBottom: '40px' }}>
      {/* Header */}
      <header style={{ padding: '20px', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '20px' }}>MarketZone B2B</h1>
        <button onClick={() => setShowCartModal(true)} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
          Cart ({cart.reduce((a, b) => a + b.qty, 0)})
        </button>
      </header>

      {/* Product List */}
      <main style={{ maxWidth: '600px', margin: '20px auto', padding: '15px' }}>
        {prods.map(p => (
          <div key={p.id} style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #1e293b' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{p.name}</h3>
            <p style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 'bold' }}>{sym[cur]} {conv(p.price)} / unit</p>
            <button onClick={() => addToCart(p)} style={{ marginTop: '10px', backgroundColor: '#059669', border: 'none', padding: '10px', width: '100%', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      {/* Cart Modal with B2B Details */}
      {showCartModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', padding: '20px' }}>
          <button onClick={() => setShowCartModal(false)} style={{ marginBottom: '20px' }}>Close</button>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.name} (x{item.qty})</span>
              <div>
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
              <span>{sym[cur]} {conv(getB2BPrice(item.price, item.qty) * item.qty)}</span>
            </div>
          ))}
          <h2 style={{ marginTop: '20px' }}>Grand Total: {sym[cur]} {conv(cartTotal)}</h2>
        </div>
      )}
    </div>
  );
}
