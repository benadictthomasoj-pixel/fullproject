// @ts-nocheck
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

export const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simple scroll handling for header
        const handleScroll = () => {
            const header = document.getElementById('main-header');
            if (header) {
                if (window.scrollY > 50) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="landing-wrapper">
            
        
        
        <header id="main-header">
            <div className="container nav-container">
                <a href="#home" className="logo" id="nav-logo">
                    <div className="logo-icon">RL</div>
                    <div className="logo-text">Road<span>Lens</span></div>
                </a>
                
                <ul className="nav-menu" id="nav-menu">
                    <li><a href="#impact" className="nav-link">Impact</a></li>
                    <li><a href="#features" className="nav-link">Features</a></li>
                    <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
                    <li><a href="#faqs" className="nav-link">FAQs</a></li>
                    <li><a href="#about" className="nav-link">About</a></li>
                    <li><button className="btn btn-primary" onClick={() => navigate("/login")}>Get Started</button></li>
                </ul>
                
                <div className="burger" id="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>

        <main>
            
            <section className="hero" id="home">
                <div className="container hero-grid">
                    <div className="hero-content">
                        <div className="badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Infrastructure Audit & Transparency
                        </div>
                        <h1 className="hero-title">
                            Making Every Road<br /><span>Transparent, Accountable, and Safer.</span>
                        </h1>
                        <p className="hero-description">
                            Track road quality, monitor public spending, identify responsible authorities, and report infrastructure issues through one intelligent platform.
                        </p>
                        <div className="hero-actions">
                            <button className="btn btn-primary" onClick={() => navigate("/login")}>
                                Get Started
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </button>
                            <a href="#features" className="btn btn-secondary">
                                Explore Features
                            </a>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        <div className="visual-sphere"></div>
                        
                        
                        <div className="hero-story-container">
                            <div className="story-canvas vertical-flow">
                                
                                <div className="story-road-vertical">
                                    <div className="road-markings"></div>
                                </div>
                                
                                
                                <div className="story-crack-container">
                                    <svg className="story-crack" viewBox="0 0 100 50">
                                        
                                        <path d="M10 25 Q20 30 30 15 T50 20 T70 35 T90 20" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round"/>
                                        <path d="M30 15 L35 5 M50 20 L55 35 M70 35 L65 45" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <div className="story-crack-indicator"></div>
                                </div>
                                
                                
                                <div className="story-citizen-3d">
                                    <div className="story-thought-bubble">
                                        <span className="bubble-text">?</span>
                                    </div>
                                    
                                    <svg className="citizen-svg-3d" viewBox="0 0 120 200" fill="none">
                                        <defs>
                                            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ffcd94"/>
                                                <stop offset="100%" stopColor="#e2a873"/>
                                            </linearGradient>
                                            <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#38bdf8"/>
                                                <stop offset="100%" stopColor="#0284c7"/>
                                            </linearGradient>
                                            <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#1e293b"/>
                                                <stop offset="100%" stopColor="#0f172a"/>
                                            </linearGradient>
                                            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feDropShadow dx="2" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
                                            </filter>
                                        </defs>

                                        
                                        <path className="leg-left" d="M45 120 Q35 150 40 180" stroke="url(#pantsGrad)" strokeWidth="18" strokeLinecap="round" filter="url(#dropShadow)"/>
                                        
                                        <path className="leg-right" d="M75 120 Q85 150 80 180" stroke="url(#pantsGrad)" strokeWidth="18" strokeLinecap="round" filter="url(#dropShadow)"/>
                                        
                                        
                                        <path className="arm-left" d="M40 70 Q20 100 30 130" stroke="url(#hoodieGrad)" strokeWidth="16" strokeLinecap="round"/>
                                        
                                        
                                        <rect className="torso" x="35" y="60" width="50" height="70" rx="20" fill="url(#hoodieGrad)" filter="url(#dropShadow)"/>
                                        <path className="hood" d="M30 65 Q60 30 90 65 Z" fill="url(#hoodieGrad)"/>
                                        
                                        
                                        <circle className="head" cx="60" cy="45" r="18" fill="url(#skinGrad)" filter="url(#dropShadow)"/>
                                        
                                        
                                        <path className="arm-right" d="M80 70 Q100 100 90 130" stroke="url(#hoodieGrad)" strokeWidth="16" strokeLinecap="round" filter="url(#dropShadow)"/>
                                    </svg>
                                </div>
                                
                                
                                <div className="story-phone-3d">
                                    <div className="phone-frame-3d">
                                        <div className="phone-notch"></div>
                                        <div className="phone-screen-3d">
                                            
                                            
                                            <div className="app-screen app-screen-1">
                                                <div className="app-camera-view">
                                                    <div className="camera-reticle"></div>
                                                    <div className="camera-flash"></div>
                                                </div>
                                                <div className="app-bottom-bar">
                                                    <div className="btn-submit-report">Submit Report</div>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className="app-screen app-screen-2">
                                                <div className="upload-spinner"></div>
                                                <div className="app-progress-list">
                                                    <div className="progress-item step-loc">
                                                        <div className="step-icon"></div> Location Detected <span className="check">✓</span>
                                                    </div>
                                                    <div className="progress-item step-auth">
                                                        <div className="step-icon"></div> Authority Identified <span className="check">✓</span>
                                                    </div>
                                                    <div className="progress-item step-submit">
                                                        <div className="step-icon"></div> Report Processing <span className="check">✓</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className="app-screen app-screen-3">
                                                <div className="screen-3-header">
                                                    <div className="mini-success-circle">✓</div>
                                                    <div className="mini-success-title">Issue Report Submitted<br />Successfully</div>
                                                </div>
                                                <div className="screen-3-details">
                                                    <div className="detail-row"><span className="lbl">Road Status:</span><span className="val text-blue">Under Review</span></div>
                                                    <div className="detail-row"><span className="lbl">Reference ID:</span><span className="val">RL-2026-XXXX</span></div>
                                                    <div className="detail-row"><span className="lbl">Responsible Authority:</span><span className="val">Municipal Road Dept</span></div>
                                                    <div className="detail-row"><span className="lbl">Expected Inspection:</span><span className="val">Within 48 Hours</span></div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="why-section" id="impact">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why <span>RoadLens Matters</span></h2>
                        <p className="section-subtitle">Bridging the information gap to drive systemic safety and absolute financial visibility.</p>
                    </div>
                    
                    <div className="impact-grid">
                        
                        <div className="why-card">
                            <div className="why-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M3 10h18M3 14h18M17 21v-4M13 21v-6M9 21v-8M5 21v-10"/></svg>
                            </div>
                            <div className="why-card-content">
                                <h3>Transparency</h3>
                                <p>Citizens can view contractor details, sanctioned budgets, and maintenance records for every road project.</p>
                            </div>
                        </div>

                        
                        <div className="why-card">
                            <div className="why-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 11l2 2 4-4"/></svg>
                            </div>
                            <div className="why-card-content">
                                <h3>Accountability</h3>
                                <p>Responsible authorities are clearly identified for every road, leaving no room for administrative finger-pointing.</p>
                            </div>
                        </div>

                        
                        <div className="why-card">
                            <div className="why-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
                            </div>
                            <div className="why-card-content">
                                <h3>Better Roads</h3>
                                <p>Early issue reporting helps reduce potholes, cracks, and structural failures before they become hazardous.</p>
                            </div>
                        </div>

                        
                        <div className="why-card">
                            <div className="why-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                            </div>
                            <div className="why-card-content">
                                <h3>Public Awareness</h3>
                                <p>Citizens gain complete visibility into how public funds are being utilized, fostering informed civic engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="features" id="features">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Key <span>Features</span></h2>
                        <p className="section-subtitle">A comprehensive suite of tools built for citizen auditors and city planners.</p>
                    </div>
                    
                    <div className="features-grid">
                        
                        <div className="feature-card glass">
                            <div className="feat-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3v18M19 3v18M5 12h14M5 7h14M5 17h14"/></svg>
                            </div>
                            <h3>Road Information</h3>
                            <ul className="feature-bullets">
                                <li><strong>Road Type:</strong> National Highways, State Highways, Major District Roads, Local Roads.</li>
                                <li><strong>Condition Rating:</strong> Standard Quality Scores.</li>
                                <li><strong>Timelines:</strong> Last Relaying Date & upcoming schedules.</li>
                            </ul>
                        </div>

                        
                        <div className="feature-card glass">
                            <div className="feat-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M6 12h.01M18 12h.01"/></svg>
                            </div>
                            <h3>Budget Transparency</h3>
                            <ul className="feature-bullets">
                                <li><strong>Sanctioned Budget:</strong> Total public funds allocated.</li>
                                <li><strong>Amount Utilized:</strong> Line-item spending progress.</li>
                                <li><strong>Project Status:</strong> Contractor audits & progress stages.</li>
                            </ul>
                        </div>


                        
                        <div className="feature-card glass">
                            <div className="feat-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </div>
                            <h3>Complaint Management</h3>
                            <ul className="feature-bullets">
                                <li><strong>Report Instantly:</strong> Upload image proof & coordinates.</li>
                                <li><strong>Auto-Assignment:</strong> Routed directly to the local agency.</li>
                                <li><strong>Status Tracking:</strong> Real-time alerts upon inspection.</li>
                            </ul>
                        </div>

                        
                        <div className="feature-card glass">
                            <div className="feat-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M19 11h6M22 8v6"/></svg>
                            </div>
                            <h3>Authority Dashboard</h3>
                            <ul className="feature-bullets">
                                <li><strong>Complaint Auditing:</strong> View and filter citizen tickets.</li>
                                <li><strong>Project Management:</strong> Log budgets & relay schedules.</li>
                                <li><strong>Analytics Portal:</strong> Auto-generate region quality charts.</li>
                            </ul>
                        </div>

                        
                        <div className="feature-card glass">
                            <div className="feat-icon-box">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                            </div>
                            <h3>Geo-Based Insights</h3>
                            <ul className="feature-bullets">
                                <li><strong>Interactive Maps:</strong> Color-coded city safety ratings.</li>
                                <li><strong>Local Notifications:</strong> Close-by road work warnings.</li>
                                <li><strong>Safety Ledger:</strong> Infrastructure mapping overlays.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="how-works" id="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How <span>It Works</span></h2>
                        <p className="section-subtitle">Bridging infrastructure verification in four transparent steps.</p>
                    </div>
                    
                    <div className="timeline-wrapper">
                        <div className="timeline-line"></div>
                        <div className="timeline-progress-line" id="timeline-progress"></div>
                        
                        
                        <div className="timeline-step" id="step-1">
                            <div className="timeline-badge-num">1</div>
                            <div className="timeline-content-panel glass">
                                <div className="timeline-step-tag">Step One</div>
                                <h3>Select Road Location</h3>
                                <p>Browse the interactive map, locate the specific road section, or upload an image containing geotag coordinates.</p>
                            </div>
                        </div>

                        
                        <div className="timeline-step" id="step-2">
                            <div className="timeline-badge-num">2</div>
                            <div className="timeline-content-panel glass">
                                <div className="timeline-step-tag">Step Two</div>
                                <h3>Verify Infrastructure Records</h3>
                                <p>Cross-reference report details against municipal databases to confirm jurisdictional boundaries, ownership, and historical maintenance logs.</p>
                            </div>
                        </div>

                        
                        <div className="timeline-step" id="step-3">
                            <div className="timeline-badge-num">3</div>
                            <div className="timeline-content-panel glass">
                                <div className="timeline-step-tag">Step Three</div>
                                <h3>Fetch Infrastructure Assets</h3>
                                <p>RoadLens queries public ledger assets, importing historical maintenance schedules, budgets, and responsible contractors.</p>
                            </div>
                        </div>

                        
                        <div className="timeline-step" id="step-4">
                            <div className="timeline-badge-num">4</div>
                            <div className="timeline-content-panel glass">
                                <div className="timeline-step-tag">Step Four</div>
                                <h3>Submit Audited Ticket</h3>
                                <p>View real-time contractor statistics or officially submit the auto-filled pothole report to the responsible authority.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            
            <section className="faqs" id="faqs">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Frequently <span>Asked Questions</span></h2>
                        <p className="section-subtitle">Everything you need to know about the RoadLens public auditing platform.</p>
                    </div>
                    
                    <div className="faqs-container">
                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <span>What is RoadLens?</span>
                                <div className="faq-toggle-icon"><span></span><span></span></div>
                            </div>
                            <div className="faq-answer">
                                <p>RoadLens is a digital civic-tech platform that integrates government infrastructure data, contractor audit books, and road condition reports to provide absolute transparency on road quality and public spending.</p>
                            </div>
                        </div>

                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <span>How is road quality monitored?</span>
                                <div className="faq-toggle-icon"><span></span><span></span></div>
                            </div>
                            <div className="faq-answer">
                                <p>Road quality is assessed using community-reported logs combined with telemetry from public works departments, verified contractor records, and structured auditing logs.</p>
                            </div>
                        </div>

                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <span>Can I report potholes and cracks?</span>
                                <div className="faq-toggle-icon"><span></span><span></span></div>
                            </div>
                            <div className="faq-answer">
                                <p>Yes. Citizens can click "Get Started", register a Citizen account, and immediately log issues by uploading an image. Our system identifies the coordinates and routes the ticket directly to the responsible governing agency based on geolocation.</p>
                            </div>
                        </div>

                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <span>How is budget information collected?</span>
                                <div className="faq-toggle-icon"><span></span><span></span></div>
                            </div>
                            <div className="faq-answer">
                                <p>Budget allocations, utilizes, and contractor bids are compiled from official municipal publications, open government datasets, public works registry documents, and audited contracting vouchers.</p>
                            </div>
                        </div>

                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <span>Who can access authority dashboards?</span>
                                <div className="faq-toggle-icon"><span></span><span></span></div>
                            </div>
                            <div className="faq-answer">
                                <p>Verified regional department admins, public engineering supervisors, and contracted infrastructure auditors are issued a governmental code key to log in and manage citizen work orders.</p>
                            </div>
                        </div>

                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <span>Is my complaint tracked?</span>
                                <div className="faq-toggle-icon"><span></span><span></span></div>
                            </div>
                            <div className="faq-answer">
                                <p>Absolutely. Every submitted ticket is cataloged with a unique token. Citizens receive updates as tickets shift from 'Logged' to 'Contractor Assigned', 'Work In Progress', and final 'Citizen Audited'.</p>
                            </div>
                        </div>

                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <span>Is RoadLens available for all regions?</span>
                                <div className="faq-toggle-icon"><span></span><span></span></div>
                            </div>
                            <div className="faq-answer">
                                <p>RoadLens is actively scaling. Currently, it supports Metropolitan Zone 3, with ongoing pilot integrations in neighboring state municipality quadrants.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="about-section" id="about">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">About <span>RoadLens</span></h2>
                        <p className="section-subtitle">Bridging the gap between municipal infrastructure projects and the public square.</p>
                    </div>
                    
                    <div className="about-grid">
                        <div className="about-info-panel">
                            <h3>Building Trust in Civic Engineering</h3>
                            <p>
                                RoadLens is a citizen-centric infrastructure transparency platform designed to bridge the gap between public road projects and the people who use them. By combining road condition mapping, budget transparency, maintenance tracking, and complaint management, RoadLens promotes accountability and informed civic participation.
                            </p>
                        </div>
                        <div className="about-cards-panel">
                            
                            <div className="about-card glass">
                                <h4>Our Mission</h4>
                                <p>Provide public transparency to eliminate opacity in municipal budgets and contractor assignments, ensuring civic funds yield quality road networks.</p>
                            </div>
                            
                            <div className="about-card glass">
                                <h4>Our Vision</h4>
                                <p>To construct smart cities where infrastructure health is democratically audited, and transit safety is managed with real-time public transparency.</p>
                            </div>
                            
                            <div className="about-card glass">
                                <h4>Transparency Goals</h4>
                                <p>Open up contract data, map 100% of local roadways, and route citizen pothole logs to governing authorities with complete public tracking.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrapper">
                        <div className="cta-content">
                            <h2 className="cta-title">Infrastructure Transparency Starts Here.</h2>
                            <p className="cta-desc">Access the information behind every road and stay informed about the projects shaping your community.</p>
                            <button className="btn btn-outline-cyan" onClick={() => navigate("/login")} style={{padding: '1rem 2rem'}}>
                                Get Started Now
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="#home" className="logo">
                            <div className="logo-icon">RL</div>
                            <div className="logo-text">Road<span>Lens</span></div>
                        </a>
                        <p className="footer-desc">See Beyond the Road. Bringing structural transparency, budget accountability, and citizen trust to public works.</p>
                        <div className="footer-socials">
                            <a href="#" className="social-icon" aria-label="Twitter">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                            </a>
                            <a href="#" className="social-icon" aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="footer-title">Features</h4>
                        <ul className="footer-links">
                            <li><a href="#features" className="footer-link">Road Quality Index</a></li>
                            <li><a href="#features" className="footer-link">Budget Tracking</a></li>
                            <li><a href="#features" className="footer-link">Complaint Center</a></li>
                            <li><a href="#about" className="footer-link">About Platform</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="footer-title">Resources</h4>
                        <ul className="footer-links">
                            <li><a href="#faqs" className="footer-link">Help FAQ</a></li>
                            <li><a href="#" className="footer-link">Auditing Guidelines</a></li>
                            <li><a href="#" className="footer-link">Open API</a></li>
                            <li><a href="#" className="footer-link">Contractor Portal</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="footer-title">Contact</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Support Desk</a></li>
                            <li><a href="#" className="footer-link">Press Office</a></li>
                            <li><a href="#" className="footer-link">Mailing List</a></li>
                            <li><a href="#" className="footer-link">Regional Zones</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="footer-copy">&copy; 2026 RoadLens. Empowering Citizens Through Infrastructure Transparency.</div>
                    <div className="footer-legal">
                        <a href="#" className="footer-legal-link">Privacy Policy</a>
                        <a href="#" className="footer-legal-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    
        </div>
    );
};
