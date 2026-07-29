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
    FaTelegram
} from 'react-icons/fa';

function Contact({ darkMode }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [focusedField, setFocusedField] = useState(null);
    const formRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (submitStatus) setSubmitStatus(null);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                title: formData.title || 'General Inquiry',
                message: formData.message
            };

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', title: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Failed to send email:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const theme = {
        bg: darkMode ? 'bg-gray-950' : 'bg-slate-50',
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode
            ? 'bg-gray-900/70 backdrop-blur-xl border-gray-800/80 hover:border-orange-500/40 text-white'
            : 'bg-white/90 backdrop-blur-xl border-gray-200/90 text-gray-900 shadow-xl shadow-gray-200/50 hover:border-orange-500/40',
        border: darkMode ? 'border-gray-800' : 'border-gray-200',
        inputBg: darkMode ? 'bg-gray-900/90 border-gray-800 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm',
    };

    const contactInfo = [
        {
            icon: <FaEnvelope className="text-orange-500" />,
            label: "Email",
            value: "rahmanmdmahabubur666@gmail.com",
            link: "mailto:rahmanmdmahabubur666@gmail.com",
            detail: "Send me an email anytime"
        },
        {
            icon: <FaPhone className="text-purple-500" />,
            label: "Phone",
            value: "+880 1715044575",
            link: "tel:+8801715044575",
            detail: "Available for calls & WhatsApp"
        },
        {
            icon: <FaMapMarkerAlt className="text-cyan-500" />,
            label: "Location",
            value: "Dhaka, Bangladesh",
            link: null,
            detail: "Available for remote work worldwide"
        }
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
        { label: "Project Inquiry", value: "Project Inquiry" },
        { label: "Job Opportunity", value: "Job Opportunity" },
        { label: "ML Solution", value: "ML Solution" },
        { label: "Security Audit", value: "Security Audit" }
    ];

    return (
        <section id="contact" className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-transparent blur-[140px]" />
                <div className="absolute bottom-0 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/10 via-cyan-500/10 to-transparent blur-[150px]" />
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
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md mb-4 border"
                        style={{
                            background: darkMode
                                ? 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(168,85,247,0.12) 100%)'
                                : 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(168,85,247,0.08) 100%)',
                            borderColor: darkMode ? 'rgba(249,115,22,0.3)' : 'rgba(249,115,22,0.2)'
                        }}
                    >
                        <FaPaperPlane className="text-orange-500 text-xs sm:text-sm animate-pulse" />
                                                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                            CONTACT
                        </span>
                    </motion.div>

                    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${theme.textPrimary} mb-4`}>
                        Let's Work <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Together</span>
                    </h2>

                    <p className={`${theme.textSecondary} max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed`}>
                        Have a project in mind, need a security audit, or want to integrate ML into your application? Feel free to reach out directly.
                    </p>
                </motion.div>

                {/* 2-Column Main Contact Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Contact Cards & Social Links */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Contact Information Cards */}
                        {contactInfo.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-6 rounded-3xl border ${theme.border} ${theme.cardBg} flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:border-orange-500/40`}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-xl flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className={`text-[11px] font-mono ${theme.textMuted} uppercase tracking-wider block mb-0.5`}>{item.label}</span>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className={`text-sm sm:text-base font-bold ${theme.textPrimary} hover:text-orange-500 transition-colors truncate block`}
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className={`text-sm sm:text-base font-bold ${theme.textPrimary} truncate`}>{item.value}</p>
                                    )}
                                    <span className={`text-xs ${theme.textMuted} block mt-0.5`}>{item.detail}</span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Social Links Box */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-3xl border ${theme.border} ${theme.cardBg}`}
                        >
                            <h3 className={`text-sm font-bold ${theme.textPrimary} mb-4 uppercase tracking-wider font-mono`}>Connect Online</h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 shadow-md ${
                                            darkMode
                                                ? 'bg-gray-800/80 border-gray-700/60 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white'
                                                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white'
                                        }`}
                                        aria-label={social.label}
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Live Status Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-3xl border ${theme.border} ${theme.cardBg} flex items-center justify-between`}
                        >
                            <div>
                                <h4 className={`text-xs font-bold ${theme.textPrimary} uppercase font-mono tracking-wider`}>Project Availability</h4>
                                <p className={`text-xs ${theme.textMuted} mt-1`}>Open to freelance & full-time roles</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Available</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Interactive Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <div className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.cardBg} shadow-2xl relative overflow-hidden`}>

                            <div className="mb-6">
                                                    <h3 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary} mb-1`}>Send a Message</h3>
                                <p className={`text-xs sm:text-sm ${theme.textMuted}`}>Fill in the form below and I will get back to you within 24 hours.</p>
                            </div>

                            {/* Quick Response Inquiry Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {quickResponses.map((res, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                                    onClick={() => {
                                                        setFormData({ ...formData, title: res.label });
                                                        setSubmitStatus(null);
                                                    }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                                            darkMode
                                                ? 'bg-gray-800/80 hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 border-gray-700/60'
                                                : 'bg-gray-100 hover:bg-orange-500/10 text-gray-700 hover:text-orange-600 border-gray-200'
                                        }`}
                                    >
                                        {res.label}
                                    </button>
                                ))}
                            </div>

                            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-2 font-mono`}>Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                                    placeholder="Your full name"
                                            className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500/50 ${theme.inputBg}`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-2 font-mono`}>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                                    placeholder="you@example.com"
                                            className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500/50 ${theme.inputBg}`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-2 font-mono`}>Subject / Topic</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('title')}
                                        onBlur={() => setFocusedField(null)}
                                                        placeholder="e.g., Project Inquiry, Security Audit, ML Model"
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500/50 ${theme.inputBg}`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-xs font-bold ${theme.textMuted} uppercase tracking-wider mb-2 font-mono`}>Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        rows="5"
                                                        placeholder="Describe your project, requirements, or goals..."
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500/50 resize-none ${theme.inputBg}`}
                                    />
                                </div>

                                {/* Status Alerts */}
                                <AnimatePresence>
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs sm:text-sm font-semibold flex items-center gap-2"
                                        >
                                            <FaCheckCircle className="text-base" />
                                            <span>Message sent successfully! I will respond within 24 hours.</span>
                                        </motion.div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs sm:text-sm font-semibold"
                                        >
                                            Failed to send message. Please email directly to rahmanmdmahabubur666@gmail.com.
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin text-sm" />
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-sm" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
