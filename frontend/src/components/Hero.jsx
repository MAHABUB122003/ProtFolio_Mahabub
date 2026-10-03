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
                        RIGHT COLUMN: Free-Standing Portrait with Ambient Studio Bokeh
                        ════════════════════════════════════════════ */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 flex justify-center items-end relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]"
                    >
                        {/* ── Soft Ambient Bokeh Light Orbs Behind Portrait (Matching Template) ── */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tr from-indigo-500/20 via-cyan-500/15 to-transparent rounded-full blur-[90px] pointer-events-none" />
                        <div className="absolute bottom-1/3 -right-6 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute top-1/3 -left-10 w-52 h-52 bg-slate-500/10 rounded-full blur-[70px] pointer-events-none" />

                        {/* ── Portrait Standing Directly on Canvas ── */}
                        <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] flex items-end justify-center">
                            <motion.img
                                src={myImage}
                                alt="MD Mahabubur Rahman"
                                className="w-full h-auto max-h-[540px] sm:max-h-[580px] lg:max-h-[620px] object-contain object-bottom filter contrast-[1.04] brightness-[0.98] select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0) 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0) 100%)',
                                }}
                                initial={{ y: 35, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />

                            {/* ── Floating Rotating Stamp Badge (Directly Matching Reference Template) ── */}
                            <motion.div
                                onClick={() => scrollToSection('contact')}
                                className="absolute bottom-4 right-0 sm:bottom-6 sm:-right-4 w-28 h-28 sm:w-32 sm:h-32 cursor-pointer z-20 group"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Rotating circular text */}
                                <motion.svg
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-full"
                                    viewBox="0 0 100 100"
                                >
                                    <path
                                        id="circlePath"
                                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        fill="none"
                                    />
                                    <text className="text-[8.5px] font-mono font-bold tracking-[0.19em] fill-slate-400 uppercase group-hover:fill-white transition-colors">
                                        <textPath href="#circlePath" startOffset="0%">
                                            • HIRE ME FOR YOUR PROJECTS •
                                        </textPath>
                                    </text>
                                </motion.svg>

                                {/* Center arrow button */}
                                <div className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-white text-gray-950 flex items-center justify-center shadow-2xl group-hover:bg-cyan-400 group-hover:scale-110 transition-all duration-300">
                                    <FaArrowRight className="text-xs -rotate-45" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
