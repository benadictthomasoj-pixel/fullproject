// Floating Background Particles
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
});

// Tab Switching
function switchTab(tabId) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update forms
    document.querySelectorAll('.login-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tabId}-form`).classList.add('active');
}

// Simulated OTP Logic
function sendOTP(method) {
    const inputId = method === 'email' ? 'email-input' : 'mobile-input';
    const inputVal = document.getElementById(inputId).value;
    const sendBtn = document.getElementById(`${method}-send-btn`);
    const otpSection = document.getElementById(`${method}-otp-section`);
    const verifyBtn = document.getElementById(`${method}-verify-btn`);

    if (!inputVal) {
        showToast('Please enter a valid address/number', 'error');
        return;
    }

    // Simulate sending OTP (Loading state)
    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;
    sendBtn.disabled = true;

    setTimeout(() => {
        sendBtn.innerHTML = `<i class="fa-solid fa-check"></i> OTP Sent`;
        
        // Show OTP input and verify button
        otpSection.style.display = 'block';
        verifyBtn.classList.remove('hidden');
        sendBtn.classList.add('hidden'); // Hide send button

        showToast(`OTP sent to ${inputVal}`, 'success');
        
        // Focus the OTP input
        setTimeout(() => document.getElementById(`${method}-otp-input`).focus(), 100);
    }, 1500);
}

function verifyOTP(method) {
    const otpInputId = `${method}-otp-input`;
    const otpVal = document.getElementById(otpInputId).value;
    const verifyBtn = document.getElementById(`${method}-verify-btn`);

    if (otpVal.length !== 6) {
        showToast('Please enter a valid 6-digit OTP', 'error');
        return;
    }

    // Simulate verification (Loading state)
    const originalText = verifyBtn.innerHTML;
    verifyBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Verifying...`;
    verifyBtn.disabled = true;

    setTimeout(() => {
        verifyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Verified`;
        showToast('Login Successful! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'http://localhost:5174/';
        }, 1000);
    }, 1500);
}

// Toast Notification
function showToast(message, type = 'default') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    if (type === 'success') {
        toast.classList.add('success');
    } else {
        toast.classList.remove('success');
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
