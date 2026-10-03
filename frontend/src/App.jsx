import Navbar from './components/Navbar';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IslamicIntro from './components/IslamicIntro';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminAbout from './pages/admin/AdminAbout';
import AdminSkills from './pages/admin/AdminSkills';
import AdminContact from './pages/admin/AdminContact';
import AdminMessages from './pages/admin/AdminMessages';
import AdminGeneral from './pages/admin/AdminGeneral';
import ProjectForm from './components/admin/ProjectForm';
import ParticleField from './components/three/ParticleField';
import { syncSectionsFromBackend } from './utils/portfolioData';
import { syncProjectsFromBackend } from './utils/projectStorage';

function PortfolioSite({ darkMode, toggleDarkMode }) {
    return (
        <div className={`${darkMode ? 'bg-[#030712] text-slate-100' : 'bg-gradient-to-br from-gray-50 via-white to-orange-50 text-gray-900'} min-h-screen transition-colors duration-500 relative overflow-hidden`}>
            {/* Ambient Lighting Layers for World-Class Cyber-Obsidian Dark Mode */}
            {darkMode && (
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    {/* Ambient top radial gradient flare (Cyber Amber / Warm Gold) */}
                    <div className="absolute -top-32 right-[-5%] w-[650px] h-[650px] bg-gradient-to-br from-orange-500/12 via-pink-500/6 to-transparent rounded-full blur-[140px]" />
                    {/* Ambient middle radial gradient flare (Deep Violet / Purple) */}
                    <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/12 via-indigo-500/8 to-transparent rounded-full blur-[150px]" />
                    {/* Ambient lower radial gradient flare (Cyber Cyan / Emerald) */}
                    <div className="absolute top-[60%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-tl from-cyan-500/10 via-blue-600/6 to-transparent rounded-full blur-[160px]" />
                    {/* Ambient bottom footer flare */}
                    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-gradient-to-t from-orange-500/8 via-purple-600/6 to-transparent rounded-full blur-[150px]" />
                    {/* Cyber dot matrix overlay */}
                    <div className="absolute inset-0 cyber-dot-matrix opacity-40" />
                </div>
            )}

            <ParticleField darkMode={darkMode} />
            <div className="relative z-10">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Hero darkMode={darkMode} />
                <About darkMode={darkMode} />
                <Skills darkMode={darkMode} />
                <Projects darkMode={darkMode} />
                <Contact darkMode={darkMode} />
                <Footer darkMode={darkMode} />
            </div>
        </div>
    );
}

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="hero" element={<AdminHero />} />
                <Route path="about" element={<AdminAbout />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="projects" element={<AdminDashboard />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/edit/:id" element={<ProjectForm />} />
                <Route path="contact" element={<AdminContact />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="general" element={<AdminGeneral />} />
            </Route>
        </Routes>
    );
}

function AppRoutes() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    const [darkMode, setDarkMode] = useState(true);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100
        });
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

        syncSectionsFromBackend();
        syncProjectsFromBackend();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Lock page scroll while the intro splash is visible
    useEffect(() => {
        if (showIntro && !isAdmin) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showIntro, isAdmin]);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (isAdmin) {
        return <AdminRoutes />;
    }

    return (
        <>
            <AnimatePresence>
                {showIntro && <IslamicIntro onComplete={() => setShowIntro(false)} />}
            </AnimatePresence>
            {!showIntro && <PortfolioSite darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        </>
    );
}

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
