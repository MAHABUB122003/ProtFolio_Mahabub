import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaWhatsapp,
    FaFacebookF,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaArrowUp,
    FaCode,
    FaShieldAlt,
    FaServer,
    FaBrain,
    FaHeart,
    FaCheck,
    FaCopy
} from 'react-icons/fa';

function Footer({ darkMode = true }) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText("rahmanmdmahabubur666@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const coreServices = [
        { name: 'Full-Stack Architecture', icon: FaCode, desc: 'MERN & FastAPI scalable web platforms' },
        { name: 'Security & Pentesting', icon: FaShieldAlt, desc: 'Vulnerability audits & threat mitigation' },
        { name: 'Applied Machine Learning', icon: FaBrain, desc: 'Predictive models & intelligent systems' },
        { name: 'Cloud & API Infrastructure', icon: FaServer, desc: 'Robust RESTful microservices & pipelines' },
    ];

    const socialLinks = [
        { icon: FaGithub, url: "https://github.com/MAHABUB122003", label: "GitHub" },
        { icon: FaLinkedinIn, url: "https://linkedin.com/in/md-mahabubur-rahman-41674b33a", label: "LinkedIn" },
        { icon: FaWhatsapp, url: "https://wa.me/8801715044575", label: "WhatsApp" },
        { icon: FaFacebookF, url: "https://www.facebook.com/md.abrar.ayman.mahabub/", label: "Facebook" },
    ];

    return (
        <footer className="relative bg-[#020204] text-white overflow-hidden border-t border-white/[0.08] selection:bg-rose-500/20 selection:text-white">
            {/* Top Subtle Gradient Border (Refined & Minimal) */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Ambient Subtle Background Lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-24 left-1/3 w-[600px] h-[300px] bg-slate-800/[0.08] rounded-full blur-[150px]" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-white/[0.02] rounded-full blur-[140px]" />
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">

                    {/* ── 1. Brand / Identity Column ── */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Logo Monogram */}
                        <div className="cursor-pointer inline-flex items-center gap-3.5 group" onClick={scrollToTop}>
                            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/15 text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg group-hover:border-white/30 group-hover:bg-white/[0.1] transition-all">
                                MR
                            </div>
                            <div>
                                <h3 className="text-base font-extrabold tracking-tight text-white leading-tight">
                                    MD MAHABUBUR RAHMAN
                                </h3>
                                <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                                    Full-Stack & Security Specialist
                                </p>
                            </div>
                        </div>

                        {/* Bio / Summary */}
                        <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
                            Building resilient, high-performance web systems engineered with Secure SDLC principles and integrated with machine learning models.
                        </p>

                        {/* Availability Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            <span>Available for Worldwide Contracts</span>
                        </div>

                        {/* Social Media Row */}
                        <div className="flex items-center gap-2.5 pt-1">
                            {socialLinks.map((social, idx) => {
                                const IconC = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center text-sm transition-all duration-200 shadow-sm"
                                    >
                                        <IconC />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── 2. Navigation Column ── */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                            NAVIGATION
                        </h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-xs text-slate-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
                                    >
                                        <span className="text-[7px] text-slate-500 group-hover:text-rose-400 transition-colors">◆</span>
                                        <span>{link.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── 3. Core Domains Column ── */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                            SPECIALIZATIONS
                        </h4>
                        <div className="space-y-2.5">
                            {coreServices.map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="p-2.5 rounded-2xl bg-[#090a10]/80 border border-white/[0.06] hover:border-white/15 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs text-slate-300 group-hover:text-rose-400 transition-colors flex-shrink-0">
                                                <IconComp />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{item.name}</p>
                                                <p className="text-[10px] text-slate-400 truncate font-normal">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── 4. Direct Contact Matrix Column ── */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
                            DIRECT CONTACT
                        </h4>
                        <div className="space-y-2.5">
                            <div className="p-3 rounded-2xl bg-[#090a10]/80 border border-white/[0.06] hover:border-white/15 transition-all flex items-center justify-between gap-3 group">
                                <a
                                    href="mailto:rahmanmdmahabubur666@gmail.com"
                                    className="flex items-center gap-3 min-w-0 flex-1"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-rose-400 text-xs flex-shrink-0 group-hover:scale-105 transition-all">
                                        <FaEnvelope />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Email</p>
                                        <p className="text-xs font-medium text-slate-200 group-hover:text-white truncate transition-colors">
                                            rahmanmdmahabubur666@gmail.com
                                        </p>
                                    </div>
                                </a>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all shrink-0"
                                    title="Copy Email"
                                >
                                    {copiedEmail ? <FaCheck className="text-emerald-400 text-xs" /> : <FaCopy className="text-xs" />}
                                </button>
                            </div>

                            <a
                                href="https://wa.me/8801715044575"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-2xl bg-[#090a10]/80 border border-white/[0.06] hover:border-emerald-500/30 transition-all flex items-center gap-3 group"
                            >
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs flex-shrink-0 group-hover:scale-105 transition-all">
                                    <FaPhone />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">WhatsApp / Call</p>
                                    <p className="text-xs font-medium text-slate-200 group-hover:text-emerald-300 truncate transition-colors">
                                        +880 1715044575
                                    </p>
                                </div>
                            </a>

                            <div className="p-3 rounded-2xl bg-[#090a10]/80 border border-white/[0.06] flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 text-xs flex-shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Location</p>
                                    <p className="text-xs font-medium text-slate-300">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Section Bar ── */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span>© {currentYear}</span>
                        <span className="text-slate-200 font-semibold">MD MAHABUBUR RAHMAN</span>
                        <span>•</span>
                        <span>All Rights Reserved</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span>Crafted with precision & security</span>
                    </div>

                    {/* Bismillah Inscription */}
                    <div className="text-right">
                        <p dir="rtl" lang="ar" className="text-xs font-arabic text-slate-400 hover:text-slate-200 transition-colors">
                            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Floating Scroll to Top (Clean Frosted Glass Pill) ── */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.6, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: 20 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-2xl flex items-center justify-center bg-[#0e1017]/90 text-white shadow-2xl border border-white/15 backdrop-blur-xl hover:bg-white/[0.1] hover:border-white/30 transition-all cursor-pointer"
                        title="Scroll to Top"
                    >
                        <FaArrowUp className="text-xs text-slate-200" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
}

export default Footer;
