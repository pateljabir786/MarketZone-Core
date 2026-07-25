export default function Home() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc', margin: 0 }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>MarketZone</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Login</button>
          <button style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: '#000000', color: 'white', border: 'none', cursor: 'pointer' }}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>Welcome to MarketZone</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Your global multi-vendor marketplace platform.
        </p>
        <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '8px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
          Explore Products
        </button>
      </main>
    </div>
  );
}
