import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaArrowRight,
    FaDownload,
} from 'react-icons/fa';
import { getSection } from '../utils/portfolioData';
import myImage from '../assets/mahabub.png';
import myCV from '../assets/mahabub.pdf';

/* ── Stagger Animation Variants ── */
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Hero({ darkMode }) {
    const heroData = getSection('hero');

    // Subtle 3D Parallax Tilt for the Portrait
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 28, stiffness: 180 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
    const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
    const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const socialIconMap = {
        github: FaGithub,
        linkedin: FaLinkedinIn,
        facebook: FaFacebookF,
        instagram: FaInstagram,
    };
    const socialIcons = heroData.socials.map((s) => ({
        icon: socialIconMap[s.platform] || FaGithub,
        url: s.url,
        platform: s.platform,
    }));

    const roles = heroData.roles || [
        "Full-Stack Developer",
        "Cybersecurity Specialist",
        "ML Engineer",
        "Bug Bounty Hunter",
    ];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
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
            className="relative min-h-[94vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-transparent"
        >
            {/* ── Soft Ambient Studio Backlight ── */}
            <div className="absolute top-[20%] left-[8%] w-[480px] h-[480px] rounded-full bg-rose-500/[0.035] blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[12%] w-[500px] h-[500px] rounded-full bg-slate-800/[0.04] blur-[150px] pointer-events-none" />

            {/* ── Main Container ── */}
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* ════════════════════════════════════════════
                        LEFT COLUMN: Large Free-Standing Studio Portrait
                        (Seamless Cutout Standing Directly on Canvas)
                        ════════════════════════════════════════════ */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 flex justify-center items-end relative min-h-[440px] sm:min-h-[500px] lg:min-h-[580px]"
                    >
                        {/* 3D Motion Container */}
                        <motion.div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                x: moveX,
                                y: moveY,
                                transformStyle: 'preserve-3d',
                            }}
                            className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] flex justify-center items-end cursor-pointer"
                        >
                            {/* Subtle Ambient Backlight Halo directly behind the head/shoulders */}
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-84 sm:h-84 bg-gradient-to-tr from-rose-500/10 via-slate-600/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

                            {/* Large High-Contrast Portrait (Free-Standing, Zero Bounding Box) */}
                            <motion.img
                                src={myImage}
                                alt="MD Mahabubur Rahman"
                                className="relative z-10 w-full h-auto max-h-[520px] sm:max-h-[580px] lg:max-h-[640px] object-contain object-bottom filter contrast-[1.05] brightness-[1.0] select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* ════════════════════════════════════════════
                        RIGHT COLUMN: High-Contrast Modern Editorial Copy
                        ════════════════════════════════════════════ */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 text-center lg:text-left space-y-6 lg:space-y-7"
                    >
                        {/* Bismillah & Availability Badge */}
                        <motion.div variants={fadeUp} className="space-y-2">
                            <p
                                dir="rtl"
                                lang="ar"
                                className="font-arabic text-sm sm:text-base tracking-wider text-slate-400 font-medium"
                            >
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </p>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>{heroData.availableText || "Available For Full-Time & Freelance Roles"}</span>
                            </div>
                        </motion.div>

                        {/* Main Editorial Headline */}
                        <motion.div variants={fadeUp} className="space-y-2">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-white leading-[1.08]">
                                I'm <span className="font-extrabold text-white">MD Mahabubur Rahman</span>
                            </h1>
                            <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-medium text-slate-300">
                                a <span className="text-white font-semibold">Creative Full-Stack Developer</span> & <span className="text-white font-semibold">Security Specialist</span>
                            </h2>
                        </motion.div>

                        {/* Specialization Switcher & Bio Paragraph */}
                        <motion.div variants={fadeUp} className="space-y-3.5">
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Core Expertise:</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.25 }}
                                        className="text-sm sm:text-base font-bold text-rose-400"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <p className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal text-slate-400">
                                {heroData.description}
                            </p>
                        </motion.div>

                        {/* ── Action Buttons ── */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start items-center pt-2">
                            {/* Primary Button: "Get in touch" */}
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(244, 63, 94, 0.45)" }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => scrollToSection('contact')}
                                className="px-8 py-3.5 rounded-xl text-sm font-bold bg-[#f43f5e] hover:bg-[#e11d48] text-white transition-all duration-300 flex items-center gap-2.5 shadow-lg shadow-rose-900/40 cursor-pointer"
                            >
                                <span>Get in touch</span>
                                <FaArrowRight className="text-xs" />
                            </motion.button>

                            {/* Secondary Button: "Download CV" */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleDownloadCV}
                                className="px-7 py-3.5 rounded-xl text-sm font-medium border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-xl flex items-center gap-2.5 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-6 h-6 rounded-lg bg-white/10 text-slate-200 flex items-center justify-center text-[10px]">
                                    <FaDownload />
                                </div>
                                <span>Download CV</span>
                            </motion.button>
                        </motion.div>

                        {/* ── Metrics & Social Links ── */}
                        <motion.div variants={fadeUp} className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
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
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-rose-600 to-red-600 text-white font-bold text-xs">
                                        R
                                    </span>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-8 bg-white/10" />

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
                                            className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-rose-500/50 hover:bg-rose-500/10 flex items-center justify-center text-xs transition-all duration-200"
                                        >
                                            <IconComp />
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default Hero;
