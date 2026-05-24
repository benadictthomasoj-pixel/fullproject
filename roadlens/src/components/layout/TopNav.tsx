import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation as useRouterLocation } from 'react-router-dom';
import { Bell, Map, Menu, X } from 'lucide-react';
import { useLocation, POPULAR_LOCATIONS, LOCATION_MAP } from '../../contexts/LocationContext';
import './TopNav.css';

const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/monitoring', label: 'Road Monitoring' },
  { path: '/transparency', label: 'Transparency' },
  { path: '/complaints', label: 'Recent Complaints' },
  { path: '/authorities', label: 'Authorities' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/feedback', label: 'Feedback' },
];

const timeAgo = (date: Date) => {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 10) return 'Just now';
  if (secs < 60) return `${secs}s ago`;
  return `${Math.floor(secs / 60)}m ago`;
};

export const TopNav: React.FC = () => {
  const routerLocation = useRouterLocation();
  const { locationName, recentLocations, lastUpdated, setLocation, setGPSLocation } = useLocation();

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [locationDropOpen, setLocationDropOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatedAt, setUpdatedAt] = useState('Just now');

  const navRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Update "Updated X ago" ticker
  useEffect(() => {
    const tick = () => setUpdatedAt(timeAgo(lastUpdated));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, [lastUpdated]);

  // Sliding underline
  useEffect(() => {
    const update = () => {
      if (!navRef.current) return;
      const active = navRef.current.querySelector('.nav-link.active') as HTMLElement;
      if (active) {
        setUnderlineStyle({ left: active.offsetLeft, width: active.offsetWidth, opacity: 1 });
      } else {
        setUnderlineStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };
    setTimeout(update, 50);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [routerLocation.pathname]);

  // Close menus on navigate
  useEffect(() => {
    setMobileMenuOpen(false);
    setLocationDropOpen(false);
  }, [routerLocation.pathname]);

  // Click outside → close menus
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileMenuOpen(false);
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setLocationDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredSuggestions = searchQuery.trim().length > 0
    ? Object.keys(LOCATION_MAP).filter(k => k.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  const handleSelect = (area: string) => {
    setLocation(area);
    setLocationDropOpen(false);
    setSearchQuery('');
  };

  const handleGPS = () => {
    setGPSLocation();
    setLocationDropOpen(false);
  };

  const areaName = locationName.split(',')[0].trim();
  const nearbyCount = Math.floor(Math.random() * 25) + 8; // simulated live count

  return (
    <div className="saas-topnav-wrapper">
      {/* Header */}
      <header className="saas-header">
        <div className="saas-header-content">

          {/* Logo + Location stacked vertically */}
          <div className="saas-logo">
            <div className="branding-group">
              <NavLink to="/" className="logo-row">
                <div className="logo-icon">
                  <Map size={32} color="white" strokeWidth={2.5} />
                </div>
                <div className="logo-text">
                  <span className="road">Road</span>
                  <span className="lens">Lens</span>
                </div>
              </NavLink>

              {/* ── Premium Location Badge (clickable dropdown) ── */}
              <div className="location-badge-container" ref={locationRef}>
                <div
                  className={`location-badge${locationDropOpen ? ' open' : ''}`}
                  onClick={() => setLocationDropOpen(v => !v)}
                  role="button"
                  aria-haspopup="listbox"
                  aria-expanded={locationDropOpen}
                  title="Click to change location"
                >
                  <div className="loc-text-block">
                    <div className="loc-live-row">
                      <span className="loc-live-dot" aria-label="Live indicator"></span>
                      <span className="loc-live-label">LIVE LOCATION</span>
                    </div>
                    <div className="loc-name">
                      <span className="loc-pin-wrap" aria-hidden>
                        <svg className="loc-pin-svg" width="10" height="10" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3" fill="white"/>
                        </svg>
                      </span>
                      {locationName}
                    </div>
                  </div>
                  <svg className={`loc-chevron${locationDropOpen ? ' rotated' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>

                {/* Dropdown panel */}
                {locationDropOpen && (
                  <div className="location-dropdown" role="listbox">
                    {/* Meta Info */}
                    <div className="loc-dropdown-meta">
                      <div className="loc-dropdown-meta-title">Current Status</div>
                      <div className="loc-dropdown-meta-info">{nearbyCount} Nearby Reports • Updated {updatedAt}</div>
                    </div>
                    <div className="loc-divider" />

                    {/* Search */}
                    <div className="loc-search-wrap">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      <input
                        className="loc-search-input"
                        placeholder="Search location…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      {searchQuery && (
                        <button className="loc-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                      )}
                    </div>

                    {/* Search results */}
                    {filteredSuggestions.length > 0 && (
                      <div className="loc-section">
                        <div className="loc-section-label">Search Results</div>
                        {filteredSuggestions.map(area => (
                          <button key={area} className={`loc-item${area === areaName ? ' active' : ''}`} onClick={() => handleSelect(area)}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {area}
                            {area === areaName && <span className="loc-active-check">✓</span>}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Recent */}
                    {filteredSuggestions.length === 0 && (
                      <>
                        <div className="loc-section">
                          <div className="loc-section-label">Recent Locations</div>
                          {recentLocations.map(area => (
                            <button key={area} className={`loc-item${area === areaName ? ' active' : ''}`} onClick={() => handleSelect(area)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {area}
                              {area === areaName && <span className="loc-active-check">✓</span>}
                            </button>
                          ))}
                        </div>

                        <div className="loc-section">
                          <div className="loc-section-label">Popular Locations</div>
                          {POPULAR_LOCATIONS.filter(l => !recentLocations.includes(l)).map(area => (
                            <button key={area} className={`loc-item${area === areaName ? ' active' : ''}`} onClick={() => handleSelect(area)}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                              {area}
                              {area === areaName && <span className="loc-active-check">✓</span>}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="loc-divider" />

                    {/* GPS */}
                    <button className="loc-gps-btn" onClick={handleGPS}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
                      Use Current GPS Location
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation & User Actions */}
          <nav className={`saas-main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`} ref={navRef}>
            <ul className="saas-nav-list">
              {navItems.map(item => (
                <li key={item.path} className="nav-item">
                  <NavLink to={item.path} className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')} end={item.path === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div
              className="nav-underline"
              style={{ left: underlineStyle.left, width: underlineStyle.width, opacity: underlineStyle.opacity }}
            />

            <button className="icon-btn relative">
              <Bell size={20} className="text-gray-600" />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile profile-menu-container" ref={profileRef}>
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=0EA5E9&color=fff"
                alt="Profile"
                className="avatar-img"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                role="button"
                aria-expanded={profileMenuOpen}
              />
              
              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="profile-menu-dropdown">
                  <div className="profile-menu-header">
                    <div className="profile-name">Admin User</div>
                    <div className="profile-role">System Administrator</div>
                  </div>
                  <div className="profile-menu-divider"></div>
                  
                  <button className="profile-menu-item">
                    <span className="profile-item-icon">👤</span>
                    Profile Information
                  </button>
                  <button className="profile-menu-item">
                    <span className="profile-item-icon">🔒</span>
                    Safety & Privacy
                  </button>
                  
                  <div className="profile-menu-divider"></div>
                  
                  <button className="profile-menu-item logout" onClick={() => { if (window.confirm('Are you sure you want to logout?')) setProfileMenuOpen(false); }}>
                    <span className="profile-item-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
};
