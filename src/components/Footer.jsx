import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaGithub, 
    FaLinkedinIn, 
    FaTwitter, 
    FaInstagram, 
    FaEnvelope, 
    FaPhone, 
    FaMapMarkerAlt,
    FaHeart,
    FaArrowUp,
    FaCode,
    FaShieldAlt,
    FaServer,
    FaDatabase,
    FaCopyright,
    FaFacebookF
} from 'react-icons/fa';

function Footer({ darkMode }) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Define theme colors
    const getThemeClasses = () => {
        if (darkMode) {
            return {
                textPrimary: 'text-white',
                textSecondary: 'text-gray-300',
                textMuted: 'text-gray-400',
                border: 'border-gray-800',
                bgCard: 'bg-gray-800/50',
                inputBg: 'bg-gray-800',
                footerBg: 'bg-gray-900',
            };
        } else {
            return {
                textPrimary: 'text-gray-900',
                textSecondary: 'text-gray-600',
                textMuted: 'text-gray-500',
                border: 'border-gray-200',
                bgCard: 'bg-white/80',
                inputBg: 'bg-white',
                footerBg: 'bg-white',
            };
        }
    };

    const theme = getThemeClasses();

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    const services = [
        { name: 'Web Development', icon: <FaCode />, desc: 'Full-stack web applications' },
        { name: 'Cybersecurity', icon: <FaShieldAlt />, desc: 'Security auditing & testing' },
        { name: 'Cloud Solutions', icon: <FaServer />, desc: 'AWS, Azure, GCP' },
        { name: 'Database Design', icon: <FaDatabase />, desc: 'MongoDB, PostgreSQL' }
    ];

    const socialLinks = [
        { icon: <FaGithub />, url: "https://github.com/MAHABUB122003", label: "GitHub", color: "hover:bg-gray-800" },
        { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-700" },
        { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter", color: "hover:bg-blue-400" },
        { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" },
        { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-800" }
    ];

    return (
        <footer className={`relative ${theme.footerBg} border-t ${theme.border}`}>
            {/* Main Footer Content */}
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                                    MAHABUB
                                </span>
                                <span className={theme.textPrimary}>.</span>
                            </h2>
                            <p className={`text-sm ${theme.textMuted} mt-2`}>
                                Full-Stack Developer & Cybersecurity Specialist
                            </p>
                        </div>
                        <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>
                            Building secure, scalable, and innovative digital solutions 
                            with cutting-edge technologies and security best practices.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className={`text-lg font-bold mb-4 ${theme.textPrimary}`}>
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className={`text-sm ${theme.textSecondary} hover:text-orange-500 transition-colors`}
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className={`text-lg font-bold mb-4 ${theme.textPrimary}`}>
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {services.map((service, idx) => (
                                <li key={idx}>
                                    <div className={`text-sm ${theme.textSecondary} flex items-start gap-2`}>
                                        <span className="text-orange-500 mt-0.5">{service.icon}</span>
                                        <div>
                                            <p className="font-medium">{service.name}</p>
                                            <p className={`text-xs ${theme.textMuted}`}>{service.desc}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social Column */}
                    <div className="space-y-6">
                        <div>
                            <h3 className={`text-lg font-bold mb-4 ${theme.textPrimary}`}>
                                Contact Info
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                        <FaEnvelope className="text-orange-500 text-sm" />
                                    </div>
                                    <a href="mailto:rahmanmdmahabubur666@gmail.com" className={`text-sm ${theme.textSecondary} hover:text-orange-500 transition-colors break-all`}>
                                        rahmanmdmahabubur666@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                        <FaPhone className="text-orange-500 text-sm" />
                                    </div>
                                    <a href="tel:+8801715044575" className={`text-sm ${theme.textSecondary} hover:text-orange-500 transition-colors`}>
                                        +880 1715044575
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-orange-500 text-sm" />
                                    </div>
                                    <span className={`text-sm ${theme.textSecondary}`}>
                                        Dhaka, Bangladesh
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className={`text-lg font-bold mb-3 ${theme.textPrimary}`}>Follow Me</h3>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} ${social.color} hover:text-white`}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <FaCopyright className={`text-sm ${theme.textMuted}`} />
                            <span className={`text-sm ${theme.textMuted}`}>
                                {currentYear} MD MAHABUBUR RAHMAN
                            </span>
                            <span className={`text-xs ${theme.textMuted}`}>|</span>
                            <span className={`text-xs ${theme.textMuted} flex items-center gap-1`}>
                                Built with <FaHeart className="text-red-500 text-xs" /> React & Tailwind
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <a href="#" className={`text-xs ${theme.textMuted} hover:text-orange-500 transition-colors`}>
                                Privacy Policy
                            </a>
                            <span className={`text-xs ${theme.textMuted}`}>|</span>
                            <a href="#" className={`text-xs ${theme.textMuted} hover:text-orange-500 transition-colors`}>
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </button>
            )}
        </footer>
    );
}

export default Footer;