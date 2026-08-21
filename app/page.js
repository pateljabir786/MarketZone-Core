'use client';
import { useState } from 'react';

export default function MarketZoneApp() {
  const [cart, setCart] = useState([]);
  
  // પ્રોડક્ટ લિસ્ટ
  const [prods] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', price: 49.99 },
    { id: 2, name: 'Smart Watch Ultra X', price: 89.99 }
  ]);

  // B2B વોલ્યુમ પ્રાઇસિંગ લોજીક (Feature 38)
  const getB2BPrice = (basePrice, qty) => {
    if (qty >= 50) return basePrice * 0.80; // 20% Discount
    if (qty >= 20) return basePrice * 0.90; // 10% Discount
    return basePrice;
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (getB2BPrice(item.price, item.qty) * item.qty), 0);
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div style={{ backgroundColor: '#090d16', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '24px' }}>MarketZone B2B</h1>
        <div style={{ backgroundColor: '#0284c7', padding: '10px 20px', borderRadius: '8px' }}>
          Cart ({totalQty}) - Total: ${cartTotal.toFixed(2)}
        </div>
      </header>

      {/* Product List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {prods.map(p => (
          <div key={p.id} style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{p.name}</h2>
            <p style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 'bold' }}>${p.price} / unit</p>
            <button 
              onClick={() => addToCart(p)}
              style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', width: '100%' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
