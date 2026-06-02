import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaShoppingCart, 
    FaShieldAlt, 
    FaBug, 
    FaCrosshairs, 
    FaGithub, 
    FaExternalLinkAlt,
    FaTimes
} from 'react-icons/fa';

function Projects({ darkMode }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('all');

    // ============================================
    // MY ACTUAL PROJECTS - Based on your resume
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
            image: "🛒"
        },
        {
            id: 2,
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
            image: "🛡️"
        },
        {
            id: 3,
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
            image: "🐛"
        },
        {
            id: 4,
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
            image: "🎯"
        }
    ];
    // ============================================
    // END OF MY PROJECTS
    // ============================================

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'web', name: 'Web Development' },
        { id: 'security', name: 'Security' }
    ];

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
        border: darkMode ? 'border-gray-700' : 'border-gray-200',
    };

    return (
        <section id="projects" className="py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-block mb-4">
                        <div className="px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full">
                            <span className="text-xs sm:text-sm font-semibold text-orange-500">MY PORTFOLIO</span>
                        </div>
                    </div>
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${theme.textPrimary}`}>
                        My <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full mb-6"></div>
                    <p className={`${theme.textSecondary} max-w-2xl mx-auto text-sm sm:text-base px-4`}>
                        Here are some of my key projects and security research work
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                                filter === cat.id
                                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                                    : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className={`rounded-2xl overflow-hidden shadow-lg border ${theme.border} ${theme.cardBg} transition-all duration-300 cursor-pointer`}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Project Header */}
                            <div className={`p-5 sm:p-6 border-b ${theme.border}`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white text-lg sm:text-xl">
                                            {project.icon}
                                        </div>
                                        <div>
                                            <h3 className={`text-base sm:text-lg md:text-xl font-bold ${theme.textPrimary}`}>{project.title}</h3>
                                            <p className={`text-xs ${theme.textMuted} mt-0.5 capitalize`}>{project.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaGithub className={`${theme.textMuted} text-sm sm:text-base`} />
                                        </a>
                                        <a 
                                            href={project.demo} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaExternalLinkAlt className={`${theme.textMuted} text-sm sm:text-base`} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Project Body */}
                            <div className="p-5 sm:p-6">
                                <p className={`${theme.textSecondary} text-xs sm:text-sm mb-4 leading-relaxed`}>
                                    {project.description}
                                </p>
                                
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                                    {project.tech.slice(0, 4).map((tech, i) => (
                                        <span
                                            key={i}
                                            className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs font-medium ${
                                                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech.length > 4 && (
                                        <span className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs font-medium ${
                                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            +{project.tech.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* View Details Button */}
                                <button
                                    className={`w-full py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white'
                                    }`}
                                >
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal for Project Details */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className={`max-w-2xl w-full rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className={`sticky top-0 p-5 sm:p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${theme.border}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white text-lg sm:text-xl">
                                                {selectedProject.icon}
                                            </div>
                                            <h2 className={`text-lg sm:text-xl font-bold ${theme.textPrimary}`}>{selectedProject.title}</h2>
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
                                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-2xl">
                                        <span className="text-5xl sm:text-6xl">{selectedProject.image}</span>
                                    </div>

                                    <div>
                                        <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${theme.textPrimary}`}>Overview</h3>
                                        <p className={`${theme.textSecondary} leading-relaxed text-xs sm:text-sm`}>{selectedProject.fullDescription}</p>
                                    </div>

                                    <div>
                                        <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${theme.textPrimary}`}>Key Features</h3>
                                        <div className="grid sm:grid-cols-2 gap-2">
                                            {selectedProject.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                                    <span className={`text-xs sm:text-sm ${theme.textSecondary}`}>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${theme.textPrimary}`}>Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${
                                                        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                        <a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-sm"
                                        >
                                            <FaGithub /> View on GitHub
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default Projects;