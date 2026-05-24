import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';

const authorities = [
  {
    name: 'Coimbatore Municipal Corporation (CMC)',
    jurisdiction: 'Coimbatore Municipal Area & Suburbs',
    responseRate: '94%',
    dispatchTime: '2.1 Hours',
    phone: '+91 422 230 0201',
    email: 'commissioner@coimbatorecorp.gov.in',
    status: 'Operational'
  },
  {
    name: 'Greater Chennai Corporation (GCC)',
    jurisdiction: 'Chennai Metropolitan & Extended Zones',
    responseRate: '91%',
    dispatchTime: '2.5 Hours',
    phone: '+91 44 2530 3824',
    email: 'commissioner@chennaicorporation.gov.in',
    status: 'Operational'
  },
  {
    name: 'Tamil Nadu Highways Department',
    jurisdiction: 'State & National Highways (TN Zone)',
    responseRate: '88%',
    dispatchTime: '3.8 Hours',
    phone: '+91 44 2235 1010',
    email: 'ce.highways@tn.gov.in',
    status: 'Operational'
  }
];

export default function AuthoritiesTab() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 md:px-16 custom-scrollbar">
      <div className="max-w-[900px] mx-auto pb-24">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <span className="text-[13px] text-brand-dark font-semibold tracking-wider leading-none mb-1.5">CIVIC AUTHORITIES</span>
          <h3 className="text-[24px] md:text-[28px] font-bold text-primaryText tracking-tight mb-1">Municipal Authority Directory</h3>
          <p className="text-[15px] text-slate-655 leading-relaxed font-normal">Integrate directly with local municipal bodies and track automated report transmissions.</p>
        </div>

        {/* Directory List */}
        <div className="flex flex-col gap-6">
          {authorities.map((auth, idx) => (
            <div key={idx} className="w-full rounded-[28px] bg-white border border-slate-100/80 shadow-sm p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Left Side Info */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[13px] text-emerald-700 font-semibold uppercase tracking-wider">{auth.status}</span>
                </div>
                <div>
                  <h4 className="text-[22px] font-bold text-primaryText tracking-tight mb-1">{auth.name}</h4>
                  <div className="flex items-center gap-1.5 text-[14px] text-slate-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-mutedText" />
                    <span>{auth.jurisdiction}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-3.5 pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[14px] text-slate-600 font-medium">
                    <Phone className="w-3.5 h-3.5 text-mutedText" />
                    <span>{auth.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-slate-600 font-medium">
                    <Mail className="w-3.5 h-3.5 text-mutedText animate-pulse" />
                    <span>{auth.email}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Stats */}
              <div className="flex items-center gap-4 bg-slate-50/50 border border-slate-100/80 p-5.5 rounded-2xl md:min-w-[200px]">
                <div className="flex-1 flex flex-col items-center text-center px-3 border-r border-slate-200/50">
                  <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Response</span>
                  <div className="flex items-center gap-1 text-emerald-750 font-bold text-[15px]">
                    <Award className="w-3.5 h-3.5" />
                    <span>{auth.responseRate}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center text-center px-3">
                  <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">SLA Delay</span>
                  <div className="flex items-center gap-1 text-brand-dark font-bold text-[15px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{auth.dispatchTime}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
