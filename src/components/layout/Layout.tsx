import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatbotApp from '../chatbot/ChatbotApp';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { TopNav } from './TopNav';
import './Layout.css';

export const Layout: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const setDashboardContext = useWorkflowStore((state) => state.setDashboardContext);

  useEffect(() => {
    setDashboardContext(location.pathname);
  }, [location.pathname, setDashboardContext]);

  return (
    <div className="layout-container relative">
      <TopNav />
      <main className="main-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>

      {/* Slide-out Chatbot Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/20 z-[9990] backdrop-blur-sm"
            />
            {/* Panel (Centered Modal) */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] h-[85vh] bg-[#FCFDFE] rounded-2xl shadow-2xl z-[9995] flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Chat Header inside the panel (optional if ChatbotApp doesn't have a close button) */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shadow-sm z-10 shrink-0">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <MessageCircle size={20} className="text-blue-600" />
                  RoadLens AI
                </h3>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <ChatbotApp />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Chatbot Floating Action Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 z-[9999] group cursor-pointer border-4 border-white"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle size={28} />
            <span className="absolute right-20 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none whitespace-nowrap">
              Chat with AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};
