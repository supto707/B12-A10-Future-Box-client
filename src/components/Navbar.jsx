import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ui/ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'text-gray-300 dark:text-gray-300 text-gray-700 hover:text-orange-500 transition'}>Home</NavLink>
      <NavLink to="/all-reviews" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'text-gray-300 dark:text-gray-300 text-gray-700 hover:text-orange-500 transition'}>All Reviews</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'text-gray-300 dark:text-gray-300 text-gray-700 hover:text-orange-500 transition'}>About</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'text-gray-300 dark:text-gray-300 text-gray-700 hover:text-orange-500 transition'}>Contact</NavLink>
      {user && (
        <>
          <NavLink to="/dashboard/add-review" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'text-gray-300 dark:text-gray-300 text-gray-700 hover:text-orange-500 transition'}>Add Review</NavLink>
          <NavLink to="/dashboard/my-reviews" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'text-gray-300 dark:text-gray-300 text-gray-700 hover:text-orange-500 transition'}>My Reviews</NavLink>
        </>
      )}
    </>
  );

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="glass sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-110 transition-transform">🍜 FoodLovers</Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks}
            <ThemeToggle />
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName}
                  alt="User"
                  className="w-12 h-12 rounded-full cursor-pointer border-2 border-orange-500 ring-2 ring-orange-500/50 hover:ring-4 transition-all"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-orange-500/30">
                      <div className="px-6 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-bold text-gray-800 dark:text-white truncate">{user.displayName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard" className="block px-6 py-3 hover:bg-orange-500/10 transition-all font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500">Dashboard</Link>
                      <Link to="/dashboard/add-review" className="block px-6 py-3 hover:bg-orange-500/10 transition-all font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500">Add Review</Link>
                      <Link to="/dashboard/my-reviews" className="block px-6 py-3 hover:bg-orange-500/10 transition-all font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500">My Reviews</Link>
                      <Link to="/my-favorites" className="block px-6 py-3 hover:bg-orange-500/10 transition-all font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500">My Favorites</Link>
                      <hr className="my-2 border-gray-200 dark:border-orange-500/20" />
                      <button onClick={handleLogout} className="w-full text-left px-6 py-3 hover:bg-red-500/10 text-red-500 font-semibold transition-all">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">Login</Link>
              </motion.div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-gray-700 dark:text-gray-300">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-4 flex flex-col gap-4 bg-white dark:bg-black/95 p-4 rounded-xl border border-orange-500/20">
              {navLinks}
              <div className="flex justify-start">
                <ThemeToggle />
              </div>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition font-medium">Dashboard</Link>
                  <Link to="/my-favorites" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition font-medium">My Favorites</Link>
                  <button onClick={handleLogout} className="text-left text-red-500 font-semibold">Logout</button>
                </>
              ) : (
                <Link to="/login" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-center font-semibold">Login</Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
