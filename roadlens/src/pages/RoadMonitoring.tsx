import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Clock, ActivitySquare, AlertCircle, RefreshCcw, Image as ImageIcon, CheckCircle, Users, Move } from 'lucide-react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useLocation as useAppLocation } from '../contexts/LocationContext';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './RoadMonitoring.css';

const issueTypesList = ['Potholes', 'Drainage Damage', 'Surface Damage', 'Traffic Signal Failure', 'Road Cracks', 'Utility Work Damage'];
const authoritiesList = ['Chennai Corporation', 'Highways Department', 'Traffic Police', 'Metro Water Board', 'TNEB'];

const generateHierarchicalCluster = (zone: string, baseLat: number, baseLng: number, sizes: number[], refreshId = 0) => {
  const points: any[] = [];
  sizes.forEach((size, clusterIndex) => {
    const clusterLat = baseLat + (clusterIndex - sizes.length/2) * 0.02;
    const clusterLng = baseLng - (clusterIndex * 0.01) - 0.005; // Force inland
    
    for (let i = 0; i < size; i++) {
      const latOffset = (i - size/2) * 0.001;
      const lngOffset = (i - size/2) * 0.001;
      
      const rand = Math.random();
      const severity = rand > 0.75 ? 'critical' : rand > 0.5 ? 'moderate' : rand > 0.25 ? 'minor' : 'in-progress';
      const issueType = issueTypesList[Math.floor(Math.random() * issueTypesList.length)];
      const assignedAuthority = authoritiesList[Math.floor(Math.random() * authoritiesList.length)];

      points.push({
        id: `${zone}-${clusterIndex}-${i}-${refreshId}`,
        position: [clusterLat + latOffset, clusterLng + lngOffset] as [number, number],
        severity,
        issueType,
        assignedAuthority,
        hasImage: Math.random() > 0.5,
        description: `Reported issue concerning ${issueType.toLowerCase()} along the stretch of ${zone} Main Road. Inspection team has been notified.`,
        roadName: `${zone} Main Road`,
        zone: zone,
        status: severity === 'critical' ? 'Pending' : severity === 'moderate' ? 'Under Review' : severity === 'in-progress' ? 'In Progress' : 'Resolved',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toLocaleString(),
        complaints: Math.floor(Math.random() * 20) + 1,
        time: Math.floor(Math.random() * 59) + 1 + ' mins ago',
        animate: false
      });
    }
  });
  return points;
};

const generateInitialMarkers = (refreshId = 0) => [
  ...generateHierarchicalCluster('OMR', 12.9200, 80.2300, [8, 6, 4, 2], refreshId),
  ...generateHierarchicalCluster('Velachery', 12.9815, 80.2223, [5, 4, 3], refreshId),
  ...generateHierarchicalCluster('Tambaram', 12.9249, 80.1000, [6, 4, 2], refreshId),
  ...generateHierarchicalCluster('T Nagar', 13.0418, 80.2330, [4, 3, 2], refreshId),
  ...generateHierarchicalCluster('Anna Nagar', 13.0850, 80.2100, [5, 5], refreshId),
  ...generateHierarchicalCluster('Adyar', 13.0033, 80.2550, [3, 2, 1], refreshId),
  ...generateHierarchicalCluster('Perungudi', 12.9654, 80.2461, [4, 3], refreshId),
  ...generateHierarchicalCluster('Porur', 13.0336, 80.1557, [3, 2], refreshId),
].sort((a, b) => parseInt(a.time) - parseInt(b.time));

// --- Custom Icons ---
const getSeverityColor = (severity: string) => {
  if (severity === 'critical') return ['#EF4444', '#B91C1C']; 
  if (severity === 'moderate') return ['#F59E0B', '#B45309']; 
  if (severity === 'in-progress') return ['#6B7280', '#374151']; 
  return ['#22C55E', '#15803D']; 
};

