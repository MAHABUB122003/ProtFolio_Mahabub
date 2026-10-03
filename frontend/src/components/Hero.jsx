import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaArrowRight,
    FaDownload,
    FaShieldAlt,
    FaCode,
    FaCheckCircle,
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
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Hero({ darkMode }) {
    const heroData = getSection('hero');

    // 3D Parallax Tilt Effect for the Portrait
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
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
            className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-transparent"
        >
            {/* ── Soft Cinematic Ambient Lighting (Low-Key Luxury) ── */}
            <div className="absolute top-[20%] left-[5%] w-[450px] h-[450px] rounded-full bg-rose-500/[0.03] blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-slate-700/[0.04] blur-[160px] pointer-events-none" />

            {/* ── Main Container ── */}
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                    {/* ════════════════════════════════════════════
                        LEFT COLUMN: Studio Portrait with 3D Depth
                        (Matching the Matt Cannon Reference Layout)
                        ════════════════════════════════════════════ */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 flex justify-center lg:justify-start items-center"
                    >
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                            }}
                            className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] group cursor-pointer"
                        >
                            {/* Subtle Ambient Backlight Glow behind portrait */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/10 via-slate-700/15 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                            {/* Portrait Frame Container */}
                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a0a0c] to-[#000000] border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500 shadow-2xl shadow-black/90">
                                
                                {/* Top corner luxury tag */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-wider text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                                    <span>MD MAHABUB</span>
                                </div>

                                {/* Studio Portrait (Seamless Low-Key Fade) */}
                                <div className="relative w-full flex items-end justify-center pt-8 sm:pt-12">
                                    <motion.img
                                        src={myImage}
                                        alt="MD Mahabubur Rahman"
                                        className="w-full h-auto max-h-[480px] sm:max-h-[520px] lg:max-h-[560px] object-contain object-bottom filter contrast-[1.04] brightness-[1.0] select-none transition-transform duration-700 group-hover:scale-[1.02]"
                                        initial={{ y: 25, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                    {/* Bottom soft vignette gradient overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent pointer-events-none" />
                                </div>

                                {/* Floating 3D Badge on Portrait bottom right */}
                                <div
                                    style={{ transform: 'translateZ(30px)' }}
                                    className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs">
                                        <FaShieldAlt />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Status</p>
                                        <p className="text-xs font-bold text-white">Full-Stack & Security</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ════════════════════════════════════════════
                        RIGHT COLUMN: High-Contrast Modern Editorial Copy
                        (Matching the Template Typography & Style)
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

                        {/* Main Editorial Headline — "I'm MD Mahabubur Rahman" */}
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

                        {/* ── Primary Coral/Crimson CTA Button ("Get in touch") ── */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start items-center pt-2">
                            {/* Primary Button: "Get in touch" (Matching Template Red/Coral Accent) */}
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
