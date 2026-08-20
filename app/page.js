// Feature #16: Responsive Mobile-First Tailwind CSS UI Implementation
export default function MarketZoneUI() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-10">
      {/* Responsive Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:px-6 border-b border-slate-800 bg-slate-900 gap-4 shadow-md">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 p-2 rounded-lg font-bold text-black text-base">🛍️</span>
            <div>
              <h1 className="text-xl font-bold text-sky-400 tracking-wide m-0">MarketZone</h1>
              <span className="text-[10px] text-slate-400 font-semibold block">ENTERPRISE B2B/B2C GLOBAL HUB</span>
            </div>
          </div>
        </div>

        {/* Action Controls: Mobile Stack / Desktop Row */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <select className="px-3 py-2 rounded-md text-white border border-slate-700 bg-slate-800 text-xs sm:text-sm cursor-pointer focus:outline-none focus:border-sky-500">
            <option>🌍 Global (USD - $)</option>
            <option>🇦🇪 UAE (AED)</option>
            <option>🇸🇦 Saudi Arabia (SAR)</option>
            <option>🇿🇦 South Africa (ZAR)</option>
            <option>🇮🇳 India (INR)</option>
          </select>
          <button className="text-white border-none px-4 py-2 rounded-md font-bold bg-sky-600 hover:bg-sky-500 cursor-pointer text-xs sm:text-sm flex items-center gap-2 transition-colors">
            🛒 Cart <span className="bg-sky-700 px-2 py-0.5 rounded-full text-[11px]">0</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900 border-b border-slate-800 max-w-4xl mx-auto rounded-b-lg overflow-hidden">
        <button className="flex-1 py-3.5 bg-slate-950 text-sky-400 font-bold border-b-2 border-sky-400 text-xs sm:text-sm transition-all">
          🛍️ Buyer Marketplace
        </button>
        <button className="flex-1 py-3.5 bg-transparent text-slate-400 font-bold border-b-2 border-transparent hover:text-slate-200 text-xs sm:text-sm transition-all">
          📦 Vendor Dashboard
        </button>
      </div>

      {/* Main Container */}
      <main className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Search & Filter Grid */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input 
            type="text" 
            placeholder="Search enterprise products securely..." 
            className="flex-2 p-3 rounded-lg border border-slate-800 bg-slate-900 text-white text-sm focus:outline-none focus:border-sky-500"
          />
          <select className="flex-1 p-3 rounded-lg border border-slate-800 bg-slate-900 text-white text-sm cursor-pointer focus:outline-none focus:border-sky-500">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>General</option>
          </select>
        </div>

        {/* Product Cards Grid (Mobile-First 1 col, Desktop 2 col if needed) */}
        <div className="grid gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition-all">
            <div>
              <div className="flex gap-2 items-center mb-2 flex-wrap">
                <span className="text-[10px] bg-sky-600 px-2.5 py-1 rounded font-semibold text-white">Electronics</span>
                <span className="text-[10px] bg-emerald-600 px-2.5 py-1 rounded font-semibold text-white">Store: Global Hub</span>
                <span className="text-[10px] bg-emerald-950 border border-emerald-600 px-2.5 py-1 rounded font-bold text-emerald-400">🛡️ Verified Legal</span>
              </div>
              <h3 className="text-base font-bold text-white m-0">Wireless Earbuds 🔍</h3>
              <p className="text-xs text-sky-400 mt-1 font-medium">MOQ: 10 Pcs</p>
              <p className="text-lg font-bold text-sky-400 mt-2">$ 49.99</p>
            </div>
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white border-none px-4 py-2.5 rounded-lg font-bold cursor-pointer text-xs sm:text-sm transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
