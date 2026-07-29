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
    FaCode
} from 'react-icons/fa';
import { getSection } from '../utils/portfolioData';

import myImage from '../assets/mahabub.png';
import myCV from '../assets/mahabub.pdf';

function Hero({ darkMode }) {
    const heroData = getSection('hero');
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const socialIconMap = { github: FaGithub, linkedin: FaLinkedinIn, facebook: FaFacebookF, instagram: FaInstagram };
    const socialIcons = heroData.socials.map(s => ({
        icon: socialIconMap[s.platform] || FaGithub,
        url: s.url,
        platform: s.platform
    }));

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -8, y: x * 8 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const theme = {
        bgGradient: darkMode ? 'from-gray-950 via-gray-900 to-gray-950' : 'from-slate-50 via-white to-slate-100',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
        textMuted: darkMode ? 'text-gray-500' : 'text-gray-400',
        cardBg: darkMode
            ? 'bg-gray-900/50 backdrop-blur-xl border-gray-800/60'
            : 'bg-white/80 backdrop-blur-xl border-gray-200/80 shadow-xl shadow-gray-200/50',
        border: darkMode ? 'border-gray-800' : 'border-gray-200',
        socialIconBg: darkMode
            ? 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-orange-400 hover:border-orange-500/30'
            : 'bg-white border-gray-200 text-gray-600 hover:text-purple-600 shadow-sm',
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

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-500/4 via-purple-500/2 to-transparent blur-[140px]" />
                <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-purple-500/4 via-orange-500/2 to-transparent blur-[150px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-7 text-center lg:text-left space-y-6"
                    >

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border border-orange-500/15 bg-orange-500/5 text-orange-400 text-xs sm:text-sm font-medium tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            <span>{heroData.availableText || "Available for Freelance & Full-time Roles"}</span>
                        </div>

                        <div className="space-y-3">
                            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${theme.textPrimary}`}>
                                Hi, I'm{" "}
                                <span className="bg-gradient-to-r from-orange-300 via-purple-400 to-violet-300 bg-clip-text text-transparent block sm:inline">
                                    {heroData.name}
                                </span>
                            </h1>

                            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.4 }}
                                        className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        <p className={`${theme.textSecondary} text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0`}>
                            {heroData.description}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
                            >
                                <FaEnvelope className="text-xs inline mr-2" />
                                <span>Contact Me</span>
                                <FaArrowRight className="text-xs inline ml-2" />
                            </button>

                            <button
                                onClick={handleDownloadCV}
                                className={`px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-2 hover:-translate-y-0.5 transition-all ${theme.downloadCvBtn || 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500'}`}
                            >
                                <FaDownload className="text-xs text-purple-400" />
                                <span>Download CV</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
                            {socialIcons.map((social, idx) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-11 h-11 lg:w-10 lg:h-10 rounded-xl border flex items-center justify-center text-base transition-all hover:-translate-y-0.5 ${theme.socialIconBg}`}
                                        aria-label={social.platform}
                                    >
                                        <IconComponent />
                                    </a>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 max-w-lg mx-auto lg:mx-0">
                            {heroData.stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 sm:p-4 rounded-xl border ${theme.border} ${theme.cardBg} text-center`}
                                >
                                    <div className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {stat.value}
                                    </div>
                                    <div className={`text-[11px] font-medium ${theme.textMuted} mt-0.5 uppercase tracking-wider`}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-5 flex justify-center relative perspective-1000"
                    >
                        <div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
                            style={{
                                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                                transition: 'transform 0.2s ease-out'
                            }}
                        >
                            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-orange-500/6 via-purple-500/4 to-transparent blur-3xl" />

                            <div className="absolute -inset-4 rounded-full border border-orange-500/8" style={{ animation: 'spin 12s linear infinite' }} />

                            <div className="relative w-full h-full preserve-3d" style={{ transform: 'translateZ(20px)' }}>
                                <div className="absolute inset-3 rounded-full bg-black/25 blur-2xl translate-y-2" />

                                <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-orange-500/70 via-purple-400/50 to-violet-400/30 shadow-2xl relative overflow-hidden">
                                    <div className="w-full h-full rounded-full bg-gray-950 overflow-hidden flex items-center justify-center">
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
                                                        <p class="text-xs text-purple-400 font-mono">Full-Stack & Security</p>
                                                    </div>
                                                `;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-1 -right-1 sm:top-3 sm:right-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-xl flex items-center gap-2 bg-gray-950/80 border-gray-800/80 text-white shadow-xl"
                                style={{ transform: 'translateZ(40px)' }}
                            >
                                <FaShieldAlt className="text-purple-400 text-xs sm:text-sm" />
                                <span className="text-xs font-medium font-mono">Security Expert</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute -bottom-1 -left-1 sm:bottom-3 sm:left-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-xl flex items-center gap-2 bg-gray-950/80 border-gray-800/80 text-white shadow-xl"
                                style={{ transform: 'translateZ(40px)' }}
                            >
                                <FaCode className="text-orange-400 text-xs sm:text-sm" />
                                <span className="text-xs font-medium font-mono">Full-Stack Dev</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
