import { MOCK_DATA } from './data.js';

// --- State ---
let state = {
  city: MOCK_DATA.cities[0],
  search: '',
  filters: {
    condition: 'all',
    priority: 'all',
    status: 'all'
  },
  selectedRoadId: null
};

// --- DOM Elements ---
const els = {
  citySelect: document.getElementById('citySelect'),
  kpiTotalRoads: document.getElementById('kpiTotalRoads'),
  kpiActiveProjects: document.getElementById('kpiActiveProjects'),
  kpiUnderRepair: document.getElementById('kpiUnderRepair'),
  kpiCompleted: document.getElementById('kpiCompleted'),
  kpiAvgScore: document.getElementById('kpiAvgScore'),
  
  searchInput: document.getElementById('searchInput'),
  filterCondition: document.getElementById('filterCondition'),
  filterPriority: document.getElementById('filterPriority'),
  filterStatus: document.getElementById('filterStatus'),
  
  roadGrid: document.getElementById('roadGrid'),
  
  // Right Panel
  emptyState: document.getElementById('emptyState'),
  detailContent: document.getElementById('detailContent'),
  
  // Detail Nodes
  dtName: document.getElementById('dtName'),
  dtId: document.getElementById('dtId'),
  dtZone: document.getElementById('dtZone'),
  dtWard: document.getElementById('dtWard'),
  dtCondition: document.getElementById('dtCondition'),
  dtPriority: document.getElementById('dtPriority'),
  
  dtLength: document.getElementById('dtLength'),
  dtWidth: document.getElementById('dtWidth'),
  dtInspection: document.getElementById('dtInspection'),
  dtHealthScore: document.getElementById('dtHealthScore'),
  healthGaugeRing: document.getElementById('healthGaugeRing'),
  
  dtDept: document.getElementById('dtDept'),
  dtOfficer: document.getElementById('dtOfficer'),
  dtContact: document.getElementById('dtContact'),
  dtOwnership: document.getElementById('dtOwnership'),
  dtScheme: document.getElementById('dtScheme'),
  
  dtTotalBudget: document.getElementById('dtTotalBudget'),
  dtUtilizedBudget: document.getElementById('dtUtilizedBudget'),
  dtBudgetPct: document.getElementById('dtBudgetPct'),
  dtContractor: document.getElementById('dtContractor'),
  dtBudgetBar: document.getElementById('dtBudgetBar'),
  
  dtTimelineStatus: document.getElementById('dtTimelineStatus'),
  dtDaysRemaining: document.getElementById('dtDaysRemaining'),
  dtProgressBar: document.getElementById('dtProgressBar'),
  dtStartDate: document.getElementById('dtStartDate'),
  dtEstDate: document.getElementById('dtEstDate'),
  
  dtRepTotal: document.getElementById('dtRepTotal'),
  dtRepOpen: document.getElementById('dtRepOpen'),
  dtRepResolved: document.getElementById('dtRepResolved'),
  
  dtMaintenanceList: document.getElementById('dtMaintenanceList')
};

// --- Helpers ---
const getConditionClass = (cond) => `bg-${cond.toLowerCase()}`;
const getConditionColor = (cond) => `var(--color-${
  cond==='Excellent'?'primary': cond==='Good'?'success': cond==='Moderate'?'warning': cond==='Poor'?'danger': 'critical'
})`;

