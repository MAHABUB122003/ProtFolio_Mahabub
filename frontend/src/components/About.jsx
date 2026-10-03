import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    FaUserTie,
    FaGraduationCap,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaDownload,
    FaShieldAlt,
    FaBrain,
    FaCode,
    FaArrowRight,
    FaCheckCircle,
    FaBug,
    FaCheck,
    FaCopy,
    FaFolderOpen,
    FaClock
} from 'react-icons/fa';
import { getSection } from '../utils/portfolioData';
import myCV from '../assets/mahabub.pdf';
import aboutImage from '../assets/mahabub_about.png';

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
    const [copiedEmail, setCopiedEmail] = useState(false);
    const statsRef = useRef(null);

    // 3D Parallax tilt for the portrait frame
    const imgRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;
        const rect = imgRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.2 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(aboutData.personalDetails?.email || 'rahmanmdmahabubur666@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const stats = [
        { 
            number: '9+', 
            label: 'Completed Projects', 
            description: 'Full-Stack & Security',
            icon: FaFolderOpen,
            color: 'text-rose-400',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20'
        },
        { 
            number: '20+', 
            label: 'Security Reports', 
            description: 'Vulnerabilities Discovered',
            icon: FaShieldAlt,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20'
        },
        { 
            number: '3+', 
            label: 'Years Experience', 
            description: 'Continuous Crafting',
            icon: FaClock,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        { 
            number: '100%', 
            label: 'Commitment', 
            description: 'Quality & Reliability',
            icon: FaCheckCircle,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20'
        }
    ];

    const coreValues = [
        { 
            title: 'Clean Architecture', 
            description: 'Writing modular, scalable, and self-documenting code with battle-tested design patterns.',
            icon: FaCode,
            tag: 'Maintainability'
        },
        { 
            title: 'Security-First Mindset', 
            description: 'Embedding defensive rigor, threat modeling, and OWASP compliance into every stage of SDLC.',
            icon: FaShieldAlt,
            tag: 'Cyber Defense'
        },
        { 
            title: 'Predictive Intelligence', 
            description: 'Leveraging applied ML and data pipelines for automated threat detection and smart insights.',
            icon: FaBrain,
            tag: 'Machine Learning'
        },
        { 
            title: 'Continuous Growth', 
            description: 'Relentless exploration of bug bounty research, CTFs, and modern full-stack performance.',
            icon: FaBug,
            tag: 'Research & CTF'
        }
    ];

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
        <section
            id="about"
            className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-[#000000] border-t border-white/[0.08]"
        >
            {/* Ambient Lighting Layers */}
            <div className="absolute top-[10%] left-[-5%] w-[520px] h-[520px] rounded-full bg-rose-500/[0.03] blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-5%] w-[520px] h-[520px] rounded-full bg-slate-800/[0.05] blur-[160px] pointer-events-none" />

            <div className="w-full max-w-[1350px] mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="space-y-3 mb-14 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-mono tracking-widest uppercase">
                        <FaUserTie className="text-xs" />
                        <span>About Me & Background</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-rose-300">Identity & Vision</span>
                    </h2>

                    <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                        {aboutData.tagline || 'Bridging the gap between intelligent systems, secure infrastructure, and modern web applications.'}
                    </p>
                </motion.div>

                {/* Main 2-Column Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">

                    {/* Left Column (5 Cols): Portrait Frame */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-5 flex flex-col items-center relative"
                    >
                        <motion.div
                            ref={imgRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                            }}
                            className="relative w-full max-w-[420px] rounded-3xl overflow-hidden border border-white/10 bg-[#06060a] p-3 shadow-2xl shadow-black group cursor-pointer"
                        >
                            {/* Ambient Rim Highlight */}
                            <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

                            <img
                                src={aboutImage}
                                alt="MD Mahabubur Rahman - 100% Authentic Portrait"
                                className="w-full h-auto object-cover rounded-2xl select-none transition-transform duration-500 group-hover:scale-[1.01]"
                            />

                            {/* Floating Glass Pill: Security & ML Specialist */}
                            <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl border border-white/15 bg-black/85 backdrop-blur-xl flex items-center justify-between gap-3 shadow-2xl">
                                <div className="min-w-0">
                                    <h4 className="text-sm font-bold text-white tracking-wide truncate">MD Mahabubur Rahman</h4>
                                    <p className="text-xs text-rose-400 font-mono truncate">Full-Stack & Security Specialist</p>
                                </div>
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column (7 Cols): Story & Balanced Personal Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-7 space-y-5"
                    >
                        {/* Who Am I Narrative Card */}
                        <div className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl shadow-2xl shadow-black/80 space-y-4">
                            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-lg">
                                        <FaBrain />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Who Am I?</h3>
                                        <p className="text-xs font-mono text-slate-400">Architecting Secure & Intelligent Systems</p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-block text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    Verified Profile
                                </span>
                            </div>

                            {/* Refined High-Legibility Narrative */}
                            <div className="space-y-3 text-slate-300 text-sm sm:text-[14.5px] leading-relaxed font-normal">
                                <p>
                                    Innovative <span className="text-white font-semibold">Full-Stack Developer</span>, <span className="text-rose-300 font-semibold">Cybersecurity Specialist</span>, and <span className="text-emerald-300 font-semibold">Machine Learning Engineer</span> dedicated to engineering bulletproof, intelligent digital solutions.
                                </p>
                                <p>
                                    Proficient in building scalable, secure web architectures using <span className="text-white font-medium">MongoDB, Express, React, Node.js, and FastAPI</span> anchored with strict Secure SDLC principles. Advanced specialization in predictive modeling, supervised learning, and AI-driven automated threat detection.
                                </p>
                                <p>
                                    Hands-on expertise across <span className="text-white font-medium">vulnerability assessment, penetration testing, SIEM operations,</span> and digital forensics to defend modern enterprise infrastructure.
                                </p>
                            </div>

                            {/* Expertise Badges */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200 hover:border-rose-500/30 transition-colors">
                                    <FaCode className="text-rose-400 text-[11px]" />
                                    <span>MERN & FastAPI</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200 hover:border-emerald-500/30 transition-colors">
                                    <FaShieldAlt className="text-emerald-400 text-[11px]" />
                                    <span>Offensive & Defensive Security</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200 hover:border-blue-500/30 transition-colors">
                                    <FaBrain className="text-blue-400 text-[11px]" />
                                    <span>ML & Threat Detection</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-200 hover:border-amber-500/30 transition-colors">
                                    <FaBug className="text-amber-400 text-[11px]" />
                                    <span>Bug Bounty & Pentesting</span>
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex flex-wrap gap-3.5 items-center">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleDownloadCV}
                                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-lg shadow-rose-900/30 flex items-center gap-2 transition-all cursor-pointer"
                                >
                                    <FaDownload className="text-xs" />
                                    <span>Download Resume (PDF)</span>
                                </motion.button>

                                <a
                                    href="#contact"
                                    className="px-5 py-3 rounded-xl text-xs sm:text-sm font-medium border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-xl flex items-center gap-2 transition-all cursor-pointer"
                                >
                                    <span>Get In Touch</span>
                                    <FaArrowRight className="text-xs text-rose-400" />
                                </a>
                            </div>
                        </div>

                        {/* ── Balanced Personal Info 2x2 Grid (No wasted space) ── */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* 1. Location */}
                            <div className="p-3.5 rounded-2xl border border-white/10 bg-[#06060a]/80 backdrop-blur-md flex items-center gap-3 hover:border-white/20 transition-all">
                                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 text-rose-400 flex items-center justify-center text-sm shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Location</span>
                                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                                        {aboutData.personalDetails?.location || "Dhaka, Bangladesh"}
                                    </span>
                                </div>
                            </div>

                            {/* 2. Education */}
                            <div className="p-3.5 rounded-2xl border border-white/10 bg-[#06060a]/80 backdrop-blur-md flex items-center gap-3 hover:border-white/20 transition-all">
                                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 text-emerald-400 flex items-center justify-center text-sm shrink-0">
                                    <FaGraduationCap />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Education</span>
                                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                                        {aboutData.personalDetails?.student || "B.Sc. CSE (Expected 2026)"}
                                    </span>
                                </div>
                            </div>

                            {/* 3. Direct Email with quick copy */}
                            <div className="p-3.5 rounded-2xl border border-white/10 bg-[#06060a]/80 backdrop-blur-md flex items-center justify-between gap-2.5 hover:border-rose-500/30 transition-all group">
                                <a
                                    href={`mailto:${aboutData.personalDetails?.email || 'rahmanmdmahabubur666@gmail.com'}`}
                                    className="flex items-center gap-3 min-w-0 flex-1"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
                                        <FaEnvelope />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Email</span>
                                        <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-rose-300 truncate block transition-colors">
                                            {aboutData.personalDetails?.email || 'rahmanmdmahabubur666@gmail.com'}
                                        </span>
                                    </div>
                                </a>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all shrink-0"
                                    title="Copy Email Address"
                                >
                                    {copiedEmail ? <FaCheck className="text-emerald-400 text-xs" /> : <FaCopy className="text-xs" />}
                                </button>
                            </div>

                            {/* 4. Direct Phone */}
                            <a
                                href={`tel:${(aboutData.personalDetails?.phone || '+880 1715044575').replace(/\s+/g, '')}`}
                                className="p-3.5 rounded-2xl border border-white/10 bg-[#06060a]/80 backdrop-blur-md flex items-center gap-3 hover:border-emerald-500/30 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
                                    <FaPhone />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Phone / WhatsApp</span>
                                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 truncate block transition-colors">
                                        {aboutData.personalDetails?.phone || "+880 1715044575"}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                </div>

                {/* ── High-Impact Animated Stats Grid ── */}
                <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
                    {stats.map((stat, idx) => {
                        const StatIcon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1017] to-[#06060a] backdrop-blur-xl shadow-xl shadow-black/60 hover:border-white/20 transition-all group relative overflow-hidden"
                            >
                                {/* Top Accent Line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.border} border ${stat.color} flex items-center justify-center text-sm group-hover:scale-110 transition-transform`}>
                                        <StatIcon />
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                        Metric #{idx + 1}
                                    </span>
                                </div>

                                <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all mb-1 tracking-tight">
                                    <AnimatedStat value={stat.number} visible={statsVisible} />
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-slate-200 mb-0.5">{stat.label}</div>
                                <div className="text-[11px] font-mono text-slate-400">{stat.description}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Engineering Philosophy: What Drives Me ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-slate-300 text-xs font-mono uppercase tracking-wider">
                            <FaShieldAlt className="text-rose-400 text-[11px]" />
                            <span>Core Philosophy</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-white to-rose-200">Drives Me</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                            Guiding engineering principles for software craft, defensive cybersecurity, and intelligent workflows.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {coreValues.map((val, idx) => {
                            const IconComp = val.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -4 }}
                                    className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c0d14] to-[#06060a] backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/50 group cursor-default relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 text-rose-400 flex items-center justify-center text-lg group-hover:scale-105 group-hover:border-rose-500/30 group-hover:bg-rose-500/10 transition-all">
                                            <IconComp />
                                        </div>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-400">
                                            {val.tag}
                                        </span>
                                    </div>
                                    <h4 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                                        {val.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                                        {val.description}
                                    </p>
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
