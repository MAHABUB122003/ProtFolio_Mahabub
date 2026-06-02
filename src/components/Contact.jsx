import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaEnvelope, 
    FaPhone, 
    FaMapMarkerAlt, 
    FaGithub, 
    FaLinkedinIn, 
    FaPaperPlane, 
    FaUser, 
    FaComment,
    FaTwitter,
    FaInstagram,
    FaCheckCircle,
    FaSpinner,
    FaWhatsapp,
    FaTelegram,
    FaShieldAlt,
    FaClock,
    FaGlobe,
    FaStar,
    FaThumbsUp,
    FaAward
} from 'react-icons/fa';

function Contact({ darkMode }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (submitStatus) setSubmitStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form submitted:', formData);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
        
        setTimeout(() => setSubmitStatus(null), 5000);
    };

    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode ? 'bg-gray-800/40' : 'bg-white/80',
        border: darkMode ? 'border-gray-700/50' : 'border-gray-100',
        inputBg: darkMode ? 'bg-gray-800/60' : 'bg-white',
        glow: darkMode ? 'shadow-2xl shadow-purple-500/10' : 'shadow-2xl shadow-gray-200',
    };

    const contactInfo = [
        { 
            icon: <FaEnvelope className="text-2xl" />, 
            label: "Email Address", 
            value: "rahmanmdmahabubur666@gmail.com", 
            link: "mailto:rahmanmdmahabubur666@gmail.com",
            gradient: "from-red-500 to-rose-500",
            description: "Send me an email",
            iconBg: "bg-gradient-to-br from-red-500 to-rose-500"
        },
        { 
            icon: <FaPhone className="text-2xl" />, 
            label: "Phone Number", 
            value: "+880 1715044575", 
            link: "tel:+8801715044575",
            gradient: "from-green-500 to-emerald-500",
            description: "Available for calls",
            iconBg: "bg-gradient-to-br from-green-500 to-emerald-500"
        },
        { 
            icon: <FaMapMarkerAlt className="text-2xl" />, 
            label: "Location", 
            value: "Dhaka, Bangladesh", 
            link: null,
            gradient: "from-purple-500 to-indigo-500",
            description: "Remote work available",
            iconBg: "bg-gradient-to-br from-purple-500 to-indigo-500"
        }
    ];

    const socialLinks = [
        { icon: <FaGithub className="text-xl" />, url: "https://github.com/MAHABUB122003", label: "GitHub", color: "hover:bg-gray-800", bg: "from-gray-700 to-gray-900" },
        { icon: <FaLinkedinIn className="text-xl" />, url: "https://linkedin.com/in/md-mahabubur-rahman-mahabub-41674b33a", label: "LinkedIn", color: "hover:bg-blue-700", bg: "from-blue-600 to-blue-800" },
        { icon: <FaTwitter className="text-xl" />, url: "https://twitter.com", label: "Twitter", color: "hover:bg-blue-400", bg: "from-blue-400 to-blue-600" },
        { icon: <FaInstagram className="text-xl" />, url: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600", bg: "from-pink-500 to-pink-700" },
        { icon: <FaWhatsapp className="text-xl" />, url: "https://wa.me/8801715044575", label: "WhatsApp", color: "hover:bg-green-600", bg: "from-green-500 to-green-700" },
        { icon: <FaTelegram className="text-xl" />, url: "https://t.me/mahabub", label: "Telegram", color: "hover:bg-blue-500", bg: "from-blue-500 to-blue-700" }
    ];

    const quickResponses = [
        "Project Inquiry",
        "Job Opportunity",
        "Collaboration",
        "Security Audit"
    ];

    const trustBadges = [
        { icon: <FaThumbsUp />, text: "Quick Response", color: "text-green-500" },
        { icon: <FaShieldAlt />, text: "Secure Chat", color: "text-blue-500" },
        { icon: <FaAward />, text: "Quality Assured", color: "text-purple-500" },
        { icon: <FaStar />, text: "Top Rated", color: "text-yellow-500" }
    ];

    return (
        <section id="contact" className="py-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-block mb-4"
                    >
                        <div className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full backdrop-blur-sm border border-orange-500/20">
                            <span className="text-sm font-semibold text-orange-500">GET IN TOUCH</span>
                        </div>
                    </motion.div>
                    
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 ${theme.textPrimary}`}>
                        Let's Work <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Together</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full mb-5"></div>
                    <p className={`${theme.textSecondary} max-w-2xl mx-auto text-base md:text-lg`}>
                        Have a project in mind? Let's discuss how I can help bring your ideas to life
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-5 md:space-y-6">
                        {contactInfo.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className={`group rounded-2xl p-5 md:p-6 ${theme.cardBg} backdrop-blur-sm border ${theme.border} ${theme.glow} transition-all duration-300`}
                            >
                                <div className="flex items-center gap-4 md:gap-5">
                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-xs md:text-sm ${theme.textMuted} mb-1`}>{item.label}</p>
                                        {item.link ? (
                                            <a 
                                                href={item.link} 
                                                className={`text-sm md:text-lg font-semibold ${theme.textPrimary} hover:text-orange-500 transition-colors break-all`}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className={`text-sm md:text-lg font-semibold ${theme.textPrimary}`}>{item.value}</p>
                                        )}
                                        <p className={`text-xs ${theme.textMuted} mt-1 flex items-center gap-1`}>
                                            <FaClock className="text-orange-500 text-xs" />
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-5 md:p-6 ${theme.cardBg} backdrop-blur-sm border ${theme.border} ${theme.glow}`}
                        >
                            <h3 className={`text-lg md:text-xl font-bold mb-4 ${theme.textPrimary} flex items-center gap-2`}>
                                <FaShieldAlt className="text-orange-500" />
                                Professional Standards
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {trustBadges.map((badge, idx) => (
                                    <div key={idx} className="text-center group">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className={`text-xl ${badge.color}`}>{badge.icon}</div>
                                        </div>
                                        <p className={`text-xs font-medium ${theme.textSecondary}`}>{badge.text}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-5 md:p-6 ${theme.cardBg} backdrop-blur-sm border ${theme.border} ${theme.glow}`}
                        >
                            <h3 className={`text-lg md:text-xl font-bold mb-4 ${theme.textPrimary} flex items-center gap-2`}>
                                <FaGlobe className="text-orange-500" />
                                Connect With Me
                            </h3>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${social.bg} flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white shadow-lg`}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className={`rounded-2xl p-6 md:p-8 ${theme.cardBg} backdrop-blur-sm border ${theme.border} ${theme.glow}`}>
                            <div className="text-center mb-6">
                                <h3 className={`text-xl md:text-2xl font-bold mb-2 ${theme.textPrimary}`}>Send a Message</h3>
                                <p className={`text-xs md:text-sm ${theme.textMuted}`}>I will respond within 24 hours</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {quickResponses.map((response, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setFormData({ ...formData, message: response })}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                                            darkMode 
                                                ? 'bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white'
                                        }`}
                                    >
                                        {response}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                                        <FaUser className="inline mr-2 text-orange-500" />
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                            focusedField === 'name' 
                                                ? 'border-orange-500 ring-2 ring-orange-500/20' 
                                                : theme.border
                                        } ${theme.inputBg} ${theme.textPrimary} focus:outline-none`}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                                        <FaEnvelope className="inline mr-2 text-orange-500" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                            focusedField === 'email' 
                                                ? 'border-orange-500 ring-2 ring-orange-500/20' 
                                                : theme.border
                                        } ${theme.inputBg} ${theme.textPrimary} focus:outline-none`}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                                        <FaComment className="inline mr-2 text-orange-500" />
                                        Your Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        rows="4"
                                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                            focusedField === 'message' 
                                                ? 'border-orange-500 ring-2 ring-orange-500/20' 
                                                : theme.border
                                        } ${theme.inputBg} ${theme.textPrimary} focus:outline-none resize-none`}
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500 rounded-xl text-green-500"
                                    >
                                        <FaCheckCircle />
                                        <span className="text-xs md:text-sm">Message sent successfully! I will respond shortly.</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} backdrop-blur-sm`}>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className={`text-xs ${theme.textMuted}`}>Available for freelance work</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;