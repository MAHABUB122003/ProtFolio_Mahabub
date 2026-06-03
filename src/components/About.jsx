import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaUserTie, 
    FaGraduationCap, 
    FaCertificate, 
    FaCheckCircle,
    FaCode,
    FaShieldAlt,
    FaBriefcase,
    FaLaptopCode,
    FaGlobe,
    FaChartLine,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiJavascript } from 'react-icons/si';

function About({ darkMode }) {
    const theme = {
        textPrimary: darkMode ? 'text-white' : 'text-gray-900',
        textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
        textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
        bgCard: darkMode ? 'bg-gray-800/50' : 'bg-white/60',
        border: darkMode ? 'border-gray-700/50' : 'border-gray-200/50',
        hoverBg: darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50',
    };

    // Education data - Updated (No CGPA, 2027)
    const education = [
        {
            degree: "Bachelor of Science in Computer Science & Engineering",
            institution: "Shanto Mariam University of Creative Technology",
            year: "2022 - 2027 (Expected)",
            description: "Specializing in Network Security, Cryptography, and Secure Software Development"
        }
    ];

    // Certifications
    const certifications = [
        {
            name: "PortSwigger Web Security Academy",
            issuer: "PortSwigger",
            year: "2024",
            level: "Advanced"
        },
        {
            name: "TryHackMe - Active Directory Specialist",
            issuer: "TryHackMe",
            year: "2024",
            level: "Expert"
        },
        {
            name: "Bug Bounty Hunter Certification",
            issuer: "Bugcrowd University",
            year: "2024",
            level: "Professional"
        },
        {
            name: "React.js Developer Certification",
            issuer: "Meta",
            year: "2024",
            level: "Certified"
        }
    ];

    // Tech stack
    const techStack = [
        { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
        { name: "Express.js", icon: <SiExpress />, color: "text-gray-600 dark:text-gray-400" },
        { name: "React.js", icon: <SiReact />, color: "text-blue-500" },
        { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-600" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-teal-500" },
        { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-500" }
    ];

    // Stats - Updated
    const stats = [
        { number: "8+", label: "Projects Completed", description: "Full-stack & Security" },
        { number: "15+", label: "Security Reports", description: "Vulnerabilities Found" },
        { number: "1+", label: "Years Experience", description: "Learning & Growing" },
        { number: "100%", label: "Commitment", description: "Quality Assurance" }
    ];

    // Core Values
    const coreValues = [
        { title: "Clean Code", description: "Writing maintainable solutions" },
        { title: "Security First", description: "Building secure applications" },
        { title: "Innovation", description: "Embracing new technologies" },
        { title: "Continuous Growth", description: "Learning every day" }
    ];

    return (
        <section id="about" className="py-20 px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-block mb-4">
                        <div className="px-4 py-1.5 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full">
                            <span className="text-xs font-semibold text-orange-500 tracking-wider">ABOUT ME</span>
                        </div>
                    </div>
                    
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme.textPrimary}`}>
                        Get To <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Know Me</span>
                    </h2>
                    
                    <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full mb-5"></div>
                    
                    <p className={`${theme.textSecondary} max-w-2xl mx-auto text-sm md:text-base`}>
                        Passionate Full-Stack Developer, Cybersecurity Researcher, and Bug Bounty Hunter
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                        {/* Who Am I Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`rounded-xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center">
                                    <FaUserTie className="text-white text-lg" />
                                </div>
                                <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Who Am I?</h3>
                            </div>
                            <p className={`${theme.textSecondary} text-sm leading-relaxed mb-3`}>
                                I'm <strong className="text-orange-500">MD Mahabubur Rahman</strong>, a Computer Science & Engineering student with a strong passion for both software engineering and cybersecurity.
                            </p>
                            <p className={`${theme.textSecondary} text-sm leading-relaxed mb-3`}>
                                I specialize in developing modern web applications using the <strong className="text-orange-500">MERN stack</strong> while integrating security best practices throughout the software development lifecycle.
                            </p>
                            <p className={`${theme.textSecondary} text-sm leading-relaxed`}>
                                My journey combines full-stack development, penetration testing, bug bounty hunting, and vulnerability assessment. I build applications that are secure by design.
                            </p>
                        </motion.div>

                        {/* Personal Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border}`}
                        >
                            <h3 className={`text-base font-bold mb-4 ${theme.textPrimary}`}>Personal Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>Location</p>
                                    <p className={`text-sm font-medium ${theme.textSecondary} flex items-center gap-1`}>
                                        <FaMapMarkerAlt className="text-orange-500 text-xs" /> Dhaka, Bangladesh
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>Student</p>
                                    <p className={`text-sm font-medium ${theme.textSecondary}`}>B.Sc. CSE</p>
                                </div>
                                <div className="col-span-2">
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>Email</p>
                                    <p className={`text-sm font-medium ${theme.textSecondary} flex items-center gap-1 break-all`}>
                                        <FaEnvelope className="text-orange-500 text-xs" /> rahmanmdmahabubur666@gmail.com
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>Phone</p>
                                    <p className={`text-sm font-medium ${theme.textSecondary} flex items-center gap-1`}>
                                        <FaPhone className="text-orange-500 text-xs" /> +880 1715044575
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-xs ${theme.textMuted} mb-1`}>Expected Graduation</p>
                                    <p className={`text-sm font-medium ${theme.textSecondary}`}>2027</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className={`rounded-xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border}`}
                        >
                            <h3 className={`text-base font-bold mb-4 ${theme.textPrimary} flex items-center gap-2`}>
                                <FaLaptopCode className="text-orange-500" /> Tech Stack
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {techStack.map((tech, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'} ${theme.hoverBg} transition-all duration-300`}
                                    >
                                        <div className={tech.color}>{tech.icon}</div>
                                        <span className={`text-sm font-medium ${theme.textSecondary}`}>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* Education - Updated (No CGPA) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`rounded-xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border}`}
                        >
                            <h3 className={`text-base font-bold mb-4 ${theme.textPrimary} flex items-center gap-2`}>
                                <FaGraduationCap className="text-orange-500" /> Education
                            </h3>
                            {education.map((edu, index) => (
                                <div key={index} className="relative pl-6 pb-4 border-l border-orange-500 last:pb-0">
                                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-orange-500"></div>
                                    <h4 className={`text-sm font-bold ${theme.textPrimary}`}>{edu.degree}</h4>
                                    <p className={`text-xs text-orange-500 font-medium mt-1`}>{edu.institution}</p>
                                    <p className={`text-xs ${theme.textMuted} mt-2`}>{edu.year}</p>
                                    <p className={`${theme.textMuted} text-xs mt-2`}>{edu.description}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Certifications */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`rounded-xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border}`}
                        >
                            <h3 className={`text-base font-bold mb-4 ${theme.textPrimary} flex items-center gap-2`}>
                                <FaCertificate className="text-orange-500" /> Certifications
                            </h3>
                            <div className="space-y-3">
                                {certifications.map((cert, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                            <FaShieldAlt className="text-white text-xs" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <h4 className={`text-sm font-semibold ${theme.textPrimary}`}>{cert.name}</h4>
                                                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-500 text-[10px] font-medium">
                                                    {cert.level}
                                                </span>
                                            </div>
                                            <p className={`text-[10px] ${theme.textMuted} mt-1`}>{cert.issuer} • {cert.year}</p>
                                        </div>
                                        <FaCheckCircle className="text-orange-500 text-xs flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
                                    className={`rounded-xl p-4 text-center ${theme.bgCard} backdrop-blur-sm border ${theme.border} transition-all duration-300`}
                                >
                                    <div className={`text-xl font-bold ${theme.textPrimary}`}>{stat.number}</div>
                                    <div className={`text-xs font-medium ${theme.textSecondary} mt-1`}>{stat.label}</div>
                                    <div className={`text-[10px] ${theme.textMuted} mt-0.5`}>{stat.description}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Core Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-6"
                >
                    <div className={`rounded-xl p-6 ${theme.bgCard} backdrop-blur-sm border ${theme.border}`}>
                        <h3 className={`text-base font-bold mb-5 text-center ${theme.textPrimary}`}>What Drives Me</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {coreValues.map((value, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-2">
                                        <FaChartLine className="text-orange-500 text-lg" />
                                    </div>
                                    <h4 className={`text-sm font-semibold ${theme.textPrimary} mb-1`}>{value.title}</h4>
                                    <p className={`text-[10px] ${theme.textMuted}`}>{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;