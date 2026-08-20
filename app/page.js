'use client';
import { useState } from 'react';
export default function Home() {
const [cur, setCur] = useState('USD');
const [cart, setCart] = useState([]);
const [showForm, setShowForm] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const [cat, setCat] = useState('');
const [moq, setMoq] = useState('');
const [prods, setProds] = useState([
{ id: 1, name: 'Wireless Earbuds', price: 49.99, cat: 'Electronics', moq: '10 Pcs' },
{ id: 2, name: 'Smart Watch X', price: 89.99, cat: 'Electronics', moq: '5 Pcs' },
{ id: 3, name: 'Leather Backpack', price: 35.50, cat: 'Fashion', moq: '20 Pcs' }
]);
const sym = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€' };
const rt = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92 };
const conv = (p) => (p * rt[cur]).toFixed(2);
const addProd = (e) => {
e.preventDefault();
if (!title || !price) return;
setProds([{
id: Date.now(),
name: title,
price: parseFloat(price),
cat: cat || 'General',
moq: moq || '1 Pc'
}, ...prods]);
setTitle(''); setPrice(''); setCat(''); setMoq('');
setShowForm(false);
};
const filteredProds = prods.filter(item => {
const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCat = selectedCategory === 'All' || item.cat === selectedCategory;
return matchesSearch && matchesCat;
});
return (
<div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', paddingBottom: '30px' }}>
<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #334155', background: '#1e293b' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<span style={{ background: '#f59e0b', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', color: '#000' }}>🛍️</span>
<div>
<h1 style={{ fontSize: '18px', margin: 0, color: '#38bdf8' }}>MarketZone</h1>
<span style={{ fontSize: '10px', color: '#94a3b8' }}>B2B & B2C MARKETPLACE</span>
</div>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
<select value={cur} onChange={(e) => setCur(e.target.value)} style={{ padding: '6px', borderRadius: '4px', color: '#fff', border: 'none', background: '#334155' }}>
<option value="USD">USD ($)</option>
<option value="ZAR">ZAR (R)</option>
<option value="INR">INR (₹)</option>
<option value="EUR">EUR (€)</option>
</select>
<button style={{ color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', background: '#0284c7' }}>
Cart ({cart.length})
</button>
</div>
</header>
<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
<h2 style={{ fontSize: '18px', margin: 0 }}>Live Marketplace</h2>
<button onClick={() => setShowForm(!showForm)} style={{ color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', background: '#10b981' }}>
{showForm ? 'Close' : '+ Add Product'}
</button>
</div>
<div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
<input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 2, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} />
<select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}>
<option value="All">All Categories</option>
<option value="Electronics">Electronics</option>
<option value="Fashion">Fashion</option>
<option value="General">General</option>
</select>
</div>
</div>
{showForm && (
<form onSubmit={addProd} style={{ maxWidth: '800px', margin: '0 auto 20px auto', background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
<h3 style={{ marginTop: 0, color: '#38bdf8', fontSize: '16px' }}>Vendor Add Product</h3>
<div style={{ marginBottom: '10px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Title</label>
<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product name" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
<div style={{ flex: 1 }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Price (USD)</label>
<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ flex: 1 }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Category</label>
<input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Electronics" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
</div>
<div style={{ marginBottom: '12px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>MOQ</label>
<input type="text" value={moq} onChange={(e) => setMoq(e.target.value)} placeholder="10 Pcs" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<button type="submit" style={{ width: '100%', background: '#f59e0b', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
Publish
</button>
</form>
)}
<div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', display: 'grid', gap: '12px' }}>
{filteredProds.length > 0 ? (
filteredProds.map((item) => (
<div key={item.id} style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<div>
<span style={{ fontSize: '10px', background: '#0284c7', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{item.cat}</span>
<h3 style={{ fontSize: '15px', margin: '6px 0 4px 0', color: '#fff' }}>{item.name}</h3>
<p style={{ fontSize: '12px', color: '#0da3b8', margin: 0 }}>MOQ: {item.moq}</p>
<p style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', margin: '6px 0 0 0' }}>
{sym[cur]} {conv(item.price)}
</p>
</div>
<button onClick={() => setCart([...cart, item])} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-content' }}>
Buy
</button>
</div>
))
) : (
<p style={{ textAlign: 'center', color: '#64748b' }}>No products found.</p>
)}
</div>
<footer style={{ textAlign: 'center', marginTop: '30px', fontSize: '11px', color: '#64748b' }}>
© 2026 MarketZone B2B & B2C Engine.
</footer>
</div>
);
}
