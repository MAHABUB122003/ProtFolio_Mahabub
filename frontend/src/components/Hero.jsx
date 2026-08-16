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
    FaPlay,
} from 'react-icons/fa';
import { getSection } from '../utils/portfolioData';
import IslamicPattern from './IslamicPattern';
import myImage from '../assets/mahabub.png';
import myCV from '../assets/mahabub.pdf';

/* ─────────────────────────────────────────────
   Stagger animation variants
   ───────────────────────────────────────────── */
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Hero({ darkMode }) {
    const heroData = getSection('hero');
    const cardRef = useRef(null);
    const sectionRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [statsVisible, setStatsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -8, y: x * 8 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    // Track mouse for parallax glow
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

    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
        textMuted: darkMode ? 'text-gray-500' : 'text-gray-400',
        cardBg: darkMode
            ? 'bg-gray-900/40 backdrop-blur-xl border-gray-800/40'
            : 'bg-white/60 backdrop-blur-xl border-gray-200/50 shadow-lg shadow-gray-200/30',
        border: darkMode ? 'border-gray-800/50' : 'border-gray-200/50',
        socialIconBg: darkMode
            ? 'bg-gray-900/50 border-gray-800/50 text-gray-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/8'
            : 'bg-white/70 border-gray-200/50 text-gray-500 hover:text-purple-600 hover:border-purple-300/50 shadow-sm',
    };

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
        }, 2800);
        return () => clearInterval(interval);
    }, [roles.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
    };

    const handleDownloadCV = async () => {
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
    };

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-20 px-4 sm:px-6 overflow-hidden"
        >
            {/* ── Background Layers ── */}
            {/* Dot grid */}
            <div className={`absolute inset-0 ${darkMode ? 'dot-grid-dark' : 'dot-grid-light'} opacity-40 pointer-events-none z-0`} />

            {/* Islamic girih pattern overlay */}
            <div
                className={`absolute inset-0 pointer-events-none z-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ opacity: darkMode ? 0.035 : 0.045 }}
            >
                <IslamicPattern strokeWidth={1} />
            </div>

            {/* Mouse-reactive gradient orb */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-all duration-[2s] ease-out"
                style={{
                    left: `${mousePosition.x}%`,
                    top: `${mousePosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    background: darkMode
                        ? 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
                }}
            />

            {/* Static ambient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-500/6 via-purple-500/3 to-transparent blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-purple-500/6 via-cyan-500/3 to-transparent blur-[120px]" />
            </div>

            {/* ── Main Content ── */}
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

                    {/* ── LEFT COLUMN ── */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-7 text-center lg:text-left space-y-7"
                    >
                        {/* Bismillah — Arabic calligraphy accent */}
                        <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
                            <p
                                dir="rtl"
                                lang="ar"
                                className={`font-arabic text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide ${
                                    darkMode ? 'text-orange-300/90' : 'text-orange-600/90'
                                }`}
                            >
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </p>
                        </motion.div>

                        {/* Availability badge */}
                        <motion.div variants={fadeUp}>
                            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md text-xs sm:text-sm font-medium tracking-wide ${
                                darkMode
                                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400'
                                    : 'border-emerald-500/25 bg-emerald-50 text-emerald-600'
                            }`}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span>{heroData.availableText || "Available for opportunities"}</span>
                            </div>
                        </motion.div>

                        {/* Greeting + Name */}
                        <motion.div variants={fadeUp} className="space-y-2">
                            <p className={`text-base sm:text-lg font-medium ${theme.textSecondary} tracking-wide`}>
                                As-salamu alaykum 👋, I'm
                            </p>
                            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tight leading-[1.05] bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent`}>
                                {heroData.name}
                            </h1>
                            {/* Arabic name signature */}
                            <p
                                dir="rtl"
                                lang="ar"
                                className={`font-arabic text-xl sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-purple-300/80' : 'text-purple-600/80'}`}
                            >
                                مَحْبُوب
                            </p>
                        </motion.div>

                        {/* Animated Role */}
                        <motion.div variants={fadeUp} className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border ${
                                darkMode ? 'border-gray-800/50 bg-gray-900/30' : 'border-gray-200/50 bg-gray-50/50'
                            }`}>
                                <span className={`text-xs font-mono ${theme.textMuted}`}>role:</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.35 }}
                                        className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent typing-cursor"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            variants={fadeUp}
                            className={`${theme.textSecondary} text-sm sm:text-base md:text-[15px] max-w-xl leading-relaxed mx-auto lg:mx-0`}
                        >
                            {heroData.description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start pt-1">
                            {/* Primary: Contact Me */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => scrollToSection('contact')}
                                className="group relative px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden transition-all"
                                style={{
                                    background: 'linear-gradient(135deg, #f97316, #a855f7)',
                                    boxShadow: '0 4px 20px rgba(249,115,22,0.3), 0 2px 8px rgba(168,85,247,0.2)',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <FaEnvelope className="text-xs" />
                                    Contact Me
                                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                                </span>
                            </motion.button>

                            {/* Secondary: Download CV */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleDownloadCV}
                                className={`px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm font-semibold border flex items-center gap-2 transition-all ${
                                    darkMode
                                        ? 'bg-gray-900/40 border-gray-700/50 text-gray-300 hover:border-purple-500/40 hover:text-white hover:bg-gray-900/60'
                                        : 'bg-white/70 border-gray-300/60 text-gray-700 hover:border-purple-400/50 shadow-sm'
                                }`}
                            >
                                <FaDownload className="text-xs text-purple-400" />
                                Download CV
                            </motion.button>

                            {/* Tertiary: View Projects */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => scrollToSection('projects')}
                                className={`px-5 py-3 sm:py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                                    darkMode
                                        ? 'text-gray-400 hover:text-orange-400'
                                        : 'text-gray-500 hover:text-purple-600'
                                }`}
                            >
                                <FaPlay className="text-[10px]" />
                                View Work
                            </motion.button>
                        </motion.div>

                        {/* Social Icons */}
                        <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
                            <span className={`text-[11px] font-mono uppercase tracking-widest mr-2 ${theme.textMuted}`}>Connect</span>
                            {socialIcons.map((social, idx) => {
                                const IconComponent = social.icon;
                                return (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.12, y: -3 }}
                                        whileTap={{ scale: 0.92 }}
                                        className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm transition-all duration-200 ${theme.socialIconBg}`}
                                        aria-label={social.platform}
                                    >
                                        <IconComponent />
                                    </motion.a>
                                );
                            })}
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            variants={fadeUp}
                            className="grid grid-cols-3 gap-3 pt-3 max-w-md mx-auto lg:mx-0"
                        >
                            {heroData.stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: statsVisible ? 1 : 0, y: statsVisible ? 0 : 15 }}
                                    transition={{ delay: 0.8 + idx * 0.15, duration: 0.5 }}
                                    className={`relative p-3 sm:p-4 rounded-xl border text-center overflow-hidden group cursor-default ${theme.border} ${theme.cardBg}`}
                                >
                                    {/* Hover shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
                                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent relative z-10">
                                        {stat.value}
                                    </div>
                                    <div className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 uppercase tracking-wider relative z-10 ${theme.textMuted}`}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT COLUMN: Profile Photo ── */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-5 flex justify-center relative perspective-1000"
                    >
                        <div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem]"
                            style={{
                                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            {/* Glow behind */}
                            <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-orange-500/10 via-purple-500/6 to-cyan-400/4 blur-[80px] pointer-events-none" />

                            {/* Outer orbit — dashed */}
                            <div
                                className="absolute -inset-8 rounded-full border border-dashed pointer-events-none"
                                style={{
                                    borderColor: darkMode ? 'rgba(249,115,22,0.1)' : 'rgba(249,115,22,0.12)',
                                    animation: 'spin 35s linear infinite',
                                }}
                            />

                            {/* Inner orbit */}
                            <div
                                className="absolute -inset-3 rounded-full border pointer-events-none"
                                style={{
                                    borderColor: darkMode ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.1)',
                                    animation: 'spin 25s linear infinite reverse',
                                }}
                            />

                            {/* Orbiting dot */}
                            <div
                                className="absolute -inset-8 rounded-full pointer-events-none"
                                style={{ animation: 'spin 14s linear infinite' }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                            </div>

                            {/* Second orbiting dot — opposite side */}
                            <div
                                className="absolute -inset-3 rounded-full pointer-events-none"
                                style={{ animation: 'spin 10s linear infinite reverse' }}
                            >
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
                            </div>

                            {/* Profile image */}
                            <div className="relative w-full h-full preserve-3d" style={{ transform: 'translateZ(20px)' }}>
                                <div className="absolute inset-5 rounded-full bg-black/20 blur-2xl translate-y-4 pointer-events-none" />

                                {/* Gradient ring */}
                                <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-orange-500 via-purple-500 to-cyan-400 shadow-2xl shadow-purple-500/15">
                                    <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
                                        <img
                                            src={myImage}
                                            alt="MD MAHABUBUR RAHMAN"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                    <div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
                                                        <div class="text-center p-6">
                                                            <div class="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500/30 to-purple-500/30 rounded-full flex items-center justify-center text-3xl font-black text-white border border-orange-500/40 mb-3">M</div>
                                                            <p class="text-xs text-gray-400 font-mono">MD MAHABUBUR RAHMAN</p>
                                                        </div>
                                                    </div>
                                                `;
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Badge: Security Expert */}
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className={`absolute -top-1 -right-4 sm:top-3 sm:-right-3 px-3 py-1.5 rounded-xl border backdrop-blur-xl flex items-center gap-2 shadow-lg ${
                                        darkMode
                                            ? 'bg-gray-950/85 border-purple-500/20 text-white shadow-purple-500/8'
                                            : 'bg-white/85 border-purple-300/30 text-gray-800 shadow-purple-200/20'
                                    }`}
                                    style={{ zIndex: 30 }}
                                >
                                    <FaShieldAlt className="text-purple-400 text-xs" />
                                    <span className="text-[11px] font-semibold font-mono">Security Expert</span>
                                </motion.div>

                                {/* Badge: Full-Stack Dev */}
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                                    className={`absolute -bottom-1 -left-4 sm:bottom-3 sm:-left-3 px-3 py-1.5 rounded-xl border backdrop-blur-xl flex items-center gap-2 shadow-lg ${
                                        darkMode
                                            ? 'bg-gray-950/85 border-orange-500/20 text-white shadow-orange-500/8'
                                            : 'bg-white/85 border-orange-300/30 text-gray-800 shadow-orange-200/20'
                                    }`}
                                    style={{ zIndex: 30 }}
                                >
                                    <FaCode className="text-orange-400 text-xs" />
                                    <span className="text-[11px] font-semibold font-mono">Full-Stack Dev</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
                    onClick={() => scrollToSection('about')}
                >
                    <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${theme.textMuted} group-hover:text-orange-400 transition-colors`}>
                        Scroll Down
                    </span>
                    <div className={`w-5 h-9 rounded-full border-2 ${darkMode ? 'border-gray-700 group-hover:border-orange-500/40' : 'border-gray-300 group-hover:border-purple-400/50'} flex items-start justify-center p-1 transition-colors`}>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-2.5 rounded-full bg-gradient-to-b from-orange-500 to-purple-500"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
