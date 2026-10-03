import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaArrowRight,
    FaDownload,
    FaEnvelope,
    FaShieldAlt,
    FaCode,
    FaCheckCircle,
} from 'react-icons/fa';
import { getSection } from '../utils/portfolioData';
import myImage from '../assets/mahabub.png';
import myCV from '../assets/mahabub.pdf';

/* Stagger animation variants */
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Hero({ darkMode }) {
    const heroData = getSection('hero');
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    const socialIconMap = {
        github: FaGithub,
        linkedin: FaLinkedinIn,
        facebook: FaFacebookF,
        instagram: FaInstagram,
    };
    const socialIcons = heroData.socials.map(s => ({
        icon: socialIconMap[s.platform] || FaGithub,
        url: s.url,
        platform: s.platform,
    }));

    // Track mouse for subtle ambient lighting
    useEffect(() => {
        const handleGlobalMouse = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleGlobalMouse);
        return () => window.removeEventListener('mousemove', handleGlobalMouse);
    }, []);

    const roles = heroData.roles || [
        "Full-Stack Developer",
        "Cybersecurity Specialist",
        "ML Engineer",
        "Bug Bounty Hunter",
    ];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex(prev => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
    };

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
            id="home"
            className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-transparent"
        >
            {/* ── Soft Ambient Lighting (No yellow) ── */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-all duration-[2.5s] ease-out opacity-20 blur-[130px]"
                style={{
                    left: `${mousePosition.x}%`,
                    top: `${mousePosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(59,130,246,0.1) 40%, transparent 75%)',
                }}
            />
            {/* Left Indigo Aura */}
            <div className="absolute top-[25%] -left-[10%] w-[480px] h-[480px] rounded-full bg-indigo-500/[0.06] blur-[140px] pointer-events-none" />
            {/* Right Silver/Blue Aura behind photo */}
            <div className="absolute top-[20%] right-[5%] w-[520px] h-[520px] rounded-full bg-blue-500/[0.06] blur-[150px] pointer-events-none" />

            {/* ── Main Content Container ── */}
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* ════════════════════════════════════════════
                        LEFT COLUMN: Clean Luxury Copy & CTAs
                        ════════════════════════════════════════════ */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 text-center lg:text-left space-y-6 lg:space-y-8"
                    >
                        {/* Pre-title & Bismillah */}
                        <motion.div variants={fadeUp} className="space-y-2">
                            <p
                                dir="rtl"
                                lang="ar"
                                className="font-arabic text-sm sm:text-base tracking-wide text-slate-400"
                            >
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </p>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>{heroData.availableText || "Available For Full-Time & Freelance Roles"}</span>
                            </div>
                        </motion.div>

                        {/* Hello I'm & Main Headline */}
                        <motion.div variants={fadeUp} className="space-y-2">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-slate-300">
                                Hello I'm
                            </h3>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black uppercase tracking-tight leading-[1.05] bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                                MD MAHABUBUR RAHMAN
                            </h1>
                        </motion.div>

                        {/* Animated Dynamic Role & Tagline */}
                        <motion.div variants={fadeUp} className="space-y-3">
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Specialization:</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <p className="text-sm sm:text-base md:text-[15px] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal text-slate-400">
                                {heroData.description}
                            </p>
                        </motion.div>

                        {/* ── Action Buttons (Clean High-Contrast Executive Style) ── */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start items-center pt-2">
                            {/* Primary Button: "Let's Get Started" */}
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => scrollToSection('contact')}
                                className="px-8 py-3.5 rounded-full text-sm font-bold bg-white text-gray-950 transition-all duration-300 flex items-center gap-2 shadow-xl hover:bg-slate-100"
                            >
                                <span>Let's Get Started</span>
                                <FaArrowRight className="text-xs" />
                            </motion.button>

                            {/* Secondary Button: "Download CV" */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleDownloadCV}
                                className="px-7 py-3.5 rounded-full text-sm font-medium border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-xl flex items-center gap-2.5 transition-all duration-300"
                            >
                                <div className="w-6 h-6 rounded-full bg-white/10 text-cyan-400 flex items-center justify-center text-[10px]">
                                    <FaDownload />
                                </div>
                                <span>Download CV</span>
                            </motion.button>
                        </motion.div>

                        {/* ── Social Icons & Metrics Row ── */}
                        <motion.div variants={fadeUp} className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            {/* Project Count Metric */}
                            <div className="flex items-center gap-3">
                                <div>
                                    <h4 className="text-2xl sm:text-3xl font-black text-white">
                                        9+
                                    </h4>
                                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                                        Completed Projects
                                    </p>
                                </div>
                                <div className="flex -space-x-2 overflow-hidden ml-2">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-slate-700 to-slate-500 text-white font-bold text-xs">
                                        M
                                    </span>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                                        R
                                    </span>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-8 bg-slate-800" />

                            {/* Social Icons */}
                            <div className="flex items-center gap-2">
                                {socialIcons.map((social, idx) => {
                                    const IconComp = social.icon;
                                    return (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.platform}
                                            className="w-9 h-9 rounded-full border border-slate-800 bg-[#0d1322]/80 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 flex items-center justify-center text-xs transition-all duration-200"
                                        >
                                            <IconComp />
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ════════════════════════════════════════════
                        RIGHT COLUMN: Luxury Seamless Obsidian Portrait Presentation
                        ════════════════════════════════════════════ */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 flex justify-center items-center relative"
                    >
                        <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]">

                            {/* ── Ambient Studio Backlight Glow Behind Frame ── */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-transparent rounded-[44px] blur-2xl opacity-60 pointer-events-none" />

                            {/* ── High-Tech Obsidian Luxury Rounded Glass Frame ── */}
                            <div className="relative rounded-[36px] border border-white/[0.12] bg-gradient-to-b from-[#0b101f]/90 via-[#060913]/95 to-[#020408] backdrop-blur-3xl shadow-2xl shadow-black/95 overflow-hidden">

                                {/* Studio Ambient Spotlight directly behind head/torso */}
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-indigo-500/25 via-cyan-500/15 to-transparent rounded-full blur-[70px] pointer-events-none" />
                                <div className="absolute inset-0 cyber-dot-matrix opacity-10 pointer-events-none" />

                                {/* ── Seamless Portrait Area with Natural Bottom Fade ── */}
                                <div className="relative w-full h-[440px] sm:h-[490px] lg:h-[530px] flex items-end justify-center overflow-hidden pt-6">
                                    <motion.img
                                        src={myImage}
                                        alt="MD Mahabubur Rahman"
                                        className="w-full h-full object-contain object-bottom filter contrast-[1.03] brightness-[0.98] select-none"
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0) 100%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0) 100%)',
                                        }}
                                        initial={{ y: 25, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.9, ease: "easeOut" }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />

                                    {/* Subtle Bottom Ambient Shadow to guarantee 100% seamless blend with card base */}
                                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020408] via-[#020408]/70 to-transparent pointer-events-none" />
                                </div>

                                {/* Floating Glass Badges */}
                                {/* Top-right Badge: Security Specialist */}
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center gap-2 text-white shadow-xl text-[11px] font-mono font-semibold"
                                >
                                    <FaShieldAlt className="text-cyan-400 text-xs" />
                                    <span>Security Specialist</span>
                                </motion.div>

                                {/* Bottom-left Badge: Full-Stack & ML */}
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                    className="absolute bottom-5 left-5 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center gap-2 text-white shadow-xl text-[11px] font-mono font-semibold z-10"
                                >
                                    <FaCode className="text-indigo-400 text-xs" />
                                    <span>Full-Stack & ML</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
