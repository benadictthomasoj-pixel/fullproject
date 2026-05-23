// @ts-nocheck
import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Transparency.css';

export const Transparency = () => {
    useEffect(() => {
        
    // Chart.js Configuration
    Chart.defaults.font.family = "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    Chart.defaults.color = '#475569';

    // Store references to chart objects
    const charts = {};

    function initAllCharts() {
      // 1. Semi-Circular Gauge Chart
      const ctxGauge = document.getElementById('gaugeCanvas');
      if (ctxGauge) {
        charts.gauge = new Chart(ctxGauge.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ['Score', 'Remaining'],
            datasets: [{
              data: [78, 22],
              backgroundColor: ['#3b82f6', '#f1f5f9'],
              borderWidth: 2,
              borderColor: '#cbd5e1',
              borderRadius: [12, 0]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            rotation: -90,
            circumference: 180,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
            }
          }
        });
      }

      // 2. Trend Line Chart
      const ctxTrend = document.getElementById('trendChart');
      if (ctxTrend) {
        const gradient = ctxTrend.getContext('2d').createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        charts.trend = new Chart(ctxTrend.getContext('2d'), {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Dec'],
            datasets: [{
              label: 'Transparency Score',
              data: [15, 38, 32, 50, 55, 62, 75, 92],
              borderColor: '#3b82f6',
              borderWidth: 3,
              backgroundColor: gradient,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#ffffff',
              pointBorderColor: '#cbd5e1',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: {
                grid: { display: false }
              },
              y: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 25
                },
                grid: { color: '#cbd5e1' }
              }
            }
          }
        });
      }

      // 3. Budget Allocation Donut Chart
      const ctxBudget = document.getElementById('budgetDonutCanvas');
      if (ctxBudget) {
        charts.budget = new Chart(ctxBudget.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ['Road Repairs', 'Drainage Work', 'Street Lights', 'Smart Sensors', 'Emergency Fund'],
            datasets: [{
              data: [40, 25, 15, 10, 10],
              backgroundColor: ['#3b82f6', '#0ea5e9', '#6366f1', '#a855f7', '#10b981'],
              borderWidth: 2,
              borderColor: '#cbd5e1'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  boxWidth: 12,
                  font: { size: 12, weight: 600 }
                }
              }
            }
          }
        });
      }

      // 4. Maintenance History Bar Chart
      const ctxHistory = document.getElementById('historyChart');
      if (ctxHistory) {
        charts.history = new Chart(ctxHistory.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['2022', '2023', '2024', '2025', '2026'],
            datasets: [{
              label: 'Total Completed Repairs',
              data: [120, 210, 290, 380, 438],
              backgroundColor: '#3b82f6',
              borderRadius: 6,
              borderWidth: 2,
              borderColor: '#cbd5e1'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: '#cbd5e1' } }
            }
          }
        });
      }

      // 5. Budget Analytics - Spend Trend Compare
      const ctxSpend = document.getElementById('analyticsSpendCanvas');
      if (ctxSpend) {
        charts.spend = new Chart(ctxSpend.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Allocated Budget ($k)',
                data: [400, 450, 420, 500, 480, 600],
                backgroundColor: '#cbd5e1',
                borderRadius: 4,
                borderWidth: 2,
                borderColor: '#cbd5e1'
              },
              {
                label: 'Actual Spending ($k)',
                data: [380, 420, 410, 520, 460, 580],
                backgroundColor: '#3b82f6',
                borderRadius: 4,
                borderWidth: 2,
                borderColor: '#cbd5e1'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: '#cbd5e1' } }
            }
          }
        });
      }

      // 6. Budget Analytics - Radar Chart
      const ctxZone = document.getElementById('analyticsZoneCanvas');
      if (ctxZone) {
        charts.zone = new Chart(ctxZone.getContext('2d'), {
          type: 'radar',
          data: {
            labels: ['Anna Nagar', 'OMR', 'Velachery', 'Tambaram', 'T Nagar'],
            datasets: [{
              label: 'Efficiency Index',
              data: [94, 88, 82, 75, 95],
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: '#3b82f6',
              pointBackgroundColor: '#3b82f6',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            }
          }
        });
      }
    }

    // Handle interactive before/after image slider
    function initImageSlider() {
      const sliderControl = document.getElementById('slider-control');
      const sliderBefore = document.getElementById('slider-before-img');
      const sliderHandle = document.getElementById('slider-divider-handle');

      if (sliderControl && sliderBefore && sliderHandle) {
        sliderControl.addEventListener('input', (e) => {
          const val = e.target.value;
          sliderBefore.style.width = `${val}%`;
          sliderHandle.style.left = `${val}%`;
        });
      }
    }

    // Dynamic section switcher logic
      // Initialize all charts and slider elements
      initAllCharts();
      initImageSlider();

      const sidebarItems = document.querySelectorAll('.sidebar-item');
      const sections = document.querySelectorAll('.workspace-section');
      
      const pageTitle = document.getElementById('page-content-title');
      const pageSubtitle = document.getElementById('page-content-subtitle');

      const titleMap = {
        'content-transparency-score': {
          title: 'Transparency',
          subtitle: 'Monitor public accountability metrics, track budget utilization, analyze infrastructure performance and maintain public transparency across Chennai.'
        },
        'content-budget-overview': {
          title: 'Budget Overview',
          subtitle: 'Verify allocated public funds, audit spent capital pipelines, monitor emergency funds, and detect suspicious transactions across Chennai road projects.'
        },
        'content-repair-tracking': {
          title: 'Repair Tracking',
          subtitle: 'Audit live infrastructure repairs, inspect active potholes, track project SLA timelines, and review automatic AI sensor anomalies.'
        },
        'content-maintenance-history': {
          title: 'Maintenance History',
          subtitle: 'Review historical road maintenance logs, study recurring asphalt damages, monitor contractor compliance ratings, and review AI suggestions.'
        },
        'content-budget-analytics': {
          title: 'Budget Analytics',
          subtitle: 'Conduct predictive cost efficiency modelling, compare zone spending margins, audit contractor financial records, and detect waste.'
        },
        'content-completed-projects': {
          title: 'Completed Projects',
          subtitle: 'Review successfully completed road works, browse citizen satisfaction surveys, audit finished asset files, and review visual sliders.'
        }
      };

      sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          
          const sectionId = item.getAttribute('data-section');
          
          // Switch active class on sidebar items
          sidebarItems.forEach(sib => sib.classList.remove('active'));
          item.classList.add('active');

          // Switch active class on workspace sections
          sections.forEach(sec => sec.classList.remove('active'));
          const targetSection = document.getElementById(sectionId);
          if (targetSection) {
            targetSection.classList.add('active');
          }

          // Update header card titles
          if (titleMap[sectionId]) {
            if (pageTitle) pageTitle.textContent = titleMap[sectionId].title;
            if (pageSubtitle) pageSubtitle.textContent = titleMap[sectionId].subtitle;
          }

          // Force chart render resizing to prevent layout shifting
          Object.keys(charts).forEach(key => {
            charts[key].resize();
            charts[key].update();
          });
        });
      });

      return () => {
        Object.values(charts).forEach(chart => chart.destroy());
      };
    }, []);

    return (
        <div className="app-container transparency-app-container">
            
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <a href="#" className="sidebar-item active" data-section="content-transparency-score">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Transparency Score
        </a>
        <a href="#" className="sidebar-item" data-section="content-budget-overview">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Budget Overview
        </a>
        <a href="#" className="sidebar-item" data-section="content-repair-tracking">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          Repair Tracking
        </a>
        <a href="#" className="sidebar-item" data-section="content-maintenance-history">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Maintenance History
        </a>
        <a href="#" className="sidebar-item" data-section="content-budget-analytics">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          Budget Analytics
        </a>
        <a href="#" className="sidebar-item" data-section="content-completed-projects">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          Completed Projects
        </a>
      </nav>
    </aside>

    
    <main className="workspace">
      
      
      <div className="card" style={{ marginBottom: '24px', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 className="workspace-title" id="page-content-title" style={{ marginBottom: '8px' }}>Transparency</h1>
            <p id="page-content-subtitle" style={{ color: 'var(--text-light)', fontSize: '15px', maxWidth: '650px' }}>
              Monitor public accountability metrics, track budget utilization, analyze infrastructure performance and maintain public transparency across Chennai.
            </p>
          </div>
          <div className="status-pills">
            <div className="status-pill">
              <span className="dot"></span>
              <span>Citizen Feedback: <span className="val">Active</span></span>
            </div>
            <div className="status-pill">
              <span className="dot"></span>
              <span>AI Data Verification: <span className="val">98%</span></span>
            </div>
          </div>
        </div>
      </div>

      
      
      
      <div id="content-transparency-score" className="workspace-section active">
        
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-title">Citizen Trust Index</div>
            <div className="kpi-value">84%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">AI Verification Accuracy</div>
            <div className="kpi-value">98.4%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Complaint Resolution</div>
            <div className="kpi-value">91.2%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Corruption Risk</div>
            <div className="kpi-value" style={{ color: 'var(--color-green)' }}>Very Low</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Public Satisfaction</div>
            <div className="kpi-value">4.5/5</div>
          </div>
        </div>

        
        <div className="dashboard-grid">
          
          <div className="card">
            <div className="card-title">City-Wide Transparency Score</div>
            <div className="gauge-wrapper">
              <div className="gauge-container">
                <canvas id="gaugeCanvas"></canvas>
                <div className="gauge-score-wrapper">
                  <span className="gauge-score-text">78</span><span className="gauge-score-max">/100</span>
                </div>
              </div>
              <div className="gauge-badge">Highly Transparent</div>
            </div>
          </div>

          
          <div className="card">
            <div className="card-title">Score Components</div>
            <div className="components-wrapper">
              <div className="component-item">
                <div className="component-label-row">
                  <span>Citizen Engagement</span>
                  <span className="component-percentage">(85%)</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="component-item">
                <div className="component-label-row">
                  <span>Data Accuracy</span>
                  <span className="component-percentage">(72%)</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div className="component-item">
                <div className="component-label-row">
                  <span>Budget Clarity</span>
                  <span className="component-percentage">(65%)</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="card">
            <div className="card-title">Transparency Score Trend (12 Months)</div>
            <div className="chart-wrapper">
              <canvas id="trendChart"></canvas>
            </div>
          </div>

          
          <div className="card card-alert">
            <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span>High Risk Transparency Zones</span>
              <div className="live-monitor-pill" style={{ margin: '0', fontSize: '11px', padding: '4px 10px', borderColor: '#bae6fd' }}>
                <span className="pulse-dot-blue"></span>
                <span>AI Transparency Monitoring Active</span>
              </div>
            </div>
            
            <div className="analytics-panel-content">
              
              <div className="ranked-zones-container">
                <div className="panel-subtitle">Risk Ranking by Zone</div>
                <div className="risk-list">
                  
                  <div className="risk-row">
                    <div className="risk-row-left">
                      <span className="risk-indicator indicator-red"></span>
                      <span className="risk-zone-name">1. OMR Road</span>
                    </div>
                    <div className="risk-stats">
                      <span>Complaints: <strong>142</strong></span>
                      <span className="separator">|</span>
                      <span>Delays: <strong>9</strong></span>
                    </div>
                    <span className="badge badge-glow-red">92% Risk</span>
                  </div>
                  
                  <div className="risk-row">
                    <div className="risk-row-left">
                      <span className="risk-indicator indicator-red"></span>
                      <span className="risk-zone-name">2. Velachery</span>
                    </div>
                    <div className="risk-stats">
                      <span>Complaints: <strong>118</strong></span>
                      <span className="separator">|</span>
                      <span>Delays: <strong>7</strong></span>
                    </div>
                    <span className="badge badge-glow-red">85% Risk</span>
                  </div>
                  
                  <div className="risk-row">
                    <div className="risk-row-left">
                      <span className="risk-indicator indicator-orange"></span>
                      <span className="risk-zone-name">3. Anna Salai</span>
                    </div>
                    <div className="risk-stats">
                      <span>Complaints: <strong>94</strong></span>
                      <span className="separator">|</span>
                      <span>Delays: <strong>4</strong></span>
                    </div>
                    <span className="badge badge-glow-orange">80% Risk</span>
                  </div>
                  
                  <div className="risk-row">
                    <div className="risk-row-left">
                      <span className="risk-indicator indicator-orange"></span>
                      <span className="risk-zone-name">4. Tambaram</span>
                    </div>
                    <div className="risk-stats">
                      <span>Complaints: <strong>81</strong></span>
                      <span className="separator">|</span>
                      <span>Delays: <strong>5</strong></span>
                    </div>
                    <span className="badge badge-glow-orange">74% Risk</span>
                  </div>
                  
                  <div className="risk-row">
                    <div className="risk-row-left">
                      <span className="risk-indicator indicator-yellow"></span>
                      <span className="risk-zone-name">5. T Nagar</span>
                    </div>
                    <div className="risk-stats">
                      <span>Complaints: <strong>65</strong></span>
                      <span className="separator">|</span>
                      <span>Delays: <strong>2</strong></span>
                    </div>
                    <span className="badge badge-glow-yellow">68% Risk</span>
                  </div>
                </div>
              </div>
              
              
              <div className="alerts-insights-container">
                <div className="panel-subtitle">AI Alerts & Live Feed</div>
                
                <div className="ai-box" style={{ marginBottom: '0', padding: '10px', borderWidth: '1.5px', borderRadius: '8px' }}>
                  <div className="ai-title" style={{ fontSize: '11px', marginBottom: '4px' }}>🤖 Risk Insights</div>
                  <div className="ai-item" style={{ fontSize: '10.5px', marginBottom: '3px', lineHeight: '1.25', color: '#475569' }}>
                    ⚠️ Repeated contractor delays detected in OMR.
                  </div>
                  <div className="ai-item" style={{ fontSize: '10.5px', marginBottom: '3px', lineHeight: '1.25', color: '#475569' }}>
                    ⚠️ Budget irregularities flagged in Velachery.
                  </div>
                  <div className="ai-item" style={{ fontSize: '10.5px', marginBottom: '0', lineHeight: '1.25', color: '#475569' }}>
                    📈 Citizen complaints increasing in Tambaram.
                  </div>
                </div>

                <div className="live-alerts-list">
                  <div className="live-alert-item alert-red">
                    <span className="alert-marker"></span>
                    <div className="alert-content">
                      <div className="alert-category">Corruption Risk</div>
                      <div className="alert-msg">Top high-risk corruption zone flagged on OMR Bypass.</div>
                    </div>
                  </div>
                  <div className="live-alert-item alert-orange">
                    <span className="alert-marker"></span>
                    <div className="alert-content">
                      <div className="alert-category">Delayed Repairs</div>
                      <div className="alert-msg">Active repair delays in Tambaram region.</div>
                    </div>
                  </div>
                  <div className="live-alert-item alert-red">
                    <span className="alert-marker"></span>
                    <div className="alert-content">
                      <div className="alert-category">Budget Misuse</div>
                      <div className="alert-msg">Velachery: budget irregularities & overflow warning.</div>
                    </div>
                  </div>
                  <div className="live-alert-item alert-orange">
                    <span className="alert-marker"></span>
                    <div className="alert-content">
                      <div className="alert-category">High Complaints</div>
                      <div className="alert-msg">High complaint regions active: OMR & Velachery.</div>
                    </div>
                  </div>
                  <div className="live-alert-item alert-yellow">
                    <span className="alert-marker"></span>
                    <div className="alert-content">
                      <div className="alert-category">Repeated Failures</div>
                      <div className="alert-msg">Repeated maintenance failures on Anna Salai.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="ai-box">
          <div className="ai-title">🤖 AI Transparency Insights</div>
          <div className="ai-item">💡 <strong>Anna Nagar:</strong> Accountability index increased by 12% following live camera integrations.</div>
          <div className="ai-item">⚠️ <strong>Approvals:</strong> Delayed roadwork verification audits in Tambaram reduced the local compliance rating.</div>
          <div className="ai-item">🏆 <strong>Most Transparent:</strong> T. Nagar ranks highest in public fund logging accuracy (95% score).</div>
        </div>
      </div>

      
      
      
      <div id="content-budget-overview" className="workspace-section">
        
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-title">Total Allocated Budget</div>
            <div className="kpi-value">$8.5M</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Used Budget</div>
            <div className="kpi-value">$5.2M</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Remaining Budget</div>
            <div className="kpi-value">$3.3M</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Emergency Repair Fund</div>
            <div className="kpi-value">$1.0M</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Utilization Rate</div>
            <div className="kpi-value">61.2%</div>
          </div>
        </div>

        <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
          
          <div className="card">
            <div className="card-title">Budget Distribution Breakdown</div>
            <div className="chart-container-large">
              <canvas id="budgetDonutCanvas"></canvas>
            </div>
          </div>

          
          <div className="card" style={{ justifyContent: 'flex-start', gap: '16px' }}>
            <div className="card-title">AI Financial Analysis & Integrity</div>
            <div className="ai-box" style={{ marginBottom: '0' }}>
              <div className="ai-title">🤖 AI Budget Analysis</div>
              <div className="ai-item">📈 <strong>Velachery:</strong> Drainage expansions caused an 8% budget overflow.</div>
              <div className="ai-item">🏆 <strong>Anna Nagar:</strong> Highest repair-cost efficiency index (94% score).</div>
              <div className="ai-item">🔍 <strong>Tambaram:</strong> Unused funds ($500k) detected; recommendation is reallocation.</div>
            </div>
            
            <div className="card" style={{ backgroundColor: '#fff5f5', borderColor: '#fca5a5', padding: '16px' }}>
              <div style={{ fontWeight: '700', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px' }}>
                🚨 INTEGRITY ALERTS & FRAUD DETECTION
              </div>
              <div style={{ fontSize: '13px', color: '#7f1d1d', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>• <strong>Suspicious Spending Flag:</strong> Duplicate invoice claimed for road resurfacing in Guindy (Flagged).</div>
                <div>• <strong>Billing Delay Alert:</strong> Vels Contracting is 12 days past SLA in billing submission.</div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-title">Regional Budget Allocations</div>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Allocated</th>
                  <th>Used</th>
                  <th>Remaining</th>
                  <th>Contractor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Anna Nagar</td>
                  <td>$1,500,000</td>
                  <td>$1,200,000</td>
                  <td>$300,000</td>
                  <td>Metro Infra Ltd</td>
                  <td><span className="badge badge-green">Completed</span></td>
                </tr>
                <tr>
                  <td>OMR Bypass</td>
                  <td>$2,400,000</td>
                  <td>$1,900,000</td>
                  <td>$500,000</td>
                  <td>Apex Roads Corp</td>
                  <td><span className="badge badge-blue">Ongoing</span></td>
                </tr>
                <tr>
                  <td>Velachery</td>
                  <td>$1,800,000</td>
                  <td>$1,944,000</td>
                  <td style={{ color: '#dc2626', fontWeight: '700' }}>-$144,000</td>
                  <td>Southern Builders</td>
                  <td><span className="badge badge-red">Over Budget</span></td>
                </tr>
                <tr>
                  <td>Tambaram</td>
                  <td>$1,300,000</td>
                  <td>$800,000</td>
                  <td>$500,000</td>
                  <td>City Works India</td>
                  <td><span className="badge badge-orange">Pending</span></td>
                </tr>
                <tr>
                  <td>T Nagar</td>
                  <td>$1,500,000</td>
                  <td>$1,350,000</td>
                  <td>$150,000</td>
                  <td>Vels Contracting</td>
                  <td><span className="badge badge-green">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      
      
      <div id="content-repair-tracking" className="workspace-section">
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-title">Repairs In Progress</div>
            <div className="kpi-value">18</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Pending Repairs</div>
            <div className="kpi-value">42</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Emergency Repairs</div>
            <div className="kpi-value">3</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Completed Repairs</div>
            <div className="kpi-value">320</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Average SLA Met</div>
            <div className="kpi-value">94.8%</div>
          </div>
        </div>

        <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
          
          <div className="card" style={{ justifyContent: 'flex-start', gap: '16px' }}>
            <div className="card-title">Repair Progress Lifecycle</div>
            
            <div className="timeline">
              <div className="timeline-step completed">
                <div className="timeline-node">1</div>
                <div className="timeline-label">Reported</div>
              </div>
              <div className="timeline-step completed">
                <div className="timeline-node">2</div>
                <div className="timeline-label">Approved</div>
              </div>
              <div className="timeline-step completed">
                <div className="timeline-node">3</div>
                <div className="timeline-label">Assigned</div>
              </div>
              <div className="timeline-step active">
                <div className="timeline-node">4</div>
                <div className="timeline-label">Under Repair</div>
              </div>
              <div className="timeline-step">
                <div className="timeline-node">5</div>
                <div className="timeline-label">Completed</div>
              </div>
            </div>

            <div className="ai-box" style={{ marginTop: '10px' }}>
              <div className="ai-title">🤖 AI Damage Detection Alerts</div>
              <div className="ai-item">📡 <strong>OMR bypass:</strong> AI camera detected severe pothole depth expansion (Urgent).</div>
              <div className="ai-item">🔄 <strong>Anna Salai:</strong> Repeated damage patterns flag weak sub-surface structural base.</div>
              <div className="ai-item">⏰ <strong>Tambaram:</strong> Repair delay threshold warnings triggered for contractor Apex Roads.</div>
            </div>
          </div>

          
          <div className="card">
            <div className="card-title">Live Chennai Infrastructure Alerts Map</div>
            <div className="live-map-wrapper">
              
              <img src="chennai_heatmap.png" alt="Chennai Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.85' }} />
              
              
              <div className="map-pin pin-red" style={{ top: '70%', left: '52%' }}>
                <div className="pin-tooltip"><strong>OMR Bypass</strong><br />Pothole Alert (Severe)<br />Status: Under Repair<br />ETA: 8 Hours</div>
              </div>
              <div className="map-pin pin-orange" style={{ top: '40%', left: '40%' }}>
                <div className="pin-tooltip"><strong>Anna Salai</strong><br />Surface Crack (Medium)<br />Status: Assigned<br />ETA: 24 Hours</div>
              </div>
              <div className="map-pin pin-blue" style={{ top: '60%', left: '35%' }}>
                <div className="pin-tooltip"><strong>Velachery Main Rd</strong><br />Drainage Clog (Severe)<br />Status: Investigating<br />ETA: 3 Hours</div>
              </div>
              <div className="map-pin pin-red" style={{ top: '48%', left: '45%' }}>
                <div className="pin-tooltip"><strong>T Nagar Center</strong><br />Pothole Alert (Severe)<br />Status: Under Repair<br />ETA: 1 Hour</div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-title">Active Infrastructure Repair Requests</div>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Road Name</th>
                  <th>Damage Type</th>
                  <th>Severity</th>
                  <th>Assigned Team</th>
                  <th>ETA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>OMR Bypass Section 3</td>
                  <td>Severe Pothole</td>
                  <td><span className="badge badge-red">High</span></td>
                  <td>Team Delta (Metro)</td>
                  <td>8 Hours</td>
                  <td><span className="badge badge-blue">Ongoing</span></td>
                </tr>
                <tr>
                  <td>Anna Salai Arterial</td>
                  <td>Surface Asphalt Crack</td>
                  <td><span className="badge badge-orange">Medium</span></td>
                  <td>Team Alpha (Civic)</td>
                  <td>24 Hours</td>
                  <td><span className="badge badge-orange">Assigned</span></td>
                </tr>
                <tr>
                  <td>Velachery Link Road</td>
                  <td>Storm Drain Clog</td>
                  <td><span className="badge badge-red">High</span></td>
                  <td>Team Omega (Drainage)</td>
                  <td>3 Hours</td>
                  <td><span className="badge badge-red">Emergency</span></td>
                </tr>
                <tr>
                  <td>Tambaram Link Road</td>
                  <td>Zebra Crossing Faded</td>
                  <td><span className="badge badge-blue">Low</span></td>
                  <td>Team Beta (Markings)</td>
                  <td>5 Days</td>
                  <td><span className="badge badge-orange">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      
      
      <div id="content-maintenance-history" className="workspace-section">
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-title">Total Repairs This Year</div>
            <div className="kpi-value">438</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Average Repair Time</div>
            <div className="kpi-value">4.2 Days</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Most Damaged Zone</div>
            <div className="kpi-value" style={{ color: 'var(--accent-blue)' }}>Velachery</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Maintenance Efficiency</div>
            <div className="kpi-value">92.4%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Sensor Downtime</div>
            <div className="kpi-value">0.12%</div>
          </div>
        </div>

        <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
          
          <div className="card">
            <div className="card-title">Yearly Maintenance Records Trend</div>
            <div className="chart-container-large">
              <canvas id="historyChart"></canvas>
            </div>
          </div>

          
          <div className="card" style={{ justifyContent: 'flex-start', gap: '16px' }}>
            <div className="card-title">Repeat Damage Analysis</div>
            
            <div className="card" style={{ borderColor: '#fed7aa', backgroundColor: '#fffbeb', padding: '16px', marginBottom: '4px' }}>
              <div style={{ fontWeight: '700', color: '#ea580c', fontSize: '13.5px' }}>⚠️ REPEAT DAMAGE WARNINGS</div>
              <div style={{ fontSize: '13px', color: '#7c2d12', marginTop: '8px' }}>
                <strong>Velachery Road:</strong> 4 patchworks logged in the past 12 months. Sub-base structural failure detected. Complete resurfacing recommended.
              </div>
            </div>

            <div className="ai-box" style={{ marginBottom: '0' }}>
              <div className="ai-title">🤖 AI Maintenance Recommendations</div>
              <div className="ai-item">🛠️ <strong>OMR:</strong> Apply polymer-modified bitumen resurfacing to withstand high heavy-vehicle volumes.</div>
              <div className="ai-item">⛈️ <strong>Drainage:</strong> Heavy monsoon blockages recur on Velachery Link Road. Expand Storm drainage diameter.</div>
              <div className="ai-item">⚠️ <strong>Strategy:</strong> Patchwork fixes reduce road lifespan by 22% compared to full overlay repairs.</div>
            </div>
          </div>
        </div>

        
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-title">Past Infrastructure Maintenance Log</div>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Completion Date</th>
                  <th>Area</th>
                  <th>Problem Type</th>
                  <th>Contractor</th>
                  <th>Total Cost</th>
                  <th>Quality Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12 May 2026</td>
                  <td>Anna Nagar</td>
                  <td>Street Cave-In Repair</td>
                  <td>Metro Infra Ltd</td>
                  <td>$45,000</td>
                  <td><span className="badge badge-green">9.6 / 10</span></td>
                </tr>
                <tr>
                  <td>28 Apr 2026</td>
                  <td>OMR Bypass</td>
                  <td>Bitumen Resurfacing</td>
                  <td>Apex Roads Corp</td>
                  <td>$12,000</td>
                  <td><span className="badge badge-green">9.2 / 10</span></td>
                </tr>
                <tr>
                  <td>15 Mar 2026</td>
                  <td>Guindy Industrial</td>
                  <td>Traffic System Calibration</td>
                  <td>City Electricals</td>
                  <td>$8,500</td>
                  <td><span className="badge badge-blue">8.9 / 10</span></td>
                </tr>
                <tr>
                  <td>02 Feb 2026</td>
                  <td>T Nagar</td>
                  <td>Storm Drain Tunnel Overhaul</td>
                  <td>Vels Contracting</td>
                  <td>$120,000</td>
                  <td><span className="badge badge-green">9.5 / 10</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      
      
      <div id="content-budget-analytics" className="workspace-section">
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-title">Cost Efficiency Score</div>
            <div className="kpi-value" style={{ color: 'var(--accent-blue)' }}>A+</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Average Repair Cost</div>
            <div className="kpi-value">$8,200</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Budget Waste %</div>
            <div className="kpi-value" style={{ color: 'var(--color-green)' }}>1.8%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Contractor Reliability</div>
            <div className="kpi-value">94.0%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Audited Transactions</div>
            <div className="kpi-value">100%</div>
          </div>
        </div>

        <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
          
          <div className="card">
            <div className="card-title">Monthly Allocations vs Actual Spending</div>
            <div className="chart-container-large">
              <canvas id="analyticsSpendCanvas"></canvas>
            </div>
          </div>

          
          <div className="card">
            <div className="card-title">Zone Efficiency Radar</div>
            <div className="chart-container-large">
              <canvas id="analyticsZoneCanvas"></canvas>
            </div>
          </div>
        </div>

        
        <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
          <div className="card" style={{ justifyContent: 'flex-start', gap: '16px' }}>
            <div className="card-title">AI Predictive Financial Modelling</div>
            <div className="ai-box" style={{ marginBottom: '0' }}>
              <div className="ai-title">🤖 AI Financial Predictions</div>
              <div className="ai-item">🌦️ <strong>Monsoon Forecast:</strong> Expected road maintenance cost to spike 14% due to rainfall index.</div>
              <div className="ai-item">📉 <strong>Regional Outlook:</strong> South Chennai budget overflow warning triggered. Reallocate 5% from North surplus.</div>
              <div className="ai-item">💡 <strong>Efficiency Index:</strong> Early preventative repairs using smart sensors can lower total cost by 22%.</div>
            </div>
            
            <div className="ai-box" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe', marginBottom: '0' }}>
              <div className="ai-title" style={{ color: '#2563eb' }}>💡 Smart Capital Recommendations</div>
              <div className="ai-item" style={{ color: '#1e3a8a' }}>1. Prioritize pre-monsoon storm drainage cleaning on low-lying arterial roads.</div>
              <div className="ai-item" style={{ color: '#1e3a8a' }}>2. Phase out low-cost patchwork contracts in heavy transit corridors.</div>
            </div>
          </div>

          
          <div className="card">
            <div className="card-title">Zone Cost-Performance Comparison</div>
            <div className="table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Zone</th>
                    <th>Avg Cost / km</th>
                    <th>Quality Score</th>
                    <th>Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Anna Nagar</td>
                    <td>$12,500</td>
                    <td>9.4 / 10</td>
                    <td><span className="badge badge-green">High</span></td>
                  </tr>
                  <tr>
                    <td>OMR Bypass</td>
                    <td>$18,200</td>
                    <td>8.8 / 10</td>
                    <td><span className="badge badge-blue">Medium</span></td>
                  </tr>
                  <tr>
                    <td>Velachery</td>
                    <td>$15,000</td>
                    <td>8.2 / 10</td>
                    <td><span className="badge badge-blue">Medium</span></td>
                  </tr>
                  <tr>
                    <td>T Nagar</td>
                    <td>$11,000</td>
                    <td>9.5 / 10</td>
                    <td><span className="badge badge-green">High</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      
      
      
      <div id="content-completed-projects" className="workspace-section">
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-title">Projects Completed</div>
            <div className="kpi-value">1,248</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Roads Restored</div>
            <div className="kpi-value">284 km</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Total Budget Utilized</div>
            <div className="kpi-value">$5.2M</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Citizen Satisfaction</div>
            <div className="kpi-value">92.0%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-title">Audits Passed</div>
            <div className="kpi-value" style={{ color: 'var(--color-green)' }}>100%</div>
          </div>
        </div>

        <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
          
          <div className="card">
            <div className="card-title">Before & After Repair Visual Slider</div>
            <div className="slider-container" id="before-after-slider">
              <div className="slider-img after"></div>
              <div className="slider-img before" id="slider-before-img"></div>
              <span className="slider-label before-label">BEFORE REPAIR</span>
              <span className="slider-label after-label">AFTER REPAIR</span>
              <input type="range" min="0" max="100" value="50" className="slider-range" id="slider-control" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: '0', cursor: 'ew-resize', zIndex: '20' }} />
              <div className="slider-handle" id="slider-divider-handle"></div>
            </div>
          </div>

          
          <div className="card" style={{ justifyContent: 'flex-start' }}>
            <div className="card-title">Restored Assets Showcase</div>
            <div className="gallery-grid">
              <div className="gallery-card">
                <div className="gallery-img-wrapper">
                  <img src="repaired_road.png" alt="Asphalt Resurfacing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="gallery-title">Anna Nagar Paving</div>
              </div>
              <div className="gallery-card">
                <div className="gallery-img-wrapper" style={{ backgroundColor: '#bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#1e3a8a' }}>
                  🌧️
                </div>
                <div className="gallery-title">Velachery Drain Fix</div>
              </div>
              <div className="gallery-card">
                <div className="gallery-img-wrapper" style={{ backgroundColor: '#ddd6fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#4c1d95' }}>
                  📡
                </div>
                <div className="gallery-title">OMR Smart Sensors</div>
              </div>
            </div>

            
            <div className="ai-box" style={{ marginTop: '16px', marginBottom: '0' }}>
              <div className="ai-title" style={{ color: 'var(--color-green)' }}>🏆 Project Success Stories</div>
              <div className="ai-item">🌟 <strong>Anna Nagar:</strong> Citizen infrastructure complaints dropped by 70% post-resurfacing.</div>
              <div className="ai-item">🌟 <strong>Velachery:</strong> drainage repairs finished 8 days ahead of schedule, mitigating flood risks.</div>
              <div className="ai-item">🌟 <strong>Public Trust:</strong> Citizen satisfaction ratings increased by 18% in sensor-monitored zones.</div>
            </div>
          </div>
        </div>

        
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-title">Completed Public Works Projects Registry</div>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Area</th>
                  <th>Contractor</th>
                  <th>Approved Budget</th>
                  <th>Completion Date</th>
                  <th>Quality Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Anna Nagar Main Resurfacing</td>
                  <td>Anna Nagar</td>
                  <td>Metro Infra Ltd</td>
                  <td>$340,000</td>
                  <td>12 May 2026</td>
                  <td><span className="badge badge-green">9.6 / 10</span></td>
                </tr>
                <tr>
                  <td>OMR Smart Road Sensor Deployment</td>
                  <td>OMR</td>
                  <td>Apex Roads Corp</td>
                  <td>$120,000</td>
                  <td>28 Apr 2026</td>
                  <td><span className="badge badge-green">9.2 / 10</span></td>
                </tr>
                <tr>
                  <td>Velachery storm water drainage conduit</td>
                  <td>Velachery</td>
                  <td>Southern Builders</td>
                  <td>$850,000</td>
                  <td>15 Feb 2026</td>
                  <td><span className="badge badge-blue">8.9 / 10</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      <footer className="footer">
        <span>Data last updated: 2 mins ago</span>
      </footer>
    </main>
        </div>
    );
};
