'use client';
import { useState } from 'react';

export default function MarketZoneHome() {
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, name: '24K Gold Finished Premium Jewelry Set', price: 120, category: 'Jewelry', moq: '200 Pieces' },
    { id: 2, name: 'Smart Android Mobile Phone 5G', price: 250, category: 'Electronics', moq: '50 Pieces' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newMoq, setNewMoq] = useState('');

  const rates = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92 };
  const symbols = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€' };

  const convertPrice = (usdPrice) => {
    return (usdPrice * rates[currency]).toFixed(2);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setAlertMessage(`${product.name} added to cart!`);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newProductObj = {
      id: products.length + 1,
      name: newTitle,
      price: parseFloat(newPrice),
      category: newCategory || 'General',
      moq: newMoq || '100 Pieces',
    };

    setProducts([newProductObj, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewCategory('');
    setNewMoq('');
    setShowAddForm(false);
    setAlertMessage('New Product added successfully by Vendor!');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      
      {alertMessage && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: '#fff', padding: '12px 24px', borderRadius: '8px', zIndex: 1000, fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          {alertMessage}
        </div>
      )}

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #334155', backgroundColor: '#1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#f59e0b', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', color: '#000' }}>M</div>
          <div>
            <h1 style={{ fontSize: '18px', margin: 0, color: '#38bdf8' }}>MarketZone</h1>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>B2B & B2C MARKETPLACE</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#334155', color: '#fff', border: 'none' }}>
            <option value="USD">USD ($)</option>
            <option value="ZAR">ZAR (R)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
          </select>

          <button style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold' }}>
            Cart ({cart.length})
          </button>
        </div>
      </header>

      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Live Product Marketplace</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          {showAddForm ? 'Close Form' : '+ Add Product (Vendor)'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddProduct} style={{ maxWidth: '800px', margin: '0 auto 20px auto', backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ marginTop: 0, color: '#38bdf8' }}>Vendor Portal - Add New Item</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Product Title:</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter product name..." required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Price (USD):</label>
              <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="99.00" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Category:</label>
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Electronics, Fashion..." style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>MOQ (Minimum Order):</label>
            <input type="text" value={newMoq} onChange={(e) => setNewMoq(e.target.value)} placeholder="100 Pieces" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} />
          </div>

          <button type="submit" style={{ width: '100%', backgroundColor: '#f59e0b', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Publish Product to Marketplace
          </button>
        </form>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        {products.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', backgroundColor: '#0284c7', padding: '2px 6px', borderRadius: '4px' }}>{item.category}</span>
              <h3 style={{ fontSize: '16px', margin: '8px 0 5px 0' }}>{item.name}</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>MOQ Required: {item.moq}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', margin: '8px 0 0 0' }}>
                {symbols[currency]} {convertPrice(item.price)}
              </p>
            </div>
            
            <button 
              onClick={() => addToCart(item)}
              style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-content' }}>
              Add Cart
            </button>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#64748b' }}>
        © 2026 MarketZone. All rights reserved. B2B & B2C Marketplace Engine.
      </footer>

    </div>
  );
}
