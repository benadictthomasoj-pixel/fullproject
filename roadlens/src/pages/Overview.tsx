import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, CheckCircle2, Clock, MapPin, 
  TrendingUp, TrendingDown, IndianRupee, Activity, 
  Building2, ArrowRight, ActivitySquare, AlertCircle
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import './Overview.css';

// --- Mock Data ---

const stats = [
  { title: 'Total Issues Reported', value: '2,845', trend: '+12.5%', trendUp: true, icon: AlertTriangle, color: 'blue' },
  { title: 'Active Complaints', value: '423', trend: '+5.2%', trendUp: true, icon: ActivitySquare, color: 'orange' },
  { title: 'Resolved Complaints', value: '2,104', trend: '+18.4%', trendUp: true, icon: CheckCircle2, color: 'green' },
  { title: 'Avg Resolution Time', value: '4.2 Days', trend: '-2.1%', trendUp: false, icon: Clock, color: 'purple' }
];

const monthlyTrendData = [
  { name: 'Jan', issues: 120, resolved: 90 },
  { name: 'Feb', issues: 150, resolved: 110 },
  { name: 'Mar', issues: 180, resolved: 140 },
  { name: 'Apr', issues: 220, resolved: 170 },
  { name: 'May', issues: 300, resolved: 220 },
  { name: 'Jun', issues: 250, resolved: 200 },
];

const recentUpdates = [
  { id: 'CMP-8492', road: 'Mount Road', area: 'Teynampet', type: 'Pothole', status: 'Pending', date: 'Today, 09:15 AM' },
  { id: 'CMP-8491', road: 'Arcot Road', area: 'Vadapalani', type: 'Water Logging', status: 'In Progress', date: 'Yesterday' },
  { id: 'CMP-8488', road: 'OMR', area: 'Sholinganallur', type: 'Streetlight', status: 'Resolved', date: '20 May' },
  { id: 'CMP-8485', road: '100 Feet Road', area: 'Ashok Nagar', type: 'Signboard', status: 'In Progress', date: '19 May' },
];

const priorityAreas = [
  { name: 'Anna Nagar', density: 85, color: 'critical' },
  { name: 'T Nagar', density: 72, color: 'critical' },
  { name: 'Velachery', density: 60, color: 'progress' },
  { name: 'Tambaram', density: 45, color: 'progress' },
  { name: 'OMR Corridor', density: 30, color: 'resolved' },
];

const authoritiesData = [
  { name: 'Greater Chennai Corporation', cases: 1245, resolved: '88%', color: 'blue' },
  { name: 'Highways Department', cases: 432, resolved: '75%', color: 'orange' },
  { name: 'Smart City Mission', cases: 120, resolved: '95%', color: 'green' },
  { name: 'Water Supply Board', cases: 856, resolved: '92%', color: 'purple' },
];

const issueDistributionData = [
  { name: 'Potholes', value: 45 },
  { name: 'Drainage', value: 25 },
  { name: 'Streetlights', value: 15 },
  { name: 'Road Damage', value: 10 },
  { name: 'Construction', value: 5 },
];
const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'];

const resolutionPerformanceData = [
  { name: 'Zone 1', within24h: 40, within72h: 35, over72h: 25 },
  { name: 'Zone 2', within24h: 30, within72h: 50, over72h: 20 },
  { name: 'Zone 3', within24h: 60, within72h: 30, over72h: 10 },
];

// --- Components ---

