'use client';

import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Industrial Solar Inverter 5KW Grid-Tied', category: 'Solar Systems', priceUSD: 450, moq: 10, unit: 'Units', rating: '4.9' },
  { id: 2, name: 'Smart OLED Display Panel 65" Ultra HD', category: 'Electronics', priceUSD: 320, moq: 5, unit: 'Units', rating: '4.8' },
  { id: 3, name: 'Bulk Organic Cotton T-Shirts Package', category: 'Apparel & Garments', priceUSD: 8, moq: 200, unit: 'Pieces', rating: '4.7' },
  { id: 4, name: '24K Gold Finished Premium Jewelry Set', category: 'Jewelry & Accessories', priceUSD: 95, moq: 15, unit: 'Sets', rating: '5.0' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#020617', padding: '12px 20px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' }}>
            Market<span style={{ color: '#fff' }}>Zone</span>
          </div>
          <div style={{ flex: '1', maxWidth: '500px', minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }}
            />
          </div>
          <button 
            onClick={() => setCartCount(cartCount + 1)}
            style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Cart ({cartCount})
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#f1f5f9' }}>
          Featured Supplier Products ({filteredProducts.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ backgroundColor: '#0369a1', color: '#e0f2fe', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>{item.category}</span>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#fff', margin: '10px 0' }}>{item.name}</h3>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8' }}>${item.priceUSD}</p>
              </div>
              <button 
                onClick={() => setCartCount(cartCount + 1)}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}
              >
                Add Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
