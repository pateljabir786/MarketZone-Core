// Feature #18: Reusable Interactive Modal Component (Dark Theme)
const EnterpriseModal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
          <h3 className="font-bold text-lg text-emerald-400">{title}</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg text-xs transition-all"
          >
            ✕ Close
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};
