import React, { useState, useEffect } from 'react';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Check, 
  ShieldCheck, 
  Clock, 
  Bookmark, 
  Activity,
  AlertTriangle,
  ArrowRight,
  Server,
  Key,
  Database,
  Send,
  FileCheck
} from 'lucide-react';

const steps = [
  { 
    id: 1, 
    label: 'Authority Validation', 
    desc: 'Verifying authority node certificates...',
    icon: Server
  },
  { 
    id: 2, 
    label: 'Credential Verification', 
    desc: 'Validating secure gateway tokens...',
    icon: Key
  },
  { 
    id: 3, 
    label: 'Municipal API Synchronization', 
    desc: 'Syncing payload data schema...',
    icon: Database
  },
  { 
    id: 4, 
    label: 'Incident Dispatch Transmission', 
    desc: 'Broadcasting incident report payload...',
    icon: Send
  },
  { 
    id: 5, 
    label: 'Authority Confirmation Received', 
    desc: 'Awaiting signed acknowledgement response...',
    icon: FileCheck
  }
];

export default function TransmissionFlow({ data }) {
  const { id, authority, riskLevel, timestamp } = data || {
    id: 'REP-8839',
    authority: 'Coimbatore City Municipal Corporation (CMC)',
    riskLevel: 'High',
    timestamp: new Date().toISOString()
  };

  const messages = useWorkflowStore((state) => state.messages);
  const alreadyCompleted = messages.some(msg => msg.type === 'post_transmit_actions' && msg.data?.id === id);
  
  const [currentStep, setCurrentStep] = useState(alreadyCompleted ? 5 : 1);
  const [isCompleted, setIsCompleted] = useState(alreadyCompleted);

  const isHighRisk = ['high', 'critical'].includes((riskLevel || '').toLowerCase());

  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompleted(true);
            
            // Add the final stage chatbot success message and post-transmit actions
            const store = useWorkflowStore.getState();
            const hasPostActions = store.messages.some(msg => msg.type === 'post_transmit_actions' && msg.data?.id === id);
            
            if (!hasPostActions) {
              store.addMessage({
                sender: 'ai',
                type: 'text',
                text: `Civic dispatch sequence completed successfully. Incident report reference ${id} has been securely transmitted. Municipal transmission acknowledged (ACK) by ${authority}. Automatic SLA response tracking has been initialized and is active. Monitoring regional maintenance node.`
              });

              setTimeout(() => {
                store.addMessage({
                  sender: 'ai',
                  type: 'post_transmit_actions',
                  data: data || { id, authority, riskLevel, timestamp }
                });
              }, 600);
            }
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [isCompleted]);

  // Easing
  const premiumTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-md p-6 md:p-8 flex flex-col gap-6 transition-all duration-500">
      
      {/* Top Context Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-brand-dark font-extrabold tracking-widest block mb-1 uppercase">ORCHESTRATION CONSOLE</span>
          <h3 className="text-[24px] font-extrabold text-primaryText tracking-tight">Municipal Dispatch Transmission</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-650 self-start sm:self-center">
          <Activity className="w-3.5 h-3.5 text-brand-dark animate-pulse" />
          <span>ROADLENS GATEWAY NODE V2.4</span>
        </div>
      </div>

      {/* 2-Column Command Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Live Steps Progress Tracker (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-5 relative pr-0 md:pr-4">
          <h4 className="text-[13px] font-bold text-slate-505 uppercase tracking-wider mb-2">Live Orchestration Timeline</h4>
          
          <div className="relative flex flex-col gap-6.5 pl-1.5">
            {/* Background line connector */}
            <div className="absolute left-[18px] top-4 bottom-4 w-[2px] bg-slate-100 rounded-full" />
            
            {/* Active animated connector filling line */}
            <motion.div 
              className="absolute left-[18px] top-4 w-[2px] bg-gradient-to-b from-brand-light to-brand-dark rounded-full origin-top"
              initial={{ height: 0 }}
              animate={{ 
                height: isCompleted ? '100%' : `${((currentStep - 1) / (steps.length - 1)) * 94}%` 
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {steps.map((step) => {
              const active = step.id === currentStep && !isCompleted;
              const completed = step.id < currentStep || isCompleted;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex items-start gap-4 relative group">
                  
                  {/* Step Node Circle */}
                  <div className="w-9.5 h-9.5 flex items-center justify-center relative shrink-0">
                    <AnimatePresence mode="wait">
                      {completed ? (
                        <motion.div
                          key="completed-node"
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          className="w-8.5 h-8.5 rounded-full bg-emerald-500 border-4 border-white text-white flex items-center justify-center shadow-md shadow-emerald-500/10 z-10"
                        >
                          <Check className="w-4 h-4 stroke-[3px]" />
                        </motion.div>
                      ) : active ? (
                        <motion.div
                          key="active-node"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="relative w-9 h-9 flex items-center justify-center z-10"
                        >
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-light/30 opacity-75"></span>
                          <span className="absolute inline-flex h-7.5 w-7.5 rounded-full bg-brand-light/10"></span>
                          <div className="w-6.5 h-6.5 rounded-full bg-white border-2 border-brand-dark flex items-center justify-center text-brand-dark shadow-sm">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="pending-node"
                          className="w-5.5 h-5.5 rounded-full border-2 border-slate-200 bg-white z-10 flex items-center justify-center text-slate-350"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Step Labels */}
                  <div className="flex-1 flex flex-col pt-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[14.5px] font-semibold tracking-wide transition-colors duration-300 ${
                        active 
                          ? 'text-slate-900 font-extrabold scale-[1.01] origin-left' 
                          : completed 
                            ? 'text-slate-700 font-semibold' 
                            : 'text-slate-400 font-normal'
                      }`}>
                        {step.label}
                      </span>
                      {active && (
                        <span className="text-[10px] font-bold text-brand-dark bg-brand-light/10 px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                          Processing
                        </span>
                      )}
                    </div>
                    <span className={`text-[12px] font-normal leading-normal transition-colors duration-300 mt-0.5 ${
                      active ? 'text-slate-550' : completed ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {active ? step.desc : completed ? 'Node synchronized.' : 'Awaiting sequence execution.'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dispatch Status Panel (5 cols) */}
        <div className="md:col-span-5 flex flex-col">
          <h4 className="text-[13px] font-bold text-slate-505 uppercase tracking-wider mb-2">Transmission Dispatch Ticket</h4>

          <AnimatePresence mode="wait">
            {!isCompleted ? (
              /* Loading / Pending Dispatch state */
              <motion.div
                key="dispatch-loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={premiumTransition}
                className="flex-1 rounded-2xl bg-slate-50 border border-slate-200/80 p-5 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[300px]"
              >
                {/* Glowing subtle ring */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-light/5 to-transparent pointer-events-none" />
                
                <div className="w-full flex justify-between items-center pb-3.5 border-b border-slate-100 text-xs font-semibold text-slate-400">
                  <span>REF: {id}</span>
                  <span className="animate-pulse flex items-center gap-1 text-brand-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-ping" />
                    Synchronizing...
                  </span>
                </div>

                <div className="my-auto flex flex-col items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full bg-brand-light/10 flex items-center justify-center border border-brand-light/20">
                    <Server className="w-7 h-7 text-brand-dark animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[15px] text-slate-900 leading-tight">Encrypting Dispatch Payload</h5>
                    <p className="text-[12.5px] text-slate-500 mt-2 max-w-[200px] mx-auto leading-relaxed">
                      Securing transmission packets over civic SSL node gateway.
                    </p>
                  </div>
                </div>

                {/* Animated loading bar progress indicator */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-4">
                  <motion.div 
                    className="h-full bg-brand-dark rounded-full origin-left"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ) : (
              /* Verified / Confirmed Dispatch Receipt State */
              <motion.div
                key="dispatch-receipt"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={premiumTransition}
                className="flex-grow flex flex-col justify-between gap-5 p-5.5 rounded-2xl bg-emerald-50/50 border border-emerald-250 shadow-sm relative overflow-hidden"
              >
                {/* Top Title */}
                <div className="flex items-center justify-between pb-3.5 border-b border-emerald-100">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-xs tracking-wider">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 animate-pulse" />
                    <span>DISPATCH SECURED (ACK)</span>
                  </div>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    SUCCESS
                  </span>
                </div>

                {/* Acknowledgment block */}
                <div className="text-[13.5px] text-emerald-800 leading-relaxed font-semibold">
                  The municipal authority node has acknowledged the alert, verified the payload signature, and assigned the incident to the dispatch queue.
                </div>

                {/* Receipt Details Table */}
                <div className="flex flex-col gap-3.5 text-[12.5px] border-t border-emerald-100/50 pt-4 font-semibold text-slate-700">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-slate-500 font-medium">TARGET NODE:</span>
                    <span className="font-extrabold text-slate-900 truncate text-right max-w-[150px]">{authority}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">DISPATCH STATUS:</span>
                    <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Acknowledge Recv
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">TICKET REF ID:</span>
                    <span className="font-extrabold text-slate-900 flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-brand-dark" />
                      {id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">RESPONSE SLA:</span>
                    <span className={`font-extrabold flex items-center gap-1 ${isHighRisk ? 'text-red-500' : 'text-brand-dark'}`}>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {isHighRisk ? 'Action within 24h' : 'Action within 7d'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">TIMESTAMP:</span>
                    <span className="font-extrabold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-mutedText" />
                      {new Date(timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="mt-2.5 p-3 rounded-xl bg-white/70 border border-emerald-100 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                  <span>VERIFICATION SEAL:</span>
                  <span className="tracking-wide text-emerald-700">MUNICIPAL DEPT SIGNED</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
