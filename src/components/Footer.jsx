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
    FaArrowUp,
    FaCode,
    FaShieldAlt,
    FaServer,
    FaBrain,
    FaFacebookF
} from 'react-icons/fa';

function Footer({ darkMode }) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
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

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    const services = [
        { name: 'Web Development', icon: <FaCode className="text-cyan-500" />, desc: 'Full-stack MERN applications' },
        { name: 'Cybersecurity', icon: <FaShieldAlt className="text-orange-500" />, desc: 'Security auditing & pentesting' },
        { name: 'Machine Learning', icon: <FaBrain className="text-purple-500" />, desc: 'ML-powered threat detection' },
        { name: 'API Development', icon: <FaServer className="text-emerald-500" />, desc: 'FastAPI & REST APIs' }
    ];

    const socialLinks = [
        { icon: <FaGithub />, url: "https://github.com/MAHABUB122003", label: "GitHub" },
        { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/md-mahabubur-rahman-41674b33a", label: "LinkedIn" },
        { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
        { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
        { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" }
    ];

    const theme = {
        bg: darkMode ? 'bg-gray-950 text-white border-gray-800' : 'bg-slate-900 text-white border-gray-800',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textMuted: 'text-gray-400',
        cardBg: 'bg-gray-900/60 border-gray-800/80',
    };

    return (
        <footer className={`relative overflow-hidden ${theme.bg} border-t`}>
            {/* Ambient Top Glow Line */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]" />

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="cursor-pointer inline-block" onClick={scrollToTop}>
                            <h2 className="text-2xl font-black tracking-tight text-white">
                                <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                                    MAHABUB
                                </span>
                                <span className="text-orange-500">.</span>
                            </h2>
                        </div>

                        <p className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-wider">
                            Full-Stack Developer, Cybersecurity Specialist & ML Engineer
                        </p>

                        <p className="text-xs text-gray-400 leading-relaxed">
                            Building secure, scalable, and intelligent digital solutions with MERN stack, cybersecurity, and machine learning expertise.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2.5 pt-2">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-orange-500/50 flex items-center justify-center text-sm transition-all hover:scale-110"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            Navigation Links
                        </h3>
                        <ul className="space-y-2.5 text-xs font-medium text-gray-400">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="hover:text-orange-400 transition-colors flex items-center gap-2"
                                    >
                                        <span className="text-[10px] text-gray-600">•</span>
                                        <span>{link.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Breakdown Column */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            Engineering Services
                        </h3>
                        <div className="space-y-3">
                            {services.map((serv, idx) => (
                                <div key={idx} className={`p-3 rounded-2xl ${theme.cardBg} border flex items-start gap-3`}>
                                    <div className="text-sm mt-0.5">{serv.icon}</div>
                                    <div>
                                        <h4 className="text-xs font-bold text-white">{serv.name}</h4>
                                        <p className="text-[10px] text-gray-400">{serv.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Direct Contact Column */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                            Contact Details
                        </h3>
                        <div className="space-y-3 text-xs text-gray-400">
                            <a href="mailto:rahmanmdmahabubur666@gmail.com" className={`p-3 rounded-2xl ${theme.cardBg} border flex items-center gap-3 hover:text-white transition-colors block`}>
                                <FaEnvelope className="text-orange-500 text-sm flex-shrink-0" />
                                <span className="truncate">rahmanmdmahabubur666@gmail.com</span>
                            </a>

                            <a href="tel:+8801715044575" className={`p-3 rounded-2xl ${theme.cardBg} border flex items-center gap-3 hover:text-white transition-colors block`}>
                                <FaPhone className="text-purple-500 text-sm flex-shrink-0" />
                                <span>+880 1715044575</span>
                            </a>

                            <div className={`p-3 rounded-2xl ${theme.cardBg} border flex items-center gap-3`}>
                                <FaMapMarkerAlt className="text-cyan-500 text-sm flex-shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="mt-12 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 font-mono">
                    <div>
                        &copy; {currentYear} MD MAHABUBUR RAHMAN. All rights reserved.
                    </div>
                    <div>
                        Built with React & Tailwind CSS
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/25 hover:scale-110 transition-all border border-white/10"
                    title="Scroll to Top"
                >
                    <FaArrowUp className="text-sm" />
                </motion.button>
            )}
        </footer>
    );
}

export default Footer;
