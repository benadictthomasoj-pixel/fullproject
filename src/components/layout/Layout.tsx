import React from 'react';
import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { TopNav } from './TopNav';
import './Layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <TopNav />
      <main className="main-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>

      {/* Global Chatbot Floating Action Button */}
      <button 
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 z-[9999] group cursor-pointer border-4 border-white"
        onClick={() => {}}
      >
        <MessageCircle size={28} />
        <span className="absolute right-20 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none whitespace-nowrap">
          Chat with AI
        </span>
      </button>

    </div>
  );
};
