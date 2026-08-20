'use client';
import { useState } from 'react';
export default function Home() {
const [cur, setCur] = useState('USD');
const [region, setRegion] = useState('Global (USD)');
const [cart, setCart] = useState([]);
const [orders, setOrders] = useState([]);
const [activeTab, setActiveTab] = useState('buyer'); // 'buyer' or 'vendor'
const [showCartModal, setShowCartModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const [storeName, setStoreName] = useState('');
const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const [cat, setCat] = useState('');
const [moq, setMoq] = useState('');
const [gstNo, setGstNo] = useState('');
const [prods, setProds] = useState([
{ id: 1, name: 'Wireless Earbuds', price: 49.99, cat: 'Electronics', moq: '10 Pcs', gst: 'GST-DEMO123', store: 'Global Electronics Hub', desc: 'High-quality wireless bluetooth earbuds with active noise cancellation and long battery life.' },
{ id: 2, name: 'Smart Watch X', price: 89.99, cat: 'Electronics', moq: '5 Pcs', gst: 'GST-DEMO123', store: 'Global Electronics Hub', desc: 'Advanced smart watch with fitness tracking, heart rate monitor, and custom dials.' },
{ id: 3, name: 'Leather Backpack', price: 35.50, cat: 'Fashion', moq: '20 Pcs', gst: 'GST-DEMO456', store: 'TrendStyle Store', desc: 'Durable genuine leather backpack suitable for daily office commute and travel.' }
]);
const sym = { USD: '$', ZAR: 'R', INR: '₹', EUR: '€' };
const rt = { USD: 1, ZAR: 18.5, INR: 83, EUR: 0.92 };
const conv = (p) => (p * rt[cur]).toFixed(2);
const handleRegionChange = (e) => {
const val = e.target.value;
setRegion(val);
if (val === 'South Africa') setCur('ZAR');
else if (val === 'India') setCur('INR');
else if (val === 'Europe') setCur('EUR');
else setCur('USD');
};
const addProd = (e) => {
e.preventDefault();
if (!title || !price || !gstNo || !storeName) return;
setProds([{
id: Date.now(),
name: title,
price: parseFloat(price),
cat: cat || 'General',
moq: moq || '1 Pc',
gst: gstNo,
store: storeName,
desc: 'Newly listed product on MarketZone marketplace.'
}, ...prods]);
setTitle(''); setPrice(''); setCat(''); setMoq(''); setGstNo(''); setStoreName('');
alert('Storefront updated & product published successfully!');
setActiveTab('buyer');
};
const placeOrder = () => {
if (cart.length === 0) return;
const newOrder = {
id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
items: [...cart],
total: cartTotal,
status: 'Processing',
date: new Date().toLocaleDateString()
};
setOrders([newOrder, ...orders]);
setCart([]);
setShowCartModal(false);
alert('Order placed successfully! You can track it in Order History.');
};
const filteredProds = prods.filter(item => {
const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCat = selectedCategory === 'All' || item.cat === selectedCategory;
return matchesSearch && matchesCat;
});
const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);
return (
<div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', paddingBottom: '30px' }}>
<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #334155', background: '#1e293b', flexWrap: 'wrap', gap: '10px' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<span style={{ background: '#f59e0b', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', color: '#000' }}>🛍️</span>
<div>
<h1 style={{ fontSize: '18px', margin: 0, color: '#38bdf8' }}>MarketZone</h1>
<span style={{ fontSize: '10px', color: '#94a3b8' }}>B2B & B2C GLOBAL MARKETPLACE</span>
</div>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
<select value={region} onChange={handleRegionChange} style={{ padding: '6px', borderRadius: '4px', color: '#fff', border: 'none', background: '#334155', fontSize: '12px' }}>
<option value="Global (USD)">🌍 Global (USD)</option>
<option value="South Africa">🇿🇦 South Africa (ZAR)</option>
<option value="India">🇮🇳 India (INR)</option>
<option value="Europe">🇪🇺 Europe (EUR)</option>
</select>
<select value={cur} onChange={(e) => setCur(e.target.value)} style={{ padding: '6px', borderRadius: '4px', color: '#fff', border: 'none', background: '#334155', fontSize: '12px' }}>
<option value="USD">USD ($)</option>
<option value="ZAR">ZAR (R)</option>
<option value="INR">INR (₹)</option>
<option value="EUR">EUR (€)</option>
</select>
<button onClick={() => setShowCartModal(true)} style={{ color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', background: '#0284c7', cursor: 'pointer', fontSize: '12px' }}>
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
<div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
{filteredProds.length > 0 ? (
filteredProds.map((item) => (
<div key={item.id} style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<div onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer', flex: 1, paddingRight: '10px' }}>
<div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
<span style={{ fontSize: '10px', background: '#0284c7', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{item.cat}</span>
<span style={{ fontSize: '10px', background: '#059669', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Store: {item.store}</span>
<span style={{ fontSize: '10px', background: '#065f46', border: '1px solid #10b981', padding: '2px 6px', borderRadius: '4px', color: '#34d399', fontWeight: 'bold' }}>🛡️ Verified GST: {item.gst}</span>
</div>
<h3 style={{ fontSize: '15px', margin: '6px 0 4px 0', color: '#fff' }}>{item.name} 🔍</h3>
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

<div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
<h3 style={{ fontSize: '16px', color: '#38bdf8', marginTop: 0, marginBottom: '10px' }}>📦 My Order History & Tracking</h3>
{orders.length === 0 ? (
<p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>No orders placed yet.</p>
) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
{orders.map((ord, idx) => (
<div key={idx} style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #334155' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
<span style={{ fontWeight: 'bold', color: '#38bdf8' }}>{ord.id}</span>
<span style={{ background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{ord.status}</span>
</div>
<div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
Items: {ord.items.map(i => i.name).join(', ')}
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
<span>Date: {ord.date}</span>
<span style={{ fontWeight: 'bold', color: '#f59e0b' }}>Total: {sym[cur]} {conv(ord.total)}</span>
</div>
</div>
))}
</div>
)}
</div>
</div>
)}

{activeTab === 'vendor' && (
<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
<form onSubmit={addProd} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '20px' }}>
<h3 style={{ marginTop: 0, color: '#10b981', fontSize: '18px', marginBottom: '15px' }}>📦 Vendor Storefront & Product Upload</h3>
<div style={{ marginBottom: '12px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Store Name (Brand/Shop Name)</label>
<input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. MS Kids Store" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ marginBottom: '12px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>GST / Tax Registration Number</label>
<input type="text" value={gstNo} onChange={(e) => setGstNo(e.target.value)} placeholder="e.g. 24ABCDE1234F1Z5" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ marginBottom: '12px' }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Product Title</label>
<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kids Wear Set" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
<div style={{ flex: 1 }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Price (USD)</label>
<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
</div>
<div style={{ flex: 1 }}>
<label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Category</label>
<input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Fashion" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
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

<div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
<h3 style={{ fontSize: '16px', color: '#10b981', marginTop: 0, marginBottom: '10px' }}>📦 Vendor Received Orders</h3>
{orders.length === 0 ? (
<p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>No orders received yet from buyers.</p>
) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
{orders.map((ord, idx) => (
<div key={idx} style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #334155' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
<span style={{ fontWeight: 'bold', color: '#38bdf8' }}>{ord.id}</span>
<span style={{ background: '#f59e0b', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>Status: {ord.status}</span>
</div>
<div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
Ordered Items: {ord.items.map(i => i.name).join(', ')}
</div>
<div style={{ fontSize: '12px', color: '#94a3b8' }}>
Amount: {sym[cur]} {conv(ord.total)}
</div>
</div>
))}
</div>
)}
</div>
</div>
)}

{selectedProduct && (
<div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '15px' }}>
<div style={{ background: '#1e293b', width: '100%', maxWidth: '450px', borderRadius: '10px', padding: '20px', border: '1px solid #334155' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
<h3 style={{ margin: 0, fontSize: '18px', color: '#38bdf8' }}>Product Quick View</h3>
<button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✕</button>
</div>
<div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #334155' }}>
<div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
<span style={{ fontSize: '10px', background: '#0284c7', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>{selectedProduct.cat}</span>
<span style={{ fontSize: '10px', background: '#059669', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Store: {selectedProduct.store}</span>
</div>
<div style={{ marginBottom: '8px' }}>
<span style={{ fontSize: '11px', background: '#065f46', border: '1px solid #10b981', padding: '3px 8px', borderRadius: '4px', color: '#34d399', fontWeight: 'bold' }}>🛡️ Legal Tax Verified: {selectedProduct.gst}</span>
</div>
<h2 style={{ fontSize: '18px', color: '#fff', margin: '10px 0 6px 0' }}>{selectedProduct.name}</h2>
<p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.4', marginBottom: '10px' }}>{selectedProduct.desc}</p>
<div style={{ fontSize: '13px', color: '#0da3b8', marginBottom: '6px' }}>Minimum Order Quantity (MOQ): <b>{selectedProduct.moq}</b></div>
<div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', marginTop: '10px' }}>
{sym[cur]} {conv(selectedProduct.price)}
</div>
</div>
<button onClick={() => { setCart([...cart, selectedProduct]); setSelectedProduct(null); }} style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
Add to Cart
</button>
</div>
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
<div style={{ fontSize: '11px', color: '#94a3b8' }}>Store: {item.store} | MOQ: {item.moq}</div>
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
<button onClick={placeOrder} style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
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
