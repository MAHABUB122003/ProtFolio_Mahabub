import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode }) {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const menuRef = useRef(null);

    const navItems = [
        { name: 'Home', link: '#home' },
        { name: 'About', link: '#about' },
        { name: 'Skills', link: '#skills' },
        { name: 'Projects', link: '#projects' },
        { name: 'Contact', link: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = height > 0 ? (winScroll / height) * 100 : 0;
            setScrollProgress(progress);
            setScrolled(winScroll > 20);

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

    const theme = {
        navBg: darkMode
            ? scrolled
                ? 'bg-[#000000]/90 backdrop-blur-2xl border-white/[0.08] shadow-2xl shadow-black/90'
                : 'bg-transparent border-transparent'
            : scrolled
                ? 'bg-white/90 backdrop-blur-2xl border-gray-200/60 shadow-xl'
                : 'bg-transparent border-transparent',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
    };

    return (
        <>
            {/* Scroll Progress Bar — Coral/Crimson glow */}
            <div className="fixed top-0 left-0 z-[9999] h-[2px]" style={{ width: `${scrollProgress}%` }}>
                <div
                    className="w-full h-full bg-gradient-to-r from-rose-500 via-red-500 to-white"
                    style={{
                        boxShadow: '0 0 12px rgba(244,63,94,0.8)',
                    }}
                />
            </div>

            <motion.header
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-16 pt-4"
            >
                <div className="container mx-auto max-w-7xl">
                    <nav
                        ref={menuRef}
                        className={`rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 border ${theme.navBg}`}
                    >
                        <div className="flex items-center justify-between">

                            {/* Left Navigation Links (Matching Template Layout) */}
                            <div className="hidden md:flex items-center gap-6 lg:gap-8">
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.name.toLowerCase();
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => handleNavClick(item.name)}
                                            className={`text-sm font-medium transition-colors cursor-pointer ${
                                                isActive
                                                    ? 'text-white font-semibold'
                                                    : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Center Crimson Star Emblem (Matching Template Branding) */}
                            <motion.div
                                whileHover={{ scale: 1.15, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavClick('Home')}
                                className="cursor-pointer flex items-center justify-center"
                                aria-label="Mahabub Home"
                            >
                                <svg
                                    className="w-7 h-7 text-rose-500 transition-transform duration-300"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    {/* 8-point geometric star/asterisk */}
                                    <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
                                </svg>
                            </motion.div>

                            {/* Right Controls & Socials (Matching Template Style) */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                {/* Social Icons */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <a
                                        href="https://github.com/MAHABUB122003"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center text-xs transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <FaGithub />
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center text-xs transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedinIn />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center text-xs transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <FaFacebookF />
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center text-xs transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <FaInstagram />
                                    </a>
                                </div>

                                <div className="hidden sm:block w-px h-4 bg-white/15" />

                                {/* Theme Toggle */}
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-white/25 transition-all"
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
                                            {darkMode ? <Sun className="w-4 h-4 text-rose-400" /> : <Moon className="w-4 h-4" />}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>

                                {/* Mobile Hamburger */}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden p-2 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300"
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

                    {/* Mobile Dropdown */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden mt-2 p-3 rounded-2xl border border-white/10 bg-[#050508]/98 backdrop-blur-2xl shadow-2xl space-y-1 text-white"
                            >
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavClick(item.name)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                            activeSection === item.name.toLowerCase()
                                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                                                : 'text-slate-300 hover:bg-white/5'
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>
        </>
    );
}

export default Navbar;