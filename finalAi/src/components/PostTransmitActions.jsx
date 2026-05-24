import React, { useState } from 'react';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { motion } from 'framer-motion';
import { RefreshCw, Eye, Landmark, Database } from 'lucide-react';

export default function PostTransmitActions({ data, isCollapsed }) {
  const resetWorkflow = useWorkflowStore((state) => state.resetWorkflow);
  const addMessage = useWorkflowStore((state) => state.addMessage);
  const setActiveTab = useWorkflowStore((state) => state.setActiveTab);
  
  if (isCollapsed) return null;

  const handleViewFullReport = () => {
    addMessage({
      sender: 'user',
      text: "View full report summary metadata",
      type: 'text'
    });

    setTimeout(() => {
      addMessage({
        sender: 'ai',
        type: 'full_report',
        data: data
      });
    }, 600);
  };

  const handleTrackStatus = () => {
    setActiveTab('authorities');
  };

  const handleReturnDashboard = () => {
    setActiveTab('reports');
  };

  const buttons = [
    {
      id: 'another',
      label: 'Analyze Another Image',
      icon: RefreshCw,
      onClick: resetWorkflow,
      color: 'bg-slate-900 text-white hover:bg-slate-800'
    },
    {
      id: 'view',
      label: 'View Full Report',
      icon: Eye,
      onClick: handleViewFullReport,
      color: 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
    },
    {
      id: 'track',
      label: 'Track Authority Status',
      icon: Landmark,
      onClick: handleTrackStatus,
      color: 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
    },
    {
      id: 'dashboard',
      label: 'Return to Dashboard',
      icon: Database,
      onClick: handleReturnDashboard,
      color: 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 w-full max-w-3xl mx-auto mt-4"
    >
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <motion.button
            key={btn.id}
            onClick={btn.onClick}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full sm:w-auto flex-1 min-w-[190px] sm:max-w-[240px] flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-[14px] font-semibold tracking-wide transition-all duration-300 outline-none shadow-sm ${btn.color}`}
          >
            <Icon className="w-4 h-4" />
            <span>{btn.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
