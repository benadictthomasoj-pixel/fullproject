import React, { useState } from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { motion } from 'framer-motion';
import { Eye, Download, Send, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ActionButtons({ isCollapsed }) {
  const resetWorkflow = useWorkflowStore((state) => state.resetWorkflow);
  const addMessage = useWorkflowStore((state) => state.addMessage);
  const currentReport = useWorkflowStore((state) => state.currentReport);
  
  const [transmitted, setTransmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewingFull, setViewingFull] = useState(false);

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
      
      // Trigger a raw text download as a PDF simulation
      const reportText = `ROADLENS AI - INFRASTRUCTURE REPORT
-----------------------------------------
ID: ${currentReport?.id}
Date: ${new Date(currentReport?.timestamp).toLocaleString()}
Location: ${currentReport?.location}
Damage Type: ${currentReport?.damageType}
Severity: ${currentReport?.severityScore}/10
Risk Level: ${currentReport?.riskLevel}
AI Confidence: ${currentReport?.confidenceScore}%
Assigned Authority: ${currentReport?.authority}
Recommended Action: ${currentReport?.recommendedAction}
-----------------------------------------
Municipal Infrastructure Node Verified.
`;
      
      const element = document.createElement("a");
      const file = new Blob([reportText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `RoadLens_Report_${currentReport?.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const handleViewFullReport = () => {
    setViewingFull(true);
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
      color: 'bg-white text-secondaryText hover:text-primaryText border border-slate-200 hover:border-slate-350'
    },
    {
      id: 'download',
      label: isDownloading ? 'Downloading...' : 'Download Report',
      icon: Download,
      onClick: handleDownload,
      disabled: isDownloading,
      color: 'bg-white text-secondaryText hover:text-primaryText border border-slate-200 hover:border-slate-350'
    },
    {
      id: 'transmit',
      label: transmitted ? 'Transmitted' : 'Transmit to Authority',
      icon: transmitted ? CheckCircle2 : Send,
      onClick: handleTransmit,
      disabled: transmitted,
      color: transmitted 
        ? 'bg-emerald-50 text-emerald-600 border border-emerald-150' 
        : 'bg-gradient-to-r from-brand-light to-brand-dark text-white hover:shadow-md hover:shadow-brand-light/20'
    },
    {
      id: 'another',
      label: 'Analyze Another',
      icon: RefreshCw,
      onClick: resetWorkflow,
      disabled: false,
      color: 'bg-slate-950 text-white hover:bg-slate-800'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4.5 w-full max-w-3xl mx-auto mt-8"
    >
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <motion.button
            key={btn.id}
            onClick={btn.onClick}
            disabled={btn.disabled}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-[14px] font-semibold tracking-normal transition-all duration-300 outline-none shadow-sm ${btn.color}`}
          >
            <Icon className="w-4 h-4" />
            <span>{btn.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
