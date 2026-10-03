import React, { useState, useEffect, useRef } from 'react';
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
    FaLightbulb,
    FaCheckCircle
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiJavascript } from 'react-icons/si';
import { getSection } from '../utils/portfolioData';
import IslamicPattern from './IslamicPattern';
import myCV from '../assets/mahabub.pdf';

// Animated counter for stats
function AnimatedStat({ value, visible }) {
    const [display, setDisplay] = useState('0');
    const started = useRef(false);

    useEffect(() => {
        if (!visible || started.current) return;
        started.current = true;
        const raw = parseInt(value.replace(/\D/g, '')) || 0;
        const suffix = value.replace(/[\d]/g, '');
        if (raw === 0) { setDisplay(value); return; }
        let current = 0;
        const steps = 40;
        const inc = raw / steps;
        const timer = setInterval(() => {
            current += inc;
            if (current >= raw) {
                setDisplay(value);
                clearInterval(timer);
            } else {
                setDisplay(Math.floor(current) + suffix);
            }
        }, 35);
        return () => clearInterval(timer);
    }, [visible, value]);

    return <span>{display}</span>;
}

function About({ darkMode }) {
    const aboutData = getSection('about');
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.2 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const theme = {
        bg: darkMode ? 'bg-transparent' : 'bg-[#fcfbf9]',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-slate-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-slate-400' : 'text-gray-500',
        cardBg: darkMode
            ? 'bg-[#0c0c10]/80 backdrop-blur-2xl border-white/[0.08] hover:border-[#E5A93C]/40 text-white shadow-xl shadow-black/70'
            : 'bg-white/95 backdrop-blur-xl border-gray-200/90 hover:border-[#E5A93C]/40 text-gray-900 shadow-xl shadow-gray-200/50',
        innerCardBg: darkMode ? 'bg-[#121218] border-white/[0.06]' : 'bg-gray-50 border-gray-200',
        border: darkMode ? 'border-white/[0.08]' : 'border-gray-200',
    };

    const education = aboutData.education || [];
    const certifications = aboutData.certifications || [];
    const stats = aboutData.stats || [];
    const coreValues = aboutData.coreValues || [];

    const techStack = [
        { name: "React.js", icon: <SiReact className="text-[#E5A93C]" />, level: "Frontend Framework" },
        { name: "Node.js", icon: <SiNodedotjs className="text-[#34d399]" />, level: "Runtime Environment" },
        { name: "Express.js", icon: <SiExpress className="text-gray-300" />, level: "Backend Framework" },
        { name: "MongoDB", icon: <SiMongodb className="text-[#10b981]" />, level: "NoSQL Database" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38bdf8]" />, level: "Styling Engine" },
        { name: "JavaScript", icon: <SiJavascript className="text-[#FBBF24]" />, level: "Core Language" }
    ];

    const coreValueIcons = [FaLightbulb, FaCheckCircle, FaBriefcase, FaGraduationCap];

    const handleDownloadCV = async () => {
        try {
            const response = await fetch(myCV);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'MD_Mahabubur_Rahman_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch {
            const link = document.createElement('a');
            link.href = myCV;
            link.download = 'MD_Mahabubur_Rahman_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <section id="about" className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] rounded-full bg-[#E5A93C]/[0.06] blur-[140px]" />
                <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/[0.05] blur-[150px]" />
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
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md mb-4 border border-[#E5A93C]/30 bg-[#E5A93C]/10"
                    >
                        <FaUserTie className="text-[#E5A93C] text-xs sm:text-sm animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#E5A93C]">
                            BIOGRAPHY & BACKGROUND
                        </span>
                    </motion.div>

                    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme.textPrimary} mb-4`}>
                        Engineering <span className="bg-gradient-to-r from-[#FBBF24] via-[#E5A93C] to-[#D4AF37] bg-clip-text text-transparent">Identity & Vision</span>
                    </h2>

                    <p className={`${theme.textSecondary} max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed`}>
                        {aboutData.tagline}
                    </p>
                </motion.div>

                {/* 2-Column Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">

                    {/* ── Left: Bio & Personal Details ── */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Who Am I Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl relative overflow-hidden card-hover-glow`}
                        >
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200 dark:border-gray-800/60">
                                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-xl text-[#E5A93C]">
                                    <FaUserTie />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Who Am I?</h3>
                                    <span className="text-xs text-[#E5A93C] font-mono font-semibold">Full-Stack & Security Specialist</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {aboutData.bio.map((paragraph, idx) => (
                                    <p key={idx} className={`${theme.textSecondary} text-sm sm:text-base leading-relaxed`}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800/60 flex flex-wrap gap-4 items-center">
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(229,169,60,0.35)' }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleDownloadCV}
                                    className="px-7 py-3 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-[#FBBF24] via-[#E5A93C] to-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all"
                                >
                                    <FaDownload className="text-xs" />
                                    <span>Download Resume (PDF)</span>
                                </motion.button>

                                <a
                                    href="#contact"
                                    className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border flex items-center gap-2 transition-all ${
                                        darkMode ? 'bg-[#121218] hover:bg-[#1c1c24] text-gray-200 border-gray-800 hover:border-[#E5A93C]/40' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
                                    }`}
                                >
                                    <FaEnvelope className="text-xs text-[#E5A93C]" />
                                    <span>Get In Touch</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Personal Details Matrix */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl card-hover-glow`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/60">
                                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-xl text-[#E5A93C]">
                                    <FaBriefcase />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Personal Profile</h3>
                                    <span className="text-xs text-[#E5A93C] font-mono font-semibold">Location & Education Timeline</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: FaMapMarkerAlt, label: "Location", value: aboutData.personalDetails.location, color: "text-[#E5A93C]", bg: "from-[#E5A93C]/10 to-[#E5A93C]/5" },
                                    { icon: FaGraduationCap, label: "Degree", value: aboutData.personalDetails.student, color: "text-[#D4AF37]", bg: "from-[#D4AF37]/10 to-[#D4AF37]/5" },
                                    { icon: FaEnvelope, label: "Email Address", value: aboutData.personalDetails.email, color: "text-purple-500", bg: "from-purple-500/10 to-purple-500/5", full: true },
                                    { icon: FaPhone, label: "Direct Phone", value: aboutData.personalDetails.phone, color: "text-emerald-500", bg: "from-emerald-500/10 to-emerald-500/5" },
                                    { icon: FaCalendarAlt, label: "Expected Graduation", value: aboutData.personalDetails.graduation, color: "text-amber-500", bg: "from-amber-500/10 to-amber-500/5" },
                                ].map((item, idx) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-2xl border ${theme.innerCardBg} ${item.full ? 'sm:col-span-2' : ''} bg-gradient-to-br ${item.bg} transition-all hover:scale-[1.01]`}
                                        >
                                            <span className={`text-[11px] font-mono ${theme.textMuted} block mb-1.5 uppercase tracking-wide`}>{item.label}</span>
                                            <div className={`flex items-center gap-2 font-semibold text-xs sm:text-sm ${theme.textPrimary}`}>
                                                <IconComponent className={`text-sm ${item.color} flex-shrink-0`} />
                                                <span className="break-all">{item.value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: Education, Certs, Tech Stack ── */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Education Timeline */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl card-hover-glow`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/40">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-xl text-cyan-500">
                                    <FaGraduationCap />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Academic Background</h3>
                                    <span className="text-xs text-cyan-500 font-mono font-semibold">B.Sc Computer Science</span>
                                </div>
                            </div>

                            <div className="space-y-4 relative">
                                {/* Timeline bar */}
                                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />

                                {education.map((edu, idx) => (
                                    <div key={idx} className="pl-8 relative">
                                        {/* Timeline dot */}
                                        <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-2 border-gray-900 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>

                                        <div className={`p-4 rounded-2xl border ${theme.innerCardBg}`}>
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className={`text-sm font-bold ${theme.textPrimary} leading-snug`}>{edu.degree}</h4>
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-500 border border-cyan-500/40 whitespace-nowrap flex-shrink-0">
                                                    {edu.year}
                                                </span>
                                            </div>
                                            <p className="text-xs text-orange-500 font-semibold mb-2">{edu.institution}</p>
                                            <p className={`text-xs ${theme.textMuted} leading-relaxed`}>{edu.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Certifications */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl card-hover-glow`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/60">
                                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-xl text-[#E5A93C]">
                                    <FaCertificate />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Certifications & Credentials</h3>
                                    <span className="text-xs text-[#E5A93C] font-mono font-semibold">Verified Specializations</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {certifications.map((cert, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.07 }}
                                        viewport={{ once: true }}
                                        className={`p-3.5 rounded-2xl border ${theme.innerCardBg} flex items-center justify-between gap-3 hover:border-[#E5A93C]/30 transition-all`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-xl bg-[#E5A93C]/15 flex items-center justify-center flex-shrink-0">
                                                <FaAward className="text-[#E5A93C] text-sm" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className={`text-xs sm:text-sm font-bold ${theme.textPrimary} truncate`}>{cert.name}</h4>
                                                <span className={`text-[11px] ${theme.textMuted}`}>{cert.issuer} • {cert.year}</span>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#E5A93C] flex-shrink-0">
                                            {cert.level}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Core Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl card-hover-glow`}
                        >
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/60">
                                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-xl text-[#E5A93C]">
                                    <FaLaptopCode />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Core Tech Stack</h3>
                                    <span className="text-xs text-[#E5A93C] font-mono font-semibold">Primary Development Stack</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {techStack.map((tech, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        className={`p-3 rounded-2xl border ${theme.innerCardBg} flex items-center gap-3 cursor-default transition-all hover:border-[#E5A93C]/30`}
                                    >
                                        <div className="text-2xl flex-shrink-0">{tech.icon}</div>
                                        <div className="min-w-0">
                                            <h4 className={`text-xs font-bold ${theme.textPrimary} truncate`}>{tech.name}</h4>
                                            <span className={`text-[10px] ${theme.textMuted} block truncate`}>{tech.level}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Grid with animated counters */}
                <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-3xl border ${theme.border} ${theme.cardBg} text-center relative overflow-hidden group shadow-lg card-hover-glow cursor-default`}
                        >
                            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#FBBF24] via-[#E5A93C] to-[#D4AF37] bg-clip-text text-transparent mb-1">
                                <AnimatedStat value={stat.number} visible={statsVisible} />
                            </div>
                            <div className={`text-xs sm:text-sm font-bold ${theme.textPrimary} mb-1`}>{stat.label}</div>
                            <div className={`text-[11px] ${theme.textMuted}`}>{stat.description}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Core Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-xl`}
                >
                    <div className="text-center mb-8">
                        <h3 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary} mb-2`}>
                            What <span className="bg-gradient-to-r from-[#FBBF24] via-[#E5A93C] to-[#D4AF37] bg-clip-text text-transparent">Drives Me</span>
                        </h3>
                        <p className={`text-xs sm:text-sm ${theme.textMuted}`}>
                            Core engineering principles guiding every project and security research.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {coreValues.map((val, idx) => {
                            const IconComp = coreValueIcons[idx % coreValueIcons.length];
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.03, y: -3 }}
                                    className={`p-5 rounded-2xl border ${theme.innerCardBg} text-center cursor-default transition-all hover:border-[#E5A93C]/30`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                                        <IconComp className="text-lg" />
                                    </div>
                                    <h4 className={`text-sm font-bold ${theme.textPrimary} mb-1`}>{val.title}</h4>
                                    <p className={`text-xs ${theme.textMuted} leading-relaxed`}>{val.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;
