import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { reverseGeocode } from '../lib/locationService';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Map, 
  Keyboard, 
  X, 
  ChevronRight, 
  Navigation,
  Globe,
  Loader2,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';

// Custom Map zoom handler to allow clean premium zoom buttons
function ZoomController({ triggerZoomIn, triggerZoomOut }) {
  const map = useMap();
  
  useEffect(() => {
    if (triggerZoomIn) {
      map.zoomIn();
    }
  }, [triggerZoomIn]);

  useEffect(() => {
    if (triggerZoomOut) {
      map.zoomOut();
    }
  }, [triggerZoomOut]);

  return null;
}

// Invalidate size to trigger full rendering when modal transitions
function MapResizeTrigger() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// Click to re-position marker
function MapClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
}

export default function LocationModal() {
  const isOpen = useWorkflowStore((state) => state.isLocationModalOpen);
  const setOpen = useWorkflowStore((state) => state.setLocationModalOpen);
  const onResolved = useWorkflowStore((state) => state.onLocationResolvedCallback);

  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'manual'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Map state
  const [position, setPosition] = useState([11.0168, 76.9558]); // Coimbatore lat/lon base
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);

  const [mapAddress, setMapAddress] = useState({
    road: 'Avinashi Road',
    city: 'Coimbatore',
    district: 'Coimbatore District',
    state: 'Tamil Nadu',
    landmark: ''
  });

  // Manual form state
  const [form, setForm] = useState({
    road: '',
    area: '',
    city: 'Coimbatore',
    district: 'Coimbatore District',
    state: 'Tamil Nadu',
    landmark: ''
  });

  // Reset success state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError('');
    }
  }, [isOpen]);

  // Reverse geocode whenever marker coordinates change
  useEffect(() => {
    if (!isOpen || activeTab !== 'map') return;

    const fetchAddress = async () => {
      setLoading(true);
      setError('');
      try {
        const address = await reverseGeocode(position[0], position[1]);
        if (address) {
          setMapAddress({
            road: address.road || 'Incident Street',
            city: address.city || 'Coimbatore',
            district: address.district || 'Coimbatore District',
            state: address.state || 'Tamil Nadu',
            landmark: ''
          });
        }
      } catch (err) {
        console.error(err);
        setError('Nominatim reverse geocoding request limit exceeded. Falling back to default.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce the Nominatim reverse geocode call slightly
    const delayDebounce = setTimeout(() => {
      fetchAddress();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [position, activeTab, isOpen]);

  // Custom Leaflet pin icon
  const customPinIcon = useMemo(() => {
    return L.divIcon({
      className: 'custom-leaflet-div-icon',
      html: `<div style="position: relative; display: flex; flex-direction: column; align-items: center;">
               <div style="background: #0F172A; color: white; padding: 4px 8px; border-radius: 99px; font-size: 9px; font-weight: bold; margin-bottom: 4px; border: 1px solid rgba(255,255,255,0.15); white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.15); font-family: 'Inter', sans-serif;">
                 GPS Incident Location
               </div>
               <div style="position: relative; width: 16px; height: 16px; background: #0EA5E9; border-radius: 50%; border: 3.5px solid white; box-shadow: 0 4px 12px rgba(14,165,233,0.5);">
                 <span style="position: absolute; inset: -6px; border-radius: 50%; border: 1.5px solid rgba(14,165,233,0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
               </div>
             </div>`,
      iconSize: [120, 50],
      iconAnchor: [60, 46]
    });
  }, []);

  const markerHandlers = useMemo(() => ({
    dragend(e) {
      const marker = e.target;
      if (marker) {
        const latLng = marker.getLatLng();
        setPosition([latLng.lat, latLng.lng]);
      }
    }
  }), []);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!form.road || !form.city || !form.state) {
      setError('Please fill in all required fields (Road Name, City, State).');
      return;
    }
    
    // Trigger Success Animation
    setSuccess(true);
    
    setTimeout(() => {
      if (onResolved) {
        onResolved({
          road: form.road + (form.area ? `, ${form.area}` : '') + (form.landmark ? ` (Near ${form.landmark})` : ''),
          city: form.city,
          district: form.district || form.city,
          state: form.state
        });
      }
    }, 1800);
  };

  const handleMapConfirm = () => {
    // Trigger Success Animation
    setSuccess(true);

    setTimeout(() => {
      if (onResolved) {
        onResolved({
          road: mapAddress.road,
          city: mapAddress.city,
          district: mapAddress.district,
          state: mapAddress.state
        });
      }
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-slate-900 backdrop-blur-sm"
        />

        {/* Modal Panel Box */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl rounded-[32px] bg-white border border-slate-150 shadow-2xl p-6 md:p-8 flex flex-col gap-6 z-10 glass-panel max-h-[92vh] overflow-y-auto custom-scrollbar"
        >
          {/* Top Banner Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-light to-brand-dark" />

          {/* Conditional success animation wrapper */}
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="modal-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5.5"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100/60">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-brand-dark font-semibold tracking-wider leading-none mb-1.5">CIVIC GEOLOCATION SYSTEM</span>
                    <h3 className="text-[32px] md:text-[36px] font-extrabold text-primaryText tracking-tighter leading-tight mb-1">Confirm Incident Location</h3>
                    <p className="text-[14px] text-slate-600 font-medium">AI-assisted geolocation assistance.</p>
                  </div>
                  <button 
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-50 text-secondaryText hover:text-primaryText transition-colors outline-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Toggle tab sliders */}
                <div className="grid grid-cols-2 p-1.5 bg-slate-50 border border-slate-100 rounded-2xl relative">
                  <button
                    onClick={() => { setActiveTab('map'); setError(''); }}
                    className={`relative z-10 py-3.5 rounded-xl font-semibold text-[14px] transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'map' ? 'text-brand-dark' : 'text-slate-600 hover:text-primaryText'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    <span>Interactive Map</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('manual'); setError(''); }}
                    className={`relative z-10 py-3.5 rounded-xl font-semibold text-[14px] transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'manual' ? 'text-brand-dark' : 'text-slate-600 hover:text-primaryText'
                    }`}
                  >
                    <Keyboard className="w-4 h-4" />
                    <span>Manual Entry</span>
                  </button>

                  {/* Sliding highlight indicator */}
                  <motion.div 
                    layoutId="activeTabSelector"
                    className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-white rounded-xl border border-slate-200/50 shadow-sm"
                    animate={{ x: activeTab === 'map' ? 0 : '100%' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100 text-[13px] font-medium text-red-600 leading-normal flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Dynamic Content */}
                <div className="flex-1 min-h-[240px]">
                  {activeTab === 'map' ? (
                    /* REAL LEAFLET MAP VIEW */
                    <div className="flex flex-col gap-4.5">
                      {/* Leaflet Map Frame */}
                      <div className="relative w-full h-[220px] rounded-[24px] bg-slate-50 border border-slate-100 overflow-hidden shadow-inner group">
                        
                        {/* Interactive Leaflet container */}
                        <MapContainer 
                          center={position} 
                          zoom={16} 
                          scrollWheelZoom={true}
                          zoomControl={false}
                          className="w-full h-full z-10"
                        >
                          <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                          />
                          <Marker 
                            position={position} 
                            draggable={true} 
                            icon={customPinIcon} 
                            eventHandlers={markerHandlers}
                          />
                          <MapClickHandler setPosition={setPosition} />
                          <MapResizeTrigger />
                          <ZoomController 
                            triggerZoomIn={zoomInCount > 0 ? zoomInCount : null}
                            triggerZoomOut={zoomOutCount > 0 ? zoomOutCount : null}
                          />
                        </MapContainer>

                        {/* Custom Premium Zoom Buttons overlay */}
                        <div className="absolute right-3.5 bottom-3.5 z-20 flex flex-col gap-1.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); setZoomInCount(prev => prev + 1); }}
                            className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-slate-700 hover:text-brand-dark transition-colors outline-none active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setZoomOutCount(prev => prev + 1); }}
                            className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-slate-700 hover:text-brand-dark transition-colors outline-none active:scale-95"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Sat map Grid Overlay */}
                        <div className="absolute inset-0 border-[1.5px] border-slate-100/50 rounded-[24px] pointer-events-none z-20" />
                      </div>

                      {/* Map Location Briefing Bar */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4.5 shadow-sm">
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">RESOLVED MAP LOCATION</span>
                          <span className="font-extrabold text-[15px] text-slate-900 leading-snug">
                            {loading ? 'Resolving incident coordinates...' : `${mapAddress.road}, ${mapAddress.city}, ${mapAddress.state}`}
                          </span>
                        </div>
                        <button
                          onClick={handleMapConfirm}
                          disabled={loading}
                          className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-[14px] tracking-normal transition-colors shadow-sm outline-none w-full sm:w-auto shrink-0"
                        >
                          <span>Confirm</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* MANUAL INPUT FORM VIEW */
                    <form onSubmit={handleManualSubmit} className="flex flex-col gap-5">
                      
                      {/* Form Inputs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Road Name Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">ROAD NAME *</label>
                          <input
                            type="text"
                            value={form.road}
                            onChange={(e) => setForm({ ...form, road: e.target.value })}
                            placeholder="e.g. Avinashi Road"
                            required
                            className="w-full px-4.5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark/20 text-[15px] font-semibold text-slate-900 transition-all duration-300 outline-none placeholder:text-mutedText"
                          />
                        </div>

                        {/* Area/Locality Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">AREA / LOCALITY</label>
                          <input
                            type="text"
                            value={form.area}
                            onChange={(e) => setForm({ ...form, area: e.target.value })}
                            placeholder="e.g. Peelamedu"
                            className="w-full px-4.5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark/20 text-[15px] font-semibold text-slate-900 transition-all duration-300 outline-none placeholder:text-mutedText"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* City Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">CITY / CORPORATION *</label>
                          <input
                            type="text"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            required
                            className="w-full px-4.5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark/20 text-[15px] font-semibold text-slate-900 transition-all duration-300 outline-none"
                          />
                        </div>

                        {/* District Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">DISTRICT</label>
                          <input
                            type="text"
                            value={form.district}
                            onChange={(e) => setForm({ ...form, district: e.target.value })}
                            className="w-full px-4.5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark/20 text-[15px] font-semibold text-slate-900 transition-all duration-300 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* State Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">STATE *</label>
                          <input
                            type="text"
                            value={form.state}
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                            required
                            className="w-full px-4.5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark/20 text-[15px] font-semibold text-slate-900 transition-all duration-300 outline-none"
                          />
                        </div>

                        {/* Landmark Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">LANDMARK (OPTIONAL)</label>
                          <input
                            type="text"
                            value={form.landmark}
                            onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                            placeholder="e.g. Near Avinashi flyover"
                            className="w-full px-4.5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark/20 text-[15px] font-semibold text-slate-900 transition-all duration-300 outline-none placeholder:text-mutedText"
                          />
                        </div>
                      </div>

                      {/* Smart Assistant hint block */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-2.5 items-start">
                        <Sparkles className="w-5 h-5 text-brand-dark mt-0.5 shrink-0 animate-pulse" />
                        <span className="text-[13px] text-slate-650 leading-relaxed font-medium">
                          RoadLens AI will use this location to identify the responsible municipal authority.
                        </span>
                      </div>

                      {/* Manual confirm button */}
                      <div className="flex justify-center mt-6 w-full">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-light to-brand-dark text-white font-bold text-[14.5px] tracking-wide transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:shadow-brand-light/10 w-full sm:w-auto sm:min-w-[240px]"
                        >
                          <span>Confirm Location Details</span>
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            ) : (
              /* GEOLOCATION SUCCESS ANIMATION DIALOG */
              <motion.div
                key="modal-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-5.5"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="relative flex items-center justify-center"
                >
                  <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-emerald-450 opacity-75"></span>
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 border-2 border-white">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                </motion.div>
                
                <div>
                  <h4 className="font-bold text-[22px] text-primaryText tracking-tight">Location Verified Successfully</h4>
                  <p className="text-[15px] text-slate-700 max-w-[340px] mx-auto mt-3 leading-relaxed font-normal">
                    RoadLens AI is now resolving municipal jurisdiction and infrastructure authority mapping.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
