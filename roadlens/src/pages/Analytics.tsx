import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  BarChart3, TrendingUp, AlertTriangle, Clock, Zap, MapPin, FastForward, Calculator
} from 'lucide-react';
import './Analytics.css';

const kpiData = [
  { title: 'Total Complaints', value: '8,420', trend: '+12%', icon: BarChart3, color: 'text-blue', bg: 'bg-blue-light' },
  { title: 'Resolution Rate', value: '78.5%', trend: '+4%', icon: TrendingUp, color: 'text-green', bg: 'bg-green-light' },
  { title: 'Critical Issues', value: '412', trend: '-8%', icon: AlertTriangle, color: 'text-red', bg: 'bg-red-light' },
  { title: 'Avg Repair Time', value: '2.4 days', trend: '-15%', icon: Clock, color: 'text-orange', bg: 'bg-orange-light' },
];

const trendData = [
  { month: 'Jan', complaints: 640 },
  { month: 'Feb', complaints: 710 },
  { month: 'Mar', complaints: 680 },
  { month: 'Apr', complaints: 850 },
  { month: 'May', complaints: 920 },
  { month: 'Jun', complaints: 880 },
  { month: 'Jul', complaints: 1100 },
];

const resolutionData = [
  { month: 'Jan', resolved: 500, pending: 140 },
  { month: 'Feb', resolved: 600, pending: 110 },
  { month: 'Mar', resolved: 550, pending: 130 },
  { month: 'Apr', resolved: 700, pending: 150 },
  { month: 'May', resolved: 850, pending: 70 },
  { month: 'Jun', resolved: 800, pending: 80 },
  { month: 'Jul', resolved: 950, pending: 150 },
];

const categoryData = [
  { name: 'Potholes', value: 45 },
  { name: 'Drainage', value: 25 },
  { name: 'Surface Damage', value: 15 },
  { name: 'Cracks', value: 10 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const heatmapData = [
  { zone: 'Chennai South', density: 95 },
  { zone: 'Chennai Central', density: 80 },
  { zone: 'Chennai North', density: 65 },
  { zone: 'Tambaram', density: 50 },
  { zone: 'Velachery', density: 40 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="analytics-page animate-fade-in">
      <div className="page-header">
        <h2 className="page-section-title">Analytics</h2>
        <p className="page-section-subtitle">Analyze city-wide road issue trends and infrastructure performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="kpi-card glass-panel flex justify-between align-center">
            <div className="flex align-center gap-4">
              <div className={`kpi-icon-wrapper ${kpi.bg}`}>
                <kpi.icon size={28} className={kpi.color} />
              </div>
              <div>
                <div className="text-secondary text-sm font-medium">{kpi.title}</div>
                <div className="text-2xl font-bold mt-1">{kpi.value}</div>
              </div>
            </div>
            <div className={`font-semibold text-sm ${kpi.trend.startsWith('+') && kpi.title !== 'Critical Issues' ? 'text-green' : kpi.trend.startsWith('-') && kpi.title !== 'Resolution Rate' ? 'text-green' : 'text-red'}`}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-layout mt-6">
        
        {/* Main Column - Large Charts */}
        <div className="main-column flex-col gap-6">
          
          <div className="glass-panel p-6 h-80">
            <h3 className="font-semibold text-lg mb-6">Complaints Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: 'var(--glass-shadow)'}} />
                <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: 'white'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-panel p-6 h-80">
            <h3 className="font-semibold text-lg mb-6">Resolution Performance</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolutionData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: 'var(--glass-shadow)'}} />
                <Legend wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="resolved" name="Resolved" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="pending" name="Pending" stackId="a" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Side Column - Donut, Heatmap, AI Insights */}
        <div className="side-column flex-col gap-6">
          
          <div className="glass-panel p-6">
            <h3 className="font-semibold text-lg mb-2">Issue Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: 'var(--glass-shadow)'}} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-semibold text-lg mb-4">Zone Complaint Heatmap</h3>
            <div className="heatmap-list">
              {heatmapData.map((data, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{data.zone}</span>
                    <span>{data.density} density</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: data.density + '%',
                        background: 'linear-gradient(90deg, #fcd34d 0%, #ef4444 ' + data.density + '%)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <h3 className="font-semibold text-lg mb-4 flex align-center gap-2 text-indigo-800">
              <Zap size={20} className="text-orange" /> AI Insights
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 align-start">
                <MapPin size={16} className="text-red mt-1 flex-shrink-0" />
                <span className="text-sm"><strong>Most affected zone:</strong> Chennai South is experiencing a 15% surge in pothole reports post-monsoon.</span>
              </li>
              <li className="flex gap-3 align-start">
                <TrendingUp size={16} className="text-orange mt-1 flex-shrink-0" />
                <span className="text-sm"><strong>Highest growth area:</strong> OMR corridor reports increased by 22% this week.</span>
              </li>
              <li className="flex gap-3 align-start">
                <FastForward size={16} className="text-green mt-1 flex-shrink-0" />
                <span className="text-sm"><strong>Fastest response:</strong> Traffic Police resolving minor issues in 1.5 hrs average.</span>
              </li>
              <li className="flex gap-3 align-start">
                <Calculator size={16} className="text-blue mt-1 flex-shrink-0" />
                <span className="text-sm"><strong>Estimation:</strong> Expect ~1,200 complaints next month based on historical rain patterns.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
