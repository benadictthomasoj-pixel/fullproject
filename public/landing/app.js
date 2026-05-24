document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Navigation Scroll & Mobile Burger Menu & Active Scroll Observer
       ========================================================================== */
    const header = document.getElementById('main-header');
    const burger = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky nav with background blur on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile nav toggle
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting on scroll
    const sections = Array.from(navLinks).map(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            return document.querySelector(href);
        }
        return null;
    }).filter(Boolean);

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for sticky nav

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Highlight Home if scrolled to top
        if (window.scrollY < 200) {
            currentSectionId = 'home';
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });





    /* ==========================================================================
       3. Timeline Progress Tracker on Scroll (Pixel-Perfect Scroll Handler)
       ========================================================================== */
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineWrapper = document.querySelector('.timeline-wrapper');

    window.addEventListener('scroll', () => {
        if (!timelineWrapper || !timelineProgress) return;
        
        const rect = timelineWrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Start filling the bar when the timeline enters the screen (at 70% viewport height)
        // End when the bottom of the timeline hits 30% viewport height
        const startOffset = windowHeight * 0.7;
        const totalHeight = rect.height;
        const scrolledPastStart = -rect.top + startOffset;
        
        let progressPercent = 0;
        if (scrolledPastStart > 0) {
            progressPercent = (scrolledPastStart / totalHeight) * 100;
        }
        
        // Clamp percentage
        progressPercent = Math.min(100, Math.max(0, progressPercent));
        timelineProgress.style.height = `${progressPercent}%`;
        
        // Activate/deactivate step panels as they scroll past the trigger line
        timelineSteps.forEach(step => {
            const stepRect = step.getBoundingClientRect();
            if (stepRect.top + stepRect.height / 2 < windowHeight * 0.75) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    });


    /* ==========================================================================
       4. Metric Counters Animation
       ========================================================================== */
    const counters = [
        { el: document.getElementById('counter-roads'), target: 12450, format: (val) => Math.floor(val).toLocaleString() + '+' },
        { el: document.getElementById('counter-issues'), target: 3420, format: (val) => Math.floor(val).toLocaleString() + '+' },
        { el: document.getElementById('counter-budget'), target: 48.7, format: (val) => '$' + val.toFixed(1) + 'M' },
        { el: document.getElementById('counter-auth'), target: 42, format: (val) => Math.floor(val).toLocaleString() + '+' }
    ];

    let countersStarted = false;

    const startCounters = () => {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(counterItem => {
            const el = counterItem.el;
            if (!el) return;
            
            const target = counterItem.target;
            const format = counterItem.format;
            let current = 0;
            const duration = 1800; // Total duration in ms
            const interval = 16; // Roughly 60fps frame time
            const totalSteps = duration / interval;
            const increment = target / totalSteps;

            const update = () => {
                current += increment;
                if (current >= target) {
                    el.textContent = format(target);
                } else {
                    el.textContent = format(current);
                    requestAnimationFrame(update);
                }
            };
            requestAnimationFrame(update);
        });
    };

    // Trigger counters when hero section is visible
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const metricsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        metricsObserver.observe(heroVisual);
    } else {
        // Fallback
        setTimeout(startCounters, 500);
    }


    /* ==========================================================================
       5. FAQ Accordion Logic
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });





    /* ==========================================================================
       7. Custom Auth Flow & Screen Transitions
       ========================================================================== */
    let currentUser = null;

    // Dom Elements for switching main pages
    const landingPageView = document.getElementById('landing-page-view');
    const authPageView = document.getElementById('auth-page-view');

    // Trigger buttons
    const btnNavGetStarted = document.getElementById('btn-nav-get-started');
    const btnHeroGetStarted = document.getElementById('btn-hero-get-started');
    const btnCtaGetStarted = document.getElementById('btn-cta-get-started');
    const btnBackToHome = document.getElementById('btn-back-to-home');
    const authLogoHome = document.getElementById('auth-logo-home');

    // Auth screen steps
    const authSelectionStep = document.getElementById('auth-selection-step');
    const citizenAuthStep = document.getElementById('citizen-auth-step');
    const authorityAuthStep = document.getElementById('authority-auth-step');
    const successWelcomeStep = document.getElementById('success-welcome-step');

    // Selection Cards
    const cardCitizenSelect = document.getElementById('card-citizen-select');
    const cardAuthoritySelect = document.getElementById('card-authority-select');

    // Back to access screen buttons
    const btnBackToSelectCitizen = document.getElementById('btn-back-to-select-citizen');
    const btnBackToSelectAuthority = document.getElementById('btn-back-to-select-authority');

    // Submits
    const citizenAuthForm = document.getElementById('citizen-auth-form');
    const citizenSubmitBtn = document.getElementById('citizen-submit-btn');
    const authorityAuthForm = document.getElementById('authority-auth-form');
    const authoritySubmitBtn = document.getElementById('authority-submit-btn');
    
    // Switch login/register links
    const citizenSwitchText = document.getElementById('citizen-switch-text');
    const citizenNameGroup = document.getElementById('citizen-name-group');
    const citizenAuthTitle = document.getElementById('citizen-auth-title');
    const citizenAuthSubtitle = document.getElementById('citizen-auth-subtitle');
    
    const authoritySwitchText = document.getElementById('authority-switch-text');
    const authorityAgencyGroup = document.getElementById('authority-agency-group');
    const authorityAuthTitle = document.getElementById('authority-auth-title');
    const authorityAuthSubtitle = document.getElementById('authority-auth-subtitle');

    // Continue to home dashboard button
    const btnSuccessContinue = document.getElementById('btn-success-continue');

    // Toggles Login vs Register variables
    let citizenIsLogin = true;
    let authorityIsLogin = true;

    // Helper functions to open and close auth screens
    function openAuthScreen() {
        landingPageView.style.display = 'none';
        authPageView.style.display = 'flex';
        authSelectionStep.style.display = 'block';
        citizenAuthStep.style.display = 'none';
        authorityAuthStep.style.display = 'none';
        successWelcomeStep.style.display = 'none';
        
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function openDashboardScreen() {
        if (!currentUser) return;
        landingPageView.style.display = 'none';
        authPageView.style.display = 'flex';
        authSelectionStep.style.display = 'none';
        citizenAuthStep.style.display = 'none';
        authorityAuthStep.style.display = 'none';
        successWelcomeStep.style.display = 'block';
        
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function closeAuthScreen() {
        authPageView.style.display = 'none';
        landingPageView.style.display = 'block';
    }

    // Bind entry points
    const handleEntryClick = () => {
        if (currentUser) {
            openDashboardScreen();
        } else {
            openAuthScreen();
        }
    };

    if (btnNavGetStarted) {
        btnNavGetStarted.addEventListener('click', () => {
            if (currentUser) {
                // Logout action
                currentUser = null;
                updateNavLoginState();
                showToast('Logged out of RoadLens successfully.', 'info');
            } else {
                openAuthScreen();
            }
        });
    }

    if (btnHeroGetStarted) btnHeroGetStarted.addEventListener('click', handleEntryClick);
    if (btnCtaGetStarted) btnCtaGetStarted.addEventListener('click', handleEntryClick);

    // Back to home page
    const handleBackHome = (e) => {
        e.preventDefault();
        closeAuthScreen();
    };
    if (btnBackToHome) btnBackToHome.addEventListener('click', handleBackHome);
    if (authLogoHome) authLogoHome.addEventListener('click', handleBackHome);

    // Card selections
    if (cardCitizenSelect) {
        cardCitizenSelect.addEventListener('click', () => {
            window.location.href = '/login/index.html';
        });
    }

    if (cardAuthoritySelect) {
        cardAuthoritySelect.addEventListener('click', () => {
            authSelectionStep.style.display = 'none';
            authorityAuthStep.style.display = 'block';
        });
    }

    // Form Back buttons
    if (btnBackToSelectCitizen) {
        btnBackToSelectCitizen.addEventListener('click', () => {
            citizenAuthStep.style.display = 'none';
            authSelectionStep.style.display = 'block';
        });
    }
    if (btnBackToSelectAuthority) {
        btnBackToSelectAuthority.addEventListener('click', () => {
            authorityAuthStep.style.display = 'none';
            authSelectionStep.style.display = 'block';
        });
    }

    // Toggle registration vs login links (Citizen)
    if (citizenSwitchText) {
        citizenSwitchText.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'citizen-toggle-link') {
                e.preventDefault();
                citizenIsLogin = !citizenIsLogin;
                
                if (citizenIsLogin) {
                    citizenAuthTitle.textContent = 'Citizen Login';
                    citizenAuthSubtitle.textContent = 'Access infrastructure dashboards and budget reports.';
                    citizenSubmitBtn.textContent = 'Sign In to Dashboard';
                    citizenNameGroup.style.display = 'none';
                    document.getElementById('citizen-name').required = false;
                    citizenSwitchText.innerHTML = `Don't have an account? <a href="#" id="citizen-toggle-link">Register here</a>`;
                } else {
                    citizenAuthTitle.textContent = 'Create Citizen Account';
                    citizenAuthSubtitle.textContent = 'Join the platform to audit budgets and report road conditions.';
                    citizenSubmitBtn.textContent = 'Create Account';
                    citizenNameGroup.style.display = 'block';
                    document.getElementById('citizen-name').required = true;
                    citizenSwitchText.innerHTML = `Already have an account? <a href="#" id="citizen-toggle-link">Login here</a>`;
                }
            }
        });
    }

    // Toggle registration vs login links (Authority)
    if (authoritySwitchText) {
        authoritySwitchText.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'authority-toggle-link') {
                e.preventDefault();
                authorityIsLogin = !authorityIsLogin;
                
                if (authorityIsLogin) {
                    authorityAuthTitle.textContent = 'Authority Login';
                    authorityAuthSubtitle.textContent = 'Access infrastructure dashboards and update project budgets.';
                    authoritySubmitBtn.textContent = 'Sign In to Dashboard';
                    authorityAgencyGroup.style.display = 'none';
                    document.getElementById('authority-agency').required = false;
                    authoritySwitchText.innerHTML = `Need administrative access? <a href="#" id="authority-toggle-link">Register agency here</a>`;
                } else {
                    authorityAuthTitle.textContent = 'Register Authority Agency';
                    authorityAuthSubtitle.textContent = 'Register your governing department or contracting firm.';
                    authoritySubmitBtn.textContent = 'Register Agency';
                    authorityAgencyGroup.style.display = 'block';
                    document.getElementById('authority-agency').required = true;
                    authoritySwitchText.innerHTML = `Already have administrative access? <a href="#" id="authority-toggle-link">Login here</a>`;
                }
            }
        });
    }

    // Form Submission Actions (Citizen)
    if (citizenAuthForm) {
        citizenAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailVal = document.getElementById('citizen-email').value;
            const passwordVal = document.getElementById('citizen-password').value;
            const nameVal = document.getElementById('citizen-name').value;
            
            if (!emailVal || !passwordVal || (!citizenIsLogin && !nameVal)) {
                showToast('Please fill out all required fields.', 'warning');
                return;
            }

            if (passwordVal.length < 6) {
                showToast('Password must be at least 6 characters.', 'warning');
                return;
            }

            citizenSubmitBtn.disabled = true;
            citizenSubmitBtn.textContent = 'Verifying credentials...';
            
            setTimeout(() => {
                const displayName = nameVal || 'John Doe';
                currentUser = {
                    name: displayName,
                    role: 'citizen',
                    email: emailVal
                };
                
                // Populate Dashboard Preview panel in welcome dialog
                const previewContainer = document.getElementById('success-dashboard-preview');
                previewContainer.innerHTML = `
                    <div class="success-user-info" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid rgba(15,23,42,0.08); padding-bottom:0.75rem;">
                        <div>
                            <h4 style="font-family:var(--font-heading); color:var(--primary-deep); margin:0;">${displayName}</h4>
                            <span style="font-size:0.8rem; color:var(--text-muted);">${emailVal}</span>
                        </div>
                        <span style="background:var(--primary-light); color:var(--accent-blue); padding:0.25rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">Citizen Auditor</span>
                    </div>
                    <div class="success-metric-row">
                        <span>My Audited Projects</span>
                        <strong>3 Roads Tracked</strong>
                    </div>
                    <div class="success-metric-row">
                        <span>Logged Reports</span>
                        <strong>2 Potholes (Pending Review)</strong>
                    </div>
                    <div class="success-metric-row">
                        <span>Community Contributor Rank</span>
                        <strong style="color:var(--accent-cyan);">Level 2 Auditor</strong>
                    </div>
                    <div class="success-metric-row">
                        <span>Local Authority Scope</span>
                        <strong>Zone 3 Municipal Area</strong>
                    </div>
                `;
                
                document.getElementById('success-title').textContent = citizenIsLogin ? 'Welcome Back!' : 'Account Created!';
                document.getElementById('success-message').textContent = 'Your citizen audit dashboard has been initialized.';
                
                citizenAuthStep.style.display = 'none';
                successWelcomeStep.style.display = 'block';
                
                showToast('Sign-in successful!', 'success');
                citizenSubmitBtn.disabled = false;
                citizenSubmitBtn.textContent = citizenIsLogin ? 'Sign In to Dashboard' : 'Create Account';
            }, 1200);
        });
    }

    // Form Submission Actions (Authority)
    if (authorityAuthForm) {
        authorityAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailVal = document.getElementById('authority-email').value;
            const passwordVal = document.getElementById('authority-password').value;
            const agencyVal = document.getElementById('authority-agency').value;
            const codeVal = document.getElementById('authority-code').value;
            
            if (!emailVal || !passwordVal || !codeVal || (!authorityIsLogin && !agencyVal)) {
                showToast('Please fill out all required fields.', 'warning');
                return;
            }

            if (!codeVal.toUpperCase().startsWith('RL-GOV-')) {
                showToast('Access code must start with standard RL-GOV- prefix.', 'warning');
                return;
            }

            if (passwordVal.length < 6) {
                showToast('Password must be at least 6 characters.', 'warning');
                return;
            }

            authoritySubmitBtn.disabled = true;
            authoritySubmitBtn.textContent = 'Verifying Gov Key...';
            
            setTimeout(() => {
                const displayName = agencyVal || 'State Highway Dept';
                currentUser = {
                    name: displayName,
                    role: 'authority',
                    email: emailVal
                };
                
                // Populate Dashboard Preview panel in welcome dialog
                const previewContainer = document.getElementById('success-dashboard-preview');
                previewContainer.innerHTML = `
                    <div class="success-user-info" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid rgba(15,23,42,0.08); padding-bottom:0.75rem;">
                        <div>
                            <h4 style="font-family:var(--font-heading); color:var(--primary-deep); margin:0;">${displayName}</h4>
                            <span style="font-size:0.8rem; color:var(--text-muted);">${emailVal}</span>
                        </div>
                        <span style="background:rgba(16,185,129,0.1); color:var(--accent-green); padding:0.25rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">Verified Officer</span>
                    </div>
                    <div class="success-metric-row">
                        <span>Active Work Orders</span>
                        <strong>12 Reports Assigned</strong>
                    </div>
                    <div class="success-metric-row">
                        <span>Budget Scope Managed</span>
                        <strong>$14.2 Million USD</strong>
                    </div>
                    <div class="success-metric-row">
                        <span>Pending Citizen Audits</span>
                        <strong>4 Tickets In Queue</strong>
                    </div>
                    <div class="success-metric-row">
                        <span>Access integrity Rating</span>
                        <strong style="color:var(--accent-green);">Class A Credentials</strong>
                    </div>
                `;
                
                document.getElementById('success-title').textContent = authorityIsLogin ? 'Gov Terminal Activated' : 'Agency Registered';
                document.getElementById('success-message').textContent = 'Your executive public-works dashboard is ready.';
                
                authorityAuthStep.style.display = 'none';
                successWelcomeStep.style.display = 'block';
                
                showToast('Government key verified successfully!', 'success');
                authoritySubmitBtn.disabled = false;
                authoritySubmitBtn.textContent = authorityIsLogin ? 'Sign In to Dashboard' : 'Register Agency';
            }, 1200);
        });
    }

    // Continue to features grid
    if (btnSuccessContinue) {
        btnSuccessContinue.addEventListener('click', () => {
            closeAuthScreen();
            updateNavLoginState();
            
            showToast(`Portal initialized. Welcome, ${currentUser.name}!`, 'success');
            
            // Auto smooth scroll to features section to give them immediate interactivity
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                setTimeout(() => {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                }, 400);
            }
        });
    }

    // Update buttons style and labels depending on currentUser state
    function updateNavLoginState() {
        if (currentUser) {
            // Citizen or Authority Logged In
            const truncatedName = currentUser.name.length > 11 
                ? currentUser.name.substring(0, 10) + '...' 
                : currentUser.name;
            
            btnNavGetStarted.textContent = `Logout (${truncatedName})`;
            btnNavGetStarted.classList.remove('btn-primary');
            btnNavGetStarted.classList.add('btn-secondary');
            
            // Adjust other CTAs to lead directly to their dashboard panel view
            if (btnHeroGetStarted) {
                btnHeroGetStarted.innerHTML = `
                    View Portal Dashboard
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                `;
            }
            if (btnCtaGetStarted) {
                btnCtaGetStarted.innerHTML = `
                    View Portal Dashboard
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                `;
            }
        } else {
            // Logged Out
            btnNavGetStarted.textContent = 'Get Started';
            btnNavGetStarted.classList.remove('btn-secondary');
            btnNavGetStarted.classList.add('btn-primary');
            
            if (btnHeroGetStarted) {
                btnHeroGetStarted.innerHTML = `
                    Get Started
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                `;
            }
            if (btnCtaGetStarted) {
                btnCtaGetStarted.innerHTML = `
                    Get Started Now
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                `;
            }
        }
    }


    /* ==========================================================================
       8. Floating Notification Toast Component
       ========================================================================== */
    function showToast(message, type = 'info') {
        const existingToast = document.querySelector('.roadlens-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `roadlens-toast toast-${type}`;
        
        // Premium glassmorphic toast style variables
        let borderColor = 'var(--accent-blue)';
        let strokeColor = '#38BDF8';
        let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        
        if (type === 'success') {
            borderColor = 'var(--accent-green)';
            strokeColor = '#10b981';
            iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>`;
        } else if (type === 'warning') {
            borderColor = 'var(--accent-amber)';
            strokeColor = '#f59e0b';
            iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
        }
        
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-left: 4px solid ${borderColor};
            box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.15), 0 1px 3px rgba(15, 23, 42, 0.05);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: var(--primary-deep);
            font-family: var(--font-body);
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transform: translateY(30px);
            opacity: 0;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
            pointer-events: none;
            border-top: 1px solid rgba(15, 23, 42, 0.04);
            border-right: 1px solid rgba(15, 23, 42, 0.04);
            border-bottom: 1px solid rgba(15, 23, 42, 0.04);
        `;
        
        const iconContainer = document.createElement('span');
        iconContainer.innerHTML = iconSvg;
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        
        const textLabel = document.createElement('span');
        textLabel.textContent = message;
        
        toast.appendChild(iconContainer);
        toast.appendChild(textLabel);
        document.body.appendChild(toast);
        
        // Trigger entrance slide
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 50);
        
        // Slide out and remove
        setTimeout(() => {
            toast.style.transform = 'translateY(20px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3500);
    }

});



