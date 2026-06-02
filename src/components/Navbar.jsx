import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function Navbar({ darkMode, toggleDarkMode }) {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navItems = [
        { name: 'Home', link: '#home' },
        { name: 'About', link: '#about' },
        { name: 'Skills', link: '#skills' },
        { name: 'Projects', link: '#projects' },
        { name: 'Contact', link: '#contact' },
    ];

    const lightColors = {
        navBg: 'bg-gradient-to-br from-orange-50 to-white',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        textHover: 'text-orange-500',
        textActive: 'text-orange-600',
        indicator: 'bg-gradient-to-r from-orange-500 to-amber-500',
        button: 'bg-gradient-to-r from-orange-500 to-amber-500',
    };

    const darkColors = {
        navBg: 'bg-gradient-to-br from-gray-800 to-gray-900',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textHover: 'text-orange-400',
        textActive: 'text-orange-400',
        indicator: 'bg-gradient-to-r from-orange-500 to-amber-500',
        button: 'bg-gradient-to-r from-orange-500 to-amber-500',
    };

    const colors = darkMode ? darkColors : lightColors;

    // Update active section based on scroll
    useEffect(() => {
        const handleScroll = () => {
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

    const handleNavClick = (itemName, link) => {
        setActiveSection(itemName.toLowerCase());
        setIsMenuOpen(false);
        
        // Smooth scroll to section
        const element = document.querySelector(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className='flex justify-center w-full fixed z-50 mt-4 px-4'>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center justify-center ${colors.navBg} backdrop-blur-lg rounded-2xl px-4 lg:px-8 py-2 shadow-lg w-full max-w-5xl`}
            >
                <div className='flex items-center justify-between w-full gap-4 lg:gap-8'>
                    {/* Logo */}
                    <motion.a
                        href='/'
                        whileHover={{ scale: 1.05 }}
                        className='flex items-center space-x-2 cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            const homeSection = document.querySelector('#home');
                            if (homeSection) {
                                homeSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        <span className={`text-xl lg:text-2xl font-bold ${colors.textPrimary}`}>
                            MAHABUB<span className='text-orange-500'>.</span>
                        </span>
                    </motion.a>

                    {/* Desktop Navigation Items */}
                    <div className='hidden lg:flex items-center gap-6'>
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.link}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.name, item.link);
                                }}
                                className='relative cursor-pointer'
                            >
                                <motion.span
                                    className={`font-medium transition-colors duration-300 ${
                                        activeSection === item.name.toLowerCase() 
                                            ? colors.textActive 
                                            : `${colors.textSecondary} hover:text-orange-500`
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                </motion.span>

                                {activeSection === item.name.toLowerCase() && (
                                    <motion.div
                                        layoutId='navbar-indicator'
                                        className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${colors.indicator}`}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    <div className='flex items-center gap-2'>
                        {/* Dark mode Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors`}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? (
                                <Sun className='w-5 h-5 text-yellow-300' />
                            ) : (
                                <Moon className='w-5 h-5 text-gray-700' />
                            )}
                        </motion.button>

                        {/* Desktop Hire Me Button */}
                        <motion.a
                            href='#contact'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`hidden lg:block px-6 py-2 font-semibold rounded-full ${colors.button} text-white shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
                            onClick={(e) => {
                                e.preventDefault();
                                const contactSection = document.querySelector('#contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                }
                                setActiveSection('contact');
                                setIsMenuOpen(false);
                            }}
                        >
                            Hire Me
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <div className='flex lg:hidden items-center'>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                            >
                                {isMenuOpen ? (
                                    <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                                ) : (
                                    <Menu className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute top-full left-0 right-0 mt-2 lg:hidden 
                                ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg rounded-xl shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                        >
                            <div className='px-4 py-3 space-y-2'>
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.link}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.name, item.link);
                                        }}
                                        className='block'
                                    >
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            className={`py-3 px-4 rounded-lg text-center 
                                                ${activeSection === item.name.toLowerCase()
                                                    ? darkMode ? 'bg-gray-800' : 'bg-orange-50'
                                                    : ''
                                                }`}
                                        >
                                            <span className={`font-medium ${
                                                activeSection === item.name.toLowerCase()
                                                    ? colors.textActive
                                                    : colors.textSecondary
                                            }`}>
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    </a>
                                ))}
                                <motion.a
                                    href='#contact'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const contactSection = document.querySelector('#contact');
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                        setIsMenuOpen(false);
                                        setActiveSection('contact');
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`block py-3 px-4 text-center font-semibold rounded-lg ${colors.button} text-white shadow-md cursor-pointer`}
                                >
                                    Hire Me
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}

export default Navbar;