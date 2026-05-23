import React from 'react';
import { motion } from 'framer-motion';
import { handleActionCardSelect } from '../../lib/conversationEngine';
import { AlertCircle, Camera, History } from 'lucide-react';

const cards = [
  {
    id: 'report_issue',
    title: 'Report Issue',
    description: 'Upload an image of pavement damage or potholes to run a civic check.',
    icon: AlertCircle,
    gradient: 'from-[#38BDF8] to-[#0EA5E9]'
  },
  {
    id: 'capture_image',
    title: 'Capture Image',
    description: 'Simulate on-site camera capture to evaluate road damage conditions.',
    icon: Camera,
    gradient: 'from-[#60A5FA] to-[#3B82F6]'
  },
  {
    id: 'recent_reports',
    title: 'Recent Reports',
    description: 'Review dispatched and pending infrastructure reports in this region.',
    icon: History,
    gradient: 'from-[#818CF8] to-[#6366F1]'
  }
];

export default function ActionCards({ isCollapsed }) {
  if (isCollapsed) return null;

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.3 }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4.5"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.button
            key={card.id}
            onClick={() => handleActionCardSelect(card.id)}
            variants={{
              hidden: { y: 20, opacity: 0, filter: 'blur(4px)' },
              show: { y: 0, opacity: 1, filter: 'blur(0px)' }
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex flex-col text-left p-8 rounded-[28px] bg-white border border-slate-200/60 hover:border-brand-light/50 shadow-sm hover:shadow-md hover:shadow-brand-light/10 transition-colors duration-300 outline-none group relative overflow-hidden"
          >
            {/* Animated subtle blue glow in background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-light/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon container */}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.gradient} flex items-center justify-center text-white mb-4.5 shadow-sm group-hover:shadow-md group-hover:shadow-brand-light/20 transition-all duration-300 relative`}>
              <Icon className="w-5 h-5" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <h3 className="font-bold text-[16px] text-slate-900 tracking-tight mb-2.5 group-hover:text-brand-dark transition-colors">
              {card.title}
            </h3>
            <p className="text-[14px] text-slate-650 leading-relaxed font-normal">
              {card.description}
            </p>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
