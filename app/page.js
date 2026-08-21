"use client";

import React, { useState, useMemo } from "react";

// --- Global Region & Currency Data ---
const CURRENCIES = {
  USD: { symbol: "$", rate: 1, flag: "🌐", name: "USD (Global)" },
  INR: { symbol: "₹", rate: 83.5, flag: "🇮🇳", name: "INR (India)" },
  AED: { symbol: "د.إ", rate: 3.67, flag: "🇦🇪", name: "AED (UAE)" },
  SAR: { symbol: "﷼", rate: 3.75, flag: "🇸🇦", name: "SAR (Saudi)" },
  EUR: { symbol: "€", rate: 0.92, flag: "🇪🇺", name: "EUR (Europe)" },
  ZAR: { symbol: "R", rate: 18.2, flag: "🇿🇦", name: "ZAR (S. Africa)" },
};

// --- Initial Sample Products with Vendor-Defined Volume Pricing ---
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Wireless B2B Noise-Canceling Headphones",
    category: "Electronics",
    basePriceUSD: 120, // Base Price per unit in USD
    moq: 5,
    seller: "Global Electronics Hub",
    verified: true,
    volumeTiers: [
      { minQty: 10, discountPercent: 10 },
      { minQty: 50, discountPercent: 20 },
    ],
  },
  {
    id: 2,
    title: "Bulk Cotton Industrial T-Shirts (Pack)",
    category: "Fashion",
    basePriceUSD: 15,
    moq: 20,
    seller: "TexCraft Apparels",
    verified: true,
    volumeTiers: [
      { minQty: 50, discountPercent: 15 },
      { minQty: 200, discountPercent: 30 },
    ],
  },
  {
    id: 3,
    title: "Smart Commercial Security Cameras 4K",
    category: "Electronics",
    basePriceUSD: 250,
    moq: 2,
    seller: "SecureTech India",
    verified: false,
    volumeTiers: [
      { minQty: 5, discountPercent: 8 },
      { minQty: 20, discountPercent: 18 },
    ],
  },
];

