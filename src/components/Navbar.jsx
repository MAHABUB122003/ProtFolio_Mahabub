import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

function Navbar({ darkMode, toggleDarkMode }) {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredItem, setHoveredItem] = useState(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const menuRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const navRef = useRef(null);
    
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

    // Smooth 4D Parallax effect
    useEffect(() => {
        let animationFrame;
        const handleMouseMove = (e) => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                if (navRef.current) {
                    const rect = navRef.current.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const moveX = (e.clientX - centerX) / 45;
                    const moveY = (e.clientY - centerY) / 45;
                    setMousePosition({ x: moveX, y: moveY });
                }
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 70;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 80;
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
                menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleNavClick = (itemName) => {
        const sectionId = itemName.toLowerCase();
        setActiveSection(sectionId);
        setIsMenuOpen(false);
        setTimeout(() => scrollToSection(sectionId), 150);
    };

    const handleHireMeClick = () => {
        setActiveSection('contact');
        setIsMenuOpen(false);
        setTimeout(() => scrollToSection('contact'), 150);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // ==================== 4D ANIMATION VARIANTS ====================

    // 4D Floating Navbar Container
    const navContainerVariants = {
        initial: { 
            y: -120, 
            opacity: 0,
            rotateX: -25,
            rotateY: -15,
            scale: 0.92
        },
        animate: { 
            y: 0, 
            opacity: 1,
            rotateX: mousePosition.y * 0.25,
            rotateY: mousePosition.x * 0.35,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 140,
                damping: 22,
                mass: 0.9,
                rotateX: { duration: 0.08, ease: "linear" },
                rotateY: { duration: 0.08, ease: "linear" }
            }
        }
    };

    // 4D Logo Wave Animation
    const logoVariants = {
        initial: { 
            rotateX: 0, 
            rotateY: 0,
            scale: 1
        },
        hover: {
            rotateX: [0, 12, 0, 6, 0],
            rotateY: [0, -12, 0, -6, 0],
            scale: 1.08,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                times: [0, 0.2, 0.5, 0.7, 1]
            }
        },
        tap: { scale: 0.96 }
    };

    // 4D Depth Nav Items
    const navItemVariants = {
        initial: { z: 0, scale: 1, rotateY: 0 },
        hover: (custom) => ({
            z: 35,
            scale: 1.06,
            rotateY: custom % 2 === 0 ? 6 : -6,
            transition: {
                type: "spring",
                stiffness: 350,
                damping: 18,
                delay: custom * 0.02
            }
        }),
        tap: { scale: 0.96, z: 0 }
    };

    // 4D Magnetic Text Effect
    const textVariants = {
        initial: { x: 0, y: 0 },
        hover: {
            x: (hoveredItem === 'Home' ? -3 : hoveredItem === 'Contact' ? 3 : 0),
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" }
        }
    };

    // 4D Glow Indicator
    const indicatorVariants = {
        initial: { 
            scaleX: 0, 
            opacity: 0,
            rotateY: -90
        },
        animate: {
            scaleX: 1,
            opacity: 1,
            rotateY: 0,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 28,
                delay: 0.08
            }
        },
        exit: {
            scaleX: 0,
            opacity: 0,
            rotateY: 90,
            transition: { duration: 0.2 }
        }
    };

    // 4D 3D Flip Toggle
    const toggleVariants = {
        initial: { rotate: 0, rotateX: 0, scale: 1 },
        hover: {
            rotate: [0, -12, 12, -6, 6, 0],
            rotateX: [0, 15, 0],
            scale: 1.15,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        },
        tap: { scale: 0.92 }
    };

    // 4D Holographic Button
    const hireMeVariants = {
        initial: { scale: 1, z: 0 },
        hover: {
            scale: 1.06,
            z: 25,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15
            }
        },
        tap: { scale: 0.96 }
    };

    // 4D Portal Mobile Menu
    const mobileMenuVariants = {
        initial: { 
            opacity: 0, 
            y: -60,
            rotateX: -110,
            scale: 0.85,
            transformOrigin: "top"
        },
        animate: { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            scale: 1,
            transformOrigin: "top",
            transition: {
                type: "spring",
                stiffness: 320,
                damping: 26,
                staggerChildren: 0.06,
                delayChildren: 0.08
            }
        },
        exit: { 
            opacity: 0, 
            y: -50,
            rotateX: -90,
            scale: 0.9,
            transformOrigin: "top",
            transition: {
                duration: 0.22,
                ease: "easeIn"
            }
        }
    };

    // 4D Cascade Menu Items
    const mobileMenuItemVariants = {
        initial: { 
            opacity: 0, 
            x: -40, 
            rotateY: -55,
            scale: 0.9
        },
        animate: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 420,
                damping: 22
            }
        },
        exit: { 
            opacity: 0, 
            x: 40, 
            rotateY: 55,
            scale: 0.95,
            transition: { duration: 0.15 }
        },
        hover: {
            x: 10,
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    };

    // 4D Shimmer Wave
    const shimmerVariants = {
        animate: {
            x: ["-120%", "120%"],
            transition: {
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2.2
            }
        }
    };

    // 4D Particle Ring Animation
    const ringPulseVariants = {
        animate: {
            scale: [1, 1.12, 1],
            opacity: [0.5, 0.15, 0.5],
            rotate: [0, 180, 360],
            transition: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>
            {/* 4D Spacer with depth */}
            <motion.div 
                className="h-14 sm:h-16 md:h-20"
                initial={{ opacity: 0, y: -15, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            <div className='flex justify-center w-full fixed top-0 left-0 right-0 z-50 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4' ref={menuRef}>
                <motion.nav
                    ref={navRef}
                    variants={navContainerVariants}
                    initial="initial"
                    animate="animate"
                    style={{ 
                        transformStyle: "preserve-3d", 
                        perspective: "1200px",
                        transformOrigin: "center center"
                    }}
                    className={`flex items-center justify-center ${colors.navBg} backdrop-blur-lg rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 shadow-xl w-full max-w-5xl`}
                >
                    <div className='flex items-center justify-between w-full gap-2 sm:gap-3 md:gap-4 lg:gap-8'>
                        {/* 4D Logo with Flip Animation */}
                        <motion.div
                            variants={logoVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className='flex items-center space-x-2 cursor-pointer'
                            style={{ transformStyle: "preserve-3d" }}
                            onClick={() => {
                                scrollToSection('home');
                                setActiveSection('home');
                                setIsMenuOpen(false);
                            }}
                        >
                            <motion.span 
                                className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.textPrimary}`}
                                animate={{
                                    textShadow: hoveredItem === 'logo' 
                                        ? "0 0 12px rgba(249,115,22,0.6), 0 0 24px rgba(249,115,22,0.3)" 
                                        : "0 0 0px rgba(249,115,22,0)"
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                MAHABUB<span className='text-orange-500'>.</span>
                            </motion.span>
                        </motion.div>

                        {/* Desktop Navigation Items with 4D Depth */}
                        <div className='hidden md:flex items-center gap-3 lg:gap-4 xl:gap-7'>
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    custom={index}
                                    variants={navItemVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onHoverStart={() => setHoveredItem(item.name)}
                                    onHoverEnd={() => setHoveredItem(null)}
                                    onClick={() => handleNavClick(item.name)}
                                    className='relative cursor-pointer bg-transparent border-none'
                                    style={{ 
                                        background: 'none',
                                        transformStyle: "preserve-3d"
                                    }}
                                >
                                    <motion.span
                                        variants={textVariants}
                                        initial="initial"
                                        whileHover="hover"
                                        custom={item.name}
                                        className={`font-medium text-xs lg:text-sm xl:text-base transition-colors duration-200 ${
                                            activeSection === item.name.toLowerCase() 
                                                ? colors.textActive 
                                                : `${colors.textSecondary} hover:text-orange-500`
                                        }`}
                                        animate={{
                                            textShadow: hoveredItem === item.name 
                                                ? "0 0 6px rgba(249,115,22,0.35)" 
                                                : "0 0 0px rgba(249,115,22,0)"
                                        }}
                                    >
                                        {item.name}
                                    </motion.span>

                                    <AnimatePresence mode="wait">
                                        {activeSection === item.name.toLowerCase() && (
                                            <motion.div
                                                layoutId='navbar-indicator'
                                                variants={indicatorVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${colors.indicator}`}
                                                style={{ transformOrigin: "left" }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            ))}
                        </div>

                        <div className='flex items-center gap-1 sm:gap-2'>
                            {/* 4D 3D Flip Dark Mode Toggle */}
                            <motion.button
                                variants={toggleVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={toggleDarkMode}
                                className={`p-1.5 sm:p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors cursor-pointer`}
                                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <motion.div
                                    animate={{ 
                                        rotate: darkMode ? 0 : 360,
                                        scale: darkMode ? 1 : 1.08
                                    }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                >
                                    {darkMode ? (
                                        <Sun className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-300' />
                                    ) : (
                                        <Moon className='w-4 h-4 sm:w-5 sm:h-5 text-gray-700' />
                                    )}
                                </motion.div>
                            </motion.button>

                            {/* 4D Holographic Hire Me Button */}
                            <motion.button
                                variants={hireMeVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleHireMeClick}
                                className={`hidden md:block px-3 lg:px-4 xl:px-5 py-1.5 font-semibold rounded-full ${colors.button} text-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer text-xs lg:text-sm relative overflow-hidden`}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <motion.span
                                    className="relative z-10 block"
                                    animate={{
                                        scale: [1, 1.03, 1],
                                    }}
                                    transition={{
                                        duration: 2.2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatDelay: 1.2
                                    }}
                                >
                                    Hire Me
                                </motion.span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                    variants={shimmerVariants}
                                    animate="animate"
                                    style={{ transform: "skewX(-15deg)" }}
                                />
                                {/* 4D Glow Ring */}
                                <motion.div
                                    variants={ringPulseVariants}
                                    animate="animate"
                                    className="absolute inset-0 rounded-full opacity-0"
                                    style={{ boxShadow: "0 0 20px rgba(249,115,22,0.5)" }}
                                />
                            </motion.button>

                            {/* Mobile Menu Button with 4D Rotation */}
                            <div className='flex md:hidden items-center'>
                                <motion.button
                                    whileTap={{ scale: 0.93 }}
                                    animate={{ 
                                        rotate: isMenuOpen ? 90 : 0,
                                        scale: isMenuOpen ? 1.05 : 1
                                    }}
                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                    onClick={toggleMenu}
                                    className={`p-1.5 sm:p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-pointer`}
                                    aria-label="Toggle menu"
                                >
                                    {isMenuOpen ? (
                                        <X className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                                    ) : (
                                        <Menu className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* 4D Portal Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            ref={mobileMenuRef}
                            variants={mobileMenuVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{ 
                                transformStyle: "preserve-3d", 
                                perspective: "1000px",
                                transformOrigin: "top center"
                            }}
                            className={`fixed top-[72px] left-2 right-2 md:hidden 
                                ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg rounded-xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-40 overflow-hidden`}
                        >
                            <div className='px-3 sm:px-4 py-2 sm:py-3 space-y-1 sm:space-y-2'>
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.name}
                                        custom={index}
                                        variants={mobileMenuItemVariants}
                                        whileHover="hover"
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleNavClick(item.name)}
                                        className='w-full text-left block bg-transparent border-none cursor-pointer'
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <motion.div
                                            className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg  transition-all duration-150
                                                ${activeSection === item.name.toLowerCase()
                                                    ? darkMode ? 'bg-gradient-to-r from-orange-500/20 to-purple-500/20' : 'bg-gradient-to-r from-orange-100 to-purple-100'
                                                    : darkMode ? 'hover:bg-gray-800/60' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <span className={`text-sm sm:text-base font-medium ${
                                                activeSection === item.name.toLowerCase()
                                                    ? colors.textActive
                                                    : colors.textSecondary
                                            }`}>
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    </motion.button>
                                ))}
                                <motion.button
                                    onClick={handleHireMeClick}
                                    variants={mobileMenuItemVariants}
                                    custom={navItems.length}
                                    whileHover="hover"
                                    whileTap={{ scale: 0.96 }}
                                    className={`block w-full py-2.5 sm:py-3 px-3 sm:px-4 text-center font-semibold rounded-lg ${colors.button} text-white shadow-lg cursor-pointer text-sm sm:text-base relative overflow-hidden`}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <motion.span
                                        className="relative z-10 block"
                                        animate={{
                                            scale: [1, 1.02, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatDelay: 1.5
                                        }}
                                    >
                                        Hire Me
                                    </motion.span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                        variants={shimmerVariants}
                                        animate="animate"
                                        style={{ transform: "skewX(-15deg)" }}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default Navbar;