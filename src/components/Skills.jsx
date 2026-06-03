import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaCode, 
    FaShieldAlt, 
    FaTools, 
    FaLanguage,
    FaReact,
    FaNodeJs,
    FaPython,
    FaGitAlt,
    FaDocker,
    FaDatabase,
    FaCloud
} from 'react-icons/fa';
import { 
    SiMongodb, 
    SiExpress, 
    SiTailwindcss, 
    SiJavascript,
    SiSplunk,
    SiWireshark,
    SiGnubash,
    SiCplusplus
} from 'react-icons/si';

function Skills({ darkMode }) {
    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        cardBg: darkMode ? 'bg-gray-800/50' : 'bg-white/60',
        border: darkMode ? 'border-gray-700/50' : 'border-gray-200/50',
    };

    const skillCategories = [
        {
            name: "Frontend",
            icon: <FaReact className="text-xl text-cyan-400" />,
            gradient: "from-cyan-500 to-blue-500",
            skills: [
                { name: "React.js", level: 90, icon: <FaReact className="text-cyan-400" /> },
                { name: "JavaScript", level: 85, icon: <SiJavascript className="text-yellow-400" /> },
                { name: "Tailwind CSS", level: 88, icon: <SiTailwindcss className="text-teal-400" /> },
                { name: "HTML/CSS", level: 85, icon: <FaCode className="text-orange-400" /> }
            ]
        },
        {
            name: "Backend",
            icon: <FaNodeJs className="text-xl text-green-500" />,
            gradient: "from-green-500 to-emerald-500",
            skills: [
                { name: "Node.js", level: 85, icon: <FaNodeJs className="text-green-500" /> },
                { name: "Express.js", level: 85, icon: <SiExpress className="text-gray-500" /> },
                { name: "MongoDB", level: 80, icon: <SiMongodb className="text-green-600" /> },
                { name: "REST APIs", level: 88, icon: <FaDatabase className="text-purple-400" /> }
            ]
        },
        {
            name: "Cybersecurity",
            icon: <FaShieldAlt className="text-xl text-red-500" />,
            gradient: "from-red-500 to-orange-500",
            skills: [
                { name: "Penetration Testing", level: 85, icon: <FaShieldAlt className="text-red-500" /> },
                { name: "SIEM (Splunk/Wazuh)", level: 80, icon: <SiSplunk className="text-green-500" /> },
                { name: "Network Security", level: 85, icon: <SiWireshark className="text-blue-500" /> },
                { name: "Digital Forensics", level: 75, icon: <FaShieldAlt className="text-purple-500" /> }
            ]
        },
        {
            name: "DevOps & Tools",
            icon: <FaTools className="text-xl text-purple-500" />,
            gradient: "from-purple-500 to-pink-500",
            skills: [
                { name: "Git/GitHub", level: 90, icon: <FaGitAlt className="text-orange-600" /> },
                { name: "Docker", level: 75, icon: <FaDocker className="text-blue-500" /> },
                { name: "Burp Suite", level: 85, icon: <FaTools className="text-orange-500" /> },
                { name: "Wireshark", level: 80, icon: <SiWireshark className="text-blue-500" /> }
            ]
        },
        {
            name: "Languages",
            icon: <FaLanguage className="text-xl text-blue-500" />,
            gradient: "from-blue-500 to-cyan-500",
            skills: [
                { name: "Python", level: 85, icon: <FaPython className="text-blue-500" /> },
                { name: "JavaScript", level: 88, icon: <SiJavascript className="text-yellow-400" /> },
                { name: "Bash", level: 80, icon: <SiGnubash className="text-green-500" /> },
                { name: "C/C++", level: 75, icon: <SiCplusplus className="text-blue-600" /> }
            ]
        },
        {
            name: "Security Tools",
            icon: <FaShieldAlt className="text-xl text-green-500" />,
            gradient: "from-green-500 to-teal-500",
            skills: [
                { name: "Metasploit", level: 85, icon: <FaShieldAlt className="text-red-500" /> },
                { name: "Nmap", level: 90, icon: <FaTools className="text-green-500" /> },
                { name: "YARA/Snort", level: 80, icon: <FaShieldAlt className="text-blue-500" /> },
                { name: "OWASP Tools", level: 85, icon: <FaShieldAlt className="text-orange-500" /> }
            ]
        }
    ];

    // Smooth card variants with spring physics for fluid motion
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.92, 
            y: 40,
            rotateX: 15,
            rotateY: -10
        },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            transition: {
                delay: i * 0.06,
                duration: 0.7,
                type: "spring",
                stiffness: 120,
                damping: 18,
                mass: 0.8
            }
        }),
        hover: {
            y: -6,
            scale: 1.01,
            rotateX: 2,
            rotateY: 2,
            transition: {
                duration: 0.35,
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    // Smooth skill bar animation
    const skillBarVariants = {
        hidden: { width: "0%", opacity: 0 },
        visible: (level) => ({
            width: `${level}%`,
            opacity: 1,
            transition: {
                duration: 1.2,
                delay: 0.15,
                ease: [0.25, 0.1, 0.25, 1],
                type: "tween"
            }
        })
    };

    // Smooth skill item animation
    const skillItemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }),
        hover: {
            x: 6,
            transition: {
                duration: 0.25,
                ease: "easeOut"
            }
        }
    };

    // Smooth character animation for title
    const charVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.03,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        })
    };

    // Smooth tag variants
    const tagVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.003,
                duration: 0.3,
                ease: "easeOut"
            }
        }),
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    };

    // Smooth floating background shapes
    const floatingShapeVariants = {
        animate: {
            y: [0, -25, 0],
            x: [0, 20, 0],
            transition: {
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
            }
        }
    };

    const getLevelColor = (level) => {
        if (level >= 90) return 'from-emerald-500 to-green-500';
        if (level >= 80) return 'from-blue-500 to-cyan-500';
        if (level >= 70) return 'from-yellow-500 to-orange-500';
        return 'from-gray-500 to-gray-600';
    };

    // Smooth progress indicator component
    const ProgressIndicator = ({ level }) => {
        const [progress, setProgress] = React.useState(0);
        
        React.useEffect(() => {
            const timer = setTimeout(() => {
                setProgress(level);
            }, 300);
            return () => clearTimeout(timer);
        }, [level]);

        return (
            <div className="relative w-12 h-12">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke={darkMode ? "#374151" : "#e5e7eb"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <motion.circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${progress}, 100` }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                </svg>
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
                <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3, type: "spring", stiffness: 200 }}
                >
                    <span className="text-[10px] font-bold text-orange-500">{level}%</span>
                </motion.div>
            </div>
        );
    };

    const titleText = "My Expertise";
    const normalPart = "My ";
    const highlightPart = "Expertise";

    return (
        <section id="skills" className="py-16 px-4 relative overflow-hidden">
            {/* Smooth Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    variants={floatingShapeVariants}
                    animate="animate"
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-full blur-3xl"
                />
                <motion.div 
                    variants={floatingShapeVariants}
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.05, 0.15],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/3 to-purple-500/3 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header with Smooth Animations */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
                        viewport={{ once: true }}
                        className="inline-block mb-3"
                    >
                        <div className="px-3 py-1 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full">
                            <motion.span 
                                className="text-xs font-semibold text-orange-500 tracking-wider"
                                animate={{
                                    letterSpacing: ["0.1em", "0.15em", "0.1em"]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                TECHNICAL SKILLS
                            </motion.span>
                        </div>
                    </motion.div>
                    
                    <motion.h2 
                        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ${theme.textPrimary}`}
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
                        className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full mb-4"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "4rem", opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true }}
                    />
                    
                    <motion.p 
                        className={`${theme.textSecondary} max-w-2xl mx-auto text-sm md:text-base`}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Comprehensive skills in development, security, and modern technologies
                    </motion.p>
                </motion.div>

                {/* Skills Grid with Smooth Card Animations */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, amount: 0.2 }}
                            className={`rounded-xl p-4 ${theme.cardBg} backdrop-blur-sm border ${theme.border} transition-shadow duration-300 cursor-pointer`}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <motion.div 
                                className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50"
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div 
                                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center"
                                    animate={{ 
                                        rotate: [0, 8, -8, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                                >
                                    {category.icon}
                                </motion.div>
                                <div>
                                    <motion.h3 
                                        className={`text-base font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                                    >
                                        {category.name}
                                    </motion.h3>
                                </div>
                            </motion.div>

                            <div className="space-y-3">
                                {category.skills.map((skill, skillIdx) => (
                                    <motion.div 
                                        key={skillIdx}
                                        custom={skillIdx}
                                        variants={skillItemVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        whileHover="hover"
                                        className="space-y-1"
                                        viewport={{ once: true }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <motion.div 
                                                    className="w-5 h-5 flex items-center justify-center"
                                                    whileHover={{ scale: 1.15, rotate: 360 }}
                                                    transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                                                >
                                                    {skill.icon}
                                                </motion.div>
                                                <span className={`text-sm font-medium ${theme.textSecondary}`}>{skill.name}</span>
                                            </div>
                                            <ProgressIndicator level={skill.level} />
                                        </div>
                                        <div className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                custom={skill.level}
                                                variants={skillBarVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                className={`absolute h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Technologies Section with Smooth Entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-6"
                >
                    <motion.div 
                        className={`rounded-xl p-5 ${theme.cardBg} backdrop-blur-sm border ${theme.border}`}
                        whileHover={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.h3 
                            className={`text-lg font-bold mb-4 text-center ${theme.textPrimary}`}
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Additional Technologies
                        </motion.h3>
                        
                        {/* Development & Cloud */}
                        <motion.div 
                            className="mb-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <motion.div 
                                className="flex items-center gap-2 mb-3 justify-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <FaCloud className="text-orange-500 text-sm" />
                                </motion.div>
                                <h4 className="text-sm font-semibold text-orange-500">Development & Cloud</h4>
                            </motion.div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    "TypeScript", "GraphQL", "Redis", "PostgreSQL", 
                                    "Kubernetes", "Docker", "AWS", "Firebase", 
                                    "Next.js", "Vue.js"
                                ].map((tech, idx) => (
                                    <motion.span
                                        key={idx}
                                        custom={idx}
                                        variants={tagVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        whileHover="hover"
                                        viewport={{ once: true }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                                            darkMode 
                                                ? 'bg-gray-800/80 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-500 hover:text-white'
                                        }`}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Security Tools */}
                        <motion.div 
                            className="mb-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <motion.div 
                                className="flex items-center gap-2 mb-3 justify-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, 6, -6, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <FaShieldAlt className="text-orange-500 text-sm" />
                                </motion.div>
                                <h4 className="text-sm font-semibold text-orange-500">Security & Pentesting Tools</h4>
                            </motion.div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    "Burp Suite", "Nessus", "OpenVAS", "Nikto", "Gobuster",
                                    "Hydra", "John the Ripper", "Hashcat", "Sqlmap", "XSStrike",
                                    "Commix", "BeEF", "Metasploit", "Nmap", "Wireshark",
                                    "Aircrack-ng", "Recon-ng", "TheHarvester", "Shodan", "Maltego"
                                ].map((tech, idx) => (
                                    <motion.span
                                        key={idx}
                                        custom={idx}
                                        variants={tagVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        whileHover="hover"
                                        viewport={{ once: true }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                                            darkMode 
                                                ? 'bg-gray-800/80 text-gray-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white'
                                        }`}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Vulnerabilities */}
                        <motion.div 
                            className="mb-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <motion.div 
                                className="flex items-center gap-2 mb-3 justify-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <FaCode className="text-orange-500 text-sm" />
                                </motion.div>
                                <h4 className="text-sm font-semibold text-orange-500">Vulnerability Assessment</h4>
                            </motion.div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    "XSS", "SQLi", "LFI", "RFI", "CSRF", "SSRF", "XXE",
                                    "IDOR", "Path Traversal", "Command Injection", "JWT Attacks",
                                    "Open Redirect", "Clickjacking", "SSTI", "NoSQLi"
                                ].map((vuln, idx) => (
                                    <motion.span
                                        key={idx}
                                        custom={idx}
                                        variants={tagVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        whileHover="hover"
                                        viewport={{ once: true }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                                            darkMode 
                                                ? 'bg-red-500/10 text-red-400 hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:text-white' 
                                                : 'bg-red-100 text-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:text-white'
                                        }`}
                                    >
                                        {vuln}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Operating Systems */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.65, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <motion.div 
                                className="flex items-center gap-2 mb-3 justify-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    animate={{ rotateY: [0, 180, 360] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <FaCode className="text-orange-500 text-sm" />
                                </motion.div>
                                <h4 className="text-sm font-semibold text-orange-500">Operating Systems</h4>
                            </motion.div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    "Kali Linux", "Ubuntu", "Windows Server", "Windows 10/11"
                                ].map((os, idx) => (
                                    <motion.span
                                        key={idx}
                                        custom={idx}
                                        variants={tagVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        whileHover="hover"
                                        viewport={{ once: true }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                                            darkMode 
                                                ? 'bg-gray-800/80 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white'
                                        }`}
                                    >
                                        {os}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;