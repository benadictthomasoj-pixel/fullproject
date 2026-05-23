import React from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { Menu, MapPin, ChevronDown } from 'lucide-react';

export default function TopBar() {
  const activeTab = useWorkflowStore((state) => state.activeTab);
  const selectedRegion = useWorkflowStore((state) => state.selectedRegion);
  const setSelectedRegion = useWorkflowStore((state) => state.setSelectedRegion);
  const sidebarOpen = useWorkflowStore((state) => state.sidebarOpen);
  const setSidebarOpen = useWorkflowStore((state) => state.setSidebarOpen);

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'chatbot': return 'AI CHATBOT';
      case 'reports': return 'MY REPORTS';
      case 'analytics': return 'ANALYTICS HUB';
      case 'authorities': return 'CIVIC AUTHORITIES';
      default: return 'ROADLENS AI';
    }
  };

  const handleRegionChange = () => {
    const regions = [
      'Chennai, Tamil Nadu',
      'Coimbatore, Tamil Nadu',
      'Madurai, Tamil Nadu',
      'Trichy, Tamil Nadu',
      'Salem, Tamil Nadu'
    ];
    const currentIndex = regions.indexOf(selectedRegion);
    const nextIndex = (currentIndex + 1) % regions.length;
    setSelectedRegion(regions[nextIndex]);
  };

  return (
    <header className="h-22 min-h-[88px] w-full flex items-center justify-between px-6 md:px-12 sticky top-0 z-30 glass-context-bar backdrop-blur-md">
      {/* Left side: Hamburger (Mobile) + Section Title */}
      <div className="flex items-center gap-4.5">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-2xl hover:bg-slate-100/80 border border-slate-100 text-secondaryText hover:text-primaryText transition-colors outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col">
          <span className="text-[13px] text-brand-dark font-semibold tracking-wider leading-none mb-2">WORKSPACE</span>
          <h2 className="text-[18px] font-bold text-primaryText tracking-wide leading-none">{getSectionTitle()}</h2>
        </div>
      </div>

      {/* Right side: Region Display */}
      <div className="flex items-center">
        <button
          onClick={handleRegionChange}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-150 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm text-[14px] font-semibold text-slate-700 hover:text-primaryText transition-all duration-300 group outline-none"
        >
          <MapPin className="w-4 h-4 text-brand-dark transition-transform group-hover:scale-110" />
          <span className="font-medium tracking-wide">Region:</span>
          <span className="text-primaryText font-bold">{selectedRegion}</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-mutedText group-hover:text-secondaryText transition-colors" />
        </button>
      </div>
    </header>
  );
}
