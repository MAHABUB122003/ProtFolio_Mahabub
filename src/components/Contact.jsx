import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const formRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (formRef.current) {
                const rect = formRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const moveX = (e.clientX - centerX) / 50;
                const moveY = (e.clientY - centerY) / 50;
                setMousePosition({ x: moveX, y: moveY });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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

            const result = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            
            console.log('Email sent:', result.text);
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
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode ? 'bg-gray-800/50' : 'bg-white/60',
        border: darkMode ? 'border-gray-700/50' : 'border-gray-200/50',
        inputBg: darkMode ? 'bg-gray-800/80' : 'bg-white',
    };

    const contactInfo = [
        { 
            icon: <FaEnvelope />, 
            label: "Email", 
            value: "rahmanmdmahabubur666@gmail.com", 
            link: "mailto:rahmanmdmahabubur666@gmail.com",
            detail: "Send me an email"
        },
        { 
            icon: <FaPhone />, 
            label: "Phone", 
            value: "+880 1715044575", 
            link: "tel:+8801715044575",
            detail: "Available for calls"
        },
        { 
            icon: <FaMapMarkerAlt />, 
            label: "Location", 
            value: "Dhaka, Bangladesh", 
            link: null,
            detail: "Remote work available"
        }
    ];

    const socialLinks = [
        { icon: <FaGithub />, url: "https://github.com/MAHABUB122003", label: "GitHub", color: "hover:bg-gray-800" },
        { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/md-mahabubur-rahman-mahabub-41674b33a", label: "LinkedIn", color: "hover:bg-blue-700" },
        { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500" },
        { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" },
        { icon: <FaWhatsapp />, url: "https://wa.me/8801715044575", label: "WhatsApp", color: "hover:bg-green-600" },
        { icon: <FaTelegram />, url: "https://t.me/mahabub", label: "Telegram", color: "hover:bg-blue-500" }
    ];

    const quickResponses = [
        { label: "Project Inquiry", value: "Project Inquiry - Need a custom solution" },
        { label: "Job Opportunity", value: "Job Opportunity - Interested in a position" },
        { label: "Collaboration", value: "Collaboration - Let's work together" },
        { label: "Security Audit", value: "Security Audit - Need security assessment" }
    ];

    // ==================== 4D ANIMATION VARIANTS ====================

    // 4D Floating Card Variants
    const cardVariants = {
        hidden: { opacity: 0, x: -40, rotateY: -25, scale: 0.92 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 140,
                damping: 20
            }
        }),
        hover: {
            x: 8,
            rotateY: 5,
            scale: 1.02,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 300
            }
        }
    };

    // 4D Form Container Variants
    const formContainerVariants = {
        hidden: { opacity: 0, x: 40, rotateY: 25, scale: 0.92 },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: mousePosition.x * 0.3,
            rotateX: mousePosition.y * 0.2,
            scale: 1,
            transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 140,
                damping: 20,
                rotateY: { duration: 0.08, ease: "linear" },
                rotateX: { duration: 0.08, ease: "linear" }
            }
        }
    };

    // 4D Input Field Variants
    const inputVariants = {
        focus: {
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(249,115,22,0.2)",
            transition: { duration: 0.2 }
        },
        hover: {
            scale: 1.01,
            transition: { duration: 0.15 }
        }
    };

    // 4D Button Variants
    const buttonVariants = {
        initial: { scale: 1, z: 0 },
        hover: {
            scale: 1.04,
            z: 15,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15
            }
        },
        tap: { scale: 0.97 }
    };

    // 4D Social Icon Variants
    const socialVariants = {
        hidden: { opacity: 0, scale: 0, rotateY: -180 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 18
            }
        }),
        hover: {
            y: -6,
            scale: 1.15,
            rotateY: 15,
            rotateX: 10,
            transition: { duration: 0.2 }
        }
    };

    // 4D Quick Response Button Variants
    const quickResponseVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 250,
                damping: 20
            }
        }),
        hover: {
            y: -3,
            scale: 1.05,
            rotateX: 5,
            transition: { duration: 0.2 }
        }
    };

    // 4D Status Message Variants
    const statusVariants = {
        initial: { opacity: 0, y: -15, rotateX: -45, scale: 0.95 },
        animate: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: { duration: 0.4, type: "spring", stiffness: 300 }
        },
        exit: {
            opacity: 0,
            y: -10,
            rotateX: -30,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    // 4D Header Character Animation
    const titleText = "Get In Touch";
    const normalPart = "Get In ";
    const highlightPart = "Touch";
    
    const charVariants = {
        hidden: { opacity: 0, y: 40, rotateX: -60, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                delay: i * 0.03,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 18
            }
        })
    };

    // 4D Floating Background Shapes
    const floatingShapeVariants = {
        animate: {
            y: [0, -30, 0, -15, 0],
            x: [0, 25, 0, -25, 0],
            rotate: [0, 180, 360],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // 4D Ring Pulse
    const ringPulseVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.1, 0.4],
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section id="contact" className="py-20 px-4 relative overflow-hidden">
            {/* 4D Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    variants={floatingShapeVariants}
                    animate="animate"
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-full blur-3xl"
                />
                <motion.div 
                    variants={floatingShapeVariants}
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.05, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/3 to-purple-500/3 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header with 4D Character Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, rotateX: -40 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <div className="px-4 py-1.5 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full">
                            <motion.span 
                                className="text-xs font-semibold text-orange-500 tracking-wider"
                                animate={{
                                    letterSpacing: ["0.1em", "0.18em", "0.1em"]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                GET IN TOUCH
                            </motion.span>
                        </div>
                    </motion.div>
                    
                    <motion.h2 
                        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme.textPrimary}`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="inline-block">
                            {normalPart.split("").map((char, index) => (
                                <motion.span
                                    key={`normal-${index}`}
                                    custom={index}
                                    variants={charVariants}
                                    style={{ display: 'inline-block' }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </span>
                        <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent inline-block">
                            {highlightPart.split("").map((char, index) => (
                                <motion.span
                                    key={`highlight-${index}`}
                                    custom={index + normalPart.length}
                                    variants={charVariants}
                                    style={{ display: 'inline-block' }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h2>
                    
                    <motion.div 
                        className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full mb-5"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "4rem", opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                    
                    <motion.p 
                        className={`${theme.textSecondary} max-w-2xl mx-auto text-sm md:text-base`}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Have a project in mind? Let's discuss how I can help bring your ideas to life
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column - Contact Info with 4D Cards */}
                    <div className="space-y-5">
                        {contactInfo.map((item, idx) => (
                            <motion.div
                                key={idx}
                                custom={idx}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover="hover"
                                viewport={{ once: true }}
                                className={`group rounded-xl p-5 ${theme.cardBg} backdrop-blur-sm border ${theme.border} cursor-pointer`}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white text-lg shadow-lg`}
                                        whileHover={{ 
                                            scale: 1.15, 
                                            rotateY: 180,
                                            transition: { duration: 0.4 }
                                        }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <div className="flex-1">
                                        <p className={`text-xs ${theme.textMuted} mb-0.5`}>{item.label}</p>
                                        {item.link ? (
                                            <motion.a 
                                                href={item.link} 
                                                className={`text-sm md:text-base font-medium ${theme.textPrimary} hover:text-orange-500 transition-colors`}
                                                whileHover={{ x: 3 }}
                                            >
                                                {item.value}
                                            </motion.a>
                                        ) : (
                                            <p className={`text-sm md:text-base font-medium ${theme.textPrimary}`}>{item.value}</p>
                                        )}
                                        <p className={`text-xs ${theme.textMuted} mt-1`}>{item.detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Social Links with 4D Icons */}
                        <motion.div
                            initial={{ opacity: 0, x: -30, rotateY: -15 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`rounded-xl p-5 ${theme.cardBg} backdrop-blur-sm border ${theme.border}`}
                        >
                            <h3 className={`text-base font-bold mb-4 ${theme.textPrimary}`}>Connect Online</h3>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        custom={idx}
                                        variants={socialVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        whileHover="hover"
                                        whileTap={{ scale: 0.93 }}
                                        viewport={{ once: true }}
                                        className={`w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white transition-all duration-300 shadow-md ${social.color}`}
                                        style={{ transformStyle: "preserve-3d" }}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability with 4D Pulse */}
                        <motion.div
                            initial={{ opacity: 0, x: -30, rotateY: -15 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className={`rounded-xl p-5 ${theme.cardBg} backdrop-blur-sm border ${theme.border}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className={`text-sm font-medium ${theme.textPrimary}`}>Available for Work</h3>
                                    <p className={`text-xs ${theme.textMuted} mt-1`}>Open to freelance opportunities</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <motion.div 
                                        className="w-2 h-2 bg-green-500 rounded-full"
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <span className={`text-xs font-medium text-green-500`}>Active</span>
                                </div>
                            </div>
                            <motion.div 
                                className="absolute inset-0 rounded-xl pointer-events-none"
                                variants={ringPulseVariants}
                                animate="animate"
                                style={{ boxShadow: "0 0 20px rgba(34,197,94,0.2)" }}
                            />
                        </motion.div>
                    </div>

                    {/* Right Column - Contact Form with 4D Effects */}
                    <motion.div
                        ref={formRef}
                        variants={formContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    >
                        <div className={`rounded-xl p-6 ${theme.cardBg} backdrop-blur-sm border ${theme.border}`}>
                            <motion.div 
                                className="mb-6"
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className={`text-xl font-bold mb-1 ${theme.textPrimary}`}>Send a Message</h3>
                                <p className={`text-xs ${theme.textMuted}`}>I'll respond within 24 hours</p>
                            </motion.div>

                            {/* 4D Quick Response Buttons */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {quickResponses.map((response, idx) => (
                                    <motion.button
                                        key={idx}
                                        custom={idx}
                                        variants={quickResponseVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        whileHover="hover"
                                        whileTap={{ scale: 0.96 }}
                                        viewport={{ once: true }}
                                        type="button"
                                        onClick={() => {
                                            setFormData({ 
                                                ...formData, 
                                                title: response.label,
                                                message: response.value 
                                            });
                                            setSubmitStatus(null);
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                                            darkMode 
                                                ? 'bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white'
                                        }`}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {response.label}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Contact Form */}
                            <form onSubmit={sendEmail} className="space-y-4">
                                {['name', 'email', 'title'].map((field, idx) => (
                                    <motion.div
                                        key={field}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.05 }}
                                    >
                                        <label className={`block text-xs font-medium mb-1.5 ${theme.textSecondary}`}>
                                            {field === 'name' ? 'Your Name' : field === 'email' ? 'Email Address' : 'Subject'}
                                        </label>
                                        <motion.input
                                            variants={inputVariants}
                                            whileHover="hover"
                                            animate={focusedField === field ? "focus" : "initial"}
                                            type={field === 'email' ? 'email' : 'text'}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField(field)}
                                            onBlur={() => setFocusedField(null)}
                                            required={field !== 'title'}
                                            className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-300 text-sm ${
                                                focusedField === field 
                                                    ? 'border-orange-500 ring-2 ring-orange-500/20' 
                                                    : theme.border
                                            } ${theme.inputBg} ${theme.textPrimary} focus:outline-none`}
                                            placeholder={field === 'name' ? 'John Doe' : field === 'email' ? 'john@example.com' : 'What is this about?'}
                                        />
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45 }}
                                >
                                    <label className={`block text-xs font-medium mb-1.5 ${theme.textSecondary}`}>
                                        Message
                                    </label>
                                    <motion.textarea
                                        variants={inputVariants}
                                        whileHover="hover"
                                        animate={focusedField === 'message' ? "focus" : "initial"}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        rows="4"
                                        className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-300 text-sm ${
                                            focusedField === 'message' 
                                                ? 'border-orange-500 ring-2 ring-orange-500/20' 
                                                : theme.border
                                        } ${theme.inputBg} ${theme.textPrimary} focus:outline-none resize-none`}
                                        placeholder="Tell me about your project..."
                                    />
                                </motion.div>

                                {/* 4D Status Messages */}
                                <AnimatePresence>
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            variants={statusVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                                        >
                                            <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <FaCheckCircle className="text-sm text-green-500" />
                                            </motion.div>
                                            <span className="text-xs text-green-500">Message sent successfully! I will respond shortly.</span>
                                        </motion.div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <motion.div
                                            variants={statusVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                                        >
                                            <span className="text-xs text-red-500">Failed to send message. Please try again.</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* 4D Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    variants={buttonVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`w-full py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md relative overflow-hidden ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <motion.span
                                        className="relative z-10 flex items-center gap-2"
                                        animate={{
                                            scale: isSubmitting ? 0.98 : 1
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <FaSpinner className="text-sm" />
                                                </motion.div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="text-sm" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{
                                            x: ["-100%", "100%"],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 2
                                        }}
                                        style={{ transform: "skewX(-15deg)" }}
                                    />
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