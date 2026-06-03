import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reconBanner from '../assets/Banner.png';
import { 
    FaShoppingCart, 
    FaShieldAlt, 
    FaBug, 
    FaCrosshairs, 
    FaGithub, 
    FaExternalLinkAlt,
    FaTimes,
    FaTools,
    FaStar,
    FaCodeBranch,
    FaRocket,
    FaArrowRight,
    FaCheckCircle,
    FaClock,
    FaCalendarAlt
} from 'react-icons/fa';

function Projects({ darkMode }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('all');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Track window width for responsive design
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    // ============================================
    // MY PROJECTS
    // ============================================
    const projects = [
        {
            id: 1,
            title: "Secure Full-Stack E-Commerce Application",
            category: "web",
            description: "Feature-rich e-commerce platform with integrated security headers and secure data models.",
            fullDescription: "Developed a complete e-commerce solution using React, Node.js, and MongoDB with integrated security headers and secure data models. Implemented Bcrypt for password hashing and JWT for session management. Performed manual security audits using Burp Suite and engineered the system to withstand OWASP Top 10 attack vectors.",
            icon: <FaShoppingCart />,
            tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bcrypt"],
            features: [
                "Secure JWT Authentication",
                "Bcrypt Password Encryption",
                "Security Headers Implementation",
                "OWASP Top 10 Protection",
                "Burp Suite Security Audits",
                "Production-Ready Security"
            ],
            github: "https://github.com/MAHABUB122003",
            demo: "#",
            image: null,
            imageAlt: "E-commerce Project Banner",
            date: "2024",
            status: "Completed"
        },
        {
            id: 2,
            title: "MAHABUB Recon Tool",
            category: "security",
            description: "Automated reconnaissance framework for bug bounty hunters and penetration testers with 25+ integrated security tools.",
            fullDescription: "Developed a powerful reconnaissance automation framework that integrates 25+ industry-standard security tools for subdomain enumeration, URL discovery, vulnerability assessment, visual reconnaissance, technology fingerprinting, and reporting. The tool streamlines bug bounty and penetration testing workflows by automating reconnaissance tasks, generating professional reports, and identifying potential attack surfaces efficiently.",
            icon: <FaTools />,
            tech: [
                "Bash", "Linux", "Subfinder", "Amass", "Assetfinder",
                "HTTPx", "Nuclei", "Naabu", "Katana", "Gowitness"
            ],
            features: [
                "15+ Subdomain Enumeration Tools",
                "Automated URL & Endpoint Discovery",
                "XSS, SQLi, LFI & SSRF Detection",
                "Visual Recon with Screenshot Capture",
                "Port Scanning & Service Enumeration",
                "Technology Fingerprinting",
                "Professional HTML Reports",
                "Multi-threaded High-Speed Scanning",
                "Smart URL Filtering & Deduplication",
                "Bug Bounty Automation Workflow"
            ],
            github: "https://github.com/MAHABUB122003/mahabub-recon-tool",
            demo: "https://github.com/MAHABUB122003/mahabub-recon-tool#readme",
            image: reconBanner,
            imageAlt: "MAHABUB Recon Tool Banner",
            date: "2024",
            status: "Active"
        },
        {
            id: 3,
            title: "Enterprise Red Team vs Blue Team Simulation",
            category: "security",
            description: "Complete security simulation with Windows Server AD and Wazuh/Splunk SIEM stack.",
            fullDescription: "Developed an end-to-end security simulation featuring a Windows Server Active Directory domain and a Wazuh/Splunk SIEM stack. Conducted full-chain attacks including initial access via phishing, lateral movement using pivoting techniques, and domain takeover. Implemented real-time detection rules and conducted post-incident forensic investigations using Autopsy.",
            icon: <FaShieldAlt />,
            tech: ["Active Directory", "Splunk", "Wazuh", "Kali Linux", "Metasploit", "Autopsy"],
            features: [
                "Full-Chain Attack Simulation",
                "Phishing Attack Vectors",
                "Lateral Movement Techniques",
                "Domain Takeover Scenarios",
                "Real-Time SIEM Monitoring",
                "Forensic Investigation"
            ],
            github: "https://github.com/MAHABUB122003",
            demo: "#",
            image: null,
            imageAlt: "Red Team Simulation Banner",
            date: "2023",
            status: "Completed"
        },
        {
            id: 4,
            title: "Malware Analysis & Detection Engineering",
            category: "security",
            description: "Custom sandbox environment for analyzing RATs and keyloggers with YARA rules.",
            fullDescription: "Analyzed custom Remote Access Trojans (RATs) and Keyloggers in an isolated sandbox environment to identify command-and-control (C2) patterns. Authored custom YARA and Snort signatures to detect malicious traffic and unauthorized credential exfiltration. Developed automated detection rules for real-time threat hunting.",
            icon: <FaBug />,
            tech: ["Python", "YARA", "Snort", "Wireshark", "Sandbox", "C2 Analysis"],
            features: [
                "Malware Behavior Analysis",
                "C2 Pattern Identification",
                "YARA Rule Creation",
                "Snort Signature Development",
                "Network Traffic Analysis",
                "Threat Detection Automation"
            ],
            github: "https://github.com/MAHABUB122003",
            demo: "#",
            image: null,
            imageAlt: "Malware Analysis Banner",
            date: "2024",
            status: "In Progress"
        },
        {
            id: 5,
            title: "Bug Bounty & Security Research",
            category: "security",
            description: "Active bug bounty hunting and CTF participation for vulnerability discovery.",
            fullDescription: "Active bug bounty hunter on multiple platforms, discovering and responsibly disclosing security vulnerabilities. Regular participant in Capture The Flag (CTF) competitions, specializing in web application security, reverse engineering, and privilege escalation challenges. Consistently ranked in top positions across various security platforms.",
            icon: <FaCrosshairs />,
            tech: ["Burp Suite", "Nmap", "Metasploit", "OWASP Tools", "SQLmap", "Nuclei"],
            features: [
                "Active Bug Bounty Hunting",
                "Vulnerability Disclosure",
                "CTF Competition Participant",
                "Web Security Testing",
                "Privilege Escalation",
                "Reverse Engineering"
            ],
            github: "https://github.com/MAHABUB122003",
            demo: "#",
            image: null,
            imageAlt: "Bug Bounty Banner",
            date: "2024",
            status: "Active"
        }
    ];

    const categories = [
        { id: 'all', name: 'All Projects', icon: 'all' },
        { id: 'web', name: 'Web Development', icon: 'web' },
        { id: 'security', name: 'Security Tools', icon: 'security' }
    ];

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode ? 'bg-gray-800/50' : 'bg-white/50',
        border: darkMode ? 'border-gray-700' : 'border-gray-200',
        glassBg: darkMode ? 'bg-gray-900/80' : 'bg-white/80',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        },
        hover: {
            y: -8,
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.9, 
            y: 50,
            transition: { duration: 0.2 }
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch(status) {
            case 'Active': return 'bg-green-500/20 text-green-500';
            case 'Completed': return 'bg-blue-500/20 text-blue-500';
            case 'In Progress': return 'bg-yellow-500/20 text-yellow-500';
            default: return 'bg-gray-500/20 text-gray-500';
        }
    };

    // Get category display text
    const getCategoryDisplay = (category) => {
        return category === 'security' ? 'Cybersecurity' : 'Web Development';
    };

    return (
        <section id="projects" className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <motion.div 
                        className="inline-block mb-3 sm:mb-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full backdrop-blur-sm">
                            <span className="text-xs sm:text-sm font-semibold text-orange-500">
                                {isMobile ? 'PORTFOLIO' : 'SECURITY RESEARCH & DEVELOPMENT'}
                            </span>
                        </div>
                    </motion.div>
                    
                    <motion.h2 
                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${theme.textPrimary} px-4`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Featured <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                            {isMobile ? 'Work' : 'Projects'}
                        </span>
                    </motion.h2>
                    
                    <motion.div 
                        className="w-16 sm:w-20 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full mb-4 sm:mb-6"
                        initial={{ width: 0 }}
                        whileInView={{ width: isMobile ? 64 : 80 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    />
                    
                    <motion.p 
                        className={`${theme.textSecondary} max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {isMobile 
                            ? 'Cybersecurity tools and web applications'
                            : 'Cybersecurity tools, web applications, and security research projects'
                        }
                    </motion.p>
                </motion.div>

                {/* Filter Buttons - Responsive */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${
                                filter === cat.id
                                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                                    : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                            }`}
                        >
                            {isMobile && cat.id !== 'all' ? cat.name.split(' ')[0] : cat.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid - Responsive */}
                <motion.div 
                    className={`grid gap-4 sm:gap-5 md:gap-6 ${
                        isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-2'
                    }`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                whileHover="hover"
                                onHoverStart={() => setHoveredCard(project.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className={`rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border ${theme.border} ${theme.cardBg} backdrop-blur-sm transition-all duration-300 cursor-pointer relative`}
                                onClick={() => setSelectedProject(project)}
                                layout
                            >
                                {/* Hover Glow */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-purple-500/0 rounded-xl sm:rounded-2xl pointer-events-none"
                                    animate={{ opacity: hoveredCard === project.id ? 0.1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                
                                {/* Project Banner */}
                                <motion.div 
                                    className="relative h-32 sm:h-40 md:h-48 overflow-hidden bg-gradient-to-r from-orange-500/20 to-purple-500/20"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {project.image ? (
                                        <motion.img 
                                            src={project.image} 
                                            alt={project.imageAlt || project.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const parent = e.target.parentElement;
                                                if (parent) {
                                                    parent.classList.add('flex', 'items-center', 'justify-center');
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <motion.span 
                                                className="text-4xl sm:text-5xl md:text-6xl"
                                                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                            >
                                                {project.icon}
                                            </motion.span>
                                        </div>
                                    )}
                                    
                                    {/* Badges */}
                                    <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
                                        <motion.div 
                                            className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-black/50 backdrop-blur-sm rounded-lg"
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                        >
                                            <span className="text-white text-xs font-medium capitalize">
                                                {project.category === 'security' ? 'Security' : 'Web'}
                                            </span>
                                        </motion.div>
                                        <motion.div 
                                            className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs font-medium ${getStatusColor(project.status)}`}
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            {project.status}
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 md:p-6">
                                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                                        <div className="flex-1 min-w-0">
                                            <motion.h3 
                                                className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold ${theme.textPrimary} mb-1 truncate`}
                                            >
                                                {project.title}
                                            </motion.h3>
                                            <div className="flex items-center gap-2">
                                                <p className={`text-xs ${theme.textMuted} capitalize`}>
                                                    {getCategoryDisplay(project.category)}
                                                </p>
                                                <span className={`text-xs ${theme.textMuted}`}>•</span>
                                                <p className={`text-xs ${theme.textMuted}`}>
                                                    <FaCalendarAlt className="inline mr-1 text-xs" />
                                                    {project.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <motion.p 
                                        className={`${theme.textSecondary} text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2`}
                                    >
                                        {project.description}
                                    </motion.p>
                                    
                                    {/* Tech Stack */}
                                    <motion.div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                                        {project.tech.slice(0, isMobile ? 3 : 4).map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium ${
                                                    darkMode ? 'bg-gray-700/70 text-gray-300' : 'bg-gray-100/70 text-gray-600'
                                                }`}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                        {project.tech.length > (isMobile ? 3 : 4) && (
                                            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium ${
                                                darkMode ? 'bg-gray-700/70 text-gray-300' : 'bg-gray-100/70 text-gray-600'
                                            }`}>
                                                +{project.tech.length - (isMobile ? 3 : 4)}
                                            </span>
                                        )}
                                    </motion.div>

                                    {/* View Details Button */}
                                    <motion.button
                                        className={`w-full py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                                            darkMode
                                                ? 'bg-gray-700/50 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white'
                                                : 'bg-gray-100/50 text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        View Details 
                                        <FaArrowRight className="text-xs" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal - Full Screen on Mobile, Large on Desktop */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`w-full ${isMobile ? 'max-w-full h-full rounded-none' : 'max-w-4xl max-h-[90vh] rounded-2xl'} 
                                ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl overflow-hidden flex flex-col`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header - Responsive Banner */}
                            <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-r from-orange-500 to-purple-500 overflow-hidden flex-shrink-0">
                                {selectedProject.image ? (
                                    <img 
                                        src={selectedProject.image} 
                                        alt={selectedProject.imageAlt}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-5xl sm:text-6xl md:text-7xl">
                                            {selectedProject.icon}
                                        </span>
                                    </div>
                                )}
                                
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-orange-500 transition-colors text-white"
                                >
                                    <FaTimes className="text-sm sm:text-base" />
                                </button>

                                {/* Status Badge in Modal */}
                                <div className="absolute bottom-3 left-3">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(selectedProject.status)} backdrop-blur-sm`}>
                                        {selectedProject.status}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                                {/* Title Section */}
                                <div>
                                    <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${theme.textPrimary} mb-2`}>
                                        {selectedProject.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            selectedProject.category === 'security' 
                                                ? 'bg-orange-500/20 text-orange-500' 
                                                : 'bg-purple-500/20 text-purple-500'
                                        }`}>
                                            {selectedProject.category === 'security' ? 'Security Tool' : 'Web Application'}
                                        </span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <FaCalendarAlt /> {selectedProject.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Overview */}
                                <div>
                                    <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${theme.textPrimary} flex items-center gap-2`}>
                                        Overview
                                    </h3>
                                    <p className={`${theme.textSecondary} leading-relaxed text-xs sm:text-sm md:text-base`}>
                                        {selectedProject.fullDescription}
                                    </p>
                                </div>

                                {/* Features Grid - Responsive */}
                                <div>
                                    <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${theme.textPrimary} flex items-center gap-2`}>
                                        Key Features
                                    </h3>
                                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-2 sm:gap-3`}>
                                        {selectedProject.features.map((feature, i) => (
                                            <motion.div 
                                                key={i} 
                                                className="flex items-start gap-2"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                            >
                                                <FaCheckCircle className="text-orange-500 text-xs sm:text-sm mt-0.5 flex-shrink-0" />
                                                <span className={`text-xs sm:text-sm ${theme.textSecondary}`}>
                                                    {feature}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div>
                                    <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${theme.textPrimary} flex items-center gap-2`}>
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {selectedProject.tech.map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${
                                                    darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                                                }`}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: i * 0.03 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons - Responsive */}
                                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 pt-4`}>
                                    <motion.a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaGithub /> View on GitHub
                                    </motion.a>
                                    {selectedProject.demo !== "#" && (
                                        <motion.a
                                            href={selectedProject.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-sm"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FaExternalLinkAlt /> Live Demo
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Projects;