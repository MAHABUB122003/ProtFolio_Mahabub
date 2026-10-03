import React from 'react';
import { motion } from 'framer-motion';
import {
    FaGraduationCap,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaBookOpen,
    FaCertificate,
    FaAward,
    FaCheckCircle,
} from 'react-icons/fa';
import { getSection } from '../utils/portfolioData';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

function Education({ darkMode }) {
    const aboutData = getSection('about');
    const educationList = aboutData.education || [
        {
            degree: 'B.Sc. in Computer Science & Engineering',
            institution: 'Shanto Mariam University of Creative Technology, Dhaka',
            year: 'Expected 2026',
            description: 'Relevant Coursework: Network Security, Cryptography, Secure SDLC, Digital Forensics, Machine Learning, Data Science, Statistics, Algorithms & Data Structures'
        }
    ];
    const certifications = aboutData.certifications || [];

    const courseworkTags = [
        "Network Security",
        "Applied Cryptography",
        "Secure SDLC",
        "Digital Forensics",
        "Machine Learning",
        "Data Science & Analytics",
        "Advanced Algorithms",
        "Database Management",
        "Operating Systems & Linux"
    ];

    return (
        <section
            id="education"
            className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-[#000000] border-t border-white/[0.06]"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-[20%] right-[10%] w-[420px] h-[420px] rounded-full bg-rose-500/[0.02] blur-[160px] pointer-events-none" />

            <div className="w-full max-w-[1300px] mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerContainer}
                    className="space-y-3 mb-16 text-center lg:text-left"
                >
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-mono tracking-widest uppercase">
                        <FaGraduationCap className="text-sm" />
                        <span>Academic Background</span>
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-white">Certifications</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-slate-400 text-sm sm:text-base max-w-2xl">
                        Formal academic training in Computer Science & Engineering paired with specialized industry certifications in cybersecurity and machine learning.
                    </motion.p>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left 7 Columns: Formal Degree Timeline */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className="lg:col-span-7 space-y-6"
                    >
                        <motion.h3 variants={fadeUp} className="text-lg font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span>Formal Education</span>
                        </motion.h3>

                        {educationList.map((edu, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                whileHover={{ y: -4 }}
                                className="relative rounded-2xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl p-6 sm:p-8 hover:border-rose-500/30 transition-all duration-300 shadow-2xl shadow-black/80 group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                                            <FaGraduationCap />
                                        </div>
                                        <div>
                                            <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                                                {edu.degree}
                                            </h4>
                                            <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                <FaMapMarkerAlt className="text-xs text-rose-500" />
                                                <span>{edu.institution}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 text-xs font-mono shrink-0 self-start sm:self-auto">
                                        <FaCalendarAlt className="text-[10px] text-rose-400" />
                                        <span>{edu.year}</span>
                                    </span>
                                </div>

                                <div className="pt-5 space-y-4">
                                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                                        {edu.description}
                                    </p>

                                    {/* Key Coursework Tags */}
                                    <div>
                                        <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                                            <FaBookOpen className="text-rose-400" />
                                            <span>Key Academic Focus</span>
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {courseworkTags.map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/10 text-slate-300 hover:border-rose-500/30 hover:text-white transition-all"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right 5 Columns: Certifications & Specialized Training */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={staggerContainer}
                        className="lg:col-span-5 space-y-6"
                    >
                        <motion.h3 variants={fadeUp} className="text-lg font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Certifications & Specialized Training</span>
                        </motion.h3>

                        <div className="space-y-3.5">
                            {certifications.map((cert, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeUp}
                                    whileHover={{ x: 4 }}
                                    className="p-4 rounded-xl border border-white/10 bg-[#06060a]/80 backdrop-blur-xl hover:border-white/20 transition-all flex items-start gap-3.5"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 text-rose-400 flex items-center justify-center text-sm shrink-0 mt-0.5">
                                        <FaCertificate />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="text-sm font-semibold text-white truncate">
                                                {cert.name}
                                            </h4>
                                            <span className="text-[11px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                                                {cert.level || 'Verified'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                                            <span>{cert.issuer}</span>
                                            <span className="font-mono text-slate-500">{cert.year}</span>
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default Education;
