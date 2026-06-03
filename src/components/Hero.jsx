import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaGithub, 
    FaLinkedinIn, 
    FaFacebookF, 
    FaInstagram, 
    FaArrowRight, 
    FaUserShield, 
    FaDownload, 
    FaEnvelope,
    FaShieldAlt,
    FaCode
} from 'react-icons/fa';

// Import your assets - make sure these files exist in src/assets/
import myImage from '../assets/mahabub.png';
import myCV from '../assets/mahabub.pdf';

function Hero({ darkMode }) {
    const socialIcons = [
        { icon: FaGithub, alt: "github", url: "https://github.com/MAHABUB122003", color: "hover:bg-gray-800" },
        { icon: FaLinkedinIn, alt: "LinkedIn", url: "https://linkedin.com/in/md-mahabubur-rahman-mahabub-41674b33a", color: "hover:bg-blue-700" },
        { icon: FaFacebookF, alt: "facebook", url: "https://www.facebook.com/md.abrar.ayman.mahabub/", color: "hover:bg-blue-600" },
        { icon: FaInstagram, alt: "instagram", url: "https://instagram.com", color: "hover:bg-pink-600" },
    ];

    const darkTheme = {
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        buttonContact: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg',
        buttonDownload: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white border border-slate-600 shadow-lg',
        decorativeCircle: 'bg-gradient-to-r from-orange-500/20 to-purple-500/20',
        bgGradient: 'from-gray-900 via-gray-900 to-gray-800',
        cardBg: 'bg-gray-800/50',
    };

    const lightTheme = {
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-700',
        buttonContact: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg',
        buttonDownload: 'bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-800 border border-slate-300 shadow-md',
        decorativeCircle: 'bg-gradient-to-r from-orange-500/10 to-purple-500/10',
        bgGradient: 'from-orange-50 via-white to-purple-50',
        cardBg: 'bg-white/80',
    };

    const theme = darkMode ? darkTheme : lightTheme;

    // Text animation variants for 4D typing effect
    const textVariants = {
        hidden: { opacity: 0, y: 30, rotateX: -45 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.8
            }
        })
    };

    // Character by character animation for name
    const nameVariants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: -90 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        })
    };

    // 4D Floating animation for profile image
    const imageFloatVariants = {
        initial: { y: 0, rotateX: 0, rotateY: 0 },
        animate: {
            y: [0, -15, 0, -8, 0],
            rotateX: [0, 5, 0, -3, 0],
            rotateY: [0, -5, 0, 3, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
            }
        }
    };

    // 3D Card flip for stats
    const statCardVariants = {
        initial: { rotateX: 0, rotateY: 0, scale: 1 },
        hover: {
            rotateX: [0, 10, 0],
            rotateY: [0, -10, 0],
            scale: 1.05,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        },
        tap: { scale: 0.95 }
    };

    // Floating badge animations
    const badgeVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.8
            }
        },
        hover: {
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
        }
    };

    // Pulsing ring animation for profile
    const ringVariants = {
        animate: {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Shimmer text effect for subtitle
    const shimmerTextVariants = {
        animate: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    // Button 4D hover effect
    const button3DVariant = {
        initial: { rotateX: 0, rotateY: 0, z: 0 },
        hover: {
            rotateX: [0, -5, 0],
            rotateY: [0, 5, 0],
            z: 20,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: { scale: 0.95 }
    };

    // Split name into characters for animation
    const nameText = "MD MAHABUBUR RAHMAN";
    const nameChars = nameText.split("");

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    // Rotating role text
    const roles = ["Full-Stack Developer", "Cybersecurity Specialist", "MERN Stack Expert", "Bug Bounty Hunter"];
    const [roleIndex, setRoleIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative overflow-hidden min-h-screen flex flex-col bg-gradient-to-br ${theme.bgGradient}`}>
            {/* Decorative Background Elements with 4D rotation */}
            <motion.div 
                className={`absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 rounded-full ${theme.decorativeCircle} blur-3xl hidden md:block`}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div 
                className={`absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full ${theme.decorativeCircle} blur-3xl hidden md:block`}
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <section id="home" className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-14 py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
                    
                    {/* Left Content */}
                    <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-10 lg:mb-0 z-20">
                        {/* Social Icons with staggered 4D entrance */}
                        <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 w-full">
                            {socialIcons.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{ 
                                        delay: index * 0.12,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                    whileHover={{ 
                                        scale: 1.2, 
                                        y: -5,
                                        rotateX: 10,
                                        rotateY: 10,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 
                                        ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm shadow-sm'} 
                                        ${social.color} cursor-pointer hover:text-white border border-gray-200 dark:border-gray-700`}
                                >
                                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Badge with 3D flip */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            whileHover={{ rotateY: 15, scale: 1.02 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full mb-4 sm:mb-6 backdrop-blur-sm"
                        >
                            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                <motion.span 
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                            </span>
                            <motion.span 
                                className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                Available for opportunities
                            </motion.span>
                        </motion.div>

                        {/* Animated Name - Character by character with 4D rotation */}
                        <div className="mb-3 sm:mb-4">
                            <motion.h1
                                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${theme.textPrimary}`}
                            >
                                Hi, I'm{" "}
                                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-purple-500 bg-clip-text text-transparent inline-flex flex-wrap justify-center lg:justify-start">
                                    {nameChars.map((char, index) => (
                                        <motion.span
                                            key={index}
                                            custom={index}
                                            variants={nameVariants}
                                            initial="hidden"
                                            animate="visible"
                                            style={{ display: 'inline-block' }}
                                            className={char === ' ' ? 'mx-1' : ''}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            </motion.h1>
                        </div>

                        {/* Animated Subtitle with rotating role */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, rotateX: -45 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                            className="relative mb-4"
                        >
                            <h2 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold ${theme.textSecondary}`}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 20, rotateX: -90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, y: -20, rotateX: 90 }}
                                        transition={{ duration: 0.5 }}
                                        className="inline-block bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </h2>
                            <motion.div 
                                className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"
                                animate={{
                                    width: ["3rem", "5rem", "3rem"],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        {/* Description with typed effect */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className={`${theme.textSecondary} leading-relaxed mb-6 sm:mb-8 max-w-lg text-sm sm:text-base`}
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                Building secure applications and protecting digital assets with expertise 
                                in full-stack development and cybersecurity. Specialized in MERN stack and offensive security.
                            </motion.span>
                        </motion.p>

                        {/* Buttons with 4D hover effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                            className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
                        >
                            <motion.button
                                variants={button3DVariant}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => scrollToSection('contact')}
                                className={`px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${theme.buttonContact}`}
                            >
                                <motion.div
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4" />
                                </motion.div>
                                Contact Me
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </motion.div>
                            </motion.button>
                            
                            <motion.button
                                variants={button3DVariant}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleDownloadCV}
                                className={`px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${theme.buttonDownload}`}
                            >
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                                </motion.div>
                                Download CV
                            </motion.button>
                        </motion.div>

                        {/* Stats with 3D flip cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, type: "spring", stiffness: 200 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10"
                        >
                            {[
                                { icon: FaCode, color: "text-orange-500", value: "8+", label: "Projects", gradient: "from-orange-500 to-amber-500" },
                                { icon: FaShieldAlt, color: "text-purple-500", value: "15+", label: "Reports", gradient: "from-purple-500 to-pink-500" },
                                { icon: FaUserShield, color: "text-amber-500", value: "1+", label: "Years", gradient: "from-amber-500 to-orange-500" }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={statCardVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`text-center p-2 sm:p-3 rounded-xl ${theme.cardBg} backdrop-blur-sm min-w-[70px] sm:min-w-[80px] cursor-pointer`}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <motion.div
                                        animate={{ 
                                            rotateY: [0, 180, 360],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: idx * 0.2,
                                            repeat: Infinity,
                                            repeatDelay: 3
                                        }}
                                    >
                                        <stat.icon className={`${stat.color} text-lg sm:text-xl mx-auto mb-1 sm:mb-2`} />
                                    </motion.div>
                                    <motion.div 
                                        className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className={`text-xs ${theme.textSecondary}`}>{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Content - Profile Image with 4D floating animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
                        className="lg:w-1/2 w-full flex justify-center lg:justify-end relative mt-8 lg:mt-0"
                    >
                        <motion.div 
                            className="relative group"
                            variants={imageFloatVariants}
                            initial="initial"
                            animate="animate"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Pulsing rings */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-purple-500 rounded-full blur-2xl"
                                variants={ringVariants}
                                animate="animate"
                            />
                            <motion.div 
                                className="absolute inset-0 rounded-full border-2 border-orange-500/30"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div 
                                className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                                animate={{
                                    scale: [1.1, 1, 1.1],
                                    opacity: [0, 0.5, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            />
                            
                            {/* Profile Circle */}
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-purple-500 p-1 shadow-2xl">
                                <motion.div 
                                    className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img 
                                        src={myImage} 
                                        alt="MD MAHABUBUR RAHMAN" 
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `
                                                <div class="text-center space-y-2 sm:space-y-3 p-4">
                                                    <div class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-orange-500 to-purple-500 rounded-full flex items-center justify-center">
                                                        <svg class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                        </svg>
                                                    </div>
                                                    <p class="text-base sm:text-lg font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Cybersecurity Expert</p>
                                                    <p class="text-xs sm:text-sm text-gray-400">MERN Stack Developer</p>
                                                </div>
                                            `;
                                        }}
                                    />
                                </motion.div>
                            </div>

                            {/* Floating Badges */}
                            <motion.div 
                                variants={badgeVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 md:-top-6 md:-right-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 shadow-lg cursor-pointer"
                            >
                                <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <FaShieldAlt className="text-[10px] sm:text-xs" />
                                    </motion.div>
                                    <span className="hidden xs:inline">Security</span> Expert
                                </span>
                            </motion.div>
                            
                            <motion.div 
                                variants={badgeVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 md:-bottom-6 md:-left-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 shadow-lg cursor-pointer"
                            >
                                <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                                    <motion.div
                                        animate={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <FaCode className="text-[10px] sm:text-xs" />
                                    </motion.div>
                                    <span className="hidden xs:inline">Full-Stack</span> Dev
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Scroll Indicator with 4D bounce */}
            <motion.div 
                className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 hidden sm:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
            >
                <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-orange-500 rounded-full flex justify-center">
                    <motion.div 
                        className="w-1 h-1.5 sm:w-1 sm:h-2 bg-orange-500 rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </div>
    );
}

export default Hero;