const animateValue = (obj, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// --- Init & Event Listeners ---
function init() {
  // Populate City Select
  els.citySelect.innerHTML = MOCK_DATA.cities.map(c => `<option value="${c}">${c}</option>`).join('');
  els.citySelect.value = state.city;
  
  els.citySelect.addEventListener('change', (e) => {
    state.city = e.target.value;
    state.selectedRoadId = null;
    updateDashboard();
  });

  els.searchInput.addEventListener('input', (e) => {
    state.search = e.target.value.toLowerCase();
    renderGrid();
  });

  ['filterCondition', 'filterPriority', 'filterStatus'].forEach(id => {
    els[id].addEventListener('change', (e) => {
      state.filters[id.replace('filter', '').toLowerCase()] = e.target.value;
      renderGrid();
    });
  });

  updateDashboard();
}

// --- Render Logic ---
function updateDashboard() {
  const roads = MOCK_DATA.roads[state.city] || [];
  
  // Calculate KPIs
  const total = roads.length;
  const active = roads.filter(r => r.projectProgress.completed < 100).length;
  const repair = roads.filter(r => r.condition === 'Poor' || r.condition === 'Critical').length;
  const completed = roads.filter(r => r.projectProgress.completed === 100).length;
  const avgScore = total ? Math.round(roads.reduce((acc, r) => acc + r.healthScore, 0) / total) : 0;

  animateValue(els.kpiTotalRoads, 0, total, 1000);
  animateValue(els.kpiActiveProjects, 0, active, 1000);
  animateValue(els.kpiUnderRepair, 0, repair, 1000);
  animateValue(els.kpiCompleted, 0, completed, 1000);
  animateValue(els.kpiAvgScore, 0, avgScore, 1000);

  renderGrid();
  updateDetailView();
}

function getFilteredRoads() {
  return (MOCK_DATA.roads[state.city] || []).filter(r => {
    const matchSearch = r.name.toLowerCase().includes(state.search) || r.id.toLowerCase().includes(state.search);
    const matchCond = state.filters.condition === 'all' || r.condition === state.filters.condition;
    const matchPrio = state.filters.priority === 'all' || r.priority === state.filters.priority;
    const matchStat = state.filters.status === 'all' || r.timeline.status === state.filters.status;
    return matchSearch && matchCond && matchPrio && matchStat;
  });
}

function renderGrid() {
  const roads = getFilteredRoads();
  els.roadGrid.innerHTML = '';

  if (roads.length === 0) {
    els.roadGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted)">No roads found matching your criteria.</div>`;
    return;
  }

  roads.forEach(r => {
    const card = document.createElement('div');
    card.className = `road-card ${r.id === state.selectedRoadId ? 'active' : ''}`;
    // dynamic border top based on condition
    const condColor = getConditionColor(r.condition);
    card.style.setProperty('--color-primary', condColor);

    card.innerHTML = `
      <div class="rc-header">
        <div class="rc-title">
          <h3>${r.name}</h3>
          <p class="rc-subtitle">${r.id} • ${r.ward}</p>
        </div>
        <span class="badge ${getConditionClass(r.condition)}">${r.condition}</span>
      </div>
      <div class="rc-metrics">
        <div class="rc-metric">
          <span class="rc-m-val">${r.length}</span>
          <span class="rc-m-label">Length</span>
        </div>
        <div class="rc-metric">
          <span class="rc-m-val">${r.healthScore}/100</span>
          <span class="rc-m-label">Health</span>
        </div>
        <div class="rc-metric">
          <span class="rc-m-val">${r.priority}</span>
          <span class="rc-m-label">Priority</span>
        </div>
      </div>
      <div class="rc-progress">
        <div class="rc-progress-label">
          <span>Project Progress</span>
          <span>${r.projectProgress.completed}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${r.projectProgress.completed}%; background: ${getConditionColor(r.condition)}"></div>
        </div>
      </div>
      <div class="rc-footer">
        <i class="fa-solid fa-building-user"></i>
        <span>${r.authority.department}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      state.selectedRoadId = r.id;
      // remove active class from all
      document.querySelectorAll('.road-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      updateDetailView();
    });

    els.roadGrid.appendChild(card);
  });
}

function updateDetailView() {
  if (!state.selectedRoadId) {
    els.emptyState.style.display = 'flex';
    els.detailContent.style.display = 'none';
    return;
  }

  const road = (MOCK_DATA.roads[state.city] || []).find(r => r.id === state.selectedRoadId);
  if (!road) return;

  els.emptyState.style.display = 'none';
  els.detailContent.style.display = 'flex';

  // Basic Info
  els.dtName.textContent = road.name;
  els.dtId.textContent = road.id;
  els.dtZone.textContent = road.zone;
  els.dtWard.textContent = road.ward;
  els.dtLength.textContent = road.length;
  els.dtWidth.textContent = road.width;
  els.dtInspection.textContent = road.lastInspection;

  // Badges
  els.dtCondition.textContent = road.condition;
  els.dtCondition.className = `badge condition-badge ${getConditionClass(road.condition)}`;
  els.dtPriority.textContent = road.priority + ' Priority';
  els.dtPriority.className = `badge priority-badge ${getConditionClass(road.condition)}`; // just reuse color logic

  // Health Gauge
  animateValue(els.dtHealthScore, 0, road.healthScore, 1000);
  const color = getConditionColor(road.condition);
  setTimeout(() => {
    els.healthGaugeRing.style.background = `conic-gradient(${color} ${road.healthScore}%, var(--bg-secondary) 0%)`;
  }, 100);

  // Authority
  els.dtDept.textContent = road.authority.department;
  els.dtOfficer.textContent = `${road.authority.officer} (${road.authority.division})`;
  els.dtContact.textContent = road.authority.contact;
  els.dtOwnership.textContent = road.government.ownership;
  els.dtScheme.textContent = road.government.scheme;
  els.dtScheme.className = `badge scheme-badge ${getConditionClass(road.condition)}`;

  // Financials
  els.dtTotalBudget.textContent = road.financials.totalBudget;
  els.dtUtilizedBudget.textContent = road.financials.utilizedBudget;
  els.dtContractor.textContent = road.financials.contractor;
  els.dtBudgetPct.textContent = `${road.financials.utilizedPercentage}% Utilized`;
  
  setTimeout(() => {
    els.dtBudgetBar.style.width = `${road.financials.utilizedPercentage}%`;
    els.dtBudgetBar.style.background = color;
  }, 100);

  // Progress
  els.dtTimelineStatus.textContent = road.timeline.status;
  els.dtDaysRemaining.textContent = road.timeline.daysRemaining;
  els.dtStartDate.textContent = road.timeline.startDate;
  els.dtEstDate.textContent = road.timeline.estimatedCompletion;

  setTimeout(() => {
    els.dtProgressBar.style.width = `${road.projectProgress.completed}%`;
    els.dtProgressBar.style.background = road.projectProgress.completed === 100 ? 'var(--color-green)' : color;
  }, 100);

  // Reports
  animateValue(els.dtRepTotal, 0, road.citizenReports.total, 800);
  animateValue(els.dtRepOpen, 0, road.citizenReports.open, 800);
  animateValue(els.dtRepResolved, 0, road.citizenReports.resolved, 800);

  // Maintenance Timeline
  els.dtMaintenanceList.innerHTML = road.maintenance.map(m => `
    <div class="timeline-item">
      <div class="t-date">${m.date}</div>
      <div class="t-title">${m.type}</div>
      <div class="t-desc">Cost: ${m.cost} • Duration: ${m.duration}</div>
    </div>
  `).join('');
}

// Boot
document.addEventListener('DOMContentLoaded', init);
