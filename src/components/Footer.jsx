import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaArrowUp,
    FaCode,
    FaShieldAlt,
    FaServer,
    FaBrain,
    FaFacebookF,
    FaHeart,
    FaStar,
} from 'react-icons/fa';

function Footer({ darkMode }) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [hoveredService, setHoveredService] = useState(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const services = [
        { name: 'Web Development', icon: <FaCode />, desc: 'Full-stack MERN applications', color: 'text-cyan-400', borderHover: 'hover:border-cyan-500/30', bgHover: 'hover:bg-cyan-500/5' },
        { name: 'Cybersecurity', icon: <FaShieldAlt />, desc: 'Security auditing & pentesting', color: 'text-orange-400', borderHover: 'hover:border-orange-500/30', bgHover: 'hover:bg-orange-500/5' },
        { name: 'Machine Learning', icon: <FaBrain />, desc: 'ML-powered solutions', color: 'text-purple-400', borderHover: 'hover:border-purple-500/30', bgHover: 'hover:bg-purple-500/5' },
        { name: 'API Development', icon: <FaServer />, desc: 'FastAPI & REST APIs', color: 'text-emerald-400', borderHover: 'hover:border-emerald-500/30', bgHover: 'hover:bg-emerald-500/5' },
    ];

    const socialLinks = [
        { icon: <FaGithub />, url: "https://github.com/MAHABUB122003", label: "GitHub" },
        { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/md-mahabubur-rahman-41674b33a", label: "LinkedIn" },
        { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
        { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
        { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
    ];

    const theme = {
        footerBg: darkMode ? 'bg-gray-950' : 'bg-gray-50',
        text: darkMode ? 'text-white' : 'text-gray-900',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-600',
        textFaint: darkMode ? 'text-gray-500' : 'text-gray-400',
        textDimmer: darkMode ? 'text-gray-600' : 'text-gray-300',
        cardBg: darkMode ? 'bg-gray-900/50 border-gray-800/50' : 'bg-white/60 border-gray-200/50',
        borderColor: darkMode ? 'border-gray-800/60' : 'border-gray-200/60',
        socialBg: darkMode
            ? 'bg-gray-900/60 border-gray-800/50 text-gray-400 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/8'
            : 'bg-white border-gray-200/50 text-gray-500 hover:text-purple-600 hover:border-purple-300/50 shadow-sm',
        sectionDot: darkMode ? 'bg-opacity-100' : 'bg-opacity-80',
    };

    return (
        <footer className={`relative overflow-hidden ${theme.footerBg} ${theme.text}`}>
            {/* ── Gradient Top Line ── */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div
                className="h-[1px] w-full"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, #f97316 20%, #ec4899 50%, #a855f7 80%, transparent 100%)',
                    boxShadow: '0 0 15px rgba(249,115,22,0.3), 0 0 30px rgba(168,85,247,0.15)',
                }}
            />

            {/* ── Background Ambiance ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute bottom-0 left-[20%] w-[500px] h-[300px] rounded-full blur-[100px] ${
                    darkMode ? 'bg-gradient-to-t from-orange-500/5 to-transparent' : 'bg-gradient-to-t from-orange-500/3 to-transparent'
                }`} />
                <div className={`absolute top-0 right-[20%] w-[500px] h-[300px] rounded-full blur-[100px] ${
                    darkMode ? 'bg-gradient-to-b from-purple-500/5 to-transparent' : 'bg-gradient-to-b from-purple-500/3 to-transparent'
                }`} />
                {/* Subtle Islamic star pattern watermark */}
                <div className={`absolute bottom-8 right-8 w-32 h-32 ${darkMode ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}>
                    <svg viewBox="0 0 100 100" fill="currentColor">
                        <polygon points="50,5 61,35 95,35 68,55 79,90 50,70 21,90 32,55 5,35 39,35" />
                    </svg>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">

                    {/* ── Brand Column ── */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Logo */}
                        <div className="cursor-pointer inline-block group" onClick={scrollToTop}>
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg shadow-orange-500/15 group-hover:shadow-orange-500/30 transition-shadow">
                                    <span className="text-white font-black text-sm">M</span>
                                </div>
                                <div>
                                    <h2 className={`text-xl font-black tracking-tight ${theme.text}`}>
                                        MAHABUB<span className="text-orange-500">.</span>
                                    </h2>
                                    <p className={`text-[9px] font-mono uppercase tracking-[0.2em] -mt-0.5 ${theme.textFaint}`}>
                                        developer & security
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tagline */}
                        <p className={`text-xs ${theme.textMuted} leading-relaxed max-w-xs`}>
                            Building secure, scalable, and intelligent digital solutions with MERN stack, cybersecurity, and machine learning expertise.
                        </p>

                        {/* Availability */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
                            darkMode
                                ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        }`}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            Available for work
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2 pt-1">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.12, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm transition-all duration-200 ${theme.socialBg}`}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* ── Navigation ── */}
                    <div className="lg:col-span-2">
                        <h3 className={`text-xs font-bold uppercase tracking-[0.15em] font-mono mb-5 flex items-center gap-2 ${theme.text}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            Navigate
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => scrollToSection(link.href)}
                                        className={`text-[13px] font-medium flex items-center gap-2 transition-colors ${theme.textMuted} hover:text-orange-400`}
                                    >
                                        <span className={`text-[8px] ${theme.textDimmer}`}>◆</span>
                                        {link.name}
                                    </motion.button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Services ── */}
                    <div className="lg:col-span-3">
                        <h3 className={`text-xs font-bold uppercase tracking-[0.15em] font-mono mb-5 flex items-center gap-2 ${theme.text}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            Services
                        </h3>
                        <div className="space-y-2">
                            {services.map((serv, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 3 }}
                                    onMouseEnter={() => setHoveredService(idx)}
                                    onMouseLeave={() => setHoveredService(null)}
                                    className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-default transition-all duration-300 ${theme.cardBg} ${serv.borderHover} ${serv.bgHover}`}
                                >
                                    <div className={`text-sm ${serv.color} transition-transform duration-300 ${hoveredService === idx ? 'scale-110' : ''}`}>
                                        {serv.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className={`text-xs font-bold ${theme.text}`}>{serv.name}</h4>
                                        <p className={`text-[10px] ${theme.textFaint} truncate`}>{serv.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Contact Info ── */}
                    <div className="lg:col-span-3">
                        <h3 className={`text-xs font-bold uppercase tracking-[0.15em] font-mono mb-5 flex items-center gap-2 ${theme.text}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                            Get in Touch
                        </h3>
                        <div className="space-y-2.5">
                            <motion.a
                                href="mailto:rahmanmdmahabubur666@gmail.com"
                                whileHover={{ x: 3 }}
                                className={`p-3 rounded-xl border flex items-center gap-3 transition-all group ${theme.cardBg} hover:border-orange-500/30`}
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/15 to-orange-500/5 flex items-center justify-center flex-shrink-0 group-hover:from-orange-500/25 group-hover:to-orange-500/10 transition-all">
                                    <FaEnvelope className="text-orange-400 text-xs" />
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-[10px] font-mono ${theme.textFaint}`}>Email</p>
                                    <p className={`text-[11px] font-medium ${theme.textMuted} group-hover:text-orange-400 truncate transition-colors`}>
                                        rahmanmdmahabubur666@gmail.com
                                    </p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="tel:+8801715044575"
                                whileHover={{ x: 3 }}
                                className={`p-3 rounded-xl border flex items-center gap-3 transition-all group ${theme.cardBg} hover:border-purple-500/30`}
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/15 to-purple-500/5 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/25 group-hover:to-purple-500/10 transition-all">
                                    <FaPhone className="text-purple-400 text-xs" />
                                </div>
                                <div>
                                    <p className={`text-[10px] font-mono ${theme.textFaint}`}>Phone</p>
                                    <p className={`text-[11px] font-medium ${theme.textMuted} group-hover:text-purple-400 transition-colors`}>
                                        +880 1715044575
                                    </p>
                                </div>
                            </motion.a>

                            <div className={`p-3 rounded-xl border flex items-center gap-3 ${theme.cardBg}`}>
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 flex items-center justify-center flex-shrink-0">
                                    <FaMapMarkerAlt className="text-cyan-400 text-xs" />
                                </div>
                                <div>
                                    <p className={`text-[10px] font-mono ${theme.textFaint}`}>Location</p>
                                    <p className={`text-[11px] font-medium ${theme.textMuted}`}>Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className={`mt-12 pt-5 border-t ${theme.borderColor}`}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className={`flex items-center gap-1.5 text-[11px] font-mono ${theme.textFaint}`}>
                            <span>© {currentYear}</span>
                            <span className={`font-semibold ${theme.text}`}>MD MAHABUBUR RAHMAN</span>
                            <span className={theme.textDimmer}>·</span>
                            <span>All rights reserved</span>
                        </div>

                        <div className={`flex items-center gap-1.5 text-[11px] font-mono ${theme.textFaint}`}>
                            <span>Crafted with</span>
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <FaHeart className="text-red-500 text-[10px]" />
                            </motion.span>
                            <span>using</span>
                            <span className="text-orange-400 font-semibold">React</span>
                            <span className={theme.textDimmer}>&</span>
                            <span className="text-cyan-400 font-semibold">Tailwind</span>
                        </div>
                    </div>

                    {/* Bismillah watermark */}
                    <p className={`text-center mt-4 text-[10px] font-mono ${theme.textDimmer} tracking-wider`}>
                        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </p>
                </div>
            </div>

            {/* ── Scroll to Top Button ── */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all border border-white/10"
                        style={{
                            background: 'linear-gradient(135deg, #f97316, #a855f7)',
                            boxShadow: '0 4px 20px rgba(249,115,22,0.3), 0 2px 8px rgba(168,85,247,0.2)',
                        }}
                        title="Scroll to Top"
                    >
                        <FaArrowUp className="text-xs" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
}

export default Footer;
