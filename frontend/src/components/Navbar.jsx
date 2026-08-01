import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Menu, Moon, Sun, X, Sparkles } from 'lucide-react';
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
                ? 'bg-gray-950/80 backdrop-blur-2xl border-gray-800/50 shadow-2xl shadow-black/40'
                : 'bg-gray-950/40 backdrop-blur-xl border-gray-800/30'
            : scrolled
                ? 'bg-white/85 backdrop-blur-2xl border-gray-200/60 shadow-xl shadow-gray-300/30'
                : 'bg-white/50 backdrop-blur-xl border-gray-200/40',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        navCapsuleBg: darkMode
            ? 'bg-gray-900/50 border-gray-800/60'
            : 'bg-gray-100/60 border-gray-200/60',
        mobileDropdownBg: darkMode
            ? 'bg-gray-950/98 backdrop-blur-2xl border-gray-800/60 text-white'
            : 'bg-white/98 backdrop-blur-2xl border-gray-200/60 text-gray-900',
        mobileButtonBg: darkMode
            ? 'bg-gray-900/80 border-gray-800/60 text-gray-200'
            : 'bg-gray-100/80 border-gray-200/60 text-gray-800',
    };

    return (
        <>
            {/* Scroll Progress Bar — gradient with glow */}
            <div className="fixed top-0 left-0 z-[9999] h-[2px]" style={{ width: `${scrollProgress}%` }}>
                <div
                    className="w-full h-full"
                    style={{
                        background: 'linear-gradient(90deg, #f97316, #ec4899, #a855f7, #06b6d4)',
                        boxShadow: '0 0 12px rgba(249,115,22,0.8), 0 0 24px rgba(168,85,247,0.4)',
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

                            {/* Brand Logo — with subtle gradient accent */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleNavClick('Home')}
                                className="cursor-pointer flex items-center gap-2.5 group"
                            >
                                {/* Logo mark */}
                                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                                    <span className="text-white font-black text-sm sm:text-base">M</span>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative text-white font-black text-sm sm:text-base">M</span>
                                </div>
                                <div className="hidden sm:block">
                                    <span className={`text-lg font-extrabold tracking-tight ${theme.textPrimary}`}>
                                        MAHABUB
                                    </span>
                                    <span className="text-orange-500 font-black">.</span>
                                    <span className={`text-[10px] font-mono block -mt-1 tracking-widest uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        developer
                                    </span>
                                </div>
                            </motion.div>

                            {/* Desktop Navigation — pill style with indicator */}
                            <div className={`hidden md:flex items-center gap-0.5 p-1 rounded-full border backdrop-blur-md ${theme.navCapsuleBg}`}>
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.name.toLowerCase();
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => handleNavClick(item.name)}
                                            className={`relative px-4 lg:px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                                                isActive
                                                    ? 'text-white'
                                                    : darkMode
                                                        ? 'text-gray-400 hover:text-gray-200'
                                                        : 'text-gray-500 hover:text-gray-900'
                                            }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activePill"
                                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-purple-600"
                                                    style={{
                                                        boxShadow: '0 4px 15px rgba(249,115,22,0.3), 0 2px 8px rgba(168,85,247,0.2)',
                                                    }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10 flex items-center gap-1.5">
                                                {item.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right Controls */}
                            <div className="flex items-center gap-2 sm:gap-2.5">

                                {/* Theme Toggle */}
                                <motion.button
                                    whileHover={{ scale: 1.08, rotate: 15 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={toggleDarkMode}
                                    className={`relative p-2.5 sm:p-2 rounded-xl border transition-all duration-300 overflow-hidden ${
                                        darkMode
                                            ? 'bg-gray-900/80 border-gray-800/60 text-amber-400 hover:border-amber-500/40'
                                            : 'bg-white/80 border-gray-200/60 text-gray-700 hover:border-purple-300/60 shadow-sm'
                                    }`}
                                    aria-label="Toggle theme"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={darkMode ? 'sun' : 'moon'}
                                            initial={{ y: -20, opacity: 0, rotate: -90 }}
                                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                                            exit={{ y: 20, opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>

                                {/* Hire Me — Desktop */}
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleHireMeClick}
                                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all relative overflow-hidden group"
                                    style={{
                                        background: 'linear-gradient(135deg, #f97316, #a855f7)',
                                        boxShadow: '0 4px 20px rgba(249,115,22,0.25), 0 2px 8px rgba(168,85,247,0.15)',
                                    }}
                                >
                                    {/* Shimmer effect on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                            animation: 'shimmer 2s infinite',
                                        }}
                                    />
                                    <FaPaperPlane className="text-xs relative z-10" />
                                    <span className="relative z-10">Hire Me</span>
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
                                                ? 'bg-gradient-to-r from-orange-500/15 to-purple-500/15 text-orange-500 border border-orange-500/20'
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
                                    className="w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
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