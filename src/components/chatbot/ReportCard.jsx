import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Layers,
  Sparkles,
  ChevronRight,
  Bookmark
} from 'lucide-react';

export default function ReportCard({ data, isCollapsed }) {
  if (!data) return null;

  const { 
    id,
    severityScore, 
    damageType, 
    riskLevel, 
    location, 
    recommendedAction, 
    authority, 
    confidenceScore 
  } = data;

  // Determine Severity Color Scheme
  const getSeverityColor = (score) => {
    const num = parseFloat(score);
    if (num >= 7.5) return { bg: 'bg-red-50/70', border: 'border-red-100', text: 'text-red-600', fill: 'bg-red-500' };
    if (num >= 4.5) return { bg: 'bg-amber-50/70', border: 'border-amber-100', text: 'text-amber-600', fill: 'bg-amber-500' };
    return { bg: 'bg-sky-50/70', border: 'border-sky-100', text: 'text-sky-600', fill: 'bg-sky-500' };
  };

  const colors = getSeverityColor(severityScore);

  // If collapsed, render as a compact history card
  if (isCollapsed) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50/50 border border-slate-100/60 shadow-sm"
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-9 h-9 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center font-black text-xs border ${colors.border}`}>
            {severityScore}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primaryText capitalize">{damageType}</span>
              <span className="text-[10px] font-black bg-slate-100 text-secondaryText px-2 py-0.5 rounded-full uppercase tracking-wider">{id}</span>
            </div>
            <p className="text-[11px] text-secondaryText truncate max-w-[200px] md:max-w-[400px] font-semibold mt-0.5">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-secondaryText font-bold">{riskLevel} Risk</span>
          <ChevronRight className="w-4 h-4 text-mutedText" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-[32px] bg-white border border-slate-150 shadow-md shadow-slate-100/40 p-6 md:p-8 flex flex-col gap-6.5 relative overflow-hidden"
    >
      {/* Top Banner with ID and Sparkle */}
      <div className="flex items-center justify-between pb-4.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-dark" />
          <span className="text-[13px] font-semibold text-slate-655 tracking-wide">INFRASTRUCTURE ASSESSMENT • {id}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-bold text-brand-dark bg-brand-light/10 border border-brand-light/20 px-3 py-1.5 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI ANALYZED</span>
        </div>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Severity & Confidence Display (4 cols) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          {/* Severity Metric Card */}
          <div className={`flex-1 rounded-2xl ${colors.bg} border ${colors.border} p-6 flex flex-col justify-between items-center text-center relative group overflow-hidden`}>
            <span className="text-[13px] font-bold text-slate-600 uppercase tracking-widest mb-3">SEVERITY SCORE</span>
            
            <div className="my-3 relative flex items-center justify-center">
              <span className="text-7xl font-extrabold tracking-tighter text-slate-900">{severityScore}</span>
              <span className="text-[13px] text-slate-500 font-bold ml-1.5 align-bottom">/10</span>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-200/50 h-2.5 rounded-full overflow-hidden mt-4">
              <div 
                className={`h-full ${colors.fill} rounded-full`}
                style={{ width: `${parseFloat(severityScore) * 10}%` }}
              />
            </div>
          </div>

          {/* Confidence Metric Card */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-brand-dark shadow-sm">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide leading-none mb-1.5">AI CONFIDENCE</span>
                <span className="text-xs font-bold text-primaryText">Reliability Score</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-dark">{confidenceScore}%</span>
          </div>
        </div>

        {/* Right Column: Structured Metadata Grid (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Damage Type Widget */}
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
              <div className="flex items-center gap-2.5 text-slate-550">
                <Layers className="w-4 h-4" />
                <span className="text-[13px] font-semibold uppercase tracking-wider">DAMAGE TYPE</span>
              </div>
              <span className="text-[16px] font-bold text-slate-900 capitalize">{damageType}</span>
            </div>

            {/* Risk Level Widget */}
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
              <div className="flex items-center gap-2.5 text-slate-550">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[13px] font-semibold uppercase tracking-wider">RISK LEVEL</span>
              </div>
              <span className={`text-[16px] font-bold capitalize ${
                riskLevel.toLowerCase() === 'critical' || riskLevel.toLowerCase() === 'high' ? 'text-red-600' : 
                riskLevel.toLowerCase() === 'medium' ? 'text-amber-500' : 'text-sky-600'
              }`}>{riskLevel}</span>
            </div>
          </div>

          {/* Location Widget */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-slate-550">
              <MapPin className="w-4 h-4" />
              <span className="text-[13px] font-semibold uppercase tracking-wider">RESOLVED LOCATION</span>
            </div>
            <span className="text-[16px] font-bold text-slate-900">{location}</span>
          </div>

          {/* Recommended Action Widget */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-slate-550">
              <Wrench className="w-4 h-4" />
              <span className="text-[13px] font-semibold uppercase tracking-wider">RECOMMENDED ACTION</span>
            </div>
            <span className="text-[15px] font-medium text-slate-800 leading-relaxed">{recommendedAction}</span>
          </div>

          {/* Authority Information Widget */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-slate-550">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[13px] font-semibold uppercase tracking-wider">CIVIC AUTHORITY ASSIGNED</span>
            </div>
            <span className="text-[15px] font-bold text-brand-dark leading-none">{authority}</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
