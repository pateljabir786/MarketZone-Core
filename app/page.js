'use client';
import { useState } from 'react';

export default function MarketZoneApp() {
  const [cart, setCart] = useState([]);
  
  // Product List
  const [prods] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', price: 49.99, weight: 0.5 },
    { id: 2, name: 'Smart Watch Ultra X', price: 89.99, weight: 0.3 }
  ]);

  // B2B Volume Pricing Logic (Feature 38)
  const getB2BPrice = (basePrice, qty) => {
    if (qty >= 50) return basePrice * 0.80;
    if (qty >= 20) return basePrice * 0.90;
    return basePrice;
  };

  // Logistics & Shipping Calculator (Enterprise Feature)
  const calculateShipping = (totalWeight, region) => {
    if (totalWeight <= 0) return 0;
    const baseRate = region === 'International' ? 15.00 : 5.00;
    return baseRate + (totalWeight * 2.50);
  };

  // Tax Splitting Engine (Enterprise Feature)
  const calculateTax = (subtotal) => {
    const taxRate = 0.18; // 18% standard business tax split
    return subtotal * taxRate;
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (getB2BPrice(item.price, item.qty) * item.qty), 0);
  const totalWeight = cart.reduce((acc, item) => acc + (item.weight * item.qty), 0);
  const shippingFee = calculateShipping(totalWeight, 'Domestic');
  const taxAmount = calculateTax(subtotal);
  const grandTotal = subtotal + shippingFee + taxAmount;
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div style={{ backgroundColor: '#090d16', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '24px' }}>MarketZone B2B (Logistics & Tax Hub)</h1>
        <div style={{ backgroundColor: '#0284c7', padding: '10px 20px', borderRadius: '8px' }}>
          Cart ({totalQty}) - Total: ${grandTotal.toFixed(2)}
        </div>
      </header>

      {/* Product List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
        {prods.map(p => (
          <div key={p.id} style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{p.name}</h2>
            <p style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 'bold' }}>${p.price} / unit <span style={{ fontSize: '12px', color: '#94a3b8' }}>({p.weight} kg)</span></p>
            <button 
              onClick={() => addToCart(p)}
              style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', width: '100%' }}
            >
              Add to Cart
            </button>
          </div>
        ))}

        {/* Financial Summary Card */}
        {cart.length > 0 && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', marginTop: '20px' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Order Summary (Enterprise Calculation)</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Subtotal (B2B Adjusted):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Shipping Fee ({totalWeight.toFixed(1)} kg):</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span>Tax Split (18%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1e293b', paddingTop: '12px', fontWeight: 'bold', fontSize: '18px' }}>
              <span>Grand Total:</span>
              <span style={{ color: '#38bdf8' }}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
