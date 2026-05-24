import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Building2, ShieldCheck, Clock, TrendingUp, AlertCircle, FileCheck, CheckCircle2, Award
} from 'lucide-react';
import './Authorities.css';

const authoritiesData = [
  { name: 'Roads & Bridges Dept', active: 42, resolved: 315, response: '4.2 hrs', score: 92, status: 'excellent' },
  { name: 'Storm Water Drainage', active: 68, resolved: 142, response: '12.5 hrs', score: 76, status: 'warning' },
  { name: 'Traffic Police', active: 15, resolved: 890, response: '1.5 hrs', score: 98, status: 'excellent' },
  { name: 'Streetlights & Electrical', active: 24, resolved: 456, response: '6.0 hrs', score: 85, status: 'good' },
];

const analyticsData = [
  { name: 'Jan', avgTime: 14, performance: 65, satisfaction: 70 },
  { name: 'Feb', avgTime: 12, performance: 72, satisfaction: 75 },
  { name: 'Mar', avgTime: 15, performance: 68, satisfaction: 65 },
  { name: 'Apr', avgTime: 10, performance: 82, satisfaction: 80 },
  { name: 'May', avgTime: 8, performance: 88, satisfaction: 85 },
  { name: 'Jun', avgTime: 5, performance: 95, satisfaction: 92 },
];

const activityFeed = [
  { title: 'Inspection Completed', dept: 'Storm Water Drainage', desc: 'Officer Ramesh verified the drainage issue at T Nagar.', time: '10 mins ago', icon: ShieldCheck, color: 'text-blue' },
  { title: 'Complaint Assigned', dept: 'Roads & Bridges Dept', desc: 'New pothole complaint C-8291 assigned to South Zone team.', time: '45 mins ago', icon: AlertCircle, color: 'text-orange' },
  { title: 'Work Approved', dept: 'Streetlights & Electrical', desc: 'Tender for OMR streetlights approved by Chief Engineer.', time: '2 hours ago', icon: FileCheck, color: 'text-secondary' },
  { title: 'Repair Verified', dept: 'Roads & Bridges Dept', desc: 'Patchwork at Mount Road verified and closed.', time: '4 hours ago', icon: CheckCircle2, color: 'text-green' },
];

const rankingData = [
  { rank: 1, zone: 'Chennai South Zone', score: 96 },
  { rank: 2, zone: 'Chennai Central Zone', score: 91 },
  { rank: 3, zone: 'Chennai North Zone', score: 84 },
  { rank: 4, zone: 'Tambaram Zone', score: 78 },
  { rank: 5, zone: 'Velachery Zone', score: 72 },
];

export const Authorities: React.FC = () => {
  return (
    <div className="authorities-page animate-fade-in">
      <div className="page-header">
        <h2 className="page-section-title">Authorities</h2>
        <p className="page-section-subtitle">Monitor department performance and response efficiency.</p>
      </div>

      {/* Authority Cards Grid */}
      <div className="authorities-grid">
        {authoritiesData.map((auth, idx) => (
          <div key={idx} className="auth-card glass-panel border-t-4" style={{borderTopColor: auth.status === 'excellent' ? '#10b981' : auth.status === 'good' ? '#3b82f6' : '#f59e0b'}}>
            <div className="flex align-center gap-3 mb-4">
              <div className="auth-icon-bg bg-gray-100 p-2 rounded-lg">
                <Building2 size={20} className="text-secondary" />
              </div>
              <h3 className="font-semibold text-base">{auth.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-secondary">Active Cases</div>
                <div className="text-xl font-bold">{auth.active}</div>
              </div>
              <div>
                <div className="text-xs text-secondary">Resolved</div>
                <div className="text-xl font-bold text-green">{auth.resolved}</div>
              </div>
            </div>
            
            <div className="flex justify-between align-center pt-3 border-t">
              <div className="flex align-center gap-1">
                <Clock size={14} className="text-secondary" />
                <span className="text-sm font-medium">{auth.response}</span>
              </div>
              <div className="flex align-center gap-1">
                <TrendingUp size={14} className={auth.status === 'excellent' ? 'text-green' : auth.status === 'good' ? 'text-blue' : 'text-orange'} />
                <span className="text-sm font-bold">Score: {auth.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="authorities-layout mt-6">
        
        {/* Main Column - Analytics Chart */}
        <div className="main-column">
          <div className="glass-panel p-6 h-full min-h-[400px]">
            <h3 className="font-semibold text-lg mb-6">Response Analytics</h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: 'var(--glass-shadow)'}} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="performance" name="Monthly Performance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPerf)" />
                <Area type="monotone" dataKey="satisfaction" name="Citizen Satisfaction" stroke="#10b981" fillOpacity={1} fill="url(#colorSat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Column - Ranking & Activity */}
        <div className="side-column flex-col gap-6">
          
          <div className="glass-panel p-6">
            <h3 className="font-semibold text-lg mb-4 flex align-center gap-2">
              <Award size={18} className="text-orange" /> Department Ranking
            </h3>
            <div className="ranking-list">
              {rankingData.map((rank, idx) => (
                <div key={idx} className="flex justify-between align-center p-3 rounded-lg border mb-2 last:mb-0" style={{backgroundColor: idx === 0 ? '#fffbeb' : idx === 1 ? '#f8fafc' : '#ffffff', borderColor: idx === 0 ? '#fde68a' : '#e2e8f0'}}>
                  <div className="flex align-center gap-3">
                    <div className={`font-bold text-lg w-6 text-center ${idx === 0 ? 'text-orange' : 'text-secondary'}`}>
                      #{rank.rank}
                    </div>
                    <div className="font-medium text-sm">{rank.zone}</div>
                  </div>
                  <div className="font-bold text-sm bg-gray-100 px-2 py-1 rounded">
                    {rank.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-semibold text-lg mb-4">Officer Activity Feed</h3>
            <div className="activity-feed">
              {activityFeed.map((act, idx) => (
                <div key={idx} className="activity-item flex gap-4 mb-5 last:mb-0">
                  <div className={`activity-icon-sm ${act.color} bg-gray-50 border`}>
                    <act.icon size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{act.title}</div>
                    <div className="text-xs text-blue font-medium mt-1">{act.dept}</div>
                    <div className="text-xs text-secondary mt-1">{act.desc}</div>
                    <div className="text-xs text-gray-400 mt-2">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
