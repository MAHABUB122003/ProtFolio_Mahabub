import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGithub,
    FaLinkedinIn,
    FaPaperPlane,
    FaTwitter,
    FaInstagram,
    FaCheckCircle,
    FaSpinner,
    FaWhatsapp,
    FaTelegram,
    FaExclamationCircle
} from 'react-icons/fa';

function Contact({ darkMode }) {
    const [formData, setFormData] = useState({ name: '', email: '', title: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [focusedField, setFocusedField] = useState(null);
    const [charCount, setCharCount] = useState(0);
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'message') setCharCount(value.length);
        if (submitStatus) setSubmitStatus(null);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                { name: formData.name, email: formData.email, title: formData.title || 'General Inquiry', message: formData.message },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSubmitStatus('success');
            setFormData({ name: '', email: '', title: '', message: '' });
            setCharCount(0);
            setTimeout(() => setSubmitStatus(null), 6000);
        } catch (error) {
            console.error('EmailJS error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 6000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode
            ? 'bg-gray-900/70 backdrop-blur-xl border-gray-800/80 hover:border-orange-500/30 text-white'
            : 'bg-white/90 backdrop-blur-xl border-gray-200/90 text-gray-900 shadow-xl shadow-gray-200/50 hover:border-orange-500/30',
        border: darkMode ? 'border-gray-800' : 'border-gray-200',
        inputBg: darkMode
            ? 'bg-gray-900/90 border-gray-800 text-white placeholder-gray-600'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm',
    };

    const contactInfo = [
        { icon: <FaEnvelope className="text-orange-500" />, label: "Email", value: "rahmanmdmahabubur666@gmail.com", link: "mailto:rahmanmdmahabubur666@gmail.com", detail: "Send me an email anytime", color: "from-orange-500/15 to-orange-500/5" },
        { icon: <FaPhone className="text-purple-500" />, label: "Phone", value: "+880 1715044575", link: "tel:+8801715044575", detail: "Available for calls & WhatsApp", color: "from-purple-500/15 to-purple-500/5" },
        { icon: <FaMapMarkerAlt className="text-cyan-500" />, label: "Location", value: "Dhaka, Bangladesh", link: null, detail: "Available for remote work worldwide", color: "from-cyan-500/15 to-cyan-500/5" }
    ];

    const socialLinks = [
        { icon: <FaGithub />, url: "https://github.com/MAHABUB122003", label: "GitHub" },
        { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/md-mahabubur-rahman-41674b33a", label: "LinkedIn" },
        { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
        { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
        { icon: <FaWhatsapp />, url: "https://wa.me/8801715044575", label: "WhatsApp" },
        { icon: <FaTelegram />, url: "https://t.me/mahabub", label: "Telegram" }
    ];

    const quickResponses = [
        { label: "Project Inquiry" },
        { label: "Job Opportunity" },
        { label: "ML Solution" },
        { label: "Security Audit" }
    ];

    const inputClass = `w-full px-4 py-3.5 sm:py-3 rounded-2xl border text-xs sm:text-sm outline-none transition-all duration-200 input-glow ${theme.inputBg} ${
        darkMode ? 'focus:border-orange-500/50' : 'focus:border-orange-500/50'
    }`;

    return (
        <section id="contact" className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 relative overflow-hidden">
            {/* Ambient Lights */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-500/8 via-purple-500/6 to-transparent blur-[140px]" />
                <div className="absolute bottom-0 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/8 via-cyan-500/6 to-transparent blur-[150px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md mb-4 border"
                        style={{
                            background: darkMode ? 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(168,85,247,0.12) 100%)' : 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(168,85,247,0.08) 100%)',
                            borderColor: darkMode ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)'
                        }}
                    >
                        <FaPaperPlane className="text-orange-500 text-xs sm:text-sm animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase animated-gradient-text">CONTACT</span>
                    </div>

                    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme.textPrimary} mb-4`}>
                        Let's Work <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Together</span>
                    </h2>

                    <p className={`${theme.textSecondary} max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed`}>
                        Have a project in mind, need a security audit, or want to integrate ML into your application? Feel free to reach out directly.
                    </p>
                </motion.div>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── Left: Contact Cards & Social ── */}
                    <div className="lg:col-span-5 space-y-5">

                        {/* Contact Info Cards */}
                        {contactInfo.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-5 rounded-3xl border ${theme.border} ${theme.cardBg} flex items-center gap-4 transition-all duration-300 card-hover-glow bg-gradient-to-br ${item.color}`}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                                    {item.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className={`text-[11px] font-mono ${theme.textMuted} uppercase tracking-wider block mb-0.5`}>{item.label}</span>
                                    {item.link ? (
                                        <a href={item.link} className={`text-sm sm:text-base font-bold ${theme.textPrimary} hover:text-orange-500 transition-colors truncate block`}>
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className={`text-sm sm:text-base font-bold ${theme.textPrimary} truncate`}>{item.value}</p>
                                    )}
                                    <span className={`text-xs ${theme.textMuted} block mt-0.5`}>{item.detail}</span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-3xl border ${theme.border} ${theme.cardBg}`}
                        >
                            <h3 className={`text-sm font-bold ${theme.textPrimary} mb-4 uppercase tracking-wider font-mono flex items-center gap-2`}>
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                Connect Online
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        whileTap={{ scale: 0.92 }}
                                        className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-lg transition-all duration-200 shadow-md ${
                                            darkMode
                                                ? 'bg-gray-800/80 border-gray-700/60 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-orange-500/30'
                                                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white hover:border-transparent'
                                        }`}
                                        aria-label={social.label}
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Status */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className={`p-5 rounded-3xl border ${theme.border} ${theme.cardBg} flex items-center justify-between`}
                        >
                            <div>
                                <h4 className={`text-xs font-bold ${theme.textPrimary} uppercase font-mono tracking-wider`}>Project Availability</h4>
                                <p className={`text-xs ${theme.textMuted} mt-1`}>Open to freelance & full-time roles</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                <span>Available</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: Contact Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <div className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-2xl relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/5 via-purple-500/5 to-transparent rounded-3xl pointer-events-none" />

                            <div className="mb-6 relative">
                                <h3 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary} mb-1`}>Send a Message</h3>
                                <p className={`text-xs sm:text-sm ${theme.textMuted}`}>I typically respond within 24 hours.</p>
                            </div>

                            {/* Quick Inquiry Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {quickResponses.map((res, idx) => (
                                    <motion.button
                                        key={idx}
                                        type="button"
                                        whileHover={{ scale: 1.04, y: -1 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => setFormData(prev => ({ ...prev, title: res.label }))}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                            formData.title === res.label
                                                ? 'bg-gradient-to-r from-orange-500/30 to-purple-500/30 border-orange-500/50 text-orange-400'
                                                : darkMode
                                                    ? 'bg-gray-800/80 hover:bg-orange-500/15 text-gray-300 hover:text-orange-400 border-gray-700/60 hover:border-orange-500/40'
                                                    : 'bg-gray-100 hover:bg-orange-500/10 text-gray-700 hover:text-orange-600 border-gray-200 hover:border-orange-500/30'
                                        }`}
                                    >
                                        {res.label}
                                    </motion.button>
                                ))}
                            </div>

                            <form ref={formRef} onSubmit={sendEmail} className="space-y-5 relative">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-2 font-mono`}>Your Name *</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} required placeholder="Your full name" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-2 font-mono`}>Email Address *</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} required placeholder="you@example.com" className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-2 font-mono`}>Subject / Topic</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} onFocus={() => setFocusedField('title')} onBlur={() => setFocusedField(null)} placeholder="e.g., Project Inquiry, Security Audit" className={inputClass} />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider font-mono`}>Message *</label>
                                        <span className={`text-[11px] font-mono ${charCount > 400 ? 'text-orange-500' : theme.textMuted}`}>
                                            {charCount}/500
                                        </span>
                                    </div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        maxLength={500}
                                        rows="5"
                                        placeholder="Describe your project, requirements, or goals..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                {/* Status Alerts */}
                                <AnimatePresence>
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs sm:text-sm font-semibold flex items-center gap-3"
                                        >
                                            <FaCheckCircle className="text-xl flex-shrink-0" />
                                            <span>Message sent successfully! I'll respond within 24 hours.</span>
                                        </motion.div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold flex items-center gap-3"
                                        >
                                            <FaExclamationCircle className="text-xl flex-shrink-0" />
                                            <span>Failed to send. Please email directly: rahmanmdmahabubur666@gmail.com</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 24px rgba(249,115,22,0.4)' } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                    className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin text-sm" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-sm" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
