import React from 'react';
import { 
  FileText, Search, Filter, AlertTriangle, CheckCircle2, Clock, UserCheck
} from 'lucide-react';
import './Complaints.css';

const statsData = [
  { title: 'New Reports Today', value: '45', icon: FileText, color: 'text-blue', bg: 'bg-blue-light' },
  { title: 'Under Review', value: '112', icon: Clock, color: 'text-orange', bg: 'bg-orange-light' },
  { title: 'Resolved Today', value: '28', icon: CheckCircle2, color: 'text-green', bg: 'bg-green-light' },
  { title: 'Escalated Cases', value: '14', icon: AlertTriangle, color: 'text-red', bg: 'bg-red-light' },
];

const complaintsData = [
  { id: 'C-8291', road: 'OMR Main Road', location: 'Perungudi Toll', category: 'Pothole', severity: 'critical', status: 'Pending', date: 'Oct 14, 10:30 AM' },
  { id: 'C-8290', road: 'Anna Salai', location: 'Gemini Flyover', category: 'Drainage', severity: 'moderate', status: 'Under Review', date: 'Oct 14, 09:15 AM' },
  { id: 'C-8289', road: 'Velachery Bypass', location: 'Phoenix Mall', category: 'Streetlight', severity: 'minor', status: 'Resolved', date: 'Oct 13, 08:45 PM' },
  { id: 'C-8288', road: 'GST Road', location: 'Tambaram Sanatorium', category: 'Road Collapse', severity: 'critical', status: 'Escalated', date: 'Oct 13, 04:20 PM' },
  { id: 'C-8287', road: 'Poonamallee High Road', location: 'Koyambedu', category: 'Surface Damage', severity: 'moderate', status: 'In Progress', date: 'Oct 13, 02:10 PM' },
  { id: 'C-8286', road: 'Mount Road', location: 'Spencers Plaza', category: 'Pothole', severity: 'minor', status: 'Resolved', date: 'Oct 13, 11:05 AM' },
  { id: 'C-8285', road: 'ECR', location: 'Kottivakkam', category: 'Water Logging', severity: 'moderate', status: 'Pending', date: 'Oct 13, 09:30 AM' },
];

const activityData = [
  { action: 'Engineer Assigned', detail: 'Raja assigned to C-8291', time: '10 mins ago', icon: UserCheck, color: 'text-blue' },
  { action: 'Repair Started', detail: 'Work initiated for C-8287', time: '1 hour ago', icon: Clock, color: 'text-orange' },
  { action: 'Issue Resolved', detail: 'C-8289 marked as complete', time: '2 hours ago', icon: CheckCircle2, color: 'text-green' },
  { action: 'Complaint Verified', detail: 'C-8290 verified by system', time: '3 hours ago', icon: FileText, color: 'text-secondary' },
  { action: 'Escalation Alert', detail: 'C-8288 escalated to Dept Head', time: '5 hours ago', icon: AlertTriangle, color: 'text-red' },
];

export const Complaints: React.FC = () => {
  return (
    <div className="complaints-page animate-fade-in">
      <div className="page-header flex justify-between align-end">
        <div>
          <h2 className="page-section-title">Recent Complaints</h2>
          <p className="page-section-subtitle">Latest reports submitted by citizens.</p>
        </div>
        
        {/* Filters Top Right */}
        <div className="filters-bar flex gap-3">
          <div className="search-box relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search ID or Location..." className="input-search" />
          </div>
          <select className="filter-select">
            <option>All Zones</option>
            <option>South</option>
            <option>Central</option>
            <option>North</option>
          </select>
          <select className="filter-select">
            <option>All Severities</option>
            <option>Critical</option>
            <option>Moderate</option>
            <option>Minor</option>
          </select>
          <button className="btn btn-outline flex align-center gap-2">
            <Filter size={16} /> More
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statsData.map((stat, idx) => (
          <div key={idx} className="stat-card glass-panel flex align-center gap-4">
            <div className={`stat-icon-wrapper ${stat.bg}`}>
              <stat.icon size={28} className={stat.color} />
            </div>
            <div>
              <div className="text-secondary text-sm font-medium">{stat.title}</div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="complaints-layout mt-6">
        
        {/* Main Column - Complaints Feed */}
        <div className="main-column">
          <div className="glass-panel p-0 overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Road & Location</th>
                  <th>Category</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {complaintsData.map((comp, idx) => (
                  <tr key={idx} className="cursor-pointer">
                    <td className="font-semibold text-blue">{comp.id}</td>
                    <td>
                      <div className="font-medium">{comp.road}</div>
                      <div className="text-xs text-secondary">{comp.location}</div>
                    </td>
                    <td>{comp.category}</td>
                    <td>
                      <span className={`badge ${
                        comp.severity === 'critical' ? 'bg-red-light text-red' : 
                        comp.severity === 'moderate' ? 'bg-orange-light text-orange' : 
                        'bg-green-light text-green'
                      }`}>
                        {comp.severity}
                      </span>
                    </td>
                    <td>
                      <span className={`status-dot ${comp.status.replace(' ', '-').toLowerCase()}`}></span>
                      <span className="text-sm font-medium ml-2">{comp.status}</span>
                    </td>
                    <td className="text-sm text-secondary">{comp.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="pagination p-4 border-t flex justify-between align-center">
              <span className="text-sm text-secondary">Showing 1 to 7 of 142 entries</span>
              <div className="flex gap-2">
                <button className="btn btn-outline text-sm py-1 px-3">Prev</button>
                <button className="btn btn-primary text-sm py-1 px-3">1</button>
                <button className="btn btn-outline text-sm py-1 px-3">2</button>
                <button className="btn btn-outline text-sm py-1 px-3">3</button>
                <button className="btn btn-outline text-sm py-1 px-3">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Column - Recent Activity */}
        <div className="side-column">
          <div className="glass-panel p-6 h-full">
            <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>
            <div className="activity-feed">
              {activityData.map((act, idx) => (
                <div key={idx} className="activity-item flex gap-4 mb-6 last:mb-0">
                  <div className={`activity-icon-sm ${act.color} bg-gray-50 border`}>
                    <act.icon size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{act.action}</div>
                    <div className="text-xs text-secondary mt-1">{act.detail}</div>
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
