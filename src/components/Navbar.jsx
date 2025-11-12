import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

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
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Home</NavLink>
      <NavLink to="/all-reviews" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>All Reviews</NavLink>
      {user && (
        <>
          <NavLink to="/add-review" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Add Review</NavLink>
          <NavLink to="/my-reviews" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>My Reviews</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform">🍜 FoodLovers</Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
            {user ? (
              <div className="relative">
                <img 
                  src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName} 
                  alt="User" 
                  className="w-12 h-12 rounded-full cursor-pointer border-3 border-gradient-to-r from-orange-500 to-red-500 ring-2 ring-orange-500 hover:ring-4 transition-all"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-3 border border-gray-100 animate-fade-in">
                    <Link to="/add-review" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all font-medium">Add Review</Link>
                    <Link to="/my-reviews" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all font-medium">My Reviews</Link>
                    <Link to="/my-favorites" className="block px-6 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all font-medium">My Favorites</Link>
                    <hr className="my-2" />
                    <button onClick={handleLogout} className="w-full text-left px-6 py-3 hover:bg-red-50 text-red-600 font-semibold transition-all">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">Login</Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            {navLinks}
            {user ? (
              <>
                <Link to="/my-favorites" className="hover:text-orange-500">My Favorites</Link>
                <button onClick={handleLogout} className="text-left text-red-600 font-semibold">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-center font-semibold">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
