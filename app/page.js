'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Premium Cotton T-Shirt',
      category: 'Clothing',
      price: 24.99,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      title: 'Wireless Bluetooth Earbuds',
      category: 'Electronics',
      price: 49.99,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Clothing',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    const newProduct = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 1,
      image: formData.image || 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60'
    };

    setProducts([newProduct, ...products]);
    setFormData({ title: '', category: 'Clothing', price: '', stock: '', description: '', image: '' });
    setActiveTab('marketplace');
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#ffffff', margin: 0, color: '#0f172a' }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        
        {/* Brand Logo with Kraft Bag Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setActiveTab('marketplace')}>
          
          {/* Kraft Brown Shopping Bag Icon */}
          <div style={{ backgroundColor: '#c68a4c', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>

          {/* Full Brand Name */}
          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>MarketZone</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button 
            onClick={() => setActiveTab(activeTab === 'marketplace' ? 'add-product' : 'marketplace')} 
            style={{ padding: '0.55rem 0.9rem', borderRadius: '6px', background: activeTab === 'add-product' ? '#2563eb' : '#000000', color: '#ffffff', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.8rem' }}>
            {activeTab === 'marketplace' ? '+ Vendor: Add Product' : 'View Store'}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: '1.2rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* TAB 1: MARKETPLACE HOME */}
        {activeTab === 'marketplace' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.4rem' }}>MarketZone Marketplace</h1>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Explore products listed by global vendors</p>
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.2rem' }}>
              {products.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#c68a4c', textTransform: 'uppercase' }}>{item.category}</span>
                    <h3 style={{ fontSize: '1rem', color: '#0f172a', margin: '0.3rem 0', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>${item.price}</span>
                      <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600' }}>Stock: {item.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: VENDOR ADD PRODUCT FORM */}
        {activeTab === 'add-product' && (
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              Add New Product (Vendor Portal)
            </h2>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Product Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Leather Jacket" required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Groceries">Groceries</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Price ($) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="29.99" required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="10" style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Image URL</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
              </div>

              <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#c68a4c', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                Publish Product
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
