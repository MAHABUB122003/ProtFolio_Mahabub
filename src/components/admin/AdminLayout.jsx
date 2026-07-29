import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaFolderOpen, FaPlusCircle, FaSignOutAlt, FaUser, FaHome, FaRocket, FaUserTie, FaCogs, FaEnvelope, FaCog } from 'react-icons/fa';
import { getCurrentUser, logoutUser } from '../../utils/adminAuth';

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getCurrentUser();

    useEffect(() => {
        if (!user) {
            navigate('/admin/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
        { name: 'Hero', path: '/admin/hero', icon: <FaRocket /> },
        { name: 'About', path: '/admin/about', icon: <FaUserTie /> },
        { name: 'Skills', path: '/admin/skills', icon: <FaCogs /> },
        { name: 'Projects', path: '/admin/projects', icon: <FaFolderOpen /> },
        { name: 'Add Project', path: '/admin/projects/new', icon: <FaPlusCircle /> },
        { name: 'Contact', path: '/admin/contact', icon: <FaEnvelope /> },
        { name: 'General', path: '/admin/general', icon: <FaCog /> },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0d182e] to-gray-900">
            {/* Top Navbar */}
            <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="text-white font-bold hidden sm:block">Admin Panel</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all flex items-center gap-1.5"
                        >
                            <FaHome /> View Portfolio
                        </Link>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/30 rounded-lg">
                            <FaUser className="text-orange-400 text-xs" />
                            <span className="text-white text-xs font-medium">{user.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 text-xs text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all flex items-center gap-1.5"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="md:w-56 flex-shrink-0">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sticky top-20">
                            <div className="space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            location.pathname === item.path
                                                ? 'bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-400'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <span className="text-base">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
