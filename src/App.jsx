import Navbar from './components/Navbar';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminAbout from './pages/admin/AdminAbout';
import AdminSkills from './pages/admin/AdminSkills';
import AdminContact from './pages/admin/AdminContact';
import AdminGeneral from './pages/admin/AdminGeneral';
import ProjectForm from './components/admin/ProjectForm';
import ParticleField from './components/three/ParticleField';

function PortfolioSite({ darkMode, toggleDarkMode }) {
    return (
        <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 via-[#0a0e1a] to-gray-950' : 'bg-gradient-to-br from-gray-50 via-white to-orange-50'} min-h-screen transition-colors duration-300 relative`}>
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
                <Route path="general" element={<AdminGeneral />} />
            </Route>
        </Routes>
    );
}

function AppRoutes() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100
        });
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
    }, [darkMode]);

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

    return <PortfolioSite darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
}

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
