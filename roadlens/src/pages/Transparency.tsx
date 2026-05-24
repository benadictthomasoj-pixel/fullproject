import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Briefcase, DollarSign, PieChart, Activity, CheckCircle2, Clock, AlertCircle, FileText
} from 'lucide-react';
import './Transparency.css';

const kpiData = [
  { title: 'Total Projects', value: '142', icon: Briefcase, color: 'text-blue', bg: 'bg-blue-light' },
  { title: 'Budget Allocated', value: '₹450 Cr', icon: DollarSign, color: 'text-green', bg: 'bg-green-light' },
  { title: 'Budget Utilized', value: '₹280 Cr', icon: PieChart, color: 'text-orange', bg: 'bg-orange-light' },
  { title: 'Completion Rate', value: '64%', icon: Activity, color: 'text-red', bg: 'bg-red-light' },
];

const projectsData = [
  { id: 'PRJ-2026-01', name: 'OMR Phase 2 Resurfacing', zone: 'South', budget: '₹12.5 Cr', contractor: 'L&T Infra', progress: 85, status: 'On Track' },
  { id: 'PRJ-2026-02', name: 'Anna Salai Drainage Upgrade', zone: 'Central', budget: '₹28.0 Cr', contractor: 'Raja Builders', progress: 40, status: 'Delayed' },
  { id: 'PRJ-2026-03', name: 'Velachery Bypass Patchwork', zone: 'South', budget: '₹3.2 Cr', contractor: 'City Works Dept', progress: 95, status: 'Completing' },
  { id: 'PRJ-2026-04', name: 'GST Road Expansion', zone: 'South', budget: '₹145 Cr', contractor: 'GMR Group', progress: 20, status: 'On Track' },
  { id: 'PRJ-2026-05', name: 'T Nagar Smart Streets', zone: 'Central', budget: '₹45.0 Cr', contractor: 'SmartCity Corp', progress: 60, status: 'On Track' },
];

const budgetData = [
  { name: 'Q1', allocated: 100, used: 85, remaining: 15 },
  { name: 'Q2', allocated: 120, used: 110, remaining: 10 },
  { name: 'Q3', allocated: 110, used: 60, remaining: 50 },
  { name: 'Q4', allocated: 120, used: 25, remaining: 95 },
];

const timelineUpdates = [
  { title: 'Road Repaired', desc: 'Mount road stretch resurfacing completed ahead of schedule.', time: '2 hours ago', icon: CheckCircle2, color: 'text-green' },
  { title: 'Tender Approved', desc: 'New drainage system tender approved for Perungudi zone.', time: '5 hours ago', icon: FileText, color: 'text-blue' },
  { title: 'Inspection Completed', desc: 'Quality check passed for Anna Nagar smart road.', time: '1 day ago', icon: AlertCircle, color: 'text-orange' },
  { title: 'Work Started', desc: 'Pothole filling initiated on ECR.', time: '2 days ago', icon: Clock, color: 'text-secondary' },
];

export const Transparency: React.FC = () => {
  return (
    <div className="transparency-page animate-fade-in">
      <div className="page-header">
        <h2 className="page-section-title">Transparency Dashboard</h2>
        <p className="page-section-subtitle">Track road repair projects, budgets, and completion status.</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="kpi-card glass-panel flex align-center gap-4">
            <div className={`kpi-icon-wrapper ${kpi.bg}`}>
              <kpi.icon size={28} className={kpi.color} />
            </div>
            <div>
              <div className="text-secondary text-sm font-medium">{kpi.title}</div>
              <div className="text-2xl font-bold mt-1">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="transparency-layout">
        
        {/* Main Column - Table and Chart */}
        <div className="main-column flex-col gap-6">
          
          {/* Active Projects Table */}
          <div className="glass-panel p-6">
            <div className="flex justify-between align-center mb-6">
              <h3 className="font-semibold text-lg">Active Projects</h3>
              <button className="btn btn-outline text-sm py-1 px-3">View All</button>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Zone</th>
                    <th>Budget</th>
                    <th>Contractor</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((project, idx) => (
                    <tr key={idx}>
                      <td className="font-medium">{project.name}</td>
                      <td>{project.zone}</td>
                      <td className="font-medium text-green">{project.budget}</td>
                      <td>{project.contractor}</td>
                      <td className="w-48">
                        <div className="flex align-center gap-2">
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${project.progress > 80 ? 'bg-green' : project.progress < 50 ? 'bg-red' : 'bg-blue'}`} 
                              style={{ width: project.progress + '%' }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{project.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${project.status === 'On Track' ? 'bg-green-light text-green' : project.status === 'Delayed' ? 'bg-red-light text-red' : 'bg-blue-light text-blue'}`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Budget Chart */}
          <div className="glass-panel p-6 h-80">
            <h3 className="font-semibold text-lg mb-6">Budget Utilization (in Cr)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="used" name="Used" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="remaining" name="Remaining" fill="#f8fafc" stroke="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Side Column - Timeline */}
        <div className="side-column">
          <div className="glass-panel p-6 h-full">
            <h3 className="font-semibold text-lg mb-6">Recent Public Updates</h3>
            <div className="timeline">
              {timelineUpdates.map((update, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-icon bg-white border shadow-sm">
                    <update.icon size={16} className={update.color} />
                  </div>
                  <div className="timeline-content">
                    <h4 className="font-semibold text-sm">{update.title}</h4>
                    <p className="text-xs text-secondary mt-1">{update.desc}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{update.time}</span>
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
