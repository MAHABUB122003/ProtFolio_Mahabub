import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaUserTie, 
    FaGraduationCap, 
    FaCertificate, 
    FaCheckCircle,
    FaCode,
    FaShieldAlt,
    FaDatabase,
    FaCloud,
    FaAward,
    FaBriefcase,
    FaLaptopCode,
    FaUsers,
    FaGlobe,
    FaRocket,
    FaChartLine,
    FaStar,
    FaTrophy
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiJavascript } from 'react-icons/si';

function About({ darkMode }) {
    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-600',
        bgCard: darkMode ? 'bg-gray-800/40' : 'bg-white/80',
        border: darkMode ? 'border-gray-700/50' : 'border-gray-100',
        iconBg: darkMode ? 'bg-gray-800' : 'bg-gray-100',
        glow: darkMode ? 'shadow-2xl shadow-blue-500/10' : 'shadow-2xl shadow-gray-200',
    };

    // Education data
    const education = [
        {
            degree: "Bachelor of Science in Computer Science & Engineering",
            institution: "Shanto Mariam University of Creative Technology",
            year: "2022 - 2026 (Expected)",
            description: "Specializing in Network Security, Cryptography, and Secure Software Development",
            icon: <FaGraduationCap className="text-orange-500" />,
            grade: "CGPA: 3.8/4.0"
        }
    ];

    // Certifications (Updated with more recent ones)
    const certifications = [
        {
            name: "PortSwigger Web Security Academy",
            issuer: "PortSwigger",
            year: "2024",
            icon: <FaShieldAlt className="text-orange-500" />,
            level: "Advanced"
        },
        {
            name: "TryHackMe - Active Directory Specialist",
            issuer: "TryHackMe",
            year: "2024",
            icon: <FaShieldAlt className="text-orange-500" />,
            level: "Expert"
        },
        {
            name: "Bug Bounty Hunter Certification",
            issuer: "Bugcrowd University",
            year: "2024",
            icon: <FaAward className="text-orange-500" />,
            level: "Professional"
        },
        {
            name: "React.js Developer Certification",
            issuer: "Meta (Facebook)",
            year: "2024",
            icon: <FaCode className="text-orange-500" />,
            level: "Certified"
        }
    ];

    // Tech stack expanded
    const techStack = [
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: "Intermediate" },
        { name: "Express.js", icon: <SiExpress className="text-gray-600 dark:text-gray-400" />, level: "Intermediate" },
        { name: "React.js", icon: <SiReact className="text-blue-500" />, level: "Advanced" },
        { name: "Node.js", icon: <SiNodedotjs className="text-green-600" />, level: "Intermediate" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" />, level: "Advanced" },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" />, level: "Advanced" }
    ];

    // Stats - Updated to 1+ year experience
    const stats = [
        { number: "8+", label: "Projects Completed", icon: <FaCode className="text-orange-500" />, description: "Full-stack & Security" },
        { number: "15+", label: "Security Reports", icon: <FaShieldAlt className="text-orange-500" />, description: "Vulnerabilities Found" },
        { number: "1+", label: "Year Experience", icon: <FaBriefcase className="text-orange-500" />, description: "Industry Experience" },
        { number: "100%", label: "Commitment", icon: <FaStar className="text-orange-500" />, description: "Quality Assurance" }
    ];

    // Achievements
    const achievements = [
        { title: "CTF Winner", description: "1st Place in University Cyber Security Competition", icon: <FaTrophy /> },
        { title: "Bug Bounty", description: "Disclosed 5+ valid security vulnerabilities", icon: <FaShieldAlt /> },
        { title: "Open Source", description: "Contributor to 3+ open source projects", icon: <FaCode /> },
        { title: "Certifications", description: "4 Professional Certifications", icon: <FaCertificate /> }
    ];

    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-block mb-4"
                    >
                        <div className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full backdrop-blur-sm">
                            <span className="text-sm font-semibold text-orange-500">GET TO KNOW ME</span>
                        </div>
                    </motion.div>
                    
                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${theme.textPrimary}`}>
                        About <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Me</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full mb-6"></div>
                    <p className={`${theme.textSecondary} max-w-2xl mx-auto text-lg`}>
                        Passionate developer and cybersecurity enthusiast on a mission to build secure digital solutions
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Personal Info */}
                    <div className="space-y-6">
                        {/* Profile Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-6 lg:p-8 ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center`}>
                                    <FaUserTie className="text-white text-2xl" />
                                </div>
                                <h3 className={`text-2xl font-bold ${theme.textPrimary}`}>Who Am I?</h3>
                            </div>
                            <p className={`${theme.textSecondary} leading-relaxed mb-4`}>
                                I'm a dedicated <strong className="text-orange-500">Full-Stack Developer</strong> and 
                                <strong className="text-orange-500"> Cybersecurity Enthusiast</strong> with a mission to build 
                                secure, scalable, and innovative digital solutions.
                            </p>
                            <p className={`${theme.textSecondary} leading-relaxed`}>
                                With a strong foundation in the MERN stack and growing expertise in security best practices, 
                                I bridge the gap between development and security, ensuring applications are both functional 
                                and protected against modern cyber threats.
                            </p>
                        </motion.div>

                        {/* Personal Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow}`}
                        >
                            <h3 className={`text-xl font-bold mb-5 ${theme.textPrimary} flex items-center gap-2`}>
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <FaGlobe className="text-orange-500" />
                                </div>
                                Personal Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>📍 Location</p>
                                    <p className={`font-medium ${theme.textSecondary} group-hover:text-orange-500 transition-colors`}>
                                        Dhaka, Bangladesh
                                    </p>
                                </div>
                                <div className="group">
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>💼 Experience</p>
                                    <p className={`font-medium ${theme.textSecondary} group-hover:text-orange-500 transition-colors`}>
                                        1+ Year
                                    </p>
                                </div>
                                <div className="group col-span-2">
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>📧 Email</p>
                                    <p className={`font-medium ${theme.textSecondary} text-sm break-all group-hover:text-orange-500 transition-colors`}>
                                        rahmanmdmahabubur666@gmail.com
                                    </p>
                                </div>
                                <div className="group">
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>📱 Phone</p>
                                    <p className={`font-medium ${theme.textSecondary} group-hover:text-orange-500 transition-colors`}>
                                        +880 1715044575
                                    </p>
                                </div>
                                <div className="group">
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>🎓 Education</p>
                                    <p className={`font-medium ${theme.textSecondary} group-hover:text-orange-500 transition-colors`}>
                                        B.Sc. CSE (2026)
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow}`}
                        >
                            <h3 className={`text-xl font-bold mb-5 ${theme.textPrimary} flex items-center gap-2`}>
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <FaLaptopCode className="text-orange-500" />
                                </div>
                                Tech Stack
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {techStack.map((tech, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} transition-all duration-300`}
                                    >
                                        {tech.icon}
                                        <div className="flex-1">
                                            <span className={`font-medium text-sm ${theme.textSecondary}`}>{tech.name}</span>
                                            <p className={`text-xs ${theme.textMuted}`}>{tech.level}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Education & Certifications */}
                    <div className="space-y-6">
                        {/* Education */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow}`}
                        >
                            <h3 className={`text-xl font-bold mb-6 ${theme.textPrimary} flex items-center gap-2`}>
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <FaGraduationCap className="text-orange-500 text-xl" />
                                </div>
                                Education
                            </h3>
                            {education.map((edu, index) => (
                                <div key={index} className="relative pl-8 pb-6 border-l-2 border-orange-500 last:pb-0">
                                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-orange-500"></div>
                                    <div className="mb-2">
                                        <h4 className={`text-lg font-bold ${theme.textPrimary}`}>{edu.degree}</h4>
                                        <p className={`text-sm text-orange-500 font-medium mt-1`}>{edu.institution}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <p className={`text-xs ${theme.textMuted}`}>{edu.year}</p>
                                            <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                                            <p className={`text-xs text-orange-500 font-medium`}>{edu.grade}</p>
                                        </div>
                                    </div>
                                    <p className={`${theme.textSecondary} text-sm`}>{edu.description}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Certifications */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow}`}
                        >
                            <h3 className={`text-xl font-bold mb-6 ${theme.textPrimary} flex items-center gap-2`}>
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <FaCertificate className="text-orange-500 text-xl" />
                                </div>
                                Certifications
                            </h3>
                            <div className="grid gap-4">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/5"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                            {cert.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <h4 className={`font-semibold ${theme.textPrimary}`}>{cert.name}</h4>
                                                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-500 text-xs font-medium">
                                                    {cert.level}
                                                </span>
                                            </div>
                                            <p className={`text-xs ${theme.textMuted} mt-1`}>{cert.issuer} • {cert.year}</p>
                                        </div>
                                        <FaCheckCircle className="text-orange-500 text-sm flex-shrink-0" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className={`rounded-2xl p-4 text-center ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow} cursor-pointer transition-all duration-300`}
                                >
                                    <div className="flex justify-center mb-2">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className={`text-2xl font-bold ${theme.textPrimary}`}>{stat.number}</div>
                                    <div className={`text-sm font-medium ${theme.textSecondary} mt-1`}>{stat.label}</div>
                                    <div className={`text-xs ${theme.textMuted} mt-1`}>{stat.description}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Achievements Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-8"
                >
                    <div className={`rounded-2xl p-8 ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow}`}>
                        <h3 className={`text-2xl font-bold mb-8 text-center ${theme.textPrimary}`}>
                            Key <span className="text-orange-500">Achievements</span>
                        </h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            {achievements.map((achievement, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <div className="text-orange-500 text-2xl">{achievement.icon}</div>
                                    </div>
                                    <h4 className={`font-semibold ${theme.textPrimary} mb-1`}>{achievement.title}</h4>
                                    <p className={`text-xs ${theme.textMuted}`}>{achievement.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Core Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-8"
                >
                    <div className={`rounded-2xl p-8 ${theme.bgCard} backdrop-blur-sm border ${theme.border} ${theme.glow}`}>
                        <h3 className={`text-2xl font-bold mb-8 text-center ${theme.textPrimary}`}>
                            What Drives <span className="text-orange-500">Me</span>
                        </h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors duration-300">
                                    <FaCode className="text-orange-500 text-2xl group-hover:text-white transition-colors" />
                                </div>
                                <h4 className={`font-semibold ${theme.textPrimary} mb-2`}>Clean Code</h4>
                                <p className={`text-xs ${theme.textMuted}`}>Writing maintainable, scalable solutions</p>
                            </div>
                            <div className="text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors duration-300">
                                    <FaShieldAlt className="text-orange-500 text-2xl group-hover:text-white transition-colors" />
                                </div>
                                <h4 className={`font-semibold ${theme.textPrimary} mb-2`}>Security First</h4>
                                <p className={`text-xs ${theme.textMuted}`}>Building robust, secure applications</p>
                            </div>
                            <div className="text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors duration-300">
                                    <FaRocket className="text-orange-500 text-2xl group-hover:text-white transition-colors" />
                                </div>
                                <h4 className={`font-semibold ${theme.textPrimary} mb-2`}>Innovation</h4>
                                <p className={`text-xs ${theme.textMuted}`}>Embracing new technologies</p>
                            </div>
                            <div className="text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors duration-300">
                                    <FaChartLine className="text-orange-500 text-2xl group-hover:text-white transition-colors" />
                                </div>
                                <h4 className={`font-semibold ${theme.textPrimary} mb-2`}>Growth</h4>
                                <p className={`text-xs ${theme.textMuted}`}>Continuous learning & improvement</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;