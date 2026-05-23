const fs = require('fs');

function convertHtmlToJsx(html) {
    let jsx = html
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--[\s\S]*?-->/g, '') // remove comments
        .replace(/<img(.*?)>/g, (match, p1) => {
            if (match.endsWith('/>')) return match;
            return `<img${p1} />`;
        })
        .replace(/<input(.*?)>/g, (match, p1) => {
            if (match.endsWith('/>')) return match;
            return `<input${p1} />`;
        })
        .replace(/<br>/g, '<br />')
        .replace(/<hr(.*?)>/g, (match, p1) => `<hr${p1} />`);

    const svgAttrs = [
        'preserveAspectRatio', 'viewBox', 'stdDeviation', 'stroke-dasharray', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'fill-opacity'
    ];
    svgAttrs.forEach(attr => {
        const camel = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        jsx = jsx.replace(new RegExp(attr + '=', 'g'), camel + '=');
    });

    jsx = jsx.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    jsx = jsx.replace(/<link[^>]*>/gi, '');
    jsx = jsx.replace(/<meta[^>]*>/gi, '');

    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const styleObj = p1.split(';').filter(s => s.trim()).map(s => {
            const [key, value] = s.split(':').map(str => str.trim());
            if (!key) return '';
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${camelKey}: '${value}'`;
        }).filter(s => s).join(', ');
        return `style={{${styleObj}}}`;
    });

    // Handle React router links for Get Started
    jsx = jsx.replace(/id="btn-hero-get-started"/g, 'onClick={() => navigate("/login")}');
    jsx = jsx.replace(/id="btn-nav-get-started"/g, 'onClick={() => navigate("/login")}');
    jsx = jsx.replace(/id="btn-cta-get-started"/g, 'onClick={() => navigate("/login")}');

    return jsx;
}

const html = fs.readFileSync('../landing-page/index.html', 'utf8');
const match = html.match(/<div id="landing-page-view">([\s\S]*?)<\/div>\s*<!-- Dedicated Auth/);
const content = match ? match[1] : html.match(/<body>([\s\S]*?)<\/body>/)[1];

const jsxContent = convertHtmlToJsx(content);

const reactComponent = `
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
            ${jsxContent.replace(/onclick="[^"]*"/g, '').replace(/onsubmit="[^"]*"/g, '')}
        </div>
    );
};
`;

fs.writeFileSync('src/pages/Landing.tsx', reactComponent);
console.log("Landing.tsx created");
