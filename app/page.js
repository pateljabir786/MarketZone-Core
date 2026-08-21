'use client';
import { useState } from 'react';

export default function MarketZoneApp() {
  const [prods] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', price: 49.99 },
    { id: 2, name: 'Smart Watch Ultra X', price: 89.99 }
  ]);

  return (
    <div style={{ backgroundColor: '#090d16', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      {/* અસલ લુક વાળું હેડર */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '24px', margin: 0 }}>MarketZone B2B</h1>
        <div style={{ backgroundColor: '#0284c7', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>
          Cart (0) - Total: $0.00
        </div>
      </header>

      {/* પ્રોડક્ટ કાર્ડ્સ (જેમ હતા તેમ) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {prods.map(p => (
          <div key={p.id} style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>{p.name}</h2>
            <p style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 'bold', margin: '0 0 15px 0' }}>${p.price} / unit</p>
            <button style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
