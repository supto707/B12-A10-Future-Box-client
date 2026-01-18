import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    FaHome,
    FaUser,
    FaPlusCircle,
    FaList,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaChartPie
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ui/ThemeToggle';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const menuItems = [
        { path: '/dashboard', label: 'Overview', icon: <FaChartPie /> },
        { path: '/dashboard/profile', label: 'My Profile', icon: <FaUser /> },
        { path: '/dashboard/add-review', label: 'Add Review', icon: <FaPlusCircle /> },
        { path: '/dashboard/my-reviews', label: 'My Reviews', icon: <FaList /> },
        { path: '/', label: 'Back to Home', icon: <FaHome /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex overflow-hidden transition-colors duration-300">

            {/* Sidebar - Desktop & Tablet */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className={`hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 z-30`}
                    >
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                FoodLovers
                            </Link>
                        </div>

                        <div className="flex flex-col p-4 gap-2 overflow-y-auto flex-grow">
                            {user && (
                                <div className="mb-6 text-center p-4 bg-gray-50 dark:bg-black rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-orange-500"
                                    />
                                    <h3 className="font-bold text-gray-800 dark:text-white truncate">{user.displayName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                </div>
                            )}

                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${location.pathname === item.path
                                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-500'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-medium"
                            >
                                <FaSignOutAlt className="text-xl" />
                                Logout
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Navbar */}
                <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            {isSidebarOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                            User Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-black scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
