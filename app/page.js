import Header from './components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Plugged Header Component */}
      <Header />

      {/* Temporary Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-blue-500 mb-4">
          MarketZone Enterprise Platform
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Global B2B/B2C Marketplace Architecture Ready. Phase 1 Base Layout Initialized.
        </p>
      </div>
    </main>
  );
}
