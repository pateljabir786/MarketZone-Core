'use client';
import { useState } from 'react';
export default function Home() {
const [cur, setCur] = useState('USD');
const [cart, setCart] = useState([]);
const [activeTab, setActiveTab] = useState('buyer'); // 'buyer' or 'vendor'
const [showCartModal, setShowCartModal] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const [cat, setCat] = useState('');
const [moq, setMoq] = useState('');
const [gstNo, setGstNo] = useState('');
const [prods, setProds] = useState([
{ id: 1, name: 'Wireless Earbuds', price: 49.99, cat: 'Electronics', moq: '10 Pcs', gst: 'GST-DEMO123' },
{ id: 2, name: 'Smart Watch X', price: 89.99, cat: 'Electronics', moq: '5 Pcs', gst: 'GST-DEMO123' },
{ id: 3, name: 'Leather Backpack', price: 35.50, cat: 'Fashion', moq: '20 Pcs', gst: 'GST-DEMO456' }
]);
const sym = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€' };
const rt = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92 };
const conv = (p) => (p * rt[cur]).toFixed(2);
const addProd = (e) => {
e.preventDefault();
if (!title || !price || !gstNo) return;
setProds([{
id: Date.now(),
name: title,
price: parseFloat(price),
cat: cat || 'General',
moq: moq || '1 Pc',
gst: gstNo
}, ...prods]);
setTitle(''); setPrice(''); setCat(''); setMoq(''); setGstNo('');
alert('Product published with verified Tax/GST details!');
setActiveTab('buyer');
};
const filteredProds = prods.filter(item => {
const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCat = selectedCategory === 'All' || item.cat === selectedCategory;
return matchesSearch && matchesCat;
});
const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);
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
<button onClick={() => setShowCartModal(true)} style={{ color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', background: '#0284c7', cursor: 'pointer' }}>
🛒 Cart ({cart.length})
</button>
</div>
</header>

<div style={{ display: 'flex', background: '#1e293b', borderBottom: '1px solid #334155', justifyContent: 'center' }}>
<button onClick={() => setActiveTab('buyer')} style={{ flex: 1, padding: '12px', background: activeTab === 'buyer' ? '#0f172a' : 'transparent', color: activeTab === 'buyer' ? '#38bdf8' : '#94a3b8', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderBottom: activeTab === 'buyer' ? '2px solid #38bdf8' : 'none' }}>
🛍️ Buyer Marketplace
</button>
<button onClick={() => setActiveTab('vendor')} style={{ flex: 1, padding: '12px', background: activeTab === 'vendor' ? '#0f172a' : 'transparent', color: activeTab === 'vendor' ? '#10b981' : '#94a3b8', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderBottom: activeTab === 'vendor' ? '2px solid #10b981' : 'none' }}>
📦 Vendor Dashboard
</button>
</div>

{activeTab === 'buyer' && (
<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
<div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
<input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 2, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} />
<select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}>
<option value="All">All Categories</option>
<option value="Electronics">Electronics</option>
<option value="Fashion">Fashion</option>
<option value="General">General</option>
</select>
</div>
<div style={{ display: 'grid', gap: '12px' }}>
{filteredProds.length > 0 ? (
filteredProds.map((item) => (
<div key={item.id} style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<div>
<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
<span style={{ fontSize: '10px', background: '#0284c7', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{item.cat}</span>
<span style={{ fontSize: '10px', background: '#334155', padding: '2px 6px', borderRadius: '4px', color: '#cbd5e1' }}>GST: {item.gst}</span>
</div>
<h3 style={{ fontSize: '15px', margin: '6px 0 4px 0', color: '#fff' }}>{item.name}</h3>
<p style={{ fontSize: '12px', color: '#0da3b8', margin: 0 }}>MOQ: {item.moq}</p>
<p style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', margin: '6px 0 0 0' }}>
{sym[cur]} {conv(item.price)}
</p>
</div>
<button onClick={() => setCart([...cart, item])} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-content' }}>
Add to Cart
</button>
</div>
))
) : (
<p style={{ textAlign: 'center', color: '#64748b' }}>No products found.</p>
)}
</div>
</div>
)}

{activeTab === 'vendor' && (
<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
<form onSubmit={addProd} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
<h3 style={{ marginTop: 0, color: '#10b981', fontSize: '18px', marginBottom: '15px' }}>📦 Vendor Verification & Upload</h3>
<div style={{ marginBottom: '12px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>GST / Tax Registration Number</label>
<input type="text" value={gstNo} onChange={(e) => setGstNo(e.target.value)} placeholder="e.g. 24ABCDE1234F1Z5" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ marginBottom: '12px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Product Title</label>
<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Smart TV" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
<div style={{ flex: 1 }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Price (USD)</label>
<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ flex: 1 }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Category</label>
<input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Electronics" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
</div>
<div style={{ marginBottom: '15px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>MOQ (Minimum Order Quantity)</label>
<input type="text" value={moq} onChange={(e) => setMoq(e.target.value)} placeholder="10 Pcs" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<button type="submit" style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
Publish to Marketplace
</button>
</form>
</div>
)}

{showCartModal && (
<div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '15px' }}>
<div style={{ background: '#1e293b', width: '100%', maxWidth: '450px', borderRadius: '10px', padding: '20px', border: '1px solid #334155' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
<h3 style={{ margin: 0, fontSize: '18px', color: '#38bdf8' }}>Your Shopping Cart</h3>
<button onClick={() => setShowCartModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✕</button>
</div>
{cart.length === 0 ? (
<p style={{ color: '#64748b', textAlign: 'center', margin: '30px 0' }}>Your cart is empty.</p>
) : (
<div>
<div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
{cart.map((item, idx) => (
<div key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#0f172a', padding: '10px', borderRadius: '6px' }}>
<div>
<span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>{item.name}</span>
<div style={{ fontSize: '11px', color: '#94a3b8' }}>MOQ: {item.moq} | GST: {item.gst}</div>
</div>
<div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '13px' }}>
{sym[cur]} {conv(item.price)}
</div>
</div>
))}
</div>
<div style={{ borderTop: '1px solid #334155', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: 'bold' }}>
<span>Total:</span>
<span style={{ color: '#38bdf8', fontSize: '16px' }}>{sym[cur]} {conv(cartTotal)}</span>
</div>
<button onClick={() => { alert('Order placed successfully!'); setCart([]); setShowCartModal(false); }} style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
Proceed to Checkout
</button>
</div>
)}
</div>
</div>
)}
<footer style={{ textAlign: 'center', marginTop: '40px', fontSize: '11px', color: '#64748b' }}>
© 2026 MarketZone B2B & B2C Engine.
</footer>
</div>
);
}
