import React, { useState } from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { 
  FileText, 
  MapPin, 
  Clock, 
  Wrench, 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronDown, 
  X,
  Gauge,
  ArrowUpDown,
  Download,
  Eye,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import ReportDashboard from './ReportDashboard';
import WorkflowTimeline from './WorkflowTimeline';

// Preloaded mock database reports for an active, mature look
const seedReports = [
  {
    id: 'REP-7822',
    severityScore: '8.4',
    damageType: 'potholes',
    riskLevel: 'High',
    location: 'Trichy Rd, Coimbatore North, Tamil Nadu',
    summary: 'A dense cluster of deep potholes is deteriorating the primary asphalt surface, creating severe road hazards.',
    recommendedAction: 'Immediate patch repairs and milling.',
    authority: 'Coimbatore City Municipal Corporation (CMC)',
    confidenceScore: '96',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    status: 'Dispatched'
  },
  {
    id: 'REP-7809',
    severityScore: '5.2',
    damageType: 'transverse cracks',
    riskLevel: 'Medium',
    location: 'Avinashi Rd, Peelamedu, Tamil Nadu',
    summary: 'Transverse cracking observed across the outer lanes, indicating initial thermal stresses and loading strain.',
    recommendedAction: 'Seal joints with asphalt emulsion.',
    authority: 'Coimbatore City Municipal Corporation (CMC)',
    confidenceScore: '89',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    status: 'Resolved'
  },
  {
    id: 'REP-7798',
    severityScore: '7.8',
    damageType: 'alligator cracking',
    riskLevel: 'High',
    location: 'Mettupalayam Rd, Coimbatore, Tamil Nadu',
    summary: 'Alligator cracking clusters forming near the drainage edge, pointing to structural base fatigue and moisture seepage.',
    recommendedAction: 'Partial depth reclamation and overlay.',
    authority: 'Tamil Nadu Highways Department',
    confidenceScore: '92',
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    status: 'Under Review'
  }
];

export default function ReportsTab() {
  const storeReports = useWorkflowStore((state) => state.reportsHistory);
  const setActiveTab = useWorkflowStore((state) => state.setActiveTab);

  // Combine user reports and seed reports
  const allReports = [...storeReports.map(r => ({ ...r, status: r.status || 'Pending' })), ...seedReports];

  // Filters state
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All'); // 'All' | 'High' | 'Medium' | 'Low'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Under Review' | 'Dispatched' | 'Resolved'
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'severity'

  // Modals state
  const [activeBriefingReport, setActiveBriefingReport] = useState(null);
  const [activeTimelineReport, setActiveTimelineReport] = useState(null);

  // Filter & Sort Logic
  const filteredReports = allReports
    .filter((report) => {
      const query = search.toLowerCase();
      const matchesSearch = 
        report.id.toLowerCase().includes(query) ||
        report.location.toLowerCase().includes(query) ||
        report.damageType.toLowerCase().includes(query);

      const matchesSeverity = 
        severityFilter === 'All' ||
        (severityFilter === 'High' && parseFloat(report.severityScore) >= 7.0) ||
        (severityFilter === 'Medium' && parseFloat(report.severityScore) >= 4.5 && parseFloat(report.severityScore) < 7.0) ||
        (severityFilter === 'Low' && parseFloat(report.severityScore) < 4.5);

      const matchesStatus = 
        statusFilter === 'All' || 
        report.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesSeverity && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'severity') {
        return parseFloat(b.severityScore) - parseFloat(a.severityScore);
      }
      return new Date(b.timestamp) - new Date(a.timestamp); // latest
    });

  // Severity color helpers
  const getSeverityBadgeClass = (score) => {
    const s = parseFloat(score);
    if (s >= 7.0) return 'bg-red-50 text-red-600 border border-red-100';
    if (s >= 4.5) return 'bg-amber-50 text-amber-600 border border-amber-100';
    return 'bg-sky-50 text-brand-dark border border-brand-light/30';
  };

  const getStatusBadgeClass = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'resolved') return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    if (s === 'dispatched') return 'bg-purple-50 text-purple-700 border border-purple-100';
    if (s === 'under review') return 'bg-amber-50 text-amber-700 border border-amber-100';
    return 'bg-slate-50 text-slate-600 border border-slate-200';
  };

  const handleDownloadReport = (report) => {
    const reportText = `ROADLENS AI - INFRASTRUCTURE REPORT\n` +
      `-----------------------------------------\n` +
      `ID: ${report.id}\n` +
      `Date: ${new Date(report.timestamp).toLocaleString()}\n` +
      `Location: ${report.location}\n` +
      `Damage Type: ${report.damageType}\n` +
      `Severity: ${report.severityScore}/10\n` +
      `Risk Level: ${report.riskLevel}\n` +
      `AI Confidence: ${report.confidenceScore}%\n` +
      `Assigned Authority: ${report.authority}\n` +
      `Recommended Action: ${report.recommendedAction}\n` +
      `Dispatch Status: ${report.status}\n` +
      `-----------------------------------------\n` +
      `Municipal Infrastructure Node Verified.\n`;
    
    const element = document.createElement("a");
    const file = new Blob([reportText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `RoadLens_Report_${report.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 custom-scrollbar">
      <div className="max-w-[1000px] mx-auto pb-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-brand-dark font-semibold tracking-wider leading-none mb-1.5">AI ARCHIVE DATABASE</span>
            <h3 className="text-[32px] md:text-[40px] font-extrabold text-primaryText tracking-tight leading-tight mb-1">My Reports</h3>
            <p className="text-[15px] text-slate-600 leading-relaxed font-normal">Inspect, search, and manage localized road damage dispatches and authority receipts.</p>
          </div>
          
          <button
            onClick={() => setActiveTab('chatbot')}
            className="self-start md:self-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-light to-brand-dark text-white font-bold text-[14px] shadow-sm hover:shadow-md hover:shadow-brand-light/15 transition-all outline-none"
          >
            Create New Report
          </button>
        </div>

        {/* Database Filters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
          {/* Search Box */}
          <div className="md:col-span-5 relative flex items-center">
            <Search className="w-4 h-4 text-mutedText absolute left-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, city, or damage type..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-dark text-[13px] font-medium text-primaryText outline-none transition-all"
            />
          </div>

          {/* Filters Selectors */}
          <div className="md:col-span-7 flex flex-wrap gap-2.5 items-center md:justify-end">
            {/* Severity Filter */}
            <div className="relative">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-semibold text-slate-700 focus:bg-white outline-none cursor-pointer"
              >
                <option value="All">All Severities</option>
                <option value="High">High (7.0+)</option>
                <option value="Medium">Medium (4.5 - 6.9)</option>
                <option value="Low">Low (&lt; 4.5)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-mutedText absolute right-3 pointer-events-none top-1/2 -translate-y-1/2" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-semibold text-slate-700 focus:bg-white outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Resolved">Resolved</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-mutedText absolute right-3 pointer-events-none top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy(sortBy === 'latest' ? 'severity' : 'latest')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-100/50 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-mutedText" />
              <span>Sort: {sortBy === 'latest' ? 'Latest' : 'Severity'}</span>
            </button>
          </div>
        </div>

        {/* Database List */}
        {filteredReports.length === 0 ? (
          <div className="w-full rounded-[28px] border border-dashed border-slate-200/80 bg-white p-12 text-center flex flex-col items-center justify-center gap-4">
            <SlidersHorizontal className="w-8 h-8 text-mutedText" />
            <h4 className="font-bold text-sm text-primaryText">No reports match your filters</h4>
            <p className="text-xs text-secondaryText max-w-[280px]">Try adjusting your search queries or dropdown selections.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="w-full p-8 rounded-[24px] bg-white border border-slate-100 hover:border-brand-light/30 shadow-sm hover:shadow-md hover:shadow-brand-light/5 flex flex-col md:flex-row gap-5 items-stretch transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual hover border glow line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-light to-brand-dark opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Left Section (Severity & Identifiers) */}
                <div className="md:w-1/4 flex flex-col justify-between gap-3 border-r border-slate-100/60 pr-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-[13px] font-bold px-3 py-1.5 rounded-lg ${getSeverityBadgeClass(report.severityScore)}`}>
                      {report.severityScore}
                    </span>
                    <span className="text-[14px] font-bold text-slate-900 flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-brand-dark" />
                      {report.id}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-slate-900 capitalize">{report.damageType}</span>
                    <span className="text-[13px] text-slate-655 font-semibold flex items-center gap-1 mt-1 leading-normal">
                      <MapPin className="w-3.5 h-3.5 text-mutedText" />
                      <span className="truncate max-w-[150px]">{report.location}</span>
                    </span>
                  </div>
                </div>

                {/* Center Section (Briefings & SLA) */}
                <div className="flex-1 flex flex-col justify-between gap-3 px-2">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">AI BRIEFING PREVIEW</span>
                    <p className="text-[15px] text-slate-700 leading-relaxed font-normal line-clamp-2">{report.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 pt-2 border-t border-slate-50 text-[13px]">
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-medium">REPAIR SUGGESTION</span>
                      <span className="font-bold text-slate-900 truncate max-w-[120px]">{report.recommendedAction}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-medium">CIVIC AUTHORITY</span>
                      <span className="font-bold text-brand-dark truncate max-w-[140px]">{report.authority}</span>
                    </div>
                    <div className="hidden md:flex flex-col">
                      <span className="text-slate-500 font-medium">LOGGED TIMESTAMP</span>
                      <span className="font-bold text-slate-600">{new Date(report.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section (Status & Action Triggers) */}
                <div className="md:w-1/4 flex md:flex-col justify-between md:items-end gap-3.5 pl-2 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                  <span className={`text-[13px] font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider ${getStatusBadgeClass(report.status)}`}>
                    {report.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveBriefingReport(report)}
                      title="View Report Briefing"
                      className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 text-secondaryText hover:text-primaryText transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDownloadReport(report)}
                      title="Download Text Report"
                      className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 text-secondaryText hover:text-primaryText transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveTimelineReport(report)}
                      title="View Workflow Timeline"
                      className="p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 text-secondaryText hover:text-primaryText transition-all"
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* OVERLAY MODAL 1: REPORT BRIEFING OVERLAY */}
      {activeBriefingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setActiveBriefingReport(null)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-6 z-10 glass-panel max-h-[85vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setActiveBriefingReport(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-secondaryText hover:text-primaryText transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-4">
              <ReportDashboard data={activeBriefingReport} isCollapsed={false} />
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY MODAL 2: WORKFLOW TIMELINE OVERLAY */}
      {activeTimelineReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setActiveTimelineReport(null)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl p-6 z-10 glass-panel">
            <button 
              onClick={() => setActiveTimelineReport(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-secondaryText hover:text-primaryText transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="pt-4 flex flex-col gap-6">
              <div className="text-center">
                <span className="text-[10px] font-extrabold text-brand-dark uppercase tracking-wider">TIMELINE LOGS • {activeTimelineReport.id}</span>
                <h4 className="text-sm font-bold text-primaryText mt-1">Incident Dispatch Timeline History</h4>
              </div>
              
              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex items-center justify-between text-xs text-secondaryText">
                <span>Dispatch Status: <strong>{activeTimelineReport.status}</strong></span>
                <span>Jurisdiction: <strong>CMC Node</strong></span>
              </div>

              {/* Render visual timeline in completed final state */}
              <WorkflowTimeline isCollapsed={false} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
