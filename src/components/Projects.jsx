import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaTerminal,
    FaTimes,
    FaCheckCircle,
    FaCalendarAlt,
    FaShieldAlt,
    FaBrain,
    FaLaptopCode,
    FaSearch,
    FaFolderOpen,
    FaArrowRight
} from 'react-icons/fa';

import { getProjects } from '../utils/projectStorage';

function Projects({ darkMode }) {
    const [projects, setProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const loadedProjects = getProjects();
        setProjects(loadedProjects);
    }, []);

    const theme = {
        bg: darkMode ? 'bg-gray-950' : 'bg-slate-50',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode
            ? 'bg-gray-900/70 backdrop-blur-xl border-gray-800/80 text-white shadow-xl shadow-black/40 hover:border-orange-500/40'
            : 'bg-white/90 backdrop-blur-xl border-gray-200/90 text-gray-900 shadow-lg shadow-gray-200/50 hover:border-orange-500/40',
        pillBg: darkMode
            ? 'bg-gray-900/80 border-gray-800 text-gray-300 hover:text-white'
            : 'bg-white border-gray-200 text-gray-700 hover:text-gray-900 shadow-sm',
        pillActive: 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md shadow-orange-500/25 border-transparent font-bold',
        badgeBg: darkMode ? 'bg-gray-950/60 text-gray-300 border-gray-800' : 'bg-gray-100 text-gray-700 border-gray-200',
        modalBg: darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900',
        searchBg: darkMode ? 'bg-gray-900/90 border-gray-800 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm',
    };

    const categories = [
        { id: 'all', label: 'All Work' },
        { id: 'security', label: 'Cybersecurity' },
        { id: 'ml', label: 'Machine Learning' },
        { id: 'web', label: 'Full-Stack Web' },
    ];

    const normalizeCategory = (cat) => {
        if (!cat) return 'web';
        const lower = cat.toLowerCase();
        if (lower.includes('ml') || lower.includes('machine') || lower.includes('ai')) return 'ml';
        if (lower.includes('security') || lower.includes('cyber') || lower.includes('threat')) return 'security';
        return 'web';
    };

    const filteredProjects = projects.filter(project => {
        const normCat = normalizeCategory(project.category);
        const matchesCategory = activeCategory === 'all' || normCat === activeCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (project.tech && project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
    });

    const getCategoryIcon = (category) => {
        const norm = normalizeCategory(category);
        if (norm === 'security') return <FaShieldAlt className="text-orange-500" />;
        if (norm === 'ml') return <FaBrain className="text-purple-500" />;
        return <FaLaptopCode className="text-cyan-500" />;
    };

    return (
        <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-transparent blur-[140px]" />
                <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/10 via-cyan-500/10 to-transparent blur-[150px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md mb-3 border border-orange-500/30 bg-orange-500/10">
                        <FaFolderOpen className="text-orange-500 text-xs animate-pulse" />
                        <span className="text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                            FEATURED PORTFOLIO
                        </span>
                    </div>

                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${theme.textPrimary} mb-3`}>
                        Featured <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Projects & Solutions</span>
                    </h2>

                    <p className={`${theme.textSecondary} max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed`}>
                        Production-grade applications combining AI threat classification, WordPress malware detection, active pentesting labs, and responsive full-stack architectures.
                    </p>
                </motion.div>

                {/* Category Filters & Search Input */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-8">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                                    activeCategory === cat.id ? theme.pillActive : theme.pillBg
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Compact Search Bar */}
                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search project or tech..."
                            className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs outline-none transition-all focus:ring-2 focus:ring-orange-500/50 ${theme.searchBg}`}
                        />
                    </div>
                </div>

                {/* Compact Projects Showcase Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.04 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl border ${theme.cardBg} flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-[1.015] hover:shadow-xl`}
                        >
                            {/* Compact Project Cover Image Header */}
                            <div
                                className="relative w-full h-36 sm:h-40 overflow-hidden bg-gray-950 cursor-pointer group"
                                onClick={() => setSelectedProject(project)}
                            >
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-600/20">
                                        <div className="text-center p-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-1 text-lg">
                                                {getCategoryIcon(project.category)}
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-gray-300 uppercase">{project.category}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-black/20" />

                                {/* Category & Status Overlay */}
                                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md border border-white/20 text-orange-400 uppercase tracking-wider flex items-center gap-1 shadow-md">
                                        {getCategoryIcon(project.category)}
                                        <span>{project.category || "Full-Stack"}</span>
                                    </span>
                                    {project.status && (
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/90 backdrop-blur-md text-white shadow-md">
                                            {project.status}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Compact Card Content Body */}
                            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={`text-[10px] font-mono ${theme.textMuted} flex items-center gap-1`}>
                                            <FaCalendarAlt /> {project.date || "2024"}
                                        </span>
                                    </div>

                                    <h3
                                        className={`text-base font-bold ${theme.textPrimary} leading-snug hover:text-orange-500 transition-colors cursor-pointer line-clamp-1`}
                                        onClick={() => setSelectedProject(project)}
                                        title={project.title}
                                    >
                                        {project.title}
                                    </h3>

                                    <p className={`${theme.textSecondary} text-xs leading-relaxed line-clamp-2`}>
                                        {project.description}
                                    </p>

                                    {/* Tech Pills */}
                                    <div className="flex flex-wrap gap-1 pt-1">
                                        {project.tech && project.tech.slice(0, 5).map((t, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${theme.badgeBg}`}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech && project.tech.length > 5 && (
                                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${theme.textMuted}`}>
                                                +{project.tech.length - 5}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Compact Footer Action Bar */}
                                <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-800/80 flex items-center justify-between">
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1"
                                    >
                                        <span>View Details</span>
                                        <FaArrowRight className="text-[9px]" />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs transition-all hover:scale-105 ${
                                                    darkMode ? 'bg-gray-900 border-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900 shadow-sm'
                                                }`}
                                                title="View GitHub Repository"
                                            >
                                                <FaGithub />
                                            </a>
                                        )}
                                        {project.demo && project.demo !== '#' && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs shadow-sm hover:scale-105 transition-all"
                                                title="Live Demo"
                                            >
                                                <FaExternalLinkAlt />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Compact Interactive Detail Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden ${theme.modalBg}`}
                            >
                                {/* Modal Image Header Banner */}
                                <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-gray-950">
                                    {selectedProject.image && (
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black transition-all text-xs"
                                    >
                                        <FaTimes />
                                    </button>

                                    <div className="absolute bottom-3 left-5 right-5">
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase">
                                            {selectedProject.category || "Project Specs"}
                                        </span>
                                        <h3 className="text-lg sm:text-xl font-bold text-white mt-1 drop-shadow-md">
                                            {selectedProject.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Modal Content Body */}
                                <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
                                    <div>
                                        <h4 className={`text-xs font-bold font-mono ${theme.textMuted} uppercase mb-1.5`}>Overview</h4>
                                        <p className={`${theme.textSecondary} text-xs sm:text-sm leading-relaxed`}>
                                            {selectedProject.fullDescription || selectedProject.description}
                                        </p>
                                    </div>

                                    {/* Key Features */}
                                    <div>
                                        <h4 className={`text-xs font-bold font-mono ${theme.textMuted} uppercase mb-2`}>Key Features & Deliverables</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {(selectedProject.features || [
                                                "AI-powered malware detection",
                                                "Real-time scanning & WAF",
                                                "REST API services integration",
                                                "Automated threat classification"
                                            ]).map((feature, i) => (
                                                <div key={i} className={`p-2.5 rounded-xl border ${theme.badgeBg} flex items-center gap-2`}>
                                                    <FaCheckCircle className="text-orange-500 text-xs flex-shrink-0" />
                                                    <span className={`text-xs font-medium ${theme.textPrimary}`}>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h4 className={`text-xs font-bold font-mono ${theme.textMuted} uppercase mb-2`}>Technologies Used</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedProject.tech && selectedProject.tech.map((tech, i) => (
                                                <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${theme.badgeBg}`}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer Actions */}
                                <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        {selectedProject.github && (
                                            <a
                                                href={selectedProject.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:scale-105 transition-all"
                                            >
                                                <FaGithub /> View Repository
                                            </a>
                                        )}
                                        {selectedProject.demo && selectedProject.demo !== '#' && (
                                            <a
                                                href={selectedProject.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:scale-105 transition-all"
                                            >
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default Projects;
