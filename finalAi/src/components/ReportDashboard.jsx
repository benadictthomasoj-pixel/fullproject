import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Wrench, 
  ShieldAlert, 
  Gauge, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function ReportDashboard({ data, isCollapsed }) {
  if (!data) return null;

  const { 
    id, 
    severityScore, 
    damageType, 
    riskLevel, 
    location, 
    recommendedAction, 
    authority, 
    confidenceScore,
    timestamp 
  } = data;

  const formattedDate = new Date(timestamp).toLocaleString();

  // Color Coding helper
  const getSeverityBadgeClass = (score) => {
    const s = parseFloat(score);
    if (s >= 7.5) return 'bg-red-500/10 text-red-500 border border-red-500/20';
    if (s >= 4.5) return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    return 'bg-sky-500/10 text-brand-dark border border-brand-dark/20';
  };

  const getRiskClass = (level) => {
    const l = (level || '').toLowerCase();
    if (l === 'critical' || l === 'high') return 'text-red-500';
    if (l === 'medium') return 'text-amber-500';
    return 'text-sky-500';
  };

  if (isCollapsed) {
    return (
      <div className="w-full p-5 rounded-2xl bg-slate-50/50 border border-slate-100/50 flex items-center justify-between text-xs text-secondaryText font-bold">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4.5 h-4.5 text-secondaryText" />
          <span className="font-black text-primaryText uppercase tracking-wider">{id}</span>
          <span>• Full Intelligence Briefing minimized</span>
        </div>
        <span>{formattedDate}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-[32px] bg-white border border-slate-150 shadow-xl shadow-slate-100/30 p-6 md:p-8 flex flex-col gap-6.5 relative overflow-hidden"
    >
      {/* Decorative top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-light via-brand-dark to-indigo-500" />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5.5 border-b border-slate-100">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-white bg-slate-900 px-3 py-1.5 rounded-md tracking-wider uppercase">{id}</span>
            <span className="text-[13px] text-slate-600 font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-mutedText" />
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-5 h-5 text-brand-dark" />
            <h3 className="text-[28px] md:text-[34px] font-extrabold text-primaryText tracking-tight leading-tight">{location}</h3>
          </div>
        </div>

        {/* Header Quick Stats */}
        <div className="flex flex-wrap gap-2.5">
          <span className={`text-[13px] font-bold px-4 py-2.5 rounded-full uppercase tracking-wider ${getSeverityBadgeClass(severityScore)}`}>
            Severity: {severityScore}/10
          </span>
          <span className="text-[13px] font-bold bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-brand-dark" />
            Confidence: {confidenceScore}%
          </span>
          <span className={`text-[13px] font-bold bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${getRiskClass(riskLevel)}`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            {riskLevel} Risk
          </span>
        </div>
      </div>

      {/* 2-COLUMN MAIN BODY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Analysis Details */}
        <div className="flex flex-col gap-5">
          <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col gap-4.5">
            <div className="flex items-center gap-2.5 text-slate-800 border-b border-slate-100 pb-3 mb-2">
              <Activity className="w-5 h-5 text-brand-dark" />
              <h4 className="text-[22px] font-bold text-primaryText tracking-tight">AI Diagnostics & Surface Profile</h4>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">DAMAGE CLASSIFICATION</span>
                <span className="text-[15px] font-bold text-slate-900 capitalize mt-1">{damageType}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">SURFACE INTEGRITY</span>
                <span className="text-[15px] font-bold text-slate-900 mt-1">
                  {parseFloat(severityScore) > 7.5 ? 'Critical Failure' : parseFloat(severityScore) > 4.5 ? 'Structural Wear' : 'Minor Deterioration'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">SEVERITY RATING</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-base font-bold text-slate-900">{severityScore}</span>
                  <span className="text-[11px] text-slate-500 font-semibold">/10</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">DISPATCH PRIORITY</span>
                <span className={`text-[15px] font-bold mt-1 ${getRiskClass(riskLevel)}`}>{riskLevel}</span>
              </div>
            </div>

            <div className="flex flex-col pt-4 border-t border-slate-100">
              <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">CIVIC BRIEFING SUMMARY</span>
              <p className="text-[15px] md:text-[16px] text-slate-700 leading-[1.8] mt-2.5 font-normal">
                RoadLens AI detected {damageType} with an index rating of {severityScore}. Conditions present hazards for transit vehicles, requiring immediate civic mitigation nodes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Authority Mappings */}
        <div className="flex flex-col gap-5">
          {/* Recommended Action Card */}
          <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-slate-800 border-b border-slate-100 pb-3 mb-2">
              <Wrench className="w-5 h-5 text-brand-dark" />
              <h4 className="text-[22px] font-bold text-primaryText tracking-tight">Recommended Remediation Actions</h4>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[13px] font-semibold">
                <span className="text-slate-500 font-medium">SUGGESTED REPAIR:</span>
                <span className="font-bold text-slate-900">{recommendedAction}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-semibold">
                <span className="text-slate-500 font-medium">URGENCY METRIC:</span>
                <span className={`font-bold ${getRiskClass(riskLevel)}`}>
                  {parseFloat(severityScore) > 7.5 ? 'Urgent / Immediate Intervention' : 'Scheduled Maintenance'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-semibold">
                <span className="text-slate-500 font-medium">ESTIMATED RESPONSE SLA:</span>
                <span className="font-bold text-slate-900">
                  {parseFloat(severityScore) > 7.5 ? '24 Hours' : parseFloat(severityScore) > 4.5 ? '72 Hours' : '5 Days'}
                </span>
              </div>
            </div>
          </div>

          {/* Authority Mappings Card */}
          <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-slate-800 border-b border-slate-100 pb-3 mb-2">
              <ShieldAlert className="w-5 h-5 text-brand-dark" />
              <h4 className="text-[22px] font-bold text-primaryText tracking-tight">Governmental Authority Dispatch</h4>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[13px] font-semibold">
                <span className="text-slate-500 font-medium">ASSIGNED DEPT:</span>
                <span className="font-bold text-brand-dark text-right truncate max-w-[200px]">{authority}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-semibold">
                <span className="text-slate-500 font-medium">DISPATCH NODE:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-semibold">
                <span className="text-slate-500 font-medium">ESCALATION STATUS:</span>
                <span className="font-bold text-slate-900">
                  {parseFloat(severityScore) > 7.5 ? 'Tier-1 Emergency' : 'Standard Queue'}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
