{/* Vendor Section with KYC & Registration Flow */}
{activeTab === 'vendor' && (
  <main style={{ maxWidth: '500px', margin: '20px auto', padding: '0 15px' }}>
    {!isVendorRegistered ? (
      <form onSubmit={handleVendorRegister} style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '16px', border: '1px solid #1e293b' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#34d399', fontSize: '18px' }}>🏪 Vendor Store & KYC Registration</h3>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Register your store and business KYC details to get verified.</p>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Store / Trade Name</label>
          <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="e.g. MS Kids Store" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Owner Name</label>
          <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="e.g. Jabir Patel" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>GST / Tax ID Number (KYC)</label>
          <input type="text" placeholder="e.g. GSTIN12345ABC" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Business Address</label>
          <input type="text" placeholder="Enter registered business address" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
          Submit KYC & Register Store
        </button>
      </form>
    ) : (
      <form onSubmit={addProd} style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '16px', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', color: '#34d399', fontSize: '18px' }}>📦 Publish Product</h3>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 'bold' }}>Store: {storeName} 🛡️ (KYC Verified)</span>
          </div>
          <button type="button" onClick={() => setIsVendorRegistered(false)} style={{ fontSize: '11px', color: '#94a3b8', backgroundColor: '#1e293b', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>
            Edit KYC
          </button>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Product Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kids Wear Set" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Price (USD)</label>
            <input type="number" step="0.01" min="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.00" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>Category</label>
            <input type="text" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="Fashion" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#cbd5e1' }}>MOQ</label>
          <input type="text" value={moq} onChange={(e) => setMoq(e.target.value)} placeholder="10 Pcs" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
          Publish Secure Product
        </button>
      </form>
    )}
  </main>
)}
