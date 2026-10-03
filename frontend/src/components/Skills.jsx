import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCode,
    FaShieldAlt,
    FaBrain,
    FaTools,
    FaServer,
    FaTerminal,
    FaBug,
    FaDatabase,
    FaLock,
    FaSearch,
    FaLayerGroup,
    FaCheckCircle,
    FaFire
} from 'react-icons/fa';
import {
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiFastapi,
    SiTailwindcss,
    SiJavascript,
    SiPython,
    SiGnubash,
    SiDocker,
    SiGit,
    SiLinux,
    SiSplunk,
    SiWireshark,
    SiKalilinux,
    SiPostgresql,
    SiRedis,
    SiNextdotjs,
    SiGraphql
} from 'react-icons/si';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const categories = [
    { id: 'all', label: 'All Disciplines', icon: FaLayerGroup },
    { id: 'fullstack', label: 'Full-Stack & Web', icon: FaCode },
    { id: 'security', label: 'Cybersecurity & Pentesting', icon: FaShieldAlt },
    { id: 'ml', label: 'Machine Learning & AI', icon: FaBrain },
    { id: 'devops', label: 'DevOps & Linux', icon: FaTools },
];

const allSkills = [
    // Full-Stack
    { name: 'React.js', category: 'fullstack', level: 'Advanced', icon: SiReact, color: 'text-cyan-400', bg: 'hover:border-cyan-500/40', desc: 'SPA, Hooks, Context, State Architecture' },
    { name: 'Node.js', category: 'fullstack', level: 'Advanced', icon: SiNodedotjs, color: 'text-emerald-400', bg: 'hover:border-emerald-500/40', desc: 'Asynchronous event-driven backend services' },
    { name: 'Express.js', category: 'fullstack', level: 'Advanced', icon: SiExpress, color: 'text-slate-300', bg: 'hover:border-slate-500/40', desc: 'RESTful API routing & custom middleware' },
    { name: 'MongoDB', category: 'fullstack', level: 'Advanced', icon: SiMongodb, color: 'text-green-500', bg: 'hover:border-green-500/40', desc: 'Document schemas, aggregations & indexing' },
    { name: 'FastAPI', category: 'fullstack', level: 'Proficient', icon: SiFastapi, color: 'text-teal-400', bg: 'hover:border-teal-500/40', desc: 'High-speed Python asynchronous APIs & Pydantic' },
    { name: 'Next.js', category: 'fullstack', level: 'Proficient', icon: SiNextdotjs, color: 'text-white', bg: 'hover:border-white/40', desc: 'SSR, App Router & Server Components' },
    { name: 'Tailwind CSS', category: 'fullstack', level: 'Expert', icon: SiTailwindcss, color: 'text-sky-400', bg: 'hover:border-sky-500/40', desc: 'Responsive design systems & bespoke styling' },
    { name: 'JavaScript (ES6+)', category: 'fullstack', level: 'Advanced', icon: SiJavascript, color: 'text-yellow-400', bg: 'hover:border-yellow-500/40', desc: 'Async/await, closures, prototypes, DOM engine' },
    { name: 'PostgreSQL', category: 'fullstack', level: 'Proficient', icon: SiPostgresql, color: 'text-blue-400', bg: 'hover:border-blue-500/40', desc: 'Relational design, queries & ACID transactions' },

    // Cybersecurity
    { name: 'Web Pentesting', category: 'security', level: 'Expert', icon: FaShieldAlt, color: 'text-rose-400', bg: 'hover:border-rose-500/40', desc: 'OWASP Top 10, Auth bypass, SSRF, XSS, SQLi' },
    { name: 'Burp Suite Pro', category: 'security', level: 'Expert', icon: FaBug, color: 'text-orange-400', bg: 'hover:border-orange-500/40', desc: 'Repeater, Intruder, Match/Replace, Proxy audits' },
    { name: 'Network Security', category: 'security', level: 'Advanced', icon: SiWireshark, color: 'text-cyan-400', bg: 'hover:border-cyan-500/40', desc: 'Packet dissection, traffic analysis & MITM analysis' },
    { name: 'SOC & SIEM (Splunk/Wazuh)', category: 'security', level: 'Proficient', icon: SiSplunk, color: 'text-amber-400', bg: 'hover:border-amber-500/40', desc: 'Log correlation, incident response & alert triage' },
    { name: 'Digital Forensics', category: 'security', level: 'Proficient', icon: FaSearch, color: 'text-indigo-400', bg: 'hover:border-indigo-500/40', desc: 'Autopsy, disk artifact recovery, memory inspection' },
    { name: 'Bug Bounty Hunting', category: 'security', level: 'Active Hunter', icon: FaLock, color: 'text-emerald-400', bg: 'hover:border-emerald-500/40', desc: '20+ verified vulnerability disclosures & reporting' },
    { name: 'Metasploit & Nmap', category: 'security', level: 'Advanced', icon: FaTools, color: 'text-red-400', bg: 'hover:border-red-500/40', desc: 'Port scanning, service discovery & exploit payloads' },

    // Machine Learning
    { name: 'Python Data Science', category: 'ml', level: 'Advanced', icon: SiPython, color: 'text-blue-400', bg: 'hover:border-blue-500/40', desc: 'NumPy, Pandas, Matplotlib, Seaborn workflows' },
    { name: 'Scikit-learn', category: 'ml', level: 'Advanced', icon: FaBrain, color: 'text-cyan-400', bg: 'hover:border-cyan-500/40', desc: 'Supervised classification, regression & clustering' },
    { name: 'XGBoost & CatBoost', category: 'ml', level: 'Advanced', icon: FaFire, color: 'text-rose-400', bg: 'hover:border-rose-500/40', desc: 'Gradient boosted trees for high-accuracy prediction' },
    { name: 'LightGBM & Random Forest', category: 'ml', level: 'Proficient', icon: FaBrain, color: 'text-emerald-400', bg: 'hover:border-emerald-500/40', desc: 'Ensemble modeling & hyperparameter tuning' },
    { name: 'Predictive Threat ML', category: 'ml', level: 'Specialized', icon: FaShieldAlt, color: 'text-purple-400', bg: 'hover:border-purple-500/40', desc: 'Anomaly detection for malicious traffic & security telemetry' },

    // DevOps & Linux
    { name: 'Kali Linux & Ubuntu', category: 'devops', level: 'Advanced', icon: SiKalilinux, color: 'text-cyan-400', bg: 'hover:border-cyan-500/40', desc: 'Kernel administration, security toolchains & hardening' },
    { name: 'Docker', category: 'devops', level: 'Proficient', icon: SiDocker, color: 'text-blue-400', bg: 'hover:border-blue-500/40', desc: 'Containerization, Dockerfile recipes & multi-stage builds' },
    { name: 'Git & GitHub', category: 'devops', level: 'Advanced', icon: SiGit, color: 'text-orange-400', bg: 'hover:border-orange-500/40', desc: 'Version control, branching strategies & CI/CD workflows' },
    { name: 'Bash & PowerShell', category: 'devops', level: 'Advanced', icon: SiGnubash, color: 'text-emerald-400', bg: 'hover:border-emerald-500/40', desc: 'Automated shell scripting & administrative tooling' },
];