export default function Home() {
  // --- Navigation & View States ---
  const [activeTab, setActiveTab] = useState("buyer"); // 'buyer' | 'vendor'
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- Marketplace & Vendor Data States ---
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // --- Vendor Profile / KYC State ---
  const [isEditingKYC, setIsEditingKYC] = useState(false);
  const [vendorProfile, setVendorProfile] = useState({
    storeName: "Global Electronics Hub",
    ownerName: "Muhammedzabir Patel",
    taxId: "GSTIN27AABCU9603R1ZM",
    isVerified: true,
  });

  // --- New Product Form State (Vendor Panel) ---
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "Electronics",
    basePriceUSD: "",
    moq: 1,
    tier1Min: 10,
    tier1Discount: 5,
    tier2Min: 50,
    tier2Discount: 15,
  });

  // --- Currency Conversion Helper ---
  const formatPrice = (priceUSD) => {
    const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
    const converted = priceUSD * curr.rate;
    return `${curr.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // --- Dynamic Search & Category Filtering ---
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // --- Cart Actions & Calculations ---
  const addToCart = (product, quantity) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: Math.max(quantity, product.moq) }]);
    }
  };

  const updateCartQty = (id, newQty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Dynamic Volume Discount Calculation per Product
  const cartSummary = useMemo(() => {
    let rawSubtotalUSD = 0;
    let totalDiscountUSD = 0;

    cart.forEach((item) => {
      const itemSubtotal = item.basePriceUSD * item.quantity;
      rawSubtotalUSD += itemSubtotal;

      // Check vendor tier discounts for this item
      let applicableDiscountPercent = 0;
      if (item.volumeTiers && item.volumeTiers.length > 0) {
        // Sort tiers descending by minQty to find highest matching slab
        const sortedTiers = [...item.volumeTiers].sort((a, b) => b.minQty - a.minQty);
        const matchedTier = sortedTiers.find((t) => item.quantity >= t.minQty);
        if (matchedTier) {
          applicableDiscountPercent = matchedTier.discountPercent;
        }
      }

      totalDiscountUSD += (itemSubtotal * applicableDiscountPercent) / 100;
    });

    const netSubtotalUSD = rawSubtotalUSD - totalDiscountUSD;
    const estimatedTaxUSD = netSubtotalUSD * 0.05; // 5% Tax
    const grandTotalUSD = netSubtotalUSD + estimatedTaxUSD;

    return {
      rawSubtotalUSD,
      totalDiscountUSD,
      netSubtotalUSD,
      estimatedTaxUSD,
      grandTotalUSD,
    };
  }, [cart]);

  // --- Handle New Product Listing by Vendor ---
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.basePriceUSD) return;

    const createdProduct = {
      id: Date.now(),
      title: newProduct.title,
      category: newProduct.category,
      basePriceUSD: parseFloat(newProduct.basePriceUSD),
      moq: parseInt(newProduct.moq) || 1,
      seller: vendorProfile.storeName,
      verified: vendorProfile.isVerified,
      volumeTiers: [
        { minQty: parseInt(newProduct.tier1Min), discountPercent: parseFloat(newProduct.tier1Discount) },
        { minQty: parseInt(newProduct.tier2Min), discountPercent: parseFloat(newProduct.tier2Discount) },
      ].filter((t) => t.minQty > 0 && t.discountPercent > 0),
    };

    setProducts([createdProduct, ...products]);
    setNewProduct({
      title: "",
      category: "Electronics",
      basePriceUSD: "",
      moq: 1,
      tier1Min: 10,
      tier1Discount: 5,
      tier2Min: 50,
      tier2Discount: 15,
    });
    alert("✅ Product Listed Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* --- TOP HEADER --- */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Platform Badge */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-wider text-emerald-400">
              MARKET<span className="text-white">ZONE</span>
            </h1>
            <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              B2B & B2C
            </span>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search products, suppliers, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Navigation Switches & Currency Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            
            {/* Region / Currency Dropdown */}
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs font-semibold px-3 py-2 rounded-xl text-emerald-400 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code} className="bg-slate-900 text-white">
                  {CURRENCIES[code].flag} {CURRENCIES[code].name}
                </option>
              ))}
            </select>

            {/* Buyer / Vendor View Toggle */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex text-xs font-medium">
              <button
                onClick={() => setActiveTab("buyer")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "buyer" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setActiveTab("vendor")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "vendor" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Vendor Hub
              </button>
            </div>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl border border-slate-700 transition-all text-xs font-semibold"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

        {/* ======================================================== */}
        {/* BUYER MARKETPLACE VIEW                                   */}
        {/* ======================================================== */}
        {activeTab === "buyer" && (
          <div className="space-y-6">
            
            {/* Category Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {["All", "Electronics", "Fashion", "Hardware"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-emerald-500/5 group"
                >
                  <div className="space-y-3">
                    
                    {/* Store Info & Verified Tag */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        🏪 {product.seller}
                      </span>
                      {product.verified && (
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          ✓ Verified Seller
                        </span>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 className="font-semibold text-slate-100 text-sm group-hover:text-emerald-400 transition-colors">
                      {product.title}
                    </h3>

                    {/* Price & MOQ */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                      <div className="text-lg font-bold text-emerald-400">
                        {formatPrice(product.basePriceUSD)}{" "}
                        <span className="text-[10px] text-slate-500 font-normal">/ unit</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Minimum Order (MOQ): <strong className="text-white">{product.moq} units</strong>
                      </div>
                    </div>

                    {/* Vendor Custom Volume Discounts Badge List */}
                    {product.volumeTiers && product.volumeTiers.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          Vendor Tier Discounts:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.volumeTiers.map((tier, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700"
                            >
                              {tier.minQty}+ units →{" "}
                              <strong className="text-emerald-400">{tier.discountPercent}% OFF</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-800">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-1/2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 py-2 rounded-xl transition-all font-medium"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => addToCart(product, product.moq)}
                      className="w-1/2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs py-2 rounded-xl font-bold transition-all"
                    >
                      Add MOQ ({product.moq})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VENDOR DASHBOARD & STORE MANAGEMENT VIEW                 */}
        {/* ======================================================== */}
        {activeTab === "vendor" && (
          <div className="space-y-8 max-w-4xl mx-auto">
            
            {/* Vendor Profile & KYC Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-base font-bold text-emerald-400">
                    🏪 Vendor Store & Legal Registration (KYC)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage your store parameters, tax IDs, and verification statuses.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingKYC(!isEditingKYC)}
                  className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-all font-medium"
                >
                  {isEditingKYC ? "✓ Save Profile" : "✏ Edit KYC Details"}
                </button>
              </div>

              {isEditingKYC ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Store Name</label>
                    <input
                      type="text"
                      value={vendorProfile.storeName}
                      onChange={(e) => setVendorProfile({ ...vendorProfile, storeName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Owner Name</label>
                    <input
                      type="text"
                      value={vendorProfile.ownerName}
                      onChange={(e) => setVendorProfile({ ...vendorProfile, ownerName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GST / Tax Identification</label>
                    <input
                      type="text"
                      value={vendorProfile.taxId}
                      onChange={(e) => setVendorProfile({ ...vendorProfile, taxId: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block">Store Name</span>
                    <strong className="text-white text-sm">{vendorProfile.storeName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Owner Legal Name</span>
                    <strong className="text-white text-sm">{vendorProfile.ownerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GST / Tax ID</span>
                    <strong className="text-emerald-400 text-sm">{vendorProfile.taxId}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Add Product Form with Custom Tier Slabs */}
            <form onSubmit={handleAddProduct} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-3">
                ➕ Add New Product with Custom B2B Tier Slabs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="md:col-span-2">
                  <label className="block text-slate-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Industrial Grade Solar Panels"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Base Price per Unit (USD $)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="100.00"
                    value={newProduct.basePriceUSD}
                    onChange={(e) => setNewProduct({ ...newProduct, basePriceUSD: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Minimum Order Qty (MOQ)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProduct.moq}
                    onChange={(e) => setNewProduct({ ...newProduct, moq: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Vendor Custom Tier Configuration */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <span className="font-bold text-emerald-400 block">
                  ⚙ Set Custom B2B Volume Discount Slabs
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block">Slab 1: Min Qty</label>
                    <input
                      type="number"
                      value={newProduct.tier1Min}
                      onChange={(e) => setNewProduct({ ...newProduct, tier1Min: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block">Slab 1: Discount %</label>
                    <input
                      type="number"
                      value={newProduct.tier1Discount}
                      onChange={(e) => setNewProduct({ ...newProduct, tier1Discount: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block">Slab 2: Min Qty</label>
                    <input
                      type="number"
                      value={newProduct.tier2Min}
                      onChange={(e) => setNewProduct({ ...newProduct, tier2Min: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block">Slab 2: Discount %</label>
                    <input
                      type="number"
                      value={newProduct.tier2Discount}
                      onChange={(e) => setNewProduct({ ...newProduct, tier2Discount: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all"
              >
                Publish Listing to Marketplace
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* QUICK VIEW MODAL                                         */}
      {/* ======================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-emerald-400 text-sm">Product Quick Specs</h3>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded text-xs"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-white text-base">{quickViewProduct.title}</p>
              <p className="text-slate-400">Category: <span className="text-white">{quickViewProduct.category}</span></p>
              <p className="text-slate-400">Supplier: <span className="text-white">{quickViewProduct.seller}</span></p>
              <p className="text-slate-400">Base Unit Price: <span className="text-emerald-400 font-bold">{formatPrice(quickViewProduct.basePriceUSD)}</span></p>
              
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mt-3 space-y-1">
                <span className="text-emerald-400 font-bold block">Vendor Discount Structure:</span>
                {quickViewProduct.volumeTiers && quickViewProduct.volumeTiers.length > 0 ? (
                  quickViewProduct.volumeTiers.map((t, i) => (
                    <div key={i} className="flex justify-between text-slate-300">
                      <span>Order {t.minQty}+ units:</span>
                      <strong className="text-emerald-400">{t.discountPercent}% OFF</strong>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500">Standard single-tier pricing applies.</span>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(quickViewProduct, quickViewProduct.moq);
                setQuickViewProduct(null);
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all"
            >
              Add MOQ ({quickViewProduct.moq}) to Cart
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CART DRAWER & ORDER SUMMARY                              */}
      {/* ======================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-slate-900 w-full max-w-md h-full p-6 flex flex-col justify-between border-l border-slate-800 shadow-2xl">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="font-bold text-emerald-400 text-base">🛒 Cart & Order Summary</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded-lg text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center text-slate-500 text-xs py-10">Cart is empty.</div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium text-white">{item.title}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 0)}
                        className="text-rose-500 hover:text-rose-400 text-[10px]"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Price: {formatPrice(item.basePriceUSD)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="bg-slate-800 text-white w-5 h-5 rounded flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="bg-slate-800 text-white w-5 h-5 rounded flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Dynamic Total Breakdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs border-t">
              <div className="flex justify-between text-slate-400">
                <span>Raw Subtotal:</span>
                <span>{formatPrice(cartSummary.rawSubtotalUSD)}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Vendor Tier Discounts:</span>
                <span>-{formatPrice(cartSummary.totalDiscountUSD)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Est. Tax (5%):</span>
                <span>{formatPrice(cartSummary.estimatedTaxUSD)}</span>
              </div>
              <div className="flex justify-between font-bold text-white border-t border-slate-800 pt-2 text-sm">
                <span>Grand Total ({selectedCurrency}):</span>
                <span className="text-emerald-400">{formatPrice(cartSummary.grandTotalUSD)}</span>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => alert("🚀 Order Request Submitted Successfully!")}
                className="w-full mt-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
