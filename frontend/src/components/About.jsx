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
    FaTerminal,
    FaServer,
    FaBug
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
    const statsRef = useRef(null);

    // 3D Parallax tilt for the portrait frame
    const imgRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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

    const stats = aboutData.stats || [
        { number: '9+', label: 'Completed Projects', description: 'Full-stack & Security' },
        { number: '20+', label: 'Security Reports', description: 'Vulnerabilities Discovered' },
        { number: '3+', label: 'Years Experience', description: 'Continuous Learning' },
        { number: '100%', label: 'Commitment', description: 'Quality Assurance' }
    ];

    const coreValues = aboutData.coreValues || [
        { title: 'Clean Architecture', description: 'Writing scalable, maintainable, and documented code.' },
        { title: 'Security-First Mindset', description: 'Embedding defensive principles into every layer of SDLC.' },
        { title: 'Intelligent Automation', description: 'Leveraging machine learning models for anomaly & threat detection.' },
        { title: 'Continuous Growth', description: 'Daily exploration of bug bounty, CTF security, and modern web stacks.' }
    ];

    const coreValueIcons = [FaCode, FaShieldAlt, FaBrain, FaCheckCircle];

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
            className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-[#000000] border-t border-white/[0.06]"
        >
            {/* Subtle Ambient Background Gradients */}
            <div className="absolute top-[15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-rose-500/[0.02] blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-slate-800/[0.04] blur-[160px] pointer-events-none" />

            <div className="w-full max-w-[1350px] mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="space-y-3 mb-16 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-mono tracking-widest uppercase">
                        <FaUserTie className="text-xs" />
                        <span>About Me & Background</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-white">Identity & Vision</span>
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                        {aboutData.tagline || 'Bridging the gap between intelligent systems, secure infrastructure, and modern web applications.'}
                    </p>
                </motion.div>

                {/* Main 2-Column Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">

                    {/* Left Column (5 Cols): 100% Authentic Portrait Frame */}
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

                            {/* Floating Glass Pill: Security & ML Engineer */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl flex items-center justify-between gap-3 shadow-2xl">
                                <div>
                                    <h4 className="text-sm font-bold text-white">MD Mahabubur Rahman</h4>
                                    <p className="text-xs text-rose-400 font-mono">Full-Stack & Security Specialist</p>
                                </div>
                                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column (7 Cols): Biography & Core Pillars */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        {/* Who Am I Story Card */}
                        <div className="p-7 sm:p-8 rounded-3xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl shadow-2xl shadow-black/80 space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-lg">
                                        <FaBrain />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Who Am I?</h3>
                                        <p className="text-xs font-mono text-slate-400">Architecting Secure & Intelligent Systems</p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-block text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    Verified Profile
                                </span>
                            </div>

                            <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                                {aboutData.bio.map((paragraph, idx) => (
                                    <p key={idx} className="font-normal">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Expertise Badges */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300">
                                    <FaCode className="text-rose-400 text-[11px]" />
                                    <span>MERN & FastAPI</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300">
                                    <FaShieldAlt className="text-emerald-400 text-[11px]" />
                                    <span>Offensive & Defensive Security</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300">
                                    <FaBrain className="text-blue-400 text-[11px]" />
                                    <span>Machine Learning & Threat Detection</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300">
                                    <FaBug className="text-amber-400 text-[11px]" />
                                    <span>Bug Bounty & Pentesting</span>
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 flex flex-wrap gap-4 items-center">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleDownloadCV}
                                    className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-lg shadow-rose-900/40 flex items-center gap-2 transition-all cursor-pointer"
                                >
                                    <FaDownload className="text-xs" />
                                    <span>Download Resume (PDF)</span>
                                </motion.button>

                                <a
                                    href="#contact"
                                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-medium border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-xl flex items-center gap-2 transition-all cursor-pointer"
                                >
                                    <span>Get In Touch</span>
                                    <FaArrowRight className="text-xs text-rose-400" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Personal Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {[
                                { icon: FaMapMarkerAlt, label: "Location", value: aboutData.personalDetails.location || "Dhaka, Bangladesh" },
                                { icon: FaGraduationCap, label: "Degree", value: aboutData.personalDetails.student || "B.Sc. CSE (Expected 2026)" },
                                { icon: FaEnvelope, label: "Direct Email", value: aboutData.personalDetails.email || "rahmanmdmahabubur666@gmail.com", full: true },
                                { icon: FaPhone, label: "Direct Phone", value: aboutData.personalDetails.phone || "+880 1715044575" },
                            ].map((item, idx) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-2xl border border-white/10 bg-[#06060a]/70 backdrop-blur-md ${item.full ? 'sm:col-span-2' : ''} flex items-center gap-3.5`}
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 text-rose-400 flex items-center justify-center text-sm shrink-0">
                                            <IconComponent />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{item.label}</span>
                                            <span className="text-xs sm:text-sm font-semibold text-white truncate block">{item.value}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                </div>

                {/* Animated Stats Bar */}
                <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl border border-white/10 bg-[#06060a]/80 backdrop-blur-xl text-center shadow-xl shadow-black/60 hover:border-rose-500/30 transition-all group"
                        >
                            <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-rose-400 transition-colors mb-1">
                                <AnimatedStat value={stat.number} visible={statsVisible} />
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-slate-200 mb-0.5">{stat.label}</div>
                            <div className="text-[11px] font-mono text-slate-500">{stat.description}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Engineering Philosophy Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-white">Drives Me</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-mono">
                            Guiding engineering principles for software craft, security rigor, and intelligent workflows.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {coreValues.map((val, idx) => {
                            const IconComp = coreValueIcons[idx % coreValueIcons.length];
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -4 }}
                                    className="p-6 rounded-2xl border border-white/10 bg-[#06060a]/80 backdrop-blur-xl hover:border-rose-500/30 transition-all duration-300 shadow-xl shadow-black/50 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                                        <IconComp />
                                    </div>
                                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">{val.title}</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
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