const createMarkerIcon = (severity: string, complaints: number) => {
  const color = getSeverityColor(severity);
  return L.divIcon({
    className: 'custom-single-marker-wrapper',
    html: `
      <div style="display: flex; align-items: center; gap: 2px; position: relative;">
        <div class="single-marker-pin" style="background: linear-gradient(135deg, ${color[0]}, ${color[1]}); position: relative; z-index: 2;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div class="marker-complaint-badge" style="border-color: ${color[0]}; position: relative; z-index: 1;">${complaints}</div>
      </div>
    `,
    iconSize: [60, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const createClusterCustomIcon = function (cluster: any) {
  const markers = cluster.getAllChildMarkers();
  let hasCritical = false;
  let hasModerate = false;
  let hasInProgress = false;

  markers.forEach((marker: any) => {
    const severity = marker.options.alt;
    if (severity === 'critical') hasCritical = true;
    if (severity === 'moderate') hasModerate = true;
    if (severity === 'in-progress') hasInProgress = true;
  });

  const clusterColor = hasCritical ? ['#EF4444', '#B91C1C'] : hasModerate ? ['#F59E0B', '#B45309'] : hasInProgress ? ['#6B7280', '#374151'] : ['#22C55E', '#15803D'];
  
  let aggregatedCount = 0;
  markers.forEach((marker: any) => {
    aggregatedCount += (marker.options.complaints || 1);
  });

  return L.divIcon({
    html: `
      <div style="display: flex; align-items: center; gap: 2px; position: relative;">
        <div class="single-marker-pin" style="background: linear-gradient(135deg, ${clusterColor[0]}, ${clusterColor[1]}); z-index: 2; position: relative;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div class="marker-complaint-badge" style="border-color: ${clusterColor[0]}; z-index: 1;">
          ${aggregatedCount}
        </div>
      </div>
    `,
    className: 'custom-single-marker-wrapper custom-cluster-wrapper',
    iconSize: L.point(64, 32, true),
    iconAnchor: L.point(16, 32, true),
  });
};



const MapController = ({ resetTrigger, activeReportId, reports, markerRefs }: any) => {
  const map = useMap();
  useEffect(() => {
    if (resetTrigger) {
      map.setView([13.0827, 80.2707], 11, { animate: true, duration: 1 });
    }
  }, [resetTrigger, map]);

  useEffect(() => {
    if (activeReportId) {
      const target = reports.find((r: any) => r.id === activeReportId);
      if (target) {
        // Zoom to 18 to guarantee disableClusteringAtZoom is triggered, bypassing MarkerClusterGroup interception
        map.flyTo(target.position, 18, { duration: 1.5, animate: true });
        
        setTimeout(() => {
          if (markerRefs.current[activeReportId]) {
            const marker = markerRefs.current[activeReportId];
            
            // Force leaflet marker cluster group to unspiderfy if needed and open popup natively
            if (marker.__parent && marker.__parent.zoomToShowLayer) {
              marker.__parent.zoomToShowLayer(marker, () => marker.openPopup());
            } else {
              marker.openPopup();
            }
            
            // Add pulse animation
            const el = marker.getElement();
            if (el) {
              el.classList.add('pulse-animation');
              setTimeout(() => el.classList.remove('pulse-animation'), 3000);
            }
          }
        }, 1600);
      }
    }
  }, [activeReportId, reports, map, markerRefs]);
  return null;
};

const MapInteractionController = ({ isDragMode }: { isDragMode: boolean }) => {
  const map = useMap();
  useEffect(() => {
    if (isDragMode) {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.getContainer().style.cursor = 'grab';
    } else {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.getContainer().style.cursor = 'default';
    }
  }, [isDragMode, map]);

  // Allow CTRL+scroll to zoom even when drag mode is off
  useEffect(() => {
    const container = map.getContainer();
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1 : -1;
        map.setZoom(map.getZoom() + delta);
      }
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [map]);

  return null;
};

const LocationController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    map.flyTo(center, 13, { duration: 1.5, animate: true });
  }, [center, map]);
  return null;
};

export const RoadMonitoring: React.FC = () => {
  const [reports, setReports] = useState(generateInitialMarkers());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const { locationName, locationCoords } = useAppLocation();
  const markerRefs = useRef<{[key: string]: L.Marker}>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const issueTypes = ['Pothole Reported', 'Streetlight Broken', 'Water Logging', 'Debris on Road', 'Traffic Signal Failure'];
      const locations = ['OMR', 'Anna Salai', 'Velachery', 'T Nagar', 'Tambaram', 'Perungudi'];
      
      const randIssue = issueTypes[Math.floor(Math.random() * issueTypes.length)];
      const randLoc = locations[Math.floor(Math.random() * locations.length)];
      const randSev = Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'moderate' : Math.random() > 0.2 ? 'minor' : 'in-progress';
      const status = randSev === 'critical' ? 'Pending' : randSev === 'moderate' ? 'Under Review' : randSev === 'in-progress' ? 'In Progress' : 'Resolved';
      
      const baseLat = randLoc === 'OMR' ? 12.92 : randLoc === 'Velachery' ? 12.98 : randLoc === 'Tambaram' ? 12.92 : randLoc === 'T Nagar' ? 13.04 : randLoc === 'Anna Salai' ? 13.06 : 12.96;
      const baseLng = randLoc === 'OMR' ? 80.23 : randLoc === 'Velachery' ? 80.22 : randLoc === 'Tambaram' ? 80.10 : randLoc === 'T Nagar' ? 80.23 : randLoc === 'Anna Salai' ? 80.25 : 80.24;

      const newReport = {
        id: `live-${Date.now()}`,
        position: [baseLat + (Math.random() - 0.5) * 0.005, baseLng - Math.random() * 0.005] as [number, number],
        severity: randSev,
        issueType: randIssue,
        assignedAuthority: 'Chennai Corporation',
        hasImage: true,
        description: `New live report concerning ${randIssue.toLowerCase()} along ${randLoc}.`,
        roadName: `${randLoc} Main Road`,
        zone: randLoc,
        status: status,
        timestamp: new Date().toLocaleString(),
        complaints: 1,
        time: 'Just now',
        animate: true
      };
      
      setReports(prev => [newReport, ...prev]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setReports(generateInitialMarkers(Date.now()));
      setIsRefreshing(false);
    }, 1200);
  };

  const memoizedMarkers = useMemo(() => {
    return reports.map((marker) => (
          <Marker 
            key={marker.id} 
            position={marker.position} 
            icon={createMarkerIcon(marker.severity, marker.complaints)}
            alt={marker.severity} 
            ref={(el) => {
              if (el) markerRefs.current[marker.id] = el;
            }}
            {...({ complaints: marker.complaints } as any)}
          >
            <Popup className="professional-popup" maxWidth={320} minWidth={280}>
              <div className={`popup-card theme-${marker.severity === 'critical' ? 'red' : marker.severity === 'moderate' ? 'yellow' : 'green'}`}>
                <div className="popup-theme-header">
                  <h4 className="popup-issue-title">{marker.issueType}</h4>
                  <span className="popup-severity-badge">{marker.severity === 'critical' ? 'Critical' : marker.severity === 'moderate' ? 'Moderate' : 'Resolved'}</span>
                </div>
                
                <div className="popup-content-body">
                  <div className="popup-info-row">
                    <span className="info-label">Report ID:</span>
                    <span className="info-value font-mono">#{marker.id.split('-')[1] || Date.now().toString().slice(-4)}928</span>
                  </div>
                  <div className="popup-info-row">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{marker.roadName}, {marker.zone}</span>
                  </div>
                  <div className="popup-info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value status-text">{marker.status}</span>
                  </div>
                  <div className="popup-info-row">
                    <span className="info-label">Authority:</span>
                    <span className="info-value truncate">{marker.assignedAuthority}</span>
                  </div>
                  <div className="popup-info-row">
                    <span className="info-label">Reported:</span>
                    <span className="info-value">{marker.timestamp.split(',')[0]}</span>
                  </div>
                  
                  <div className="popup-description-box">
                    <span className="info-label">Description:</span>
                    <p>{marker.description}</p>
                  </div>
                  
                  {marker.hasImage && (
                    <div className="popup-image-preview">
                      <ImageIcon size={20} className="preview-icon" />
                      <span>Image Attached</span>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
    ));
  }, [reports]);

  return (
        <div className="monitoring-page animate-fade-in">
      <div className="page-header">
        <h2 className="page-section-title">Road Monitoring</h2>
        <p className="page-section-subtitle">Monitor reported road issues across Chennai in real time. <strong style={{ color: '#0ea5e9' }}>{locationName}</strong></p>
      </div>

      {/* Top Section: Road Status Overview */}
      <div className="status-overview-grid" style={{ marginBottom: '24px' }}>
        <div className="summary-card glass-panel flex-col gap-2" style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="text-sm text-secondary font-semibold">Critical Roads</div>
          <div className="flex align-center gap-3">
            <span className="status-indicator bg-red"></span>
            <span className="text-3xl font-bold">14</span>
            <span className="text-xs text-red font-semibold bg-red-light px-2 py-1 rounded">+12%</span>
          </div>
          <div className="text-xs text-secondary mt-1">High Risk</div>
        </div>

        <div className="summary-card glass-panel flex-col gap-2" style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="text-sm text-secondary font-semibold">Moderate Roads</div>
          <div className="flex align-center gap-3">
            <span className="status-indicator bg-orange"></span>
            <span className="text-3xl font-bold">42</span>
          </div>
          <div className="text-xs text-secondary mt-1">Needs Attention</div>
        </div>

        <div className="summary-card glass-panel flex-col gap-2" style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="text-sm text-secondary font-semibold">Safe Roads</div>
          <div className="flex align-center gap-3">
            <span className="status-indicator bg-green"></span>
            <span className="text-3xl font-bold">128</span>
          </div>
          <div className="text-xs text-secondary mt-1">Good Condition</div>
        </div>

        <div className="summary-card glass-panel flex-col gap-2" style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="text-sm text-secondary font-semibold">Total Reports</div>
          <div className="flex align-center gap-3">
            <ActivitySquare size={24} className="text-blue" />
            <span className="text-3xl font-bold">184</span>
          </div>
          <div className="text-xs text-secondary mt-1">All monitored zones</div>
        </div>

        <div className="summary-card glass-panel flex-col gap-2" style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="text-sm text-secondary font-semibold">Resolution Rate</div>
          <div className="flex align-center gap-3">
            <CheckCircle size={24} className="text-green" />
            <span className="text-3xl font-bold">82%</span>
          </div>
          <div className="text-xs text-secondary mt-1">Rolling 7 days</div>
        </div>
      </div>

      <div className="monitoring-layout">
        
        {/* Main Map - Left Grid */}
        <div className="monitoring-map-wrapper relative flex-col" style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Toolbar & Legend Layer */}
          <div className="map-overlay-layer" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, pointerEvents: 'none', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Live Legend Only */}
            <div className="map-legend glass-panel" style={{ pointerEvents: 'auto', display: 'flex', gap: '16px', padding: '12px 20px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.95)', width: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div className="legend-item flex align-center gap-2">
                <span className="status-indicator bg-red"></span>
                <span className="text-sm font-semibold">Critical ({reports.filter(m => m.severity === 'critical').length})</span>
              </div>
              <div className="legend-item flex align-center gap-2">
                <span className="status-indicator bg-orange"></span>
                <span className="text-sm font-semibold">Moderate ({reports.filter(m => m.severity === 'moderate').length})</span>
              </div>
              <div className="legend-item flex align-center gap-2">
                <span className="status-indicator bg-green"></span>
                <span className="text-sm font-semibold">Resolved ({reports.filter(m => m.severity !== 'critical' && m.severity !== 'moderate').length})</span>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1rem', display: 'flex', gap: '12px', zIndex: 1000 }}>
            <button 
              className="bg-white rounded-lg px-4 py-2 shadow-md flex items-center gap-2 text-sm font-semibold hover:bg-gray-50 transition-colors"
              style={{ backgroundColor: 'white', borderRadius: '8px', padding: '0.5rem 1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border-color)' }}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCcw size={16} className={isRefreshing ? "animate-spin text-blue" : "text-blue"} />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </button>
            <button 
              className="bg-white rounded-lg px-4 py-2 shadow-md flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ backgroundColor: isDragMode ? '#eff6ff' : 'white', color: isDragMode ? '#3b82f6' : '#1e293b', borderRadius: '8px', padding: '0.5rem 1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: `1px solid ${isDragMode ? '#bfdbfe' : 'var(--border-color)'}` }}
              onClick={() => setIsDragMode(!isDragMode)}
              title="Enable Drag Navigation"
            >
              <Move size={16} />
              Drag Mode
            </button>
          </div>

          <MapContainer 
            center={locationCoords} 
            zoom={13} 
            scrollWheelZoom={false}
            className="monitoring-map"
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
            preferCanvas={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">Carto</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapController resetTrigger={isRefreshing} activeReportId={activeReportId} reports={reports} markerRefs={markerRefs} />
            <MapInteractionController isDragMode={isDragMode} />
            <LocationController center={locationCoords} />
            <ZoomControl position="bottomright" />
            
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              maxClusterRadius={40}
              spiderfyOnMaxZoom={true}
              showCoverageOnHover={false}
              zoomToBoundsOnClick={true}
              disableClusteringAtZoom={16}
            >
              {memoizedMarkers}
            </MarkerClusterGroup>
          </MapContainer>
        </div>

        {/* Right Sidebar - 4 columns wide */}
        <div className="monitoring-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-panel p-4">
            <h3 className="font-semibold text-lg mb-4 flex align-center gap-2">
              <ActivitySquare size={18} className="text-red" /> Critical Roads Live Feed
            </h3>
            <div className="live-feed-list overflow-hidden">
              {reports.slice(0, 5).map((feed) => (
                <div key={feed.id} className={`feed-item border-b pb-3 mb-3 last:border-0 last:mb-0 last:pb-0 ${feed.animate ? 'animate-slide-in' : ''} cursor-pointer hover:bg-gray-50`} onClick={() => setActiveReportId(feed.id)}>
                  <div className="flex justify-between align-start mb-1">
                    <div className="flex align-center gap-2">
                      <span className={`status-indicator bg-${feed.severity === 'critical' ? 'red' : feed.severity === 'moderate' ? 'orange' : feed.severity === 'minor' ? 'green' : 'slate-600'}`}></span>
                      <span className="font-semibold text-sm">{feed.issueType}</span>
                    </div>
                    <span className={`badge ${feed.severity === 'critical' ? 'bg-red-light text-red' : feed.severity === 'moderate' ? 'bg-orange-light text-orange' : feed.severity === 'minor' ? 'bg-green-light text-green' : 'bg-gray-200 text-gray-700'}`}>
                      {feed.status}
                    </span>
                  </div>
                  <div className="text-xs text-secondary flex justify-between ml-5">
                    <span>{feed.roadName}</span>
                    <span className="flex align-center gap-1"><Clock size={10} /> {feed.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 shadow-md border bg-white flex flex-col" style={{ height: 'auto', minHeight: '420px', overflow: 'visible' }}>
            <h3 className="font-semibold text-lg flex align-center gap-2 mb-4">
              <AlertCircle size={18} className="text-blue" /> Road Progress Tracker
            </h3>
            
            <div className="flex justify-center items-center">
              <div style={{ width: '260px', height: '260px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: 78, fill: '#10b981' },
                        { name: 'In Progress', value: 15, fill: '#475569' },
                        { name: 'Delayed', value: 7, fill: '#ef4444' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={95}
                      outerRadius={115}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: '48px', fontWeight: 800, color: '#1E293B', lineHeight: 1 }}>78%</div>
                  <div style={{ fontSize: '16px', fontWeight: 500, color: '#64748B', whiteSpace: 'nowrap', marginTop: '10px' }}>Road Completion</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full" style={{ marginTop: '20px', gap: '10px' }}>
              <div className="flex justify-between align-center font-semibold" style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '12px' }}>
                <span className="flex align-center gap-2 text-sm text-gray-700">🟢 Completed Roads</span>
                <span className="font-bold text-gray-900">542</span>
              </div>
              <div className="flex justify-between align-center font-semibold" style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '12px' }}>
                <span className="flex align-center gap-2 text-sm text-gray-700">⚫ In Progress Roads</span>
                <span className="font-bold text-gray-900">187</span>
              </div>
              <div className="flex justify-between align-center font-semibold" style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '12px' }}>
                <span className="flex align-center gap-2 text-sm text-gray-700">🔴 Delayed Roads</span>
                <span className="font-bold text-gray-900">63</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 shadow-md border bg-white flex flex-col" style={{ height: 'auto' }}>
            <h3 className="font-semibold text-lg flex align-center gap-2 mb-4">
              <Users size={18} className="text-purple-500" /> Authority Activity Feed
            </h3>
            <div className="activity-timeline overflow-y-auto pr-2" style={{ display: 'flex', flexDirection: 'column', maxHeight: '300px' }}>
              {reports.slice(0, 10).map((activity) => {
                const colorMap = activity.severity === 'critical' ? 'red' : activity.severity === 'moderate' ? 'orange' : activity.severity === 'minor' ? 'green' : 'blue';
                const colorCode = colorMap === 'red' ? '#ef4444' : colorMap === 'orange' ? '#f59e0b' : colorMap === 'green' ? '#10b981' : '#3b82f6';
                const titleMap = activity.severity === 'critical' ? 'New Critical Report' : activity.severity === 'moderate' ? 'Repair Started' : activity.severity === 'minor' ? 'Repair Completed' : 'Team Assigned';
                const iconMap = activity.severity === 'critical' ? '🟥' : activity.severity === 'moderate' ? '🟧' : activity.severity === 'minor' ? '🟩' : '🟦';
                
                return (
                  <div key={activity.id} className={`timeline-item mb-3 last:mb-0 cursor-pointer transition-transform hover:translate-x-1 ${activity.animate ? 'animate-slide-in' : ''}`} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderLeft: `4px solid ${colorCode}`, borderRadius: '8px', padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} onClick={() => setActiveReportId(activity.id)}>
                    <div className="flex align-start gap-3">
                      <div className="timeline-icon flex justify-center align-center" style={{ fontSize: '16px', marginTop: '2px' }}>{iconMap}</div>
                      <div className="flex-col w-full">
                        <div className="flex justify-between align-start w-full mb-1">
                          <span className="font-semibold text-sm">{titleMap}</span>
                          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">{activity.time}</span>
                        </div>
                        <span className="text-xs text-secondary block">{activity.roadName}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Area Cards Section */}
      <div className="area-cards-section">
        <div className="summary-card glass-panel flex-col justify-center" style={{ padding: '24px', height: '100%', display: 'flex' }}>
          <div className="text-sm text-secondary font-semibold" style={{ marginBottom: '20px' }}>High Severity Areas</div>
          <div className="flex flex-wrap" style={{ gap: '12px' }}>
            <span className="bg-red-light text-red font-medium" style={{ padding: '10px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>🔴 OMR</span>
            <span className="bg-red-light text-red font-medium" style={{ padding: '10px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>🔴 Tambaram</span>
            <span className="bg-red-light text-red font-medium" style={{ padding: '10px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>🔴 Velachery</span>
          </div>
        </div>

        <div className="summary-card glass-panel flex-col justify-center" style={{ padding: '24px', height: '100%', display: 'flex' }}>
          <div className="text-sm text-secondary font-semibold" style={{ marginBottom: '20px' }}>Best Performing Areas</div>
          <div className="flex flex-wrap" style={{ gap: '12px' }}>
            <span className="bg-green-light text-green font-medium" style={{ padding: '10px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>🟢 Adyar</span>
            <span className="bg-green-light text-green font-medium" style={{ padding: '10px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>🟢 Anna Nagar</span>
            <span className="bg-green-light text-green font-medium" style={{ padding: '10px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>🟢 T Nagar</span>
          </div>
        </div>
      </div>

      {/* Recent Road Reports Timeline */}
      <div className="timeline-section glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
          <Clock size={18} color="#3b82f6" /> Recent Road Reports Timeline
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
          {reports.slice(0, 10).map((report) => {
            const isCritical = report.severity === 'critical';
            const isModerate = report.severity === 'moderate';
            const isMinor = report.severity === 'minor';
            const accentColor = isCritical ? '#ef4444' : isModerate ? '#f59e0b' : isMinor ? '#10b981' : '#3b82f6';
            const iconEmoji = isCritical ? '🔴' : isModerate ? '🟠' : isMinor ? '🟢' : '🔵';
            const statusLabel = isCritical ? 'Pending Review' : isModerate ? 'Under Inspection' : isMinor ? 'Resolved' : 'In Progress';
            const badgeBg = isCritical ? '#fee2e2' : isModerate ? '#fef3c7' : isMinor ? '#dcfce7' : '#dbeafe';
            const badgeColor = isCritical ? '#dc2626' : isModerate ? '#b45309' : isMinor ? '#15803d' : '#1d4ed8';

            return (
              <div
                key={report.id}
                onClick={() => setActiveReportId(report.id)}
                className="timeline-row-card"
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderLeft: `4px solid ${accentColor}`,
                  borderRadius: '10px',
                  padding: '16px 16px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.09)';
                  el.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                {/* Title row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{ fontSize: '15px', lineHeight: 1 }}>{iconEmoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>{report.issueType}</span>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 9px', borderRadius: '999px', background: badgeBg, color: badgeColor, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '8px' }}>
                    {statusLabel}
                  </span>
                </div>

                {/* Location row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>{report.roadName}</span>
                </div>

                {/* Time row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 500 }}>{report.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
