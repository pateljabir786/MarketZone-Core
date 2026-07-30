'use client';

import React, { useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Industrial Solar Inverter 5KW Grid-Tied',
    category: 'Solar Systems',
    priceUSD: 450,
    moq: 10,
    unit: 'Units',
    rating: '4.9',
    supplier: 'Global Tech Energy Ltd.',
  },
  {
    id: 2,
    name: 'Smart OLED Display Panel 65" Ultra HD',
    category: 'Electronics',
    priceUSD: 320,
    moq: 5,
    unit: 'Units',
    rating: '4.8',
    supplier: 'Apex Vision Tech Co.',
  },
  {
    id: 3,
    name: 'Bulk Organic Cotton T-Shirts Package',
    category: 'Apparel & Garments',
    priceUSD: 8,
    moq: 200,
    unit: 'Pieces',
    rating: '4.7',
    supplier: 'Textile Hub Corporation',
  },
  {
    id: 4,
    name: '24K Gold Finished Premium Jewelry Set',
    category: 'Jewelry & Accessories',
    priceUSD: 95,
    moq: 15,
    unit: 'Sets',
    rating: '5.0',
    supplier: 'Royal Sparkle Jewels',
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState([]);

  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    ZAR: { symbol: 'R', rate: 18.5 },
    INR: { symbol: '₹', rate: 83 },
    EUR: { symbol: '€', rate: 0.92 },
  };

  const convertPrice = (usd) => {
    const curr = currencyRates[currency] || currencyRates.USD;
    return `${curr.symbol}${(usd * curr.rate).toFixed(2)}`;
  };

  const filteredProducts = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* HEADER SECTION */}
      <header style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#020617', padding: '15px 20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap' }}>
          
          {/* SHOPPING BAG WITH CAPITAL M LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{ 
              width: '46px', 
              height: '46px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              filter: 'drop-shadow(0 4px 8px rgba(184, 139, 88, 0.4))'
            }}>
              <svg width="42" height="46" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 25 C30 5, 45 5, 45 25" stroke="#8c6334" strokeWidth="5" strokeLinecap="round" fill="none"/>
                <path d="M55 25 C55 5, 70 5, 70 25" stroke="#8c6334" strokeWidth="5" strokeLinecap="round" fill="none"/>
                <path d="M12 35 L28 30 L28 105 L12 95 Z" fill="#9c7344"/>
                <path d="M28 30 L72 30 L75 105 L25 105 Z" fill="#b88b58"/>
                <path d="M28 30 L32 34 L36 30 L40 34 L44 30 L48 34 L52 30 L56 34 L60 30 L64 34 L68 30 L72 34" stroke="#9c7344" strokeWidth="2" fill="none"/>
                <text x="50" y="77" fontSize="36" fontWeight="900" fontFamily="sans-serif" fill="#000000" textAnchor="middle">M</text>
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px', lineHeight: '1.1' }}>
                Market<span style={{ color: '#ffffff' }}>Zone</span>
              </div>
              <span style={{ fontSize: '9px', color: '#94a3b8', letterSpacing: '1px', fontWeight: '600', textTransform: 'uppercase' }}>B2B & B2C Marketplace</span>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div style={{ flex: '1', maxWidth: '500px', minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search products, suppliers, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>

          {/* CURRENCY & CART */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              style={{ backgroundColor: '#0f172a', color: '#cbd5e1', border: '1px solid #334155', padding: '8px', borderRadius: '6px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="USD">USD ($)</option>
              <option value="ZAR">ZAR (R)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
            </select>
            
            <div style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold' }}>
              Cart ({cart.length})
            </div>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#020617', borderBottom: '1px solid #1e293b' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>
          Global B2B & B2C Multi-Vendor Platform
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
          Direct Factory Wholesale Rates, Verified Global Suppliers, and Dynamic Bulk Ordering.
        </p>
      </section>

      {/* PRODUCTS CATALOG */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#f1f5f9' }}>
          Featured Supplier Products ({filteredProducts.length})
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((item) => (
            <div 
              key={item.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                border: '1px solid #334155',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '10px' }}>
                  <span style={{ backgroundColor: '#0369a1', color: '#e0f2fe', padding: '3px 8px', borderRadius: '4px' }}>
                    {item.category}
                  </span>
                  <span style={{ color: '#38bdf8' }}>★ {item.rating}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                  {item.name}
                </h3>

                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                  Supplier: <span style={{ color: '#cbd5e1' }}>{item.supplier}</span>
                </p>

                <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Wholesale Price</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>{convertPrice(item.priceUSD)}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}> / {item.unit}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>MOQ Required:</span>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>{item.moq} {item.unit}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button 
                    onClick={() => alert(`Inquiry sent for ${item.name}`)}
                    style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Inquire
                  </button>
                  <button 
                    onClick={() => addToCart(item)}
                    style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1e293b', backgroundColor: '#020617', padding: '25px 20px', textAlign: 'center', color: '#64748b', fontSize: '13px', marginTop: '40px' }}>
        <p>© 2026 MarketZone. All rights reserved. B2B & B2C Marketplace Engine.</p>
      </footer>
    </div>
  );
}
