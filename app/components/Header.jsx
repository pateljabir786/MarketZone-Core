'use client';

import React, { useState } from 'react';

export default function Header() {
  const [currency, setCurrency] = useState('USD');
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="w-full bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wider text-blue-500">
            Market<span className="text-white">Zone</span>
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, suppliers, or hypermarkets globally..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Multi-Currency & Cart Controls */}
        <div className="flex items-center gap-4">
          
          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs font-semibold rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="ZAR">ZAR (R)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
          </select>

          {/* Persistent Cart Icon */}
          <button className="relative bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2">
            <span>Cart</span>
            <span className="bg-white text-blue-600 font-bold px-1.5 py-0.5 rounded-full text-[10px]">
              {cartCount}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}

