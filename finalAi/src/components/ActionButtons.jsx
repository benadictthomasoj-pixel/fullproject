import React, { useState } from 'react';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { motion } from 'framer-motion';
import { Eye, Download, Send, RefreshCw, CheckCircle2 } from 'lucide-react';
import { generatePremiumPDF } from '../lib/pdfGenerator';

export default function ActionButtons({ isCollapsed }) {
  const resetWorkflow = useWorkflowStore((state) => state.resetWorkflow);
  const addMessage = useWorkflowStore((state) => state.addMessage);
  const currentReport = useWorkflowStore((state) => state.currentReport);
  
  const [transmitted, setTransmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (isCollapsed) return null;

  const handleTransmit = () => {
    if (transmitted) return;
    setTransmitted(true);
    
    // Add user message
    addMessage({
      sender: 'user',
      text: "Transmit report to municipal authority",
      type: 'text'
    });

    // Add transmission flow animation block
    setTimeout(() => {
      addMessage({
        sender: 'ai',
        type: 'transmission_flow',
        data: currentReport
      });
    }, 600);
  };

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    // Simulate brief download state
    setTimeout(() => {
      setIsDownloading(false);
      try {
        generatePremiumPDF(currentReport);
      } catch (error) {
        console.error("Failed to generate PDF:", error);
      }
    }, 800);
  };

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
        data: currentReport
      });
    }, 600);
  };

  const buttons = [
    {
      id: 'view',
      label: 'View Full Report',
      icon: Eye,
      onClick: handleViewFullReport,
      disabled: false,
      color: 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
    },
    {
      id: 'download',
      label: isDownloading ? 'Downloading...' : 'Download Report',
      icon: Download,
      onClick: handleDownload,
      disabled: isDownloading,
      color: 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
    },
    {
      id: 'transmit',
      label: transmitted ? 'Transmitted' : 'Transmit to Authority',
      icon: transmitted ? CheckCircle2 : Send,
      onClick: handleTransmit,
      disabled: transmitted,
      color: transmitted 
        ? 'bg-emerald-50 text-emerald-600 border border-emerald-150' 
        : 'bg-gradient-to-r from-brand-light to-brand-dark text-white hover:shadow-md hover:shadow-brand-light/10 hover:opacity-95'
    },
    {
      id: 'another',
      label: 'Analyze Another',
      icon: RefreshCw,
      onClick: resetWorkflow,
      disabled: false,
      color: 'bg-slate-900 text-white hover:bg-slate-800'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 w-full max-w-3xl mx-auto mt-6"
    >
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <motion.button
            key={btn.id}
            onClick={btn.onClick}
            disabled={btn.disabled}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full sm:w-auto flex-1 min-w-[170px] sm:max-w-[240px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[14px] font-semibold tracking-wide transition-all duration-300 outline-none shadow-sm ${btn.color}`}
          >
            <Icon className="w-4 h-4" />
            <span>{btn.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
