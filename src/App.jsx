import Navbar from './components/Navbar';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './components/Hero';  // Changed from Hero to Heor
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Remove this line - it's causing the duplicate error
// import { Contact } from 'lucide-react';

function App() {
    const [darkMode, setDarkMode] = useState(true);
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100
        });
        
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

    return (
        <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 via-[#0d182e] to-gray-900' : 'bg-gradient-to-br from-gray-50 to-orange-50'} min-h-screen transition-colors duration-300`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            <Skills darkMode={darkMode} />
            <Projects darkMode={darkMode} />
            <Contact darkMode={darkMode} />
            <Footer  darkMode={darkMode} />
        </div>
    );
}

export default App;