export const Overview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="saas-overview animate-fade-in">
      
      {/* 1. Hero Section */}
      <section className="hero-section" id="overview">
        <div className="hero-content">
          <span className="hero-badge">Smart City Platform</span>
          <h1 className="hero-title">
            <span className="title-highlight">AI Powered</span> Road Infrastructure Intelligence
          </h1>
          <p className="hero-subtitle">
            Monitor road conditions, track citizen complaints, analyze infrastructure performance and maintain public transparency across Chennai.
          </p>
          <div className="hero-actions" style={{ alignItems: 'center' }}>
            <button className="btn-secondary" onClick={() => navigate('/monitoring')}>Open Road Monitoring <ArrowRight size={16} className="ml-2"/></button>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="graphic-container">
            {/* Abstract Graphic representing roads and analytics */}
            <div className="abstract-map">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path d="M50 250 Q 150 150, 350 250" fill="none" stroke="var(--accent-blue)" strokeWidth="8" strokeLinecap="round" />
                <path d="M50 50 Q 200 150, 350 50" fill="none" stroke="var(--status-progress)" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 10"/>
                <circle cx="150" cy="150" r="12" fill="white" stroke="var(--accent-blue)" strokeWidth="4"/>
                <circle cx="350" cy="250" r="8" fill="var(--status-critical)"/>
                <circle cx="350" cy="50" r="8" fill="var(--status-resolved)"/>
              </svg>
            </div>
            <div className="floating-card c1 glass-card">
              <ActivitySquare size={20} className="text-blue mb-2"/>
              <div className="text-sm font-semibold">Live Tracking</div>
              <div className="text-xs text-secondary">Active nodes: 124</div>
            </div>
            <div className="floating-card c2 glass-card">
              <div className="flex align-center gap-2 mb-2">
                <div className="pulse-indicator"></div>
                <div className="text-sm font-semibold">System Optimal</div>
              </div>
              <div className="h-1 bg-gray-100 rounded overflow-hidden">
                <div className="h-full bg-green w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistics Overview */}
      <section className="stats-section">
        {stats.map((stat, index) => (
          <div key={index} className="saas-stat-card glass-card">
            <div className="stat-header">
              <div className={`stat-icon bg-${stat.color}-light text-${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <div className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
                {stat.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{stat.trend}</span>
              </div>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Main Dashboard Content */}
      <section className="main-content-split">
        <div className="chart-column glass-panel">
          <div className="section-header">
            <h3>Monthly Road Report Trends</h3>
            <button className="btn-icon"><AlertCircle size={18}/></button>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.5)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }}/>
                <Area type="monotone" dataKey="issues" name="Reported" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorIssues)" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="updates-column glass-panel">
          <div className="section-header">
            <h3>Recent Road Updates</h3>
            <a href="#" className="link-text">View All</a>
          </div>
          <div className="updates-list">
            {recentUpdates.map((update, idx) => (
              <div key={idx} className="update-item">
                <div className="update-icon">
                  <MapPin size={16} />
                </div>
                <div className="update-info">
                  <div className="flex justify-between align-start mb-1">
                    <h4 className="font-semibold">{update.road}</h4>
                    <span className={`badge ${update.status === 'Resolved' ? 'bg-green-light text-green' : update.status === 'Pending' ? 'bg-red-light text-red' : 'bg-orange-light text-orange'}`}>
                      {update.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-secondary">
                    <span>{update.type} • {update.area}</span>
                    <span>{update.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Transparency Overview Section */}
      <section className="transparency-section glass-panel" id="transparency">
        <div className="section-header mb-6">
          <div>
            <h2 className="section-title">Transparency Overview</h2>
            <p className="text-secondary text-sm">Public accountability and budget tracking</p>
          </div>
        </div>
        
        <div className="transparency-grid">
          <div className="transparency-card">
            <div className="flex align-center gap-3 mb-4">
              <div className="icon-box bg-blue-light text-blue"><IndianRupee size={20}/></div>
              <h3 className="font-semibold">Budget Allocation</h3>
            </div>
            <div className="text-3xl font-bold mb-1">₹ 450 Cr</div>
            <div className="text-sm text-secondary mb-4">Total budget for 2025-2026</div>
            <div className="progress-labels">
              <span className="text-sm font-semibold">Used: ₹ 285.5 Cr</span>
              <span className="text-sm text-secondary">63%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill bg-blue" style={{ width: '63%' }}></div>
            </div>
          </div>

          <div className="transparency-card">
            <div className="flex align-center gap-3 mb-4">
              <div className="icon-box bg-orange-light text-orange"><Activity size={20}/></div>
              <h3 className="font-semibold">Project Completion</h3>
            </div>
            <div className="flex align-center justify-between">
              <div className="circular-progress-container">
                <svg className="circular-progress" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle-fill text-orange" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text x="18" y="20.35" className="circle-text">75%</text>
                </svg>
              </div>
              <div className="project-stats">
                <div className="mb-2"><div className="text-sm font-semibold">124</div><div className="text-xs text-secondary">Completed</div></div>
                <div><div className="text-sm font-semibold">42</div><div className="text-xs text-secondary">Ongoing</div></div>
              </div>
            </div>
          </div>

          <div className="transparency-card flex-col justify-center">
             <div className="flex align-center gap-3 mb-4">
              <div className="icon-box bg-green-light text-green"><CheckCircle2 size={20}/></div>
              <h3 className="font-semibold">Accountability</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">84.5%</div>
                <div className="text-xs text-secondary">Resolution Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">3.2d</div>
                <div className="text-xs text-secondary">Avg Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. Priority Areas & Authorities */}
      <div className="split-section" id="authorities">
        
        <section className="priority-areas glass-panel">
          <div className="section-header mb-6">
            <h3 className="font-semibold text-lg">Priority Areas</h3>
            <p className="text-xs text-secondary">Top affected zones</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {priorityAreas.map((area, idx) => (
              <span key={idx} className={`badge border ${area.color === 'critical' ? 'border-red text-red bg-red-light' : area.color === 'progress' ? 'border-orange text-orange bg-orange-light' : 'border-green text-green bg-green-light'}`}>
                {area.color === 'critical' ? '🔴' : area.color === 'progress' ? '🟡' : '🟢'} {area.name}
              </span>
            ))}
          </div>
        </section>

        <section className="authorities-performance">
          <div className="section-header mb-4 px-2">
            <h3 className="font-semibold text-lg">Authorities Performance</h3>
          </div>
          <div className="authorities-grid">
            {authoritiesData.map((auth, idx) => (
              <div key={idx} className="auth-card glass-card">
                <div className="flex align-center gap-3 mb-3">
                  <div className={`icon-box-sm bg-${auth.color}-light text-${auth.color}`}>
                    <Building2 size={16} />
                  </div>
                  <h4 className="font-medium text-sm truncate">{auth.name}</h4>
                </div>
                <div className="flex justify-between align-end mt-auto">
                  <div>
                    <div className="text-xs text-secondary mb-1">Assigned / Rate</div>
                    <div className="font-semibold text-sm">{auth.cases} <span className="text-gray-300">|</span> <span className="text-green">{auth.resolved}</span></div>
                  </div>
                  <button className="text-xs text-blue hover-underline">Details</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 7. Analytics Snapshot */}
      <section className="analytics-snapshot glass-panel" id="analytics">
        <div className="section-header mb-6">
          <h2 className="section-title">Analytics Snapshot</h2>
        </div>
        <div className="analytics-charts-grid">
          
          <div className="snap-chart">
            <h4 className="text-sm font-semibold mb-4 text-center">Complaint Categories</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={issueDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                    {issueDistributionData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="snap-chart">
            <h4 className="text-sm font-semibold mb-4 text-center">Resolution Performance</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resolutionPerformanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.5)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'rgba(226, 232, 240, 0.2)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                  <Bar dataKey="within24h" name="< 24h" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={32} />
                  <Bar dataKey="within72h" name="24-72h" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="over72h" name="> 72h" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
