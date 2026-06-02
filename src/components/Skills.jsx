import React from 'react';
import { motion } from 'framer-motion';
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
    FaDatabase
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
        cardBg: darkMode ? 'bg-gray-800/40' : 'bg-white/80',
        border: darkMode ? 'border-gray-700/50' : 'border-gray-100',
        glow: darkMode ? 'shadow-2xl shadow-blue-500/10' : 'shadow-2xl shadow-gray-200',
    };

    const skillCategories = [
        {
            name: "Frontend Development",
            icon: <FaReact className="text-3xl text-cyan-400" />,
            skills: [
                { name: "React.js", level: 90, icon: <FaReact className="text-cyan-400" /> },
                { name: "JavaScript ES6+", level: 85, icon: <SiJavascript className="text-yellow-400" /> },
                { name: "Tailwind CSS", level: 88, icon: <SiTailwindcss className="text-teal-400" /> },
                { name: "HTML5/CSS3", level: 85, icon: <FaCode className="text-orange-400" /> }
            ]
        },
        {
            name: "Backend Development",
            icon: <FaNodeJs className="text-3xl text-green-500" />,
            skills: [
                { name: "Node.js", level: 85, icon: <FaNodeJs className="text-green-500" /> },
                { name: "Express.js", level: 85, icon: <SiExpress className="text-gray-500" /> },
                { name: "MongoDB", level: 80, icon: <SiMongodb className="text-green-600" /> },
                { name: "REST APIs", level: 88, icon: <FaDatabase className="text-purple-400" /> }
            ]
        },
        {
            name: "Cybersecurity",
            icon: <FaShieldAlt className="text-3xl text-red-500" />,
            skills: [
                { name: "Penetration Testing", level: 85, icon: <FaShieldAlt className="text-red-500" /> },
                { name: "SIEM (Splunk/Wazuh)", level: 80, icon: <SiSplunk className="text-green-500" /> },
                { name: "Network Security", level: 85, icon: <SiWireshark className="text-blue-500" /> },
                { name: "Digital Forensics", level: 75, icon: <FaShieldAlt className="text-purple-500" /> }
            ]
        },
        {
            name: "DevOps & Tools",
            icon: <FaTools className="text-3xl text-purple-500" />,
            skills: [
                { name: "Git/GitHub", level: 90, icon: <FaGitAlt className="text-orange-600" /> },
                { name: "Docker", level: 75, icon: <FaDocker className="text-blue-500" /> },
                { name: "Burp Suite", level: 85, icon: <FaTools className="text-orange-500" /> },
                { name: "Wireshark", level: 80, icon: <SiWireshark className="text-blue-500" /> }
            ]
        },
        {
            name: "Programming Languages",
            icon: <FaLanguage className="text-3xl text-blue-500" />,
            skills: [
                { name: "Python", level: 85, icon: <FaPython className="text-blue-500" /> },
                { name: "JavaScript", level: 88, icon: <SiJavascript className="text-yellow-400" /> },
                { name: "Bash", level: 80, icon: <SiGnubash className="text-green-500" /> },
                { name: "C/C++", level: 75, icon: <SiCplusplus className="text-blue-600" /> }
            ]
        },
        {
            name: "Security Tools",
            icon: <FaShieldAlt className="text-3xl text-green-500" />,
            skills: [
                { name: "Metasploit", level: 85, icon: <FaShieldAlt className="text-red-500" /> },
                { name: "Nmap", level: 90, icon: <FaTools className="text-green-500" /> },
                { name: "YARA/Snort", level: 80, icon: <FaShieldAlt className="text-blue-500" /> },
                { name: "OWASP Tools", level: 85, icon: <FaShieldAlt className="text-orange-500" /> }
            ]
        }
    ];

    // Skill level color based on percentage
    const getLevelColor = (level) => {
        if (level >= 90) return 'bg-gradient-to-r from-emerald-500 to-green-500';
        if (level >= 80) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
        if (level >= 70) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    };

    return (
        <section id="skills" className="py-24 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
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
                        <div className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full">
                            <span className="text-sm font-semibold text-orange-500">EXPERTISE & SKILLS</span>
                        </div>
                    </motion.div>
                    
                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${theme.textPrimary}`}>
                        Technical <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Mastery</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full mb-6"></div>
                    <p className={`${theme.textSecondary} mt-4 max-w-2xl mx-auto text-lg`}>
                        Comprehensive expertise across development, security, and modern technologies
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className={`group rounded-2xl ${theme.cardBg} backdrop-blur-sm border ${theme.border} ${theme.glow} transition-all duration-500 hover:shadow-2xl`}
                        >
                            {/* Category Header */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold ${theme.textPrimary}`}>{category.name}</h3>
                                        <p className={`text-sm ${theme.textMuted} mt-1`}>
                                            {category.skills.length} core competencies
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Skills List */}
                            <div className="p-6 space-y-5">
                                {category.skills.map((skill, skillIdx) => (
                                    <motion.div
                                        key={skillIdx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: skillIdx * 0.05 }}
                                        viewport={{ once: true }}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                    {skill.icon}
                                                </div>
                                                <span className={`font-semibold ${theme.textPrimary}`}>{skill.name}</span>
                                            </div>
                                            <span className={`text-sm font-semibold ${theme.textMuted}`}>
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className={`absolute h-full rounded-full ${getLevelColor(skill.level)}`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                    <FaCode className="text-orange-500 text-xl" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <div className={`rounded-2xl p-8 ${theme.cardBg} backdrop-blur-sm border ${theme.border} ${theme.glow}`}>
                        <h3 className={`text-2xl font-bold mb-6 text-center ${theme.textPrimary}`}>
                            Additional <span className="text-orange-500">Technologies</span>
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                "GraphQL", "TypeScript", "Redis", "PostgreSQL", "Kubernetes",
                                "AWS", "Azure", "Linux", "Kali Linux", "Burp Suite Pro",
                                "Nessus", "John the Ripper", "Hydra", "Sqlmap", "BeEF"
                            ].map((tech, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.02 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default ${
                                        darkMode 
                                            ? 'bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white'
                                    }`}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className={`${theme.textMuted} text-sm`}>
                        Continuously learning and expanding my technical expertise
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;