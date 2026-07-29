import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { FaPaperPlane } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode }) {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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
            setScrolled(window.scrollY > 20);
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;
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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                ? 'bg-gray-950/90 backdrop-blur-xl border-gray-800/80 shadow-2xl shadow-black/50'
                : 'bg-gray-950/60 backdrop-blur-md border-gray-800/50'
            : scrolled
                ? 'bg-white/90 backdrop-blur-xl border-gray-200/80 shadow-lg shadow-gray-200/50'
                : 'bg-white/70 backdrop-blur-md border-gray-200/60',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        navCapsuleBg: darkMode ? 'bg-gray-900/60 border-gray-800/80' : 'bg-gray-100/80 border-gray-200/80',
        mobileDropdownBg: darkMode ? 'bg-gray-950/95 border-gray-800 text-white' : 'bg-white/95 border-gray-200 text-gray-900',
        mobileButtonBg: darkMode ? 'bg-gray-900 border-gray-800 text-gray-200' : 'bg-gray-100 border-gray-200 text-gray-800',
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
            <div className="container mx-auto max-w-7xl">
                <nav
                    ref={menuRef}
                    className={`rounded-2xl sm:rounded-3xl border px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ${theme.navBg}`}
                >
                    <div className="flex items-center justify-between">

                        {/* Brand Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavClick('Home')}
                            className="cursor-pointer flex items-center gap-2"
                        >
                            <span className={`text-xl sm:text-2xl font-black tracking-tight ${theme.textPrimary}`}>
                                MAHABUB<span className="text-orange-500">.</span>
                            </span>
                        </motion.div>

                        {/* Desktop Navigation Links Capsule */}
                        <div className={`hidden md:flex items-center gap-1 lg:gap-2 p-1.5 rounded-full border backdrop-blur-md ${theme.navCapsuleBg}`}>
                            {navItems.map((item) => {
                                const isActive = activeSection === item.name.toLowerCase();
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavClick(item.name)}
                                        className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                            isActive
                                                ? 'text-white font-bold'
                                                : darkMode
                                                    ? 'text-gray-400 hover:text-gray-200'
                                                    : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activePill"
                                                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 shadow-md shadow-orange-500/20"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2.5 sm:p-2 rounded-2xl border transition-all hover:scale-105 ${
                                    darkMode
                                        ? 'bg-gray-900 border-gray-800 text-amber-400 hover:bg-gray-800'
                                        : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-100 shadow-sm'
                                }`}
                                aria-label="Toggle theme"
                            >
                                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>

                            {/* Hire Me Desktop Button */}
                            <button
                                onClick={handleHireMeClick}
                                className="hidden sm:flex items-center gap-2 px-5 py-3 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
                            >
                                <FaPaperPlane className="text-xs" />
                                <span>Hire Me</span>
                            </button>

                            {/* Mobile Hamburger Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`md:hidden p-2 rounded-2xl border ${theme.mobileButtonBg}`}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Dropdown Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`md:hidden mt-2 p-4 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-2 ${theme.mobileDropdownBg}`}
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.name)}
                                    className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                                        activeSection === item.name.toLowerCase()
                                            ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30'
                                            : darkMode ? 'text-gray-300 hover:bg-gray-900' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                            <button
                                onClick={handleHireMeClick}
                                className="w-full py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg flex items-center justify-center gap-2 mt-2"
                            >
                                <FaPaperPlane className="text-xs" />
                                <span>Hire Me</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

export default Navbar;