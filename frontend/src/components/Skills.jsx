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
    FaCloud,
    FaBrain,
    FaServer
} from 'react-icons/fa';
import { 
    SiMongodb, 
    SiExpress, 
    SiTailwindcss, 
    SiJavascript,
    SiSplunk,
    SiWireshark,
    SiGnubash,
    SiCplusplus,
    SiFastapi
} from 'react-icons/si';
import { getSection } from '../utils/portfolioData';
import IslamicPattern from './IslamicPattern';

function Skills({ darkMode }) {
    const skillsData = getSection('skills');
    
    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-slate-300' : 'text-gray-600',
        textMuted: darkMode ? 'text-slate-400' : 'text-gray-500',
        cardBg: darkMode ? 'bg-[#0c0c10]/80 backdrop-blur-2xl border-white/[0.08] hover:border-[#E5A93C]/40 text-white shadow-xl shadow-black/70' : 'bg-white/95 backdrop-blur-xl border-gray-200/60 shadow-lg shadow-gray-200/30',
        border: darkMode ? 'border-white/[0.08]' : 'border-gray-200/50',
    };

    const categoryIcons = {
        "Frontend": <FaReact className="text-xl text-[#38bdf8]" />,
        "Backend": <FaNodeJs className="text-xl text-[#34d399]" />,
        "Machine Learning": <FaBrain className="text-xl text-[#FBBF24]" />,
        "Cybersecurity": <FaShieldAlt className="text-xl text-[#E5A93C]" />,
        "DevOps & Tools": <FaTools className="text-xl text-[#D4AF37]" />,
        "Languages": <FaLanguage className="text-xl text-[#60a5fa]" />,
        "Security Tools": <FaShieldAlt className="text-xl text-[#E5A93C]" />
    };

    const skillIcons = {
        "React.js": <FaReact className="text-[#38bdf8]" />,
        "JavaScript": <SiJavascript className="text-[#FBBF24]" />,
        "Tailwind CSS": <SiTailwindcss className="text-[#38bdf8]" />,
        "HTML/CSS": <FaCode className="text-[#E5A93C]" />,
        "Node.js": <FaNodeJs className="text-[#34d399]" />,
        "Express.js": <SiExpress className="text-gray-400" />,
        "MongoDB": <SiMongodb className="text-[#10b981]" />,
        "FastAPI": <SiFastapi className="text-[#34d399]" />,
        "XGBoost": <FaBrain className="text-[#FBBF24]" />,
        "CatBoost": <FaBrain className="text-[#E5A93C]" />,
        "LightGBM": <FaBrain className="text-[#34d399]" />,
        "Scikit-learn": <FaPython className="text-[#60a5fa]" />,
        "Pen Testing": <FaShieldAlt className="text-[#E5A93C]" />,
        "SOC/SIEM": <SiSplunk className="text-[#34d399]" />,
        "Network Security": <SiWireshark className="text-[#38bdf8]" />,
        "Digital Forensics": <FaShieldAlt className="text-[#D4AF37]" />,
        "Git/GitHub": <FaGitAlt className="text-[#E5A93C]" />,
        "Docker": <FaDocker className="text-[#38bdf8]" />,
        "REST APIs": <FaDatabase className="text-[#FBBF24]" />,
        "JWT Auth": <FaShieldAlt className="text-[#34d399]" />,
        "Python": <FaPython className="text-[#60a5fa]" />,
        "Bash": <SiGnubash className="text-[#34d399]" />,
        "PowerShell": <FaCode className="text-[#38bdf8]" />,
        "Metasploit": <FaShieldAlt className="text-[#E5A93C]" />,
        "Nmap": <FaTools className="text-[#34d399]" />,
        "YARA/Snort": <FaShieldAlt className="text-[#38bdf8]" />,
        "OWASP Tools": <FaShieldAlt className="text-[#E5A93C]" />
    };

    const categoryGradients = {
        "Frontend": "from-[#38bdf8] to-[#60a5fa]",
        "Backend": "from-[#34d399] to-[#10b981]",
        "Machine Learning": "from-[#FBBF24] to-[#E5A93C]",
        "Cybersecurity": "from-[#E5A93C] to-[#D4AF37]",
        "DevOps & Tools": "from-[#D4AF37] to-[#F59E0B]",
        "Languages": "from-[#60a5fa] to-[#38bdf8]",
        "Security Tools": "from-[#34d399] to-[#E5A93C]"
    };

    const skillCategories = (skillsData?.categories || []).map(cat => ({
        ...cat,
        icon: categoryIcons[cat.name] || <FaCode className="text-xl text-[#E5A93C]" />,
        gradient: cat.gradient || categoryGradients[cat.name] || "from-[#D4AF37] to-[#F59E0B]",
        skills: (cat.skills || []).map(s => ({
            ...s,
            icon: skillIcons[s.name] || <FaCode className="text-[#E5A93C]" />
        }))
    }));

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
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                </defs>
                <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3, type: "spring", stiffness: 200 }}
                >
                    <span className="text-[10px] font-bold text-[#E5A93C]">{level}%</span>
                </motion.div>
            </div>
        );
    };

    const subgroupMapping = {
        "Backend & APIs": ["FastAPI", "GraphQL", "REST APIs", "JWT", "Bcrypt", "Node.js", "Express.js"],
        "Frontend & UI": ["Next.js", "Tailwind CSS", "React.js", "HTML/CSS", "JavaScript"],
        "Databases & Cloud": ["Redis", "PostgreSQL", "MongoDB", "Docker", "Firebase"],
        "Offensive Tools": ["Burp Suite", "Nessus", "Nmap", "Wireshark", "Metasploit", "Sqlmap", "Hydra", "John the Ripper", "Hashcat", "Gobuster", "Nikto", "OWASP ZAP"],
        "Defensive & Forensics": ["Splunk", "Wazuh", "Autopsy", "Snort", "YARA"],
        "Algorithms": ["XGBoost", "CatBoost", "LightGBM", "Random Forest", "Decision Trees", "SVM", "Logistic Regression", "Linear Regression", "KNN", "Naïve Bayes"],
        "Data Science & NLP": ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "TF-IDF", "Count Vectorization", "PCA", "Feature Selection", "Dimensionality Reduction", "One-Hot Encoding", "Standardization", "Normalization"],
        "Model Optimization": ["GridSearchCV", "RandomizedSearchCV", "Cross-Validation", "Hyperparameter Tuning", "Ensemble Methods"],
        "Web Application Sec": ["XSS", "SQLi", "LFI", "RFI", "CSRF", "SSRF", "XXE", "IDOR", "Path Traversal", "Command Injection", "JWT Attacks", "Open Redirect", "Clickjacking", "SSTI", "NoSQLi"],
        "Infrastructure & Network": ["AD Exploitation", "Privilege Escalation", "CVE Exploits", "Pivoting", "RATs", "MITM", "Phishing", "Social Engineering"],
        "Security OS": ["Kali Linux"],
        "Server & Desktop OS": ["Ubuntu", "Windows Server", "Windows 10/11"]
    };

    const getGroupedTags = (tags, mapping) => {
        const result = {};
        const groupedSet = new Set();
        
        Object.entries(mapping).forEach(([subcat, matchTags]) => {
            const matches = (tags || []).filter(t => matchTags.some(mt => mt.toLowerCase() === t.toLowerCase()));
            if (matches.length > 0) {
                result[subcat] = matches;
                matches.forEach(t => groupedSet.add(t));
            }
        });
        
        const remaining = (tags || []).filter(t => !groupedSet.has(t));
        if (remaining.length > 0) {
            result["General"] = remaining;
        }
        return result;
    };

    const normalPart = "My ";
    const highlightPart = "Expertise";

    return (
        <section id="skills" className="py-16 px-4 relative overflow-hidden">
            {/* Smooth Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E5A93C]/[0.05] rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D4AF37]/[0.04] rounded-full blur-3xl" />
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
                        <div className="px-4 py-1.5 border border-[#E5A93C]/30 bg-[#E5A93C]/10 rounded-full">
                            <motion.span 
                                className="text-xs font-semibold text-[#E5A93C] tracking-wider uppercase"
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
                        <span className="bg-gradient-to-r from-[#FBBF24] via-[#E5A93C] to-[#D4AF37] bg-clip-text text-transparent inline-block">
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
                        className="w-16 h-0.5 bg-gradient-to-r from-[#FBBF24] to-[#D4AF37] mx-auto rounded-full mb-4"
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
                        Comprehensive skills in development, cybersecurity, machine learning, and modern technologies
                    </motion.p>
                </motion.div>

                {/* Skills Grid with Smooth Card Animations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                                {(category.skills || []).map((skill, skillIdx) => (
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
                {skillsData?.additional && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.15 }}
                        className="mt-20 relative"
                    >
                        {/* Background subtle blur ring for section */}
                        <div className="absolute inset-0 -z-10 flex items-center justify-center">
                            <div className="w-[500px] h-[250px] bg-gradient-to-r from-orange-500/5 to-purple-500/5 rounded-full blur-[100px]" />
                        </div>

                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                viewport={{ once: true }}
                                className="inline-block mb-3"
                            >
                                <span className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-400 tracking-wider">
                                    COMPLEMENTARY STACK
                                </span>
                            </motion.div>
                            
                            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${theme.textPrimary}`}>
                                Additional Stack & Methodologies
                            </h3>
                            <p className={`${theme.textSecondary} text-sm max-w-xl mx-auto leading-relaxed`}>
                                Auxiliary libraries, security assessment tools, machine learning frameworks, and execution environments supporting my engineering lifecycle.
                            </p>
                        </div>

                        <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
                            
                            {/* Development & Cloud */}
                            {skillsData.additional.development && skillsData.additional.development.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    whileHover={{ 
                                        y: -6,
                                        boxShadow: "0 15px 30px -10px rgba(6,182,212,0.15)",
                                        borderColor: "rgba(6,182,212,0.3)"
                                    }}
                                    className={`mb-6 break-inside-avoid rounded-2xl p-6 border ${theme.border} ${theme.cardBg} backdrop-blur-md transition-all duration-300`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-200/50 dark:border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 border border-cyan-500/20">
                                                    <FaCloud className="text-lg" />
                                                </div>
                                                <h4 className={`text-sm font-bold ${theme.textPrimary}`}>Development & Cloud</h4>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 font-semibold border border-cyan-500/20">
                                                {skillsData.additional.development.length} Items
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {Object.entries(getGroupedTags(skillsData.additional.development, subgroupMapping)).map(([subcat, tags]) => (
                                                <div key={subcat} className="space-y-1.5">
                                                    <span className="text-[10px] font-bold tracking-wider text-cyan-500/80 uppercase block">
                                                        {subcat}
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {tags.map((tech, idx) => (
                                                            <motion.span
                                                                key={idx}
                                                                custom={idx}
                                                                variants={tagVariants}
                                                                initial="hidden"
                                                                whileInView="visible"
                                                                whileHover="hover"
                                                                viewport={{ once: true }}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                                                                    darkMode 
                                                                        ? 'bg-cyan-950/20 text-cyan-300 border-cyan-500/10 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400' 
                                                                        : 'bg-cyan-50/60 text-cyan-700 border-cyan-200/80 hover:bg-cyan-100 hover:text-cyan-900 hover:border-cyan-400'
                                                                }`}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Security & Pentesting Tools */}
                            {skillsData.additional.security && skillsData.additional.security.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    whileHover={{ 
                                        y: -6,
                                        boxShadow: "0 15px 30px -10px rgba(239,68,68,0.15)",
                                        borderColor: "rgba(239,68,68,0.3)"
                                    }}
                                    className={`mb-6 break-inside-avoid rounded-2xl p-6 border ${theme.border} ${theme.cardBg} backdrop-blur-md transition-all duration-300`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-200/50 dark:border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                                                    <FaShieldAlt className="text-lg" />
                                                </div>
                                                <h4 className={`text-sm font-bold ${theme.textPrimary}`}>Security & Pentesting</h4>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-red-500/10 text-red-500 dark:text-red-400 font-semibold border border-red-500/20">
                                                {skillsData.additional.security.length} Items
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {Object.entries(getGroupedTags(skillsData.additional.security, subgroupMapping)).map(([subcat, tags]) => (
                                                <div key={subcat} className="space-y-1.5">
                                                    <span className="text-[10px] font-bold tracking-wider text-red-500/80 uppercase block">
                                                        {subcat}
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {tags.map((tech, idx) => (
                                                            <motion.span
                                                                key={idx}
                                                                custom={idx}
                                                                variants={tagVariants}
                                                                initial="hidden"
                                                                whileInView="visible"
                                                                whileHover="hover"
                                                                viewport={{ once: true }}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                                                                    darkMode 
                                                                        ? 'bg-red-950/20 text-red-300 border-red-500/10 hover:bg-red-500/20 hover:text-white hover:border-red-400' 
                                                                        : 'bg-red-50/60 text-red-700 border-red-200/80 hover:bg-red-100 hover:text-red-900 hover:border-red-400'
                                                                }`}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Machine Learning & Data Science */}
                            {skillsData.additional.ml && skillsData.additional.ml.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    whileHover={{ 
                                        y: -6,
                                        boxShadow: "0 15px 30px -10px rgba(168,85,247,0.15)",
                                        borderColor: "rgba(168,85,247,0.3)"
                                    }}
                                    className={`mb-6 break-inside-avoid rounded-2xl p-6 border ${theme.border} ${theme.cardBg} backdrop-blur-md transition-all duration-300`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-200/50 dark:border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                                                    <FaBrain className="text-lg" />
                                                </div>
                                                <h4 className={`text-sm font-bold ${theme.textPrimary}`}>Machine Learning & DS</h4>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-purple-500/10 text-purple-500 dark:text-purple-400 font-semibold border border-purple-500/20">
                                                {skillsData.additional.ml.length} Items
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {Object.entries(getGroupedTags(skillsData.additional.ml, subgroupMapping)).map(([subcat, tags]) => (
                                                <div key={subcat} className="space-y-1.5">
                                                    <span className="text-[10px] font-bold tracking-wider text-purple-500/80 uppercase block">
                                                        {subcat}
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {tags.map((tech, idx) => (
                                                            <motion.span
                                                                key={idx}
                                                                custom={idx}
                                                                variants={tagVariants}
                                                                initial="hidden"
                                                                whileInView="visible"
                                                                whileHover="hover"
                                                                viewport={{ once: true }}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                                                                    darkMode 
                                                                        ? 'bg-purple-950/20 text-purple-300 border-purple-500/10 hover:bg-purple-500/20 hover:text-white hover:border-purple-400' 
                                                                        : 'bg-purple-50/60 text-purple-700 border-purple-200/80 hover:bg-purple-100 hover:text-purple-900 hover:border-purple-400'
                                                                }`}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Vulnerabilities */}
                            {skillsData.additional.vulnerabilities && skillsData.additional.vulnerabilities.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.25 }}
                                    whileHover={{ 
                                        y: -6,
                                        boxShadow: "0 15px 30px -10px rgba(245,158,11,0.15)",
                                        borderColor: "rgba(245,158,11,0.3)"
                                    }}
                                    className={`mb-6 break-inside-avoid rounded-2xl p-6 border ${theme.border} ${theme.cardBg} backdrop-blur-md transition-all duration-300`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-200/50 dark:border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                                                    <FaCode className="text-lg" />
                                                </div>
                                                <h4 className={`text-sm font-bold ${theme.textPrimary}`}>Vulnerability Vectors</h4>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/10 text-amber-500 dark:text-amber-400 font-semibold border border-amber-500/20">
                                                {skillsData.additional.vulnerabilities.length} Items
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {Object.entries(getGroupedTags(skillsData.additional.vulnerabilities, subgroupMapping)).map(([subcat, tags]) => (
                                                <div key={subcat} className="space-y-1.5">
                                                    <span className="text-[10px] font-bold tracking-wider text-amber-500/80 uppercase block">
                                                        {subcat}
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {tags.map((tech, idx) => (
                                                            <motion.span
                                                                key={idx}
                                                                custom={idx}
                                                                variants={tagVariants}
                                                                initial="hidden"
                                                                whileInView="visible"
                                                                whileHover="hover"
                                                                viewport={{ once: true }}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                                                                    darkMode 
                                                                        ? 'bg-amber-950/20 text-amber-300 border-amber-500/10 hover:bg-amber-500/20 hover:text-white hover:border-amber-400' 
                                                                        : 'bg-amber-50/60 text-amber-700 border-amber-200/80 hover:bg-amber-100 hover:text-amber-900 hover:border-amber-400'
                                                                }`}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Operating Systems */}
                            {skillsData.additional.os && skillsData.additional.os.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    whileHover={{ 
                                        y: -6,
                                        boxShadow: "0 15px 30px -10px rgba(16,185,129,0.15)",
                                        borderColor: "rgba(16,185,129,0.3)"
                                    }}
                                    className={`mb-6 break-inside-avoid rounded-2xl p-6 border ${theme.border} ${theme.cardBg} backdrop-blur-md transition-all duration-300`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-200/50 dark:border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                                    <SiGnubash className="text-lg" />
                                                </div>
                                                <h4 className={`text-sm font-bold ${theme.textPrimary}`}>Operating Systems</h4>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-400/80 font-semibold border border-emerald-500/20">
                                                {skillsData.additional.os.length} Items
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {Object.entries(getGroupedTags(skillsData.additional.os, subgroupMapping)).map(([subcat, tags]) => (
                                                <div key={subcat} className="space-y-1.5">
                                                    <span className="text-[10px] font-bold tracking-wider text-emerald-500/80 uppercase block">
                                                        {subcat}
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {tags.map((tech, idx) => (
                                                            <motion.span
                                                                key={idx}
                                                                custom={idx}
                                                                variants={tagVariants}
                                                                initial="hidden"
                                                                whileInView="visible"
                                                                whileHover="hover"
                                                                viewport={{ once: true }}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                                                                    darkMode 
                                                                        ? 'bg-emerald-950/20 text-emerald-300 border-emerald-500/10 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-400' 
                                                                        : 'bg-emerald-50/60 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100 hover:text-emerald-900 hover:border-emerald-400'
                                                                }`}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Skills;
