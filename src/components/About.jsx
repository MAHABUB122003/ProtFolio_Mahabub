import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUserTie,
    FaGraduationCap,
    FaCertificate,
    FaBriefcase,
    FaLaptopCode,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaDownload,
    FaCalendarAlt,
    FaAward,
    FaLightbulb
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiJavascript } from 'react-icons/si';
import { getSection } from '../utils/portfolioData';

function About({ darkMode }) {
    const aboutData = getSection('about');

    const theme = {
        bg: darkMode ? 'bg-gray-950' : 'bg-slate-50',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode
            ? 'bg-gray-900/70 backdrop-blur-xl border-gray-800/80 hover:border-orange-500/40 text-white'
            : 'bg-white/90 backdrop-blur-xl border-gray-200/90 hover:border-orange-500/40 text-gray-900 shadow-xl shadow-gray-200/50',
        innerCardBg: darkMode ? 'bg-gray-950/60 border-gray-800/80' : 'bg-gray-50/90 border-gray-200/80',
        border: darkMode ? 'border-gray-800' : 'border-gray-200',
    };

    const education = aboutData.education || [];
    const certifications = aboutData.certifications || [];
    const stats = aboutData.stats || [];
    const coreValues = aboutData.coreValues || [];

    const techStack = [
        { name: "React.js", icon: <SiReact className="text-cyan-500" />, level: "Frontend Framework" },
        { name: "Node.js", icon: <SiNodedotjs className="text-green-600" />, level: "Runtime Environment" },
        { name: "Express.js", icon: <SiExpress className="text-gray-600 dark:text-gray-300" />, level: "Backend Framework" },
        { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, level: "NoSQL Database" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" />, level: "Styling Engine" },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" />, level: "Core Language" }
    ];

    return (
        <section id="about" className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-transparent blur-[140px]" />
                <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-purple-500/10 via-cyan-500/10 to-transparent blur-[150px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md mb-4 border"
                        style={{
                            background: darkMode
                                ? 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(168,85,247,0.12) 100%)'
                                : 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(168,85,247,0.08) 100%)',
                            borderColor: darkMode ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)'
                        }}
                    >
                        <FaUserTie className="text-orange-500 text-xs sm:text-sm animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                            BIOGRAPHY & BACKGROUND
                        </span>
                    </motion.div>

                    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme.textPrimary} mb-4`}>
                        Engineering <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Identity & Vision</span>
                    </h2>

                    <p className={`${theme.textSecondary} max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed`}>
                        {aboutData.tagline}
                    </p>
                </motion.div>

                {/* 2-Column Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">

                    {/* Left Column: Bio & Personal Details (7 cols) */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Who Am I Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl relative overflow-hidden`}
                        >
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200 dark:border-gray-800/40">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-purple-500/20 border border-orange-500/30 flex items-center justify-center text-xl text-orange-500">
                                    <FaUserTie />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Who Am I?</h3>
                                    <span className="text-xs text-orange-500 font-mono font-semibold">Full-Stack & Security Researcher</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {aboutData.bio.map((paragraph, idx) => (
                                    <p key={idx} className={`${theme.textSecondary} text-sm sm:text-base leading-relaxed`}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Download Resume / Contact CTA */}
                            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800/40 flex flex-wrap gap-4 items-center justify-between">
                                <a
                                    href="/mahabub1.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/20 flex items-center gap-2 hover:scale-105 transition-all"
                                >
                                    <FaDownload className="text-xs" />
                                    <span>Download Resume (PDF)</span>
                                </a>

                                <a
                                    href="#contact"
                                    className={`px-5 py-3.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold border flex items-center gap-2 transition-all ${
                                        darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
                                    }`}
                                >
                                    <FaEnvelope className="text-xs text-orange-500" />
                                    <span>Get In Touch</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Personal Details Matrix Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/40">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-xl text-purple-500">
                                    <FaBriefcase />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Personal Profile Details</h3>
                                    <span className="text-xs text-purple-500 font-mono font-semibold">Location & Education Timeline</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: FaMapMarkerAlt, label: "Location", value: aboutData.personalDetails.location, color: "text-orange-500" },
                                    { icon: FaGraduationCap, label: "Degree", value: aboutData.personalDetails.student, color: "text-cyan-600 dark:text-cyan-400" },
                                    { icon: FaEnvelope, label: "Email Address", value: aboutData.personalDetails.email, color: "text-purple-600 dark:text-purple-400", full: true },
                                    { icon: FaPhone, label: "Direct Phone", value: aboutData.personalDetails.phone, color: "text-emerald-600 dark:text-emerald-400" },
                                    { icon: FaCalendarAlt, label: "Expected Graduation", value: aboutData.personalDetails.graduation, color: "text-amber-600 dark:text-amber-400" },
                                ].map((item, idx) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-2xl border ${theme.innerCardBg} ${item.full ? 'sm:col-span-2' : ''}`}
                                        >
                                            <span className={`text-[11px] font-mono ${theme.textMuted} block mb-1`}>{item.label}</span>
                                            <div className={`flex items-center gap-2 font-semibold text-xs sm:text-sm ${theme.textPrimary}`}>
                                                <IconComponent className={`text-xs ${item.color}`} />
                                                <span className="break-words">{item.value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Education, Certifications & Tech Stack (5 cols) */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Education Timeline */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/40">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-xl text-cyan-500">
                                    <FaGraduationCap />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Academic Background</h3>
                                    <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-semibold">B.Sc Computer Science</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {education.map((edu, idx) => (
                                    <div key={idx} className={`p-4 rounded-2xl border ${theme.innerCardBg} relative`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className={`text-sm font-bold ${theme.textPrimary}`}>{edu.degree}</h4>
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40">
                                                {edu.year}
                                            </span>
                                        </div>
                                        <p className="text-xs text-orange-500 font-semibold mb-2">{edu.institution}</p>
                                        <p className={`text-xs ${theme.textMuted} leading-relaxed`}>{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Certifications Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/40">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-xl text-amber-500">
                                    <FaCertificate />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Certifications & Credentials</h3>
                                    <span className="text-xs text-amber-600 dark:text-amber-400 font-mono font-semibold">Verified Specializations</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {certifications.map((cert, idx) => (
                                    <div key={idx} className={`p-3.5 rounded-2xl border ${theme.innerCardBg} flex items-center justify-between gap-3`}>
                                        <div className="flex items-center gap-3 min-w-0">
                                            <FaAward className="text-orange-500 text-sm flex-shrink-0" />
                                            <div className="min-w-0">
                                                <h4 className={`text-xs sm:text-sm font-bold ${theme.textPrimary} truncate`}>{cert.name}</h4>
                                                <span className={`text-[11px] ${theme.textMuted}`}>{cert.issuer} • {cert.year}</span>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-300 flex-shrink-0">
                                            {cert.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Core Technologies Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/40">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-xl text-green-500">
                                    <FaLaptopCode />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Core Tech Stack</h3>
                                    <span className="text-xs text-green-600 dark:text-green-400 font-mono font-semibold">Primary Development Stack</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {techStack.map((tech, idx) => (
                                    <div key={idx} className={`p-3 rounded-2xl border ${theme.innerCardBg} flex items-center gap-3`}>
                                        <div className="text-xl flex-shrink-0">{tech.icon}</div>
                                        <div className="min-w-0">
                                            <h4 className={`text-xs font-bold ${theme.textPrimary} truncate`}>{tech.name}</h4>
                                            <span className={`text-[10px] ${theme.textMuted} block truncate`}>{tech.level}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Key Statistics Grid Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-3xl border ${theme.border} ${theme.cardBg} text-center relative overflow-hidden group shadow-lg`}
                        >
                            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent mb-1">
                                {stat.number}
                            </div>
                            <div className={`text-xs sm:text-sm font-bold ${theme.textPrimary} mb-1`}>{stat.label}</div>
                            <div className={`text-[11px] ${theme.textMuted}`}>{stat.description}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Core Driving Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl`}
                >
                    <div className="text-center mb-8">
                        <h3 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary} mb-2`}>
                            What <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Drives Me</span>
                        </h3>
                        <p className={`text-xs sm:text-sm ${theme.textMuted}`}>
                            Core engineering principles guiding every project and security research paper.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {coreValues.map((val, idx) => (
                            <div key={idx} className={`p-5 rounded-2xl border ${theme.innerCardBg} text-center`}>
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-3">
                                    <FaLightbulb className="text-sm" />
                                </div>
                                <h4 className={`text-sm font-bold ${theme.textPrimary} mb-1`}>{val.title}</h4>
                                <p className={`text-xs ${theme.textMuted} leading-relaxed`}>{val.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;