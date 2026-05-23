import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Check, 
  ShieldCheck, 
  Clock, 
  Bookmark, 
  Activity,
  AlertTriangle
} from 'lucide-react';

const steps = [
  { id: 1, label: 'Validating authority node credentials...' },
  { id: 2, label: 'Generating signed dispatch payload...' },
  { id: 3, label: 'Syncing municipal API gateway...' },
  { id: 4, label: 'Transmitting infrastructure alert...' }
];

export default function TransmissionFlow({ data }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const { id, authority, riskLevel, timestamp } = data || {
    id: 'REP-8839',
    authority: 'Coimbatore City Municipal Corporation (CMC)',
    riskLevel: 'High',
    timestamp: new Date().toISOString()
  };

  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompleted(true);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 950);

    return () => clearInterval(interval);
  }, [isCompleted]);

  // Easing
  const premiumTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="w-full max-w-lg mx-auto rounded-[32px] bg-white border border-slate-150 shadow-xl p-6 md:p-8 flex flex-col gap-6.5">
      
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[13px] text-brand-dark font-semibold tracking-wider block mb-1">MUNICIPAL TRANSMISSION</span>
          <h3 className="text-[24px] font-bold text-primaryText tracking-tight">AI Dispatch Orchestration</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[13px] font-semibold text-slate-700">
          <Activity className="w-3.5 h-3.5 text-brand-dark" />
          <span>INCIDENT NODE</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          /* STEP 1: Animated Progress */
          <motion.div
            key="progress-steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={premiumTransition}
            className="flex flex-col gap-5.5 py-3"
          >
            {steps.map((step) => {
              const active = step.id === currentStep;
              const completed = step.id < currentStep;

              return (
                <div key={step.id} className="flex items-center gap-4.5 px-2">
                  <div className="w-6.5 h-6.5 flex items-center justify-center relative">
                    {completed ? (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </motion.div>
                    ) : active ? (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-5.5 h-5.5 flex items-center justify-center text-brand-dark"
                      >
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                      </motion.div>
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border border-slate-200 bg-white" />
                    )}
                  </div>
                  <span className={`text-[15px] font-medium tracking-wide transition-colors ${
                    active ? 'text-slate-900 font-bold' : completed ? 'text-slate-600 font-medium' : 'text-slate-400 font-normal'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* STEP 2 & 3: Success State & Compact Status Card */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={premiumTransition}
            className="flex flex-col gap-6.5"
          >
            {/* Confirmation Alert Bubble */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100/70 flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
                <h4 className="text-[14px] font-bold uppercase tracking-wider">AI DISPATCH CONFIRMED</h4>
              </div>
              <p className="text-[15px] md:text-[16px] text-emerald-800 leading-[1.8] font-medium">
                RoadLens AI successfully dispatched the infrastructure incident report to the <strong className="font-bold">{authority}</strong>.
              </p>
              <p className="text-[15px] md:text-[16px] text-emerald-800 leading-[1.8] font-medium">
                Priority classification: <strong className="font-bold uppercase">{riskLevel} RISK</strong>.
                <br />
                Dispatch reference: <strong className="font-bold">{id}</strong>.
              </p>
              <p className="text-[14px] text-emerald-800/90 leading-[1.8] font-medium italic pt-2.5 border-t border-emerald-250/40">
                The authority node has acknowledged the alert and marked the issue for engineering review.
              </p>
            </div>

            {/* Compact Status Card */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col gap-3.5 shadow-sm">
              <span className="text-[13px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">MUNICIPAL RECEIPT METADATA</span>
              
              <div className="flex flex-col gap-3 text-[13px] font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">TARGET NODE:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[220px]">{authority}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">DISPATCH STATUS:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Transmitted (ACK)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">TICKET ID:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Bookmark className="w-4 h-4 text-brand-dark" />
                    {id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">TIMESTAMP:</span>
                  <span className="font-bold text-slate-850 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-mutedText" />
                    {new Date(timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">ESCALATION PRIORITY:</span>
                  <span className={`font-bold flex items-center gap-1 ${
                    riskLevel.toLowerCase() === 'critical' || riskLevel.toLowerCase() === 'high' ? 'text-red-500' : 'text-brand-dark'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                    {riskLevel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
