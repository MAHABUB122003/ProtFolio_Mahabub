const PROJECTS_KEY = 'portfolio_projects_v3';
const ORDER_KEY = 'portfolio_project_order_v3';
const VERSION_KEY = 'portfolio_projects_version';
const DEFAULTS_VERSION = 'v4';

export const defaultProjects = [
    {
        id: 1,
        title: "MDefender Pro – AI-Powered Web Application Firewall",
        category: "ml",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        description: "Developed an AI-powered Web Application Firewall (WAF) with machine learning threat detection, DDoS protection, and real-time security monitoring.",
        fullDescription: "Developed MDefender Pro, a next-generation Web Application Firewall (WAF) designed to protect modern web applications and APIs from advanced cyber threats. The platform combines signature-based detection with machine learning to defend against OWASP Top 10 vulnerabilities, DDoS attacks, bot traffic, and zero-day threats. It features a modern web dashboard for real-time monitoring, security analytics, rule management, attack visualization, and user administration. MDefender Pro also provides multi-language SDKs for Node.js, Python, and PHP, enabling seamless integration into existing applications while delivering enterprise-grade web application security.",
        tech: ["Python", "FastAPI", "React", "Vite", "Tailwind CSS", "MongoDB", "Redis", "Docker", "XGBoost", "Scikit-learn", "Node.js", "PHP", "JWT", "REST API"],
        features: [
            "AI-Powered Malware Detection",
            "Real-Time Scanning & WAF",
            "File Integrity Monitoring",
            "License Management & Auth",
            "OWASP Top 10 Protection",
            "Automated Threat Classification",
            "DDoS Mitigation Engine",
            "Machine Learning Anomaly Detection",
            "Custom Security Rule Management",
            "Multi-Language SDKs (Node.js, Python, PHP)",
            "Role-Based Access Control",
            "API Security Protection",
            "Attack Analytics & Reporting",
            "Web Application Firewall (WAF)"
        ],
        github: "https://github.com/MAHABUB122003/Mdefender-Pro/",
        demo: "https://mdefender-pro-6e3r.onrender.com/",
        date: "2026",
        status: "In Progress",
        order: 1
    },
    {
        id: 2,
        title: "Machine Learning for Cybersecurity",
        category: "ml",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        description: "Developed and benchmarked classification models for malware and phishing URL detection.",
        fullDescription: "Developed and benchmarked classification models including XGBoost, CatBoost, LightGBM, Random Forest, SVM, and Logistic Regression for malware and phishing detection. Applied TF-IDF vectorization and feature engineering for malicious URL/text classification. Conducted EDA using Pandas, NumPy, and Matplotlib; optimized models via GridSearchCV and cross-validation.",
        tech: ["Python", "XGBoost", "CatBoost", "LightGBM", "Random Forest", "Scikit-learn", "TF-IDF", "Pandas", "NumPy"],
        features: [
            "Malware & Phishing Classification",
            "TF-IDF URL Classification",
            "Feature Engineering & Vectorization",
            "Exploratory Data Analysis (EDA)",
            "GridSearchCV Optimization",
            "Cross-Validation Model Tuning"
        ],
        github: "https://github.com/MAHABUB122003",
        demo: "#",
        date: "2024",
        status: "Completed",
        order: 2
    },
    {
        id: 3,
        title: "Secure Full-Stack Web Application",
        category: "web",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        description: "MERN application built with secure SDLC principles, JWT auth, RBAC, and OWASP controls.",
        fullDescription: "Built a secure application using React.js, Node.js, Express.js, and MongoDB with JWT authentication, Bcrypt hashing, and Role-Based Access Control (RBAC). Applied OWASP Top 10 security controls and conducted vulnerability testing using Burp Suite and OWASP ZAP.",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bcrypt", "Burp Suite", "OWASP ZAP"],
        features: [
            "Secure JWT Authentication",
            "Bcrypt Password Hashing",
            "Role-Based Access Control (RBAC)",
            "OWASP Top 10 Security Controls",
            "Burp Suite & ZAP Audited"
        ],
        github: "https://github.com/MAHABUB122003",
        demo: "#",
        date: "2024",
        status: "Completed",
        order: 3
    },
    {
        id: 4,
        title: "PentestingAI – AI-Powered Penetration Testing Automation Platform",
        category: "security",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        description: "AI-powered penetration testing platform that automates reconnaissance, vulnerability scanning, and security assessment workflows.",
        fullDescription: "Developed PentestingAI, a full-stack AI-powered penetration testing automation platform designed for bug bounty hunters, security researchers, and red teams. The platform integrates automated reconnaissance, vulnerability assessment, security scanning engines, and AI-driven analysis to streamline penetration testing workflows. It supports asset discovery, port scanning, subdomain enumeration, directory discovery, API security testing, OWASP vulnerability detection, and generates intelligent security reports with remediation recommendations. The platform combines a modern React-based dashboard with a FastAPI backend, MongoDB database, Celery task processing, Redis queue management, and custom AI security engines to provide an efficient and scalable security assessment solution.",
        tech: ["React 19", "Vite", "Tailwind CSS 4", "FastAPI", "Python", "MongoDB", "Celery", "Redis", "Docker", "AI/LLM", "Nmap", "Nuclei", "FFUF", "Subfinder"],
        features: [
            "AI-Powered Vulnerability Analysis",
            "Automated Reconnaissance Engine",
            "Port & Service Discovery",
            "Subdomain Enumeration",
            "403 Bypass Testing",
            "API Security Testing",
            "Directory & Endpoint Discovery",
            "OWASP Vulnerability Scanning",
            "Security Dashboard & Analytics"
        ],
        github: "https://github.com/MAHABUB122003/PentestingAPI",
        demo: "https://github.com/MAHABUB122003/PentestingAPI",
        date: "2026",
        status: "Active",
        order: 4
    },
    {
        id: 5,
        title: "DwellSync – Smart Property Management Platform",
        category: "web",
        image: "https://images.unsplash.com/photo-1510511459019-5dee997dd1db?auto=format&fit=crop&w=800&q=80",
        description: "Developed a full-stack property management platform for managing properties, tenants, leases, rent payments, and maintenance requests.",
        fullDescription: "Developed DwellSync, a modern full-stack property management platform that streamlines property administration for landlords, tenants, and administrators. The system provides secure user authentication, property and tenant management, lease tracking, rent payment monitoring, maintenance request handling, and an intuitive dashboard for real-time insights. Built with Flutter for the frontend and Node.js, Express.js, and MongoDB for the backend, the platform offers a scalable and responsive solution for efficient property management.",
        tech: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "REST API", "Git", "GitHub"],
        features: [
            "Property Management",
            "Tenant Management",
            "Lease Management",
            "Rent Payment Tracking",
            "Maintenance Request System",
            "Secure JWT Authentication",
            "Admin Dashboard",
            "RESTful API Integration",
            "Responsive Mobile Interface"
        ],
        github: "https://github.com/MAHABUB122003/DwellSync",
        demo: "https://github.com/MAHABUB122003/DwellSync",
        date: "2025",
        status: "Completed",
        order: 5
    },
    {
        id: 6,
        title: "403 Bypass Tool",
        category: "security",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
        description: "Developed an advanced HTTP 403 bypass testing tool for penetration testers and bug bounty hunters to identify access control misconfigurations.",
        fullDescription: "Developed a comprehensive HTTP 403 bypass testing tool designed for penetration testers, bug bounty hunters, and security researchers. The application automates multiple access control bypass techniques, including custom header injection, HTTP method manipulation, path normalization, URL encoding, and request variations. It generates detailed scan results to help identify misconfigured web servers and authorization weaknesses during authorized security assessments. The tool is optimized for speed, reliability, and ease of use through a simple command-line interface.",
        tech: ["Python", "Requests", "HTTP", "CLI", "Git", "Linux", "Kali Linux"],
        features: [
            "Multiple HTTP 403 Bypass Techniques",
            "Custom Header Injection",
            "HTTP Method Testing",
            "Path Normalization & Encoding",
            "Automated Scan Reports",
            "Fast Command-Line Interface"
        ],
        github: "https://github.com/MAHABUB122003/403-bypass-tool",
        demo: "https://github.com/MAHABUB122003/403-bypass-tool",
        date: "2026",
        status: "Completed",
        order: 6
    },
    {
        id: 7,
        title: "RealIP – Real Client IP Detection & Header Analysis Tool",
        category: "security",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        description: "Developed a security tool to identify the real client IP address by analyzing HTTP headers and detecting proxy or CDN configurations.",
        fullDescription: "Developed a real IP detection and HTTP header analysis tool for penetration testers, bug bounty hunters, and security professionals. The application analyzes HTTP requests, extracts client IP information from multiple forwarding headers, detects reverse proxies, CDNs, and load balancers, and identifies potential IP disclosure issues caused by server misconfigurations. It provides detailed header analysis, IP validation, and security insights to assist during reconnaissance and web application security assessments.",
        tech: ["Python", "Requests", "HTTP", "CLI", "Networking", "Git", "Linux", "Kali Linux"],
        features: [
            "Real Client IP Detection",
            "HTTP Header Analysis",
            "Proxy & CDN Detection",
            "Forwarded Header Enumeration",
            "IP Validation & Verification",
            "Security Assessment Reports"
        ],
        github: "https://github.com/MAHABUB122003/RealIP",
        demo: "https://github.com/MAHABUB122003/RealIP",
        date: "2026",
        status: "Completed",
        order: 7
    },
    {
        id: 8,
        title: "MDIR – Advanced Directory & Content Discovery Tool",
        category: "security",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        description: "Developed a high-performance directory enumeration and content discovery tool for penetration testers and bug bounty hunters.",
        fullDescription: "Developed MDIR, a fast and lightweight directory enumeration tool designed for penetration testers, security researchers, and bug bounty hunters. The application automates the discovery of hidden directories, files, and sensitive endpoints using customizable wordlists and concurrent requests. It supports response filtering, status code analysis, recursion, and detailed output reporting to help identify exposed resources and potential security misconfigurations during authorized web application security assessments.",
        tech: ["Python", "Requests", "HTTP", "CLI", "Multithreading", "Git", "Linux", "Kali Linux"],
        features: [
            "High-Speed Directory Enumeration",
            "Custom Wordlist Support",
            "Recursive Directory Scanning",
            "Status Code Filtering",
            "Response Size & Content Filtering",
            "Hidden File Discovery",
            "Multi-threaded Scanning",
            "Detailed Scan Reports"
        ],
        github: "https://github.com/MAHABUB122003/MDIR",
        demo: "https://github.com/MAHABUB122003/MDIR",
        date: "2026",
        status: "Completed",
        order: 8
    }
];

