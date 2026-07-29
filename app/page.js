export default function Home() {
  return (
    <main style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Welcome to MarketZone 🚀
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
        Next.js + Supabase + Vercel Stack Powered
      </p>
    </main>
  )
}
