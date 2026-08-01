import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaTimes,
    FaCheckCircle,
    FaCalendarAlt,
    FaShieldAlt,
    FaBrain,
    FaLaptopCode,
    FaSearch,
    FaFolderOpen,
    FaArrowRight,
    FaStar,
    FaCode
} from 'react-icons/fa';
import { getProjects } from '../utils/projectStorage';
import IslamicPattern from './IslamicPattern';

function Projects({ darkMode }) {
    const [projects, setProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const theme = {
        bg: darkMode ? 'bg-gray-950' : 'bg-slate-50',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode
            ? 'bg-gray-900/70 backdrop-blur-xl border-gray-800/80 text-white'
            : 'bg-white/90 backdrop-blur-xl border-gray-200/90 text-gray-900 shadow-lg shadow-gray-200/50',
        pillBg: darkMode
            ? 'bg-gray-900/80 border-gray-800 text-gray-300 hover:text-white'
            : 'bg-white border-gray-200 text-gray-700 hover:text-gray-900 shadow-sm',
        pillActive: 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md shadow-orange-500/25 border-transparent font-bold',
        badgeBg: darkMode ? 'bg-gray-950/60 text-gray-300 border-gray-800' : 'bg-gray-100 text-gray-700 border-gray-200',
        modalBg: darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900',
        searchBg: darkMode ? 'bg-gray-900/90 border-gray-800 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm',
        innerCard: darkMode ? 'bg-gray-950/60 border-gray-800' : 'bg-gray-50 border-gray-200',
    };

    const categories = [
        { id: 'all', label: 'All Work', icon: <FaFolderOpen /> },
        { id: 'security', label: 'Cybersecurity', icon: <FaShieldAlt /> },
        { id: 'ml', label: 'Machine Learning', icon: <FaBrain /> },
        { id: 'web', label: 'Full-Stack Web', icon: <FaLaptopCode /> },
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

    const getCategoryColor = (category) => {
        const norm = normalizeCategory(category);
        if (norm === 'security') return { text: 'text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-500/15' };
        if (norm === 'ml') return { text: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-500/15' };
        return { text: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/15' };
    };

    return (
        <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-500/8 via-pink-500/6 to-transparent blur-[140px]" />
                <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/8 via-cyan-500/6 to-transparent blur-[150px]" />
                {/* Islamic girih pattern accent */}
                <div
                    className={`absolute -top-24 -left-24 w-80 h-80 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    style={{ opacity: darkMode ? 0.04 : 0.05 }}
                >
                    <IslamicPattern strokeWidth={1} />
                </div>
                <div
                    className={`absolute -bottom-24 -right-24 w-72 h-72 rotate-90 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    style={{ opacity: darkMode ? 0.03 : 0.04 }}
                >
                    <IslamicPattern strokeWidth={1} />
                </div>
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
                        <span className="text-xs font-semibold tracking-wider uppercase animated-gradient-text">
                            FEATURED PORTFOLIO
                        </span>
                    </div>

                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${theme.textPrimary} mb-3`}>
                        Featured <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Projects & Solutions</span>
                    </h2>

                    <p className={`${theme.textSecondary} max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed`}>
                        Production-grade applications combining AI threat classification, malware detection, active pentesting labs, and secure full-stack architectures.
                    </p>
                </motion.div>

                {/* Filters + Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 border flex items-center gap-1.5 ${
                                    activeCategory === cat.id ? theme.pillActive : theme.pillBg
                                }`}
                            >
                                <span className="text-xs">{cat.icon}</span>
                                {cat.label}
                            </motion.button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects or tech..."
                            className={`w-full pl-9 pr-3 py-2.5 sm:py-2 rounded-xl border text-xs outline-none transition-all input-glow ${theme.searchBg}`}
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {filteredProjects.map((project, idx) => {
                            const catColor = getCategoryColor(project.category);
                            const isFeatured = idx === 0 && activeCategory === 'all';

                            return (
                                <motion.div
                                    key={project.id || idx}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                                    className={`group rounded-2xl border ${theme.cardBg} flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.015] card-hover-glow ${
                                        isFeatured ? 'ring-1 ring-orange-500/30' : ''
                                    }`}
                                >
                                    {/* Featured Banner */}
                                    {isFeatured && (
                                        <div className="featured-badge text-white text-[10px] font-bold font-mono text-center py-1.5 flex items-center justify-center gap-1.5">
                                            <FaStar className="text-[10px]" />
                                            <span>FEATURED PROJECT</span>
                                            <FaStar className="text-[10px]" />
                                        </div>
                                    )}

                                    {/* Project Cover Image */}
                                    <div
                                        className="relative w-full h-40 overflow-hidden bg-gray-950 cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/20 via-pink-500/15 to-purple-600/20`}>
                                                <div className="text-center p-3">
                                                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-2 text-2xl">
                                                        {getCategoryIcon(project.category)}
                                                    </div>
                                                    <span className="text-[10px] font-mono font-bold text-gray-300 uppercase">{project.category}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Category + Status overlay */}
                                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-md border ${catColor.bg} ${catColor.border} ${catColor.text} uppercase tracking-wider flex items-center gap-1 shadow-md`}>
                                                {getCategoryIcon(project.category)}
                                                <span>{project.category || "Full-Stack"}</span>
                                            </span>
                                            {project.status && (
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold backdrop-blur-md text-white shadow-md ${
                                                    project.status === 'Active' ? 'bg-emerald-500/90' : 'bg-blue-500/80'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            )}
                                        </div>

                                        {/* Click to expand hint */}
                                        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] text-white/80 font-mono bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                                Click to expand
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                                        <div className="space-y-2">
                                            <span className={`text-[10px] font-mono ${theme.textMuted} flex items-center gap-1`}>
                                                <FaCalendarAlt className="text-[9px]" /> {project.date || "2024"}
                                            </span>

                                            <h3
                                                className={`text-base font-bold ${theme.textPrimary} leading-snug group-hover:text-orange-500 transition-colors cursor-pointer line-clamp-2`}
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                {project.title}
                                            </h3>

                                            <p className={`${theme.textSecondary} text-xs leading-relaxed line-clamp-2`}>
                                                {project.description}
                                            </p>

                                            {/* Tech Pills */}
                                            <div className="flex flex-wrap gap-1 pt-1">
                                                {project.tech && project.tech.slice(0, 4).map((t, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className={`px-2 py-1 rounded-md text-[11px] font-medium border ${theme.badgeBg} tag-pill`}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                                {project.tech && project.tech.length > 4 && (
                                                    <span className={`px-2 py-1 rounded-md text-[11px] font-mono ${theme.textMuted} border ${theme.badgeBg}`}>
                                                        +{project.tech.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className={`pt-3 mt-1 border-t ${darkMode ? 'border-gray-800/80' : 'border-gray-200'} flex items-center justify-between`}>
                                            <motion.button
                                                whileHover={{ x: 3 }}
                                                onClick={() => setSelectedProject(project)}
                                                className="text-xs font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1 transition-colors"
                                            >
                                                <span>View Details</span>
                                                <FaArrowRight className="text-[9px]" />
                                            </motion.button>

                                            <div className="flex items-center gap-2">
                                                {project.github && (
                                                    <motion.a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.1, y: -1 }}
                                                        className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs transition-all ${
                                                            darkMode ? 'bg-gray-900 border-gray-700 text-gray-300 hover:text-white hover:border-gray-600' : 'bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900 shadow-sm'
                                                        }`}
                                                        title="GitHub Repository"
                                                    >
                                                        <FaGithub />
                                                    </motion.a>
                                                )}
                                                {project.demo && project.demo !== '#' && (
                                                    <motion.a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.1, y: -1 }}
                                                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 text-white flex items-center justify-center text-xs shadow-sm hover:shadow-orange-500/30 transition-all"
                                                        title="Live Demo"
                                                    >
                                                        <FaExternalLinkAlt />
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </AnimatePresence>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <FaSearch className={`text-4xl ${theme.textMuted} mx-auto mb-3`} />
                        <p className={`${theme.textMuted} text-sm`}>No projects match your search.</p>
                    </motion.div>
                )}

                {/* ── Detail Modal ── */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                            onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
                        >
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                                className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden ${theme.modalBg}`}
                            >
                                {/* Modal Image Header */}
                                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-950">
                                    {selectedProject.image && (
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

                                    {/* Close Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-red-500/80 transition-all flex items-center justify-center text-xs"
                                    >
                                        <FaTimes />
                                    </motion.button>

                                    <div className="absolute bottom-4 left-5 right-5">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-md border mb-2 ${getCategoryColor(selectedProject.category).bg} ${getCategoryColor(selectedProject.category).border} ${getCategoryColor(selectedProject.category).text}`}>
                                            {getCategoryIcon(selectedProject.category)}
                                            <span className="uppercase">{selectedProject.category}</span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                                            {selectedProject.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-5 sm:p-6 max-h-[55vh] overflow-y-auto space-y-5">
                                    <div>
                                        <h4 className={`text-[11px] font-bold font-mono ${theme.textMuted} uppercase tracking-wider mb-2`}>Project Overview</h4>
                                        <p className={`${theme.textSecondary} text-xs sm:text-sm leading-relaxed`}>
                                            {selectedProject.fullDescription || selectedProject.description}
                                        </p>
                                    </div>

                                    {/* Key Features */}
                                    {selectedProject.features && (
                                        <div>
                                            <h4 className={`text-[11px] font-bold font-mono ${theme.textMuted} uppercase tracking-wider mb-2`}>Key Features</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {selectedProject.features.map((feature, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className={`p-2.5 rounded-xl border ${theme.innerCard} flex items-center gap-2`}
                                                    >
                                                        <FaCheckCircle className="text-orange-500 text-xs flex-shrink-0" />
                                                        <span className={`text-xs font-medium ${theme.textPrimary}`}>{feature}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tech Stack */}
                                    {selectedProject.tech && (
                                        <div>
                                            <h4 className={`text-[11px] font-bold font-mono ${theme.textMuted} uppercase tracking-wider mb-2`}>Technologies Used</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {selectedProject.tech.map((tech, i) => (
                                                    <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${theme.badgeBg} tag-pill`}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                <div className={`px-5 sm:px-6 py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between gap-3`}>
                                    <div className="flex items-center gap-2.5">
                                        {selectedProject.github && (
                                            <motion.a
                                                href={selectedProject.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.04 }}
                                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-orange-500/30 transition-all"
                                            >
                                                <FaGithub /> View Repository
                                            </motion.a>
                                        )}
                                        {selectedProject.demo && selectedProject.demo !== '#' && (
                                            <motion.a
                                                href={selectedProject.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.04 }}
                                                className={`px-4 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
                                                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-900 hover:bg-gray-800'
                                                }`}
                                            >
                                                <FaExternalLinkAlt /> Live Demo
                                            </motion.a>
                                        )}
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setSelectedProject(null)}
                                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                            darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        Close
                                    </motion.button>
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