function Skills({ darkMode }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSkills = allSkills.filter(skill => {
        const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
        const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section
            id="skills"
            className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-[#000000] border-t border-white/[0.06]"
        >
            {/* Ambient Background Flare */}
            <div className="absolute top-[25%] left-[-5%] w-[520px] h-[520px] rounded-full bg-rose-500/[0.025] blur-[170px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-5%] w-[520px] h-[520px] rounded-full bg-blue-500/[0.02] blur-[170px] pointer-events-none" />

            <div className="w-full max-w-[1350px] mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerContainer}
                    className="space-y-3 mb-14 text-center lg:text-left"
                >
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-mono tracking-widest uppercase">
                        <FaCode className="text-xs" />
                        <span>Technical Proficiency & Toolchain</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-rose-300">Technology Stack</span>
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                        A multidimensional arsenal spanning modern full-stack web engineering, offensive and defensive cybersecurity, and predictive machine learning.
                    </motion.p>
                </motion.div>

                {/* Filter Controls & Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 rounded-2xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl">
                        {categories.map((cat) => {
                            const IconComp = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                                        isActive
                                            ? 'text-white bg-[#f43f5e] shadow-lg shadow-rose-900/40 font-semibold'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <IconComp className="text-xs" />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Search Input */}
                    <div className="relative w-full md:w-72">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                        <input
                            type="text"
                            placeholder="Filter skills & tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Skills Interactive Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-16"
                >
                    <AnimatePresence>
                        {filteredSkills.map((skill) => {
                            const IconComp = skill.icon;
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    key={skill.name}
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    className={`p-5 rounded-2xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl ${skill.bg} transition-all duration-300 shadow-xl shadow-black/60 group cursor-default flex flex-col justify-between`}
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 group-hover:border-white/25 transition-all">
                                                <IconComp className={skill.color} />
                                            </div>

                                            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-slate-300 shrink-0">
                                                {skill.level}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-bold text-white group-hover:text-rose-200 transition-colors">
                                                {skill.name}
                                            </h4>
                                            <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                                                {skill.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Micro Indicator */}
                                    <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                                        <span className="capitalize">{skill.category}</span>
                                        <span className="flex items-center gap-1 text-emerald-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            <span>Verified</span>
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* 3 Featured Domain Pillars (Bento Strip) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Pillar 1: Full-Stack Architecture */}
                    <div className="p-7 rounded-3xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl hover:border-rose-500/30 transition-all duration-300 space-y-4 shadow-2xl shadow-black/80">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xl">
                            <FaCode />
                        </div>
                        <h3 className="text-lg font-bold text-white">Full-Stack Architecture</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Specializing in production-grade MERN stack, Next.js, and high-throughput Python FastAPI microservices with clean code standards and responsive user interfaces.
                        </p>
                    </div>

                    {/* Pillar 2: Offensive & Defensive Security */}
                    <div className="p-7 rounded-3xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 space-y-4 shadow-2xl shadow-black/80">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                            <FaShieldAlt />
                        </div>
                        <h3 className="text-lg font-bold text-white">Offensive & Defensive Security</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Proactive vulnerability discovery, penetration testing, threat hunting, and Secure SDLC implementations. Active contributor with 20+ disclosed vulnerability reports.
                        </p>
                    </div>

                    {/* Pillar 3: Applied Machine Learning */}
                    <div className="p-7 rounded-3xl border border-white/10 bg-[#06060a]/90 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 space-y-4 shadow-2xl shadow-black/80">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
                            <FaBrain />
                        </div>
                        <h3 className="text-lg font-bold text-white">Applied Machine Learning</h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Designing predictive AI pipelines utilizing XGBoost, LightGBM, CatBoost, and Scikit-learn to classify anomalies and automate cybersecurity threat intelligence.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Skills;
