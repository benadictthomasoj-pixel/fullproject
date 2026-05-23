const fs = require('fs');

function convertHtmlToJsx(html) {
    // Basic replacements
    let jsx = html
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--[\s\S]*?-->/g, '') // remove comments
        .replace(/<input(.*?)>/g, (match, p1) => {
            if (match.endsWith('/>')) return match;
            return `<input${p1} />`;
        })
        .replace(/<br>/g, '<br />')
        .replace(/<hr(.*?)>/g, (match, p1) => `<hr${p1} />`);

    // SVG camelCase attributes
    const svgAttrs = [
        'preserveAspectRatio', 'viewBox', 'stdDeviation', 'stroke-dasharray', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'
    ];
    svgAttrs.forEach(attr => {
        const camel = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        jsx = jsx.replace(new RegExp(attr + '=', 'g'), camel + '=');
    });

    // Remove scripts and links
    jsx = jsx.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    jsx = jsx.replace(/<link[^>]*>/gi, '');
    jsx = jsx.replace(/<meta[^>]*>/gi, '');

    // Replace styles like style="display: none;" -> style={{display: 'none'}}
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const styleObj = p1.split(';').filter(s => s.trim()).map(s => {
            const [key, value] = s.split(':').map(str => str.trim());
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${camelKey}: '${value}'`;
        }).join(', ');
        return `style={{${styleObj}}}`;
    });

    return jsx;
}

const loginHtml = fs.readFileSync('../landing-page/login/index.html', 'utf8');
const bodyMatch = loginHtml.match(/<body>([\s\S]*?)<\/body>/);
const bodyContent = bodyMatch ? bodyMatch[1] : '';

const jsxContent = convertHtmlToJsx(bodyContent);

const reactComponent = `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
    const navigate = useNavigate();
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
                particle.style.width = \`\${size}px\`;
                particle.style.height = \`\${size}px\`;
                particle.style.left = \`\${Math.random() * 100}%\`;
                particle.style.animationDuration = \`\${Math.random() * 20 + 10}s\`;
                particle.style.animationDelay = \`\${Math.random() * 10}s\`;
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
            showToast(\`OTP sent to \${val}\`, 'success');
        }, 1500);
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
            setTimeout(() => navigate('/dashboard'), 1000);
        }, 1500);
    };

    return (
        <div className="login-wrapper">
            {/* The raw HTML converted to JSX */}
            ${jsxContent.replace(/onclick="[^"]*"/g, '').replace(/onsubmit="[^"]*"/g, '').replace(/href="\/"/g, 'href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}')}

            <div id="toast" className={\`toast \${toast.show ? 'show' : ''} \${toast.type === 'success' ? 'success' : ''}\`}>
                {toast.message}
            </div>
        </div>
    );
};
`;

fs.writeFileSync('src/pages/Login.tsx', reactComponent);
console.log("Login.tsx created");
