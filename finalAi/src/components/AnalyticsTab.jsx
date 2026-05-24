import React from 'react';
import { BarChart3, AlertTriangle, CheckCircle, TrendingUp, Landmark } from 'lucide-react';

export default function AnalyticsTab() {
  const stats = [
    { label: 'TOTAL SCANS', value: '142', change: '+12.4%', icon: BarChart3, color: 'text-brand-dark' },
    { label: 'AVG SEVERITY', value: '6.4/10', change: '-4.2%', icon: AlertTriangle, color: 'text-amber-500' },
    { label: 'RESOLVED DAMAGE', value: '52 Areas', change: '+24.1%', icon: CheckCircle, color: 'text-emerald-500' },
    { label: 'MUNICIPAL NODES', value: '18 Active', change: '100% Online', icon: Landmark, color: 'text-indigo-500' }
  ];

  const damageCategories = [
    { type: 'Potholes', count: 64, percent: 45, color: 'bg-red-500' },
    { type: 'Alligator Cracking', count: 35, percent: 25, color: 'bg-amber-500' },
    { type: 'Transverse Cracks', count: 21, percent: 15, color: 'bg-sky-500' },
    { type: 'Edge Breaks', count: 14, percent: 10, color: 'bg-indigo-500' },
    { type: 'Rutting & Others', count: 8, percent: 5, color: 'bg-slate-400' }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 md:px-16 custom-scrollbar">
      <div className="max-w-[900px] mx-auto pb-24">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <span className="text-[13px] text-brand-dark font-semibold tracking-wider leading-none mb-1.5">ANALYTICS HUB</span>
          <h3 className="text-[24px] md:text-[28px] font-bold text-primaryText tracking-tight mb-1">Regional Pavement Health Indexes</h3>
          <p className="text-[15px] text-slate-650 leading-relaxed font-normal">Real-time statistics of municipal road damage detection and authority response delays.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-5 rounded-[22px] bg-white border border-slate-100/80 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className={`w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <div>
                  <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">{stat.label}</span>
                  <span className="text-[20px] md:text-[24px] font-extrabold text-slate-900 tracking-tight">{stat.value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Damage Classification Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Damage Categories */}
          <div className="p-6 md:p-8 rounded-[28px] bg-white border border-slate-100/80 shadow-sm">
            <h4 className="text-[22px] font-bold text-primaryText tracking-tight mb-6">Damage Type Distribution</h4>
            <div className="space-y-4">
              {damageCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[14px] font-semibold">
                    <span className="text-slate-800">{cat.type}</span>
                    <span className="text-slate-600">{cat.count} scans ({cat.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency card */}
          <div className="p-6 md:p-8 rounded-[28px] bg-white border border-slate-100/80 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-[22px] font-bold text-primaryText tracking-tight mb-6">Repair Efficiency</h4>
              <p className="text-[14px] text-slate-655 leading-relaxed mb-6 font-normal">
                Evaluating the average response latency from initial AI transmission to on-site authority inspection and repair crews.
              </p>
              
              <div className="flex items-center gap-4.5 p-4.5 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-light/10 text-brand-dark flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[14px] font-semibold text-slate-900">Mean Dispatch Time</h5>
                  <p className="text-[13px] text-slate-600 mt-1 font-medium">Average dispatch ticket processing: <strong>2.4 Hours</strong></p>
                </div>
              </div>

              <div className="flex items-center gap-4.5 p-4.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[14px] font-semibold text-slate-900">SLA Resolution Rate</h5>
                  <p className="text-[13px] text-slate-600 mt-1 font-medium">Urgent hazards resolved under 24hrs: <strong>92.8%</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
