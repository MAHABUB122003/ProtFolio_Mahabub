import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { api } from '../utils/api';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGithub,
    FaLinkedinIn,
    FaPaperPlane,
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaCheckCircle,
    FaSpinner,
    FaWhatsapp,
    FaExclamationCircle,
    FaCopy,
    FaCheck,
    FaClock,
    FaShieldAlt,
    FaCode,
    FaBrain,
    FaExternalLinkAlt
} from 'react-icons/fa';

function Contact({ darkMode = true }) {
    const [formData, setFormData] = useState({ name: '', email: '', title: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [charCount, setCharCount] = useState(0);
    const [copiedField, setCopiedField] = useState(null);
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'message') setCharCount(value.length);
        if (submitStatus) setSubmitStatus(null);
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2500);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            title: formData.title || 'General Inquiry',
            message: formData.message
        };

        const sendToBackend = async () => {
            try {
                await api('/messages', { method: 'POST', body: payload });
                return true;
            } catch (error) {
                console.error('Backend message error:', error);
                return false;
            }
        };

        const sendToEmailJS = async () => {
            try {
                if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
                    return false;
                }
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    payload,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );
                return true;
            } catch (error) {
                console.error('EmailJS error:', error);
                return false;
            }
        };

        try {
            const [backendOk, emailOk] = await Promise.all([sendToBackend(), sendToEmailJS()]);

            if (backendOk || emailOk) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', title: '', message: '' });
                setCharCount(0);
            } else {
                setSubmitStatus('error');
            }
            setTimeout(() => setSubmitStatus(null), 8000);
        } catch (error) {
            console.error('Send message error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 8000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const quickResponses = [
        { label: "Full-Stack Project", icon: <FaCode className="text-xs" /> },
        { label: "Security & Pentesting", icon: <FaShieldAlt className="text-xs" /> },
        { label: "Machine Learning / AI", icon: <FaBrain className="text-xs" /> },
        { label: "Job Opportunity", icon: <FaPaperPlane className="text-xs" /> },
    ];

    const socialLinks = [
        { icon: <FaGithub />, url: "https://github.com/MAHABUB122003", label: "GitHub", handle: "@MAHABUB122003" },
        { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/md-mahabubur-rahman-41674b33a", label: "LinkedIn", handle: "md-mahabubur-rahman" },
        { icon: <FaWhatsapp />, url: "https://wa.me/8801715044575", label: "WhatsApp", handle: "+880 1715044575" },
        { icon: <FaFacebookF />, url: "https://www.facebook.com/md.abrar.ayman.mahabub/", label: "Facebook", handle: "md.abrar.ayman.mahabub" },
    ];

    return (
        <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-black text-white selection:bg-rose-500/30 selection:text-white">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-rose-600/10 via-rose-950/5 to-transparent rounded-full blur-[140px]" />
                <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-rose-500/[0.04] rounded-full blur-[130px]" />
                <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-rose-900/[0.06] rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/25 bg-rose-500/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />
                        <span className="text-xs font-mono font-semibold tracking-widest uppercase text-rose-300">
                            INITIATE COLLABORATION
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-5">
                        Let's Build Something <span className="bg-gradient-to-r from-rose-400 via-rose-200 to-white bg-clip-text text-transparent">Exceptional</span>
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Have an ambitious full-stack project, need a penetration testing / security audit, or want to discuss machine learning architectures? Let's connect.
                    </p>
                </motion.div>

                {/* 2-Column Luxury Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── Left Column: Direct Matrix & Status ── */}
                    <div className="lg:col-span-5 space-y-5">

                        {/* Availability Banner */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0d14] to-[#06060a] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                            
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                                    </span>
                                    CURRENT AVAILABILITY
                                </span>
                                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                    Active
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1.5">Open for High-Impact Projects</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Currently open to full-time engineering roles, high-impact consulting, security audits, and select freelance builds.
                            </p>

                            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 pt-3 border-t border-white/5">
                                <div className="flex items-center gap-1.5">
                                    <FaClock className="text-rose-400" />
                                    <span>Response Time: &lt; 24h</span>
                                </div>
                                <span className="text-white/20">•</span>
                                <span>UTC+6 Timezone</span>
                            </div>
                        </motion.div>

                        {/* Contact Channels Card List */}
                        <div className="space-y-3">
                            {/* Email Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="p-5 rounded-3xl bg-[#06060a]/90 backdrop-blur-xl border border-white/10 hover:border-rose-500/40 transition-all duration-300 group relative shadow-xl"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0 group-hover:scale-105 group-hover:bg-rose-500/20 transition-all">
                                            <FaEnvelope className="text-lg" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                                                DIRECT INBOX
                                            </span>
                                            <a
                                                href="mailto:rahmanmdmahabubur666@gmail.com"
                                                className="text-sm font-semibold text-white hover:text-rose-400 transition-colors truncate block"
                                            >
                                                rahmanmdmahabubur666@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard('rahmanmdmahabubur666@gmail.com', 'email')}
                                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex-shrink-0"
                                        title="Copy Email"
                                    >
                                        {copiedField === 'email' ? (
                                            <FaCheck className="text-emerald-400 text-xs" />
                                        ) : (
                                            <FaCopy className="text-xs" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            {/* WhatsApp / Phone Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="p-5 rounded-3xl bg-[#06060a]/90 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group relative shadow-xl"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
                                            <FaWhatsapp className="text-xl" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                                                PHONE & WHATSAPP
                                            </span>
                                            <a
                                                href="https://wa.me/8801715044575"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors truncate block"
                                            >
                                                +880 1715044575
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <a
                                            href="https://wa.me/8801715044575"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all flex items-center gap-1"
                                        >
                                            Chat <FaExternalLinkAlt className="text-[9px]" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Location Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="p-5 rounded-3xl bg-[#06060a]/90 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 flex-shrink-0">
                                        <FaMapMarkerAlt className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                                            LOCATION & MOBILITY
                                        </span>
                                        <p className="text-sm font-semibold text-white">Dhaka, Bangladesh</p>
                                        <p className="text-xs text-slate-400 mt-0.5">Available for Worldwide Remote & On-site Relocation</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Connect Matrix */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-3xl bg-[#06060a]/90 backdrop-blur-xl border border-white/10 shadow-xl"
                        >
                            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-4 font-semibold">
                                DIGITAL PROFILES & NETWORKS
                            </span>
                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-2xl bg-[#0c0d14] border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/5 transition-all duration-200 flex items-center gap-3 group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-rose-400 group-hover:scale-110 transition-all">
                                            {social.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-xs font-semibold text-white group-hover:text-rose-300 transition-colors block truncate">
                                                {social.label}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-400 block truncate">
                                                {social.handle}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right Column: Interactive Contact Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0a0a0f] to-[#050508] border border-white/10 shadow-2xl relative overflow-hidden">
                            {/* Card Accent Top Line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Send a Direct Message</h3>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-1">Fill out the brief below and I will respond to your inquiry promptly.</p>
                                </div>
                                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    SSL Encrypted
                                </div>
                            </div>

                            {/* Quick Topic Selection */}
                            <div className="mb-6">
                                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                                    Select Project Category:
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {quickResponses.map((res, idx) => {
                                        const isSelected = formData.title === res.label;
                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, title: res.label }))}
                                                className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-1.5 text-center ${
                                                    isSelected
                                                        ? 'bg-rose-500 text-white border-rose-400 font-semibold shadow-lg shadow-rose-500/25 scale-[1.02]'
                                                        : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                {res.icon}
                                                <span className="truncate">{res.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Form */}
                            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                                            Your Name <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g., Alex Johnson"
                                            className="w-full px-4 py-3.5 rounded-2xl bg-[#06060a] border border-white/10 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 text-white placeholder-slate-600 text-sm outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                                            Email Address <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="alex@company.com"
                                            className="w-full px-4 py-3.5 rounded-2xl bg-[#06060a] border border-white/10 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 text-white placeholder-slate-600 text-sm outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                                        Subject / Topic
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., Web Application Architecture / Security Assessment"
                                        className="w-full px-4 py-3.5 rounded-2xl bg-[#06060a] border border-white/10 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 text-white placeholder-slate-600 text-sm outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                                            Message Details <span className="text-rose-400">*</span>
                                        </label>
                                        <span className={`text-[11px] font-mono ${charCount > 500 ? 'text-rose-400' : 'text-slate-500'}`}>
                                            {charCount}/600
                                        </span>
                                    </div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        maxLength={600}
                                        rows="5"
                                        placeholder="Outline your project scope, objectives, timeline, or key technical requirements..."
                                        className="w-full px-4 py-3.5 rounded-2xl bg-[#06060a] border border-white/10 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 text-white placeholder-slate-600 text-sm outline-none transition-all resize-none leading-relaxed"
                                    />
                                </div>

                                {/* Status Alerts */}
                                <AnimatePresence>
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-3 shadow-lg"
                                        >
                                            <FaCheckCircle className="text-xl flex-shrink-0 text-emerald-400" />
                                            <span>Your message has been transmitted successfully! I will get back to you within 24 hours.</span>
                                        </motion.div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                            className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium flex items-center gap-3 shadow-lg"
                                        >
                                            <FaExclamationCircle className="text-xl flex-shrink-0 text-rose-400" />
                                            <span>
                                                Delivery issue encountered. Please reach out directly to{' '}
                                                <a href="mailto:rahmanmdmahabubur666@gmail.com" className="underline font-bold text-white">
                                                    rahmanmdmahabubur666@gmail.com
                                                </a>
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                                    className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white hover:brightness-110 shadow-xl shadow-rose-600/20 border border-rose-400/30 flex items-center justify-center gap-2.5 transition-all ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin text-base" />
                                            <span>Transmitting Inquiry...</span>
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
