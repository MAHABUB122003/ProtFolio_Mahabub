import React from 'react';
import { motion } from 'framer-motion';
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
        buttonContact: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg',
        buttonDownload: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg',
        decorativeCircle: 'bg-gradient-to-r from-orange-500/20 to-purple-500/20',
        bgGradient: 'from-gray-900 via-gray-900 to-gray-800',
        cardBg: 'bg-gray-800/50',
    };

    const lightTheme = {
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-700',
        buttonContact: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg',
        buttonDownload: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg',
        decorativeCircle: 'bg-gradient-to-r from-orange-500/10 to-purple-500/10',
        bgGradient: 'from-orange-50 via-white to-purple-50',
        cardBg: 'bg-white/80',
    };

    const theme = darkMode ? darkTheme : lightTheme;

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

    return (
        <div className={`relative overflow-hidden min-h-screen flex flex-col bg-gradient-to-br ${theme.bgGradient}`}>
            {/* Decorative Background Elements - Hidden on mobile */}
            <div className={`absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 rounded-full ${theme.decorativeCircle} blur-3xl animate-pulse hidden md:block`}></div>
            <div className={`absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full ${theme.decorativeCircle} blur-3xl animate-pulse hidden md:block`}></div>

            <section id="home" className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-14 py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
                    
                    {/* Left Content */}
                    <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-10 lg:mb-0 z-20">
                        {/* Social Icons - Responsive spacing */}
                        <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 w-full">
                            {socialIcons.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 
                                        ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm shadow-sm'} 
                                        ${social.color} cursor-pointer hover:text-white border border-gray-200 dark:border-gray-700`}
                                >
                                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Badge - Responsive text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full mb-4 sm:mb-6 backdrop-blur-sm"
                        >
                            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                                Available for opportunities
                            </span>
                        </motion.div>

                        {/* Title - Fully responsive text sizes */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-3 sm:mb-4 ${theme.textPrimary}`}
                        >
                            Hi, I'm{" "}
                            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
                                MD MAHABUBUR
                                <br className="hidden sm:block" />
                                RAHMAN
                            </span>
                        </motion.h1>

                        {/* Subtitle - Responsive */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative mb-4"
                        >
                            <h2 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold ${theme.textSecondary}`}>
                                Full-Stack Developer & Cybersecurity Specialist
                            </h2>
                            <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"></div>
                        </motion.div>

                        {/* Description - Responsive */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`${theme.textSecondary} leading-relaxed mb-6 sm:mb-8 max-w-lg text-sm sm:text-base`}
                        >
                            Building secure applications and protecting digital assets with expertise 
                            in full-stack development and cybersecurity. Specialized in MERN stack and offensive security.
                        </motion.p>

                        {/* Buttons - Responsive */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => scrollToSection('contact')}
                                className={`px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base ${theme.buttonContact}`}
                            >
                                <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4" />
                                Contact Me
                                <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            
                            <button
                                onClick={handleDownloadCV}
                                className={`px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base ${theme.buttonDownload}`}
                            >
                                <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                                Download CV
                            </button>
                        </motion.div>

                        {/* Stats - Responsive grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10"
                        >
                            <div className={`text-center p-2 sm:p-3 rounded-xl ${theme.cardBg} backdrop-blur-sm min-w-[70px] sm:min-w-[80px]`}>
                                <FaCode className="text-orange-500 text-lg sm:text-xl mx-auto mb-1 sm:mb-2" />
                                <div className="text-xl sm:text-2xl font-bold text-orange-500">8+</div>
                                <div className={`text-xs ${theme.textSecondary}`}>Projects</div>
                            </div>
                            <div className={`text-center p-2 sm:p-3 rounded-xl ${theme.cardBg} backdrop-blur-sm min-w-[70px] sm:min-w-[80px]`}>
                                <FaShieldAlt className="text-purple-500 text-lg sm:text-xl mx-auto mb-1 sm:mb-2" />
                                <div className="text-xl sm:text-2xl font-bold text-purple-500">15+</div>
                                <div className={`text-xs ${theme.textSecondary}`}>Reports</div>
                            </div>
                            <div className={`text-center p-2 sm:p-3 rounded-xl ${theme.cardBg} backdrop-blur-sm min-w-[70px] sm:min-w-[80px]`}>
                                <FaUserShield className="text-amber-500 text-lg sm:text-xl mx-auto mb-1 sm:mb-2" />
                                <div className="text-xl sm:text-2xl font-bold text-amber-500">1+</div>
                                <div className={`text-xs ${theme.textSecondary}`}>Years</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Profile Image (Responsive sizing) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="lg:w-1/2 w-full flex justify-center lg:justify-end relative mt-8 lg:mt-0"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                            
                            {/* Profile Circle - Fully responsive sizes */}
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-purple-500 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center overflow-hidden">
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
                                </div>
                            </div>

                            {/* Floating Badges - Responsive positioning and sizing */}
                            <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 md:-top-6 md:-right-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 shadow-lg">
                                <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                                    <FaShieldAlt className="text-[10px] sm:text-xs" /> 
                                    <span className="hidden xs:inline">Security</span> Expert
                                </span>
                            </div>
                            
                            <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 md:-bottom-6 md:-left-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 shadow-lg">
                                <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                                    <FaCode className="text-[10px] sm:text-xs" /> 
                                    <span className="hidden xs:inline">Full-Stack</span> Dev
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Scroll Indicator - Hidden on mobile, visible on larger screens */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 hidden sm:block">
                <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-orange-500 rounded-full flex justify-center">
                    <div className="w-1 h-1.5 sm:w-1 sm:h-2 bg-orange-500 rounded-full mt-2 animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}

export default Hero;