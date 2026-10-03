import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { FaPaperPlane } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode }) {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const menuRef = useRef(null);

    const navItems = [
        { name: 'Home', link: '#home', icon: '⌂' },
        { name: 'About', link: '#about', icon: '◉' },
        { name: 'Skills', link: '#skills', icon: '◈' },
        { name: 'Projects', link: '#projects', icon: '◇' },
        { name: 'Contact', link: '#contact', icon: '✉' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = height > 0 ? (winScroll / height) * 100 : 0;
            setScrollProgress(progress);
            setScrolled(winScroll > 20);

            // Auto-hide navbar on scroll down, show on scroll up
            if (winScroll > lastScrollY.current && winScroll > 200) {
                setIsVisible(false);
                setIsMenuOpen(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = winScroll;

            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = winScroll + 100;
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMenuOpen]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
        }
    };

    const handleNavClick = (itemName) => {
        const sectionId = itemName.toLowerCase();
        setActiveSection(sectionId);
        setIsMenuOpen(false);
        setTimeout(() => scrollToSection(sectionId), 100);
    };

    const handleHireMeClick = () => {
        setActiveSection('contact');
        setIsMenuOpen(false);
        setTimeout(() => scrollToSection('contact'), 100);
    };

    const theme = {
        navBg: darkMode
            ? scrolled
                ? 'bg-[#030712]/85 backdrop-blur-2xl border-white/[0.08] shadow-2xl shadow-black/80'
                : 'bg-[#030712]/50 backdrop-blur-xl border-white/[0.05]'
            : scrolled
                ? 'bg-white/85 backdrop-blur-2xl border-gray-200/60 shadow-xl shadow-gray-300/30'
                : 'bg-white/50 backdrop-blur-xl border-gray-200/40',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        navCapsuleBg: darkMode
            ? 'bg-[#080d1a]/80 border-white/[0.08]'
            : 'bg-gray-100/60 border-gray-200/60',
        mobileDropdownBg: darkMode
            ? 'bg-[#030712]/98 backdrop-blur-2xl border-white/[0.1] text-white shadow-2xl shadow-black/90'
            : 'bg-white/98 backdrop-blur-2xl border-gray-200/60 text-gray-900',
        mobileButtonBg: darkMode
            ? 'bg-[#080d1a]/90 border-white/[0.08] text-slate-200'
            : 'bg-gray-100/80 border-gray-200/60 text-gray-800',
    };

    return (
        <>
            {/* Scroll Progress Bar — luxury silver/cyan glow */}
            <div className="fixed top-0 left-0 z-[9999] h-[2px]" style={{ width: `${scrollProgress}%` }}>
                <div
                    className="w-full h-full"
                    style={{
                        background: 'linear-gradient(90deg, #6366f1, #38bdf8, #ffffff)',
                        boxShadow: '0 0 12px rgba(56,189,248,0.8), 0 0 24px rgba(255,255,255,0.4)',
                    }}
                />
            </div>

            <motion.header
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4"
            >
                <div className="container mx-auto max-w-7xl">
                    <nav
                        ref={menuRef}
                        className={`rounded-2xl sm:rounded-[20px] border px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ${theme.navBg}`}
                    >
                        <div className="flex items-center justify-between">

                            {/* Brand Logo */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleNavClick('Home')}
                                className="cursor-pointer flex items-center gap-3 group"
                                aria-label="Mahabub — Home"
                            >
                                <div className="leading-none">
                                    <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                                        Mahabub<span className="text-cyan-400">.</span>
                                    </span>
                                </div>
                            </motion.div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#0c0c10]/70 backdrop-blur-xl">
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.name.toLowerCase();
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => handleNavClick(item.name)}
                                            className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                                                isActive
                                                    ? 'text-white font-semibold'
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activePill"
                                                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20"
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">
                                                {item.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right Controls */}
                            <div className="flex items-center gap-3">
                                {/* Theme Toggle */}
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={toggleDarkMode}
                                    className={`p-2 rounded-full border transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-[#121218] border-white/10 text-white hover:border-white/30'
                                            : 'bg-white border-gray-300 text-gray-800 shadow-sm'
                                    }`}
                                    aria-label="Toggle theme"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={darkMode ? 'sun' : 'moon'}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {darkMode ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4" />}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>

                                {/* Contact Me Button (Luxury White Pill) */}
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleHireMeClick}
                                    className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-full text-[13px] font-bold text-gray-950 bg-white hover:bg-slate-200 border border-white transition-all duration-300 shadow-lg shadow-white/10"
                                >
                                    <span>Contact Me</span>
                                </motion.button>

                                {/* Mobile Hamburger */}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className={`md:hidden p-2 rounded-xl border transition-all ${theme.mobileButtonBg}`}
                                    aria-label="Toggle menu"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isMenuOpen ? 'close' : 'menu'}
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Dropdown — with staggered items */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                                className={`md:hidden mt-2 p-3 rounded-2xl border shadow-2xl space-y-1 ${theme.mobileDropdownBg}`}
                            >
                                {navItems.map((item, idx) => (
                                    <motion.button
                                        key={item.name}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => handleNavClick(item.name)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                                            activeSection === item.name.toLowerCase()
                                                ? 'bg-white/10 text-white border border-white/20'
                                                : darkMode ? 'text-gray-300 hover:bg-gray-900/60' : 'text-gray-700 hover:bg-gray-100/80'
                                        }`}
                                    >
                                        <span className="text-xs opacity-50">{item.icon}</span>
                                        {item.name}
                                    </motion.button>
                                ))}

                                {/* Divider */}
                                <div className={`h-px mx-2 my-1 ${darkMode ? 'bg-gray-800/60' : 'bg-gray-200/60'}`} />

                                <motion.button
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleHireMeClick}
                                    className="w-full py-3 rounded-xl text-sm font-bold bg-white text-gray-950 shadow-lg shadow-white/10 flex items-center justify-center gap-2"
                                >
                                    <FaPaperPlane className="text-xs" />
                                    <span>Hire Me</span>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>
        </>
    );
}

export default Navbar;