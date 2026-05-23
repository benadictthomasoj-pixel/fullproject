// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
    const navigate = useNavigate();
    const [authStep, setAuthStep] = useState('select'); // 'select', 'citizen', 'authority'
    const [tab, setTab] = useState('email');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        // Particles
        const container = document.getElementById('particles');
        if (container) {
            container.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const size = Math.random() * 8 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
                particle.style.animationDelay = `${Math.random() * 10}s`;
                container.appendChild(particle);
            }
        }
    }, []);

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };

    const handleSendOtp = (method) => {
        const val = method === 'email' ? email : mobile;
        if (!val) {
            showToast('Please enter a valid address/number', 'error');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
            showToast(`OTP sent to ${val}`, 'success');
        }, 400);
    };

    const handleVerifyOtp = (e, method) => {
        e.preventDefault();
        if (otp.length !== 6) {
            showToast('Please enter a valid 6-digit OTP', 'error');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast('Login Successful! Redirecting...', 'success');
            setTimeout(() => navigate('/dashboard'), 400);
        }, 400);
    };

    return (
        <div className="login-wrapper">
            {/* The raw HTML converted to JSX */}
            
    
    <svg className="svg-background" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(255, 255, 255, 0.8)" />
                <stop offset="50%" stop-color="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stop-color="rgba(255, 255, 255, 0.5)" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        
        <g transform="translate(-100, 200)">
            
            <path className="bridge-dark" d="M 100,880 L 150,880 L 200,500 L 100,500 Z" />
            <path className="bridge-dark" d="M 400,880 L 450,880 L 500,450 L 400,450 Z" />
            <path className="bridge-solid" d="M 125,500 L 175,500 L 150,400 Z" />
            <path className="bridge-solid" d="M 425,450 L 475,450 L 450,350 Z" />
            
            
            <path className="bridge-solid" d="M -100,500 Q 300,450 700,300 L 730,320 Q 300,480 -100,530 Z" />
            
            
            <path className="bridge-line" d="M -100,530 Q 300,480 730,320" />
            <path className="bridge-line" d="M 0,515 L 0,550 M 100,500 L 100,530 M 200,480 L 200,510 M 300,450 L 300,480 M 400,420 L 400,450 M 500,390 L 500,420 M 600,360 L 600,390" />
            
            
            <path className="bridge-glow" d="M -100,515 Q 300,465 680,310" />
            <path className="bridge-line" d="M -100,490 Q 300,440 715,290" />
            <path className="bridge-line" d="M -100,480 Q 300,430 720,285" strokeDasharray="2, 6" />
            
            
            <circle cx="150" cy="400" r="4" fill="var(--sky-blue)" filter="url(#glow)" />
            <circle cx="350" cy="355" r="4" fill="var(--sky-blue)" filter="url(#glow)" />
            <circle cx="550" cy="310" r="4" fill="var(--sky-blue)" filter="url(#glow)" />
            
            
            <path className="bridge-solid" d="M 700,300 L 720,285 L 735,310 L 715,325 L 730,340 L 705,355 L 685,320 Z" />
            
            
            <path className="bridge-line" d="M 150,300 L 300,470" />
            <path className="bridge-line" d="M 150,300 L 400,450" />
            <path className="bridge-line" d="M 150,300 L 500,420" />
            <path className="bridge-line" d="M 150,300 L 600,380" />
            <path className="bridge-line" d="M 150,300 L 700,330" />
        </g>

        
        <g transform="translate(1100, 100)">
            
            <path className="bridge-dark" d="M 800,980 L 750,980 L 700,600 L 800,600 Z" />
            <path className="bridge-dark" d="M 500,980 L 450,980 L 400,500 L 500,500 Z" />
            <path className="bridge-solid" d="M 725,600 L 775,600 L 750,450 Z" />
            <path className="bridge-solid" d="M 425,500 L 475,500 L 450,400 Z" />
            
            
            <path className="bridge-solid" d="M 1000,600 Q 600,500 200,350 L 170,370 Q 600,530 1000,630 Z" />
            
            
            <path className="bridge-line" d="M 1000,630 Q 600,530 170,370" />
            <path className="bridge-line" d="M 900,590 L 900,620 M 800,560 L 800,590 M 700,530 L 700,560 M 600,500 L 600,530 M 500,470 L 500,500 M 400,440 L 400,470 M 300,410 L 300,440 M 200,380 L 200,410" />
            
            
            <path className="bridge-glow" d="M 1000,615 Q 600,515 180,360" />
            <path className="bridge-line" d="M 1000,590 Q 600,490 215,340" />
            <path className="bridge-line" d="M 1000,580 Q 600,480 220,335" strokeDasharray="2, 6" />
            
            
            <circle cx="800" cy="530" r="4" fill="var(--sky-blue)" filter="url(#glow)" />
            <circle cx="600" cy="465" r="4" fill="var(--sky-blue)" filter="url(#glow)" />
            <circle cx="400" cy="405" r="4" fill="var(--sky-blue)" filter="url(#glow)" />
            
            
            <path className="bridge-solid" d="M 200,350 L 180,335 L 165,360 L 185,375 L 170,390 L 195,405 L 215,370 Z" />
            
            
            <path className="bridge-line" d="M 750,400 L 600,520" />
            <path className="bridge-line" d="M 750,400 L 500,490" />
            <path className="bridge-line" d="M 750,400 L 400,470" />
            <path className="bridge-line" d="M 750,400 L 300,430" />
            <path className="bridge-line" d="M 750,400 L 200,380" />
        </g>

        
        <g className="lens-container" transform="translate(800, 400)">
            
            <path className="lens-handle" d="M 70,70 L 130,130 Q 140,140 130,150 Q 120,160 110,150 L 50,90 Z" />
            
            
            <circle cx="0" cy="0" r="100" className="bridge-solid" />
            
            
            <circle cx="0" cy="0" r="90" className="lens-glass" />
            
            
            <path className="crack-zoomed" d="M -60,-20 L -30,-10 L 0,-40 L 20,10 L 50,-5 L 70,30" />
            <path className="crack-zoomed" d="M -40,30 L -10,15 L 10,45 L 40,25" />
            
            
            <polygon points="-20,-50 -10,-40 -25,-30" fill="#cbd5e1" />
            <polygon points="40,-30 55,-25 45,-15" fill="#cbd5e1" />
            <polygon points="-30,60 -15,50 -20,70" fill="#cbd5e1" />
            
            
            <path className="lens-highlight" d="M -70,-50 Q 0,-90 70,-50 A 90 90 0 0 0 -70,-50 Z" />
            
            
            <path d="M -15,0 L 15,0 M 0,-15 L 0,15" stroke="var(--sky-blue)" strokeWidth="2" opacity="0.6" />
            <circle cx="0" cy="0" r="40" stroke="var(--sky-blue)" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="5,5" />
        </g>
    </svg>
    <div className="particles" id="particles"></div>
    
    
    {authStep !== 'select' ? (
        <a href="#" onClick={(e) => { e.preventDefault(); setAuthStep('select'); }} className="back-btn">
            <i className="fa-solid fa-arrow-left"></i> Back to Access Type
        </a>
    ) : (
        <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="back-btn">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
        </a>
    )}

    
    <div className="login-container">
        
        {authStep === 'select' && (
            <div className="auth-selection-wrapper fade-in">
                <h2 className="auth-selection-title">Choose Your Access Type</h2>
                <p className="auth-selection-subtitle">Select how you would like to interact with the RoadLens platform.</p>
                
                <div className="auth-selection-grid">
                    {/* Citizen Card */}
                    <div className="auth-selection-card glass" onClick={() => setAuthStep('citizen')}>
                        <div className="auth-selection-icon">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <div className="selection-card-body">
                            <h3>Citizen Access</h3>
                            <p>Report road issues, monitor budgets, track complaints, and access road information in your neighborhood.</p>
                        </div>
                        <button className="btn btn-primary" style={{width: '100%'}}>Continue as Citizen</button>
                    </div>

                    {/* Authority Card */}
                    <div className="auth-selection-card glass" onClick={() => setAuthStep('authority')}>
                        <div className="auth-selection-icon">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/></svg>
                        </div>
                        <div className="selection-card-body">
                            <h3>Authority Access</h3>
                            <p>Manage reports, update project information, monitor infrastructure, and respond to citizen complaints.</p>
                        </div>
                        <button className="btn btn-primary" style={{width: '100%'}}>Continue as Authority</button>
                    </div>
                </div>
            </div>
        )}

        {authStep === 'citizen' && (
        <div className="login-card fade-in">
            <div className="logo-area">
                <i className="fa-solid fa-road-circle-check brand-icon"></i>
                <h2>Welcome to login page</h2>
                <p>Login to access the AI-powered smart road monitoring platform.</p>
            </div>

            
            <div className="tabs">
                <button className={`tab-btn ${tab === 'email' ? 'active' : ''}`} onClick={() => setTab('email')}>Email OTP</button>
                <button className={`tab-btn ${tab === 'mobile' ? 'active' : ''}`} onClick={() => setTab('mobile')}>Mobile OTP</button>
            </div>

            {/* Email OTP Form */}
            <form id="email-form" className={`login-form ${tab === 'email' ? 'active' : ''}`} onSubmit={(e) => handleVerifyOtp(e, 'email')}>
                <div className="input-group">
                    <label>Email Address</label>
                    <div className="input-with-icon">
                        <i className="fa-regular fa-envelope"></i>
                        <input type="email" id="email-input" placeholder="citizen@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                
                {otpSent && (
                    <div className="otp-section" style={{ display: 'block' }}>
                        <div className="input-group">
                            <label>One Time Password</label>
                            <div className="input-with-icon">
                                <i className="fa-solid fa-key"></i>
                                <input type="text" placeholder="Enter 6-digit OTP" pattern="[0-9]{6}" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    {!otpSent ? (
                        <button type="button" className="btn btn-outline w-100" onClick={() => handleSendOtp('email')}>
                            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Send OTP'}
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary w-100">
                            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-check"></i> Verify & Login</>}
                        </button>
                    )}
                </div>
            </form>

            {/* Mobile OTP Form */}
            <form id="mobile-form" className={`login-form ${tab === 'mobile' ? 'active' : ''}`} onSubmit={(e) => handleVerifyOtp(e, 'mobile')}>
                <div className="input-group">
                    <label>Mobile Number</label>
                    <div className="input-with-icon">
                        <i className="fa-solid fa-mobile-screen"></i>
                        <input type="tel" id="mobile-input" placeholder="+1 (555) 000-0000" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                    </div>
                </div>
                
                {otpSent && (
                    <div className="otp-section" style={{ display: 'block' }}>
                        <div className="input-group">
                            <label>One Time Password</label>
                            <div className="input-with-icon">
                                <i className="fa-solid fa-key"></i>
                                <input type="text" placeholder="Enter 6-digit OTP" pattern="[0-9]{6}" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    {!otpSent ? (
                        <button type="button" className="btn btn-outline w-100" onClick={() => handleSendOtp('mobile')}>
                            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Send SMS OTP'}
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary w-100">
                            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-check"></i> Verify & Login</>}
                        </button>
                    )}
                </div>
            </form>

            <div className="login-footer">
                <label className="remember-me">
                    <input type="checkbox" defaultChecked />
                    <span>Remember me on this device</span>
                </label>
                <a href="#" className="help-link">Need Help?</a>
            </div>
        </div>
        )}

        {authStep === 'authority' && (
        <div className="login-card fade-in">
            <div className="logo-area">
                <i className="fa-solid fa-shield-halved brand-icon" style={{color: '#ef4444', textShadow: '0 0 15px rgba(239, 68, 68, 0.4)'}}></i>
                <h2>Authority Login</h2>
                <p>Access infrastructure dashboards and update project budgets.</p>
            </div>
            <form className="login-form active" onSubmit={(e) => handleVerifyOtp(e, 'authority')}>
                <div className="input-group">
                    <label>Government Email</label>
                    <div className="input-with-icon">
                        <i className="fa-regular fa-envelope"></i>
                        <input type="email" placeholder="officer@agency.gov" required />
                    </div>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <div className="input-with-icon">
                        <i className="fa-solid fa-lock"></i>
                        <input type="password" placeholder="••••••••" required />
                    </div>
                </div>
                <div className="input-group">
                    <label>Gov Agency Access Code</label>
                    <div className="input-with-icon">
                        <i className="fa-solid fa-building-shield"></i>
                        <input type="text" placeholder="RL-GOV-XXXX" required />
                    </div>
                </div>
                <div className="form-actions" style={{marginTop: '2rem'}}>
                    <button type="submit" className="btn btn-primary w-100" style={{background: 'linear-gradient(90deg, #ef4444, #dc2626)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'}}>
                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-check"></i> Sign In to Dashboard</>}
                    </button>
                </div>
            </form>
            <div className="login-footer">
                <label className="remember-me">
                    <input type="checkbox" defaultChecked />
                    <span>Keep me signed in</span>
                </label>
                <a href="#" className="help-link">Forgot Password?</a>
            </div>
        </div>
        )}
    </div>

    
    <div id="toast" className="toast"></div>

    


            <div id="toast" className={`toast ${toast.show ? 'show' : ''} ${toast.type === 'success' ? 'success' : ''}`}>
                {toast.message}
            </div>
        </div>
    );
};
