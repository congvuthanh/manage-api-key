export const UsageCard = () => {
  return (
    <div className="mb-8 rounded-lg overflow-hidden bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-500 p-1">
      <div className="rounded-lg p-6 text-white relative overflow-hidden">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm font-medium mb-1 opacity-90">CURRENT PLAN</div>
            <h2 className="text-4xl font-bold">Researcher</h2>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Manage Plan
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">API Usage</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="text-sm mb-2">Plan</div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-1">
            <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="flex justify-end text-sm">0 / 1,000 Credits</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-6 rounded-full bg-white/20 flex items-center px-1">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-sm">Pay as you go</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}; 