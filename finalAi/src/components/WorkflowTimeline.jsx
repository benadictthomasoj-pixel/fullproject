import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { Check } from 'lucide-react';

export default function WorkflowTimeline({ isCollapsed }) {
  const activeStep = useWorkflowStore((state) => state.activeWorkflowStep);
  const steps = useWorkflowStore((state) => state.workflowSteps);
  const containerRef = useRef(null);

  // Height of steps scaled slightly for typography comfort (64px instead of 56px)
  const stepHeight = 64;
  const centerYOffset = 80; // Centers the active item
  const translateY = activeStep > 0 ? -((activeStep - 1) * stepHeight) + centerYOffset : centerYOffset;

  return (
    <div className={`w-full max-w-md mx-auto rounded-2xl bg-white border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col items-center transition-all duration-500 ${isCollapsed ? 'opacity-50 scale-98 pointer-events-none' : ''}`}>
      
      {/* Title Header */}
      <div className="text-center mb-4">
        <h4 className="text-[22px] font-extrabold text-primaryText tracking-tight leading-tight mb-1.5">Intelligence Workflow</h4>
        <p className="text-[13px] text-slate-500 font-medium">Running automated validation and analysis sequence</p>
      </div>

      {/* Masked Window Container */}
      <div className="relative h-[240px] w-full overflow-hidden flex items-center justify-center">
        
        {/* Sky blue background line */}
        <div className="absolute left-[33px] md:left-[41px] top-4 bottom-4 w-[2px] bg-slate-100 rounded-full" />
        
        {/* Dynamic sky blue progress line */}
        <motion.div 
          className="absolute left-[33px] md:left-[41px] top-4 w-[2px] bg-gradient-to-b from-brand-light to-brand-dark rounded-full origin-top"
          initial={{ height: 0 }}
          animate={{ 
            height: activeStep > 0 ? `${((activeStep - 1) / (steps.length - 1)) * 100}%` : '0%' 
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Sliding steps wrapper */}
        <motion.div
          animate={{ y: translateY }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          className="absolute left-0 right-0 flex flex-col justify-start"
          style={{ height: `${steps.length * stepHeight}px` }}
        >
          {steps.map((step, idx) => {
            const isCompleted = step.id < activeStep;
            const isActive = step.id === activeStep;
            const isPending = step.id > activeStep;

            return (
              <motion.div
                key={step.id}
                layout
                className={`flex items-center gap-5 md:gap-7 px-4 transition-all duration-300`}
                style={{ height: `${stepHeight}px` }}
              >
                {/* Node representation */}
                <div className="w-10 md:w-14 flex justify-center items-center relative">
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="completed"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-light to-brand-dark flex items-center justify-center text-white shadow-sm shadow-brand-light/35"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        key="active"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-8 h-8 flex items-center justify-center"
                      >
                        {/* Double pulsing rings */}
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-light/40 opacity-75"></span>
                        <span className="animate-pulse-glow absolute inline-flex h-6 w-6 rounded-full bg-brand-light/20"></span>
                        <div className="relative w-4 h-4 rounded-full bg-brand-dark shadow-md" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pending"
                        className="w-4.5 h-4.5 rounded-full border-2 border-slate-200 bg-white"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Step label description */}
                <div className="flex-1 flex flex-col justify-center">
                  <span 
                    className={`text-[15px] font-sans tracking-wide transition-all duration-300 ${
                      isActive 
                        ? 'text-primaryText font-bold scale-[1.03] origin-left' 
                        : isCompleted 
                          ? 'text-slate-700 font-medium' 
                          : 'text-slate-400 font-normal'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
