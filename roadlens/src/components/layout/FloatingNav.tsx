import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Bell, Search, Menu, X, User } from 'lucide-react';
import './FloatingNav.css';

export const FloatingNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`floating-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-icon">
            <Map className="icon-main" size={24} />
            <div className="pulse-dot"></div>
          </div>
          <div className="logo-text">
            <span className="road">Road</span>
            <span className="lens">Lens</span>
          </div>
        </div>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>Overview</NavLink>
          <NavLink to="/monitoring" className={({ isActive }) => (isActive ? 'active' : '')}>Map</NavLink>
          <NavLink to="/raise-issue" className={({ isActive }) => (isActive ? 'active' : '')}>Report Issue</NavLink>
        </nav>

        <div className="nav-actions">
          <div className="search-wrapper d-none-md">
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notification-badge"></span>
          </button>
          <div className="user-avatar">
            <User size={20} />
          </div>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
