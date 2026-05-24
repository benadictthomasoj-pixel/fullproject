import React from 'react';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  FileText, 
  BarChart3, 
  ShieldAlert, 
  X,
  Compass,
  Radio,
  Server,
  Activity
} from 'lucide-react';

const navItems = [
  { id: 'chatbot', label: 'AI Chatbot', icon: MessageSquare },
  { id: 'reports', label: 'My Reports', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'authorities', label: 'Authorities', icon: ShieldAlert }
];

export default function Sidebar() {
  const activeTab = useWorkflowStore((state) => state.activeTab);
  const setActiveTab = useWorkflowStore((state) => state.setActiveTab);
  const sidebarOpen = useWorkflowStore((state) => state.sidebarOpen);
  const setSidebarOpen = useWorkflowStore((state) => state.setSidebarOpen);
  const reportsHistory = useWorkflowStore((state) => state.reportsHistory);

  const sidebarContent = (
    <div className="flex flex-col h-full p-6 select-none overflow-y-auto custom-scrollbar">
      
      {/* Brand Header */}
      <div className="flex items-center gap-3.5 px-2 py-4 mb-9">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-light to-brand-dark shadow-md shadow-brand-light/35">
          <Compass className="w-5 h-5 text-white" />
          <div className="absolute inset-0 rounded-2xl bg-white/20 blur-[2.5px] pointer-events-none" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-primaryText flex items-center gap-1.5 leading-none">
            RoadLens<span className="text-brand-dark text-xs font-bold px-2 py-0.5 rounded-full bg-brand-light/10 border border-brand-light/20">AI</span>
          </h1>
          <span className="text-[13px] text-slate-700 font-bold uppercase tracking-wider block mt-2">CIVIC OPERATING SYSTEM</span>
        </div>
      </div>

      {/* Navigation Group */}
      <div className="flex flex-col gap-2 mb-9">
        <span className="text-[13px] font-bold text-slate-700 tracking-wider pl-3 mb-3">WORKSPACE NAVIGATION</span>
        <nav className="space-y-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className="relative w-full flex items-center gap-4 px-4.5 py-4 rounded-xl font-semibold text-[15px] transition-all duration-300 outline-none text-left group overflow-hidden"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-gradient-to-r from-brand-light/10 to-brand-dark/5 border-l-[3px] border-brand-dark"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {!isActive && (
                  <div className="absolute inset-0 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                <div className="relative z-10 flex items-center justify-center">
                  <Icon 
                    className={`w-[18px] h-[18px] transition-all duration-300 ${
                      isActive 
                        ? 'text-brand-dark scale-105' 
                        : 'text-slate-650 group-hover:text-primaryText group-hover:-translate-y-[0.5px]'
                    }`} 
                  />
                </div>

                <span 
                  className={`relative z-10 flex-1 transition-all duration-300 font-sans tracking-wide ${
                    isActive 
                      ? 'text-brand-dark font-bold' 
                      : 'text-slate-600 group-hover:text-primaryText font-medium'
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="relative z-10 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-dark/65 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-dark"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Intelligence Widgets Section */}
      <div className="flex flex-col gap-4 mb-9 pt-6 border-t border-slate-100/60">
        <span className="text-[13px] font-bold text-slate-700 tracking-wider pl-3">INTELLIGENCE BRIEFING</span>
        
        {/* Widget 1: System Status Node */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100/60 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Server className="w-[18px] h-[18px] text-brand-dark" />
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-slate-900 leading-none">AI Dispatch Node</span>
              <span className="text-[13px] text-slate-600 mt-1.5 font-medium">Chennai Central</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[13px] font-bold text-emerald-700 uppercase">ONLINE</span>
          </div>
        </div>

        {/* Widget 2: Today's Metrics */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100/60 flex flex-col gap-2.5 shadow-sm">
          <div className="flex items-center justify-between text-[13px] font-bold text-slate-700">
            <span className="flex items-center gap-2">
              <Activity className="w-[18px] h-[18px] text-brand-dark" />
              TODAY'S ACTIVITY
            </span>
            <span className="text-[12px] bg-brand-light/10 text-brand-dark px-2.5 py-0.5 rounded font-extrabold uppercase">LIVE</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center pt-1">
            <div className="bg-white border border-slate-100/50 rounded-xl p-2.5 flex flex-col justify-center">
              <span className="text-[16px] font-bold text-primaryText leading-none">{reportsHistory.length + 5}</span>
              <span className="text-[13px] font-semibold text-slate-600 uppercase mt-1.5">Dispatched</span>
            </div>
            <div className="bg-white border border-slate-100/50 rounded-xl p-2.5 flex flex-col justify-center">
              <span className="text-[16px] font-bold text-emerald-600 leading-none">3</span>
              <span className="text-[13px] font-semibold text-slate-600 uppercase mt-1.5">Resolved</span>
            </div>
          </div>
        </div>

        {/* Widget 3: Live Incident Alerts */}
        <div className="p-4 rounded-2xl border border-slate-100/40 bg-slate-50/30 flex flex-col gap-2.5">
          <span className="text-[13px] font-bold text-slate-700 uppercase tracking-wider pl-1">RECENT CIVIC ALERTS</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2.5 text-[13px] text-slate-650 leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              <p className="font-medium"><strong className="text-primaryText font-bold">Avinashi Rd</strong>: INC-7809 marked resolved by CMC.</p>
            </div>
            <div className="flex items-start gap-2.5 text-[13px] text-slate-650 leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-dark mt-2 flex-shrink-0" />
              <p className="font-medium"><strong className="text-primaryText font-bold">Trichy Rd</strong>: Pothole dispatch synced 5m ago.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding Info */}
      <div className="px-2 py-4 border-t border-slate-100/60 mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-secondaryText">
            M
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-900 leading-none">Municipal Portal</p>
            <p className="text-[12px] text-slate-550 mt-1.5 font-medium">Authority node active</p>
          </div>
        </div>
        <Radio className="w-4 h-4 text-brand-dark animate-pulse" />
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-[280px] h-[calc(100vh-32px)] my-4 ml-4 sticky top-4 left-4 z-40 glass-panel rounded-[32px]">
        {sidebarContent}
      </aside>

      {/* Tablet/Mobile Slide Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900 z-50 backdrop-blur-sm"
            />
            {/* Sliding Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed top-0 left-0 w-[280px] h-full bg-white z-50 border-r border-slate-100 shadow-2xl flex flex-col"
            >
              {/* Close Button on Mobile Drawer */}
              <button 
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-secondaryText hover:text-primaryText transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
