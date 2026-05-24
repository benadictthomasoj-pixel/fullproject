import React, { useRef, useEffect } from 'react';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { handleImageUpload } from '../lib/conversationEngine';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, HelpCircle, Compass, CornerDownLeft } from 'lucide-react';
import ActionCards from './ActionCards';
import WorkflowTimeline from './WorkflowTimeline';
import ReportCard from './ReportCard';
import ActionButtons from './ActionButtons';
import LocationModal from './LocationModal';
import ReportDashboard from './ReportDashboard';
import TransmissionFlow from './TransmissionFlow';
import PostTransmitActions from './PostTransmitActions';

export default function ChatWorkspace() {
  const messages = useWorkflowStore((state) => state.messages);
  const isAnalyzing = useWorkflowStore((state) => state.isAnalyzing);
  const isUploadBarVisible = useWorkflowStore((state) => state.isUploadBarVisible);
  const fileInputRef = useRef(null);
  const feedEndRef = useRef(null);

  // Automatic scrolling on new messages
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnalyzing]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const triggerFileSelect = () => {
    if (isAnalyzing) return;
    fileInputRef.current?.click();
  };

  // Easing specification: cubic-bezier(0.22, 1, 0.36, 1)
  const premiumTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-88px)] relative overflow-hidden">
      
      {/* Scrollable Conversation Stream */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-16 custom-scrollbar flex flex-col">
        <div className={`max-w-[900px] w-full mx-auto flex flex-col gap-9 my-auto transition-all duration-300 ${
          isUploadBarVisible ? 'pb-36 md:pb-40' : 'pb-10 md:pb-14'
        }`}>
          
          {/* Welcome / Header Area */}
          <div className="flex flex-col gap-3 mb-6 border-b border-slate-100/60 pb-6">
            <span className="text-[11px] md:text-[12px] text-brand-dark font-extrabold tracking-widest uppercase">CIVIC SYSTEM CAPABILITY</span>
            <h2 className="text-[32px] sm:text-[40px] md:text-[46px] font-black tracking-tight text-primaryText leading-[1.1] mb-1">
              AI Powered Road Infrastructure Intelligence
            </h2>
            <p className="text-[15px] md:text-[16px] text-slate-600 leading-relaxed font-normal max-w-3xl">
              Analyze road infrastructure anomalies, generate municipal intelligence reports, and coordinate civic dispatch operations through an intelligent AI-assisted workflow.
            </p>
          </div>

          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              
              if (isUser) {
                return (
                  <motion.div
                    key={msg.id || index}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={premiumTransition}
                    className="flex justify-end w-full"
                  >
                    <div className="max-w-[80%] rounded-[24px] bg-gradient-to-r from-brand-light to-brand-dark px-7 py-5 text-[16px] font-semibold text-white shadow-sm hover:shadow-md hover:shadow-brand-light/10 transition-shadow">
                      {msg.text}
                    </div>
                  </motion.div>
                );
              }

              // AI Message Containers
              return (
                <motion.div
                  key={msg.id || index}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={premiumTransition}
                  className="flex flex-col items-start w-full gap-4"
                >
                  {/* Label */}
                  {msg.type !== 'actions' && (
                    <span className="text-[13px] font-bold text-slate-500 tracking-wider pl-3">
                      ROADLENS AI
                    </span>
                  )}

                  {/* Text Message Content */}
                  {msg.type === 'text' && (
                    <div className={`w-full max-w-[92%] rounded-[28px] glass-panel p-8 md:p-10 text-[16px] md:text-[17px] text-slate-800 leading-[1.8] shadow-sm transition-all duration-500 ${msg.isCollapsed ? 'opacity-40 hover:opacity-100 scale-98 pointer-events-none' : ''}`}>
                      <p className="whitespace-pre-line font-normal">{msg.text}</p>
                      
                      {/* Sub-actions (Initial Cards) */}
                      {msg.actions && (
                        <ActionCards isCollapsed={msg.isCollapsed} />
                      )}
                    </div>
                  )}

                  {/* Workflow Timeline Block */}
                  {msg.type === 'workflow' && (
                    <WorkflowTimeline isCollapsed={msg.isCollapsed} />
                  )}

                  {/* Report Card Block */}
                  {msg.type === 'report' && (
                    <ReportCard data={msg.data} isCollapsed={msg.isCollapsed} />
                  )}

                  {/* Action Buttons Block */}
                  {msg.type === 'actions' && (
                    <ActionButtons isCollapsed={msg.isCollapsed} />
                  )}

                  {/* Custom Full Report Briefing Dashboard */}
                  {msg.type === 'full_report' && (
                    <ReportDashboard data={msg.data} isCollapsed={msg.isCollapsed} />
                  )}

                  {/* Custom Animated Transmission Progress Flow */}
                  {msg.type === 'transmission_flow' && (
                    <TransmissionFlow data={msg.data} />
                  )}

                  {/* Post-Transmission Actions Block */}
                  {msg.type === 'post_transmit_actions' && (
                    <PostTransmitActions data={msg.data} isCollapsed={msg.isCollapsed} />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div ref={feedEndRef} />
        </div>
      </div>

      {/* Floating Prompt/Upload Box */}
      <AnimatePresence>
        {isUploadBarVisible && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={premiumTransition}
            className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-20"
          >
            <div className="max-w-[900px] mx-auto pointer-events-auto">
              
              <div 
                onClick={triggerFileSelect}
                className={`w-full glass-panel rounded-[28px] p-4 flex items-center gap-4.5 border border-slate-200 shadow-md hover:shadow-lg hover:shadow-brand-light/5 hover:border-brand-light/35 transition-all duration-300 cursor-pointer ${
                  isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {/* Hidden native input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={onFileChange} 
                  accept="image/*" 
                  className="hidden" 
                  disabled={isAnalyzing}
                />

                {/* Upload Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-secondaryText hover:text-brand-dark transition-colors">
                  <Upload className="w-5 h-5" />
                </div>

                {/* Interactive placeholder message */}
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-bold text-slate-900">
                    {isAnalyzing ? 'Processing road damage analysis...' : 'Analyze road infrastructure'}
                  </p>
                  <p className="text-[13px] text-slate-600 font-medium mt-1">
                    {isAnalyzing ? 'Running Gemini Vision API checks' : 'Select or drag an image containing road surface, potholes, or cracks'}
                  </p>
                </div>

                {/* Keyboard return simulator */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[13px] font-medium text-slate-600">
                  <span>Upload</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </div>
              </div>
              
              <div className="text-center mt-4.5 flex items-center justify-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-mutedText" />
                <p className="text-[13px] text-slate-600 font-semibold uppercase tracking-wider">
                  RoadLens AI operates under the local Municipal Portal context
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LocationModal />
    </div>
  );
}
