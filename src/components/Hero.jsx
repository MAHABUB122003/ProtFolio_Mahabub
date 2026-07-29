import React, { useState, useEffect } from 'react';
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
    FaCode
} from 'react-icons/fa';
import { getSection } from '../utils/portfolioData';

import myImage from '../assets/mahabub.png';
import myCV from '../assets/mahabub.pdf';

function Hero({ darkMode }) {
    const heroData = getSection('hero');

    const socialIconMap = { github: FaGithub, linkedin: FaLinkedinIn, facebook: FaFacebookF, instagram: FaInstagram };
    const socialIcons = heroData.socials.map(s => ({
        icon: socialIconMap[s.platform] || FaGithub,
        url: s.url,
        platform: s.platform
    }));

    const theme = {
        bgGradient: darkMode ? 'from-gray-950 via-gray-900 to-gray-950' : 'from-slate-50 via-white to-slate-100',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode
            ? 'bg-gray-900/40 backdrop-blur-xl border-gray-800/60 text-white'
            : 'bg-white/80 backdrop-blur-xl border-gray-200/80 text-gray-900 shadow-xl shadow-gray-200/50',
        border: darkMode ? 'border-gray-800/80' : 'border-gray-200',
        socialIconBg: darkMode ? 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30' : 'bg-white border-gray-200 text-gray-700 hover:text-emerald-600 shadow-sm',
        downloadCvBtn: darkMode
            ? 'bg-gray-900/60 border-gray-800 hover:border-gray-700 text-gray-200'
            : 'bg-white border-gray-300 hover:border-gray-400 text-gray-800 shadow-sm hover:bg-gray-50',
        floatingBadgeBg: darkMode
            ? 'bg-gray-950/80 border-gray-800/80 text-white'
            : 'bg-white/95 border-gray-200/80 text-gray-900 shadow-xl',
    };

    const roles = heroData.roles || [
        "Full-Stack MERN Developer",
        "Cybersecurity Specialist",
        "Machine Learning Engineer"
    ];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2800);
        return () => clearInterval(interval);
    }, [roles.length]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = myCV;
        link.download = 'MD_Mahabubur_Rahman_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="home" className={`relative min-h-screen flex items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-br ${theme.bgGradient}`}>

            {/* Ambient Background Glows - Ultra-subtle, premium, dark */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-500/5 via-teal-500/3 to-transparent blur-[140px]" />
                <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-slate-500/5 via-blue-500/3 to-transparent blur-[150px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Bio & Intro Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-7 text-center lg:text-left space-y-6"
                    >

                        {/* Availability Radar Badge - Emerald theme */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs sm:text-sm font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span>{heroData.availableText || "Available for Freelance & Full-time Roles"}</span>
                        </div>

                        {/* Main Name Heading - Platinum Silver Gradient */}
                        <div className="space-y-2">
                            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight ${theme.textPrimary}`}>
                                Hi, I'm{" "}
                                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent block sm:inline">
                                    {heroData.name}
                                </span>
                            </h1>

                            {/* Rotating Role Titles */}
                            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.4 }}
                                        className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-400 dark:text-emerald-400"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={`${theme.textSecondary} text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0`}>
                            {heroData.description}
                        </p>

                        {/* Call To Action Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-black hover:bg-slate-100 shadow-lg shadow-black/20 flex items-center gap-2 hover:scale-105 transition-all"
                            >
                                <FaEnvelope className="text-xs text-black" />
                                <span>Contact Me</span>
                                <FaArrowRight className="text-xs text-black" />
                            </button>

                            <button
                                onClick={handleDownloadCV}
                                className={`px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold border flex items-center gap-2 hover:scale-105 transition-all ${theme.downloadCvBtn}`}
                            >
                                <FaDownload className="text-xs text-emerald-400" />
                                <span>Download CV</span>
                            </button>
                        </div>

                        {/* Social Links Bar */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
                            {socialIcons.map((social, idx) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-base transition-all hover:scale-110 ${theme.socialIconBg}`}
                                        aria-label={social.platform}
                                    >
                                        <IconComponent />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Hero Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 max-w-lg mx-auto lg:mx-0">
                            {heroData.stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 sm:p-4 rounded-2xl border ${theme.border} ${theme.cardBg} text-center`}
                                >
                                    <div className="text-xl sm:text-2xl font-black text-white dark:text-white">
                                        {stat.value}
                                    </div>
                                    <div className={`text-[11px] font-semibold ${theme.textMuted} mt-0.5`}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Profile Showcase & Floating Badges */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-5 flex justify-center relative"
                    >
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">

                            {/* Dual Glow Rings */}
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-slate-500/5 opacity-20 blur-2xl animate-pulse" />
                            <div className="absolute inset-0 rounded-full border-2 border-slate-800/60 animate-spin-slow" />

                            {/* Profile Image Container */}
                            <div className="w-full h-full rounded-full p-2 bg-gradient-to-tr from-slate-800 via-gray-900 to-slate-800 shadow-2xl relative overflow-hidden">
                                <div className="w-full h-full rounded-full bg-gray-950 dark:bg-gray-950 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={myImage}
                                        alt="MD MAHABUBUR RAHMAN"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `
                                                <div class="text-center p-6 space-y-2">
                                                    <div class="w-16 h-16 mx-auto bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center text-white text-2xl font-bold">M</div>
                                                    <h3 class="text-sm font-bold text-white">MD MAHABUBUR RAHMAN</h3>
                                                    <p class="text-xs text-emerald-400 font-mono">Full-Stack & Security</p>
                                                </div>
                                            `;
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Floating Tech Badges */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className={`absolute -top-2 -right-2 sm:top-2 sm:right-0 px-3.5 py-1.5 rounded-2xl border backdrop-blur-xl flex items-center gap-2 ${theme.floatingBadgeBg}`}
                            >
                                <FaShieldAlt className="text-emerald-400 text-xs sm:text-sm" />
                                <span className="text-xs font-bold font-mono">Security Expert</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className={`absolute -bottom-2 -left-2 sm:bottom-2 sm:left-0 px-3.5 py-1.5 rounded-2xl border backdrop-blur-xl flex items-center gap-2 ${theme.floatingBadgeBg}`}
                            >
                                <FaCode className="text-emerald-400 text-xs sm:text-sm" />
                                <span className="text-xs font-bold font-mono">Full-Stack Dev</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
