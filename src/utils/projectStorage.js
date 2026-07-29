const PROJECTS_KEY = 'portfolio_projects_v2';
const ORDER_KEY = 'portfolio_project_order_v2';

export const defaultProjects = [
    {
        id: 1,
        title: "MDefender Pro – AI-Powered Malware Detection & WAF",
        category: "ml",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        description: "Designed an AI-powered security platform for WordPress malware detection and web application protection.",
        fullDescription: "Designed an AI-powered security platform for WordPress malware detection and web application protection. Integrated machine learning-based malware detection with real-time scanning, REST APIs, and automated threat classification. Implemented file integrity monitoring, license management, secure authentication, and OWASP Top 10 protection.",
        tech: ["Python", "FastAPI", "React.js", "Node.js", "MongoDB", "Docker", "Scikit-learn"],
        features: [
            "AI-Powered Malware Detection",
            "Real-Time Scanning & WAF",
            "File Integrity Monitoring",
            "License Management & Auth",
            "OWASP Top 10 Protection",
            "Automated Threat Classification"
        ],
        github: "https://github.com/MAHABUB122003",
        demo: "#",
        date: "2024",
        status: "Active",
        order: 1
    },
    {
        id: 2,
        title: "Machine Learning for Cybersecurity",
        category: "ml",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        description: "Developed and benchmarked classification models for malware and phishing URL detection.",
        fullDescription: "Developed and benchmarked classification models including XGBoost, CatBoost, LightGBM, Random Forest, SVM, and Logistic Regression for malware and phishing detection. Applied TF-IDF vectorization and feature engineering for malicious URL/text classification. Conducted EDA using Pandas, NumPy, and Matplotlib; optimized models via GridSearchCV and cross-validation.",
        tech: ["Python", "XGBoost", "CatBoost", "LightGBM", "Random Forest", "SVM", "Logistic Regression", "Scikit-learn", "TF-IDF", "Pandas", "NumPy", "Matplotlib"],
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
        title: "Enterprise Red Team vs. Blue Team Lab",
        category: "security",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        description: "Active Directory enterprise simulation with Wazuh and Splunk SIEM for attack/defense tracking.",
        fullDescription: "Deployed an enterprise lab with Windows Server Active Directory, Wazuh SIEM, and Splunk. Simulated attack vectors including phishing, privilege escalation, lateral movement, and domain compromise. Developed detection rules and conducted forensic investigations using Autopsy.",
        tech: ["Active Directory", "Splunk", "Wazuh", "Kali Linux", "Metasploit", "Autopsy", "Detection Rules"],
        features: [
            "Windows Server AD Deployment",
            "Attack Simulation (Phishing/Lateral)",
            "Wazuh & Splunk Monitoring",
            "Detection Rule Engineering",
            "Autopsy Forensic Investigations"
        ],
        github: "https://github.com/MAHABUB122003",
        demo: "#",
        date: "2024",
        status: "Completed",
        order: 4
    },
    {
        id: 5,
        title: "Malware Analysis & Detection Engineering",
        category: "security",
        image: "https://images.unsplash.com/photo-1510511459019-5dee997dd1db?auto=format&fit=crop&w=800&q=80",
        description: "Analyzed RATs, keyloggers, and web shells; developed IOCs and Snort/YARA signatures.",
        fullDescription: "Analyzed RATs, Keyloggers, Web Shells, and Backdoors in isolated environments. Authored YARA and Snort rules; documented IOCs (Indicators of Compromise) and security mitigation strategies.",
        tech: ["Python", "YARA", "Snort", "Wireshark", "Sandbox", "EDR Analysis", "IOC Documentation"],
        features: [
            "Isolated Sandbox Investigation",
            "YARA & Snort Signature Authoring",
            "RAT & Web Shell Malware Analysis",
            "IOC Extraction & Documenting",
            "Mitigation Strategy Engineering"
        ],
        github: "https://github.com/MAHABUB122003",
        demo: "#",
        date: "2024",
        status: "Active",
        order: 5
    }
];

export function resetProjects() {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
    localStorage.removeItem(ORDER_KEY);
    return defaultProjects;
}

export function getProjects() {
    try {
        const stored = localStorage.getItem(PROJECTS_KEY);
        if (!stored) {
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
            return defaultProjects;
        }
        let projects = JSON.parse(stored);
        if (!Array.isArray(projects) || projects.length === 0) {
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
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
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
        return defaultProjects;
    }
}

export function saveProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
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
    const projects = getProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    projects[idx] = { ...projects[idx], ...updates };
    saveProjects(projects);
    return projects[idx];
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
