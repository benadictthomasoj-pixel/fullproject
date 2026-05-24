import React, { useState } from 'react';
import './Complaints.css';

export const Complaints: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  return (
    <div className="complaints-page animate-fade-in">
      
      {/* Top Metric Boxes */}
      <div className="top-boxes single-header">
        {/* Emergency Alerts - Now full width */}
        <div className="metric-card emergency-card full-width">
          <div className="metric-header">
            <div className="status-dot pulsing-red"></div>
            <span className="metric-title">Active Emergency Alerts</span>
          </div>
          <div className="metric-value">3 <span className="trend critical-subtle">Critical Action Required</span></div>
          <div className="metric-subtext">Flood Alert (1) • Accident Zone (1) • Pothole Hazard (1)</div>
        </div>
      </div>

      {/* Complaints List Area */}
      <div className="content-section">
        <div className="section-header">
          <h3>Complaints Directory</h3>
          <div className="dropdown-filters">
            <select id="statusFilter" className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">📋 All Statuses</option>
              <option value="pending">⏳ Pending (42)</option>
              <option value="ongoing">🚧 In Progress (18)</option>
              <option value="completed">✅ Completed (320)</option>
            </select>
            <select id="locationFilter" className="filter-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="all">📍 All Locations</option>
              <option value="adyar">Adyar</option>
              <option value="anna-nagar">Anna Nagar</option>
              <option value="guindy">Guindy</option>
              <option value="omr">OMR</option>
              <option value="t-nagar">T. Nagar</option>
              <option value="tambaram">Tambaram</option>
              <option value="thiruvanmiyur">Thiruvanmiyur</option>
              <option value="velachery">Velachery</option>
            </select>
            <select id="severityFilter" className="filter-select" value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
              <option value="all">⚠ All Severities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select id="dateFilter" className="filter-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">📅 All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <div className="complaints-list">
          {/* List Item: Pending */}
          <div className="complaint-item" data-status="pending" data-location="omr" data-severity="high" data-date="3">
            <div className="item-status pending-bg">⏳ Pending</div>
            <div className="item-details">
              <h4>Deep Pothole on Main St</h4>
              <p>Location: OMR • Priority: High • Reported 3 days ago</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">Waiting for action</div>
              <div className="issuer">Issued by <strong>Karthik R.</strong></div>
            </div>
          </div>

          {/* List Item: Ongoing */}
          <div className="complaint-item" data-status="ongoing" data-location="velachery" data-severity="high" data-date="2">
            <div className="item-status ongoing-bg">🚧 In Progress</div>
            <div className="item-details">
              <h4>Traffic Light Malfunction</h4>
              <p>Location: Velachery • Priority: High • Est. Completion: 48 hrs</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">In Progress</div>
              <div className="issuer">Issued by <strong>Priya S.</strong></div>
            </div>
          </div>

          {/* List Item: Completed */}
          <div className="complaint-item" data-status="completed" data-location="anna-nagar" data-severity="low" data-date="0">
            <div className="item-status completed-bg">✅ Completed</div>
            <div className="item-details">
              <h4>Streetlight Fixed - 4th Avenue</h4>
              <p>Location: Anna Nagar • Priority: Low • Last resolved 2 hrs ago</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">Resolved</div>
              <div className="issuer">Issued by <strong>Arun M.</strong></div>
            </div>
          </div>
          
          {/* List Item: Pending */}
          <div className="complaint-item" data-status="pending" data-location="tambaram" data-severity="medium" data-date="4">
            <div className="item-status pending-bg">⏳ Pending</div>
            <div className="item-details">
              <h4>Broken Pavement near Park</h4>
              <p>Location: Tambaram • Priority: Medium • Reported 4 days ago</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">Waiting for action</div>
              <div className="issuer">Issued by <strong>Divya T.</strong></div>
            </div>
          </div>

          {/* List Item: Ongoing */}
          <div className="complaint-item" data-status="ongoing" data-location="t-nagar" data-severity="medium" data-date="1">
            <div className="item-status ongoing-bg">🚧 In Progress</div>
            <div className="item-details">
              <h4>Fallen Tree Branch</h4>
              <p>Location: T. Nagar • Priority: Medium • Est. Completion: 12 hrs</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">In Progress</div>
              <div className="issuer">Issued by <strong>Manoj V.</strong></div>
            </div>
          </div>

          {/* List Item: Pending */}
          <div className="complaint-item" data-status="pending" data-location="adyar" data-severity="low" data-date="7">
            <div className="item-status pending-bg">⏳ Pending</div>
            <div className="item-details">
              <h4>Faded Zebra Crossing</h4>
              <p>Location: Adyar • Priority: Low • Reported 1 week ago</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">Waiting for action</div>
              <div className="issuer">Issued by <strong>Sneha K.</strong></div>
            </div>
          </div>

          {/* List Item: Completed */}
          <div className="complaint-item" data-status="completed" data-location="guindy" data-severity="high" data-date="1">
            <div className="item-status completed-bg">✅ Completed</div>
            <div className="item-details">
              <h4>Open Manhole Covered</h4>
              <p>Location: Guindy • Priority: High • Last resolved 1 day ago</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">Resolved</div>
              <div className="issuer">Issued by <strong>Ramesh N.</strong></div>
            </div>
          </div>

          {/* List Item: Pending */}
          <div className="complaint-item" data-status="pending" data-location="thiruvanmiyur" data-severity="high" data-date="0">
            <div className="item-status pending-bg">⏳ Pending</div>
            <div className="item-details">
              <h4>Severe Waterlogging</h4>
              <p>Location: Thiruvanmiyur • Priority: High • Reported 5 hrs ago</p>
            </div>
            <div className="item-meta">
              <div className="meta-status">Waiting for action</div>
              <div className="issuer">Issued by <strong>Anita R.</strong></div>
            </div>
          </div>

          <div id="noRecordsMessage" style={{ display: 'none', textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '14px' }}>
            No records found matching the selected filters.
          </div>
        </div>
      </div>
      
    </div>
  );
};
