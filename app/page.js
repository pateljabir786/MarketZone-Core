exexport default function Home() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc', margin: 0 }}>
      {/* Header / Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.5rem', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        
        {/* Brand Logo with Integrated Cart Style */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>
            MarketZone
          </span>
          
          {/* Cart Icon Integrated with Logo */}
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '2px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: '#ef4444', color: 'white', fontSize: '0.65rem', fontWeight: 'bold', padding: '1px 5px', borderRadius: '50%' }}>
              0
            </span>
          </div>
        </div>

        {/* Right Side: Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button style={{ padding: '0.5rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: 'white', fontWeight: '600', cursor: 'pointer' }}>Login</button>
          <button style={{ padding: '0.5rem 0.9rem', borderRadius: '6px', background: '#000000', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '1rem', fontWeight: '800' }}>Welcome to MarketZone</h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Your global multi-vendor marketplace platform.
        </p>
        <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', borderRadius: '8px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
          Explore Products
        </button>
      </main>
    </div>
  );
}