function saveDefaultsWithVersion() {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
    localStorage.setItem(VERSION_KEY, DEFAULTS_VERSION);
}

export function resetProjects() {
    saveDefaultsWithVersion();
    localStorage.removeItem(ORDER_KEY);
    return defaultProjects;
}

export function getProjects() {
    try {
        const version = localStorage.getItem(VERSION_KEY);
        if (version !== DEFAULTS_VERSION) {
            saveDefaultsWithVersion();
            localStorage.removeItem(ORDER_KEY);
            return defaultProjects;
        }
        const stored = localStorage.getItem(PROJECTS_KEY);
        if (!stored) {
            saveDefaultsWithVersion();
            return defaultProjects;
        }
        let projects = JSON.parse(stored);
        if (!Array.isArray(projects) || projects.length === 0) {
            saveDefaultsWithVersion();
            return defaultProjects;
        }
        // Ensure default image fallback for stored items missing image property
        projects = projects.map(p => {
            const def = defaultProjects.find(dp => dp.id === p.id);
            return {
                ...p,
                image: p.image || (def ? def.image : '')
            };
        });
        const order = getOrder();
        if (order && order.length > 0) {
            projects.sort((a, b) => {
                const aIdx = order.indexOf(a.id);
                const bIdx = order.indexOf(b.id);
                if (aIdx === -1 && bIdx === -1) return 0;
                if (aIdx === -1) return 1;
                if (bIdx === -1) return -1;
                return aIdx - bIdx;
            });
        } else {
            projects.sort((a, b) => (a.order || 0) - (b.order || 0));
        }
        return projects;
    } catch (e) {
        saveDefaultsWithVersion();
        return defaultProjects;
    }
}

