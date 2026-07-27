'use client';
import { useState } from 'react';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    { name: 'Electronics', icon: '⚡' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Mobiles', icon: '📱' },
    { name: 'Home & Kitchen', icon: '🏠' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Sports', icon: '⚽' },
  ];

  const products = [
    { id: 1, title: 'Wireless Bluetooth Headphones', price: '$29.99', oldPrice: '$49.99', rating: '4.5', vendor: 'TechStore', image: '🎧' },
    { id: 2, title: 'Smart Fitness Watch V2', price: '$39.99', oldPrice: '$59.99', rating: '4.8', vendor: 'GadgetHub', image: '⌚' },
    { id: 3, title: 'Men Classic Cotton T-Shirt', price: '$14.99', oldPrice: '$24.99', rating: '4.2', vendor: 'StyleFashion', image: '👕' },
    { id: 4, title: 'Ergonomic Office Chair', price: '$89.99', oldPrice: '$120.00', rating: '4.6', vendor: 'HomeComfort', image: '🪑' },
  ];

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#f1f5f9', margin: 0, color: '#0f172a' }}>
      
      {/* 1. TOP HEADER & NAVBAR */}
      <header style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Logo with M Square Style */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ backgroundColor: '#000000', color: '#ffffff', fontWeight: '900', fontSize: '1.2rem', padding: '4px 10px', borderRadius: '6px' }}>
              M
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              arketZone
            </span>
          </div>

          {/* Marketplace Search Bar */}
          <div style={{ flex: 1, maxWidth: '500px', display: 'flex', border: '2px solid #000000', borderRadius: '8px', overflow: 'hidden' }}>
            <input 
              type="text" 
              placeholder="Search products, brands and vendors..." 
              style={{ width: '100%', padding: '0.6rem 1rem', border: 'none', outline: 'none', fontSize: '0.95rem' }}
            />
            <button style={{ backgroundColor: '#000000', color: 'white', border: 'none', padding: '0 1.2rem', cursor: 'pointer', fontWeight: '600' }}>
              Search
            </button>
          </div>

          {/* Right Actions: Cart & Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            
            {/* Cart Icon */}
            <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-10px', backgroundColor: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '50%' }}>
                  {cartCount}
                </span>
              )}
            </div>

            <button style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: 'white', fontWeight: '600', cursor: 'pointer' }}>
              Login
            </button>
            <button style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: '#000000', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
              Vendor Register
            </button>
          </div>
        </div>
      </header>

      {/* 2. CATEGORIES BAR */}
      <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.6rem 1rem', display: 'flex', gap: '1.5rem', overflowX: 'auto' }}>
          {categories.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '1200px', margin: '1.5rem auto', padding: '0 1rem' }}>
        
        {/* 3. HERO PROMO BANNER */}
        <div style={{ backgroundColor: '#1e293b', color: 'white', borderRadius: '12px', padding: '2.5rem 2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ backgroundColor: '#2563eb', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Multi-Vendor Marketplace
            </span>
            <h1 style={{ fontSize: '2rem', margin: '0.8rem 0 0.5rem', fontWeight: '800' }}>
              Global Deals from Verified Sellers
            </h1>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '1rem' }}>
              Discover thousands of unique products directly from top manufacturers.
            </p>
          </div>
          <button style={{ padding: '0.8rem 1.8rem', backgroundColor: '#ffffff', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
            Shop Now
          </button>
        </div>

        {/* 4. FEATURED PRODUCTS GRID */}
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>
          🔥 Trending Deals
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem' }}>
          {products.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', marginBottom: '0.8rem' }}>
                {item.image}
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Seller: {item.vendor}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: '0.3rem 0', color: '#0f172a' }}>{item.title}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>{item.price}</span>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>{item.oldPrice}</span>
                  <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '700', marginLeft: 'auto' }}>⭐ {item.rating}</span>
                </div>
              </div>

              <button 
                onClick={addToCart}
                style={{ width: '100%', padding: '0.6rem', backgroundColor: '#000000', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
