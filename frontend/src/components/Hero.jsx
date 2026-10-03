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
    FaPlay,
    FaShieldAlt,
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
    hidden: { opacity: 0, scale: 0.9 },
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

    // Track mouse for ambient warm golden bokeh
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
            {/* ── Soft Warm Golden Ambient Bokeh (Matching Template) ── */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 transition-all duration-[2.5s] ease-out opacity-25 blur-[120px]"
                style={{
                    left: `${mousePosition.x}%`,
                    top: `${mousePosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, #D4AF37 0%, #E5A93C 40%, transparent 75%)',
                }}
            />
            {/* Left Warm Amber Light Orb */}
            <div className="absolute top-[30%] -left-[10%] w-[420px] h-[420px] rounded-full bg-[#E5A93C]/[0.08] blur-[130px] pointer-events-none" />
            {/* Right Warm Golden Orb behind photo */}
            <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/[0.10] blur-[140px] pointer-events-none" />

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
                                className={`font-arabic text-sm sm:text-base tracking-wide ${
                                    darkMode ? 'text-[#E5A93C]/80' : 'text-[#B8860B]'
                                }`}
                            >
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#E5A93C] text-xs font-mono tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
                                <span>{heroData.availableText || "Available For Full-Time & Freelance Roles"}</span>
                            </div>
                        </motion.div>

                        {/* Hello I'm & Main Headline */}
                        <motion.div variants={fadeUp} className="space-y-2">
                            <h3 className={`text-xl sm:text-2xl md:text-3xl font-light tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                Hello I'm
                            </h3>
                            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black uppercase tracking-tight leading-[1.05] ${
                                darkMode ? 'text-white' : 'text-gray-950'
                            }`}>
                                MD MAHABUBUR RAHMAN
                            </h1>
                        </motion.div>

                        {/* Animated Dynamic Role & Tagline */}
                        <motion.div variants={fadeUp} className="space-y-3">
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#E5A93C]">Specialization:</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#E5A93C] to-[#FBBF24]"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <p className={`text-sm sm:text-base md:text-[15px] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {heroData.description}
                            </p>
                        </motion.div>

                        {/* ── Action Buttons (Matching Template Style) ── */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start items-center pt-2">
                            {/* Primary Pill Button: "Let's Get Started" */}
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(229, 169, 60, 0.45)" }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => scrollToSection('contact')}
                                className="px-8 py-3.5 rounded-full text-sm font-bold text-black transition-all duration-300 flex items-center gap-2 shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #FBBF24 0%, #E5A93C 50%, #D4AF37 100%)',
                                }}
                            >
                                <span>Let's Get Started</span>
                                <FaArrowRight className="text-xs" />
                            </motion.button>

                            {/* Secondary Button: "Download CV" / Video preview */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleDownloadCV}
                                className={`px-6 py-3.5 rounded-full text-sm font-medium border flex items-center gap-2.5 transition-all duration-300 ${
                                    darkMode
                                        ? 'border-gray-800 bg-[#0c0c0f]/80 text-gray-300 hover:border-[#E5A93C]/50 hover:text-white'
                                        : 'border-gray-300 bg-white/80 text-gray-700 hover:border-[#D4AF37] hover:text-black shadow-sm'
                                }`}
                            >
                                <div className="w-6 h-6 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] flex items-center justify-center text-[10px]">
                                    <FaDownload />
                                </div>
                                <span>Download CV</span>
                            </motion.button>
                        </motion.div>

                        {/* ── Social Icons & Metrics Row (Template's 325+ Happy Clients style) ── */}
                        <motion.div variants={fadeUp} className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            {/* Project Count Metric */}
                            <div className="flex items-center gap-3">
                                <div>
                                    <h4 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#E5A93C]">
                                        9+
                                    </h4>
                                    <p className={`text-[11px] font-mono uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Completed Projects
                                    </p>
                                </div>
                                <div className="flex -space-x-2 overflow-hidden ml-2">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs">
                                        M
                                    </span>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] text-white font-bold text-xs">
                                        R
                                    </span>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-[#10b981] to-[#34d399] text-black font-bold text-xs">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            <div className={`hidden sm:block w-px h-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`} />

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
                                            className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs transition-all duration-200 ${
                                                darkMode
                                                    ? 'border-gray-800 bg-[#0d0d12]/90 text-gray-400 hover:text-[#E5A93C] hover:border-[#E5A93C]/40 hover:bg-[#E5A93C]/10'
                                                    : 'border-gray-300 bg-white text-gray-600 hover:text-[#B8860B] hover:border-[#B8860B]'
                                            }`}
                                        >
                                            <IconComp />
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ════════════════════════════════════════════
                        RIGHT COLUMN: Geometric Golden Contour Frame & Portrait
                        ════════════════════════════════════════════ */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 flex justify-center items-center relative"
                    >
                        <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-[4/5] flex items-center justify-center">

                            {/* ── Geometric Rounded Golden Triangle Contour (Exact Match to Template) ── */}
                            <div
                                className="absolute inset-4 sm:inset-6 rounded-[42px] pointer-events-none transition-all duration-700"
                                style={{
                                    border: '2.5px solid #E5A93C',
                                    transform: 'rotate(-7deg) scale(0.96)',
                                    boxShadow: '0 0 35px rgba(229, 169, 60, 0.22), inset 0 0 25px rgba(229, 169, 60, 0.08)',
                                }}
                            />

                            {/* Second subtle offset contour for luxury depth */}
                            <div
                                className="absolute inset-4 sm:inset-6 rounded-[42px] pointer-events-none opacity-30"
                                style={{
                                    border: '1px solid #D4AF37',
                                    transform: 'rotate(-2deg) scale(1.02)',
                                }}
                            />

                            {/* ── Mahabub's Real Portrait (Dark studio background with golden rim lighting) ── */}
                            <div className="relative z-10 w-full h-full flex items-end justify-center overflow-visible">
                                <motion.img
                                    src={myImage}
                                    alt="MD Mahabubur Rahman"
                                    className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] filter contrast-[1.05]"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* ── Rotating Circular Stamp Badge: "Hire Me For Your Dreamed Projects ↗" (Exact Match to Template) ── */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                                className="absolute -bottom-4 right-0 sm:right-2 z-20 w-28 h-28 sm:w-32 sm:h-32 pointer-events-auto cursor-pointer"
                                onClick={() => scrollToSection('contact')}
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* SVG Circular Curved Text */}
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <path
                                            id="circlePath"
                                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                            fill="none"
                                        />
                                        <text
                                            fontSize="9"
                                            fontFamily="monospace"
                                            fontWeight="bold"
                                            letterSpacing="2.2"
                                            fill={darkMode ? '#E5A93C' : '#92400E'}
                                        >
                                            <textPath href="#circlePath" startOffset="0%">
                                                • HIRE ME FOR YOUR DREAMED PROJECTS •
                                            </textPath>
                                        </text>
                                    </svg>

                                    {/* Center Golden Arrow Circle Button */}
                                    <div className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FBBF24] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 text-black">
                                        <FaArrowRight className="text-xs -rotate-45" />
                                    </div>
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