export function saveProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(VERSION_KEY, DEFAULTS_VERSION);
}

export function addProject(project) {
    const projects = getProjects();
    const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) : 0;
    const newProject = {
        ...project,
        id: maxId + 1,
        order: projects.length + 1
    };
    projects.push(newProject);
    saveProjects(projects);
    updateOrder(projects.map(p => p.id));
    return newProject;
}

export function updateProject(id, updates) {
    try {
        const raw = localStorage.getItem(PROJECTS_KEY);
        if (!raw) return null;
        const projects = JSON.parse(raw);
        const idx = projects.findIndex(p => p.id === id);
        if (idx === -1) return null;
        projects[idx] = { ...projects[idx], ...updates };
        const json = JSON.stringify(projects);
        if (json.length > 4_500_000) {
            console.warn('Project data is very large (' + (json.length / 1024 / 1024).toFixed(1) + 'MB)');
        }
        localStorage.setItem(PROJECTS_KEY, json);
        return projects[idx];
    } catch (e) {
        console.error('updateProject error:', e.name, e.message);
        return null;
    }
}

export function deleteProject(id) {
    let projects = getProjects();
    projects = projects.filter(p => p.id !== id);
    saveProjects(projects);
    updateOrder(projects.map(p => p.id));
    return true;
}

export function getOrder() {
    const order = localStorage.getItem(ORDER_KEY);
    return order ? JSON.parse(order) : [];
}

export function updateOrder(orderedIds) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orderedIds));
}

export function reorderProjects(fromIndex, toIndex) {
    const projects = getProjects();
    const [moved] = projects.splice(fromIndex, 1);
    projects.splice(toIndex, 0, moved);
    saveProjects(projects);
    updateOrder(projects.map(p => p.id));
    return projects;
}

export function moveProjectUp(id) {
    const projects = getProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx <= 0) return projects;
    return reorderProjects(idx, idx - 1);
}

export function moveProjectDown(id) {
    const projects = getProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1 || idx >= projects.length - 1) return projects;
    return reorderProjects(idx, idx + 1);
}
