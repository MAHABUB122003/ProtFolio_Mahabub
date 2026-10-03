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
    FaCode,
    FaLayerGroup
} from 'react-icons/fa';
import { getProjects, syncProjectsFromBackend } from '../utils/projectStorage';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

function Projects({ darkMode }) {
    const [projects, setProjects] = useState(() => getProjects());
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        setProjects(getProjects());

        const handleUpdate = () => {
            setProjects(getProjects());
        };

        window.addEventListener('portfolio_projects_updated', handleUpdate);
        window.addEventListener('storage', handleUpdate);

        // Fetch fresh list from backend
        syncProjectsFromBackend().then((res) => {
            if (res) {
                setProjects(getProjects());
            }
        }).catch(() => {});

        return () => {
            window.removeEventListener('portfolio_projects_updated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    const categories = [
        { id: 'all', label: 'All Projects', icon: FaFolderOpen },
        { id: 'security', label: 'Cybersecurity & Pentest', icon: FaShieldAlt },
        { id: 'ml', label: 'Machine Learning & AI', icon: FaBrain },
        { id: 'web', label: 'Full-Stack Web', icon: FaLaptopCode },
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
            (project.fullDescription && project.fullDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.tech && project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
    });

    const getCategoryDetails = (category) => {
        const norm = normalizeCategory(category);
        if (norm === 'security') {
            return {
                icon: FaShieldAlt,
                color: 'text-rose-400',
                border: 'border-rose-500/30',
                bg: 'bg-rose-500/10 text-rose-300',
                label: 'Cybersecurity'
            };
        }
        if (norm === 'ml') {
            return {
                icon: FaBrain,
                color: 'text-blue-400',
                border: 'border-blue-500/30',
                bg: 'bg-blue-500/10 text-blue-300',
                label: 'Machine Learning'
            };
        }
        return {
            icon: FaLaptopCode,
            color: 'text-emerald-400',
            border: 'border-emerald-500/30',
            bg: 'bg-emerald-500/10 text-emerald-300',
            label: 'Full-Stack Web'
        };
    };

    return (
        <section
            id="projects"
            className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-[#000000] border-t border-white/[0.06]"
        >
            {/* Ambient Background Flares */}
            <div className="absolute top-[15%] right-[-5%] w-[550px] h-[550px] rounded-full bg-rose-500/[0.02] blur-[170px] pointer-events-none" />
            <div className="absolute bottom-[15%] left-[-5%] w-[550px] h-[550px] rounded-full bg-blue-500/[0.02] blur-[170px] pointer-events-none" />

            <div className="w-full max-w-[1350px] mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerContainer}
                    className="space-y-3 mb-14 text-center lg:text-left"
                >
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-mono tracking-widest uppercase">
                        <FaFolderOpen className="text-xs" />
                        <span>Featured Engineering Portfolio</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-rose-300">Projects & Solutions</span>
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                        Production-grade applications combining AI threat classification, offensive security research labs, and hardened full-stack web platforms.
                    </motion.p>
                </motion.div>

                {/* Filter Controls & Instant Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 rounded-2xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl">
                        {categories.map((cat) => {
                            const IconComp = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                                        isActive
                                            ? 'text-white bg-[#f43f5e] shadow-lg shadow-rose-900/40 font-semibold'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <IconComp className="text-xs" />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Search Input */}
                    <div className="relative w-full md:w-72">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                        <input
                            type="text"
                            placeholder="Search by title, tech or tag..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, idx) => {
                            const catDetails = getCategoryDetails(project.category);
                            const CatIcon = catDetails.icon;

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                                    key={project.id || idx}
                                    whileHover={{ y: -4 }}
                                    className="group rounded-3xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-rose-500/40 shadow-2xl shadow-black/80"
                                >
                                    {/* Top Cover Image Area */}
                                    <div
                                        className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#0a0a14] cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-500/10 via-slate-900 to-black">
                                                <div className="text-center p-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-2 text-2xl text-white">
                                                        <CatIcon className={catDetails.color} />
                                                    </div>
                                                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">{catDetails.label}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Ambient dark gradient vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/40 to-transparent" />

                                        {/* Category & Status Overlay Pills */}
                                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold backdrop-blur-xl border ${catDetails.bg} ${catDetails.border} flex items-center gap-1.5 shadow-lg`}>
                                                <CatIcon className="text-xs" />
                                                <span>{catDetails.label}</span>
                                            </span>

                                            {project.status && (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 flex items-center gap-1.5 shadow-lg">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span>{project.status}</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Quick Expand Hint */}
                                        <div className="absolute bottom-3 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-[11px] text-white/90 font-mono bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5">
                                                <span>View Details</span>
                                                <FaArrowRight className="text-[9px] text-rose-400" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-2.5">
                                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <FaCalendarAlt className="text-rose-400" />
                                                    <span>{project.date || '2024'}</span>
                                                </span>
                                                <span className="capitalize text-slate-400">{project.category || 'Project'}</span>
                                            </div>

                                            <h3
                                                onClick={() => setSelectedProject(project)}
                                                className="text-lg font-bold text-white group-hover:text-rose-200 transition-colors cursor-pointer leading-snug line-clamp-2"
                                            >
                                                {project.title}
                                            </h3>

                                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-normal">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack Pills */}
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {project.tech && project.tech.slice(0, 4).map((t, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:border-white/20 transition-all"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                                {project.tech && project.tech.length > 4 && (
                                                    <span className="px-2 py-1 rounded-lg text-xs font-mono bg-white/[0.02] border border-white/[0.06] text-slate-500">
                                                        +{project.tech.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Footer Actions */}
                                        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="text-xs font-bold text-white hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                                            >
                                                <span>View Details</span>
                                                <FaArrowRight className="text-[10px] text-rose-400" />
                                            </button>

                                            <div className="flex items-center gap-2">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/30 flex items-center justify-center text-xs transition-all"
                                                        title="GitHub Repository"
                                                    >
                                                        <FaGithub />
                                                    </a>
                                                )}
                                                {project.demo && project.demo !== '#' && (
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 rounded-xl bg-white text-gray-950 font-bold flex items-center justify-center text-xs shadow-md hover:bg-slate-200 transition-all"
                                                        title="Live Demo"
                                                    >
                                                        <FaExternalLinkAlt />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <FaSearch className="text-4xl text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 text-sm font-mono">No matching projects found for your query.</p>
                    </div>
                )}

                {/* ════════════════════════════════════════════
                    100% AUTHENTIC & RICH PROJECT DETAILS MODAL
                    ════════════════════════════════════════════ */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.94, y: 30, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.94, y: 30, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#06060a] p-6 sm:p-9 shadow-2xl shadow-black space-y-7 text-white custom-scrollbar my-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header Area */}
                                <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 border border-rose-500/30 text-rose-300 uppercase tracking-wider">
                                                {selectedProject.category || 'Project'}
                                            </span>
                                            {selectedProject.status && (
                                                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span>{selectedProject.status}</span>
                                                </span>
                                            )}
                                            {selectedProject.date && (
                                                <span className="text-xs font-mono text-slate-500">
                                                    • {selectedProject.date}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                                            {selectedProject.title}
                                        </h3>
                                    </div>

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="p-2.5 rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/25 transition-all cursor-pointer shrink-0"
                                        aria-label="Close modal"
                                    >
                                        <FaTimes className="text-base" />
                                    </button>
                                </div>

                                {/* Modal Cover Image */}
                                {selectedProject.image && (
                                    <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a14] relative group">
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/80 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                )}

                                {/* Authentic Description / Full Description */}
                                <div className="space-y-3 p-5 rounded-2xl border border-white/[0.08] bg-[#0c0c14]/80">
                                    <h4 className="text-xs font-mono uppercase tracking-widest text-rose-400 flex items-center gap-2">
                                        <FaFolderOpen />
                                        <span>Project Overview & Details</span>
                                    </h4>
                                    <div className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal space-y-3">
                                        {(selectedProject.fullDescription || selectedProject.description)
                                            .split('\n\n')
                                            .map((para, pIdx) => (
                                                <p key={pIdx}>{para}</p>
                                            ))}
                                    </div>
                                </div>

                                {/* Authentic Project Key Features (Real list from project) */}
                                {selectedProject.features && selectedProject.features.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
                                            <FaCheckCircle className="text-emerald-400" />
                                            <span>Key Features & Functional Highlights</span>
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {selectedProject.features.map((feature, fIdx) => (
                                                <div
                                                    key={fIdx}
                                                    className="p-3.5 rounded-2xl border border-white/[0.07] bg-[#0c0c14]/50 flex items-start gap-3"
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                                                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Complete Technology Stack (Real tags) */}
                                {selectedProject.tech && selectedProject.tech.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                            <FaCode className="text-rose-400" />
                                            <span>Technology Stack & Integrated Libraries</span>
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((t, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Modal Footer Actions */}
                                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {selectedProject.demo && selectedProject.demo !== '#' && (
                                            <a
                                                href={selectedProject.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-lg shadow-rose-900/40 flex items-center gap-2.5 transition-all cursor-pointer"
                                            >
                                                <FaExternalLinkAlt className="text-xs" />
                                                <span>Live Deployment</span>
                                            </a>
                                        )}
                                        {selectedProject.github && (
                                            <a
                                                href={selectedProject.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-medium border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-xl flex items-center gap-2.5 transition-all cursor-pointer"
                                            >
                                                <FaGithub className="text-sm" />
                                                <span>GitHub Source Code</span>
                                            </a>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        Close Window [Esc]
                                    </button>
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
